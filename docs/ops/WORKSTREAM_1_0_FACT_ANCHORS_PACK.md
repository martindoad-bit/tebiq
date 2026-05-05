---
status: GM-issued / DOMAIN execute
owner: GM
target: DOMAIN
date: 2026-05-05
version: v0.1
authority: TEBIQ 1.0 Alpha Sprint Directive §7
issue: https://github.com/martindoad-bit/tebiq/issues/42
charter: docs/product/TEBIQ_1_0_ALPHA_CHARTER.md
---

# DOMAIN Work Packet — 1.0 Alpha Fact Anchors

> 提供 1.0 Alpha 的 15 条最小事实锚点。
> 不是完整知识库。不是复杂 RAG。不替代专业判断。

## 1. 任务

为 ENGINE Streaming Consultation Pipeline 提供 15 个 fact anchor 数据。
ENGINE 负责实现关键词匹配 + anchor 注入 prompt 的接口；DOMAIN 只提供 anchor 内容（draft / needs human review）。

## 2. 第一批 anchors（按 PL §7）

| # | anchor_id | 主题 |
|---|-----------|------|
| 01 | `bm_to_humanities` | 经管转人文 / 技人国 |
| 02 | `humanities_to_pr` | 人文转永住 |
| 03 | `pension_pr` | 厚生年金 / 永住 |
| 04 | `tax_pr` | 税金 / 永住 |
| 05 | `spouse_divorce` | 配偶签离婚 |
| 06 | `bm_dissolution` | 公司未清算 / 经营管理 |
| 07 | `work_mismatch` | 工作内容与在留资格不一致 |
| 08 | `supplemental_request` | 补材料通知 |
| 09 | `denial_notice` | 不许可通知书 |
| 10 | `visa_expiring` | 签证快到期 |
| 11 | `family_change_impact` | 家人受换签影响 |
| 12 | `family_to_work` | 家族滞在转工作 |
| 13 | `humanities_job_change` | 技人国转职 |
| 14 | `re_entry` | 再入国 / 长期离日 |
| 15 | `card_lost` | 在留卡丢失 |

## 3. 每条 anchor 必须字段（最小集）

```yaml
anchor_id: <stable_string_id>
trigger_keywords: [list of 3-8 中文/日文关键词]
must_consider: <≤120 字 - 提示 AI 必须考虑的核心维度>
must_not_say: <≤80 字 - 禁止结论或承诺>
suggested_next_question: <≤60 字 - 建议追问用户的具体信息>
human_confirm_hint: <≤80 字 - 触发 human review 的边界提示>
```

## 4. 输出

DOMAIN 写一个文件：

`docs/domain/DOMAIN_FACT_ANCHORS_v0.1.md`

格式：
- 文件头 status: draft / needs human review
- 每条 anchor 一个 section（按 §3 字段）
- 不需要长解释，每条 ≤ 30 行

## 5. 边界

- ✅ DOMAIN 只写 anchor 内容
- ❌ 不写完整知识库
- ❌ 不写法律细节
- ❌ 不写承诺性文案
- ❌ 不写 production-ready 结论
- ❌ 不实现关键词匹配（ENGINE 负责）
- ❌ 不实现 prompt 注入（ENGINE 负责）

## 6. 复核

- 输出后 GM 二次审阅 + 标注 draft
- production 级别用 anchor 需 PL 裁决（本 Sprint 不解锁）
- DOMAIN 后续可在 Alpha 数据回流后修订（小 patch，不新建 v0.2 命名）

## 7. Acceptance

| 项 | 要求 |
|----|------|
| A | 15 条 anchor 全部按 §3 字段填齐 |
| B | 全部含 `must_not_say`（避免承诺词扩散到 prompt 注入路径）|
| C | trigger_keywords 与 §1.0 streaming pack §5 风险词无冲突（可重叠但 anchor 触发不一定触发风险轻提示）|
| D | 文件头标注 `draft / needs human review` |
| E | 不超过 ~600 行（PL 强调"不要做完整知识库"）|

## 8. 完成回报

DOMAIN commit 到 `docs/domain/DOMAIN_FACT_ANCHORS_v0.1.md` + 通知 GM。
GM 登记 Artifact Registry + 通知 ENGINE 可消费。
