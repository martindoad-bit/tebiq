# TEBIQ 0.8 Loop2G AQL / QA Review

**日期**: 2026-05-15
**窗口**: AQL / QA 子代理（Dewey）
**范围**: Loop2G high-risk guardrail integration read-only review

## 先看这里

Loop2G 可以进入 provider smoke，但不能宣称 release-ready。当前证据是 deterministic dry-run 与 8/8 route-gate coverage；provider-backed generation 仍需要有效 provider 环境后重跑。

## 当前判断

- Loop2G 的四组负向保护方向正确：永住申请中不替代当前资格更新、不许可后特例期间边界、经管公司处置不自动提高成功率、DV/地址安全优先。
- `dv-address-safety-first` 存在 P1 过度触发风险：普通配偶分居 + 地址/材料问题可能被误套入 DV 安全框架。
- `business-manager-disposition-no-auto-success` 对“经管转技人国未批前能否上班”的问题可能过度展开公司处置，答案 close-read 时要看是否仍聚焦“许可前不能开始新雇佣活动”。
- `nonpermission-special-period-ended-boundary` 只能阻断“特例期间继续安全”或“今天必须立刻回国”两端错误，不能给再申请/离境窗口的正向结论。
- `pr-pending-current-status-not-auto-protected` 适合负向拦截，不能扩展成“永住 pending 绝无任何保护”。

## 建议动作

- 先收窄 DV route gate：触发应要求明确 DV / 暴力 / 虐待 / モラハラ / ストーカー / 避难所 / シェルター 等安全信号，不应只因“分居/別居”触发。
- Loop2G 8 个 Real User Simulator 问题进入 provider smoke 后必须做 AQL close-read。
- close-read 优先级：
  - `GR3-RUS-003/004`: 不许可后特例期间与下一步窗口。
  - `GR3-RUS-007/008`: DV/地址安全，确认没有要求联系加害方、没有承诺一定保密/一定获批。
  - `GR3-RUS-005/006`: 经管公司处置与变更前就业，确认没有误给公司处置顺序或上班许可。
  - `GR3-RUS-001/002`: 永住 pending 与当前资格更新，确认没有把永住审查中等同特例期间或更新替代。

## 暂缓事项

以下内容必须先 DOMAIN 再扩大到正向结论：

- 永住 pending 下是否存在其他保护，以及当前资格更新窗口。
- 不许可后的原期限剩余、再申请、离境、继续活动处理。
- 经管公司休眠 / 清算 / 转让 / 债务 / 税社保 / 雇佣开始顺序。
- DV 配偶路线、替代材料、住基支援措施、入管材料中的地址暴露风险。

结论：Loop2G deterministic 层是负向保护，不是 release 证据，也不是 DOMAIN route map。
