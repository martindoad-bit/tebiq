'use client'

import Link from 'next/link'
import { useMemo, useState } from 'react'

export default function ImportQuestionsClient() {
  const [text, setText] = useState('')
  const [busy, setBusy] = useState(false)
  const [result, setResult] = useState<string | null>(null)
  const preview = useMemo(() => parseLines(text), [text])

  async function submit() {
    if (preview.length === 0 || busy) return
    setBusy(true)
    setResult(null)
    try {
      const res = await fetch('/api/admin/questions/import', {
        method: 'POST',
        headers: { 'content-type': 'application/json' },
        body: JSON.stringify({ text }),
      })
      const json = await res.json() as {
        ok?: boolean
        data?: { inserted?: number; skipped?: number; totalParsed?: number }
        error?: { message?: string }
      }
      if (!res.ok || !json.ok) {
        setResult(json.error?.message ?? '导入失败')
        return
      }
      setResult(`导入完成：新增 ${json.data?.inserted ?? 0} 条，跳过 ${json.data?.skipped ?? 0} 条。`)
      setText('')
    } catch {
      setResult('导入失败')
    } finally {
      setBusy(false)
    }
  }

  return (
    <div className="grid gap-4">
      <section className="rounded-card border border-hairline bg-surface p-4">
        <h2 className="text-sm font-semibold text-ink">批量导入原始问题</h2>
        <p className="mt-2 text-xs leading-6 text-ash">
          可以每行一个问题，也可以直接粘贴多行原始咨询记录。系统会先作为原始问题保存，后续再分类、审核和整理。
        </p>
        <textarea
          value={text}
          onChange={event => setText(event.target.value)}
          rows={14}
          placeholder={'公司休眠后要不要切国民年金？\\n经营管理签办公室搬迁要先做什么？'}
          className="mt-4 w-full resize-y rounded-[12px] border border-hairline bg-canvas px-3 py-3 text-sm leading-6 text-ink outline-none placeholder:text-ash focus:border-ink"
        />
        <div className="mt-3 flex flex-wrap items-center gap-2">
          <span className="text-xs text-ash">预览导入数量：{preview.length}</span>
          <button
            type="button"
            disabled={busy || preview.length === 0}
            onClick={submit}
            className="ml-auto rounded-btn bg-ink px-4 py-2 text-xs font-medium text-white disabled:opacity-50"
          >
            {busy ? '处理中...' : '导入'}
          </button>
          <Link href="/admin/questions" className="rounded-btn border border-hairline bg-surface px-4 py-2 text-xs font-medium text-ink">
            返回列表
          </Link>
        </div>
        {result && <p className="mt-3 rounded-[10px] bg-paper px-3 py-2 text-xs text-slate">{result}</p>}
      </section>

      {preview.length > 0 && (
        <section className="rounded-card border border-hairline bg-surface p-4">
          <h2 className="text-sm font-semibold text-ink">预览前 20 条</h2>
          <ol className="mt-3 list-decimal space-y-2 pl-5 text-xs leading-6 text-slate">
            {preview.slice(0, 20).map((line, index) => <li key={`${line}-${index}`}>{line}</li>)}
          </ol>
        </section>
      )}
    </div>
  )
}

function parseLines(text: string): string[] {
  const seen = new Set<string>()
  const rows: string[] = []
  for (const raw of text.split(/\r?\n/)) {
    const cleaned = raw.replace(/^\s*(?:[-*•]|\d+[.)、])\s*/, '').replace(/\s+/g, ' ').trim()
    if (!cleaned) continue
    const key = cleaned.toLowerCase()
    if (seen.has(key)) continue
    seen.add(key)
    rows.push(cleaned)
  }
  return rows
}
