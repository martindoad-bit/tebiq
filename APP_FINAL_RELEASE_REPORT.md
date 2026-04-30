# App Final Release Report

## 合入分支
- content/app-copy-final-v2: 已合入。接入最终文案准则、answer seed 文案修订和产品文案文档。
- codex/app-ui-final-v2: 已合入。接入 App 首页结构、logo header、输入卡、最近常问、快捷工具和 Answer 办事卡 UI。

## 首页变化
1. 首页改为 App 首页：logo header、短主句、输入卡、最近常问、快捷工具。
2. 主句为「材料有问题，问 TEBIQ」。
3. 输入框 label 为「你的问题」，主按钮为「看下一步」。
4. 最近常问以 chips 呈现，点击后填入问题。
5. 快捷工具保留三项：拍照、续签检查、提醒，并带 icon。

## Answer 页变化
1. Answer 页改为办事卡结构，保留状态标签、问题、结论和行动分区。
2. 行动分区包含：最紧的两件、步骤、去哪办、要带什么、期限、不做会怎样、要找专家的情况。
3. 来源与说明收到底部，用户侧不展示 answer_level / review_status / source_grade 等内部字段。
4. 保留「复制给客户」入口，并修正转发文本末尾重复标点。

## 冲突处理
- app/_components/QuestionIntakeBox.tsx: 以 app-ui-final-v2 的输入卡视觉为准，保留 Answer Engine 提交后跳转 /answer/[id] 的逻辑。
- app/page.tsx: 以 app-ui-final-v2 的首页结构为准，保留登录用户的提醒/准备事项数据接入。
- app/answer/[id]/AnswerResultView.tsx: 以 app-ui-final-v2 的办事卡视觉为准，补回「去哪办」字段和具体兜底文案。

## 验证
- lint: pass
- tsc: pass
- build: pass
- test: pass
- db:generate: pass, No schema changes
- audit: pass
- answer-quality: pass, 10/10 benchmark ok
- lint:answer: pass

## Production 抽测
| 路径 | 结果 |
|---|---|
| / | 200，本地 production，App 首页可加载 |
| /answer/demo-matched | 200 |
| /answer/demo-draft | 200，办事卡字段显示正常 |
| /answer/demo-cannot-determine | 200 |
| /photo/sample-result | 200 |
| /check | 200 |
| /timeline | 200 |
| /login | 200 |
| /admin/questions | 200 |
| /admin/review-lite | 200 |

## 是否推 main
是。

原因：所有指定验证通过；首页已切为 App 首页；Answer 页为办事卡结构；Answer Engine、Resend、admin questions、review-lite、check fallback 未被破坏；无 schema 变更和 production DB 写入需求。
