# BLOCK14_REPORT

更新时间: 2026-04-29T06:06:05Z

## 完成情况

- 首页已改为三状态结构:
  - 未登录用户: TEBIQ 极简介绍 + 拍照主 CTA + 自查次 CTA + 3 个工具行 + 空状态。
  - 试用期用户: 顶部显示 `试用期 残り N 日`，其余沿用已登录结构。
  - 已登录用户: 顶部 3 行概览、常用工具 3 行、接下来 30 天期限事项列表。
- 首页不再展示 `今日相关` 假卡片、不再展示 `最新政策` 模块、不再使用首页档案状态卡。
- 底部 TabBar 已改为 4 个等宽普通 tab:
  - 首页 / 拍照 / 提醒 / 我的
  - 拍照是普通 tab，没有中间凸起按钮。
- `/timeline` 入口命名改为 `我的提醒`，保留 URL `/timeline`。
- `/timeline` 保留 Block 13 的 `自查事项` 区块。
- `/photo` 顶级页改为 tab 页面结构，保留拍照 + PDF/截图上传入口。
- `/onboarding` 文案调整为进入 `我的提醒`，4 个卡片功能保留。
- 拍照结果页、配额弹窗、保存反馈中的可见入口统一偏向 `我的提醒`。
- `/pricing` 维持 Block 11 final 的 ¥980/月 + ¥8,800/年结构，本次未改价格和权益。

## 数据接入

- 首页已接入:
  - `timeline_events` 最近记录和 30 天期限。
  - `check_dimension_results` 的需处理自查事项计数。
  - `members.visa_expiry` 的在留卡剩余天数。
  - `getMemberAccess()` 的 7 天试用状态。
- 未登录用户不再用匿名时间线驱动首页，直接进入新用户视图。

## 未做

- 未改视觉 token、主色板、字体系统。
- 未改 pricing 数字。
- 未改 `/ask` 路由；入口仍隐藏在首页和底部 tab 外。
- 未改 Block 13 schema 和 API。

## 验证

- `npx tsc --noEmit` 通过。
- `npm run lint` 通过，0 warning。
- `npm run db:generate` 通过，No schema changes。
- `npm run test` 通过，7/7。
- `npm run build` 通过。

## Merge 顺序建议

1. `codex/block-13`
2. `codex/block-14`

Block 14 基于 Block 13 分支创建，不能跳过 Block 13 直接 merge。
