# Knowledge Runtime Expansion Goal — Loop 2 Report

Date: 2026-05-17  
Branch: `codex/knowledge-runtime-loop2`  
Scope: 50 candidate cards from `KNOWLEDGE_RUNTIME_LOOP2_CANDIDATES_2026-05-17.md`

## 1. Loop Goal

Loop 2 targeted source repair and material thickness, not raw volume.

The rule was stricter than Loop 1:

- promote only if official source supports the exact claim;
- rewrite or narrow claims when FACT found source overreach;
- keep practice-sensitive or source-mismatched cards out of runtime;
- preserve Materials Universe references without pretending every referenced card is injectable.

## 2. Result Summary

| Bucket | Count | Notes |
|---|---:|---|
| `ANSWER_RUNTIME` promoted | 9 | All promoted cards now have `state: ai_verified`, direct evidence, and `injection_certain_block`. |
| `MATERIALS_ONLY` kept / already bound | 15 | Useful for materials surface, but not promoted because source was partial, local-window specific, or not enough for answer injection. |
| `L5_ONLY` held | 6 | Practice-sensitive cards should become L5 signals or deep-water routing, not ordinary answer facts. |
| `NEEDS_REWRITE / SOURCE_REPAIR` | 17 | FACT found dead URLs, wrong pages, or claim/source mismatch. |
| `REJECT / DISABLED` | 0 this loop | No hard deletion; unsafe cards remain quarantined. |
| `UNKNOWN` | 3 | Needs future DOMAIN/FACT split before use. |

Filesystem card waterline after edits:

```text
ai_verified    110
human_reviewed   5
runtime-eligible 115
ai_extracted   151
disabled         3
total          269
```

Database still requires `npm run fact-layer:sync` after merge; before sync it remains at 101 `ai_verified` + 5 `human_reviewed`.

## 3. Promoted Cards

| fact_id | Action | Why safe now |
|---|---|---|
| `eijuu-nenkin-2year-shomei-method` | promote | ISA 永住 page supports 2-year pension proof materials; injection limited to document preparation. |
| `kokuho-shutoku-shoumei-2years` | promote | ISA 永住 page supports health insurance / MyNa insurance proof framing; no permission guarantee. |
| `koyo-todokede-mhlw` | promote | MHLW page directly supports employer-side foreign-worker employment notification; separated from immigration duty. |
| `nin-i-keizoku-20days` | promote | Kyokai Kenpo directly supports voluntary continuation deadline and 2-year period; useful after job loss. |
| `kakutei-shinkoku-deadline-march15` | promote | NTA source supports income-tax filing deadline and penalties; injection does not judge immigration outcome. |
| `zairyu-card-return-gimu` | source repair + promote | URL corrected to ISA return-duty page; evidence set to direct; death/expiry return duty only. |
| `zairyu-card-carry-obligation` | source repair + promote | URL corrected to ISA Article 23 / FAQ sources; penalty wording updated from 懲役 to current 拘禁刑. |
| `kokumin-nenkin-14days` | source repair + promote | URL corrected to Japan Pension Service; removed unsupported retroactive-payment wording. |
| `kokumin-kenko-hoken-14days` | source repair + promote | URL corrected to MHLW National Health Insurance join/withdraw page; removed unsupported retrospective charge claim from injected fact. |

## 4. Held Buckets

### MATERIALS_ONLY / Already Useful, Not Runtime

These cards can support Materials Universe pages or later material entity expansion, but should not inject into answers yet:

- `eijuu-letterofunderstanding-2021`
- `hoshou-jin-eijuu`
- `jumin-zei-no-shukyou-3types`
- `aoiro-shinkoku-65`
- `iryouhi-kojo-200000`
- `zairyu-shinsei-form-paper-online`
- `zairyu-online-system`
- `zairyu-hardship-payment`
- `kazoku-yobi-yose-shorui`
- `eijuu-junior-15-eligibility`
- `eijuu-jukyo-check-tax-shomeisho`
- `eijuu-after-kika-card`
- `shussan-ichijikin-50man`
- `shussan-teate-3day-deno`
- `ikuji-kyugyo-shotoku-67`

### L5_ONLY

These are risk-sensitive and should enter via L5 / deep-water routing, not normal fact injection:

- `zairyu-card-loss-overseas`
- `rikon-todoke-procedure`
- `ryugaku-naitei-tokutei-katsudou`
- `ryugaku-kishu-katsudo-tokkatsu`
- `ryugaku-shikakugai-individual-permission`
- `eijuu-takeoff-risk`

### NEEDS_REWRITE / SOURCE_REPAIR

Do not promote until source/claim is rewritten:

- `jumin-zei-jan1-criterion`
- `maina-hoken-2024-12`
- `koyou-keiyaku-rouken-tsuchi`
- `zairyu-nintei-shomeisho-application-method`
- `zairyu-kekkan-renew-document`
- `shussei-todoke-14days`
- `shibo-todoke-7days`
- `kekkon-todoke-procedure`
- `ryuugaku-nenkin-tokurei`
- `coe-shokai-overview`
- `eijuu-haigusha-3years-route`
- `eijuu-shotoku-haigusha-3year`
- `eijuu-children-direct-route`
- `kazoku-taizai-zairyu-period`
- `kazoku-taizai-shussan-shutoku`
- `kaiko-yokoku-30days`
- `rousai-hoken-foreign-worker`

### UNKNOWN / Future Split

- `eijuu-renew-not-required`
- `eijuu-vs-kika-key-diff`
- `eijuu-haigusha-zairyu-1year`

These are probably useful, but the current card text mixes eligibility, procedure, and outcome framing. They need route-specific rewrite before runtime.

## 5. Verification

Local verification before merge:

```text
npm run fact-layer:sync:dry  -> scanned=269 errors=0
npm test                     -> 257/257 pass
npm run lint                 -> pass
npx tsc --noEmit             -> pass
npm run qa:card-import-audit  -> filesystem 110 ai_verified + 5 human_reviewed
```

Official source smoke:

- MHLW / Japan Pension / NTA / Kyokai Kenpo URLs returned 200 by normal curl.
- MOJ URLs returned 403 without browser headers but 200 with User-Agent + Referer; this matches the known ISA server behavior and does not indicate dead sources.

Post-merge / production verification:

```text
PR #155 merged to main: cd3f071c963093e79b34ffc18f8b7bae82100dfe
targeted DB sync: 9/9 Loop2 promoted cards upserted
npm run qa:card-import-audit -> filesystem/database both 110 ai_verified + 5 human_reviewed
production build-info -> cd3f071c963093e79b34ffc18f8b7bae82100dfe
npm run smoke:production-answer -> 17/20 regex PASS; 20/20 substance PASS after manual review
```

Production smoke manual review notes:

- `R13-spouse-divorce-remarriage`: regex flagged, but answer clearly says divorce notification is independent and remarriage does not erase the old duty. Substance pass.
- `R14-nonpermission-strategy`: regex missed simplified Chinese `行政书士`; answer routes to immigration window / scrivener and warns against unplanned departure. Substance pass.
- `N17-business-manager-logo`: regex flagged conditional "if company name changed, 14-day notice"; answer correctly says logo/color-only change normally does not require immigration notice. Substance pass.

The full `npm run fact-layer:sync` command did not complete within the normal operator window because it sequentially upserts all 269 cards and gives no progress output. To avoid a stalled operator process, Loop 2 used targeted sync for the 9 changed cards. The follow-up audit confirmed DB and filesystem state are aligned.

## 6. Product Effect

Answer runtime improves in three practical zones:

1. 永住材料: pension / health insurance proof now injects narrower, material-oriented facts.
2. 退职后摩擦: national health insurance, national pension, voluntary continuation now have official-action facts.
3. 在留卡基础义务: carry and return duties now use corrected official sources.

Materials Tab benefits indirectly because several existing material entities already reference these cards:

- `nenkin-kiroku`
- `kenpo-shikaku-kakunin`
- `zairyu-card-passport`

No new UI surface was added in this loop.

## 7. Next Loop

Loop 3 should focus on the `NEEDS_REWRITE / SOURCE_REPAIR` bucket, especially:

1. resident tax January 1 rule;
2. MyNa insurance / qualification confirmation;
3. birth / death / marriage municipal procedures;
4. CoE inquiry / application method;
5. student post-graduation activity routes.

Do not pull those into runtime until their source pages support the exact claim.
