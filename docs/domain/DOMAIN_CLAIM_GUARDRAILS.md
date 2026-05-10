---
status: draft / internal coordination / not production legal advice
role: DOMAIN / AQL / Codex
date: 2026-05-10
version: v0.1
---

# DOMAIN Claim Guardrails

## Purpose

Prevent structural failures where an AI turns a risk-routing rule into a false legal conclusion.

The immediate incident was F06: a handoff trigger for "不许可后考虑出国" was over-written as
"出国前不经行政书士确认 -> 5年上陆拒否". That is too broad and can mislead users.

## Core Rule

**A handoff trigger is not a legal conclusion.**

If a document says "handoff to 行政書士 / 弁護士", the model may say the user should confirm options or deadlines.
It must not infer that the user's action is illegal, forbidden, or guaranteed to trigger a severe consequence.

## Severe Claim Checklist

Any claim involving the following must include conditions and non-applicability boundaries:

- 5年上陸拒否 / 上陆拒否
- 退去強制 / forced removal
- 不法滞在 / illegal stay
- 在留資格取消
- 不許可 / 不许可
- 審査請求期限 / administrative appeal deadline
- "必须出国" / "不能出国" / "马上非法"

Before writing such a claim, DOMAIN/AQL/Codex must answer:

1. `applies_when`: Under what concrete facts does this consequence apply?
2. `does_not_apply_when`: Under what common facts does it not apply?
3. `source_or_basis`: Is this official source, DOMAIN judgement, or AI inference?
4. `safe_user_wording`: What can be said without over-closing the user's options?
5. `handoff_reason`: Is the handoff for legal danger, option preservation, deadline interpretation, or strategy?

## Output Template For DOMAIN

For high-risk reviews, DOMAIN should use this shape:

```yaml
verdict: pass | needs_patch | unsafe
risk_level: P0 | P1 | P2
claim:
  unsafe_or_ambiguous_statement:
  corrected_boundary:
  applies_when:
  does_not_apply_when:
  source_or_basis:
user_action_boundary:
  can_do_without_handoff:
  should_handoff_before:
  must_not_be_told:
fact_card_patch:
  file:
  add:
  remove_or_narrow:
```

## F06 Corrected Boundary

For "收到不许可通知后还能留多久 / 能不能出国":

- The user must first check the date and wording on the notice.
- If the user wants to challenge the result, seek review/appeal, reapply strategically, or return to Japan later, professional confirmation is valuable before leaving.
- If the notice gives a departure deadline and the user simply leaves Japan within that deadline, this should not be described as "出国本身会触发5年上陆拒否".
- 5-year landing refusal risk should be reserved for concrete conditions such as deportation/removal procedures, unlawful overstay, detection during illegal stay, or departure after serious deadline violations, not ordinary voluntary departure within the written deadline.

## Codex Implementation Rule

Codex must not implement a severe claim from DOMAIN/AQL output unless it contains:

- an `applies_when` boundary,
- a `does_not_apply_when` boundary,
- and a source/basis label.

If those are missing, Codex should either narrow the wording or ask DOMAIN for a corrected boundary before changing user-facing behavior.
