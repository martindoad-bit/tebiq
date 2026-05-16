# VISUAL_POLISH_13_REPORT

最后更新: 2026-04-29T11:06:57Z
分支: codex/visual-polish-13

## 范围

本轮基于 Visual Polish 12 的冷静工具感继续精修，不推翻主色板和页面结构。重点处理 round-3 launch readiness 报告中和视觉相关的 P1-8 / P1-9 / P0-2 细节。

说明: 3 份研究报告未出现在当前 main 文件树中，已从 `origin/research/round-3-launch-readiness` 读取对应内容后执行。

## 已完成

1. 字重收紧
   - 用户侧 `app/` + `components/` 已清除 `font-semibold` / `font-bold` 残留。
   - 工具列表行、badge、材料清单、sample package、邀请页、timeline detail 等统一降到 400/500。
   - 保留数字以 light / tabular nums 表达，不再用 700 造视觉压迫。

2. 中日混排分层
   - `/photo/result/[id]` 增加“日文文书名 + 中文类型说明 + 发件机构”三层结构。
   - `/check/select` 签证卡片增加较轻的中文说明行，日文/官方名保持 `.jp-text`。

3. timeline 空态
   - `/timeline` 空档案不再显示 `0 件 / 0 个月 / 0 类机构`。
   - 改为“待建立时间线”说明 + 浅灰容器 + 3 条 50% 透明度提醒预览 + “拍一份文书开始 →”链接。

4. 404
   - 新增返回上一页主按钮。
   - 保留“这一页迷路了”，副文案改为“可能是路径变了。”，次按钮为“回首页”。

5. 加载态 / 微文案
   - 主流程异步按钮统一为 `处理中...`。
   - 删除用户侧可见的“加载中 / 发送中 / 验证中 / 保存中 / 生成中 / 立即 / 马上 / 快速 / 感叹号”等残留。
   - 拍照上传保留 stage 信息作为副文案，主状态统一收敛。

6. 徽章系统
   - `StatusBadge` / `RiskMark` 去掉边框，统一浅底 + 正常字重。
   - 只有 `待确认` / `需要补齐` 使用 warning 橙；其他状态转灰。
   - 维度清单隐藏与状态 badge 重复的右侧 action 文本。

7. 价格页层级
   - 年度权益从“省 25%”改为“年付：每月相当 ¥733”。
   - 价格数字从 34px 降到 30px；`/月` `/年` 保持 400 灰色。
   - 权益列表字号调到 13px，优先让权益说明可读。

## 截图

截图目录:

`docs/visual-report/screenshots/visual-polish-13/`

已覆盖 5 档视口: 320 / 375 / 393 / 430 / 768。

已截图路由:

- `/`
- `/photo`
- `/timeline`
- `/pricing`
- `/check`
- `/ask`
- `/vp13-missing-route`（404）

注: `/photo/result/[id]` 需要真实 document id，本轮做了代码层视觉调整，没有强行读本地 DB 或环境变量造数据。

## 自测

- `npm run lint` 通过
- `npm run build` 通过
- 用户侧 `font-semibold|font-bold` grep 无结果（排除 admin/dev）
- 用户侧微文案禁用词 grep 无结果（排除 admin/dev）
- 5 档视口截图已生成

## 待 CCA 合并时注意

CCA 的 `chore/p0-launch-fixes` 需要先 merge。之后再 merge 本分支，避免与 CCA 正在改的检查页文案发生冲突。

本轮没有修改 CCA 指定不要碰的核心文案:

- 续签自查 / 做一次续签自查
- 当前风险点
- 建议必看
- 风险标记
- 状态进度态文字
