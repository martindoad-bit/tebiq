# Question Intake UI v1 Report

## 基线

- branch: `codex/question-intake-ui-v1`
- base: `origin/codex/decision-intelligence-v0` (`1154194`)
- note: `origin/codex/question-intake-v1` 开工时尚未存在，因此按 brief 使用 fallback 基线。
- started at: `2026-04-30T04:33:49Z`

## 修改页面

| 页面 | 修改内容 | 是否涉及逻辑 |
|---|---|---|
| `/` | 第一屏改为 Question Intake；保留拍照入口，并在快捷工具中加入相机 icon。 | 使用既有 `/api/decision-lab/query` |
| `/check` | 底部加入统一 `QuestionIntakeCard`。 | 否 |
| `/knowledge` | 底部加入统一 `QuestionIntakeCard`。 | 否 |
| `/photo/sample-result` | 样例结果后加入统一问题入口。 | 否 |
| `/decision-lab` | 保留原搜索卡，并在底部加入统一问题入口。 | 否 |
| `/admin/questions` | 新增高密度问题列表 UI、统计区、导入入口。 | 静态 UI |
| `/admin/questions/import` | 新增大 textarea、行数预览、导入状态 UI。 | 静态 UI |
| `/admin/review-lite` | 原始问题前置；评分改成 1-5 按钮；flags 改成按钮式多选；备注输入更轻。 | 复用既有提交 API |
| `/login` | 邮箱/手机号 tab 可读性和邮件错误提示文案收紧。 | 否 |
| `app/admin/_components/ui.tsx` | Admin PageShell 字重、背景和标题层级收紧，降低后台模板感。 | 否 |

## 首页新结构

1. 顶部 `TEBIQ` + 一行工具说明。
2. 核心问题输入：`你现在遇到什么情况？`
3. 热门情况 chip：办公室搬迁 / 换工作 / 父母来日 / 公司休眠 / 签证转换。
4. 最近文书示例。
5. 快捷工具列表：拍一份文书试试 / 续签材料准备检查 / 我的提醒。

## Admin UI

- `/admin/questions` 使用 4 个数字指标和一列高密度队列，`question_text` 是视觉主信息。
- `status / priority` 使用低噪声标签，仅高优先级使用 warning 色。
- `/admin/questions/import` 支持直接粘贴多行原始咨询记录，按非空行预览导入数量。
- `/admin/review-lite` 目标是一条内容 30 秒内审完：原始问题最显眼，评分按钮更大，flags 不再像表格。

## 截图路径

目录: `docs/visual-report/screenshots/question-intake-ui-v1/`

- 320: `*-320.png`
- 375: `*-375.png`
- 393: `*-393.png`
- 430: `*-430.png`
- 768: `*-768.png`

共 45 张截图，覆盖:

- `/`
- `/check`
- `/knowledge`
- `/photo/sample-result`
- `/decision-lab`
- `/admin/questions`
- `/admin/questions/import`
- `/admin/review-lite`
- `/login`

## 未碰的逻辑

- 未修改 `app/api/**`
- 未修改 `lib/db/**`
- 未修改 `lib/photo/**`
- 未修改 `lib/stripe/**`
- 未修改 `lib/notifications/**`
- 未修改 `docs/knowledge-seed/**`
- 未修改 `scripts/import*` / `scripts/validate*`
- 未修改 `package.json`
- 未新增 database schema 或 migration

## 验证

- `npm run lint`: 通过
- `npx tsc --noEmit`: 通过
- `npm run build`: 通过

## 建议下一步

1. CCA 接入真实 `questions` 数据后，把 `/admin/questions` 从静态样例切到真实列表。
2. `/admin/questions/import` 下一步接入真正导入 API，并返回成功 / 跳过 / 失败计数。
3. Question Intake 提交后的状态需要产品决定：直接展示匹配结果，还是先进入“已记录 / 待整理”状态。
4. 首页输入框可以在真实问题量足够后加入轻量 autocomplete，但不要做成 ChatGPT 对话框。
