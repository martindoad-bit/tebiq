# Prelaunch Engineering QA v1 Report

## 本轮目标
- 用户侧字段清理
- answer benchmark
- intent guard
- admin 可用性
- E2E 流程

## 修复内容
1. 新增 `lib/answer/intent-guard.ts`，把 answer intent guard 从 `match-answer.ts` 抽成独立模块，并按年金/办公室搬迁/资本金不足三类问题收紧硬校验。
2. 新增 `npm run audit:user-facing-copy`，扫描用户侧 `app/` 和 `components/`，拦截 raw JSON、原始结果、`source: document`、`deadline: null` 等用户侧调试字段。
3. 强化 `npm run test:answer-quality`：10 个 benchmark 输出命中、类型、意图守卫和行动卡完整性；办公室搬迁题必须含法务局/税务署/入管/租赁合同/办公室照片等字段。
4. 强化 `npm run lint:answer`：检查办理窗口、材料、期限、后果、专家交接点字段是否各司其职，并扩展用户侧技术字段泄漏检查。

## 10 个 benchmark 结果
| 问题 | 命中 | intent guard | 行动卡完整性 | 结果 |
|---|---|---|---|---|
| 公司休眠了要不要交国民年金？ | `q080-国民年金-交不起-想申请免除-怎么办` | pass | 完整 | pass |
| 办公室搬迁要做哪些手续？ | `q032-経営・管理-事務所搬迁-商業登記-入管届出-怎么做` | pass | 完整 | pass |
| 永住者能不能带父母来日本养老？ | `q003-永住者能不能把父母接来日本长期居住` | pass | 完整 | pass |
| 老板雇了签证不符的人我会不会受影响？ | `q091-老板雇我-雇同事用错签证-不法就労-我会被牵连吗` | pass | 完整 | pass |
| 特定技能1号能不能转工作签？ | `tokutei-to-work-visa` | pass | 完整 | pass |
| 住民税晚交会影响永住吗？ | `q001-永住申请直近-5-年纳税要完整吗` | pass | 完整 | pass |
| 公司没有给我上社保怎么办？ | `company-no-social-insurance` | pass | 完整 | pass |
| 搬家后在留卡地址要不要改？ | `q084-搬家-14-日内-必须办的届出-顺序是什么` | pass | 完整 | pass |
| 经营管理资本金不够怎么办？ | `management-capital-shortage` | pass | 完整 | pass |
| 留学生能不能转人文签？ | `student-to-gijinkoku` | pass | 完整 | pass |

## 用户侧字段扫描
- 是否发现内部字段: 初次扫描发现 `policy_match` 只存在于用户侧代码枚举值，不是渲染文本；审计脚本改为只拦截可能用户可见的文本/label/placeholder。
- 修复位置:
  - `scripts/dev-utils/audit-user-facing-copy.ts`
  - `package.json`

## Admin 检查
- `/admin/questions`: 本地 production 200；无 `DATABASE_URL` 时显示安全空状态，不白屏。
- `/admin/questions/import`: 本地 production 200；页面可加载导入 textarea。
- `/admin/review-lite`: 本地 production 200；answer draft 列表和审核表单可加载。
- 说明: 本地未配置 DB，无法在本轮本地验证“提交后后台有记录”；`POST /api/answer` 在无 DB 时可返回行动答案且不泄露技术错误。production 有 DB 时应写入 `query_backlog` / `answer_drafts`。

## E2E 抽测
- 本地 production server: `http://localhost:3150`
- `BASE_URL=http://localhost:3150 npm run smoke:launch`: pass
- `/`, `/answer/demo-matched`, `/answer/demo-draft`, `/answer/demo-cannot-determine`, `/admin/questions`, `/admin/questions/import`, `/admin/review-lite`, `/timeline`, `/photo/sample-result`, `/login`: 200
- `POST /api/answer` with `公司休眠了要不要交国民年金？`: 返回 `ok=true`, `answer_type=matched`, `has_action=true`。

## 验证
- npm run lint: pass
- npx tsc --noEmit: pass
- npm run build: pass
- npm run test: pass
- npm run db:generate: pass, No schema changes
- npm run audit:launch-copy: pass
- npm run audit:user-facing-copy: pass
- npm run lint:answer: pass
- npm run test:answer-quality: pass
- BASE_URL=http://localhost:3150 npm run smoke:launch: pass

## 是否建议推 main
是。

原因: 本轮没有 schema 变更、没有触碰支付/Resend/env；所有必跑验证通过，10 个 answer benchmark 通过，用户侧字段审计通过，admin 核心页面 production 模式可加载。建议先将 `launch/prelaunch-engineering-qa-v1` 进入集成/merge review，再推 main。
