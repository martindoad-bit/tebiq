---
status: draft / internal / preview-only / not production
owner: TEBIQ-CODEXUI
review_required: Project Lead + GM before implementation acceptance
downstream_consumers: GM / ENGINE / QA / VOICE / DOMAIN
---

# TEBIQ 1.0 UI Component Map

Component names are implementation-facing and may be adapted to existing repo conventions.

| Component | Purpose | Props | States | Reuse Location | VOICE / DOMAIN Dependency | Mock OK? |
|---|---|---|---|---|---|---|
| `ConsultationInput` | Capture text question or follow-up | `value`, `placeholder`, `disabled`, `isSubmitting`, `onChange`, `onSubmit` | `idle`, `editing`, `submitted`, `disabled` | Home, answer page, history detail | Placeholder and button copy from VOICE | Yes |
| `PhotoUploadCard` | Upload / preview a photo for Lite consultation | `image`, `uploadStatus`, `error`, `onUpload`, `onRemove`, `onRetry` | `empty`, `uploading`, `uploaded`, `failed` | Home, photo page | Upload caution copy from VOICE | Yes |
| `StreamingAnswer` | Show generating, streaming, completed, and fallback answer body | `status`, `partialText`, `answerText`, `startedAt`, `firstTokenAt`, `completedAt`, `isFallback` | `generating`, `streaming`, `completed`, `fallback`, `failed` | Text answer, photo answer, history detail | Answer labels from VOICE, fallback rules from GM / ENGINE | Yes |
| `AlphaNotice` | Persistent Alpha boundary note | `variant`, `message`, `compact` | `default`, `compact`, `inline` | Home, answer, photo, history, console optional | Final Alpha wording from VOICE | Yes |
| `RiskHintBanner` | Show high-risk hint near answer | `riskHits`, `message`, `visible` | `hidden`, `visible`, `loading-labels` | Answer, photo answer, history detail, console detail | Risk labels from DOMAIN, copy from VOICE | Yes |
| `FeedbackBar` | Capture answer feedback | `value`, `disabled`, `onSubmit`, `submittedAt` | `idle`, `submitting`, `submitted`, `disabled` | Answer pages, history detail | Button labels from VOICE | Yes |
| `SaveQuestionButton` | Save consultation question | `saved`, `disabled`, `onSave`, `onUnsave` | `unsaved`, `saving`, `saved`, `failed` | Answer pages, history detail | Toast copy from VOICE | Yes |
| `ConsultationHistoryList` | Render user record list | `items`, `loading`, `emptyState`, `onOpen` | `loading`, `empty`, `ready`, `error` | My Consultation History | Empty text from VOICE | Yes |
| `ConsultationHistoryItem` | Render one user consultation record | `record`, `onOpen` | `normal`, `saved`, `photo`, `failed` | My Consultation History | Status labels from VOICE | Yes |
| `ConsoleFilterBar` | Console tabs and filters | `tabs`, `activeTab`, `filters`, `onTabChange`, `onFilterChange` | `default`, `filtered`, `empty-results` | Learning Console list | Filter labels from GM / QA | Yes |
| `ConsoleQuestionRow` | Render one console row | `record`, `onOpen` | `normal`, `risk`, `inaccurate`, `failed`, `saved` | Learning Console list | Risk labels from DOMAIN | Yes |
| `ConsoleQuestionDetail` | Render full inspection detail | `record`, `loading`, `error` | `loading`, `ready`, `missing`, `error` | Learning Console detail | DOMAIN labels for fact anchors and risk words | Yes |
| `StatusBadge` | Normalize status display | `status`, `tone`, `label` | `idle`, `received`, `generating`, `streaming`, `completed`, `timeout_waiting`, `failed`, `saved` | User UI and console | Status labels from VOICE / QA | Yes |
| `TimeoutState` | Display slow provider or final failure safely | `reason`, `elapsedMs`, `retryable`, `partialTextExists`, `onRetry` | `waiting`, `failed`, `partial-fallback` | Answer pages | Timeout copy from VOICE, failure thresholds from ENGINE | Yes |
| `EmptyState` | Show no records or no results | `title`, `description`, `action`, `variant` | `no-history`, `no-console-results`, `no-photo`, `no-saved` | History, console, photo | Empty state copy from VOICE | Yes |
| `ErrorState` | Show recoverable UI errors | `title`, `description`, `action`, `errorCode` | `network`, `upload`, `stream`, `unknown` | Answer, photo, history, console | Error copy from VOICE / ENGINE | Yes |

All components can be previewed with mock data as long as field names align with `TEBIQ_1_0_UI_DATA_MAPPING.md`.

Real API wiring is required before production consideration and is not claimed by this preview.

