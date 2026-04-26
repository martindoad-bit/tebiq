# BLOCK4_REPORT

## 2026-04-26 邀请功能第一单元

### 已完成

- 新增 `/invite` 邀请页，使用 v5 AppShell、三项状态摘要、复制/系统分享入口。
- 新增 `/invite/[code]` 邀请落地页，展示邀请人和注册 CTA。
- 新增 `POST /api/invite/create`，登录用户可生成或复用待领取邀请码，并返回短链、奖励天数和邀请统计。
- 完成邀请注册链路：登录验证支持 `ref` 邀请码；仅新手机号注册时尝试兑换邀请；兑换成功后双方各加 `INVITE_REWARD_DAYS` 天 basic trial，默认 7 天。
- 接入三个触发点：拍照配额弹窗、自查结果页、我的账户。
- 调用 GPT Image 2 生成邀请礼盒插画，最终接入 `public/illustrations/invite-gift.png`。

### 视觉与产品说明

- 插画选择：深蓝礼盒 + 暖橙丝带 + 双向箭头，贴合 v5 的信赖蓝、温暖橙、柔和米背景，不引入泛紫渐变或 SaaS 感插图。
- 邀请页信息密度：首屏讲清规则，状态卡只保留「已邀请 / 已获得 / 待领取」，避免做成 dashboard。
- 邀请落地页：无效或已领取邀请码不报错暴露细节，只给注册入口。

### 待 review

- 同一个新用户是否允许未来再次接受另一个邀请：当前实现只保证单个 pending code 只能领取一次，没有新增跨邀请去重约束。
- 邀请码过期时间：当前沿用 schema 的 pending 状态，没有增加过期策略。

### 验证

- `npm run lint` 通过。
- `npm run build` 通过。

## 2026-04-26 知识内容系统

### 已完成

- 新增 `articles` 表 migration，字段包含 `title`、`body_markdown`、`category`、`status`、`requires_shoshi_review`、`updated_at`。
- 新增 `lib/db/queries/articles.ts`，公开侧只读取 `status='published'` 的文章，admin 侧可读取和保存全量文章。
- 新增 `/admin/knowledge` 列表 + Markdown 编辑器 + preview，并接入后台导航。
- 新增 `/api/admin/knowledge`，沿用 `ADMIN_KEY` 保护规则。
- 将 `/knowledge` 和 `/knowledge/[id]` 改为读取 articles 表；详情页继续使用 v5 AppShell 视觉，不再从本地 concept stub 渲染公开内容。
- migration 内置 2 篇 published 初始文章，带 `requires_shoshi_review=true`，保证部署后知识中心不是空白。

### 待 review

- 内容审核流目前只有状态字段，没有实现「谁审核 / 审核意见 / 审核记录」。这属于产品流程决策，先保留字段能力。
- migration snapshot 没有通过 drizzle-kit 自动生成，因为本轮不读取 `.env.local`；当前 runtime migration SQL 和 schema 已同步。

### 验证

- `npm run lint` 通过。
- `npm run build` 通过。

## 2026-04-26 真实登录态 fixture

### 已完成

- `scripts/dev-utils/visual-fixtures.ts` 改为优先使用本地 `DATABASE_URL`，并禁用 prepared statements，兼容 Supabase pooler。
- 新增 `npm run dev:visual-fixtures` 和 `npm run dev:visual-fixtures:cleanup`。
- 新增 dev-only `/api/auth/dev-session`：仅非 production 可用，用来给 `empty`、`data`、`subscribed` 三种视觉账号写入 httpOnly session cookie。
- README 增加一行命令说明和三种用户态说明。
- fixture 输出改为本地登录 URL，不再打印 session id。

### 待 review

- 真实 DB 未在当前沙箱运行，fixture 的数据库写入没有做端到端执行；代码路径通过 build/typecheck。

### 验证

- `npm run lint` 通过。
- `npm run build` 通过。

## 2026-04-26 根级 SEO 页统一

### 已完成

- 新增共享 `SeoVisaArticleShell`、`SeoSection`、`SeoBullet`，6 个根级签证 SEO 页共用同一套 v5 外壳和正文块。
- `/gijinkoku`、`/keiei`、`/haigusha`、`/tokutei`、`/teijusha`、`/eijusha` 移除旧 header/footer 壳，保留原有长正文、metadata、JSON-LD。
- 旧 token 已替换为 v5 视觉 token：`bg-canvas`、`bg-surface`、`border-hairline`、`text-ink`、`text-ash`、`rounded-card`、`shadow-card`。
- 底部 CTA 保留：有现成自查题库的 5 个签证页继续进入对应自查；永住页暂时保留到签证选择页，避免链接到未实装 quiz。

### 待 review

- `/eijusha` 目前没有对应 quiz bank，未强行改为 `/check/eijusha`，否则会形成死链。建议 Block 4 后确认永住自查是否进入 1.0。

### 验证

- `npm run lint` 通过。
- `npm run build` 通过。
