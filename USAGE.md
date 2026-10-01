# qiaomu-design 使用说明

本说明对应 [`guilinshanshui/qiaomu-design`](https://github.com/guilinshanshui/qiaomu-design)，即整合了 VibeUI UI 离线图谱的增强 fork。

## 1. 它解决什么问题

`qiaomu-design` 不是一键套模板工具，而是一套约束 AI 设计过程的 Agent Skill：

1. 先读取页面类型、受众、气质和功能契约。
2. 用 A–F 六个互不相同的真实方向让用户先看后选。
3. 确认方向后修改真实项目文件，并给完整状态、响应式和可访问性。
4. 最后在真实浏览器里做桌面/移动端验收，不能只凭“看起来正常”交付。

本 fork 额外内置 VibeUI 离线参考图谱。它不会替代项目需求、品牌规范或用户选择，只在需要风格与结构参考时提供本地检索材料。

## 2. 安装

### 推荐方式

```bash
npx skills add guilinshanshui/qiaomu-design
```

安装后，在支持 Agent Skills 的客户端中直接描述设计任务即可。

### 手动安装

```bash
git clone https://github.com/guilinshanshui/qiaomu-design.git
```

复制到客户端扫描目录。例如：

```bash
# Codex
cp -r qiaomu-design ~/.codex/skills/qiaomu-design

# Claude Code
cp -r qiaomu-design ~/.claude/skills/qiaomu-design
```

Windows PowerShell：

```powershell
git clone https://github.com/guilinshanshui/qiaomu-design.git
Copy-Item -Recurse -Force .\qiaomu-design "$env:USERPROFILE\.codex\skills\qiaomu-design"
```

路径由客户端决定；优先使用 `npx skills add`。

## 3. 安装后验证

```bash
npx skills add guilinshanshui/qiaomu-design --list
```

确认安装目录中存在根级 `SKILL.md`。如果从仓库源码使用，再运行：

```bash
node scripts/qiaomu-vibeui-sync.mjs --check
python tests/test_package.py
```

第一条命令不联网，验证 VibeUI 镜像的路径、文件数、尺寸和 SHA-256。第二条检查 skill 包结构、参考口径、镜像完整性与关键文档约束。

## 4. 开始使用

### 新设计

```text
帮我设计一个面向独立开发者的 API 监控仪表盘，先给六个能直接看的方向。
```

执行过程：

1. Phase 1：输出“设计读取”、三个拨盘和功能契约，必要时最多问 3 个关键问题。
2. Phase 2：生成 `design-previews/YYYY-MM-DD-任务名/index.html`，在同一页展示 A–F 六方向。
3. 你点选或用键盘 `1–6`，调整拨盘、补充意见，再确认回传。
4. Phase 3：当前代理修改真实文件，写或更新 `DESIGN.md`，完成桌面与移动端验收。

### 重设计已有页面

```text
重新设计这个产品首页，保留现有任务流和内容结构，先做六个方向。
```

如果项目里已有设计系统，skill 会先提取现有色彩、字体、间距、圆角、阴影和组件规则，不会未经确认直接覆盖。

### 只打磨、不加方向

```text
这个页面功能已经成立，帮我去掉 AI 味、补齐状态和移动端问题，不要推倒重来。
```

这走打磨模式：Audit、Critique、Polish、Animate、Harden、Live 按需组合。结束后仍会运行真实页面并做响应式验收。

### 只审查、不改代码

```text
审查这个仪表盘的信息层级、表单状态、长文本和移动端问题，先不要修改文件。
```

审查请求会停留在诊断，不把建议写成已实现。

### 建设计系统

```text
参考 Linear 的克制感，为这个项目建立 token、组件契约、主题、响应式和动效规范。
```

建设计系统时，正式唯一参考口径为：

- `116` 个正式唯一参考。
- `58` 个本地真实品牌/产品设计系统，可称“品牌 DNA 供体”。
- `58` 条 VibeUI 独有通用风格/结构参考，只作通用参考，不称品牌 DNA。
- VibeUI 另外 `54` 个与本地重叠的设计和 `108` 个预览继续离线保留，只作视觉补充，不重复计数。

### 指定参考网站

```text
我更想要 Cal.com 的冷静和 Stripe 的精密感，不要直接复制它们的品牌外观。
```

skill 会先查本地 58 站库；本地未命中时，才从 VibeUI 独有通用参考中补充。

## 5. 六方向试衣间怎么回传

默认回传方式：

```bash
node scripts/qiaomu-design-preview-server.mjs --file <index.html> --exit-on-select
```

浏览器中确认选择后，工作流会读取 `selection.json` 或 `QIAOMU_DESIGN_SELECTION::` 哨兵，继续进入 Phase 3。

如果本地服务无法启动，可以改用 `file://` 打开预览，然后在对话中直接回复：

```text
选 B。VARIANCE 6，MOTION 4，DENSITY 7。保留方向里的数据密度，但减少装饰动效。
```

推荐方向不是默认授权；只有用户明确选择，或明确说“你定/按推荐继续”，才会进入实现。

## 6. VibeUI 离线参考怎么用

### 执行代理自动使用

Agent 会读取以下入口，不需要你手动把整个参考库塞进上下文：

- `references/design-systems-catalog.md`：本地 58 站入口。
- `references/vibeui-design-index.md`：VibeUI 58 条独有正式参考和 54 条视觉补充索引。
- `references/vibeui-design-index.json`：带尺寸和 SHA-256 的机器可读清单。
- `references/vibeui-mirror/designs/<slug>/DESIGN.md`：设计文档。
- `references/vibeui-mirror/previews/<slug>.html`：明色预览。
- `references/vibeui-mirror/previews/<slug>-dark.html`：暗色预览（存在时）。

### 人工浏览

直接在本地打开：

```text
references/vibeui-mirror/previews/uiuxpro-01-minimalism.html
```

预览里的 Tailwind、Google Fonts 样式表和字体已替换为仓库内相对路径，不依赖 VibeUI、Google Fonts 或 Tailwind CDN。

### 关站和断网时能不能用

能。已经安装到本地的内容不依赖 VibeUI 在线状态：

- 能继续检索全部离线索引。
- 能继续读取 `DESIGN.md`。
- 能继续打开明暗预览和本地字体资源。
- 能继续做镜像完整性校验。

不能做的只有“获取 VibeUI 未来新增的设计”。这需要上游仍然在线，并且你主动运行同步命令。

## 7. 更新与维护

### 更新 skill

重新运行：

```bash
npx skills add guilinshanshui/qiaomu-design
```

或在本地 clone 中：

```bash
git pull origin main
```

### 校验 VibeUI 离线镜像

```bash
node scripts/qiaomu-vibeui-sync.mjs --check
```

这是纯离线校验，不访问 VibeUI。

### 检查 VibeUI 是否有上游更新

```bash
node scripts/qiaomu-vibeui-sync.mjs --check-upstream
```

该命令只检查并报告变化，不修改本地镜像。

### 重建 VibeUI 镜像

确认上游有更新后运行：

```bash
node scripts/qiaomu-vibeui-sync.mjs
node scripts/qiaomu-vibeui-sync.mjs --check
python tests/test_package.py
```

如果 VibeUI 已关站、网络受限或上游返回失败，保留现有本地文件即可。不要把同步失败误判为安装损坏。

## 8. 常见问题

| 问题 | 原因 | 处理 |
|---|---|---|
| 安装后找不到 skill | 客户端扫描路径或 frontmatter 不匹配 | 检查根级 `SKILL.md`，再运行 `npx skills add guilinshanshui/qiaomu-design --list` |
| 预览能打开但不自动回传 | 使用 `file://`，或本地服务退出 | 重启 `qiaomu-design-preview-server.mjs`；静态模式在对话中回复 A–F |
| 预览按钮重复 | 旧 HTML 与服务注入协议冲突 | 更新 skill，确认只有一个 `.qmdp-pick-button`，删除旧 `selection.json` |
| 中文加载慢 | 引入了完整 CJK Webfont | 正文改用系统中文字体栈，装饰标题只加载字符子集 |
| VibeUI 更新检查失败 | 关站、网络受限或上游地址变化 | 继续使用现有离线镜像；仅在需要未来新内容时处理同步 |
| 文档里的参考数量不一致 | 把“物理镜像数”和“正式唯一数”混用了 | 物理镜像 112；正式唯一 116 = 本地 58 + VibeUI 独有 58；重叠 54 只作视觉补充 |

## 9. 网络与文件边界

- 安装和离线检索不要求 VibeUI 在线。
- 本地方向预览只在本机回环地址启动临时服务。
- 同步脚本只在主动运行 `--check-upstream` 或重建镜像时访问上游。
- 正式实现只修改用户明确放入范围的项目文件。
- K3 或其他外部模型只有在当前任务明确点名时才调用。
- API key 不应写入提示词、仓库、日志或交付物。

## 10. 来源与版权

原项目：[joeseesun/qiaomu-design](https://github.com/joeseesun/qiaomu-design)

本 fork：[guilinshanshui/qiaomu-design](https://github.com/guilinshanshui/qiaomu-design)

VibeUI 镜像来源：[vibeui.top](https://vibeui.top/) 的 UI 设计区。来源与版权归原项目及各自权利人所有；仓库内镜像不代表品牌背书。第三方许可与来源边界见 [`references/vibeui-mirror/README.md`](references/vibeui-mirror/README.md)。

MIT License。Copyright (c) 向阳乔木。
