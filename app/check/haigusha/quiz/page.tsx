import SimpleQuiz, { type SimpleQuizConfig } from '@/app/_components/SimpleQuiz'

const config: SimpleQuizConfig = {
  visaName: '配偶者',
  infoHref: '/check/haigusha',
  infoLabel: '查看配偶者签证完整说明',
  questions: [
    {
      id: 'q1',
      text: '你和配偶（日本人 / 永住者）的婚姻关系目前是否正常维持？',
      why: '配偶者签证的基础是真实婚姻关系的存在',
      options: [
        { text: '是，婚姻正常', value: 'yes' },
        { text: '已离婚或正在办理', value: 'no' },
      ],
      redIf: 'no',
      learnMore:
        '已离婚或正在离婚的情况下，配偶者签证的在留资格基础不复存在，必须在 6 个月内申请变更为其他在留资格（定住者等）。时间非常紧迫，需要立刻咨询书士。[待书士审核]',
    },
    {
      id: 'q2',
      text: '配偶目前是否在日本居住？',
      why: '入管局会确认配偶者是否在日本实际生活',
      options: [
        { text: '是，在日本', value: 'yes' },
        { text: '配偶长期在海外', value: 'no' },
      ],
      yellowIf: 'no',
      learnMore:
        '配偶长期不在日本居住的情况下，入管局会质疑婚姻实质。需要准备配偶在海外的原因说明，并证明婚姻关系实质存在（通信记录、互相访问记录等）。[待书士审核]',
    },
    {
      id: 'q3',
      text: '你和配偶目前是否同居？',
      why: '同居是配偶者签证审查的重要考量因素',
      options: [
        { text: '是，同居', value: 'yes' },
        { text: '别居（分开住）', value: 'no' },
      ],
      yellowIf: 'no',
      learnMore:
        '别居本身不是立刻被拒的理由，但入管局会深入审查原因。合理原因（工作地点、子女就学等）需要有说明书和证明材料。长期别居且无合理说明是高风险。[待书士审核]',
    },
    {
      id: 'q4',
      text: '住民税是否按时缴纳，没有欠缴？',
      why: '税款记录是续签审查的基础项目',
      options: [
        { text: '是，按时缴纳', value: 'yes' },
        { text: '有欠缴或不确定', value: 'no' },
      ],
      redIf: 'no',
      learnMore: '住民税欠缴是续签被拒的高频原因。申请前必须补缴完毕并取得完缴证明。[待书士审核]',
    },
    {
      id: 'q5',
      text: '是否全程参加健康保险（社会保险或国民健康保险），没有断保？',
      why: '健康保险缴纳情况是续签审查项目之一',
      options: [
        { text: '是，全程参保', value: 'yes' },
        { text: '有断保期间', value: 'no' },
      ],
      yellowIf: 'no',
      learnMore:
        '断保期间入管局会关注。换工作空窗期需要及时加入国民健康保险，离职后 14 天内去市役所办理。[待书士审核]',
    },
    {
      id: 'q6',
      text: '过去是否有刑事违规或严重交通违规记录？',
      why: '违规记录会直接影响续签审查结果',
      options: [
        { text: '没有', value: 'yes' },
        { text: '有', value: 'no' },
      ],
      redIf: 'no',
      learnMore:
        '有违规记录不等于一定被拒，但需要向书士说明具体情况进行评估。隐瞒比如实说明后果严重得多。[待书士审核]',
    },
    {
      id: 'q7',
      text: '近一两年内是否有长期离开日本（超过 3 个月）的情况？',
      why: '长期出境会影响入管局对婚姻真实性的判断',
      options: [
        { text: '没有超过 3 个月', value: 'yes' },
        { text: '有较长时间在海外', value: 'no' },
      ],
      yellowIf: 'no',
      learnMore:
        '长期出境本身不是问题，但需要说明原因。如果出境期间配偶也不在日本，入管局会更仔细审查。[待书士审核]',
    },
    {
      id: 'q8',
      text: '护照有效期距今是否还有 6 个月以上？',
      why: '护照必须在续签申请期间有效',
      options: [
        { text: '是，6 个月以上', value: 'yes' },
        { text: '不足 6 个月', value: 'no' },
      ],
      yellowIf: 'no',
      learnMore:
        '需要先去中国驻日大使馆 / 总领事馆续签护照（预约约需 1-2 个月），再办在留续签。两者可以同步进行但要注意时间安排。[待书士审核]',
    },
  ],
  materials: [
    '在留资格更新许可申请书',
    '证件照',
    '护照',
    '在留卡',
    '住民票',
    '住民税納税証明書',
    '配偶者との婚姻を証明する書類（婚姻届受理証明書等）',
    '配偶者の住民票または在留カード写し',
    '夫妻の同居を証明する書類（公共料金領収書等）',
    '夫婦の交流を証明する写真等',
  ],
}

export default function HaigushaQuizPage() {
  return <SimpleQuiz config={config} />
}
