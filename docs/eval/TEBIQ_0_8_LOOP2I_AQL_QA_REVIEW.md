# TEBIQ 0.8 Loop2I AQL / QA Review

**日期**: 2026-05-15
**窗口**: AQL / QA 子代理（Dewey）
**范围**: Loop2I action-boundary guardrail integration read-only review

## 先看这里

Loop2I 可以进入 provider smoke，但不能宣称 release-ready。当前证据是 `npm test` 126/126、Loop2I Real User Simulator route-gate coverage 8/8、provider dry-run sidecar；仍缺 provider-backed answer 与 AQL close-read。

## 当前判断

- 未看到新增 P0。
- Loop2I 四组新增规则都是 P1 negative guardrail，整体没有明显把 DOMAIN 实务判断直接工程化。
- `gijinkoku-work-scope-not-any-job` 方向正确，但 mixed role 容易过度保守。不能把现场、收银、包装机械判为必然违法，只能说技人国不当然覆盖，需要看主要业务、比例、原许可职务。
- `gijinkoku-startup-management-change-first` 高风险但容易踩 DOMAIN。代表取締役名义、设立法人、接单、副业、实质经营参与之间不能由 ENGINE 下结论。
- `coe-not-entry-guarantee-three-month` 负向边界稳定。电子 CoE、特殊延长或政策例外不应被硬写死。
- `renewal-filing-window-not-after-expiry` 适合拦“过期后申请也有特例期间 / 6个月前一定可交 / 临期一定安全”。same-day filing、窗口退回、材料不全、永住者在留卡更新等仍需 DOMAIN。

## 建议动作

Provider answer 后 8 个 RUS 都建议 AQL close-read：

- `GR5-RUS-001/002`: 技人国工作范围。重点看是否避免“公司安排就可以”，同时不直接断定个案违法。
- `GR5-RUS-003/004`: 技人国创业 / 经管边界。最高优先，容易把代表名义、法人设立、接单、经营管理混成简单结论。
- `GR5-RUS-005/006`: CoE 有效期 / 入国保证。看是否明确三个月、非入国保证、过期处理找受入机构确认。
- `GR5-RUS-007/008`: 更新时点 / 特例期间。看是否区分三个月窗口、期限前受理、过期后不靠特例兜底，并给出紧急行动顺序。

## 暂缓事项

以下必须 DOMAIN before expansion：

- 技人国 mixed duties 的主从比例、临时支援、长期调岗、已做范围外工作的补救。
- 技人国持有人设立法人、代表/役员名义、实际经营管理、副业接单、同时就业与创业。
- CoE 发行后 offer / school 变化、电子 CoE、过期后的重新申请 / 例外处理。
- 更新同日提交、窗口退回、材料不齐、期限后补救、永住申请 / 永住卡更新与普通更新的时点差异。

总体判断：Loop2I 作为 deterministic negative protection 已可进 provider smoke；还不是 release 证据，也不能替代 DOMAIN route map。
