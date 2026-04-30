import { ANSWER_BOUNDARY_NOTE, type ActionAnswer, type AnswerResult } from './types'

const WINDOW_KEYWORDS = [
  '市役所',
  '区役所',
  '町村役場',
  '入管',
  '出入国在留管理局',
  '法務局',
  '税務署',
  '都税事務所',
  '県税事務所',
  '年金事務所',
  'ハローワーク',
  '銀行',
  '会社',
  '学校',
  '行政書士',
  '司法書士',
  '税理士',
  '社会保険労務士',
]

const DOCUMENT_KEYWORDS = [
  '在留カード',
  'パスポート',
  '住民票',
  '課税証明書',
  '納税証明書',
  '賃貸契約書',
  '雇用契約書',
  '在職証明書',
  '給与明細',
  '源泉徴収票',
  '登記事項証明書',
  '異動届',
  '届出書',
  '看板写真',
  '内部写真',
  '銀行流水',
  '納付記録',
  '完納証明書',
  '理由書',
]

const TIMING_PATTERN = /(?:\d+\s*(?:日|天|ヶ月|个月|か月|年)|直近\s*\d+\s*年|[０-９0-9]+\s*日以内|期限|到期|更新前|申請前|递交前|14\s*日内|90\s*日)/

export function formatActionAnswer(answer: AnswerResult): ActionAnswer {
  const sourceText = joinedAnswerText(answer)
  const firstScreen = markdownToPlain(answer.first_screen_answer ?? '')
  const whyNot = markdownToPlain(answer.why_not_simple_answer ?? '')
  const expert = flattenExpertHandoff(answer)
  const officeRelocation = /事務所|办公室/.test(sourceText) && /搬迁|移転|搬家/.test(sourceText)

  const conclusion = firstScreenSection(firstScreen, '结论')
    ?? firstSentence(firstScreen)
    ?? firstSentence(answer.summary)
    ?? answer.title

  const nextFromFirstScreen = listFromFirstScreen(firstScreen, '下一步')
  const confirmFromFirstScreen = listFromFirstScreen(firstScreen, '先确认')
  const nextSteps = unique([
    ...nextFromFirstScreen,
    ...answer.next_steps,
    ...extractActionLines(answer.sections),
  ]).slice(0, 6)

  return {
    conclusion: cleanLine(conclusion),
    what_to_do: nonEmpty(
      unique([
        ...nextSteps,
        ...(officeRelocation ? ['把新旧地址、租赁合同、照片、登记和届出记录归档。'] : []),
      ]).slice(0, 7),
      answer.answer_type === 'cannot_determine'
        ? ['先补齐关键事实，再决定窗口和材料顺序。']
        : ['先按原文书或手续要求确认窗口、期限和材料。'],
    ),
    where_to_go: nonEmpty(extractKeywordLines(sourceText, WINDOW_KEYWORDS), ['相关官方窗口']),
    how_to_do: nonEmpty(
      unique([...confirmFromFirstScreen, ...extractHowTo(answer.sections), ...answer.next_steps]).slice(0, 5),
      ['把日期、窗口、材料、处理记录放到同一条时间线。'],
    ),
    documents_needed: nonEmpty(
      unique([
        ...extractKeywordLines(sourceText, DOCUMENT_KEYWORDS),
        ...(officeRelocation ? ['賃貸契約書（法人名义、事業用用途）', '新办公室照片、看板照片、使用实态材料'] : []),
      ]).slice(0, 7),
      ['相关通知原件或截图', '在留卡', '能证明事实的材料'],
    ),
    deadline_or_timing: nonEmpty(extractTiming(sourceText), ['按官方文书上的期限处理。']),
    consequences: nonEmpty(
      unique([
        ...extractConsequenceLines(answer.sections),
        ...splitUsefulLines(whyNot).filter(line => /后果|不利|不许|不許|失效|记录|超期|上陸|退去|出国|材料不足/.test(line)),
        ...(officeRelocation ? ['不办可能导致届出义务问题、材料不一致、下次更新说明变弱或产生不利影响。'] : []),
      ]).slice(0, 4),
      ['不处理时，可能造成材料不一致、期限错过或后续说明变弱。'],
    ),
    expert_handoff: nonEmpty(
      unique([
        ...expert,
        ...(officeRelocation ? ['经营管理签办公室变更、共用/自宅兼用或更新前 6 个月内，带租约、照片和登记材料咨询行政書士。'] : []),
      ]),
      answer.review_status === 'needs_expert'
        ? ['涉及个别事实、期限或不利记录时，带材料咨询行政書士等专业人士。']
        : ['材料不一致、期限接近或官方窗口说明不清时，带材料咨询专业人士。'],
    ),
    boundary_note: answer.boundary_note ?? ANSWER_BOUNDARY_NOTE,
  }
}

function joinedAnswerText(answer: AnswerResult): string {
  return [
    answer.title,
    answer.summary,
    answer.first_screen_answer,
    answer.why_not_simple_answer,
    ...answer.sections.flatMap(section => [section.heading, section.body]),
    ...answer.next_steps,
    ...flattenExpertHandoff(answer),
  ].filter(Boolean).join('\n')
}

function flattenExpertHandoff(answer: AnswerResult): string[] {
  const handoff = answer.expert_handoff
  if (!handoff) return []
  return unique([
    ...handoff.trigger,
    handoff.who ? `咨询对象：${handoff.who}` : '',
    handoff.why ? handoff.why : '',
  ].filter(Boolean))
}

function firstScreenSection(text: string, label: string): string | null {
  if (!text) return null
  const match = text.match(new RegExp(`${label}[：:]\\s*([^\\n]+(?:\\n(?!\\S+[：:])[^\\n]+)*)`))
  return match?.[1]?.trim() || null
}

function listFromFirstScreen(text: string, label: string): string[] {
  const section = firstScreenSection(text, label)
  if (!section) return []
  return splitUsefulLines(section)
}

function extractActionLines(sections: AnswerResult['sections']): string[] {
  return sections
    .filter(section => /今天|动作|下一步|处理|可以做|先确认|材料/.test(section.heading))
    .flatMap(section => splitUsefulLines(section.body))
}

function extractHowTo(sections: AnswerResult['sections']): string[] {
  return sections
    .filter(section => /今天|怎么|流程|路径|步骤|先确认|材料/.test(section.heading))
    .flatMap(section => splitUsefulLines(section.body))
}

function extractConsequenceLines(sections: AnswerResult['sections']): string[] {
  return sections
    .filter(section => /不能|后果|不处理|边界|为什么不能/.test(section.heading))
    .flatMap(section => splitUsefulLines(section.body))
}

function extractKeywordLines(text: string, keywords: string[]): string[] {
  const lines = splitUsefulLines(text)
  const matches = lines.filter(line => keywords.some(keyword => line.includes(keyword)))
  if (matches.length > 0) return unique(matches).slice(0, 6)
  return keywords.filter(keyword => text.includes(keyword)).slice(0, 6)
}

function extractTiming(text: string): string[] {
  const lines = splitUsefulLines(text)
  const matchedLines = lines.filter(line => TIMING_PATTERN.test(line))
  if (matchedLines.length > 0) return unique(matchedLines).slice(0, 5)
  const matches = text.match(new RegExp(TIMING_PATTERN.source, 'g')) ?? []
  return unique(matches.map(cleanLine)).slice(0, 5)
}

function splitUsefulLines(value: string): string[] {
  return markdownToPlain(value)
    .split(/\n|。|；|;/)
    .map(cleanLine)
    .filter(line => line.length >= 4)
}

function firstSentence(value: string): string | null {
  return splitUsefulLines(value)[0] ?? null
}

function markdownToPlain(value: string): string {
  return value
    .replace(/\*\*([^*]+)\*\*/g, '$1')
    .replace(/^\s*[-*]\s+/gm, '')
    .replace(/`([^`]+)`/g, '$1')
    .trim()
}

function cleanLine(value: string): string {
  return value
    .replace(/^\s*(结论|先确认|下一步|边界)\s*[：:]\s*/, '')
    .replace(/\s+/g, ' ')
    .trim()
}

function nonEmpty(values: string[], fallback: string[]): string[] {
  const cleaned = unique(values.map(cleanLine).filter(Boolean))
  return cleaned.length > 0 ? cleaned : fallback
}

function unique(values: string[]): string[] {
  return Array.from(new Set(values.map(cleanLine).filter(Boolean)))
}
