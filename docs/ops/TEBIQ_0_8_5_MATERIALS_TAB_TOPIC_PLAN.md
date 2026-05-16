# TEBIQ 0.8.5 Materials Tab Topic Plan

**Status:** plan / pre-implementation
**Owner:** Codex Production Lead (Materials/Product window)
**Created:** 2026-05-16
**Consumers:** ENGINE, CODEXUI, FACT, DOMAIN, AQL, QA, Product Copy
**Scope:** Program 3 of `docs/ops/TEBIQ_1_0_SIX_ENGINEERING_ROADMAP.md`

This is a planning document. It does **not** modify
`lib/quick-reference/topics.ts` or any runtime file. It defines what new or
expanded topics the Materials Tab needs in order to satisfy the 1.0 Roadmap §5
list (10-15 priority topics) and the FACT RC support report §6 (materials packs
needed before the 56-question expansion).

Source inputs:

- `docs/ops/TEBIQ_1_0_SIX_ENGINEERING_ROADMAP.md` §5
- `docs/product/TEBIQ_QUICK_REFERENCE_SPEC.md`
- `docs/ui/TEBIQ_0_8_MATERIALS_TAB_PRODUCT_UI_PLAN.md`
- `lib/quick-reference/topics.ts` (current 13 topics)
- `lib/quick-reference/topics.test.ts` (contract tests)
- `docs/ops/TEBIQ_0_8_5_FACT_RC_SUPPORT_REPORT.md` §6
- `docs/product/TEBIQ_COPY_CANON.md`
- `docs/product/TEBIQ_PRODUCT_UI_GUARDRAILS.md`

---

## 1. Inventory: Roadmap Required vs Current

Roadmap §5 lists 12 priority families. FACT §6 adds 4 more materials-pack
requests. The current `lib/quick-reference/topics.ts` has 13 topics.

Legend: **OK** = topic exists and reasonably covers the family;
**partial** = topic exists but does not match the §5 / §6 ask (often because
the existing topic is a notification trigger, not a materials checklist);
**missing** = no topic.

| # | Roadmap §5 / FACT §6 family | Current topic id(s) | Status | Action |
|---:|---|---|---|---|
| 1 | 搬家 / address change | `address-change` | OK | Keep. Add cross-link to new resident-tax / national-tax topics. |
| 2 | 换工作 / 所属机关届出 | `job-change` | OK | Keep. Add cross-link to new 技人国/経営管理 renewal topics. |
| 3 | 技人国 renewal / change materials | (none, only `job-change` notification) | **missing** | New topic `gijinkoku-renewal-materials` (P0). |
| 4 | 経営管理 renewal / change materials | (none) | **missing** | New topic `keiei-kanri-renewal-materials` (P0, deep-water flagged). |
| 5 | 家族滞在 renewal materials | (none) | **missing** | New topic `family-stay-renewal-materials` (P0). |
| 6 | 日本人配偶者 renewal + 离婚/再婚 boundary | (none, only `spouse-divorce-separation` fact card) | **missing** | New topic `japanese-spouse-renewal-materials` (P0); separation/DV stays deep-water bridge. |
| 7 | 留学 renewal materials | (none) | **missing** | New topic `student-renewal-materials` (P0). |
| 8 | 永住 application materials | (none, only `permanent-resident-card-renewal` for card) | **missing** | New topic `permanent-residence-application-materials` (P0). Distinct from `permanent-resident-card-renewal`. |
| 9 | Resident tax certificate (課税証明書 / 納税証明書 住民税) | `tax-certificate` (mixes住民税 + 国税) | **partial** | **Split.** Keep `tax-certificate` as a router page or rename; create `resident-tax-certificate-materials` (P0). |
| 10 | National tax certificate `その3` (納税証明書その3) | (none, folded into `tax-certificate`) | **missing** | New topic `national-tax-certificate-sono3-materials` (P0). FACT §1 P0 gap. |
| 11 | 年金 / 社会保险 documents | `pension-after-leaving-job`, `health-insurance-after-leaving-job` | **partial** | These are离职 trigger topics. Add new topic `pension-social-insurance-proof-materials` (P1) for the申请-side proof flow (年金記録, 領収証書, 納付証明). |
| 12 | 通知 / 补充材料 / 不许可 response | (none, only `renewal-review-factors` is generic) | **missing** | New topic `immigration-notice-supplement-response` (P0, source-only / deep-water bridge). |
| 13 | 在留卡 loss | `card-loss` | OK | Keep. |
| 14 | 在留卡 携带义务 | `card-carry` | OK | Keep. |
| 15 | みなし再入国 | `deemed-reentry` | OK | Keep. |
| 16 | 资格外活动 (打工) | `part-time-permission` | OK | Keep. |
| 17 | 公司外国人雇用届出 | `foreign-employment-notification` | OK | Keep. (Edge: not in §5 list but kept; useful for B2B questions.) |
| 18 | 永住卡更新 | `permanent-resident-card-renewal` | OK | Keep. Cross-link to new `permanent-residence-application-materials`. |
| 19 | 续签综合判断 | `renewal-review-factors` | OK | Keep as the综合 explainer. Cross-link to all new renewal-materials topics. |
| 20 | 帰国 admin materials (FACT §6) | (none, `kitaku-tetsuzuki` fact card exists) | **missing** | New topic `return-home-administrative-materials` (P1). |

### Inventory summary

- **OK:** 9 topics (`address-change`, `card-loss`, `card-carry`, `job-change`,
  `retirement-risk`, `deemed-reentry`, `health-insurance-after-leaving-job`,
  `pension-after-leaving-job`, `part-time-permission`,
  `foreign-employment-notification`, `permanent-resident-card-renewal`,
  `renewal-review-factors`).
- **Partial / to be split:** 1 (`tax-certificate` → split住民税 + 国税).
- **Missing:** 9 new topics needed for 1.0.
- **Total after expansion:** 13 → 22 topics. Within roadmap §5 budget
  (10-15 priority new families) once split + return-home are counted.

### Topics to merge / split

- **Split** `tax-certificate` (current id) into two siblings:
  - `resident-tax-certificate-materials` (住民税 課税/納税証明書, market town window)
  - `national-tax-certificate-sono3-materials` (国税 納税証明書 その3, 税務署/e-Tax)
  - Keep the old id `tax-certificate` as an alias-redirect router page for the
    next release to avoid breaking external links and answer-bridge fact-card
    references. ENGINE note in §4.
- **Do not merge** `card-loss` / `card-carry` / `permanent-resident-card-renewal`.
  Their user motives are distinct (lost / forgotten / expiring).
- **Do not merge** `job-change` / `retirement-risk`. They serve different
  user states (still有公司 vs no公司).
- `pension-after-leaving-job` and `health-insurance-after-leaving-job` stay
  separate; the new `pension-social-insurance-proof-materials` covers the
  申请-side proof use case (永住, 续签 cite years of payment), not 离职 switch.

---

## 2. Per-Topic Plan (NEW or to-be-EXPANDED)

For each topic the implementation block below specifies:

- **id / 适用对象 / 主要场景**
- **Required sections** (per UI plan §3 "Scenario Card Expanded"):
  适用对象 / 材料清单 / 谁准备 / 去哪取 / 时机·有效期 / 条件性材料 /
  常见误区 / 相关跳转 / 问 TEBIQ 桥
- **factCardIds** (referenced existing fact cards)
- **relatedTopicIds** (cross-links)
- **Source locator** (FACT-supplied URLs; mark `FACT-pending` when missing)
- **Copy do / don't** (Copy Canon §3, UI plan §5)
- **Order** P0 (RC must-have) / P1 (post-RC, before 1.0 cut)

---

### 2.1 `gijinkoku-renewal-materials` — 技人国 续签材料  (P0)

- 适用对象: 持「技術・人文知識・国際業務」在留资格、即将更新的人。
- 主要场景: 续签前确认要带哪些材料、雇主该出哪些、自己该准备哪些。
- 必要 sections:
  - 适用对象: 在职 + 公司类别已知；公司类别 不明 → 走 ask 桥。
  - 材料清单: 在留期間更新申请书、写真、护照+在留卡、雇用契约 / 在职证明、最新课税·纳税证明、登记事项证明书 / 决算文件 (按公司类别)、岗位说明 / 业务实绩。
  - 谁准备: 公司 vs 本人分列；公司类别 1·2·3·4 决定提交分量。
  - 去哪取: 课税·纳税证明 → 市区町村；登記事項証明書 → 法務局；雇用契约 → 公司。
  - 时机·有效期: 期限満了的 3 个月前可申请；课税证明通常最新年度。
  - 条件性材料: 中途换公司、副业、产假/育儿假期间收入下降。
  - 常见误区: 把"提交了材料"当作"已许可"；把雇用契约 = 入管已认可岗位。
  - 相关跳转: `job-change`, `tax-certificate`/`resident-tax-certificate-materials`,
    `renewal-review-factors`.
  - 问 TEBIQ 桥: 「我做的是X业务，不确定是不是技人国范围内」。
- factCardIds: `gijinkoku-koushin-shorui`, `gijinkoku-job-mismatch`,
  `juminzei-kazei-shomeisho`, `zairyu-expiry-renewal-change`.
- relatedTopicIds: `job-change`, `resident-tax-certificate-materials`,
  `renewal-review-factors`, `pension-social-insurance-proof-materials`.
- Source locator: ISA「在留期間更新許可申請」技人国 ページ + カテゴリー区分表
  (FACT to confirm the exact moj.go.jp URL for the 技人国 application page and
  category 1-4 classification PDF). `FACT-pending: gijinkoku-koushin-page-url`,
  `FACT-pending: shozoku-kikan-category-table`.
- Copy do: 材料 / 材料清单 / 续签材料 / 直接依据 / 按情况 / 带着这件事提问.
- Copy don't: 速查 / 一键准备 / 一定通过 / 包过 / 必过.
- Order: **P0** (FACT §6 lists this as B01/E01 pressure).

---

### 2.2 `keiei-kanri-renewal-materials` — 経営管理 续签材料  (P0, deep-water flagged)

- 适用对象: 持「経営・管理」资格、需要更新或变更的人。
- 主要场景: 续签前先核对**官方申请书面材料**清单，但所有 2025 年改革
  细节 (资本金 3000 万、人员配置等) 由 ask / 行政书士判断，不在本页给结论。
- 必要 sections:
  - 适用对象: 已持「経営・管理」 + 公司处于运营中。
  - 材料清单: 在留期間更新申请书、护照+在留卡、登記事項証明書、
    決算書類 (B/S, P/L)、税务申告書写、課税·納税証明、事業所写真·賃貸借契約等。
  - 谁准备: 自己 + 公司财务 / 税理士 / 行政书士。
  - 去哪取: 法務局、税務署、市区町村。
  - 时机·有效期: 期限满了的 3 个月前可申请；最新决算期文件。
  - 条件性材料: 公司 2 期内、公司业绩下滑、变更事業所、解雇员工。
  - 常见误区: 「资本金 500 万还在适用」、「材料齐 = 续签必过」、
    把 2025 改革过渡期当作"老人不变"。
  - 相关跳转: `tax-certificate`/`resident-tax-certificate-materials`,
    `national-tax-certificate-sono3-materials`, `renewal-review-factors`,
    新建 deep-water route `business-manager-2025-reform-bridge` (ask-only).
  - 问 TEBIQ 桥: 「我的公司今年决算亏损 / 雇用人数减少 / 资本金不到改革后基准」。
- factCardIds: `juminzei-kazei-shomeisho`, `eijuu-shinsei-shorui` (parallel
  reference, do **not** inject 経管 reform cards here).
- **Do NOT include** in factCardIds: `keiei-kanri-2025-10`,
  `keiei-kanri-existing-holder-update`,
  `keiei-kanri-capital-asset-3000man-criterion`,
  `startup-visa-keiei-transition`. FACT report §1 P0 says these must stay
  guardrail / quarantine, not positive-inject through Materials Tab.
- relatedTopicIds: `resident-tax-certificate-materials`,
  `national-tax-certificate-sono3-materials`, `renewal-review-factors`.
- Source locator: ISA「在留期間更新許可申請」経営管理 ページ.
  `FACT-pending: keiei-kanri-application-page-url`,
  `FACT-pending: keiei-kanri-2025-reform-official-locator`.
- Copy do: 材料清单 / 直接依据 / 按情况 / 需确认 / 建议先确认 / 带着这件事提问.
- Copy don't: 速查 / 资本金 500 万就行 / 资本金 3000 万一定要满足 /
  续签材料齐 = 一定通过 / "新规和老人不一样" 类断言.
- DOMAIN must review **before** this topic ships (high-risk family).
- Order: **P0** but with explicit DOMAIN gate: do not ship until DOMAIN signs
  off the 2025 reform deep-water bridge copy.

---

### 2.3 `family-stay-renewal-materials` — 家族滞在 续签材料  (P0)

- 适用对象: 持「家族滞在」、由配偶或父母在日工作支撑的人。
- 主要场景: 续签前确认 sponsor + 本人 + 关系证明三块材料。
- 必要 sections:
  - 适用对象: 现持家族滞在 + sponsor 在日继续工作 / 学习。
  - 材料清单: 更新申请书、写真、护照+在留卡、sponsor 在留卡和职业证明、
    sponsor 课税·纳税证明、关系证明 (婚姻 / 出生 / 户籍誊本 + 翻译)、住民票全员表示。
  - 谁准备: sponsor (大部分) + 本人 (申请书、写真、关系翻译)。
  - 去哪取: 市区町村 (住民票、课税·纳税证明)、本国机关 (婚姻/出生)、
    日本入管 (申请书)。
  - 时机·有效期: 期限满了的 3 个月前；课税证明最新年度。
  - 条件性材料: sponsor 换工作、sponsor 收入低、本人有打工 (资格外活动)、
    本人怀孕或刚出生子女。
  - 常见误区: 把 sponsor 收入低 = 必不许可；忽略本人打工时间超 28 时风险；
    把住民票世帯分离当作普通操作 (会影响关系证明)。
  - 相关跳转: `part-time-permission`, `resident-tax-certificate-materials`,
    `renewal-review-factors`, `job-change` (if sponsor 跳槽).
  - 问 TEBIQ 桥: 「sponsor 收入下降 / 我打工超过 28 时 / 我们分居住」。
- factCardIds: `kazoku-taizai-yoken`, `juminzei-kazei-shomeisho`,
  `ryugakusei-baito-28jikan`, `zairyu-expiry-renewal-change`.
- relatedTopicIds: `part-time-permission`,
  `resident-tax-certificate-materials`, `renewal-review-factors`,
  `job-change`.
- Source locator: ISA「在留期間更新許可申請」家族滞在 ページ.
  `FACT-pending: kazoku-taizai-koushin-page-url`.
- Copy do: 材料清单 / 谁准备 / 去哪取 / 按情况 / 需确认.
- Copy don't: 速查 / sponsor 收入低必不通过 / sponsor 失业必失格.
- Order: **P0**.

---

### 2.4 `japanese-spouse-renewal-materials` — 日本人配偶者 续签材料  (P0)

- 适用对象: 持「日本人の配偶者等」资格、稳定婚姻状态、需要更新的人。
- 主要场景: 仅覆盖**正常续签**材料路径；分居 / 离婚 / 再婚 / DV 走 ask 桥。
- 必要 sections:
  - 适用对象: 在婚 + 同居 (或事实同居) + 续签。
  - 材料清单: 更新申请书、写真、护照+在留卡、配偶户籍誊本、住民票
    (世帯全员表示)、配偶课税·纳税证明、本人课税·纳税证明、婚姻生活相关资料
    (家庭照、汇款记录、共同账户)。
  - 谁准备: 本人 + 配偶 + 市区町村。
  - 去哪取: 市区町村 (户籍、住民票、课税)。
  - 时机·有效期: 期限满了的 3 个月前；课税最新年度。
  - 条件性材料: 婚姻不到 3 年、出生子女、与日本配偶分居、海外长期出张。
  - 常见误区: 「分居只是暂时不会影响」、「离婚后 6 月内自动失格」=
    需要按个案确认 → 走 ask；DV 情形 → 不要联系配偶取材料，走 DV 窗口。
  - 相关跳转: `renewal-review-factors`, `resident-tax-certificate-materials`,
    `permanent-residence-application-materials`.
  - 问 TEBIQ 桥: 「我和配偶分居 / 准备离婚 / 已离婚再婚 / 涉及 DV」。
- factCardIds: `nihonjin-haigusha-visa`, `juminzei-kazei-shomeisho`.
- **Do NOT inject:** `spouse-divorce-separation` as a positive Materials card.
  FACT §2.4 says this card may state notification facts but cannot decide
  post-separation route. Use it only as the deep-water route bridge target,
  via `askPrompt`.
- relatedTopicIds: `resident-tax-certificate-materials`,
  `renewal-review-factors`, `permanent-residence-application-materials`.
- Source locator: ISA「日本人の配偶者等」更新ページ.
  `FACT-pending: nihonjin-haigusha-koushin-page-url`,
  `FACT-pending: dv-soudan-madoguchi-locator` (Cabinet Office DV sodan).
- Copy do: 材料清单 / 直接依据 / 按情况 / 需确认 / 带着这件事提问.
- Copy don't: 速查 / 分居就要离婚 / 离婚 6 月必失格 / 配偶不在场也要联系
  (DV ケース禁止).
- DOMAIN must approve the DV / separation bridge copy before ship.
- Order: **P0**.

---

### 2.5 `student-renewal-materials` — 留学 续签材料  (P0)

- 适用对象: 持「留学」资格、在語学校 / 専門学校 / 大学 / 大学院 在籍中。
- 主要场景: 续签前确认在学证明 + 出席率 + 缴费状态 + 经费支付能力。
- 必要 sections:
  - 适用对象: 在籍 + 想继续就学 (升学 / 同校续修)。
  - 材料清单: 更新申请书、写真、护照+在留卡、在学証明書、成绩证明 / 出席率证明、
    经费支付能力 (在职证明 or 银行残高 or 奖学金证明)、缴费证明。
  - 谁准备: 学校 (在学/成绩/出席) + 本人 (申请书 / 经费证明)。
  - 去哪取: 学校事务局 + 市区町村 + 银行。
  - 时机·有效期: 期限满了的 3 个月前；在学证明 / 残高证明 通常 3 个月内有效。
  - 条件性材料: 出席率低于 70-80%、留年、学校分类不同 (語学 vs 専門 vs 大学)、
    打工时间长。
  - 常见误区: 出席率低 = 一定不通过；学校换了就不算同一学籍；
    打工 28 时只在学期内适用 (长假期间另有规则)。
  - 相关跳转: `part-time-permission`, `renewal-review-factors`,
    `job-change` (毕业转技人国情况).
  - 问 TEBIQ 桥: 「我出席率不到 70% / 留年 / 想从语校升专门学校」。
- factCardIds: `ryugakusei-baito-28jikan`,
  `ryugaku-koushin-shutsusekiRitsu`, `nihongo-gakko-ryugaku`,
  `zairyu-expiry-renewal-change`.
- relatedTopicIds: `part-time-permission`, `renewal-review-factors`.
- Source locator: ISA「在留期間更新許可申請」留学 ページ.
  `FACT-pending: ryugaku-koushin-page-url`.
- Copy do: 材料清单 / 按情况 / 需确认 / 直接依据.
- Copy don't: 速查 / 出席率低必不通过 / 留年必失格.
- Order: **P0**.

---

### 2.6 `permanent-residence-application-materials` — 永住申请材料  (P0)

- 适用对象: 准备永住许可申请 (永住申请，区别于已永住者的卡更新)。
- 主要场景: 申请前确认材料范围 + 公的义务履行证明 (税 / 年金 / 社保)。
- 必要 sections:
  - 适用对象: 在留年限 / 行状要件 / 经济基础 等条件大致符合，准备申请永住。
  - 材料清单: 永住许可申请书、写真、护照+在留卡、住民票、
    课税·纳税证明 (通常 3-5 年)、納税証明書「その3」(国税)、
    年金記録 (ねんきんネット印刷 or 領収証書)、社保缴纳记录、
    身元保証書、雇用证明 / 在职证明、家庭关系资料。
  - 谁准备: 本人 (大部分) + 雇主 (在职) + 身元保证人。
  - 去哪取: 市区町村 (住民票/课税)、税务署/e-Tax (国税その3)、
    年金事务所/ねんきんネット (年金)、勤務先 (在职证明)。
  - 时机·有效期: 课税·纳税证明 通常最新 3-5 年；年金 12-24 ヶ月 缴纳记录；
    身元保证书 通常 3 个月内。
  - 条件性材料: 高度专门职、日本人配偶者 5 年特例、定住者 1 年特例、
    HSP1 80 点 1 年特例、有过年金 / 税迟纳记录。
  - 常见误区: 「材料齐 = 必通过」、「年金一直没交可以补」=补缴≠没问题、
    「跳槽多次没问题」= 行状审查会综合判断。
  - 相关跳转: `resident-tax-certificate-materials`,
    `national-tax-certificate-sono3-materials`,
    `pension-social-insurance-proof-materials`,
    `renewal-review-factors`, `permanent-resident-card-renewal`.
  - 问 TEBIQ 桥: 「我有税迟纳 / 年金漏缴 / 跳槽多次 / 配偶在海外」。
- factCardIds: `eijuu-shinsei-shorui`, `juminzei-kazei-shomeisho`,
  `eijuu-zairyu-kikan`.
- **Do NOT inject:** `eijuu-nenkin-risk` as a positive Materials card.
  FACT §1 P1 says hint-only / guardrail. Refer in checkNote without claiming
  exact lookback period.
- relatedTopicIds: `resident-tax-certificate-materials`,
  `national-tax-certificate-sono3-materials`,
  `pension-social-insurance-proof-materials`,
  `permanent-resident-card-renewal`, `renewal-review-factors`.
- Source locator: ISA「永住許可申請」.
  `FACT-pending: eijuu-shinsei-page-url`,
  `FACT-pending: eijuu-mibunsho-list-locator`.
- Copy do: 材料清单 / 直接依据 / 按情况 / 需确认 / 带着这件事提问.
- Copy don't: 速查 / 永住一定通过 / 补缴年金没事 / 跳槽多次没事.
- Order: **P0**.

---

### 2.7 `resident-tax-certificate-materials` — 住民税 課税·納税証明書  (P0, split from `tax-certificate`)

- 适用对象: 续签 / 永住 / 家族扶养 / 学校 等场合需要住民税证明的人。
- 主要场景: 知道要"住民税課税証明書 / 納税証明書"，不知道去哪开、要哪一年。
- 必要 sections:
  - 适用对象: 在日有住所 (Jan 1 在哪个市区町村是关键)。
  - 材料清单: 申请所需的本人确认资料 (マイナンバーカード or 在留卡)、
    手数料 (1 通约 200-400 円)、委任状 (代办时)。
  - 谁准备: 本人 or 代办 (家族 / 行政书士)。
  - 去哪取: 1月1日 时在住的市区町村役所 (即使现在已搬走)。
  - 时机·有效期: 通常 6 月开始可取得当年度证明；
    入管申请通常要求 3 个月内 取得 的最新版。
  - 条件性材料: Jan 1 在 A 市后搬到 B 市 → 要回 A 市开；
    マイナンバーカード コンビニ取得 (一部市区町村可)、
    e-申请 (一部市区町村可)。
  - 常见误区: 「现在住在哪就在哪开」(错: 看 Jan 1)；
    「課税証明 = 納税証明」(不同: 课税=记录所得; 纳税=记录是否缴纳)；
    要几年分要看申请类型 (永住通常 3-5 年; 续签通常最新 1 年)。
  - 相关跳转: `national-tax-certificate-sono3-materials`,
    `permanent-residence-application-materials`,
    `gijinkoku-renewal-materials`, `family-stay-renewal-materials`,
    `renewal-review-factors`.
  - 问 TEBIQ 桥: 「我中途搬过家 / 不知道要几年分 / 课税和纳税哪个该开」。
- factCardIds: `juminzei-kazei-shomeisho`, `jumin-zei-gaiyo`.
- relatedTopicIds: `national-tax-certificate-sono3-materials`,
  `permanent-residence-application-materials`,
  `renewal-review-factors`.
- Source locator: 総務省「個人住民税」(already in current `tax-certificate`).
  Per-city locator coverage is impossible; topic should explain general rule
  + link to representative example pages from 東京都/大阪市/横浜市.
  `FACT-pending: per-city-residence-tax-cert-example-urls`.
- Copy do: 課税証明書 / 納税証明書 / Jan 1 在住市区町村 / 按情况.
- Copy don't: 速查 / 现在住的地方就能开 / 课税 = 纳税.
- Order: **P0**. FACT §1 P1 + §6 list this as A06/D06/B03 pressure.

---

### 2.8 `national-tax-certificate-sono3-materials` — 国税 納税証明書 その3  (P0)

- 适用对象: 永住申请 / 经営管理続签 / 国税完税要求场合。
- 主要场景: 知道要「納税証明書 その3 (未納の税額がない証明)」，不知道去哪开。
- 必要 sections:
  - 适用对象: 有所得税 / 法人税 / 消费税 等国税缴纳记录的人。
  - 材料清单: 交付請求書、本人确认资料 (マイナンバーカード)、手数料
    (1 通 400 円，e-Tax 370 円)、委任状 (代办)。
  - 谁准备: 本人 or 税理士 / 行政书士 (委任状)。
  - 去哪取: 所辖税務署 (郵送可); e-Tax 在线申请 (有マイナンバーカード时); 不在
    市区町村 (住民税才在市区町村)。
  - 时机·有效期: e-Tax 通常数日内交付; 入管通常要求 3 个月以内取得。
  - 条件性材料: 「その3の3」(所得税·消费税のみ)、「その3の2」(法人税·消费税)、
    「その1」「その2」「その4」用途不同 → 用途要先确认；个人事业主 vs 法人代表
    → 要哪种その3 不一样。
  - 常见误区: 在市区町村开 (错: 国税在税务署); 「その3」=「その3の3」(不一定);
    没有应纳税也能开 (可，但需要在请求书写明)。
  - 相关跳转: `resident-tax-certificate-materials`,
    `permanent-residence-application-materials`,
    `keiei-kanri-renewal-materials`.
  - 问 TEBIQ 桥: 「我是个人事业主 / 法人代表 / 工薪阶层，应该取哪种 その3」。
- factCardIds: (none yet — FACT must create the 国税 その3 source-only fact card,
  per FACT §1 P0). `FACT-pending: kokuzei-shomeisho-sono3-card-id`.
- relatedTopicIds: `resident-tax-certificate-materials`,
  `permanent-residence-application-materials`,
  `keiei-kanri-renewal-materials`.
- Source locator: 国税庁「納税証明書の交付請求手続」.
  `FACT-pending: nta-sono3-page-url`,
  `FACT-pending: e-tax-sono3-page-url`.
- Copy do: 国税 / 納税証明書 / その3 / その3の3 / 税務署 / e-Tax / 按情况.
- Copy don't: 速查 / 在市役所开 / 一种证明就够.
- Order: **P0**. FACT §1 P0 gap — direct blocker for A05 / B03.

---

### 2.9 `pension-social-insurance-proof-materials` — 年金·社保 缴纳证明 (申请用)  (P1)

- 适用对象: 永住 / 帰化 / 部分续签 需要提交年金 / 社保缴纳记录证明的人。
- 主要场景: 知道要年金缴纳证明 (ねんきんネット印刷 / 領収証書)，不知道选哪种、
  能覆盖多少个月。
- 必要 sections:
  - 适用对象: 厚生年金 or 国民年金 加入者。
  - 材料清单: ねんきんネット 缴纳记录印刷 (推荐)、領収証書 / 通帳の写し
    (国民年金保险料缴纳)、社保 加入证明 (勤务先 or 年金事务所发行)、
    被保险者记录照会回答票 (从年金事务所取得)。
  - 谁准备: 本人 (ねんきんネット) / 勤务先 / 年金事务所。
  - 去哪取: ねんきんネット (オンライン)、年金事务所、勤务先。
  - 时机·有效期: 入管通常要求 24 ヶ月分 缴纳记录 (永住的标准说法)；
    通常 3 个月以内 取得。
  - 条件性材料: 海外缴纳期间 (社保协定国)、未缴期间、保险料免除·猶予期间。
  - 常见误区: 「补缴 = 没事」 (审查综合判断)；
    「免除 = 未缴」 (不同; 免除是合法状态)；
    「ねんきんネット 注册当天就能下载完整 24 ヶ月」(注册 + 数据反映有时差)。
  - 相关跳转: `permanent-residence-application-materials`,
    `pension-after-leaving-job`, `renewal-review-factors`.
  - 问 TEBIQ 桥: 「我有未缴期间 / 申请过免除 / 海外缴过」。
- factCardIds: `kokumin-nenkin-menjo`,
  `rishoku-kokumin-nenkin-kirikae`. **Do NOT inject:** `eijuu-nenkin-risk`
  as positive (FACT P1 hint/guardrail only).
- relatedTopicIds: `permanent-residence-application-materials`,
  `pension-after-leaving-job`, `renewal-review-factors`.
- Source locator: 日本年金機構「ねんきんネット」、「納付の確認」.
  `FACT-pending: nenkin-net-page-url`,
  `FACT-pending: nenkin-jimusho-shoumei-page-url`.
- Copy do: 缴纳记录 / 領収証書 / ねんきんネット / 按情况 / 需确认.
- Copy don't: 速查 / 补缴就没事 / 一定不会被审 / 24 ヶ月 必通过.
- Order: **P1** (after P0 永住 page is in).

---

### 2.10 `immigration-notice-supplement-response` — 通知 / 补充资料 / 不许可对应  (P0, deep-water bridge)

- 适用对象: 收到入管来信 / 補正通知 / 補充資料要求 / 不許可通知 的人。
- 主要场景: 不知道收到的是什么类型通知、该不该自己回 / 找专家。
- 必要 sections:
  - 适用对象: 申请中或申请后收到入管文书 (はがき / メール / 公文書)。
  - 材料清单: 入管寄来的原件、申请受理书 / 申请人编号、原申请提交材料的
    复印件、被要求的补正 / 补充资料。
  - 谁准备: 本人 + (推荐) 行政书士 / 弁護士。
  - 去哪取: 入管 (通知) + 申请时的雇主 / 学校 (补正所需材料)。
  - 时机·有效期: 補正 通常有指定回复期限 (常见 14 日 / 1 ヶ月);
    特例期間 (申请中持原资格继续) 与处分日的关系要按个案算。
  - 条件性材料: 不同类型通知对应不同 (はがき = 受理通知 vs 处分通知;
    メール = 数字化通知; 公文書 = 正式处分)；不许可需要走再申请，不是上诉。
  - 常见误区: 「忽略不回也没事」(可能 deemed取下/不许可);
    「不许可後 不能上诉所以没办法」(可再申请，但要分析理由);
    「电邮看起来像钓鱼」(确实有钓鱼，但官方通知也用电邮 → 看是否有受付番号)；
    「特例期間 内一定可以正常生活」(就业 / 出国 有限制)。
  - 相关跳转: `renewal-review-factors`, `deemed-reentry`.
  - 问 TEBIQ 桥: 「我收到一份不知道是什么的通知」(prefilled with 通知类型 + 在留状态)。
- factCardIds: (none yet, all route-only). FACT §1 P0 says create
  source-only notice taxonomy + nonpermission pack. `FACT-pending:
  immigration-notice-taxonomy-card-id`, `FACT-pending:
  nonpermission-no-appeal-pack-card-id`.
- relatedTopicIds: `renewal-review-factors`, `deemed-reentry`,
  `permanent-residence-application-materials` (if 不许可后再申请永住).
- Source locator: ISA「申請手続関係」「不許可となった場合」.
  `FACT-pending: isa-tsuchi-taxonomy-page-url`,
  `FACT-pending: isa-fukyokakgo-saichinsei-page-url`.
- Copy do: 收到通知 / 补正 / 補充資料 / 按情况 / 建议先确认 / 带着这件事提问.
- Copy don't: 速查 / 一定能补救 / 不许可后没办法 / 自己回就够.
- DOMAIN must approve before ship — this is a P0 deep-water family.
- Order: **P0**.

---

### 2.11 `return-home-administrative-materials` — 帰国前后的行政手续  (P1)

- 适用对象: 决定 (或考虑) 永久回国的人。
- 主要场景: 帰国前后要办的市役所 / 税务 / 年金 / 雇用 / 在留卡 返納 等。
- 必要 sections:
  - 适用对象: 计划离日不再回 (与 みなし再入国 短期回国不同)。
  - 材料清单: 转出届、住民税納税管理人届出、年金 脱退一時金 申请、
    雇用保险给付、在留卡返納、银行 / 携帯解约。
  - 谁准备: 本人 (大部分) + (可选) 纳税管理人。
  - 去哪取: 市区町村、年金事务所 / 駐日大使館、Hello Work、
    机场入管 (在留卡返納)。
  - 时机·有效期: 出国前 14 日内办转出届; 在留卡 返納 在出国时机场办;
    脱退一時金 通常出国后 2 年以内申请。
  - 条件性材料: 国保 / 国民年金 缴纳清算、住民税未払分 → 纳税管理人;
    带子女回国 → 出生证明 / 学籍移管。
  - 常见误区: 「出国就可以不管住民税」(错 → 1月1日 在住产生当年度住民税);
    「在留卡可以带回国」(不行: 一般出国时返納);
    「脱退一時金 自动入账」(需要主动申请)。
  - 相关跳转: `address-change`, `pension-after-leaving-job`,
    `health-insurance-after-leaving-job`, `deemed-reentry`
    (区分 みなし vs 永久回国).
  - 问 TEBIQ 桥: 「我打算 X 月回国，不知道顺序怎么排」。
- factCardIds: `kitaku-tetsuzuki`, `jumin-zei-shutsukoku`,
  `nenkin-dattai-ichijikin`.
- relatedTopicIds: `address-change`, `pension-after-leaving-job`,
  `health-insurance-after-leaving-job`, `deemed-reentry`.
- Source locator: 日本年金機構「脱退一時金」、ISA「出国時の在留カード返納」、
  各市区町村「転出届」.
  `FACT-pending: nenkin-dattai-page-url`,
  `FACT-pending: isa-zairyu-card-shutsukoku-henno-url`.
- Copy do: 帰国 / 永久帰国 / 転出届 / 納税管理人 / 按情况.
- Copy don't: 速查 / 一走了之没事 / 在留卡可以留作纪念.
- Order: **P1**.

---

## 3. Implementation Order

| Order | Topic id | Owner gate | Notes |
|---:|---|---|---|
| P0-1 | `national-tax-certificate-sono3-materials` | FACT card + Copy | Cleanest unblock for A05/B03; no DOMAIN gate. |
| P0-2 | `resident-tax-certificate-materials` | Copy + ENGINE split | Routing migration from `tax-certificate`. |
| P0-3 | `gijinkoku-renewal-materials` | FACT URL + Copy | Cards already exist. |
| P0-4 | `family-stay-renewal-materials` | FACT URL + Copy | Cards already exist. |
| P0-5 | `student-renewal-materials` | FACT URL + Copy | Cards already exist. |
| P0-6 | `permanent-residence-application-materials` | FACT URL + Copy + DOMAIN check on lookback claims | Cards exist; checkNote restraint required. |
| P0-7 | `japanese-spouse-renewal-materials` | DOMAIN gate (separation/DV bridge) | Must not ship without DOMAIN sign-off. |
| P0-8 | `keiei-kanri-renewal-materials` | DOMAIN gate (2025 reform) + FACT 2025 source | Must not ship until 2025 reform deep-water bridge approved. |
| P0-9 | `immigration-notice-supplement-response` | DOMAIN gate + FACT new cards | Highest risk; ship last in P0. |
| P1-1 | `pension-social-insurance-proof-materials` | FACT + DOMAIN check | After 永住 page lands. |
| P1-2 | `return-home-administrative-materials` | FACT URL | Pure procedural. |

P0 ship order minimizes blocked dependencies: pure-procedural topics first,
then renewal materials topics (existing cards), then DOMAIN-gated topics last.

---

## 4. Engineering Notes

### 4.1 No schema changes required

The `QuickReferenceTopic` interface in `lib/quick-reference/topics.ts` already
covers every field the new topics need:

- `factCardIds`, `relatedTopicIds`, `aliases`, `deadline`, `whereToGo`,
  `prepare`, `askPrompt`, `facts`, `checkNote`, `sources` (with `relation`).

No new fields needed. Optional additions (defer unless QA requests):

- `riskLevel`: 'standard' | 'deep-water' — to surface a "需要先确认" badge on
  `keiei-kanri-renewal-materials` / `japanese-spouse-renewal-materials` /
  `immigration-notice-supplement-response`. Currently the `checkNote` field
  carries that signal in copy.
- `requiresDomainReview`: boolean — internal flag for QA drift audit. Could be
  derived from `relation: 'related'` on every source in MVP.

**Recommendation:** ship the 9 new topics with the current schema. Re-evaluate
schema additions only after CODEXUI implements the deep-water badge in the
mobile UI.

### 4.2 Split / migration of `tax-certificate`

To preserve existing cross-references and `relatedTopicIds` pointing at
`tax-certificate`, do one of:

- **Option A (recommended):** keep `tax-certificate` as a thin "router" topic
  whose body is two short cards linking to `resident-tax-certificate-materials`
  and `national-tax-certificate-sono3-materials`. Migrate `relatedTopicIds`
  callers in a follow-up PR.
- Option B: delete `tax-certificate` and add `aliases` to the two new topics
  to absorb its search terms. Requires updating
  `pension-after-leaving-job.relatedTopicIds`, `address-change`,
  `renewal-review-factors`. ENGINE estimate: ~6 references to update.

Option A keeps the contract test stable and avoids a coordinated migration.

### 4.3 Test contract updates

Current `lib/quick-reference/topics.test.ts` requires:

- `factCardIds` non-empty;
- `sources` non-empty;
- `facts.length >= 2`.

The new topic `immigration-notice-supplement-response` may not have any
positive fact cards yet (FACT must create them first). Two options:

- Block this topic until FACT creates the source-only fact card; OR
- Relax the test for topics with `category: '通知/不許可'` — explicit allow-list.

**Recommendation:** block the immigration-notice topic on FACT card creation
to keep test contract uniform. This makes the FACT P0 gap visible as a
blocker, not as a test exception.

### 4.4 No runtime changes in this plan

This document does not modify `lib/quick-reference/topics.ts`. ENGINE will
implement topics in a separate PR after FACT provides the source URLs and
DOMAIN signs off the deep-water topics.

---

## 5. Open Questions for FACT / DOMAIN / Founder

### FACT (must resolve before P0 ship)

1. **`national-tax-certificate-sono3-materials`** — create the 国税 その3
   source-only fact card. Provide the 国税庁 URL and e-Tax URL.
2. **`immigration-notice-supplement-response`** — create the immigration
   notice taxonomy fact card and the nonpermission / no-formal-appeal pack
   fact card (FACT report §1 P0 gap).
3. **Per-topic ISA URL list** — provide canonical ISA application page URLs
   for: 技人国 更新, 経営管理 更新, 家族滞在 更新, 日本人配偶者 更新, 留学
   更新, 永住 申请. (Most are `nyuukokukanri07_*` or `nyuukokukanri10_*`
   under `moj.go.jp/isa/`.)
4. **`keiei-kanri-renewal-materials`** — supply the 2025 改革 official locator
   so the topic can mention the reform without injecting the quarantined
   2025-10 fact card.
5. **DV / separation bridge** for `japanese-spouse-renewal-materials` —
   supply DV 相談窓口 official URLs (内閣府 男女共同参画局 + 各都道府県
   配偶者暴力相談支援センター).

### DOMAIN (must approve before ship)

1. `keiei-kanri-renewal-materials` — approve the deep-water bridge copy and
   confirm zero positive injection of 2025 reform cards.
2. `japanese-spouse-renewal-materials` — approve the separation / DV bridge
   copy. Confirm no positive route is implied for separated / divorced /
   re-married cases.
3. `immigration-notice-supplement-response` — approve the deep-water /
   "建议找专家" boundary. Confirm no positive route for nonpermission.
4. `permanent-residence-application-materials` — approve the checkNote
   restraint on lookback period claims (don't quote exact months from
   `eijuu-nenkin-risk`).

### Founder / CEO (optional input)

1. Should `keiei-kanri-renewal-materials` ship in 0.8.5 RC at all, or be
   deferred to 1.0 with a placeholder "整理中" until DOMAIN clears the
   2025 reform copy? FACT report §2.1 strongly recommends quarantine.
2. Should `tax-certificate` migration use Option A (router page) or Option B
   (delete + alias absorption)? Option A is conservative; Option B is
   cleaner long-term.
3. Naming check: is `pension-social-insurance-proof-materials` the right id,
   or should it be `nenkin-shoumei-materials` to match the 提问 vocabulary
   used in user aliases?

### Copy (low priority, can be answered inline by Production Lead)

1. Confirm `带着这件事提问` is the canonical Ask bridge copy across all new
   topics (per `TEBIQ_COPY_CANON.md` §3 — yes).
2. Confirm `按情况` and `先确认` badges are the only allowed conditional
   labels (per UI plan §3.4 — yes).

---

## 6. Acceptance Of This Plan

This plan is acceptable when:

- the 9 new topic ids and the 2 split topic ids are reviewed by Project Lead;
- FACT acknowledges the 5 pending source items above;
- DOMAIN acknowledges the 4 review gates above;
- ENGINE confirms no schema change is required (or proposes the 2 optional
  field additions explicitly);
- the implementation order in §3 is approved.

After acceptance, ENGINE can implement topics in PR-sized batches:

- **Batch A (P0-1 to P0-2):** tax-certificate split. Smallest, lowest risk.
- **Batch B (P0-3 to P0-6):** four renewal-materials topics. Existing cards.
- **Batch C (P0-7 to P0-9):** three DOMAIN-gated topics. Ship last.
- **Batch D (P1-1, P1-2):** post-RC.

End of plan.
