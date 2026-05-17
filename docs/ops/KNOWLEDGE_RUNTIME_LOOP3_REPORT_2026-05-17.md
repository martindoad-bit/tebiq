# Knowledge Runtime Expansion Goal — Loop 3 Report

Date: 2026-05-17  
Branch: `codex/knowledge-runtime-loop3`  
Scope: source-repair cards from `KNOWLEDGE_RUNTIME_LOOP3_CANDIDATES_2026-05-17.md`

## 1. Loop Goal

Loop 3 repaired the source/claim mismatch bucket left by Loop 2.

The center of gravity moved from immigration-only cards into life-friction facts that frequently appear inside actual TEBIQ questions:

- resident tax timing;
- health insurance proof;
- labor-condition documents;
- COE application / progress inquiry;
- birth, death, marriage municipal procedures;
- student pension special-payment;
- permanent residence spouse/child exception routes;
- dependent newborn status acquisition;
- dismissal notice and workers' compensation.

## 2. Result Summary

| Bucket | Count | Notes |
|---|---:|---|
| `ANSWER_RUNTIME` promoted | 16 | All promoted cards now have `state: ai_verified`, direct evidence, and `injection_certain_block`. |
| `MATERIALS_ONLY` held | 1 | `zairyu-kekkan-renew-document` remains held because the current card is too generic for answer injection. |
| `L5_ONLY` | 0 | No new L5 bindings in this loop. The selected cards are stable procedural facts, not practice-strategy signals. |
| `NEEDS_REWRITE` remaining from this selected bucket | 0 | All selected source-repair cards except the explicit materials hold were rewritten. |
| `REJECT / DISABLED` | 0 | No hard deletion in this loop. |
| `UNKNOWN` | 0 | No card was left unknown after source repair. |

Filesystem card waterline after edits:

```text
ai_verified     126
human_reviewed    5
runtime-eligible 131
ai_extracted    135
disabled          3
total           269
```

Post-merge targeted sync has been completed. Database and filesystem now match at `126 ai_verified + 5 human_reviewed`.

## 3. Promoted Cards

| fact_id | Action | Why safe now |
|---|---|---|
| `jumin-zei-jan1-criterion` | source repair + promote | Rewritten to Tokyo tax office's 1月1日 / previous-year-income resident-tax rule. Removed unsupported departure-specific management claims from injection. |
| `maina-hoken-2024-12` | rewrite + promote | Rewritten to current 2026 health-insurance operation: no new traditional card issuance, MyNa insurance card / qualification certificate framing. |
| `koyou-keiyaku-rouken-tsuchi` | rewrite + promote | Narrowed to MHLW labor-condition notice duty; visa-document use is only a caveat, not the injected claim. |
| `zairyu-nintei-shomeisho-application-method` | source repair + promote | Rewritten to ISA COE grant application method: local ISA office / online application, no postal submission, electronic COE. |
| `shussei-todoke-14days` | source repair + promote | MOJ family-register page directly supports birth notification deadline. |
| `shibo-todoke-7days` | source repair + promote | MOJ death notification source plus separate ISA residence-card return source; the two duties are not collapsed. |
| `kekkon-todoke-procedure` | source repair + promote | MOJ marriage notification and international-marriage Q&A support the municipal procedure; injection explicitly says marriage registration is not a spouse-visa permission. |
| `ryuugaku-nenkin-tokurei` | source repair + promote | Japan Pension Service supports student special payment as application-based postponement, not automatic exemption. |
| `coe-shokai-overview` | rewrite + promote | Rewritten from broad COE overview to ISA progress-inquiry rule: individual progress is generally not answered by phone; online system status can be checked. |
| `eijuu-haigusha-3years-route` | rewrite + promote | ISA PR guideline supports spouse 3-year marriage + 1-year Japan residence exception route; injection explicitly says no permission guarantee. |
| `eijuu-shotoku-haigusha-3year` | source repair + promote | ISA spouse/child PR page supports resident-tax certificate years by route: spouse 3 years, child etc. 1 year. |
| `eijuu-children-direct-route` | rewrite + promote | Removed unsafe "direct route"; rewritten as child/etc. 1-year residence exception route and no automatic permission. |
| `kazoku-taizai-zairyu-period` | rewrite + promote | Removed sponsor-period guarantee; rewritten to official period list and individual designation up to 5 years. |
| `kazoku-taizai-shussan-shutoku` | source repair + promote | ISA status acquisition page supports Japan-born child 30-day application / 60-day stay rule. |
| `kaiko-yokoku-30days` | source repair + promote | MHLW source supports 30-day dismissal notice or average wage payment; no immigration outcome inference. |
| `rousai-hoken-foreign-worker` | rewrite + promote | Rewritten to foreign-worker workers' compensation coverage; removed illegal-work frontstage assertion from injection. |

## 4. Product Effect

Loop 3 thickens the parts of TEBIQ that previously felt thin outside pure immigration law.

Answer runtime improves in four zones:

1. **市区町村手続き**: birth, death, marriage, resident tax address timing.
2. **材料解释**: MyNa insurance / qualification certificate, labor-condition notice, route-specific PR tax certificate years.
3. **申请推进**: COE application method and progress inquiry expectations.
4. **生活摩擦**: student pension special payment, dismissal notice, workers' compensation.

Materials Tab is not structurally changed in this loop. Several cards are useful for future material entity enrichment, but no new Materials entity binding was added because this loop's safe action was answer-runtime injection, not UI reorganization.

## 5. Verification Before Merge

Local verification:

```text
npm run fact-layer:sync:dry       -> scanned=269 errors=0
npm run qa:card-import-audit      -> filesystem 126 ai_verified + 5 human_reviewed
npm test                          -> 257/257 pass
npm run lint                      -> pass
npx tsc --noEmit --pretty false   -> pass
```

An early `npm run qa:pre-report-audit` was intentionally not counted because it failed the git-status-clean step while these edits were still uncommitted. This is expected behavior; the formal §5.3 audit must be rerun after commit/merge when the worktree is clean.

Formal pre-report audit after commit:

```text
npm run qa:pre-report-audit -> PASS 5/5
  git_status_clean        PASS
  npm_lint                PASS
  tsc_noemit              PASS
  npm_test                PASS (257/257)
  production_url_smoke    PASS (70/70 checked)
```

Post-merge / production verification:

```text
PR #157 merged to main: 213baed4535ce3d603d506217289435d3c0b16e6
targeted DB sync: 16/16 Loop3 promoted cards upserted
npm run qa:card-import-audit -> filesystem/database both 126 ai_verified + 5 human_reviewed
production build-info -> 213baed4535ce3d603d506217289435d3c0b16e6
npm run smoke:production-answer -> 20/20 PASS after redline regex calibration
```

Smoke calibration note:

- The first production smoke run after sync returned 15/20 regex PASS, but manual review found the five failures were false positives rather than dangerous answers.
- The false positives were around negated/cautious wording: HSP1 professional routing wording, spouse remarriage not covering divorce notification, logo-only business-manager changes, resident-tax installment not being a PR question, and PR-as-public-relations vs PR-as-permanent-residence.
- PR #158 (`346f9589b0579fba1f6fd7e3ef367a08fd8ef9d4`) narrowed those regexes while preserving dangerous-action checks.
- Re-running `npm run smoke:production-answer` after PR #158 produced `20/20 passed`.

## 6. Risks / Deferred Items

- `zairyu-kekkan-renew-document` remains held as `MATERIALS_ONLY` because the current card is too generic for answer injection.
- Some promoted PR route cards are still eligibility-route facts, not permission predictions. Their injection blocks explicitly avoid success guarantees.
- This loop did not create new material entity pages or L5 signals.
- Full `npm run fact-layer:sync` is still operationally noisy/hangs without progress output, so post-merge sync should use targeted upsert for the 16 changed cards and then audit DB counts.

## 7. Next Loop

Loop 4 should start from remaining `ai_extracted` cards with high user impact and separate them into:

1. Materials Universe enrichment candidates;
2. L5 practice-signal candidates;
3. answer-runtime candidates with exact official source support;
4. dead/stale URLs requiring re-crawl.

The most valuable next target is not just more answer runtime count. It is to bind the newly repaired life-friction facts into material paths where they help users prepare documents and understand recurring city-office / tax / pension procedures.
