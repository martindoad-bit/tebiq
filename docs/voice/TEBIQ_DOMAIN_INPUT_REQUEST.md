---
status: draft / preview-only / not-production
owner: TEBIQ-VOICE
reviewer: DOMAIN + Project Lead before production use
---

# TEBIQ Domain Input Request Log — VOICE to DOMAIN

> This file tracks all open requests from VOICE (and ENGINE/QA consuming VOICE copy) to DOMAIN for content verification before production use.
> DOMAIN reviews each request, records a ruling, and returns to GM. GM feeds confirmed input back to VOICE.
> No copy marked with a pending DR item may be promoted to production without DOMAIN sign-off.

---

## Request Format

Each request uses the following fields:

| Field | Description |
|-------|-------------|
| `request_id` | Unique identifier (DR-XX) |
| `requesting_file` | Which VOICE file contains the placeholder or pending copy |
| `input_needed` | The specific factual or terminology question DOMAIN must answer |
| `why_needed` | Why this input affects copy correctness or user safety |
| `current_placeholder` | The copy or note currently used in the VOICE file (may be draft/approximate) |
| `priority` | P0 = blocks production launch / P1 = blocks DOMAIN review pass / P2 = quality improvement |
| `blocking` | yes = copy cannot be used until resolved / no = copy may ship as preview with caveat |
| `status` | open / in-review / resolved |
| `domain_ruling` | (filled by DOMAIN) Confirmed answer, with source citation if applicable |

---

## Open Requests

---

### DR-01

```
request_id: DR-01
requesting_file: TEBIQ_SCOPE_EXIT_ROUTING_LANGUAGE.md (pending file)
input_needed: >
  What is the correct Japanese legal terminology for the "身份変更" concept
  as applied to post-divorce 在留資格変更 scenarios?
  Specifically: should TEBIQ copy use「在留資格変更許可申請」,「在留資格変更手続」,
  or another formulation? Is "身份変更" (Chinese) an accurate translation of 
  the legal concept, or does it carry misleading connotations?
why_needed: >
  VOICE copy for Matter-04 (D05/D06) and scope-exit routing language both reference
  the post-divorce status change process. Using the wrong term risks either
  understating urgency (if "変更" sounds optional) or causing user confusion
  about the correct procedure to follow.
current_placeholder: >
  "须在离婚后约6个月内完成在留资格変更或更新手续" (Matter-04 risk_detail)
  Scope-exit routing language for 配偶者離婚 path: TBD pending DOMAIN input.
priority: P1
blocking: no (preview may proceed with current draft; production blocked until resolved)
status: open
domain_ruling: (pending)
```

---

### DR-02

```
request_id: DR-02
requesting_file: TEBIQ_USER_PREVIEW_MATTER_COPY.md (Matter-04, M-D05-D06)
input_needed: >
  Is the "approximately 6 months after divorce" window for 配偶者ビザ status change
  the accurate current administrative practice as of 2025?
  Specifically:
  (a) Is there a statutory 6-month grace period, or is this based on typical
      renewal cycle timing?
  (b) Does this window differ between 日本人の配偶者等 and 永住者の配偶者等?
  (c) Has this window changed or been tightened in recent guidance?
why_needed: >
  Matter-04 risk_detail currently states "约6个月" as a planning horizon for
  在留変更. If this is inaccurate, it may either give users false safety 
  (if the real window is shorter) or unnecessary urgency (if longer).
  This is the highest-stakes factual claim in the D05/D06 copy.
current_placeholder: >
  "须在离婚后约6个月内完成在留资格変更或更新手续，否则在留资格将面临不予更新"
priority: P0
blocking: yes (Matter-04 copy cannot be used in production until confirmed)
status: open
domain_ruling: (pending)
```

---

### DR-03

```
request_id: DR-03
requesting_file: TEBIQ_USER_PREVIEW_MATTER_COPY.md (Matter-05, M-I08)
input_needed: >
  Which specific provision of the 出入国管理及び難民認定法 (入管法) governs
  在留資格取消 triggered by 経営・管理 activity cessation due to corporate dissolution?
  Is it Article 22-4 (在留資格取消), and if so, which specific item?
  What is the typical timeline between dissolution completion and enforcement action?
why_needed: >
  Matter-05 copy references 在留取消 risk in general terms. For DOMAIN validation
  and for any future escalation copy referencing legal basis, TEBIQ needs to cite
  the correct provision. Using the wrong provision (or no provision) risks being
  legally inaccurate, which is a DOMAIN-class error.
current_placeholder: >
  "可能触发在留取消规定" (Matter-05 risk_detail — provision unspecified)
priority: P1
blocking: no (preview may proceed; production copy referencing legal basis blocked until resolved)
status: open
domain_ruling: (pending)
```

---

### DR-04

```
request_id: DR-04
requesting_file: TEBIQ_USER_PREVIEW_MATTER_COPY.md (Matter-03, M-J08)
                 TEBIQ_HUMAN_REVIEW_LANGUAGE.md (HR-03, pending file)
input_needed: >
  What is the correct threshold at which TEBIQ copy should use the term「不法就労」
  versus softer language (e.g., "活动范围不符" or "在留资格と実態が一致していない")?
  Specifically:
  (a) Should TEBIQ use「不法就労」only when activity is confirmed out-of-scope,
      or also in warning/risk contexts?
  (b) Is there a lower threshold (e.g., gray-zone partial mismatch) where softer
      language is more accurate?
  (c) What is DOMAIN's preferred Chinese-language equivalent for user-facing copy?
why_needed: >
  「不法就労」carries severe legal and psychological weight. Using it prematurely
  or in gray-zone scenarios may cause disproportionate alarm, legal confusion, 
  or user disengagement. Using it too late (when it applies) understates real risk.
  DOMAIN must define the threshold for TEBIQ's copy to use this term consistently.
current_placeholder: >
  Matter-03: "存在不法就労风险" (risk framing used; threshold not formally defined)
  HR-03: term usage threshold not yet specified.
priority: P0
blocking: yes (any copy using or avoiding「不法就労」for J08 scenarios is blocked until threshold confirmed)
status: open
domain_ruling: (pending)
```

---

### DR-05

```
request_id: DR-05
requesting_file: TEBIQ_HUMAN_REVIEW_LANGUAGE.md (HR-04, pending file)
input_needed: >
  What is the correct action direction for users whose 在留申請 has been denied (不許可)?
  Specifically:
  (a) What is the 審査請求 (administrative appeal) filing window after 不許可?
  (b) Is 審査請求 the recommended first action, or is reapplication (再申請) typically
      more practical in most scenarios?
  (c) Are there scenario types where 審査請求 is not available or not advisable
      (e.g., voluntary overstay + 不許可 combinations)?
why_needed: >
  HR-04 copy directs users toward "申請後の不許可への対応" but the specific action
  step (审査請求 vs 再申請 vs 行政書士 consultation first) is unresolved.
  Pointing users toward the wrong procedure wastes critical time and may harm their case.
current_placeholder: >
  HR-04 action direction: "请与专业人士确认审査请求或再申请路径" (deliberately vague pending DOMAIN input)
priority: P0
blocking: yes (HR-04 copy cannot be finalized without DOMAIN ruling)
status: open
domain_ruling: (pending)
```

---

### DR-06

```
request_id: DR-06
requesting_file: TEBIQ_SCOPE_EXIT_COPY.md (pending file)
                 TEBIQ_USER_PREVIEW_MATTER_COPY.md (general escalation path)
input_needed: >
  What does "handoff to gyosei-shoshi (行政書士)" mean concretely in the TEBIQ context?
  Specifically:
  (a) Does TEBIQ intend to have a specific partner gyosei-shoshi or panel for referral,
      or is this a generic "please consult a professional" direction?
  (b) Should copy refer to「行政書士」by title, or use a more user-accessible phrase
      (e.g., "在留専門の専門家" or "入管専門行政書士")?
  (c) At what scenarios does TEBIQ always route to gyosei-shoshi vs. handle in-product?
  (d) Is the term「行政書士」meaningfully understood by TEBIQ's target user (Chinese-
      speaking foreigners in Japan)? Should Chinese copy explain the role briefly?
why_needed: >
  Scope-exit copy and escalation copy both reference handoff to professional services.
  Without a concrete definition of what this means in TEBIQ's model, copy either
  overpromises (implies an actual referral service) or is too vague to be actionable.
  The answer also affects the Chinese-language phrasing used across all escalation paths.
current_placeholder: >
  Scope-exit: "请咨询专业的行政書士或在留専門人士" (vague; no concrete TEBIQ-defined path)
  Matter escalation: "请与专业人士确认" (used across multiple Matter cards as fallback)
priority: P1
blocking: no (preview may use current vague language; production copy requires concrete definition)
status: open
domain_ruling: (pending)
```

---

## Resolved Requests

*(None yet — all requests are open as of initial file creation.)*

---

## Process Notes

1. DOMAIN reviews each open request and records a ruling in `domain_ruling` field.
2. DOMAIN returns completed rulings to GM (not directly to VOICE or ENGINE).
3. GM validates ruling format, updates this file, and feeds confirmed input back to VOICE.
4. VOICE updates the relevant copy file and removes the "DOMAIN INPUT PENDING" marker.
5. QA must confirm pending DR items are resolved before approving production promotion.
