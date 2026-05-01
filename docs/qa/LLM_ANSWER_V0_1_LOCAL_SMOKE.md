# LLM Answer Engine v0.1 — local smoke (LLM disabled)

Captured: 2026-05-02 from worktree `sleepy-archimedes-12177a` on branch
`claude/llm-answer-v0-1-safe-fallback`.

Command:

```bash
ANSWER_GENERATION_DISABLE_AI=1 ANSWER_INTENT_DISABLE_AI=1 \
  npx tsx scripts/test/test-llm-answer-engine.ts
```

This forces every case onto the **fallback path** (no Bedrock keys
available locally) so we exercise:

1. The new deterministic safe answer for 配偶离婚 → 定住者 (matches
   `safe-fallback-v0-1`).
2. The new cross-domain seed swallow safety gate.
3. The hardened JSON parser is *not* exercised here (no LLM call).

Live LLM verification (`engine_version: 'llm-answer-v0'`) needs Vercel
production env with Bedrock keys.

## Raw output

```
PASS     P0-mgr-to-humanities               mode=direct_answer            engine=legacy-fallback
PASS     P0-humanities-to-mgr               mode=clarification_needed     engine=legacy-fallback
PASS     P0-family-stay-to-work             mode=direct_answer            engine=legacy-fallback
PASS     P0-family-stay-work-permission     mode=answer_with_assumptions  engine=legacy-fallback
PASS     P0-spouse-divorce-to-teiju         mode=answer_with_assumptions  engine=safe-fallback-v0-1
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

## What changed vs v0 local smoke

The only mode change is **Q5**:
- v0 local smoke: `mode=direct_answer engine=legacy-fallback` — the
  legacy seed swallow that surfaced as P0 in production canary was not
  caught locally because the v0 smoke redline wasn't strict enough.
- v0.1 local smoke: `mode=answer_with_assumptions engine=safe-fallback-v0-1`
  — the new deterministic safe answer kicks in. Redlines hardened to
  also forbid 経営管理 / 常勤職員 / 役員報酬 / 代表取締役 /
  資本金 / 事業計画 content (the exact 経営管理 swallow that caused
  the production rollback) and 転職 / 所属機関 framing.

## Q5 envelope (deterministic safe answer)

Direct inspection via `deterministicSafeAnswer()`:

```
intent.current_status: 配偶者
intent.target_status:  定住者
scope.domain:          long_term_resident
det matched:           true

engine_version:  safe-fallback-v0-1
answer_mode:     answer_with_assumptions
domain:          long_term_resident
llm_attempted:   false
fallback_reason: deterministic_safe_fallback
fallback_from:   llm-answer-v0

short_answer:
  配偶离婚后想转「定住者」不是届出可以解决的事，需要走「在留資格変更
  許可申請」。能不能批，看婚姻持续期间、在日年数、子女与亲权、收入
  与税金、住所与生活基础、离婚原因、是否有暴力 / 不法行为记录这些
  个案事实。TEBIQ 不能保证一定能转。

next_actions[0]:
  title:    先把离婚事实和 14 日内届出做掉
  detail:   离婚成立（戸籍記載）后 14 日内，向出入国在留管理庁提交
            「配偶者に関する届出」。可以网上、邮寄或窗口。这个届出
            是义务，做不做都不直接决定定住能否取得，但不做会被记一笔。
  urgency:  now
```

The envelope explicitly distinguishes **the legally-required 14-day
配偶者届出** (which IS mentioned, because divorcing spouse-visa holders
must do it) from **the wrong "this is a job-change 14-day report"
framing** (which is what the production P0 was). The redline test was
tightened to allow the former while still forbidding the latter.
