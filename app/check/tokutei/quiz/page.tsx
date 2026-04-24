import SimpleQuiz, { type SimpleQuizConfig } from '@/app/_components/SimpleQuiz'

const config: SimpleQuizConfig = {
  visaName: '特定技能',
  infoHref: '/check/tokutei',
  infoLabel: '查看特定技能完整说明',
  questions: [
    {
      id: 'q1',
      text: '你持有的是特定技能 1 号还是 2 号？',
      why: '两者要求和上限完全不同',
      options: [
        { text: '特定技能 1 号', value: '1' },
        { text: '特定技能 2 号', value: '2' },
      ],
      learnMore:
        '特定技能 1 号有通算 5 年的在日上限，达到上限后必须离开日本或变更为其他在留资格。特定技能 2 号目前对象行业正在扩大，无在日期间上限。[待书士审核]',
    },
    {
      id: 'q2_1',
      text: '特定技能 1 号的通算在日期间是否接近或超过 5 年？',
      why: '1 号有 5 年总计上限，超过不能续签',
      showIf: { q1: '1' },
      options: [
        { text: '未满 4 年', value: 'safe' },
        { text: '4 年以上', value: 'warning' },
        { text: '已满 5 年或超过', value: 'over' },
      ],
      redIf: 'over',
      yellowIf: 'warning',
      learnMore:
        '特定技能 1 号的 5 年上限是从首次取得该在留资格起累计计算的。接近 5 年时需要提前确认是否有资格转 2 号或其他在留资格。[待书士审核]',
    },
    {
      id: 'q3',
      text: '你所属的登録支援機関（注册支援机构）是否还在正常运营？',
      why: '支援機関停止运营会直接影响续签',
      options: [
        { text: '正常运营中', value: 'yes' },
        { text: '停止运营或不确定', value: 'no' },
      ],
      redIf: 'no',
      learnMore:
        '如果支援機関停止运营，需要立刻联系雇主确认是否已更换支援機関，或由雇主自行支援。这种情况需要立刻咨询书士。[待书士审核]',
    },
    {
      id: 'q4',
      text: '你的特定技能测试合格证是否仍在有效期内？',
      why: '技能合格证是特定技能资格的基础',
      options: [
        { text: '有效期内', value: 'yes' },
        { text: '已过期或不确定', value: 'no' },
      ],
      yellowIf: 'no',
      learnMore:
        '特定技能测试合格证的有效期根据考试种类不同而不同。已过期的需要确认是否需要重新考试。具体情况咨询书士判断。[待书士审核]',
    },
    {
      id: 'q5',
      text: '是否按时缴纳住民税，没有欠缴？',
      why: '税款记录是续签审查的基础项目',
      options: [
        { text: '是', value: 'yes' },
        { text: '有欠缴或不确定', value: 'no' },
      ],
      redIf: 'no',
      learnMore: '住民税欠缴是续签被拒的高频原因，申请前必须补缴完并取得完缴证明。[待书士审核]',
    },
    {
      id: 'q6',
      text: '是否全程参加健康保险，没有断保？',
      why: '健康保险缴纳是续签审查项目',
      options: [
        { text: '是，全程参保', value: 'yes' },
        { text: '有断保', value: 'no' },
      ],
      yellowIf: 'no',
      learnMore: '断保期间需要说明原因。换工作空窗期需要及时加入国民健康保险。[待书士审核]',
    },
    {
      id: 'q7',
      text: '实际从事的工作内容是否与特定技能的认定范围一致？',
      why: '从事范围外工作是特定技能续签的最大风险',
      options: [
        { text: '是，工作内容一致', value: 'yes' },
        { text: '有从事范围外工作', value: 'no' },
      ],
      redIf: 'no',
      learnMore:
        '特定技能签证只允许在认定的特定业务范围内工作。从事范围外的工作（尤其是单纯作业）不仅影响续签，还可能被认定为不法就劳。发现这种情况需要立刻咨询书士。[待书士审核]',
    },
    {
      id: 'q8',
      text: '过去是否有刑事违规或严重交通违规记录？',
      why: '违规记录直接影响续签审查',
      options: [
        { text: '没有', value: 'yes' },
        { text: '有', value: 'no' },
      ],
      redIf: 'no',
      learnMore: '有违规记录需要向书士说明具体情况进行评估，不要隐瞒。[待书士审核]',
    },
    {
      id: 'q9',
      text: '护照有效期距今是否还有 6 个月以上？',
      why: '护照必须在续签申请期间有效',
      options: [
        { text: '是', value: 'yes' },
        { text: '不足 6 个月', value: 'no' },
      ],
      yellowIf: 'no',
      learnMore: '先去中国驻日大使馆续签护照再办在留续签，两者可以同步进行。[待书士审核]',
    },
  ],
  materials: [
    '在留资格更新许可申请书',
    '证件照',
    '护照',
    '在留卡',
    '住民票',
    '住民税納税証明書',
    '雇用契約書',
    '特定技能評価試験合格証 / 技能実習修了証等',
    '日本語能力試験合格証 等',
    '登録支援機関との契約書（必要时）',
  ],
}

export default function TokuteiQuizPage() {
  return <SimpleQuiz config={config} />
}
