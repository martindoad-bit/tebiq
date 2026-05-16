# App Copy + Answer Card v2 Report

## 首页变化
- 删除的文案: 移除首屏解释段、内部词「情况入口」、大标题式「下一步怎么做？」、长说明「TEBIQ 会先整理出下一步……」。
- 新首页结构: logo / 一句定位 / 问题输入 / 身份可选 / 看下一步 / 最近常问 / 快捷工具。
- 主句: 「材料有问题，问 TEBIQ」。
- 输入框: label 为「你的问题」，placeholder 为「厚生年金截止日期是什么时候？」。
- 按钮: 「看下一步」，loading 为「正在整理」。
- 工具入口: 只保留「拍照」「续签检查」「提醒」，分别配 camera / checklist / bell icon。

## 答案页变化
- 删除字段感: 用户侧不再显示「整理结果」「一句话结论」「下一步怎么做」「需要准备什么」「期限和时机」「使用边界」「给客户看的简短说明」等文档式标题。
- 新 section: 状态标签、问题标题、灰底核心句、最紧的两件、步骤、去哪办、要带什么、期限、不做会怎样、要找专家的情况、客户版、来源与说明。
- action_answer 映射: `conclusion` → 灰底核心句；`do_now` 前两条 → 最紧的两件；`do_now` 其余 + `how_to_do` → 步骤；`where_to_go` → 去哪办；`documents_needed` → 要带什么；`deadline_or_timing` → 期限；`consequences` → 不做会怎样；`expert_handoff` → 要找专家的情况；`source_hint + boundary_note` → 来源与说明。
- 空字段兜底: 不再显示「这部分需要进一步确认」，改为具体确认项：身份、发生日期、是否收到通知、是否逾期。

## 验证
- lint: pass
- tsc: pass
- build: pass
- test: pass
- audit: pass
- answer-quality: pass

## 本地 production 抽测
| 路径 | 结果 | 备注 |
|---|---|---|
| / | 200 | 首页显示 logo、主句、问题输入、最近常问、快捷工具 |
| /answer/demo-matched | 200 | 办事卡结构可加载 |
| /answer/demo-draft | 200 | 初步整理状态可加载 |
| /answer/demo-cannot-determine | 200 | 需确认状态可加载 |
| /photo/sample-result | 200 | 样例页可加载 |
| /check | 200 | 检查页可加载 |
| /timeline | 200 | 提醒页可加载 |
| /login | 200 | 登录页可加载 |

## 是否建议推 main
是。
原因：首页已经从说明型页面收敛为 App 入口，答案页改为办事卡语言，10 个 benchmark 仍全部返回行动答案，未改 DB schema / Resend / admin / answer engine 核心逻辑。
