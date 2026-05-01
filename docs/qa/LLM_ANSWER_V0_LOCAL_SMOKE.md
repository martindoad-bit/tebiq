# LLM Answer Engine v0 — local smoke (LLM disabled)

Captured: 2026-05-02 from worktree `sleepy-archimedes-12177a`.

Command:

```bash
ANSWER_GENERATION_DISABLE_AI=1 ANSWER_INTENT_DISABLE_AI=1 \
  npx tsx scripts/test/test-llm-answer-engine.ts
```

Environment:

- No AWS Bedrock credentials in this worktree.
- Both `ANSWER_GENERATION_DISABLE_AI=1` and `ANSWER_INTENT_DISABLE_AI=1` set, so generator and intent LLM both short-circuit.
- This forces every case onto the **fallback path** — exercising the "LLM unavailable / failed → legacy-fallback envelope" contract.
- Live LLM (`engine_version: 'llm-answer-v0'`) is NOT exercised here. That requires Vercel production env (Bedrock keys present) and human smoke per the founder-test list in `LLM_ANSWER_ENGINE_V0_REPORT.md`.

## Raw output

```
PASS     P0-mgr-to-humanities               mode=direct_answer            engine=legacy-fallback
PASS     P0-humanities-to-mgr               mode=clarification_needed     engine=legacy-fallback
PASS     P0-family-stay-to-work             mode=direct_answer            engine=legacy-fallback
PASS     P0-family-stay-work-permission     mode=answer_with_assumptions  engine=legacy-fallback
PASS     P0-spouse-divorce-to-teiju         mode=direct_answer            engine=legacy-fallback
PASS     P0-mgr-renewal-materials           mode=answer_with_assumptions  engine=legacy-fallback
PASS     P0-permanent-resident-pension      mode=clarification_needed     engine=legacy-fallback
PASS     P0-immigration-deadline            mode=clarification_needed     engine=legacy-fallback
PASS     P0-denial-notice                   mode=clarification_needed     engine=legacy-fallback
PASS     P0-representative-change           mode=clarification_needed     engine=legacy-fallback
PASS     P1-tokutei-change-employer         mode=out_of_scope             engine=out-of-scope-v0
PASS     P1-mgr-capital-shortage            mode=clarification_needed     engine=legacy-fallback
PASS     P1-pure-tax                        mode=out_of_scope             engine=out-of-scope-v0
PASS     P1-restaurant                      mode=out_of_scope             engine=out-of-scope-v0
PASS     P1-permanent-tax-record            mode=clarification_needed     engine=legacy-fallback
PASS     P1-mgr-office                      mode=clarification_needed     engine=legacy-fallback
PASS     P1-family-stay-school              mode=direct_answer            engine=legacy-fallback
PASS     P1-teijusha-extension              mode=clarification_needed     engine=legacy-fallback
PASS     P1-jinbun-jobchange                mode=clarification_needed     engine=legacy-fallback
PASS     P1-permanent-criminal              mode=clarification_needed     engine=legacy-fallback

Result: 20/20 pass; P0 failures: 0
```

## What this proves / does not prove

- ✅ Every case returns a renderable envelope. No 500s, no thrown exceptions.
- ✅ All 10 P0 redlines stay clean even when the LLM is unavailable — the deterministic legacy + scope path alone produces an envelope that doesn't reverse direction or collapse 在留資格変更 into 资格外活动.
- ✅ Out-of-scope detection fires on `特定技能换会社`, `日本年终如何报税最划算`, `在新宿开个中餐厅怎么选址`.
- ❌ Does NOT verify LLM-side prompt quality, JSON parsing under real model output, or assumptions/key_missing_info quality. Those need live Vercel-side smoke.
- ❌ Does NOT verify the seed file at `content/answer-seeds/llm-answer-v0-seeds.json` is loaded by the generator — it currently is **not**.

## To run live LLM smoke (after merge to main + deploy)

1. Make sure Vercel env has `AWS_ACCESS_KEY_ID`, `AWS_SECRET_ACCESS_KEY`, `AWS_REGION`, and `ANSWER_GENERATION_DISABLE_AI` is unset (or `0`).
2. `curl -s https://<production-host>/api/build-info` — version field must be `llm-answer-engine-v0`.
3. POST each of the 10 founder-test questions to `/api/questions` (see `LLM_ANSWER_ENGINE_V0_REPORT.md` § "创始人应该手动测哪 10 条"). The response's `engine_version` must be `llm-answer-v0` for in-scope cases. If it shows `legacy-fallback`, the LLM call failed and you need to inspect Vercel logs for `[answer/llm-generator]` entries.
