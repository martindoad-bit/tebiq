# Holiday Release Final Report

## 基线
- branch: `launch/holiday-release-final`
- base: `origin/launch/review-candidate-p0-ui` at `2174fbe382dcea2fbd5bbcf32f02d86b33b6744f`
- started at: `2026-04-30T00:29:30+09:00`

## 合并内容
| 分支 | 是否合入 | 说明 |
|---|---|---|
| `launch/review-candidate-p0-ui` | base | P0 launch fixes + visual-polish-13 + login readability fix。 |
| `codex/holiday-engineering-upgrade` | 已合入 | batch-04/05 共 85 篇 check dimension 内容、importer/validator/smoke/copy audit。 |
| `codex/visual-polish-14` | 已合入 | 首页、photo、sample-result、timeline、pricing、check、settings、knowledge、404 精修。 |
| `content/knowledge-batch-06` | 未合入 | 需要独立 `document_definitions` schema / importer；不把新 DDL 风险带入本次 release。 |
| `content/knowledge-batch-07` | 未合入 | 需要独立 `scenario_definitions` schema / importer；不把新 DDL 风险带入本次 release。 |

## 关键实现
- check dimension 展示顺序: DB `articles` → repo markdown → `该维度准备中` fallback。
- markdown fallback 是否可用: 可用。server-side 读取 `docs/knowledge-seed/check-dimensions/**` 和 `docs/knowledge-seed/dimensions-visa-specific/**`，不进 client bundle。
- batch-04 / batch-05 是否可展示: 可展示。无 `DATABASE_URL` 时本地 production 已验证 `/check/gijinkoku/work_change`、`/check/gijinkoku/income_threshold`、`/check/keiei/capital_source` 走 markdown 内容。
- 文案 warning 是否阻断: 不阻断。`validate-check-dimensions` 记录 2 个正文 warning，release 继续。
- production DB 写入: 无。
- 新 migration: 无。

## 验证
- `npm run lint`: 通过。
- `npx tsc --noEmit`: 通过。
- `npm run build`: 通过。
- `npm run test`: 通过。
- `npm run db:generate`: 通过，No schema changes。
- `npm run validate-check-dimensions`: 通过，85 files；2 warnings。
- `npm run audit:launch-copy`: 通过，scanned 248 files。
- `npm run smoke:launch`: 通过，`BASE_URL=http://localhost:3113`。

## 本地 production 抽测
| 路径 | 结果 | 备注 |
|---|---|---|
| `/` | 200 | 首页可加载。 |
| `/photo` | 200 | 拍照入口可加载。 |
| `/photo/sample-result` | 200 | 样例结果可加载。 |
| `/timeline` | 200 | 我的提醒可加载。 |
| `/pricing` | 200 | 定价页可加载，消费者保护说明保留。 |
| `/check` | 200 | 材料准备检查入口可加载。 |
| `/check/gijinkoku` | 200 | 清单可加载；无 DB 时读 markdown definitions。 |
| `/check/gijinkoku/work_change` | 200 | markdown 内容。 |
| `/check/gijinkoku/job_visa_match` | 200 | 无同名内容，正常 fallback。 |
| `/check/keiei` | 200 | 清单可加载；无 DB 时读 markdown definitions。 |
| `/check/keiei/capital_investment` | 200 | 无同名内容，正常 fallback。 |
| `/check/haigusha/marriage_continuity` | 200 | 无同名内容，正常 fallback。 |
| `/check/tokutei/support_organization` | 200 | 无同名内容，正常 fallback。 |
| `/settings` | 307 | 未登录跳转合理。 |
| `/settings/account` | 307 | 未登录跳转合理。 |
| `/privacy-policy` | 200 | 可访问。 |
| `/login` | 200 | 可访问。 |
| `/knowledge` | 200 | 可访问。 |
| `/not-found-test-random` | 404 | 404 路由正常。 |

## 未合入内容
- batch-06: 高频文书内容资产，后续单独建 `document_definitions` / importer / validator。
- batch-07: 场景清单内容资产，后续单独建 `scenario_definitions` / importer / validator。

## 是否推 main
- 是。
- 原因: lint / tsc / build / test / db:generate / validator / copy audit / smoke 全部通过；无 production DB 写入；无新增 migration；核心路径无 404/500；check dimension 已支持 DB → markdown → fallback。
