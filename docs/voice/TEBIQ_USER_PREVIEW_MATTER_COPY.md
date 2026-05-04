---
status: draft / preview-only / not-production
owner: TEBIQ-VOICE
reviewer: DOMAIN + Project Lead before production use
---

# TEBIQ User-Facing Preview Copy — Matter Section

> This file contains all user-facing copy for Matter scenario outputs displayed at `/internal/preview`.
> ALL copy in this file is preview-only. No content here may be used in production without DOMAIN review and Project Lead approval.
> Every output must carry the preview disclaimer: 「⚠️ 内部预览 · 非正式建议」

---

## Usage Notes

- `matter_id`: Internal identifier. Must NOT be exposed to end users.
- `risk_summary`: One-sentence headline. Shown at top of Matter card.
- `risk_detail`: 1–2 sentences of elaboration. Shown in expanded state.
- `next_action`: Concrete single-sentence action. Shown as the primary CTA.
- `urgency_display`: Drives badge color. HIGH = red, MEDIUM = amber, LOW = grey.
- `preview_disclaimer`: Fixed string. Must appear on every card without modification.

---

## Matter Scenarios

---

### Matter-01 — 在留期限紧急（J03 类）

```
matter_id: M-J03
urgency_display: HIGH

risk_summary:
您的在留期限即将到期，若未能在到期前完成更新手续，将面临非法滞留风险。

risk_detail:
在留期限到期前未提交更新申请，将自动失去合法在留资格，后续的工作、居住及再入国均会受到严重影响。
即使已提交申请，建议确认受理票是否在手，并了解特例期间的具体时限。

next_action:
请在本周内确认申请提交状态，或立即前往管辖入管局提交在留期间更新申请。

preview_disclaimer: ⚠️ 内部预览 · 非正式建议
```

---

### Matter-02 — 解雇後在留処理（J04 类）

```
matter_id: M-J04
urgency_display: HIGH

risk_summary:
您已失业，当前在留资格与就业状态直接挂钩，存在在留资格失效风险。

risk_detail:
以就劳目的取得的在留资格（如技术・人文知識・国際業務等）在失业后仍可继续有效，但须在离职后14天内向入管局申报，并须在合理期限内重新就职或办理资格变更。
若在留期限内未能找到新工作，需主动考虑是否申请「就労準備中」期间的延长或变更为其他在留资格。

next_action:
请在离职后14天内通过入管局窗口或在线系统完成「契約機関に関する届出」，并尽快咨询后续在留处理路径。

preview_disclaimer: ⚠️ 内部预览 · 非正式建议
```

---

### Matter-03 — 在留不一致（J08 类）

```
matter_id: M-J08
urgency_display: HIGH

risk_summary:
您当前的实际工作内容与在留资格许可的活动范围存在不一致，存在不法就労风险。

risk_detail:
在留资格所许可的活动范围与实际从事的业务内容不符，即使在持有有效在留卡的情况下，也可能构成不法就劳，影响本人及雇主的法律责任。
此类问题在审查在留更新或永住申请时会被重点核查，越早处理对申请人越有利。

next_action:
请尽快核实当前工作合同与在留资格的对应关系，如存在偏差，须在下次在留更新前办理在留资格変更手続。

preview_disclaimer: ⚠️ 内部预览 · 非正式建议
```

---

### Matter-04 — 配偶者離婚（D05/D06 类）

```
matter_id: M-D05-D06
urgency_display: HIGH

risk_summary:
您与日本人配偶或永住者配偶的婚姻关系已终止，配偶者在留资格的基础条件已不再成立。

risk_detail:
「配偶者ビザ」（配偶者等・日本人の配偶者等）以婚姻关系的持续存在为前提，离婚后须在14天内向入管局申报，并在离婚后约6个月内完成在留资格変更或更新手续，否则在留资格将面临不予更新。
如有在日就业记录、独立生活基础或子女监护权等情况，可能存在其他在留路径，建议尽早评估。

next_action:
请在离婚后14天内完成入管申报，并在6个月内与专业人士确认在留变更路径，避免在留资格失效。

preview_disclaimer: ⚠️ 内部预览 · 非正式建议
```

> DOMAIN INPUT PENDING: DR-02 — 请 DOMAIN 确认"6个月"时限是否为现行准确规定。见 TEBIQ_DOMAIN_INPUT_REQUEST.md。

---

### Matter-05 — 経管清算帰国（I08 类）

```
matter_id: M-I08
urgency_display: HIGH

risk_summary:
您的法人已进入清算程序，「経営・管理」在留资格的基础活动即将终止，须提前处理在留及出境事宜。

risk_detail:
「経営・管理」在留资格以经营管理活动的实际持续为条件，法人清算后该资格的续签基础消失。
若未能在清算完成前办理在留变更或出境手续，可能触发在留取消规定，对未来再入国产生严重影响。

next_action:
请立即与专业人士确认清算时间表，并在清算程序启动后尽早评估在留変更或归国时间节点。

preview_disclaimer: ⚠️ 内部预览 · 非正式建议
```

> DOMAIN INPUT PENDING: DR-03 — 请 DOMAIN 确认経管清算触发的具体在留取消条款依据。见 TEBIQ_DOMAIN_INPUT_REQUEST.md。

---

### Matter-06 — 家族連帯リスク（D09 类）

```
matter_id: M-D09
urgency_display: MEDIUM

risk_summary:
您的家庭成员的在留状态与您的在留资格存在连带关系，对方的在留变化可能直接影响您的资格续签。

risk_detail:
「家族滞在」在留资格以主申请人（配偶、父母）的在留资格持续有效为前提；主申请人在留状态发生变化（如离婚、失业、资格降级）时，家属的在留资格也面临相应风险。
反之，家属的独立就劳申请或资格変更也需要在合规范围内操作，超出许可活动范围将对全家在留申请产生负面影响。

next_action:
请确认家庭全体成员的在留资格类型与当前生活状态是否匹配，如有变化须及时同步评估，避免遗漏连带风险。

preview_disclaimer: ⚠️ 内部预览 · 非正式建议
```

---

## Fixed Preview Disclaimer Text

The following string must appear verbatim with every Matter output. Do NOT modify, soften, or omit it.

```
⚠️ 内部预览 · 非正式建议
本内容由 TEBIQ 系统根据您提供的信息自动生成，仅供内部预览测试使用，不构成法律建议。
具体在留处理须由具备资质的行政书士或入管专业人士依据您的实际情况判断。
```

---

## Copy Tone Rules (Reference for VOICE + ENGINE)

1. No marketing tone. No reassuring hedges that soften a HIGH-risk output.
2. No legal conclusions ("你的在留肯定没问题" is never acceptable).
3. Concrete action, not vague direction. "尽快咨询" alone is not acceptable without a concrete first step.
4. Internal codes (M-J03, M-J04, etc.) must be preserved in system data but must NOT render to end users.
5. Urgency must match the actual risk level. DOMAIN has final say on urgency calibration.
