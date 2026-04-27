# CODEX Visual Polish 2 Report

分支：`codex/visual-polish-2`
基线：`origin/claude/block-7`
目标：推翻旧蓝橙框架，降低 AI 味和幼稚感，把 TEBIQ 拉回「温暖陪伴 + 工具感 + 日式克制」。

## 1. 视觉方向调整

### 配色：推翻前后

| 项目 | 原框架 | 新框架 | 判断 |
| --- | --- | --- | --- |
| 主色 | 信赖蓝 `#1E3A5F` | 墨青 `#233B37` | 旧蓝过于政府站 / generic，墨青更像日本生活工具与纸本文具 |
| 强调 | 明橙 `#F6B133` | 赤金 `#C49A5A` | 旧橙偏儿童化，新色压低饱和度，CTA 仍清楚但不吵 |
| 背景 | 柔和米 `#FFF5E6` | 纸白灰 `#F6F4EF` | 旧米色偏黄，新背景更冷静，适合长期阅读 |
| 卡片 | 白 + 蓝系阴影 | `#FFFEFA` + 中性灰绿阴影 | 阴影从主色解绑，页面更成熟 |
| 辅助 | 蓝灰 / 绿 / 红 / 灰 | 灰绿蓝 `#E7EEE9`、成功 `#557C65`、警示 `#B45A4E`、正文灰 `#46534F` | 整体从「蓝橙 App」改为纸白、墨青、赤金、灰绿体系 |

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

- 卡片从 14px 降到 10px，按钮 9px，chip 7px。
- 阴影不再使用蓝色透明阴影，改为中性灰绿低透明度层级。
- 小图标 stroke-width 约 1.5-1.7；清掉旧 `#1E3A5F` / `#F6B133` 硬编码。

## 2. 插画处理

GPT Image 2 调用次数：`0`

原因：这轮反馈明确指出「AI 味巨浓」。我判断继续生成 bitmap 插画收益低，改为手工 SVG，更可控，也更符合日式克制。

最终使用的插画资产：
- `public/illustrations/renewal-check.svg`
- `public/illustrations/invite-gift.svg`
- `public/illustrations/empty-archive.svg`
- `public/illustrations/empty-reminders.svg`
- `public/illustrations/empty-knowledge.svg`

风格：
- 2-3 色
- 无 AI 人物、无 generic 礼物盒、无营销式清单人物
- 文件、信封、线条、几何符号为主
- 留白多，像产品说明图，不像宣传插画

## 3. PROJECT_MEMORY 更新

已替换 `PROJECT_MEMORY.md` 的「视觉规范」段。

关键 diff：

```diff
- 主色：信赖蓝 #1E3A5F
- 强调色：温暖橙 #F6B133
- 背景：柔和米 #FFF5E6
- 调性：温暖陪伴偏专业，圆角 12-14px，留白克制
+ 主色：墨青 #233B37
+ 强调色：赤金 #C49A5A
+ 背景：纸白灰 #F6F4EF；卡片 #FFFEFA；浅强调底 #F0E7D8
+ 调性：温暖陪伴 + 工具感 + 日式克制，像可长期使用的生活文具
+ 圆角：卡片 10px，按钮 9px，chip 7px
+ 插画：优先手工 SVG 或极简几何图形，不使用 AI 生成的人物 / 礼物盒 / 清单角色
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
- 替换 AI bitmap 插画引用为手工 SVG。
- 更新首页、拍照入口、自查入口、订阅、空状态、邀请相关插画框架。
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
- 首页：旧蓝橙工具卡 → 墨青 / 赤金 / 纸白灰体系。
- 拍照入口：暗墨青相机框，更像工具界面而不是营销卡片。
- 续签入口：AI 插画替换为手工 SVG，减少人物和清单堆叠。
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
