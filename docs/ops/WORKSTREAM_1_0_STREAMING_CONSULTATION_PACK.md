---
status: GM-issued / ENGINE execute
owner: GM
target: ENGINE
date: 2026-05-05
version: v0.1
authority: TEBIQ 1.0 Alpha Sprint Directive + 流式回答补充指令 (2026-05-05)
issue: https://github.com/martindoad-bit/tebiq/issues/39
charter: docs/product/TEBIQ_1_0_ALPHA_CHARTER.md
---

# Engineering Work Packet — 1.0 Alpha Streaming Consultation Pipeline

> 1.0 Alpha 用户端**核心** Work Packet。覆盖文字咨询 + 流式回答 + system prompt + 风险关键词 + 反馈 + 保存。
> Streaming 是 P0：不允许只做 loading 状态，必须真流式正文。

## 1. 任务来源

- 上级：TEBIQ 1.0 Alpha Sprint Directive §4.1 / §4.2 / §4.4 / §4.5 / §4.6 / §6 / §7
- 流式补充：2026-05-05 PL 补充指令（streaming P0）
- Charter：`docs/product/TEBIQ_1_0_ALPHA_CHARTER.md`

## 2. Scope

| § | 任务 | 说明 |
|---|------|------|
| 2.1 | 文字咨询入口 | `/`（或入口页）输入框 → POST 触发流式回答 |
| 2.2 | DS V4 Pro streaming 集成 | 用 DS streaming API；流的内容必须经 TEBIQ system prompt，不裸流原生 DS |
| 2.3 | TEBIQ 1.0 system prompt | `prompt_version='consultation_alpha_v1'`（详细规则见 §4）|
| 2.4 | 受控时间预算 | 0–2s 显示已收到；25s 显示"仍在生成"；90–120s 才算真失败 |
| 2.5 | 风险关键词检测 + 轻提示 | §5 13 个关键词命中 → 回答区上方轻提示 |
| 2.6 | Alpha 顶部固定提示 | 流式过程中始终保留 |
| 2.7 | 反馈按钮（5 类）| 流结束后展示 |
| 2.8 | 保存问题 | "保存"按钮，写入用户咨询记录（不是 Matter）|
| 2.9 | Fact Anchor 注入 scaffold | §7 anchor matching → prompt 注入接口；anchor 内容由 DOMAIN 提供（独立 Pack）|

## 3. 流式协议（P0 强约束）

```
0s            POST /api/consultation/stream（或类似 SSE/Stream 端点）
0–2s          显示「已收到问题，正在生成咨询方向…」（Alpha 顶部提示同时显示）
              如果命中风险关键词 → 同时显示轻提示
T_first       DS 返回首 token → 立即流式展示正文
              first_token_at = T_first
              first_token_latency_ms = T_first - stream_started_at
T_first→T_end DS 持续返回 → 持续追加正文
T_end         DS 完成 → 显示反馈按钮 + 保存按钮
              completion_status = 'completed'
              total_latency_ms = T_end - stream_started_at
25s           如果仍未首 token → 顶部追加「回答还在生成，你可以继续等待，也可以稍后回来查看。」
              不失败，继续等
90–120s       如果仍未完成 → completion_status = 'timeout'
              展示「这次回答生成失败。你可以稍后重试，或保存问题继续处理。」
              partial_answer_saved = true（如果已有部分 token）
              绝不 fallback 到 legacy matcher
              绝不返回 unrelated cached answer
```

**Fallback 边界（强约束）**：
- 任何超时 / 失败路径 **绝不**走 `intake.ts:171` legacy matcher hedged path
- 流式 API 的 fallback 必须使用 PR #38 的 `buildProviderTimeoutFallback`（VOICE canonical copy）
- 触发 fallback 时 `engine_version='answer-core-v1.1-fallback'` + `status='clarification_needed'` + `[降级回答]` 标记

## 4. System Prompt（`consultation_alpha_v1`）

**核心规则**：
- 中文回答
- 咨询风格（不是百科风格）
- 不写长篇——控制回答长度
- **禁止承诺词**：「一定可以」「没问题」「不会影响」「保证」「必ず」「絶対」「100%」
- 信息不足时先提示需要确认什么，再给方向
- 高风险时提醒"建议不要只靠 AI 判断"
- 每次结尾给"下一步可以做什么"
- 记录 prompt_version='consultation_alpha_v1'

实现位置建议：`lib/answer/prompt/consultation-alpha-v1.ts`（新建，不动 LIGHT_SYSTEM_PROMPT）

## 5. 风险关键词（13 个）

```
不许可 / 补材料 / 超期 / 期限 / 离婚 / 解雇 / 公司清算 /
经营管理 / 永住 / 年金 / 税金 / 工作不一致 / 资格外活动
```

命中任意一个 → `risk_keyword_hits` 数组记录命中项 + 回答区上方显示：

> 这个问题可能涉及在留风险，建议不要只靠 AI 回答做最终决定。

## 6. 数据记录字段（持久化）

每条咨询必须记录（DB schema 实施细节由 ENGINE 决定，需新建 consultation 表或扩 answer_drafts）：

```
question_id            (server-generated)
user_question_text
has_image              (Photo Lite Pack 用)
image_summary          (Photo Lite Pack 用)
ai_answer_text
model                  ='deepseek-v4-pro'
prompt_version         ='consultation_alpha_v1'
fact_anchor_ids        []
risk_keyword_hits      []
stream_started_at
first_token_at
completed_at
total_latency_ms
first_token_latency_ms
completion_status      streaming | completed | timeout | failed
partial_answer_saved   bool
final_answer_text
timeout_reason         (90s+ 真失败时填)
feedback_type          (5 类反馈)
saved_question         bool
human_confirm_clicked  bool
follow_up_count        int
created_at
```

## 7. 反馈按钮（5 类）

```
有帮助 | 不准确 | 我想补充情况 | 想找人工确认 | 保存这个问题
```

每个按钮触发：
- 写入 `feedback_type`
- "保存这个问题" 同时写 `saved_question=true`
- "想找人工确认" 同时写 `human_confirm_clicked=true`
- 不引入 Matter 概念（仅记录字段）

## 8. Acceptance Criteria

| 项 | 要求 |
|----|------|
| A. 流式正文 | 用户能看到 token 逐步流出，不是最后一次性出现 |
| B. 25s 不失败 | 25s 仍未首 token 时只显示提示，不进入 timeout 状态 |
| C. 90–120s 真失败 | timeout 后用 voice canonical fallback copy（已由 #38 提供）|
| D. Alpha 提示固定 | 流式全过程顶部 Alpha 提示不消失 |
| E. 风险轻提示 | 13 关键词任一命中 → 回答区上方提示 |
| F. system prompt 生效 | 回答风格不同于 DS 原生（短、咨询、含"下一步"）|
| G. 禁止承诺词 0 命中 | 7 类禁止词均不出现 |
| H. 5 反馈按钮可用 | 每个写入对应字段 |
| I. 保存问题可见 | `/me/consultations` 列表显示 |
| J. 全字段记录 | §6 字段全部持久化 |
| K. fallback 不污染 | 任何超时不返回 unrelated cached content |
| L. tsc/lint/build clean + 新增 streaming contract test ≥ 5 案例 |

## 9. Out of Scope（不做）

- 不实现 Photo Lite（独立 Pack）
- 不实现 Learning Console（独立 Pack）
- 不实现 Fact Anchor 内容（DOMAIN Pack 提供）
- 不改 `app/api/internal/eval-lab/*`（eval lab 路径，1.0 Alpha 与 eval 解耦）
- 不改 DeepSeek prompt 之外的 DS 配置
- 不实现 Matter（PL §3 explicit 不做）
- 不引入 Human Review Gate 固化
- 不解锁 production copy 完全（用户端必须可见 Alpha 标识）

## 10. Sensitive Path Clearance

**允许**：
- `lib/answer/`（含新增 `lib/answer/prompt/consultation-alpha-v1.ts`）
- 新建 `app/api/consultation/` 流式端点
- 新建 `app/(consultation)/` 用户端页面（或合并到现有 `app/answer/[id]/`，由 ENGINE 选择）
- 数据 schema 扩展（consultation 表 OR answer_drafts 扩字段）

**不可触及**：
- `app/api/internal/eval-lab/*`（与 eval 流程解耦）
- DeepSeek 原生 prompt（系统级别）以外的 DS 配置
- `eval_answers` schema（仅消费方，不改 schema）

## 11. Rollback

如出现 P0：feature flag 禁用流式入口；用户端回退到固定 fallback 页面；不影响 #38 已修复的 internal eval-lab path。

## 12. 完成回报格式

```
ENGINE Work Packet Completion — 1.0 Alpha Streaming Consultation

PR: #XX
Commit: <sha>
Vercel: SUCCESS / FAILED

Acceptance §A 流式正文: ✅/❌ + evidence
... (per item)

Out of scope verified: <list>
Known risks: <list>
Sensitive path: only authorized paths touched ✓
```
