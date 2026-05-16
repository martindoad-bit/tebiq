# Fact Card Audit 2026-05-17

Status: FACT audit / read-only / no card content modified
Date: 2026-05-17
Owner: FACT auditor (tebiq-windows-agent)
Scope: `docs/fact-cards/*.md` filesystem cards vs `lib/consultation/route-gates.ts`,
`lib/consultation/guardrail-validator.ts`,
`docs/ops/TEBIQ_0_8_5_FACT_RC_SUPPORT_REPORT.md`,
`docs/domain/TEBIQ_0_8_5_IMPORT_DOMAIN_REVIEW.md`.

This is an audit-only pass. No `.md` cards were edited. Recommendations below
are for FACT / DOMAIN / PL action, not auto-apply.

## Methodology

For each card we extracted: `state`, `risk_level`, `confidence`, `production_disposition`,
count of `needs_review_flags`, every `source_url` / `url` field, and whether
each card crosses a DOMAIN deep-water boundary or feeds a route-gate
`sourceAssetIds`. A representative subset of URLs (covering each unique ISA/MOJ/
metro path family and every non-`go.jp` host) was probed with WebFetch to
classify ALIVE / DEAD / REDIRECT.

## 总览

- 总卡数（去掉 README + FACT_OPS_WINDOW_TASK_PACK）: **107**
  - 实际比 FACT RC Support Report 记录的 101 多 6 张。新增/未记录: `gijinkoku-category-1-2-3-4`, `kazoku-taizai-shussan-shutoku`, `teijusha-koshikai-vs-koshigai`, `tokurei-kikan-2months`, `zairyu-card-return-gimu`, `zairyu-shikaku-torikeshi-jiyu-10`。CURRENT_STATE / RC report 与文件系统出现 drift，需 GM 调和。
- `state` 分布
  - `ai_verified`: **94**（建议 downgrade 8 张 / 保留 86 张）
  - `human_reviewed`: **5**（全部保留）
  - `ai_extracted`: **8**（建议 promote 1 张到 `ai_verified`，保留 7 张）
- 完全清空 `needs_review_flags: []` 的卡只有 **2 张**：`zairyu-address-change`, `zairyu-card-loss-reissue`。其余 105 张 ai/human 卡至少有 1 条 unresolved flag。
- URL 探活样本: 11 个独立 URL 探活，其中 **1 个明确 404**（`kyoukaikenpo.or.jp/g7/cat710/sb3100/`），**1 个 URL 错配**（`isa/applications/procedures/nyuukokukanri07_00045.html` 实际页面是「資格外活動」而非卡声称的「再入国許可」），**1 个自标 redirect 待修**（`eijuu-card-koushin` 的 `source_url_redirect` flag）。

## 该 downgrade 到 ai_extracted 的卡（8 张）

按 DOMAIN_IMPORT_REVIEW §2 + FACT RC SUPPORT §4-§5 标准：
critical 风险 + `confidence: medium` + 仍在 DOMAIN deep-water 列表里，
或 source URL 失效 / 错配 / quote 不可追溯的卡，不应保持 `ai_verified`
作为可正面注入的产品状态。

| fact_id | 原因 | 建议动作 |
|---|---|---|
| `eijuu-nenkin-risk` | `critical` + `confidence: medium`，多条 lookback / kokumin-nenkin-menjo / shakaihoken-gap unresolved flag；DOMAIN §2.5 已要求 guardrail/hint only | downgrade 至 `ai_extracted`，DOMAIN 复核 lookback 字段后再回到 `ai_verified` 并维持 `controlled_alpha_eligible: false` |
| `minashi-sainyuukoku` | `critical` + `confidence: medium`；DOMAIN §2.2 + §4.2 列为 deep-water；卡自己 GM 注释说「critical 卡仅 PL signoff 路径」；当前已 `controlled_alpha_eligible: false`，但 state 仍 `ai_verified` 与 confidence 不一致 | downgrade 至 `ai_extracted`，等 DOMAIN 解决 over-one-year / 特例期间叠加 question |
| `eijuu-haigusha-visa` | `confidence: medium`，3 条 unresolved flag（no_work_restriction_source, marital_substance_review, eijuu_vs_nihonjin_spouse_diff）；DOMAIN §2.4 + §4.4 划入 deep-water | downgrade 至 `ai_extracted`；卡可保留作为材料/定义 source-only，但不应作为 ai_verified 正面引用 |
| `nihonjin-haigusha-visa` | `confidence: medium`；DOMAIN §2.4 明确「不得用于判断 separation/DV/定住者/再婚 route」；needs_review 流程未跑完 | downgrade 至 `ai_extracted` |
| `eijuu-shinsei-shorui` | `confidence: high` 但 3 条 unresolved flag（年収/资产 threshold、配偶 route diff、了解書 内容）；卡明显被 DOMAIN §4.4 + RC §1（资产/PR 预测）划为 materials-only；当前 ai_verified 可能被注入做许可预测 | downgrade 至 `ai_extracted`；OR 在 `production_disposition` 显式写 `materials_only` 后保留 ai_verified |
| `kazoku-taizai-henko` | 4 条 unresolved flag（含 illegal_work_impact、permission_before_work_start），全部属于 DOMAIN must-ask 范围；卡作为 ai_verified 可能直接引用到「変更前可不可以工作」这类高风险断言 | downgrade 至 `ai_extracted` |
| `overstay-taisho` | `critical` + `confidence: medium`，DOMAIN §4.5 + RC §4 明确「only deep-water」 | downgrade 至 `ai_extracted`（仅作为 guardrail/source-only） |
| `sainyukoku-kyoka` | `high` 卡，第二个 source URL `https://www.moj.go.jp/isa/applications/procedures/nyuukokukanri07_00045.html` 实际页面内容是「資格外活動許可」不是「再入国許可」——属于 source 错配，不能保持 ai_verified | downgrade 至 `ai_extracted`，要求 FACT 重抓正确再入国官方页（建议 `isa/immigration/procedures/16-5.html`，验证为 ALIVE） |

补充意见：

- `eijuu-card-koushin` 自带 `source_url_redirect` flag（official_sources 的 ISA URL 已 redirect），探活 WebFetch 显示 follow-redirect 后内容正确，建议 FACT 把新 canonical URL 回填进 `official_sources.url`，否则下一轮 audit 仍会被判 stale。**不建议直接 downgrade**，但要修 URL 字段。
- `zairyu-shikaku-torikeshi` `critical` + `confidence: high`，flags 数较少，DOMAIN §4.x 划为 guardrail/deep-water——**这是 ai_verified 但只能用作 guardrail source 的合规案例**，应保留 ai_verified 并 explicit 加 `production_disposition: guardrail_only`，否则会被注入为正面结论。
- `keiei-kanri-2025-10`（human_reviewed, controlled_alpha_eligible: true）+ `keiei-kanri-existing-holder-update`（human_reviewed）：DOMAIN §2.1 + RC §2.1 都要求**不得作为 broad positive 注入**。state 不动，但需 PL 加显式 `injection_scope: framework_only` 或 quarantine from First24 positive injection 路径。

## 该 promote 到 ai_verified 的卡（1 张）

| fact_id | 原因 | 建议动作 |
|---|---|---|
| `gijinkoku-category-1-2-3-4` | `ai_extracted` + `confidence: high` + `source_quality: official`；URL（`isa/applications/status/gijinkoku.html`）已验证 ALIVE；3 条 review flag 全是边缘 detail（innovation_company 定义、新设公司材料、cat2 在线适用），不会被注入为高风险结论；属于 RC SUPPORT §3 类「definition/category 事实」可正面引用 | promote 至 `ai_verified`，risk_level=`high` 保留，不开 `controlled_alpha_eligible` |

不建议 promote 的 `ai_extracted` 卡（7 张）及原因：

- `keiei-kanri-capital-asset-3000man-criterion` — `production_disposition: guardrail_only`，DOMAIN §4.1 明确 deep-water。
- `startup-visa-keiei-transition` — DOMAIN §4.1 / RC §2.1 都明确 deep-water。
- `kazoku-taizai-shussan-shutoku` — `confidence: medium`，触及在留申请 + 出生取得双重程序，未做 DOMAIN 复核。
- `teijusha-koshikai-vs-koshigai` — `confidence: medium`，定住者口頭/口外区分属高风险类别判断。
- `tokurei-kikan-2months` — `confidence: high` 但 flag 含 `reentry_during_tokurei_kikan`，正是 DOMAIN §4.2 deep-water 核心争点；如 promote 风险极大。
- `zairyu-card-return-gimu` — `confidence: medium`，penalty/mailing 边界未明，安全起见保留。
- `zairyu-shikaku-torikeshi-jiyu-10` — 10 条取消事由列举类卡，`confidence: medium`，DOMAIN 取消范围尚未签发。

## URL 失效 / 错配清单（3 张）

| fact_id | URL | 状态 | 建议动作 |
|---|---|---|---|
| `kenpo-kizubyou-teate` | `https://www.kyoukaikenpo.or.jp/g7/cat710/sb3100/` | **HTTP 404** | quarantine（移到 `ai_extracted` 并要求 FACT 找现行 kyoukaikenpo 傷病手当金页；建议 `https://www.kyoukaikenpo.or.jp/g3/cat310/`） |
| `sainyukoku-kyoka` | `https://www.moj.go.jp/isa/applications/procedures/nyuukokukanri07_00045.html` | **URL 错配**：实际页面是「資格外活動許可」 | downgrade（见上）；用 ALIVE 验证过的 `isa/immigration/procedures/16-5.html` 替换 |
| `eijuu-card-koushin` | `https://www.moj.go.jp/isa/applications/procedures/nyuukokukanri10_00011.html` | ALIVE 但卡自标 `source_url_redirect` flag | 修字段，不 downgrade |

未完全枚举：仍有约 80 个未抽样的 ISA / 厚労省 / 总务省 / NTA URL。建议下一轮做 batch URL audit（脚本化 head 请求），不在本轮范围。

## 跟 route gates 冲突的卡（4 类 / 共 6 张）

route-gates 与 fact-cards 直接命名冲突或互相覆盖的部分：

| Route gate id | 涉及卡 | 冲突类型 | 建议动作 |
|---|---|---|---|
| `business-manager-2025-reform-hard-fact-boundary` (`route-gates.ts:938`) | `keiei-kanri-2025-10`（human_reviewed, controlled_alpha_eligible: true）、`keiei-kanri-existing-holder-update`、`keiei-kanri-capital-asset-3000man-criterion` | gate `sourceAssetIds` 只含 `keiei-kanri-capital-asset-3000man-criterion` 一张，但 First24 实际注入了 `keiei-kanri-2025-10` 和 `keiei-kanri-existing-holder-update`（见 RC §1 / §2.1）。两张卡 state 是 human_reviewed，自动满足注入条件，没有任何机制阻止它们当作正面 injection | 在卡或 route 层加显式 `injection_scope: guardrail_only` 或 `do_not_inject_in_routes: [business-manager-2025-reform-hard-fact-boundary]`；不能光靠 RC 报告口头约束 |
| `hsp1-institution-change-permission-first` (`route-gates.ts:246`) | `kodo-senmon-shoku-points`、`kodo-senmon-shoku-eijuu` | gate `sourceAssetIds: ['guardrail-hsp1-institution-change']`（unresolved source registry id），但 First24 C03 实际注入了上面两张 HSP 卡，作为 positive context，正好稀释 RC §2.3 + DOMAIN §4.3 的「permission-before-work」边界 | 加 quarantine：HSP1 institution-change 路由命中时禁用这两张卡，或卡侧加 `excluded_from_routes: [hsp1-institution-change-permission-first]` |
| `dv-address-safety-first` (`route-gates.ts:983`) | `spouse-divorce-separation`（human_reviewed） | gate 关键词包含 DV / 暴力 / シェルター；卡是 human_reviewed，命中后自动加入 evidence。DOMAIN §2.4 + §4.4 + RC §1 明确 DV / 地址安全是 deep-water，**不能引用配偶卡**。当前没有显式排除机制 | 给 `spouse-divorce-separation` 加 `do_not_inject_when_route_includes: [dv-address-safety-first]`；DV 命中纯走 guardrail + handoff |
| `gijinkoku-work-scope-not-any-job` (`route-gates.ts:1145`) | `gijinkoku-job-mismatch`（ai_verified, high） | gate 走 guardrail-only source，但 `gijinkoku-job-mismatch` 在卡侧仍是 ai_verified 可注入；RC §2.6 提示「不应把混合工作分类为非法」 | 加 `production_disposition: narrow_negative_only`，或显式标 `cannot_classify_as_illegal_work` 字段，防止注入升级为定性结论 |

间接冲突（命名 mismatch / dangling 引用，非阻塞但应清理）：

- `gijinkoku-job-change-notification`（RC §2.6 提到）在卡集合不存在，应映射到 `tensyoku-zairyu` 或新建 source-only。
- RC §1 P0 P1 列出的 8 张 source-only 卡（`その3`、notice taxonomy、nonpermission、HSP1 source、DV source、business-manager disposition、late-tax、incomplete-materials）仍未落地为 fact card，导致 50+ route gate 的 `sourceAssetIds` 是 unresolved id。本审计无新建卡权限，仅 flag。

## DOMAIN 边界跳过清单（保守 quarantine 建议）

下列卡当前是 ai_verified（或更高），且 DOMAIN §2 + §4 明确划为 guardrail / deep-water，但卡侧没有阻止注入机制。属于"道德 / 法律边界默认 quarantine"集合。**审计不修改卡内容，但建议 FACT 在 follow-up patch 中为这些卡补 `injection_scope` / `production_disposition` 字段，否则在 50-60 question 扩展中仍会以 ai_verified 身份被默认正面注入。**

| fact_id | DOMAIN/RC 边界 | 当前 state | 缺失防护 |
|---|---|---|---|
| `spouse-divorce-separation` | DV / 替代材料 / 定住者 route 全 deep-water | human_reviewed | 无 `excluded_from_routes` / `injection_scope` |
| `nihonjin-haigusha-visa` | separation/DV/再婚 route deep-water | ai_verified | 同上 |
| `eijuu-haigusha-visa` | separation/DV/再婚 route deep-water | ai_verified | 同上 |
| `keiei-kanri-2025-10` | 不得 broad positive 注入 | human_reviewed, controlled_alpha_eligible: true | controlled_alpha_eligible 与 DOMAIN guardrail 立场冲突 |
| `keiei-kanri-existing-holder-update` | 过渡事实，不得作为更新安全保证 | human_reviewed | 无注入边界字段 |
| `kodo-senmon-shoku-points` / `kodo-senmon-shoku-eijuu` | 不得在 HSP1 institution-change 路由中正面注入 | ai_verified | 无 route-exclusion |
| `eijuu-nenkin-risk` | hint/guardrail only | ai_verified（建议 downgrade） | 无 `production_disposition` |
| `minashi-sainyuukoku` | 不得断言 over-one-year / 特例期间出国安全 | ai_verified（建议 downgrade） | 无 |
| `overstay-taisho` | deep-water | ai_verified（建议 downgrade） | 无 |
| `zairyu-shikaku-torikeshi` | guardrail / deep-water | ai_verified | 无 `production_disposition: guardrail_only` |
| `shikakugai-fukugyou` | guardrail/narrow definition | human_reviewed | 无 `injection_scope` |
| `gijinkoku-job-mismatch` | 不得分类为不法就労 | ai_verified | 无 |

## Drift / 元数据问题

1. **101 vs 107 卡数 drift**：`docs/ops/TEBIQ_0_8_5_FACT_RC_SUPPORT_REPORT.md` 写 101，`docs/product/TEBIQ_CURRENT_STATE.md` 也用 101。文件系统现有 107 张。`gijinkoku-category-1-2-3-4`, `kazoku-taizai-shussan-shutoku`, `teijusha-koshikai-vs-koshigai`, `tokurei-kikan-2months`, `zairyu-card-return-gimu`, `zairyu-shikaku-torikeshi-jiyu-10` 未在 RC 报告与 DB drift 检查中体现。需要 GM 跑 `npm run qa:card-import-audit` 确认 DB 行数是否同步。
2. `controlled_alpha_eligible: true` 但 critical/high deep-water 卡集合：仅 `keiei-kanri-2025-10` 一张。该 flag 与 DOMAIN §2.1 立场冲突，建议 PL 复核 changelog signoff。

## Summary

- **8 张该 downgrade 到 ai_extracted**（eijuu-nenkin-risk, minashi-sainyuukoku, eijuu-haigusha-visa, nihonjin-haigusha-visa, eijuu-shinsei-shorui, kazoku-taizai-henko, overstay-taisho, sainyukoku-kyoka）
- **1 张该 promote 到 ai_verified**（gijinkoku-category-1-2-3-4）
- **2 个 URL 死/错配 + 1 个 redirect 待修**（kenpo-kizubyou-teate 404、sainyukoku-kyoka URL 错配、eijuu-card-koushin redirect flag）
