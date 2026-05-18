# TEBIQ Copy Canon

**Status:** active / current-app copy registry; legacy answer UX constraints are superseded for future Answer Experience work
**Owner:** Codex Production Lead + Product Copy
**Last updated:** 2026-05-18
**Consumers:** ENGINE, CODEXUI, QA, AQL, Product Copy, GM

> This file exists to stop copy drift. If another document says "final copy" but
> conflicts with this file, this file wins unless a newer Decision Log says
> otherwise. For future answer UX, `TEBIQ_ANSWER_SUPREMACY_PRINCIPLE.md` and
> newer Decision Log entries override older fixed-label requirements.

---

## 0. Scope

This is not a complete copy deck. It freezes only the phrases and naming that
must not drift.

For principles and workflow, also read:

- `docs/product/TEBIQ_COPY_SOURCE.md`
- `docs/product/TEBIQ_PRODUCT_UI_GUARDRAILS.md`
- `docs/product/TEBIQ_QA_GATES.md`

---

## 1. Current Navigation / Surface Names

| Surface | Current user-facing name | Notes |
|---|---|---|
| Consultation entry | `提问` | Keep short. Do not use `问 AI`. |
| Materials checklist | `材料` | Preferred tab label. Page title may use `材料清单`. |
| Consultation history | `咨询记录` | Do not over-explain in the tab label. |
| Scrivener lead path | `找书士` | Current product label; do not imply TEBIQ is the scrivener. |
| Internal Eval Lab | `Eval Lab` / `中台` | Internal only; never public navigation. |

### Deprecated for user-facing navigation

| Deprecated | Replacement | Why |
|---|---|---|
| `速查` | `材料` / `材料清单` | The surface is not casual lookup; it is structured official-material preparation. |
| `Quick Reference` | internal route/spec name only | English engineering name, not app copy. |
| `问 AI` | `提问` / `问 TEBIQ` where needed | Generic AI label weakens trust and exposes mechanism. |
| `我的咨询` | `咨询记录` | Records are auto-saved consultations; the label should be short and stable. |

---

## 2. Legacy Runtime Answer Labels

The current production runtime may still depend on these labels through prompts,
terminal guards, or regression tests:

```text
先看这里
当前判断
建议动作
暂缓事项
```

Legacy rules while the old runtime remains in place:

- all four labels must appear in generated answers or terminal-guarded output;
- do not rename `当前判断` to `结论`;
- do not rename `建议动作` to `今天先做`;
- do not rename `暂缓事项` to `注意事项` or `暂时不要`;
- do not restore old answer-section systems without a new Decision Log entry.

Important 2026-05-18 update:

- these labels are **not** the future Answer Experience canon;
- they must not be used as a reason to add answer cards, warning boxes, or
  product-manager shells;
- if the Answer Experience rewrite removes them, update prompts, terminal guards,
  and tests together instead of preserving the labels cosmetically.

Historical answer labels that are **not current canon**:

```text
最紧的两件
步骤
要带什么
期限
不做会怎样
要找专家的情况
复制给客户
```

These may still appear in archived reports, old seed data, or legacy answer
experiments. They must not be used as current answer-page headings unless the
current product owner explicitly reopens that design.

---

## 3. Materials Tab Copy Direction

User-facing direction:

- `材料`
- `材料清单`
- `续签材料`
- `官方材料清单`
- `带着这件事提问`

Avoid:

- `速查`
- `应急通道`
- `办事陪伴`
- `任务`
- `行动包`
- `一键准备`
- `材料齐了就能通过`

Minimum language standard:

- phrase as what the user is doing, not what the system is doing;
- show official-source confidence without sounding like a legal conclusion;
- keep high-risk practice judgement in 提问 / professional confirmation.

---

## 4. User-Facing Bans

Never expose these on user-facing surfaces:

- `DeepSeek`
- `ChatGPT`
- `Claude`
- `GPT`
- `AI 智能分析`
- `fallback_reason`
- `safety_gate`
- `route_gate`
- `guardrail`
- `unknown`
- `null`
- `undefined`
- sidecar JSON or internal enum names

Never promise:

- `一定通过`
- `一定不通过`
- `保证`
- `成功率`
- `包过`
- `一键搞定`

---

## 5. Product-Copy Archive Rule

Files under `docs/product-copy/` are historical copy assets unless this file or
`TEBIQ_COPY_SOURCE.md` explicitly promotes a phrase into current canon.

Known historical files:

- `APP_COPY_FINAL_V2.md`
- `ANSWER_APP_COPY_V2.md`
- `HOMEPAGE_APP_COPY_V2.md`
- `PRODUCT_COPY_BIBLE.md`

They still contain useful voice lessons, but their "final" wording is not
current unless repeated here.
