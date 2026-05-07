# TEBIQ Current Fact Layer — `docs/fact-cards/`

**Owner**: AI-first pipeline (collect → extract → map → QA-gen) + human publish gate
**Sprint**: 0.6 — Workstream C
**Authority**: PL 0.6 sprint kickoff, decision (c) AI-first Fact Layer (2026-05-07)

---

## What this directory is

Source-of-truth for **Current Fact Cards** that get injected into the
production consultation prompt (`/api/consultation/stream`) when a user
question matches the card's scenarios.

Each card is a single markdown file with YAML frontmatter holding the
machine-readable fields, and a markdown body with full source quotes,
scenarios, and QA cases.

## What this directory is NOT

- Not a knowledge base.
- Not a replacement for the model's general knowledge.
- Not a place for opinion / interpretation / 文风 guidance — that
  belongs in `docs/voice/` and `lib/answer/prompt/`.
- Not a list of every visa fact — only **high-impact, time-sensitive,
  policy-change-driven** facts that the model would otherwise answer
  from stale memory.

## State machine

Every card declares one `state`:

| state | meaning | injected into production? |
|---|---|---|
| `draft` | scaffold only, no source-backed content | NO |
| `ai_extracted` | AI pulled fields from official source(s); raw, unreviewed | NO |
| `ai_verified` | AI cross-checked across ≥2 official sources or repeated extraction | INTERNAL DRY-RUN ONLY |
| `human_approved` | publish gate passed (PL/DOMAIN/書士) | **YES** |
| `disabled` | retired or known broken | NO |
| `needs_review` | flagged for human re-check (source change detected, conflict, user incident) | NO |
| `conflict` | two official sources disagree, awaiting human resolution | NO |

**Production injection rule** (enforced in code, not honor system):
only `state: human_approved` cards are loaded by the matcher into the
prompt. `ai_verified` is reachable by an internal dry-run endpoint
only. Never bypass without explicit PL approval logged in the card's
changelog.

## Source whitelist

Only these are acceptable as `official_sources`:

- 出入国在留管理庁 (`isa.go.jp`, `moj.go.jp/isa`)
- 法務省 (`moj.go.jp`)
- e-Gov 法令検索 (`elaws.e-gov.go.jp`)
- 厚生労働省 (`mhlw.go.jp`) — for 年金・健康保険・労務
- 国税庁 (`nta.go.jp`) — for 税金関連
- 各市町村区役所 official pages — for 住民税・国民健康保険 procedural
- 政府公式 PDF / 告示 / 省令

**NOT acceptable as source**: 行政書士ブログ, 中文中介公众号, 小红书,
Twitter/X, Yahoo知恵袋, 中文自媒体. These may be used as **scenario
seeds** (to know what users ask) but never as `official_sources`.

## File naming

`<topic-slug>.md` — kebab-case, English ASCII for filesystem safety.
Examples: `keiei-kanri-2025-10.md`, `eijuu-nenkin-risk.md`,
`gijinkoku-job-mismatch.md`.

## Required frontmatter fields

See any existing card for the canonical shape. AI-generated cards must
mark each field as either `source: <url>` (direct quote) or
`source: ai_inference` (AI synthesis). Human reviewers gate on
inference fields first.

## Workflow

```
1. AI source collector  (C1)  → raw_excerpt + source_id
2. AI fact extractor    (C2)  → fact card draft, state=ai_extracted
3. AI scenario mapper   (C3)  → common_user_phrases + scenario triggers
4. AI QA generator      (C4)  → must_have / must_not_have / regression Qs
5. ENGINE inject       (C0,C6) → matcher loads only state=human_approved
6. Human publish gate   (C5)  → PR review: approve / edit / reject
7. QA regression        (C7)  → automated test suite
```

## Human gate checklist (per card)

- [ ] Every `current_effective_fact` line has a source URL or is marked `ai_inference`
- [ ] All `ai_inference` lines reviewed by domain-competent human
- [ ] `must_say` / `must_not_say` reviewed for tone (no promises, no guarantees)
- [ ] `exceptions_or_transition` covers all officially documented edge cases
- [ ] `common_user_phrases` includes at least 5 colloquial Chinese phrasings
- [ ] At least 3 QA cases generated, with explicit `must_not_have` for stale facts
- [ ] `last_verified_at` set to today
- [ ] `reviewer` field filled
- [ ] State updated to `human_approved`

When approved, ENGINE re-deploys the matcher index. No code change
needed per card — adding a card to this directory is the contract.
