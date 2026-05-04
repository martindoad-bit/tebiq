# Engineering Work Packet — Internal Console / 100 問可視化 v1

対象：ENGINE
任务标题：Internal Console v1 — 100 題可視化 + 生成状态面板
背景：当前 Eval Lab 已有 100 题种子数据和答案生成机制，但缺乏可视化面板。团队无法快速了解：哪些题已生成答案、哪些失败、分类情况如何。本任务要求在 `/internal/eval-lab` 页面（或独立 `/internal/eval-console`）增加 100 题可视化面板，不依赖 FULL_COMPARABLE 完成即可部署。
产品裁决来源：2026-05-05 项目运行规则 v0.2 Rule 10：Internal Console / 100 問可視化必须并发推进，不等 FULL_COMPARABLE。

---

## 必须读取

1. `docs/product/TEBIQ_CURRENT_STATE.md` — 当前阶段 + 并行 track
2. `docs/eval/EVAL_ROUND1_SAMPLE_PACK.md §样本分级定义` — 7 级分类定义
3. `app/api/internal/eval-lab/` — 现有 API 端点（state / export / seed / tebiq-answer / deepseek-raw）
4. `app/internal/eval-lab/` — 现有 Eval Lab 页面代码（了解现有 UI）

---

## 要做什么

### 功能 1 — 100 题状态概览（必须）

在 `/internal/eval-lab`（扩展现有页面）或 `/internal/eval-console`（新路由）显示：

**顶部统计行**（数字卡片）：

| 指标 | 说明 |
|------|------|
| Total | 100 题种子总数 |
| TEBIQ Answered | TEBIQ 通道有答案的题数 |
| DeepSeek Answered | DeepSeek 通道有答案的题数 |
| FULL_COMPARABLE | 两通道均成功 + 无 fallback |
| TEBIQ Fallback | llm_timeout 降级数 |
| Routing Failure | out_of_scope (regression set) 数 |
| OOS Sample | out_of_scope (non-regression) 数 |
| DS Failed | TEBIQ ok + DS failed 数 |

**每题行**（列表或表格）：

| 字段 | 来源 | 显示方式 |
|------|------|---------|
| starter_tag | DB | 可排序 |
| questionText | DB | 截断 80 字符 |
| scenario | DB | 色标签（A-J） |
| TEBIQ status | eval_answers | 色标签：answered/clarification/preliminary/out_of_scope/none |
| TEBIQ fallback_reason | eval_answers | `llm_timeout` 橙色，其余灰色 |
| DeepSeek status | eval_answers | ok / failed / none |
| Sample class | 前端计算 | FULL_COMPARABLE (绿) / FALLBACK (橙) / OOS (红) / DSF (黄) / NONE (灰) |

### 功能 2 — 单题重跑按钮（必须）

每题行末尾：
- "TEBIQ 重跑"按钮 → POST `/api/internal/eval-lab/tebiq-answer`
- "DeepSeek 重跑"按钮 → POST `/api/internal/eval-lab/deepseek-raw`
- 按钮仅在状态为 failed / none / fallback 时可用
- 操作后原地刷新该题行状态（不需整页刷新）

### 功能 3 — 筛选（Nice to Have，不阻塞 v1）

- 按 scenario 筛选（A-J）
- 按 sample_class 筛选
- 按 TEBIQ status 筛选

---

## Sample Classification 前端逻辑

```typescript
// regression set（路由错误已知题目）
const REGRESSION_SET = new Set([
  'eval-lab-v1-J04', 'eval-lab-v1-J08', 'eval-lab-v1-J03',
  'eval-lab-v1-I08', 'eval-lab-v1-D05', 'eval-lab-v1-D06', 'eval-lab-v1-D09',
])

function classifySample(tebiq: EvalAnswer | null, ds: EvalAnswer | null, tag: string): SampleClass {
  if (!tebiq || tebiq.error) return 'INVALID'
  if (tebiq.error?.includes('llm_timeout') || tebiq.rawPayload?.fallback_reason === 'llm_timeout')
    return 'TEBIQ_FALLBACK'
  if (tebiq.rawPayload?.status === 'out_of_scope')
    return REGRESSION_SET.has(tag) ? 'TEBIQ_ROUTING_FAILURE' : 'TEBIQ_OOS'
  if (!ds || ds.error) return 'DS_FAILED'
  return 'FULL_COMPARABLE'
}
```

---

## 数据来源

使用现有 `/api/internal/eval-lab/state?reviewer=eval-round1` 端点获取所有题目 + 答案。  
该端点已返回 questions + answers（含 answerType = tebiq_current / deepseek_raw）。

**不需要新的 API 端点**（v1 范围内）。

---

## 不能做什么

- **不改动 eval_answers DB schema**：只读数据，前端分类
- **不改动 answer pipeline**：只显示结果，不修改生成逻辑
- **不等 FULL_COMPARABLE 数据**：空状态（0 题有答案）时页面仍可渲染（显示 NONE）
- **不添加 EVAL_LAB_ENABLED 以外的新环境变量**：用现有 gate
- **不触碰 `/app/answer/` 或 `/lib/answer/`**：纯 Eval Lab 内部改动

---

## 验收标准

- [ ] 页面在 `EVAL_LAB_ENABLED=1` 下可访问，无 404
- [ ] 顶部统计行显示正确数字（可与 export?type=full 交叉验证）
- [ ] 每题行显示 starter_tag / 题目文本 / TEBIQ status / DS status / 分类
- [ ] FULL_COMPARABLE 标签颜色与其他分类可区分
- [ ] TEBIQ 重跑按钮可触发并刷新该题状态
- [ ] DeepSeek 重跑按钮可触发并刷新该题状态
- [ ] TypeScript 类型检查通过（`npx tsc --noEmit`）
- [ ] 无用户端 answer path 改动（PR body 声明）

---

## 完成后回报格式（回报给 GM）

```
Internal Console v1 — 实现报告

访问路径：/internal/eval-lab（扩展）or /internal/eval-console（新）
Preview URL：...
功能覆盖：
  - [ ] 统计行
  - [ ] 100 题列表
  - [ ] TEBIQ 重跑按钮
  - [ ] DeepSeek 重跑按钮
已知限制：
测试方式：（如何验证 AC）
PR：#XX
```

---

**ENGINE 所有输出默认 draft / needs GM + QA review。**
