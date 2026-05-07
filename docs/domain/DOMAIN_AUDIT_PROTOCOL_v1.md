# DOMAIN Audit Protocol v1 — AI-first Fact Layer

**Sprint**: TEBIQ 0.6
**Owner**: TEBIQ-DOMAIN-CC
**Issued by**: GM (per PL 0.6 sprint §3 + AI-first publish gate revision)
**Sister docs**:
- `docs/fact-cards/README.md` — directory contract & state machine
- `docs/fact-cards/FACT_OPS_WINDOW_TASK_PACK.md` — what FACT does
- `docs/engineering/0.6-fact-layer-design.md` — how cards inject

---

## 0. STARTER PROMPT (PL: 复制此到 DOMAIN-CC 窗口当任务派发时)

```text
你是 TEBIQ DOMAIN-CC。本次任务：抽检 GM 派发的 fact card PR(s)。

PL 已明确 DOMAIN 在 0.6 AI-first Fact Layer 中的角色：
不写卡，只复核 high/critical 卡，处理 needs_review/conflict，
做专业红队，做 incident review。

主任务（按 docs/domain/DOMAIN_AUDIT_PROTOCOL_v1.md）：
1. 接收 GM tag 的 PR
2. 按 §2 checklist 抽检卡内容
3. 在 PR 上 comment：approve / request edit / reject / mark needs_review
4. 必要时翻 state 到 human_reviewed（在 PR 改 frontmatter）

绝对边界：
- 不重写整张卡（只改你判断错误的字段；其他保持 FACT 原样）
- 不动 controlled_alpha_eligible 标志（仅 PL 可设）
- 不直接 merge PR（GM 负责）
- 不讨论 UI / 工程实现 / 速度（不在你的 scope）

每张卡 audit 完毕，在 PR 用 §4 报告模板 comment。
```

---

## 1. DOMAIN 在 0.6 中的角色定义

### DO

- 抽检 `risk_level: high` 和 `risk_level: critical` 的 `ai_verified` 卡
- 处理 `state: needs_review` 和 `state: conflict`
- 专业红队（在 PR 找出 FACT 漏掉的边界 case、在留法运用细节）
- Incident review（用户/書士反馈事实错误时复盘根因）
- 判断卡是否需要 disabled 或降级
- 周采样审 5 张随机 ai_verified 卡（GM 周末汇总）

### DON'T

- ❌ 从 0 写卡（FACT 负责生产）
- ❌ 改卡的 source 列表（只能在 needs_review_flag 里指出未确认项）
- ❌ 设 `controlled_alpha_eligible: true`（仅 PL）
- ❌ 设 `state: human_reviewed` 但同时降级 risk（要么改内容要么改 state，不要既保留 ai 内容又翻 state）
- ❌ 直接 merge PR（GM 负责）
- ❌ 讨论 UI / 工程 / 速度
- ❌ 在 `docs/fact-cards/` 之外做改动

---

## 2. 抽检 Checklist

打开 GM tag 你的 PR，按以下顺序检查：

### 2.1 Source 实地核对

- [ ] 至少 1 个 `official_sources[].url` 你能打开并看到引用的原文
- [ ] 引用的 quote 与 official 页面文字一致（不是拼凑、不是改写）
- [ ] `last_checked_at` 在 30 天内
- [ ] 来源在 `docs/fact-cards/README.md` §3 source whitelist 内

### 2.2 direct_fact_fields 内容

- [ ] 每条字段都能在 official source 中找到对应原文
- [ ] 没有 AI 推论混入 direct_fact（应在 ai_inferred_fields）
- [ ] 数字 / 期限 / 适用范围 / 例外条件 在你的专业判断下正确

### 2.3 ai_inferred_fields

- [ ] 推论合理（不是 AI 编造）
- [ ] 推论是否应该转为 needs_review_flag（如果在留运用上不确定）

### 2.4 needs_review_flags

- [ ] 你能补上某个 needs_review 字段的事实 → 转移到 direct_fact + 加 source
- [ ] 现存 needs_review 的原因正确（如果是 FACT 多虑了，可移除该 flag）
- [ ] 是否有 FACT 漏标的 needs_review（如：你认为某个 direct_fact 实际有运用争议）

### 2.5 must_say / must_not_say

- [ ] must_say 涵盖在留实务中真正关键的点
- [ ] must_not_say 涵盖最危险的承诺词、过期条件、错误推荐
- [ ] 没有把 voice 边界违反的话写进 must_say
- [ ] 没有遗漏专业意义重要的 must（如某些卡需要明示「不直接基于 AI 判断」）

### 2.6 qa_cases

- [ ] 至少 3 条
- [ ] 涵盖典型问、边缘问、误信旧规则的问、过渡情形问
- [ ] must_have / must_not_have 反映 in-domain 实务标准

### 2.7 injection_certain_block

- [ ] 拼装的内容只来自 direct_fact + ai_inferred（无 needs_review）
- [ ] 日語表述准确（不是机翻、不是错字）
- [ ] 末尾"避けるべき表現" + "回答スタイル" 合理
- [ ] 未泄漏 needs_review 字段

### 2.8 needs_review_addendum

- [ ] 不下任何具体事实结论
- [ ] 仅 hint "建议向行政書士確認最新規則" 类表达

### 2.9 Risk + Confidence + Source quality 三档

- [ ] risk_level 自评合理（错误事实直接导致 P0 → critical；导致申请方向错误 → high；多走弯路 → medium；程序细节 → low）
- [ ] confidence 自评合理（多源一致 / 单源原文 quote → high；部分推论 → medium；多源冲突 / 多推论 → low）
- [ ] source_quality 与实际 source 一致

### 2.10 changelog

- [ ] AI 抽取记录完整
- [ ] 你的 audit 后追加一行（见 §3）

---

## 3. 你做完 audit 后的操作

### 3.1 完全通过

在 PR comment：

```text
DOMAIN AUDIT — APPROVED

state recommendation: human_reviewed
risk_level confirmed: <repeat>
confidence confirmed: <repeat>
notes: <optional>
```

并在 PR 中改卡的 frontmatter：

```yaml
state: human_reviewed
reviewer: domain-cc-<your-handle>
approved_at: <YYYY-MM-DD>
approved_by: <your name>
```

并在 changelog 表格追加：

```text
| YYYY-MM-DD | DOMAIN-CC <name> | audit + approve | ai_verified | human_reviewed | <notes> |
```

### 3.2 通过但带条件

当卡内容大部分对，但某个细节需要 FACT 调整后才能 human_reviewed：

```text
DOMAIN AUDIT — REQUEST EDIT

required edits:
1. <specific change in <section>>
2. ...

state recommendation: stay ai_verified, GM merge after edits applied
re-audit needed after edit: yes / no
```

### 3.3 重大问题

```text
DOMAIN AUDIT — REJECT

reasons:
- <which fact is wrong>
- <which source is misquoted>
- <what's the in-domain reality>

state recommendation: needs_review (or disabled if irreparable)
suggested action: <re-extract / re-source / wholesale rewrite by FACT>
```

并改 frontmatter `state: needs_review` 或 `disabled`。

### 3.4 Source 冲突

如果你发现 official source 之间冲突（罕见但可能）：

```text
DOMAIN AUDIT — CONFLICT

conflicting sources:
- source A: <url> says <X>
- source B: <url> says <Y>

cannot resolve without:
- [ ] PL 裁决
- [ ] 直接联系 official 部门
- [ ] 行政書士专业判断

state recommendation: conflict
```

并改 `state: conflict`。GM 会上报 PL（PL §6 触发条件 #3）。

---

## 4. Audit 完成后的简短报告（在 PR comment）

每张卡 audit 后，DOMAIN 在 PR comment 用此模板：

```markdown
## DOMAIN Audit — <fact_id>

**Decision**: APPROVE / REQUEST_EDIT / REJECT / CONFLICT
**State recommendation**: human_reviewed / ai_verified / needs_review / conflict / disabled

**Source verification**:
- [ ] Opened all official_sources URLs
- [ ] Quotes match
- [ ] last_checked_at acceptable

**Content verification**:
- direct_fact_fields: ✅ all valid / ⚠️ N items need edit
- ai_inferred_fields: ✅ reasonable / ⚠️ should move to needs_review
- needs_review_flags: ✅ correct / ⚠️ missing / ⚠️ over-flagged
- must_say / must_not_say: ✅ / ⚠️
- qa_cases: ✅ / ⚠️

**Risk + Confidence + Source quality**:
- risk_level: confirm / change to <X>
- confidence: confirm / change to <X>
- source_quality: confirm / change to <X>

**Required edits (if REQUEST_EDIT)**:
1. ...

**Specific concerns (if REJECT or CONFLICT)**:
1. ...

**My one-line take**:
<plain language professional opinion>

reviewer: domain-cc-<handle>
audited_at: <YYYY-MM-DD>
```

---

## 5. 周采样审计

每周末，GM 会从已 merged 的 ai_verified 卡里随机选 5 张，请 DOMAIN 做 lightweight 复审。

复审目的：
- 检查 ai_verified 自评是否系统性偏松/偏紧
- 检查 production 用了一段时间后有无 incident 苗头
- 检查 source 是否已被官方更新

复审格式：在 GM 开的 weekly audit issue 里 comment 5 张卡的 lightweight verdict（每张 2-3 行即可）。

---

## 6. Incident Review

当用户/書士反馈"模型给了错事实"：

1. GM 会从 `ai_consultations.fact_card_audit` 拉出涉事 consultation 的 fact_card_ids
2. GM 把涉事卡的 PR 历史 + consultation 详情 + 用户原话发给 DOMAIN
3. DOMAIN 判断：
   - 卡本身错（→ 改卡 + 翻 state）
   - 卡对但被错误命中（→ 通知 GM 调 matcher keyword bucket）
   - 卡对、命中正确，但模型推理错（→ 通知 GM 调 prompt / voice）
   - 用户反馈实际错（→ 在 PR / issue 留 audit log，无操作）
4. DOMAIN 在 issue 里写 root cause + 建议修复路径

---

## 7. 版本

| version | date | actor | change |
|---|---|---|---|
| v1.0 | 2026-05-07 | GM | 初版，0.6 Sprint AI-first publish gate 配套 DOMAIN audit 协议 |
