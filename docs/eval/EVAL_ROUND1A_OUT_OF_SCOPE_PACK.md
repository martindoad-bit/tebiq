# Eval Round 1A — Out-of-Scope Routing Review Pack

> **来源**：Technical Dry Run `round1-20260504-231231`（TEBIQ 通道，fallback_reason=out_of_scope）
> **状态**：Draft — needs DOMAIN semantic review
> **注意**：本包与正式 answer quality FULL_COMPARABLE 分开。不混入 DOMAIN 正式标注流程。

---

## 背景

在 Technical Dry Run 中，7 条题目被 TEBIQ 系统路由为 `out_of_scope`。这些题目均来自高风险场景类型，其中多条在产品定位上应当属于 TEBIQ 核心覆盖范围。

**这不是小事**：若系统将高风险问题挡在 scope 之外，用户将得不到任何引导，可能因此错过关键的在留风险提示。

本包目的：**由 DOMAIN 单独做语义判断**，判断每条是真正超出范围、还是路由误判。

---

## 7 条 Out-of-Scope 样本

| # | starter_tag | 题目 | 场景类型 | 风险级别 |
|---|-------------|------|---------|---------|
| 1 | eval-lab-v1-J04 | 我被公司解雇了，在留怎么办？ | 高风险突发・方向判断 | HIGH |
| 2 | eval-lab-v1-J08 | 我的在留资格和现在实际工作不一致怎么办？ | 合规缺口・方向判断 | HIGH |
| 3 | eval-lab-v1-J03 | 我签证快到期了，但材料还没准备好怎么办？ | 紧急时限 | HIGH |
| 4 | eval-lab-v1-I08 | 公司还没清算，我可以直接回国吗？ | 经管・高风险决策 | HIGH |
| 5 | eval-lab-v1-D05 | 日本人配偶签离婚后还能留在日本吗？ | 家族・身份变化 | MEDIUM |
| 6 | eval-lab-v1-D06 | 配偶签离婚后多久要处理在留问题？ | 家族・时限 | MEDIUM |
| 7 | eval-lab-v1-D09 | 家人的在留资格跟我有关，我换签证会影响他们吗？ | 家族・连带影响 | MEDIUM |

---

## 路由分析初判（GM 初步观察，待 DOMAIN 覆盖）

以下为 GM 的初步技术观察，供 DOMAIN 参考。**不是语义结论**。

| # | 初步观察 | 可能路由原因 |
|---|---------|-------------|
| J04 | "被解雇" + "在留怎么办" — 应是 TEBIQ 核心场景 | 可能因 "解雇" 未在 scope 关键词内？ |
| J08 | "在留资格与工作不一致" — 高频合规缺口 | 可能被判定为法律咨询而非在留管理 |
| J03 | "签证快到期" — 极高紧急度，应优先引导 | 可能因 "材料没准备好" 判定无法处理？ |
| I08 | "没清算直接回国" — 高风险决策，TEBIQ 应警告 | 可能因跨越公司法与在留的复合问题？ |
| D05 | "配偶签离婚后" — 标准在留变更路径 | 离婚属于家庭状况变化，TEBIQ 应可覆盖 |
| D06 | "多久处理在留" — 时限判断题 | 同 D05，路由误判可能性高 |
| D09 | "换签影响家人" — 连带风险，TEBIQ 核心价值 | 可能因"家人"关联主体不明？ |

---

## DOMAIN 应判断的问题

对每条题目，DOMAIN 语义判断应回答：

1. **是否真的超出 TEBIQ 范围？**  
   判断标准：TEBIQ 定位（在留风险管理，识别用户没问但会影响结果的风险）。

2. **是否是路由误判？**  
   如果这条题目按产品定位应该被回答，但系统挡住了 → `routing_error`。

3. **是否高风险问题被系统挡掉？**  
   路由为 `out_of_scope` + 题目风险级别为 HIGH → P0 候选。

4. **用户体验影响**：  
   用户收到 `out_of_scope` 是否会因此流失 / 误操作 / 错过关键行动？

5. **Scope boundary 建议**（候选，待产品负责人裁决）：  
   如判为路由误判，应在 notes 中记录建议的 scope 覆盖方向（不直接修改 Prompt）。

---

## 标注格式（DOMAIN 填写）

每条填写：

```
tag: eval-lab-v1-XXX
routing_verdict: true_oos / routing_error / boundary_unclear
risk_to_user: none / low / medium / high / critical
p0_candidate: yes / no
notes: (1-2 句，说明判断依据)
```

---

## 产品负责人裁决项（DOMAIN 标注后提交）

- 哪些 `routing_error` 题目需要扩展 scope boundary？
- J03/J04/J08/I08 这 4 条高风险题的路由路径修正由谁主导（Prompt / 规则层 / handoff_trigger）？
- D05/D06/D09 配偶家族系列是否整体需要专门的路由规则？

---

**DOMAIN 所有输出默认 `draft / needs human review`。**  
**本包与 FULL_COMPARABLE 正式标注分离，不混入 DOMAIN Round 1A Work Packet。**
