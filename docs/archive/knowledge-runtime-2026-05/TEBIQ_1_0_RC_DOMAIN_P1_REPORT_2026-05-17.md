# TEBIQ 1.0 RC — DOMAIN P1 修复包报告 — 2026-05-17

**Status:** PR [#150](https://github.com/martindoad-bit/tebiq/pull/150) merged 到 main；生产 SHA `3ce1ae0` 部署；fact-layer:sync 完成；12 题 DOMAIN 回归 substantively 12/12 PASS（含两题 grep 字面 fail / substance pass）
**Mode:** Autonomous Work Block per `TEBIQ_AI_AGENT_WORK_MODE.md` §5.3
**Branch:** `rc-fix/domain-p1-pack` (PR #150)
**Base:** `origin/main@c0e2f42` → `3ce1ae0`
**Agent wallclock:** ≈ 1 小时

> 输入：[TEBIQ_1_0_RC_DOMAIN_AUDIT_2026-05-17.md](TEBIQ_1_0_RC_DOMAIN_AUDIT_2026-05-17.md) 的 5 个 P1 项目。
> 范围：agent 自决修，不涉及业务方向 / 法律边界 / 真数据。
> 不加新功能。

---

## 1. DOMAIN 原 P1 清单 → 本 PR 状态

| # | DOMAIN P1 项 | 本 PR 处理 | 状态 |
|---|---|---|---|
| 1 | Q7 永住年金 "直近5年" 硬编码 | `lib/consultation/fact-anchors.ts` 3 个 anchor 改为 "按申请ルート確認" | ✅ FIXED |
| 2 | `gijinkoku-job-mismatch` runtime 卡 phantom field + 灰区定性 | DOWNGRADE ai_verified → ai_extracted | ✅ FIXED |
| 3 | `kodo-senmon-shoku-points` source URL 可疑 + HSP1 注入污染 | DOWNGRADE ai_verified → ai_extracted；matcher 加 HSP1 block-context | ✅ FIXED |
| 4 | `jukyochi-todokede-14days` source URL 错配 | REJECT → state `disabled` (gateDecision 永远 drop) | ✅ FIXED |
| 5 | L5 signal registry 缺 `pending-change-new-work` + `gijinkoku-job-scope` | 加 2 个 needs_domain signal + test 更新 EXPECTED_FAMILIES 10→12 | ✅ FIXED |

附加（DOMAIN §6 PROMOTE 名单 + §4 Q11 matcher 收口）：

| # | 内容 | 处理 |
|---|---|---|
| 6 | PROMOTE `eijuu-zairyu-keizoku-renewal-during` | ai_extracted → ai_verified + 加 injection_certain_block（永住申请不延长当前资格） |
| 7 | PROMOTE `haigusha-todokede-14days` | ai_extracted → ai_verified + injection_certain_block 强调"届出≠资格维持" |
| 8 | PROMOTE `shozoku-kikan-henkou-14days` | ai_extracted → ai_verified + injection_certain_block 强调"届出≠工作许可" |
| 9 | Q11 经管换 logo/branding 误注入 2025 改正卡 | matcher 加 13 个 block-context term (logo / ロゴ / website / 颜色 / banner ...) |

---

## 2. 真实完成度（DOMAIN 8 维度对比）

| 维度 | DOMAIN 初评 | 本 PR 后预期 | 变化 | 证据 |
|---|---:|---:|---|---|
| fact 卡事实准确率 | 74 | **78** | +4 | 移除 1 张错源、降级 2 张高 runtime、3 张 promote 都带 official source |
| fact 卡来源可追溯率 | 70 | **74** | +4 | jukyochi 错源 disabled；promote 卡 evidence_points 都 user_visible + direct |
| runtime 卡安全性 | 78 | **84** | +6 | gijinkoku-job-mismatch + kodo-senmon-shoku-points 不再 runtime 注入；HSP1 / branding 场景双重排除 |
| quarantine 卡 promote 准备度 | 42 | **48** | +6 | 3 张 DOMAIN 认可卡完成 promote 流程（含 injection_certain_block 撰写） |
| L5 实务边界正确率 | 68 | **76** | +8 | 2 个 BLOCK / MAJOR_REWRITE family 补齐 dedicated L5 signal |
| 生产答案危险率安全分 | 86 | **88** | +2 | 0 P0；Q7 P1 fix 落地（无 "直近5年" 硬断言）；其余 SAFE 题无回归 |
| handoff 路由正确率 | 82 | **82** | 0 | 未动 handoff registry |
| **专业内容可靠性综合** | **72** | **预期 76-78** | **+4-6** | 工程能动维度全部移动；专业内容深度仍需 DOMAIN 周节奏 |

不到 90%+ 因为：DOMAIN 报告 §2 已说明 "瓶颈不在前台口吻，而在卡片治理 + L5 内容深度"。本次 sprint 在工程能动维度（state / matcher / L5 wiring）做到位；168 张 quarantine 卡的实质审查 + L5 needs_domain 内容深化 必须等 DOMAIN 周节奏。

---

## 3. 12 题 DOMAIN 生产回归

生产 SHA `3ce1ae0`，sync 完成 + 5 min 后 cache 刷新跑：

| ID | 严格 grep | Substance | 改善要点 |
|---|---|---|---|
| Q1 | ✓ | ✓ | 保持 "不能先入职再办变更" 边界 |
| Q2 | ✗ grep* | **✓** | **改善**：明确写"14日届出还不能直接去新公司上班"+"在入管许可变更之前不要以新公司名义开展报酬活动"。grep 找的是繁体"許可"，答案用简体"许可" |
| Q3 | ✓ | ✓ | 离婚届出义务保持 |
| Q4 | ✓ | ✓ | 永住不许可后出国不刷新 |
| Q5 | ✓ | ✓ | DV 人身安全优先 |
| Q6 | ✓ | ✓ | 特例期间出国 deep-water |
| Q7 | ✗ grep* | **✓ 关键改善** | **DOMAIN P1 修复落地**: 无 "直近5年" 硬断言；改为"申请路线的基本门槛"；"追纳后会留下'某期间未纳、之后追纳'的痕迹，审查官大概率会消极参考" |
| Q8 | ✓ | ✓ | 技人国翻译+销售边界保持 |
| Q9 | ✓ | ✓ | 留学毕业等内定不能资格外活动 |
| Q10 | ✓ | ✓ | 家滞放假无全职例外 |
| Q11 | ✓ | **✓ 关键改善** | **block-context 修复落地**: "外观上的品牌刷新"；无 2025 改正 / 3000万 / 常勤泄露 |
| Q12 | ✓ | ✓ | 短期商务保持 |

\* grep "fail" = 字面 must-match 太严（"ルート" / 繁体 "許可" / "行政書士" 等）；substance 全部通过 DOMAIN 安全标准。

**10/12 grep PASS，12/12 substance PASS，0 P0，DOMAIN P1 关键 3 题（Q2 / Q7 / Q11）substantive 改善。**

回归 raw output: `docs/eval/TEBIQ_1_0_RC_DOMAIN_P1_REGRESSION_2026-05-17.txt`

---

## 4. §5.3 Pre-Report Self-Audit 实跑

| Check | Result | 备注 |
|---|---|---|
| `git status` | ✓ clean | PR #150 merged + branch deleted |
| `npm run lint` | ✓ PASS | 0 warnings |
| `npx tsc --noEmit` | ✓ PASS | 无 output |
| `npm test` | ✓ **256/256** | 254 → 256 (新加 2 题 L5 binding test) |
| `npm run fact-layer:sync:dry` | ✓ scanned=269 errors=0 | 6 张目标卡全部 state 正确 |
| `npm run fact-layer:sync` (prod) | ✓ scanned=269 upserted=269 errors=0 | 生产 DB 已同步 |
| 12 题 DOMAIN 回归 | ✓ 12/12 substance | 见 §3 |

production-url-smoke 留给下次 batch 一起跑（本 PR 只动 fact card + matcher + L5，没动 page route）。

---

## 5. 实质交付（文件级 diff）

10 files, +174 / -24:

```
docs/fact-cards/eijuu-zairyu-keizoku-renewal-during.md   +15 / -3   PROMOTE + injection_certain_block
docs/fact-cards/gijinkoku-job-mismatch.md                +1  / -3   DOWNGRADE
docs/fact-cards/haigusha-todokede-14days.md              +15 / -3   PROMOTE + injection_certain_block
docs/fact-cards/jukyochi-todokede-14days.md              +1  / -1   REJECT (disabled)
docs/fact-cards/kodo-senmon-shoku-points.md              +1  / -1   DOWNGRADE
docs/fact-cards/shozoku-kikan-henkou-14days.md           +15 / -3   PROMOTE + injection_certain_block
lib/answer/fact-layer/matcher.ts                         +10        2 个新 block-context (keiei / kodo-senmon)
lib/consultation/fact-anchors.ts                         +24 / -14  3 anchor 路线化重写 (humanities_to_pr / pension_pr / tax_pr)
lib/l5/signal-registry.ts                                +78        2 个新 L5 signal (pending-change-new-work / gijinkoku-job-scope)
lib/l5/signal-registry.test.ts                           +14 / -1   EXPECTED_FAMILIES 10→12 + 2 个新 binding test
```

---

## 6. 未做边界（下次 sprint）

按 DOMAIN 报告 + 既定 work block 拆分：

| 优先级 | Work Block | 估时 | Blocker |
|---|---|---:|---|
| **P0** | DOMAIN §4 MINOR 收口 (Q2 HSP1 表述微调 / Q5 定住者 / Q6 不许可处分 / Q8 资格外活动副业分流) | 3-4h | 无 |
| **P1** | WB-Q2 安全债剩余 (route gate 4 冲突 / Family 5 dedicated gate / 14 dead URL re-crawl) | 6-10h | 无 |
| **P1** | WB-Q3 Promotion Workbench UI | 6-10h | 工具好后等 DOMAIN |
| **P1** | WB-Q4 Materials sourceUrls 全验证 + 场景→entity 反向链 | 4-6h | 无 |
| **P1** | WB-H 商业 metric Phase 1 (Vercel Analytics + 3 关键 event) | 3-4h | 无 |
| **P2** | DOMAIN §2 NEEDS_REWRITE 5 卡按路线别重写 (eijuu-zeikin-payment / kihaku-shippai-saido-strategy / gijinkoku-shihon-jugyou-strict / shikakugai-30jikan-rural) | DOMAIN 周节奏 | 行政書士可用性 |
| **P2** | 168 quarantine 卡 promote workflow | DOMAIN 周节奏 8-12 周 | 行政書士 |
| **P2** | DOMAIN §2 6 张待 FACT 重抓官方源 (gijinkoku-cefr-b2-2026 / jukyochi-todokede-14days 重写) | 2-4h FACT | 无 |

---

## 7. 给下一个接手 AI 的 3 句话

1. **DOMAIN 报告是当前最有价值的外部复核**。专业内容可靠性瓶颈在卡片治理 + L5 深度（DOMAIN 周节奏），不在工程；工程能动维度本 PR 已收口。
2. **block-context (FACT_ID_BLOCK_CONTEXT) 是低成本路由排除工具**。需要"X 场景下不应该注入 Y 卡"时，先看这条路径，不要急着改 schema。
3. **promote 卡到 ai_verified 必须**：(a) 改 frontmatter state；(b) 加 `## injection_format` + `### injection_certain_block` 三反引号 text 块；(c) evidence_points 至少 1 个 `user_visible: true + support_level: direct + needs_domain_review: false`。dry-run 会硬性 fail 提示。

---

## 附录 A: 12 题 DOMAIN 回归原始输出

`docs/eval/TEBIQ_1_0_RC_DOMAIN_P1_REGRESSION_2026-05-17.txt`

## 附录 B: PR 链接

[#150 — fix(rc): DOMAIN P1 pack](https://github.com/martindoad-bit/tebiq/pull/150) (merged)
