---
status: draft / internal / preview-only / not production
owner: TEBIQ-CODEXUI
review_required: Project Lead + GM before implementation acceptance
downstream_consumers: GM / ENGINE / QA / VOICE / DOMAIN
---

# TEBIQ 1.0 UI Wireframe

These wireframes describe information structure and interaction order only.

They are not visual design specs and not production copy.

## Consultation Home

```text
┌─────────────────────────────┐
│ TEBIQ                       │
│ AI 在留咨询 Alpha            │
│ [AlphaNotice: VOICE final]   │
├─────────────────────────────┤
│ Text Consultation            │
│ ┌─────────────────────────┐ │
│ │ Ask your question        │ │
│ │ [ question input      ] │ │
│ │ [ Start consultation  ] │ │
│ └─────────────────────────┘ │
├─────────────────────────────┤
│ Photo Consultation Lite      │
│ ┌─────────────────────────┐ │
│ │ Upload or take a photo  │ │
│ │ [ PhotoUploadCard     ] │ │
│ └─────────────────────────┘ │
├─────────────────────────────┤
│ Recent Consultation Records  │
│ - question summary / status  │
│ - question summary / saved   │
│ [ View all records ]         │
└─────────────────────────────┘
```

## Text Consultation / Answer

```text
┌─────────────────────────────┐
│ TEBIQ Alpha                  │
│ [AlphaNotice: VOICE final]   │
├─────────────────────────────┤
│ User Question                │
│ question_text                │
├─────────────────────────────┤
│ [RiskHintBanner]             │
│ DOMAIN labels / VOICE final  │
├─────────────────────────────┤
│ Consultation Answer Card     │
│ Status: received/generating  │
│ ┌─────────────────────────┐ │
│ │ StreamingAnswer          │ │
│ │ partial answer text...   │ │
│ └─────────────────────────┘ │
│ [TimeoutState if slow]       │
├─────────────────────────────┤
│ [FeedbackBar]                │
│ [SaveQuestionButton]         │
├─────────────────────────────┤
│ Continue with more context   │
│ [ follow-up input       ]    │
└─────────────────────────────┘
```

## Photo Consultation Lite

```text
┌─────────────────────────────┐
│ Photo Consultation Lite      │
│ [AlphaNotice: VOICE final]   │
├─────────────────────────────┤
│ Upload Area                  │
│ ┌─────────────────────────┐ │
│ │ PhotoUploadCard          │ │
│ │ state: empty/uploading   │ │
│ └─────────────────────────┘ │
├─────────────────────────────┤
│ Image Preview                │
│ [ thumbnail ] [ replace ]    │
│ Upload status                │
├─────────────────────────────┤
│ Image Understanding          │
│ state: image_understanding   │
│ image_summary                │
├─────────────────────────────┤
│ User Supplement Question     │
│ [ What do you want to ask? ] │
├─────────────────────────────┤
│ [RiskHintBanner]             │
│ [StreamingAnswer]            │
│ [FeedbackBar] [SaveButton]   │
└─────────────────────────────┘
```

No OCR archive, document vault, automatic material checklist, payment, booking, or dispatch UI.

## My Consultation History

```text
┌─────────────────────────────┐
│ My Consultation Records      │
│ [AlphaNotice compact]        │
├─────────────────────────────┤
│ Filters: all / saved / photo │
├─────────────────────────────┤
│ ConsultationHistoryItem      │
│ question summary             │
│ status / image / saved       │
│ feedback / created_at        │
│ [ open detail ]              │
├─────────────────────────────┤
│ ConsultationHistoryItem      │
│ ...                          │
└─────────────────────────────┘
```

This is consultation history, not Matter.

## Consultation History Detail

```text
┌─────────────────────────────┐
│ Consultation Record Detail   │
├─────────────────────────────┤
│ Original Question            │
│ question_text                │
│ image preview / summary      │
├─────────────────────────────┤
│ [RiskHintBanner if hit]      │
├─────────────────────────────┤
│ AI Answer                    │
│ answer_text                  │
├─────────────────────────────┤
│ User Signals                 │
│ feedback_type                │
│ saved_question               │
├─────────────────────────────┤
│ Metadata                     │
│ created_at / model           │
│ prompt_version               │
├─────────────────────────────┤
│ [ Continue with more context]│
└─────────────────────────────┘
```

No case owner, formal deadline, assignment, SLA, or resolution lifecycle.

## Learning Console List

```text
┌────────────────────────────────────┐
│ Learning Console                    │
│ Simple Overview Module              │
│ today / total / photo / risk / fail │
├────────────────────────────────────┤
│ Tabs                                │
│ all / photo / risk / inaccurate     │
│ human confirm / saved / timeout     │
├────────────────────────────────────┤
│ ConsoleFilterBar                    │
│ date / status / feedback / image    │
├────────────────────────────────────┤
│ ConsoleQuestionRow                  │
│ question_text                       │
│ risk_keyword_hits                   │
│ feedback_type / image_attached      │
│ status / latency / prompt_version   │
│ created_at / [ open detail ]        │
└────────────────────────────────────┘
```

## Learning Console Detail

```text
┌────────────────────────────────────┐
│ Console Detail                      │
│ question_id / status / created_at   │
├────────────────────────────────────┤
│ User Input                          │
│ question_text                       │
│ image_attached / image_summary      │
├────────────────────────────────────┤
│ AI Answer                           │
│ answer_text                         │
├────────────────────────────────────┤
│ Risk + Domain                       │
│ risk_keyword_hits                   │
│ fact_anchor_ids                     │
├────────────────────────────────────┤
│ Model + Prompt                      │
│ model / prompt_version              │
├────────────────────────────────────┤
│ Timing                              │
│ stream_started_at                   │
│ first_token_at                      │
│ completed_at / total_latency_ms     │
│ timeout_reason                      │
├────────────────────────────────────┤
│ User Signals                        │
│ feedback_type / saved_question      │
│ human_confirm_clicked               │
│ follow_up_count                     │
└────────────────────────────────────┘
```

