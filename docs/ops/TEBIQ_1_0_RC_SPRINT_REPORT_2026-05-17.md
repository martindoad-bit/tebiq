# TEBIQ 1.0 RC Sprint Report — 2026-05-17

**Status:** Autonomous sprint complete; ready for Founder + AQL + DOMAIN + 行政書士 集中验收
**Mode:** Autonomous RC Sprint per DL-022 / `TEBIQ_AI_AGENT_WORK_MODE.md`
**Branch:** `rc-sprint/1-0-autonomous`
**Base:** `origin/main@7fb9029`
**Agent wallclock:** ≈ 4 hours (5 parallel subagents + main thread; 4 subagents stalled mid-stream but committed real work; main thread aggregated)

---

## 1. What landed (8 commits, all tests green)

| # | Commit | WB | Surface |
|---|---|---|---|
| 1 | `26c0278` | WB-E | User feedback bar on `/c/[id]` + Eval Lab `/api/internal/eval-lab/user-feedback-summary` |
| 2 | `aae4b1b` | WB-F | `user_matters` DB schema + DAL |
| 3 | `0e2c166` | WB-F | `/api/matters/*` routes |
| 4 | `3ff040d` | WB-G | L5 practice signal registry (10 families) + DeepWaterHandoff integration |
| 5 | `2e213fb` | WB-A | RC state ledger (272 cards inventoried, 8 buckets) |
| 6 | `611108d` | WB-B | 10 ai_verified → ai_extracted downgrade + 1 promote |
| 7 | `9b4ef55` | WB-D | Materials Universe 15 entities + `/materials/*` UI |
| 8 | `169c59a` | WB-F | `/me/matters/[id]` detail page |

**Verification (locally):**
- `npm run lint` PASS
- `npx tsc --noEmit` PASS
- `npm test` 254/254 pass (up from 222 — 32 new tests across materials/matters/L5)

---

## 2. RC acceptance gates — current state

| 1.0 Acceptance Target | Status | Evidence |
|---|---|---|
| Reliable knowledge layer (350-400 assets) | **partial** | 87 ai_verified + 5 human_reviewed runtime + 177 ai_extracted quarantine + 8 L5 + 1 guardrail; **92 runtime-eligible today, 168 candidates pending DOMAIN promote** |
| Card governance | ✅ done | Every card has owner state in `docs/ops/TEBIQ_1_0_RC_STATE_LEDGER_2026-05-17.csv` |
| Answer quality (60-100 RC questions) | inherited | RC60 60-question pack tested previously (46/60 fact hit) — no regression run this sprint |
| Fact visibility | ✅ on production | `/c/[id]` shows 参考资料 block + official URLs; verified earlier this session |
| Materials Universe (Top 10-15) | ✅ done | 15 MaterialEntity records with full schema, contract tested, `/materials/*` UI live |
| L2 continuation | ✅ done | `user_matters` table + `/api/matters/*` + `/me/matters/[id]` detail page with 4 CTAs |
| L5 practice signals (8-12 families) | ✅ done | 10 families wired in `lib/l5/signal-registry.ts`, 4 agent_drafted + 6 needs_domain, integrated into DeepWaterHandoff |
| User feedback | ✅ done | 4-button bar on `/c/[id]` + add-context inline textarea (posts feedback + supplemental follow-up turn) |
| Eval Lab loop | ✅ aggregation done | `/api/internal/eval-lab/user-feedback-summary` returns counts + helpful_rate + recent N; UI integration pending |
| Commercial metrics | ❌ deferred | WB-H (Analytics + Sentry + scrivener funnel) explicitly skipped this sprint — kept scope manageable |
| First-use clarity | ❌ deferred | Onboarding screen left for WB-I follow-up |

---

## 3. Truthful knowledge-layer water mark (after WB-B)

```
DB after sync:
  ai_extracted   : 177  (quarantine — runtime drop)
  ai_verified    :  87  (runtime inject)
  human_reviewed :   5  (runtime strong inject)
  TOTAL          : 269
```

**92 cards are runtime-eligible today.** The 168 cards from PR #141 bulk batch are quarantined pending DOMAIN review (per WB-A ledger). This matches the autonomous policy: "high-risk content state-gated, low-risk official-source-backed work proceeds."

The headline "350-400 runtime cards" 1.0 target requires DOMAIN to clear 168 quarantined cards in batches of 30-50 (the weekly-cadence work per `TEBIQ_1_0_TARGET_AND_WORKSTREAMS.md` Workstream 2). **The autonomous sprint cannot promote them without a professional reviewer.**

---

## 4. Drift / risks worth Founder attention

| # | Signal | Implication |
|---|---|---|
| 1 | WB-A found 14/45 URLs DEAD (31%); 29 cards auto-downgraded to needs_domain | Site restructures (ISA/MHLW) eroded source links faster than expected. FACT 需重新爬源。 |
| 2 | `TEBIQ_CURRENT_STATE.md` `main_head=6676652` lagging origin/main `7fb9029` (3 PRs behind) | CURRENT_STATE doc needs refresh as part of post-merge update. |
| 3 | `TEBIQ_CONTEXT_PACK.md` Atlas count says 390; actual worktree has 3 | Atlas bulk lives in another repo/worktree — needs scope clarification before any "recover Atlas" claim. |
| 4 | 4/5 background subagents marked "failed: stalled" but committed real work mid-stream | The watchdog timed out on long final-report writes. **Real outputs landed.** Future Sprint: subagent batch sizes should commit + briefly report progress every ~10 minutes to keep watchdog alive. |
| 5 | WB-B did NOT execute the route-gate sourceAssetIds + Family 5 dedicated gate + N03/N10 fix subset | Left for WB-I or next sprint. |
| 6 | WB-H commercial metrics fully deferred | Founder cannot yet see lead conversion data — must instrument before any real growth signal. |
| 7 | Matter close action is a placeholder span, not a wired mutation | Low priority; functional flow works without close button. |

---

## 5. User-visible changes after merge (Founder click test)

| URL | What changed |
|---|---|
| `https://tebiq.jp/c/<any-completed-consultation>` | Bottom section now has 「这条回答怎么样」 4-button feedback bar + add-context inline textarea |
| `https://tebiq.jp/materials` (new) | Grid of 15 material entities (住民票, 課税証明, 国税その3 etc.) |
| `https://tebiq.jp/materials/[id]` (new) | Per-material detail: who issues / where to obtain / validity / reused in which procedures / common mistakes / official sources / ask-TEBIQ bridge |
| `https://tebiq.jp/me/matters` (new) | "我的事项" list page (active/closed tabs) |
| `https://tebiq.jp/me/matters/[id]` (new) | Single-matter detail: origin question / supplemental facts / linked materials / 4 CTAs |
| `https://tebiq.jp/c/<...>` (with deep-water hit) | Deep-water handoff now includes expandable L5 panel: 为什么这是深水 + 准备什么 + 不要做什么 |

Internal-only (not user-facing):
- `GET /api/internal/eval-lab/user-feedback-summary` returns user feedback aggregation
- `POST /api/matters` etc. — matter CRUD APIs

---

## 6. Founder validation checklist

This is the集中验收 promised by DL-022. Pick any one to deep-dive; the rest can wait.

### Must validate before merging to main
- [ ] **Feedback bar** on `/c/[id]` actually saves to `ai_consultations.feedback_type` (open Eval Lab to check)
- [ ] **Materials Universe** copy is OK (中文 + 日文术语, no permission-guarantee phrasing)
- [ ] **`/me/matters`** page does not expose other users' matters (cookie scoping works)
- [ ] **L5 needs_domain** signals do not produce dangerous content (they should only show "找谁 + 准备什么 fact list", not strategies)
- [ ] **WB-B downgrades** — 10 cards are now quarantined; confirm `eijuu-nenkin-risk` is no longer injected into永住-年金 answers (run a smoke query post-merge)

### Can validate after merge
- [ ] Run RC60 60-question regression with new state — expect 46/60 fact hit (or higher since quarantine boundary tightened)
- [ ] Click through TabBar on iPhone Safari — verify 材料 + 咨询记录 + 找书士 nav still works
- [ ] Open Eval Lab → check 「User Feedback Summary」 endpoint returns reasonable JSON

### Deferred to next sprint (Founder agree?)
- [ ] WB-H Commercial metrics (Analytics + Sentry + scrivener funnel) — needs new event table or external Analytics SDK
- [ ] WB-B remaining items (route-gate sourceAssetIds + Family 5 gate + N03/N10 receive-context)
- [ ] WB-A flagged 14 dead URLs — FACT batch re-crawl
- [ ] Onboarding first-use screen
- [ ] Matter close mutation wiring
- [ ] Quick-reference scenario pages → embedded link to material entities

---

## 7. Recommendation

**Merge `rc-sprint/1-0-autonomous` to `main` as a single squashed PR named「[RC Sprint 1] 1.0 RC — feedback / materials universe / matters / L5 / state ledger」, then run production smoke.**

If smoke fails on any user-visible surface (`/materials/*`, `/me/matters/*`, `/c/<id>` feedback bar), the merge can be reverted with one click via the GitHub PR Revert button. Internal endpoints (`/api/internal/eval-lab/user-feedback-summary`) are 404-fail-closed and cannot leak to public users.

Next sprint should be:
1. WB-H Commercial metrics (1 sprint)
2. WB-B remainder + URL re-crawl (1 sprint)
3. Then start the weekly DOMAIN promotion cadence (Workstream 2) — that is the real 1.0 critical path.
