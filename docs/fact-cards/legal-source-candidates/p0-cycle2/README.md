# Legal Source P0 Cycle 2 — Candidate Reports

**Parent workpack**: [`LEGAL_SOURCE_P0_CYCLE2_WORKPACK.md`](../../legal-source-engineering/LEGAL_SOURCE_P0_CYCLE2_WORKPACK.md)  
**Scope**: 上陸基準省令 core / landing-criteria backbone  
**Default card state**: `ai_extracted`  
**Production injection**: none

---

## Operating Rule

Cycle 2 cards are not eligibility answers and not approval predictions.

Each candidate must preserve this distinction:

```text
official landing criterion
≠ material checklist
≠ permission probability
≠ individual legal conclusion
```

---

## Report Sequence

| Report | Scope | Status |
|---|---|---|
| `BATCH1_REPORT.md` | LS-P0C2-001 to LS-P0C2-019: source-role anchors + 技人国 criteria | pending FACT |
| `BATCH2_REPORT.md` | LS-P0C2-030 to LS-P0C2-039: 経営・管理 2025 amended criteria | pending |
| `BATCH3_REPORT.md` | LS-P0C2-050 to LS-P0C2-063: 留学 / 家族滞在 criteria | pending |
| `BATCH4_REPORT.md` | LS-P0C2-070 to LS-P0C2-092: 特定技能 / 企業内転勤 / 技能 | pending |
| `BATCH5_REPORT.md` | LS-P0C2-100 to LS-P0C2-122 plus rewrites | pending |

---

## Batch Report Minimum Shape

Each batch report should include:

- source access notes;
- candidate decision table;
- ready / held / duplicate / source-gap split;
- DOMAIN queue;
- AQL fixtures;
- QA blocking cases;
- machine validation results after Codex normalization.
