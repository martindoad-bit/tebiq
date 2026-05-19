# TEBIQ Web10 Context Benchmark

Date: 2026-05-19  
Scope: 10 user-style questions x 3 answer systems  
Output JSON: `scripts/eval/output/tebiq-web10-20260519-context/answers.json`  
Summary JSON: `scripts/eval/output/tebiq-web10-20260519-context/summary.json`

## What Changed Before This Run

The TEBIQ consultation prompt was simplified from a product-shell prompt into a lighter native-consultation prompt:

- Removed fixed UI-answer framing requirements.
- Kept only: answer naturally in Chinese, use provided sources, do not fabricate law or source, block dangerous actions, and avoid anxiety-inflating boilerplate.
- Prompt version changed to `consultation_alpha_native_v2`.

## Important Test Caveat

This run is **web-context injected**, not the consumer DeepSeek app's live browsing mode.

The API test harness supplied the same curated web context to all three systems: official ISA/MOJ/NTA pages plus selected practice-oriented scrivener pages where official law alone is known to be insufficient. This makes the comparison fair and reproducible, but it is not identical to DeepSeek's consumer "联网/专家模式" UI.

## Systems

| System | Base | Web context | Notes |
|---|---|---|---|
| `tebiq-native-v2-web-context` | DeepSeek V4 Flash thinking | injected | TEBIQ light prompt + same web context |
| `deepseek-v4-flash-thinking-web-context` | DeepSeek V4 Flash thinking | injected | Bare model, minimal expert instruction |
| `deepseek-v4-pro-thinking-web-context` | DeepSeek V4 Pro thinking | injected | Bare model, minimal expert instruction |

## Timing Summary

| System | Completed | Avg latency | Avg answer chars |
|---|---:|---:|---:|
| Flash bare + web context | 10/10 | **13.24s** | 821 |
| TEBIQ native v2 + web context | 10/10 | **16.93s** | 1000 |
| Pro bare + web context | 10/10 | **46.45s** | 980 |

Main timing observation: Pro was about 3.5x slower than Flash in this run. TEBIQ native v2 was only ~3.7s slower than bare Flash on average, so the light prompt is no longer the main latency problem.

## Per-Question Latency

| Q | TEBIQ | Flash bare | Pro bare |
|---|---:|---:|---:|
| WEB10-Q001 日配离婚再婚 | 16.47s | 10.84s | 28.71s |
| WEB10-Q002 永住者配偶打工 | 10.63s | 6.32s | 22.52s |
| WEB10-Q003 高才积分下降 | 15.28s | 13.40s | 65.02s |
| WEB10-Q004 家族滞在扶养人换公司 | 17.38s | 16.63s | 34.64s |
| WEB10-Q005 技人国转业务委托 | 21.78s | 16.67s | 68.85s |
| WEB10-Q006 特定技能被压榨想换公司 | 18.96s | 17.18s | 41.60s |
| WEB10-Q007 永住/高才源泉票写错 | 18.88s | 7.58s | 49.41s |
| WEB10-Q008 日配更新税证明是谁的 | 15.12s | 15.79s | 62.35s |
| WEB10-Q009 家族滞在资格外活动 | 14.53s | 6.43s | 31.37s |
| WEB10-Q010 特定技能转职材料 | 20.29s | 21.57s | 60.02s |

## Quick Expert Scoring

Scale: 100 = accurate, natural, safe, practically useful. This is a fast expert-style read, not a final AQL/domain audit.

| Q | TEBIQ | Flash bare | Pro bare | Winner | Main reason |
|---|---:|---:|---:|---|---|
| Q001 日配离婚再婚 | 83 | **90** | 89 | Flash | All three corrected to "更新"; TEBIQ still added one irrelevant support-institution phrase. |
| Q002 永住者配偶打工 | 84 | **86** | **86** | Flash/Pro | All correct; bare answers are cleaner. |
| Q003 高才积分下降 | 86 | 88 | **90** | Pro | Pro explains 70-point and 300万 gates most cleanly. |
| Q004 家族滞在扶养人换公司 | 86 | 88 | **90** | Pro | Pro is concise and avoids over-materializing. |
| Q005 技人国业务委托 | **84** | 82 | 78 | TEBIQ | TEBIQ is more cautious; Pro over-confident about command/control wording. |
| Q006 特定技能想跑 | 82 | 84 | **85** | Pro | Pro frames "not running, lawful resignation" well; all need softer illegal-stay wording. |
| Q007 源泉票写错 | **88** | 86 | **88** | TEBIQ/Pro | TEBIQ gives strongest correction path. |
| Q008 日配更新税证明 | 86 | **90** | 88 | Flash | Flash provides best practical material list. |
| Q009 资格外活动未定 | **90** | **90** | 75 | TEBIQ/Flash | Pro hallucinated fee/card handling; TEBIQ and Flash cleanly answer "申请书+未定". |
| Q010 特定技能转职材料 | 75 | **80** | 70 | Flash | TEBIQ is cautious but contains procedural overreach; Pro is too certain about evaluation material. |

Average quick score:

| System | Avg quick score |
|---|---:|
| Flash bare + web context | **86.4** |
| TEBIQ native v2 + web context | **84.4** |
| Pro bare + web context | **83.9** |

## Findings

### 1. The prompt reset fixed the worst known failure

For the classic "日配离婚后再婚是更新还是变更" question, TEBIQ now answers:

> 手续名称是在留期间更新申请，但实务审查上等同于新申请/变更级别准备。

That is the direction we wanted. The old "it is change, not renewal" failure is gone in this controlled web-context run.

### 2. Bare Flash with web context is the strongest baseline right now

In this 10-question sample, Flash bare + web context was the best blend of:

- speed,
- concision,
- practical correctness,
- no product-shell residue.

This does not mean TEBIQ should be removed. It means TEBIQ should stay close to the bare model shape, adding only trusted context and material bridge, not extra answer architecture.

### 3. Pro was not worth the latency for this batch

Pro produced some excellent answers, especially Q003/Q004, but the average latency was 46.45s. It did not win enough questions to justify being the default.

Current implication: keep Flash-thinking-web as default; reserve Pro for explicit escalation only after a real route test proves lift.

### 4. TEBIQ is now close, but still slightly over-helps

The light prompt is much better, but TEBIQ still sometimes:

- adds unnecessary caution,
- introduces irrelevant professional nouns,
- turns simple questions into broader consultations,
- over-materializes when the user only asked one narrow point.

This is no longer a "wrong architecture" problem. It is a final answer-shaping problem.

### 5. Web context matters more than fact cards for these practical cases

The best answers came from having the right practical web context, especially:

- scrivener practice pages for 日配离婚再婚,
- official ISA pages for activity scope,
- NTA for source-slip correction,
- SSW support pages for special-skilled-worker procedures.

The next knowledge task should prioritize **practice-source cards** and **official+practice conflict handling**, not just more law cards.

## Immediate Product Implication

TEBIQ should move toward:

1. Default engine: Flash-thinking + web/practice context.
2. Prompt: almost bare model, with only safety/source/material discipline.
3. UI: native chat shape; no warning box/product-shell answer frame.
4. Trust layer: sources/material bridge at the end, not heavy cards at the top.

## Follow-Up Fix List

1. Remove remaining irrelevant wording in TEBIQ answer style, especially "注册支援机构" in non-SSW contexts.
2. Add a lightweight answer length governor: simple questions should stay under 600-800 Chinese chars unless the user asks for a checklist.
3. Add web-context retrieval as an actual runtime path, not only this benchmark harness.
4. Build a small "practice source whitelist" and rank it separately from official sources.
5. Run the same 10 questions through the deployed UI after prompt deployment to measure UI drag separately from answer quality.

