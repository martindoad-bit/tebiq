---
title: "档案隐私与数据保护"
category: decision
slug: tebiq-archive-privacy
scenario_tags: ["想长期定居"]
applies_to: ["全部"]
urgency_level: low
estimated_read_time_minutes: 4
last_verified_at: "2026-04-28"
sources_count: 3
requires_shoshi_review: null
last_reviewed_by_name: null
last_reviewed_by_registration: null
review_notes: null
---

# 档案隐私与数据保护

## 这事跟我有关吗？
你的档案里包含在留カード 信息、纳税额、年收入、雇主名等敏感数据。这些数据存在哪、是否可能被分享给第三方、能否随时导出删除，是注册前应当确认的事。

## 这是什么
TEBIQ 档案的数据存储与保护：

- **存储位置**：Supabase Postgres，Tokyo region 数据中心，物理位置在日本国内
- **传输加密**：HTTPS / TLS 1.2+
- **静态加密**：数据库层面加密（AES-256）
- **拍照原图**：识别完成后立即丢弃，仅保留结构化字段
- **マイナンバー**：识别过程中屏蔽，不保存到档案
- **第三方共享**：默认不共享。仅在你主动授权 ¥9,800 行政書士咨询时，将选定档案条目分享给负责该次咨询的書士，咨询结束后撤回访问权限
- **第三方分析工具**：不接入广告 SDK / 用户行为追踪 SDK
- **数据出境**：数据仅在日本境内处理，不传输至海外服务器

用户权利（基于個人情報保護法）：

- **访问权**：随时在档案视图查看所有数据
- **导出权**：通过设置页一键导出 JSON 或 CSV 格式
- **更正权**：识别错误可手动修正
- **删除权**：可注销账户触发档案软删，30 天后真删

## 你应该做什么
1. 注册后阅读 TEBIQ 隐私政策，确认数据处理范围。
2. 在设置页确认"第三方共享"默认关闭，仅在主动咨询时勾选授权。
3. 需要导出档案时，使用设置页的"数据导出"功能。

## 不做的后果
不主动确认隐私设置不会带来直接损失。TEBIQ 默认配置即不分享给第三方、不接入广告追踪。注销账户后 30 天数据真删，无法恢复。

## 什么时候你应该找专家
个人情報保護 相关的产品技术问题，TEBIQ 客服可解答。涉及数据跨境（例如你需要向中国境内机构提交档案中的日本纳税証明）、或在留資格申请中如何呈现档案数据，建议咨询行政書士。TEBIQ 提供专业咨询服务（[预约](/consultation)）。

## 信息来源
- [TEBIQ 隐私政策](/privacy)（取得日 2026-04-28）
- [個人情報の保護に関する法律（個人情報保護委員会）](https://www.ppc.go.jp/personalinfo/legal/)（取得日 2026-04-28）
- [Supabase Tokyo Region データセンター](https://supabase.com/docs/guides/platform/regions)（取得日 2026-04-28）
仅供参考，具体以官方网站或专家为准。
