# TEBIQ Cleanup Loop 0 Report

**Date:** 2026-05-18
**Branch:** `codex/cleanup-loop0`
**Scope:** document memory cleanup and pollution-source reduction
**Code / fact cards changed:** no

## Why This Loop Exists

The repo accumulated multiple generations of plans: 0.8 safety docs, 0.8.5
card-import plans, RC sprint reports, Knowledge Runtime loops, copy canons, and
1.0 roadmaps. Several old docs still claimed to be current and were pulling new
windows back toward:

- fixed four-label answer shells;
- card-count goals as the top product goal;
- heavy SaaS-style answer UI;
- stale 0.8/0.8.5 execution plans.

This loop records the new top-level direction and begins removing those stale
entry points.

## Current Direction Recorded

Added:

- `docs/product/TEBIQ_ANSWER_SUPREMACY_PRINCIPLE.md`
- `docs/ops/TEBIQ_CANONICAL_WORKSPACE_MAP.md`

These establish:

- TEBIQ's product target is to beat DeepSeek 4 Pro with web search on high-value
  residence consultation questions.
- Knowledge Runtime Expansion is infrastructure, not the product target.
- The consultation surface should become closer to native AI chat, not more
  heavily wrapped.
- Practitioner-source / practical-signal layers are necessary because official
  law cards alone miss real filing behavior.
- The legacy four-label answer format is not future UX canon.

## Entry Points Updated

Updated:

- `docs/product/TEBIQ_CURRENT_STATE.md`
- `docs/product/TEBIQ_COPY_CANON.md`
- `docs/product/TEBIQ_DECISION_LOG.md`
- `docs/product/TEBIQ_ARTIFACT_REGISTRY.md`
- `docs/ops/README.md`

The goal is that a new window reading the repo starts from the Answer Supremacy
frame instead of the older card-expansion / six-roadmap frame.

## Archived / Marked Historical

Archived root-level loop and RC reports under:

- `docs/archive/knowledge-runtime-2026-05/`

Archived stale root-level ops plans under:

- `docs/archive/stale-ops-2026-05/`

These files remain available as evidence, but they should not appear as current
ops entry points.

First pass moved 34 root-level ops files out of `docs/ops`.

## Still Not Clean

This is the first cleanup pass, not a full repo purge. Remaining debt:

1. Old docs still contain references to fixed four-section answers. They are now
   overridden by the new canon but not all individually edited.
2. Historical workstream docs still exist in-place. They need deeper archive or
   reference pruning only when they block current work.
3. Production code may still require four labels through terminal guards/tests.
   That should be handled in the Answer Experience rewrite, not by docs-only
   cleanup.
4. Fact cards were intentionally not deleted or mass-edited in this loop.

## Next Cleanup Work

1. Build an Answer Experience cleanup branch that removes heavy answer shells
   and rewrites terminal guards/tests accordingly.
2. Build the DeepSeek comparison loop before making more broad answer changes.
3. Start practitioner-source crawling as a separate evidence pipeline.
4. Continue archiving docs only when a file is proven stale or actively
   misleading.
