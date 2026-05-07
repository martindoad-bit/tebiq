# Prod Ops Runbook — ENGINE Pack 2.1 (Fact Layer Foundation)

**Owner**: GM (PL approves; PL or DevOps executes)
**Sprint**: TEBIQ 0.6 / Workstream C
**Pre-condition**: PR #84 merged to `main` (commit `d27acd7`, in main as `959753f`)
**Drafted**: 2026-05-07
**Authority**: PL directive — "不让 PL 盲跑命令"

---

## 0. 总览

Pack 2.1 落地需要在 production 执行 4 个独立操作。**全部 additive，无 destructive 改动**。`FACT_LAYER_ENABLED` 必须保持 `false`（默认未设即 false），用户端答案不变。

| # | 操作 | 类型 | 影响范围 | 可回滚 |
|---|---|---|---|---|
| 1 | `npm run db:migrate` | additive | 新增 1 表 + 2 列 + 1 default 重置 | drizzle-kit drop |
| 2 | `npm run fact-layer:sync` | additive | 8 行写入 fact_cards 表 | DELETE FROM fact_cards |
| 3 | Vercel env: `EVAL_LAB_ENABLED=1` | additive | 解锁 1 个 internal endpoint | 删 env var |
| 4 | Vercel env: `FACT_LAYER_ENABLED` 保持 false | no-op | 无 | n/a |

**关键不变量（执行全程必须保持）**:
- `FACT_LAYER_ENABLED` 必须 `false` 或未设
- `/ai-consultation` 用户端答案不变
- 不暴露 secrets
- 不影响 `/api/consultation/stream` 行为
- 不让 unapproved critical card 注入

---

## 1. 操作 1 — `npm run db:migrate`

### 1.1 Type

**ADDITIVE**. drizzle-kit 应用以下 SQL（来自 `lib/db/migrations/0025_fact_cards.sql` + `0026_consultation_fact_cards.sql`）：

- `CREATE TABLE fact_cards (...)` — 全新表，0 现有数据冲突
- `CREATE INDEX fact_cards_state_idx`
- `CREATE INDEX fact_cards_risk_idx`
- `CREATE INDEX fact_cards_state_risk_idx`
- `ALTER TABLE ai_consultations ADD COLUMN fact_card_ids jsonb DEFAULT '[]'::jsonb NOT NULL`
- `ALTER TABLE ai_consultations ADD COLUMN fact_card_audit jsonb DEFAULT '[]'::jsonb NOT NULL`
- `ALTER TABLE ai_consultations ALTER COLUMN prompt_version SET DEFAULT 'consultation_alpha_v2'` — drizzle 自动 emit 的 reconciliation，纯 default 重置（不修改任何现有 row）

**No backfill. No NOT NULL on existing rows. No DROP. No data deletion.**

### 1.2 Pre-conditions

- [ ] PR #84 merged to main (`git log origin/main --oneline | head -1` 显示包含 `Merge pull request #84`)
- [ ] 本地 `git fetch origin && git log origin/main --oneline -3` 含 `959753f`
- [ ] 当前生产 prompt_version 已是 `'consultation_alpha_v2'`（PR #65 之后即为此）
- [ ] 当前生产 production sha = `43bb7b5` 或更新（含 PR #84 + #85 + #86）
- [ ] Backup 完成（推荐 `pg_dump --schema-only` snapshot）

### 1.3 Required env

执行机环境变量必须有：

- `DATABASE_URL` — production Supabase pooler URL（不是 DIRECT_URL；migration 用 pooler）
- `DIRECT_URL` — production Supabase direct URL（drizzle-kit 用此跑 DDL）

**禁止把 prod DATABASE_URL 写到 .env.local**。建议从 Vercel project env (Production scope) 临时导出，或用 1Password / Vercel CLI `vercel env pull --environment=production`。

### 1.4 Working directory

repo root（含 `drizzle.config.ts`）。

### 1.5 Exact command

```bash
# 在 repo root
git pull origin main
git log -1 --oneline    # 确认 head 含 959753f 或更新
npm install              # 确保 drizzle-kit 在 node_modules
DATABASE_URL="<prod>" DIRECT_URL="<prod-direct>" npm run db:migrate
```

### 1.6 Expected output

drizzle-kit 输出大致：

```
[drizzle-kit] Reading schema files
[drizzle-kit] Reading migration journal
[drizzle-kit] Pending migrations: 0025_fact_cards, 0026_consultation_fact_cards
[drizzle-kit] Executing 0025_fact_cards...  done
[drizzle-kit] Executing 0026_consultation_fact_cards...  done
✅ Done
```

如出现 `done. 0 migrations applied` → 已经被人先跑过了，安全跳过。

### 1.7 Verification

```bash
# 验证表存在 + 列结构
psql "$DATABASE_URL" -c "\d fact_cards" | head -30
psql "$DATABASE_URL" -c "\d ai_consultations" | grep fact_card

# 期望:
# fact_cards 表存在,含 19 列 + 3 索引
# ai_consultations 含 fact_card_ids jsonb / fact_card_audit jsonb 两列
```

```bash
# 验证现有数据未被破坏
psql "$DATABASE_URL" -c "SELECT count(*) FROM ai_consultations;"
# 应等于 migrate 前的 count
```

### 1.8 If partial success

drizzle 在事务中执行，应该全成功 OR 全失败。如出现 partial：

- 0025 成功 + 0026 失败 → fact_cards 表已建但 ai_consultations 未扩
  - **不要** 启 `fact-layer:sync`（sync 不依赖 ai_consultations 列，但下一步 Pack 2.2 会依赖）
  - 立即排查 0026 失败原因 → 重跑 `npm run db:migrate`（drizzle 跳过已应用的 migration）
- 0025 失败 → 安全状态，main 上 fact_cards 表不存在，重跑即可

### 1.9 Rollback

如果决定撤销整个 Pack 2.1：

```bash
# DESTRUCTIVE — 仅在确认 fact_cards 表无数据时执行
DATABASE_URL="<prod>" psql "$DATABASE_URL" <<EOF
ALTER TABLE ai_consultations DROP COLUMN IF EXISTS fact_card_audit;
ALTER TABLE ai_consultations DROP COLUMN IF EXISTS fact_card_ids;
DROP TABLE IF EXISTS fact_cards;
EOF
```

**这一步删掉 column 数据。** 仅在 Pack 2.2 未上线 + audit 数据可丢弃时执行。

### 1.10 Verifier

PL 或 ENGINE 跑 §1.7 三条验证命令并截图，发 GM。

---

## 2. 操作 2 — `npm run fact-layer:sync`

### 2.1 Type

**ADDITIVE**. 读 `docs/fact-cards/*.md`（当前 8 张：5 Batch 1 + 3 Batch 2，含 worked example），upsert 到 `fact_cards` 表。

幂等：重复跑无副作用（content_hash 一致则跳过）。

### 2.2 Pre-conditions

- [ ] 操作 1 (`db:migrate`) 已成功
- [ ] `fact_cards` 表存在（`SELECT * FROM fact_cards LIMIT 0;` 不报错）
- [ ] 本地 `git pull origin main` 已含 `43bb7b5` 或更新（确保 8 张卡都在）

### 2.3 Required env

- `DATABASE_URL` — production pooler URL
- 不需要 `DIRECT_URL`（sync 用 pooler 即可）

### 2.4 Working directory

repo root（含 `docs/fact-cards/`）。

### 2.5 先跑 dry-run（强制）

```bash
# 先 dry-run，不写 DB，只解析 + 校验 8 张卡
npm run fact-layer:sync:dry
```

期望输出（每张卡一行）：

```
✓ eijuu-nenkin-risk              state=ai_verified    risk=critical triggers=11
✓ gijinkoku-job-mismatch         state=ai_verified    risk=high     triggers=12
✓ keiei-kanri-2025-10            state=ai_verified    risk=critical triggers=35
✓ keiei-kanri-existing-...       state=ai_verified    risk=high     triggers=26
✓ shikakugai-fukugyou            state=ai_verified    risk=high     triggers=?
✓ spouse-divorce-separation      state=human_reviewed risk=critical triggers=12
✓ startup-visa-keiei-transition  state=ai_extracted   risk=high     triggers=?
✓ zairyu-expiry-renewal-change   state=ai_verified    risk=high     triggers=?

8 cards parsed. 0 errors.
```

如果有任何 error → STOP，发 GM 排查。**不进 prod sync**。

### 2.6 跑 prod sync

```bash
DATABASE_URL="<prod>" npm run fact-layer:sync
```

期望输出：

```
... (parse output same as dry-run)
[fact-layer-sync] Upserting 8 cards into fact_cards...
[fact-layer-sync] Done. 8 inserted, 0 updated, 0 skipped.
```

第二次跑（幂等性测试）：

```
[fact-layer-sync] Done. 0 inserted, 0 updated, 8 skipped (content_hash unchanged).
```

### 2.7 Verification

```sql
-- prod DB 验证
SELECT fact_id, state, risk_level, controlled_alpha_eligible
FROM fact_cards
ORDER BY risk_level DESC, fact_id;

-- 期望 8 行
-- 所有 controlled_alpha_eligible = false (FACT v1.2 自律遵守)
-- 状态分布:
--   ai_extracted: 1 (startup-visa-keiei-transition)
--   ai_verified: 6
--   human_reviewed: 1 (spouse-divorce-separation, DOMAIN PR #77 已升)
```

### 2.8 If partial success

sync 是 per-card 事务。partial 失败：
- 部分卡写入成功 → 重跑即可（幂等）
- 个别卡 content_hash 校验失败 → STOP，发 GM 检查那张卡的 markdown 格式

### 2.9 Rollback

```sql
DELETE FROM fact_cards;
-- 数据可重新 sync，无丢失风险（source 在 git）
```

### 2.10 Verifier

PL 或 ENGINE 跑 §2.7 SQL 并截图，发 GM。

---

## 3. 操作 3 — Vercel env: `EVAL_LAB_ENABLED=1`

### 3.1 Type

**ADDITIVE**. 解锁 internal endpoint `/api/internal/fact-layer/dry-run`。**不影响**:
- `/ai-consultation` 用户端答案（不读 EVAL_LAB_ENABLED）
- `/api/consultation/stream` 行为（同上）
- secrets 暴露（endpoint 不返回 env vars）
- public-facing routes

### 3.2 Endpoint 暴露范围审计

dry-run endpoint 的代码路径：

```
POST /api/internal/fact-layer/dry-run
├─ 检查 process.env.EVAL_LAB_ENABLED === '1' 否则 404
├─ POST body: { question: string, ... }
├─ 调 matcher (lib/answer/fact-layer/matcher.ts) — 仅 DB 读
├─ 返回 { matches, certain_blocks, audit, would_inject_in_prod }
└─ 不调 LLM, 不写 DB, 不返回 secrets
```

**安全性**:
- 路径含 `/internal/` 前缀（既有 internal endpoint 命名约定）
- 无 auth gate（与现有 internal endpoints 一致）
- 但暴露后**任何人**知道 URL 都能 POST → 这是 dry-run 的设计但仍要谨慎
- 不返回任何 user PII（仅返回 fact card 公开内容 + 命中分析）

### 3.3 推荐：先 preview env 验证

```bash
# Vercel CLI
vercel env add EVAL_LAB_ENABLED 1 preview
# 触发 preview redeploy（如有 active preview）
```

在 preview URL 上验证：

```bash
PREVIEW_URL="https://tebiq-xxx-preview.vercel.app"
curl -fsS -X POST "$PREVIEW_URL/api/internal/fact-layer/dry-run" \
  -H 'Content-Type: application/json' \
  -d '{"question":"我是人文签想转经管签"}' | python3 -m json.tool

# 期望返回 matches 数组含 keiei-kanri-2025-10
# 期望 audit 含 decision, fact_card_state, risk_level
# 期望 NO secrets, NO user data
```

### 3.4 Prod env 写入

```bash
vercel env add EVAL_LAB_ENABLED 1 production
# 触发 production redeploy
vercel --prod    # 或等下次 push
```

### 3.5 Verification

```bash
# Prod 验证
curl -fsS -X POST https://tebiq.jp/api/internal/fact-layer/dry-run \
  -H 'Content-Type: application/json' \
  -d '{"question":"测试"}' -o /dev/null -w "%{http_code}\n"

# 期望: 200 (endpoint 工作)
# 如返回 404: env var 未生效 → 检查 Vercel deploy 是否含 env
```

```bash
# 同时验证 /ai-consultation 不受影响
curl -fsS https://tebiq.jp/ai-consultation | head -10
# 期望: 200 + HTML 正常返回
```

```bash
# 同时验证 stream 行为不变
curl -fsS -N --max-time 60 \
  -H 'Content-Type: application/json' \
  -d '{"question":"测试"}' \
  https://tebiq.jp/api/consultation/stream | grep -E '^event' | head
# 期望: 现有 events (received / risk_hint / routing_status / first_token / answer_chunk / completed)
# 期望: NO fact_cards_injected (Pack 2.2 未上线)
```

### 3.6 Rollback

```bash
vercel env rm EVAL_LAB_ENABLED production
# 重新 deploy
```

Endpoint 立即返回 404。无数据影响。

### 3.7 Verifier

PL 或 GM 跑 §3.5 三条验证命令并截图，发 GM 归档。

---

## 4. 操作 4 — `FACT_LAYER_ENABLED` 必须保持 `false`

### 4.1 Why

per PL §4：

```
FACT_LAYER_ENABLED 不得打开。

保持到以下条件全部满足：
1. Pack 2.2 stream injection PR merged
2. QA dry-run pass
3. DOMAIN 对 critical 卡给出 audit verdict
4. GM 提交 production enable recommendation
5. PL explicit approval
```

### 4.2 Verification (no-op step)

```bash
vercel env ls production | grep FACT_LAYER_ENABLED
# 期望: 不存在 OR 值为 false / 0 / 空
```

如果不慎设了 `=1`：

```bash
vercel env rm FACT_LAYER_ENABLED production
# 重新 deploy
```

### 4.3 当前 Pack 2.1 范围内 FACT_LAYER_ENABLED 不影响行为

Pack 2.1 代码不调用 `FACT_LAYER_ENABLED` 的 gate（matcher 仅在 dry-run endpoint 被调）。Pack 2.2 才接入 stream route，那时此 flag 才有意义。

---

## 5. 执行顺序汇总

```
[GM/PL prep]
  ☐ Backup prod DB
  ☐ Confirm production sha ≥ 43bb7b5
  ☐ Confirm git pull origin main locally含 959753f

[Step 1 — db:migrate]
  ☐ Run §1.5 command
  ☐ Verify §1.7 SQL output
  ☐ Verifier sign-off

[Step 2 — fact-layer:sync]
  ☐ Run §2.5 dry-run first
  ☐ Run §2.6 prod sync
  ☐ Verify §2.7 SQL (8 rows, controlled_alpha_eligible all false)
  ☐ Verifier sign-off

[Step 3 — EVAL_LAB_ENABLED]
  ☐ Run §3.3 preview verify (recommended)
  ☐ Run §3.4 prod env add
  ☐ Run §3.5 three verification commands
  ☐ Verifier sign-off

[Step 4 — FACT_LAYER_ENABLED no-op]
  ☐ Run §4.2 confirm not set
```

**总耗时估计**: 30-45 分钟，含验证。

---

## 6. 不变量 checklist (每步后必查)

每完成一步，PL 或 GM 跑：

```bash
# A. tebiq.jp 用户端正常
curl -fsS https://tebiq.jp/api/build-info
# 期望: {"gitSha":"...","branch":"main","builtAt":"...","version":"answer-core-v1.1-llm"}

# B. Stream 行为不变 (不出现 fact_cards_injected event)
curl -fsS -N --max-time 60 -H 'Content-Type: application/json' \
  -d '{"question":"我是人文签想转经管签"}' \
  https://tebiq.jp/api/consultation/stream | grep -c 'event: fact_cards_injected'
# 期望: 0 (Pack 2.2 未上线)

# C. 答案文本不出现 fact card certain_block 内容
curl -fsS -N --max-time 90 -H 'Content-Type: application/json' \
  -d '{"question":"经营管理签现在还是 500 万吗"}' \
  https://tebiq.jp/api/consultation/stream | grep -E '^data:' | head -50
# 期望: 答案中可能仍说 500 万 (因为 fact layer 未注入 — Pack 2.2 才接)
# 不应出现 "3,000万円" "改正" 等 certain_block 标准措辞 (此条不严格,模型可能从训练数据自发提及)
```

如**任何一步后**这 3 条不变量被破坏 → STOP + Rollback 当前步。

---

## 7. 全部完成后的状态

- prod fact_cards 表含 8 行，所有 controlled_alpha_eligible=false
- prod ai_consultations 多 2 列（默认 `[]`）
- EVAL_LAB_ENABLED=1，dry-run endpoint 200
- FACT_LAYER_ENABLED 仍 false / 未设
- /ai-consultation 用户端答案不变
- 模型仍按训练数据回答（仍可能说"经管 500 万"等旧政策）— 这是预期，等 Pack 2.2 + FACT_LAYER_ENABLED=true 才修

---

## 8. 接下来谁动？

- **QA**: 用 dry-run endpoint 验证 matcher 命中预期 fact card（4 题 baseline + 8 张卡）
- **DOMAIN**: 审 critical 卡 (eijuu-nenkin-risk + spouse-divorce-separation 已 human_reviewed) → 决定是否 PL signoff controlled_alpha_eligible
- **GM**: 等 QA + DOMAIN 反馈，起 ENGINE Pack 2.2 Work Packet

GM 不动 prod env / 不动 FACT_LAYER_ENABLED — 等 Pack 2.2 merge + QA pass + PL approval 才考虑 enable。

---

## 9. 紧急 STOP 条件

任何一步出现以下 → 立即 STOP + 通知 PL：

- `db:migrate` 报错且 partial state 不可重跑
- prod DB 写操作影响了 fact_cards 之外任何表（schema 应只动 ai_consultations 加 2 列）
- `/ai-consultation` 用户端答案文本/速度发生变化
- `/api/consultation/stream` 出现新事件类型 (Pack 2.2 才会引入 fact_cards_injected)
- `EVAL_LAB_ENABLED=1` 后任何 public route 行为变化
- 任何 secrets 出现在 dry-run endpoint 返回中

---

## 10. 版本

| version | date | actor | change |
|---|---|---|---|
| v1.0 | 2026-05-07 | GM (per PL §3 directive) | 初版 — Pack 2.1 prod ops 4 步 runbook |
