# BLOCK 11 REPORT

Branch: `codex/block-11`
Base: `origin/main`
Date: 2026-04-28

## 1. 产品哲学 v1

- 已在 main 创建 `docs/PRODUCT_PHILOSOPHY.md` 并 push。
- Block 11 实现按“工具产生记录，记录进入档案”处理。
- 公开 UI 中顺手移除了本轮触达页面里的 emoji / 温情表达，admin 内部提示未改。

## 2. 数据结构

新增 migration:
- `lib/db/migrations/0013_hard_kate_bishop.sql`

新增:
- `timeline_event_type` enum
- `timeline_events` 表
- `members.archive_retention_until`

说明:
- 未修改 `documents` / `quiz_results` 既有字段。
- 由于现有主键体系是 cuid2 `varchar(24)`，`timeline_events.id` 和 `source_record_id` 继续使用现有 id 格式，而不是 PostgreSQL uuid。否则无法直接关联现有 documents / quiz_results / text_understand id。

## 3. 工具写入时间线

已接入:
- `/api/photo/recognize` 写入 `photo_recognition`
- `/api/results/save` 写入 `self_check`（现有项目没有 `/api/check/submit`，所以接入当前自查保存 API）
- `/api/text-understand` 写入 `text_understand`

每次写入后返回:
- `timeline.eventId`
- `timeline.relatedEvents`

匿名数据迁移:
- `lib/auth/migrate-session-data.ts` 已把 `timeline_events` 纳入匿名 session -> member 的迁移。

## 4. Timeline API

新增:
- `GET /api/timeline`
- `GET /api/timeline/[event_id]`
- `PATCH /api/timeline/[event_id]`

支持:
- event type / doc type / issuer / 日期 / tag / archived 过滤
- 分页 limit / offset
- 更新 `user_note` / `archived` / `tags`
- 当前用户或匿名 session 级别的 owner 校验

## 5. 首页与 /timeline

首页已重构为:
- 顶部 brand strip
- 档案状态卡
- 当前关注 x3
- 工具入口 2 行: 拍照即懂 / 文字即懂 / 续签自查 / 我的时间线
- 最近活动 5 条

已移除首页:
- 最新政策模块
- 信任元素卡

新增页面:
- `/timeline`
- `/timeline/[event_id]`

详情页支持:
- 结构化字段
- 原始 JSON 结果
- 备注 / 标签 / 归档
- 历史关联
- 相关知识

## 6. 商业模型

代码层改为:
- 免费层: 工具不限次数，档案保留 30 天
- 年度层: `archive_yearly`，¥1,580 / 年，档案保留 365 天
- 一次性咨询: ¥9,800，保留

已砍掉公开 UI:
- ¥980 / 月
- ¥9,800 / 年
- ¥19,800 / 年
- ¥380/¥480/¥980 材料包售卖文案

实现点:
- `/subscribe` 改为年度档案保留页
- 新增 `/pricing` 复用订阅页
- Stripe product 新增 `archive_yearly`，对应 env: `STRIPE_PRICE_ARCHIVE_YEARLY`
- Stripe webhook 成功后设置 `archive_retention_until` 并 unarchive timeline events
- 拍照和文字理解 quota 改为不限次数

## 7. 截图

Homepage:
- `docs/visual-report/screenshots/block-11-timeline/home-320.png`
- `docs/visual-report/screenshots/block-11-timeline/home-375.png`
- `docs/visual-report/screenshots/block-11-timeline/home-393.png`
- `docs/visual-report/screenshots/block-11-timeline/home-430.png`
- `docs/visual-report/screenshots/block-11-timeline/home-768.png`

Timeline:
- `docs/visual-report/screenshots/block-11-timeline/timeline-393.png`

## 8. 验证

Passed:
- `npm run lint`
- `npx tsc --noEmit --pretty false`
- `npm run db:generate` => `No schema changes`
- `npm run test` => 7/7
- `npm run build`
- Playwright screenshots for homepage 5 viewports
- Playwright screenshot for `/timeline`

Note:
- 本 worktree 初始缺少完整 `node_modules`，`npm run build` 第一次因本地缺 `heic-convert` 失败；执行 `npm install` 后通过。未修改 lockfile。

## 9. 已知风险 / 待 Review

- production 目前已知 DB schema 落后，之前 import batch-02 失败于 `articles.visibility` 不存在。Block 11 合并前必须先在 production 跑历史 migrations，否则新 `timeline_events` 也无法使用。
- `archive_yearly` 需要创始人在 Stripe 创建新 price，并在 Vercel 配 `STRIPE_PRICE_ARCHIVE_YEARLY`。
- timeline 事件是从本版本开始写入；历史 documents / quiz_results 未做 backfill。
- 旧 `material_package` enum / legacy purchase rows 保留兼容，但公开 UI 不再售卖。
- `policy_match` 事件类型已预留，自动政策匹配还未实现。

## 10. 给创始人

1. 先处理 production DB migrations，再 merge Block 11。
2. 配置 `STRIPE_PRICE_ARCHIVE_YEARLY`。
3. 合并后用真实账号跑: 拍照、文字即懂、自查，确认 `/timeline` 自动出现 3 类事件。
