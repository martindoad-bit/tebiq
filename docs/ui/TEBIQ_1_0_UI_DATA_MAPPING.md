---
status: draft / internal / preview-only / not production
owner: TEBIQ-CODEXUI
review_required: Project Lead + GM before implementation acceptance
downstream_consumers: GM / ENGINE / QA / VOICE / DOMAIN
---

# TEBIQ 1.0 UI Data Mapping

This document maps UI elements to data fields needed for user preview and Learning Console inspection.

| UI Element | Data Field | User / Console | Required for 1.0 | Mock OK? |
|---|---|---|---|---|
| Consultation record identifier | `question_id` | Console | Yes | Yes |
| User question display | `question_text` | User / Console | Yes | Yes |
| Photo attached indicator | `image_attached` | User / Console | Yes | Yes |
| Photo preview summary | `image_summary` | User / Console | Yes for photo Lite | Yes |
| AI answer body | `answer_text` | User / Console | Yes | Yes |
| Model metadata | `model` | Console | Yes | Yes |
| Prompt version badge | `prompt_version` | Console | Yes | Yes |
| Fact anchor display | `fact_anchor_ids` | Console | Yes | Yes, pending DOMAIN |
| High-risk hint and console risk tags | `risk_keyword_hits` | User / Console | Yes | Yes, pending DOMAIN |
| Stream started timing | `stream_started_at` | Console | Yes | Yes |
| First token timing | `first_token_at` | Console | Yes | Yes |
| Completion timing | `completed_at` | User / Console | Yes | Yes |
| Latency badge / metric | `total_latency_ms` | Console | Yes | Yes |
| Timeout state explanation | `timeout_reason` | User / Console | Yes | Yes |
| Feedback display | `feedback_type` | User / Console | Yes | Yes |
| Saved question indicator | `saved_question` | User / Console | Yes | Yes |
| Human confirmation signal | `human_confirm_clicked` | User / Console | Yes | Yes |
| Follow-up count | `follow_up_count` | User / Console | Yes | Yes |
| Record created time | `created_at` | User / Console | Yes | Yes |

## Derived UI Values

| Derived UI Value | Source Fields | Notes |
|---|---|---|
| Status badge | `ui_status`, `completed_at`, `timeout_reason`, `answer_text` | ENGINE should confirm canonical status field |
| Average response time | `total_latency_ms` across records | Console overview module |
| Timeout / failure count | `timeout_reason`, `ui_status` | Console overview and timeout tab |
| Photo consultation count | `image_attached` | Console overview |
| Saved question count | `saved_question` | Console overview |
| Inaccurate feedback count | `feedback_type` | Console overview and tab |
| Human confirm count | `human_confirm_clicked`, `feedback_type` | Console overview and tab |
| Risk hit count | `risk_keyword_hits` | Console overview and tab |

## API Readiness Notes

| Area | Needed From ENGINE |
|---|---|
| Submit text question | Request/response schema and streaming handoff |
| Streaming answer | SSE or equivalent event schema, including partial tokens and completion event |
| Photo upload | Upload endpoint, accepted file types, size limits, error model |
| Image understanding | Image summary schema and confidence/fallback status if available |
| Save question | Mutation endpoint and saved state response |
| Feedback | Mutation endpoint and accepted `feedback_type` values |
| User history | List/detail endpoints and pagination if needed |
| Console query | Filters, tabs, sorting, and detail endpoint |

