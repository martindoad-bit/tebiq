# TEBIQ Quick Reference Spec

**Status:** active / product-engineering spec  
**Owner:** Codex GM-OPS + Project Lead  
**Consumers:** ENGINE, CODEXUI, FACT, DOMAIN, QA  
**Last updated:** 2026-05-12

---

## 1. Product Job

Quick Reference is for the "small-known" user: someone who already knows the rough event and wants to quickly check common requirements.

Examples:

- "I changed jobs. What do I need to check?"
- "I moved. What is the deadline?"
- "I left my job. What happens to health insurance and pension?"
- "I need a tax certificate for renewal or permanent residence."

It is not the main path for complex individual judgement. Complex cases should move to Ask.

---

## 2. Positioning

Quick Reference is:

- a fast checklist and source-backed reference surface;
- a way to reduce noise for users who do not want a long AI answer;
- a trust asset because official sources are visible and checkable;
- a bridge into Ask when the user's facts are not covered by the simple checklist.

Quick Reference is not:

- a general knowledge encyclopedia;
- a replacement for consultation;
- a place to answer deep practice questions;
- a raw fact-card dump.

---

## 3. Required Card Shape

Each user-facing card must contain:

| Field | Purpose |
|---|---|
| title | User-language event, not official taxonomy |
| summary | One-line explanation of the use case |
| deadline | The time-sensitive point, visible before expansion |
| whereToGo | The most likely counterparty or office |
| prepare | Materials or facts to collect first |
| facts | 2-3 concise rules with verification state |
| checkNote | What may differ by individual situation |
| sources | Official or high-quality sources |
| askPrompt | Pre-filled Ask prompt for this topic |

If a card cannot satisfy this shape, it should not be promoted as a full Quick Reference card yet.

---

## 4. Navigation Rule

Primary navigation is event-based, not agency-based.

Use:

- 换工作
- 搬家
- 离职
- 年金税金
- 永住

Avoid making official categories the main entry:

- 出入境
- 社保
- 税金
- 在留卡

Official categories can exist as secondary filters.

---

## 5. Ask Bridge

Every card should have a bridge back to Ask:

> 带着这件事提问

The prefilled question should include the event and the most likely uncertainty. This keeps Quick Reference and Ask as two entry modes of one product:

- Quick Reference -> Ask when the checklist is not enough.
- Ask -> Quick Reference when the answer has a matching checklist.

The Ask -> Quick Reference bridge uses explicit fact-card mapping, not free-form string matching:

- Quick Reference topics declare `factCardIds`.
- Answer pages read injected fact-card audit rows.
- If a topic maps to an injected or hint-only fact card, the answer can show a compact "可快速核对" bridge.
- The bridge should stay secondary. It must not compete with reading the answer, reference sources, or follow-up.

---

## 6. Source Display

Sources are trust assets, not primary reading content.

Default rule:

- show source count on collapsed card;
- keep sources inside expanded card;
- do not let source cards make the card narrow or vertical on mobile;
- label direct sources as "直接依据" only when the target source supports the displayed claim.

If the source is merely related, label it as "相关" and do not overstate it.

---

## 7. Maintenance

Fact cards may provide raw evidence and official URLs, but Quick Reference cards need a user-readable layer.

Do not expose raw prompt-injection text as user-facing Quick Reference content.

FACT may propose candidate cards. ENGINE owns the product-facing data shape. DOMAIN reviews high-risk or practice-sensitive claims.
