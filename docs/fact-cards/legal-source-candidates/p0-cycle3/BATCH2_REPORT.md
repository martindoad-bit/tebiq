# P0 Cycle 3 Batch 2 Report — Status Acquisition / Qualification Outside Activity

**Date**: 2026-05-12
**Cycle**: P0 Cycle 3 — Residence Procedure Core
**Batch**: 2
**Status**: landed as `ai_extracted`; no production injection
**Test**: `npx tsx scripts/test/test-p0-cycle3-batch2-dry-run-fixtures.ts` — 56/56 passed

---

## Scope

Batch 2 covers two high-frequency procedure families:

- 在留資格取得: Japan-born children, nationality loss, 60-day stay trigger, 30-day application window, COE/change/renewal disambiguation.
- 資格外活動許可: procedure scope, Table 2 exclusion, permission-before-work, blanket vs individual permission, 28-hour router, prohibited activities, and business-scale routing.

---

## Official Sources Used

| ID | Source | URL | Use |
|---|---|---|---|
| C3-F6 | 在留資格取得許可申請 | https://www.moj.go.jp/isa/applications/procedures/16-10.html | birth/nationality-loss scope, 60-day trigger, 30-day application window, nationality note |
| C3-F7 | 資格外活動許可申請 | https://www.moj.go.jp/isa/applications/procedures/16-8.html | procedure entry and application framework |
| C3-F8 | 資格外活動許可について | https://www.moj.go.jp/isa/applications/procedures/nyuukokukanri07_00045.html | general principles, Table 2 exclusion, blanket/individual permission, prohibited activities |
| C3-F8b | 資格外活動の許可（入管法第19条） | https://www.moj.go.jp/isa/applications/procedures/shikakugai_00001.html | advance permission, blanket permission notation |
| C3-F9 | 「留学」の在留資格に係る資格外活動許可について | https://www.moj.go.jp/isa/applications/procedures/nyuukokukanri07_00003.html | Student 28-hour router, individual permission, business-scale router |
| C3-F10 | 「家族滞在」の在留資格に係る資格外活動許可について | https://www.moj.go.jp/isa/applications/procedures/nyuukokukanri07_00004.html | Dependent 28-hour router, individual permission, business-scale router |

---

## Cards Landed

| Candidate | Fact ID | Role |
|---|---|---|
| C3-017 | `status-acquisition-birth-nationality-loss-scope` | status acquisition scope |
| C3-018 | `status-acquisition-over-60-days-trigger` | 60-day stay trigger |
| C3-019 | `status-acquisition-30-day-application-window` | 30-day application window |
| C3-020 | `status-acquisition-japan-birth-foreign-parents-nationality` | Japan birth does not auto-grant Japanese nationality when both parents are foreign nationals |
| C3-021 | `status-acquisition-not-coe-change-renewal` | status acquisition vs COE/change/renewal |
| C3-022 | `qualification-outside-activity-procedure-scope` | procedure scope |
| C3-023 | `qualification-outside-activity-table2-not-target` | Table 2 status boundary |
| C3-024 | `qualification-outside-activity-permission-before-work` | advance permission guardrail |
| C3-025 | `qualification-outside-activity-comprehensive-permission-boundary` | blanket permission is not universal |
| C3-026 | `qualification-outside-activity-individual-permission-router` | individual permission router |
| C3-027 | `qualification-outside-activity-current-status-not-impeded` | current-status activity must not be impeded |
| C3-028 | `qualification-outside-activity-prohibited-activities-exclusion` | illegal/adult-entertainment activity exclusion |
| C3-029 | `student-dependent-qoa-28-hour-router` | Student/Dependent 28-hour blanket-permission router |
| C3-030A | `qoa-business-scale-change-to-business-manager-router` | corporation/employee/office signals route to Business Manager change |

All cards are `state: ai_extracted` and have empty injection blocks.

---

## Held / Not Landed

Original C3-030 from FACT:

```text
student-post-graduation-withdrawal-activity-basis-router
```

Decision: hold / needs DOMAIN.

Reason: graduation, withdrawal, and post-student activity basis need careful status-specific routing. Do not let this become a broad “留学签没过期就能继续打工” or “毕业后一定不能打工” card.

---

## AQL Gate

AQL emphasized three red lines:

1. Japan birth does not automatically grant Japanese nationality or the same status as the parents.
2. Qualification-outside-activity application pending does not authorize work before permission.
3. 28 hours is not universal permission for every employer, industry, or business model.

Additional hold points:

- late status-acquisition application after 30 days;
- child status when parent status differs or family relationship is complex;
- paid internship, platform work, freelancing, and time tracking;
- adult-entertainment / prohibited activity classification;
- business-scale activity under Student/Dependent and Business Manager change boundary;
- qualification-outside-activity permission validity vs underlying residence status validity.

---

## QA Gate

Implemented:

- all 14 cards must exist and remain `ai_extracted`;
- all 14 cards must have empty injection blocks;
- 19 dry-run positive questions cover status acquisition, nationality boundary, permission-before-work, blanket/individual permission, Table 2, 28-hour, prohibited activities, and business-scale routing;
- 7 broad false-positive negatives protect `取得`, `出生`, `宝宝`, `COE`, `工作`, `28`, `开公司`;
- 8 production regressions keep Batch 2 out of production-state prediction;
- leakage checks include internal abbreviations such as `qoa`, `status-acquisition`, and engineering state words.

---

## Verification

Batch-specific:

```text
npx tsx scripts/test/test-p0-cycle3-batch2-dry-run-fixtures.ts
=> Cycle 3 Batch 2 dry-run fixtures: 56/56 checks passed
```

Sync:

```text
npx tsx scripts/fact-layer-sync.ts --dry-run
=> scanned=209 upserted=0 errors=0
```

---

## Promotion Status

Do not promote yet.

Required before promotion:

- DOMAIN review of 30-day/60-day wording and late cases;
- DOMAIN review of Student/Dependent business-scale language;
- duplicate/rewrite decision against existing cards:
  - `qualification-outside-activity-permission-framework`
  - `permission-scope-not-universal`
  - `student-work-restriction-router`
  - `dependent-work-restriction-router`
  - `ryugakusei-baito-28jikan`
  - `long-vacation-work-limit`
  - `prohibited-work-categories`
  - `shikakugai-fukugyou`
- A/B answer run on newborn/status-acquisition and qualification-outside-activity questions.
