# VibeUI 离线设计图谱（116 个唯一参考）

> 从 [vibeui.top](https://vibeui.top/) 的 UI 设计区镜像到仓库。`DESIGN.md`、预览、Tailwind 和字体均可本地使用；VibeUI 关站后不影响检索和预览。
> 此文件由 `node scripts/qiaomu-vibeui-sync.mjs` 生成；只收录 UI 设计条目，不包含 Skill、图片生成或其他非 UI 内容。
> 本索引的运行定位是通用风格与结构参考；真实品牌 DNA 一律优先以本地 58 站为准。

- 正式唯一参考：116
- 本地品牌/产品参考：58
- VibeUI 独有通用参考：58
- VibeUI 重叠设计（不计入唯一参考）：54
- VibeUI 重叠预览（继续保留）：108
- 原始镜像设计：112
- 原始镜像预览：166
- 原始镜像资源文件：194 / 473 个文件
- 上游生成时间：2026-04-05T12:15:11.393Z
- 本地镜像时间：2026-10-01T03:37:34.159Z

## 去重口径

- 正式检索目录只计算 58 个本地品牌/产品参考与 58 个 VibeUI 独有通用参考，共 116 个唯一项。
- VibeUI 中另有 54 个设计与本地品牌库重叠；它们继续保留 54 份 `DESIGN.md` 和 108 个明暗预览，但不重复计数。
- 物理镜像仍包含全部 112 个 VibeUI 设计、166 个预览和 473 个文件；逻辑去重不删除任何可用资源。

## 使用规则

1. 真实品牌/产品 DNA 一律优先从本地 58 站 `DESIGN.md` 读取；命中时直接使用仓库内文件。
2. 本地未命中时，只从“VibeUI 独有通用风格/结构参考”中选择 1–2 个参考，打开仓库内镜像的 `DESIGN.md` 与预览。
3. 只提取 3–5 个具体的风格或结构规则，例如颜色角色、字体层级、圆角、阴影、动效时长、布局节奏和组件组合；不把本索引条目称为品牌 DNA 供体，也不要整站复制。
4. 与本地 58 站重叠的 54 个条目，用本地文件负责品牌 DNA，用 VibeUI 镜像只做视觉核对，不把它们当成额外参考。
5. 参考库用于审美与结构研究，不代表对应品牌背书。
6. 正常运行和校验不需要联网；只有主动检查上游更新时才使用 `--check-upstream`。

## VibeUI 独有通用风格/结构参考（58）

以下条目没有本地 58 站对应项，是 116 个正式唯一参考的一部分；只作通用风格与结构参考。

### 通用风格模板 / General Style Templates (40)

| 风格 | 简介 | 离线入口 |
|---|---|---|
| **極簡主義 & 瑞士風格 / Minimalism & Swiss Style** | Minimalism & Swiss Style is a UI style reference for general interfaces, focused on Clean, simple, spacious, functional, white space. | [镜像 DESIGN.md](./vibeui-mirror/designs/uiuxpro-01-minimalism/DESIGN.md) · [预览](./vibeui-mirror/previews/uiuxpro-01-minimalism.html) |
| **新擬物化 / Neumorphism** | Neumorphism is a UI style reference for general interfaces, focused on Soft UI, embossed, debossed, convex, concave. | [镜像 DESIGN.md](./vibeui-mirror/designs/uiuxpro-02-neumorphism/DESIGN.md) · [预览](./vibeui-mirror/previews/uiuxpro-02-neumorphism.html) |
| **玻璃擬態 / Glassmorphism** | Glassmorphism is a UI style reference for general interfaces, focused on Frosted glass, transparent, blurred background, layered, vibrant background. | [镜像 DESIGN.md](./vibeui-mirror/designs/uiuxpro-03-glassmorphism/DESIGN.md) · [预览](./vibeui-mirror/previews/uiuxpro-03-glassmorphism.html) |
| **粗野主義 / Brutalism** | Brutalism is a UI style reference for general interfaces, focused on Raw, unpolished, stark, high contrast, plain text. | [镜像 DESIGN.md](./vibeui-mirror/designs/uiuxpro-04-brutalism/DESIGN.md) · [预览](./vibeui-mirror/previews/uiuxpro-04-brutalism.html) |
| **3D & 超寫實主義 / 3D & Hyperrealism** | 3D & Hyperrealism is a UI style reference for general interfaces, focused on Depth, realistic textures, 3D models, spatial navigation, tactile. | [镜像 DESIGN.md](./vibeui-mirror/designs/uiuxpro-05-3d-hyperrealism/DESIGN.md) · [预览](./vibeui-mirror/previews/uiuxpro-05-3d-hyperrealism.html) |
| **活力 & 色塊風格 / Vibrant & Block-based** | Vibrant & Block-based is a UI style reference for general interfaces, focused on Bold, energetic, playful, block layout, geometric shapes. | [镜像 DESIGN.md](./vibeui-mirror/designs/uiuxpro-06-vibrant-block/DESIGN.md) · [预览](./vibeui-mirror/previews/uiuxpro-06-vibrant-block.html) |
| **深色模式 (OLED) / Dark Mode (OLED)** | Dark Mode (OLED) is a UI style reference for general interfaces, focused on Dark theme, low light, high contrast, deep black, midnight blue. | [镜像 DESIGN.md](./vibeui-mirror/designs/uiuxpro-07-dark-mode-oled/DESIGN.md) · [预览](./vibeui-mirror/previews/uiuxpro-07-dark-mode-oled.html) |
| **無障礙 & 道德設計 / Accessible & Ethical** | Accessible & Ethical is a UI style reference for general interfaces, focused on High contrast, large text (16px+), keyboard navigation, screen reader friendly, WCAG compliant. | [镜像 DESIGN.md](./vibeui-mirror/designs/uiuxpro-08-accessible/DESIGN.md) · [预览](./vibeui-mirror/previews/uiuxpro-08-accessible.html) |
| **黏土擬態 / Claymorphism** | Claymorphism is a UI style reference for general interfaces, focused on Soft 3D, chunky, playful, toy-like, bubbly. | [镜像 DESIGN.md](./vibeui-mirror/designs/uiuxpro-09-claymorphism/DESIGN.md) · [预览](./vibeui-mirror/previews/uiuxpro-09-claymorphism.html) |
| **極光 UI / Aurora UI** | Aurora UI is a UI style reference for general interfaces, focused on Vibrant gradients, smooth blend, Northern Lights effect, mesh gradient, luminous. | [镜像 DESIGN.md](./vibeui-mirror/designs/uiuxpro-10-aurora-ui/DESIGN.md) · [预览](./vibeui-mirror/previews/uiuxpro-10-aurora-ui.html) |
| **復古未來主義 / Retro-Futurism** | Retro-Futurism is a UI style reference for general interfaces, focused on Vintage sci-fi, 80s aesthetic, neon glow, geometric patterns, CRT scanlines. | [镜像 DESIGN.md](./vibeui-mirror/designs/uiuxpro-11-retro-futurism/DESIGN.md) · [预览](./vibeui-mirror/previews/uiuxpro-11-retro-futurism.html) |
| **扁平化設計 / Flat Design** | Flat Design is a UI style reference for general interfaces, focused on 2D, minimalist, bold colors, no shadows, clean lines. | [镜像 DESIGN.md](./vibeui-mirror/designs/uiuxpro-12-flat-design/DESIGN.md) · [预览](./vibeui-mirror/previews/uiuxpro-12-flat-design.html) |
| **擬物化設計 / Skeuomorphism** | Skeuomorphism is a UI style reference for general interfaces, focused on Realistic, texture, depth, 3D appearance, real-world metaphors. | [镜像 DESIGN.md](./vibeui-mirror/designs/uiuxpro-13-skeuomorphism/DESIGN.md) · [预览](./vibeui-mirror/previews/uiuxpro-13-skeuomorphism.html) |
| **液態玻璃 / Liquid Glass** | Liquid Glass is a UI style reference for general interfaces, focused on Flowing glass, morphing, smooth transitions, fluid effects, translucent. | [镜像 DESIGN.md](./vibeui-mirror/designs/uiuxpro-14-liquid-glass/DESIGN.md) · [预览](./vibeui-mirror/previews/uiuxpro-14-liquid-glass.html) |
| **動態驅動 / Motion-Driven** | Motion-Driven is a UI style reference for general interfaces, focused on Animation-heavy, microinteractions, smooth transitions, scroll effects, parallax. | [镜像 DESIGN.md](./vibeui-mirror/designs/uiuxpro-15-motion-driven/DESIGN.md) · [预览](./vibeui-mirror/previews/uiuxpro-15-motion-driven.html) |
| **Mobile apps (行動), touchscreen UIs, productivity tools (工具), user-friendly, consumer apps (應用程式), interactive components / Micro-interactions** | Micro-interactions is a UI style reference for general interfaces, focused on Small animations, gesture-based, tactile feedback, subtle animations, contextual interactions. | [镜像 DESIGN.md](./vibeui-mirror/designs/uiuxpro-16-micro-interactions/DESIGN.md) · [预览](./vibeui-mirror/previews/uiuxpro-16-micro-interactions.html) |
| **包容性設計 / Inclusive Design** | Inclusive Design is a UI style reference for general interfaces, focused on Accessible, color-blind friendly, high contrast, haptic feedback, voice interaction. | [镜像 DESIGN.md](./vibeui-mirror/designs/uiuxpro-17-inclusive-design/DESIGN.md) · [预览](./vibeui-mirror/previews/uiuxpro-17-inclusive-design.html) |
| **Voice assistants, AI platforms (平台), future-forward UX, smart home, contextual computing, ambient experiences / Zero Interface** | Zero Interface is a UI style reference for general interfaces, focused on Minimal visible UI, voice-first, gesture-based, AI-driven, invisible controls. | [镜像 DESIGN.md](./vibeui-mirror/designs/uiuxpro-18-zero-interface/DESIGN.md) · [预览](./vibeui-mirror/previews/uiuxpro-18-zero-interface.html) |
| **柔和 UI 進化版 / Soft UI Evolution** | Soft UI Evolution is a UI style reference for general interfaces, focused on Evolved soft UI, better contrast, modern aesthetics, subtle depth, accessibility-focused. | [镜像 DESIGN.md](./vibeui-mirror/designs/uiuxpro-19-soft-ui-evolution/DESIGN.md) · [预览](./vibeui-mirror/previews/uiuxpro-19-soft-ui-evolution.html) |
| **新粗野主義 / Neubrutalism** | Neubrutalism is a UI style reference for general interfaces, focused on Bold borders, black outlines, primary colors, thick shadows, no gradients. | [镜像 DESIGN.md](./vibeui-mirror/designs/uiuxpro-38-neubrutalism/DESIGN.md) · [预览](./vibeui-mirror/previews/uiuxpro-38-neubrutalism.html) |
| **便當盒網格 / Bento Box Grid** | Bento Box Grid is a UI style reference for general interfaces, focused on Modular cards, asymmetric grid, varied sizes, Apple-style, dashboard tiles. | [镜像 DESIGN.md](./vibeui-mirror/designs/uiuxpro-39-bento-box/DESIGN.md) · [预览](./vibeui-mirror/previews/uiuxpro-39-bento-box.html) |
| **Y2K 美學 / Y2K Aesthetic** | Y2K Aesthetic is a UI style reference for general interfaces, focused on Neon pink, chrome, metallic, bubblegum, iridescent. | [镜像 DESIGN.md](./vibeui-mirror/designs/uiuxpro-40-y2k-revival/DESIGN.md) · [预览](./vibeui-mirror/previews/uiuxpro-40-y2k-revival.html) |
| **賽博龐克 UI / Cyberpunk UI** | Cyberpunk UI is a UI style reference for general interfaces, focused on Neon, dark mode, terminal, HUD, sci-fi. | [镜像 DESIGN.md](./vibeui-mirror/designs/uiuxpro-41-cyberpunk/DESIGN.md) · [预览](./vibeui-mirror/previews/uiuxpro-41-cyberpunk.html) |
| **有機親生命設計 / Organic Biophilic** | Organic Biophilic is a UI style reference for general interfaces, focused on Nature, organic shapes, green, sustainable, rounded. | [镜像 DESIGN.md](./vibeui-mirror/designs/uiuxpro-42-organic-biophilic/DESIGN.md) · [预览](./vibeui-mirror/previews/uiuxpro-42-organic-biophilic.html) |
| **AI 原生 UI / AI-Native UI** | AI-Native UI is a UI style reference for general interfaces, focused on Chatbot, conversational, voice, assistant, agentic. | [镜像 DESIGN.md](./vibeui-mirror/designs/uiuxpro-43-ai-native/DESIGN.md) · [预览](./vibeui-mirror/previews/uiuxpro-43-ai-native.html) |
| **孟菲斯設計 / Memphis Design** | Memphis Design is a UI style reference for general interfaces, focused on 80s, geometric, playful, postmodern, shapes. | [镜像 DESIGN.md](./vibeui-mirror/designs/uiuxpro-44-memphis-revival/DESIGN.md) · [预览](./vibeui-mirror/previews/uiuxpro-44-memphis-revival.html) |
| **Music platforms (平台), gaming (遊戲), creative portfolios (創意), tech startups, entertainment (娛樂), artistic projects / Vaporwave** | Vaporwave is a UI style reference for general interfaces, focused on Synthwave, retro-futuristic, 80s-90s, neon, glitch. | [镜像 DESIGN.md](./vibeui-mirror/designs/uiuxpro-45-vaporwave/DESIGN.md) · [预览](./vibeui-mirror/previews/uiuxpro-45-vaporwave.html) |
| **多維層次 / Dimensional Layering** | Dimensional Layering is a UI style reference for general interfaces, focused on Depth, overlapping, z-index, layers, 3D. | [镜像 DESIGN.md](./vibeui-mirror/designs/uiuxpro-46-dimensional-layering/DESIGN.md) · [预览](./vibeui-mirror/previews/uiuxpro-46-dimensional-layering.html) |
| **誇張極簡主義 / Exaggerated Minimalism** | Exaggerated Minimalism is a UI style reference for general interfaces, focused on Bold minimalism, oversized typography, high contrast, negative space, loud minimal. | [镜像 DESIGN.md](./vibeui-mirror/designs/uiuxpro-47-exaggerated-minimalism/DESIGN.md) · [预览](./vibeui-mirror/previews/uiuxpro-47-exaggerated-minimalism.html) |
| **動態排版 / Kinetic Typography** | Kinetic Typography is a UI style reference for general interfaces, focused on Motion text, animated type, moving letters, dynamic, typing effect. | [镜像 DESIGN.md](./vibeui-mirror/designs/uiuxpro-48-kinetic-typography/DESIGN.md) · [预览](./vibeui-mirror/previews/uiuxpro-48-kinetic-typography.html) |
| **視差滾動故事 / Parallax Storytelling** | Parallax Storytelling is a UI style reference for general interfaces, focused on Scroll-driven, narrative, layered scrolling, immersive, progressive disclosure. | [镜像 DESIGN.md](./vibeui-mirror/designs/uiuxpro-49-parallax-storytelling/DESIGN.md) · [预览](./vibeui-mirror/previews/uiuxpro-49-parallax-storytelling.html) |
| **瑞士現代主義 2.0 / Swiss Modernism 2.0** | Swiss Modernism 2.0 is a UI style reference for general interfaces, focused on Grid system, Helvetica, modular, asymmetric, international style. | [镜像 DESIGN.md](./vibeui-mirror/designs/uiuxpro-50-swiss-modernism/DESIGN.md) · [预览](./vibeui-mirror/previews/uiuxpro-50-swiss-modernism.html) |
| **科幻 HUD / FUI / HUD / Sci-Fi FUI** | HUD / Sci-Fi FUI is a UI style reference for general interfaces, focused on Futuristic, technical, wireframe, neon, data. | [镜像 DESIGN.md](./vibeui-mirror/designs/uiuxpro-51-hud-scifi/DESIGN.md) · [预览](./vibeui-mirror/previews/uiuxpro-51-hud-scifi.html) |
| **像素藝術 / Pixel Art** | Pixel Art is a UI style reference for general interfaces, focused on Retro, 8-bit, 16-bit, gaming, blocky. | [镜像 DESIGN.md](./vibeui-mirror/designs/uiuxpro-52-pixel-art/DESIGN.md) · [预览](./vibeui-mirror/previews/uiuxpro-52-pixel-art.html) |
| **便當盒網格 / Bento Grids** | Bento Grids is a UI style reference for general interfaces, focused on Apple-style, modular, cards, organized, clean. | [镜像 DESIGN.md](./vibeui-mirror/designs/uiuxpro-53-bento-grids/DESIGN.md) · [预览](./vibeui-mirror/previews/uiuxpro-53-bento-grids.html) |
| **新粗野主義 / Neubrutalism** | Neubrutalism is a UI style reference for general interfaces, focused on Bold, ugly-cute, raw, high contrast, flat. | [镜像 DESIGN.md](./vibeui-mirror/designs/uiuxpro-54-neubrutalism-v2/DESIGN.md) · [预览](./vibeui-mirror/previews/uiuxpro-54-neubrutalism-v2.html) |
| **空間 UI (VisionOS) / Spatial UI (VisionOS)** | Spatial UI (VisionOS) is a UI style reference for general interfaces, focused on Glass, depth, immersion, spatial, translucent. | [镜像 DESIGN.md](./vibeui-mirror/designs/uiuxpro-55-spatial-ui/DESIGN.md) · [预览](./vibeui-mirror/previews/uiuxpro-55-spatial-ui.html) |
| **電子墨水 / 紙質 / E-Ink / Paper** | E-Ink / Paper is a UI style reference for general interfaces, focused on Paper-like, matte, high contrast, texture, reading. | [镜像 DESIGN.md](./vibeui-mirror/designs/uiuxpro-56-e-ink-paper/DESIGN.md) · [预览](./vibeui-mirror/previews/uiuxpro-56-e-ink-paper.html) |
| **Z 世代混亂 / 極繁主義 / Gen Z Chaos / Maximalism** | Gen Z Chaos / Maximalism is a UI style reference for general interfaces, focused on Chaos, clutter, stickers, raw, collage. | [镜像 DESIGN.md](./vibeui-mirror/designs/uiuxpro-57-gen-z-chaos/DESIGN.md) · [预览](./vibeui-mirror/previews/uiuxpro-57-gen-z-chaos.html) |
| **仿生 / 有機 2.0 / Biomimetic / Organic 2.0** | Biomimetic / Organic 2.0 is a UI style reference for general interfaces, focused on Nature-inspired, cellular, fluid, breathing, generative. | [镜像 DESIGN.md](./vibeui-mirror/designs/uiuxpro-58-biomimetic-organic/DESIGN.md) · [预览](./vibeui-mirror/previews/uiuxpro-58-biomimetic-organic.html) |

### 落地页风格模板 / Landing Page Templates (8)

| 风格 | 简介 | 离线入口 |
|---|---|---|
| **登陸頁面 / Hero-Centric Design** | Hero-Centric Design is a UI style reference for landing pages, focused on Large hero section, compelling headline, high-contrast CTA, product showcase, value proposition. | [镜像 DESIGN.md](./vibeui-mirror/designs/uiuxpro-20-hero-centric/DESIGN.md) · [预览](./vibeui-mirror/previews/uiuxpro-20-hero-centric.html) |
| **登陸頁面 / Conversion-Optimized** | Conversion-Optimized is a UI style reference for landing pages, focused on Form-focused, minimalist design, single CTA focus, high contrast, urgency elements. | [镜像 DESIGN.md](./vibeui-mirror/designs/uiuxpro-21-conversion-optimized/DESIGN.md) · [预览](./vibeui-mirror/previews/uiuxpro-21-conversion-optimized.html) |
| **登陸頁面 / Feature-Rich Showcase** | Feature-Rich Showcase is a UI style reference for landing pages, focused on Multiple feature sections, grid layout, benefit cards, visual feature demonstrations, interactive elements. | [镜像 DESIGN.md](./vibeui-mirror/designs/uiuxpro-22-feature-rich/DESIGN.md) · [预览](./vibeui-mirror/previews/uiuxpro-22-feature-rich.html) |
| **登陸頁面 / Minimal & Direct** | Minimal & Direct is a UI style reference for landing pages, focused on Minimal text, white space heavy, single column layout, direct messaging, clean typography. | [镜像 DESIGN.md](./vibeui-mirror/designs/uiuxpro-23-minimal-direct/DESIGN.md) · [预览](./vibeui-mirror/previews/uiuxpro-23-minimal-direct.html) |
| **登陸頁面 / Social Proof-Focused** | Social Proof-Focused is a UI style reference for landing pages, focused on Testimonials prominent, client logos displayed, case studies sections, reviews/ratings, user avatars. | [镜像 DESIGN.md](./vibeui-mirror/designs/uiuxpro-24-social-proof/DESIGN.md) · [预览](./vibeui-mirror/previews/uiuxpro-24-social-proof.html) |
| **登陸頁面 / Interactive Product Demo** | Interactive Product Demo is a UI style reference for landing pages, focused on Embedded product mockup/video, interactive elements, product walkthrough, step-by-step guides, hover-to-reveal features. | [镜像 DESIGN.md](./vibeui-mirror/designs/uiuxpro-25-interactive-demo/DESIGN.md) · [预览](./vibeui-mirror/previews/uiuxpro-25-interactive-demo.html) |
| **登陸頁面 / Trust & Authority** | Trust & Authority is a UI style reference for landing pages, focused on Certificates/badges displayed, expert credentials, case studies with metrics, before/after comparisons, industry recognition. | [镜像 DESIGN.md](./vibeui-mirror/designs/uiuxpro-26-trust-authority/DESIGN.md) · [预览](./vibeui-mirror/previews/uiuxpro-26-trust-authority.html) |
| **登陸頁面 / Storytelling-Driven** | Storytelling-Driven is a UI style reference for landing pages, focused on Narrative flow, visual story progression, section transitions, consistent character/brand voice, emotional messaging. | [镜像 DESIGN.md](./vibeui-mirror/designs/uiuxpro-27-storytelling/DESIGN.md) · [预览](./vibeui-mirror/previews/uiuxpro-27-storytelling.html) |

### 分析仪表板模板 / Analytics Dashboard Templates (10)

| 风格 | 简介 | 离线入口 |
|---|---|---|
| **商業智慧/分析 / Data-Dense Dashboard** | Data-Dense Dashboard is a UI style reference for analytics and BI dashboards, focused on Multiple charts/widgets, data tables, KPI cards, minimal padding, grid layout. | [镜像 DESIGN.md](./vibeui-mirror/designs/uiuxpro-28-data-dense-dashboard/DESIGN.md) · [预览](./vibeui-mirror/previews/uiuxpro-28-data-dense-dashboard.html) |
| **商業智慧/分析 / Heat Map & Heatmap Style** | Heat Map & Heatmap Style is a UI style reference for analytics and BI dashboards, focused on Color-coded grid/matrix, data intensity visualization, geographical heat maps, correlation matrices, cell-based representation. | [镜像 DESIGN.md](./vibeui-mirror/designs/uiuxpro-29-heatmap-density/DESIGN.md) · [预览](./vibeui-mirror/previews/uiuxpro-29-heatmap-density.html) |
| **商業智慧/分析 / Executive Dashboard** | Executive Dashboard is a UI style reference for analytics and BI dashboards, focused on High-level KPIs, large key metrics, minimal detail, summary view, trend indicators. | [镜像 DESIGN.md](./vibeui-mirror/designs/uiuxpro-30-executive-summary/DESIGN.md) · [预览](./vibeui-mirror/previews/uiuxpro-30-executive-summary.html) |
| **商業智慧/分析 / Real-Time Monitoring** | Real-Time Monitoring is a UI style reference for analytics and BI dashboards, focused on Live data updates, status indicators, alert notifications, streaming data visualization, active monitoring. | [镜像 DESIGN.md](./vibeui-mirror/designs/uiuxpro-31-real-time-monitoring/DESIGN.md) · [预览](./vibeui-mirror/previews/uiuxpro-31-real-time-monitoring.html) |
| **商業智慧/分析 / Drill-Down Analytics** | Drill-Down Analytics is a UI style reference for analytics and BI dashboards, focused on Hierarchical data exploration, expandable sections, interactive drill-down paths, summary-to-detail flow, context preservation. | [镜像 DESIGN.md](./vibeui-mirror/designs/uiuxpro-32-drill-down-analytics/DESIGN.md) · [预览](./vibeui-mirror/previews/uiuxpro-32-drill-down-analytics.html) |
| **商業智慧/分析 / Comparative Analysis Dashboard** | Comparative Analysis Dashboard is a UI style reference for analytics and BI dashboards, focused on Side-by-side comparisons, period-over-period metrics, A/B test results, regional comparisons, performance benchmarks. | [镜像 DESIGN.md](./vibeui-mirror/designs/uiuxpro-33-comparative-analytics/DESIGN.md) · [预览](./vibeui-mirror/previews/uiuxpro-33-comparative-analytics.html) |
| **商業智慧/分析 / Predictive Analytics** | Predictive Analytics is a UI style reference for analytics and BI dashboards, focused on Forecast lines, confidence intervals, trend projections, scenario modeling, AI-driven insights. | [镜像 DESIGN.md](./vibeui-mirror/designs/uiuxpro-34-predictive-analytics/DESIGN.md) · [预览](./vibeui-mirror/previews/uiuxpro-34-predictive-analytics.html) |
| **商業智慧/分析 / User Behavior Analytics** | User Behavior Analytics is a UI style reference for analytics and BI dashboards, focused on Funnel visualization, user flow diagrams, conversion tracking, engagement metrics, user journey mapping. | [镜像 DESIGN.md](./vibeui-mirror/designs/uiuxpro-35-user-behavior-analytics/DESIGN.md) · [预览](./vibeui-mirror/previews/uiuxpro-35-user-behavior-analytics.html) |
| **商業智慧/分析 / Financial Dashboard** | Financial Dashboard is a UI style reference for analytics and BI dashboards, focused on Revenue metrics, profit/loss visualization, budget tracking, financial ratios, portfolio performance. | [镜像 DESIGN.md](./vibeui-mirror/designs/uiuxpro-36-financial-analytics/DESIGN.md) · [预览](./vibeui-mirror/previews/uiuxpro-36-financial-analytics.html) |
| **商業智慧/分析 / Sales Intelligence Dashboard** | Sales Intelligence Dashboard is a UI style reference for analytics and BI dashboards, focused on Deal pipeline, sales metrics, territory performance, sales rep leaderboard, win-loss analysis. | [镜像 DESIGN.md](./vibeui-mirror/designs/uiuxpro-37-sales-intelligence/DESIGN.md) · [预览](./vibeui-mirror/previews/uiuxpro-37-sales-intelligence.html) |

## VibeUI 重叠预览补充（54）

以下设计已由本地 58 站正式覆盖，不重复计入 116 个唯一参考；镜像 `DESIGN.md` 和明暗预览继续保留，用于快速视觉核对。

### AI 与机器学习 / AI & Machine Learning (12)

| 风格 | 简介 | 本地正式入口 | VibeUI 离线补充 |
|---|---|---|---|
| **Claude** | Anthropic's AI assistant. Warm terracotta accent, clean editorial layout | [58 站 DESIGN.md](./design-systems/claude/DESIGN.md) | [镜像 DESIGN.md](./vibeui-mirror/designs/claude/DESIGN.md) · [预览](./vibeui-mirror/previews/claude.html) · [暗色预览](./vibeui-mirror/previews/claude-dark.html) |
| **Cohere** | Enterprise AI platform. Vibrant gradients, data-rich dashboard aesthetic | [58 站 DESIGN.md](./design-systems/cohere/DESIGN.md) | [镜像 DESIGN.md](./vibeui-mirror/designs/cohere/DESIGN.md) · [预览](./vibeui-mirror/previews/cohere.html) · [暗色预览](./vibeui-mirror/previews/cohere-dark.html) |
| **ElevenLabs** | AI voice platform. Dark cinematic UI, audio-waveform aesthetics | [58 站 DESIGN.md](./design-systems/elevenlabs/DESIGN.md) | [镜像 DESIGN.md](./vibeui-mirror/designs/elevenlabs/DESIGN.md) · [预览](./vibeui-mirror/previews/elevenlabs.html) · [暗色预览](./vibeui-mirror/previews/elevenlabs-dark.html) |
| **Minimax** | AI model provider. Bold dark interface with neon accents | [58 站 DESIGN.md](./design-systems/minimax/DESIGN.md) | [镜像 DESIGN.md](./vibeui-mirror/designs/minimax/DESIGN.md) · [预览](./vibeui-mirror/previews/minimax.html) · [暗色预览](./vibeui-mirror/previews/minimax-dark.html) |
| **Mistral AI** | Open-weight LLM provider. French-engineered minimalism, purple-toned | [58 站 DESIGN.md](./design-systems/mistral.ai/DESIGN.md) | [镜像 DESIGN.md](./vibeui-mirror/designs/mistral.ai/DESIGN.md) · [预览](./vibeui-mirror/previews/mistral.ai.html) · [暗色预览](./vibeui-mirror/previews/mistral.ai-dark.html) |
| **Ollama** | Run LLMs locally. Terminal-first, monochrome simplicity | [58 站 DESIGN.md](./design-systems/ollama/DESIGN.md) | [镜像 DESIGN.md](./vibeui-mirror/designs/ollama/DESIGN.md) · [预览](./vibeui-mirror/previews/ollama.html) · [暗色预览](./vibeui-mirror/previews/ollama-dark.html) |
| **OpenCode AI** | AI coding platform. Developer-centric dark theme | [58 站 DESIGN.md](./design-systems/opencode.ai/DESIGN.md) | [镜像 DESIGN.md](./vibeui-mirror/designs/opencode.ai/DESIGN.md) · [预览](./vibeui-mirror/previews/opencode.ai.html) · [暗色预览](./vibeui-mirror/previews/opencode.ai-dark.html) |
| **Replicate** | Run ML models via API. Clean white canvas, code-forward | [58 站 DESIGN.md](./design-systems/replicate/DESIGN.md) | [镜像 DESIGN.md](./vibeui-mirror/designs/replicate/DESIGN.md) · [预览](./vibeui-mirror/previews/replicate.html) · [暗色预览](./vibeui-mirror/previews/replicate-dark.html) |
| **RunwayML** | AI video generation. Cinematic dark UI, media-rich layout | [58 站 DESIGN.md](./design-systems/runwayml/DESIGN.md) | [镜像 DESIGN.md](./vibeui-mirror/designs/runwayml/DESIGN.md) · [预览](./vibeui-mirror/previews/runwayml.html) · [暗色预览](./vibeui-mirror/previews/runwayml-dark.html) |
| **Together AI** | Open-source AI infrastructure. Technical, blueprint-style design | [58 站 DESIGN.md](./design-systems/together.ai/DESIGN.md) | [镜像 DESIGN.md](./vibeui-mirror/designs/together.ai/DESIGN.md) · [预览](./vibeui-mirror/previews/together.ai.html) · [暗色预览](./vibeui-mirror/previews/together.ai-dark.html) |
| **VoltAgent** | AI agent framework. Void-black canvas, emerald accent, terminal-native | [58 站 DESIGN.md](./design-systems/voltagent/DESIGN.md) | [镜像 DESIGN.md](./vibeui-mirror/designs/voltagent/DESIGN.md) · [预览](./vibeui-mirror/previews/voltagent.html) · [暗色预览](./vibeui-mirror/previews/voltagent-dark.html) |
| **xAI** | Elon Musk's AI lab. Stark monochrome, futuristic minimalism | [58 站 DESIGN.md](./design-systems/x.ai/DESIGN.md) | [镜像 DESIGN.md](./vibeui-mirror/designs/x.ai/DESIGN.md) · [预览](./vibeui-mirror/previews/x.ai.html) · [暗色预览](./vibeui-mirror/previews/x.ai-dark.html) |

### 开发工具与平台 / Developer Tools & Platforms (14)

| 风格 | 简介 | 本地正式入口 | VibeUI 离线补充 |
|---|---|---|---|
| **Cursor** | AI-first code editor. Sleek dark interface, gradient accents | [58 站 DESIGN.md](./design-systems/cursor/DESIGN.md) | [镜像 DESIGN.md](./vibeui-mirror/designs/cursor/DESIGN.md) · [预览](./vibeui-mirror/previews/cursor.html) · [暗色预览](./vibeui-mirror/previews/cursor-dark.html) |
| **Expo** | React Native platform. Dark theme, tight letter-spacing, code-centric | [58 站 DESIGN.md](./design-systems/expo/DESIGN.md) | [镜像 DESIGN.md](./vibeui-mirror/designs/expo/DESIGN.md) · [预览](./vibeui-mirror/previews/expo.html) · [暗色预览](./vibeui-mirror/previews/expo-dark.html) |
| **Linear** | Project management for engineers. Ultra-minimal, precise, purple accent | [58 站 DESIGN.md](./design-systems/linear.app/DESIGN.md) | [镜像 DESIGN.md](./vibeui-mirror/designs/linear.app/DESIGN.md) · [预览](./vibeui-mirror/previews/linear.app.html) · [暗色预览](./vibeui-mirror/previews/linear.app-dark.html) |
| **Lovable** | AI full-stack builder. Playful gradients, friendly dev aesthetic | [58 站 DESIGN.md](./design-systems/lovable/DESIGN.md) | [镜像 DESIGN.md](./vibeui-mirror/designs/lovable/DESIGN.md) · [预览](./vibeui-mirror/previews/lovable.html) · [暗色预览](./vibeui-mirror/previews/lovable-dark.html) |
| **Mintlify** | Documentation platform. Clean, green-accented, reading-optimized | [58 站 DESIGN.md](./design-systems/mintlify/DESIGN.md) | [镜像 DESIGN.md](./vibeui-mirror/designs/mintlify/DESIGN.md) · [预览](./vibeui-mirror/previews/mintlify.html) · [暗色预览](./vibeui-mirror/previews/mintlify-dark.html) |
| **PostHog** | Product analytics. Playful hedgehog branding, developer-friendly dark UI | [58 站 DESIGN.md](./design-systems/posthog/DESIGN.md) | [镜像 DESIGN.md](./vibeui-mirror/designs/posthog/DESIGN.md) · [预览](./vibeui-mirror/previews/posthog.html) · [暗色预览](./vibeui-mirror/previews/posthog-dark.html) |
| **Raycast** | Productivity launcher. Sleek dark chrome, vibrant gradient accents | [58 站 DESIGN.md](./design-systems/raycast/DESIGN.md) | [镜像 DESIGN.md](./vibeui-mirror/designs/raycast/DESIGN.md) · [预览](./vibeui-mirror/previews/raycast.html) · [暗色预览](./vibeui-mirror/previews/raycast-dark.html) |
| **Resend** | Email API for developers. Minimal dark theme, monospace accents | [58 站 DESIGN.md](./design-systems/resend/DESIGN.md) | [镜像 DESIGN.md](./vibeui-mirror/designs/resend/DESIGN.md) · [预览](./vibeui-mirror/previews/resend.html) · [暗色预览](./vibeui-mirror/previews/resend-dark.html) |
| **Sentry** | Error monitoring. Dark dashboard, data-dense, pink-purple accent | [58 站 DESIGN.md](./design-systems/sentry/DESIGN.md) | [镜像 DESIGN.md](./vibeui-mirror/designs/sentry/DESIGN.md) · [预览](./vibeui-mirror/previews/sentry.html) · [暗色预览](./vibeui-mirror/previews/sentry-dark.html) |
| **Supabase** | Open-source Firebase alternative. Dark emerald theme, code-first | [58 站 DESIGN.md](./design-systems/supabase/DESIGN.md) | [镜像 DESIGN.md](./vibeui-mirror/designs/supabase/DESIGN.md) · [预览](./vibeui-mirror/previews/supabase.html) · [暗色预览](./vibeui-mirror/previews/supabase-dark.html) |
| **Superhuman** | Fast email client. Premium dark UI, keyboard-first, purple glow | [58 站 DESIGN.md](./design-systems/superhuman/DESIGN.md) | [镜像 DESIGN.md](./vibeui-mirror/designs/superhuman/DESIGN.md) · [预览](./vibeui-mirror/previews/superhuman.html) · [暗色预览](./vibeui-mirror/previews/superhuman-dark.html) |
| **Vercel** | Frontend deployment platform. Black and white precision, Geist font | [58 站 DESIGN.md](./design-systems/vercel/DESIGN.md) | [镜像 DESIGN.md](./vibeui-mirror/designs/vercel/DESIGN.md) · [预览](./vibeui-mirror/previews/vercel.html) · [暗色预览](./vibeui-mirror/previews/vercel-dark.html) |
| **Warp** | Modern terminal. Dark IDE-like interface, block-based command UI | [58 站 DESIGN.md](./design-systems/warp/DESIGN.md) | [镜像 DESIGN.md](./vibeui-mirror/designs/warp/DESIGN.md) · [预览](./vibeui-mirror/previews/warp.html) · [暗色预览](./vibeui-mirror/previews/warp-dark.html) |
| **Zapier** | Automation platform. Warm orange, friendly illustration-driven | [58 站 DESIGN.md](./design-systems/zapier/DESIGN.md) | [镜像 DESIGN.md](./vibeui-mirror/designs/zapier/DESIGN.md) · [预览](./vibeui-mirror/previews/zapier.html) · [暗色预览](./vibeui-mirror/previews/zapier-dark.html) |

### 基础设施与云 / Infrastructure & Cloud (6)

| 风格 | 简介 | 本地正式入口 | VibeUI 离线补充 |
|---|---|---|---|
| **ClickHouse** | Fast analytics database. Yellow-accented, technical documentation style | [58 站 DESIGN.md](./design-systems/clickhouse/DESIGN.md) | [镜像 DESIGN.md](./vibeui-mirror/designs/clickhouse/DESIGN.md) · [预览](./vibeui-mirror/previews/clickhouse.html) · [暗色预览](./vibeui-mirror/previews/clickhouse-dark.html) |
| **Composio** | Tool integration platform. Modern dark with colorful integration icons | [58 站 DESIGN.md](./design-systems/composio/DESIGN.md) | [镜像 DESIGN.md](./vibeui-mirror/designs/composio/DESIGN.md) · [预览](./vibeui-mirror/previews/composio.html) · [暗色预览](./vibeui-mirror/previews/composio-dark.html) |
| **HashiCorp** | Infrastructure automation. Enterprise-clean, black and white | [58 站 DESIGN.md](./design-systems/hashicorp/DESIGN.md) | [镜像 DESIGN.md](./vibeui-mirror/designs/hashicorp/DESIGN.md) · [预览](./vibeui-mirror/previews/hashicorp.html) · [暗色预览](./vibeui-mirror/previews/hashicorp-dark.html) |
| **MongoDB** | Document database. Green leaf branding, developer documentation focus | [58 站 DESIGN.md](./design-systems/mongodb/DESIGN.md) | [镜像 DESIGN.md](./vibeui-mirror/designs/mongodb/DESIGN.md) · [预览](./vibeui-mirror/previews/mongodb.html) · [暗色预览](./vibeui-mirror/previews/mongodb-dark.html) |
| **Sanity** | Headless CMS. Red accent, content-first editorial layout | [58 站 DESIGN.md](./design-systems/sanity/DESIGN.md) | [镜像 DESIGN.md](./vibeui-mirror/designs/sanity/DESIGN.md) · [预览](./vibeui-mirror/previews/sanity.html) · [暗色预览](./vibeui-mirror/previews/sanity-dark.html) |
| **Stripe** | Payment infrastructure. Signature purple gradients, weight-300 elegance | [58 站 DESIGN.md](./design-systems/stripe/DESIGN.md) | [镜像 DESIGN.md](./vibeui-mirror/designs/stripe/DESIGN.md) · [预览](./vibeui-mirror/previews/stripe.html) · [暗色预览](./vibeui-mirror/previews/stripe-dark.html) |

### 设计与生产力 / Design & Productivity (10)

| 风格 | 简介 | 本地正式入口 | VibeUI 离线补充 |
|---|---|---|---|
| **Airtable** | Spreadsheet-database hybrid. Colorful, friendly, structured data aesthetic | [58 站 DESIGN.md](./design-systems/airtable/DESIGN.md) | [镜像 DESIGN.md](./vibeui-mirror/designs/airtable/DESIGN.md) · [预览](./vibeui-mirror/previews/airtable.html) · [暗色预览](./vibeui-mirror/previews/airtable-dark.html) |
| **Cal.com** | Open-source scheduling. Clean neutral UI, developer-oriented simplicity | [58 站 DESIGN.md](./design-systems/cal/DESIGN.md) | [镜像 DESIGN.md](./vibeui-mirror/designs/cal/DESIGN.md) · [预览](./vibeui-mirror/previews/cal.html) · [暗色预览](./vibeui-mirror/previews/cal-dark.html) |
| **Clay** | Creative agency. Organic shapes, soft gradients, art-directed layout | [58 站 DESIGN.md](./design-systems/clay/DESIGN.md) | [镜像 DESIGN.md](./vibeui-mirror/designs/clay/DESIGN.md) · [预览](./vibeui-mirror/previews/clay.html) · [暗色预览](./vibeui-mirror/previews/clay-dark.html) |
| **Figma** | Collaborative design tool. Vibrant multi-color, playful yet professional | [58 站 DESIGN.md](./design-systems/figma/DESIGN.md) | [镜像 DESIGN.md](./vibeui-mirror/designs/figma/DESIGN.md) · [预览](./vibeui-mirror/previews/figma.html) · [暗色预览](./vibeui-mirror/previews/figma-dark.html) |
| **Framer** | Website builder. Bold black and blue, motion-first, design-forward | [58 站 DESIGN.md](./design-systems/framer/DESIGN.md) | [镜像 DESIGN.md](./vibeui-mirror/designs/framer/DESIGN.md) · [预览](./vibeui-mirror/previews/framer.html) · [暗色预览](./vibeui-mirror/previews/framer-dark.html) |
| **Intercom** | Customer messaging. Friendly blue palette, conversational UI patterns | [58 站 DESIGN.md](./design-systems/intercom/DESIGN.md) | [镜像 DESIGN.md](./vibeui-mirror/designs/intercom/DESIGN.md) · [预览](./vibeui-mirror/previews/intercom.html) · [暗色预览](./vibeui-mirror/previews/intercom-dark.html) |
| **Miro** | Visual collaboration. Bright yellow accent, infinite canvas aesthetic | [58 站 DESIGN.md](./design-systems/miro/DESIGN.md) | [镜像 DESIGN.md](./vibeui-mirror/designs/miro/DESIGN.md) · [预览](./vibeui-mirror/previews/miro.html) · [暗色预览](./vibeui-mirror/previews/miro-dark.html) |
| **Notion** | All-in-one workspace. Warm minimalism, serif headings, soft surfaces | [58 站 DESIGN.md](./design-systems/notion/DESIGN.md) | [镜像 DESIGN.md](./vibeui-mirror/designs/notion/DESIGN.md) · [预览](./vibeui-mirror/previews/notion.html) · [暗色预览](./vibeui-mirror/previews/notion-dark.html) |
| **Pinterest** | Visual discovery platform. Red accent, masonry grid, image-first | [58 站 DESIGN.md](./design-systems/pinterest/DESIGN.md) | [镜像 DESIGN.md](./vibeui-mirror/designs/pinterest/DESIGN.md) · [预览](./vibeui-mirror/previews/pinterest.html) · [暗色预览](./vibeui-mirror/previews/pinterest-dark.html) |
| **Webflow** | Visual web builder. Blue-accented, polished marketing site aesthetic | [58 站 DESIGN.md](./design-systems/webflow/DESIGN.md) | [镜像 DESIGN.md](./vibeui-mirror/designs/webflow/DESIGN.md) · [预览](./vibeui-mirror/previews/webflow.html) · [暗色预览](./vibeui-mirror/previews/webflow-dark.html) |

### 金融与加密 / Fintech & Crypto (4)

| 风格 | 简介 | 本地正式入口 | VibeUI 离线补充 |
|---|---|---|---|
| **Coinbase** | Crypto exchange. Clean blue identity, trust-focused, institutional feel | [58 站 DESIGN.md](./design-systems/coinbase/DESIGN.md) | [镜像 DESIGN.md](./vibeui-mirror/designs/coinbase/DESIGN.md) · [预览](./vibeui-mirror/previews/coinbase.html) · [暗色预览](./vibeui-mirror/previews/coinbase-dark.html) |
| **Kraken** | Crypto trading platform. Purple-accented dark UI, data-dense dashboards | [58 站 DESIGN.md](./design-systems/kraken/DESIGN.md) | [镜像 DESIGN.md](./vibeui-mirror/designs/kraken/DESIGN.md) · [预览](./vibeui-mirror/previews/kraken.html) · [暗色预览](./vibeui-mirror/previews/kraken-dark.html) |
| **Revolut** | Digital banking. Sleek dark interface, gradient cards, fintech precision | [58 站 DESIGN.md](./design-systems/revolut/DESIGN.md) | [镜像 DESIGN.md](./vibeui-mirror/designs/revolut/DESIGN.md) · [预览](./vibeui-mirror/previews/revolut.html) · [暗色预览](./vibeui-mirror/previews/revolut-dark.html) |
| **Wise** | International money transfer. Bright green accent, friendly and clear | [58 站 DESIGN.md](./design-systems/wise/DESIGN.md) | [镜像 DESIGN.md](./vibeui-mirror/designs/wise/DESIGN.md) · [预览](./vibeui-mirror/previews/wise.html) · [暗色预览](./vibeui-mirror/previews/wise-dark.html) |

### 企业与消费 / Enterprise & Consumer (8)

| 风格 | 简介 | 本地正式入口 | VibeUI 离线补充 |
|---|---|---|---|
| **Airbnb** | Travel marketplace. Warm coral accent, photography-driven, rounded UI | [58 站 DESIGN.md](./design-systems/airbnb/DESIGN.md) | [镜像 DESIGN.md](./vibeui-mirror/designs/airbnb/DESIGN.md) · [预览](./vibeui-mirror/previews/airbnb.html) · [暗色预览](./vibeui-mirror/previews/airbnb-dark.html) |
| **Apple** | Consumer electronics. Premium white space, SF Pro, cinematic imagery | [58 站 DESIGN.md](./design-systems/apple/DESIGN.md) | [镜像 DESIGN.md](./vibeui-mirror/designs/apple/DESIGN.md) · [预览](./vibeui-mirror/previews/apple.html) · [暗色预览](./vibeui-mirror/previews/apple-dark.html) |
| **BMW** | Luxury automotive. Dark premium surfaces, precise German engineering aesthetic | [58 站 DESIGN.md](./design-systems/bmw/DESIGN.md) | [镜像 DESIGN.md](./vibeui-mirror/designs/bmw/DESIGN.md) · [预览](./vibeui-mirror/previews/bmw.html) · [暗色预览](./vibeui-mirror/previews/bmw-dark.html) |
| **IBM** | Enterprise technology. Carbon design system, structured blue palette | [58 站 DESIGN.md](./design-systems/ibm/DESIGN.md) | [镜像 DESIGN.md](./vibeui-mirror/designs/ibm/DESIGN.md) · [预览](./vibeui-mirror/previews/ibm.html) · [暗色预览](./vibeui-mirror/previews/ibm-dark.html) |
| **NVIDIA** | GPU computing. Green-black energy, technical power aesthetic | [58 站 DESIGN.md](./design-systems/nvidia/DESIGN.md) | [镜像 DESIGN.md](./vibeui-mirror/designs/nvidia/DESIGN.md) · [预览](./vibeui-mirror/previews/nvidia.html) · [暗色预览](./vibeui-mirror/previews/nvidia-dark.html) |
| **SpaceX** | Space technology. Stark black and white, full-bleed imagery, futuristic | [58 站 DESIGN.md](./design-systems/spacex/DESIGN.md) | [镜像 DESIGN.md](./vibeui-mirror/designs/spacex/DESIGN.md) · [预览](./vibeui-mirror/previews/spacex.html) · [暗色预览](./vibeui-mirror/previews/spacex-dark.html) |
| **Spotify** | Music streaming. Vibrant green on dark, bold type, album-art-driven | [58 站 DESIGN.md](./design-systems/spotify/DESIGN.md) | [镜像 DESIGN.md](./vibeui-mirror/designs/spotify/DESIGN.md) · [预览](./vibeui-mirror/previews/spotify.html) · [暗色预览](./vibeui-mirror/previews/spotify-dark.html) |
| **Uber** | Mobility platform. Bold black and white, tight type, urban energy | [58 站 DESIGN.md](./design-systems/uber/DESIGN.md) | [镜像 DESIGN.md](./vibeui-mirror/designs/uber/DESIGN.md) · [预览](./vibeui-mirror/previews/uber.html) · [暗色预览](./vibeui-mirror/previews/uber-dark.html) |

## 未包含在 VibeUI 索引的本地设计系统

以下本地品牌/产品设计系统不在当前 VibeUI UI 索引中，仍可作为品牌 DNA 参考直接使用：

- `ferrari`
- `lamborghini`
- `renault`
- `tesla`

## 刷新与校验

```bash
# 重建完整离线镜像（需要联网）
node scripts/qiaomu-vibeui-sync.mjs

# 纯离线校验，不访问 VibeUI 或 CDN
node scripts/qiaomu-vibeui-sync.mjs --check

# 主动检查上游是否变化
node scripts/qiaomu-vibeui-sync.mjs --check-upstream
```

`--check` 校验本地文件、尺寸、SHA-256 和 Markdown 清单；`--check-upstream` 只检查上游数据源版本，不下载镜像。
