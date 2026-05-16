# TEBIQ 0.8 Materials Tab Product UI Plan

**Status:** active / product UI plan
**Owner:** CODEXUI + Codex Production Lead
**Last updated:** 2026-05-16
**Consumers:** ENGINE, CODEXUI, QA, FACT, DOMAIN, Product Copy

> This restores the missing Materials Tab UI handoff referenced by the 0.8
> operating plan. It is intentionally product-UI guidance, not FACT source data
> and not legal/domain judgement.

---

## 0. Canonical Naming

User-facing name:

```text
材料
```

Allowed page title:

```text
材料清单
```

Internal / route name:

```text
/quick-reference
Quick Reference
```

Deprecated user-facing name:

```text
速查
```

Reason: the product surface is no longer a casual "quick lookup" page. It is a
structured official-material checklist surface for users preparing or verifying
common residence procedures.

---

## 1. Product Job

The Materials Tab serves the "small-known" user:

- they roughly know the event or procedure;
- they want to check official material requirements in Chinese;
- they may return multiple times while preparing documents;
- they do not need AI to judge their whole case yet.

Examples:

- renewing 技術・人文知識・国際業務;
- renewing 経営・管理;
- 家族滞在 update;
- 留学 update by school category;
- 永住 application materials;
- common documents such as 課税証明書, 納税証明書, 住民票, 在職証明書.

Materials Tab does **not** decide:

- whether the user will be approved;
- whether their special facts satisfy a legal/practice standard;
- whether a deep-water situation is safe to self-handle.

Those go to 提问 or professional confirmation.

---

## 2. Information Architecture

Primary navigation is scenario-first.

Recommended top-level grouping:

| Group | Examples |
|---|---|
| 续签材料 | 技人国更新, 経営管理更新, 家族滞在更新, 配偶者更新, 留学更新 |
| 申请材料 | 永住申请, 経営管理变更/申请 after source review |
| 常用材料 | 課税証明書, 納税証明書, 住民票, 在職証明書, 登記事項証明書 |
| 届出与变更 | 搬家, 换工作, 离职, 所属機関届出 |

Do not make official agency taxonomy the first-level user navigation.

Avoid as top-level groups:

- 入管
- 市区町村
- 税務署
- 年金

These can appear inside cards as `去哪取` / `去哪办`.

---

## 3. Page Structure

### First Screen

Must show:

1. title `材料`;
2. search input;
3. 3-5 common chips;
4. first useful checklist card visible without long intro.

Do not add:

- marketing explanation;
- AI capability explanation;
- long "how to use this page" copy;
- hero section.

### Scenario Card Collapsed

Collapsed card should show:

- scenario title;
- short summary;
- status chips, e.g. `续签材料`, `需确认`, `10 项材料`;
- one timing / warning line if relevant;
- source count or confidence cue;
- expand icon.

Collapsed card should not show the full material list.

### Scenario Card Expanded

Expanded scenario should show sections in this order:

1. 适用场景
2. 先确认
3. 材料清单
4. 常见卡点
5. 来源
6. 带着这件事提问

### Material Item Collapsed

Every material item is collapsed by default on mobile.

Collapsed item should show:

- document name in Chinese + Japanese where useful;
- who prepares it;
- small status badge, e.g. `通常需要`, `按情况`, `先确认`.

### Material Item Expanded

Expanded item may show:

- 日文名;
- 谁准备;
- 去哪取;
- 有效期 / 时间点 if source-backed;
- 注意点;
- related scenarios;
- source link.

---

## 4. Cross-Reference Model

Materials Tab must support two-way cross references:

```text
Scenario -> Common Material
Common Material -> Used In Scenarios
Answer -> Matching Materials Topic
Materials Topic -> Ask with prefilled context
```

Examples:

- 経営管理更新 -> 課税証明書 -> used in 永住 / 家族滞在 / 技人国更新
- 技人国更新 -> 所属機関カテゴリ -> ask TEBIQ if category uncertain
- 留学更新 -> school category -> ask TEBIQ if school class unknown

Cross-links must be explicit mappings, not free-form string guesses.

---

## 5. Copy Rules

Use:

- `材料`
- `材料清单`
- `谁准备`
- `去哪取`
- `先确认`
- `按情况`
- `直接依据`
- `相关来源`
- `带着这件事提问`

Avoid:

- `速查`
- `应急`
- `行动包`
- `任务`
- `搞定`
- `一键准备`
- `材料齐了就能通过`

Warning copy should be close to the checklist context:

```text
材料清单帮你整理准备范围，不判断是否符合申请或能否许可。
```

---

## 6. Mobile Behavior

Mobile is primary.

Rules:

- scenario cards collapsed by default;
- material items collapsed by default;
- only one scenario needs to be open at a time unless user explicitly opens another;
- long Japanese document names wrap cleanly;
- status chips must not crowd the title;
- bottom navigation must not cover final source / ask bridge;
- no nested card-inside-card look unless the nested block is a repeated material item.

QA viewports:

- 360 x 740;
- 390 x 844;
- 430 x 932.

---

## 7. Source / Trust Display

Source labels:

| Label | Meaning |
|---|---|
| `直接依据` | The source directly supports the displayed claim or checklist item. |
| `相关来源` | The source is relevant but does not directly prove every displayed detail. |
| `需确认` | FACT/DOMAIN has not fully resolved the practical boundary. |

Do not overstate trust:

- If source is related only, do not label as direct.
- If PDF extraction was incomplete, mark source state in internal data and avoid
  user-facing certainty.
- If DOMAIN review is pending, show `按情况` or route to Ask.

---

## 8. Release Gate

Before a Materials UI change ships, QA must confirm:

- user-facing label is `材料`, not `速查`;
- answer labels on 提问 are unchanged;
- search and chips work on mobile;
- collapsed and expanded states are readable;
- source block does not compress the card into a narrow column;
- ask bridge opens a usable prefilled question;
- warning does not imply legal approval judgement;
- no model names or internal fields appear.

Reference:

- `docs/product/TEBIQ_COPY_CANON.md`
- `docs/product/TEBIQ_PRODUCT_UI_GUARDRAILS.md`
- `docs/qa/TEBIQ_0_8_QA_PLAN.md`
