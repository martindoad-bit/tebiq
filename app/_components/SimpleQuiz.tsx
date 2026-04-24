'use client'
import { useEffect, useState } from 'react'
import Link from 'next/link'

export interface QuizOption {
  text: string
  value: string
}

export interface QuizQuestion {
  id: string
  text: string
  why: string
  options: QuizOption[]
  /** 选这个 value 触发红色 */
  redIf?: string
  /** 选这个 value 触发黄色 */
  yellowIf?: string
  /** 仅当所有条件命中时才显示此题 */
  showIf?: Record<string, string>
  learnMore?: string
}

export interface SimpleQuizConfig {
  visaName: string
  /** 返回签证选择页文案 */
  backLabel?: string
  questions: QuizQuestion[]
  /** 绿色页材料清单（简单 bullet 列表） */
  materials: string[]
  /** 主 CTA 跳转 */
  ctaHref?: string
  ctaLabel?: string
  /** 详细说明页（可选，结果页底部链接） */
  infoHref?: string
  infoLabel?: string
}

type Verdict = 'green' | 'yellow' | 'red'

interface AnsweredItem {
  qid: string
  value: string
}

export default function SimpleQuiz({ config }: { config: SimpleQuizConfig }) {
  const [answers, setAnswers] = useState<AnsweredItem[]>([])
  const [done, setDone] = useState(false)
  const [selectedValue, setSelectedValue] = useState<string | null>(null)
  const [learnMoreOpen, setLearnMoreOpen] = useState(false)

  // 根据 showIf 过滤可见题目（动态计算，因为依赖已答的 answers）
  const answerMap = Object.fromEntries(answers.map(a => [a.qid, a.value]))
  const visibleQuestions = config.questions.filter(q => {
    if (!q.showIf) return true
    return Object.entries(q.showIf).every(([k, v]) => answerMap[k] === v)
  })

  const answered = visibleQuestions.filter(q => answerMap[q.id] !== undefined)
  const currentIndex = answered.length
  const current: QuizQuestion | undefined = visibleQuestions[currentIndex]
  const total = visibleQuestions.length

  useEffect(() => {
    setLearnMoreOpen(false)
    setSelectedValue(null)
  }, [current?.id])

  function handleAnswer(value: string) {
    if (!current || selectedValue !== null) return
    setSelectedValue(value)
    setTimeout(() => {
      const next = [...answers, { qid: current.id, value }]
      setAnswers(next)
      // 用 next 重算可见题
      const map = Object.fromEntries(next.map(a => [a.qid, a.value]))
      const visible = config.questions.filter(q => {
        if (!q.showIf) return true
        return Object.entries(q.showIf).every(([k, v]) => map[k] === v)
      })
      const stillUnanswered = visible.find(q => map[q.id] === undefined)
      if (!stillUnanswered) setDone(true)
    }, 200)
  }

  function handleBack() {
    if (answers.length === 0) return
    setAnswers(answers.slice(0, -1))
    setSelectedValue(null)
  }

  if (done) return <ResultView config={config} answers={answers} />

  if (!current) {
    return (
      <main className="min-h-screen bg-base text-title flex items-center justify-center">
        <div className="text-muted">载入中…</div>
      </main>
    )
  }

  const progressPct = total === 0 ? 0 : Math.round((currentIndex / total) * 100)

  return (
    <main className="min-h-screen bg-base text-title flex flex-col pb-16 md:pb-0">
      <header className="sticky top-0 z-10 bg-card/95 backdrop-blur border-b border-line">
        <div className="max-w-md md:max-w-6xl mx-auto px-4 h-14 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-3" aria-label="TEBIQ 首页">
            <img src="/logo-icon.png" alt="" className="h-12 w-12 rounded-xl" />
            <div>
              <div className="text-xl font-bold text-title leading-none">TEBIQ</div>
              <div className="text-xs text-muted leading-tight mt-0.5">てびき</div>
            </div>
          </Link>
          <Link href="/visa-select" className="text-body hover:text-title text-sm">
            ← {config.backLabel ?? '其他签证'}
          </Link>
        </div>
      </header>

      <div className="bg-highlight px-4 pt-6 pb-4">
        <div className="max-w-md md:max-w-2xl mx-auto">
          <div className="flex justify-between items-center mb-3">
            <span className="text-body text-sm">
              第 <span className="text-primary font-bold text-base">{currentIndex + 1}</span> 题 / 共{' '}
              <span className="text-body font-bold">{total}</span> 题
              <span className="text-muted ml-2 text-xs">{config.visaName}</span>
            </span>
            <button
              onClick={handleBack}
              disabled={answers.length === 0}
              className="text-body hover:text-title disabled:opacity-30 disabled:cursor-not-allowed text-sm font-bold transition-colors px-2 py-1"
            >
              ← 上一题
            </button>
          </div>
          <div className="h-1.5 bg-card rounded-full overflow-hidden">
            <div
              className="h-full bg-primary transition-all duration-500 ease-out"
              style={{ width: `${Math.max(progressPct, 4)}%` }}
            />
          </div>
        </div>
      </div>

      <div className="flex-1 flex items-center justify-center px-4 py-8 md:py-16">
        <div className="max-w-md md:max-w-xl w-full">
          <div className="bg-card rounded-2xl p-6 border border-line shadow-sm mb-3">
            <div className="text-primary text-xs font-bold mb-3">问题 {currentIndex + 1}</div>
            <h2 className="text-xl font-medium leading-relaxed text-title">{current.text}</h2>
          </div>

          <p className="text-body text-sm px-2 leading-relaxed">
            💡 为什么问这个：{current.why}
          </p>

          {current.learnMore && (
            <div className="px-2 mb-5 mt-3">
              <button
                type="button"
                onClick={() => setLearnMoreOpen(o => !o)}
                className="text-primary hover:text-primary-hover text-sm font-bold flex items-center gap-1 transition-colors py-1"
                aria-expanded={learnMoreOpen}
              >
                了解更多 <span className={`text-xs transition-transform ${learnMoreOpen ? 'rotate-180' : ''}`}>▾</span>
              </button>
              {learnMoreOpen && (
                <div className="mt-3 bg-highlight border-l-[3px] border-primary px-4 py-3 rounded-r">
                  <p className="text-title text-sm leading-relaxed whitespace-pre-line">{current.learnMore}</p>
                </div>
              )}
            </div>
          )}
          {!current.learnMore && <div className="mb-5" />}

          <div className={current.options.length === 2 ? 'grid grid-cols-1 md:grid-cols-2 gap-3' : 'space-y-3'}>
            {current.options.map(opt => {
              const isSelected = selectedValue === opt.value
              return (
                <button
                  key={opt.value}
                  onClick={() => handleAnswer(opt.value)}
                  disabled={selectedValue !== null && !isSelected}
                  className={`w-full min-h-[56px] border font-medium py-4 px-4 rounded-xl text-base leading-snug transition-all duration-150 ${
                    isSelected
                      ? 'border-primary bg-primary text-title scale-[0.98] shadow-sm'
                      : 'border-title/20 bg-card text-title hover:bg-highlight'
                  } disabled:cursor-not-allowed`}
                >
                  {opt.text}
                </button>
              )
            })}
          </div>

          <p className="text-center text-muted text-xs mt-6">如实回答才能得到准确判断</p>
        </div>
      </div>
    </main>
  )
}

// ============ Result ============

function visaSlug(visaName: string): string {
  if (visaName.includes('配偶')) return 'haigusha'
  if (visaName.includes('特定')) return 'tokutei'
  if (visaName.includes('定住')) return 'teijusha'
  if (visaName.includes('经营')) return 'keiei'
  if (visaName.includes('永住')) return 'eijusha'
  if (visaName.includes('搬家')) return 'gijinkoku'
  return 'gijinkoku'
}

function judge(config: SimpleQuizConfig, answers: AnsweredItem[]): {
  verdict: Verdict
  triggered: { question: QuizQuestion; severity: 'red' | 'yellow' }[]
} {
  const map = Object.fromEntries(answers.map(a => [a.qid, a.value]))
  const triggered: { question: QuizQuestion; severity: 'red' | 'yellow' }[] = []
  for (const q of config.questions) {
    const v = map[q.id]
    if (v === undefined) continue
    if (q.redIf && v === q.redIf) triggered.push({ question: q, severity: 'red' })
    else if (q.yellowIf && v === q.yellowIf) triggered.push({ question: q, severity: 'yellow' })
  }
  const reds = triggered.filter(t => t.severity === 'red').length
  const yellows = triggered.filter(t => t.severity === 'yellow').length
  const verdict: Verdict = reds > 0 ? 'red' : yellows >= 2 ? 'yellow' : 'green'
  return { verdict, triggered }
}

function ResultView({
  config,
  answers,
}: {
  config: SimpleQuizConfig
  answers: AnsweredItem[]
}) {
  const { verdict, triggered } = judge(config, answers)

  // 把咨询上下文写入 sessionStorage，让 /consultation 显示触发的风险项
  if (typeof window !== 'undefined') {
    try {
      sessionStorage.setItem(
        'tebiq_consultation_ctx',
        JSON.stringify({
          visaType: config.visaName,
          resultColor: verdict,
          triggeredItems: triggered.map(t => t.question.text),
        }),
      )
    } catch {
      /* ignore */
    }
  }

  const consultHref = `/consultation?visa=${encodeURIComponent(visaSlug(config.visaName))}&color=${verdict}`

  const banner =
    verdict === 'green'
      ? { bg: 'from-[#16A34A] to-[#15803D]', icon: '✓', title: '可以开始准备材料', sub: '前置条件均通过' }
      : verdict === 'yellow'
        ? { bg: 'from-primary to-primary-hover', icon: '⚠', title: '需要先解决几个问题', sub: `发现 ${triggered.length} 项需注意` }
        : { bg: 'from-[#DC2626] to-[#B91C1C]', icon: '!', title: '检测到高风险项', sub: `发现 ${triggered.filter(t => t.severity === 'red').length} 项严重风险` }

  return (
    <main className="min-h-screen bg-base text-title pb-16 md:pb-0">
      <header className="sticky top-0 z-10 bg-card/95 backdrop-blur border-b border-line">
        <div className="max-w-md md:max-w-6xl mx-auto px-4 h-14 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-3" aria-label="TEBIQ 首页">
            <img src="/logo-icon.png" alt="" className="h-12 w-12 rounded-xl" />
            <div>
              <div className="text-xl font-bold text-title leading-none">TEBIQ</div>
              <div className="text-xs text-muted leading-tight mt-0.5">てびき</div>
            </div>
          </Link>
          <Link href="/visa-select" className="text-body hover:text-title text-sm">重新选择签证</Link>
        </div>
      </header>

      <div className={`bg-gradient-to-b ${banner.bg} text-white px-4 pt-12 pb-10 text-center`}>
        <div className="inline-block bg-white/20 text-white text-xs font-bold px-3 py-1 rounded-full mb-4">
          TEBIQ · {config.visaName}自查
        </div>
        <div className="text-5xl mb-3">{banner.icon}</div>
        <h1 className="text-2xl md:text-3xl font-bold mb-2 text-white">{banner.title}</h1>
        <p className="text-white/90 text-sm leading-relaxed px-4">{banner.sub}</p>
      </div>

      <div className="max-w-md md:max-w-3xl mx-auto px-4 py-6">
        {verdict === 'green' ? (
          <GreenContent config={config} />
        ) : (
          <RiskContent config={config} triggered={triggered} verdict={verdict} />
        )}

        {/* CTA */}
        <Link
          href={config.ctaHref ?? consultHref}
          className={`mt-6 flex items-center justify-center w-full min-h-[60px] font-bold py-4 rounded-xl text-base transition-all ${
            verdict === 'red'
              ? 'bg-[#DC2626] hover:bg-[#B91C1C] text-white'
              : 'bg-primary hover:bg-primary-hover text-title'
          }`}
        >
          {config.ctaLabel ?? '联系书士咨询'} →
        </Link>

        {config.infoHref && (
          <Link
            href={config.infoHref}
            className="mt-4 block text-center text-primary hover:text-primary-hover text-sm font-bold underline underline-offset-4"
          >
            {config.infoLabel ?? '查看更详细的说明'} →
          </Link>
        )}

        <div className="mt-8 mb-12 flex flex-col items-center gap-3">
          <Link href="/knowledge" className="text-primary hover:text-primary-hover text-sm font-bold underline underline-offset-4">
            了解签证基础知识 →
          </Link>
          <button
            onClick={() => window.location.reload()}
            className="text-muted text-sm hover:text-body underline underline-offset-4"
          >
            重新自查
          </button>
        </div>
      </div>
    </main>
  )
}

function GreenContent({ config }: { config: SimpleQuizConfig }) {
  return (
    <>
      <div className="bg-card border border-line rounded-2xl p-5 mb-4 shadow-sm">
        <h2 className="text-primary font-bold text-base mb-2">{config.visaName}续签材料清单</h2>
        <p className="text-body text-sm leading-relaxed">
          以下是续签所需的标准材料。建议提前 2 个月开始准备。
        </p>
      </div>

      <div className="bg-card border border-line rounded-2xl shadow-sm overflow-hidden">
        <ul>
          {config.materials.map((m, i) => (
            <li key={i} className="flex items-center gap-3 px-5 py-3 border-t border-line first:border-t-0">
              <span className="inline-flex items-center justify-center w-5 h-5 border border-line rounded text-transparent">
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                  <polyline points="20 6 9 17 4 12" />
                </svg>
              </span>
              <span className="text-title text-sm">{m}</span>
            </li>
          ))}
        </ul>
      </div>
    </>
  )
}

function RiskContent({
  config,
  triggered,
  verdict,
}: {
  config: SimpleQuizConfig
  triggered: { question: QuizQuestion; severity: 'red' | 'yellow' }[]
  verdict: Verdict
}) {
  const reds = triggered.filter(t => t.severity === 'red')
  const yellows = triggered.filter(t => t.severity === 'yellow')

  return (
    <>
      {verdict === 'red' && (
        <div className="bg-[#FEE2E2] border border-[#DC2626] rounded-2xl p-5 mb-6">
          <p className="text-[#92400E] text-sm leading-relaxed font-bold">
            下列任何一项都可能直接导致续签被拒。强烈建议先咨询持牌行政书士。
          </p>
        </div>
      )}

      <div className="space-y-3 mb-6">
        {reds.map(t => (
          <RiskCard key={t.question.id} item={t.question} accent="red" />
        ))}
        {yellows.map(t => (
          <RiskCard key={t.question.id} item={t.question} accent="yellow" />
        ))}
      </div>

      <CollapsibleMaterials config={config} />
    </>
  )
}

function RiskCard({ item, accent }: { item: QuizQuestion; accent: 'red' | 'yellow' }) {
  const cls = accent === 'red' ? 'border-[#DC2626]' : 'border-primary'
  const label = accent === 'red' ? '高风险' : '需注意'
  const labelCls = accent === 'red' ? 'text-[#DC2626]' : 'text-primary'
  return (
    <div className={`bg-card border-l-4 ${cls} border-y border-r border-line rounded-r-xl p-4 shadow-sm`}>
      <div className={`text-xs font-bold mb-1 ${labelCls}`}>{label}</div>
      <div className="text-title text-base font-bold leading-snug mb-2">{item.text}</div>
      {item.learnMore && (
        <p className="text-body text-sm leading-relaxed whitespace-pre-line">{item.learnMore}</p>
      )}
    </div>
  )
}

function CollapsibleMaterials({ config }: { config: SimpleQuizConfig }) {
  const [open, setOpen] = useState(false)
  return (
    <div className="mt-6">
      <button
        type="button"
        onClick={() => setOpen(o => !o)}
        className="w-full flex items-center justify-between bg-card border border-line hover:border-primary rounded-2xl px-5 py-4 text-left transition-colors shadow-sm"
        aria-expanded={open}
      >
        <div>
          <div className="text-primary font-bold text-base">无论结果如何，以下材料都需要准备</div>
          <div className="text-muted text-xs mt-1">{config.visaName}续签所需的标准材料 · 共 {config.materials.length} 项</div>
        </div>
        <span className={`text-muted transition-transform ${open ? 'rotate-180' : ''}`}>▾</span>
      </button>
      {open && (
        <div className="mt-3 bg-card border border-line rounded-2xl shadow-sm overflow-hidden">
          <ul>
            {config.materials.map((m, i) => (
              <li key={i} className="flex items-center gap-3 px-5 py-3 border-t border-line first:border-t-0">
                <span className="inline-flex items-center justify-center w-5 h-5 border border-line rounded" />
                <span className="text-title text-sm">{m}</span>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  )
}
