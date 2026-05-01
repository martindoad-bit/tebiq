# LLM Answer Engine v0 — Delivery Report

## Branch / build

- Branch: `claude/sleepy-archimedes-12177a`
- Base (main HEAD before this work): `71d871b chore: make vercel cron hobby compatible`
- Production URL: 由 Vercel 上 main 分支自动部署（与本仓库现有部署管线一致；本次未触碰部署配置）。
- `/api/build-info` 版本字段：`llm-answer-engine-v0`（替换原先 `redline-gate-v3`）。
- 是否 merge main：**否**。变更全部在 `claude/sleepy-archimedes-12177a`，待你审阅后再合并。
- 是否 deploy production：**否**。同上，未推送、未发布。

## What changed

### 新增模块

1. **`lib/answer/answer-scope.ts`**  
   v0 唯一的 scope 闸门：检测问题是否属于五类在留（gijinkoku / business_manager / family_stay / permanent_resident / long_term_resident）。
2. **`lib/answer/llm-answer-generator.ts`**  
   一次 Bedrock Claude 调用，输入「用户问题 + 解析意图 + 候选 / 旧管道整理 + 命中 seed + 红线提醒 + scope」，输出严格 JSON envelope。`temperature=0`，22 秒超时。  
   失败、超时、JSON parse 错误一律返回 `null`，由调用方走 legacy fallback。
3. **`lib/answer/llm-answer-fallback.ts`**  
   两个工厂：  
   - `fallbackEnvelopeFromLegacy` — LLM 不可用 / 关闭 / 失败时，把 legacy answer 包装成同 schema 的 envelope，标记 `engine_version: 'legacy-fallback'`。  
   - `outOfScopeEnvelope` — 超出 v0 五类时直接返回，不调 LLM。
4. **`scripts/test/test-llm-answer-engine.ts`**  
   20 条验收用例的离线测试脚本（`ANSWER_GENERATION_DISABLE_AI=1` 跑完全 fallback 路径，验证红线在 legacy 也不会被踩）。

### 修改

- `lib/answer/types.ts` — 新增 `AnswerMode` / `SupportedDomain` / `KeyMissingInfo` / `NextAction` / `LlmAnswerEnvelope` / `EngineVersion` 五个类型，并在 `AnswerResult` 上挂可选 `llm_envelope`。原有字段全部保留。
- `lib/answer/submit-question.ts` — 重排 pipeline：classify → scope → buildAnswer (legacy) → generateLlmAnswer → fallback。Legacy answer 始终生成，作为最坏情况兜底。
- `app/api/questions/route.ts` — 响应里新增 `llm_envelope`、`engine_version`、`answer_mode`，旧字段保留以兼容前端。
- `app/answer/[id]/page.tsx` + `app/answer/[id]/AnswerResultView.tsx` — 前端按 `answer_mode` 分发渲染：  
  - `direct_answer`：完整行动卡（结论 / 最紧的两件 / 步骤 / 去哪办 / 要带什么 / 期限 / 不做会怎样 / 要找专家）。  
  - `answer_with_assumptions`：顶部加「我先按以下假设给你一个初步整理。」黄色 banner，列 `assumptions`，再渲染 next_actions + materials + key_missing_info。  
  - `clarification_needed`：只渲染澄清卡，**禁止显示**最紧的两件 / 步骤 / 期限 / 不做会怎样 / 要找专家 / 来源说明。  
  - `out_of_scope`：显示当前支持范围 + 引导补充身份和事项。  
- 复制按钮文案：`复制给客户` → **`复制 TEBIQ 的建议`**，复制内容来自 envelope 的 `copy_text`，legacy fallback 时用旧的 `buildLegacyCopy` 产生同等内容。
- `lib/db/queries/answerDrafts.ts` — `LlmAnswerEnvelope` 通过 `sectionsJson` 挂载点 `__llm_envelope_v0__` 持久化；读取时用 `extractLlmEnvelopeFromSections` 抽出，**不需要 DB migration**。
- `lib/answer/intent-router.ts` — 在 `extractDirectionalVisaTransfer` 的 visa 列表与 `normalizeVisaLabel` 中补 `定住者|定住`，并加一条更宽松的衔接 pattern（允许「配偶签离婚后想转定住」之类有 `离婚后` 桥接文本）。
- `lib/answer/match-answer.ts` — 修复 `isFamilyWorkPermissionIntent` 误判：当 `target_status` 已是工作签 / 经管时不再走资格外活动 28 小时分支；问题文本含「转工作签 / 转技人国 / 转人文」时也不再触发。这条修复直接消除了「家族滞在 → 工作签」被错答成「资格外活动 28 小时」的 P0。
- `app/api/build-info/route.ts` — 版本字段升级为 `llm-answer-engine-v0`。

## Seeds 状态

- 文件：[content/answer-seeds/llm-answer-v0-seeds.json](content/answer-seeds/llm-answer-v0-seeds.json) — 20 条结构化 seed（与验收 case 一一对应），含 schema reference、5 类 supported domains、每条的 question / expected_answer_mode / expected_domain / must_contain / must_not_contain / notes。
- **Seeds prepared but not wired into generator.** 当前 `lib/answer/llm-answer-generator.ts` 不会读取这个 JSON——它的候选 seed 仍来自 legacy 的 `bestGoldSeed` / `bestQaSeed`，通过 `submit-question.ts` 里 `candidateSeed: null` 占位。把这份 JSON 接入需要新增一个 loader（按 question 关键字匹配，再 push 到 `buildUserPayload()` 的 `=== 命中 seed ===` 段），是后续 PR 的小手术。
- 不接入这次 PR 的原因：seeds 主要用作 LLM live 路径的 prompt grounding，而 live 路径还没有在生产凭据下验证；提前接入 seeds 会绑定一个未验证的 prompt 形态。先把 envelope schema、fallback 契约、前端 dispatch 上线，确认稳定后再用一个独立 PR 接入 seeds 并做对照测试。

## LLM answer generation 调用位置

- 唯一入口：`generateLlmAnswer` in `lib/answer/llm-answer-generator.ts`。
- 调用方：`resolveEnvelope` in `lib/answer/submit-question.ts`，发生在 `buildAnswer` 后、`createAnswerDraft` 前。
- Provider：`@anthropic-ai/bedrock-sdk`（继承现有 intent parser 配置）。
- 模型默认：`jp.anthropic.claude-sonnet-4-6`（与 `lib/answer/llm-intent-parser.ts` 同款）。可由 `ANSWER_GENERATION_MODEL_ID` / `ANSWER_LLM_MODEL` 覆盖。
- 触发条件：scope 命中五类 + AWS 凭据齐全 + `ANSWER_GENERATION_DISABLE_AI !== '1'` + `ANSWER_LLM_ENABLED !== '0'`。任意一个不满足都走 fallback。
- 永远不调用：scope 超出五类（直接 `outOfScopeEnvelope`）。

## Fallback 行为

按以下顺序判定 `engine_version`：

1. `out_of_scope` 提前命中 → `engine_version: 'out-of-scope-v0'`，不调 LLM。
2. LLM 调用成功 + JSON 解析成功 → `engine_version: 'llm-answer-v0'`，`answer_mode` 由 LLM 决定。
3. LLM 关闭 / 凭据缺 / 抛异常 / 超时 / parse 失败 → `engine_version: 'legacy-fallback'`，envelope 由 legacy answer 生成。LLM 抛异常时额外标 `llm_error: true`。

不暴露内部错误给用户，不返回 5xx，所有失败路径都返回 200。

## 20 条验收测试结果

`ANSWER_GENERATION_DISABLE_AI=1 ANSWER_INTENT_DISABLE_AI=1 npx tsx scripts/test/test-llm-answer-engine.ts`

| ID | 问题 | severity | mode | engine | 结果 |
|---|---|---|---|---|---|
| P0-mgr-to-humanities | 我是经管签，想转人文签 | P0 | direct_answer | legacy-fallback | PASS |
| P0-humanities-to-mgr | 我想从人文签转为经管签怎么办 | P0 | clarification_needed | legacy-fallback | PASS |
| P0-family-stay-to-work | 家族滞在想转工作签 | P0 | direct_answer | legacy-fallback | PASS |
| P0-family-stay-work-permission | 家族滞在配偶可以打工吗 | P0 | answer_with_assumptions | legacy-fallback | PASS |
| P0-spouse-divorce-to-teiju | 配偶签离婚后想转定住 | P0 | direct_answer | legacy-fallback | PASS |
| P0-mgr-renewal-materials | 经管续签材料有哪些 | P0 | answer_with_assumptions | legacy-fallback | PASS |
| P0-permanent-resident-pension | 永住申请年金没交怎么办 | P0 | clarification_needed | legacy-fallback | PASS |
| P0-immigration-deadline | 入管让补材料，期限赶不上怎么办 | P0 | clarification_needed | legacy-fallback | PASS |
| P0-denial-notice | 不许可通知书怎么办 | P0 | clarification_needed | legacy-fallback | PASS |
| P0-representative-change | 代表取締役换人要通知入管吗 | P0 | clarification_needed | legacy-fallback | PASS |
| P1-tokutei-change-employer | 特定技能换会社要做什么 | P1 | out_of_scope | out-of-scope-v0 | PASS |
| P1-mgr-capital-shortage | 经管签资本金 500 万够吗 | P1 | clarification_needed | legacy-fallback | PASS |
| P1-pure-tax | 日本年终如何报税最划算 | P1 | out_of_scope | out-of-scope-v0 | PASS |
| P1-restaurant | 在新宿开个中餐厅怎么选址 | P1 | out_of_scope | out-of-scope-v0 | PASS |
| P1-permanent-tax-record | 永住申请税金证明几年的 | P1 | clarification_needed | legacy-fallback | PASS |
| P1-mgr-office | 经营管理签办公室能用住宅吗 | P1 | clarification_needed | legacy-fallback | PASS |
| P1-family-stay-school | 家族滞在小孩上小学要办什么 | P1 | direct_answer | legacy-fallback | PASS |
| P1-teijusha-extension | 定住者签证更新要多久 | P1 | clarification_needed | legacy-fallback | PASS |
| P1-jinbun-jobchange | 人文签换工作 14 日内届出怎么交 | P1 | clarification_needed | legacy-fallback | PASS |
| P1-permanent-criminal | 永住申请有交通罚款记录会被拒吗 | P1 | clarification_needed | legacy-fallback | PASS |

**总计：20/20 PASS，P0 失败：0。**

> 注：因当前 worktree 没有 AWS Bedrock 凭据，所有用例都走 legacy-fallback 路径——这正好验证「LLM 不可用 → 不会 5xx，envelope 仍可渲染，红线不被踩」的兜底契约。LLM live 路径需要在 Vercel 生产环境（凭据齐全）由人工 smoke。

### P0 / P1 / P2 / P3 汇总

- **P0**: 0
- **P1**: 0
- **P2**: 0
- **P3**: 0（其余观察项见「创始人手测建议」）

### 修复中触发的两条 legacy 隐性 bug（顺手修了）

1. 「家族滞在想转工作签」→ legacy 把它误归资格外活动 28 小时。修复点：`isFamilyWorkPermissionIntent` 加 `target_status` / `转工作签` 短路。
2. 「配偶签离婚后想转定住」→ `extractDirectionalVisaTransfer` 不认识「定住」也不允许 `离婚后` 这种桥接文本，导致 intent 无 target，envelope 不提及「定住」。修复点：visa 列表加 `定住者|定住`，新增一条宽松 pattern。

## 创始人应该手动测哪 10 条

LLM 真实质量必须在 Vercel 生产环境（AWS 凭据齐全 → `engine_version` 应为 `llm-answer-v0`）人工验证。建议复制下面 10 条到首页问答框，逐条检查：

1. 我是经管签，想转人文签 — `direct_answer`，方向必须是 经管 → 人文，不能反转。
2. 我想从人文签转为经管签怎么办 — 同上，方向必须是 人文 → 经管。
3. 家族滞在想转工作签 — `direct_answer` / `answer_with_assumptions`，必须谈在留資格変更，**不准**出现「资格外活动 28 小时」。
4. 家族滞在配偶可以打工吗 — 必须给「资格外活动许可 + 28 小时/周 + 出入国在留管理局」，不要谈在留資格変更。
5. 配偶签离婚后想转定住 — 必须谈定住者条件（婚姻持续期、生活基础、税金/年金），**不准**出现「14 日届出」。
6. 经管续签材料有哪些 — 至少把材料分成本人、公司、税务、雇佣四类，不要 hard‑code「资本金 500 万」当结论。
7. 永住申请年金没交怎么办 — 必须 `answer_with_assumptions` 或 `clarification_needed`，先确认未缴年限和身份。
8. 入管让补材料，期限赶不上怎么办 — 应触发 `clarification_needed`，先问期限/通知日。
9. 不许可通知书怎么办 — 应触发 `clarification_needed`，先问签证类别和申请阶段。
10. 代表取締役换人要通知入管吗 — `direct_answer` / `answer_with_assumptions`，要分开法务局登記和入管届出。

附加自检项：随手输 `日本年终如何报税最划算` 验证 `out_of_scope`；随手输 `特定技能换会社` 验证 `out_of_scope`（v0 主线不含特定技能）；切换 `engine_version` 在 `/api/build-info` 看到 `llm-answer-engine-v0`。

## 没做的事（按 spec 不做）

- ❌ 重写整个产品。
- ❌ 删除 legacy answer。
- ❌ 专家网络 / 24 小时回复 / 新支付。
- ❌ 大改首页。
- ❌ 继续补旧 fixture 当主线。
- ❌ LLM 无资料裸答（输入 prompt 强制带 legacy answer + seed + 红线 + scope）。
- ❌ 输出任何 secret。
- ❌ 要求新 AWS / Vercel / Bedrock key。

## 部署 / 上线提示

- 本次只修代码，不改环境变量。LLM 生成在生产生效需要 `AWS_ACCESS_KEY_ID` + `AWS_SECRET_ACCESS_KEY` + `AWS_REGION`（已存在）和默认开关（`ANSWER_GENERATION_DISABLE_AI` 不要设为 `1`）。
- 临时关闭 LLM 生成回到纯 legacy：在 Vercel 设 `ANSWER_GENERATION_DISABLE_AI=1`，envelope 会自动标 `legacy-fallback`，前端渲染不变。
- DB 不需要 migration —— envelope 通过 `sectionsJson` 的 `__llm_envelope_v0__` sidecar 持久化，读路径已兼容旧记录（旧记录无 sidecar 时 `llm_envelope: null`，前端会落回原行动卡布局）。
