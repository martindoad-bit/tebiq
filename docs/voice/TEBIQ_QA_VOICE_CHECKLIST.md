---
status: draft / preview-only / not-production
owner: TEBIQ-VOICE
reviewer: DOMAIN + Project Lead before production use
---

# TEBIQ QA Voice Checklist — Internal Console + Preview Integration

> Used by the QA window when reviewing any PR that touches `docs/voice/` files or that consumes voice copy in rendered UI paths.
> This checklist is required for ALL PRs in scope. Partial completion must be flagged to GM.

---

## Scope of This Checklist

This checklist applies to any PR that:
- Modifies any file under `docs/voice/`
- Consumes voice copy in `/internal/*` pages (Internal Console)
- Renders voice copy at `/internal/preview` (Preview path)
- Changes answer pipeline output that feeds into voice-rendered components
- Touches fallback, timeout, or human-review state copy

---

## 1. Pre-Merge Checklist

> Run before approving any PR in scope. All items must be checked or explicitly waived with GM sign-off.

### 1.1 Copy Integrity

- [ ] All rendered copy carries the preview-only marker `⚠️ 内部预览 · 非正式建议`
- [ ] `internal_code` (e.g. M-J03, HR-05) is preserved in system/data layer alongside `user_copy`
- [ ] `internal_code` is NOT rendered or exposed to end users in any UI path
- [ ] No production-ready copy has been introduced into internal-only pages without DOMAIN + Project Lead approval
- [ ] Fallback answer is NOT disguised as a normal answer — must carry `[降级回答]` or equivalent marker
- [ ] Timeout state includes a clear recovery path (e.g. "请稍后重试" with retry button or next step)

### 1.2 Risk Calibration

- [ ] HIGH-risk scenario copy has NOT been softened to medium or low language
- [ ] LOW-risk scenario copy has NOT been over-weighted or framed as urgent
- [ ] Urgency badge (`urgency_display`) matches the copy tone — a HIGH badge with soft copy is a failure
- [ ] No marketing or companion tone in risk copy ("我们会帮您解决" is NOT acceptable)
- [ ] No frightening/alarmist exaggeration that goes beyond factual risk description

### 1.3 Legal Boundary

- [ ] No legal conclusions stated as fact (e.g. "您的在留肯定没问题" or "这肯定属于不法就労")
- [ ] No copy gives specific advice that requires a licensed gyosei-shoshi judgment
- [ ] Human review escalation copy includes a concrete next step (not just "请咨询专业人士" in isolation)
- [ ] DOMAIN-flagged open requests (see `TEBIQ_DOMAIN_INPUT_REQUEST.md`) are acknowledged — copy depending on unresolved DR items is marked pending

---

## 2. Internal Console Specific Checks

> For PRs that modify or add Internal Console (`/internal/*`) views.

- [ ] All labels are bilingual (中文 primary / English secondary) where specified by design
- [ ] Bad states (error, fallback, timeout, human-review) are visibly surfaced — NOT hidden, collapsed by default, or styled to look like normal states
- [ ] DeepSeek provider-down state: provider panel clearly shows which provider is unavailable, not a generic error
- [ ] `internal_code` is displayed in the Console view (operators need it for debugging) — stripping it from Internal Console is a failure
- [ ] Answer pipeline classification (e.g. `scope_in` / `scope_exit` / `fallback`) is visible to operators
- [ ] Human review queue state is distinct from normal answer state (not ambiguous)
- [ ] Timestamp / latency metadata visible in console view (for SLA monitoring)

---

## 3. Preview Specific Checks

> For PRs that affect the Preview path (`/internal/preview`).

- [ ] "Received" state (submission acknowledged) appears at or under 1 second after form submit — blank wait longer than 1s is a failure
- [ ] Fallback answer renders with `[降级回答]` marker clearly visible — not hidden in metadata only
- [ ] Human review state displays an action path (what the user should do next), not just a spinner or "处理中"
- [ ] No 25-second blank wait — if processing exceeds expected time, an intermediate state must display
- [ ] Preview disclaimer (`⚠️ 内部预览 · 非正式建议` + full disclaimer text) is present on every Matter card
- [ ] Matter cards display `urgency_display` badge with correct color mapping (HIGH=red, MEDIUM=amber, LOW=grey)
- [ ] `internal_code` is NOT visible in the preview UI (it is operator-layer only)
- [ ] Scope-exit copy (out-of-scope queries) routes clearly — not rendered as a normal Matter card

---

## 4. Severity Triggers — Escalate to GM / Project Lead

> If any of the following are observed, QA MUST stop the review, flag to GM, and NOT approve the PR.

| # | Trigger | Reason |
|---|---------|--------|
| S-01 | Copy implies legal certainty ("您的在留不会被取消") | Legal liability; DOMAIN must review |
| S-02 | HIGH-risk scenario (J03, J04, J08, D05, D06, I08) softened to MEDIUM or LOW language | Directly harms user safety |
| S-03 | DeepSeek raw model output text visible to end user in any path | Provider exposure; privacy + quality risk |
| S-04 | Production copy introduced into Internal Console or Preview without approval | Premature production use |
| S-05 | `internal_code` stripped or lost in data layer | Breaks traceability and debugging |
| S-06 | DOMAIN-pending item (DR-xx) used in production copy without DOMAIN sign-off | Domain accuracy cannot be guaranteed |
| S-07 | Fallback state indistinguishable from normal answer | Misleads operators and users |
| S-08 | Any copy for 不法就労 (M-J08) or 経管清算 (M-I08) scenarios merged without DOMAIN DR-03/DR-04 resolved | Accuracy of legal threshold language unconfirmed |

---

## 5. QA Sign-Off Format

When all checks pass, QA records sign-off in the PR comment using the following format:

```
QA VOICE CHECKLIST — PASS
PR: #[number]
Reviewer: [QA window identifier]
Date: [YYYY-MM-DD]
Sections reviewed: [1.1 / 1.2 / 1.3 / 2 / 3]
Severity triggers checked: All clear / [list any waived with GM approval]
DOMAIN-pending items: [None / List DR-xx items acknowledged as pending]
Notes: [Any observations for Project Lead]
```

If any severity trigger fires, replace "PASS" with "BLOCKED — escalated to GM" and do not approve.
