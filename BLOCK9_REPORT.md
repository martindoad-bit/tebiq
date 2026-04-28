# BLOCK 9 Report - 1.0 上线前真实闭环 + 守边界差异化

分支：`codex/block-9`
基线：`origin/main`

## 任务完成情况

1. 登录闭环：完成
   - 新增 `dev_login_links` 表，migration `0010_high_swordsman.sql`。
   - dev / local 发送 magic link 时写入 `dev_login_links`。
   - 新增 `/admin/dev-login` 页面和 `/api/admin/dev-login`，仅 `NODE_ENV !== production` 可用，production 返回 404。
   - magic link 消费后同步标记 `consumed_at`。
   - SMS `OTP_DEV_MODE=true` 路径保留，用 server log 看验证码。

2. 拍照真实可用化：完成
   - `/api/photo/recognize` 不信客户端 MIME，改用 magic bytes 检测真实格式。
   - 支持 JPEG / PNG / WebP；HEIC / HEIF server 端转 JPEG 后发 Bedrock。
   - 不支持格式返回友好错误：“图片格式不支持……微信……导出原图”。
   - Bedrock prompt 已放宽识别范围，同时保留合规边界。
   - 识别 schema 改为客观字段：`docType / issuer / isEnvelope / recognitionConfidence / deadline / amount / summary / generalActions / isUrgent / needsExpertAdvice`。
   - 结果页适配新 schema：信封识别、低质量提示、上下文提示、截止日期标签、行政書士咨询 CTA、ComplianceFooter 保留。
   - 匿名用户不注入个性化上下文；登录用户注入最近自查和最近文书 metadata。

3. 知识库分级上线：完成
   - 新增 `article_visibility` enum 和 `articles.visibility` 字段，默认 `private`，migration `0011_crazy_shaman.sql`。
   - 公开 `/knowledge` 只显示 `status='published' AND visibility='public'`。
   - `/admin/knowledge` 增加 visibility 切换器。
   - 公开侧不再显示“待书士审核”橙色 tag；未审核内容默认 private，不进入公开列表。

4. e2e 测试脚本：完成
   - `scripts/test/test-recognition.ts` 支持：
     - `IMAGE=/path/to/photo.jpg npx tsx scripts/test/test-recognition.ts`
     - `USER_ID=test_user_001 IMAGE=/path/to/photo.jpg npx tsx scripts/test/test-recognition.ts`
   - 输出完整 JSON、易读摘要、`isEnvelope`、`userContextInjected`、context hints、基础准确度评分。

5. 不修改事项：遵守
   - 未动 `docs/knowledge-seed/`。
   - 未动 Tailwind config / 视觉 token / 插画。
   - 未改 PROJECT_MEMORY 视觉规范段。
   - 未读取或提交 `.env*` 内容。
   - 未改配额逻辑；未改认证主流程，只新增 dev mode fallback。

## Prompt 改造前后 diff 总结

旧版：
- 白名单过窄，只处理固定文书类型。
- 强制旧 schema：`urgency / actions / consequences / detail.sections`。
- Prompt 合规限制很严，导致 Bedrock 能识别但产品层大量 fallback。

新版：
- 识别范围扩到日本政府 / 行政 / 税务 / 社会保险 / 入管 / 市区町村 / 公共服务 / 银行 / 不动产 / 学校 / 雇主相关文书。
- “是什么”和“怎么处理”拆开：识别尽量准确，行动建议只允许保守通用步骤。
- 信封单独处理：`isEnvelope=true` + `recognitionConfidence='envelope_only'`。
- 严禁输出对续签 / 永住 / 在留資格影响、金额预测、审查时间预测、行政指导。

允许的 `generalActions` 只有：
- 在期限内打开并阅读完整内容
- 若有金额,在期限内缴纳
- 不明白时建议咨询行政書士
- 持本通知前往居住地市役所窗口办理(以市役所公式为准)
- 保留原件备查
- 若是信封,请打开后再次拍摄获取详细信息

## 用户上下文注入的合规设计

`lib/photo/user-context.ts` 只取低敏 metadata：
- `visaType`
- `daysToVisaExpiry`
- `hasRecentQuizResult`
- 最近 6 个月拍过的 `docType`
- 最近 6 个月拍过的 `issuer + docType`

使用边界：
- 只用于相关性判断，例如“你之前已收到同机构的类似文书，请检查是否为同一事项的后续”。
- 不输出续签 / 永住 / 在留资格影响判断。
- 不输出“你应该 / 你需要 / 建议你”式行政指导。
- 匿名用户默认不注入个性化上下文，避免未登录连拍触发个性化提示。

待 review：
- “发件机构和登记地址不一致”目前未实现，因为 `members` 表没有登记住所 / 市区町村字段。等用户档案补地址字段后再加。

## HEIC / MIME 处理方案

检测规则：
- JPEG：前 2 bytes `FF D8`
- PNG：前 8 bytes `89 50 4E 47 0D 0A 1A 0A`
- HEIC / HEIF：bytes 4-8 为 `ftyp`，brand 为 `heic / heif / mif1 / msf1`
- WebP：bytes 0-3 为 `RIFF`，bytes 8-11 为 `WEBP`

处理：
- JPEG / PNG / WebP 直接发 Bedrock。
- HEIC / HEIF 用 `heic-convert` 转 JPEG。
- 转换失败或未知格式返回 400 友好提示。
- `next.config.mjs` 将 HEIC 相关包 externalize，避免 wasm bundle warning。

## 已知风险 / Trade-off

- 新增依赖 `heic-convert`，用于 iPhone HEIC 真实闭环。已处理 Next build warning，但仍需 production Node runtime 实拍验证。
- Prompt 已放宽识别范围，低质量图片会更倾向返回 low confidence，而不是 fallback；这符合 1.0 体验，但需要 5-10 张真实样张调校。
- `needsExpertAdvice` 当前是保守分类，税务 / 入管 / 行政类文书会更容易显示行政書士咨询 CTA。
- 公开知识库默认会变少，甚至为空；这是书士要求的安全侧上线策略。

## 验证

- `npm run lint`：通过，0 warning / error。
- `npx tsc --noEmit --pretty false`：通过。
- `npm run build`：通过，HEIC wasm warning 已通过 externalize 消除。
- `npm run db:generate`：No schema changes。
- `npm run test`：7 passed。
- 真实 Bedrock 图片 e2e：待创始人提供 5-10 张真实日文照片后执行。

## 创始人需要做的事

1. 用 5-10 张真实日文文书照片跑 `/photo` 和 `scripts/test/test-recognition.ts`。
2. 在 admin 后台把 5-10 篇已审文章从 `private` 改成 `public`。
3. 邀请合伙人行政書士分批审核知识库，再逐批公开。

## 1.0 就绪度更新

- 登录本地 / dev 测试闭环：就位。
- 拍照识别真实闭环：代码就位，待真实照片回归。
- 知识库公开信任边界：就位，默认安全侧 private。
- 上线前最关键剩余动作：真实照片回归 + 书士分批 public。
