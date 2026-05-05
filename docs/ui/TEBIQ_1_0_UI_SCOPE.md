---
status: draft / internal / preview-only / not production
owner: TEBIQ-CODEXUI
review_required: Project Lead + GM before implementation acceptance
downstream_consumers: GM / ENGINE / QA / VOICE / DOMAIN
---

# TEBIQ 1.0 UI Scope

TEBIQ 1.0 Alpha UI is a preview interface for AI immigration-status consultation.

It exists to help CEO / GM / QA / DOMAIN open the product, experience the consultation loop, and inspect whether the UI is understandable, trustworthy, and learnable.

This is internal / preview-only / not production.

## Product Boundary

| Included | Meaning |
|---|---|
| Text consultation | User asks a question and receives a streaming answer |
| Photo consultation Lite | User uploads an image, sees a light image summary, then receives an answer |
| Alpha notice | User is always reminded this is Alpha consultation support |
| High-risk hint | Risk-related questions show a visible but non-alarming hint |
| Feedback | User can mark answer usefulness or concern |
| Saved question | User can save a consultation question |
| Consultation history | User can revisit past consultation records |
| Learning Console | Internal team can inspect questions, answers, feedback, risk labels, latency, and failures |

## P0 Pages

### User Pages

| Page | Purpose | P0 Contents |
|---|---|---|
| Consultation Home | Entry point for text and photo consultation | TEBIQ mark area, Alpha explanation, text input, photo entry, recent records, Alpha boundary notice |
| Text Consultation / Answer | Main answer experience | User question, AlphaNotice, RiskHintBanner, StreamingAnswer, TimeoutState, FeedbackBar, SaveQuestionButton, follow-up input |
| Photo Consultation Lite | Upload an image and ask a related question | Upload / camera entry, preview, uploading state, image understanding state, image summary, question input, answer area, feedback, save |
| My Consultation History | User-facing record list | Question summary, image flag, status, created time, saved flag, feedback tag, detail entry |
| Consultation History Detail | User-facing record detail | Original question, image / summary, answer, risk keywords, feedback, saved status, time, model information, follow-up entry |

### Internal Console Pages

| Page | Purpose | P0 Contents |
|---|---|---|
| Learning Console List | Scan all consultation records | Tabs, filters, question rows, risk keywords, feedback, status, latency, image flag, prompt version, detail entry |
| Learning Console Detail | Inspect one consultation record | Question, image summary, answer, risk hits, fact anchors, model, prompt version, stream timings, latency, timeout reason, feedback, saved flag, human confirm, follow-up count |
| Simple Data Overview Module | Light operational summary | Today consultations, total consultations, photo consultations, risk hits, inaccurate feedback, human-confirm clicks, saved questions, timeout/failure count, average response time |

## P1 Pages

| Page | Why P1 |
|---|---|
| Saved Questions Overview | Can be covered by My Consultation History with saved filters first |
| Dedicated Empty State Pages | Component-level empty states are enough for preview |
| Dedicated Error State Pages | Component-level error and timeout states are enough for preview |
| Console Export View | Useful for QA / DOMAIN, but not required for first preview |
| Simple Metrics Trend Page | Overview module is sufficient for CEO preview |

## Not In This Sprint

| Out Of Scope | Reason |
|---|---|
| Full Risk Management | TEBIQ 1.0 is not a risk management platform |
| Full Risk Triage | No formal severity model or routing workflow in Alpha |
| Full Matter | Consultation records are not legal/admin case files |
| Pro Backend | Learning Console is a lightweight learning surface, not a full operations platform |
| External administrative scrivener backend | Not part of 1.0 Alpha |
| Payment / booking / dispatch | Not in product formula |
| Full OCR archive | Photo Consultation Lite only needs preview, image summary, and answer |
| Document management | Not part of Alpha scope |
| Brand redesign | V07 Quiet Brow is source-locked |
| Production copy | Final VOICE copy must be supplied or approved separately |
| Domain fact invention | DOMAIN must provide or approve professional boundaries |

## User / Console Boundary

| Area | User UI | Learning Console |
|---|---|---|
| Primary job | Ask, understand, save, and give feedback | Inspect, learn, evaluate, and prioritize |
| Data density | Low to medium | Medium |
| Risk display | Gentle persistent hint | Keywords, hit context, and review signals |
| Latency display | Human-readable status | Exact timing fields |
| Failure display | Safe retry / explanation | Failure reason and technical status |
| Feedback | Simple user buttons | QA-readable tags and counts |
| Records | Personal consultation history | Internal consultation sample set |

## Brand / VI Source

V07 Quiet Brow is locked and source-locked. This UI scope does not redefine brand.

| Source | Path |
|---|---|
| Brand package index | `docs/brand/TEBIQ_BRAND_PACKAGE.md` |
| Logo usage | `docs/brand/TEBIQ_LOGO_USAGE.md` |
| Color token doc | `docs/brand/TEBIQ_COLOR_TOKENS.md` |
| Typography source | `docs/brand/TEBIQ_TYPOGRAPHY.md` |
| Token truth | `docs/product/tebiq-v07-tokens.json` |
| Logo / icon assets | `public/brand/tebiq-v07/` |
| Logo asset path | `public/brand/tebiq-v07/svg/tebiq-v07-logo-horizontal.svg` |
| App icon asset path | `public/brand/tebiq-v07/svg/tebiq-v07-app-icon.svg` |
| Code-level tokens | `components/ui/design-tokens.ts` |
| Tailwind integration | `tailwind.config.ts` |

Color tokens used by this scope are token names only: `inkBlue`, `deepSlate`, `coolGray`, `softGray`, `offWhite`, `warmAmber`.

Typography is referenced through the canonical typography source and token fields only. `docs/ui` must not inline font-family values.

Known gaps:

| Gap | Handling |
|---|---|
| State colors for hover / active / focus / error | Derived UI Token Proposal required; not canonical until GM + Project Lead approval |
| Elevation / shadow tokens | Derived UI Token Proposal required; not canonical until GM + Project Lead approval |
| Typography scale | Derived UI Token Proposal required; not canonical until GM + Project Lead approval |
| Dark mode full palette | Not defined; only dark logo asset exists |
| Print guideline | Not defined; report to GM if production print is needed |
| Code token naming alignment | `components/ui/design-tokens.ts` and `tailwind.config.ts` need GM/ENGINE review against the six V07 token names before runtime visual implementation |

Review needed: yes.

Derived proposals are not canonical until GM + Project Lead approval.

