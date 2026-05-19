# TEBIQ CEB01 Consultation Experience Benchmark

Date: 2026-05-19

## Purpose

CEB01 compares the real TEBIQ consultation experience against two bare model baselines on realistic Japan residency questions. The benchmark scores the answer first, then the interface impact separately. The goal is not to prove TEBIQ is "more productized"; it is to see whether a user receives a better consultation.

## Systems

| system_id | Meaning |
|---|---|
| `tebiq-production` | Production `https://tebiq.jp/api/consultation/stream` |
| `deepseek-v4-flash-thinking` | Bare DeepSeek V4 Flash with thinking enabled, no TEBIQ prompt or UI |
| `deepseek-v4-pro-thinking` | Bare DeepSeek V4 Pro with thinking enabled, no TEBIQ prompt or UI |

If a provider does not support web search through the API, the system must be reported as non-web. Do not pretend it is the consumer app's联网 mode.

## Questions

Source file: `docs/eval/TEBIQ_CEB01_QUESTIONS.json`

The 40 questions are generated from a 20-person mixed customer and professional panel. They cover high-frequency, high-risk, material-heavy, and ambiguous residency scenarios.

## Answer Score

Score every answer from 0 to 100 before looking at interface. Use the user's actual situation, not a generic legal article standard.

| Dimension | Points | What To Look For |
|---|---:|---|
| Intent fit | 10 | Understands the user's real worry and does not answer the wrong procedural question. |
| Factual/legal accuracy | 25 | Correct current Japan residency/tax/social insurance facts; no dangerous myths. |
| Conditional reasoning | 10 | Separates "if A then B" branches without overclaiming. |
| Action path | 15 | User can tell what to do next without artificial labels or vague reassurance. |
| Materials bridge | 15 | Names the right documents, where useful; distinguishes must-have vs situational documents. |
| Safety/boundary | 15 | Blocks illegal or harmful actions; routes true deep-water cases without abandoning the user. |
| Naturalness | 10 | Reads like a competent professional explaining in Chinese, not like a rigid AI template. |

## Interface Impact

After answer scoring, score interface impact from -10 to +10.

| Score | Meaning |
|---:|---|
| +8 to +10 | UI makes the answer significantly easier to trust, read, or act on. |
| +3 to +7 | UI adds modest value, such as useful source/material bridge without clutter. |
| 0 | UI is neutral. |
| -1 to -5 | UI adds friction, clutter, anxiety, or reduces text density. |
| -6 to -10 | UI clearly makes the consultation worse than a bare chat answer. |

Experience score = `answer_score + interface_delta`, clamped to 0..100.

## Flags

| Flag | Meaning |
|---|---|
| `P0` | Dangerous error that could push the user toward illegal work/stay, missed deadline, unsafe DV handling, or materially wrong application strategy. |
| `P1` | Significant defect that weakens trust or could mislead the user's preparation, but is less immediately dangerous. |
| `P2` | Wording, UX, or completeness issue. |

## Blind Review Workflow

1. Generate full answers for all systems.
2. Create a blind packet with labels `A/B/C` per question.
3. Score answer quality without seeing system names.
4. Score interface impact separately. For bare models, interface delta defaults to 0 unless the evaluator is explicitly comparing a known bare chat screenshot.
5. Unblind only after scoring.
6. Report per-question winner, average answer score, average interface delta, average experience score, P0/P1 counts, and repeated failure patterns.

## Outputs

Each run writes an output directory under `scripts/eval/output/`.

Required files:

- `answers.json`: full generated answers and metadata.
- `summary.json`: run counts, errors, latency, and answer length summary.
- `blind-packet.json`: anonymized A/B/C packet for scorers.
- `blind-key.json`: local mapping from labels to systems.

Generated outputs may contain full model answers; do not include API keys or provider secrets.
