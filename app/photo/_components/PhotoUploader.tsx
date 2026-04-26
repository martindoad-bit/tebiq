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
import { Camera, Loader } from 'lucide-react'

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
        className="flex-1 min-h-[280px] rounded-[16px] bg-ink flex flex-col items-center justify-center gap-[14px] mb-[14px] disabled:opacity-70 transition-opacity"
        style={{ border: '1.5px dashed rgba(246, 177, 51, 0.35)' }}
      >
        <span
          className="w-14 h-14 flex items-center justify-center rounded-[14px]"
          style={{ background: 'rgba(246, 177, 51, 0.18)' }}
        >
          {busy ? (
            <Loader size={28} color="#F6B133" className="animate-spin" />
          ) : (
            <Camera size={28} color="#F6B133" strokeWidth={1.5} />
          )}
        </span>
        <span className="text-center">
          <span className="block text-[13px] font-medium text-canvas">
            {busy ? '识别中…' : '点击拍照'}
          </span>
          <span className="block text-[11px] text-canvas/65 mt-1">
            {busy ? '请稍候' : '或上传图片'}
          </span>
        </span>
      </button>

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
