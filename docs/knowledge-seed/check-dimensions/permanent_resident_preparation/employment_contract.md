---
slug: check-permanent-resident-preparation-employment-contract
title: "雇用契約 / 派遣 / 業務委託 / 試用期間"
visa_type: permanent_resident_preparation
dimension_key: employment_contract
dimension_version: 1
priority: must_see
expiry_days: 90
estimated_read_time_minutes: 4
scenario_tags: [永住申请前, 续签前, 工作变动]
applies_to: [准备申请永住者]
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
- 永住 申请审查重点之一是「在留状況」+「独立生計」，雇用安定性 直接体现两者。
- 5 年内（高度専門職 1 / 3 年内）频繁転職、長期 試用、業務委託 為主 = 「在留状況」消极要素。
- 在留資格 与 雇用形态 / 業務内容 不一致 = 資格外活動 风险，永住 申请前一旦发生 = 致命瑕疵。
- 派遣：派遣先 業務 必须仍在原 在留資格 認定的活动范围内；不能借派遣绕开活动限制。
- 業務委託 / フリーランス：原则不属于「就労系」资格的活动；个別确认。
- 一般经验：永住 申请前 1-3 年 同一雇主 + 正社員 + 业务稳定 最优。

## 判断标准
- **绿**：直接雇用（正社員）+ 業務内容 一致 + 不在 試用期間 + 同一雇主 1 年以上
- **黄**：派遣 OR 試用期間 中 OR 過去 5 年内有 6 个月以上空白期 / 频繁転職
- **红**：業務委託 / フリーランス + 偏离原 在留資格

## 处理建议
### 绿
档案归档 過去 5 年 雇用契約書 + 在職証明書 + 課税証明書。继续保持稳定。永住 申请前 90 天复检。

### 黄
1. 派遣 case：准备 派遣元 + 派遣先 双方 雇用契約書 + 業務指示書。
2. 試用期間 case：等待 試用 終了 + 正社員 採用 后再申请永住。
3. 频繁転職 case：补充「転職理由書」+ 直近 1 年安定雇用 证明。

### 红
1. 業務委託 / フリーランス + 業務内容 偏离原資格 = 過去 在留状況 瑕疵。
2. 先解决現職 在留資格 整合性，1-3 年稳定后再申请永住。
3. 建议咨询行政書士。TEBIQ 提供专业咨询服务（[预约](/consultation)）。

## 相关材料
- 過去 5 年 雇用契約書（全雇主）
- 在職証明書 / 退職証明書（前職含む）
- 直近 12 个月 給与明細
- 課税証明書 + 納税証明書（過去 5 年）
- 就労資格証明書（如有事前申请）
- 試用期間 終了通知 / 本採用通知
- 転職理由書（频繁転職 case）

## 价值 expiry 说明
expiry_days = 90。永住 申请要求长期稳定记录，雇用形态 / 業務内容 调整需立即重新评估申请时点。
