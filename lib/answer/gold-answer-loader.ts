import { readFile } from 'fs/promises'
import path from 'path'
import type { AnswerSeed } from './answer-seeds'
import { ANSWER_BOUNDARY_NOTE, type ActionAnswer } from './types'

let goldCache: Promise<AnswerSeed[]> | null = null

export function loadGoldAnswerSeeds(): Promise<AnswerSeed[]> {
  goldCache ??= readGoldAnswerSeeds()
  return goldCache
}

async function readGoldAnswerSeeds(): Promise<AnswerSeed[]> {
  const filePath = path.join(process.cwd(), 'docs/answer-gold-standard/GOLD_ANSWER_V2.md')
  const raw = await readFile(filePath, 'utf8').catch(() => '')
  if (!raw) return []

  const blocks = raw.split(/^##\s+(V2-\d+)[^\n]*$/m)
  const seeds: AnswerSeed[] = []
  for (let index = 1; index < blocks.length; index += 2) {
    const id = blocks[index]?.trim()
    const body = blocks[index + 1] ?? ''
    const yaml = body.match(/```yaml\n([\s\S]*?)```/)?.[1]
    if (!id || !yaml) continue

    const query = scalar(yaml, 'query')
    const intent = scalar(yaml, 'intent')
    const template = scalar(yaml, 'template')
    if (!query || !intent) continue

    const urgent = listSection(yaml, '最紧的两件')
    const steps = listSection(yaml, '步骤')
    const timing = listSection(yaml, '期限')
    const consequences = listSection(yaml, '不做会怎样')
    const customerMessage = blockScalar(yaml, '复制给客户')
    const mustNot = listTopLevel(yaml, 'must_not_answer')
    const actionAnswer: ActionAnswer = {
      conclusion: urgent[0]?.replace(/^\d+[.．、]\s*/, '') || query,
      what_to_do: urgent,
      where_to_go: extractOffices(steps.join('\n')),
      how_to_do: steps,
      documents_needed: extractDocuments(steps.join('\n')),
      deadline_or_timing: timing,
      consequences,
      expert_handoff: extractExpertHandoff(steps.join('\n'), consequences.join('\n')),
      boundary_note: ANSWER_BOUNDARY_NOTE,
    }

    seeds.push({
      slug: slugify(`${id}-${intent}`),
      title: query,
      question: query,
      keywords: [query, intent, ...keywordsFromIntent(intent), ...mustNot.map(item => item.replace(/^不要答成/, '').trim())],
      answerType: 'matched',
      answerLevel: 'L3',
      reviewStatus: 'reviewed',
      sourceGrade: 'B',
      summary: customerMessage || urgent.join('；') || query,
      sections: [
        { heading: '最紧的两件', body: urgent.join('\n') },
        { heading: '步骤', body: steps.join('\n') },
        { heading: '期限', body: timing.join('\n') },
        { heading: '不做会怎样', body: consequences.join('\n') },
      ].filter(section => section.body.trim()),
      nextSteps: urgent.length ? urgent : steps.slice(0, 3),
      sources: [{ title: 'Gold Answer v2', source_grade: 'B' }],
      boundaryNote: ANSWER_BOUNDARY_NOTE,
      relatedLinks: [{ title: '继续问', href: '/' }],
      actionAnswer,
      intent,
      intentType: templateToIntentType(template),
      domain: intentToDomain(intent),
      currentStatus: currentFromIntent(intent),
      targetStatus: targetFromIntent(intent),
      preferredTemplate: templateToPreferredTemplate(template),
      mustNotMatch: mustNot,
      priority: 100,
    })
  }
  return seeds
}

function scalar(yaml: string, key: string): string | null {
  const match = yaml.match(new RegExp(`^${escapeRegExp(key)}:\\s*(.+)$`, 'm'))
  return match?.[1]?.trim().replace(/^["']|["']$/g, '') || null
}

function blockScalar(yaml: string, key: string): string | null {
  const match = yaml.match(new RegExp(`^${escapeRegExp(key)}:\\s*\\|\\s*\\n([\\s\\S]*?)(?=^\\S|(?![\\s\\S]))`, 'm'))
  return match?.[1]
    ?.split('\n')
    .map(line => line.replace(/^ {2}/, '').trimEnd())
    .join('\n')
    .trim() || null
}

function listSection(yaml: string, key: string): string[] {
  const match = yaml.match(new RegExp(`^\\s{2}${escapeRegExp(key)}:\\s*\\n([\\s\\S]*?)(?=^\\s{2}\\S|^\\S|(?![\\s\\S]))`, 'm'))
  if (!match?.[1]) return []
  return match[1]
    .split('\n')
    .map(line => line.replace(/^\s*-\s*/, '').trim())
    .filter(Boolean)
}

function listTopLevel(yaml: string, key: string): string[] {
  const match = yaml.match(new RegExp(`^${escapeRegExp(key)}:\\s*\\n([\\s\\S]*?)(?=^\\S|(?![\\s\\S]))`, 'm'))
  if (!match?.[1]) return []
  return match[1]
    .split('\n')
    .map(line => line.replace(/^\s*-\s*/, '').trim())
    .filter(Boolean)
}

function templateToIntentType(template: string | null): AnswerSeed['intentType'] {
  if (!template) return undefined
  if (/material/.test(template)) return 'material_list'
  if (/sequence/.test(template)) return 'scenario_sequence'
  if (/risk/.test(template)) return 'risk_assessment'
  if (/misconception/.test(template)) return 'misconception'
  if (/notice/.test(template)) return 'document_notice'
  if (/deadline/.test(template)) return 'deadline_emergency'
  if (/visa-change|eligibility/.test(template)) return 'eligibility_check'
  return 'procedure_flow'
}

function templateToPreferredTemplate(template: string | null): AnswerSeed['preferredTemplate'] {
  const intentType = templateToIntentType(template)
  if (intentType === 'material_list') return 'material_template'
  if (intentType === 'scenario_sequence') return 'sequence_template'
  if (intentType === 'risk_assessment') return 'risk_template'
  if (intentType === 'misconception') return 'misconception_template'
  if (intentType === 'document_notice') return 'notice_template'
  if (intentType === 'deadline_emergency') return 'deadline_template'
  if (intentType === 'eligibility_check') return 'eligibility_template'
  return 'flow_template'
}

function intentToDomain(intent: string): AnswerSeed['domain'] {
  if (/pension|年金/.test(intent)) return 'pension'
  if (/tax|税/.test(intent)) return 'tax'
  if (/insurance|社保|健保/.test(intent)) return 'health_insurance'
  if (/office|address|registration|代表|本店|会社|company/.test(intent)) return 'company_registration'
  if (/hr|employment|雇/.test(intent)) return 'employment'
  if (/school|child/.test(intent)) return 'school'
  if (/housing|address-change/.test(intent)) return 'housing'
  if (/notice|document/.test(intent)) return 'document'
  return 'visa'
}

function currentFromIntent(intent: string): string | undefined {
  if (/management-to-engineer/.test(intent)) return '经营管理'
  if (/engineer-to-management/.test(intent)) return '技人国 / 人文签'
  if (/skilled-to-engineer/.test(intent)) return '特定技能'
  if (/student-to-engineer/.test(intent)) return '留学'
  return undefined
}

function targetFromIntent(intent: string): string | undefined {
  if (/management-to-engineer/.test(intent)) return '技人国 / 人文签'
  if (/engineer-to-management/.test(intent)) return '经营管理'
  if (/skilled-to-engineer/.test(intent)) return '技人国 / 人文签'
  if (/student-to-engineer/.test(intent)) return '技人国 / 人文签'
  if (/management|経営/.test(intent)) return '经营管理'
  return undefined
}

function keywordsFromIntent(intent: string): string[] {
  return intent.split(/[-_]/).filter(Boolean)
}

function extractOffices(text: string): string[] {
  const offices = ['出入国在留管理局', '入管', '法務局', '税務署', '区役所', '市役所', '年金事務所', '公司人事', 'Hello Work']
  return offices.filter(office => text.includes(office)).slice(0, 5)
}

function extractDocuments(text: string): string[] {
  const documents = ['雇用契約書', '業務内容説明書', '在留カード', '商業登記簿', '賃貸契約', '健康保険資格喪失証明書', '卒業証明書', '成績証明書', '事業計画', '銀行流水']
  return documents.filter(document => text.includes(document)).slice(0, 6)
}

function extractExpertHandoff(steps: string, consequences: string): string[] {
  const text = `${steps}\n${consequences}`
  if (/社労士|年金|健康保険/.test(text)) return ['如果已经逾期、资格丧失证明拿不到，带年金记录和资格丧失资料咨询社労士；涉及在留更新时同时咨询行政書士。']
  if (/登記|法務局|会社/.test(text)) return ['如果涉及役员退任、本店移转或公司状态不清，带商業登記簿、合同和在留卡咨询行政書士或司法書士。']
  return ['如果事实已经逾期、材料边界不清，带现有文书和时间线咨询行政書士等专业人士。']
}

function slugify(value: string): string {
  return value
    .toLowerCase()
    .replace(/[^a-z0-9\u3040-\u30ff\u3400-\u9fff]+/g, '-')
    .replace(/^-+|-+$/g, '')
    .slice(0, 120)
}

function escapeRegExp(value: string): string {
  return value.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')
}
