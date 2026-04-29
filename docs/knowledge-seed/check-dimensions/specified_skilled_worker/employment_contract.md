---
slug: check-specified-skilled-worker-employment-contract
title: "雇用契約 / 派遣 / 業務委託 / 試用期間"
visa_type: specified_skilled_worker
dimension_key: employment_contract
dimension_version: 1
priority: must_see
expiry_days: 90
estimated_read_time_minutes: 4
scenario_tags: [续签前, 工作变动, 刚换工作]
applies_to: [特定技能 1 号, 特定技能 2 号]
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
- 特定技能 特定差异：原则上必须 直接雇用（特定技能 1 号 / 2 号）+ 受入機関 已完成 出入国在留管理庁 登録。派遣 仅 农业 / 漁業 等限定分野 例外可行；外食 / 介護 / 製造 / 建設 等通常分野 不允许 派遣。
- 業務委託 / フリーランス：完全不适用 特定技能 资格。
- 受入機関 必须签订「特定技能雇用契約」并具备 1 号特定技能外国人支援計画（1 号场合）。
- 試用期間：特定技能雇用契約 内可设 試用期間，但 報酬額 不得低于「日本人と同等以上」基準。

## 判断标准
- **绿**：直接雇用（特定技能雇用契約）+ 受入機関 登録済 + 業務内容 = 認定分野 + 不在 試用期間
- **黄**：限定分野（农 / 漁）派遣 OR 試用期間 中 OR 業務内容 確認待
- **红**：通常分野 派遣 OR 業務委託 / フリーランス OR 受入機関 未登録

## 处理建议
### 绿
档案归档 特定技能雇用契約書 + 受入機関 登録証 + 1 号支援計画 控 + 直近 給与明細。续签前 90 天复检。

### 黄
1. 限定分野 派遣 case：准备 派遣元（受入機関）+ 派遣先 双方 契約書 + 派遣個別契約書 + 派遣可分野 確認。
2. 試用期間 case：確認 報酬 不低于 日本人同等基準；提供 試用期間 終了見込通知。
3. 業務内容 不确定：申请「就労資格証明書」事前确认（手数料 1,200 円）。

### 红
1. 通常分野 派遣 / 業務委託 / フリーランス = 特定技能 在留資格 不適合。
2. 受入機関 未登録 → 立即停止就労 + 联系 出入国在留管理庁。
3. 建议咨询行政書士。TEBIQ 提供专业咨询服务（[预约](/consultation)）。

## 相关材料
- 特定技能雇用契約書
- 受入機関 登録証
- 1 号特定技能外国人支援計画書（1 号 case）
- 直近 給与明細（12 个月）
- 派遣個別契約書（限定分野 派遣 case）
- 就労資格証明書（如有事前申请）
- 試用期間 終了通知 / 本採用通知

## 价值 expiry 说明
expiry_days = 90。受入機関 登録状況 / 雇用契約 / 支援計画 在续签前必须最新；90 天内复检稳。
