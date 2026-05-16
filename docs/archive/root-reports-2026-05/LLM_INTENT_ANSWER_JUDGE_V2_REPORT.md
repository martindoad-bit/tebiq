# LLM Intent + Answer Judge v2 Report

## 本轮目标
- 用 LLM intent parser 做第一层问题理解；LLM 不直接回答，只分类、抽取实体、选择模板。
- 增加方向锁定，避免 A → B 转换问题被反向理解。
- 将检索顺序调整为 intent → template → candidate retrieval → answer generation。
- 在答案展示前增加 Answer Judge，明显错配时转为澄清，不展示错答案。
- 扩展 intent benchmark 到 80 条，覆盖签证转换、年金/社保、资本金、办公室搬迁、生活手续等高频场景。

## 新增
- `lib/answer/llm-intent-parser.ts`
  - 读取 `ANSWER_INTENT_MODEL_ID` / `PHOTO_RECOGNITION_MODEL_ID`，无 AI env 时自动 degraded 到规则 fallback。
  - 输出严格 JSON：`normalized_question` / `user_goal` / `intent_type` / `domain` / `subject` / `current_status` / `target_status` / `preferred_template` / `confidence` 等。
- `lib/answer/answer-judge.ts`
  - 展示前判断答案是否回答原问题。
  - 拦截 domain mismatch、签证方向错配、模板错配、低质量泛回答。
- `scripts/test/test-llm-intent.ts`
  - 80 条 intent benchmark。
  - 默认禁用 AI，验证规则 fallback 与方向锁定。

## 红线测试
| query | expected | actual | result |
|---|---|---|---|
| 我是经管签，想转人文签 | current=经营管理 / target=技人国或人文 / domain=visa | current=经营管理 / target=技人国 / 人文签 / domain=visa | PASS |
| 我想从人文签转为经管签 | current=技人国或人文 / target=经营管理 / domain=visa | current=技人国 / 人文签 / target=经营管理 / domain=visa | PASS |
| 公司休眠了要不要交国民年金 | domain=pension，主答个人年金/健保义务 | 命中 `q081-公司倒闭-休眠-我的厚生年金-健保-怎么办` | PASS |
| 经营管理资本金不够怎么办 | target=经营管理，主答补救路径 | 命中 `management-capital-shortage` | PASS |
| 办公室搬迁要做哪些手续 | domain=company_registration，包含法务局/税务署/入管/合同/照片 | 命中办公室搬迁行动卡 | PASS |

## 低置信度策略
- confidence 4: 正常展示。
- confidence 3: 可展示，但仍经过 Answer Judge；页面可显示初步整理状态。
- confidence 2: 优先澄清，只展示需要确认的问题，不硬套答案。
- confidence 1: 只追问，不展示答案。

## 关键修复
1. A → B 方向锁定：`我是 A，想转 B`、`从 A 转 B`、`AからBに変更` 均强制 current=A / target=B。
2. 年金/社保场景：公司休眠、退职、入职前空白期先落到 pension / health_insurance，不漂移到经营管理续签。
3. 资本金不足：区分“不够怎么办”和“多少合适”，不足场景不再回到泛金额说明。
4. 候选答案过滤：candidate 与 intent 的 domain / current_status / target_status 冲突时不展示。
5. Answer Judge：展示前二次判断，错配时返回澄清问题。

## 验证
- `npm run lint`: PASS
- `npx tsc --noEmit`: PASS
- `npm run build`: PASS
- `npm run test`: PASS
- `npm run db:generate`: PASS, No schema changes
- `npm run test:answer-quality`: PASS
- `npm run test:intent-router`: PASS
- `npm run test:llm-intent`: PASS, 80/80
- `npm run audit:user-facing-copy`: PASS
- `npm run audit:launch-copy`: PASS
- `npm run lint:answer`: PASS

## 是否建议推 main
是。

原因：
- 三条核心红线已修复：经管 → 人文、人文 → 经管、公司休眠 + 年金、资本金不足。
- 80 条 intent benchmark 全部通过。
- 10 条 answer quality benchmark 全部通过。
- LLM 不可用时会安全 fallback 到规则，不白屏、不返回自由 AI 答案。
- 无 DB schema 变更，不需要 production migration。
