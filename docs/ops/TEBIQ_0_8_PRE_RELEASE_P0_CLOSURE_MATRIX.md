# TEBIQ 0.8 Pre-Release P0 Closure Matrix

Updated: 2026-05-15

This matrix maps DOMAIN pre-release P0 findings to current 0.8 engineering coverage.

Important distinction:

- `engineering guardrail closed` means runtime can route or block dangerous answer shapes.
- It does not mean TEBIQ can give full positive legal/practical advice.
- Positive route wording still needs DOMAIN approval for several areas.

## P0 Matrix

| P0 | DOMAIN Finding | Current Engineering Coverage | Status |
|----|----------------|------------------------------|--------|
| P0-1 | 特例期間中の出国 | `special-period-departure-deepwater`; `answer-special-period-departure-overconfidence`; Loop2N real-user pack 10/10; AQL P1 wording gaps patched | engineering guardrail closed; positive advice not shipped |
| P0-2 | 変更申請中の活動範囲 / 新工作先行開始 | `pending-status-change-current-activity-only`; `answer-pending-change-expands-work-permission`; follow-up context tests | engineering guardrail closed; individual activity scope still deep-water when facts are incomplete |
| P0-3 | HSP1機関変更・先行開始 / already-started | `hsp1-institution-change-permission-first`; `answer-hsp1-notification-equals-permission`; `answer-hsp1-certificate-as-alternate-route` terminal-gated | engineering guardrail closed for myths; already-started remediation remains professional route |
| P0-4 | DV住所安全・在留義務交叉 | `dv-address-safety-first`; `answer-dv-contact-abuser-or-guarantee`; ordinary separation negative-control tests | engineering guardrail closed; substitute evidence/status route still DOMAIN/professional |
| P0-5 | 特例期間終了後 / 不許可後 / 既に期間超過 | `special-period-two-month-boundary`; `nonpermission-special-period-ended-boundary`; `nonpermission-no-ordinary-appeal-no-grace`; related validators | engineering guardrail closed; individualized overstay/remedy stays professional route |
| P0-6 | 経営管理500万円/3000万円/常勤職員混同 | `business-manager-2025-reform-hard-fact-boundary`; `answer-business-manager-2025-reform-mixed-hard-facts`; G57/G103 quarantined; Loop2M 14/14 | engineering guardrail closed; positive reform advisory not shipped |

## Must-Not-Ship-As-Positive Advice

These areas should remain route-gated / professional-confirmation only for 0.8:

- whether a user may leave Japan during special period and safely reenter;
- whether a specific pending-change user may continue or start a particular activity;
- what to do after already starting HSP1 new-institution work before permission;
- DV-based status route, substitute evidence, and address-handling specifics;
- post-nonpermission overstay remediation;
- business-manager 2025 reform positive eligibility, especially startup special activity 44/51 and existing-holder transition.

## Verification Snapshot

Latest relevant checks:

- `npm test`: 178/178;
- `npx tsc --noEmit --pretty false`: passed;
- `npm run lint`: passed;
- all `scripts/test/test-p0-cycle*.ts`: passed;
- all guardrail real-user packs through Loop2N: passed;
- `npm run build`: passed;
- local production smoke after Loop2N: passed.

## Remaining Blocker For Public Release

Provider-backed answer regression is still not proven in this workspace because no valid model/provider key is present in `.env.local`.

0.8 can be described internally as a deterministic guardrail-ready candidate. It should not be described as provider-answer release-ready until Loop2B or equivalent provider-backed regression completes and AQL reviews the actual generated answers.
