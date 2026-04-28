# CODEX Visual Polish 2 Report

分支：`codex/visual-polish-2`
基线：`origin/claude/block-7`
目标：推翻旧蓝橙框架，也推翻 2.0 版过冷的灰绿/赤金框架，把 TEBIQ 拉回「成熟、有生命力、可信的在日生活工具」。

## 1. 视觉方向调整

### 配色：推翻前后

| 项目 | 原框架 | 2.1 框架 | 判断 |
| --- | --- | --- | --- |
| 主色 | 信赖蓝 `#1E3A5F` / 2.0 墨绿 `#233B37` | 深海军蓝 `#18324A` | 保留信任感，但不做政府站蓝，也不走死灰墨绿 |
| 强调 | 明橙 `#F6B133` / 2.0 赤金 `#C49A5A` | 珊瑚赤 `#E56F4F` | 比旧橙成熟，比赤金更有生命力，CTA 清楚但不吵 |
| 背景 | 柔和米 `#FFF5E6` / 2.0 冷纸灰 `#F6F4EF` | 温暖纸白 `#FAF7F1` | 不发黄，也不灰沉，适合长期阅读 |
| 卡片 | 白 + 蓝系阴影 / 冷白灰 | `#FFFFFF` + 蓝灰中性阴影 | 页面更干净，层次更清楚 |
| 辅助 | 蓝灰 / 绿 / 红 / 灰 | 浅蓝灰 `#EAF3F7`、成功 `#2E7D65`、警示 `#C64F45`、正文灰 `#405161` | 从「蓝橙 App」和「灰绿文具」之间抽离，回到成熟移动工具 |

主要落地文件：
- `tailwind.config.ts`
- `app/globals.css`
- v5 shell / button / tab tokens
- 邮件模板、材料包样式、结果页提示条等旧色硬编码扫尾

### 字体

- 字体栈加入 `"Yu Gothic"` / `"YuGothic"`，让日文术语在系统可用时更接近日式工具产品。
- 全局启用 `font-feature-settings: 'kern' 1, 'palt' 1, 'pkna' 1`。
- 中文 letter-spacing 保持 0；日文术语容器可用 `0.015em`。
- 日期、金额、计数使用 numeric 字体栈和 tabular-nums。

### 圆角 / 阴影 / 图标

- 卡片回到 16px，按钮 14px，chip 10px。2.0 的 9-10px 过冷，这里让核心行动区更亲和。
- 阴影使用蓝灰中性低透明度层级；CTA 只保留轻微珊瑚赤投影。
- 小图标 stroke-width 约 1.5-1.7；清掉旧 `#1E3A5F` / `#F6B133` 硬编码。

## 2. 插画处理

GPT Image 2 调用次数：`5`

原因：创始人明确要求不要再用 SVG 主视觉，这次改用 Image 2.0 生成更成熟的 bitmap 静物，并把人物、吉祥物、礼物盒、清单角色全部排除。

最终使用的插画资产：
- `public/illustrations/renewal-check-wide-image2.png`
- `public/illustrations/invite-share-wide-image2.png`
- `public/illustrations/empty-state-image2.png`

本轮删除了不再使用的旧 SVG / 旧竖版素材，避免后续维护时误接回旧风格。

风格：
- 真实物件静物：文件、日历、手机、信封、文具托盘
- 无 AI 人物、无 generic 礼物盒、无营销式清单角色
- 自然光、留白多、颜色克制，但不是灰死
- 像日本生活工具的产品摄影 / editorial still-life，不像宣传插画

## 3. PROJECT_MEMORY 更新

已替换 `PROJECT_MEMORY.md` 的「视觉规范」段。

关键 diff：

```diff
- 主色：信赖蓝 #1E3A5F
- 强调色：温暖橙 #F6B133
- 背景：柔和米 #FFF5E6
- 调性：温暖陪伴偏专业，圆角 12-14px，留白克制
+ 主色：深海军蓝 #18324A
+ 强调色：珊瑚赤 #E56F4F
+ 背景：温暖纸白 #FAF7F1；卡片 #FFFFFF；浅强调底 #FFF0E8
+ 调性：温暖陪伴 + 工具感 + 日式克制，像可长期使用的生活文具
+ 圆角：卡片 16px，按钮 14px，chip 10px
+ 插画：主视觉使用 Image 2.0 成熟静物 bitmap，SVG 只保留为小型 UI 辅助
```

## 4. 截图验证

### Before

基线截图保留在：

`docs/visual-polish-2/screenshots/before/`

共 12 张 393px 初始截图：
- `home-393.png`
- `photo-393.png`
- `check-393.png`
- `select-393.png`
- `subscribe-393.png`
- `knowledge-393.png`
- `invite-393.png`
- `consultation-393.png`
- `privacy-393.png`
- `terms-393.png`
- `tokusho-393.png`
- `sample-393.png`

### After：13 屏 + 配额弹窗

最终截图使用 Chrome DevTools Protocol 的真实 mobile emulation，不是 Chrome CLI 裁切。
视口：`320 / 375 / 393 / 430 / 768`。
目录：

`docs/visual-polish-2/screenshots/after-final/{320,375,393,430,768}/`

每个视口包含：
- `01-home.png`
- `02-photo.png`
- `03-photo-result.png`
- `04-photo-detail.png`
- `05-check.png`
- `06-check-select.png`
- `07-check-quiz.png`
- `08-check-result.png`
- `10-subscribe.png`
- `11-archive.png`
- `12-reminders.png`
- `13-knowledge.png`
- `14-account.png`
- `15-quota.png`

数量：`70` 张。CDP 截图时检查了 `innerWidth / document.scrollWidth / body.scrollWidth`，未记录横向 overflow。

### Edge Pages

边缘页 393px 截图：

`docs/visual-polish-2/screenshots/after-edge/393/`

包含：
- `consultation.png`
- `privacy.png`
- `terms.png`
- `tokusho.png`
- `sample-package.png`
- `invite.png`
- `welcome.png`
- `knowledge-detail.png`
- `seo-gijinkoku.png`
- `seo-keiei.png`
- `seo-haigusha.png`
- `seo-tokutei.png`
- `seo-teijusha.png`
- `seo-eijusha.png`

## 5. 这轮具体改动

- 重建 Tailwind palette、radius、shadow、font token。
- 替换 2.0 手工 SVG 主视觉为 Image 2.0 成熟静物 bitmap。
- 更新首页、拍照入口、自查入口、订阅、空状态、邀请相关插画框架和响应式字号。
- 清掉旧蓝橙硬编码残留：材料包、邮件模板、分享按钮、咨询表单、提醒 / 档案 tab、拍照结果视觉常量。
- 自查结果页登录提示条去掉 emoji，改为 lucide 线性图标和新 token。
- `PROJECT_MEMORY.md` 视觉规范段已更新为新权威。

## 6. 已知限制

- 本轮严格没有读取 `.env*`，所以本地没有数据库 / 登录态环境时，以下截图是可访问状态而非真实数据态：
  - `/my/archive`
  - `/my/reminders`
  - `/my/account`
  - `/invite`
  - `/knowledge`
  - `/knowledge/sample`
  - `/photo/result/demo`
  - `/photo/result/demo/detail`
- 08 自查结果页通过 CDP 注入本地 `sessionStorage` 样本答案，截图为真实结果态。
- 登录 / 注册页由 CC-A 同时改流程，本轮只通过 redirect 状态截图检查，没有改 `app/login` 或 `app/register`。

## 7. 创始人 Review 重点

优先看这些变化最大的页面：
- 首页：logo、H1、正文、action card 全部放大并响应式；旧蓝橙 / 冷灰绿都已退出。
- 拍照入口：暗海军蓝相机框 + 珊瑚赤行动色，更像工具界面而不是营销卡片。
- 续签入口：改用 Image 2.0 文件桌面静物，减少人物和清单堆叠。
- 自查结果：风险态保留明确层级，提示条去 emoji。
- 订阅：价格卡从橙色框架变成更克制的会员选择。
- SEO 长文页：新壳下长正文仍保留可读性。

## 8. 自评

当前视觉比上一版更接近创始人反馈里的方向：更成熟、更少 AI 味、更少固定蓝橙框架。
自评：`7.8-8.2/10`。这不是终局品牌设计，但已经从「工程师按 spec 打磨」往「有明确审美判断的产品界面」走了一步。

下一步真正还能提升的方向：
- 真实登录态数据截图再做一轮，因为 archive/reminders/account 现在仍受本地 auth/env 限制。
- 找 1 个真实日本 App 级别的 motion / micro-interaction 标尺，别再只靠静态 CSS。
- 如果品牌要更高级，后续应该做 TEBIQ logo / icon 系统，而不是继续只磨页面 token。

---

## 9. Visual Polish 2.1 修正记录

创始人指出 2.0 版「颜色诡异、像死了人的感觉、插画 AI 味重、首页字号和 logo 不自适应」。这条反馈成立。2.0 把「克制」推成了灰绿、赤金和过小字体，成熟感没有起来，反而失去生命力。

本次 2.1 直接推翻 2.0 的核心视觉判断：

- 主色从墨绿 `#233B37` 改为深海军蓝 `#18324A`。保留信任感，但避开旧政府蓝。
- CTA 从赤金 `#C49A5A` 改为珊瑚赤 `#E56F4F`。比旧橙成熟，比赤金有温度。
- 背景从冷纸灰 `#F6F4EF` 改为温暖纸白 `#FAF7F1`，卡片回到 `#FFFFFF`，避免全站灰沉。
- 首页 logo、H1、正文和行动卡全部改为 `clamp()` 响应式尺寸。320 / 393px 检查无横向 overflow。
- 空状态 SVG 不再作为主空状态视觉，改为 Image 2.0 的成熟静物 bitmap。
- PROJECT_MEMORY.md 的视觉规范段已更新为 Visual Polish 2.1 权威。

### Image 2.0 调用

2.1 阶段共使用 Image 2.0 生成 5 张 bitmap 资产，其中当前保留并接入 3 张：

- `public/illustrations/renewal-check-wide-image2.png`：续签入口用的日式生活文件桌面静物。选择原因：没有人物、没有清单角色，真实物件更成熟。
- `public/illustrations/invite-share-wide-image2.png`：邀请页用的手机 / 信封 / 日历静物。选择原因：避开礼物盒和卡通奖励感。
- `public/illustrations/empty-state-image2.png`：档案 / 提醒 / 知识空状态共用的文具托盘静物。选择原因：比 SVG 更有质感，也不进入 AI 人物插画套路。

### 2.1 截图

快速复核截图保存在：

`docs/visual-polish-2/screenshots/after-2-1/`

覆盖：

- 320px：`home / check / photo / subscribe`
- 393px：`home / check / photo / subscribe`

CDP 检查结果：

- `/`：320 / 393 均无横向 overflow
- `/check`：320 / 393 均无横向 overflow
- `/photo`：320 / 393 均无横向 overflow
- `/subscribe`：320 / 393 均无横向 overflow

### 2.1 自评

这次不再追求「极克制」，而是先把产品从灰死状态拉回成熟、可信、有温度。当前仍不是最终品牌设计，但比 2.0 更接近 TEBIQ 的真实产品方向：在日生活工具，不是政府网站，也不是儿童化 AI 插画 App。

---

## 10. Trust Pass：用户视角细化

创始人认可 2.1 方向后，本轮继续按「用户是否敢把真实在日生活文件交给 TEBIQ」来打磨，不再大换颜色。

### 做了什么

- 首页：放大品牌识别，`lg` logo 增加「てびき」读音标记；首页新增 3 个低噪声信任卡：识别重点、归入档案、提醒事项。用户第一屏更清楚 TEBIQ 最终会产出什么。
- 拍照页：在取景框下新增隐私 / 处理预期说明「文件内容不会公开展示」，解释照片用于识别重点，结果可保存到档案。
- 拍照结果页：重要度卡从单纯警示色块改成「处理优先级 + 剩余天数」结构，增加原文件校验提示。
- 自查结果页：Hero 增加报告元信息（依据 / 用途 / 下一步），摘要卡改成「判断摘要 + 非法律意见」结构，减少像随机结论的感觉。
- 订阅页：从价格表前置改成「把每月收到的文件管起来」，先解释开通后解决的具体问题，再展示三档方案。
- 全站残留 `bg-accent + text-ink` 主按钮改成白字，避免珊瑚赤按钮上文字发脏。

### Image 2.0

本轮新增调用 Image 2.0：`2` 次。

新增横版资产：

- `public/illustrations/renewal-check-wide-image2.png`
- `public/illustrations/invite-share-wide-image2.png`

原因：2.1 的第一批静物图质感成立，但续签页和邀请页使用横向 hero 容器，竖图裁切会显得像硬塞进去。新横版资产保持同一套纸白、深海军蓝、珊瑚赤小点缀、自然光静物系统。

累计 Image 2.0 资产：`5` 张。

### 截图验证

新增 CDP mobile emulation 截图：

`docs/visual-polish-2/screenshots/after-trust-pass/`

覆盖：

- 320px：`home / photo / check / subscribe / invite`
- 393px：`home / photo / check / subscribe / invite`

CDP 检查结果：上述页面在 320 / 393 下 `document.scrollWidth === innerWidth`，无横向 overflow。`/invite` 在未登录状态会进入登录页，这是当前真实路由行为。
