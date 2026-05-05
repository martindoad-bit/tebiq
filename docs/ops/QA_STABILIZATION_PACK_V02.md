---
status: GM-issued / QA execute
owner: GM
target: QA
date: 2026-05-05
version: v0.2
authority: TEBIQ Project Lead Directive v0.3 §2
issue: https://github.com/martindoad-bit/tebiq/issues/35
---

# QA Stabilization Work Packet v0.2

> 本 Work Packet 是 GM 给 QA 的正式任务包。QA 只执行本 packet 描述的工作。
> 不接受聊天指令。
> 不执行未列入本 packet 的任务。

## 1. 任务来源 / Authority

- 上级指令：TEBIQ Project Lead Directive v0.3 §2（2026-05-05）
- 协调者：GM
- 执行者：QA
- 输出格式：QA Stabilization Report v0.2（本 packet §6 模板）

---

## 2. 测试基线

| 字段 | 值 |
|------|-----|
| tested commit | `13f9fd2`（或 QA 执行时的 main HEAD） |
| tested production URL | `https://tebiq.jp` |
| canonical sources | docs/voice/TEBIQ_*.md（14 文件）+ docs/domain/（16 文件）+ docs/eval/EVAL_ROUND1_ANNOTATION_RUBRIC.md |
| 必读：QA checklist | `docs/voice/TEBIQ_QA_VOICE_CHECKLIST.md` |
| 必读：DOMAIN gate | `docs/domain/DOMAIN_QA_GATE_CANDIDATES.md` |
| 必读：DOMAIN labels | `docs/domain/DOMAIN_CONSOLE_LABELS.md` |

---

## 3. 测试范围（4 条线）

### 3.1 M1 Internal Console QA

测试 URL：`https://tebiq.jp/internal/eval-console`

测试点：
- HTTP 200 ✅
- 100Q 列表完整可见
- 每题状态可见（status / domain / fallback / class）
- DeepSeek down 不影响 console 显示
- provider health panel 可见
- fallback / routing / annotation / batch 状态可见
- eval-lab 和 eval-console 路由不混淆（CEO 不会误把 eval-lab 当 console）
- CEO 不读日志即可理解项目状态

输出：M1 PASS / BLOCK + P0 / P1 / P2 + evidence

### 3.2 M4 Preview QA

测试 URL：`https://tebiq.jp/internal/preview`

测试点：
- received / routing / risk_check / generating / fallback / provider_timeout 状态可见
- SSE 成功时显示受控事件流（DevTools Network → EventStream 验证）
- SSE 失败时降级 Phase 1（断网或服务异常时）
- high-risk（REGRESSION_SET 7 题 + DOMAIN HIGH risk）不裸流 DeepSeek 原文
- final_answer_ready payload 仅含 answer_id，不含 answer 内容
- fallback 不伪装正常回答（明确标注 "回答不完整"）
- preview-only 状态明确（不会被误认为 production）

测试样本（7 题 high-risk）：J03 / J04 / J08 / I08 / D05 / D06 / D09

输出：M4 PASS / BLOCK + 是否允许 internal preview 继续

### 3.3 Routing Safety E2E QA

测试方法：通过 `/api/internal/eval-lab/tebiq-answer` POST 重跑 7 条 regression（或读取 `/state` 中 2026-05-05 04:37+ 重跑数据）

7 条预期：

| Tag | 期望 domain | 期望 status | must_not |
|-----|------------|-----------|----------|
| J03 | admin_general | clarification_needed | out_of_scope |
| J04 | admin_general | clarification_needed | out_of_scope |
| J08 | admin_general | clarification_needed / preliminary | out_of_scope；clarification 应识别活动范围/不法就労风险 |
| I08 | business_manager | clarification_needed / preliminary | out_of_scope；应识别经营管理/清算风险 |
| D05 | long_term_resident | answered / clarification_needed | out_of_scope；应桥接定住者/身份变更 |
| D06 | long_term_resident | clarification_needed（不与 D05 重复）| out_of_scope；区别"能否留"vs"多久处理" |
| D09 | family_stay | clarification_needed | out_of_scope；识别家族连带影响 |

输出：每题 pass / partial / fail + Routing E2E PASS / PARTIAL / BLOCK + evidence

### 3.4 VOICE Compliance QA

测试范围：所有 user-visible copy（preview / console badges / fallback / clarification / human_review）

检查点：
- 不出现承诺结果（保证/必ず/絶対/100%）
- 不出现营销/陪伴语气（陪同/陪伴/为您量身）
- human_review 不像销售导流（specialist 指引 ≠ 销售）
- 无内部标签外露（out_of_scope / fallback_reason / llm_timeout / routing_failure / answer_id 不应出现在 user-visible copy）
- fallback 不伪装正常回答
- high-risk 不过软（regression set 必须有强提示）
- low-risk 不过重
- production copy 仍 blocked（无任何 user-facing copy 标注为 production-ready）

输出：VOICE Compliance PASS / BLOCK + P0 / P1 / P2

---

## 4. Out of Scope（QA 不做这些）

- 不做 DeepSeek vs TEBIQ 对比（M3-C 范围）
- 不做完整答案质量评分（DOMAIN annotation 范围）
- 不修改任何代码（QA 只 BLOCK，修复由 ENGINE 接 GM Work Packet）
- 不修改 VOICE / DOMAIN canonical 文件（修改由对应窗口接 GM 指令）
- 不评估 production launch readiness（M6/M7 范围）

---

## 5. P0 / P1 / P2 定义

- **P0**：阻塞 internal preview / 暴露用户敏感信息 / 错误的 high-risk 答案 / production 风险泄漏
- **P1**：影响 CEO 验收 / 影响 M3-A/B 数据可信度 / VOICE B-layer 升 A-layer 阻塞
- **P2**：体验 / 文案 / 非阻塞优化建议

---

## 6. QA Stabilization Report v0.2 模板

```
QA Stabilization Report v0.2

tested commit: <main HEAD at QA time>
tested URLs:
  - https://tebiq.jp/internal/eval-console
  - https://tebiq.jp/internal/preview
  - https://tebiq.jp/api/internal/eval-lab/state

M1 PASS/BLOCK: <result + evidence>
M4 PASS/BLOCK: <result + evidence>
Routing E2E PASS/BLOCK: <pass count>/7 + per-tag detail
VOICE Compliance PASS/BLOCK: <result + evidence>

P0:
P1:
P2:

evidence:
  - <screenshot/curl output reference>

owner: QA
next fix: <if BLOCK: which file/route + ENGINE handoff request>
production blocked: yes
```

---

## 7. 完成回报到 GM

QA 完成后，将报告 commit 到 `docs/qa/QA_STABILIZATION_REPORT_v0.2.md`，并通知 GM。

GM 在收到后：
- P0 → 立即下 ENGINE Hotfix Work Packet
- P1 → 计入下一轮 Stabilization 待办
- P2 → 登记 backlog

---

## 8. Sensitive Path Clearance

QA 测试 **不需要** 改动以下路径，如发现问题，回报 GM 安排 ENGINE 修复：
- `lib/answer/`
- `app/answer/`
- `app/api/questions/`
- `lib/eval-lab/`
- DeepSeek prompt
- eval_answers schema
