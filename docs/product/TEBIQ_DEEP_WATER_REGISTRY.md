# TEBIQ Deep Water Registry

**Status:** draft / pre-scrivener workshop  
**Owner:** Codex GM-OPS + Project Lead  
**Consumers:** ENGINE, AQL, DOMAIN, FACT, QA  
**Last updated:** 2026-05-12

---

## 1. Product Definition

"Deep water" means a consultation zone where public rules, procedure labels, status names, window wording, and practical review substance can diverge.

The goal is not to make TEBIQ confidently answer every practical nuance. The first goal is:

> detect the zone early, split the layers, avoid wrong-direction advice, and route the user toward confirmation when needed.

This is a trust feature. A product that admits the deep water at the right moment is safer and more credible than a product that forces a binary answer.

---

## 2. Non-Negotiable Answer Rule

When a deep-water pattern is detected, the answer must not collapse these layers:

1. 在留资格名称
2. 申请表/手续名称
3. 入管窗口口语
4. 实际审查内容
5. 用户下一步行动

The answer should say what can be confirmed from public sources and what must be confirmed by the window or a professional.

---

## 3. Current Engineering State

Engineering scaffold:

- matcher: `lib/consultation/deep-water.ts`
- test: `lib/consultation/deep-water.test.ts`

Important: this scaffold is not yet wired into production answer generation. It is intentionally held before the scrivener meeting so that practice-sensitive assumptions do not get baked into user answers too early.

---

## 4. Seed Patterns

The current registry starts with seed patterns derived from known product failures and official-source-safe framing.

| Pattern | Risk | Current stance |
|---|---|---|
| 日本人配偶者等：离婚再婚时的手续名与审查实质分离 | P0 | Do not say "must be change application"; split procedure label and review substance |
| 技人国转职：14日届出、资格范围、更新/变更审查分离 | P0 | Split 14-day notification from status-scope judgement |
| 经营管理：资格名不变与事业实质重审分离 | P1 | Treat company/business changes as possible review-substance changes |
| 入管通知：补材料、不许可、再申请、审查请求分离 | P0 | First identify notice type and deadline |
| 申请中特例期间：停留状态与可从事活动范围分离 | P1 | Split "can stay" from "can start/continue activity" |

---

## 5. Scrivener Workshop Questions

For each candidate pattern, ask the scrivener to provide only:

1. Is this truly a practice-sensitive deep-water zone?
2. What is the most common user misunderstanding?
3. What should TEBIQ never say?
4. What one-sentence confirmation path is safe?
5. Does this belong in user-facing answer, Quick Reference, or only handoff guidance?

Do not ask the scrivener to write full golden answers at this stage.

---

## 6. Acceptance Criteria For Production Wiring

Before wiring this into answer generation:

- DOMAIN/scrivener confirms the pattern list or marks disputed patterns;
- AQL reviews whether the prompt hook reduces wrong-direction answers without making answers evasive;
- QA runs at least one case per P0 pattern and confirms no "binary overclaim";
- ENGINE confirms follow-up answers use the same deep-water context as initial answers.

If these are not true, keep the registry as a non-production scaffold.
