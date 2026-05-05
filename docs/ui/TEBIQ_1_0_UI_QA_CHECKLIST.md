---
status: draft / internal / preview-only / not production
owner: TEBIQ-CODEXUI
review_required: Project Lead + GM before implementation acceptance
downstream_consumers: GM / ENGINE / QA / VOICE / DOMAIN
---

# TEBIQ 1.0 UI QA Checklist

This checklist is for internal preview acceptance only.

It does not certify production readiness.

## User Entry

| Check | Expected Result | Status |
|---|---|---|
| User can enter text consultation | Home provides visible text input and submit action | Pending |
| User can enter photo consultation | Home provides visible photo consultation Lite entry | Pending |
| Home is not a marketing landing page | First screen is usable product UI | Pending |
| Alpha boundary is visible on home | AlphaNotice appears before consultation | Pending |

## Text Consultation

| Check | Expected Result | Status |
|---|---|---|
| Submitted question remains visible | User can see what they asked | Pending |
| Answer really streams | Partial answer text appears progressively | Pending |
| User does not wait on blank loading | `submitted`, `received`, or `generating` state is visible | Pending |
| 25-second waiting hint is safe | Slow response shows `timeout_waiting`, not failed | Pending |
| 90-120 second failure is safe | Final failure state does not fake a completed answer | Pending |
| Feedback buttons are visible after completion | FeedbackBar appears only when answer is ready | Pending |
| Save question is visible after completion | SaveQuestionButton appears near answer actions | Pending |
| Continue supplement input is visible | User can add more context without Matter framing | Pending |

## High-Risk Hint

| Check | Expected Result | Status |
|---|---|---|
| Risk hint appears when risk keywords hit | RiskHintBanner is visible | Pending |
| Risk hint stays near answer | Banner is above or adjacent to answer body | Pending |
| Risk hint does not block reading | It does not overlay or hide answer content | Pending |
| Risk hint is not alarming | Visual treatment is gentle and not alarm-style | Pending |

## Photo Consultation Lite

| Check | Expected Result | Status |
|---|---|---|
| User can upload/select photo | PhotoUploadCard accepts an image in preview | Pending |
| Uploading state appears | User sees `uploading`, not blank wait | Pending |
| Image preview appears | Uploaded image thumbnail is visible | Pending |
| Image understanding state appears | User sees recognition is in progress | Pending |
| Image summary appears | `image_summary` is shown and labeled preview/AI-generated | Pending |
| Answer can generate from photo flow | StreamingAnswer appears after image summary and question | Pending |
| No OCR archive system is implied | UI does not create document file records or material checklists | Pending |

## User Records

| Check | Expected Result | Status |
|---|---|---|
| History page shows consultation records | List includes question summary, status, time, image flag | Pending |
| Saved question is visible in history | Saved records have a clear saved indicator | Pending |
| Feedback tag is visible in history | Feedback type appears when present | Pending |
| Record detail opens | Detail shows original question and answer | Pending |
| Detail is not Matter | No case owner, case status, assignment, formal deadline, or resolution workflow | Pending |

## Learning Console

| Check | Expected Result | Status |
|---|---|---|
| Console shows consultation records | Rows include question, image flag, risk hits, feedback, status, latency | Pending |
| Required tabs exist | All seven required tabs are present | Pending |
| Overview metrics exist | Top module shows required counts and average response time | Pending |
| Console detail shows mapped fields | Detail includes all P0 fields from data mapping | Pending |
| Timeout / failure records are visible | Failed and slow records can be inspected | Pending |
| Console is not Pro backend | No assignment, SLA, formal triage, or case workflow | Pending |

## Production Boundary

| Check | Expected Result | Status |
|---|---|---|
| No production-ready claim | UI copy and docs remain preview-only | Pending |
| No complete risk management claim | UI does not describe itself as a risk system | Pending |
| No complete Matter claim | UI does not present consultation records as cases | Pending |
| No unapproved VOICE copy treated as final | Final wording is marked pending VOICE review | Pending |
| No unapproved DOMAIN facts treated as final | Domain labels and facts are marked pending DOMAIN review | Pending |

