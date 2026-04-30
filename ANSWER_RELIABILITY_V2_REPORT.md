# Answer Reliability v2 Report

## 合入内容
- answer-copy-rewrite-v1: 已合入。保留 `action_answer`、`conclusion`、`do_now`、`where_to_go`、`how_to_do`、`documents_needed`、`deadline_or_timing`、`consequences`、`expert_handoff`。

## 关键修复
1. action_answer 接入: Answer Engine 展示优先级改为 `action_answer` → `first_screen_answer` → structured sections → rule fallback。命中 answer seed TOP50 时优先输出行动卡字段。
2. intent guard: 新增 `matchIntentGuard()`，对年金/社保、资本金不足、办公室搬迁三类高误配问题做硬校验，候选答案不满足意图词时不会返回。
3. field constraints: 在 `formatActionAnswer()` 中约束行动卡字段：办理窗口只保留机构/窗口，材料字段过滤动作词，期限字段必须含时间或触发条件，后果与专家交接点补成完整句。
4. lint:answer: 新增 `npm run lint:answer`，自动检查行动卡字段串位、技术字段泄漏和占位式确认文案。
5. homepage copy: 首页标题改为「下一步怎么做？」，副文案改为步骤/材料/期限/办理窗口取向，身份选择不再阻断提交。
6. meta title: 更新为 `TEBIQ — 日本手续下一步整理`。

## 10 个 benchmark
| 问题 | 命中 | intent guard | 行动卡完整性 | 备注 |
|---|---|---|---|---|
| 办公室搬迁要做哪些手续？ | q032-経営・管理-事務所搬迁-商業登記-入管届出-怎么做 | pass | pass | 含法務局/税務署/入管/租赁合同/办公室照片 |
| 公司休眠了要不要交国民年金？ | q081-公司倒闭-休眠-我的厚生年金-健保-怎么办 | pass | pass | 不再命中经营管理休眠/解散在留影响 |
| 永住者能不能带父母来日本养老？ | q003-永住者能不能把父母接来日本长期居住 | pass | pass | 保持 misconception/needs confirmation 边界 |
| 老板雇了签证不符的人我会不会受影响？ | q091-老板雇我-雇同事用错签证-不法就労-我会被牵连吗 | pass | pass | 保持风险链条边界 |
| 特定技能1号能不能转工作签？ | tokutei-to-work-visa | pass | pass | 有可执行确认项 |
| 住民税晚交会影响永住吗？ | q001-永住申请直近-5-年纳税要完整吗 | pass | pass | 保持税/永住边界 |
| 公司没有给我上社保怎么办？ | company-no-social-insurance | pass | pass | 有窗口/材料/后果 |
| 搬家后在留卡地址要不要改？ | q084-搬家-14-日内-必须办的届出-顺序是什么 | pass | pass | 样板答案含市区町村窗口、在留卡、14日 |
| 经营管理资本金不够怎么办？ | q027-経営・管理-改正后-資本金-3000-万円-要件-有経過措置吗 | pass | pass | 不再回答「资本金多少合适」 |
| 留学生能不能转人文签？ | student-to-gijinkoku | pass | pass | 有材料/窗口/时机 |

## 验证
- lint: pass (`npm run lint`)
- tsc: pass (`npx tsc --noEmit`)
- build: pass (`npm run build`)
- test: pass (`npm run test`)
- db:generate: pass, No schema changes
- audit: pass (`npm run audit:launch-copy`)
- lint:answer: pass (`npm run lint:answer`)
- answer-quality: pass (`npm run test:answer-quality`)

## 本地 production 抽测
| 路径 | 结果 | 备注 |
|---|---|---|
| / | 200 | 首页显示「看下一步」，未出现旧文案 |
| /answer/demo-matched | 200 | 答案页可加载 |
| /answer/demo-draft | 200 | 答案页可加载 |
| /answer/demo-cannot-determine | 200 | 答案页可加载 |
| /admin/review-lite | 200 | 后台复核页可加载 |
| /timeline | 200 | 时间线可加载 |
| /photo/sample-result | 200 | 样例结果可加载 |

## 是否建议推 main
是。
原因：Q1/Q9 错配已修复，10 个 benchmark 全通过，行动卡字段约束和 lint 已补上，未改 DB schema，未触碰 Resend / admin / timeline 核心链路。
