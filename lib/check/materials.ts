// 技人国（技術・人文知識・国際業務）续签材料详细数据
// 各字段如有不准确请直接修改本文件，UI 会自动渲染

export interface MaterialDetail {
  id: string
  name: string
  where: string
  whatToBring: string[]
  duration: string
  cost: string
  online: boolean
  onlineNote?: string
  pitfall: string
}

export interface MaterialCategory {
  category: string
  materials: MaterialDetail[]
}

export const GIJINKOKU_MATERIALS: MaterialCategory[] = [
  {
    category: '本人身份材料',
    materials: [
      {
        id: 'application-form',
        name: '在留资格更新申请书',
        where: '入管局窗口或官网下载',
        whatToBring: ['无（自己填写）'],
        duration: '即拿即用',
        cost: '免费',
        online: true,
        onlineNote: '入管局官网下载 PDF 自行填写，或在线 e-届出系统提交',
        pitfall:
          '务必使用最新版（每年可能更新）。表格名是「在留期間更新許可申請書」——不要拿成「変更許可」那一份',
      },
      {
        id: 'photo',
        name: '证件照 1 张',
        where: '证件照机（药妆店）或照相馆',
        whatToBring: ['仅本人'],
        duration: '即拍即取',
        cost: '800 - 1500 日元',
        online: false,
        pitfall:
          '必须 4cm×3cm，3 个月内拍摄，白底无装饰。千万别用手机自拍——不规范的照片会被退件',
      },
      {
        id: 'passport',
        name: '护照原件 + 复印件',
        where: '自有',
        whatToBring: ['本人'],
        duration: '即用',
        cost: '免费',
        online: false,
        pitfall:
          '复印首页 + 全部签证页 + 出入境章页。漏复印任何一页可能被要求补交，建议一次性复印齐全',
      },
      {
        id: 'zairyu-card',
        name: '在留卡原件 + 复印件',
        where: '自有',
        whatToBring: ['本人'],
        duration: '即用',
        cost: '免费',
        online: false,
        pitfall: '必须复印正反两面（背面有住址变更记录），漏背面会被退',
      },
    ],
  },
  {
    category: '雇主公司材料',
    materials: [
      {
        id: 'employment-contract',
        name: '雇用合同书',
        where: '公司人事部',
        whatToBring: ['口头请求即可'],
        duration: '1 - 3 工作日',
        cost: '免费',
        online: false,
        pitfall:
          '必须是当前生效版本，含工资明细。如果中途涨过薪，让公司更新合同后再开——旧版会被入管发现金额不一致',
      },
      {
        id: 'employment-cert',
        name: '在职证明书（在職証明書）',
        where: '公司人事部',
        whatToBring: ['口头请求即可'],
        duration: '1 - 3 工作日',
        cost: '免费',
        online: false,
        pitfall:
          '必须含职位、入职日、工作内容、年收入、公司印章。让人事用入管标准格式填写——简陋的版本会被退',
      },
      {
        id: 'company-registry',
        name: '公司登记事项证明书（履歴事項全部証明書）',
        where: '法务局窗口或在线申请',
        whatToBring: ['公司商号、本店所在地'],
        duration: '窗口当场，邮寄约 1 周',
        cost: '600 日元 / 份',
        online: true,
        onlineNote: '法务局オンライン申請（需电子证书 / 法人カード）',
        pitfall:
          '必须 3 个月以内开具的，过期会被退。员工自行去法务局即可申请，无需公司同意',
      },
      {
        id: 'company-overview',
        name: '公司概要',
        where: '公司主页或人事部',
        whatToBring: ['无'],
        duration: '即拿',
        cost: '免费',
        online: false,
        pitfall:
          '主页打印件、会社案内 PDF、概要书任何一种都可。重点是要能看出公司业务范围和规模',
      },
      {
        id: 'financial-report',
        name: '决算报告书',
        where: '公司财务部',
        whatToBring: ['正式申请（部分公司需上司批准）'],
        duration: '1 - 2 周',
        cost: '免费',
        online: false,
        pitfall:
          '必须是最近一期完整版含损益表（PL）。有些公司因保密拒绝，可接受「決算公告」或「附属明細書」替代',
      },
      {
        id: 'tax-summary',
        name: '法定调书合计表',
        where: '公司财务部',
        whatToBring: ['正式申请'],
        duration: '1 - 2 周',
        cost: '免费',
        online: false,
        pitfall:
          '小公司可能没保留副本，可用源泉徴収簿、法人税申告書写票或其他税务申报代替',
      },
    ],
  },
  {
    category: '工作内容证明',
    materials: [
      {
        id: 'job-description',
        name: '业务内容说明书',
        where: '自行撰写或人事部协助',
        whatToBring: ['无'],
        duration: '半天 - 1 天（自己写）',
        cost: '免费',
        online: false,
        pitfall:
          '必须详细描述工作内容、与所学专业的关联性。最大的雷是写得太泛——入管要看到具体职责，不是「office 工作」这种模糊词',
      },
      {
        id: 'business-card',
        name: '名片或工作邮件签名',
        where: '自有',
        whatToBring: ['无'],
        duration: '即用',
        cost: '免费',
        online: false,
        pitfall:
          '用来证明实际职位与在职证明一致。如果公司不发名片，可用工作邮件签名截图代替',
      },
    ],
  },
  {
    category: '纳税与社保材料',
    materials: [
      {
        id: 'tax-cert-amount',
        name: '住民税课税证明书',
        where: '住所所在地市役所 / 区役所市民課',
        whatToBring: ['在留卡', '本人确认书类'],
        duration: '窗口当场',
        cost: '300 日元 / 份',
        online: true,
        onlineNote: '部分自治体支持マイナンバーカード线上申请',
        pitfall:
          '必须是直近 1 年分。如果年内搬过家，要去当时居住的市役所开——新住所的市役所没有去年的记录',
      },
      {
        id: 'tax-cert-paid',
        name: '住民税纳税证明书',
        where: '同课税证明书（市役所市民課）',
        whatToBring: ['在留卡', '本人确认书类'],
        duration: '窗口当场',
        cost: '300 日元 / 份',
        online: true,
        pitfall:
          '证明你「已经缴纳」。如果有未缴部分会显示出来——务必先补缴再开，否则等于自爆',
      },
      {
        id: 'gensen',
        name: '源泉徴収票',
        where: '公司提供（每年 1 月发给员工）',
        whatToBring: ['无（公司应已发给你）'],
        duration: '即拿',
        cost: '免费',
        online: false,
        pitfall:
          '直近 1 年的（去年的）。如果丢失，让公司人事部重发，通常 1 周内能拿到',
      },
      {
        id: 'health-insurance',
        name: '健康保险证',
        where: '自有（已发给你的）',
        whatToBring: ['无'],
        duration: '即用',
        cost: '免费',
        online: false,
        pitfall:
          '复印正反两面。如果是国保（自营业者）则去市役所复印；公司保险则用社保卡',
      },
      {
        id: 'pension-record',
        name: '年金缴纳记录',
        where: '年金事务所窗口或 ねんきんネット',
        whatToBring: ['基础年金番号通知书', 'マイナンバーカード'],
        duration: '即查',
        cost: '免费',
        online: true,
        onlineNote: 'ねんきんネット（需先注册登记）可在线打印缴纳明细',
        pitfall:
          '网上版可能不显示最近 2-3 个月数据。临近申请时建议直接去年金事务所窗口拿最新版',
      },
    ],
  },
  {
    category: '学历证明（首次变更或入管要求时）',
    materials: [
      {
        id: 'diploma',
        name: '大学毕业证书 + 成绩单',
        where: '母校教务处或学籍科',
        whatToBring: ['本人身份证明', '部分学校需预约'],
        duration: '中国国内 1 - 2 周（含邮寄）',
        cost: '中国通常免费，国际邮寄费 50 - 200 元',
        online: false,
        onlineNote: '部分学校支持在线申请，可在母校官网查询',
        pitfall:
          '中国学历必须附日文翻译件（自行翻译需附翻译者签名 / 公司翻译盖章）。原件请保留备查',
      },
      {
        id: 'jlpt',
        name: '日语能力证书（如有）',
        where: '自有',
        whatToBring: ['无'],
        duration: '即用',
        cost: '免费',
        online: false,
        pitfall:
          'N1 / N2 合格证书可附上加分。没有也不影响续签，不用为了申请而临时去考',
      },
    ],
  },
]
