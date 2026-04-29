---
slug: check-technical_humanities_international-entry-exit-record
title: "出入国记录 / 连续居住"
visa_type: technical_humanities_international
dimension_key: entry_exit_record
dimension_version: 1
priority: normal
expiry_days: 30
estimated_read_time_minutes: 3
scenario_tags: [续签前, 出国前, 出国频繁, 想长期定居]
applies_to: ["技人国"]
urgency_level: low
questions:
  - id: q1
    text: "过去 1 年单次出国是否有超过 90 日？"
    type: yes_no_unknown
  - id: q2
    text: "过去 1 年累计出国是否超过 100 日？"
    type: yes_no_unknown
  - id: q3
    text: "出国时全部办理了 再入国許可（含 みなし再入国）吗？"
    type: yes_no_unknown
result_logic:
  green: "q1 == no AND q2 == no AND q3 == yes"
  yellow: "q1 == unknown OR q2 == unknown OR q3 == unknown"
  red: "q1 == yes OR q2 == yes OR q3 == no"
result_actions:
  red:
    - "单次 / 累计超期 → 续签 / 永住 連続性 受影响，建议咨询行政書士"
    - "未办再入国許可 → 在留資格 已自动失效（含 永住）"
  yellow:
    - "向 出入国在留管理庁 申请「出入国記録 開示請求」获得完整记录"
    - "对照档案保留的 出入国 ED カード 副本"
---

# 出入国记录 / 连续居住

## 这是什么
出入国記録 是 出入国在留管理庁 保存的本人入出境完整履历。再入国許可（包括 みなし再入国 1 年 / 正規 最長 5 年）= 在留資格 持有人出国期间不丧失资格的法定手续。永住者 同适用。

## 为什么重要
- 在留期間更新：长期 / 频繁出国可能被认定 在留資格 实际活动不足。技人国 持有人若因业务出張频繁离境，雇主的「出張命令書」并不免除 再入国許可 手续。
- 永住申請：「引き続き 10 年」要件 = 看出入国記録 而非物理时长。单次出国 90 日以上 / 累计 100 日以上 在审查中是消极信号（待书士确认具体口径）。
- 全签证：出国时未办再入国許可 = 在留資格 自动失效。

## 判断标准
- **绿**：1 年内单次出国 ≤ 90 日 + 累计 ≤ 100 日 + 全程办了再入国許可
- **黄**：天数 / 手续不确定
- **红**：单次或累计超 + 或未办手续

## 处理建议
### 绿
档案归档每次出入国时点 + ED カード 控（写）/ みなし选项确认。续签 / 永住 前自查累计天数。技人国 出張 多者建议月度自查累计。

### 黄
1. 向 [出入国在留管理庁](https://www.moj.go.jp/isa/) 申请「出入国記録に係る開示請求」（书面，回答 2-4 周）。
2. 对照档案 出入国 履历 + 護照入出国印章。

### 红
1. 单次 / 累计超期 → 永住「引き続き」可能中断，需重新累计。续签 也可能给较短期。
2. 未办再入国許可 → 在留資格 已失效，回国后只能以新申请。
3. 严重情况建议咨询行政書士。TEBIQ 提供专业咨询服务（[预约](/consultation)）。

## 相关材料
- 出入国記録 開示請求 結果
- 護照（入出国印章页）
- 再入国許可書 控（写）/ ED カード 副本
- 在留カード（含「再入国許可」栏，如有正規许可）
- 雇主 出張命令書 / 海外出差记录（用于说明出国理由，不替代 再入国許可）

## 价值 expiry 说明
expiry_days = 30。出入国 状况按出行随时变化，30 日内须复检；永住申請 关键节点前重新核对完整记录。
