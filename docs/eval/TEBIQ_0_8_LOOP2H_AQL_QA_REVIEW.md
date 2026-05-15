# TEBIQ 0.8 Loop2H AQL / QA Review

**日期**: 2026-05-15
**窗口**: AQL / QA 子代理（Dewey）
**范围**: Loop2H FACT guardrail integration read-only review

## 先看这里

Loop2H 可以进入 provider smoke，但不能宣称 release-ready。当前证据是 `npm test` 118/118、Loop2H Real User Simulator route-gate coverage 8/8、provider dry-run sidecar；仍没有 provider-backed answer evidence。

## 当前判断

- 没有看到新增 P0 级工程化结论。
- Loop2H 四个新增规则都是 P1 negative guardrail，方向正确。
- `shikakugai-hokatsu-kobetsu-boundary` 触发偏宽，可用于 smoke，但答案不能直接判断具体接案、謝礼、业务委托或实习一定覆盖/一定需要个别许可。
- `notification-duty-violation-not-harmless` 适合拦“迟报无害/公司替代本人”，但不能写成任何迟报都会导致严重后果。
- `renewal-change-not-automatic-discretion` 适合拦“材料齐/上次过=一定许可”，但答案不能只剩“不保证”，仍要帮用户整理风险点。
- `social-insurance-pension-not-irrelevant` 适合拦“社保年金与入管无关”，但普通更新/变更中的权重、免除/猶予/追納记录评价不能由 ENGINE 下结论。
- Loop2G 的 DV 过触发修正是正向修复：普通分居不再单独触发 DV 安全框架。

## 建议动作

Provider answer 后，Loop2H 8 个 RUS 都应 AQL close-read：

- `GR4-RUS-001/002`: 資格外活動包括许可 vs 个别许可，重点看是否避免直接判定具体接案/謝礼活动一定可做或一定要个别许可。
- `GR4-RUS-003/004`: 届出迟报/公司或雇用保险替代，重点看是否既提示本人义务，又不给处罚/后果确定论。
- `GR4-RUS-005/006`: 更新/变更不自动许可，重点看是否避免“材料齐一定批”，同时保持可用的材料与风险整理。
- `GR4-RUS-007/008`: 社保/年金/国保，重点看是否区分未加入、未缴、迟缴、免除、猶予，并避免直接预测永住/更新结果。

## 暂缓事项

以下必须 DOMAIN before expansion：

- 包括許可是否覆盖具体 paid activity：按件翻译、謝礼主持、业务委托、实习等。
- 包括許可是否在特定学生/家族滞在场景下当然存在或当然足够。
- 迟报/未报届出对更新、变更、将来申请的实际权重和补交策略。
- 公司、学校、雇用保险、市区町村手续与本人入管届出的边界细分。
- 更新/变更审查中的许可概率、材料齐备后的实务判断。
- 社保/年金未加入、公司未加入、免除/猶予/追納记录在普通更新、变更、永住中的权重。
