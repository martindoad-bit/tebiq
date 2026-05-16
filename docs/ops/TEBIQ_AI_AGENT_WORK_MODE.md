# TEBIQ AI Agent 协作工作模式

**状态：** 强制约定 / 高于所有其他 ops 文档
**写作日期：** 2026-05-17
**适用对象：** 任何接手 TEBIQ 工程工作的 AI agent（Claude Code、Codex、未来其他 agent）
**核心命题：** 我们做 AI-native 开发，不是用 AI 加速的人类 SOP。

---

## 0. 一句话总原则

> **Agent 自决工程，user 只决业务。**
> 中间不汇报，结束才交付可视化产品改动。

任何 AI agent 在 TEBIQ 上工作，**默认按这份文档执行**。如果跟其他 ops 文档冲突，**这份优先**。

---

## 1. 为什么之前的协作模式是错的

之前 TEBIQ 的 AI 协作模式（包括 ROLES_V2、DELEGATION_PRINCIPLES、Work Packet 模板）是按**人类工程组织**写的：

- GM 派任务 → ENGINE 写代码 → QA 验 → 提 PR → user 审 → merge
- 每个角色独立窗口、每次窗口有边界、每个 PR 等待人类 review

这对人类工程师团队是对的。**对 AI agent 是 80% 的浪费**：

- Agent 不睡觉、不开会、不请假、不切换上下文成本
- Agent 一晚上能完成人类工程师一周的代码 + 测试 + 验证
- Agent 同时持有的代码状态比人类大 10 倍
- Agent 之间通信（subagent / parallel agent）是毫秒级

但我们之前还在用：
- 100 行 commit → 问 user
- 每个 PR 等 user merge 才推下一步
- 把"AQL/DOMAIN 独立窗口"当不可并行的人类专家排期
- 用"3-7 天"这种人类周历估时间

**结果**：user 每天被 10-20 条工程通知打断，注意力切换成本累积，**看到一堆工程报告但看不到产品变化**。Agent 看似"很负责地报告进度"，实际是把 user 当成项目经理在用。

---

## 2. AI-Native 协作模式：Work Block

### 2.1 Work Block 定义

一个 Work Block =
- **一个完整的、用户可见的产品改动**（不是技术内部改动）
- **预计 4-12 小时 wallclock 的 agent 工作**（实际 agent 工作时间，不是日历时间）
- **结束时有可视化交付物**（user 能在 tebiq.jp 浏览器里看到的变化、或截图、或一段录屏）
- **包含全套自验证**（lint / tsc / test / smoke / 生产 deploy / 生产 verify）

### 2.2 Work Block 的标准生命周期

```
[1] User 开局：给一个产品目标（"做事实卡可见闭环"、"把材料 Tab 5 个主题填上"）
       ↓
[2] Agent 自己规划、自己拆分、自己 spawn subagent
       ↓
[3] Agent 自己写代码、自己测、自己 commit、自己 PR、自己 merge
       ↓
[4] Agent 自己 verify 生产部署
       ↓
[5] 出错时 Agent 自己 revert / 自己修
       ↓
[6] Agent 结局：给 user **一份可视化交付物 + 一段简短报告**
```

中间 **0** 次 user touch（除非触发 §4 三类硬 blocker）。

### 2.3 跟旧 SOP 的对比

| 维度 | 旧模式（人类 SOP） | AI-Native 模式 |
|---|---|---|
| 任务单位 | PR（200-500 行） | Work Block（一个产品改动） |
| Commit 粒度 | "每次一个 atomic change" | Agent 自决，可大可小 |
| 中间汇报 | 每个 milestone | 静音，只在 (1) 真 blocker (2) 完成时报告 |
| Merge 权限 | User | Agent（除非生产高风险） |
| 测试节奏 | 每 commit 跑 lint | Agent 决定（大批量 work 时整体跑） |
| 时间估算 | 按人类工程师工作日 | 按 agent 实际 wallclock |
| User touch 频率 | 每天 5-10 次 | 每个 work block 2 次（开始 + 结束）|

---

## 3. Agent 自决范围（不要问 user）

以下 **所有** 决策都是 agent 自决，**不需要问 user**：

### 工程实现层
- 用什么算法、什么数据结构、什么库
- Cherry-pick 策略、rebase 策略、commit 拆分
- PR 拆几个、按什么主题拆、base branch 选哪个
- 测试用什么 framework、跑哪些、跑多少
- 重启不重启服务器、清不清 .next cache

### 流程层
- Merge 自己的 PR（除非影响生产且无法 revert）
- 删除自己创建的 worktree
- Force-push 自己的分支（不是 main / 不是别人的）
- 起多个 subagent 并行做事
- 一次 commit 200 行还是 5000 行

### 风险层
- 决定是否 deploy 到生产（如果 work block 目标包含上线）
- 出问题自己 revert（一键 GitHub revert + 自动 redeploy）
- 决定本次 work block 范围内的所有妥协（"这个 edge case 先记 TODO 不修"）

---

## 4. 真正需要 User 介入的 3 类 Blocker

只有这 3 类才停下来问 user。其他全部 agent 自决。

### 4.1 业务方向冲突
- 订阅 vs lead-gen 商业化分布
- 产品定位变化（TEBIQ 是不是要变成别的）
- 某个深水题"能不能答"是产品决定，不是工程决定

### 4.2 法律 / 专业边界
- DOMAIN 文案的最终安全边界
- 某条事实在没有官方源时能否上线
- 给用户的"找谁确认"该列哪类专业人士

### 4.3 真实数据 / 不可追溯
- FACT 卡的官方源 URL 缺失，没法编出来
- 用户场景数据缺失，没法从样本推断
- 生产凭据 / API key 缺失

**其他都不是 blocker**。包括：
- 工程实现选择（自决）
- PR review（自己审自己 + 跑全套测试 = 完整审）
- 部署时机（自决）
- 文档命名 / 文件位置（自决）

---

## 5. 报告该长什么样

### 5.1 中间不报告

Work block 进行中：**不发任何中间进度**。User 不要看到 "我正在跑 RC60 50/60..."、"我正在 commit Pack B..."、"我等 Vercel 部署完成中..."。

如果用户主动问，可以答一句"还在做 X，估计还要 Y 小时"。不要主动 push 进度。

### 5.2 结束报告模板

```markdown
# [Work Block 标题]

## 上线了什么（用户能看到）
- 具体 URL：https://tebiq.jp/...
- 具体页面 / 功能：xxx
- 截图 / 录屏（如果合适）

## 改了什么（一句话）
xxx

## 验证
- 生产 SHA: xxxxx
- npm test: 201/201
- production smoke: 5/5 pass
- 用户 flow 我手动跑过：xxx

## 没做的（明确边界）
- xxx（原因：xxx）
- xxx（原因：xxx）

## 真 blocker（如果有）
- 需要 user 决定：xxx
- 需要独立 DOMAIN 窗口：xxx
- 需要真实 FACT 数据：xxx

## 下一个 work block 建议
xxx
```

3 段以内最好。不要列工程细节。**user 不需要知道我用了 cherry-pick 还是 rebase**。

---

## 6. Agent Batch Size 参考

| 任务类型 | 推荐 batch | 反例（不要这样做） |
|---|---|---|
| 修一个 P0 bug | 1 个 commit + 1 个 PR + 自 merge + verify | 拆成 5 个 commit 分别 PR |
| 加一个新 UI 功能 | 1 个 work block 全套（代码 + 测试 + 文档 + 上线） | 先写代码问 user → 写完测试问 user → 部署问 user |
| 数据导入（n 张卡）| 整批导 + 自动 audit + 出报告 | 每张卡导完都通知 |
| 跨多文件重构 | 一次性改 + 一次性 commit + 一次性测 | 一个文件一个 PR |
| 60 题真测试 | 跑完出汇总报告 | 每跑一题报告一次 |

---

## 7. User 跟 Agent 沟通的正确姿势

### 7.1 User 给 agent 的标准开局

不要给：
- "做 1 还是 2"（让 agent 自己 prioritize）
- "PR 怎么拆"（agent 自决）
- "用什么技术栈"（agent 自决）
- "什么时候 merge"（agent 自决）

要给：
- **一个产品目标**：「我想看到事实卡在答案里是可见的」
- **业务边界**：「这次别动用户钱、别动隐私页」
- **优先级 hint**（可选）：「这周时间紧，先做能让我看到的」

### 7.2 Agent 给 user 的标准开局回应

不要：
- "我打算分 3 步：第一步 xxx，第二步 xxx，OK 吗？"
- "我建议先做 A 还是 B？"

要：
- "收到。我会做 [简明目标重述]。预计 [真实 wallclock 范围]。**结束时给你一个可见交付物**。中间不打扰你。"
- 然后真的去做，做完才回来。

---

## 8. 估时校准

人类速度 vs Agent 速度差异约 5-10 倍（同样工程量）：

| 工程任务 | 人类工程师 | AI agent（实际 wallclock）|
|---|---|---|
| 1 个 hotfix PR + verify | 半天 | 30 分钟 - 2 小时 |
| 1 个 UI 功能（含测试） | 2-3 天 | 4-8 小时 |
| 60 题真跑评测 + 修 + 重跑 | 1 周 | 半天 - 1 天 |
| 0.85 完整收尾（5 件可见事） | 2-3 周 | 1-3 天 |
| 1.0 完整工程 | 2-3 个月 | 1-3 周 |

**TEBIQ 1.0 不应该说"几个月"。** 应该说"几个 work block"。

---

## 9. 真正合理的工作排期（对 TEBIQ 接下来）

按 work block 列：

| Work Block | 目标（user 可见）| 估时（agent wallclock）|
|---|---|---|
| WB-1 事实卡可见闭环 | 答案页显示「本回答参考了 X 张事实卡：…」 | 4-8 小时 |
| WB-2 材料 Tab 5 主题 | 5 个核心主题（家族滞在续签 / 技人国续签 / 永住申请 / 国税その3 / 住民税证明）真填上 | 8-16 小时（含 FACT 数据） |
| WB-3 答案-材料关联 | 答案页底部"相关材料"链接，能跳到对应材料页 | 2-4 小时 |
| WB-4 中台批注闭环 | Eval Lab 能批注 → 反哺修复 → 重测 | 4-8 小时 |
| WB-5 生产 smoke + 0.85 release | 生产稳定通过 5 题 + 50 题真测试 + 发布 | 4-8 小时 |

**合计 0.85**：约 22-44 小时 agent wallclock。**真实 wallclock 1-3 天**（如果 agent 持续工作 + user 只在每个 WB 结束时 2 分钟看一下）。

---

## 10. 给所有未来 AI 接手者

1. 读完这份文档再开工
2. **不要**重新拆碎 work block 来"显得谨慎"
3. **不要**频繁中间汇报来"显得负责"
4. **不要**用人类工程师工作日估算时间
5. **要**自己 merge 自己测自己 verify 自己修
6. **要**只在 §4 三类 blocker 出现时才停
7. **要**最后给可视化交付物

如果你看到这份文档跟其他 ops 文档冲突，以这份为准。

---

## 11. 修订记录

| 日期 | 修订 | 触发原因 |
|---|---|---|
| 2026-05-17 | 初版 | User 反馈："你回复时间比干活时间多一倍"。Codex/Claude 协作模式被识别为按人类 SOP 实施，对 AI agent 浪费 80%。 |
