# docs/voice/ — TEBIQ Voice Language Assets

## What This Directory Is

`docs/voice/` contains all user-facing and operator-facing language assets (copy, phrasing, tone guidelines) for TEBIQ's internal console and preview integration.

"VOICE" is the TEBIQ layer responsible for what the product says — the exact words rendered in the UI for Matter outputs, fallback states, human review escalations, scope-exit routing, and system messages. It is distinct from product logic (ENGINE) and domain accuracy review (DOMAIN).

This directory is the single source of truth for all copy. ENGINE must consume copy from here. Copy must NOT be invented inline in component code or left only in chat windows.

---

## Current Status

**All files in this directory are: draft / preview-only / not-production**

No file in `docs/voice/` may be used in production without:
1. DOMAIN review and sign-off
2. Project Lead approval
3. Any open DR items (see `TEBIQ_DOMAIN_INPUT_REQUEST.md`) resolved

---

## File Guide

| Filename | Purpose | Usable By | Needs DOMAIN Input | Production Gate |
|----------|---------|-----------|-------------------|-----------------|
| `TEBIQ_USER_PREVIEW_MATTER_COPY.md` | User-facing copy for Matter scenario cards (M-J03 through M-D09). Used at /internal/preview. | ENGINE, QA, DOMAIN | Yes — DR-02, DR-03, DR-04 open | DOMAIN review + Project Lead approval |
| `TEBIQ_QA_VOICE_CHECKLIST.md` | QA checklist for all PRs touching voice copy or consuming it in UI. Defines severity triggers. | QA, GM | No | DOMAIN review + Project Lead approval |
| `TEBIQ_DOMAIN_INPUT_REQUEST.md` | Formal request log from VOICE to DOMAIN for factual/terminology verification. | DOMAIN, GM | N/A (this IS the request file) | DOMAIN review + Project Lead approval |
| `TEBIQ_HUMAN_REVIEW_LANGUAGE.md` | Copy for human-review escalation states (HR-01 through HR-0x). Shown when answer requires human judgment. | ENGINE, QA, DOMAIN | Yes — DR-05 open | DOMAIN review + Project Lead approval |
| `TEBIQ_FALLBACK_LANGUAGE.md` | Copy for all fallback and degraded states: provider down, timeout, parse failure, out-of-scope. | ENGINE, QA | No (factual accuracy low) | DOMAIN review + Project Lead approval |
| `TEBIQ_SCOPE_EXIT_COPY.md` | Copy for queries routed out of TEBIQ scope. Includes handoff language and referral direction. | ENGINE, QA, DOMAIN | Yes — DR-01, DR-06 open | DOMAIN review + Project Lead approval |
| `TEBIQ_SCOPE_EXIT_ROUTING_LANGUAGE.md` | Routing labels and decision language for scope-exit classification display (Internal Console). | ENGINE, QA | Yes — DR-01 open | DOMAIN review + Project Lead approval |
| `TEBIQ_INTERNAL_CONSOLE_LABELS.md` | All bilingual (中文/English) labels for Internal Console operator views. Includes state badges, panel headers. | ENGINE, QA | No | DOMAIN review + Project Lead approval |
| `TEBIQ_URGENCY_DISPLAY_GUIDE.md` | Defines urgency_display levels (HIGH/MEDIUM/LOW), color mapping, and copy tone rules per level. | ENGINE, QA, DOMAIN | Partial — urgency thresholds need DOMAIN calibration | DOMAIN review + Project Lead approval |
| `TEBIQ_PROVIDER_STATE_COPY.md` | Copy for provider-specific states: DeepSeek down, timeout, slow, partial response. | ENGINE, QA | No | DOMAIN review + Project Lead approval |
| `TEBIQ_ANSWER_CLASSIFICATION_LABELS.md` | Labels for answer pipeline classification output (scope_in / scope_exit / fallback / human_review). | ENGINE, QA | No | DOMAIN review + Project Lead approval |
| `TEBIQ_MATTER_CARD_STRUCTURE.md` | Defines the data structure and render contract for Matter cards: required fields, optional fields, display order. | ENGINE | No | DOMAIN review + Project Lead approval |
| `TEBIQ_PREVIEW_DISCLAIMER_BLOCK.md` | Canonical text for the preview disclaimer block. Fixed string — must not be modified by ENGINE. | ENGINE, QA | No | DOMAIN review + Project Lead approval |
| `README.md` | This file. Directory orientation for all roles. | All | No | DOMAIN review + Project Lead approval |

> Note: Files listed above that do not yet exist are planned VOICE outputs. They will be added via PR as VOICE produces them. ENGINE must not unblock on missing files by inventing copy.

---

## Rules for ENGINE

1. **Must reference `docs/voice/` for all copy.** No copy may be invented inline in component or API code. If the copy file does not exist yet, block and report to GM — do not substitute invented text.
2. **Must NOT invent copy.** This includes paraphrasing, reordering, or "improving" voice copy without a VOICE-originated change going through PR.
3. **Must preserve `internal_code` alongside `user_copy` in the data layer** at all times. The code (e.g. M-J03, HR-05) is used for debugging, QA, and analytics — it must not be lost in transformation.
4. **Must NOT expose `internal_code` to end users.** It is operator-layer only. The only UI that should display `internal_code` is the Internal Console operator view.
5. **Must NOT use any file in this directory for production** without explicit DOMAIN + Project Lead approval recorded in the PR.
6. **Must use the canonical preview disclaimer text** from `TEBIQ_PREVIEW_DISCLAIMER_BLOCK.md` verbatim. Substituting a shorter or rephrased version is a QA failure.
7. **If a DOMAIN INPUT PENDING marker appears in a copy file**, that copy must be treated as preview-only and must not be promoted to production until the DR item is resolved.

---

## Rules for QA

1. **Must use `TEBIQ_QA_VOICE_CHECKLIST.md`** as the review framework for any PR in scope. Partial use must be noted with reason.
2. **Must escalate to GM if any severity trigger fires** (see Section 4 of the checklist). Do not approve a PR with an active severity trigger.
3. **Must confirm DOMAIN-pending items** are acknowledged in the PR review. Copy depending on unresolved DR items may pass preview review but must be flagged as production-blocked.
4. **Must verify `internal_code` is present** in the data layer and absent from the user-facing render path on every relevant PR.

---

## Rules for DOMAIN

1. **Review `TEBIQ_DOMAIN_INPUT_REQUEST.md`** for all open DR items before any production review pass.
2. **Record rulings in the `domain_ruling` field** of the relevant DR item. Do not communicate rulings only in chat.
3. **All DOMAIN input goes to GM before feeding back to VOICE.** DOMAIN does not directly edit VOICE files. The flow is: DOMAIN ruling → GM validation → VOICE file update → PR → merge.
4. **Flag any copy in the directory that contains a factual error**, even if not directly requested. DOMAIN's review is not limited to open DR items.

---

## VOICE Submission Process

Going forward, all VOICE-produced copy follows this pipeline:

```
VOICE output (copy draft)
        ↓
PR to docs/voice/
        ↓
GM review (format, completeness, DR items noted)
        ↓
merge to main
        ↓
ENGINE consumes from merged file
        ↓
QA reviews PR that consumes copy (uses TEBIQ_QA_VOICE_CHECKLIST.md)
        ↓
DOMAIN review pass (before any production promotion)
        ↓
Project Lead approval
        ↓
production use permitted
```

**No copy stays only in chat windows.** If VOICE produces copy in a conversation, it must be committed to this directory via PR before ENGINE or QA can act on it. Chat-only copy is not a source of truth.
