---
slug: check-spouse-employment-contract
title: "雇用契約 / 派遣 / 業務委託 / 試用期間"
visa_type: spouse
dimension_key: employment_contract
dimension_version: 1
priority: should_see
expiry_days: 90
estimated_read_time_minutes: 4
scenario_tags: [续签前, 工作变动, 刚换工作]
applies_to: [日本人配偶者, 永住者配偶者]
urgency_level: medium
questions:
  - id: q1
    text: "当前的雇用形态是？"
    type: choice  # full_time | contract | dispatch | gyomu_itaku | trial | freelance
  - id: q2
    text: "雇用契約书 / 業務委託契約書 上的 業務内容 与原 在留資格 认定的活动是否一致？"
    type: yes_no_unknown
  - id: q3
    text: "處于 試用期間 内吗？"
    type: yes_no
result_logic:
  green: "q1 IN [full_time, contract] AND q2 == yes AND q3 == no"
  yellow: "q1 IN [dispatch, trial] OR q2 == unknown OR q3 == yes"
  red: "q1 IN [gyomu_itaku, freelance] AND q2 != yes"
result_actions:
  red:
    - "業務委託 / フリーランス + 業務内容 不一致 = 高 不許可 风险"
    - "在留資格 是否符合现工作 → 建议咨询行政書士确认"
  yellow:
    - "派遣 case 准备 派遣元 / 派遣先 双方 雇用契約书 + 業務指示書"
    - "試用期間 case 提供 確認雇用 续签时点的稳定证据"
---

# 雇用契約 / 派遣 / 業務委託 / 試用期間

## 这是什么
日本就労 形态分四类：① 正社員 / 契約社員（直接 雇用）② 派遣（派遣元 + 派遣先）③ 業務委託 / 請負（无 雇用関係）④ フリーランス（个人事業主）。試用期間 通常 3-6 个月，期间 雇用契約 已成立但解雇 门槛较低。

## 为什么重要
- 配偶者 系資格 不限活动范围，雇用形态自由（正社員 / 派遣 / 業務委託 / フリーランス 均可）。
- 但 雇用安定性 直接影响「生計要件」评价：收入波动 / 试用期 / 短期派遣 = 配偶担保 评价下降。
- 永住 申请前 1-3 年频繁転職 / 长期 試用 = 「在留状況」消极要素。
- 派遣：派遣先 業務 不需符合任何活动限制（与就労系不同）。
- 業務委託 / フリーランス：可申报 個人事業主 確定申告，但收入证明 力度 弱于 給与所得。

## 判断标准
- **绿**：直接雇用（正社員 / 契約社員）+ 業務内容 一致 + 不在 試用期間
- **黄**：派遣 OR 試用期間 中 OR 業務内容 不确定
- **红**：業務委託 / フリーランス + 配偶担保 困難（双方均无稳定 給与所得）

## 处理建议
### 绿
档案归档 雇用契約書 + 直近 給与明細 + 在職証明書。续签前 90 天复检。

### 黄
1. 派遣 case：准备 派遣元 + 派遣先 雇用契約書 + 直近 給与明細。
2. 試用期間 case：尽量在续签时点已转正；提供 試用期間 終了見込 / 正社員 採用通知。
3. 業務委託 / フリーランス case：提供 確定申告書 控 + 直近 1 年 入金記録 + 取引先 業務委託契約書。

### 红
1. 配偶 担保人 也无稳定收入 = 生計要件 困難。
2. 提供 預貯金残高証明書 + 不動産登記簿 等補完証拠。
3. 建议咨询行政書士。TEBIQ 提供专业咨询服务（[预约](/consultation)）。

## 相关材料
- 雇用契約書 / 業務委託契約書 / 派遣個別契約書
- 直近 給与明細（12 个月）
- 在職証明書 / 内定通知書
- 確定申告書 控（フリーランス case）
- 配偶者 在職証明書 + 課税証明書（担保人）
- 預貯金残高証明書（補完）

## 价值 expiry 说明
expiry_days = 90。雇用契約 一般 1 年以上，但 試用期間 / 派遣 / フリーランス 收入 可能高频变化，90 天内复检稳。
