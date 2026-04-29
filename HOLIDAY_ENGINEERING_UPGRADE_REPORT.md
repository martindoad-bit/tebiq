# Holiday Engineering Upgrade Report

## 基线
- branch: `codex/holiday-engineering-upgrade`
- base: `origin/launch/review-candidate-p0-ui` at `2174fbe382dcea2fbd5bbcf32f02d86b33b6744f`
- started at: `2026-04-29T21:32:00+09:00`

## 本轮完成
| Work Package | 状态 | commit | 说明 |
|---|---|---|---|
| WP1: batch-04 维度内容接入 | 完成 | `7b72c9e` | batch-04 已是当前候选分支祖先；采用 `articles` 结构化字段接入，新增专用 importer，维度页优先读 DB 内容。 |
| WP2: 内容质量检查 | 完成 | `7b72c9e` | 新增 `validate-check-dimensions`，检查 60 个 markdown 的 frontmatter、题目、逻辑、行动项。 |
| WP3: Route / CTA smoke | 完成 | `3eb0476` | 新增 `smoke:launch`，本地 production server 下检查核心路径状态码。 |
| WP4: 用户可见文案审计 | 完成 | `3eb0476` | 新增 `audit:launch-copy`，扫描 app/components/lib，排除 admin，拦截恐吓、法律结论、营销化词。 |
| WP5: 登录 / 设置 / 删除账号稳定性 | 完成 | `563161e` | 统一隐私入口到 `/privacy-policy`；删除账号提交后清 session 并返回首页。 |
| WP6: 价格页收费边界检查 | 完成 | 无代码变更 | 当前 `/pricing` 显示 ¥980/月、¥8,800/年、自动续费/取消/删除/原图不保存/联系入口；Stripe 后端未改。 |
| WP7: 工程交接 | 完成 | 待本报告 commit | 更新本报告和 `AI_HANDOFF_CCA.md`。 |

## 内容接入
- 是否合入 batch-04: 是。`origin/content/knowledge-batch-04` 已是当前分支祖先，执行 merge 返回 `Already up to date`。
- schema 方案: 方案 A，继续使用 `articles` 表。
- 选择理由: 当前 schema 已有 `visa_type`、`dimension_key`、`dimension_version`、`priority`、`expiry_days`、`questions`、`result_logic`、`result_actions` 等结构化字段；新增表会增加 migration 和 production DDL 风险。
- importer 命令: `npm run import-check-dimensions`
- 本地无 DB 行为: 不连接 DB；输出 `DATABASE_URL not configured` 并退出，不影响 build。
- 有 DB 时如何导入: 设置 `DATABASE_URL` 后运行 `npm run import-check-dimensions`；按 slug upsert 到 `articles`，`category='check_dimension'`、`status='published'`、`visibility='private'`。
- `/check/{visa}/{dimension}` 展示逻辑: 有结构化文章时显示真实标题、优先级、复检周期、问题和结果行动；无 DB / 无内容 / 缺结构化字段时保留 `该维度准备中` fallback。

## 新增命令
- `npm run import-check-dimensions`: 导入 `docs/knowledge-seed/check-dimensions/**/*.md` 到 `articles`。
- `npm run validate-check-dimensions`: 验证 batch-04 frontmatter 和结构化字段。
- `npm run smoke:launch`: 对本地 production server 做核心路径状态码扫雷。
- `npm run audit:launch-copy`: 扫描用户侧高风险文案。

## 数据库 / migration
- 是否新增 migration: 否。
- 是否破坏性: 否。没有 DROP / TRUNCATE / DELETE / 重命名 / 改主键。
- production 是否需要执行: 不需要新 migration；如 production 尚未有 0014/0018 的 articles 字段，仍需先按既有流程补齐历史 migration。
- 执行命令: 本轮新增内容导入命令为 `DATABASE_URL=... npm run import-check-dimensions`。
- 回滚注意: importer 是 upsert；回滚代码不会删除已导入文章。

## 修复的产品问题
1. `/check/{visa}/{dimension}` 不再只能 fallback；production 有 batch-04 数据后会展示真实维度题目。
2. `show_if` 条件现在会控制单项题目显示，避免用户回答无关后续题。
3. `result_actions` 输出经公开文本清洗，避免前端重新出现「书士」等不希望用户侧看到的词。
4. `/privacy-policy` 成为 login / consultation / legal footer 的统一隐私入口。
5. 删除账号提交后立即退出登录态并回首页，避免停留在受保护页面假象。

## 未处理 / 待 review
1. `npm run import-check-dimensions` 未连接真实 DB 运行；需要有 `DATABASE_URL` 的环境执行。
2. `validate-check-dimensions` 有 1 个正文 warning: `management/tax_certificate.md` 正文包含「危险」。该词不在结构化结果行动项中，不阻断导入，建议 CCB 后续修文。
3. batch-05 未合入，也未作为本轮依赖。
4. Stripe 真实支付链路未接入/未改动；本轮只检查了 pricing 消费者说明和价格展示。

## 验证
- `npm run lint`: 通过。
- `npx tsc --noEmit`: 通过。
- `npm run build`: 通过。
- `npm run test`: 通过。
- `npm run db:generate`: 通过，No schema changes。
- `npm run validate-check-dimensions`: 通过，60 files；1 warning。
- `npm run audit:launch-copy`: 通过，扫描 247 files。
- `npm run smoke:launch`: 通过，`BASE_URL=http://localhost:3110`。
- `npm run import-check-dimensions`: 未连接 DB；前置验证通过后因缺 `DATABASE_URL` 停止，符合预期。

## 给创始人的非技术摘要
- 续签材料准备检查现在能吃 batch-04 的 60 篇结构化维度内容，不再只是占位 fallback。
- 内容导入和内容质量检查有了独立命令，后续 CCB 写更多 markdown 时不用靠肉眼接入。
- 新增路由 smoke 和文案 audit，能自动扫掉 404/500、误导跳转、恐吓词和营销词。
- 用户隐私入口统一到 `/privacy-policy`，账号删除后的登录态也更清楚。
- 本轮没有动 production DB，没有接 Stripe，没有改视觉 token。
- 还不能正式上线的点: 需要在有 DB 的环境跑 `import-check-dimensions`，并让 CCB 修掉正文里少量强措辞。

## 给下一轮 CCA 的建议
1. 在 preview/production-like DB 上运行 `npm run import-check-dimensions`，确认 `/check/technical_humanities_international/work_change` 显示真实题目。
2. 和 CCB 对齐 batch-05 字段是否沿用 batch-04 schema；如果一致，当前 importer 已可兼容同目录新增内容。
3. 如果维度内容继续增长，再考虑把 `articles` 拆成专用 `check_dimension_definitions` 表；当前阶段不值得增加 DDL 风险。
