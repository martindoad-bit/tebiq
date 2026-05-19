# TEBIQ Practical Runtime Foundation

Date: 2026-05-19  
Branch: `codex/ceb01-benchmark-pack-20260519`

## 1. Goal

This work block prepares the answer runtime for governed practical cards without deciding the final product UI.

The goal is not to inject all 600+ cards. The goal is to make the runtime ready for cards produced by the Practical Governance window:

- accept concise `runtime_block` data;
- keep practical injection short;
- expose practical-card metadata to benchmark/AQL;
- keep the feature behind a runtime flag.

## 2. Runtime Block Contract

Practical cards can now expose a short runtime block either in frontmatter or in a fenced YAML block.

Preferred shape:

```yaml
runtime_block:
  user_situation: "When this card should be used"
  short_answer: "One-sentence answer"
  practical_rule: "How practice usually treats this"
  official_anchor: "Official/legal anchor"
  conditions:
    - "Condition 1"
  risk:
    - "Common misunderstanding"
  should_not_say:
    - "Dangerous answer wording"
  material_bridge:
    - "Related material/checklist"
  source_urls:
    - "https://..."
```

Rules:

- `short_answer` and `practical_rule` should stay concise.
- This block is for model grounding, not user-facing UI copy.
- Cards without `runtime_block` still work through the legacy section fallback, but the fallback is intentionally compact.

## 3. Code Changes

### Practical runtime parser

Added:

- `lib/answer/practical-layer/runtime-block.ts`
- `lib/answer/practical-layer/runtime-block.test.ts`

Capabilities:

- parses frontmatter `runtime_block`;
- parses fenced body YAML containing `runtime_block`;
- formats a compact prompt block;
- preserves `material_bridge` and `source_urls` for trust/material bridge experiments.

### Practical matcher

Updated:

- `lib/answer/practical-layer/matcher.ts`

The matcher now returns:

- `runtime_block`
- `runtime_block_source`
- `prompt_chars`
- `material_bridge`
- `source_urls`

It still caps matches at two cards and remains keyword-based for this foundation slice.

### Consultation runtime

Updated:

- `app/api/consultation/stream/route.ts`

The production route already supports `PRACTICAL_LAYER_ENABLED=true`.

No final UI is added in this block. This keeps the product layer open until AQL/UI judgment comes back.

### Benchmark runner

Updated:

- `scripts/eval/run-web10-context-benchmark.ts`
- `package.json`

Added:

- `npm run eval:context-benchmark`
- `--tebiq-practical=true|false`
- answer metadata for:
  - practical card ids
  - runtime block source
  - prompt chars
  - material bridge hints
  - source URLs

This lets AQL compare:

- TEBIQ with practical layer on;
- TEBIQ with practical layer off;
- Flash/Pro baselines.

## 4. Current 30-Card Slice

The first 30-card slice remains in:

- `docs/practical-cards/runtime-v1/`

These are still legacy cards, so they mostly use `runtime_block_source=legacy_sections`.

After compacting fallback prompts, the日配再婚 test now injects:

- `practical-004`: 754 chars
- `practical-187`: 724 chars

This is still longer than ideal. Governance output should replace these with explicit `runtime_block` data.

## 5. Verification

Passed:

- `npm test -- --test-reporter=spec lib/answer/practical-layer/runtime-block.test.ts`
- `npx tsc --noEmit --pretty false`
- `npm run lint`

Pending for a full release branch:

- one fresh 16-question benchmark after Governance produces explicit runtime blocks

## 6. Next Engineering Step

Wait for the first Practical Governance batch, then:

1. copy/ingest their `ANSWER_RUNTIME` cards with explicit `runtime_block`;
2. run `npm run eval:context-benchmark -- --input=<pack> --tebiq-practical=true`;
3. run the same pack with `--tebiq-practical=false`;
4. give AQL both answer sets and the practical metadata.

Do not expand to all cards before this A/B check.
