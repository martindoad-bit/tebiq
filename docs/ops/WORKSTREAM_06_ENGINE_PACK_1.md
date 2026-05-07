# Work Packet — ENGINE Pack 1 (0.6 Sprint)

**对象**: ENGINE
**任务标题**: KEYWORD_BUCKETS shared layer + SSE `routing_status` event + `tebiq.jp/` root route check
**Sprint**: TEBIQ 0.6 / Wave 1
**Issued by**: GM
**Issued at**: 2026-05-07
**Issue**: (待 GM 创建 GitHub Issue 后回填)

---

## 背景

TEBIQ 0.6 Sprint 三个并行需求共用一个"按用户问题关键词分桶"的逻辑：

- **Workstream B (First-response UX)** — 首响等待显示需要根据关键词桶给出"正在核对经营管理 / 年金 / 技人国 ..." 的状态文案
- **Workstream G (风险提示个性化)** — 命中关键词桶后给更贴近问题的风险维度
- **Workstream C (Fact Layer matcher)** — 后续 Pack 2 的 fact card matcher 复用同一份桶定义

为避免三处各写一份关键词列表造成漂移，先抽出共享 `KEYWORD_BUCKETS` 层。本包同时落 B 后端层（SSE `routing_status` 事件）和 F4 根路由检查。

不在本包范围（留 ENGINE Pack 2）：

- Drizzle migrations 0025/0026
- fact_layer matcher / sync script / dry-run endpoint
- `/api/consultation/follow-up` (Workstream D)
- prompt injection point

## 产品裁决来源

- PL 0.6 Sprint kickoff (2026-05-07) §3 (Workstream B), §7 (F 保存路径含根路由), §8 (G 风险提示个性化)
- PL 后续裁决 (2026-05-07): 重启独立 ENGINE 窗口；ENGINE Pack 1 限定 scope = KEYWORD_BUCKETS + SSE routing_status + 根路由
- `docs/engineering/0.6-fact-layer-design.md` (KEYWORD_BUCKETS 共享设计已 sketch)

## 必须读取

| 顺序 | 文件 |
|---|---|
| 1 | `CLAUDE.md` |
| 2 | `docs/ops/TEBIQ_AGENT_WORKFLOW.md` |
| 3 | `docs/roles/TEBIQ_ENGINE_ROLE.md` |
| 4 | `docs/ops/TEBIQ_CURRENT_STATE.md` |
| 5 | 本 Work Packet |
| 6 | `docs/engineering/0.6-fact-layer-design.md` (含 KEYWORD_BUCKETS 设计草案 + SSE event 契约) |
| 7 | `docs/codexui/0.6-mobile-ux-pack.md` §4 (CODEXUI 侧 SSE event 消费契约) |
| 8 | `app/api/consultation/stream/route.ts` (现有 SSE 流) |
| 9 | `app/page.tsx` + `app/ai-consultation/page.tsx` (根路由现状) |
| 10 | `lib/answer/` 结构（理解既有 answer 模块组织）|

## 要做什么

### 1. KEYWORD_BUCKETS 共享层

创建 `lib/answer/intent/keyword-buckets.ts`：

```typescript
export type KeywordBucketId =
  | 'keiei_kanri'
  | 'nenkin_zeikin'
  | 'gijinkoku'
  | 'spouse_divorce'
  | 'shikakugai_fukugyo'
  | 'zairyu_kigen';

export interface KeywordBucket {
  id: KeywordBucketId;
  keywords: string[];                    // 中日两语，含异体字
  status_label_initial: string;          // 0-1s 文案
  status_label_specific: string;         // 3-5s 文案，按 PL §3 给的样板
  risk_hint_copy?: string;               // Workstream G 用
}

export const KEYWORD_BUCKETS: Record<KeywordBucketId, KeywordBucket> = {
  keiei_kanri: { ... },
  nenkin_zeikin: { ... },
  ...
};
```

**关键词初始集**（ENGINE 自决最终列表，下面是种子）：

- `keiei_kanri`: 経営管理 / 经营管理 / 经管 / 經管 / 経管ビザ / 公司签证 / startup visa / 創業ビザ / 投資経営
- `nenkin_zeikin`: 年金 / 厚生年金 / 国民年金 / 健保 / 健康保险 / 国民健康保険 / 住民税 / 税金 / 滞纳 / 未交 / 没交 / 缴纳 / 厚生年金 / 永住
- `gijinkoku`: 技人国 / 技術・人文知識 / 国際業務 / 工作内容 / 换工作 / 转职 / 工厂
- `spouse_divorce`: 配偶 / 配偶者 / 离婚 / 別居 / 分居 / 死别 / 丈夫 / 妻子 / DV
- `shikakugai_fukugyo`: 副业 / 副業 / 资格外活动 / 资格外 / 28小时 / 留学生打工 / Uber Eats
- `zairyu_kigen`: 在留期限 / 续签 / 更新 / 期限快到 / 1个月 / 3个月 / 特例期间 / 特例期間

文案 PL 样板（§3）：

- `keiei_kanri.status_label_specific`: "正在核对经营管理、在留资格变更和当前基准。"
- `nenkin_zeikin.status_label_specific`: "正在核对缴纳记录、更新/永住影响和下一步处理。"
- `gijinkoku.status_label_specific`: "正在核对在留资格活动范围和工作内容匹配。"
- `spouse_divorce.status_label_specific`: "正在核对身份变化、届出和在留衔接风险。"

`status_label_initial` 统一可用："已收到，正在整理这个问题涉及的在留方向。"

### 2. matchBuckets 函数

创建 `lib/answer/intent/match-buckets.ts`：

```typescript
import { KEYWORD_BUCKETS, KeywordBucketId } from './keyword-buckets';

export interface BucketMatch {
  bucket_id: KeywordBucketId;
  matched_keywords: string[];
  score: number;  // 0..1
}

export function matchBuckets(question: string): BucketMatch[] {
  // normalize + substring scan, return all matches sorted by score
}
```

策略：normalize question (lowercase + 去标点 + 保留 CJK)，对每个 bucket 的 keywords 做 substring 命中，score = matched_count / total_keywords (capped 1)。返回所有 score > 0 的 bucket，按 score 倒排。

不做 embedding。不做 LLM 调用。纯字符串匹配。

### 3. SSE `routing_status` event 注入到 stream route

修改 `app/api/consultation/stream/route.ts`：

在 `received` event 之后、`first_token` event 之前，按以下时序发出 `routing_status`：

**第一层（紧跟 received，0-100ms 内）**：

```json
{
  "event": "routing_status",
  "ts": <unix_ms>,
  "level": "initial",
  "buckets": ["keiei_kanri"],
  "status_label": "已收到，正在整理这个问题涉及的在留方向。"
}
```

如果 matchBuckets 命中多个桶，`buckets` 数组列全部命中，`status_label` 用 initial 通用文案。

**第二层（仅当 first_token 在 3000ms 内未到达时，3000ms timer 触发）**：

```json
{
  "event": "routing_status",
  "ts": <unix_ms>,
  "level": "specific",
  "buckets": ["keiei_kanri"],
  "status_label": "正在核对经营管理、在留资格变更和当前基准。"
}
```

`status_label` 用 top-1 bucket 的 `status_label_specific`。如果零命中，跳过第二层（不发）。

**注意**：

- 不修改既有 `received` / `risk_hint` / `first_token` / `answer_chunk` / `completed` / `partial` / `failed` / `timeout` 事件的形状或时序
- 第二层 timer 在 first_token 到达后必须取消（不能晚到错位）
- 不影响 first_token_latency_ms 测量
- 不在 server 端拼接 reasoning_content；不渲染 thinking 内容

### 4. `tebiq.jp/` 根路由检查 / redirect

阅读 `app/page.tsx` 当前内容判断：

- 如果根路由已是咨询主入口 → 不动，本任务此项 ✅
- 如果根路由是营销页 / 其他用途 → ENGINE 提交一个最小调整方案给 GM 裁决（不要直接改）：
  - 选项 A: 根路径加显著"开始咨询"入口 (CTA) 直达 `/ai-consultation`
  - 选项 B: `/` 重定向到 `/ai-consultation`
  - 选项 C: 把 `/ai-consultation` 内容搬到 `/` (代价大，本包不推荐)

根路由现状判断后，ENGINE 在 PR description 里写出当前状态 + 选项 + 推荐。如选项 A 是最小改动，ENGINE 可直接实现；选项 B/C 需 GM 在 PR comment 确认后再改。

## 不能做什么

- ❌ 不实现 fact_layer matcher / sync script / migrations 0025/0026 (留 Pack 2)
- ❌ 不实现 `/api/consultation/follow-up` (留 Pack 2)
- ❌ 不修改 `lib/answer/prompt/consultation-alpha-v1.ts` (Pro thinking 当前生效，不动)
- ❌ 不修改 `lib/answer/core/llm-deepseek-provider.ts` (eval-lab 路径，sensitive zone)
- ❌ 不引入 LLM 调用做 bucket 匹配 (纯字符串)
- ❌ 不引入 embedding / vector store
- ❌ 不写 fact card 内容
- ❌ 不修改 docs/voice/ canonical
- ❌ 不修改 brand / tokens / app 全局 CSS
- ❌ 不在用户高峰期做 production benchmark
- ❌ PR 不一次塞 4 项；建议拆 2 个 commit (KEYWORD_BUCKETS+matcher+SSE 一个；root route 另一个)，但同 1 个 PR 可以
- ❌ 不绕过 GM 联系 PL / FACT / DOMAIN / QA / CODEXUI

## 验收标准

### 单元

- `lib/answer/intent/keyword-buckets.ts` exports KEYWORD_BUCKETS + KeywordBucketId type，6 个 bucket 全部有 keywords + status_label_initial + status_label_specific
- `lib/answer/intent/match-buckets.ts` matchBuckets() 对以下输入返回正确：
  - "我是经营管理签证..." → matches keiei_kanri
  - "永住申请年金没按时交..." → matches nenkin_zeikin
  - "技人国换工作做现场接待..." → matches gijinkoku
  - "我和老公离婚了..." → matches spouse_divorce
  - "完全不沾边的随意问题" → returns []
- 单元测试 commit 到 `scripts/test/intent-buckets.test.ts` 或类似

### 集成

- 对 `/api/consultation/stream` 跑 4 题 (与 QA WS-A baseline 同 4 题)：
  - 每题 SSE 流应额外含 1-2 个 `routing_status` 事件
  - `received` → `risk_hint` → **`routing_status` initial** → (3s timer) **`routing_status` specific**（可能）→ `first_token` → `answer_chunk`... → `completed`
  - 既有事件形状不变
  - first_token_latency_ms 不能恶化（应该在 PR description 给前后对比）

### 根路由

- ENGINE 在 PR description 里写明 `tebiq.jp/` 当前状态 + 推荐选项 + 是否已实现
- 如已实现 (选项 A 最小修改)，截图证明咨询入口可见
- 如待 GM 确认 (选项 B/C)，PR comment 等待 GM 决定

### 工程

- `tsc --noEmit` clean
- `npm run lint` clean
- `npm run build` clean
- Vercel preview SUCCESS

## 完成后回报格式

按 `docs/roles/TEBIQ_ENGINE_ROLE.md` 标准格式回 GM：

```
## ENGINE Work Packet 0.6 Pack 1 — Completion Report

### Scope 完成度
- [ ] KEYWORD_BUCKETS shared layer
- [ ] matchBuckets() function
- [ ] SSE routing_status event (initial + specific)
- [ ] tebiq.jp/ root route check (+ implementation if option A; otherwise pending GM)

### Out of scope 验证
- [ ] 未触 lib/answer/prompt/
- [ ] 未触 lib/answer/core/llm-deepseek-provider.ts
- [ ] 未实现 fact_layer matcher / migrations / follow-up endpoint
- [ ] 未引入 LLM / embedding 调用

### Tests
- 单元测试结果
- 4 题 SSE 集成测试结果（list events received per question）
- first_token_latency 前后对比

### Vercel
- preview URL
- preview SUCCESS / FAILED
- gitSha

### Known risks
- e.g. 关键词冲突（跨桶命中 4+ 时的 score 排序）
- e.g. 3000ms timer 与 Pro thinking first_token 边界（多数 first_token 在 4-16s，timer 一定会触发；这是预期）

### 需 GM 处理
- e.g. 根路由选项 B 是否实施

### USER-FACING ESCALATION
- 是 / 否（如有 user-facing 行为变化必须勾起来）

### PR
- branch: <branch>
- PR #: <num>
- mergeable: yes/no
```

## 需要产品负责人裁决的问题

如果 ENGINE 在执行中发现以下，必须停下来回 GM 升 PL：

1. 既有 `risk_hint` event 时序与 routing_status 设计冲突
2. Pro thinking first_token 中位数 < 3s（导致 specific timer 几乎不触发；需要重设阈值）
3. 根路由 option C（搬迁 `/ai-consultation` 到 `/`）被认为必要
4. 发现 `app/api/consultation/stream/route.ts` 有 sensitive zone 限制需要扩展
5. 任何 production 数据 / 用户隐私问题
6. 任何与 PL 0.6 sprint kickoff 不一致的 product behavior

否则 ENGINE 自决，按本包推进。

---

## ENGINE 起步建议

1. 读完所有"必须读取"文件
2. Freshness check (`git fetch origin && git log origin/main --oneline -5 && gh pr list`)
3. 起 branch `feat/0.6-engine-pack-1-keyword-buckets-routing-status`
4. 先做 KEYWORD_BUCKETS + matchBuckets + 单元测试 (1 commit)
5. 再做 SSE routing_status 注入 stream route + 4 题集成测试 (1 commit)
6. 最后做 tebiq.jp/ 根路由判断 + 必要的最小修改 (1 commit)
7. 推 PR + 完成回报模板填全 + tag GM

预计 1-2 个 working session 完成。
