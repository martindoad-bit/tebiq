---
status: GM-issued / ENGINE execute
owner: GM
target: ENGINE
date: 2026-05-05
version: v0.1
authority: TEBIQ 0.5 Safe Consultation Sprint Workstream D
issue: https://github.com/martindoad-bit/tebiq/issues/54
charter: docs/product/TEBIQ_1_0_ALPHA_CHARTER.md
---

# Engineering Work Packet — 0.5 Light Fact Anchor Integration

> WS-D: DOMAIN Pack #42 已 deliver 15 anchors（draft / needs human review）。
> ENGINE scaffold 已在 `consultation-alpha-v1.ts` 接好 (`factAnchors` 参数)，stream route 目前传空数组。
> 本 Pack：把 DOMAIN 数据 wire 进 prompt 注入路径 + 落 fact_anchor_ids 到 ai_consultations。

## 1. 现状

- `lib/answer/prompt/consultation-alpha-v1.ts` `buildConsultationMessages` 已支持 `factAnchors` 参数
- `app/api/consultation/stream/route.ts:210` 注释：「factAnchors will land via DOMAIN Pack #42; left empty for #39」
- `docs/domain/DOMAIN_FACT_ANCHORS_v0.1.md` 含 15 条 anchors，每条 yaml 字段：anchor_id / trigger_keywords / must_consider / must_not_say / suggested_next_question / human_confirm_hint
- `ai_consultations.fact_anchor_ids` 字段已存在（schema 0023 已建）

## 2. Scope

### §2.1 Anchor 数据加载

新建：`lib/consultation/fact-anchors.ts`

实现：
```ts
export interface FactAnchor {
  anchorId: string
  triggerKeywords: string[]
  mustConsider: string
  mustNotSay: string
  suggestedNextQuestion: string
  humanConfirmHint: string
}

export const FACT_ANCHORS: ReadonlyArray<FactAnchor> = [
  // 15 entries hardcoded from docs/domain/DOMAIN_FACT_ANCHORS_v0.1.md
  // ENGINE 一次性 manually transcribe yaml → const array
  // 不做 runtime parse；不做文件读取；编译时确定
]

export function matchAnchors(question: string, imageSummary?: string | null): FactAnchor[] {
  // 简单 substring keyword match
  const haystack = `${question} ${imageSummary ?? ''}`.toLowerCase()
  return FACT_ANCHORS.filter(a =>
    a.triggerKeywords.some(kw => haystack.includes(kw.toLowerCase()))
  )
}
```

**约束**：
- 简单 substring match，**不**做正则、tokenizer、embeddings、RAG
- 同一 anchor 多关键词命中只算 1 次
- 多 anchor 命中按 docs/domain 中出现顺序保留
- 命中数无上限（DOMAIN 已限制每场景 trigger ≤8）

### §2.2 Stream route 集成

`app/api/consultation/stream/route.ts`：

1. import `matchAnchors`
2. 在收到用户 question 后 + LLM call 前：
   ```ts
   const matchedAnchors = matchAnchors(question, imageSummary)
   const anchorIds = matchedAnchors.map(a => a.anchorId)
   ```
3. 把 anchors 转为 prompt 输入：
   ```ts
   const messages = buildConsultationMessages({
     userQuestion: question,
     imageSummary,
     factAnchors: matchedAnchors.map(a => ({
       id: a.anchorId,
       text: [
         `必考虑：${a.mustConsider}`,
         `不得说：${a.mustNotSay}`,
         `建议追问：${a.suggestedNextQuestion}`,
         `Human review hint：${a.humanConfirmHint}`,
       ].join(' / '),
     })),
   })
   ```
4. DB 写入 `fact_anchor_ids`：
   ```ts
   await createAiConsultation({
     ...,
     factAnchorIds: anchorIds,  // string[]
   })
   ```

### §2.3 Tests

`scripts/test/test-consultation.ts` 扩展：
- anchor matching unit test：5+ cases（具体 keyword → 命中 anchor_id）
- empty match：无 keyword question → 空数组
- multi-anchor：含多 keyword 的 question → 多 anchor 命中
- prompt 注入 contract：matchedAnchors 进入 messages 末尾

## 3. Out of Scope

- ❌ 不动 DOMAIN_FACT_ANCHORS_v0.1.md（DOMAIN 文件，draft 状态保留）
- ❌ 不实现 RAG / embedding / vector match
- ❌ 不改 system prompt body（VOICE Issue #55 处理）
- ❌ 不改 ai_consultations schema（field 已在 0023）
- ❌ 不改 eval-lab 路径
- ❌ 不引入新 env var

## 4. Sensitive path

允许：
- `lib/consultation/fact-anchors.ts`（新建）
- `app/api/consultation/stream/route.ts`（修改 — 在 anchor matching + prompt build + DB write 处）
- `lib/answer/prompt/consultation-alpha-v1.ts`（如需调整 anchor render 格式）
- `scripts/test/test-consultation.ts`

不可触：
- DOMAIN_FACT_ANCHORS_v0.1.md（文件本身）
- DS prompt 主体（CONSULTATION_ALPHA_SYSTEM_PROMPT 字面量）
- ai_consultations schema
- eval-lab 路径

## 5. Acceptance

| # | 标准 | 检测 |
|---|------|------|
| A | 15 anchors 在代码中可枚举 | grep `FACT_ANCHORS` length |
| B | 5+ 关键词触发对应 anchor | unit test |
| C | DB row 的 `fact_anchor_ids` 包含命中 id | live curl after deploy |
| D | Learning Console 详情页能看到 fact_anchor_ids | 已建 |
| E | tsc/lint/build clean + tests pass | local |

## 6. 完成回报

```
PR: #XX
Commit: <sha>
Vercel: SUCCESS
Anchor matching tests: N/N
Live verification: question "我配偶离婚后能不能继续留" → anchor=spouse_divorce ✓
prompt content rendered with anchor: <yes/no, sample>
```

## 7. Migration / deploy

无 schema 变更，无 migration。Vercel SUCCESS 即可 merge。

## 8. 与其他 Workstream 协调

- DOMAIN #42：已 deliver，不再触
- VOICE #55：可能微调 system prompt body（不冲突）
- CODEXUI #52：UI 层 fact_anchor_ids 已在 Charter §6 detail 字段；不需要改
- QA #53：完成后 QA 在 §3.3 中包含 anchor injection 验证（content 含 must_consider 倾向）
