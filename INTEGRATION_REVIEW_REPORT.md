# Integration Review Candidate Report

## 基线
- branch: `launch/review-candidate-p0-ui`
- base: `origin/main` (`4d2a325112de66bbd130d4885fac68a5aa060350`)
- merged:
  - chore/p0-launch-fixes: `08bce6e0770fb5da2a4f6e8618e6cf2e10e494f3`
  - codex/visual-polish-13: `efc7fa1cd83856b2e03df2188d569b6a0c3c6e96`
- started at: `2026-04-29T11:48:38Z`

## 合并结果
- P0 分支是否合入: 是，merge commit `5d7ac63`
- UI 分支是否合入: 是，merge commit `11114fa`
- 是否发生冲突: 是
- 冲突文件:
  - `app/settings/SettingsClient.tsx`
  - `app/timeline/page.tsx`
- 冲突解决原则:
  - 功能逻辑保留 P0: 删除账号文案、软删除说明、timeline 三条灰态样例。
  - 视觉细节保留 UI: 异步按钮 `处理中...`、timeline 空态结构、筛选空态文案、整体视觉 class。

## 保留的 P0 修复
1. `/check/[visa]/[dimension]` 数据缺失时显示 `该维度准备中` fallback，不 404。
2. `/photo/sample-result` 保留完整 demo 字段: 文书类型、发件机构、期限、金额、要做什么、不处理会怎样。
3. `/pricing` 保留消费者保护说明: 订阅性质、取消、数据删除、原图不保存、联系方式。
4. `/settings/account` 保留未登录跳转、`删除账号和全部数据` 文案与现有软删除机制。
5. 配额弹窗保留客观文案和 `查看时间线 / 升级会员` CTA。

## 保留的 UI 修复
1. 用户侧 `font-semibold` / `font-bold` 清理，字重更克制。
2. `/timeline` 空态保留 UI 的浅灰容器、交易列表式行列结构和 `拍一份文书开始 →` 链接。
3. 404 页保留 `返回上一页` 主按钮和 `回首页` 次按钮。
4. 异步按钮文案保留 `处理中...`。
5. badge 降噪、价格页金额压迫感降低、中日混排层级调整均合入。

## 验证结果
- npm run lint: 通过
- npx tsc --noEmit: 通过
- npm run build: 通过
- npm run test: 通过

## 本地 production 抽测
| 路径 | 结果 | 备注 |
|---|---|---|
| `/` | 200 | 首页只有一个主 CTA；样例模块存在 |
| `/photo` | 200 | 可见上传入口和 sample link |
| `/photo/sample-result` | 200 | 字段完整；CTA 指向 `/photo` / `/timeline` |
| `/timeline` | 200 | 空态样例自然显示，含 3 条灰态样例 |
| `/pricing` | 200 | `¥980` / `¥8,800` 与消费者保护说明存在 |
| `/check` | 200 | 材料准备检查入口正常 |
| `/check/gijinkoku` | 200 | 签证清单页正常 |
| `/check/gijinkoku/work_change` | 200 | 显示 `该维度准备中` fallback |
| `/check/keiei/capital_investment` | 200 | 显示 `该维度准备中` fallback |
| `/settings` | 307 | 未登录跳转合理 |
| `/settings/account` | 307 | 未登录跳转合理 |
| `/privacy-policy` | 200 | 可访问 |
| `/login` | 200 | 可访问 |
| `/knowledge` | 200 | 无 DB 本地环境走空态，不 500 |
| `/not-found-test-random` | 404 | 404 页面含 `返回上一页` 和 `回首页` |

## 待创始人手动检查
1. 手机打开首页 → 样例 → `/photo/sample-result` → `/photo`。
2. `/pricing` 消费者保护说明是否清楚、不过度承诺。
3. 测试账号进入 `/settings/account`，确认删除账号二次确认和退出状态。
4. merge 到有真实 DB 的环境后，抽测 `/check/{visa}/{dimension}` 是否显示 batch-04 真实内容；无内容时才 fallback。

## 是否建议创始人手机 review
是。

原因:
- P0 和 UI 分支均已合入临时分支，保留合并历史。
- 冲突只发生在 2 个功能/视觉交叉文件，已按 P0 功能优先、UI 视觉优先手动合并。
- lint / typecheck / build / test 全部通过。
- 本地 production 抽测覆盖指定路径，无 500、白屏、主 CTA 死链或禁用法律风险文案。
