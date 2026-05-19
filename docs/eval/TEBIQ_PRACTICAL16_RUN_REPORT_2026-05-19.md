# TEBIQ Practical Runtime Slice 01 — 16题联网对照报告

Date: 2026-05-19  
Branch: `codex/ceb01-benchmark-pack-20260519`  
Scope: 30 张实务卡试接入 + 16 题联网对照

## 1. 这轮做了什么

这轮不是继续加重 prompt，而是把已有的 practical cards 作为独立实务层接入答案引擎。

- 从 `imported-practical-fact-layer-2026-05-19` 里抽取 30 张高价值实务卡，放入 `docs/practical-cards/runtime-v1/`。
- 新增轻量 matcher：`lib/answer/practical-layer/matcher.ts`。
- 在 consultation stream 中增加 feature flag：`PRACTICAL_LAYER_ENABLED=true` 时注入实务卡。
- Benchmark 脚本也支持同样的实务卡注入，便于离线对照。
- 跑 16 题 × 3 系统：
  - TEBIQ native v2 + 联网上下文 + practical cards
  - DeepSeek V4 Flash thinking + 联网上下文
  - DeepSeek V4 Pro thinking + 联网上下文

## 2. 30 张实务卡范围

本轮接入的是试点切片，不是全量 600+ practical cards。

覆盖主题包括：

- 日配离婚、再婚、配偶者届出
- 更新 vs 变更的实务区别
- 永住者配偶就劳自由
- 家族滞在依附关系和资格外活动
- 技人国转职、副业、业务委托
- 高才积分、指定书、永住税年金
- 特定技能离职、转职、材料
- 不许可、补件、住所届出等高频边界

## 3. 测试设计

16 题分两组：

| 组 | 数量 | 目的 |
|---|---:|---|
| 实务卡命中题 | 10 | 看 practical cards 是否能修正/增强答案 |
| 控制题 | 6 | 看没命中卡时是否仍保持裸模型水平，不被污染 |

所有问题都附带人工整理的联网资料摘要。这里的“联网”是可复现的白名单上下文注入，不是消费者端 App 的实时网页搜索 UI。

原始结果：

- `scripts/eval/output/tebiq-practical16-20260519-context/answers.json`
- `scripts/eval/output/tebiq-practical16-20260519-context/summary.json`

## 4. 时间结果

| 系统 | 完成 | 平均耗时 | 平均字数 |
|---|---:|---:|---:|
| TEBIQ native v2 + practical | 16/16 | 18.86s | 1131 |
| DeepSeek Flash + web context | 16/16 | 15.24s | 926 |
| DeepSeek Pro + web context | 16/16 | 45.98s | 1100 |

分组看：

| 系统 | 命中题平均耗时 | 控制题平均耗时 |
|---|---:|---:|
| TEBIQ native v2 + practical | 19.60s | 17.63s |
| DeepSeek Flash + web context | 16.07s | 13.85s |
| DeepSeek Pro + web context | 43.81s | 49.60s |

初步判断：TEBIQ 接入 practical cards 后，耗时比 Flash 多约 3.6 秒，但远低于 Pro。这个代价可以接受，但后续需要控制注入长度，避免答案变重。

## 5. 命中情况

TEBIQ 在 10 道命中题中全部命中 practical cards，控制题全部未命中。

| 问题 | Practical cards |
|---|---|
| 日配离婚再婚是更新还是变更 | `practical-004`, `practical-187` |
| 永住者配偶打工 | `practical-051` |
| 高才积分下降 | `practical-019`, `practical-030` |
| 家族滞在本体换公司 | `practical-015`, `practical-007` |
| 技人国转业务委托 | `practical-086`, `practical-109` |
| 特定技能离职/支援机构 | `practical-067` |
| 高才永住源泉票更正 | `practical-010`, `practical-112` |
| 日配更新材料 | `practical-004`, `practical-085` |
| 家族滞在资格外活动 | `practical-009`, `practical-014` |
| 特定技能转职材料 | `practical-335`, `practical-124` |

控制题（中国驾照、敷金、保育园、信用卡、银行账户、高额疗养费）均未命中 practical cards，符合预期。

## 6. 主观读感评分

这是工程侧快速读感评分，不是独立 AQL，也不是法律最终审查。

| 系统 | 平均分 | 命中题 | 控制题 |
|---|---:|---:|---:|
| TEBIQ native v2 + practical | 85.8 | 86.1 | 85.3 |
| DeepSeek Flash + web context | 85.7 | 85.7 | 85.7 |
| DeepSeek Pro + web context | 85.9 | 85.5 | 86.5 |

这个分数非常接近，不能宣称 TEBIQ 已明显超过裸模型。更诚实的结论是：

- practical cards 让 TEBIQ 在部分实务题上开始追平/反超裸模型；
- 但裸 Flash 仍然更轻、更自然；
- Pro 并没有稳定碾压，但控制题上更稳一点，代价是 3 倍左右耗时。

## 7. 关键样本结论

### Q001 日配离婚再婚

TEBIQ 已修正核心方向：

- 手续形式：在留期间更新许可申请
- 实质审查：接近新申请/变更级别
- 14 日届出和新婚姻真实性材料都被提到

这个题证明 `practical-004` 有价值。之前 TEBIQ 错在没有吃到这张卡。

### Q004 家族滞在本体换公司

TEBIQ 表现较好。它明确说家族滞在本人不需要立即办手续，本体者换公司是本体者自己的届出/更新问题。裸模型也能答，但 TEBIQ 更贴近用户问题。

### Q005 技人国转业务委托

TEBIQ 有实务深度，但略显重。它指出业务委托不自动失效，也提示稳定性、连续性、合同内容和更新风险。问题是答案有点像在“做尽职调查”，比 Flash 更慢、更长。

### Q006 特定技能想辞职

TEBIQ 可用。它没有被支援机构说法带偏，明确“支援机构是支援，不是禁止自己找工作”，也拦住了“先跑”。这类题 practical card 很适合。

### Q010 特定技能转职材料

TEBIQ 明显比 Pro 更谨慎。Pro 直接把三项都说成“基本必须”，风险较高。TEBIQ 区分健康诊断、履历书、评价调书的性质，这是 practical cards 的有效贡献。

### 控制题

没命中 practical cards 时，TEBIQ 没有明显污染答案。但它仍然比 Flash 稍长，说明 prompt 和 guardrail 的残余重量仍在。

## 8. 当前判断

30 张实务卡接入是正确方向，但它不是“越多越塞”的方向。

这轮证明了三件事：

1. 旧 practical cards 里确实有能让 TEBIQ 答对关键实务问题的资产。
2. 轻量实务卡注入不会明显拖垮速度，也没有污染控制题。
3. TEBIQ 还没有稳定超过 Flash，原因不是卡片没用，而是注入和回答控制还不够精炼。

最重要的产品判断：

> practical cards 应该成为 TEBIQ 的实务层，而不是替代模型逻辑的重 prompt。

## 9. 下一步建议

### P0：把 practical layer 做成正式双层检索

当前 matcher 是 30 张试点硬触发。下一步应该改为：

- official facts：官方硬事实
- practical cards：实务口径
- web context：补缺和更新

答案只吸收命中最强的 1-2 张 practical cards，且必须保持简洁。

### P1：扩到 100 张 practical cards，但每轮都跑控制题

不要一次性把 600+ 张全塞进去。下一轮可扩到 80-100 张，但必须继续保留：

- 10 道命中题
- 10 道非命中控制题
- 3 系统对照

目标不是卡越多越好，而是“命中题变准，控制题不变差”。

### P1：修剪 practical prompt block

当前 practical card 的 prompt block 仍偏长。建议每张卡生成一个短版 runtime block：

- 一句话结论
- 2-4 个条件
- 1 个危险误区
- 相关材料/来源

不要把整张卡摘要塞给模型。

### P2：单独评估“答案自然度”

这轮 TEBIQ 的准确性在几个题上变强了，但自然度仍不如 Flash。后续评测要单列：

- 准确性
- 自然度
- 具体行动性
- 速度

不能只看综合分。

## 10. 本轮验证

- `npm run lint` passed
- `npx tsc --noEmit --pretty false` passed
- Benchmark completed: 48/48 answers

