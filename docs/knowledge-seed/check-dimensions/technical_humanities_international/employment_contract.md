---
slug: check-technical-humanities-international-employment-contract
title: "雇用契約 / 派遣 / 業務委託 / 試用期間"
visa_type: technical_humanities_international
dimension_key: employment_contract
dimension_version: 1
priority: must_see
expiry_days: 90
estimated_read_time_minutes: 4
scenario_tags: [续签前, 工作变动, 刚换工作]
applies_to: [技人国]
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
- 在留資格 与 雇用形态 / 業務内容 不一致 = 資格外活動 风险 / 不許可。
- 業務委託・フリーランス：原则不属于「就労系」资格的活动；个別确认。
- 派遣：派遣先 業務 必须仍在原 在留資格 認定的活动范围内；不能借派遣绕开活动限制。
- 試用期間：续签时点位于 試用期間 内 = 雇用安定性 评价低。
- 技人国 特定差异：業務内容 必须落在 技術 / 人文知識 / 国際業務 三领域。業務委託・フリーランス + 業務内容 偏离三领域 = 不許可 高发。試用期 内续签 = 在留期間 短期化常见（1 年→1 年继续，而非 3 年 / 5 年）。

## 判断标准
- **绿**：直接雇用（正社員 / 契約社員）+ 業務内容 一致 + 不在 試用期間
- **黄**：派遣 OR 試用期間 中 OR 業務内容 不确定
- **红**：業務委託 / フリーランス + 偏离原 在留資格

## 处理建议
### 绿
档案归档 雇用契約書 + 直近 給与明細 + 在職証明書。续签前 90 天复检。

### 黄
1. 派遣 case：准备 派遣元 + 派遣先 双方 雇用契約書 + 業務指示書 / 派遣個別契約書 副本。確認 派遣先 業務 仍属 技術 / 人文知識 / 国際業務。
2. 試用期間 case：尽量在续签时点已转正；提供 試用期間 終了見込 / 正社員 採用通知。
3. 業務内容 不确定：申请「就労資格証明書」事前确认（手数料 1,200 円）。

### 红
1. 業務委託 / フリーランス + 業務内容 偏离三领域 = 資格外活動 嫌疑。
2. 评估转 在留資格（如 高度専門職 / 経営・管理）或调整业务内容回三领域。
3. 建议咨询行政書士。TEBIQ 提供专业咨询服务（[预约](/consultation)）。

## 相关材料
- 雇用契約書 / 業務委託契約書 / 派遣個別契約書
- 直近 給与明細（12 个月）
- 在職証明書 / 内定通知書
- 派遣元 業務指示書（派遣 case）
- 就労資格証明書（如有事前申请）
- 試用期間 終了通知 / 本採用通知

## 价值 expiry 说明
expiry_days = 90。雇用契約 一般 1 年以上，但 試用期間 / 派遣 案件 / 業務内容 调整可能高频变化，90 天内复检稳。
