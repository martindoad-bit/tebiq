# Answer Seed v1 — 报告（ANSWER_SEED_V1_REPORT）

**生成**：2026-04-30
**分支**：`content/answer-seed-v1`（基于 `origin/content/answer-seed-v0`）
**任务性质**：强化 v0 100 条 — 让用户常见问题更容易命中答案

---

## 强化总览

| 强化项 | v0 | v1 | 增量 |
|---|---|---|---|
| Q 总数 | 100 | 100 | 0（不增删） |
| aliases 总条数 | ~425 | **837** | +412 |
| test_queries 总条数 | 0 | **350** | +350（全新）|
| first_screen_answer | 0 | **30** | TOP30 全部加上 |
| why_not_simple_answer | 0 | **26** | 高风险题全部 |
| expert_handoff | 部分 | **26** | 高风险题统一格式 |

---

## 强化 1：aliases 增加情况

### 数量

- **v0**：每条 4 条 aliases，总计 ~425 条
- **v1**：每条 ≥5 条（多数 8-9 条），总计 **837 条**
- **增量**：+412 条用户口语表达

### 风格

新增 aliases 全部按用户实际输入风格：
- 第一人称 / 口语化
- 含错别字 / 不规范术语
- 多种表达方式（住民税 / 居民税 / 一般税；永住 / 永驻）
- 含场景化表达（"我..." / "公司..." / "刚刚..."）

举例（Q081 公司休眠 → 国民年金 切换）：
```yaml
aliases:
- 公司休眠了要不要交国民年金
- 公司不营业了社保怎么办
- 公司停了年金怎么办
- 转职中间没有社保怎么办
- 新工作前空白期交什么年金
- 老板说公司要关 我年金怎么交
- 厚生年金 → 国保 怎么切
- 健保証丢了怎么办（公司关门）
```

---

## 强化 2：test_queries 数量

### 数量

**350 条**（每条 Q 平均 3.5 条 test_queries）

### 区别 aliases vs test_queries

| 字段 | 用途 | 风格 |
|---|---|---|
| `aliases` | 同义问法（替代 `question` 的）| 抽象问句 |
| `test_queries` | 自动测试匹配质量 | 含具体细节：数字 / 时间 / 国籍 / 关系 / 个人情况 |

举例（Q057 离婚不满 3 年定住）：
```yaml
test_queries:
- 我跟日本老公结婚2年离婚了 有1岁孩子 能转定住吗
- 离婚刚满3年但是没有孩子 能拿定住者吗
- 日配 婚姻3年差1天 离婚 还能定住吗
```

### 用途

CCA 在 `/admin/answer-engine/test` 用 test_queries 跑自动匹配测试：
- 输入 test_queries[i] → 期望命中对应 Q
- 测命中率 + 召回率 + 误触发率
- 持续 retrain answer engine 的检索 / 排序 / 模糊匹配

---

## 强化 3：TOP30 first_screen_answer

### 30 条 TOP30 清单

按文件分布：

#### Q001-025（7 条）
- Q001 永住直近 5 年纳税完整性（workflow / A）
- Q003 永住者带父母来日（misconception / A）
- Q006 永住申请收入要多少（decision_card / B）
- Q007 高度人材 1 号 → 永住 1 年（workflow / A）
- Q010 永住放棄 / 再入国 / みなし再入国（info / A）
- Q017 换工作 14 日届出（workflow / A）
- Q024 公司倒闭 在留資格 立即取消（misconception / A）

#### Q026-050（11 条）
- Q026 経営・管理 改正 既存持有人（decision_card / B）
- Q027 経管 資本金 3000 万円 経過措置（workflow / A）
- Q028 経管 常勤職員 1 名以上 何时到位（workflow / A）
- Q029 経管 続签 法人税务跨地域証明（needs_expert / B）
- Q030 経管 役員報酬 月给多少最安全（decision_card / B）
- Q031 経管 公司休眠 / 解散 在留資格（needs_expert / B）
- Q036 経管 出资金 中国汇入 ODI 备案（needs_expert / C）
- Q040 経管 続签 决算赤字 救济路径（needs_expert / B）
- Q047 日本公司资本金 多少最合适（decision_card / A）
- Q048 定款 公証人 認証 流程（workflow / A）
- Q050 法人三税 加入时机（needs_expert / B）

#### Q051-075（5 条）
- Q057 离婚不满 3 年定住（needs_expert / B）
- Q058 抚养日本籍子女定住（workflow / A）
- Q063 配偶 在日实质婚姻判定（decision_card / B）
- Q065 DV 受害者特例（needs_expert / A）
- Q066 离婚后 6 ヶ月 在留資格変更（workflow / A）

#### Q076-100（7 条）
- Q076 住民税 何时该交 + 期限（info / A）
- Q081 公司倒闭 → 厚生年金 → 国民年金 切换（needs_expert / A）
- Q082 国保 / 社保 切换空白（workflow / A）
- Q091 老板雇错签证 我会被牵连吗（needs_expert / A）
- Q097 未读日文催缴信 快速识别（workflow / A）
- Q098 在留期間更新 不许可 → 補正 → 異議申立（needs_expert / A）
- Q099 不法滞在 自首 出国命令 vs 退去強制（needs_expert / A）

### 格式

每条 4 段（≤ 300 字）：
```yaml
first_screen_answer: |
  **结论**：[一句话明确答案 / 或「这个问题不能简单回答」]

  **先确认**：[2-3 个判断你属于哪类的关键问题]

  **下一步**：[1-3 个最可执行的动作]

  **边界**：[何时必须找专家 / 一般性边界声明]
```

13 条高风险题（needs_expert / misconception）的 first_screen_answer 以「这个问题不能简单回答」开头。

---

## 强化 4：高风险 26 条修正

### 26 条高风险题（按 answer_type 标记）

needs_expert（16）+ misconception（3）+ risk_chain（7）= **26 条**

| Q | 类型 | who | 关键 trigger |
|---|---|---|---|
| Q003 | misconception | 行政書士 | 父母真有看护需要 / 高度人材积分 |
| Q004 | needs_expert | 行政書士 + 弁護士 | 罰金以上 / 略式命令 |
| Q005 | needs_expert | 社労士 + 行政書士 | 公司未交社保 + 永住前 |
| Q013 | misconception | 行政書士 | 5 件以上 / 罰金以上 |
| Q015 | needs_expert | 行政書士 | 失业空白 > 3 月 |
| Q020 | needs_expert | 行政書士 + 弁護士 | 未续 + 期限失效 |
| Q024 | misconception | 行政書士 + 社労士 | 倒産 + 14 日 / 3 月窗口 |
| Q026 | needs_expert | 行政書士 | 改正过渡期 + 资本金不足 |
| Q029 | needs_expert | 行政書士 + 税理士 | 跨地域 + 税理士拖延 |
| Q031 | needs_expert | 行政書士 + 税理士 | 公司休眠 + 在留期限 |
| Q036 | needs_expert | 行政書士 + 律师（中国侧 ODI）| 跨境汇入 |
| Q040 | needs_expert | 税理士 + 行政書士 | 連続赤字 ≥ 2 年 |
| Q050 | needs_expert | 税理士 | 三税同时 + インボイス |
| Q051 | needs_expert | 行政書士 | 通算 5 年 + 一時帰国 |
| Q055 | needs_expert | 行政書士 | 特定技能 → 永住 计算 |
| Q057 | needs_expert | 行政書士 | 不足 3 年 + 例外条件 |
| Q064 | needs_expert | 行政書士 + 弁護士 | 婚姻破綻 + 续签 |
| Q065 | needs_expert | 行政書士 + 弁護士 + DV センター | DV 受害 |
| Q075 | needs_expert | 行政書士 + 弁護士 + 税理士 | 復合変更 |
| Q081 | needs_expert | 社労士 | 倒産 + 厚生年金未缴 |
| Q083 | needs_expert | 行政書士 + 社労士 | 滞納 + 永住 |
| Q091 | needs_expert | 弁護士 + 行政書士 | 不法就労 + 已被举报 |
| Q092 | needs_expert | 行政書士 | 改正过渡期 + 搬迁 |
| Q098 | needs_expert | 行政書士 + 弁護士 | 不许可 + 補正期限 |
| Q099 | needs_expert | 弁護士 + 行政書士 | 不法滞在 + 自首前 |
| Q100 | needs_expert | 行政書士 | 帰化 + 多年期 |

### 每条新增字段

```yaml
why_not_simple_answer: |
  这个问题不能简单回答，因为：
  - 个案变量多（[列 2-3 个具体变量]）
  - [法令 / 实务 区分点]
  - 误判后果不可逆（[具体后果]）

expert_handoff:
  trigger:
    - [触发立即找专家的具体条件 1]
    - [触发条件 2]
  who: 行政書士 / 弁護士 / 税理士 / 社労士（具体哪种）
  why: [一句话说明为什么这个专家而不是其他]
```

### 双咨询提示

部分题需要 **双咨询 / 联合咨询**（两位专家）：
- Q029（行政書士 + 税理士）
- Q031（行政書士 + 税理士）
- Q040（税理士 + 行政書士）
- Q064（行政書士 + 弁護士）
- Q065（行政書士 + 弁護士 + DV センター）
- Q075（行政書士 + 弁護士 + 税理士）
- Q091（弁護士 + 行政書士）
- Q098（行政書士 + 弁護士）
- Q099（弁護士 + 行政書士）

---

## 给 CCA 的测试建议

### 1. answer engine 自动测试套件

用 100 条 Q 的 350 条 test_queries 跑自动测试：

```python
for q in question_seeds:
    for tq in q.test_queries:
        result = answer_engine.match(tq)
        expected = q.slug
        if result.top1 != expected:
            log_miss(tq, expected, result.top1)
```

### 2. 命中率 KPI

- **Tier 1 命中**：top1 命中正确 Q（目标 ≥ 80%）
- **Tier 2 命中**：top3 含正确 Q（目标 ≥ 95%）
- **误触发率**：non-test query 触发已有 Q（目标 ≤ 5%）

### 3. high-risk 题特殊测试

26 条 high-risk 题 → 必须返回 first_screen_answer 中含「这个问题不能简单回答」+ 引向专家咨询。
**绝对不能**用 ChatGPT 类回答替换。

### 4. first_screen_answer 渲染

前端首屏直接展示 `first_screen_answer`（≤ 300 字 4 段）。
点击「展开」展示 `summary` + `sections`（v0 已有）。
点击「找专家」（仅 high-risk）展示 `expert_handoff` + 引向 ¥9,800 咨询入口。

### 5. boundary_note + why_not_simple_answer 联动

UI 设计建议：
- low-risk：仅展 first_screen_answer（结论清晰）
- medium-risk：展 first_screen_answer + boundary_note（增加边界提示）
- high-risk：展 first_screen_answer + why_not_simple_answer + expert_handoff CTA

---

## Schema 增量字段（CCA Block 14+）

在 v0 基础 schema 上新增：

```sql
test_queries           text[]      -- 自动测试用查询
first_screen_answer    text        -- 首屏 ≤ 300 字答案
why_not_simple_answer  text        -- 高风险题特有
expert_handoff         jsonb       -- {trigger[], who, why}
```

`expert_handoff` 已部分在 v0 出现，v1 统一格式（trigger 数组 + who + why 三字段）。

---

## 边界

- v1 **不增删 Q**（仍 100 条）
- v1 **不重写** v0 的 question / summary / sections / next_steps（v0 已定）
- v1 **仅增强可命中性 + 高风险题透明度**
- 100 条全部 `review_status: unreviewed` — 等行政書士 / 税理士 / 社労士 复核
- ⚠️ 复核点不阻断上线

---

## 总览：v0 + v1 累积

```
docs/answer-seed/
├── answer_seed_001-025.md           Q001-Q025 (永住 + 工作签)
├── answer_seed_026-050.md           Q026-Q050 (経管 + 公司设立)
├── answer_seed_051-075.md           Q051-Q075 (特定技能 + 定住者 + 配偶 + 离婚)
├── answer_seed_076-100.md           Q076-Q100 (生活类)
├── ANSWER_SEED_V0_REPORT.md         v0 总报告
└── ANSWER_SEED_V1_REPORT.md         v1 强化报告（本文件）
```

每条 Q 的字段总览（v1 完整版）：

```yaml
## Q[number]
aliases: [...]                       # ≥ 5 (v1 增强)
question: ...
answer_level: L1 | L2 | L3 | L4
answer_type: info | workflow | decision_card | risk_chain | misconception | needs_expert
review_status: unreviewed
source_grade: A | B | C
requires_review: true / (omit)
source_gap: true / (omit)
summary: ...
first_screen_answer: ...             # 仅 TOP30 (v1 新增)
sections: [{heading, body}]
why_not_simple_answer: ...           # 仅高风险 26 条 (v1 新增)
next_steps: [...]
source_hint: [...]
expert_handoff:                      # 仅高风险 26 条 (v1 统一)
  trigger: [...]
  who: ...
  why: ...
boundary_note: ...
test_queries: [...]                  # ≥ 3 (v1 新增)
```

---

🤖 by tebiq-knowledge-base skill / answer-seed-v1
