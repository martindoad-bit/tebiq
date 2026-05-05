---
status: GM-issued / QA execute
owner: GM
target: QA
date: 2026-05-05
version: v0.1
authority: TEBIQ 1.0 Alpha Sprint Directive §8 + 流式回答补充指令
issue: https://github.com/martindoad-bit/tebiq/issues/43
charter: docs/product/TEBIQ_1_0_ALPHA_CHARTER.md
---

# QA Work Packet — 1.0 Alpha Smoke

> 1.0 Alpha 上线前 P0 smoke。Alpha 不是 production。但 P0 fail 必须阻塞 Alpha 开放。

## 1. 触发条件

QA 在 ENGINE Streaming Consultation Pack + Photo Lite Pack + Learning Console Pack + Fact Anchors Pack 各自完成后开始执行。

QA 不需要等所有都完成；可在 streaming pack merge 后先做 §3 + §4 + §5 文字咨询子集。

## 2. 测试基线

| 字段 | 值 |
|------|-----|
| canonical sources | docs/voice/TEBIQ_*.md / docs/domain/DOMAIN_FACT_ANCHORS_v0.1.md / docs/product/TEBIQ_1_0_ALPHA_CHARTER.md |
| tested commit | <main HEAD at QA time> |
| tested URL | https://tebiq.jp（含用户端入口 + /me/consultations + /internal/learning-console）|

## 3. P0 测试范围（必跑）

### 3.1 #37 P0 fallback 回归
1. D05/D06/J03/J04/J08/I08/D09 7 题在 fallback 路径不返回不相关 cached answer ✅（已 verified by GM 2026-05-05 1ba2fea）
2. fallback 时 `engine_version='answer-core-v1.1-fallback'` + `status!='answered'` + `[降级回答]` 标记

### 3.2 流式回答 P0（PL 补充指令 8 项）
1. 是否真流式显示正文，**不是 loading 状态**
2. 25s 是否**不会**直接失败
3. 90–120s 超时是否安全（fallback canonical copy + 不返回不相关）
4. 流式回答是否带 Alpha 顶部提示
5. 高风险问题是否带轻提示（13 关键词任一命中）
6. 完整 `answer_text` 是否被保存
7. 中途失败是否**不会**保存为正常 completed answer（`partial_answer_saved` 区分）
8. 是否仍然禁止 legacy matcher 返回无关答案（fallback boundary）

### 3.3 文字咨询（20 条）
- 选 20 条不同场景问题（含 13 风险关键词覆盖）
- 验证：DS V4 Pro + system prompt → 咨询风格回答 ≠ DS 原生
- 验证：禁止承诺词 7 类均 0 命中
- 验证：每条结尾给"下一步"
- 验证：fact_anchor 命中时 prompt 注入生效

### 3.4 图片咨询 Lite（5 条）
- 上传：通知书 / 入管材料 / 年金截图 / 税金截图 / 公司材料 各 1 条
- 验证：识别结果以咨询语气呈现，**不**作最终判断
- 验证：image_summary 写入数据记录
- 验证：流式回答路径与文字咨询一致

### 3.5 高风险关键词提示
- 13 个关键词每个至少 1 题验证
- 命中 → 回答区上方轻提示文案与 voice canonical 一致

### 3.6 禁止承诺词
- 7 类禁止词在 20+5 条咨询中全部 **0 命中**
- 「一定可以 / 没问题 / 不会影响 / 保证 / 必ず / 絶対 / 100%」

### 3.7 反馈按钮
- 5 类反馈每个点击均写入对应字段
- "保存这个问题" → `saved_question=true`
- "想找人工确认" → `human_confirm_clicked=true`

### 3.8 保存问题
- 保存后 `/me/consultations` 列表显示
- 不引入 Matter（不应出现 Matter 字段或 UI）

### 3.9 Learning Console 记录完整性
- 7 Tab 切换无错
- 每条记录字段全（§Charter §6 全字段）
- KPI 与底层 query 一致

## 4. P0 Fail 触发条件

任一以下为 P0 Fail，阻塞 Alpha 开放：

- timeout 返回无关答案
- 高风险问题没有 Alpha 提示
- 出现「一定可以 / 没问题 / 不会影响」
- 图片识别结果被当最终判断
- 用户问题没有被记录
- 反馈没有保存
- 中台看不到记录
- 流式回答只显示 loading（无 token 流）
- 25s 直接失败
- legacy matcher 返回无关答案

## 5. P1 触发（不阻塞 Alpha 但记录）

- first_token_latency_ms p95 > 10s
- DS V4 Pro 回答风格仍接近 DS 原生（system prompt 弱）
- VOICE B-layer 文案有边缘问题
- Learning Console KPI 误差

## 6. 输出

`docs/qa/QA_1_0_ALPHA_SMOKE_REPORT_v0.1.md`，格式：

```
QA 1.0 Alpha Smoke Report v0.1
tested commit: <sha>
tested URL: <urls>
verdict: PASS / BLOCK
P0:
P1:
P2:
evidence:
production blocked beyond Alpha: yes
```

## 7. Out of Scope

- 不评估 production launch readiness
- 不修改任何代码
- 不改 VOICE / DOMAIN canonical 文件
- 不评估 0.7+ 路线
