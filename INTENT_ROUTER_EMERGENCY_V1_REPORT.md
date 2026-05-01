# Intent Router Emergency v1 Report

## 本轮目标
- 解决答非所问：先判断用户真正问的是哪类手续，再匹配答案。
- 增加意图分类：规则优先，低置信时可用 Bedrock 做分类；AI 只分类，不生成前台答案。
- 增加模板选择：按流程、条件、材料、顺序、风险、误解、澄清分流。
- 增加 self-check：答案返回前检查 domain / 当前身份 / 目标身份 / 问法是否一致。

## 新增
- intent-router: `lib/answer/intent-router.ts`
- template-selector: `preferred_template`
- answerMatchesIntent: 返回前校验“答案是否回答了用户原问题”
- test:intent-router: `npm run test:intent-router`
- audit:user-facing-copy: 扫描用户侧内部字段泄漏

## 关键用例
| query | intent | template | 是否正确 |
|---|---|---|---|
| 我想从人文签转为经管签怎么办 | visa / procedure_flow / 技人国 -> 经营管理 | eligibility_template | 是 |
| 技人国想转经营管理需要什么 | visa / eligibility_check / 技人国 -> 经营管理 | eligibility_template | 是 |
| 公司休眠了现在要不要交国民年金 | pension / risk_assessment | risk_template | 是 |
| 公司停了厚生年金怎么办 | pension / risk_assessment | risk_template | 是 |
| 资本金不够还能续经营管理吗 | visa / eligibility_check / 经营管理 | eligibility_template | 是 |
| 办公室搬迁法务局和入管哪个先 | company_registration / scenario_sequence | flow_template | 是 |
| 永住者能不能带父母来养老 | visa / misconception | misconception_template | 是 |
| 老板雇了签证不符的人普通员工会受影响吗 | employment / risk_assessment | risk_template | 是 |
| 留学生能不能转人文签 | visa / eligibility_check / 留学 -> 技人国 | eligibility_template | 是 |
| 技能实习能不能直接转经营管理 | visa / misconception / 技能实习 -> 经营管理 | misconception_template | 是 |

## 修复红线
- 人文转经管不再匹配特定技能: 已修复。当前命中 `q071-技人国-経営・管理-转换-条件-流程`。
- 人文转经管不再匹配换工作 14 日届出: 已修复。对“契約機関 / 14 日届出”类答案增加经管转换专项校验。
- 公司休眠年金不再匹配经管休眠: 已修复。当前命中 `q080-国民年金-交不起-想申请免除-怎么办`。
- 资本金不够不再匹配资本金多少合适: 已修复。当前命中 `management-capital-shortage`。

## 答案页
- `/answer/[id]` 顶部新增“我理解你的问题是”。
- 用户可点“理解错了”，反馈写入现有 `answer_feedback`：`feedback_type=my_case_differs`，`note=intent_wrong`。
- 未新增 migration，避免为反馈 enum 做额外生产变更。

## 验证
- lint: 通过
- tsc: 通过
- build: 通过
- test: 通过
- db:generate: No schema changes
- answer-quality: 通过
- intent-router: 30 个 benchmark + 3 个红线答案回归通过
- audit:user-facing-copy: 通过
- lint:answer: 通过
- audit:launch-copy: 通过

## 是否建议推 main
是。

原因：
- 三条高风险错配红线均已修复。
- 30 个 intent benchmark 通过。
- 10 个 answer quality benchmark 通过。
- 未改 Resend / DB schema / Stripe / Bedrock env。
