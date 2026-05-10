# TEBIQ Reference + Product Surface Cycle Report

**Date:** 2026-05-11  
**Owner:** Codex / AI Engineering Lead  
**Scope:** answer surface language, action hierarchy, confirmation wording, fact-card reference display, FACT next work packet  
**Status:** implemented locally; ready for deploy after commit

## What Changed

1. `参考资料` is now treated as a user-facing product feature, not an internal fact-layer trace.
   - New consultations persist fact-card `title` in `fact_card_audit`.
   - Live answers and follow-up answers can show compact `参考资料`.
   - Saved detail pages reuse the same reference component.
   - Old rows without title fall back safely to `TEBIQ 知识资料`.

2. Top answer labels were softened.
   - Old: `结论 / 今天先做 / 暂时不要`
   - New: `当前判断 / 建议动作 / 暂缓事项`
   - Prompt version bumped to `consultation_alpha_v17`.

3. Action hierarchy was reduced.
   - The first action strip now emphasizes `继续问` and `保存`.
   - `复制链接` and `确认方式` moved to lower visual weight.
   - Save/copy buttons now use shorter labels to reduce mobile wrapping.

4. “人工确认” promise risk was reduced.
   - User-facing labels now use `需确认` / `确认方式`.
   - Clicking the confirmation-related action explains that it is not an active human intake.

5. FACT received a new work packet:
   - `docs/ops/FACT_CYCLE2_REFERENCE_AND_COVERAGE_PACKET.md`

## Product Feedback Absorbed

### Product Expert Panel

10 simulated PM/expert perspectives agreed on four themes:

- Keep structured summaries, but reduce final-judgment feel.
- Do not use “人工确认” unless there is a real intake/service workflow.
- Make action buttons hierarchical; not every action should look equally important.
- Reference cards should show transparency, not imply legal proof or official endorsement.

### Real User Simulator

30 simulated users rated the current product experience around **8.0 / 10** on production before this cycle. The strongest repeated positives were:

- low-friction homepage;
- practical answer style;
- save/follow-up usefulness;
- photo/material entry;
- strong handling of crisis-like scenarios.

The strongest repeated pain points were:

- slow waits feel worse in crisis cases;
- high-risk and light admin cases sometimes look too similar;
- answers can still feel long on mobile;
- “ask a professional” needs a copyable summary;
- references need clearer meaning and source confidence.

## Codex Product Judgement

Before this cycle, the user-facing answer surface felt roughly **78 / 100**: useful and credible, but too much like many features stacked together.

After this cycle, I would score the same surface around **84 / 100**:

- Better: answer summary language, action hierarchy, confirmation boundary, reference transparency.
- Still weak: answer length, slow waiting, high-risk visual differentiation, source/fact-card coverage depth.

I do **not** think another purely UI/copy pass can reliably add +10 points. The next larger gain likely comes from:

1. FACT coverage and richer user-facing reference metadata.
2. High-risk answer actionization: copyable “take this to the window/professional” summary.
3. Shorter answer modes for low-risk cases.
4. Faster visible first useful output during long generation.

## QA

Passed:

- `npm test`
- `npm run lint -- --max-warnings=0`
- `npx tsc --noEmit`
- `npm run build`
- `npx tsx scripts/test/test-fact-injection.ts`
- `npx tsx scripts/test/test-fact-injection-smoke.ts`
- `npx tsx scripts/test/test-consultation.ts`
- `npx tsx scripts/test/test-followup.ts`
- `npx tsx scripts/test/test-learning-console.ts`

Known limitation:

- Local DeepSeek generation returned 503 in this environment, so live answer generation should be verified after production deploy.
