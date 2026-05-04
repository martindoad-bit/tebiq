# Eval Round 1 — 30-Question Sample Pack

> **用途**：TEBIQ Answer Quality Baseline v0.1 首批可比较样本集。
> **版本**：v0.3（2026-05-05，GM 组织）
> **状态**：等待 Routing Safety Gate v1 通过 + LLM Health Check 通过后执行正式重跑
>
> 每题必须同时完成 DeepSeek raw + TEBIQ output，且 TEBIQ 无 llm_timeout 降级、无路由错误，才算"正式可比较样本"。

---

## 样本分级定义（v0.3 — 2026-05-05 更新）

> v0.2 增加 fallback / OOS / DS_FAILED / INVALID 分类。
> v0.3 进一步区分 OOS 的两种子类型：已知路由错误（regression set）vs. 待确认。

| 分类 | 条件 | 可进 DOMAIN 正式标注 | 下一步处理 |
|------|------|---------------------|-----------|
| **FULL_COMPARABLE** | TEBIQ ok + DS ok + no `llm_timeout` + not `out_of_scope` | ✅ 是 | 正式标注 |
| **TEBIQ_FALLBACK_SAMPLE** | TEBIQ ok + `fallback_reason = llm_timeout` | ❌ 否 | 等 LLM 恢复后重跑 |
| **TEBIQ_ROUTING_FAILURE** | TEBIQ ok + `out_of_scope` + 题目在 regression set | ❌ 否 | Routing Safety Gate 修复后重跑 |
| **TEBIQ_OUT_OF_SCOPE_SAMPLE** | TEBIQ ok + `out_of_scope` + 题目不在 regression set | ❌ 否 | DOMAIN 专项路由判断 |
| **TEBIQ_OUT_OF_SCOPE_CORRECT** | DOMAIN 确认 out_of_scope 为正确路由 | ❌ 否 | 记录 scope boundary，不重跑 |
| **DEEPSEEK_FAILED_SAMPLE** | TEBIQ FULL（非 fallback / 非 OOS）+ DS 失败 | ❌ 否 | DS 恢复后补跑 |
| **INVALID_SAMPLE** | TEBIQ 失败 / 无有效数据 | ❌ 否 | 重跑 |

**Routing Regression Set（已知路由错误，修复前不得进入正式批量）**：

```
eval-lab-v1-J04  eval-lab-v1-J08  eval-lab-v1-J03
eval-lab-v1-I08  eval-lab-v1-D05  eval-lab-v1-D06  eval-lab-v1-D09
```

**产品负责人当前只接受 FULL_COMPARABLE 进入正式 DOMAIN 标注。**

---

## 样本结构原则

- **覆盖关键风险类型**：方向反转、期限紧急、资格外活动、经管合规、永住/税务、家庭身份变化
- **含参照组**：2 题低风险普通问答，用于检测 TEBIQ 是否过度吓人 / 过度 handoff
- **可追溯**：每题有 starter_tag，来自 Eval Lab V1 seed 包，DB 中可直接查 question_id

---

## 30 题选单

### 类型 1 — 高风险方向判断题（6 题）

> 目的：检测方向反转、身份转换误判、TEBIQ 是否识别出用户没问但影响结果的真实风险。

| # | starter_tag | 题目 | 风险点 |
|---|-------------|------|--------|
| 1 | eval-lab-v1-A01 | 经营管理签怎么转技术・人文知识・国际业务？ | 方向转签，实际条件复杂 |
| 2 | eval-lab-v1-A05 | 家族滞在想转工作签怎么办？ | 最常见陷阱路径，需先申请许可 |
| 3 | eval-lab-v1-A09 | 配偶签离婚后想转定住怎么办？ | 身份变化后多步骤风险 |
| 4 | eval-lab-v1-J04 | 我被公司解雇了，在留怎么办？ | 高风险突发，方向判断难 |
| 5 | eval-lab-v1-J06 | 我在日本开公司但实际没怎么经营，会影响经管更新吗？ | 隐性不合规，方向误判高风险 |
| 6 | eval-lab-v1-J08 | 我的在留资格和现在实际工作不一致怎么办？ | 最常见被忽视的合规缺口 |

---

### 类型 2 — 期限 / 补材料 / 通知书题（5 题）

> 目的：检测 TEBIQ 是否识别紧急时限，是否对补材料场景的优先级判断正确。

| # | starter_tag | 题目 | 风险点 |
|---|-------------|------|--------|
| 7 | eval-lab-v1-F01 | 入管让我补材料，但期限赶不上怎么办？ | 紧急时限，需主动联系入管 |
| 8 | eval-lab-v1-F02 | 补材料期限已经过了怎么办？ | 已超时，最高紧急度 |
| 9 | eval-lab-v1-F05 | 收到不许可通知书怎么办？ | 结果理解 + 后续行动路径 |
| 10 | eval-lab-v1-F08 | 不许可通知书上写的期限是什么意思？ | 文本理解失败 = 错过出境期限 |
| 11 | eval-lab-v1-J03 | 我签证快到期了，但材料还没准备好怎么办？ | 时限高风险，TEBIQ 是否传达紧急性 |

---

### 类型 3 — 就劳 / 资格外活动题（5 题）

> 目的：检测 28 小时规则、活动范围误导、资格不符合工作的判断。

| # | starter_tag | 题目 | 风险点 |
|---|-------------|------|--------|
| 12 | eval-lab-v1-C03 | 人文签工作内容和原来不一样会影响签证吗？ | 活动范围合规，TEBIQ 是否主动问清楚 |
| 13 | eval-lab-v1-C07 | 技人国签证可以做餐饮店现场工作吗？ | 活动范围误判高风险 |
| 14 | eval-lab-v1-D01 | 家族滞在想打工怎么办？ | 资格外活动许可申请路径 |
| 15 | eval-lab-v1-D02 | 家族滞在打工超过 28 小时怎么办？ | 已超限，高风险，TEBIQ 是否传达严重性 |
| 16 | eval-lab-v1-D03 | 家族滞在想转工作签需要什么？ | 转签路径，TEBIQ 是否识别前提条件 |

---

### 类型 4 — 经营管理 / 续签 / 赤字题（5 题）

> 目的：检测经营管理签证核心风险判断，包括搬迁通知、赤字续签、放弃流程。

| # | starter_tag | 题目 | 风险点 |
|---|-------------|------|--------|
| 17 | eval-lab-v1-B01 | 经管签搬办公室要通知哪里？ | 合规基础，TEBIQ 是否揭示更新审查影响 |
| 18 | eval-lab-v1-B05 | 经管签公司没盈利还能更新吗？ | 续签核心风险，TEBIQ 是否识别财务证明门槛 |
| 19 | eval-lab-v1-B07 | 经管签想放弃回国，公司要怎么处理？ | 高复杂度，清算/税务/年金交叉 |
| 20 | eval-lab-v1-I01 | 想放弃经管签回国，要办什么手续？ | 同场景不同角度，检测覆盖完整性 |
| 21 | eval-lab-v1-I08 | 公司还没清算，我可以直接回国吗？ | 高风险决策，TEBIQ 是否传达不能直接走 |

---

### 类型 5 — 永住 / 税金 / 年金题（4 题）

> 目的：检测确定性承诺风险、时点判断、补缴逻辑。

| # | starter_tag | 题目 | 风险点 |
|---|-------------|------|--------|
| 22 | eval-lab-v1-E01 | 永住申请前年金没交怎么办？ | 最高频质询点，TEBIQ 是否要求进一步信息 |
| 23 | eval-lab-v1-E02 | 永住申请前住民税晚交过一次怎么办？ | 高频，误判多（"晚交"≠"未交"）|
| 24 | eval-lab-v1-E07 | 永住不许可后多久可以再申请？ | 不许可后时点判断，TEBIQ 是否识别影响因素 |
| 25 | eval-lab-v1-H09 | 税务署通知让我补税，会影响永住吗？ | 税务+永住交叉，TEBIQ 是否传达不确定性 |

---

### 类型 6 — 家族 / 配偶 / 身份变化题（3 题）

> 目的：检测家庭身份变化后的连带风险识别，TEBIQ 是否主动发现未问的关键点。

| # | starter_tag | 题目 | 风险点 |
|---|-------------|------|--------|
| 26 | eval-lab-v1-D05 | 日本人配偶签离婚后还能留在日本吗？ | 高风险身份变化，答案不能给承诺 |
| 27 | eval-lab-v1-D06 | 配偶签离婚后多久要处理在留问题？ | 时限高风险，TEBIQ 是否传达紧急性 |
| 28 | eval-lab-v1-D09 | 家人的在留资格跟我有关，我换签证会影响他们吗？ | 连带影响，TEBIQ 是否发现用户没问的关键 |

---

### 类型 7 — 普通低风险问答题（2 题）

> 目的：参照组，检测 TEBIQ 是否对低风险题过度吓人 / 过度推 handoff。

| # | starter_tag | 题目 | 期望 |
|---|-------------|------|------|
| 29 | eval-lab-v1-G04 | 在留卡丢了怎么办？ | 标准行政流程，TEBIQ 不应过度升级 |
| 30 | eval-lab-v1-H05 | 离职后健康保险要怎么处理？ | 标准行政流程，TEBIQ 不应过度吓人 |

---

## 执行说明

### 生成顺序（推荐）

1. Seed 100 题（幂等，已有则跳过）
2. 按上表 30 个 `starter_tag` 查询对应 `question_id`
3. **先跑 TEBIQ 通道**（30 题，顺序执行，约 20-25 分钟）
4. **再跑 DeepSeek 通道**（30 题，顺序执行）
5. 确认每题均有 `tebiq` + `deepseek_raw` 两条 answer 记录
6. 通过 `/api/internal/eval-lab/export?type=full` 拉取完整数据包存档

### 可比较样本判定（v0.2）

参见文件头部"样本分级定义"表格。

```
FULL_COMPARABLE 判定：
  TEBIQ ok=true
  AND DeepSeek ok=true
  AND TEBIQ fallback_reason ≠ "llm_timeout"
  AND TEBIQ status ≠ "out_of_scope"
```

**只有 FULL_COMPARABLE 进入 DOMAIN 正式标注和产品质量结论。**

### DeepSeek / LLM 不可用处理

不得在未通过 Health Check 的情况下启动批量生成。

执行顺序：
1. 运行 `scripts/eval/health-check.sh`，确认所有 Gate pass
2. 通过后运行 `scripts/eval/run-round1-phased.sh`（4 阶段 + 质量门控）
3. 任何阶段 gate fail → abort，不继续生成无效数据

历史记录：2026-05-04 Technical Dry Run 因 DeepSeek API timeout + 脚本 payload bug 未产出有效样本（见 CURRENT_STATE.md 归档记录）。

---

## 数据完整性要求

每条可进入 DOMAIN review 的样本必须包含：

| 字段 | 来源 | 必须 |
|------|------|------|
| `question_id` | DB | ✅ |
| `starter_tag` | seed | ✅ |
| `question_text` | DB | ✅ |
| `category`（Round 1 类型 1-7） | 本文件映射 | ✅ |
| `risk_level`（high/medium/low 初始标签） | 本文件映射 | ✅ |
| `deepseek_raw.answer_text` | eval-lab | ✅（可比较样本）|
| `deepseek_raw.status` | eval-lab | ✅ |
| `tebiq.answer_text` | eval-lab | ✅ |
| `tebiq.status` | eval-lab | ✅ |
| `tebiq.engine_version` | eval-lab | ✅ |
| `tebiq.fallback_reason` | eval-lab | 记录 |
| `annotation.score` | DOMAIN | annotation 阶段填写 |
| `annotation.severity` | DOMAIN | annotation 阶段填写 |
| `annotation.action` | DOMAIN | annotation 阶段填写 |
| `export_timestamp` | export API | ✅ |

---

## 初始 risk_level 映射

| 类型 | 题号 | risk_level |
|------|------|------------|
| 类型 1（方向判断） | 1-6 | high |
| 类型 2（期限/补材料） | 7-11 | high |
| 类型 3（就劳/资格外） | 12-16 | high |
| 类型 4（经管/续签） | 17-21 | high |
| 类型 5（永住/税务） | 22-25 | high |
| 类型 6（家族/身份） | 26-28 | medium |
| 类型 7（低风险参照） | 29-30 | low |

> **说明**：初始 risk_level 由 GM 基于场景类型标注，供 DOMAIN 参考，DOMAIN 可在标注中覆盖。
