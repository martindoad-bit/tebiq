'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'

// TEBIQ Internal Preview — Track D Alpha (Issue #21).
//
// Two entry surfaces, both submitting to the existing POST
// /api/questions route and redirecting to /answer/{id} on success.
// We DO NOT embed the answer here — the goal per Work Packet is for
// the reviewer to experience the full /answer/[id] page after a
// realistic submission.
//
// 10 P0 scenarios hardcoded below. Selected from
// EVAL_ROUND1_SAMPLE_PACK.md §高风险方向判断题 / §期限题 / §永住题:
//   - 7 routing-regression set tags (J03/J04/J08/I08/D05/D06/D09)
//     covering after Issue #18 fix
//   - 3 additional P0: F01 (补材料期限) / F05 (不许可通知书) /
//     E01 (永住前年金没交)
// The Work Packet (§数据来源) explicitly says hardcoded is acceptable
// for v1 to avoid an API dependency.

interface Scenario {
  starter_tag: string
  scenario_label: string
  question: string
  /** Short risk note shown next to the题目 — purely for the reviewer. */
  risk_note: string
}

const P0_SCENARIOS: Scenario[] = [
  // Routing-regression set (Issue #18 fix targets) ----------------------
  {
    starter_tag: 'eval-lab-v1-J03',
    scenario_label: 'J · 边界 / 时限',
    question: '我签证快到期了，但材料还没准备好怎么办？',
    risk_note: '时限高风险 — TEBIQ 是否传达紧急性',
  },
  {
    starter_tag: 'eval-lab-v1-J04',
    scenario_label: 'J · 边界 / 突发',
    question: '我被公司解雇了，在留怎么办？',
    risk_note: '高风险突发 — 方向判断难',
  },
  {
    starter_tag: 'eval-lab-v1-J08',
    scenario_label: 'J · 边界 / 合规',
    question: '我的在留资格和现在实际工作不一致怎么办？',
    risk_note: '最常见被忽视的合规缺口',
  },
  {
    starter_tag: 'eval-lab-v1-I08',
    scenario_label: 'I · 离境 / 回国',
    question: '公司还没清算，我可以直接回国吗？',
    risk_note: '高风险决策 — TEBIQ 是否传达不能直接走',
  },
  {
    starter_tag: 'eval-lab-v1-D05',
    scenario_label: 'D · 家族 / 配偶',
    question: '日本人配偶签离婚后还能留在日本吗？',
    risk_note: '身份变化后路径选择',
  },
  {
    starter_tag: 'eval-lab-v1-D06',
    scenario_label: 'D · 家族 / 配偶',
    question: '配偶签离婚后多久要处理在留问题？',
    risk_note: '14 日届出 / 6 个月窗口',
  },
  {
    starter_tag: 'eval-lab-v1-D09',
    scenario_label: 'D · 家族 / 连带',
    question: '家人的在留资格跟我有关，我换签证会影响他们吗？',
    risk_note: '家族滞在连带风险',
  },
  // Additional high-risk P0 ---------------------------------------------
  {
    starter_tag: 'eval-lab-v1-F01',
    scenario_label: 'F · 入管 / 补材料',
    question: '入管让我补材料，但期限赶不上怎么办？',
    risk_note: '紧急时限 — 需主动联系入管',
  },
  {
    starter_tag: 'eval-lab-v1-F05',
    scenario_label: 'F · 入管 / 不许可',
    question: '收到不许可通知书怎么办？',
    risk_note: '结果理解 + 后续行动路径',
  },
  {
    starter_tag: 'eval-lab-v1-E01',
    scenario_label: 'E · 永住 / 年金',
    question: '永住申请前年金没交怎么办？',
    risk_note: '最高频质询点 — TEBIQ 是否要求进一步信息',
  },
]

interface SubmitResponse {
  ok?: boolean
  answer_id?: string | null
  error?: { message?: string } | string
}

export default function PreviewClient() {
  const router = useRouter()
  const [busyTag, setBusyTag] = useState<string | null>(null)
  const [error, setError] = useState<string | null>(null)
  const [freeInput, setFreeInput] = useState('')

  async function submit(question: string, sourceTag: string) {
    if (busyTag) return
    setBusyTag(sourceTag)
    setError(null)
    try {
      const res = await fetch('/api/questions', {
        method: 'POST',
        headers: { 'content-type': 'application/json' },
        body: JSON.stringify({
          question_text: question,
          visa_type: null,
          source_page: '/internal/preview',
        }),
      })
      const json = (await res.json()) as SubmitResponse
      if (!res.ok || !json.ok) {
        const msg = typeof json.error === 'string' ? json.error : json.error?.message
        setError(msg ?? `提交失败：HTTP ${res.status}`)
        return
      }
      if (json.answer_id) {
        router.push(`/answer/${json.answer_id}`)
        return
      }
      setError('提交成功但没有 answer_id（罕见路径，请手动检查 /my/archive）')
    } catch (err) {
      setError(err instanceof Error ? err.message : String(err))
    } finally {
      setBusyTag(null)
    }
  }

  function onFreeSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()
    const text = freeInput.trim()
    if (!text) return
    void submit(text, '__free__')
  }

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 font-mono">
      <header className="border-b border-slate-300 bg-white px-4 py-3 flex flex-wrap items-center gap-3">
        <h1 className="text-base font-semibold tracking-tight">
          TEBIQ User Preview · 内部
        </h1>
        <span className="text-[10px] text-slate-500 uppercase tracking-wider">
          Track D Alpha · Issue #21
        </span>
        <div className="ml-auto flex flex-wrap gap-2 text-[11px]">
          <a
            href="/internal/eval-console"
            className="px-2 py-1 border border-slate-300 rounded bg-white hover:bg-slate-100"
          >
            打开 Eval Console
          </a>
          <a
            href="/internal/eval-lab"
            className="px-2 py-1 border border-slate-300 rounded bg-white hover:bg-slate-100"
          >
            打开 Eval Lab 标注
          </a>
        </div>
      </header>

      <main className="max-w-4xl mx-auto p-4 space-y-6">
        <section>
          <h2 className="text-sm font-semibold text-slate-900">P0 场景快速入口</h2>
          <p className="text-[11px] text-slate-500 mt-0.5">
            10 条高风险代表题。点「提问」会以该题文本提交到现有 \/api\/questions 路由，
            完成后跳转到 \/answer\/[id] 体验完整回答流程。本页面不嵌入回答内容、不改
            Prompt、不改回答页 UI。
          </p>

          {error && (
            <p className="mt-2 px-3 py-2 text-[12px] text-red-700 bg-red-50 border border-red-200 rounded">
              {error}
              <button onClick={() => setError(null)} className="ml-2 text-red-400" aria-label="dismiss">×</button>
            </p>
          )}

          <ul className="mt-3 space-y-2">
            {P0_SCENARIOS.map(s => {
              const busy = busyTag === s.starter_tag
              return (
                <li
                  key={s.starter_tag}
                  className="flex flex-wrap items-start gap-3 p-3 bg-white border border-slate-300 rounded"
                >
                  <div className="flex-1 min-w-[18rem]">
                    <div className="flex flex-wrap items-center gap-2 text-[10px] uppercase tracking-wider text-slate-500">
                      <span className="font-mono">{s.starter_tag}</span>
                      <span>·</span>
                      <span>{s.scenario_label}</span>
                    </div>
                    <p className="text-sm font-medium text-slate-900 leading-snug mt-1">
                      {s.question}
                    </p>
                    <p className="text-[11px] text-slate-500 mt-1">
                      <span className="text-slate-400">风险点：</span>{s.risk_note}
                    </p>
                  </div>
                  <button
                    onClick={() => submit(s.question, s.starter_tag)}
                    disabled={busy || busyTag !== null}
                    className="text-[12px] px-3 py-1.5 border border-blue-400 rounded bg-blue-50 text-blue-700 hover:bg-blue-100 disabled:opacity-50 self-start"
                  >
                    {busy ? '提交中…' : '提问'}
                  </button>
                </li>
              )
            })}
          </ul>
        </section>

        <section>
          <h2 className="text-sm font-semibold text-slate-900">自由输入</h2>
          <p className="text-[11px] text-slate-500 mt-0.5">
            输入任意问题，提交后进入现有回答流程。最多 4000 字。
          </p>
          <form onSubmit={onFreeSubmit} className="mt-3 space-y-2">
            <textarea
              value={freeInput}
              onChange={e => setFreeInput(e.target.value)}
              maxLength={4000}
              rows={4}
              placeholder="例：经管签搬办公室要通知哪里？"
              className="w-full p-3 text-sm border border-slate-300 rounded font-sans bg-white"
            />
            <div className="flex items-center gap-3">
              <button
                type="submit"
                disabled={busyTag !== null || !freeInput.trim()}
                className="text-[12px] px-3 py-1.5 border border-slate-400 rounded bg-white hover:bg-slate-100 disabled:opacity-50"
              >
                {busyTag === '__free__' ? '提交中…' : '提交并打开回答页'}
              </button>
              <span className="text-[11px] text-slate-400">
                {freeInput.length} / 4000
              </span>
            </div>
          </form>
        </section>

        <footer className="text-[10px] text-slate-400 pt-4 border-t border-slate-200">
          Internal-only. EVAL_LAB_ENABLED gate. 不嵌入回答 / 不改 Prompt / 不改路由 / 不改回答页 UI.
        </footer>
      </main>
    </div>
  )
}
