# Block 11 Final Report

最后更新: 2026-04-28
分支: `codex/block-11`
基线: `9a2fc16`

## 任务完成情况

1. Production DB blocker
   - 新增只读检查脚本: `scripts/dev-utils/sync-production-db.ts`
   - 新增命令: `npm run sync-production-db`
   - 已用生产连接串只读检查，不打印任何环境变量值。
   - 未执行 `db:push` / `db:migrate`，等待创始人 review。

2. 首页结构调整
   - 首页改回 Block 10 框架: 顶部 brand / 今日相关 / 3 个核心工具 / 接下来 30 天 / 最新政策 / 底部信任元素。
   - 隐藏文字即懂入口。
   - 首页不再显示“档案状态卡”，不再使用“档案”叙述。
   - `/timeline` 仍保留，首页入口命名为“我的提醒”。

3. 定价调整
   - 免费层: 拍照每天 1 次，续签自查不限，提醒保留 30 天。
   - 付费月度: `basic_monthly`，¥980/月。
   - 付费年度: `basic_yearly`，¥8,800/年，约 25% 折扣。
   - 移除前端 `archive_yearly` / ¥1,580 年度保留方案。
   - 一次性咨询代码保留，但主要前端入口已隐藏。

4. 7 天试用
   - 新字段: `members.trial_started_at`, `members.trial_used`。
   - 新注册用户自动开始 7 天试用，试用期内按付费待遇处理拍照配额。
   - 首页在试用剩余 2 天内显示 banner；试用结束显示升级提示。
   - 每个用户只创建一次试用。

5. 文字即懂入口隐藏
   - `/ask` 路由和 `/api/text-understand` 保留。
   - 首页、工具页、底部 tab、sitemap 和明显入口不再展示“文字即懂”。

6. 隐私政策 + APPI
   - 新增 `/privacy-policy`。
   - AppShell footer 加全站隐私政策入口。
   - 新增 `/settings`。
   - 新增 `GET /api/settings/export` 导出 JSON。
   - 新增 `POST /api/settings/delete-account` 软删除标记。
   - 新字段: `members.deletion_requested_at`, `members.deletion_scheduled_at`。

## Production DB 只读检查

命令:

```bash
npx tsx --env-file=/Users/martin/Documents/tebiq/.env.local scripts/dev-utils/sync-production-db.ts
```

结果摘要:

- 本地 migration 文件数: 15
- production `drizzle.__drizzle_migrations` 记录数: 5
- 已应用: `0000` - `0004`
- 未应用: `0005` - `0014`
- `articles.visibility`: 缺失
- `articles.doc_type_tags`: 缺失
- `articles.scenario_tags`: 缺失
- `articles.applies_to`: 缺失
- `members.archive_retention_until`: 缺失
- `members.trial_started_at`: 缺失
- `members.trial_used`: 缺失
- `members.deletion_requested_at`: 缺失
- `members.deletion_scheduled_at`: 缺失
- `timeline_events`: 缺失

结论: production DB 需要先人工 review `0005` - `0014`，确认后再执行迁移。当前分支不会自动修改 production DB。

## 新迁移

新增:

- `lib/db/migrations/0014_flawless_celestials.sql`

内容:

- `members.trial_started_at`
- `members.trial_used`
- `members.deletion_requested_at`
- `members.deletion_scheduled_at`

## 截图

- `docs/visual-report/screenshots/block11-final/home-320.png`
- `docs/visual-report/screenshots/block11-final/home-375.png`
- `docs/visual-report/screenshots/block11-final/home-393.png`
- `docs/visual-report/screenshots/block11-final/home-430.png`
- `docs/visual-report/screenshots/block11-final/home-768.png`
- `docs/visual-report/screenshots/block11-final/pricing-393.png`
- `docs/visual-report/screenshots/block11-final/privacy-policy-393.png`

## 验证

已通过:

```bash
npm run lint
npx tsc --noEmit
npm run build
npm run db:generate
npm run test
```

`npm run db:generate` 返回 `No schema changes, nothing to migrate`。

## 待创始人处理

1. Review `lib/db/migrations/0005` - `0014`。
2. 确认后指令 CCA 执行 production DB migration。
3. migration 成功后再 merge `codex/block-11` 到 main。

## 已知风险

- production DB 当前缺历史 migration，Block 10/11 相关页面在 production 上会继续受 schema blocker 影响，直到迁移补齐。
- 账号删除目前只做软删除标记；30 天后的硬删除需要后续 cron 或 admin 执行器。
- `/ask` 仍可直接访问，符合“代码/API 保留”的要求；前端显式入口已隐藏。
