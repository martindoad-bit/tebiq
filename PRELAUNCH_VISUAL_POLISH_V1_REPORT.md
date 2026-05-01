# Prelaunch Visual Polish v1 Report

## 基线
- branch: `codex/prelaunch-visual-polish-v1`
- base: `origin/main` at `e436504`
- started at: 2026-05-01

## 本轮目标
- UI 精细度：在不改功能和文案架构的前提下，收紧比例、边界和控件高度。
- 移动端成熟度：检查 320 / 375 / 393 / 430 / 768 五档视口。
- 信息层级：让首页更像 App 入口，让 answer 页更像办事卡。
- 空态统一：保持低噪声、系统语气。
- 文案克制：未新增营销语、插画、渐变或强警示色。

## 修改范围
| 页面 | 修改内容 | 是否涉及逻辑 |
|---|---|---|
| `/` | 放大 header logo 和首屏主句；调整提问框、按钮、chips、快捷工具卡片比例；tab 页面隐藏 footer | 否 |
| `/answer/demo-*` | 调整标题、问题灰底、结论灰底、编号样式、section 间距、来源与反馈区域 | 否 |
| `/photo/sample-result` | 强化文书事实表和行动列表层级；调整 CTA 高度、圆角和卡片间距 | 否 |
| `/check` | 精修顶部签证卡、横向签证切换、维度列表行距和徽章密度 | 否 |
| `/timeline` | 精修过滤器、跟踪区块和空态预览容器 | 否 |
| `/login` | 只调整 logo、卡片、tab、输入框高度与圆角 | 否 |
| `/admin/review-lite` | 原始问题和 answer draft 更醒目；审核控件更容易点击 | 否 |
| `AppShell` | 有底部 tab 的 App 页面不再显示隐私 footer；登录等无 tab 页保留 | 否 |

## 没有修改的范围
- `app/api/**`
- `lib/db/**`
- `lib/photo/**`
- `lib/stripe/**`
- `lib/notifications/**`
- answer engine / 字段含义 / 数据读取逻辑
- 认证 API 和登录流程逻辑

## 字体层级调整
- 首页主句使用 `clamp(30px, 8.8vw, 38px)`，保持 320 宽度不挤，768 宽度不空。
- Answer 标题使用 `clamp(21px, 5.8vw, 25px)`，避免长问题在小屏上像文档标题。
- 列表正文从 12px 局部提升到 13px，关键两步提升到 14px。
- 仍保持 `font-medium` 为上限，未新增 600/700 字重。

## 截图
- 目录：`docs/visual-report/screenshots/prelaunch-visual-polish-v1/`
- 320: `320-home.png`, `320-answer-demo-matched.png`, `320-answer-demo-draft.png`, `320-answer-demo-cannot-determine.png`, `320-photo-sample-result.png`, `320-check.png`, `320-timeline.png`, `320-login.png`, `320-admin-review-lite.png`
- 375: `375-home.png`, `375-answer-demo-matched.png`, `375-answer-demo-draft.png`, `375-answer-demo-cannot-determine.png`, `375-photo-sample-result.png`, `375-check.png`, `375-timeline.png`, `375-login.png`, `375-admin-review-lite.png`
- 393: `393-home.png`, `393-answer-demo-matched.png`, `393-answer-demo-draft.png`, `393-answer-demo-cannot-determine.png`, `393-photo-sample-result.png`, `393-check.png`, `393-timeline.png`, `393-login.png`, `393-admin-review-lite.png`
- 430: `430-home.png`, `430-answer-demo-matched.png`, `430-answer-demo-draft.png`, `430-answer-demo-cannot-determine.png`, `430-photo-sample-result.png`, `430-check.png`, `430-timeline.png`, `430-login.png`, `430-admin-review-lite.png`
- 768: `768-home.png`, `768-answer-demo-matched.png`, `768-answer-demo-draft.png`, `768-answer-demo-cannot-determine.png`, `768-photo-sample-result.png`, `768-check.png`, `768-timeline.png`, `768-login.png`, `768-admin-review-lite.png`

## 待创始人 Review
1. 首页空输入时按钮仍是 disabled 状态，但视觉上比原先更接近主操作；是否希望空输入点击后给 inline 提示，留给后续产品决定。
2. `/check` 维度列表的信息密度较高，本轮只做视觉收紧，没有改字段或内容截断策略。
3. `AppShell` 对 tab 页面隐藏 footer，登录页仍保留隐私链接；如果合规要求所有页面都露出，可改为低调入口。

## 自评
当前视觉成熟度：比 app-final 版本更像可上线 App，尤其是首页、answer 页和 sample result 的信息层级更稳。

下一轮还值得继续提升的地方：真实数据态下 `/timeline/[id]` 详情页、长 answer 的折叠节奏、以及 `/check/[visa]/[dimension]` 深层页面的行距和表单控件。
