'use client'
/**
 * QuizResultView — 自查结果（v5 screen 08）
 *
 * 用于「非 gijinkoku」签证的内联结果（gijinkoku 走 /check/result）。
 * 视觉源 docs/prototype/v5-mockup.html 1597-1635。
 */
import { useState } from 'react'
import Link from 'next/link'
import { AlertTriangle, CheckCircle2, ClipboardList, Gift, ListChecks } from 'lucide-react'
import AppShell from './v5/AppShell'
import AppBar from './v5/AppBar'
import Button from './v5/Button'
import ComplianceFooter from './v5/ComplianceFooter'
import TrackOnMount from './v5/TrackOnMount'
import { trackClient } from '@/lib/analytics/client'
import { EVENT } from '@/lib/analytics/events'
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
  /** 顶部返回链接（默认 /check/select） */
  backHref?: string
  backLabel?: string
}

interface SeverityVisual {
  bg: string // tailwind bg-* for hero circle
  text: string // tailwind text-* for severity title
  symbol: string
  label: string
  desc: string
}

function severityVisual(verdict: Verdict, riskCount: number): SeverityVisual {
  if (verdict === 'green') {
    return {
      bg: 'bg-success',
      text: 'text-success',
      symbol: '✓',
      label: '低风险',
      desc: '当前未发现明显风险点，按常规材料准备即可',
    }
  }
  if (verdict === 'yellow') {
    return {
      bg: 'bg-accent',
      text: 'text-accent',
      symbol: '!',
      label: '中风险',
      desc: `你的情况存在一些需要注意的风险点（${riskCount} 项）`,
    }
  }
  return {
    bg: 'bg-danger',
    text: 'text-danger',
    symbol: '✕',
    label: '高风险',
    desc: `检测到 ${riskCount} 项严重风险，建议立即咨询专家`,
  }
}

export default function QuizResultView({
  bank,
  history,
  result,
  backHref = '/check/select',
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

  void history // 暂未在此视图内使用，保留供未来扩展

  const reds = triggered.filter(t => t.severity === 'red')
  const yellows = triggered.filter(t => t.severity === 'yellow')
  const riskCount = verdict === 'red' ? reds.length : triggered.length
  const sv = severityVisual(verdict, riskCount)

  // 「主要风险点」按 severity 排序
  const riskItems = [...reds, ...yellows].map(t => t.triggerLabel)
  // 「建议行动」从 triggered 取 fixHint
  const advices = [...reds, ...yellows]
    .map(t => t.fixHint)
    .filter((s): s is string => !!s)

  return (
    <AppShell appBar={<AppBar title="自查结果" back={backHref} />}>
      <TrackOnMount
        event={EVENT.QUIZ_COMPLETED}
        payload={{
          visa: bank.visa,
          verdict: result.verdict,
          triggeredCount: result.triggered.length,
        }}
      />
      <div className="bg-accent-2 rounded-card border border-accent/25 px-4 py-[18px] text-center mt-3 shadow-card">
        <div
          className={`mx-auto w-[38px] h-[38px] rounded-full ${sv.bg} text-white text-[22px] font-medium flex items-center justify-center mb-3`}
          aria-hidden="true"
        >
          {sv.symbol}
        </div>
        <div className={`${sv.text} text-[22px] font-medium leading-tight`}>
          {sv.label}
        </div>
        <p className="text-ash text-[11.5px] mt-2 leading-relaxed">{sv.desc}</p>
        <div className="text-ash text-[10px] mt-2">
          {bank.visaName} · 自查
        </div>
      </div>

      {verdict === 'green' ? (
        <GreenContent bank={bank} />
      ) : (
        <>
          {riskItems.length > 0 && (
            <ResultBlock title="主要风险点" items={riskItems} />
          )}
          {advices.length > 0 && (
            <ResultBlock title="建议行动" items={advices} />
          )}
          <CollapsibleMaterials bank={bank} />
        </>
      )}

      <div className="mt-5">
        <Button onClick={() => alert('保存到「我的档案」功能即将开放')}>
          保存结果到我的档案
        </Button>
      </div>
      <Link
        href="/invite"
        onClick={() =>
          trackClient(EVENT.INVITE_CTA_CLICK, {
            source: 'quiz_result',
            visa: bank.visa,
            verdict: result.verdict,
          })
        }
        className="mt-2 flex items-start gap-3 rounded-card border border-accent/35 bg-accent-2/70 px-4 py-3 shadow-card transition-colors hover:bg-accent-2"
      >
        <span className="flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-[12px] bg-surface text-ink shadow-soft">
          <Gift size={17} strokeWidth={1.55} />
        </span>
        <span className="min-w-0 flex-1">
          <span className="block text-[13px] font-medium leading-snug text-ink">
            邀请朋友一起做自查
          </span>
          <span className="mt-1 block text-[11px] leading-[1.55] text-ash">
            朋友注册后，双方各得 7 天 basic 会员体验。
          </span>
        </span>
      </Link>

      <ComplianceFooter />

      <div className="mt-6 mb-6 flex flex-col items-center gap-3">
        <Link
          href="/knowledge"
          className="text-[12px] text-ink hover:text-accent underline underline-offset-2"
        >
          了解签证基础知识 →
        </Link>
      </div>
    </AppShell>
  )
}

function ResultBlock({ title, items }: { title: string; items: string[] }) {
  const Icon = title.includes('建议') ? ListChecks : AlertTriangle
  return (
    <section className="mt-3 rounded-card border border-hairline bg-surface px-4 py-3 shadow-card">
      <h3 className="mb-2 flex items-center gap-2 text-[13px] font-medium text-ink">
        <Icon size={15} strokeWidth={1.55} />
        {title}
      </h3>
      <ul className="space-y-1.5">
        {items.map((line, i) => (
          <li
            key={i}
            className="relative flex items-start pl-3 text-[12px] leading-[1.6] text-slate"
          >
            <span
              className="absolute left-0 top-[10px] w-1.5 h-1.5 rounded-full bg-accent"
              aria-hidden="true"
            />
            <span className="ml-2">{line}</span>
          </li>
        ))}
      </ul>
    </section>
  )
}

function GreenContent({ bank }: { bank: QuizBank }) {
  return (
    <section className="mt-3 bg-surface border border-hairline rounded-card p-4 shadow-card">
      <h3 className="mb-2 flex items-center gap-2 text-[13px] font-medium text-ink">
        <CheckCircle2 size={15} strokeWidth={1.55} />
        {bank.visaName} 续签材料清单
      </h3>
      <p className="text-ash text-[11.5px] mb-3">
        以下是续签所需的标准材料，建议提前 2 个月开始准备。
      </p>
      <ul className="space-y-1.5">
        {bank.materials.map((m, i) => (
          <li key={i} className="flex items-start gap-2 text-[12px] text-slate leading-[1.6]">
            <CheckCircle2 size={13} strokeWidth={1.55} className="mt-[3px] flex-shrink-0 text-success" />
            <span>{m}</span>
          </li>
        ))}
      </ul>
    </section>
  )
}

function CollapsibleMaterials({ bank }: { bank: QuizBank }) {
  const [open, setOpen] = useState(false)
  return (
    <div className="mt-3">
      <button
        type="button"
        onClick={() => setOpen(o => !o)}
        className="w-full flex items-center justify-between bg-surface border border-hairline hover:border-accent rounded-card px-[14px] py-[12px] text-left shadow-card transition-colors"
        aria-expanded={open}
      >
        <div className="flex items-start gap-3">
          <span className="mt-0.5 flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-[10px] bg-accent-2 text-ink">
            <ClipboardList size={16} strokeWidth={1.55} />
          </span>
          <div>
          <div className="text-[13px] text-ink font-medium leading-snug">
            无论结果如何，以下材料都需要准备
          </div>
          <div className="text-ash text-[10.5px] mt-0.5">
            {bank.visaName} 续签所需 · 共 {bank.materials.length} 项
          </div>
          </div>
        </div>
        <span
          className={`text-haze transition-transform text-[12px] ${
            open ? 'rotate-180' : ''
          }`}
        >
          ▾
        </span>
      </button>
      {open && (
        <ul className="mt-2 bg-surface border border-hairline rounded-card overflow-hidden shadow-card">
          {bank.materials.map((m, i) => (
            <li
              key={i}
              className="flex items-start gap-2 px-4 py-2 border-t border-hairline first:border-t-0 text-[12px] text-slate leading-[1.6]"
            >
              <span className="text-haze flex-shrink-0 mt-[2px]">·</span>
              <span>{m}</span>
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}

export type { TriggeredItem }
