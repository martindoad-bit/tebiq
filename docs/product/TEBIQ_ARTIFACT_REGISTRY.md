# TEBIQ Artifact Registry

> 所有可复用资产（VOICE / DOMAIN / QA Gates / Eval / Scripts）的集中登记表。
> **规则：聊天窗口输出只算草稿，repo 文件才算可协作资产。**
> ENGINE / QA 只读取本 registry 中已登记的 repo 路径，不读取聊天内容。

| 规则 | 说明 |
|------|------|
| 登记责任人 | GM |
| 更新触发 | 任何新资产 PR merge → GM 立即登记 |
| 消费规则 | ENGINE / QA / DOMAIN 必须读 repo 文件，不得从聊天记录读取文案 |
| 提交流程 | VOICE / DOMAIN / QA Gates → 对应窗口提交 PR → GM review → merge → 登记 |

---

## VOICE 资产

| 资产名称 | 路径 | Owner | Status | Review Required | 消费方 | Source Commit | Last Updated |
|---------|------|-------|--------|----------------|--------|--------------|-------------|
| VOICE Principles | `docs/voice/TEBIQ_VOICE_PRINCIPLES.md` | TEBIQ-VOICE | draft / preview-only | DOMAIN + Project Lead | GM / ENGINE / QA | `02b8e59` | 2026-05-05 |
| Status Language Templates | `docs/voice/TEBIQ_STATUS_LANGUAGE_TEMPLATES.md` | TEBIQ-VOICE | draft / preview-only | DOMAIN + Project Lead | ENGINE / QA | `02b8e59` | 2026-05-05 |
| Internal Console Label System | `docs/voice/TEBIQ_INTERNAL_CONSOLE_LABEL_SYSTEM.md` | TEBIQ-VOICE | draft / preview-only | DOMAIN + Project Lead | ENGINE / QA | `02b8e59` | 2026-05-05 |
| Risk Level Vocabulary | `docs/voice/TEBIQ_RISK_LEVEL_VOCABULARY.md` | TEBIQ-VOICE | draft / preview-only | DOMAIN + Project Lead | ENGINE / QA / DOMAIN | `02b8e59` | 2026-05-05 |
| Clarification Library | `docs/voice/TEBIQ_CLARIFICATION_LIBRARY.md` | TEBIQ-VOICE | draft / preview-only | DOMAIN + Project Lead | ENGINE | `02b8e59` | 2026-05-05 |
| Scope Exit & Routing Language | `docs/voice/TEBIQ_SCOPE_EXIT_ROUTING_LANGUAGE.md` | TEBIQ-VOICE | draft / preview-only | DOMAIN + Project Lead | ENGINE / QA | `02b8e59` | 2026-05-05 |
| Human Review Language | `docs/voice/TEBIQ_HUMAN_REVIEW_LANGUAGE.md` | TEBIQ-VOICE | draft / preview-only | DOMAIN + Project Lead | ENGINE / QA | `02b8e59` | 2026-05-05 |
| User Preview Matter Copy | `docs/voice/TEBIQ_USER_PREVIEW_MATTER_COPY.md` | TEBIQ-VOICE | draft / preview-only | DOMAIN + Project Lead | ENGINE | `02b8e59` | 2026-05-05 |
| Internal Console Copy Map | `docs/voice/TEBIQ_INTERNAL_CONSOLE_COPY_MAP.md` | TEBIQ-VOICE | draft / preview-only | DOMAIN + Project Lead | ENGINE / QA | `02b8e59` | 2026-05-05 |
| Preview State Copy Map | `docs/voice/TEBIQ_PREVIEW_STATE_COPY_MAP.md` | TEBIQ-VOICE | draft / preview-only | DOMAIN + Project Lead | ENGINE / QA | `02b8e59` | 2026-05-05 |
| Matter Copy Map | `docs/voice/TEBIQ_MATTER_COPY_MAP.md` | TEBIQ-VOICE | draft / preview-only | DOMAIN + Project Lead | ENGINE | `02b8e59` | 2026-05-05 |
| QA Voice Checklist | `docs/voice/TEBIQ_QA_VOICE_CHECKLIST.md` | TEBIQ-VOICE | draft / preview-only | DOMAIN + Project Lead | QA | `02b8e59` | 2026-05-05 |
| DOMAIN Input Request | `docs/voice/TEBIQ_DOMAIN_INPUT_REQUEST.md` | TEBIQ-VOICE | draft / preview-only | DOMAIN | DOMAIN / GM | `02b8e59` | 2026-05-05 |
| Voice README | `docs/voice/README.md` | GM | active | — | ENGINE / QA / DOMAIN | `02b8e59` | 2026-05-05 |

---

## DOMAIN 资产

| 资产名称 | 路径 | Owner | Status | Review Required | 消费方 | Source Commit | Last Updated |
|---------|------|-------|--------|----------------|--------|--------------|-------------|
| 100Q Risk Matrix | `docs/domain/DOMAIN_100Q_RISK_MATRIX.md` | DOMAIN-CC | draft / needs human review | Project Lead | VOICE / ENGINE / QA | `cd5cd8e` | 2026-05-05 |
| Risk Patterns | `docs/domain/DOMAIN_RISK_PATTERNS.md` | DOMAIN-CC | draft / needs human review | Project Lead | VOICE / ENGINE / QA | `cd5cd8e` | 2026-05-05 |

---

## Eval 资产

| 资产名称 | 路径 | Owner | Status | Review Required | 消费方 | Source Commit | Last Updated |
|---------|------|-------|--------|----------------|--------|--------------|-------------|
| Eval Round 1 Sample Pack | `docs/eval/EVAL_ROUND1_SAMPLE_PACK.md` | GM | active | GM | ENGINE / QA / DOMAIN | `f8051b0` | 2026-05-05 |
| Routing Safety Gate Pack | `docs/eval/EVAL_ROUTING_SAFETY_GATE_PACK.md` | GM | active (Issue #18 ✅) | — | ENGINE / QA | `f8051b0` | 2026-05-05 |
| Internal Console Pack | `docs/eval/EVAL_INTERNAL_CONSOLE_PACK.md` | GM | active (Issue #19 ✅) | — | ENGINE | `6166cf8` | 2026-05-05 |
| DOMAIN 100Q Pack | `docs/eval/EVAL_DOMAIN_100Q_PACK.md` | GM | active (Issue #20 ✅) | — | DOMAIN | `7d378fd` | 2026-05-05 |
| Round 1A Recovery Plan | `docs/eval/EVAL_ROUND1A_RECOVERY_PLAN.md` | GM | active | — | GM / ENGINE | `f8051b0` | 2026-05-05 |
| OOS Pack | `docs/eval/EVAL_ROUND1A_OUT_OF_SCOPE_PACK.md` | GM | active | — | DOMAIN / ENGINE | `f8051b0` | 2026-05-05 |
| DOMAIN Work Packet | `docs/eval/EVAL_ROUND1A_DOMAIN_WORK_PACKET.md` | GM | pending (awaiting FULL_COMPARABLE) | GM | DOMAIN | `5ad36ea` | 2026-05-05 |

---

## Ops / Work Packets

| 资产名称 | 路径 | Owner | Status | 消费方 | Source Commit | Last Updated |
|---------|------|-------|--------|--------|--------------|-------------|
| Workstream A Console Deblock | `docs/ops/WORKSTREAM_A_CONSOLE_DEBLOCK_PACK.md` | GM | active (Issue #26) | ENGINE | `2d9ecaa` | 2026-05-05 |
| Workstream B Preview Feedback | `docs/ops/WORKSTREAM_B_PREVIEW_STAGE_FEEDBACK_PACK.md` | GM | active (Issue #27) | ENGINE | `2d9ecaa` | 2026-05-05 |
| Track D User Preview Pack | `docs/ops/TRACK_D_USER_PREVIEW_PACK.md` | GM | active (Issue #21) | ENGINE | `7d378fd` | 2026-05-05 |
| Project Milestones | `docs/ops/TEBIQ_PROJECT_MILESTONES.md` | GM | active | all | `60a591a` | 2026-05-05 |
| Agent Workflow | `docs/ops/TEBIQ_AGENT_WORKFLOW.md` | GM | active | all | `6166cf8` | 2026-05-05 |

---

## 协作规则（固定）

### 资产提交流程

```
VOICE / DOMAIN / QA Gates 等可复用资产
  → 对应窗口提交 PR（到 docs/voice/ 或 docs/domain/ 等）
  → GM review
  → merge
  → GM 登记到本 registry
```

**聊天窗口输出只算草稿，不算完成。**  
**没有 repo 路径 = 没有资产。**

### ENGINE / QA 消费规则

- 必须读 registry 中已登记的 repo 路径
- 不得从聊天记录读取文案
- 如果 registry 中没有需要的资产 → 停止，向 GM 报告缺口

### GM 维护规则

| 触发 | 动作 |
|------|------|
| 新资产 PR merge | 立即登记（name / path / commit / date）|
| 资产状态变更 | 更新 status 字段 |
| 资产废弃 | 标注 `deprecated`，不删除行 |
