# Answer Copy QA v2 — 报告（ANSWER_COPY_QA_V2_REPORT）

**生成**：2026-04-30
**分支**：`content/answer-copy-qa-v2`（基于 `origin/content/answer-copy-rewrite-v1`）
**任务性质**：100 位测试指出 10 个 benchmark 答案质量不稳定 — 仅修这 10 个 benchmark 的最终标准答案。不新增 Q / 不扩展 100 条 / 不动其他答案。

---

## 10 个 benchmark 修改摘要

| # | BM ID | 主题 | 修改重点 |
|---|---|---|---|
| 1 | BM01 | 公司休眠了要不要交国民年金？ | **重写**：主答个人年金义务（不是签证）+ 14 日切换窗口 |
| 2 | BM02 | 办公室搬迁要做哪些手续？ | **表格化**：7 步 / 顺序 / 做什么 / 去哪里 / 期限 / 材料 |
| 3 | BM03 | 永住申请直近 5 年纳税要完整吗？ | 标准答案：5 年课税 + 完納証明书 |
| 4 | BM04 | 永住者能不能把父母接来日本长居？ | misconception：3 真实路径表格化 |
| 5 | BM05 | 换工作 14 天没办届出怎么办？ | risk_chain：超期补办 + 経過記録 影响 |
| 6 | BM06 | 公司倒闭我的签证会怎样？ | misconception：14 日 + 3 月两死线 |
| 7 | BM07 | 経営・管理 2025/10/16 改正既存持有人怎么办？ | decision_card：4 公司状态对照表 |
| 8 | BM08 | 搬家后在留卡地址要不要改？ | **样板**：简洁 / 单一动作 / 期限明确 |
| 9 | BM09 | 経営・管理 资本金不够怎么办？ | **重写**：4 路径表格化（增资 / 借款 / 計画 / 変更）|
| 10 | BM10 | 离婚不满 3 年还能拿定住者吗？ | needs_expert：3 例外路径表格化 |

---

## Q1（BM01）公司休眠 → 国民年金 修正说明

### 问题

100 位测试指出：原 Q081 答案误把「公司休眠 → 经管续签」当作主答，**未直接回答用户问的「个人年金义务」**。

### 修正

`conclusion` 重写为：

> 公司休眠不等于个人年金义务消失。一旦厚生年金 资格喪失日 確定，你必须 14 日内切换到 国民年金（第 1 号被保険者）+ 国民健康保険。

### 必含的 6 个关键概念（brief 要求 ✓）

- ✓ 公司休眠不等于个人年金义务消失（在 conclusion 第一句）
- ✓ 厚生年金是否仍覆盖（在 applies_when）
- ✓ 国民年金第 1 号（在 conclusion + how_to_do）
- ✓ 国民健康保険（在 conclusion + how_to_do）
- ✓ 资格丧失日（在 do_now 第 2 步 + deadline_or_timing 起算点）
- ✓ 区役所 / 年金事务所（在 where_to_go）

### 副答处理

`expert_handoff.4` 写：

> 公司休眠后你的 経営・管理 在留資格 是否影响（这是另一条线，但建议同时确认）

把「経営续签」明确标记为「另一条线」副答，不抢主答。

### must_not_match_keywords

```
- 经管续签
- 经营管理签证还能续吗
- 经管 改正
- 在留资格 取消
```

如果用户 query 含这些词，answer engine 应避免命中 BM01，改命中 BM07（经管改正）或 Q031（公司休眠 vs 在留資格）。

---

## Q9（BM09）资本金不够 修正说明

### 问题

100 位测试指出：原 Q047「资本金多少最合适」**没有回答「不够怎么办」**。两个问题方向完全不同：
- Q047 = 资本金标准（多少合适）
- BM09 = 資本金不够时的 action（怎么办）

### 修正

新建 BM09 作为独立 benchmark，与 Q047 形成两条不同 question。

`conclusion` 重写为：

> 資本金不够时，先看你处于哪个阶段（新申请 / 续签 / 增资前 / 决算后），再决定是「增资」「借款 + 资本金调整」「事业计划補強」还是「在留資格変更」。

### 必含的 6 个关键概念（brief 要求 ✓）

- ✓ 先区分新申请/续签/增资前/决算后（在 do_now + how_to_do 表格）
- ✓ 增资（路径 A + B）
- ✓ 借款（路径 C，不算资本金）
- ✓ 事业计划（在 documents_needed）
- ✓ 资金来源（在 documents_needed + expert_handoff 第 1 项）
- ✓ 新规（経過措置 + 3000 万 标准）
- ✓ 专家复核（expert_handoff 列 3 条触发）

### 4 路径表格

| 路径 | 适用阶段 | 关键点 | 注意 |
|---|---|---|---|
| A 增资（自己出資）| 新申请 / 续签前 | 资金来源说明 + 商業登記 | 跨境时 ODI 备案 |
| B 增资（亲属 / 投资人）| 新申请 / 增资前 | 出资比率 + 関係立证 | 経営権 影响 |
| C 借款（个人 / 法人）| 决算后 / 资本金不变 | 借款契約書 + 償還計画 | 不算資本金 |
| D 在留資格変更 | 资本金 / 常勤 都不达 | 高度専門職 / 技人国 等 | 业务性质要符合 |

### must_not_match_keywords

```
- 资本金 多少合适（这是 BM07 / Q047）
- 公司休眠
- 办公室搬迁
```

避免命中「问标准」而非「问 action」的 query。

---

## Q2（BM02）办公室搬迁 表格化说明

### 问题

100 位测试指出：原 Q032 内容已涵盖 8 点，但**字段需表格化**让用户更易扫读。

### 修正

`how_to_do` 改为 **7 步 5 列表格**：

| 顺序 | 做什么 | 去哪里 | 期限 | 材料 |
|---|---|---|---|---|
| 1 | 取締役会 / 株主総会 决议 | 公司内部 | 决议日即日 | 議事録 |
| 2 | 申請本店移転登記 | 法務局 | **决议日起 2 週間内** | 議事録 + 登録免許税 |
| 3 | 提交「所属機関等 届出書」 | 出入国在留管理庁 | **14 日内** | 届出書 + 在留カード写し |
| 4 | 提交 異動届出書 | 税務署 + 都道府県 + 市町村 | 1 ヶ月内 | 異動届 + 新登記事項証明書 |
| 5 | 提交 適用事業所 変更届 | 年金事務所 | 5 日内 | 変更届 + 新登記事項証明書 |
| 6 | 提交 事業主事業所 変更届 | ハローワーク | 翌日から 10 日以内 | 変更届 |
| 7 | 同步更新 銀行 / 各種許認可 / 取引先 | 各机关 + 取引先 | 各自规定 | 各自要求 |

`where_to_go` 也改为 2 列表格：

| 机关 | 用途 |
|---|---|
| 法務局 | 本店所在地 商業登記 |
| 出入国在留管理庁 | 所属機関等届出 |
| 税務署 + 都道府県 + 市町村 | 法人 異動届 |
| 年金事務所 | 適用事業所 変更届 |
| ハローワーク | 事業主事業所 変更届 |
| 銀行 / 許認可 / 取引先 | 同步更新地址 |

### 必含的 7 个机关（brief 要求 ✓）

- ✓ 法務局（路径 2）
- ✓ 税務署（路径 4）
- ✓ 入管（路径 3）
- ✓ 年金事務所 / ハローワーク（路径 5 + 6）
- ✓ 租赁合同（在 documents_needed）
- ✓ 办公室照片（在 documents_needed）
- ✓ 本店所在地（在 conclusion + applies_when）

---

## Q8（BM08）搬家后在留卡地址 — 样板答案说明

### 设计原则

100 位测试指出：BM08 是最接近「样板答案」的题。其他 9 条应向它看齐。

样板答案特征：
- **conclusion 简洁**：「要。搬家后 14 天内必须到新住址 区役所 / 市役所 办理 在留カード 住居地届出。」
- **单一动作**：no 多路径分歧
- **期限明确**：14 日内（数字 + 单位）
- **材料简洁**：4 件
- **后果清晰**：罰金 + 過料 + 失効 / 遡及徴収

### 4 关键字段（brief 要求 ✓）

- ✓ 结论：要，搬家后 14 天内
- ✓ 去哪里：新住址 区役所 / 市役所
- ✓ 材料：在留卡 + 本人確認資料 + 転出証明書（如适用）
- ✓ 不做后果：地址届出义务违反 + 通知收不到

### 复用为模板

未来其他 L1 / L2 简单题（如「住民票什么时候要更新」「マイナンバーカード 90 日规则」）都按 BM08 模板写。

---

## must_match / must_not_match 规则建议

### 命中规则（priority 排序）

1. **强命中**：query 含 ≥ 1 `must_match_keywords` AND 不含 `must_not_match_keywords` → 返回 benchmark_id
2. **冲突命中**：query 同时强命中两个 benchmark → 提示用户选择
3. **弱命中**：query 含 `must_not_match_keywords` 但不含 `must_match_keywords` → 不返回该 benchmark
4. **无命中**：退回到 100 条 v1 answer seed 的 alias / question 模糊匹配

### 已识别的冲突 case

| 用户 query | 候选命中 | 应优先 | 备注 |
|---|---|---|---|
| 「公司休眠 经管签证还能续吗」 | BM01 + BM07 | 提示选择 | BM01 主答年金 |
| 「资本金 3000 万 我现在 300 万够不够」 | BM07 | BM07 | 问改正影响 |
| 「资本金不到 3000 万 怎么办」 | BM09 | BM09 | 问 action |
| 「公司倒闭 我的工作签 + 我的年金」 | BM06 + BM01 | 提示选择 | 两条独立线 |
| 「办公室搬迁 在留卡地址要不要改」 | BM02 + BM08 | 提示选择 | BM02 = 公司 / BM08 = 个人 |

### 推荐 CCA 实现

```python
def match_benchmark(query):
    candidates = []
    for bm in benchmark_overrides:
        # 强命中条件
        has_must_match = any(kw in query for kw in bm.must_match_keywords)
        has_must_not = any(kw in query for kw in bm.must_not_match_keywords)
        if has_must_match and not has_must_not:
            candidates.append(bm)

    if len(candidates) == 0:
        return None  # 退回 100 条 v1 模糊匹配
    elif len(candidates) == 1:
        return candidates[0]  # 强命中
    else:
        return ConflictPrompt(candidates)  # 提示用户选择
```

### benchmark_overrides 优先级

`benchmark_overrides.md` 作为 override 层 — 命中时**完全替代** 100 条 v1 / answer-copy-rewrite-v1 的对应答案。

不命中 benchmark 时退回 v1。

---

## Schema 增量字段（CCA Block 14+）

```sql
-- 新建表
CREATE TABLE benchmark_overrides (
    benchmark_id              text PRIMARY KEY,
    question                  text NOT NULL,
    aliases                   text[],
    must_match_keywords       text[],
    must_not_match_keywords   text[],
    answer_type               text,
    answer_level              text,
    conclusion                text,
    applies_when              text,
    do_now                    text,
    where_to_go               text,
    how_to_do                 text,
    documents_needed          text[],
    deadline_or_timing        text,
    consequences              text,
    expert_handoff            text,
    customer_message          text,
    source_hint               text[],
    requires_review           boolean,
    review_notes              text,
    created_at                timestamptz,
    updated_at                timestamptz
);
```

### Importer 路由

`docs/answer-seed/benchmark_overrides.md` → 用 `## BMxx` heading 切分 + yaml-parser 解析 → `benchmark_overrides` 表

---

## 边界

- **不增删** 100 条 v1 answer seed
- **不修改** v1 / answer-copy-rewrite-v1 / answer-seed-v0 已交付字段
- **仅新建** benchmark_overrides.md 作为 override 层
- 10 条 benchmark 全部 review 状态：BM01 / BM02 / BM03 / BM04 / BM05 / BM06 / BM08 / BM10 = `requires_review: false`（制度路径稳定），BM07 / BM09 = `requires_review: true`（经管改正細則 + ODI 跨境）
- 命中 benchmark 时优先 render benchmark_overrides；不命中退回 v1

---

## 给 CCA 的接入步骤

1. 新建 `benchmark_overrides` 表 + 写 schema migration
2. 改造 importer 支持 `docs/answer-seed/benchmark_overrides.md` 路径（用 `## BMxx` 切分）
3. answer engine 路由：先查 benchmark_overrides 表（强命中规则）→ 不命中再查 question_seeds 表（v1 100 条）
4. 前端渲染：命中 benchmark 时优先展示 `customer_message`（短答）+ 展开 `do_now / where_to_go / how_to_do` 等
5. 高风险 benchmark（BM04 / BM06 / BM07 / BM09 / BM10）命中 → 强制展示 `expert_handoff` CTA → ¥9,800 咨询入口

---

🤖 by tebiq-knowledge-base skill / answer-copy-qa-v2
