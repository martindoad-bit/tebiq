# Legal Source Engineering — Shadow A/B Round 1

Generated: 2026-05-13T02:57:01.068Z
Fact cards scanned from disk: 560

## Scope

- A 组：生产可见状态 `ai_verified` / `human_reviewed` / `needs_review`。
- B 组：dry-run 候选状态，在 A 组基础上加入 `ai_extracted`。
- 本轮只测检索命中，不提升卡片状态，不把 `ai_extracted` 注入生产答案。
- 目标：找出“新增法源层让哪些问题多看见了关键卡”，再交给 AQL 做答案层对比。

## Result

- 测试问题：42
- B 组新增候选命中：28
- A 组已可见命中：0
- 预期卡未命中：14
- 建议进入答案 A/B 的问题：25

## Interpretation

- 第一轮有明确检索增益：多数高风险问题在 B 组能看到更贴近的法源卡。
- 这还不是“答案已改善”的证明；它证明的是新法源层值得进入答案层 A/B。
- Miss 不直接等于卡片无用，优先当成 matcher/trigger 质量清单处理。
- AQL 下一步只需要跑 `AQL Answer A/B Queue` 中的题，不必把 42 题全量跑完。

## By Family

| Family | Questions | Candidate gain | Production visible | Miss |
|---|---:|---:|---:|---:|
| 再入国 | 2 | 0 | 0 | 2 |
| 取消/稳定性 | 4 | 1 | 0 | 3 |
| 届出 | 4 | 1 | 0 | 3 |
| 技人国 | 2 | 1 | 0 | 1 |
| 更新/变更 | 5 | 2 | 0 | 3 |
| 永住 | 8 | 7 | 0 | 1 |
| 特定技能 | 10 | 10 | 0 | 0 |
| 留学/变更 | 1 | 1 | 0 | 0 |
| 经营管理 | 3 | 3 | 0 | 0 |
| 高度人才 | 3 | 2 | 0 | 1 |

## AQL Answer A/B Queue

这些问题最适合下一步做答案层对比：A 组按现状答，B 组把 candidate-only 卡作为“候选法源上下文”加入，但仍标注为未审核，不作为确定事实硬注入。

AQL 首轮建议优先跑 15 题：`LS-001`, `LS-002`, `LS-004`, `LS-008`, `LS-011`, `LS-012`, `LS-013`, `LS-015`, `LS-019`, `LS-020`, `LS-024`, `LS-030`, `LS-034`, `LS-037`, `LS-040`。

| ID | Priority | Family | Question | Candidate-only card(s) |
|---|---|---|---|---|
| LS-001 | P0 | 特定技能 | 特定技能 换公司 只要14天届出 | `ssw-organization-change-requires-status-change-source` |
| LS-002 | P0 | 特定技能 | 特定技能1号 配偶孩子 家族滞在 | `ssw1-family-stay-not-sponsor-source` |
| LS-003 | P1 | 特定技能 | 特定技能2号 家族滞在 | `ssw2-family-stay-sponsor-dependent-scope-source` |
| LS-004 | P0 | 特定技能 | 特定技能 契約終了 受入れ困難 届出 | `ssw-employment-contract-end-acceptance-difficulty-boundary-source` |
| LS-005 | P1 | 特定技能 | 特定技能 1か月以上 活動できない 届出 | `ssw-acceptance-difficulty-one-month-inactivity-source` |
| LS-006 | P1 | 特定技能 | 特定技能 行方不明 届出 | `ssw-acceptance-difficulty-missing-person-source` |
| LS-007 | P1 | 特定技能 | 特定技能 支援 全部委託 定期届出 | `ssw-outsourced-support-periodic-report-via-host-source` |
| LS-008 | P1 | 特定技能 | 登録支援機関 更新 間に合わない 支援できる | `ssw-rso-renewal-lapse-no-support-source` |
| LS-011 | P0 | 永住 | 永住申請 更新 違い | `permanent-residence-permission-separate-from-renewal` |
| LS-012 | P0 | 永住 | 永住申請中 更新 必要 | `permanent-application-does-not-extend-current-status` |
| LS-013 | P0 | 永住 | 永住 材料齐了 一定能过 | `permanent-residence-materials-vs-eligibility-boundary` |
| LS-014 | P1 | 永住 | 永住 年金 2年 | `permanent-residence-pension-two-year-record-materials` |
| LS-015 | P1 | 永住 | 永住 年金免除 | `permanent-residence-public-obligation-exemption-deferment-gap` |
| LS-016 | P1 | 永住 | 永住 国税 納税証明書 その3 | `permanent-residence-national-tax-certificate-materials` |
| LS-017 | P1 | 永住 | 永住 了解書 必要 | `permanent-residence-understanding-letter-required` |
| LS-019 | P0 | 更新/变更 | 特例期间 是什么 | `special-period-renewal-change-applies` |
| LS-020 | P0 | 更新/变更 | 变更申请中 能先上班吗 | `change-approval-before-new-activity-guardrail` |
| LS-024 | P0 | 届出 | 出生后30天内申请 | `status-acquisition-30-day-application-window` |
| LS-030 | P1 | 取消/稳定性 | 日配 离婚 会马上失效吗 | `residence-cancellation-spouse-status-six-months` |
| LS-034 | P0 | 经营管理 | 经营管理 没有营业 | `business-manager-activity-stop-risk-router` |
| LS-035 | P1 | 经营管理 | 経営管理 事業停止 ビザ | `business-manager-activity-stop-risk-router` |
| LS-036 | P1 | 经营管理 | 经营管理 法律会计业务 | `business-manager-excludes-legal-accounting-qualified-business` |
| LS-037 | P0 | 高度人才 | 高度人材 转职 14天 | `guard-hsp1-institution-change-not-14day-only` |
| LS-038 | P1 | 高度人才 | J-Skip 転職 14日 | `guard-hsp1-institution-change-not-14day-only` |
| LS-040 | P1 | 技人国 | 技人国专业不一致 | `gijinkoku-background-relevance-required` |

## Misses / Matcher Gaps

AQL 归因：`LS-021`, `LS-022`, `LS-023`, `LS-026`, `LS-031`, `LS-032`, `LS-041` 优先扩 trigger；`LS-018`, `LS-027`, `LS-028`, `LS-029` 先确认旧卡答案是否已覆盖；`LS-025`, `LS-033`, `LS-039` 需要 DOMAIN/FACT 补充或拆分。

| ID | Family | Question | Expected card(s) | Top dry-run matches |
|---|---|---|---|---|
| LS-018 | 永住 | 高度専門職 永住 80点 1年 | `highly-skilled-permanent-residence-70-80-year-router` | `minashi-sainyuukoku` ai_verified/critical/hint_only<br>`eijuu-nenkin-risk` ai_verified/critical/hint_only<br>`eijuu-zairyu-kikan` ai_verified/high/inject |
| LS-021 | 更新/变更 | 特例期间 以前の資格 活動 | `special-period-previous-status-activity-only` | `zairyu-expiry-renewal-change` human_reviewed/high/inject |
| LS-022 | 更新/变更 | 更新申请 3ヶ月前 | `residence-renewal-application-window` | `gijinkoku-job-mismatch` ai_verified/high/inject<br>`zairyu-expiry-renewal-change` human_reviewed/high/inject |
| LS-023 | 更新/变更 | 変更申請 いつから | `residence-change-application-window` | `zairyu-expiry-renewal-change` human_reviewed/high/inject |
| LS-025 | 届出 | 小孩出生 60天 日本 国籍 | `status-acquisition-over-60-days-trigger` | — |
| LS-026 | 届出 | 离婚 14天 届出 | `spouse-notification-divorce-death-fourteen-day` | `spouse-divorce-separation` human_reviewed/critical/inject<br>`tensyoku-zairyu` ai_verified/high/inject |
| LS-027 | 届出 | 换工作 14天届出 等于变更许可吗 | `guard-shozoku-notification-does-not-replace-status-change` | `tensyoku-zairyu` ai_verified/high/inject<br>`gijinkoku-job-mismatch` ai_verified/high/inject |
| LS-028 | 再入国 | みなし再入国 海外で延長 | `special-reentry-no-overseas-extension` | `minashi-sainyuukoku` ai_verified/critical/hint_only<br>`sainyukoku-kyoka` ai_verified/high/inject |
| LS-029 | 再入国 | みなし再入国 1年 在留期限 | `special-reentry-one-year-or-status-expiry` | `minashi-sainyuukoku` ai_verified/critical/hint_only<br>`sainyukoku-kyoka` ai_verified/high/inject<br>`zairyu-expiry-renewal-change` human_reviewed/high/inject |
| LS-031 | 取消/稳定性 | 技人国 失业 会马上取消吗 | `job-loss-cancellation-not-automatic-router` | `gijinkoku-requires-contract-with-japan-organization` ai_extracted/high/drop<br>`technical-humanities-international-activity-anchor` ai_extracted/high/drop<br>`gijinkoku-job-mismatch` ai_verified/high/inject |
| LS-032 | 取消/稳定性 | 在留資格取消 意見聴取 | `residence-cancellation-opinion-hearing-rights` | `residence-cancellation-procedure-not-automatic` ai_extracted/critical/drop<br>`zairyu-shikaku-torikeshi` ai_verified/critical/hint_only<br>`gijinkoku-job-mismatch` ai_verified/high/inject |
| LS-033 | 取消/稳定性 | 虚假资料入国 在留取消 | `residence-cancellation-fraud-false-application-entry` | — |
| LS-039 | 高度人才 | J-Skip 经理 经营管理 3000万 | `guard-jskip-manager-not-business-manager-3000man` | `keiei-kanri-2025-10` human_reviewed/critical/inject<br>`keiei-kanri-capital-asset-3000man-criterion` ai_extracted/high/drop<br>`startup-visa-keiei-transition` ai_extracted/high/drop |
| LS-041 | 技人国 | 人文签销售 | `gijinkoku-job-mismatch` | `technical-humanities-international-activity-anchor` ai_extracted/high/drop<br>`gijinkoku-background-relevance-required` ai_extracted/high/drop<br>`gijinkoku-requires-contract-with-japan-organization` ai_extracted/high/drop |

## Full Retrieval Rows

| ID | Status | Family | Question | A: production top | B: dry-run top | Expected hit |
|---|---|---|---|---|---|---|
| LS-001 | B新增 | 特定技能 | 特定技能 换公司 只要14天届出 | `tensyoku-zairyu` ai_verified/high/inject<br>`tokuteiginou-ichigou-youken` ai_verified/high/inject | `ssw-organization-change-requires-status-change-source` ai_extracted/critical/drop<br>`tensyoku-zairyu` ai_verified/high/inject<br>`tokuteiginou-ichigou-youken` ai_verified/high/inject | `ssw-organization-change-requires-status-change-source` |
| LS-002 | B新增 | 特定技能 | 特定技能1号 配偶孩子 家族滞在 | `kazoku-taizai-yoken` ai_verified/high/inject<br>`tokuteiginou-ichigou-youken` ai_verified/high/inject | `ssw1-family-stay-not-sponsor-source` ai_extracted/critical/drop<br>`dependent-sponsor-and-family-member-scope` ai_extracted/high/drop<br>`specified-skilled-worker-1-designated-field-skill-scope` ai_extracted/high/drop | `ssw1-family-stay-not-sponsor-source` |
| LS-003 | B新增 | 特定技能 | 特定技能2号 家族滞在 | `tokutei-ginou-2go-bunya` ai_verified/high/inject<br>`tokuteiginou-nigou-youken` ai_verified/high/inject | `specified-skilled-worker-2-skilled-scope` ai_extracted/high/drop<br>`ssw2-family-stay-sponsor-dependent-scope-source` ai_extracted/high/drop<br>`tokutei-ginou-2go-bunya` ai_verified/high/inject | `ssw2-family-stay-sponsor-dependent-scope-source` |
| LS-004 | B新增 | 特定技能 | 特定技能 契約終了 受入れ困難 届出 | `tokuteiginou-ichigou-youken` ai_verified/high/inject | `ssw-employment-contract-end-acceptance-difficulty-boundary-source` ai_extracted/critical/drop<br>`tokuteiginou-ichigou-youken` ai_verified/high/inject<br>`skilled-labor-activity-anchor` ai_extracted/medium/drop | `ssw-employment-contract-end-acceptance-difficulty-boundary-source` |
| LS-005 | B新增 | 特定技能 | 特定技能 1か月以上 活動できない 届出 | `tokuteiginou-ichigou-youken` ai_verified/high/inject | `ssw-acceptance-difficulty-one-month-inactivity-source` ai_extracted/high/drop<br>`tokuteiginou-ichigou-youken` ai_verified/high/inject<br>`skilled-labor-activity-anchor` ai_extracted/medium/drop | `ssw-acceptance-difficulty-one-month-inactivity-source` |
| LS-006 | B新增 | 特定技能 | 特定技能 行方不明 届出 | `tokuteiginou-ichigou-youken` ai_verified/high/inject | `ssw-acceptance-difficulty-missing-person-source` ai_extracted/critical/drop<br>`tokuteiginou-ichigou-youken` ai_verified/high/inject<br>`skilled-labor-activity-anchor` ai_extracted/medium/drop | `ssw-acceptance-difficulty-missing-person-source` |
| LS-007 | B新增 | 特定技能 | 特定技能 支援 全部委託 定期届出 | `tokuteiginou-ichigou-youken` ai_verified/high/inject | `ssw-outsourced-support-periodic-report-via-host-source` ai_extracted/high/drop<br>`ssw1-support-plan-registered-support-org-delegation-source` ai_extracted/high/drop<br>`tokuteiginou-ichigou-youken` ai_verified/high/inject | `ssw-outsourced-support-periodic-report-via-host-source` |
| LS-008 | B新增 | 特定技能 | 登録支援機関 更新 間に合わない 支援できる | `zairyu-expiry-renewal-change` human_reviewed/high/inject | `ssw-rso-renewal-lapse-no-support-source` ai_extracted/critical/drop<br>`zairyu-expiry-renewal-change` human_reviewed/high/inject | `ssw-rso-renewal-lapse-no-support-source` |
| LS-009 | B新增 | 特定技能 | 特定技能 支援計画 変更 届出 14日 | `tensyoku-zairyu` ai_verified/high/inject<br>`tokuteiginou-ichigou-youken` ai_verified/high/inject | `ssw-support-plan-change-notification-14day-source` ai_extracted/high/drop<br>`ssw1-contract-support-plan-router` ai_extracted/high/drop<br>`tensyoku-zairyu` ai_verified/high/inject | `ssw-support-plan-change-notification-14day-source` |
| LS-010 | B新增 | 特定技能 | 特定技能 定期届出 年1回 | `tokuteiginou-ichigou-youken` ai_verified/high/inject | `ssw-periodic-notification-integrated-annual-form-source` ai_extracted/high/drop<br>`tokuteiginou-ichigou-youken` ai_verified/high/inject<br>`skilled-labor-activity-anchor` ai_extracted/medium/drop | `ssw-periodic-notification-integrated-annual-form-source` |
| LS-011 | B新增 | 永住 | 永住申請 更新 違い | `eijuu-nenkin-risk` ai_verified/critical/hint_only<br>`eijuu-zairyu-kikan` ai_verified/high/inject<br>`zairyu-expiry-renewal-change` human_reviewed/high/inject | `eijuu-nenkin-risk` ai_verified/critical/hint_only<br>`permanent-residence-permission-separate-from-renewal` ai_extracted/high/drop<br>`eijuu-zairyu-kikan` ai_verified/high/inject | `permanent-residence-permission-separate-from-renewal` |
| LS-012 | B新增 | 永住 | 永住申請中 更新 必要 | `eijuu-nenkin-risk` ai_verified/critical/hint_only<br>`eijuu-zairyu-kikan` ai_verified/high/inject<br>`zairyu-expiry-renewal-change` human_reviewed/high/inject | `permanent-application-does-not-extend-current-status` ai_extracted/critical/drop<br>`eijuu-nenkin-risk` ai_verified/critical/hint_only<br>`eijuu-zairyu-kikan` ai_verified/high/inject | `permanent-application-does-not-extend-current-status` |
| LS-013 | B新增 | 永住 | 永住 材料齐了 一定能过 | `eijuu-nenkin-risk` ai_verified/critical/hint_only<br>`eijuu-zairyu-kikan` ai_verified/high/inject | `permanent-residence-materials-vs-eligibility-boundary` ai_extracted/critical/drop<br>`eijuu-nenkin-risk` ai_verified/critical/hint_only<br>`eijuu-zairyu-kikan` ai_verified/high/inject | `permanent-residence-materials-vs-eligibility-boundary` |
| LS-014 | B新增 | 永住 | 永住 年金 2年 | `eijuu-nenkin-risk` ai_verified/critical/hint_only<br>`eijuu-zairyu-kikan` ai_verified/high/inject | `permanent-residence-pension-two-year-record-materials` ai_extracted/critical/drop<br>`eijuu-nenkin-risk` ai_verified/critical/hint_only<br>`eijuu-zairyu-kikan` ai_verified/high/inject | `permanent-residence-pension-two-year-record-materials` |
| LS-015 | B新增 | 永住 | 永住 年金免除 | `eijuu-nenkin-risk` ai_verified/critical/hint_only<br>`eijuu-zairyu-kikan` ai_verified/high/inject | `permanent-public-obligations-tax-pension-health` ai_extracted/critical/drop<br>`permanent-residence-public-obligation-exemption-deferment-gap` ai_extracted/critical/drop<br>`eijuu-nenkin-risk` ai_verified/critical/hint_only | `permanent-residence-public-obligation-exemption-deferment-gap` |
| LS-016 | B新增 | 永住 | 永住 国税 納税証明書 その3 | `eijuu-nenkin-risk` ai_verified/critical/hint_only<br>`eijuu-zairyu-kikan` ai_verified/high/inject | `eijuu-nenkin-risk` ai_verified/critical/hint_only<br>`permanent-residence-national-tax-certificate-materials` ai_extracted/high/drop<br>`eijuu-zairyu-kikan` ai_verified/high/inject | `permanent-residence-national-tax-certificate-materials` |
| LS-017 | B新增 | 永住 | 永住 了解書 必要 | `eijuu-nenkin-risk` ai_verified/critical/hint_only<br>`eijuu-zairyu-kikan` ai_verified/high/inject | `eijuu-nenkin-risk` ai_verified/critical/hint_only<br>`permanent-residence-understanding-letter-required` ai_extracted/high/drop<br>`eijuu-zairyu-kikan` ai_verified/high/inject | `permanent-residence-understanding-letter-required` |
| LS-018 | 未命中 | 永住 | 高度専門職 永住 80点 1年 | `minashi-sainyuukoku` ai_verified/critical/hint_only<br>`eijuu-nenkin-risk` ai_verified/critical/hint_only<br>`eijuu-zairyu-kikan` ai_verified/high/inject | `minashi-sainyuukoku` ai_verified/critical/hint_only<br>`eijuu-nenkin-risk` ai_verified/critical/hint_only<br>`eijuu-zairyu-kikan` ai_verified/high/inject | — |
| LS-019 | B新增 | 更新/变更 | 特例期间 是什么 | `zairyu-expiry-renewal-change` human_reviewed/high/inject | `special-period-renewal-change-applies` ai_extracted/high/drop<br>`zairyu-expiry-renewal-change` human_reviewed/high/inject | `special-period-renewal-change-applies` |
| LS-020 | B新增 | 更新/变更 | 变更申请中 能先上班吗 | — | `change-approval-before-new-activity-guardrail` ai_extracted/high/drop | `change-approval-before-new-activity-guardrail` |
| LS-021 | 未命中 | 更新/变更 | 特例期间 以前の資格 活動 | `zairyu-expiry-renewal-change` human_reviewed/high/inject | `zairyu-expiry-renewal-change` human_reviewed/high/inject | — |
| LS-022 | 未命中 | 更新/变更 | 更新申请 3ヶ月前 | `gijinkoku-job-mismatch` ai_verified/high/inject<br>`zairyu-expiry-renewal-change` human_reviewed/high/inject | `gijinkoku-job-mismatch` ai_verified/high/inject<br>`zairyu-expiry-renewal-change` human_reviewed/high/inject | — |
| LS-023 | 未命中 | 更新/变更 | 変更申請 いつから | `zairyu-expiry-renewal-change` human_reviewed/high/inject | `zairyu-expiry-renewal-change` human_reviewed/high/inject | — |
| LS-024 | B新增 | 届出 | 出生后30天内申请 | — | `status-acquisition-30-day-application-window` ai_extracted/high/drop | `status-acquisition-30-day-application-window` |
| LS-025 | 未命中 | 届出 | 小孩出生 60天 日本 国籍 | — | — | — |
| LS-026 | 未命中 | 届出 | 离婚 14天 届出 | `spouse-divorce-separation` human_reviewed/critical/inject<br>`tensyoku-zairyu` ai_verified/high/inject | `spouse-divorce-separation` human_reviewed/critical/inject<br>`tensyoku-zairyu` ai_verified/high/inject | — |
| LS-027 | 未命中 | 届出 | 换工作 14天届出 等于变更许可吗 | `tensyoku-zairyu` ai_verified/high/inject<br>`gijinkoku-job-mismatch` ai_verified/high/inject | `tensyoku-zairyu` ai_verified/high/inject<br>`gijinkoku-job-mismatch` ai_verified/high/inject | — |
| LS-028 | 未命中 | 再入国 | みなし再入国 海外で延長 | `minashi-sainyuukoku` ai_verified/critical/hint_only<br>`sainyukoku-kyoka` ai_verified/high/inject | `minashi-sainyuukoku` ai_verified/critical/hint_only<br>`sainyukoku-kyoka` ai_verified/high/inject | — |
| LS-029 | 未命中 | 再入国 | みなし再入国 1年 在留期限 | `minashi-sainyuukoku` ai_verified/critical/hint_only<br>`sainyukoku-kyoka` ai_verified/high/inject<br>`zairyu-expiry-renewal-change` human_reviewed/high/inject | `minashi-sainyuukoku` ai_verified/critical/hint_only<br>`sainyukoku-kyoka` ai_verified/high/inject<br>`zairyu-expiry-renewal-change` human_reviewed/high/inject | — |
| LS-030 | B新增 | 取消/稳定性 | 日配 离婚 会马上失效吗 | `spouse-divorce-separation` human_reviewed/critical/inject | `residence-cancellation-spouse-status-six-months` ai_extracted/critical/drop<br>`spouse-divorce-separation` human_reviewed/critical/inject | `residence-cancellation-spouse-status-six-months` |
| LS-031 | 未命中 | 取消/稳定性 | 技人国 失业 会马上取消吗 | `gijinkoku-job-mismatch` ai_verified/high/inject | `gijinkoku-requires-contract-with-japan-organization` ai_extracted/high/drop<br>`technical-humanities-international-activity-anchor` ai_extracted/high/drop<br>`gijinkoku-job-mismatch` ai_verified/high/inject | — |
| LS-032 | 未命中 | 取消/稳定性 | 在留資格取消 意見聴取 | `zairyu-shikaku-torikeshi` ai_verified/critical/hint_only<br>`gijinkoku-job-mismatch` ai_verified/high/inject | `residence-cancellation-procedure-not-automatic` ai_extracted/critical/drop<br>`zairyu-shikaku-torikeshi` ai_verified/critical/hint_only<br>`gijinkoku-job-mismatch` ai_verified/high/inject | — |
| LS-033 | 未命中 | 取消/稳定性 | 虚假资料入国 在留取消 | — | — | — |
| LS-034 | B新增 | 经营管理 | 经营管理 没有营业 | `keiei-kanri-2025-10` human_reviewed/critical/inject<br>`keiei-kanri-existing-holder-update` human_reviewed/high/inject | `business-manager-activity-stop-risk-router` ai_extracted/critical/drop<br>`keiei-kanri-2025-10` human_reviewed/critical/inject<br>`startup-visa-keiei-transition` ai_extracted/high/drop | `business-manager-activity-stop-risk-router` |
| LS-035 | B新增 | 经营管理 | 経営管理 事業停止 ビザ | `keiei-kanri-2025-10` human_reviewed/critical/inject<br>`keiei-kanri-existing-holder-update` human_reviewed/high/inject | `business-manager-activity-stop-risk-router` ai_extracted/critical/drop<br>`keiei-kanri-2025-10` human_reviewed/critical/inject<br>`business-manager-activity-anchor` ai_extracted/high/drop | `business-manager-activity-stop-risk-router` |
| LS-036 | B新增 | 经营管理 | 经营管理 法律会计业务 | `keiei-kanri-2025-10` human_reviewed/critical/inject<br>`keiei-kanri-existing-holder-update` human_reviewed/high/inject | `keiei-kanri-2025-10` human_reviewed/critical/inject<br>`startup-visa-keiei-transition` ai_extracted/high/drop<br>`keiei-kanri-existing-holder-update` human_reviewed/high/inject | `business-manager-excludes-legal-accounting-qualified-business` |
| LS-037 | B新增 | 高度人才 | 高度人材 转职 14天 | `tensyoku-zairyu` ai_verified/high/inject<br>`kodo-senmon-shoku-eijuu` ai_verified/high/inject | `guard-hsp1-institution-change-not-14day-only` ai_extracted/critical/drop<br>`tensyoku-zairyu` ai_verified/high/inject<br>`kodo-senmon-shoku-eijuu` ai_verified/high/inject | `guard-hsp1-institution-change-not-14day-only` |
| LS-038 | B新增 | 高度人才 | J-Skip 転職 14日 | `gijinkoku-job-mismatch` ai_verified/high/inject<br>`tensyoku-zairyu` ai_verified/high/inject | `guard-hsp1-institution-change-not-14day-only` ai_extracted/critical/drop<br>`gijinkoku-job-mismatch` ai_verified/high/inject<br>`tensyoku-zairyu` ai_verified/high/inject | `guard-hsp1-institution-change-not-14day-only` |
| LS-039 | 未命中 | 高度人才 | J-Skip 经理 经营管理 3000万 | `keiei-kanri-2025-10` human_reviewed/critical/inject<br>`keiei-kanri-existing-holder-update` human_reviewed/high/inject | `keiei-kanri-2025-10` human_reviewed/critical/inject<br>`keiei-kanri-capital-asset-3000man-criterion` ai_extracted/high/drop<br>`startup-visa-keiei-transition` ai_extracted/high/drop | — |
| LS-040 | B新增 | 技人国 | 技人国专业不一致 | `gijinkoku-job-mismatch` ai_verified/high/inject | `gijinkoku-background-relevance-required` ai_extracted/high/drop<br>`gijinkoku-requires-contract-with-japan-organization` ai_extracted/high/drop<br>`technical-humanities-international-activity-anchor` ai_extracted/high/drop | `gijinkoku-background-relevance-required` |
| LS-041 | 未命中 | 技人国 | 人文签销售 | — | `technical-humanities-international-activity-anchor` ai_extracted/high/drop<br>`gijinkoku-background-relevance-required` ai_extracted/high/drop<br>`gijinkoku-requires-contract-with-japan-organization` ai_extracted/high/drop | — |
| LS-042 | B新增 | 留学/变更 | 留学转工作 审查中 上班 | `zairyu-expiry-renewal-change` human_reviewed/high/inject | `change-approval-before-new-activity-guardrail` ai_extracted/high/drop<br>`zairyu-expiry-renewal-change` human_reviewed/high/inject | `change-approval-before-new-activity-guardrail` |

## QA Notes

- P0/P1：无。
- 可复现性：脚本每次会刷新 `generatedAt`，忽略该字段后 JSON/Markdown 结果稳定。
- 安全性：`ai_extracted` 在 B 组可见，但 gate decision 仍为 `drop`；本脚本不写 DB、不提升状态、不改生产注入路径。

## How To Reproduce

```bash
npx tsx scripts/eval/legal-source-shadow-ab.ts
```

