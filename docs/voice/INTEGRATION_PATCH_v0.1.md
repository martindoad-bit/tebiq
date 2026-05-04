> **状态：** draft / preview-only / not production
> **版本：** v0.1
> **日期：** 2026-05-05
> **作者：** TEBIQ-VOICE
> **禁止 production 使用：** 是
> **待验收：** GM

# Integration Patch v0.1

本文件记录 TEBIQ Voice System v0.1 Integration Batch 的 5 条修正。  
所有修正均已集成到对应文件中。本文件作为变更记录存档。

---

## Patch 概览

| Patch | 影响文件 | 状态 |
|-------|---------|------|
| Patch-1 | `VOICE_PRINCIPLES_v0.1.md`, `INTERNAL_CONSOLE_COPY_MAP_v0.1.md` | ✅ 已集成 |
| Patch-2 | `VOICE_PRINCIPLES_v0.1.md`, `PREVIEW_STATE_COPY_MAP_v0.1.md` | ✅ 已集成 |
| Patch-3 | `PREVIEW_STATE_COPY_MAP_v0.1.md`, `MATTER_V0_COPY_MAP_v0.1.md` | ✅ 已集成 |
| Patch-4 | `INTERNAL_CONSOLE_COPY_MAP_v0.1.md` | ✅ 已集成 |
| Patch-5 | `MATTER_V0_COPY_MAP_v0.1.md`, `HUMAN_REVIEW_TRIGGER_LIBRARY_v0.1.md`, `RISK_LEVEL_VOCABULARY_v0.1.md`, `DOMAIN_INPUT_REQUEST_v0.1.md` | ✅ 已集成 |

---

## Patch-1 — 高情绪词使用规则修正

**修正内容：**  
高情绪词（"危险""严重""紧急"）由"一刀切禁止"改为"分级使用"。

**修正前（错误）：**  
所有场景一律禁止使用"危险""严重""情况紧急"等高情绪词。

**修正后（正确）：**  
- 普通场景：禁止使用
- 高风险问题：慎用
- P0 场景在 DOMAIN 确认后：可使用明确但克制的强提示

**修正理由：**  
过度禁止导致 P0 场景（如未在期限内处理在留资格可能被取消）无法给用户正确的优先级感知。"不恐吓"的原则不等于"降低用户对真实高风险的感知"。

**影响文件：**
- `VOICE_PRINCIPLES_v0.1.md`：Section 1 属性表 + Section 2 恐吓类禁止说明
- `INTERNAL_CONSOLE_COPY_MAP_v0.1.md`：p0_candidate 状态的 eval_allowed 和 notes

---

## Patch-2 — "不可逆后果"表达规则修正

**修正内容：**  
"不可逆后果"表达由完全禁止改为"P0 场景 DOMAIN 确认后，必须说明具体后果才可使用"。

**修正前（错误）：**  
任何情况下禁止使用"不可逆后果"类表达。

**修正后（正确）：**  
- 一般场景：禁止（不能作为空泛恐吓词）
- P0 场景 + DOMAIN 确认 + 说明具体后果：允许使用

**允许示例（P0 场景）：**  
> 未在规定期限内处理，在留资格可能被取消，且影响日后申请记录。

**禁止示例（空泛使用）：**  
> 这件事有不可逆后果，请立即处理。（无具体说明 → 禁止）

**修正理由：**  
不能因为担心"恐吓"而对真实的高风险后果讳莫如深。关键是必须说明具体是什么后果，让用户基于事实判断，而不是空泛的恐吓词。

**影响文件：**
- `VOICE_PRINCIPLES_v0.1.md`：Section 2 恐吓类禁止说明
- `PREVIEW_STATE_COPY_MAP_v0.1.md`：`answer_returned_with_risk_flag` 状态说明

---

## Patch-3 — Matter 保存逻辑修正（Fallback 场景）

**修正内容：**  
Matter 保存不是在所有状态下都触发，改为条件性逻辑。

**修正前（错误）：**  
每次问答结束后，统一展示"已保存到你的事项记录"提示。

**修正后（正确）：**

| 条件 | 处理 |
|------|------|
| routing / risk_check 已完成 + 有效 matter 已识别 | 可触发 matter 保存 |
| routing_failure / out_of_scope | 不触发保存 |
| llm_timeout 降级路径 | 不触发保存 |

**修正理由：**  
在 routing failure 或 timeout 的情况下，TEBIQ 并未对用户的在留情况做出有效判断，此时保存"事项"没有实际内容支撑，会造成用户误解（以为 TEBIQ 已经理解了他的情况）。

**影响文件：**
- `PREVIEW_STATE_COPY_MAP_v0.1.md`：`matter_save_fallback` 条件说明
- `MATTER_V0_COPY_MAP_v0.1.md`：`matter_created` 触发条件说明

---

## Patch-4 — Human Review 状态 eval_allowed 拆分

**修正内容：**  
`human_review_required` 状态的 `eval_allowed` 字段由单一布尔值改为两个子字段。

**修正前（过于简化）：**  
```yaml
eval_allowed: true
```

**修正后（分拆）：**  
```yaml
eval_allowed: true
domain_annotation_allowed: true
answer_quality_eval_allowed: conditional
```

**条件说明（answer_quality_eval_allowed: conditional）：**
- 如果 TEBIQ 在触发 human_review 前已生成方向性说明 → 可评估方向说明质量
- 如果 TEBIQ 直接触发 human_review 无任何方向性内容 → 不进入答案质量评估

**修正理由：**  
Human review 场景下，DOMAIN 标注触发合理性（domain_annotation）和评估 TEBIQ 答案质量（answer_quality_eval）是两件不同的事。盲目设置 `eval_allowed: true` 会导致无内容可评的情况下硬做评估，污染评估数据。

**影响文件：**
- `INTERNAL_CONSOLE_COPY_MAP_v0.1.md`：`human_review_required` 状态条目

---

## Patch-5 — 专业参照类型参数化

**修正内容：**  
所有文案中的专业人士参照不硬编码为"行政書士"，改为参数化设计。

**默认值：** 行政書士  

**DOMAIN 可指定覆盖：**

| 场景类型 | 推荐专业类型 |
|---------|------------|
| 在留资格变更 / 更新 / 特定活动 | 行政書士 / 入管専門弁護士 |
| 税务居住地 / 扶养认定 | 税理士 |
| 公司登记 / 法律文件 | 司法書士 |
| 劳动合同 / 社会保险 | 社労士 |
| 复合情形（多类型交叉）| DOMAIN 明确指定 |

**新增 DOMAIN 待确认项：**  
D-P1-05（配偶 / 家族关系变化场景分级）新增到 `DOMAIN_INPUT_REQUEST_v0.1.md`。

**修正理由：**  
在留相关的专业人士不只是行政書士。税务、劳务、公司法律等维度分别对应不同专业类型。硬编码"行政書士"会在需要其他专业的场景给用户错误引导。

**影响文件：**
- `MATTER_V0_COPY_MAP_v0.1.md`：`matter_professional_reference` block
- `HUMAN_REVIEW_TRIGGER_LIBRARY_v0.1.md`：各场景的专业参照说明
- `RISK_LEVEL_VOCABULARY_v0.1.md`：L3 专业参照说明
- `DOMAIN_INPUT_REQUEST_v0.1.md`：新增 D-P1-05
