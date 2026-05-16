# BLOCK 12 REPORT - 拍照体验重塑

日期: 2026-04-29
分支: `codex/block-12`

## 完成情况

### 1. Handoff 拆分

- 已把 `AI_HANDOFF.md` 拆成:
  - `AI_HANDOFF_CCA.md`
  - `AI_HANDOFF_CCB.md`
  - `AI_HANDOFF_UI.md`
- `AI_HANDOFF.md` 现在只保留索引和异常报告。
- 已单独提交: `chore(handoff): split per-AI handoff files`

### 2. 撞配额弹窗改造

- 文案改为:
  - 标题: 今日次数已用完
  - 副文案: 免费版每天可识别 1 次。已识别的文书在「我的提醒」时间线。
- 去掉了「明天恢复」「稍后再说」「limit/quota」等不符合 voice 的表达。
- 弹窗中部从 `timeline_events` 统计已归档拍照文书数量。
- 底部 CTA:
  - 查看时间线 -> `/timeline`
  - 升级会员 -> `/pricing`
- 关闭按钮在右上角。

### 3. 首次注册 onboarding

- 新增 `/onboarding`。
- 标准新注册账号默认进入 `/onboarding`。
- 4 张引导卡:
  - 拍最近一个市役所/区役所信封
  - 拍在留卡/护照
  - 拍孩子学校/保育园文件
  - 拍有金额或期限的通知
- 每张卡点击进入 `/photo`。
- 底部「跳过」进入首页。
- 试用期内且还没有拍照记录时，首页和 `/timeline` 顶部显示克制条带:
  - 试用期还剩 X 天，试拍一份现实文件看看TEBIQ能识别什么
  - 可关闭，session 内生效。

### 4. PDF / 截图上传入口

- `/photo` 拍照按钮下方新增「上传 PDF / 截图」入口。
- 支持:
  - PDF
  - PNG
  - JPG / JPEG
  - HEIC / HEIF
  - WebP
- 客户端限制 10MB。
- 图片继续走原客户端压缩路径。
- PDF 原样上传到同一个 `/api/photo/recognize`。
- 服务端通过 magic bytes 检测 PDF (`%PDF-`)。
- PDF 走同一 Bedrock Sonnet 4.6 识别管线，以 document block 输入，并在 prompt 中限定只识别第一页。
- 配额逻辑不变: 免费每天 1 次，试用/付费不限。

## 关键设计判断

- 不把拍照做成高频工具，而是做成首次价值和时间线入口。
- 不扩大会员卖点，不改 pricing 数字。
- 不新增 npm 依赖；PDF 第一页使用 Claude document 输入 + prompt 限定，不做本地 PDF 渲染。
- PDF 全页识别仍留给后续 Block。

## 验证

- `npx tsc --noEmit` 通过。
- `npm run lint` 通过，无 warning。
- `npm run test` 通过: 7/7。
- `npm run build` 通过。
- 本地 production build smoke:
  - `/photo` 返回 200。
  - `/photo` HTML 可见「上传 PDF / 截图」入口。
  - `/onboarding` 未登录时 307 到 `/register?next=/onboarding`。
  - `/pricing` 返回 200。

说明: 当前 block-12 worktree 没有 `.env.local`，本地 `next start` 没连接 DB/AWS；涉及真实注册、Bedrock 识别和 quota API 的端到端实测需在创始人环境或 production preview 上跑。

## 已知风险 / trade-off

- PDF 采用 Bedrock/Claude document block，不新增 PDF 渲染依赖；prompt 限定只识别第一页，但底层仍由模型处理 PDF 输入。后续如果要严格物理第一页渲染，需要引入 PDF 渲染/转换方案。
- 配额弹窗的已归档数量依赖 `/api/photo/quota` 读取 `timeline_events`；如果 DB 不可用，前端保留占位文案，不阻断用户关闭弹窗。

## 给创始人的待办

- merge `codex/block-12` 到 main 后部署。
- production 上用真实账号跑一遍:
  - 新注册 -> `/onboarding`
  - 选择卡片 -> `/photo`
  - 连续识别到免费配额用完 -> 配额弹窗
  - 上传 1 个 PDF / 截图
