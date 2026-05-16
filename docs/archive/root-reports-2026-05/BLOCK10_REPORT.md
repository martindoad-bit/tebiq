# BLOCK 10 REPORT

Branch: `codex/block-10`
Base: `origin/main`
Date: 2026-04-28

## 1. 任务完成情况

| Task | Status | Notes |
| --- | --- | --- |
| 1. 去掉“书士”前端可见性 | Done | 公开页面、组件、结果页、合规 footer、知识文章详情不再展示 reviewer / requires_shoshi_review / “书士审核”标签。`/admin/knowledge` 和 admin 咨询台保留内部字段。 |
| 2. 主页大改造 | Done | 首页改为品牌区 + 今日相关 + 4 个核心工具 + 最新政策 + 简化信任元素。未登录展示静态今日相关；已登录会尝试读取 user-context，DB 不可用时安全降级。 |
| 3. 文字即懂工具 | Done | 新增 `/ask`、`/api/text-understand`、Bedrock Claude 调用、用户上下文注入、单独免费配额 5 次/月、结果页模块。 |
| 4. 知识库嵌入主流程 | Done | 拍照结果、自查结果、文字即懂结果底部均接入“相关知识”；政策更新文章详情新增“对你的影响”轻量模块。 |
| 5. knowledge 路径调整 | Done | `/knowledge` 保留直访和 sitemap；底部导航移除知识中心，改为 首页 / 工具 / 提醒 / 我的；新增 `/tools`。 |
| 6. import 脚本适配 | Done | `import-knowledge` 接受 `scenario_tags` / `applies_to` / `urgency_level` / `estimated_read_time` / `doc_type_tags`；旧审核字段保留读取但不覆盖前台展示逻辑。 |
| 7. 不修改事项 | Done | 未修改 `.env*`、`docs/knowledge-seed/`、Tailwind config、视觉 token、PROJECT_MEMORY 视觉规范段、认证/Stripe 逻辑。 |

## 2. 主页改造前后

Before:
- 首页主要是两个大入口：拍照即懂 / 续签自查。
- 知识库作为独立目的地存在，主导航有知识中心入口。
- 信任卡和服务选择偏“展示”，工具入口密度不足。

After:
- 第一屏保留 `TEBIQ / てびき` 品牌和“在日生活好帮手”。
- 新增“今日相关”横向卡：未登录为默认场景，已登录基于在留期限、自查、历史文件生成。
- 新增 2x2 核心工具：拍照即懂、文字即懂、续签自查、任务清单占位。
- 新增“最新政策”列表，只读取 `visibility='public' AND status='published' AND category='policy-update'`。
- 信任元素压缩到底部，保留“数据在日本境内 / 信息仅供参考”。

Screenshots:
- `docs/visual-report/screenshots/block-10-home/home-320.png`
- `docs/visual-report/screenshots/block-10-home/home-375.png`
- `docs/visual-report/screenshots/block-10-home/home-393.png`
- `docs/visual-report/screenshots/block-10-home/home-430.png`
- `docs/visual-report/screenshots/block-10-home/home-768.png`
- `docs/visual-report/screenshots/block-10-home/ask-393.png`

Note: 本地没有读取 `.env*`，因此没有 production `DATABASE_URL`；首页政策列表在本地截图中走空态。代码已加安全 fallback，避免入口页因 DB 缺失或短暂失败直接 500。

## 3. 文字即懂实现细节

新增文件/模块:
- `app/ask/page.tsx`
- `app/ask/AskClient.tsx`
- `app/api/text-understand/route.ts`
- `lib/text-understand/bedrock.ts`
- `lib/text-understand/types.ts`
- `lib/db/queries/textUnderstand.ts`
- `text_understand_requests` 表和 migration `0012`

行为:
- 输入日文最多 2000 字，补充上下文最多 400 字。
- 未登录可用，使用匿名 `session_id`；已登录使用 `family_id/member_id`。
- 免费配额单独计算：5 次/月；active/trialing subscription 视为无限。
- 不保存原文，只保存 `inputHash`、简短 summary 和 AI JSON response。
- Bedrock model 默认读取 `TEXT_UNDERSTAND_MODEL_ID`，未配置时 fallback 到 `PHOTO_RECOGNITION_MODEL_ID`，再 fallback 到 `jp.anthropic.claude-sonnet-4-6`。

合规输出:
- `meaning`: 这段日文什么意思。
- `relevance`: 这件事和用户可能有什么关系，只做相关性说明。
- `generalActions`: 只允许从固定通用步骤列表中选择。
- 禁止输出对续签/永住/在留资格影响判断、具体行政指导、金额预测、审查时间预测。

## 4. 知识嵌入方式

数据库新增 nullable 字段:
- `articles.doc_type_tags`
- `articles.scenario_tags`
- `articles.applies_to`
- `articles.urgency_level`
- `articles.estimated_read_time`

相关知识推荐:
- `GET /api/knowledge/related?tags=...&limit=2`
- 查询只返回 `status='published'` 且 `visibility='public'` 的文章。
- 匹配优先使用 tags/category/title/body 的轻量 fuzzy，不做复杂向量检索。

接入位置:
- `app/photo/result/[id]/page.tsx`
- `app/check/result/ResultClient.tsx`
- `app/ask/AskClient.tsx`
- `app/knowledge/[id]/page.tsx` 的政策文章“对你的影响”模块

公开侧处理:
- `lib/knowledge/public-text.ts` 对文章标题/摘要/正文做公开文案清理，避免旧内容里的“书士审核”标签或“书士”称谓露出。
- Admin 仍保留 reviewer 字段和审核工作流。

## 5. 已知风险 / Trade-off

- 本地未读取 `.env*`，所以没有执行真实 Bedrock 文本理解 e2e；需要 production/staging 环境用真实日文样本验证。
- 相关知识推荐是 tags + fuzzy 的轻量实现，不是语义检索；够 1.0 嵌入主流程，Block 11 可升级为 embedding/向量检索。
- 公开侧对旧文章正文做运行时文案清理，这是为了快速消除法律风险；长期建议 CC-B 的 batch-02 从源头改写术语。
- 首页已登录个性化依赖 DB/user-context，失败时降级为默认卡片，不阻塞首页访问。

## 6. 验证

已执行:
- `npm run lint` passed
- `npx tsc --noEmit --pretty false` passed
- `npm run build` passed
- `npm run db:generate` returned `No schema changes`
- Playwright homepage screenshots: 320 / 375 / 393 / 430 / 768 passed, local GET `/` = 200 after DB fallback
- Playwright `/ask` screenshot: 393 passed

待创始人用真实环境验证:
- 文字即懂：粘贴日文 + 上下文，确认 Bedrock 返回合规 JSON。
- 拍照结果 / 自查结果 / 文字即懂底部相关知识是否命中真实 public 文章。
- `/knowledge` 直访仍可访问，主导航不再露出知识中心。

## 7. 创始人需要做的事

1. 手动 merge `codex/block-10` 到 `main`，等待 Vercel redeploy。
2. 等 CC-B 写完 `content/knowledge-batch-02` 后，跑 `npm run import-knowledge`。
3. 在 `/admin/knowledge` 分批把通过审核的文章切 `visibility=public`。
