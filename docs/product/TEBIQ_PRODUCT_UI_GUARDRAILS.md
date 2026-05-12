# TEBIQ Product UI Guardrails

**Status:** canonical / prelaunch gate  
**Owner:** Codex GM-OPS + Project Lead  
**Consumers:** ENGINE, CODEXUI, QA, VOICE/Copy, AQL, GM  
**Last updated:** 2026-05-12

---

## 0. Why This Exists

TEBIQ is entering a stage where most regressions are not single broken buttons. They are product-quality regressions:

- one page gets better while another page starts feeling unfinished;
- a new trust feature makes mobile layout collapse;
- a copy change explains too much and weakens the entry flow;
- a failure state hides the recovery action below supporting content;
- different windows make locally reasonable UI choices that do not add up to one product.

This document is the product UI guardrail for that failure mode. It defines what must stay true after every UI, copy, evidence, answer-page, or app-shell change.

**Goal:** every user-facing change should increase trust, clarity, or maturity without lowering another part of the product.

---

## 1. Non-Negotiable Product Invariants

### 1.1 One Mobile App Shell

All primary user pages must feel like the same mobile app:

- same page width behavior;
- same horizontal content rail;
- same bottom navigation safe area;
- same title alignment rule;
- same card density level;
- same recovery action placement.

If a page needs to break the shell, the PR must state why.

### 1.2 One Primary Job Per Screen

Every screen must answer one user question:

| Screen | User question |
|---|---|
| Ask | "Can I ask this quickly?" |
| Answer | "What should I understand and do next?" |
| My Consultations | "Can I find what I asked before?" |
| Scrivener | "How do I talk to a person if I need to?" |
| Quick Reference | "Can I quickly check a common rule?" |

If a screen introduces copy or buttons that serve a second job, demote or remove them.

### 1.3 Half-Finished Features Do Not Pretend To Be Finished

If a feature is not useful enough for a normal user, do not expose it as a full tab.

Allowed states:

- fully usable;
- disabled / "整理中";
- hidden.

Not allowed:

- visible but thin;
- searchable but mostly not found;
- exposed as a tab while interaction is unfinished.

### 1.4 Trust Assets Must Never Break Layout

Evidence and source cards are product trust assets. They must make TEBIQ feel more reliable.

If evidence cards on mobile become narrow, vertical, crowded, clipped, or hard to scan, that is a trust regression.

---

## 2. Mobile Layout Rules

### 2.1 Primary Viewport

Primary QA viewport:

- iPhone 13 Pro class width, in WeChat browser and normal mobile browser;
- then smaller mobile width smoke;
- then desktop smoke.

Desktop passing does not count as mobile passing.

### 2.2 Content Rail

Primary mobile pages must use one consistent content rail:

- no page should appear to drift left or right compared with other tabs;
- outer padding must be stable across Ask / Answer / My Consultations / Scrivener / Quick Reference;
- cards should align to the same left edge as page text unless there is an intentional nested block.

Nested cards are allowed only when they add meaning. Nested cards must not create a "thin column" effect.

### 2.3 Title Alignment

Default rule:

- primary tab pages use left-aligned page titles;
- answer/detail pages use left-aligned titles;
- empty states may center content inside the empty-state card, but the page title still follows the page rule.

Centered page titles require a stated exception in the PR.

### 2.4 Bottom Navigation Safe Area

Any page with bottom navigation must reserve enough bottom space for:

- final content;
- expanded cards;
- failure recovery controls;
- share / follow-up actions.

Content must not disappear behind the bottom nav or feel visually trapped by it.

Do not overcompensate with excessive blank space. Add safe area only where content can reach the bottom.

---

## 3. State And Action Rules

### 3.1 Failure / Incomplete State

When an answer fails or remains incomplete, recovery comes first.

Order:

1. clear status;
2. primary recovery action;
3. short explanation;
4. supporting content, if still useful.

Never put the retry / regenerate action below all evidence cards.

Evidence in failure state must be demoted or hidden unless it directly helps the user understand what happened.

### 3.2 Completed Answer State

The completed answer page should prioritize:

1. answer;
2. evidence / sources;
3. natural next action.

Do not recreate a control panel below the answer. If there are more than two near-equal actions, the interaction is probably wrong.

### 3.3 Button Hierarchy

Each screen should have:

- at most one primary action;
- one or two secondary actions only when needed;
- tertiary actions grouped or hidden.

Buttons must not wrap awkwardly on iPhone 13 Pro. If a label does not fit, shorten the label before enlarging the control.

### 3.4 Auto Record / Save

The product model is auto-recording, not manual save.

Avoid asking users to save something that is already recorded. Use "My Consultations" as the place to review and delete records.

---

## 4. Copy Rules

### 4.1 Do Not Repeat What The UI Already Says

If an input box is visible, do not spend a sentence saying "write it here."

If a tab is named "My Consultations," do not over-explain that it contains consultations unless the state is empty.

### 4.2 Homepage Copy Must Be Motive-First

The Ask page first viewport should match the user's reason for opening TEBIQ:

- concrete;
- short;
- not instructional;
- not marketing;
- not app-demo language.

Preferred current direction:

```text
在留问题，先问一下。
换工作、更新、离婚、年金、搬家。
```

The input itself carries the instruction.

### 4.3 Labels Must Be Neutral And Durable

Avoid labels that only fit some cases:

- avoid "今天先做" as a universal section name;
- avoid urgent language when the matter may not be urgent;
- avoid "继续问" if "追问" is clearer and more product-like.

Use labels that work across immigration, tax, pension, work, family, and notification cases.

---

## 5. Evidence Layer Rules

### 5.1 Evidence Is A Trust Asset

The evidence block should make users feel:

> TEBIQ is not making this up. It knows where the basis is, and I can check it.

This means:

- sources are visible enough to build trust;
- cards are clickable or clearly expose a clickable primary action;
- source labels are specific enough to be meaningful;
- links point to the relevant source, not a vague nearby topic.

### 5.2 Mobile Compact Mode

On mobile, evidence cards must degrade gracefully:

- title should remain readable in normal horizontal flow;
- badges must wrap below the title if needed, not squeeze title width;
- source details may collapse;
- claim text should be concise;
- "View original" is available but not visually dominant.

If a card title becomes vertical or cramped, it is P0.

### 5.3 Claim-Level Match

Evidence must support the specific claim it is displayed under.

Bad:

- answer says spouse renewal, source opens generic cancellation page.

Good:

- answer claim maps to a source locator that explains the exact rule or procedure.

If claim-level evidence is not available, show a weaker label and avoid overstating trust.

---

## 6. Quick Reference Rules

Quick Reference is only useful if it behaves like a small handbook.

Minimum bar before full tab exposure:

- search finds common Chinese user phrases;
- top cards answer a real immediate question;
- each card has at least one actionable rule;
- each expanded card has readable sources;
- mobile layout does not collapse;
- empty / no-result state suggests useful next steps.

If this bar is not met, the tab should be disabled or marked "整理中" until ready.

---

## 7. P0 / P1 UI Regression Rules

### P0

Block release / production push if any appears:

- mobile content rail visibly drifts across primary tabs;
- page title alignment changes without rule or exception;
- answer failure state hides retry / recovery below supporting content;
- evidence card becomes cramped, vertical, clipped, or unreadable on mobile;
- Quick Reference is exposed as finished while core search / card expansion is clearly broken;
- bottom navigation blocks primary content or primary action;
- user-visible internal fields, model names, enum strings, or debug terms appear.

### P1

Fix before broad user testing unless explicitly deferred:

- homepage copy is longer than needed for first action;
- placeholder wraps awkwardly or makes input feel broken;
- empty state repeats actions or uses administrative language;
- too many same-weight actions appear after answer completion;
- status copy is technically true but confusing to normal users;
- brand/logo/title rhythm differs page to page without reason.

### P2

Can be scheduled:

- minor badge wording;
- small spacing imbalance that does not affect trust;
- secondary copy polish;
- desktop-only refinement when mobile is clean.

---

## 8. Required Regression Paths

Any PR touching user-facing UI, copy, evidence, answer rendering, app shell, or bottom navigation must check these paths:

1. Ask page, empty input;
2. Ask page, input typed but no photo;
3. Ask page, photo attached;
4. Answer completed;
5. Answer incomplete / failed;
6. Evidence block collapsed and expanded;
7. My Consultations empty;
8. My Consultations with records;
9. Quick Reference initial view, if exposed;
10. Quick Reference card expanded, if exposed;
11. Bottom navigation switching across all visible tabs.

At minimum, provide iPhone 13 Pro screenshots or an explicit note that the path is temporarily disabled.

---

## 9. PR Checklist

Before merge / production push, answer:

- [ ] Does this preserve the mobile content rail?
- [ ] Does this preserve page title alignment rules?
- [ ] Does this keep one primary action per state?
- [ ] Does failure recovery appear before supporting content?
- [ ] Does evidence remain readable on iPhone 13 Pro?
- [ ] Does bottom navigation avoid covering content?
- [ ] Does copy avoid repeating visible UI?
- [ ] Is every exposed tab good enough to be treated as usable?
- [ ] Were Ask / Answer / My Consultations / Quick Reference checked if touched?
- [ ] If a rule is broken intentionally, is the exception written in the PR?

If any answer is "no," do not ship until the issue is fixed or explicitly accepted by Project Lead.

---

## 10. Operating Rule For Multi-Agent Work

Different windows may own different work:

- CODEXUI owns layout / interaction judgment;
- Copy owns product words;
- ENGINE owns implementation;
- QA owns regression and P-level classification;
- AQL owns answer quality pattern judgment;
- DOMAIN owns professional risk boundary.

But all of them must obey this document when work touches user-facing product experience.

Local improvements that violate these guardrails are regressions.
