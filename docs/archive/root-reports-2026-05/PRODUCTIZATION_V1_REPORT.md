# Productization v1 Report

## 本轮目标
- 首页产品化
- 提问入口产品化
- 答案页用户语言化
- 客户经理可转发说明

## 修改页面
- `/`
- `/answer/[id]`
- `/photo/sample-result`（复用新的提问入口）
- `/check`（复用新的提问入口）
- `/knowledge`（复用新的提问入口）
- `/decision-lab`（复用新的提问入口）

## 关键变化
1. logo: 首页正文和顶部栏使用现有 `public/logo-icon.png` + TEBIQ wordmark，不再只显示纯文字标题。
2. 主页定位: 首屏明确说明 TEBIQ 用于签证、税金、年金、会社手续和日文通知的手续整理，输出下一步、材料、期限、窗口和专家确认点。
3. 签证/身份选择: 提问入口改为 Step 1 先选身份，默认空；选项包含经营管理、技人国、配偶者、永住、特定技能、留学、家族滞在、还不确定。
4. 热门问题: 首页提问入口展示 6 个常见情况 chip，点击后填入输入框。
5. 答案页: 去掉 `answer_level` / L3 等内部标签展示，改为“整理结果 / 你的问题 / 一句话结论 / 你现在先做什么 / 去哪里办理 / 需要准备什么 / 期限和时机 / 不处理可能怎样 / 专家确认点 / 使用边界”。
6. 客户版说明: 答案页新增“给客户看的简短说明”和复制按钮，便于客户经理转发。

## 验证
- lint: pass
- tsc: pass
- build: pass
- test: pass
- db:generate: pass, No schema changes
- audit: pass
- answer-quality: pass, 10/10 benchmark questions returned action answers
- local production smoke: pass
  - `/`, `/answer/demo-matched`, `/answer/demo-draft`, `/answer/demo-cannot-determine`, `/photo/sample-result`, `/check`, `/timeline`, `/login`, `/admin/review-lite` all returned 200.
  - 首页包含 logo / 产品定位 / 身份选择 / 三入口解释；未出现“邮箱（可选）”“提交问题”“已收到”。
  - 答案页包含行动区块和客户可转发说明；未显示 `answer_level` / `review_status` / `source_grade` / raw JSON。

## 是否建议推 main
是。未改 DB schema，未触碰支付 / Resend / Answer Engine 核心逻辑；本轮只做用户侧产品表达和答案呈现。
