# P1 Cycle 1 Batch 2 Report

**Date**: 2026-05-12
**Scope**: 特定活動46号 / 卒業後就職活動 / 内定後採用待機 / 卒業後起業活動
**Cards added**: 18
**State**: all `ai_extracted`

---

## Added Cards

| Fact ID | Role |
|---|---|
| `designated-activities-46-notice-source-anchor` | 46号 and別表十一 source anchor |
| `designated-activities-46-education-scope` | education scope |
| `designated-activities-46-foreign-university-exclusion` | foreign university exclusion |
| `designated-activities-46-japanese-ability-n1-bjt480` | Japanese ability requirement |
| `designated-activities-46-communication-work-boundary` | active communication requirement |
| `designated-activities-46-learning-outcome-work-boundary` | learning-outcome / higher-level work boundary |
| `designated-activities-46-gijinkoku-service-manufacturing-boundary` | difference from 技人国 for service/manufacturing |
| `designated-activities-46-prohibited-activities` | prohibited activities |
| `designated-activities-46-designated-institution-job-change` |指定書 and job-change status-change requirement |
| `designated-activities-46-full-time-no-parttime-dispatch` | full-time, no part-time, no dispatch |
| `designated-activities-46-equal-remuneration` | equal remuneration |
| `designated-activities-46-family-spouse-child-route` | spouse/child route |
| `graduate-job-search-first-year-six-month-renew-once` | first-year job-hunting stay |
| `graduate-job-search-second-year-local-government-support` | second-year local-government support route |
| `graduate-job-search-japanese-language-school-overseas-grad` | overseas graduate + Japanese language school route |
| `graduate-job-search-qoa-28hour-internship` | job-hunting QOA / internship |
| `job-offer-waiting-requirements` | job-offer waiting route requirements |
| `graduate-startup-activity-two-route-router` | graduate startup activity two-route router |

---

## Source Notes

- 46号 cards use the ISA guideline page and official PDFs, not the old missing `tokutei46.html` URL found in an older card.
- The cards intentionally do not replace the existing production card `tokutei-katsudo-46go`.
- The cards are source-layer atoms and stay out of production injection.

---

## DOMAIN Queue

| Topic | Reason |
|---|---|
| 46号 activity fit | "日本語を用いた円滑な意思疎通" and "学修成果等を活用" require professional boundary review |
| 46号 job change | practical timing and whether work can start before permission need review |
| 認定専修学校専門課程 | current MEXT list and transition handling need source normalization |
| job-hunting QOA | 28-hour and internship exceptions need careful answer wording |
| graduate startup | distinction from startup visa and 経営・管理 must be kept crisp |

