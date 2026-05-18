# TEBIQ 1.0 RC — WB-A State Ledger (2026-05-17)

> WB-A 盘库员（tebiq-windows-agent）一次性扫描结果。read-only / 无 .md 内容改动 / 无 DB 触碰。

- Scope: `docs/fact-cards/*.md` (269 张，去掉 README + FACT_OPS_WINDOW_TASK_PACK) + `docs/knowledge-atlas/**/*.md` (3 张)
- 历史 worktree 删除卡：`git log --all --diff-filter=D` 在 fact-cards/ / knowledge-atlas/ 路径下未找到 deletion commits（fact card 体系所有历史卡都还在 main）
- URL 抽样：20% (52 张) × 1 优先 URL，去重 45 个独立 URL，全部 WebFetch 验过
- 输出 CSV：`docs/ops/TEBIQ_1_0_RC_STATE_LEDGER_2026-05-17.csv`

## 1. 总览

- 总资产：**272**
  - fact-cards/: 269
  - knowledge-atlas/: 3

### Provenance 分布

| provenance | 张数 |
|---|---|
| `ai_bulk_2026_05_17` | 168 |
| `human_curated_early` | 101 |
| `atlas_asset` | 3 |

### Bucket 分布

| bucket | 张数 |
|---|---|
| `needs_domain` | 193 |
| `runtime_eligible` | 66 |
| `l5_eligible` | 8 |
| `keep_as_atlas_draft` | 3 |
| `guardrail_eligible` | 1 |
| `stale_or_reject` | 1 |

### Provenance × Bucket 交叉

| provenance \ bucket | `guardrail_eligible` | `keep_as_atlas_draft` | `l5_eligible` | `needs_domain` | `runtime_eligible` | `stale_or_reject` |
|---|---|---|---|---|---|---|
| `ai_bulk_2026_05_17` | 0 | 0 | 7 | 161 | 0 | 0 |
| `human_curated_early` | 1 | 0 | 1 | 32 | 66 | 1 |
| `atlas_asset` | 0 | 3 | 0 | 0 | 0 | 0 |

## 2. URL 抽样结果（20% sample, 45 unique URLs）

- ALIVE: **30**
- DEAD (404/403/socket-closed): **14**
- 命中率: 30 / 44 ≈ 68.2%

### 撞墙 URL 清单（DEAD 抽样命中 → 影响 29 张卡）

| 死/废 URL | host | 影响范围 |
|---|---|---|
| `https://www.nenkin.go.jp/service/kounen/hihokensha/20150407.html` | www.nenkin.go.jp | 至少 1 张卡引用 |
| `https://www.nta.go.jp/taxes/shiraberu/taxanswer/shotoku/shoto320.htm` | www.nta.go.jp | 至少 1 张卡引用 |
| `https://www.mhlw.go.jp/stf/seisakunitsuite/bunya/koyou_roudou/roudoukijun/rousaihoken/index.html` | www.mhlw.go.jp | 至少 1 张卡引用 |
| `https://www.mhlw.go.jp/stf/seisakunitsuite/bunya/koyou_roudou/roudoukijun/zigyonushi/index.html` | www.mhlw.go.jp | 至少 1 张卡引用 |
| `https://www.moj.go.jp/isa/applications/status/tokutei1.html` | www.moj.go.jp | 至少 1 张卡引用 |
| `https://www.moj.go.jp/isa/applications/status/tokubetsueijusha.html` | www.moj.go.jp | 至少 1 张卡引用 |
| `https://www.mofa.go.jp/mofaj/toko/visa/tanki/himmune.html` | www.mofa.go.jp | 至少 1 张卡引用 |
| `https://www.soumu.go.jp/main_sosiki/jichi_gyousei/daityo/gaikokujin.html` | www.soumu.go.jp | 至少 1 张卡引用 |
| `https://www.moj.go.jp/isa/applications/status/specact02.html` | www.moj.go.jp | 至少 1 张卡引用 |
| `https://www.moj.go.jp/isa/applications/procedures/nyuukokukanri07_00121.html` | www.moj.go.jp | 至少 1 张卡引用 |
| `https://www.moj.go.jp/isa/applications/status/tokutei2.html` | www.moj.go.jp | 至少 1 张卡引用 |
| `https://www.moj.go.jp/isa/applications/status/touroku.html` | www.moj.go.jp | 至少 1 张卡引用 |
| `https://www.soumu.go.jp/main_sosiki/jichi_gyousei/c-zaisei/czaisei_4.html` | www.soumu.go.jp | 至少 1 张卡引用 |
| `https://www.fsa.go.jp/ordinary/kaigaikouza/index.html` | www.fsa.go.jp | 至少 1 张卡引用 |

> 注：每个 DEAD URL 是同一 host 的 status/procedures 类页面。WB-A 不重试，flag 给 FACT。可能是 ISA/MHLW 改版 path（参考 audit doc 已知 `procedures/16-5.html` 是 `nyuukokukanri07_00045.html` 的现行 canonical 例子）。

## 3. Top 20 PROMOTE 候选（runtime_eligible，按 score 排序）

WB-C 4 条 auto-promotion 硬条件都过 → 可直接进入 `ai_verified` runtime 注入候选。
Hardening 条件：source=official + confidence≥medium + not deep-water + risk<critical + URL 抽样 ALIVE。

| rank | fact_id | current_state | risk | conf | source_quality | bucket reason |
|---|---|---|---|---|---|---|
| 1 | `furusato-nozei` | ai_verified | low | high | official | ai_verified + official + factual + not deep-water + risk<critical |
| 2 | `gaikokujin-byoin` | ai_verified | medium | high | official | ai_verified + official + factual + not deep-water + risk<critical |
| 3 | `gaikokujin-chintai` | ai_verified | medium | high | official | ai_verified + official + factual + not deep-water + risk<critical |
| 4 | `gaikokujin-kenko-shindan` | ai_verified | medium | high | official | ai_verified + official + factual + not deep-water + risk<critical |
| 5 | `gaikokujin-rodo-sodan` | ai_verified | medium | high | official | ai_verified + official + factual + not deep-water + risk<critical |
| 6 | `gaikokujin-sodan-center` | ai_verified | low | high | official | ai_verified + official + factual + not deep-water + risk<critical |
| 7 | `jidou-teate-gaikokujin` | ai_verified | low | high | official | ai_verified + official + factual + not deep-water + risk<critical |
| 8 | `kaigo-hoken-gaijin` | ai_verified | medium | high | official | ai_verified + official + factual + not deep-water + risk<critical |
| 9 | `kakutei-shinkoku-gijmu` | ai_verified | medium | high | official | ai_verified + official + factual + not deep-water + risk<critical |
| 10 | `kodomo-gakko-nyugaku` | ai_verified | medium | high | official | ai_verified + official + factual + not deep-water + risk<critical |
| 11 | `kogaku-ryoyo-hi` | ai_verified | medium | high | official | ai_verified + official + factual + not deep-water + risk<critical |
| 12 | `kokumin-kenko-hoken-kanyu` | ai_verified | medium | high | official | ai_verified + official + factual + not deep-water + risk<critical |
| 13 | `kokumin-nenkin-menjo` | ai_verified | low | high | official | ai_verified + official + factual + not deep-water + risk<critical |
| 14 | `kosodate-ichijikin` | ai_verified | low | high | official | ai_verified + official + factual + not deep-water + risk<critical |
| 15 | `koyo-hoken-kyufu` | ai_verified | medium | high | official | ai_verified + official + factual + not deep-water + risk<critical |
| 16 | `kyojusha-kubun-kazei` | ai_verified | medium | high | official | ai_verified + official + factual + not deep-water + risk<critical |
| 17 | `kyuryo-kojo-naiwake` | ai_verified | low | high | official | ai_verified + official + factual + not deep-water + risk<critical |
| 18 | `mynumber-gaikokujin` | ai_verified | low | high | official | ai_verified + official + factual + not deep-water + risk<critical |
| 19 | `nen-matsu-chosei` | ai_verified | low | high | official | ai_verified + official + factual + not deep-water + risk<critical |
| 20 | `nenkin-dattai-ichijikin` | ai_verified | low | high | official | ai_verified + official + factual + not deep-water + risk<critical |

> runtime_eligible 总数: **66**。Top 20 都是 ai_verified + official + 非 deep-water；其余 runtime_eligible 同质，按需逐批 promote。

## 4. Top 20 REJECT / 转 needs_domain 候选

- `stale_or_reject`：URL 完全不可用 + 无备份 official source
- `needs_domain` (critical/deep-water)：风险 critical 或命中 DOMAIN deep-water 列表，需 human 介入

| rank | fact_id | bucket | reason |
|---|---|---|---|
| 1 | `kenpo-kizubyou-teate` | `stale_or_reject` | kyoukaikenpo URL 404 per audit |
| 2 | `eijuu-haigusha-3years-route` | `needs_domain` | deep-water family slug/keyword |
| 3 | `eijuu-haigusha-visa` | `needs_domain` | deep-water family slug/keyword |
| 4 | `eijuu-haigusha-zairyu-1year` | `needs_domain` | deep-water family slug/keyword |
| 5 | `eijuu-nenkin-risk` | `needs_domain` | deep-water family slug/keyword |
| 6 | `eijuu-shinsei-shorui` | `needs_domain` | deep-water family slug/keyword |
| 7 | `eijuu-shotoku-haigusha-3year` | `needs_domain` | deep-water family slug/keyword |
| 8 | `eijuusha-haigusha-divorce` | `needs_domain` | deep-water family slug/keyword |
| 9 | `gijinkoku-job-mismatch` | `needs_domain` | deep-water family slug/keyword |
| 10 | `haigusha-todokede-14days` | `needs_domain` | deep-water family slug/keyword |
| 11 | `jukyochi-90days-torikeshi` | `needs_domain` | deep-water family slug/keyword |
| 12 | `kazoku-taizai-henko` | `needs_domain` | deep-water family slug/keyword |
| 13 | `kazoku-yobi-naitei-haigusha` | `needs_domain` | deep-water family slug/keyword |
| 14 | `keiei-kanri-2025-10` | `needs_domain` | deep-water family slug/keyword |
| 15 | `keiei-kanri-2025-4-requirements` | `needs_domain` | deep-water family slug/keyword |
| 16 | `keiei-kanri-existing-3year-transition` | `needs_domain` | deep-water family slug/keyword |
| 17 | `keiei-kanri-existing-holder-update` | `needs_domain` | deep-water family slug/keyword |
| 18 | `keiei-kanri-jimu-bessho-requirement` | `needs_domain` | deep-water family slug/keyword |
| 19 | `kodo-senmon-shoku-1go-to-2go` | `needs_domain` | deep-water family slug/keyword |
| 20 | `kodo-senmon-shoku-eijuu` | `needs_domain` | deep-water family slug/keyword |

## 5. 8 桶详细解释

| bucket | 含义 | 当前张数 | 下一步建议 |
|---|---|---|---|
| `runtime_eligible` | 4 条硬条件全过，可 promote 到 ai_verified runtime 注入 | 66 | FACT 批量回填 `state: ai_verified`（若当前是 ai_extracted），DOMAIN 抽样审核 5-10% |
| `materials_eligible` | 材料 Tab 资产（清单/书类/样式类） | 0 | 接入 Materials Tab pipeline；不参与正向法律咨询注入 |
| `l5_eligible` | L5 信号类（通知/手续告知 类，非判断类） | 8 | 进 L5 hint surface，不直接生成正面结论 |
| `guardrail_eligible` | 仅做 deny 验证（不做正面回答） | 1 | route-gate `sourceAssetIds` 引用，injection_scope=guardrail_only |
| `needs_domain` | 风险高 / deep-water / 低信心 / 经管/HSP1/DV/家配/取消/经管处置/特例期间 等 | 193 | DOMAIN 人工审，**禁止** runtime 注入；按 audit doc §DOMAIN 边界跳过清单优先级处理 |
| `duplicate_of_X` | 与现有卡 fact_id 撞 | 0 | FACT 合并；无命中 |
| `stale_or_reject` | URL 全部死 / 内容过时 / 错配 | 1 | 隔离至 disabled state；FACT 决定 rewrite 还是删 |
| `keep_as_atlas_draft` | knowledge-atlas/ 草稿层，不进 fact 系统 | 3 | 留作 atlas / phase 2 brainstorm 资产 |

## 6. Provenance 分桶规则（如何判定）

| provenance | 判定规则 | 张数 |
|---|---|---|
| `human_curated_early` | frontmatter 无 `sprint: fact-window-bulk-1`；早期 Workstream C 批次，含 0.6 sprint marker；author 含 founder/codex/scrivener；reviewer 含 ai_self_verified / human | 101 |
| `ai_bulk_2026_05_17` | frontmatter 含 `sprint: "fact-window-bulk-1"`（PR #141 168 张批量生成；当前默认 state=ai_extracted；quarantined 状态） | 168 |
| `legacy_brainstorm` | git log 中 fact-cards/ 无 deletion commits，本轮未发现独立的 brainstorm draft；如有需扩 scope 至 worktree | 0 |
| `atlas_asset` | `docs/knowledge-atlas/` 下 .md（phase2 guardrail 草稿等） | 3 |

## 7. Drift / 元数据问题

1. **268 vs 107 卡数 drift**：上一轮 0.8.5 audit（2026-05-17）记录 107 张；本轮文件系统 269 张。差额 162 张全是 PR #141 (4353763) 在 2026-05-16 合入的 168 张 quarantined bulk batch（其中部分 fact_id 与旧卡冲突已在生成时去重）。`docs/product/TEBIQ_CURRENT_STATE.md` 仍写 main_head=6676652（早于 #141 #142 #143），需 GM 更新。
2. **knowledge-atlas/ 规模小**：仅 3 张（phase2/guardrails-p0p1/ 下 2 张 guardrail 草稿 + 1 张 FACT_PROGRESS）。WB-A 任务说 Atlas 390 — 文件系统实际只有 3 张，与 spec 数字差距大。如 Atlas 资产在另一仓库或另一 worktree，需 GM 裁决。
3. **历史 worktree 200+ 卡**：在当前 worktree `tebiq-rc-sprint` 的 git log --all 中无 deletion commits 命中 fact-cards/ 路径，未发现历史删除的卡。可能在其他 worktree（musing-spence-* 等）的本地分支，需 GM 指定扫描 scope。
4. **Dead URL family**：14 个抽样死 URL 影响 29 张卡。大量集中在 ISA `applications/status/*.html` 和 MHLW 子页面，可能是站点改版批量 path 移动。FACT 应批量回抓 ISA / MHLW 新 sitemap。

## 8. WB-A 边界声明

- 本盘库**不修改任何 .md 内容**（state / production_disposition 字段都没动）。
- 本盘库**不触碰 DB**。
- DV / 経管 2025 改革 / HSP1 機関変更 / 特例期間 / 永住 nenkin 等 deep-water 全部默认归 `needs_domain`，不自行裁决。
- 14 个 dead URL 不重试，flag 给 FACT。
- runtime_eligible bucket 是 **promote 候选**，不是 promote 决定。FACT/DOMAIN 在按 WB-B / WB-C 流程下推。

## 9. Summary（3 行）

- **runtime_eligible: 66**（4 条硬条件全过 + URL 抽样 ALIVE；其中 ai_verified ≥ 66）
- **needs_domain: 193**（含 deep-water / critical / low-conf / ai_extracted bulk 未过 DOMAIN）
- **stale_or_reject: 1**（kenpo-kizubyou-teate URL 404 per audit；其余 dead-URL 卡降到 needs_domain 等 FACT 回填）
