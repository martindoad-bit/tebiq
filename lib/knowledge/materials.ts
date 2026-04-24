// 材料详情知识库 - 按日文官方名称索引
// 结果页材料卡展开时优先从这里读取；找不到的回落到 lib/check/materials.ts 的 legacy 数据

export interface MaterialDetailEntry {
  where: string
  bring: string
  timeRequired: string
  cost: string
  online: string
  tips: string
}

export const materialDetails: Record<string, MaterialDetailEntry> = {
  '在留資格更新許可申請書': {
    where: '入管局官网免费下载打印，或在入管局窗口领取',
    bring: '无',
    timeRequired: '即取',
    cost: '免费',
    online: '可从入管局官网下载',
    tips: '必须用黑色圆珠笔填写，签名处必须本人亲笔签名',
  },
  '証明写真': {
    where: '任何证件照店（写真屋），便利店照相机也可以',
    bring: '无',
    timeRequired: '约 30 分钟',
    cost: '约 ¥800-1200',
    online: '不可',
    tips: '3 个月内拍摄，白底正面无帽，照片背面写上姓名',
  },
  'パスポート': {
    where: '自备',
    bring: '无',
    timeRequired: '即取',
    cost: '免费',
    online: '不适用',
    tips: '需要复印信息页和最近一次入境记录页，复印要清晰无阴影',
  },
  '在留カード': {
    where: '自备',
    bring: '无',
    timeRequired: '即取',
    cost: '免费',
    online: '不适用',
    tips: '需要复印表面和背面，很多人忘了复印背面',
  },
  '住民票': {
    where: '住所所在地市役所/区役所「住民課」窗口',
    bring: '在留卡或护照',
    timeRequired: '窗口当场出具',
    cost: '约 ¥300',
    online: '部分自治体支持便利店自助打印（需 My Number Card）',
    tips: '必须是 3 个月以内出具的；申请时说明是为了在留更新用',
  },
  '住民税納税証明書': {
    where: '住所所在地市役所/区役所「税務課」窗口',
    bring: '在留卡或护照',
    timeRequired: '窗口当场出具',
    cost: '约 ¥300/份',
    online: '部分自治体支持网上申请',
    tips: '说清楚是「在留更新のため」，工作人员会知道出哪种格式；需要近 1-2 年度的',
  },
  '源泉徴収票': {
    where: '当前雇主人事/总务部门',
    bring: '无',
    timeRequired: '通常几天内',
    cost: '免费',
    online: '部分公司支持系统自助下载',
    tips: '每年 1 月发放上一年度的；中途离职者在离职时获得；忘了要向人事索取',
  },
  '雇用契約書': {
    where: '人事/总务部门',
    bring: '无',
    timeRequired: '通常几天内',
    cost: '免费',
    online: '不适用',
    tips: '需要包含职位、工作内容、工资等信息；工作内容发生变化要附说明',
  },
  '在職証明書': {
    where: '人事/总务部门',
    bring: '无',
    timeRequired: '通常 1-2 周，需提前申请',
    cost: '免费',
    online: '不适用',
    tips: '必须用公司抬头纸，盖有公司印章；内容要包含职位、在职期间、担当业务',
  },
  '履歴事項全部証明書': {
    where: '法务局（法務局）窗口，可在官网查询最近的法务局',
    bring: '申请费用',
    timeRequired: '窗口当场出具；网上申请约 1 周',
    cost: '约 ¥600/份',
    online: '可通过「登記情報提供サービス」在线获取',
    tips: '由公司人事去取，不能让个人代取；有些 HR 不熟悉，需要明确告知这个材料',
  },
  '会社案内': {
    where: '公司主页或人事部',
    bring: '无',
    timeRequired: '即拿',
    cost: '免费',
    online: '公司主页打印即可',
    tips: '主页打印件、会社案内 PDF、概要书任何一种都可以；重点是要能看出公司业务范围和规模',
  },
  '決算報告書': {
    where: '公司总务/财务部门',
    bring: '无',
    timeRequired: '通常几天内',
    cost: '免费',
    online: '不适用',
    tips: '最近 1 年度的决算书；公司新成立不满 1 年则提供其他财务证明材料',
  },
}
