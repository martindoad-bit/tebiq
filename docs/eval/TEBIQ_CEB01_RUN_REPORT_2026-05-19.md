# TEBIQ CEB01 40x3 Benchmark Report

Date: 2026-05-19

## What Ran

Benchmark: `TEBIQ-CEB01`

Question set: `docs/eval/TEBIQ_CEB01_QUESTIONS.json`

Protocol: `docs/eval/TEBIQ_CEB01_PROTOCOL.md`

Runner: `scripts/eval/run-ceb01-benchmark.ts`

Output package:

- Full answers: `scripts/eval/output/tebiq-ceb01-20260519-40x3/answers.json`
- Blind packet: `scripts/eval/output/tebiq-ceb01-20260519-40x3/blind-packet.json`
- Blind key: `scripts/eval/output/tebiq-ceb01-20260519-40x3/blind-key.json`
- Runtime summary: `scripts/eval/output/tebiq-ceb01-20260519-40x3/summary.json`

Systems compared:

| system | Meaning |
|---|---|
| `tebiq-production` | Current production TEBIQ answer route |
| `deepseek-v4-flash-thinking` | Bare DeepSeek V4 Flash with thinking enabled |
| `deepseek-v4-pro-thinking` | Bare DeepSeek V4 Pro with thinking enabled |

Important caveat: this run used the DeepSeek API, not the consumer app's联网/专家模式 UI. It tests bare model thinking modes, not web-browsing consumer DeepSeek.

## Execution Summary

120 answers were generated: 40 questions x 3 systems.

| system | completed | timeout | avg latency | avg chars |
|---|---:|---:|---:|---:|
| `tebiq-production` | 38/40 | 2 | 26.8s | 1,226 |
| `deepseek-v4-flash-thinking` | 40/40 | 0 | 17.9s | 887 |
| `deepseek-v4-pro-thinking` | 40/40 | 0 | 64.0s | 1,317 |

TEBIQ timeouts:

- `CEB01-Q008` 经管赤字续签: partial answer, 1,493 chars
- `CEB01-Q034` 留学转技人国空档: partial answer, 1,378 chars

TEBIQ fact/source metadata observed in this production run:

| metric | result |
|---|---:|
| TEBIQ answers | 40 |
| answers with `fact_card_ids` | 0 |
| total fact card ids emitted | 0 |
| answers with `route_gate_ids` | 0 |

This means CEB01 measured the current production answer shell/model behavior, not a fact-card-enhanced runtime. The large fact-card asset base did not visibly participate in this run.

## Blind AQL Result

Answer score is 0-100. UI delta is -10..+10 and only applies to TEBIQ. Experience score = answer score + UI delta, but P0 defects override average-score optimism.

| system | avg answer score | avg UI delta | avg experience score | wins | P0 | P1 |
|---|---:|---:|---:|---:|---:|---:|
| `deepseek-v4-pro-thinking` | 84.18 | 0.00 | 84.18 | 26/40 | 0 | 9 |
| `tebiq-production` | 81.03 | +3.95 | 84.98 | 12/40 | 1 | 12 |
| `deepseek-v4-flash-thinking` | 75.03 | 0.00 | 75.03 | 2/40 | 1 | 15 |

Interpretation:

- Raw answer quality winner is `deepseek-v4-pro-thinking`.
- TEBIQ's simplified UI/material bridge adds real value, about `+3.95` points on average.
- That UI gain almost closes the raw answer gap, but it does not erase TEBIQ's P0/P1 defects.
- `deepseek-v4-flash-thinking` is fast, but unstable for high-risk answers; it produced a P0 in Q017 by suggesting concealment/record manipulation around overwork.

## Per-Question Winners

| q | winner | scores `TEBIQ / Flash / Pro` | key issue |
|---|---|---:|---|
| Q001 | TEBIQ | 91 / 84 / 88 | 住民票变更晚不是决定性问题，关键是实际同居和地址一致证据 |
| Q002 | Flash | 70 / 90 / 82 | 永住者配偶一般无就劳限制 |
| Q003 | TEBIQ | 93 / 83 / 91 | 家族滞在28小时按所有工作合计 |
| Q004 | Pro | 90 / 88 / 91 | 客户现场变化不等于所属机关变更 |
| Q005 | Pro | 87 / 86 / 92 | 出席率78%高风险但不是必拒 |
| Q006 | Pro | 78 / 45 / 90 | 高才关键是是否仍满足70分，不是80分 |
| Q007 | Pro | 84 / 82 / 89 | 特定技能空窗与转职手续 |
| Q008 | TEBIQ | 91 / 84 / 90 | 赤字不等于没经营，看经营实态 |
| Q009 | Pro | 72 / 69 / 78 | 短期滞在转配偶原则困难但有个案空间 |
| Q010 | Pro | 72 / 83 / 90 | 日配收入下降与生计说明 |
| Q011 | TEBIQ | 90 / 78 / 58 | 超过14天仍应补所属机关届出 |
| Q012 | Pro | 55 / 86 / 91 | 家族滞在本人和扶养者届出的区分 |
| Q013 | Pro | 91 / 35 / 92 | 搬家通常在市区町村办理，不需另跑入管 |
| Q014 | TEBIQ | 91 / 84 / 73 | 高才带父母条件 |
| Q015 | Pro | 84 / 78 / 88 | 永住者配偶永住短缩路线 |
| Q016 | Pro | 90 / 87 / 92 | 搬出宿舍是住址变更，本人14天内办 |
| Q017 | Pro | 80 / 20 / 88 | 超时打工不能伪造或隐瞒矛盾材料 |
| Q018 | Pro | 88 / 85 / 92 | 英语教师转销售主业的在留资格风险 |
| Q019 | TEBIQ | 93 / 78 / 90 | 经管半年无营业，不能只靠办公室 |
| Q020 | Pro | 72 / 50 / 80 | 退学两个月后的留学衔接 |
| Q021 | Pro | 84 / 78 / 91 | 短期到期前是否已有合法申请基础 |
| Q022 | Pro | 86 / 84 / 91 | 日配分居应如实说明 |
| Q023 | TEBIQ | 89 / 70 / 45 | 永住者配偶离婚后14日届出和变更 |
| Q024 | TEBIQ | 92 / 82 / 86 | 住民税滞纳补缴和证明 |
| Q025 | Pro | 60 / 57 / 91 | 技人国业务委托不是当然不可 |
| Q026 | Pro | 74 / 62 / 85 | 特定技能转职不能在许可前去新公司工作 |
| Q027 | Pro | 82 / 72 / 90 | 留学生年金未纳与学生特例 |
| Q028 | Pro | 82 / 88 / 94 | 高才永住源泉票错误修正 |
| Q029 | Pro | 90 / 86 / 94 | 特定技能外食和食品制造岗位差异 |
| Q030 | TEBIQ | 88 / 74 / 84 | 扶养者失业不等于家族身份当天失效 |
| Q031 | Flash | 82 / 86 / 78 | 日配更新税证主要看日本配偶 |
| Q032 | TEBIQ | 86 / 72 / 68 | 旧公司证明没到手也应先履行届出 |
| Q033 | Pro | 84 / 86 / 92 | 经管办公室照片要证明真实经营场所 |
| Q034 | Pro | 62 / 76 / 82 | 毕业到入社空档材料和路径 |
| Q035 | Pro | 78 / 86 / 90 | 高才永住积分表与证明材料 |
| Q036 | Pro | 83 / 86 / 90 | 永住者配偶更新中配偶材料隐私 |
| Q037 | TEBIQ | 88 / 72 / 78 | 地址不一致优先统一住民票和在留卡 |
| Q038 | Pro | 45 / 90 / 92 | 家族滞在资格外活动通常可无内定先申请 |
| Q039 | Pro | 89 / 84 / 91 | 配偶签关系证明和婚姻受理证明 |
| Q040 | TEBIQ | 55 / 35 / 30 | 特定技能换公司材料，三者都弱，TEBIQ相对少错 |

## TEBIQ's Most Important Defects

These are the defects that matter more than UI polish.

1. `CEB01-Q026` P0: TEBIQ said, in substance, that after a status-change application is accepted the user may start work at the new Special Skilled Worker employer. This can induce unauthorized work. It must be blocked.

2. `CEB01-Q038` P1: TEBIQ wrongly treated 家族滞在資格外活動許可 as usually requiring a concrete employer and spouse-company documents. The correct practical answer is that a blanket permission is often available before finding a job, subject to 28h/week and excluded work.

3. `CEB01-Q025` P1: TEBIQ over-narrowed 技人国 by implying business委托 is mostly unavailable. Contract form alone is not decisive; scope, professional activity, income stability, and real contract matter.

4. `CEB01-Q012` P1: TEBIQ incorrectly suggested that the spouse changing companies under the same work status may require status-change permission. This confuses 所属機関届出 with status change.

5. `CEB01-Q010` P1: TEBIQ implied a Japanese spouse status holder might need資格外活動許可 for work. That is wrong for 日配.

6. `CEB01-Q034` P1: TEBIQ was internally inconsistent on the 留学→技人国 graduation-to-entry gap and timed out.

7. `CEB01-Q035` P1: TEBIQ implied high-skilled PR usually does not need a full points table again. That weakens the core evidence path.

8. `CEB01-Q028` P1: TEBIQ used the wrong tax correction framing (`更正の請求`) for underreported income/source slip correction.

9. Several address-related answers still drift toward "go to immigration" after already saying city office procedures complete the residence address update.

## What TEBIQ Is Already Better At

TEBIQ beat the raw models on 12 of 40 questions. Its wins cluster in three places:

- High-risk practical corrections: Q003, Q008, Q011, Q019, Q023, Q024.
- Material/action-heavy answers where TEBIQ's current shell creates useful confidence: Q001, Q014, Q030, Q032, Q037.
- Cases where other models hallucinated or truncated badly: Q040.

UI/experience evaluator gave TEBIQ an average `+3.95` interface delta. The gain is real, especially for material-heavy questions. The main UI penalties are not "too little product"; they are:

- waits over 30 seconds,
- answers over 1,800 characters without a compact top summary,
- simple confirmation questions receiving too much source/material furniture.

## Product Direction From This Run

This run supports the current reset direction:

1. Keep the answer UI close to native chat.
2. Keep lightweight source/material bridges because they add trust and actionability.
3. Do not add more product shell before answer correctness improves.
4. Use `deepseek-v4-pro-thinking` as the quality target and likely complex-case base.
5. Treat Flash as a speed model only after risk routing; it is unsafe as a universal high-risk default.

## Next Work

Immediate fix pack:

- Fix Q026 Special Skilled Worker transfer: no work at new employer before proper permission.
- Fix Q038 家族滞在資格外活動 blanket permission logic.
- Fix Q025 技人国 contract-form logic.
- Fix Q012 所属機関届出 vs status change.
- Fix Q010 日配 work freedom.
- Fix Q034 留学毕业到入社路径 and timeout behavior.
- Fix Q035 高才永住 points evidence.
- Fix Q028 tax correction wording.

Runtime architecture:

- Verify why production CEB01 emitted zero fact card ids.
- Decide whether FACT_LAYER is intentionally off or silently not matching.
- If the goal is "better than Pro thinking", TEBIQ needs either stronger model routing or an explicit, working source/material/runtime context layer. Current production is not visibly using the card base.

Benchmark loop:

- Rerun CEB01 after the fix pack.
- Keep the same 40 questions so score movement is meaningful.
- Add a separate web-enabled benchmark only if we have a real web-capable provider path; do not label API-only runs as联网.
