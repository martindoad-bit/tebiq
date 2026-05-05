---
status: draft / internal / preview-only / not production
owner: TEBIQ-CODEXUI
review_required: Project Lead + GM before implementation acceptance
downstream_consumers: GM / ENGINE / QA / VOICE / DOMAIN
---

# TEBIQ 1.0 UI State Machine

This document defines user-visible behavior for streaming consultation answers.

The state machine applies to text consultation and photo consultation Lite.

## Global Rules

| Rule | Requirement |
|---|---|
| User must not wait on a blank screen | Every submitted request needs visible state feedback |
| 25 seconds is not failure | 25 seconds is the waiting hint threshold |
| 90-120 seconds is the failure window | If no useful result arrives after this range, show failed |
| Streaming must show body text | Do not show only loading if partial text is available |
| Risk hint must remain near the answer | High-risk hint appears above or next to the answer area |
| Fallback is not completed | Partial, degraded, or fallback answers must be visibly labeled |
| Alpha context remains visible | AlphaNotice stays visible on answer surfaces |

## States

| State | User Sees | Spinner | Body Text | Save Allowed | Feedback Allowed | Retry Allowed | Engineering Fields |
|---|---|---:|---:|---:|---:|---:|---|
| `idle` | Empty consultation input and AlphaNotice | No | No | No | No | No | `ui_status`, `question_text` |
| `submitted` | Submitted question is locked and request is being prepared | Yes | No | No | No | No | `question_id`, `question_text`, `created_at`, `ui_status=submitted` |
| `received` | Request received status with short waiting message | Yes | No | No | No | No | `question_id`, `created_at`, `ui_status=received` |
| `generating` | Answer card appears with generation state | Yes | Optional skeleton only | No | No | No | `stream_started_at`, `model`, `prompt_version`, `ui_status=generating` |
| `streaming` | Partial answer text appears progressively | Small | Yes, partial | No | No | No | `first_token_at`, `partial_answer_text`, `ui_status=streaming` |
| `high_risk_hint` | Persistent risk hint near answer | Inherits parent state | Inherits parent state | Inherits parent state | Inherits parent state | Inherits parent state | `risk_keyword_hits`, `risk_hint_visible=true` |
| `timeout_waiting` | Provider is slow, user can continue waiting | Yes | Yes if partial exists | No, unless completed partial is explicitly marked fallback | No | Yes as secondary action | `timeout_reason=slow_provider`, `elapsed_ms`, `ui_status=timeout_waiting` |
| `completed` | Full answer complete with status and actions | No | Yes | Yes | Yes | No | `answer_text`, `completed_at`, `total_latency_ms`, `ui_status=completed` |
| `failed` | Safe failure state, no fake answer | No | No, or clearly labeled partial fallback | No | No | Yes | `timeout_reason`, `error_code`, `ui_status=failed` |
| `saved` | Save button changes to saved state and light confirmation appears | No | Yes | Already saved | Yes if answer completed | No | `saved_question=true`, `saved_at`, `ui_status` unchanged or `saved` event |
| `feedback_submitted` | FeedbackBar shows submitted state | No | Yes | Yes | Already submitted | No | `feedback_type`, `feedback_submitted_at`, `human_confirm_clicked` |

## State Flow

```text
idle
  -> submitted
  -> received
  -> generating
  -> streaming
  -> completed
       -> saved
       -> feedback_submitted

generating / streaming
  -> high_risk_hint may appear as an overlay state

generating / streaming
  -> timeout_waiting after 25 seconds
  -> completed if answer arrives
  -> failed if no useful result after 90-120 seconds

timeout_waiting
  -> streaming if tokens arrive
  -> completed if answer completes
  -> failed if final failure window is reached
```

## UI Placement Rules

| UI Element | Placement |
|---|---|
| `AlphaNotice` | Top of consultation answer page and photo consultation page |
| `RiskHintBanner` | Above the answer body, or directly between image summary and answer |
| `StreamingAnswer` status | Top of answer card |
| Partial answer text | Main answer body |
| `TimeoutState` | Inside answer card, above partial answer if no tokens yet, below status if tokens exist |
| `FeedbackBar` | Below completed answer |
| `SaveQuestionButton` | Near feedback area or answer card action row |

## Fallback Rule

Fallback or partial responses must be labeled as incomplete.

They must not use the same visual state as `completed`, and they must not unlock normal confidence cues unless GM / ENGINE explicitly define a safe fallback policy.

