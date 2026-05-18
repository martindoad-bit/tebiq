# TEBIQ Answer Supremacy Principle

**Status:** canonical / current product direction
**Owner:** Founder + Codex Production Lead
**Last updated:** 2026-05-18
**Supersedes:** treating fixed answer shells, card counts, or UI decoration as the product goal

## 1. Core Goal

TEBIQ's next product goal is simple:

> Make the consultation answer experience better than DeepSeek 4 Pro with web search on high-value residence and immigration questions.

"Better" means all of the following at once:

1. The conversation is as smooth, natural, dense, and easy to read as a native AI chat product.
2. The answer is more accurate and more credible because it is supported by curated official sources, vetted practitioner sources, material entities, and professional handoff logic.
3. The answer preserves the large model's natural reasoning structure instead of wrapping it in product-manager shells.

This is the product target. Knowledge cards, materials, L5 routing, and evaluation tools are infrastructure serving this target.

## 2. What Must Stop

Do not add UI or answer structure merely to make TEBIQ "look like a product."

The following patterns are treated as pollution unless a newer decision explicitly restores them:

- heavy answer cards around ordinary chat content;
- warning boxes that make the user more anxious without adding a concrete safety action;
- fixed labels that force every answer into the same artificial outline;
- chips/buttons that duplicate what a good answer can say naturally;
- internal terms exposed to users;
- card-count targets pursued without improving answer quality or material usefulness.

The user-facing answer should feel like a strong native AI answer from someone who understands the domain, not like an AI answer trapped inside SaaS-era scaffolding.

## 3. What TEBIQ Adds That Native AI Does Not

TEBIQ should not beat DeepSeek by adding more visible UI. It should beat it by adding hidden domain leverage:

- **Official source layer:** immigration, tax, pension, health insurance, municipal, and court/government sources.
- **Practitioner source layer:** vetted administrative scrivener and specialist explanations, especially where official law and practical filing behavior diverge.
- **Materials layer:** reusable material entities that explain what a document is, who prepares it, where to get it, validity, reuse, and common mistakes.
- **L5 / practical signal layer:** situations where AI must not over-decide and should hand the user to the right professional with the right preparation.
- **Scrivener bridge:** a natural, transparent route from difficult questions to paid professional confirmation.

For users: light surface.
Behind the answer: thick system.

## 4. Evaluation Loop

Future answer work should run in loops against DeepSeek 4 Pro with web search.

Each loop should use 30-50 realistic, high-value user questions and score:

| Dimension | Question |
|---|---|
| Correct conclusion | Is the key conclusion right, including practical procedure vs legal theory? |
| Practical accuracy | Does it capture real filing behavior and risk, not just statutes? |
| Consultation feel | Does the answer feel fluent, calm, and useful instead of over-packaged? |
| Trust support | Does it show why the answer can be trusted without overwhelming the user? |
| Material usefulness | Does it connect to concrete documents or material pages when useful? |
| Professional bridge | Does it hand off naturally when the situation is deep-water? |
| No decoration penalty | Does UI or fixed structure make the answer worse than the raw model answer? |

TEBIQ should only claim improvement when it beats the comparison answer on the overall consultation experience, not just on internal source coverage.

## 5. Legacy Four-Label Format

The labels:

```text
先看这里
当前判断
建议动作
暂缓事项
```

are legacy runtime / regression constraints from an earlier phase. They may still exist in production code and tests until the Answer Experience rewrite removes or replaces them deliberately.

They are **not** the future user-facing answer UX canon.

New answer work must not preserve these labels merely because old documents froze them. If removal affects terminal guards or regression tests, update the implementation and tests together.

## 6. Current Technical Direction

1. Run Cleanup Loop 0: archive stale plans, mark polluted docs, and establish a small canonical read path.
2. Build the DeepSeek comparison loop before doing more broad UI or card expansion.
3. Reduce the consultation UI so the model answer is the main surface.
4. Add a whitelist practitioner-source crawler / practical-card pipeline.
5. Keep expanding material entities where they improve user and business reuse.

The goal is not "more features." The goal is a better consultation.
