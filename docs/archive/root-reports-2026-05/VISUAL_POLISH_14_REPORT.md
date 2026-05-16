# Visual Polish 14 Report

## 基线

- branch: `codex/visual-polish-14`
- base: `origin/launch/review-candidate-p0-ui` (`c728981`)
- started at: `2026-04-29T12:40:56Z`

## 本轮目标

- UI 精细度
- 移动端成熟度
- 信息层级
- 空态统一
- 文案克制

## 修改范围

| 页面 | 修改内容 | 是否涉及逻辑 |
|---|---|---|
| `/` | 收紧首页首屏比例；样例卡改成更像真实识别结果的文书摘要；常用入口补图标和更稳定的行语法。 | 否 |
| `/photo` | 示例入口改成可见列表行；上传框高度、图标尺度、配额提示和上传文案收紧。 | 否 |
| `/photo/sample-result` | 重排样例结果层级：日文文书名、机构、期限、金额、行动步骤和归档说明更适合扫读。 | 否 |
| `/timeline` | 空态预览改成真实待办列表语法，日期 / 标题 / 状态对齐，避免“空数据库”感。 | 否 |
| `/pricing` | 降低金额压迫感；订阅说明从长段双语改成结构化说明行；主按钮后置。 | 否 |
| `/check` / `/check/gijinkoku` | 保持材料准备检查结构，维度行更安静，未改业务判断。 | 否 |
| `/check/gijinkoku/work_change` | fallback 单项检查保留现有流，签证名展示更自然。 | 否 |
| `/check/keiei/capital_investment` | fallback 标题从内部 key 改成用户可读标题。 | 否 |
| `/settings` / `/settings/account` | 设置项视觉改成成熟产品列表；删除区使用克制 warning，不做红色恐吓。 | 否 |
| `/knowledge` | 空态移除插画感，改成低调说明容器；分类和搜索层级更干净。 | 否 |
| `/not-found-test-random` | 保持 VP13 的返回上一页 / 回首页结构。 | 否 |

## 没有修改的范围

- `/login`，由 CCA 负责
- `app/api`
- `lib/db`
- `lib/photo`
- `lib/stripe`
- `lib/notifications`
- Stripe / Resend / Bedrock
- CCB 内容
- `.env*`

## 关键提升

1. 首页和拍照入口从“展示能力”转向“稳定文书工具入口”，首屏更短、更明确。
2. 样例结果页改为事实优先：文书名、机构、期限、金额、行动步骤一眼可扫。
3. timeline / knowledge 空态改成低调系统状态，不使用插画和情绪化提示。
4. pricing 订阅说明更像日本工具产品，不再像销售页。
5. settings 删除账号入口更严肃，但没有红色恐吓感。

## 截图

目录: `docs/visual-report/screenshots/visual-polish-14/`

- 320: `*-320.png`
- 375: `*-375.png`
- 393: `*-393.png`
- 430: `*-430.png`
- 768: `*-768.png`

共 65 张截图，覆盖:

- `/`
- `/photo`
- `/photo/sample-result`
- `/timeline`
- `/pricing`
- `/check`
- `/check/gijinkoku`
- `/check/gijinkoku/work_change`
- `/check/keiei/capital_investment`
- `/settings`
- `/settings/account`
- `/knowledge`
- `/not-found-test-random`

注: 本地没有登录会话时，`/settings` 和 `/settings/account` 会按现有认证逻辑跳转到 `/login`。本轮未改 `/login`，截图保留该行为。

## 待创始人 review

1. 首页“最近文书示例”是否已经足够像真实能力，而不是营销展示。
2. `/photo/sample-result` 的信息密度是否符合“用户看完就知道拍照后会得到什么”。
3. `/pricing` 的订阅说明是否需要后续由 CCA/法务补更完整的日本消费者保护文案。

## 自评

当前视觉成熟度: 8.4 / 10。VP12/13 的系统感保住了，VP14 把几处“粗卡片 / 空态 / 大数字销售感”往成熟工具方向推了一步。

下一轮还值得继续提升的地方:

- 登录后真实 `/settings` 页面截图和微调，需要 CCA 登录修复合并后再做。
- 真实数据状态下的 timeline / knowledge 列表密度微调。
- `/check` 的维度内容需要等 CCB 内容和数据库状态齐备后再按真实标题统一扫一遍。
