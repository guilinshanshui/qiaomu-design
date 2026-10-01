# VibeUI UI 离线镜像

本目录把 [VibeUI](https://vibeui.top/site-assets/designs.js) 的 UI 设计区镜像到仓库内，供 `qiaomu-design` 离线检索和预览。原始 VibeUI 站点关闭后，本目录中的 `DESIGN.md`、HTML 预览、Tailwind 和字体仍可本地使用。

## 内容

- 上游生成时间：2026-04-05T12:15:11.393Z
- 镜像时间：2026-10-01T03:37:34.159Z
- 物理镜像设计文档：112
- 物理镜像 HTML 预览：166
- 物理镜像资源文件：194
- 正式唯一参考：116
- 本地品牌/产品参考：58
- VibeUI 独有通用参考：58
- VibeUI 重叠预览补充：54 个设计 / 108 个预览
- 镜像文件总数：473

## 检索口径

- 正式唯一参考采用“逻辑去重、物理保留”：116 个正式唯一参考 = 58 个本地真实品牌/产品参考 + 58 个 VibeUI 独有通用风格/结构参考。
- VibeUI 另有 54 个设计与本地 58 站重叠；这 54 份 `DESIGN.md` 和 108 个明暗预览继续离线保留，只作视觉补充，不重复计数。
- 真实品牌 DNA 以 `references/design-systems/` 为准；VibeUI 索引只承担通用风格与结构参考，不得称为品牌 DNA 供体。
- 物理镜像仍完整保留 112 个 VibeUI 设计、166 个预览和 473 个文件；逻辑去重不删除任何可用资源。

## 目录

```text
assets/                 Tailwind 与字体运行时
designs/<slug>/         DESIGN.md
previews/<slug>.html    明色预览
previews/<slug>-dark.html 暗色预览（存在时）
```

预览 HTML 中的 Tailwind、Google Fonts 样式表和字体文件均已改写为相对路径。打开预览不需要访问 VibeUI、Google Fonts 或 Tailwind CDN。

## 来源与边界

- 本目录只镜像 VibeUI 的 UI 设计资料，不包含 Skill、图片生成、ChatGPT、Grok、Seedance 等非 UI 内容。
- 来源与版权归原项目及各自权利人所有；本仓库只做离线技术镜像和来源标注，不代表原项目或品牌背书。
- 上游内容有更新时，运行 `node scripts/qiaomu-vibeui-sync.mjs` 重建镜像。

## 第三方许可

VibeUI 公开页面在 2026-10-01 未发现单独的许可证声明；其页面说明其内容来自 `awesome-design-md` 的本地 `design-md/*` 资产。为保证离线镜像中的上游材料保留原始许可声明，以下两个来源的 MIT 许可随本目录一并保留。

### VoltAgent/awesome-design-md

MIT License

Copyright (c) 2026 VoltAgent

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
SOFTWARE.

### nextlevelbuilder/ui-ux-pro-max-skill

MIT License

Copyright (c) 2024 Next Level Builder

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
SOFTWARE.
