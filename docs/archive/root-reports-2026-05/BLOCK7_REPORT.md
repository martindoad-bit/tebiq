# BLOCK7 Report — 上线前最后一公里

> **范围**：16 项任务（T1–T16），按创始人交班单编号。
> **不在范围**：A 组三色判定 / B14 HEIC / 视觉细节 / 真实 Bedrock·Resend·Stripe（外部账号）。
> **分支**：`claude/block-7`，从 `origin/claude/block-6` 切出，**未合并到 main**。

---

## 16 项任务完成情况

| 任务 | 状态 | 备注 |
| --- | --- | --- |
| T1 客户端 CTA 全埋点 | ✅ 完成 | 13 个新事件，覆盖首页/Tab/拍照/配额弹窗/分享/邀请/知识/咨询。新增 `<TrackedLink>`/`<TrackedButton>` helper |
| T2 6 个签证 Q14–Q18 合规题统一 | ✅ 完成 | keiei / haigusha / tokutei / teijusha 各加 5 题（永住按要求跳过）。Q15 经管签改为「公司経営状况」。 |
| T3 /knowledge/[id] SEO 完整化 | ✅ 完成 | generateMetadata + JSON-LD Article + RelatedArticles 组件 |
| T4 /knowledge 分类路由 | ✅ 完成 | `?category=visa` 服务端过滤 + 按分类 generateMetadata |
| T5 拍照 fallback 体验 | ✅ 完成 | 新建 `/photo/result/[id]/fallback`，主结果页自动 redirect |
| T6 配额边界 | ✅ 完成（部分早已就绪） | 订阅/试用 bypass 已在 Block 3；本 block 加：QuotaFullModal 倒计时（"距下个月还有 X 天"）+ 月初重置测试脚本 |
| T7 邮箱验证完整流程 | ✅ 完成 | migration 0007（已 push 生产）、token DAL、send-verification + verify API、UI 三态、check-expiry cron 过滤未验证邮箱 |
| T8 错误页 + 404 定制 | ✅ 完成 | not-found / error.tsx 改 v5 视觉；新增 `/photo/error.tsx`、`/check/error.tsx`、`/subscribe/error.tsx` 三个局部边界 |
| T9 加载状态完整化 | ✅ 完成 | 三个 loading.tsx 骨架屏；T9b 拍照识别 rotating 文案（合并到 T10）；T9c 自查切题动画原本就存在（QuizEngine slideInRight） |
| T10 拍照渐进体验 | ✅ 完成 | 客户端 canvas 压缩 + XHR 上传进度 + 识别中 rotating 文案。`lib/photo/clientCompress.ts` 新文件 |
| T11 /admin/analytics 增强 | ✅ 完成 | SVG sparkline（24h hourly + 7d daily）、ConversionRateCard（distinct member）、ErrorByPath、EventStreamCard、`revalidate=60` |
| T12 admin/knowledge 增强 | ✅ 完成 | migration 0008（articles.history jsonb，已 push）、30 秒 autosave、HistoryModal、全屏预览 toggle |
| T13 /invite/[code] 优化 | ✅ 完成 | 具名 inviter（不暴露 phone）、过期倒计时、统一友好错误文案、`/welcome` 新页面 |
| T14 metadata audit | ✅ 完成 | scripts/test/audit-metadata.ts、docs/metadata-audit.md、补 5 个 page metadata（含两个 use-client 用 layout.tsx 注入） |
| T15 fixture URLs + 截图 | 🟡 部分 | URLs 自动写到 `docs/dev-fixtures-urls.md` ✅；Playwright 截图 **延后到 Block 8**（需要 ~150MB 浏览器 + dev 服务跑起来） |
| T16 邀请月度封顶精确化 | ✅ 完成 | 改为允许部分发放：最后一笔可以只发剩余天数（28 → 还能发 2） |

**完成度：15/16 完整 + 1/16 部分（仅 T15 截图部分延后）**

---

## 验证

- ✅ `npm run lint` 通过零 warning
- ✅ `npm run build` 通过（50+ 路由，含新增 `/welcome`, `/photo/result/[id]/fallback`, `/api/account/email/{send-verification,verify}`, `/api/admin/knowledge/[id]/history`）
- ✅ `npx drizzle-kit generate` → `No schema changes, nothing to migrate 😴`
- ✅ `npx tsc --noEmit` 干净
- ✅ migration 0007 + 0008 已 push 到生产 Supabase（journal 已记录）

未跑的（缺前置条件）：
- 用户注册 → 邮箱验证邮件（mock）→ 验证完成的 e2e — Resend mock dir 需要本地写入测试
- 已订阅用户连拍 10 张不触发配额 — 需要 dev 服务 + 真实文件
- 邀请朋友 → 双方加 7 天 trial — 需要两个不同 phone 走完整流程

这些 e2e 创始人本地手测一次最快。fixture + dev-session URL 已经准备好。

---

## 已 push 到生产 Supabase 的 migration

| 编号 | 名称 | 内容 |
| --- | --- | --- |
| 0001 – 0006 | （Block 1–6） | 之前 Block 已记录 |
| 0007 | `0007_faithful_colossus.sql` | `email_verification_tokens` 表 + 3 个 indexes |
| 0008 | `0008_jittery_black_tom.sql` | `articles.history` jsonb 列 |

`PRODUCTION_CHECKLIST.md` 里 migration 一节可以勾掉到 0008。

---

## 待 review 项 / 已知遗漏

1. **T15 Playwright 截图** — 延后到 Block 8。可以用 `/api/auth/dev-session?scenario=...` 手动截图替代（URL 已列在 `docs/dev-fixtures-urls.md`）。
2. **T6b "邀请会员有效中,无限识别" 提示** — Block 3 已实现订阅/试用 bypass（`lib/photo/quota.ts`），但拍照页面 UI 上没有显式横幅。视觉层 Codex 决定是否加。
3. **T14 仍缺 metadata 的路由** — `/visa-select`、`/knowledge/updates`、`/subscribe`、`/photo/result/*` noindex、`/invite`（无 code）、`/dev/stripe-test` 全部 noindex。详细在 `docs/metadata-audit.md` 待补清单。
4. **T11 KPI 看板视觉** — SVG sparkline + 表格用了原来的 `border-line` / `bg-card` token，**没用 v5 ink/accent/canvas tokens**。Codex 来视觉重做时可以全部刷一遍。
5. **T7 实际 Resend 发送** — RESEND_API_KEY 没配，所有验证邮件走 mock dir（`/tmp/tebiq-notification-emails/*.eml`）。生产前需要创始人配 key。
6. **A 组三色** 还未碰，等创始人决策。
7. **B14 HEIC** 仍未决策；T10 客户端压缩里对 HEIC 直接 pass-through（不解码、原样上传），Bedrock 那边可能识别失败 → 走 T5 fallback。

---

## 创始人待操作清单

> 以下是 Block 7 后**仅本 block 引发**的待办。Block 6 报告里的待办仍然有效。

### 必做（影响 1.0 上线）

- [ ] PR review claude/block-7（自查范围 ~30 文件 + 2 migrations + 5 新表/列），合并前看一眼 commit 顺序是否合意（每个 commit 对应一个 task）。
- [ ] 配 `RESEND_API_KEY` 环境变量，否则邮箱验证邮件全走 mock，到期提醒不会真发。
- [ ] 决定 `/photo/result/*` 的 robots 策略（个人识别结果是否允许 index）。当前没标注，建议加 `noindex` 以保用户隐私。
- [ ] 跑一次 `npm run dev:visual-fixtures`，验证 `docs/dev-fixtures-urls.md` 自动写入正常，访问三个场景的 `/api/auth/dev-session?scenario=...` 看视觉。

### 建议做

- [ ] 决定 A 组三色判定 — Block 6 报告里说 blocked，Block 7 仍未碰。决定后顺手把 `severityVisual()`、`Verdict` 文案、`ResultBlock` 颜色矩阵改一遍。
- [ ] 决定 B14 HEIC 服务端转换策略 — 当前 fallback 路径已经能 work，可以暂不动。
- [ ] 跑一次 `npx tsx scripts/test/test-quota-reset.ts`（需要 DATABASE_URL），验证月初重置逻辑无误。

### 视觉相关（Codex 来做）

- [ ] `<ComplianceFooter>`、`<TrackedLink>`、KPI 看板、HistoryModal、welcome page、fallback page 等 Block 7 新组件**视觉留给 Codex**。结构 + 文案 + 行为已稳定。

---

## 给 Codex 的同步要点

1. **DB schema 已加 3 项**：拉 `claude/block-7` 后 `npm run db:generate` 应该返回 `No schema changes`。**不要重新生成 0007 / 0008**。
2. **不要改 `lib/analytics/events.ts` 的 EVENT 常量值** — 用作 `/api/events` 白名单。新事件请追加，不要重命名旧的。
3. **不要碰这些路径**（避免冲突）：
   - `lib/photo/clientCompress.ts`、`lib/photo/quota.ts`、`lib/photo/bedrock.ts`
   - `lib/db/queries/{articles, invitations, emailVerification, analytics}.ts`
   - `lib/notifications/templates/email_verification.ts`
   - `app/_components/v5/{TrackedLink, TrackOnMount, ComplianceFooter}.tsx`
   - `app/api/account/email/**`、`app/api/admin/knowledge/[id]/history/**`、`app/api/events/**`
4. **可以自由调整视觉**：所有新加的 page / component（404、error.tsx、loading.tsx、`/welcome`、`/photo/result/[id]/fallback`、`/admin/analytics` 增强部分、HistoryModal）**结构 + 文案先定下来了**，视觉细节请按 v5 token 重做。
5. **A 组三色我没动** — Verdict 类型、severityVisual、Result block 颜色矩阵都还是 Block 5 状态。
6. **knowledge 分类页**用了 `?category=visa` 不是 `/knowledge/[category]`，因为 dynamic segment 会和 `/knowledge/[id]` 冲突。如果你要做更精细的分类页视觉，可以传 `activeCategory` 进 `<KnowledgeClient>`。
7. **拍照流程**现在有 4 种状态：idle → compressing → uploading(%) → recognizing(rotating msg)。视觉重做时请保留状态机。

---

## 给下一轮 Claude 的同步要点

1. **claude/block-7 已 push，未 merge**。
2. **Block 8 候选**（按重要性）：
   - T15 Playwright 截图自动化（需要 `npm install -D @playwright/test`）
   - 完整 e2e 测试集（注册→邮箱验证→自查→拍照→订阅）
   - A 组三色重构（创始人决策后）
   - T14 仍缺 metadata 的路由补完
   - OG image generation for `/knowledge/[id]`、签证攻略页（参考 `/share/[id]/page.tsx` 模板）
   - HEIC 服务端转换（创始人决策后）
3. **不要 amend 已 push 的 commits**。需要修复直接新 commit。
4. **PROD migration 状态**：0001–0008 全部已 push 到生产 Supabase。
5. **未碰的硬规则**仍然有效：不读 .env、不动 lib/check 引擎核心、不动 Stripe 链路、不和 Codex 同时跑。

---

## 1.0 上线就绪度自评

**8.5 / 10**

**满分扣 1.5 的原因**：

- −0.5 — 三色 verdict 决策没下，影响最重要的「自查结果给用户的明确信号」。
- −0.5 — Playwright e2e 没跑，关键流程靠手测。
- −0.5 — Resend 没配真实 key，到期提醒走 mock channel；上线后 30 天才有第一个真实场景，但还是早配早安心。

**剩下 8.5 包含**：

- ✅ 合规 — Block 6 + Block 7 已经把行政書士法、市役所 localization、Bedrock prompt 边界、邮箱验证全部就位。
- ✅ 自助分析 — 自建 events / error_logs，不依赖外部，admin 看板能看 24h/7d 漏斗 + 转化率 + 错误。
- ✅ 用户体验 — 错误页 / 404 / loading / 拍照渐进 / quiz 滑动动画都有了。
- ✅ 邀请闭环 — 落地页、welcome、月度封顶精确到 30 天。
- ✅ DB schema — 8 个 migration 全部上线，没有数据迁移阻塞。
- ✅ 全局 SEO — 主要公开页都有 metadata + JSON-LD + canonical。
- ✅ 代码质量 — lint + build + typecheck 全部 0 warning。

**距离 9.5/10 还差什么**：A 组决策 + 真实 Resend + 跑一遍 Playwright e2e + Codex 把 Block 7 新加的页面做视觉。不是大工程，1-2 天能搞定。

**距离 10/10**：HEIC 服务端转换 + 多语言（日文 / 英文）→ Block 9 议题。

---

## 提交清单（claude/block-7）

```
bc831a2 chore(lint): drop unused Link import from sample-package
9998943 feat(dev): visual-fixtures script writes dev-session URLs to docs (T15)
a86d5c5 feat(seo): metadata audit + add missing metadata to key public routes (T14)
adcb06d feat(invite): /invite/[code] landing optimization + /welcome page (T13)
9dc2ea3 feat(admin-knowledge): autosave + history (10 versions) + preview toggle (T12)
da2fbe2 feat(analytics): admin KPI dashboard enhancements (T11)
10d8fde feat(photo): client compression + upload progress + recognition messages (T10+T9b)
fe42a35 feat(ux): v5 404 + global error + per-route boundaries + loading skeletons (T8+T9)
41aca97 feat(email): verification flow + migration 0007 (T7)
7aa872c feat(photo): fallback experience page (T5)
feb8e8c feat(invitations,quota): precise monthly cap + quota reset test (T6+T16)
188fe47 feat(knowledge): SEO + JSON-LD + related articles + server category route (T3+T4)
44315cc feat(quiz): add 5 compliance dimensions to keiei/haigusha/tokutei/teijusha (T2)
6559aff feat(analytics): wire client CTA tracking across surfaces (T1)
```
