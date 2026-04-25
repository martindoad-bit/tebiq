'use client'
import { useState } from 'react'
import Link from 'next/link'
import type {
  AnsweredItem,
  JudgeResult,
  QuizBank,
  TriggeredItem,
  Verdict,
} from '@/lib/check/types'

interface QuizResultViewProps {
  bank: QuizBank
  history: AnsweredItem[]
  result: JudgeResult
  /** 顶部返回链接（默认 /visa-select） */
  backHref?: string
  backLabel?: string
}

export default function QuizResultView({
  bank,
  history,
  result,
  backHref = '/visa-select',
  backLabel = '重新选择签证',
}: QuizResultViewProps) {
  const { verdict, triggered } = result

  // 写入咨询上下文
  if (typeof window !== 'undefined') {
    try {
      sessionStorage.setItem(
        'tebiq_consultation_ctx',
        JSON.stringify({
          visaType: bank.visaName,
          resultColor: verdict,
          triggeredItems: triggered.map(t => t.triggerLabel),
        }),
      )
    } catch {
      /* ignore */
    }
  }

  const consultHref = `/consultation?visa=${encodeURIComponent(
    bank.visa,
  )}&color=${verdict}`

  void history // history 暂未在此视图内使用，但保留以便未来扩展

  const banner =
    verdict === 'green'
      ? {
          bg: 'from-[#16A34A] to-[#15803D]',
          icon: '✓',
          title: '可以开始准备材料',
          sub: '前置条件均通过',
        }
      : verdict === 'yellow'
        ? {
            bg: 'from-primary to-primary-hover',
            icon: '⚠',
            title: '需要先解决几个问题',
            sub: `发现 ${triggered.length} 项需注意`,
          }
        : {
            bg: 'from-[#DC2626] to-[#B91C1C]',
            icon: '!',
            title: '检测到高风险项',
            sub: `发现 ${triggered.filter(t => t.severity === 'red').length} 项严重风险`,
          }

  return (
    <main className="min-h-screen bg-base text-title pb-16 md:pb-0">
      <header className="sticky top-0 z-10 bg-card/95 backdrop-blur border-b border-line">
        <div className="max-w-md md:max-w-6xl mx-auto px-4 h-14 flex items-center justify-between">
          <Link
            href="/"
            className="flex items-center gap-3"
            aria-label="TEBIQ 首页"
          >
            <img src="/logo-icon.png" alt="" className="h-12 w-12 rounded-xl" />
            <div>
              <div className="text-xl font-bold text-title leading-none">
                TEBIQ
              </div>
              <div className="text-xs text-muted leading-tight mt-0.5">
                てびき
              </div>
            </div>
          </Link>
          <Link href={backHref} className="text-body hover:text-title text-sm">
            {backLabel}
          </Link>
        </div>
      </header>

      <div
        className={`bg-gradient-to-b ${banner.bg} text-white px-4 pt-12 pb-10 text-center`}
      >
        <div className="inline-block bg-white/20 text-white text-xs font-bold px-3 py-1 rounded-full mb-4">
          TEBIQ · {bank.visaName}自查
        </div>
        <div className="text-5xl mb-3">{banner.icon}</div>
        <h1 className="text-2xl md:text-3xl font-bold mb-2 text-white">
          {banner.title}
        </h1>
        <p className="text-white/90 text-sm leading-relaxed px-4">{banner.sub}</p>
      </div>

      <div className="max-w-md md:max-w-3xl mx-auto px-4 py-6">
        {verdict === 'green' ? (
          <GreenContent bank={bank} />
        ) : (
          <RiskContent bank={bank} triggered={triggered} verdict={verdict} />
        )}

        <Link
          href={bank.ctaHref ?? consultHref}
          className={`mt-6 flex items-center justify-center w-full min-h-[60px] font-bold py-4 rounded-xl text-base transition-all ${
            verdict === 'red'
              ? 'bg-[#DC2626] hover:bg-[#B91C1C] text-white'
              : 'bg-primary hover:bg-primary-hover text-title'
          }`}
        >
          {bank.ctaLabel ?? '联系书士咨询'} →
        </Link>

        {bank.infoHref && (
          <Link
            href={bank.infoHref}
            className="mt-4 block text-center text-primary hover:text-primary-hover text-sm font-bold underline underline-offset-4"
          >
            {bank.infoLabel ?? '查看更详细的说明'} →
          </Link>
        )}

        <div className="mt-8 mb-12 flex flex-col items-center gap-3">
          <Link
            href="/knowledge"
            className="text-primary hover:text-primary-hover text-sm font-bold underline underline-offset-4"
          >
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

function GreenContent({ bank }: { bank: QuizBank }) {
  return (
    <>
      <div className="bg-card border border-line rounded-2xl p-5 mb-4 shadow-sm">
        <h2 className="text-primary font-bold text-base mb-2">
          {bank.visaName}续签材料清单
        </h2>
        <p className="text-body text-sm leading-relaxed">
          以下是续签所需的标准材料。建议提前 2 个月开始准备。
        </p>
      </div>

      <div className="bg-card border border-line rounded-2xl shadow-sm overflow-hidden">
        <ul>
          {bank.materials.map((m, i) => (
            <li
              key={i}
              className="flex items-center gap-3 px-5 py-3 border-t border-line first:border-t-0"
            >
              <span className="inline-flex items-center justify-center w-5 h-5 border border-line rounded text-transparent">
                <svg
                  width="12"
                  height="12"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="3"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
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
  bank,
  triggered,
  verdict,
}: {
  bank: QuizBank
  triggered: TriggeredItem[]
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
          <RiskCard key={t.id} item={t} accent="red" />
        ))}
        {yellows.map(t => (
          <RiskCard key={t.id} item={t} accent="yellow" />
        ))}
      </div>

      <CollapsibleMaterials bank={bank} />
    </>
  )
}

function RiskCard({
  item,
  accent,
}: {
  item: TriggeredItem
  accent: 'red' | 'yellow'
}) {
  const cls = accent === 'red' ? 'border-[#DC2626]' : 'border-primary'
  const label = accent === 'red' ? '高风险' : '需注意'
  const labelCls = accent === 'red' ? 'text-[#DC2626]' : 'text-primary'
  return (
    <div
      className={`bg-card border-l-4 ${cls} border-y border-r border-line rounded-r-xl p-4 shadow-sm`}
    >
      <div className={`text-xs font-bold mb-1 ${labelCls}`}>{label}</div>
      <div className="text-title text-base font-bold leading-snug mb-2">
        {item.triggerLabel}
      </div>
      {item.fixHint && (
        <p className="text-body text-sm leading-relaxed whitespace-pre-line">
          {item.fixHint}
        </p>
      )}
    </div>
  )
}

function CollapsibleMaterials({ bank }: { bank: QuizBank }) {
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
          <div className="text-primary font-bold text-base">
            无论结果如何，以下材料都需要准备
          </div>
          <div className="text-muted text-xs mt-1">
            {bank.visaName}续签所需的标准材料 · 共 {bank.materials.length} 项
          </div>
        </div>
        <span
          className={`text-muted transition-transform ${open ? 'rotate-180' : ''}`}
        >
          ▾
        </span>
      </button>
      {open && (
        <div className="mt-3 bg-card border border-line rounded-2xl shadow-sm overflow-hidden">
          <ul>
            {bank.materials.map((m, i) => (
              <li
                key={i}
                className="flex items-center gap-3 px-5 py-3 border-t border-line first:border-t-0"
              >
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
