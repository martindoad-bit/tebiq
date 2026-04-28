export function sanitizePublicKnowledgeText(input: string): string {
  return input
    .replace(/\s*\[待书士审核\]/g, '')
    .replace(/\s*\[待专家审核\]/g, '')
    .replace(/\s*\[文案待书士审核\]/g, '')
    .replace(/\s*\[文案待专家审核\]/g, '')
    .replace(/申請取次行政書士/g, '申請取次专家')
    .replace(/行政書士/g, '专家')
    .replace(/行政书士/g, '专家')
    .replace(/持牌专家/g, '专家')
    .replace(/持牌专业人士/g, '专业人士')
    .replace(/专业书士/g, '专家')
    .replace(/书士/g, '专家')
}
