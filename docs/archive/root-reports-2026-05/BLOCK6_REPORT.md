# BLOCK6 Report

> **范围**：Day 6 创始人交班单 C 组（合规专业审查）+ D 组（自助分析）。
> **不在范围**：A 组（红黄绿三色判定，等创始人决策）、B 组（手动运维）、E/F/G/H/I 组（人事/外部对接/暂缓）、视觉层（留给 Codex）。
> **分支**：`claude/block-6`，从 `origin/codex/block-5` 切出，**未合并到 main**（preview 待一段，规避 Codex Block 4/5 review 冲突）。

---

## 完成情况

### C 组：合规专业审查（C18–C25）

1. **C18 — gijinkoku 自查 5 个新维度**
   - `lib/check/questions/gijinkoku.ts` 添加 Q14–Q18：
     - Q14 行政罚金 / 停止令 / 軽犯罪法処分（除交通外）
     - Q15 出入国記録（过去 3 年海外滞在时长）
     - Q16 課税証明書 取得可能性
     - Q17 住民票履歴 连续性
     - Q18 雇用契約 形态（正社員 / 契約社員 / 試用期 / 派遣 / 業務委託 / 無職）
   - 原 Q13 `next: null` → `next: '14'` 串入新链路。
   - **A 组三色判定未动**：trigger.severity 仍只用 red/yellow，不做整体 verdict 决策。

2. **C19 — articles 加审核人字段（migration 0005）**
   - `articles.last_reviewed_by_name varchar(100)`
   - `articles.last_reviewed_by_registration varchar(50)` (登録番号)
   - 已通过 `npx drizzle-kit push --force` 推到生产 Supabase。

3. **C20 — admin 知识库表单加审核人输入**
   - `app/admin/knowledge/AdminKnowledgeClient.tsx`：
     - 表单 2 列内联 Field（姓名 + 登録番号）
     - 顶部黄色 banner：「⚠ 行政書士法要求：发布前必须填写审核人姓名和登録番号」
     - `markReviewed()` 现在 prompt 两个字段，都为必填。

4. **C21 — 公开文章页 reviewer attribution**
   - `app/knowledge/[id]/page.tsx` 新增 `<ReviewerAttribution>` 组件，三态：
     - 完全填写 → 「本文已由行政書士 XXX（登録番号 XXXXXX）审核」
     - 仅 name → 「本文已由 XXX 审核」
     - 完全没填 → 顶部「⚠ 待审核」chip
   - 旧的 inline chip `已审核 by ${lastReviewedBy}` 改为更中性的「已由行政書士审核」。

5. **C22 — Bedrock prompt 重新约束**
   - `lib/photo/bedrock.ts buildSystemPrompt()` 改写为 12 条硬约束：
     - urgency 只看文档**字面**日期，不评估「对在留资格的影响」。
     - actions 只复述文档**字面**要求；**禁止**「建议联系书士」「对续签的影响」「金额估算」「审査时间预测」。
     - 文书提到签证 → 抄原文不评价。
     - 市役所 actions 模板：「持本通知前往居住地市役所窗口办理（具体流程以市役所公式为准）」。

6. **C23 — 非法律建议 disclaimer**
   - 新建 `app/_components/v5/ComplianceFooter.tsx`：
     - 行政書士法 21 条 disclaimer。
     - `includeMunicipalityNote` prop（默认 true）。
   - 已挂载到三处建议生成面：
     - `app/_components/QuizResultView.tsx`
     - `app/photo/result/[id]/page.tsx`
     - `app/photo/result/[id]/detail/page.tsx`

7. **C24 — 市役所 localization**
   - 在 ComplianceFooter 内附「市区町村具体窗口/流程以居住地公式为准」。
   - Bedrock prompt 同步约束（见 C22）。

8. **C25 — 移除 amount/审査 时长预测**
   - 见 C22。

   **C26 跳过**：blocked by A 组三色决策。
   **C27 跳过**：blocked by B14（HEIC 决策）。

### D 组：自助分析（D28–D33，零外部依赖）

> **设计原则**：不引入 PostHog / Vercel Analytics / Sentry，全部走 Postgres 自建表。**未碰 .env**。

1. **D28 — 最小事件集 + migration 0006**
   - 新建 `events` 表（cuid id, event_name varchar 64, family_id, member_id, session_id, payload jsonb, created_at + 3 个索引）。
   - 新建 `error_logs` 表（id, code, message, stack, path, digest, severity 'warn'|'error'|'critical', payload, created_at + 2 个索引）。
   - 已通过 `drizzle-kit push --force` 推到生产 Supabase。

2. **lib/analytics/* 工具集**
   - `events.ts`：`EVENT.*` 常量 + `ALL_EVENTS` 白名单。
   - `track.ts`：服务端 `track(name, payload, ctx)` — 不抛异常、写 events 表、可带 user/family/session。
   - `client.ts`：客户端 `trackClient(name, payload)` — 优先 sendBeacon，回退 fetch。
   - `errors.ts`：`captureError({code, message, stack, path, digest, severity, payload})` — 写 error_logs。

3. **API 路由**
   - 新建 `POST /api/events`：白名单 + 4KB payload 上限，204 No Content。
   - 重写 `POST /api/log-error`：从原 KV 写入改为 `captureError()`。

4. **D29 — 拍照指标**
   - `app/api/photo/recognize/route.ts` 在 4 个分支埋点：
     `PHOTO_RECOGNIZE_ATTEMPT` / `PHOTO_QUOTA_EXCEEDED` / `PHOTO_RECOGNIZE_FAIL` / `PHOTO_RECOGNIZE_SUCCESS`。

5. **D30 — 自查漏斗**
   - `/check` landing → `QUIZ_START`
   - `/check/[visa]` → `QUIZ_VISA_SELECTED { visa }`
   - `QuizResultView` → `QUIZ_COMPLETED { visa, verdict, triggeredCount }`
   - `QUIZ_QUESTION_ANSWERED` / `QUIZ_ABANDONED` 已在白名单；客户端按钮埋点等视觉层稳定后再补。

6. **D31 — CTA 事件（部分）**
   - 服务端：`/api/stripe/checkout` → `SUBSCRIBE_CHECKOUT_STARTED`；`/api/invite/create` → `INVITE_LINK_GENERATED`。
   - 鉴权：`/api/auth/send-otp` → `AUTH_OTP_SENT`；`/api/auth/verify-otp` → `AUTH_LOGIN_SUCCESS` / `AUTH_LOGIN_FAIL`。
   - 客户端 `CTA_CLICK` 在白名单，但 button-level 埋点等视觉层完成。

7. **D32 — 错误捕获**
   - `app/api/log-error` 已切到 `captureError`；`error_logs` 表 + DAL 完成。

8. **D33 — KPI 看板**
   - `lib/db/queries/analytics.ts`：`eventVolumeByName` / `eventCount` / `quizFunnel` / `photoFunnel` / `conversionFunnel` / `errorTotals` / `recentErrors`。
   - `app/admin/analytics/page.tsx`：服务端组件，分别展示 24h / 7d 拍照漏斗、自查漏斗、转化漏斗、错误严重度分布、最近 10 条错误。
   - `app/admin/_components/AdminNav.tsx` 加 `KPI` tab。

9. **`<TrackOnMount>` helper**
   - `app/_components/v5/TrackOnMount.tsx`：客户端组件，`useRef` 防 strict mode 双触发，挂载后发一次事件。
   - 让 server component 也能埋点，无需自己写 `'use client'`。

---

## 验证

- `npm run build` 干净通过（50+ 路由，包含 `/admin/analytics`）。
- 两个 migration 已 `drizzle-kit push --force` 推到生产 Supabase（journal 已记录）。
- 未触碰 `.env*`、未跑 `db:generate` 重建 snapshot（避免与 Codex 已存在的 0004 冲突）。

## 提交清单（claude/block-6）

```
4d282c6 feat(analytics): wire track calls across server routes + client surfaces (D29-D31)
c78bd0f feat(analytics): /admin/analytics KPI dashboard (D33)
cb2c26b feat(analytics): self-hosted events + error capture (D28+D32)
f4797fc feat(compliance): add ComplianceFooter on photo advice surfaces (C23+C24)
950065c feat(quiz): add 5 compliance dimensions Q14-Q18 to gijinkoku (C18)
b852c7f feat(compliance): wire reviewer attribution end-to-end (C19+C20+C21)
9a4dcfc feat(db): add reviewer attribution + analytics tables (migrations 0005, 0006)
efab290 feat(compliance): re-constrain Bedrock prompt to literal document content (C22+C25)
```

---

## 给 Codex 的同步要点

1. **DB schema 已加 5 个字段 + 2 张表**：拉 `claude/block-6` 后 `npm run db:generate` 应当返回 `No schema changes`（snapshot 已生成）。**不要重新生成 0005/0006**。
2. **不要改 `lib/analytics/events.ts` 的常量值**（`/api/events` 用它做白名单）。需要新事件请追加到 `ALL_EVENTS`。
3. **三个建议页已挂 `<ComplianceFooter>`**：`QuizResultView`、`/photo/result/[id]`、`/photo/result/[id]/detail`。视觉调整时请保留这个组件，不要替换为新的 footer 文案。
4. **Bedrock prompt 已重写**：如果你在重做拍照视觉时改 `lib/photo/bedrock.ts`，请只改 UI 相关字段处理，**不要碰 `buildSystemPrompt()` 的合规约束**。
5. **A 组（三色）我没动**：`Verdict` 类型还是 'red'|'yellow'|'green'，等创始人决策后再统一改。
6. **`/admin/analytics` 视觉是占位**：用了基本 grid + tailwind 默认色，等创始人确认 KPI 口径后可以重做视觉。
7. **`<TrackOnMount>` 用法**：放进任何 server component 即可，`payload` 改变不重发。如果需要在客户端按钮上埋点，直接 `import { trackClient } from '@/lib/analytics/client'`。

## 给下一轮 Claude 的同步要点

1. **claude/block-6 已 push 但未 merge**。下次开工前先确认 codex/block-4、codex/block-5 状态，再决定是 rebase 到新 main 还是直接合。
2. **A 组三色** 还在 founder 那边，等决策后才能统一收口（涉及 `lib/check/judge/index.ts`、`severityVisual`、`ResultBlock` 颜色等）。
3. **B 组手动事项** 仍待 founder 完成（AWS Bedrock、Stripe、Resend、Vercel env）。
4. **D31 客户端 CTA 埋点** 留到视觉稳定后再补：建议为常用 CTA 加一个 `<TrackedLink>` / `<TrackedButton>` 包装。
5. **不要 amend 已 push 的 commits**。需要修复直接新 commit。
6. **PROD migration 状态**：0001–0006 全部已 push 到生产 Supabase。`PRODUCTION_CHECKLIST.md` 里 migration 一节可以勾掉到 0006。

## 给 founder 的待办（仅本 Block）

- 决定是否 PR claude/block-6 合并到 main（建议先在 preview 跑一两天看 events 表是否有量、`/admin/analytics` 是否能正常打开）。
- KPI 看板字段如不满意，告诉 Claude 调整漏斗定义即可（`lib/db/queries/analytics.ts`）。
- 行政書士姓名/登録番号现在是发布前必填的硬约束 — 若实际审核流程不同，可调整 admin 表单 banner 文案。

---

## 仍未做（明确列出）

- A1–A8（三色判定、verdict 文案、紧急度颜色矩阵）— 等决策。
- B 组全部（环境变量、外部账号开通）— 手动事项。
- E 组（与行政書士对接的真实人）— 人事。
- F 组（Stripe webhook 真实接、Resend 模板审稿）— 等 B 组完成后。
- G/H/I 组 — 暂缓。
- 视觉细节（KPI 看板配色、ComplianceFooter 排版、admin banner 视觉）— 留给 Codex。
