# No Wrong Answer v3 Report

## 本轮目标
- 消灭 P0 答非所问。
- 引入 LLM intent parser 的强制理解层。
- 引入 Safe Retrieval，避免泛化 seed 吞掉相邻问题。
- 将 Answer Judge 作为展示前硬闸门。
- 低置信度时显示澄清，不硬答。

## 合入内容
- intent-examples-gold-answer-v2: 已合入。
- gold_answer_v2: 已接入 repo loader，作为回答候选第一优先级，但仍需通过 intent check。
- live regression fixture: 已新增 `tests/fixtures/live-regression-qa-v2.json`，共 111 条真实问题。

## 关键实现
- `lib/answer/llm-intent-parser.ts`: 支持 `document_notice` / `deadline_emergency`，读取 `ANSWER_LLM_*` env；无 env 时安全降级。
- `lib/answer/gold-answer-loader.ts`: 读取 `docs/answer-gold-standard/GOLD_ANSWER_V2.md`，转成结构化 answer seed。
- `lib/answer/safe-candidate-retrieval.ts`: 按 intent/domain/current_status/target_status/must_not_match 过滤候选。
- `lib/answer/match-answer.ts`: 先分类 intent，再安全检索；关键直接答案在 gold/QA seed 前执行，避免相邻 seed 抢答。
- `lib/answer/answer-judge.ts`: 增加 mismatch 类型，作为展示前拦截层。
- `scripts/test/test-live-regression.ts`: 新增 live regression，要求 P0=0、P1<20。

## 红线测试
| query | result | note |
|---|---|---|
| 我是经管签，想转人文签 | pass | 命中 management-to-engineer，不再反向理解 |
| 我想从人文签转为经管签怎么办 | pass | 方向锁定为人文/技人国 -> 经营管理；低置信时澄清 |
| 特定技能1号换会社 | pass | 不再命中技能实习/特定技能 2 号 |
| 经管续签材料有哪些 | pass | 返回材料 draft，不再命中资本金不足 |
| 代表取締役换人要通知入管吗 | pass | 不再命中健康保险/年金 |
| 入管让补材料，期限赶不上怎么办 | pass | deadline_emergency，显示澄清，不误答护照/在留卡有效期 |
| 公司休眠了要不要交国民年金 | pass | 年金/健保主线，不再答经营管理休眠续签 |
| 经营管理资本金不够怎么办 | pass | 命中资本金不足补救，不再答“资本金多少合适” |
| 办公室搬迁要做哪些手续 | pass | 命中办公室搬迁，包含法务局/税务署/入管/租赁合同/办公室照片 |
| 搬家后在留卡地址要不要改 | pass | 命中地址变更，14 日和市区町村窗口正常 |

## live regression
- total: 111
- P0: 0
- P1: 0
- P2: 16

## LLM
- enabled: production 中若 `ANSWER_LLM_ENABLED` 未设为 `0` 且 Bedrock env 可用，则优先尝试 LLM intent parser。
- provider: 当前支持 `ANSWER_LLM_PROVIDER=bedrock`；其他 provider 自动降级。
- degraded mode: 无 `ANSWER_LLM_*` 或 AWS env 时，使用规则 parser + safe retrieval + judge。
- fallback: LLM 不可用或低置信度时返回澄清，不展示错配答案。

## 验证
- lint: pass
- tsc: pass
- build: pass
- test: pass
- db:generate: pass, No schema changes
- answer-quality: pass
- intent-router: pass
- llm-intent: pass
- live-regression: pass, P0=0 / P1=0 / P2=16
- audit:user-facing-copy: pass
- audit:launch-copy: pass
- lint-answer: pass

## 是否推 main
是。

原因：P0=0，红线用例全部通过，build/test 全过，无 migration，无 production DB 写入需求，login/admin/answer 主链路未破坏。
