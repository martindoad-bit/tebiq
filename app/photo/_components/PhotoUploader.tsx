/**
 * PhotoUploader — 屏 02 拍照入口的核心交互组件。
 *
 * 视觉：深蓝大块 + 黄色虚线边 + 居中相机 icon + 提示文案。
 * 行为：
 *   1. 点击整块 → 触发隐藏 file input（capture=environment 直接调摄像头）
 *   2. 选中文件 → POST FormData 到 /api/photo/recognize
 *   3. 200 OK → router.push('/photo/result/' + documentId)
 *   4. 402 quota_exceeded → router.push('/photo?quota=full')
 *   5. 其他错误 → 显示 inline 错误文案
 *
 * 注：apiPost 序列化 JSON，这里需要 multipart，用裸 fetch + 自己解 envelope。
 */
'use client'
import { useRef, useState } from 'react'
import { useRouter } from 'next/navigation'
import { Camera, FileText, Loader, ShieldCheck } from 'lucide-react'

interface RecognizeData {
  documentId: string
}
interface EnvelopeOk {
  ok: true
  data: RecognizeData
}
interface EnvelopeErr {
  ok: false
  error: { code: string; message: string }
}

export default function PhotoUploader() {
  const router = useRouter()
  const inputRef = useRef<HTMLInputElement | null>(null)
  const [busy, setBusy] = useState(false)
  const [errMsg, setErrMsg] = useState<string | null>(null)

  const onPick = () => {
    if (busy) return
    inputRef.current?.click()
  }

  const onFile = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return
    setErrMsg(null)
    setBusy(true)
    try {
      const fd = new FormData()
      fd.append('file', file)
      const res = await fetch('/api/photo/recognize', {
        method: 'POST',
        body: fd,
      })
      // 解 envelope
      const json = (await res.json().catch(() => null)) as
        | EnvelopeOk
        | EnvelopeErr
        | null
      if (res.status === 402) {
        router.push('/photo?quota=full')
        return
      }
      if (!res.ok || !json || json.ok !== true) {
        const msg =
          json && json.ok === false ? json.error.message : `识别失败（${res.status}）`
        setErrMsg(msg)
        return
      }
      router.push(`/photo/result/${json.data.documentId}`)
    } catch (err) {
      setErrMsg(err instanceof Error ? err.message : '上传失败')
    } finally {
      setBusy(false)
      // 允许重选同一张
      if (inputRef.current) inputRef.current.value = ''
    }
  }

  return (
    <div className="flex flex-col">
      <button
        type="button"
        onClick={onPick}
        disabled={busy}
        aria-label="拍照或上传图片"
        className="relative w-full min-h-[264px] overflow-hidden rounded-[18px] bg-ink flex flex-col items-center justify-center gap-[14px] mb-3 disabled:opacity-70 shadow-raised transition active:translate-y-px"
      >
        <span
          aria-hidden
          className="absolute inset-3 rounded-[14px] border border-dashed border-accent/35"
        />
        <span
          aria-hidden
          className="absolute left-5 top-5 flex items-center gap-1.5 rounded-full bg-white/8 px-2.5 py-1 text-[10px] text-canvas/70"
        >
          <FileText size={12} strokeWidth={1.5} />
          文書 OCR
        </span>
        <span
          aria-hidden
          className="absolute bottom-5 right-5 flex h-8 w-8 items-center justify-center rounded-[10px] bg-accent/15 text-accent"
        >
          <ShieldCheck size={16} strokeWidth={1.55} />
        </span>
        <span
          className="relative z-10 w-[58px] h-[58px] flex items-center justify-center rounded-[17px] bg-white/10 text-accent shadow-soft"
        >
          {busy ? (
            <Loader size={28} color="#F6B133" className="animate-spin" />
          ) : (
            <Camera size={28} color="#F6B133" strokeWidth={1.5} />
          )}
        </span>
        <span className="relative z-10 text-center">
          <span className="block text-[13px] font-medium text-canvas">
            {busy ? '识别中…' : '点击拍照'}
          </span>
          <span className="block text-[11px] text-canvas/68 mt-1">
            {busy ? '请稍候' : '或上传图片'}
          </span>
        </span>
      </button>

      <div className="mb-3 grid grid-cols-3 gap-1.5">
        <HintChip label="金额" value="自动提取" />
        <HintChip label="期限" value="标出日期" />
        <HintChip label="行动" value="列清楚" />
      </div>

      <input
        ref={inputRef}
        type="file"
        accept="image/*"
        capture="environment"
        className="sr-only"
        onChange={onFile}
      />

      {errMsg && (
        <p className="text-[12px] text-danger mb-2 text-center" role="alert">
          {errMsg}
        </p>
      )}
    </div>
  )
}

function HintChip({ label, value }: { label: string; value: string }) {
  return (
    <span className="min-w-0 rounded-[11px] border border-hairline bg-surface/70 px-2 py-2 shadow-soft">
      <span className="block truncate text-[10px] leading-none text-ash">{label}</span>
      <span className="mt-1 block truncate text-[11px] font-medium leading-none text-ink">
        {value}
      </span>
    </span>
  )
}
