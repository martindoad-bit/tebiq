import SimpleQuiz, { type SimpleQuizConfig } from '@/app/_components/SimpleQuiz'

const config: SimpleQuizConfig = {
  visaName: '定住者',
  infoHref: '/check/teijusha',
  infoLabel: '查看定住者完整说明',
  questions: [
    {
      id: 'q1',
      text: '是否按时缴纳住民税，没有欠缴？',
      why: '定住者续签首要审查项目',
      options: [
        { text: '是', value: 'yes' },
        { text: '有欠缴或不确定', value: 'no' },
      ],
      redIf: 'no',
      learnMore: '住民税欠缴是续签被拒的最高频原因，申请前必须补缴完毕。[待书士审核]',
    },
    {
      id: 'q2',
      text: '是否全程参加健康保险，没有断保？',
      why: '社会保险缴纳是续签审查项目',
      options: [
        { text: '是，全程参保', value: 'yes' },
        { text: '有断保期间', value: 'no' },
      ],
      yellowIf: 'no',
      learnMore: '断保期间需要说明原因并准备相关证明材料。[待书士审核]',
    },
    {
      id: 'q3',
      text: '近两年内是否有长期离开日本（超过 3 个月）的情况？',
      why: '定住者长期出境可能影响续签判断',
      options: [
        { text: '没有', value: 'yes' },
        { text: '有较长时间在海外', value: 'no' },
      ],
      yellowIf: 'no',
      learnMore:
        '长期出境本身不是禁止项，但入管局会审查在日本生活的实质性。需要准备出境原因说明。[待书士审核]',
    },
    {
      id: 'q4',
      text: '在日本是否有稳定的生活基础（工作 / 子女就学 / 配偶等）？',
      why: '定住者续签审查在日生活的稳定性',
      options: [
        { text: '是，有稳定生活基础', value: 'yes' },
        { text: '目前没有工作也没有家庭', value: 'no' },
      ],
      yellowIf: 'no',
      learnMore:
        '定住者续签没有硬性的工作或收入要求，但需要证明在日本有实质性的生活。子女在日就学、配偶在日居住等都是有力的证明。[待书士审核]',
    },
    {
      id: 'q5',
      text: '是否有刑事违规或严重交通违规记录？',
      why: '违规记录直接影响续签审查',
      options: [
        { text: '没有', value: 'yes' },
        { text: '有', value: 'no' },
      ],
      redIf: 'no',
      learnMore: '有违规记录需要向书士说明具体情况评估影响，不要隐瞒。[待书士审核]',
    },
    {
      id: 'q6',
      text: '如果有日系人身份，是否能证明与日本的联系仍然存在？',
      why: '日系定住者需要证明与日本的持续联系',
      options: [
        { text: '是，或不适用（非日系人定住）', value: 'yes' },
        { text: '日系人但与日本联系较少', value: 'no' },
      ],
      yellowIf: 'no',
      learnMore:
        '日系人定住者的续签，入管局会关注与日本家族和社会的实质联系是否继续维持。长期与日本脱离联系的日系人续签可能遇到困难。[待书士审核]',
    },
    {
      id: 'q7',
      text: '护照有效期距今是否还有 6 个月以上？',
      why: '护照必须在续签申请期间有效',
      options: [
        { text: '是', value: 'yes' },
        { text: '不足 6 个月', value: 'no' },
      ],
      yellowIf: 'no',
      learnMore: '先去中国驻日使馆续签护照再办在留续签，可以同步进行。[待书士审核]',
    },
  ],
  materials: [
    '在留资格更新许可申请书',
    '证件照',
    '护照',
    '在留卡',
    '住民票',
    '住民税納税証明書',
    '在日本生活证明（雇用契約書 / 在学証明書 / 配偶者の在留証明等）',
    '理由書（如长期出境 / 定住经历变化等）',
  ],
}

export default function TeijushaQuizPage() {
  return <SimpleQuiz config={config} />
}
