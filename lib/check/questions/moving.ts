// 搬家手续题库
import type { QuizBank, QuizQuestion } from '../types'

const Q: Record<string, QuizQuestion> = {
  q1: {
    id: 'q1',
    text: '搬家后是否已经在 14 天内完成「転入届」？',
    why: '転入届是法定义务，超期会影响住民票记录',
    learnMore:
      '転入届超期通常不会有直接罚款，但会影响住民票记录，进而影响续签材料的完整性。发现超期立刻去办，窗口工作人员会处理。',
    options: [
      { label: '已完成', next: 'q2' },
      {
        label: '还没有 / 超期了',
        next: 'q2',
        severity: 'yellow',
        triggerLabel: '転入届未在 14 天内完成',
        selfFix: true,
        fixHint: '立刻去新住所所在市役所补办，窗口工作人员会处理。',
      },
    ],
  },
  q2: {
    id: 'q2',
    text: '在留卡背面的地址是否已经更新？',
    why: '在留卡地址和实际住址不一致是违法状态',
    learnMore:
      '在留卡必须在転入届时同步更新地址（在市役所窗口即可）。地址不一致在路检时可能被质疑，且影响续签申请。立刻去市役所办理。',
    options: [
      { label: '已更新', next: 'q3' },
      {
        label: '还没有',
        next: 'q3',
        severity: 'red',
        triggerLabel: '在留卡背面地址未更新',
        selfFix: true,
        fixHint: '立刻去市役所办理，窗口可同时处理。',
      },
    ],
  },
  q3: {
    id: 'q3',
    text: '搬家的同时是否换了工作？',
    why: '换工作需要额外的入管申报',
    learnMore:
      '换工作需要在 14 天内单独向入管局提交変更申報，和搬家手续是两件独立的事情，不要遗漏。',
    options: [
      // 没换工作 → 直接跳过 q3a 到 q4
      { label: '没有换工作', next: 'q4' },
      // 换了工作 → 进入 q3a；q3a 的 showIf 用 idx 1 校验
      { label: '同时换了工作', next: 'q3a' },
    ],
  },
  q3a: {
    id: 'q3a',
    text: '换工作后是否已经向入管局提交了「契約機関に関する届出」？',
    why: '技人国持有者换工作 14 天内必须申报',
    showIf: { q3: 1 },
    learnMore:
      '可通过入管局电子届出系统在线申报，无需亲自前往。越早越好，影响续签记录。',
    options: [
      { label: '已申报', next: 'q4' },
      {
        label: '还没有',
        next: 'q4',
        severity: 'red',
        triggerLabel: '换工作后未向入管局申报',
        selfFix: true,
        fixHint: '通过入管局电子届出系统在线补办，越早越好。',
      },
    ],
  },
  q4: {
    id: 'q4',
    text: '是否已通知雇主公司 HR 更新地址信息？',
    why: '公司需要更新住民税、年金等记录',
    learnMore:
      '公司 HR 需要更新住民税の特别徴収の届出地址，否则住民税通知可能寄到旧地址导致欠缴。',
    options: [
      { label: '已通知', next: 'q5' },
      {
        label: '还没有',
        next: 'q5',
        severity: 'yellow',
        triggerLabel: '未通知雇主 HR 更新地址',
        selfFix: true,
        fixHint: '邮件通知 HR 更新地址，避免住民税通知寄到旧地址。',
      },
    ],
  },
  q5: {
    id: 'q5',
    text: '银行和手机账户地址是否已更新？',
    why: '重要通知可能寄到旧地址',
    learnMore:
      '银行地址不更新可能导致重要文件（在留卡更新通知、税务文件等）无法收到。各银行网银通常可以在线更新。',
    options: [
      { label: '已更新', next: null },
      {
        label: '还没有',
        next: null,
        severity: 'yellow',
        triggerLabel: '银行 / 手机账户地址未更新',
        selfFix: true,
        fixHint: '各银行网银通常可以在线更新地址。',
      },
    ],
  },
}

export const movingBank: QuizBank = {
  visa: 'moving',
  visaName: '搬家手续',
  startId: 'q1',
  questions: Q,
  backLabel: '返回搬家说明',
  infoHref: '/life/moving',
  infoLabel: '查看完整搬家手续说明',
  ctaHref: '/life/moving',
  ctaLabel: '回到搬家手续清单',
  materials: [
    '転出届（旧市役所提交）',
    '転入届（新市役所提交，搬家后 14 天内）',
    '在留卡（背面地址更新）',
    'マイナンバーカード（地址更新）',
    '雇主 HR 地址变更通知',
    '银行 / 手机 / 信用卡地址变更',
    '驾照地址变更（警察署）',
    '换工作时的入管局申报（如适用）',
  ],
}
