#!/usr/bin/env node

import { createHash } from "node:crypto";
import { existsSync } from "node:fs";
import {
  mkdir,
  readFile,
  readdir,
  rename,
  rm,
  stat,
  writeFile,
} from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const DEFAULT_SOURCE_URL = "https://vibeui.top/site-assets/designs.js";
const DEFAULT_JSON = path.join(ROOT, "references", "vibeui-design-index.json");
const DEFAULT_MARKDOWN = path.join(ROOT, "references", "vibeui-design-index.md");
const MIRROR_ROOT = path.join(ROOT, "references", "vibeui-mirror");
const TAILWIND_SOURCE = "https://cdn.tailwindcss.com";
const CONCURRENCY = 6;
const CATEGORY_ORDER = [
  "ai",
  "dev",
  "infra",
  "design",
  "finance",
  "enterprise",
  "styleGeneral",
  "styleLanding",
  "styleAnalytics",
];

function parseArgs(argv) {
  const options = {
    check: false,
    checkUpstream: false,
    sourceUrl: DEFAULT_SOURCE_URL,
    json: DEFAULT_JSON,
    markdown: DEFAULT_MARKDOWN,
  };

  for (let index = 0; index < argv.length; index += 1) {
    const argument = argv[index];
    if (argument === "--check") {
      options.check = true;
      continue;
    }
    if (argument === "--check-upstream") {
      options.checkUpstream = true;
      continue;
    }
    if (argument === "--source-url") {
      options.sourceUrl = argv[index + 1];
      index += 1;
      continue;
    }
    if (argument === "--json") {
      options.json = path.resolve(ROOT, argv[index + 1]);
      index += 1;
      continue;
    }
    if (argument === "--markdown") {
      options.markdown = path.resolve(ROOT, argv[index + 1]);
      index += 1;
      continue;
    }
    if (argument === "--help" || argument === "-h") {
      console.log(
        [
          "Usage: node scripts/qiaomu-vibeui-sync.mjs [options]",
          "",
          "Options:",
          "  --check            Verify the local offline mirror without network access",
          "  --check-upstream   Fetch the VibeUI index and report whether it changed",
          "  --source-url URL   Override the VibeUI designs.js source",
          "  --json FILE        Override the generated JSON index path",
          "  --markdown FILE    Override the generated Markdown index path",
        ].join("\n"),
      );
      process.exit(0);
    }
    throw new Error(`Unknown argument: ${argument}`);
  }

  if (!options.sourceUrl) {
    throw new Error("--source-url requires a value");
  }
  if (options.check && options.checkUpstream) {
    throw new Error("--check and --check-upstream cannot be used together");
  }
  return options;
}

function sha256(buffer) {
  return createHash("sha256").update(buffer).digest("hex");
}

function shortHash(value) {
  return sha256(Buffer.from(value)).slice(0, 16);
}

function toPosix(value) {
  return value.split(path.sep).join("/");
}

function repoPath(...parts) {
  return toPosix(path.relative(ROOT, path.join(...parts)));
}

function assertWithin(parent, candidate) {
  const relative = path.relative(parent, candidate);
  if (relative.startsWith("..") || path.isAbsolute(relative)) {
    throw new Error(`Refusing to operate outside ${parent}: ${candidate}`);
  }
}

function escapeMarkdownCell(value) {
  return String(value || "")
    .replace(/\|/g, "\\|")
    .replace(/\r?\n/g, " ")
    .trim();
}

function displayName(design) {
  if (design.localizedName && design.localizedName !== design.name) {
    return `${design.localizedName} / ${design.name}`;
  }
  return design.name;
}

function relativeFromReferences(repoFile) {
  const relative = path.relative(path.join(ROOT, "references"), path.join(ROOT, repoFile));
  return `./${toPosix(relative)}`;
}

function extractWindowValue(source, property) {
  const marker = `window.${property} = `;
  const start = source.indexOf(marker);
  if (start === -1) {
    throw new Error(`Missing ${property} in VibeUI data`);
  }

  const valueStart = start + marker.length;
  const first = source[valueStart];
  if (first === "{") {
    let depth = 0;
    let inString = false;
    let escaped = false;
    for (let index = valueStart; index < source.length; index += 1) {
      const char = source[index];
      if (inString) {
        if (escaped) {
          escaped = false;
        } else if (char === "\\") {
          escaped = true;
        } else if (char === '"') {
          inString = false;
        }
        continue;
      }
      if (char === '"') {
        inString = true;
      } else if (char === "{") {
        depth += 1;
      } else if (char === "}") {
        depth -= 1;
        if (depth === 0) {
          return JSON.parse(source.slice(valueStart, index + 1));
        }
      }
    }
  }

  if (first === "[") {
    let depth = 0;
    let inString = false;
    let escaped = false;
    for (let index = valueStart; index < source.length; index += 1) {
      const char = source[index];
      if (inString) {
        if (escaped) {
          escaped = false;
        } else if (char === "\\") {
          escaped = true;
        } else if (char === '"') {
          inString = false;
        }
        continue;
      }
      if (char === '"') {
        inString = true;
      } else if (char === "[") {
        depth += 1;
      } else if (char === "]") {
        depth -= 1;
        if (depth === 0) {
          return JSON.parse(source.slice(valueStart, index + 1));
        }
      }
    }
  }

  throw new Error(`Could not parse ${property} in VibeUI data`);
}

function containsCjk(value) {
  return /[\u3400-\u9fff]/u.test(value);
}

function localizedName(design) {
  const candidates = Array.isArray(design.searchTerms) ? design.searchTerms : [];
  const match = candidates.find(
    (term) =>
      typeof term === "string" &&
      containsCjk(term) &&
      term !== "一般" &&
      term !== design.name &&
      (term.includes("/") || term.length >= 4),
  );
  return match || "";
}

function sourceRoot(sourceUrl) {
  const root = new URL(sourceUrl);
  root.pathname = "/";
  root.search = "";
  root.hash = "";
  return root;
}

function normalizedRemote(value, sourceUrl = DEFAULT_SOURCE_URL) {
  if (typeof value !== "string" || value.length === 0) {
    return "";
  }
  return new URL(value, sourceRoot(sourceUrl)).href;
}

function localDesignPath(design) {
  if (!design.files?.design?.startsWith("design-md/")) {
    return "";
  }
  const slug = design.files.design.split("/")[1];
  const candidate = path.join(ROOT, "references", "design-systems", slug, "DESIGN.md");
  return existsSync(candidate) ? repoPath(candidate) : "";
}

function normalizeDesign(design, sourceUrl) {
  const slug = String(design.slug || "").trim();
  if (!slug) {
    throw new Error("VibeUI design is missing a slug");
  }
  const localPath = localDesignPath(design);

  return {
    slug,
    name: design.name || slug,
    localizedName: localizedName(design),
    monogram: design.monogram || "",
    categoryKey: design.categoryKey || "other",
    categoryLabelEn: design.categoryLabelEn || "Other",
    categoryLabelZh: design.categoryLabelZh || "其他",
    summary: design.summary || "",
    colors: Array.isArray(design.colors) ? design.colors : [],
    fonts: design.fonts || {},
    sourceSite: {
      name: design.sourceSite?.name || "",
      url: normalizedRemote(design.sourceSite?.url, sourceUrl),
    },
    sourceFiles: {
      readme: normalizedRemote(design.files?.readme, sourceUrl),
      design: normalizedRemote(design.files?.design, sourceUrl),
      preview: normalizedRemote(design.files?.preview, sourceUrl),
      previewDark: normalizedRemote(design.files?.previewDark, sourceUrl),
    },
    files: {
      design: repoPath(MIRROR_ROOT, "designs", slug, "DESIGN.md"),
      preview: repoPath(MIRROR_ROOT, "previews", `${slug}.html`),
      previewDark: design.files?.previewDark
        ? repoPath(MIRROR_ROOT, "previews", `${slug}-dark.html`)
        : "",
    },
    localDesignPath: localPath,
    referenceClass: localPath
      ? "local-brand-overlap-preview"
      : "vibeui-unique-style",
    countsAsUniqueReference: !localPath,
    stats: design.stats || {},
  };
}

async function fetchBuffer(url) {
  let lastError;
  for (let attempt = 1; attempt <= 4; attempt += 1) {
    try {
      const response = await fetch(url, {
        headers: {
          "user-agent": "qiaomu-design-sync/3.12 (+https://github.com/guilinshanshui/qiaomu-design)",
        },
        redirect: "follow",
        signal: AbortSignal.timeout(45_000),
      });
      if (response.ok) {
        return Buffer.from(await response.arrayBuffer());
      }

      lastError = new Error(
        `Failed to fetch ${url}: ${response.status} ${response.statusText}`,
      );
      if (response.status >= 400 && response.status < 500 && response.status !== 408 && response.status !== 429) {
        throw lastError;
      }
    } catch (error) {
      lastError = error;
      if (attempt === 4) {
        break;
      }
    }

    await new Promise((resolve) => setTimeout(resolve, 350 * 2 ** (attempt - 1)));
  }
  throw lastError;
}

async function fetchText(url) {
  return (await fetchBuffer(url)).toString("utf8");
}

async function mapLimit(items, limit, mapper) {
  const results = new Array(items.length);
  let cursor = 0;

  async function worker() {
    while (true) {
      const index = cursor;
      cursor += 1;
      if (index >= items.length) {
        return;
      }
      results[index] = await mapper(items[index], index);
    }
  }

  const workerCount = Math.min(limit, items.length);
  await Promise.all(Array.from({ length: workerCount }, () => worker()));
  return results;
}

async function readJson(filePath) {
  return JSON.parse(await readFile(filePath, "utf8"));
}

async function walkFiles(directory) {
  if (!existsSync(directory)) {
    return [];
  }
  const entries = await readdir(directory, { withFileTypes: true });
  const files = [];
  for (const entry of entries) {
    const absolute = path.join(directory, entry.name);
    if (entry.isDirectory()) {
      files.push(...(await walkFiles(absolute)));
    } else if (entry.isFile()) {
      files.push(absolute);
    }
  }
  return files;
}

async function sourceSnapshot(sourceUrl) {
  const sourceBuffer = await fetchBuffer(sourceUrl);
  const source = sourceBuffer.toString("utf8");
  const meta = extractWindowValue(source, "SITE_META");
  const rawDesigns = extractWindowValue(source, "DESIGNS");
  const designs = rawDesigns
    .map((design) => normalizeDesign(design, sourceUrl))
    .sort((left, right) => left.slug.localeCompare(right.slug));

  if (new Set(designs.map((design) => design.slug)).size !== designs.length) {
    throw new Error("VibeUI source contains duplicate design slugs");
  }

  return {
    sourceBuffer,
    meta,
    designs,
    sourceSha256: sha256(sourceBuffer),
  };
}

function collectGoogleFontCssUrls(html) {
  const urls = new Set();
  for (const match of html.matchAll(/https:\/\/fonts\.googleapis\.com\/[^"'<>)\s]+/g)) {
    urls.add(match[0].replaceAll("&amp;", "&"));
  }
  return [...urls];
}

function sanitizeUrl(url) {
  return url.replaceAll("&amp;", "&");
}

function fontFilename(url) {
  const parsed = new URL(url);
  const extension = path.extname(parsed.pathname) || ".woff2";
  return `${shortHash(url)}${extension}`;
}

function rewriteDesignMarkdown(markdown, slug) {
  return markdown
    .replace(
      /\]\((?:\.\/)?preview-dark\.html(#[^)]+)?\)/g,
      (_, anchor = "") => `](../../previews/${slug}-dark.html${anchor})`,
    )
    .replace(
      /\]\((?:\.\/)?preview\.html(#[^)]+)?\)/g,
      (_, anchor = "") => `](../../previews/${slug}.html${anchor})`,
    )
    .replace(
      /\]\(https:\/\/vibeui\.top\/[^)]*preview-dark\.html(#[^)]+)?\)/g,
      (_, anchor = "") => `](../../previews/${slug}-dark.html${anchor})`,
    )
    .replace(
      /\]\(https:\/\/vibeui\.top\/[^)]*preview\.html(#[^)]+)?\)/g,
      (_, anchor = "") => `](../../previews/${slug}.html${anchor})`,
    );
}

function removeOfflinePreconnectTags(html) {
  return html.replace(/<link\b[^>]*>/gi, (tag) => {
    const pointsToGoogleFonts = /fonts\.(?:googleapis|gstatic)\.com/i.test(tag);
    const isPreconnect = /\brel\s*=\s*["'](?:preconnect|dns-prefetch)["']/i.test(tag);
    return pointsToGoogleFonts && isPreconnect ? "" : tag;
  });
}

function rewritePreviewHtml(html, googleCssFiles) {
  let rewritten = removeOfflinePreconnectTags(html);
  rewritten = rewritten.replace(
    /https:\/\/cdn\.tailwindcss\.com(?:\/[^"' )<]*)?/g,
    "../assets/tailwindcss.js",
  );

  for (const [sourceUrl, file] of googleCssFiles) {
    const target = `../assets/fonts/${path.basename(file)}`;
    rewritten = rewritten.split(sourceUrl).join(target);
    rewritten = rewritten.split(sourceUrl.replaceAll("&", "&amp;")).join(target);
  }
  return rewritten;
}

function assertNoRemoteRuntime(html, label) {
  const scriptSources = [
    ...html.matchAll(/<script\b[^>]*\bsrc\s*=\s*["'](https?:\/\/[^"']+)["'][^>]*>/gi),
  ].map((match) => match[1]);
  const stylesheetSources = [
    ...html.matchAll(
      /<link\b[^>]*\brel\s*=\s*["']stylesheet["'][^>]*\bhref\s*=\s*["'](https?:\/\/[^"']+)["'][^>]*>/gi,
    ),
  ].map((match) => match[1]);

  if (scriptSources.length || stylesheetSources.length) {
    throw new Error(
      `Offline preview ${label} still has remote runtime resources: ${[
        ...scriptSources,
        ...stylesheetSources,
      ].join(", ")}`,
    );
  }
}

function assertFontCssIsOffline(css, label) {
  if (/https?:\/\/fonts\.gstatic\.com/i.test(css)) {
    throw new Error(`Offline font stylesheet ${label} still points to fonts.gstatic.com`);
  }
}

function mitLicense(copyright) {
  return `MIT License

Copyright (c) ${copyright}

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.`;
}

function manifestForFiles(files) {
  return files
    .map((file) => ({
      path: repoPath(file.absolutePath),
      bytes: file.bytes.length,
      sha256: sha256(file.bytes),
      source: file.source || "",
    }))
    .sort((left, right) => left.path.localeCompare(right.path));
}

function mirrorReadme(meta, counts, sourceUrl, mirroredAt) {
  return `# VibeUI UI 离线镜像

本目录把 [VibeUI](${sourceUrl}) 的 UI 设计区镜像到仓库内，供 \`qiaomu-design\` 离线检索和预览。原始 VibeUI 站点关闭后，本目录中的 \`DESIGN.md\`、HTML 预览、Tailwind 和字体仍可本地使用。

## 内容

- 上游生成时间：${meta.generatedAt || "unknown"}
- 镜像时间：${mirroredAt}
- 物理镜像设计文档：${counts.designs}
- 物理镜像 HTML 预览：${counts.previews}
- 物理镜像资源文件：${counts.assets}
- 正式唯一参考：${counts.uniqueReferences}
- 本地品牌/产品参考：${counts.localBrandReferences}
- VibeUI 独有通用参考：${counts.vibeuiUniqueReferences}
- VibeUI 重叠预览补充：${counts.overlapDesigns} 个设计 / ${counts.overlapPreviews} 个预览
- 镜像文件总数：${counts.files}

## 检索口径

- 正式唯一参考采用“逻辑去重、物理保留”：116 个正式唯一参考 = 58 个本地真实品牌/产品参考 + 58 个 VibeUI 独有通用风格/结构参考。
- VibeUI 另有 54 个设计与本地 58 站重叠；这 54 份 \`DESIGN.md\` 和 108 个明暗预览继续离线保留，只作视觉补充，不重复计数。
- 真实品牌 DNA 以 \`references/design-systems/\` 为准；VibeUI 索引只承担通用风格与结构参考，不得称为品牌 DNA 供体。
- 物理镜像仍完整保留 112 个 VibeUI 设计、166 个预览和 ${counts.files} 个文件；逻辑去重不删除任何可用资源。

## 目录

\`\`\`text
assets/                 Tailwind 与字体运行时
designs/<slug>/         DESIGN.md
previews/<slug>.html    明色预览
previews/<slug>-dark.html 暗色预览（存在时）
\`\`\`

预览 HTML 中的 Tailwind、Google Fonts 样式表和字体文件均已改写为相对路径。打开预览不需要访问 VibeUI、Google Fonts 或 Tailwind CDN。

## 来源与边界

- 本目录只镜像 VibeUI 的 UI 设计资料，不包含 Skill、图片生成、ChatGPT、Grok、Seedance 等非 UI 内容。
- 来源与版权归原项目及各自权利人所有；本仓库只做离线技术镜像和来源标注，不代表原项目或品牌背书。
- 上游内容有更新时，运行 \`node scripts/qiaomu-vibeui-sync.mjs\` 重建镜像。

## 第三方许可

VibeUI 公开页面在 2026-10-01 未发现单独的许可证声明；其页面说明其内容来自 \`awesome-design-md\` 的本地 \`design-md/*\` 资产。为保证离线镜像中的上游材料保留原始许可声明，以下两个来源的 MIT 许可随本目录一并保留。

### VoltAgent/awesome-design-md

${mitLicense("2026 VoltAgent")}

### nextlevelbuilder/ui-ux-pro-max-skill

${mitLicense("2024 Next Level Builder")}
`;
}

function renderMarkdown(payload) {
  const uniqueDesigns = payload.designs.filter(
    (design) => design.countsAsUniqueReference,
  );
  const overlapDesigns = payload.designs.filter(
    (design) => !design.countsAsUniqueReference,
  );
  const lines = [
    `# VibeUI 离线设计图谱（${payload.referenceCatalog.uniqueReferences} 个唯一参考）`,
    "",
    "> 从 [vibeui.top](https://vibeui.top/) 的 UI 设计区镜像到仓库。`DESIGN.md`、预览、Tailwind 和字体均可本地使用；VibeUI 关站后不影响检索和预览。",
    "> 此文件由 `node scripts/qiaomu-vibeui-sync.mjs` 生成；只收录 UI 设计条目，不包含 Skill、图片生成或其他非 UI 内容。",
    "> 本索引的运行定位是通用风格与结构参考；真实品牌 DNA 一律优先以本地 58 站为准。",
    "",
    `- 正式唯一参考：${payload.referenceCatalog.uniqueReferences}`,
    `- 本地品牌/产品参考：${payload.referenceCatalog.localBrandReferences}`,
    `- VibeUI 独有通用参考：${payload.referenceCatalog.vibeuiUniqueReferences}`,
    `- VibeUI 重叠设计（不计入唯一参考）：${payload.referenceCatalog.overlapDesigns}`,
    `- VibeUI 重叠预览（继续保留）：${payload.referenceCatalog.overlapPreviews}`,
    `- 原始镜像设计：${payload.summary.mirroredDesigns}`,
    `- 原始镜像预览：${payload.summary.mirroredPreviews}`,
    `- 原始镜像资源文件：${payload.summary.mirroredAssets} / ${payload.summary.mirroredFiles} 个文件`,
    `- 上游生成时间：${payload.sourceGeneratedAt || "unknown"}`,
    `- 本地镜像时间：${payload.mirroredAt}`,
    "",
    "## 去重口径",
    "",
    "- 正式检索目录只计算 58 个本地品牌/产品参考与 58 个 VibeUI 独有通用参考，共 116 个唯一项。",
    "- VibeUI 中另有 54 个设计与本地品牌库重叠；它们继续保留 54 份 `DESIGN.md` 和 108 个明暗预览，但不重复计数。",
    "- 物理镜像仍包含全部 112 个 VibeUI 设计、166 个预览和 473 个文件；逻辑去重不删除任何可用资源。",
    "",
    "## 使用规则",
    "",
    "1. 真实品牌/产品 DNA 一律优先从本地 58 站 `DESIGN.md` 读取；命中时直接使用仓库内文件。",
    "2. 本地未命中时，只从“VibeUI 独有通用风格/结构参考”中选择 1–2 个参考，打开仓库内镜像的 `DESIGN.md` 与预览。",
    "3. 只提取 3–5 个具体的风格或结构规则，例如颜色角色、字体层级、圆角、阴影、动效时长、布局节奏和组件组合；不把本索引条目称为品牌 DNA 供体，也不要整站复制。",
    "4. 与本地 58 站重叠的 54 个条目，用本地文件负责品牌 DNA，用 VibeUI 镜像只做视觉核对，不把它们当成额外参考。",
    "5. 参考库用于审美与结构研究，不代表对应品牌背书。",
    "6. 正常运行和校验不需要联网；只有主动检查上游更新时才使用 `--check-upstream`。",
    "",
  ];

  lines.push(
    `## VibeUI 独有通用风格/结构参考（${uniqueDesigns.length}）`,
    "",
    "以下条目没有本地 58 站对应项，是 116 个正式唯一参考的一部分；只作通用风格与结构参考。",
    "",
  );
  const uniqueCategories = new Map();
  for (const design of uniqueDesigns) {
    const entries = uniqueCategories.get(design.categoryKey) || [];
    entries.push(design);
    uniqueCategories.set(design.categoryKey, entries);
  }
  for (const categoryKey of CATEGORY_ORDER) {
    const entries = uniqueCategories.get(categoryKey);
    if (!entries?.length) {
      continue;
    }
    const category = entries[0];
    lines.push(
      `### ${category.categoryLabelZh} / ${category.categoryLabelEn} (${entries.length})`,
      "",
      "| 风格 | 简介 | 离线入口 |",
      "|---|---|---|",
    );
    for (const design of entries) {
      const links = [
        `[镜像 DESIGN.md](${relativeFromReferences(design.files.design)})`,
        `[预览](${relativeFromReferences(design.files.preview)})`,
      ];
      if (design.files.previewDark) {
        links.push(`[暗色预览](${relativeFromReferences(design.files.previewDark)})`);
      }
      lines.push(
        `| **${escapeMarkdownCell(displayName(design))}** | ${escapeMarkdownCell(design.summary)} | ${links.join(" · ")} |`,
      );
    }
    lines.push("");
  }

  lines.push(
    `## VibeUI 重叠预览补充（${overlapDesigns.length}）`,
    "",
    "以下设计已由本地 58 站正式覆盖，不重复计入 116 个唯一参考；镜像 `DESIGN.md` 和明暗预览继续保留，用于快速视觉核对。",
    "",
  );
  const overlapCategories = new Map();
  for (const design of overlapDesigns) {
    const entries = overlapCategories.get(design.categoryKey) || [];
    entries.push(design);
    overlapCategories.set(design.categoryKey, entries);
  }
  for (const categoryKey of CATEGORY_ORDER) {
    const entries = overlapCategories.get(categoryKey);
    if (!entries?.length) {
      continue;
    }
    const category = entries[0];
    lines.push(
      `### ${category.categoryLabelZh} / ${category.categoryLabelEn} (${entries.length})`,
      "",
      "| 风格 | 简介 | 本地正式入口 | VibeUI 离线补充 |",
      "|---|---|---|---|",
    );
    for (const design of entries) {
      const links = [
        `[镜像 DESIGN.md](${relativeFromReferences(design.files.design)})`,
        `[预览](${relativeFromReferences(design.files.preview)})`,
      ];
      if (design.files.previewDark) {
        links.push(`[暗色预览](${relativeFromReferences(design.files.previewDark)})`);
      }
      lines.push(
        `| **${escapeMarkdownCell(displayName(design))}** | ${escapeMarkdownCell(design.summary)} | [58 站 DESIGN.md](${relativeFromReferences(design.localDesignPath)}) | ${links.join(" · ")} |`,
      );
    }
    lines.push("");
  }

  lines.push(
    "## 未包含在 VibeUI 索引的本地设计系统",
    "",
    "以下本地品牌/产品设计系统不在当前 VibeUI UI 索引中，仍可作为品牌 DNA 参考直接使用：",
    "",
    ...payload.localOnly.map((slug) => `- \`${slug}\``),
    "",
    "## 刷新与校验",
    "",
    "```bash",
    "# 重建完整离线镜像（需要联网）",
    "node scripts/qiaomu-vibeui-sync.mjs",
    "",
    "# 纯离线校验，不访问 VibeUI 或 CDN",
    "node scripts/qiaomu-vibeui-sync.mjs --check",
    "",
    "# 主动检查上游是否变化",
    "node scripts/qiaomu-vibeui-sync.mjs --check-upstream",
    "```",
    "",
    "`--check` 校验本地文件、尺寸、SHA-256 和 Markdown 清单；`--check-upstream` 只检查上游数据源版本，不下载镜像。",
    "",
  );

  return lines.join("\n");
}

async function buildMirror(options) {
  console.log(`fetching ${options.sourceUrl}`);
  const snapshot = await sourceSnapshot(options.sourceUrl);
  const jobs = [];

  for (const design of snapshot.designs) {
    if (!design.sourceFiles.design || !design.sourceFiles.preview) {
      throw new Error(`Design ${design.slug} is missing its design or preview source`);
    }
    jobs.push({
      kind: "design",
      design,
      source: design.sourceFiles.design,
      target: design.files.design,
    });
    jobs.push({
      kind: "preview",
      design,
      source: design.sourceFiles.preview,
      target: design.files.preview,
    });
    if (design.sourceFiles.previewDark && design.files.previewDark) {
      jobs.push({
        kind: "previewDark",
        design,
        source: design.sourceFiles.previewDark,
        target: design.files.previewDark,
      });
    }
  }

  console.log(`fetching ${jobs.length} design and preview files`);
  const downloaded = await mapLimit(jobs, CONCURRENCY, async (job) => ({
    ...job,
    text: await fetchText(job.source),
  }));

  const googleCssUrls = new Set();
  for (const job of downloaded) {
    if (job.kind === "preview" || job.kind === "previewDark") {
      for (const url of collectGoogleFontCssUrls(job.text)) {
        googleCssUrls.add(url);
      }
    }
  }

  const outputFiles = [];
  const scriptTexts = new Set();
  for (const job of downloaded) {
    if (job.kind === "design") {
      outputFiles.push({
        absolutePath: path.join(ROOT, job.target),
        bytes: Buffer.from(rewriteDesignMarkdown(job.text, job.design.slug), "utf8"),
        source: job.source,
      });
      continue;
    }
    scriptTexts.add(job.text);
  }

  const googleCssFiles = new Map();
  const fontFiles = new Map();
  if (scriptTexts.size > 0) {
    const usesTailwind = [...scriptTexts].some((html) =>
      /https:\/\/cdn\.tailwindcss\.com/i.test(html),
    );
    if (usesTailwind) {
      const tailwindPath = path.join(MIRROR_ROOT, "assets", "tailwindcss.js");
      outputFiles.push({
        absolutePath: tailwindPath,
        bytes: await fetchBuffer(TAILWIND_SOURCE),
        source: TAILWIND_SOURCE,
      });
    }

    console.log(`fetching ${googleCssUrls.size} Google Fonts stylesheets`);
    const cssAssets = await mapLimit([...googleCssUrls].sort(), CONCURRENCY, async (url) => {
      const css = await fetchText(url);
      const fontUrls = new Set(
        [...css.matchAll(/https:\/\/fonts\.gstatic\.com\/[^)'"\s]+/g)].map((match) =>
          sanitizeUrl(match[0]),
        ),
      );
      const fontAssets = await mapLimit([...fontUrls].sort(), CONCURRENCY, async (fontUrl) => ({
        source: fontUrl,
        bytes: await fetchBuffer(fontUrl),
      }));
      return { source: url, css, fontAssets };
    });

    for (const asset of cssAssets) {
      const cssFilename = `font-${shortHash(asset.source)}.css`;
      const cssPath = path.join(MIRROR_ROOT, "assets", "fonts", cssFilename);
      let rewrittenCss = asset.css;

      for (const font of asset.fontAssets) {
        const filename = fontFilename(font.source);
        const fontPath = path.join(MIRROR_ROOT, "assets", "fonts", filename);
        if (!fontFiles.has(font.source)) {
          fontFiles.set(font.source, {
            absolutePath: fontPath,
            bytes: font.bytes,
            source: font.source,
          });
        }
        rewrittenCss = rewrittenCss
          .split(font.source)
          .join(`./${filename}`)
          .split(font.source.replaceAll("&", "&amp;"))
          .join(`./${filename}`);
      }

      assertFontCssIsOffline(rewrittenCss, cssFilename);
      googleCssFiles.set(asset.source, cssPath);
      outputFiles.push({
        absolutePath: cssPath,
        bytes: Buffer.from(rewrittenCss, "utf8"),
        source: asset.source,
      });
    }

    outputFiles.push(...fontFiles.values());
  }

  for (const job of downloaded) {
    if (job.kind === "design") {
      continue;
    }
    const html = rewritePreviewHtml(job.text, googleCssFiles);
    assertNoRemoteRuntime(html, job.design.slug);
    outputFiles.push({
      absolutePath: path.join(ROOT, job.target),
      bytes: Buffer.from(html, "utf8"),
      source: job.source,
    });
  }

  const mirroredAt = new Date().toISOString();
  const previewCount = snapshot.designs.reduce(
    (count, design) => count + Number(Boolean(design.files.preview)) + Number(Boolean(design.files.previewDark)),
    0,
  );
  const assetCount = outputFiles.filter((file) =>
    repoPath(file.absolutePath).startsWith("references/vibeui-mirror/assets/"),
  ).length;
  const localDirectory = path.join(ROOT, "references", "design-systems");
  const localDesignSlugs = existsSync(localDirectory)
    ? (await readdir(localDirectory, { withFileTypes: true }))
        .filter(
          (entry) =>
            entry.isDirectory() &&
            existsSync(path.join(localDirectory, entry.name, "DESIGN.md")),
        )
        .map((entry) => entry.name)
    : [];
  const indexedLocalSlugs = new Set(
    snapshot.designs.filter((design) => design.localDesignPath).map((design) => design.slug),
  );
  const overlapDesigns = snapshot.designs.filter((design) => design.localDesignPath);
  const vibeuiUniqueDesigns = snapshot.designs.filter(
    (design) => design.countsAsUniqueReference,
  );
  const overlapPreviewCount = overlapDesigns.reduce(
    (count, design) =>
      count + Number(Boolean(design.files.preview)) + Number(Boolean(design.files.previewDark)),
    0,
  );
  const uniqueReferences = localDesignSlugs.length + vibeuiUniqueDesigns.length;
  const localOnly = localDesignSlugs
    .filter((slug) => !indexedLocalSlugs.has(slug))
    .sort((left, right) => left.localeCompare(right));
  const manifest = manifestForFiles(outputFiles);
  const readmePath = path.join(MIRROR_ROOT, "README.md");
  outputFiles.push({
    absolutePath: readmePath,
    bytes: Buffer.from(
      mirrorReadme(
        snapshot.meta,
        {
          designs: snapshot.designs.length,
          previews: previewCount,
          assets: assetCount,
          files: manifest.length + 1,
          uniqueReferences,
          localBrandReferences: localDesignSlugs.length,
          vibeuiUniqueReferences: vibeuiUniqueDesigns.length,
          overlapDesigns: overlapDesigns.length,
          overlapPreviews: overlapPreviewCount,
        },
        options.sourceUrl,
        mirroredAt,
      ),
      "utf8",
    ),
    source: "",
  });
  const finalManifest = manifestForFiles(outputFiles);

  const payload = {
    formatVersion: 2,
    source: options.sourceUrl,
    sourceGeneratedAt: snapshot.meta.generatedAt || "",
    sourceSha256: snapshot.sourceSha256,
    mirroredAt,
    scope: "ui-design-only",
    offline: true,
    referenceRole: {
      kind: "style-and-structure-reference",
      brandDnaAuthority: "references/design-systems",
      brandDnaDonorsAllowed: false,
      rule: "Use local 58 brand/product DESIGN.md files as brand DNA donors; use this VibeUI index only for generic style and structure references.",
    },
    referenceCatalog: {
      policy: "logical-dedup-physical-retain",
      uniqueReferences,
      localBrandReferences: localDesignSlugs.length,
      vibeuiUniqueReferences: vibeuiUniqueDesigns.length,
      overlapDesigns: overlapDesigns.length,
      overlapPreviews: overlapPreviewCount,
      physicallyMirroredDesigns: snapshot.designs.length,
      physicallyMirroredPreviews: previewCount,
      note: "The 54 overlapping VibeUI designs and their 108 previews remain offline, but are excluded from the unique-reference count.",
    },
    mirror: {
      root: "references/vibeui-mirror",
      readme: "references/vibeui-mirror/README.md",
      manifest: finalManifest,
    },
    summary: {
      ...snapshot.meta,
      totalDesigns: snapshot.designs.length,
      totalPreviews: previewCount,
      totalCategories: new Set(snapshot.designs.map((design) => design.categoryKey)).size,
      localDesignSystems: indexedLocalSlugs.size,
      extendedOnly: snapshot.designs.length - indexedLocalSlugs.size,
      localOnly: localOnly.length,
      uniqueReferences,
      localBrandReferences: localDesignSlugs.length,
      vibeuiUniqueReferences: vibeuiUniqueDesigns.length,
      overlapDesigns: overlapDesigns.length,
      overlapPreviews: overlapPreviewCount,
      mirroredDesigns: snapshot.designs.length,
      mirroredPreviews: previewCount,
      mirroredAssets: assetCount,
      mirroredFiles: finalManifest.length,
      mirroredBytes: finalManifest.reduce((total, file) => total + file.bytes, 0),
    },
    designs: snapshot.designs,
    localOnly,
  };

  return {
    outputFiles,
    payload,
    markdown: renderMarkdown(payload),
  };
}

async function writeFileAtomic(filePath, content) {
  await mkdir(path.dirname(filePath), { recursive: true });
  const temporary = `${filePath}.tmp-${process.pid}`;
  await writeFile(temporary, content);
  await rm(filePath, { force: true });
  await rename(temporary, filePath);
}

async function writeMirror(options, built) {
  assertWithin(ROOT, MIRROR_ROOT);
  await rm(MIRROR_ROOT, { recursive: true, force: true });

  console.log(`writing ${built.outputFiles.length} mirror files`);
  await mapLimit(built.outputFiles, CONCURRENCY, async (file) => {
    assertWithin(MIRROR_ROOT, file.absolutePath);
    await mkdir(path.dirname(file.absolutePath), { recursive: true });
    await writeFile(file.absolutePath, file.bytes);
  });

  await writeFileAtomic(options.json, `${JSON.stringify(built.payload, null, 2)}\n`);
  await writeFileAtomic(options.markdown, built.markdown);
  console.log(
    `mirrored ${built.payload.summary.mirroredDesigns} designs, ` +
      `${built.payload.summary.mirroredPreviews} previews and ` +
      `${built.payload.summary.mirroredAssets} assets`,
  );
  console.log(`wrote ${options.json}`);
  console.log(`wrote ${options.markdown}`);
}

async function verifyOffline(options) {
  const payload = await readJson(options.json);
  if (payload.formatVersion !== 2 || payload.offline !== true) {
    throw new Error("VibeUI index is not a formatVersion 2 offline mirror");
  }
  if (!payload.referenceCatalog) {
    throw new Error("VibeUI index is missing its deduplicated reference catalog");
  }

  if (payload.summary.totalDesigns !== 112 || payload.summary.totalPreviews !== 166) {
    throw new Error("VibeUI mirror counts changed unexpectedly");
  }
  if (payload.summary.mirroredDesigns !== payload.summary.totalDesigns) {
    throw new Error("Not every VibeUI DESIGN.md is represented in the mirror");
  }
  if (payload.summary.mirroredPreviews !== payload.summary.totalPreviews) {
    throw new Error("Not every VibeUI preview is represented in the mirror");
  }
  if (payload.designs.length !== payload.summary.totalDesigns) {
    throw new Error("VibeUI design index length does not match its summary");
  }
  const overlapDesigns = payload.designs.filter(
    (design) => design.referenceClass === "local-brand-overlap-preview",
  );
  const uniqueDesigns = payload.designs.filter(
    (design) => design.referenceClass === "vibeui-unique-style",
  );
  const overlapPreviews = overlapDesigns.reduce(
    (count, design) =>
      count + Number(Boolean(design.files.preview)) + Number(Boolean(design.files.previewDark)),
    0,
  );
  if (
    overlapDesigns.length + uniqueDesigns.length !== payload.designs.length ||
    overlapDesigns.length !== 54 ||
    uniqueDesigns.length !== 58 ||
    overlapPreviews !== 108
  ) {
    throw new Error("VibeUI logical deduplication counts changed unexpectedly");
  }
  if (
    payload.referenceCatalog.policy !== "logical-dedup-physical-retain" ||
    payload.referenceCatalog.uniqueReferences !== 116 ||
    payload.referenceCatalog.localBrandReferences !== 58 ||
    payload.referenceCatalog.vibeuiUniqueReferences !== 58 ||
    payload.referenceCatalog.overlapDesigns !== overlapDesigns.length ||
    payload.referenceCatalog.overlapPreviews !== overlapPreviews
  ) {
    throw new Error("VibeUI reference catalog is inconsistent");
  }
  if (
    payload.summary.uniqueReferences !== payload.referenceCatalog.uniqueReferences ||
    payload.summary.localBrandReferences !== payload.referenceCatalog.localBrandReferences ||
    payload.summary.vibeuiUniqueReferences !== payload.referenceCatalog.vibeuiUniqueReferences ||
    payload.summary.overlapDesigns !== payload.referenceCatalog.overlapDesigns ||
    payload.summary.overlapPreviews !== payload.referenceCatalog.overlapPreviews
  ) {
    throw new Error("VibeUI summary and reference catalog disagree");
  }

  const manifestPaths = new Set();
  for (const file of payload.mirror.manifest) {
    if (!file.path.startsWith("references/vibeui-mirror/")) {
      throw new Error(`Mirror manifest path is outside the mirror: ${file.path}`);
    }
    if (manifestPaths.has(file.path)) {
      throw new Error(`Duplicate mirror manifest path: ${file.path}`);
    }
    manifestPaths.add(file.path);

    const absolute = path.join(ROOT, file.path);
    assertWithin(MIRROR_ROOT, absolute);
    if (!existsSync(absolute)) {
      throw new Error(`Missing mirror file: ${file.path}`);
    }
    const fileStat = await stat(absolute);
    const bytes = await readFile(absolute);
    if (fileStat.size !== file.bytes || sha256(bytes) !== file.sha256) {
      throw new Error(`Mirror file failed size/hash verification: ${file.path}`);
    }
  }

  const actualMirrorFiles = (await walkFiles(MIRROR_ROOT)).map((file) => repoPath(file)).sort();
  const expectedMirrorFiles = [...manifestPaths].sort();
  if (JSON.stringify(actualMirrorFiles) !== JSON.stringify(expectedMirrorFiles)) {
    throw new Error("Mirror directory contains missing or unmanifested files");
  }

  let previewCount = 0;
  for (const design of payload.designs) {
    const isOverlap = Boolean(design.localDesignPath);
    if (
      design.countsAsUniqueReference !== !isOverlap ||
      design.referenceClass !==
        (isOverlap ? "local-brand-overlap-preview" : "vibeui-unique-style")
    ) {
      throw new Error(`Design ${design.slug} has an inconsistent reference class`);
    }
    if (!design.files.design || !design.files.preview) {
      throw new Error(`Design ${design.slug} is missing its offline files`);
    }
    for (const key of ["design", "preview", "previewDark"]) {
      const repoFile = design.files[key];
      if (!repoFile) {
        continue;
      }
      if (repoFile.startsWith("http")) {
        throw new Error(`Design ${design.slug} still points online for ${key}`);
      }
      if (!existsSync(path.join(ROOT, repoFile))) {
        throw new Error(`Design ${design.slug} has a missing ${key} file`);
      }
    }
    if (design.previewDark && !design.files.previewDark) {
      throw new Error(`Design ${design.slug} is missing its mirrored dark preview`);
    }
    previewCount += 1 + Number(Boolean(design.files.previewDark));
    if (design.localDesignPath && !existsSync(path.join(ROOT, design.localDesignPath))) {
      throw new Error(`Design ${design.slug} maps to a missing local DESIGN.md`);
    }
    if (!design.sourceFiles.design.startsWith("https://vibeui.top/")) {
      throw new Error(`Design ${design.slug} has an unexpected design source`);
    }
  }

  if (previewCount !== payload.summary.mirroredPreviews) {
    throw new Error("Mirrored preview count does not match the index");
  }

  const expectedMarkdown = renderMarkdown(payload);
  const actualMarkdown = await readFile(options.markdown, "utf8");
  if (actualMarkdown !== expectedMarkdown) {
    throw new Error("VibeUI Markdown index is stale; run the sync script");
  }

  for (const design of payload.designs) {
    for (const key of ["preview", "previewDark"]) {
      if (!design.files[key]) {
        continue;
      }
      const html = await readFile(path.join(ROOT, design.files[key]), "utf8");
      assertNoRemoteRuntime(html, `${design.slug}:${key}`);
    }
  }
  for (const file of payload.mirror.manifest.filter((entry) =>
    /^references\/vibeui-mirror\/assets\/fonts\/font-[0-9a-f]+\.css$/.test(entry.path),
  )) {
    assertFontCssIsOffline(await readFile(path.join(ROOT, file.path), "utf8"), file.path);
  }

  console.log(
    `offline verify passed: ${payload.summary.totalDesigns} designs, ` +
      `${payload.summary.totalPreviews} previews, ` +
      `${payload.summary.mirroredFiles} mirrored files`,
  );
}

async function checkUpstream(options) {
  const local = await readJson(options.json);
  const upstream = await fetchBuffer(options.sourceUrl);
  const upstreamSha256 = sha256(upstream);
  if (local.source !== options.sourceUrl || local.sourceSha256 !== upstreamSha256) {
    throw new Error(
      "VibeUI upstream changed; run node scripts/qiaomu-vibeui-sync.mjs to rebuild the offline mirror",
    );
  }
  console.log(`upstream verify passed: ${local.summary.totalDesigns} designs unchanged`);
}

async function main() {
  const options = parseArgs(process.argv.slice(2));
  if (options.check) {
    await verifyOffline(options);
    return;
  }
  if (options.checkUpstream) {
    await checkUpstream(options);
    return;
  }

  const built = await buildMirror(options);
  await writeMirror(options, built);
}

main().catch((error) => {
  console.error(error.stack || error.message || String(error));
  process.exitCode = 1;
});
