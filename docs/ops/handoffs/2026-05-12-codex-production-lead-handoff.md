# TEBIQ Codex Production Lead Handoff — 2026-05-12

This handoff is for the next Codex/GM/ENGINE window. It records the current production state, recent product decisions, open risks, and the correct next work.

## 0. Start Here

Read in this order:

1. `CLAUDE.md`
2. `docs/ops/TEBIQ_ROLES_V2.md`
3. `docs/ops/TEBIQ_DELEGATION_PRINCIPLES.md`
4. `docs/product/TEBIQ_CURRENT_STATE.md`
5. `docs/ui/TEBIQ_1_0_UI_HANDOFF.md`
6. This file

Current local repo used by the outgoing Codex window:

```text
/private/tmp/tebiq-prelaunch-polish-v1
branch: codex/prelaunch-product-polish-v1
latest local/main commit: 8c87e8e feat: add scrivener lead desk
```

Production:

```text
https://tebiq.jp/ai-consultation
https://tebiq.jp/admin/scrivener-leads
https://tebiq.jp/quick-reference
```

Production was manually deployed by Vercel CLI from this worktree after commit `8c87e8e`. Because this was a manual CLI deploy, `/api/build-info` may show an empty `gitSha` even though the deployed code includes the latest commit. The observed production `builtAt` after the deploy was `2026-05-12T10:57:36.880Z`.

## 1. Product North Star

TEBIQ is not a generic AI visa chatbot. It is a Chinese-language AI consultation tool for foreigners in Japan, focused on:

- identifying immigration/residence risk,
- giving the user a clear next step,
- showing evidence/source material where possible,
- routing deep or risky cases to a scrivener/human expert.

Current user target:

- 95% ordinary foreigners in Japan.
- 5% junior/less-specialized scriveners who may use TEBIQ as a quick reference.

Current scoring target from founder:

- ordinary-user trust: 88,
- junior-scrivener usefulness: 78,
- product maturity/stability: improve by at least 3 points from the previous state.

Do not optimize by adding features. Optimize by improving trust, clarity, correctness, and product coherence.

## 2. Role Model

Current accepted split:

- Founder = Project Lead. Owns product direction, acceptance, and business judgment.
- Codex = AI Engineering Lead / Production Lead. Owns engineering implementation, orchestration, QA, deployment, and risk management.
- Claude.ai = Product/Strategy Mirror. Gives product/strategy feedback, does not write engineering instructions.
- FACT window = fact card/source production. It owns fact card content work under its own protocol.
- DOMAIN window = legal/professional boundary review.
- AQL = answer quality judge/pattern analyst.
- CODEXUI = UI/UX implementation view.
- Product Copy subagent = fixed UI/product copy only, after structure is decided.
- Real User Simulator = user-like testing, not legal evaluation.

Do not collapse DOMAIN or FACT into Codex judgment. Codex may implement and route, but should not pretend to be the professional authority on residence-law gray zones.

## 3. Recent Work Completed

### 3.1 Four-tab app direction

User-facing product now follows this mental model:

- `提问`: primary AI consultation entry.
- `我的咨询`: auto-recorded consultation history.
- `找书士`: human/scrivener conversion path.
- `速查`: quick reference/checklist area.

Important founder decision:

- Saved consultations should feel automatic. Do not make saving the main user action.
- Answer page should not become button soup.
- For answers, preserve the simple answer-summary structure:
  - `先看这里`
  - `当前判断`
  - `建议动作`
  - `暂缓事项`

This was restored in commit `4da6863` after an accidental copy drift.

### 3.2 Evidence Layer

The answer source/evidence module is a major trust asset and should be strengthened, not hidden.

Current direction:

- Sources should be visible enough to build trust.
- Source cards should be clickable and map to relevant claim-level evidence.
- Avoid the anti-trust failure: "looks authoritative, but links to a loosely related or wrong page."

FACT reported that its separate fact-card branch has reached 100 cards and refined evidence points. The outgoing Codex window has not independently merged or audited all of that work in this worktree. Treat FACT's branch/status as external until verified locally.

Known FACT-side branch from reports:

```text
feat/cycle2-batch2-coverage
PR #122
reported fact cards: 100
reported evidence_points refined: 98 cards; 2 keiei cards out of scope
```

### 3.3 Quick Reference

`/quick-reference` exists, but founder is not satisfied with the product shape yet.

Current product discussion:

- Quick Reference should probably serve "小明用户": users who already know roughly what they need and want fast, organized, authoritative material/checklist.
- It should not feel like a raw fact-card list.
- It should support fast lookup of materials, deadlines, where to go, and official sources.
- It should eventually bridge both ways:
  - quick reference -> ask AI if case-specific,
  - AI answer -> quick reference checklist if a relevant checklist exists.

Current problem:

- The page has repeatedly drifted into structural/product-language copy such as "适合..." and unnatural headings.
- The search/category experience is not yet good.
- The UI/copy needs a major redesign, not just micro-polish.

Founder has explicitly said to avoid overcorrecting and to discuss/think before large changes here.

### 3.4 UI Guardrails

A guardrail document should be treated as active law for future UI changes:

```text
docs/ui/TEBIQ_1_0_UI_HANDOFF.md
docs/ui/TEBIQ_1_0_UI_QA_CHECKLIST.md
```

Important lessons from recent failures:

- Do not let one page's copy changes leak into another page.
- Do not rename established answer labels casually.
- Do not expose internal structural language to users.
- Do not introduce inconsistent header alignment across pages.
- Mobile layout must be verified on iPhone-width viewports before deploy.
- The answer page, quick reference, and homepage are separate surfaces with separate copy rules.

## 4. New Scrivener Lead Desk

A new P0 internal page was added and deployed:

```text
https://tebiq.jp/admin/scrivener-leads
```

Commit:

```text
8c87e8e feat: add scrivener lead desk
```

Files:

```text
app/admin/scrivener-leads/page.tsx
app/admin/scrivener-leads/AutoRefresh.tsx
app/admin/scrivener-leads/CopyButton.tsx
app/admin/_components/AdminNav.tsx
```

Data sources:

1. `consultations` table:
   - direct scrivener/appointment form submissions,
   - fields include name/phone/email/line/content/status/created_at.

2. `ai_consultations` table:
   - feedback/intention pool,
   - rows where:
     - `human_confirm_clicked = true`,
     - or `feedback_type = 'human_review'`,
     - or `feedback_type = 'inaccurate'`,
     - or `completion_status IN ('failed', 'timeout')`.

Current behavior:

- page auto-refreshes every 20 seconds,
- shows metrics for new bookings, recent bookings, human-review clicks, and abnormal/inaccurate rows,
- opens linked `/c/[id]` consultation records,
- copies contact details and consultation links.

Important risk:

- Admin access currently relies on `ADMIN_KEY` being configured. If production `ADMIN_KEY` is not set, admin pages are reachable without a key. This is a P0/P1 security risk because `scrivener-leads` can display contact information. Next window should confirm Vercel env and lock this down immediately.

## 5. Deep-Water / Practical-Operation Gray Zones

Recent founder example:

> 日配离婚再婚，签证是更新还是变更？

This exposed a deep issue:

- TEBIQ may confuse procedure/form name, residence-status name, review substance, and window colloquial language.
- Example: a case may use a "renewal" form in practice while the review substance is closer to proving a new eligibility foundation.

Working product concept:

- Do not try to "fully answer" deep-water practice zones at first.
- First goal is to identify and flag them:
  - "this is a law/procedure vs practical-operation gray zone",
  - "do not rely only on a generic AI answer",
  - "confirm with immigration counter or scrivener."

This may become a major moat, but do not implement blindly before the founder + scrivener meeting.

Meeting context:

- Founder planned a meeting with a scrivener around 2026-05-12 17:00 JST.
- Before that meeting, engineering should avoid hard-coding scrivener practice rules as facts.

## 6. Open P0/P1 Items

### P0/P1: Admin/Lead Privacy

Confirm production `ADMIN_KEY` is set and that `/admin/scrivener-leads` is not publicly accessible without the key. If not set, either set Vercel env or add stricter route protection.

### P0/P1: Mobile Alignment Regression

Founder saw multiple pages drifting left/right on iPhone 13 Pro / WeChat browser. The header/layout alignment rule must be stabilized:

- Home, answer, my consultations, and quick reference should use the same mobile shell constraints unless intentionally different.
- Do not center some page titles and left-align others without a product reason.

### P1: Quick Reference Product Shape

Quick Reference needs a product redesign around:

- clear "小明用户" utility,
- fast lookup by real-life task/material,
- user-readable checklist content,
- official/evidence sources,
- bridge to AI question when case-specific.

Do not continue patching random labels before deciding the shape.

### P1: Answer Copy Regression Risk

Preserve existing answer summary labels unless founder explicitly approves:

- `先看这里`
- `当前判断`
- `建议动作`
- `暂缓事项`

The founder reacted strongly when this was changed to labels like "先看方向". Do not repeat.

### P1: Source/Evidence Accuracy

Sources must match the claim. A source card that opens a broadly related but non-target page damages trust more than showing no source.

## 7. Recommended Next Window Startup

First actions:

1. Verify production:

```bash
git fetch origin
git log origin/main --oneline -5
curl -s https://tebiq.jp/api/build-info
curl -I -s https://tebiq.jp/admin/scrivener-leads | head
curl -I -s https://tebiq.jp/ai-consultation | head
```

2. Check admin protection:

```bash
curl -I -s https://tebiq.jp/admin/scrivener-leads | head
```

If it returns `200` without a key and production is supposed to be protected, escalate or patch immediately.

3. Read latest local status:

```bash
git status --short
git branch --show-current
git log --oneline -8
```

4. Do not start a big UI refactor until founder confirms whether next work is:

- lead-desk hardening,
- Quick Reference redesign,
- deep-water gray-zone system,
- or mobile shell cleanup.

## 8. Files Changed Most Recently

Recent commits on `codex/prelaunch-product-polish-v1`:

```text
8c87e8e feat: add scrivener lead desk
4da6863 fix: restore answer summary labels
0cff980 fix: remove first-look scaffold copy
c77a775 fix: remove structural copy from launch surfaces
9fadffc feat: surface quick reference links in saved consultations
78ca25d feat: connect quick reference evidence flow
35bc797 fix: add ui guardrails and mobile shell fixes
6e601d6 fix: simplify consultation homepage copy
```

## 9. Communication Notes

Founder's current mode:

- Wants fewer tiny interruptions.
- Expects Codex to think and implement, but not invent copy/UX principles casually.
- Strongly dislikes internal/structural language leaking to user-facing UI.
- Wants page-specific stability: fixing Quick Reference must not mutate answer page copy.
- Is preparing to shift to a new window; new Codex should read this handoff and continue without asking for broad background again.

When in doubt:

- Preserve known-good user-facing copy.
- Make small, reversible, surface-specific changes.
- Verify mobile screenshots.
- Escalate only product-direction or professional-boundary decisions.
