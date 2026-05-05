---
status: final
qa_window: TEBIQ-QA
work_packet: Issue #35 / QA_STABILIZATION_PACK_V02.md
date: 2026-05-05
commit_tested: e69ec8e (origin/main)
production_url: https://tebiq.jp
---

# QA Stabilization Report v0.2

## Context Stamp

- origin/main HEAD: e69ec8e
- CURRENT_STATE.main_head: b114810 (state-fix meta commit, not a conflict)
- Open PRs at time of test: none
- AGENTS.md: loaded
- QA_STABILIZATION_PACK_V02.md: loaded

---

## Overall Verdict: BLOCK

**P0 active in production. Routing Safety gate: BLOCK. VOICE S-02 + S-07 triggered.**

---

## Test Line 1 — M1 Internal Console QA

**Endpoint:** `GET /internal/eval-console`

| Check | Result |
|-------|--------|
| HTTP 200 | PASS |
| 100-question list renders | PASS |
| No internal fields (question_id, answer_type, etc.) in stripped HTML | PASS |
| Preview-only marker present | PASS |
| Provider health / DeepSeek status visible | Cannot verify from static HTML — eval-console is Next.js client-rendered; requires browser |

**M1 Verdict: CONDITIONAL PASS** — Static checks pass. Client-rendered provider-health panel cannot be verified via curl; recommend browser smoke test by CEO / operator before M1 sign-off.

---

## Test Line 2 — M4 Preview QA (SSE Phase 2)

**Endpoint:** `GET /internal/preview`

| Check | Result |
|-------|--------|
| HTTP 200 | PASS |
| `⚠️ 内部预览 · 非正式建议` disclaimer in HTML | PASS |
| Preview-only marker | PASS |
| `internal_code` NOT exposed to user-facing preview HTML | PASS |

**SSE Phase 2 limitation:** Full SSE stream verification (received state < 1s, no 25s blank wait, intermediate states) requires browser + DevTools. Cannot be verified via curl. Flagged to GM for browser-layer verification.

**M4 Verdict: CONDITIONAL PASS** — Endpoint health and copy compliance pass. SSE stream behavior requires browser verification.

---

## Test Line 3 — Routing Safety E2E QA (7 Regression Cases)

All tests executed live against `https://tebiq.jp/api/questions` in real-time (not from stored DB state).

| Tag | Question | Domain | Status | Result | Notes |
|-----|----------|--------|--------|--------|-------|
| J03 | 签证快到期，材料没准备好怎么办？ | admin_general | clarification_needed | ✅ PASS | Not out_of_scope; understood_question correct |
| J04 | 被公司解雇了，在留资格怎么办？ | admin_general | clarification_needed | ✅ PASS | Not out_of_scope |
| J08 | 在留资格和实际工作不一致怎么办？ | admin_general | clarification_needed | ⚠️ P1 | No `不法就労リスク` in risk_warnings (0 count); residual P1-A2 from M3A baseline |
| I08 | 公司还没清算，可以直接回国吗？ | business_manager | clarification_needed | ✅ PASS | Correct domain |
| D05 | 日本人配偶签离婚后还能留在日本吗？ | long_term_resident | answered | ❌ **P0** | Returns WRONG answer about 14日届出 / 工作変更届 — entirely different scenario |
| D06 | 配偶签离婚后多久要处理在留问题？ | long_term_resident | answered | ❌ **P0** | Returns IDENTICAL wrong answer as D05; `understood_question` identical to D05 — M2 explicitly forbids this |
| D09 | 换签证会不会影响家人的在留资格？ | family_stay | clarification_needed | ✅ PASS | Correct domain |

**Routing Safety Verdict: BLOCK — 5/7 PASS, 2/7 FAIL (D05, D06)**

### P0 Detail — D05 / D06 Content Pollution

**Nature:** Active routing bug, NOT stale DB data. Both questions return `answer_type=matched` pointing to the same wrong answer record:

```
title:  "关于定住者：换工作半年了 一直没去入管报告 现在补还来得及吗"
domain: long_term_resident
engine: answer-core-v1
```

The matched content is about **14日届出 / 工作変更届** (workplace change notification obligation) — completely unrelated to divorce / spouse visa transition.

**What users receive:** A person asking whether they can stay in Japan after divorce with their Japanese spouse receives information about workplace change reporting obligations. Critical divorce transition risk (6-month window to change status) is NOT communicated.

**M2 Gate Failure:**
- D05 requires "桥接定住者" routing — FAIL (routing matches wrong answer)
- D06 requires `understood_question` different from D05 — FAIL (identical understood_question AND identical answer body)

**Risk Classification:** HIGH — user receives wrong, potentially harmful guidance for an in-scope, real-risk scenario. Meets P0 threshold: "wrong high-risk answer."

---

## Test Line 4 — VOICE Compliance QA

Checklist: `docs/voice/TEBIQ_QA_VOICE_CHECKLIST.md`

### Section 1.1 Copy Integrity

| Check | Result |
|-------|--------|
| Preview-only marker `⚠️ 内部预览 · 非正式建议` present on preview path | PASS |
| `internal_code` not rendered to end users in any UI path tested | PASS |
| `internal_code` not exposed in eval-console HTML | PASS |
| Fallback answer carries `[降级回答]` marker | **FAIL** — D05/D06 with `fallback_reason=llm_timeout` returns `status=answered` with wrong matched content; no `[降级回答]` marker; indistinguishable from a correct normal answer |
| Disclaimer text present in answers | PASS |

### Section 1.2 Risk Calibration

| Check | Result |
|-------|--------|
| HIGH-risk scenarios NOT softened | **FAIL (S-02)** — D05/D06 are HIGH-risk scenarios (listed in S-02); they return wrong content that omits all divorce/visa-transition risk |
| No marketing/companion tone | PASS |
| No alarmist exaggeration | PASS |

### Section 1.3 Legal Boundary

| Check | Result |
|-------|--------|
| No legal certainty statements | PASS |
| No gyosei-shoshi-level advice without attribution | PASS |
| Escalation copy includes concrete next step | PASS (consult_trigger present) |

### Severity Triggers Fired

| Trigger | Status | Evidence |
|---------|--------|----------|
| S-02: HIGH-risk softened | **FIRED** | D05/D06 (both HIGH-risk per checklist) return wrong workplace-change answer; divorce/visa risk completely absent |
| S-07: Fallback indistinguishable from normal answer | **FIRED** | D05: fallback_reason=llm_timeout + answer_type=matched → user sees `status=answered`, no `[降级回答]`, content is wrong |
| S-08: J08/I08 without DOMAIN DR-03/DR-04 | **Flagged** | J08 (不法就労) and I08 (経管清算) routing live in production; DOMAIN sign-off status unknown to QA — flag to GM for DR status check |

**VOICE Verdict: BLOCKED — S-02 and S-07 fired; S-08 flagged for GM investigation**

---

## Residual P1 from M3A Baseline

**P1-A2 (J08):** Clarification questions for J08 do not explicitly surface `不法就労リスク` language. `risk_warnings` count = 0. Matches the open P1-A2 from `M3A_ROUTING_SAFETY_BASELINE_v0.1.md`. Not new; pre-existing.

---

## Summary

| Test Line | Verdict |
|-----------|---------|
| M1 Internal Console | CONDITIONAL PASS (browser smoke required) |
| M4 Preview (SSE Phase 2) | CONDITIONAL PASS (SSE stream needs browser) |
| Routing Safety E2E (7/7) | **BLOCK** — D05/D06 P0 |
| VOICE Compliance | **BLOCK** — S-02 + S-07 fired |

**Overall: BLOCK — P0 active in production (D05/D06 content pollution)**

---

## Issues to Raise

### P0 — ENGINE Work Packet Required

**D05/D06 Content Pollution:**
- Root cause: `answer-core-v1` vector/similarity match is hitting a wrong answer record for both divorce-related questions
- Fix direction: Investigate why the routing engine matches D05/D06 to the 14日届出/换工作 answer; likely a semantic embedding collision or wrong `understood_question` in the KB
- Required: ENGINE investigation + fix + re-run Routing Safety E2E before any gate can pass

### P1 — Pre-existing

**J08 P1-A2:** 不法就労 risk language absent from clarification output. Per M3A baseline, open.

### P1 — VOICE

**Fallback marker absent (S-07):** When `answer-core-v1` has `fallback_reason=llm_timeout` but finds a matched answer, the answer carries no `[降级回答]` marker. If the match is wrong (as in D05/D06), this is a P0 compounding factor. As a standalone (correct match + llm_timeout), this is P1.

### Flagged — GM to Verify

**DR-03/DR-04 DOMAIN status:** S-08 requires confirming that J08 (不法就労) and I08 (経管清算) content in production has DOMAIN sign-off.

---

## QA Sign-Off

```
QA VOICE CHECKLIST — BLOCKED — escalated to GM
Work Packet: Issue #35 / QA_STABILIZATION_PACK_V02.md
Reviewer: TEBIQ-QA window
Date: 2026-05-05
Commit: e69ec8e (origin/main)
Sections reviewed: 1.1 / 1.2 / 1.3 / 2 / 3
Severity triggers: S-02 FIRED, S-07 FIRED, S-08 FLAGGED
DOMAIN-pending: DR-03, DR-04 status unknown — needs GM verification
P0: D05/D06 content pollution — active in production routing
```
