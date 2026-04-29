# Visual Polish 15 Report

## 基线

- branch: `codex/visual-polish-15`
- base: `origin/codex/visual-polish-14` (`29eb811`)
- started at: `2026-04-29T15:38:30Z`

## 本轮目标

- 表单精细度
- 结果页层级
- pricing 可读性
- timeline 信息密度
- knowledge 空态 / 列表密度
- settings/account 严肃感
- 320 / 375 / 393 / 430 / 768 五档视口检查

## 修改范围

| 页面 / 组件 | 修改内容 | 是否涉及逻辑 |
|---|---|---|
| `/` | 首页主 CTA 从试用语气收紧为工具动作；样例结果入口文案更偏结构化结果。 | 否 |
| `/photo` | 拍照上传主框高度和 icon 尺度收紧；上传 PDF / 图片行字重降噪。 | 否 |
| `/photo/sample-result` | 主 CTA 改为更直接的文书识别动作，保持结果信息结构不变。 | 否 |
| `/timeline` | 空态样例中的“待确认”降为灰色，仅“需要补齐”保留 warning。 | 否 |
| `/pricing` | 金额字号略降，权益列表文字可读性提高，主按钮高度收紧。 | 否 |
| `/check` / `/check/gijinkoku` | 维度行标题和签证切换 tab 字重降噪；“待确认”不再使用 warning 色。 | 否 |
| `/knowledge` | 搜索、分类、文章卡片密度收紧，标题字重降到普通层级。 | 否 |
| `/login` | 修正选中 tab 的文字对比；顶部说明文案降噪。未改认证流程。 | 否 |
| 全局按钮 | 修正 primary pressed 状态，避免主按钮按下时意外变浅；disabled 增加不可点击光标。 | 否 |
| 全局状态徽章 | 高度和字号略收紧；`待处理 / 需要补齐` 才进入 warning 视觉。 | 否 |

## 没有修改的范围

- `app/api`
- `lib/db`
- `lib/photo`
- `lib/stripe`
- `lib/notifications`
- `docs/knowledge-seed`
- `scripts/import*`
- `scripts/validate*`
- `package.json`
- check dimension 数据读取逻辑、loader、fallback 数据结构
- Stripe / Resend / Bedrock
- 数据库 schema / migration

## 截图

目录: `docs/visual-report/screenshots/visual-polish-15/`

- 320: `*-320.png`
- 375: `*-375.png`
- 393: `*-393.png`
- 430: `*-430.png`
- 768: `*-768.png`

共 60 张截图，覆盖:

- `/`
- `/photo`
- `/photo/sample-result`
- `/timeline`
- `/pricing`
- `/check`
- `/check/gijinkoku`
- `/settings`
- `/settings/account`
- `/knowledge`
- `/login`
- `/not-found-test-random`

注: 本地没有登录会话时，`/settings` 和 `/settings/account` 按现有认证逻辑跳转到 `/login`。本轮未改认证逻辑，也未使用 dev mock session 绕过。

## 验证

- `npm run lint`: 通过
- `npx tsc --noEmit`: 通过
- `npm run build`: 通过

## 仍然建议后续提升

1. 等 CCA 的 Holiday Release Final 合入后，在最终集成分支上重新看 `/login`，避免重复修改造成的小冲突。
2. 用真实登录态再截 `/settings` 和 `/settings/account`，确认删除账号区在真实数据下的严肃感。
3. 用真实 articles 数据复查 `/knowledge` 列表密度；当前主要验证的是空态和 fallback。
4. 用真实 timeline 事件复查 `/timeline` 的状态 tag 分布，避免未来数据多时再次出现标签噪声。
