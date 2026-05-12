# Legal Source Engineering — P1 Cycle 1 Workpack

**Date**: 2026-05-12
**Parent**: [`LEGAL_SOURCE_STRUCTURE_ENGINEERING.md`](./LEGAL_SOURCE_STRUCTURE_ENGINEERING.md)
**Previous cycle**: [`LEGAL_SOURCE_P0_CYCLE4_WORKPACK.md`](./LEGAL_SOURCE_P0_CYCLE4_WORKPACK.md)
**Scope**: 定住者告示 / 特定活動告示 / 告示型在留資格细分层
**Goal**: build the notice-layer router for high-variance status paths
**Status**: draft workpack; Batch 1 source extraction active; no production injection

---

## 1. Cycle Goal

P0 built the legal backbone for status scope, landing criteria, procedures, permanent residence, cancellation, and re-entry.

P1 Cycle 1 adds the first high-impact L3 notice layer:

```text
When the user asks about 定住者 or 特定活動,
the system must not treat the status name as one uniform rule.
It must identify the notice/source family, route to the correct subtype,
and stop before eligibility, discretion, or approval probability.
```

Primary failures to eliminate:

- saying all 特定活動 holders can work, renew, or bring family without checking the designated activity;
- treating 特定活動46号, job-hunting, startup, J-Find, digital nomad, working holiday, and SSW-transition preparation as one status;
- saying 定住者 is available just because the user is divorced, has Japanese ancestry, or has a child in Japan;
- mixing 定住者告示 paths with告示外裁量 paths;
- treating ISA material pages as eligibility conclusions;
- using early fact-card inferences as source-backed legal claims.

---

## 2. Source Registry Draft

| ID | Official Source Title | URL | Authority Layer | Legal Source Type | Latest Effective Date | P1 Scope | Access Notes |
|---|---|---|---|---|---|---|
| P1C1-S1 | 出入国管理関係法令等 | https://www.moj.go.jp/isa/policies/bill/nyukan_hourei_index.html?hl=ja | L4 ISA Legal Index | official_legal_index | checked 2026-05-12 | official index for the two notices | HTML readable with UA |
| P1C1-S2 | 定住者告示 | https://www.moj.go.jp/isa/policies/bill/nyukan_hourei_h07-01-01.html | L3 Notice | official_notice_page | recently amended 2021-10-28 on page | long-term resident notice anchor | HTML page links PDF |
| P1C1-S3 | 定住者告示 PDF | https://www.moj.go.jp/isa/content/001368764.pdf | L3 Notice | official_notice_pdf | recently amended 2021-10-28 on page | detailed notice text | PDF readable via pdfplumber, vertical text extraction is noisy |
| P1C1-S4 | 在留資格「定住者」 | https://www.moj.go.jp/isa/applications/status/longtermresident.html | L4 ISA Status Page | official_status_page | checked 2026-05-12 | user-facing status paths and links | HTML readable |
| P1C1-S5 | 配偶者等から定住者への変更事例 | https://www.moj.go.jp/isa/applications/resources/nyuukokukanri07_00057.html | L4 ISA Resource Page | official_case_resource | checked 2026-05-12 | divorce/death route recognition | PDF linked; do not infer outcomes from title alone |
| P1C1-S6 | 特定活動告示 | https://www.moj.go.jp/isa/policies/bill/nyukan_hourei_h02.html | L3 Notice | official_notice_page | recently amended 2026-04-08 on page | designated activities notice anchor | HTML page links PDF |
| P1C1-S7 | 特定活動告示 PDF | https://www.moj.go.jp/isa/content/001360125.pdf | L3 Notice | official_notice_pdf | recently amended 2026-04-08 on page | detailed notice text | PDF readable via pdfplumber, vertical text extraction is noisy |
| P1C1-S8 | 在留資格「特定活動」 | https://www.moj.go.jp/isa/applications/status/designatedactivities.html | L4 ISA Status Page | official_status_page | checked 2026-05-12 | subtype list and routing | HTML readable |

Source handling rules:

- Treat the two告示 as L3 source anchors, not as the same layer as statute or material checklists.
- Use the ISA status pages for product routing and subtype discovery.
- Do not infer eligibility from the existence of a page.
- Do not promote any card above `ai_extracted` until duplicate scan, AQL, QA, and DOMAIN review finish.

---

## 3. Batch Plan

| Batch | Target Count | Purpose |
|---|---:|---|
| Batch 1 | 15-20 cards | notice anchors and common subtype routers for 定住者 / 特定活動 |
| Batch 2 | 20-30 cards | detailed 定住者告示 paths, including日系, dependent children, adoption, and spouse-status transition cases |
| Batch 3 | 25-35 cards | detailed 特定活動 subtypes, including 46号, 17号, J-Find, startup, digital nomad, SSW transition, and job-hunting |
| Batch 4 | 15-25 cards | conflict, duplicate merge, deep-water routing, and false positive burn-down |
| Batch 5 | 10-20 cards | integration cards, A/B fixture expansion, promotion/hold queue |

Cycle 1 target: 85-130 candidate cards.

---

## 4. Batch 1 Candidate Cards

| ID | Fact ID | Claim Type | Purpose |
|---|---|---|---|
| P1C1-001 | long-term-resident-notice-source-anchor | authority_boundary | 定住者告示 is the L3 source for notice-defined long-term resident positions |
| P1C1-002 | long-term-resident-special-reason-status-scope | status_scope | ISA describes 定住者 as residence permitted after special reasons and specified period |
| P1C1-003 | long-term-resident-minor-child-age-eighteen | condition_anchor | minor unmarried child path is tied to the under-18 rule |
| P1C1-004 | long-term-resident-nikkei-third-generation-router | subtype_router | route Nikkei third-generation questions to the specific ISA page |
| P1C1-005 | long-term-resident-nikkei-spouse-router | subtype_router | route Nikkei second/third-generation spouse questions |
| P1C1-006 | long-term-resident-dependent-minor-child-router | subtype_router | route dependent minor child questions |
| P1C1-007 | long-term-resident-under-six-adopted-child-router | subtype_router | route under-six adopted child questions |
| P1C1-008 | long-term-resident-spouse-divorce-case-router | deep_water_router | recognize spouse-status-to-long-term-resident transition as case-sensitive |
| P1C1-009 | designated-activities-notice-source-anchor | authority_boundary | 特定活動告示 is the L3 source for notice-defined designated activities |
| P1C1-010 | designated-activities-isa-type-list-router | subtype_router | route "特定活動" to subtype identification |
| P1C1-011 | designated-activities-job-offer-before-start-router | subtype_router | route job offer before employment-start stay |
| P1C1-012 | designated-activities-graduate-job-hunting-router | subtype_router | route graduate job-hunting stay |
| P1C1-013 | designated-activities-graduate-startup-router | subtype_router | route graduate startup activity |
| P1C1-014 | designated-activities-j-find-router | subtype_router | route J-Find future-creation talent activity |
| P1C1-015 | designated-activities-digital-nomad-router | subtype_router | route digital nomad / family subtype |
| P1C1-016 | designated-activities-nikkei-fourth-generation-router | subtype_router | separate Nikkei fourth-generation system from 定住者 |
| P1C1-017 | designated-activities-ssw-transition-prep-router | subtype_router | route SSW transition preparation activity |

---

## 5. Batch 1 Gate

Batch 1 passes only if:

1. all new cards are `state: ai_extracted`;
2. every injection block is empty;
3. all official URLs are on the whitelist;
4. dry-run fixtures hit expected router cards;
5. broad questions about tax, ordinary renewal, divorce generally, and job search do not over-hit narrow subtype cards;
6. user-visible candidate text does not say approval is guaranteed;
7. existing P0 cycle tests and fact-layer sync still pass.

Blocking failures:

- any card says "必ず許可" or equivalent;
- any card collapses all 特定活動 types into one answer;
- any card says divorce automatically gives 定住者;
- any card treats 日系4世 as a 定住者告示 path;
- any card makes a material checklist into eligibility approval.
