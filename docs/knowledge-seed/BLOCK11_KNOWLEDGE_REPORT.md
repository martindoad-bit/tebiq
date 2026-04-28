# BLOCK 11 知识库 batch-03 完成报告（CCB）

**生成时间**：2026-04-28
**分支**：`content/knowledge-batch-03`（基于 origin/main HEAD `f3100ca`）
**状态**：push 完成，**未 merge**（等 CCA 触发 merge + import）

---

## 完成情况

### 总数：30 篇 P1 档案中心化内容（全新）

按 brief 分 4 主题：
- **主题 1：档案产品教育（5 篇）** ✓
- **主题 2：档案场景应用（10 篇）** ✓
- **主题 3：政策与档案关联（10 篇）** ✓
- **主题 4：档案与行政書士的关系（5 篇）** ✓

完整清单见下方。

---

## 哲学沉淀（B1）✓

按 brief 要求：
- ✓ 创建 `~/.claude/skills/tebiq-knowledge-base/product-philosophy.md`（完整哲学）
- ✓ `~/.claude/skills/tebiq-knowledge-base/voice.md` 顶部加产品哲学 v1 摘录
- ✓ `~/.claude/skills/tebiq-knowledge-base/templates.md` 顶部加产品哲学 v1 摘录
- 注：skill 文件不在 git 内，本地维护

CCB 在 30 篇内容写作时严格执行：
- Voice 工具感、不撒娇、不温情、不戏剧化、不 emoji
- 档案中心化语境（"已归档 / 已识别 / 时间线 / 第 N 件 X 类文书"）
- 不写"我帮你 / 守护你 / 陪你 / 你不孤单"等温情叙事

---

## 30 篇清单

### 主题 1：档案产品教育（5 篇）

| # | slug | title |
|---|---|---|
| 1 | tebiq-archive-what-is-stored | 我的 TEBIQ 档案保存了什么 |
| 2 | tebiq-archive-paid-retention | 为什么档案要付费保留 30 天后 |
| 3 | tebiq-archive-help-renewal | 档案如何帮助续签准备 |
| 4 | tebiq-archive-privacy | 档案隐私与数据保护 |
| 5 | tebiq-archive-after-deletion | 我注销后档案会怎样 |

### 主题 2：档案场景应用（10 篇）

| # | slug | title |
|---|---|---|
| 6 | archive-before-permanent-residency | 永住申请前 1 年：档案该怎么用 |
| 7 | archive-before-renewal-3months | 续签前 3 个月：档案能告诉我什么 |
| 8 | archive-incoming-letter | 收到信件：档案如何快速比对历史 |
| 9 | archive-policy-update-match | 政策更新：档案如何匹配影响 |
| 10 | archive-job-change | 换工作：档案要更新哪些字段 |
| 11 | archive-marriage-divorce | 我刚结婚 / 离婚，档案要更新什么 |
| 12 | archive-financial-tax | 我要做 確定申告，档案能拿出哪些数据 |
| 13 | archive-emergency-medical | 我入院 / 遇到灾害，档案能拿出什么 |
| 14 | archive-children-school | 我的孩子要入学，档案能提供哪些手续材料 |
| 15 | archive-job-resignation | 我刚离职，档案在失业期的角色 |

### 主题 3：政策与档案关联（10 篇）

| # | slug | title |
|---|---|---|
| 16 | archive-eijuu-2026-revision | 永住法 2026/2/24 改订：档案哪些字段被影响 |
| 17 | archive-koudo-jinzai-points | 高度人材新规：档案积分怎么算 |
| 18 | archive-ikusei-shurou-2027 | 育成就労 2027/4/1 施行：哪些档案受影响 |
| 19 | archive-keiei-kanri-2025 | 経営・管理 2025/10/16 改正：档案该看什么 |
| 20 | archive-tokutei-zairyu-card | 特定在留カード 一体化：档案怎么同步 |
| 21 | archive-juuminzei-yearly | 住民税 年度切换：档案怎么记 |
| 22 | archive-saiyukoku-deadline | 再入国許可 期限：档案警报机制 |
| 23 | archive-haigusha-shinsei | 配偶者 签证审查：档案准备的角色 |
| 24 | archive-shinkoku-hosei | 入管 補正通知：档案如何快速回应 |
| 25 | archive-fuhou-zairyu-prevent | 不法滞在 预防：档案守底线 |

### 主题 4：档案与行政書士（5 篇）

| # | slug | title |
|---|---|---|
| 26 | archive-help-shoshi-judge | 我的档案如何帮助行政書士判断 |
| 27 | archive-when-authorize-shoshi | 何时该把档案授权给行政書士 |
| 28 | archive-shoshi-after-review | 行政書士看完档案后会做什么 |
| 29 | archive-9800-consultation-value | TEBIQ ¥9,800 咨询的真实价值是什么 |
| 30 | archive-shoshi-vs-self | 哪些 case 自己解决 / 哪些必找行政書士 |

---

## 结构合规

### Frontmatter（每篇 30 篇都有）

```yaml
title: <场景化对话标题>
category: <decision | policy-update | ...>
slug: <kebab-case>
scenario_tags: ["..."]
applies_to: ["..."]
urgency_level: low | medium | high
estimated_read_time_minutes: <int>
last_verified_at: "2026-04-28"
sources_count: <int>

# schema 兼容字段（CC-A 改造中），全部 null
requires_shoshi_review: null
last_reviewed_by_name: null
last_reviewed_by_registration: null
review_notes: null
```

### 6 段法保留

每篇都有：
1. ## 这事跟我有关吗？
2. ## 这是什么
3. ## 你应该做什么
4. ## 不做的后果
5. ## 什么时候你应该找专家（"建议咨询行政書士。TEBIQ 提供专业咨询服务（[预约](/consultation)）"）
6. ## 信息来源

### 中日混合规则

继续遵守：在留期間更新 / 住民税 / 確定申告 / 在留カード / 入国管理局 / 永住 / 経営・管理 / 公租公課 等保留日文。

### 信息来源

每篇 markdown 链接 + 取得日 2026-04-28，优先 .go.jp 一手 + TEBIQ 自身页面（/privacy / /pricing / /consultation 等）。

---

## B3：现有 75 篇微调（未做）

按 brief，B3 标注为"可选"。本次未做的原因：
- batch-02 的 50 篇还未合并到 main（按创始人指令暂停）
- 在未确认 batch-02 状态前，不动 batch-02 / batch-01 的内容
- 等 batch-02 / batch-03 都合并到 main 后，下一个批次再做风格统一审视更稳

---

## 给 CCA 的待办

按 brief §A1 + §A2，CCA 需要：

1. **不需要立刻 merge batch-03**：等创始人对 batch-02 的状态裁决（先 merge batch-02 还是先 merge Block 10 还是其他顺序）
2. **batch-03 的依赖**：batch-03 的 30 篇 frontmatter 含新字段（scenario_tags / applies_to / urgency_level / estimated_read_time_minutes）。这些字段在 articles 表 schema 中应已就位（Block 10 范围内 codex/block-10 的 schema 改动，但 Block 10 也未合并）。merge batch-03 前需确认 articles 表 schema 已 ready。
3. **import 脚本**：CCA brief 提到改造 import 脚本不管旧 frontmatter 字段。改造完后跑 `npm run import-knowledge` 应能把 batch-03 + batch-02 的所有 markdown 都正确 upsert 到 articles 表。

---

## 给创始人的备注

batch-03 与 batch-02 / Block 10 的依赖关系：

- batch-02（50 篇）→ 旧 frontmatter（含 requires_shoshi_review=true）
- batch-03（30 篇）→ 新 frontmatter（含 scenario_tags 等，requires_shoshi_review=null）

这两批 frontmatter 字段**不完全相同**。CCA 在 schema 迁移 + import 改造时需兼容两套：
- 旧字段：requires_shoshi_review / last_reviewed_by_* / review_notes（保留 column，全部 null）
- 新字段：scenario_tags / applies_to / urgency_level / estimated_read_time_minutes（需新增 column）

如果 codex/block-10 的 schema 已加了新 column（之前 stash 的 lib/db/schema.ts 改动包含这些字段），那么 merge 顺序应该是：
1. Block 10（schema + 文字即懂功能）→ main
2. batch-02（50 篇旧结构）→ main
3. batch-03（30 篇新结构）→ main
4. visual-polish-3（视觉）→ main
5. CCA 跑 npm run import-knowledge

---

## 文件位置

- 30 篇 markdown：`docs/knowledge-seed/archive-*.md` + `docs/knowledge-seed/tebiq-archive-*.md`
- 本报告：`docs/knowledge-seed/BLOCK11_KNOWLEDGE_REPORT.md`
- 哲学（CCB 本地）：`~/.claude/skills/tebiq-knowledge-base/product-philosophy.md`
- 分支：`content/knowledge-batch-03`（push 完成，未 merge）

🤖 by tebiq-knowledge-base skill (Block 11 with product-philosophy v1)
