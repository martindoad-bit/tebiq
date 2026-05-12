# Legal Source Engineering — P1 Cycle 2 Workpack

**Date**: 2026-05-12
**Parent**: [`LEGAL_SOURCE_STRUCTURE_ENGINEERING.md`](./LEGAL_SOURCE_STRUCTURE_ENGINEERING.md)
**Previous cycle**: [`LEGAL_SOURCE_P1_CYCLE1_WORKPACK.md`](./LEGAL_SOURCE_P1_CYCLE1_WORKPACK.md)
**Scope**: 高度専門職 / 高度人材ポイント制 / J-Skip
**Goal**: separate ordinary point-based高度専門職, J-Skip,高度専門職2号, permanent-residence shortening, and family-related privileges.

## Cycle Goal

P1 Cycle 2 builds the high-skilled-specialty layer:

```text
When the user asks about高度専門職 or J-Skip,
the system must first identify the制度 family and activity category,
then route to points, J-Skip thresholds, 2号, permanent residence, or family privilege boundaries.
```

Primary failures to eliminate:

- treating J-Skip as a 70-point route;
- treating高度専門職2号 as identical to永住者;
- saying 70/80 points guarantee permanent residence;
- saying高度専門職 family privileges apply to all family members without conditions;
- ignoring the change-application warning for高度専門職1号 activity or institution changes.

## Batch Plan

| Batch | Target Count | Purpose |
|---|---:|---|
| Batch 1 | 12-16 cards | ordinary point system, three activity categories, preferential measures, 2号, J-Skip thresholds and boundaries |
| Batch 2 | 12-20 cards | spouse, parent, domestic servant, online/procedure, materials and evidence boundaries |
| Batch 3 | 12-20 cards | A/B integration, false-positive burn-down against永住,経営管理,技人国,家族滞在, J-Find |

All cards remain `ai_extracted` until review and promotion.
