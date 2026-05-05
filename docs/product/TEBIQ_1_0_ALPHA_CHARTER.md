---
status: charter / active
owner: Project Lead + GM
date: 2026-05-05
version: v1.0-alpha
authority: TEBIQ 1.0 Alpha Sprint Directive (2026-05-05)
production_status: Alpha / limited release / not final professional judgment
---

# TEBIQ 1.0 Alpha Charter

> 本文件是 TEBIQ 1.0 的最小宪章。1.0 不是完整 Risk Management。1.0 不是普通 AI 签证问答。
> 1.0 是 AI 在留咨询 Alpha — 让真实用户开始问问题，让我们开始收集真实咨询数据。

---

## 1. 名称

**AI 在留咨询 Alpha**

---

## 2. 1.0 做什么

- 用户输入文字在留问题
- 用户上传 / 拍照（Photo Lite — 通知书/入管材料/年金税金截图/雇佣相关片段）
- 系统调用 DeepSeek V4 Pro + TEBIQ 1.0 咨询风格 system prompt（`consultation_alpha_v1`）
- 系统注入轻事实锚点（15 条）
- 系统检测高风险关键词，命中后展示 Alpha 轻提示
- 系统提供**流式回答体验**（P0，不是阶段式 loading）：0–2s 显示"已收到/正在生成方向" → DS 一开始返回 token 即流式展示正文 → 25s 不是失败线（只是"仍在生成"提示）→ 90–120s 才算真失败
- 用户对每个回答提供反馈（5 类）
- 用户可保存问题（不是 Matter）
- 内部中台 Learning Console 可见所有咨询记录

---

## 3. 1.0 不做什么

- ❌ 完整 Risk Triage
- ❌ 完整 M3-A/B/C / DOMAIN formal annotation
- ❌ 完整 Matter v0
- ❌ Human Review Gate（固化）
- ❌ Pro 后台 / Partner Workspace
- ❌ 自动材料清单 / 法律判断 / 补救策略
- ❌ OCR 完整文书系统
- ❌ 预约 / 支付 / 派单
- ❌ production copy 完全解锁
- ❌ 「最终专业判断」承诺

---

## 4. 用户端页面

| 路径 | 用途 |
|------|------|
| `/`（或入口）| 文字咨询输入 + 拍照上传 |
| `/answer/[id]` | 咨询回答展示（流式/阶段式 + 高风险轻提示 + 反馈按钮 + 保存按钮）|
| `/me/consultations`（或 `/我的咨询`）| 用户已保存问题列表 |

---

## 5. 中台页面

`/internal/learning-console`（区别于 `/internal/eval-console`）

7 Tab：
1. 全部咨询
2. 图片咨询
3. 命中高风险词
4. 不准确反馈
5. 想人工确认
6. 已保存问题
7. 超时 / 失败

---

## 6. 数据记录字段（每条咨询）

| 字段 | 来源 |
|------|------|
| `question_id` | 服务端生成 |
| 用户问题原文 | 用户输入 |
| 是否含图片 / 图片摘要 | 拍照路径 |
| AI 回答 | DS V4 Pro 输出 |
| `model` | 'deepseek-v4-pro' |
| `prompt_version` | 'consultation_alpha_v1' |
| `fact_anchor_ids` | 命中的 anchor id 数组 |
| `risk_keyword_hits` | 命中的高风险词数组 |
| `latency_ms` / `total_latency_ms` | 端到端 |
| `stream_started_at` / `first_token_at` / `completed_at` | 流式时间戳 |
| `first_token_latency_ms` | first_token_at − stream_started_at |
| `completion_status` | streaming / completed / timeout / failed |
| `partial_answer_saved` | bool（中途失败时是否保留 partial）|
| `final_answer_text` | 完整结果（流结束后写入）|
| `timeout_reason` | 仅 90s+ 真失败时填 |
| `feedback_type` | 5 类反馈 |
| `saved_question` | bool |
| `human_confirm_clicked` | bool |
| `follow_up_count` | 同一 question_id 后续追问数 |
| `created_at` | 时间戳 |

---

## 7. 最小安全边界

- **Streaming 是 P0**：不允许只做 loading 状态，必须真流式正文（DS streaming API 或 SSE）
- 流的内容**必须经过 TEBIQ system prompt**，不是裸 DS 原生输出
- 25s 不是失败线 — 显示"回答还在生成，你可以继续等待，也可以稍后回来查看"
- 90–120s 才算真失败 — 显示"这次回答生成失败。你可以稍后重试，或保存问题继续处理"
- LLM timeout / 失败时 **绝不允许** fallback 到 legacy matcher 返回不相关 cached answer（已由 #37 修复）
- 流式过程中页面**始终保留** Alpha 顶部提示 + 命中高风险时的轻提示
- 中途失败时 `partial_answer_saved` 必须区别于 `completed`，**不**当正常 completed answer
- 高风险关键词命中 → 回答区上方轻提示："这个问题可能涉及在留风险，建议不要只靠 AI 回答做最终决定"
- 每条回答顶部固定 Alpha 提示："以下回答用于整理问题和下一步，不是最终专业判断"
- 禁止承诺词：「一定可以」「没问题」「不会影响」「保证」「必ず」「絶対」
- 图片识别结果**不作为最终判断**，必须以咨询语气呈现
- VOICE canonical fallback copy 必读（`docs/voice/TEBIQ_*.md` 14 文件）

---

## 8. 成功指标

| 指标 | 目标 |
|------|------|
| Alpha 上线 7 天内真实用户咨询数 | ≥ 50 |
| 命中高风险关键词数 | ≥ 5 类不同 |
| 用户反馈条数 | ≥ 20 |
| 「不准确」反馈占比 | ≤ 30% |
| timeout / 失败率 | ≤ 10%（含 90s timeout）|
| 中台可见所有上述记录 | 100% |
| 出现禁止承诺词 | 0 次 |
| 图片识别被当最终判断 | 0 次 |

---

## 9. Production 状态

**Alpha / limited release / not final professional judgment**

- 不进入 public soft launch
- 不解锁 production copy 完全
- 用户端必须可见 Alpha 标识
- 邀请制或 limited URL（部署细节由 ENGINE 在实施 Work Packet 中决定）

---

## 10. 1.0 Sprint 完成标准（13 条）

详见 `docs/ops/WORKSTREAM_1_0_USER_FACING_PACK.md` §Acceptance + 各 Pack §Acceptance。汇总：

1. ✅ #37 P0 修复（merged `1ba2fea`）
2. 用户可文字咨询
3. 用户可拍照咨询 Lite
4. DeepSeek 回答有 TEBIQ 咨询风格
5. 回答不是 DeepSeek 原生体感
6. **Streaming P0**：真流式正文，不是阶段式 loading；25s 不失败；90–120s 才失败
7. 高风险词有轻提示
8. 用户可反馈
9. 用户可保存问题
10. 中台可见咨询记录（含流式时间戳 + completion_status + partial_answer_saved）
11. prompt_version / model / latency / first_token_latency_ms / feedback / risk_keywords 均记录
12. QA Alpha smoke 通过（含 8 项 streaming 专项测试）
13. production 状态仍为 Alpha / limited release / not final professional judgment

---

## 关联资产

- DECISION_LOG: DL-011（方向切换）
- ENGINE: WORKSTREAM_1_0_USER_FACING_PACK / WORKSTREAM_1_0_LEARNING_CONSOLE_PACK / WORKSTREAM_1_0_PHOTO_LITE_PACK
- DOMAIN: WORKSTREAM_1_0_FACT_ANCHORS_PACK
- QA: QA_1_0_ALPHA_SMOKE_PACK
