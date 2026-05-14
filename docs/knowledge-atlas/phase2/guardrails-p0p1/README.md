# Phase 2 P0/P1 Guardrails

Owner: FACT produces cards; Codex orchestrates; DOMAIN reviews uncertain/high-risk points.

Status: active workstream, created 2026-05-14.

## Purpose

This directory converts AQL-discovered answer failures into source-backed guardrail cards.

The goal is not to write more general knowledge. The goal is to make dangerous answer failures harder to produce:

- wrong legality boundary;
- wrong office/window route;
- wrong procedure state;
- wrong route eligibility;
- overconfident deep-water classification.

## Why This Exists

The Phase 2 Batch29A/29B A/B test validated Knowledge Atlas:

- B won 47/54 answer pairs.
- Mean score improved from about 3.63 to about 4.37.
- The biggest gains were action safety and procedure boundaries.

But AQL also found P0/P1 failures in both current TEBIQ and the candidate answer. These failures should become guardrails before any broader runtime retrieval connection.

Primary reference:

```text
docs/eval/KNOWLEDGE_ATLAS_PHASE2_BATCH29AB_EXEC_REPORT.md
```

## Operating Mode

FACT should work in batch loops:

1. Pick the current batch from the current workpack.
2. Verify official sources.
3. Write/update cards.
4. Update `FACT_PROGRESS.md`.
5. Add uncertain items to `DOMAIN Review Queue`.
6. Continue to the next batch until token/context is exhausted.

FACT should not wait for Codex after every card. Codex will scan the progress document periodically.

## Batch Rhythm

- Standard batch size: 10-20 cards.
- Workpack 001 core target: 10 cards.
- Stretch target before token exhaustion: continue into the next guardrail batch.
- Progress update rhythm: update `FACT_PROGRESS.md` every 3-5 cards and at every batch boundary.
- Do not stop after the first 5 cards unless blocked by sources or token/context exhaustion.

## Files

Expected files:

- `FACT_PROGRESS.md`: live progress and handoff log.
- `WORKPACK_001.md`: first guardrail workpack.
- `guardrail-*.md`: source-backed guardrail cards.
- `README.md`: this file.

## Card Standard

Each card should include:

- `asset_id`
- `title`
- `asset_family`
- `source_layer`
- `state`
- `risk_level`
- `source_refs`
- `needs_domain_flags`
- `what_this_document_is`
- `trigger`
- `official_rule_or_source_fact`
- `safe_answer_behavior`
- `must_say`
- `must_not_say`
- `deep_water_triggers`
- `user_next_actions`
- `source_notes`

If a fact is not clearly backed by an official source, do not make it a direct fact. Put it in `needs_domain_flags`, `unknown_fields`, or the progress file's DOMAIN queue.
