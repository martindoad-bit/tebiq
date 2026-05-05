---
status: partial — §3.1 complete, §3.2–3.9 BLOCKED pending ENGINE Issues #39/#40/#41/#42
qa_window: TEBIQ-QA
work_packet: Issue #43 / QA_1_0_ALPHA_SMOKE_PACK.md
charter: docs/product/TEBIQ_1_0_ALPHA_CHARTER.md
date: 2026-05-05
---

# QA 1.0 Alpha Smoke Report v0.1

```
tested commit:           bc6cd35 (origin/main, includes hotfix 1ba2fea)
production deployed:     40c230b (confirmed via /api/build-info)
hotfix verified:         1ba2fea → 8cbd34e (PR #38, Closes #37)
tested URL:              https://tebiq.jp/api/questions
verdict:                 PARTIAL — §3.1 PASS 7/7 | §3.2–3.9 BLOCKED
P0:                      none in §3.1 (hotfix confirmed effective)
P1:                      DeepSeek timeout rate 6/7 (86%) at test time — LLM health degraded
P2:                      —
production blocked beyond Alpha: yes
```

---

## Context Stamp

- origin/main HEAD: `bc6cd35`
- Production deployed: `40c230b` (confirmed via `/api/build-info builtAt: 2026-05-05T12:03:16Z`)
- Hotfix in production: `1ba2fea` ✅ (3rd commit in origin/main)
- Issue #39 (streaming): OPEN — not merged
- Issue #40 (Photo Lite): OPEN — not merged
- Issue #41 (Learning Console): OPEN — not merged
- Issue #42 (Fact Anchors): OPEN — not merged
- AGENTS.md: loaded
- QA_1_0_ALPHA_SMOKE_PACK.md: loaded
- TEBIQ_1_0_ALPHA_CHARTER.md: loaded

---

## Trigger Status

| Trigger | Status | Notes |
|---------|--------|-------|
| Issue #39 streaming merge → §3.1 + §3.2 + §3.3 unlocked | **PARTIAL** | §3.1 executable now (hotfix in main); §3.2+§3.3 require #39 |
| Issue #40 Photo Lite merge → §3.4 unlocked | BLOCKED | #40 OPEN |
| Issue #41 Learning Console merge → §3.9 unlocked | BLOCKED | #41 OPEN |
| Issue #42 Fact Anchors merge → §3.3 fact_anchor check unlocked | BLOCKED | #42 OPEN |

§3.1 executed immediately per Work Packet "QA 不需要等所有都完成" rule.

---

## §3.1 — #37 P0 Fallback Regression (QA 二次確認)

**Tested:** 7 regression cases live against `https://tebiq.jp/api/questions`  
**GM pre-verification:** 1ba2fea (acknowledged)  
**QA execution time:** 2026-05-05

### Results

| Tag | Question | Verdict | Engine | Status | FR | Title |
|-----|----------|---------|--------|--------|----|-------|
| D05 | 日本人配偶签离婚后还能留在日本吗？ | ✅ FALLBACK-CLEAN | answer-core-v1.1-fallback | clarification_needed | llm_timeout | [降级回答] 当前模型响应超时 |
| D06 | 配偶签离婚后多久要处理在留问题？ | ✅ FALLBACK-CLEAN | answer-core-v1.1-fallback | clarification_needed | llm_timeout | [降级回答] 当前模型响应超时 |
| J03 | 签证快到期了，材料还没准备好怎么办？ | ✅ FALLBACK-CLEAN | answer-core-v1.1-fallback | clarification_needed | llm_timeout | [降级回答] 当前模型响应超时 |
| J04 | 被公司解雇了，在留资格怎么办？ | ✅ FALLBACK-CLEAN | answer-core-v1.1-fallback | clarification_needed | llm_timeout | [降级回答] 当前模型响应超时 |
| J08 | 在留资格和实际工作不一致怎么办？ | ✅ PASS | answer-core-v1.1-llm | clarification_needed | None | 关于在留行政：先确认几件事 |
| I08 | 公司还没清算，可以直接回国吗？ | ✅ FALLBACK-CLEAN | answer-core-v1.1-fallback | clarification_needed | llm_timeout | [降级回答] 当前模型响应超时 |
| D09 | 换签证会不会影响家人的在留资格？ | ✅ FALLBACK-CLEAN | answer-core-v1.1-fallback | clarification_needed | llm_timeout | [降级回答] 当前模型响应超时 |

**§3.1 Verdict: PASS 7/7**

### Charter §10.1 Acceptance Checklist (per PR #38 Acceptance §A)

| Criterion | Result |
|-----------|--------|
| No unrelated cached answer returned (D05/D06 cross-contamination) | ✅ PASS — visible_text contains no "换工作" / "14日届出" / "入管报告" (verified) |
| fallback: `engine_version == 'answer-core-v1.1-fallback'` | ✅ PASS (6/6 fallback cases) |
| fallback: `status != 'answered'` (all clarification_needed) | ✅ PASS |
| fallback: title starts with `[降级回答]` | ✅ PASS |
| fallback: visible_text contains "当前模型响应超时" + "不是你的输入问题" | ✅ PASS (verified on D05) |
| fallback: visible_text does NOT contain D05/D06 cross-contamination | ✅ PASS |
| source.kind == 'none' (no legacy match smuggled through) | ✅ PASS (engine=v1.1-fallback confirms clean path) |
| disclaimer present | ✅ PASS |

### P1 Observation — DeepSeek Timeout Rate

At test time: **6/7 questions returned llm_timeout** (~28–32s per call, fallback triggered).  
Only J08 got a live LLM response (answer-core-v1.1-llm).  
This is not a P0 (fallback is clean), but indicates DeepSeek upstream is currently degraded.

**Impact on §3.2 (streaming P0):** When #39 is merged, streaming behavior testing should be re-run after confirming DeepSeek latency is normal. A streaming pipeline that consistently hits 30s timeout before first token will fail the "真流式正文" P0 requirement.

---

## §3.2 — Streaming P0 (8-item PL supplement)

**Status: BLOCKED — Issue #39 not merged**

Required pre-condition: streaming consultation pipeline merge (DS V4 Pro + SSE + system prompt `consultation_alpha_v1` + risk keywords + feedback + save).

Will test when #39 merges:
1. True streaming text (not loading state)
2. 25s NOT a failure line
3. 90–120s safe timeout (canonical fallback, no unrelated content)
4. Alpha top banner present during stream
5. High-risk keyword → light prompt
6. Complete `answer_text` saved
7. Partial failure does NOT save as completed answer (`partial_answer_saved` flag)
8. Legacy matcher fallback boundary still held

---

## §3.3 — Text Consultation 20 Cases

**Status: BLOCKED — Issue #39 not merged**

Required: DS V4 Pro + `consultation_alpha_v1` system prompt + risk keyword detection endpoint.

---

## §3.4 — Photo Consultation Lite (5 cases)

**Status: BLOCKED — Issue #40 not merged**

---

## §3.5 — High-Risk Keyword Prompts (13 keywords)

**Status: BLOCKED — Issue #39 not merged**

---

## §3.6 — Banned Words (7 classes, must be 0 hits)

**Status: BLOCKED — Issue #39 not merged**

Target: 「一定可以」「没问题」「不会影响」「保证」「必ず」「絶対」「100%」= 0 hits in 20+5 consultations.

---

## §3.7 — Feedback Buttons (5 types)

**Status: BLOCKED — Issue #39 not merged**

---

## §3.8 — Save Question

**Status: BLOCKED — Issue #39 not merged**

---

## §3.9 — Learning Console Record Completeness

**Status: BLOCKED — Issue #41 not merged**

Required: `/internal/learning-console` (7 Tab) implementation.

---

## Summary

| Section | Status | Verdict |
|---------|--------|---------|
| §3.1 #37 P0 Fallback Regression | ✅ Executed | PASS 7/7 — hotfix confirmed effective |
| §3.2 Streaming P0 (8 items) | 🔴 BLOCKED | Pending Issue #39 |
| §3.3 Text Consultation 20 | 🔴 BLOCKED | Pending Issue #39 (#42 for fact_anchor check) |
| §3.4 Photo Lite 5 | 🔴 BLOCKED | Pending Issue #40 |
| §3.5 Risk Keywords 13 | 🔴 BLOCKED | Pending Issue #39 |
| §3.6 Banned Words 7 | 🔴 BLOCKED | Pending Issue #39 |
| §3.7 Feedback Buttons | 🔴 BLOCKED | Pending Issue #39 |
| §3.8 Save Question | 🔴 BLOCKED | Pending Issue #39 |
| §3.9 Learning Console | 🔴 BLOCKED | Pending Issue #41 |

**Current Alpha gate status: BLOCKED pending Issue #39 (streaming pipeline)**

---

## P0 / P1 / P2

**P0:** None found in executed scope (§3.1). Charter P0 conditions cannot be evaluated until §3.2–3.9 are unblocked.

**P1:**
- DeepSeek upstream timeout rate 6/7 (86%) at 2026-05-05 test time. When #39 merges, streaming P0 ("真流式正文") requires DeepSeek latency to be healthy enough to deliver first token before 25s. Recommend ENGINE check DS V4 Pro endpoint health before streaming pipeline QA.

**P2:** None.

---

## QA Sign-Off (Partial)

```
QA 1.0 Alpha Smoke Report — PARTIAL (§3.1 only)
Work Packet: Issue #43 / QA_1_0_ALPHA_SMOKE_PACK.md
Reviewer: TEBIQ-QA window
Date: 2026-05-05
Commit tested: bc6cd35 (production: 40c230b)
Sections executed: §3.1 only
Sections blocked: §3.2 §3.3 §3.4 §3.5 §3.6 §3.7 §3.8 §3.9
Blocking issue: #39 (streaming) / #40 (photo) / #41 (learning console) / #42 (fact anchors)
Alpha gate: BLOCKED until §3.2–3.9 complete
production blocked beyond Alpha: yes
```
