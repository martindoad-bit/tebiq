# Launch Bug Sweep Report

## 基线
- branch: `chore/p0-launch-fixes`
- starting head: `3533e6f0cc695e029e20023aea81649c02dc1675`
- preview: `https://tebiq-gjjdwiw53-martindoad.vercel.app` / branch alias `https://tebiq-git-chore-p0-launch-fixes-martindoad.vercel.app`
- started at: `2026-04-29T11:24:30Z`

## 本轮目标
- 路由扫雷
- 登录态扫雷
- 空态扫雷
- CTA 扫雷
- 文案扫雷
- 上线风险扫雷

## 发现的问题
| 编号 | 等级 | 页面/路径 | 复现方式 | 问题 | 处理 |
|---|---|---|---|---|---|
| LBS-001 | P1 | `/photo/sample-result` | 本地 production 访问样例页，核对 demo 字段 | 样例结果缺少显式 `文书类型 / 发件机构 / 不处理会怎样`，demo 承载力不足 | 已修复 |
| LBS-002 | P1 | `/pricing` | 核对开通按钮上方消费者保护说明 | 日中双语说明已有订阅/取消/删除/原图说明，但缺少联系入口 | 已修复 |
| LBS-003 | P1 | `/knowledge` | 本地无 `DATABASE_URL` 访问 `/knowledge`，server log 出现 DAL 错误 | knowledge 列表直接调用 DB；无 DB 环境会进入错误路径，不符合本地 production sweep 标准 | 已修复 |
| LBS-004 | P1 | 自查题库文案 | 搜索 launch 禁词 `一定被拒` | 两处说明文案含 `不等于一定被拒`，虽然是否定句，但上线前法律边界不够克制 | 已修复 |

## 已修复
| 编号 | commit | 修复内容 | 验证方式 |
|---|---|---|---|
| LBS-001 | `9d5a825` | `/photo/sample-result` 增加 `文书类型 / 发件机构 / 不处理会怎样`，`下一步` 改为 `要做什么` | 本地 production 访问 `/photo/sample-result`，确认字段存在且 CTA 返回 `/photo`、`/timeline` |
| LBS-002 | `9d5a825` | `/pricing` 消费者保护说明增加 `contact@tebiq.jp` 日中联系入口 | 本地 production 访问 `/pricing`，确认 `¥980`、`¥8,800`、双语说明和邮箱存在 |
| LBS-003 | `9d5a825` | `/knowledge` 列表 DB 读取失败时返回空数组，走现有空态，不再抛出 DAL 错误 | 本地无 `DATABASE_URL` production server 访问 `/knowledge` 返回 200，server log 无错误 |
| LBS-004 | `9d5a825` | 将 `不等于一定被拒` 改为 `不必然导致不许可` | `rg` 搜索 `一定被拒 / 拒签概率 / 一定通过 / 高危 / 必定拒签`，非 admin 前端无相关残留 |

## 未修复 / 待 review
| 编号 | 原因 | 建议 |
|---|---|---|
| REV-001 | Preview URL 和 branch alias 均被 Vercel Preview Protection 拦截，HTTP 抽测返回 401，无法直接验证页面 HTML | 创始人用 Vercel 授权访问 preview 后，按本报告路径做手机端点击检查 |
| REV-002 | 本地无登录态和 production DB，不造测试账号、不读取 `.env*`，无法完整验证已登录 `/settings/account` 删除后的 DB 状态 | 创始人用测试账号检查: `/settings/account` → `删除账号和全部数据` → 二次确认 → 确认退出登录/软删除标记 |
| REV-003 | 本地无 DB 时 9 个 `/check/{visa}/{dimension}` 全部走 `该维度准备中` fallback，无法验证 production 真实 batch-04 内容展示 | merge 后用 production DB 抽测同一组 URL；预期有数据则显示真实维度内容，无数据才 fallback |
| REV-004 | `/pricing` checkout 按钮未测试真实 Stripe，因为本轮边界是不碰 Stripe 真实链路 | 创始人若要上线收费，需用 Stripe test/live 配置单独跑付款链路 |

## 本地 production 路由结果
| 路径 | 结果 |
|---|---|
| `/` | 200 |
| `/photo` | 200 |
| `/photo/sample-result` | 200 |
| `/timeline` | 200 |
| `/pricing` | 200 |
| `/check` | 200 |
| `/check/gijinkoku` | 200 |
| `/check/keiei` | 200 |
| `/check/haigusha` | 200 |
| `/check/tokutei` | 200 |
| `/check/teijusha` | 200 |
| `/check/eijusha` | 200 |
| `/settings` | 307 未登录跳转 |
| `/settings/account` | 307 未登录跳转 |
| `/privacy-policy` | 200 |
| `/login` | 200 |
| `/knowledge` | 200 |

## `/check/[visa]/[dimension]` 深扫
- 抽测总数: 9
- 成功: 9
- fallback: 9
- 异常: 0

| 路径 | 结果 | 内容状态 |
|---|---|---|
| `/check/gijinkoku/work_change` | 200 | `该维度准备中` |
| `/check/gijinkoku/residence_tax` | 200 | `该维度准备中` |
| `/check/gijinkoku/health_pension` | 200 | `该维度准备中` |
| `/check/keiei/capital_investment` | 200 | `该维度准备中` |
| `/check/keiei/office_entity` | 200 | `该维度准备中` |
| `/check/haigusha/marriage_continuity` | 200 | `该维度准备中` |
| `/check/tokutei/support_organization` | 200 | `该维度准备中` |
| `/check/teijusha/residence_tax` | 200 | `该维度准备中` |
| `/check/eijusha/public_obligations` | 200 | `该维度准备中` |

本地无 `DATABASE_URL`，所以深扫验证的是 fallback 稳定性。页面未出现旧词: `风险诊断 / 自动判定 / AI 判断你能不能过 / 拒签概率 / 一定通过 / 一定不通过 / 高危 / 必定拒签`。

## 关键页面检查
- 首页: 只有一个主 CTA `拍一份文书试试`；中部为 `最近文书示例`；未发现真实姓名、真实地址、真实号码。
- `/photo`: 未登录可访问；有 `还没拍过？看一份示例结果 →`；上传入口存在；未出现英文技术错误。
- `/photo/sample-result`: 字段包含文书类型、发件机构、期限、金额、要做什么、不处理会怎样；CTA 指向 `/photo` 和 `/timeline`。
- `/timeline`: 无记录时显示 3 条灰态样例；未展示私人档案数量；空态链接不死。
- `/pricing`: 消费者保护说明在开通按钮上方；价格为 `¥980/月` 和 `¥8,800/年`；说明含订阅性质、取消、数据删除、原图不保存、联系方式。
- `/settings/account`: 未登录 307 到 `/login?next=/settings/account`；删除按钮和二次确认文案由现有 client/API 复用软删除流程。

## Preview 抽测
- `https://tebiq-gjjdwiw53-martindoad.vercel.app`: `/`、`/photo`、`/photo/sample-result`、`/timeline`、`/pricing`、`/check`、`/check/gijinkoku/work_change`、`/settings/account`、`/privacy-policy` 均返回 401。
- `https://tebiq-git-chore-p0-launch-fixes-martindoad.vercel.app`: 同样返回 401。
- 判断: Vercel Preview Protection 阻挡，未做页面内容断言；不伪造 preview 结果。

## 验证命令
- `npm run lint`: 通过
- `npx tsc --noEmit`: 通过
- `npm run build`: 通过
- `npm run test`: 通过

## 最终结论
- 是否 launch-review ready: 是
- 仍需创始人看的点:
  - 用 Vercel 授权打开 preview，手机检查首页 / photo / sample result / pricing / check。
  - 用测试账号进入 `/settings/account` 检查删除账号二次确认。
  - merge 后在 production DB 环境抽测 `/check/{visa}/{dimension}` 是否从 batch-04 显示真实内容。
  - 若准备真实收费，单独做 Stripe checkout 测试。
