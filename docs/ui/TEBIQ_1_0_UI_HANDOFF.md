---
status: draft / internal / preview-only / not production
owner: TEBIQ-CODEXUI
review_required: Project Lead + GM before implementation acceptance
downstream_consumers: GM / ENGINE / QA / VOICE / DOMAIN
---

# TEBIQ 1.0 UI Handoff

This file now includes Phase 1 docs-first handoff plus Alpha UI Polish implementation notes.

Runtime UI polish has started for internal Alpha surfaces only.

## Alpha UI Polish Update

| Field | Value |
|---|---|
| status | alpha / preview-only / not final professional judgment |
| branch | `codex/alpha-ui-polish` |
| origin/main at start | `323ce91` `Merge pull request #50 from martindoad-bit/hotfix/alpha-submit-button` |
| scope | UI polish only; no API changes, no new product features |
| production claim | none |

### Runtime Pages Updated

| Page | Update |
|---|---|
| `/ai-consultation` | Reworked entry + answer surface into consultation-product layout; clearer text/photo entry, persistent Alpha notice, clearer streaming/partial/fallback/failed states, stronger feedback/save/follow-up actions |
| `/me/consultations` | Reworked saved consultation list; clearer saved count, image marker, feedback, risk keywords, status, and detail entry |
| `/c/[id]` | Reworked consultation detail; clearer question/answer/image summary/risk/status/meta hierarchy |
| `/internal/learning-console` | Reworked list/overview; added scan-friendly metrics, tabs, answer/image previews, risk/feedback/save/human-confirm/model/prompt/latency/failure fields |
| `/internal/learning-console/[id]` | Reworked detail; clearer primary content and side metadata while keeping all required fields visible |

### Runtime Components Added

| Component / Helper | Path | Purpose |
|---|---|---|
| Alpha consultation UI primitives | `components/ui/consultation-alpha.tsx` | Shared Alpha notice, shell, brand header, status badge, risk hint, surfaces, meta pills, feedback label helpers |

### Status UI Mapping

| Product State | Runtime Handling |
|---|---|
| `completed` | Displayed as complete answer only when `completionStatus === completed` or active stream completes |
| `streaming` | Displayed during received / streaming lifecycle with body text as chunks arrive |
| `timeout_waiting` | Active UI uses this for 25s still-generating state |
| `partial` | Derived when timeout has saved partial answer or visible partial answer text |
| `timeout` | Derived when no usable answer is available and no fallback marker exists |
| `failed` | Displayed when generation fails |
| `fallback` | Derived when timeout/failure path has safety fallback text or timeout reason without partial answer |

### Mock vs Real

| Area | Status |
|---|---|
| Consultation stream | Real existing API retained |
| Photo upload / image summary | Real existing API retained |
| Save / feedback | Real existing API retained |
| User history | Real existing DB query retained |
| Learning Console | Real existing DB query retained |
| New UI data | No new backend fields introduced |

### Brand / VI Handling

| Rule | Handling |
|---|---|
| No logo redesign | Uses canonical logo asset path only |
| No new color system | Runtime polish uses existing V07 CSS variables / token aliases already present in app globals |
| No new font | Uses existing app typography setup |
| warmAmber usage | Reserved for risk / focus / incomplete state accent |
| Derived state colors | Still a gap; no production token claim |

### QA Needed For Polish

| Area | QA Check |
|---|---|
| `/ai-consultation` mobile | Text entry, photo entry, stream status, completed state, timeout/fallback/partial display, feedback, save, follow-up |
| `/me/consultations` | Saved records list, image marker, feedback, risk keywords, status label |
| `/c/[id]` | Completed record does not show fallback/timeout; partial/fallback/failed remain distinct |
| `/internal/learning-console` | All seven tabs, overview metrics, row scan fields, empty state |
| `/internal/learning-console/[id]` | Required field coverage and no Matter/Pro workflow implication |

### Known Polish Gaps

| Gap | Status |
|---|---|
| State colors remain derived from current V07 variables rather than canonical reviewed state tokens | needs review |
| Elevation / shadow remains intentionally minimal because canonical shadow tokens are missing | needs review |
| Typography scale remains runtime-derived from existing app setup | needs review |
| Dark mode not implemented | out of scope |
| Screens with no DB data rely on empty states; real visual density depends on seeded / production records | QA should check with data |

## Context Stamp

| Field | Value |
|---|---|
| `origin/main` | `2e196ad` `feat(brand+landing): Brand Source Sync + DOMAIN/QA artifact landing` |
| `local-branch` | `codex/tebiq-ui-docs-phase1-brand-source` |
| `relevant-pr` | PR #44 `feat(1.0-alpha): streaming consultation pipeline (Issue #39)` is open and noted as adjacent ENGINE work |
| `current-state-last-verified` | `2026-05-05` |
| `decision-log-latest` | `DL-011 · TEBIQ 1.0 重新定义为 AI 在留咨询 Alpha（不是完整 Risk Management）` |
| `confirmed-facts` | V07 Quiet Brow locked; 1.0 Alpha is AI immigration-status consultation Alpha; not full Risk Management / Matter / Pro backend |
| `local-only-observations` | `TEBIQ_CURRENT_STATE.md` table still lists `main_head=e81a095`, while remote and Project Lead instruction confirm `2e196ad` |
| `conflicts` | Current-state table is stale relative to remote/user latest; proceeding under user + remote priority |
| `confidence` | medium; docs scope is clear, runtime token integration still needs GM / ENGINE review |

## Source Read Status

| Required Source | Status |
|---|---|
| `AGENTS.md` | Read |
| `docs/ops/TEBIQ_CONTEXT_BOOTSTRAP.md` | Read |
| `docs/product/TEBIQ_CONTEXT_PACK.md` | Read |
| `docs/product/TEBIQ_CURRENT_STATE.md` | Read |
| `docs/product/TEBIQ_DECISION_LOG.md` | Read |
| `docs/product/TEBIQ_ARTIFACT_REGISTRY.md` | Read |
| `docs/brand/TEBIQ_BRAND_PACKAGE.md` | Read |
| `docs/brand/TEBIQ_LOGO_USAGE.md` | Read |
| `docs/brand/TEBIQ_COLOR_TOKENS.md` | Read |
| `docs/brand/TEBIQ_TYPOGRAPHY.md` | Read |
| `docs/product/tebiq-v07-tokens.json` | Read |
| `public/brand/tebiq-v07/` | Asset paths listed |
| `components/ui/design-tokens.ts` | Read |
| `tailwind.config.ts` | Read |
| `docs/voice/TEBIQ_*.md` | Read for status/source constraints |
| `docs/domain/DOMAIN_CONSOLE_LABELS.md` | Read |

## Brand / VI Source

V07 Quiet Brow is locked and source-locked. Runtime UI must consume canonical sources only.

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

Color tokens to use by token name only: `inkBlue`, `deepSlate`, `coolGray`, `softGray`, `offWhite`, `warmAmber`.

Typography must be referenced through canonical typography source and token fields only. `docs/ui` does not inline font-family values.

Known gaps:

| Gap | Handoff Handling |
|---|---|
| State colors for hover / active / focus / error | Derived UI Token Proposal below; needs review |
| Elevation / shadow tokens | Derived UI Token Proposal below; needs review |
| Typography scale | Derived UI Token Proposal below; needs review |
| Dark mode full palette | Not defined; only dark logo asset exists |
| Print guideline | Not defined; report to GM if production print is needed |
| Code token naming alignment | `components/ui/design-tokens.ts` and `tailwind.config.ts` need GM/ENGINE review against V07 token names before runtime visual implementation |

Review needed: yes.

## Derived UI Token Proposal

status: needs review / not canonical until GM + Project Lead approval

| Proposal Area | Proposed Handling |
|---|---|
| State color semantics | Use canonical color token names only; map hover / active / focus / error behavior after GM + ENGINE review |
| Elevation / shadow | Avoid introducing shadow-heavy UI in preview; if needed, propose non-canonical derived elevation tokens for review |
| Typography scale | Define preview-only size/line-height scale in Phase 2 UI spec after GM review |
| Dark mode | Do not implement full dark mode unless GM provides full palette |
| Print | Out of scope for Alpha preview; report to GM if print/PDF requirement appears |

These proposals are not production tokens.

## Pages Planned For This Sprint

| Page | Status |
|---|---|
| Consultation Home | Planned for Phase 2 |
| Text Consultation / Answer | Planned for Phase 2 |
| Photo Consultation Lite | Planned for Phase 2 |
| My Consultation History | Planned for Phase 2 |
| Consultation History Detail | Planned for Phase 2 |
| Learning Console List | Planned for Phase 3 |
| Learning Console Detail | Planned for Phase 3 |
| Simple Data Overview Module | Planned for Phase 3 |

## Components Planned

| Component | Status |
|---|---|
| `ConsultationInput` | Planned |
| `PhotoUploadCard` | Planned |
| `StreamingAnswer` | Planned |
| `AlphaNotice` | Planned |
| `RiskHintBanner` | Planned |
| `FeedbackBar` | Planned |
| `SaveQuestionButton` | Planned |
| `ConsultationHistoryList` | Planned |
| `ConsultationHistoryItem` | Planned |
| `ConsoleFilterBar` | Planned |
| `ConsoleQuestionRow` | Planned |
| `ConsoleQuestionDetail` | Planned |
| `StatusBadge` | Planned |
| `TimeoutState` | Planned |
| `EmptyState` | Planned |
| `ErrorState` | Planned |

## Mock Data Used

No runtime mock data has been implemented in Phase 1.

Phase 2 / Phase 3 may use mock records aligned to `TEBIQ_1_0_UI_DATA_MAPPING.md` if real APIs are not available.

## Data Needing API

| Area | Needed API |
|---|---|
| Text consultation | Submit question and receive streaming answer |
| Streaming | SSE or equivalent event schema |
| Photo Lite | Upload image and receive image summary |
| Feedback | Submit and retrieve feedback |
| Saved question | Save and retrieve saved state |
| User history | List and detail consultation records |
| Learning Console | Query records, filters, metrics, and detail |

## Must Use Real Interfaces Before Production Consideration

| Function | Real API Required |
|---|---|
| Streaming answer | Yes |
| Photo upload | Yes |
| Image understanding | Yes |
| Save question | Yes |
| Feedback submission | Yes |
| Consultation history persistence | Yes |
| Learning Console record query | Yes |

## Preview-Only Items

| Item | Preview Status |
|---|---|
| Page structure | Can be previewed with mock data |
| UI state machine | Can be simulated |
| Streaming answer | Can be mocked with timed partial text |
| Timeout behavior | Can be simulated |
| Console rows and metrics | Can be mocked |
| Risk keyword display | Can be mocked pending DOMAIN labels |

## Out Of Scope

| Area | Status |
|---|---|
| Full Risk Management / Risk Triage | Out of scope |
| Full Matter | Out of scope |
| Pro backend / Partner Workspace | Out of scope |
| Payment / booking / dispatch | Out of scope |
| OCR archive / document management | Out of scope |
| Brand redesign / image2.0 | Out of scope |

## QA Should Test

QA should use `TEBIQ_1_0_UI_QA_CHECKLIST.md`.

Priority checks:

| Priority | Check |
|---|---|
| P0 | User can enter text consultation |
| P0 | User can enter photo consultation |
| P0 | Streaming answer is visible as text, not blank loading |
| P0 | AlphaNotice is present |
| P0 | RiskHintBanner appears when risk keywords hit |
| P0 | FeedbackBar appears after completion |
| P0 | SaveQuestionButton works in preview |
| P0 | History page shows saved questions |
| P0 | Learning Console shows records and required tabs |
| P0 | Timeout / failure states are safe |
| P0 | No production-ready, Matter, Pro, or complete risk-management implication |

## Known Gaps

| Gap | Owner Needed |
|---|---|
| Runtime route structure for Phase 2 | GM / ENGINE |
| Canonical final user-visible copy | VOICE / GM |
| DOMAIN risk labels and fact anchor usage rules | DOMAIN / GM |
| API schemas | ENGINE |
| Code-level token alignment with V07 canonical token names | GM / ENGINE |
| State colors / elevation / typography scale | GM / Project Lead review |

## Next Iteration Suggestions

| Suggestion | Reason |
|---|---|
| Confirm route names for preview pages | Avoid conflicting with existing app routes |
| Confirm stream event schema | Needed for real StreamingAnswer wiring |
| Confirm feedback enum | Needed for FeedbackBar and Console filters |
| Confirm risk keyword source | Needed for RiskHintBanner and Console tabs |
| Confirm photo upload constraints | Needed for PhotoUploadCard behavior |
| Resolve code token naming alignment | Needed before runtime visual implementation |
