'use client'

import { useMemo, useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import Button from '@/app/_components/v5/Button'

interface Question {
  id?: string
  text?: string
  type?: string
}

interface Props {
  articleId: string
  visaType: string
  dimensionKey: string
  title: string
  priority: string | null
  expiryDays: number | null
  questions: Question[]
  resultLogic: Record<string, string>
  resultActions: Record<string, string[]>
}

type ResultLevel = 'green' | 'yellow' | 'red'

const VALUE_LABELS: Record<string, string> = {
  yes: '是',
  no: '否',
  unknown: '不确定',
  na: '不适用',
  under_3: '3个月以内',
  '3_to_6': '3-6个月',
  '6_to_12': '6-12个月',
  over_12: '12个月以上',
  under_30: '30天内',
  '30_to_90': '30-90天',
  '90_to_120': '90-120天',
  over_120: '120天以上',
  under_300: '300万以下',
  '300_to_500': '300-500万',
  over_500: '500万以上',
  full_time: '正社员',
  contract: '契约社员',
  dispatch: '派遣',
  trial: '试用期',
  gyomu_itaku: '业务委托',
  freelance: '自由职业',
}

export default function DimensionCheckClient({
  articleId,
  visaType,
  dimensionKey,
  title,
  priority,
  expiryDays,
  questions,
  resultLogic,
  resultActions,
}: Props) {
  const router = useRouter()
  const [answers, setAnswers] = useState<Record<string, string>>({})
  const [busy, setBusy] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [savedLevel, setSavedLevel] = useState<ResultLevel | null>(null)
  const normalizedQuestions = questions.filter(q => q.id && q.text)
  const complete = normalizedQuestions.every(q => answers[q.id as string])
  const result = useMemo(() => complete ? evaluateResult(resultLogic, answers) : null, [answers, complete, resultLogic])

  async function submit() {
    if (!complete || !result || busy) return
    setBusy(true)
    setError(null)
    try {
      const actions = resultActions[result] ?? []
      const res = await fetch('/api/check/dimension', {
        method: 'POST',
        headers: { 'content-type': 'application/json' },
        body: JSON.stringify({
          articleId,
          visaType,
          dimensionKey,
          title,
          expiryDays,
          answers,
          resultLevel: result,
          status: result === 'green' ? 'checked' : 'needs_action',
          reason: actions[0] ?? (result === 'green' ? '已查' : '递交前确认'),
          actionLabel: result === 'green' ? '已查' : '递交前确认',
          riskFlag: priority === 'must_see' ? 'recommended' : null,
        }),
      })
      if (!res.ok) throw new Error('save_failed')
      setSavedLevel(result)
      router.refresh()
    } catch {
      setError('保存失败')
    } finally {
      setBusy(false)
    }
  }

  return (
    <div className="mt-4 grid gap-3">
      {normalizedQuestions.map(question => {
        const id = question.id as string
        return (
          <section key={id} className="rounded-card border border-hairline bg-surface px-4 py-4 shadow-card">
            <h2 className="text-[13px] font-medium leading-snug text-ink">{question.text}</h2>
            <div className="mt-3 grid gap-2">
              {optionsForQuestion(question, resultLogic).map(option => (
                <button
                  key={option}
                  type="button"
                  onClick={() => setAnswers(current => ({ ...current, [id]: option }))}
                  className={`min-h-[38px] rounded-btn border px-3 text-left text-[12px] font-medium ${
                    answers[id] === option
                      ? 'border-ink bg-ink text-white'
                      : 'border-hairline bg-canvas text-slate'
                  }`}
                >
                  {VALUE_LABELS[option] ?? option}
                </button>
              ))}
            </div>
          </section>
        )
      })}

      {result && (
        <section className="rounded-card border border-hairline bg-surface px-4 py-4 shadow-card">
          <h2 className="text-[13px] font-medium text-ink">结果</h2>
          <p className="mt-2 text-[12px] leading-[1.65] text-ash">
            {result === 'green' ? '已查' : '需处理'}
          </p>
          {(resultActions[result] ?? []).length > 0 && (
            <ul className="mt-3 list-disc space-y-1 pl-4 text-[12px] leading-[1.65] text-slate">
              {(resultActions[result] ?? []).slice(0, 3).map(item => <li key={item}>{item}</li>)}
            </ul>
          )}
        </section>
      )}

      {error && <p className="text-center text-[12px] text-danger">{error}</p>}
      {savedLevel ? (
        <div className="grid gap-2">
          <p className="text-center text-[12px] text-success">已回写清单状态</p>
          <Link href={`/check/${visaType}`}><Button>返回清单</Button></Link>
        </div>
      ) : (
        <Button onClick={submit} disabled={!complete || busy}>
          {busy ? '保存中' : '保存结果'}
        </Button>
      )}
    </div>
  )
}

function optionsForQuestion(question: Question, resultLogic: Record<string, string>): string[] {
  if (question.type === 'yes_no') return ['yes', 'no']
  if (question.type === 'yes_no_unknown') return ['yes', 'no', 'unknown']
  if (question.type === 'yes_no_unknown_na') return ['yes', 'no', 'unknown', 'na']

  const id = question.id
  if (!id) return ['yes', 'no', 'unknown']
  const expr = Object.values(resultLogic).join(' ')
  const tokens = new Set<string>()
  for (const match of Array.from(expr.matchAll(new RegExp(`${id}\\s*(?:==|!=)\\s*([a-zA-Z0-9_]+)`, 'g')))) {
    tokens.add(match[1])
  }
  for (const match of Array.from(expr.matchAll(new RegExp(`${id}\\s+IN\\s+\\[([^\\]]+)\\]`, 'g')))) {
    for (const token of match[1].split(',')) {
      const cleaned = token.trim()
      if (cleaned) tokens.add(cleaned)
    }
  }
  return tokens.size > 0 ? Array.from(tokens) : ['yes', 'no', 'unknown']
}

function evaluateResult(logic: Record<string, string>, answers: Record<string, string>): ResultLevel {
  if (evaluateExpression(logic.red, answers)) return 'red'
  if (evaluateExpression(logic.yellow, answers)) return 'yellow'
  if (evaluateExpression(logic.green, answers)) return 'green'
  return 'yellow'
}

function evaluateExpression(expression: string | undefined, answers: Record<string, string>): boolean {
  if (!expression) return false
  const js = expression
    .replace(/\b(q\d+)\s+IN\s+\[([^\]]+)\]/g, (_, qid: string, values: string) => {
      const list = values.split(',').map(v => JSON.stringify(v.trim())).join(',')
      return `[${list}].includes(ans[${JSON.stringify(qid)}])`
    })
    .replace(/\b(q\d+)\s*==\s*([a-zA-Z0-9_]+)/g, (_, qid: string, value: string) => {
      return `ans[${JSON.stringify(qid)}] === ${JSON.stringify(value)}`
    })
    .replace(/\b(q\d+)\s*!=\s*([a-zA-Z0-9_]+)/g, (_, qid: string, value: string) => {
      return `ans[${JSON.stringify(qid)}] !== ${JSON.stringify(value)}`
    })
    .replace(/\bAND\b/g, '&&')
    .replace(/\bOR\b/g, '||')
  try {
    return Boolean(Function('ans', `"use strict"; return (${js})`)(answers))
  } catch {
    return false
  }
}
