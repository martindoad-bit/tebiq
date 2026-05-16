# Question Intake UI v2 Report

## 基线

- branch: `codex/question-intake-ui-v2`
- base: `origin/codex/question-intake-v1` (`cd28e20`)
- started at: `2026-04-30T14:11:02+09:00`

## 首页新结构

- 首页从工具集合改成情况入口：品牌说明之后直接呈现「你现在遇到什么情况？」输入区。
- 输入框不使用聊天式语法，不出现「问 AI」或「AI 帮你判断」。
- 热门情况以低噪声 chip 呈现：办公室搬迁 / 换工作 / 父母来日本 / 公司休眠 / 签证转换。
- 快捷工具改成列表行，并明确补上图标：
  - 相机图标：拍一份文书试试
  - 清单图标：续签材料准备检查
  - 日历图标：我的提醒

## 提问入口组件

- `QuestionIntakeBox` 改成统一情况入口组件。
- `/check`、`/knowledge`、`/photo/sample-result`、`/decision-lab` 继续复用 compact 版本。
- compact 文案：
  - 找不到你的情况？
  - 把你现在遇到的问题写下来，TEBIQ 会根据真实问题继续整理手续路径。
- 成功状态：
  - 已收到
  - TEBIQ 会根据收到的问题继续整理场景和手续说明。
- 保留原有 `/api/questions` 提交逻辑，只调整前端字段呈现。

## Admin Questions

- `/admin/questions` 顶部统计调整为 4 个高频指标：总数 / 今日新增 / 未处理 / 高优先级。
- 问题正文成为列表主信息；状态、优先级、来源页、联系方式降为低噪声元信息。
- status / priority 从技术值改为中文短标签。
- 数据不可读时文案改为非技术表达，不再暴露 migration 编号。

## Admin Import

- `/admin/questions/import` 改为大 textarea 为主的导入界面。
- 明确说明：每行一个问题，也可以直接粘贴多行原始咨询记录。
- 预览导入数量固定显示，提交成功后显示导入数量。
- 页面标题和说明去掉 `source_page` / `match_status` 等技术字段。

## Review Lite

- `/admin/review-lite` 改成 30 秒审核用的按钮式表单。
- 原始问题存在时放在页面顶部，用更大的字号展示。
- 方向判断、公开判断、需要专家从 select 改成可点击按钮组。
- 1-5 分评分改成大按钮。
- 标签选择改成 chip 按钮。
- 英文筛选和 card 状态标签改为中文短标签，L2/L3/L4 保留可扫读等级。

## Login

- 只做视觉和提示增强，没有改认证逻辑。
- 顶部说明改为「邮箱和手机号都可以登录」。
- 邮箱失败提示加清晰标题，并保留「改用手机号登录」入口。
- 手机号登录 tab 保持同级可见。

## 截图路径

截图目录：`docs/visual-report/screenshots/question-intake-ui-v2/`

- 320: `320-home.png` / `320-check.png` / `320-knowledge.png` / `320-photo-sample-result.png` / `320-decision-lab.png` / `320-admin-questions.png` / `320-admin-questions-import.png` / `320-admin-review-lite.png` / `320-login.png`
- 375: `375-home.png` / `375-check.png` / `375-knowledge.png` / `375-photo-sample-result.png` / `375-decision-lab.png` / `375-admin-questions.png` / `375-admin-questions-import.png` / `375-admin-review-lite.png` / `375-login.png`
- 393: `393-home.png` / `393-check.png` / `393-knowledge.png` / `393-photo-sample-result.png` / `393-decision-lab.png` / `393-admin-questions.png` / `393-admin-questions-import.png` / `393-admin-review-lite.png` / `393-login.png`
- 430: `430-home.png` / `430-check.png` / `430-knowledge.png` / `430-photo-sample-result.png` / `430-decision-lab.png` / `430-admin-questions.png` / `430-admin-questions-import.png` / `430-admin-review-lite.png` / `430-login.png`
- 768: `768-home.png` / `768-check.png` / `768-knowledge.png` / `768-photo-sample-result.png` / `768-decision-lab.png` / `768-admin-questions.png` / `768-admin-questions-import.png` / `768-admin-review-lite.png` / `768-login.png`

## 没碰的逻辑

- 没改 `app/api/**`
- 没改 `lib/db/**`
- 没改认证 API、Question Intake API、admin API
- 没改数据库 schema / migration
- 没改 Stripe / Resend / Bedrock
- 没改 CCB 内容文件

## 验证

- `npm run lint`: passed
- `npx tsc --noEmit`: passed
- `npm run build`: passed
- 5 档截图：45 张已生成

## 建议下一步

1. CCA 合并生产登录和问题 intake 后，用真实 DB 数据再看 `/admin/questions` 的长文本密度。
2. 给 `/admin/review-lite?questionId=...` 准备 1-2 条 fixture，验证原始问题置顶态。
3. 下一轮可以继续做问题提交后的「收到后去哪里看」路径提示，但需要产品确认是否给用户展示问题状态。
