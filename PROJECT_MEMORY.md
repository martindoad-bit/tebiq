# TEBIQ Project Memory

**Status:** current memory router / not a standalone product spec
**Last updated:** 2026-05-17
**Owner:** Codex Production Lead / AI Engineering Lead

> Start here only to understand where current truth lives.
> Do not treat this file as the full product brief.
>
> Previous memory snapshots and early product assumptions are archived under
> `docs/archive/memory/`.

---

## 0a. AI Agent 协作工作模式（**所有 AI 接手者第一时间必读**）

> **强制约定**：在 TEBIQ 上工作的 AI agent（Claude Code / Codex / 任何其他 agent）**先读** `docs/ops/TEBIQ_AI_AGENT_WORK_MODE.md` **再开工**。
>
> 核心：**Agent 自决工程，user 只决业务。**中间不汇报，结束才交付可视化产品改动。Work Block 模式（4-12 小时一个完整可见改动），不是 PR-by-PR 模式。
>
> 如果这份 work mode 跟其他 ops 文档冲突（ROLES_V2 / DELEGATION_PRINCIPLES / Work Packet 模板），以 work mode 为准。前者是按人类工程组织写的，对 agent 不适用。

---

## 0. Current Product Truth

TEBIQ is currently:

> **A residence-risk management and consultation system for foreigners in Japan.**

Its job is not to be a generic AI Q&A app, immigration encyclopedia, or
administrative scrivener website. Its job is to help users see the real
residence-friction risk, separate known facts from uncertain judgement, and move
to the next safe action.

The current shipped phase is:

> **TEBIQ 0.8: safety-gated consultation release.**

0.8 has shipped. It is not a full legal-source advisory product and does not
replace administrative scriveners.

The current active buildout path is:

> **0.8.5 -> 1.0 through six ordered engineering programs.**

Read this roadmap before resuming long-running product work:

```text
docs/ops/TEBIQ_1_0_SIX_ENGINEERING_ROADMAP.md
```

The six programs are:

1. 0.8.5 Release Candidate;
2. Knowledge Asset Import;
3. Materials Tab Tooling;
4. Deep-Water Routing And Professional Boundary;
5. Eval Lab Quality Flywheel;
6. 1.0 Release.

Do not treat "more cards" or "more pages" as the 1.0 goal. The goal is a
stable residence-friction reduction system with safe answers, useful materials,
deep-water routing, and a durable quality loop.

Current runtime truth lives in:

1. `docs/product/TEBIQ_CURRENT_STATE.md`
2. `docs/ops/TEBIQ_0_8_RELEASE_CANDIDATE_MANIFEST.md`
3. `docs/ops/TEBIQ_0_8_RELEASE_CUTOVER_CHECKLIST.md`
4. `docs/ops/TEBIQ_0_8_PRE_RELEASE_P0_CLOSURE_MATRIX.md`
5. `docs/ops/TEBIQ_0_8_POST_RELEASE_CONVERGENCE_REPORT.md`
6. `docs/ops/TEBIQ_1_0_SIX_ENGINEERING_ROADMAP.md`

Long-term product truth lives in:

1. `docs/product/TEBIQ_CONTEXT_PACK.md`
2. `docs/product/TEBIQ_DECISION_LOG.md`
3. `docs/ops/TEBIQ_ROLES_V2.md`
4. `docs/ops/TEBIQ_DELEGATION_PRINCIPLES.md`

If this file conflicts with those documents, those documents win.

---

## 1. Current Product Surfaces

### 提问 Tab

The consultation surface must keep the answer summary labels:

```text
先看这里
当前判断
建议动作
暂缓事项
```

These labels are frozen for the current answer experience. Historical docs that
use `最紧的两件`, `步骤`, `要带什么`, `复制给客户`, or similar answer-section systems
are superseded unless a future Decision Log explicitly restores them.

### 材料 Tab

User-facing naming is **材料** / **材料清单**.

`Quick Reference` may remain as an internal route or historical file name, but
it must not be treated as the product label. The old user-facing name `速查` is
not the current product direction.

The Materials surface is a scenario-first official-material checklist system:

- common procedure pages;
- reusable common-document cards;
- collapsed-by-default mobile reading;
- cross-links between scenarios and common materials;
- a bridge back to 提问 for case-specific uncertainty.

It must not imply that complete materials guarantee permission.

### Eval Lab / 中台

Eval Lab is the quality flywheel surface. It is for answer comparison,
annotation, retries, provenance, and AQL / QA / DOMAIN loops. It is not a user
feature and must remain protected.

### 找书士 / Admin

Admin and internal surfaces must fail closed without valid admin access.
Scrivener leads are a human-review / professional-confirmation path, not a
claim that TEBIQ itself is an administrative scrivener.

---

## 2. Current Copy Rules

Current canonical copy documents:

1. `docs/product/TEBIQ_COPY_SOURCE.md`
2. `docs/product/TEBIQ_COPY_CANON.md`
3. `docs/product/TEBIQ_PRODUCT_UI_GUARDRAILS.md`

Old product-copy files under `docs/product-copy/` are historical reference unless
their content is explicitly copied into the current canon.

Rules:

- user-facing copy should feel like an app, not an engineering report;
- do not expose model names or internal pipeline terms;
- do not use `AI 智能分析`, `问 AI`, `DeepSeek`, `ChatGPT`, `Claude`, or sidecar
  fields on user surfaces;
- do not invent legal facts for nicer wording;
- copy involving professional facts must be supported by fact cards, DOMAIN
  review, or the model answer being displayed.

---

## 3. Knowledge And Fact Layer Rules

The knowledge layer is valuable, but not every card is runtime-connected.

Promotion path:

```text
official source -> FACT card -> QA/source audit -> DOMAIN review if risky -> runtime route/retrieval
```

Known caution:

- `経営・管理` 2025 reform material is high-risk. Keep confirmed official
  requirements separate from older startup shorthand, especially old `500万円`
  language.
- Legal-source cards and materials cards can coexist, but they must remain
  traceable and reviewable.
- Unknown stays unknown. Never convert unresolved DOMAIN or FACT conflict into
  user-facing certainty.

---

## 4. Current Role Model

Current roles are governed by:

- `docs/ops/TEBIQ_ROLES_V2.md`
- `docs/ops/TEBIQ_DELEGATION_PRINCIPLES.md`

Short form:

- Founder / CEO: final business and domain judgement;
- Codex Production Lead: engineering execution, docs hygiene, orchestration;
- Claude.ai / strategy window: product strategy and mirror, not engineering
  executor;
- FACT: official-source fact production;
- DOMAIN: residence-semantics review, not final legal judgement;
- AQL: answer quality diagnosis and quality-loop design;
- QA: technical, semantic, mobile, release regression;
- CODEXUI / Product Copy: UI and copy specialists under explicit task cards.

Do not recreate roles from memory. Read the current role docs.

---

## 5. Historical Assumptions That Are No Longer Current

The following ideas existed in earlier TEBIQ memory and reports, but are not the
current product truth:

- TEBIQ as a generic "在日生活好帮手 / 日常麻烦事工具集";
- first version without AI conversation;
- homepage as tool entrance around `续签自查 / 拍照即懂`;
- bottom nav `首页 / 我的档案 / 知识 / 我的`;
- answer sections `最紧的两件 / 步骤 / 要带什么 / 期限 / 不做会怎样`;
- user-facing tab name `速查`;
- old 500万円 shorthand as a current generic business-manager condition.

These may be useful as historical context only. Do not implement from them.

---

## 6. Freshness Rule

Before non-trivial work:

1. read `CLAUDE.md` and `AGENTS.md`;
2. read `docs/product/TEBIQ_CURRENT_STATE.md`;
3. check `origin/main`, open PRs, and production state when the task depends on
   current deployment;
4. if current docs conflict with runtime or the user's latest instruction,
   report the conflict instead of guessing.
