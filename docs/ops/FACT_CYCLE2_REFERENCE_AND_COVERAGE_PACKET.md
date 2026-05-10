# FACT Cycle 2 Work Packet — Reference Sources + Coverage Gaps

**Issued:** 2026-05-11  
**Owner:** FACT window  
**Requester:** Codex / AI Engineering Lead  
**Status:** ready for FACT intake

## Purpose

TEBIQ is turning fact cards into a visible product feature: the user can see which prepared references informed an answer. The goal is not to show more citations. The goal is to make answers more transparent without making them look like final legal opinions.

FACT should continue doing what it is good at: source-backed fact-card production and maintenance. Do not write UI copy, answer prompts, AQL scoring, or DOMAIN verdicts.

## Read First

1. `CLAUDE.md`
2. `docs/fact-cards/README.md`
3. `docs/fact-cards/FACT_OPS_WINDOW_TASK_PACK.md`
4. `docs/qa/AQL_PATTERN_REPORT_v1.md`
5. Existing cards in `docs/fact-cards/*.md`

## Product Context

The user-facing page now has a `参考资料` block. It is powered by fact-card matches persisted on `ai_consultations.fact_card_audit`.

This means fact cards now have two jobs:

1. Improve the generated answer through injection.
2. Support a user-facing reference block that explains what prepared material TEBIQ used.

Because of job 2, fact card titles, source quality, and withheld/needs-review boundaries matter more than before.

## Boundaries

FACT should:

- Create or patch fact cards with official/public sources.
- Mark `risk_level`, `state`, `confidence`, `source_quality`, `needs_review_flags`, and `controlled_alpha_eligible` conservatively.
- Add clear `must_say` and `must_not_say` fields.
- Prefer `needs_review` when a card requires DOMAIN review before production injection.
- Keep batches small: 3 cards or patches per batch.

FACT should not:

- Decide answer quality patterns. That belongs to AQL.
- Decide legal/professional edge cases. Escalate to DOMAIN.
- Write final product UI copy. Codex/UI/Copy own UI.
- Promote critical cards to production injection without the established review path.

## Priority Batch 1

Produce **3 cards/patches**. Use official sources where possible. If sources are not strong enough, mark the card `needs_review`.

### 1. 技人国 / 人文知識・国際業務 — 转职、离职、契约机构届出

Why: Production answers and user tests repeatedly ask "换工作要不要向入管报告". This needs a clean card separate from generic job-mismatch guidance.

Target coverage:

- When a user changes employer, leaves an employer, or signs a new employment contract.
- Which notification concept applies, and what deadline/source says.
- What this does and does not solve: notification does not by itself validate whether the new job fits 技人国.
- Must-not-say: do not imply notification alone fixes job-content mismatch.

Likely action: create a new card, or patch `gijinkoku-job-mismatch.md` if FACT judges that safer.

### 2. 入管通知 / 追加資料 / 補完 / 説明書

Why: Users often upload or ask about letters they cannot read. TEBIQ must first help identify title, deadline, requested materials, and submission method before giving strategy.

Target coverage:

- How to treat an immigration-office notice as a document with title, deadline, required response, and submission method.
- What TEBIQ may safely say when the notice text is incomplete.
- Must-not-say: do not invent the deadline; do not treat every notice as refusal; do not say missing the deadline always has the same result.

Likely action: create a new `nyukan-notice-response.md` style card. If official sources are thin, keep `needs_review`.

### 3. 在留卡遗失 / 被盗 / 被扣押

Why: The product already handles card loss, but crisis-like variants such as employer/person retaining documents need clearer source-backed boundaries.

Target coverage:

- Lost/stolen card path: police record/consultation first, then immigration reissue path if applicable.
- Distinguish address change at city hall from residence-card reissue at immigration.
- For document retention/confiscation, separate personal safety, evidence preservation, and immigration/labor consultation. Escalate professional/legal wording to DOMAIN.
- Must-not-say: do not tell users city hall is the first window for lost residence card reissue.

Likely action: patch `zairyu-card-loss-reissue.md` and add a separate `document-retention-risk.md` only if sources support it.

## Priority Backlog

Do not start these until Batch 1 is complete or blocked.

- 年金截止日期 ambiguity: distinguish monthly payment, employer/social-insurance transition, lump-sum withdrawal, and permanent-residence record period.
- 不许可通知后的离境 / 审查请求 / 再申请 options. This must go through DOMAIN because earlier review wording over-warned.
- 技人国 side work / freelance translation / remote side work. Needs DOMAIN boundary before broad injection.
- DV / spouse separation / residence pathway crisis support. Needs DOMAIN boundary and careful source treatment.
- Social insurance after resignation / company closure: health insurance, pension, and record continuity.

## Suggested User-Facing Metadata

If FACT can add these fields to markdown frontmatter now, do so. Codex will wire schema/sync later.

```yaml
citation_label: "短い用户可读标题"
citation_summary: "这张卡在回答中主要用于确认什么。1 句即可。"
source_display_names:
  - "法务省 / 入管"
applies_when:
  - "这张卡适用的典型用户情境"
does_not_cover:
  - "这张卡不应被用来推出的结论"
```

These fields are for future `参考资料` display. They do not replace existing `must_say`, `must_not_say`, `injection_certain_block`, or `needs_review_addendum`.

## Output

Open one PR or provide one branch containing:

- 3 cards/patches max.
- Source URLs in each card.
- Clear state/risk/confidence/source-quality decisions.
- A short note listing anything that should go to DOMAIN.

Do not run production sync unless Codex/Founder explicitly asks.
