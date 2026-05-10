# Calibration V1

date: 2026-05-10
status: BLOCKED

## Summary

- founder calibration rows: 12
- judge output rows: 88
- comparable calibration rows: 0
- missing judge rows for calibration: 12
- score agreement (within ±1): N/A
- vs DeepSeek agreement: N/A

## Blocker

The current judge output CSV contains only the 88 unannotated cases. It does not include the 12 founder calibration cases, so founder-vs-judge consistency cannot be measured yet.

| missing case_id | founder score | founder vs DeepSeek | question |
|---|---:|---|---|
| eval-lab-v1-A01 | 3 | tied | 经营管理签怎么转技术・人文知识・国际业务？ |
| eval-lab-v1-A02 | 3 | strict_added | 技人国签证怎么转经营管理？ |
| eval-lab-v1-A03 | 3 | tied | 我是经管签，想转人文签，应该怎么准备？ |
| eval-lab-v1-A05 | 4 | tied | 家族滞在想转工作签怎么办？ |
| eval-lab-v1-A07 | 3 | strict_added | 经营管理签转高度专门职有可能吗？ |
| eval-lab-v1-A08 | 2 | regression | 人文签转定住者可以吗？ |
| eval-lab-v1-A09 | 2 | tied | 配偶签离婚后想转定住怎么办？ |
| eval-lab-v1-A10 | 1 | regression | 定住者想转永住，应该注意什么？ |
| eval-lab-v1-B01 | 3 | strict_added | 经管签搬办公室要通知哪里？ |
| eval-lab-v1-B02 | 1 | tied | 经管签办公室搬到共享办公可以吗？ |
| eval-lab-v1-B03 | 1 | strict_added | 经管签办公室搬到自宅办公可以吗？ |
| eval-lab-v1-B04 | 2 | strict_added | 经管签更新材料有哪些？ |

## Next Step

Run the same Claude Sonnet judge on the 12 founder calibration cases and append/merge those rows into `docs/qa/golden_set/v1_judge_output.csv`, then rerun this report.

