# Visual Polish 12 Report

最后更新：2026-04-29

## 目标

本轮推翻 Visual Polish 2.x 的暖色卡片框架，改成「东京电车」式工具界面：精确、冷静、克制，以数字、日期、列表行、分隔线作为主要视觉语言。

## Image 2.0 概念迭代

本轮调用 Image 2.0 共 9 次。

- Round 1：8 张 1242x2688 页面高保真图，覆盖主页 A/B/C、拍照页、识别结果、时间线、定价、自查清单。
- Round 2：1 张最终系统板，用于校准 token、组件和 4 个核心 screen thumbnail。

保留为参考的文件：

- `docs/visual-polish-12/concepts/round-1/01-home-archive.png`
- `docs/visual-polish-12/concepts/round-1/02-home-new.png`
- `docs/visual-polish-12/concepts/round-1/03-home-trial.png`
- `docs/visual-polish-12/concepts/round-1/04-photo.png`
- `docs/visual-polish-12/concepts/round-1/05-photo-result.png`
- `docs/visual-polish-12/concepts/round-1/06-timeline.png`
- `docs/visual-polish-12/concepts/round-1/07-pricing.png`
- `docs/visual-polish-12/concepts/round-1/08-check.png`
- `docs/visual-polish-12/concepts/round-2/final-system-board.png`

实现时主动丢弃了概念图里的瑕疵：拍照页出现的 crown 装饰图标、pricing 里的营销解释感、部分 phone mock 的柔和阴影。

## 视觉系统变更

新 token 已落到 `tailwind.config.ts`、`app/globals.css` 和 `components/ui/design-tokens.ts`。

- 主色：`#0F2544`
- 背景：`#FAFAF7` / `#F2F4F7`
- 卡片：`#FFFFFF`
- 边线：`#E5E7EB`
- 次文字：`#6B7280`
- 辅助文字：`#9AA0AC`
- 警示：`#F3A32B`，只用于真实期限警示
- 字重：300 / 400 / 500
- 数字：tabular nums，大数字 300 weight
- 阴影：默认关闭，仅保留 focus ring
- 圆角：卡片 14px，按钮 10px，tag 8px
- 列表行：56px 起，分隔线优先于卡片堆叠

`PROJECT_MEMORY.md` 的视觉规范段已更新为 Visual Polish 12，后续维护以该段为准。

## 组件与页面

新增 `components/ui/tebiq.tsx`：

- `StatusBadge`
- `RiskMark`
- `SectionLabel`
- `ListSection`
- `ListRow`
- `DeadlineRow`
- `PrimaryButton`
- `SecondaryLink`

核心页面已重做：

- `/`：新用户视图、档案概览视图、试用期条。主页从「今日相关卡片」改为数字档案概览 + 常用工具列表 + 30 天期限事项。
- `/photo`：无深色卡片、无凸起 tab、无多彩提示；主操作改为白底 dashed capture zone。
- `/photo/result/[id]`：文书类型、机构、期限、金额改为事实行；归档提示和提醒入口降噪。
- `/timeline`：从时间线 feed 改为银行/邮便局列表语法。
- `/pricing`：免费/月度/年度三段式，年度选中，不用推荐火焰/营销 badge。
- `/check`：从插画 landing 改为维度清单视图。
- `/ask`：输入框 affordance、结果块、相关知识模块降噪。
- `/tools`：4 个核心工具 2x2，小图标、灰底、任务清单为即将开放。

同步清理：

- v5 AppShell/AppBar/Button/TabBar/RelatedKnowledge
- 拍照 loading/error/quota modal/recent list/fallback/detail
- 自查结果里的旧红绿高饱和视觉、`立即`、`✓/✗`
- SEO article shell、soon card、empty visual、sample package、旧 MobileNav 的旧色值

## 截图

Playwright 已按 5 档视口截图：320 / 375 / 393 / 430 / 768。

截图目录：

- `docs/visual-polish-12/screenshots/320/`
- `docs/visual-polish-12/screenshots/375/`
- `docs/visual-polish-12/screenshots/393/`
- `docs/visual-polish-12/screenshots/430/`
- `docs/visual-polish-12/screenshots/768/`

每档包含：

- `home.png`
- `photo.png`
- `check.png`
- `pricing.png`
- `timeline.png`
- `ask.png`
- `tools.png`

另有 smoke 截图保留在 `docs/visual-polish-12/screenshots/smoke-*.png`。

## 验证

- `npm run lint` 通过
- `npm run build` 通过
- 禁用词与旧色扫描通过：用户可见 app 代码中不再出现 `立即/马上/快速`、`✓/✗`、旧 `#E56F4F`、旧红绿硬编码
- 未触碰 `.env*`
- 未触碰 `app/api/*`、`lib/db/*`、migrations

## 已知限制

- `/photo/result/[id]` 真实结果页需要实际文档 id 才能截图；本轮以代码验证和 Image 2.0 结果页概念图校准。
- 主页有档案/试用期状态依赖真实 session 和 timeline 数据；本轮实现了视觉分支，但本地截图以未登录新用户态为主。
- 仍保留少量业务命名里的 `red/yellow/green` TypeScript union，这是逻辑语义，不再映射成高饱和视觉。

## Review 重点

- 主页是否足够像工具，而不是 landing。
- 拍照页是否还保留了太多 App 助手感。
- `/check` 从 landing 改清单后，用户是否能理解「完整自查」入口。
- 定价页的 ¥980/月与 ¥8,800/年是否符合当前商业决策。
- 深墨蓝 + 灰度系统是否比上一版更成熟，但不至于过冷。
