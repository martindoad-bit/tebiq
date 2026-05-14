# Guardrail Workpack 001 — P0/P1 Answer Safety

Created: 2026-05-14

Owner: FACT

Reviewer flow: Codex scans progress -> DOMAIN reviews uncertain points -> AQL tests focused regressions.

## Background

Phase 2 Batch29A/29B proved that Knowledge Atlas improves TEBIQ answers. It also exposed specific P0/P1 failure modes. This workpack turns the highest-impact failures into source-backed guardrail cards.

Read first:

- `docs/ops/TEBIQ_CURRENT_WORK_STATUS_2026-05-14.md`
- `docs/eval/KNOWLEDGE_ATLAS_PHASE2_BATCH29AB_EXEC_REPORT.md`
- `docs/knowledge-atlas/FACT_PRODUCTION_RUNBOOK.md`
- `docs/knowledge-atlas/phase2/guardrails-p0p1/README.md`

Progress file:

```text
docs/knowledge-atlas/phase2/guardrails-p0p1/FACT_PROGRESS.md
```

## Scope And Batch Rhythm

This workpack is not a five-card one-off. It starts with a 10-card core batch and then continues into the next guardrail batch if token/context remains.

Batch rhythm:

- Core batch target: 10 cards.
- Stretch target: 15-20 cards if sources and context allow.
- Progress update: every 3-5 cards, and at every batch boundary.
- Final report: after a full batch, not after every single card.

G1-G5 have already been produced in this directory. FACT should inspect them but continue from G6 unless it finds a clear source error.

## Core Batch 001 — 10 Cards

### G1 — Special Period Two-Month Boundary

Target file:

```text
docs/knowledge-atlas/phase2/guardrails-p0p1/guardrail-special-period-two-month-boundary.md
```

Problem to prevent:

- Answer says a pending renewal/change application remains legally protective indefinitely.

FACT task:

- Find official source for the special period boundary.
- State the boundary as a fact: disposition or original expiry + two months, whichever comes earlier, if supported by source.
- Add `must_not_say` for "审查中就一直合法 / 自动延长到结果出来".
- Mark any nuance requiring DOMAIN.

### G2 — National Tax `納税証明書（その3）`

Target file:

```text
docs/knowledge-atlas/phase2/guardrails-p0p1/guardrail-national-tax-certificate-sono3.md
```

Problem to prevent:

- Answer sends the user to city hall for `納税証明書その3`.

FACT task:

- Verify official source that `納税証明書（その3）` is a national tax certificate handled by tax office/e-Tax.
- Contrast it with municipal resident-tax proof.
- Add `must_not_say` for substituting 源泉徴収票 / 確定申告控え / 住民税証明 without checking notice wording.

### G3 — Resident Tax Fiscal Year / January 1 Address

Target file:

```text
docs/knowledge-atlas/phase2/guardrails-p0p1/guardrail-resident-tax-fiscal-year-address.md
```

Problem to prevent:

- Answer maps a tax certificate to the wrong municipality by confusing income year and fiscal/tax year.

FACT task:

- Verify official source for resident tax taxation by municipality of address on January 1.
- Explain the distinction between income year and tax/issuance fiscal year.
- Include move/multiple-municipality trigger language.

### G4 — Late Payment /追納 /補申告 Does Not Erase History

Target file:

```text
docs/knowledge-atlas/phase2/guardrails-p0p1/guardrail-late-payment-not-erased.md
```

Problem to prevent:

- Answer says that once tax/pension/insurance proof can be issued, immigration risk is cleared.

FACT task:

- Collect official facts on what payment certificates or contribution records prove.
- State only source-backed facts.
- If official sources do not directly say immigration evaluation impact, mark that as `needs_domain`.
- Add safe framing: remediation may improve current state but does not let TEBIQ say history is erased or risk is zero.

### G5 — J-Skip Eligibility Gate

Target file:

```text
docs/knowledge-atlas/phase2/guardrails-p0p1/guardrail-j-skip-eligibility-gate.md
```

Problem to prevent:

- Answer treats 1200万/1600万 as potentially J-Skip eligible without hard route check.

FACT task:

- Verify official J-Skip route conditions and income thresholds.
- Separate J-Skip from ordinary 高度専門職ポイント制.
- Add `must_not_say` for "J-Skip may work" when hard thresholds are not met.
- Put ambiguous route comparison into DOMAIN queue if needed.

### G6 — HSP1 Institution Change Boundary

Target file:

```text
docs/knowledge-atlas/phase2/guardrails-p0p1/guardrail-hsp1-institution-change.md
```

Problem to prevent:

- Answer says "points are still enough + 14-day notification" is enough to start at a new HSP1 institution.

FACT task:

- Verify official sources for HSP1 institution-specific permission / change handling and notification duties.
- Separate permission, 14-day notification, and points evidence.
- Add `must_not_say` for "点数够 + 届出即可先入社".
- Mark any route nuance requiring DOMAIN.

### G7 — Work Qualification Certificate Boundary

Target file:

```text
docs/knowledge-atlas/phase2/guardrails-p0p1/guardrail-work-qualification-certificate-boundary.md
```

Problem to prevent:

- Answer treats `就労資格証明書` as new work permission or as a substitute for required change permission.

FACT task:

- Verify official sources on what `就労資格証明書` is and is not.
- Separate certificate, notification, renewal/change permission, and actual start of activity.
- Add `must_not_say` for "证明书 = 新工作许可" unless a DOMAIN-reviewed route says otherwise.

### G8 — Spouse Divorce / Death / Remarriage

Target file:

```text
docs/knowledge-atlas/phase2/guardrails-p0p1/guardrail-spouse-divorce-death-remarriage.md
```

Problem to prevent:

- Answer says spouse status automatically cancels after divorce/death, or conversely says the user can safely use it until expiry.

FACT task:

- Verify official sources for spouse-related notification duties and cancellation/review boundaries.
- Separate notification, current period, activity basis, renewal/change route, and deep-water review.
- Include divorce, death, and remarriage triggers.
- Put form-practice ambiguity into DOMAIN queue.

### G9 — DV Separation / Address Safety

Target file:

```text
docs/knowledge-atlas/phase2/guardrails-p0p1/guardrail-dv-separation-address-safety.md
```

Problem to prevent:

- Answer tells the user to contact the abusive spouse or expose a shelter/new address before considering safety.

FACT task:

- Verify official / quasi-official sources for DV consultation routes, immigration consultation, and address-safety considerations.
- State safe source-backed facts only.
- Do not promise confidentiality outcomes beyond what sources support.
- Add `must_say` around safety-first, documentation, and professional/official consultation.

### G10 — Business Manager Company Disposition Before Status Change

Target file:

```text
docs/knowledge-atlas/phase2/guardrails-p0p1/guardrail-business-manager-disposition-before-change.md
```

Problem to prevent:

- Answer says company休業/注销/清算/转让 automatically improves a change to 技人国/HSP.

FACT task:

- Verify official sources on 経営管理 activity, change application boundaries, and available official materials.
- Separate old company factual state, tax/social insurance/employees, new employer materials, and change permission.
- Mark strategic sequencing as `needs_domain`.
- Add `must_not_say` for "先关公司就更容易过".

## Continuation Candidates

If the core 10 cards are complete and token/context remains, continue with these candidates in order and keep updating `FACT_PROGRESS.md`:

1. immigration notice taxonomy: receipt / online notice / additional-doc request / result postcard / non-permission / hearing / cancellation;
2. incomplete-material filing before expiry boundary;
3. result postcard / pickup notice boundary;
4. company / school / Hello Work / city office cannot replace immigration duty;
5. PR pending vs current-status renewal boundary hardening.

## FACT Rules

Do:

- use official / quasi-official sources only;
- include source URLs and checked date;
- keep facts atomic and testable;
- record source gaps honestly;
- update `FACT_PROGRESS.md` every 3-5 cards and at every batch boundary.

Do not:

- write user-facing answer prose;
- judge approval probability;
- use blogs or social media as fact source;
- mark high-risk practical conclusions as direct facts;
- modify application code or Eval Lab files.

## Completion Criteria

Core Batch 001 is complete when:

- all ten core target files exist;
- every card has official source references or explicit `needs_domain`;
- `FACT_PROGRESS.md` has completed-card rows, source log, and DOMAIN queue;
- FACT writes a final handoff note in `FACT_PROGRESS.md`.

If FACT continues into continuation candidates, treat those as the start of Batch 002 and clearly mark them in `FACT_PROGRESS.md`.
