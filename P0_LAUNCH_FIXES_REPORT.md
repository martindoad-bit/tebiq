# P0_LAUNCH_FIXES_REPORT

最后更新: 2026-04-29T11:17:57Z

## 分支

- 分支: `chore/p0-launch-fixes`
- worktree: `/Users/martin/Documents/tebiq/.claude/worktrees/codex-p0-fixes`
- merge 时机: 创始人手机端到端测试通过后再 merge

## P0-1: 续签材料准备检查 404 + 文案

- `/check/[visa]/[dimension]` 不再因为 `articles` 缺失或维度内容未导入而 404。
- 单维度数据缺失时显示降级 UI: `该维度准备中`，并提供返回清单 / 完整材料准备检查入口。
- `/check` 清单优先读取 `articles.visa_type + dimension_key` 的 batch-04 维度；无数据时回退内置维度。
- 本地无 `DATABASE_URL` 时也不进入错误边界，方便 preview/local 验证。
- 用户可见文案从 `续签自查 / 风险 / 必看` 系统改为 `续签材料准备检查 / 准备事项 / 递交前确认` 系统。
- 状态文案统一为: `已确认 / 需要补齐 / 待确认 / 基本齐备`。
- 二次扫雷补充:
  - 去掉自查题库里残留的强烈词 `危险`。
  - 修正机械替换后的 `待确认事项触发项 / 待确认事项等级 / 待确认事项高` 表达。
  - 非 admin 前端扫描已无 `续签自查 / 当前风险点 / 建议必看 / 风险 / 必看 / 危险` 残留。

## P0-2: 首页去重 + 拍照样例

- 首页未登录态只保留 1 个深墨蓝主 CTA: `拍一份文书试试`。
- 首页中部改为 `最近文书示例`，展示脱敏样例:
  - `6/30 到期 / 住民税通知 / 江戸川区役所 / ¥38,500`
- 新增静态样例结果页: `/photo/sample-result`。
- `/photo` 拍照框上方新增样例入口: `还没拍过？看一份示例结果 →`。
- `/timeline` 空态显示 3 条灰态样例:
  - `住民税通知 / 6月30日 / 待缴`
  - `在留カード更新 / 提前2个月递交`
  - `学校缴费 / 下月1日`
- 配额弹窗二次扫雷:
  - 副文案改为 `免费版每天可识别 1 次。已识别的文书在「我的提醒」时间线。`
  - 左侧 CTA 改为 `查看时间线`。

## P0-3: /pricing 消费者保护信息

- `/pricing` 开通按钮正上方新增日中双语说明:
  - 月额自動更新 / 月度自动续费
  - 可取消，取消后可用至下次更新日
  - 数据可删除
  - 原画像 / 原始图片不保存
- `/settings/account` 已新增。
- `/settings` 与 `/settings/account` 使用同一设置组件。
- 删除按钮文案改为 `删除账号和全部数据`。
- 二次确认文案: `这将删除您的全部档案、提醒和账号。该操作不可撤销。`
- 删除逻辑复用现有软删除 API: `/api/settings/delete-account`。

## 验证

- `npm run lint` 通过。
- `npx tsc --noEmit` 通过。
- `npm run build` 通过。
- `npm run test` 通过。
- 本地 production server (`next start`, port 3107) 抽测:
  - `/` 200
  - `/photo` 200
  - `/photo/sample-result` 200
  - `/timeline` 200
  - `/pricing` 200
  - `/check` 200
  - `/check/technical_humanities_international/passport_zairyu` 200
  - `/check/management/residence_tax` 200
  - `/check/spouse/juuminhyou` 200
  - `/check/permanent_resident_preparation/health_pension` 200
  - `/check/specified_skilled_worker/material_preparation` 200
  - `/settings` 307 未登录跳转
  - `/settings/account` 307 未登录跳转
- 二次扫雷后重新验证:
  - `npm run lint` 通过。
  - `npx tsc --noEmit` 通过。
  - `npm run build` 通过。
  - `npm run test` 通过。
  - 本地 production server 路由抽测同上，全部维持预期状态。
  - `/photo?quota=full` 弹窗为客户端渲染；源码文案已验证，服务端 HTML 不包含该 modal 属于预期。

## 自测结果

- ✓ `/check/technical_humanities_international/passport_zairyu` 200，不 404。
- ✓ 5 签证 × 12 维度抽样 5 组合点击不 404。
- ✓ 首页 CTA 文案为 `拍一份文书试试`，更多功能里是 `续签材料准备检查`。
- ✓ 首页 HTML 未出现 `当前风险点 / 建议必看 / 风险`。
- ✓ 状态徽章使用 `递交前确认 / 准备事项 / 需要补齐` 系统。
- ✓ 二次扫雷后非 admin 前端扫描无 `续签自查 / 当前风险点 / 建议必看 / 风险 / 必看 / 危险` 残留。
- ✓ 首页只有 1 个深墨蓝主 CTA。
- ✓ 首页中部是样例卡片，不是工具列表。
- ✓ 样例点击跳转完成态结果页 `/photo/sample-result`。
- ✓ `/photo` 顶部有样例链接。
- ✓ `/timeline` 空态显示 3 条灰态样例。
- ✓ `/pricing` 开通按钮上方有双语续费说明。
- ✓ 设置页有删除账号按钮。
- ✓ 二次确认 → 调用现有软删除接口；未登录态本地验证为 307 跳登录。

## 待创始人手机验证

- 手机打开首页确认首屏只有一个主 CTA。
- 点击首页样例卡和 `/photo` 样例入口。
- 用已登录测试账号进入 `/settings/account`，点删除按钮确认二次确认文案。
- production merge 后复测真实 `/check` 维度内容是否来自已导入 batch-04。
