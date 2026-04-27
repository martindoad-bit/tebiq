/**
 * PhotoUploader — 屏 02 拍照入口的核心交互组件。
 *
 * Block 7 升级：
 *   - T10a: 客户端 canvas 压缩到 ≤2048px / JPEG q=0.85
 *   - T10b: XMLHttpRequest 上传，监听 progress
 *   - T9b: 「正在识别中...」期间每 1 秒切一句进度提示
 *
 * 状态机：idle → compressing → uploading(%) → recognizing(rotating msg) → done/error
 *
 * 行为：
 *   1. 点击整块 → 触发隐藏 file input（capture=environment 直接调摄像头）
 *   2. 选中文件 → 客户端压缩 → XHR 上传 → 等待识别 → 跳转
 *   3. 200 OK → router.push('/photo/result/' + documentId)
 *   4. 402 quota_exceeded → router.push('/photo?quota=full')
 *   5. 其他错误 → 显示 inline 错误文案
 */
'use client'
import { useEffect, useRef, useState } from 'react'
import { useRouter } from 'next/navigation'
import { Camera, FileText, Loader, ShieldCheck } from 'lucide-react'
import { compressImageClient, formatBytes } from '@/lib/photo/clientCompress'

interface RecognizeData {
  documentId: string
  emailPrompt?: boolean
}
interface EnvelopeOk {
  ok: true
  data: RecognizeData
}
interface EnvelopeErr {
  ok: false
  error: { code: string; message: string }
}

type Stage =
  | { kind: 'idle' }
  | { kind: 'compressing' }
  | { kind: 'uploading'; pct: number }
  | { kind: 'recognizing'; messageIdx: number }

const RECOGNIZE_MESSAGES = [
  '识别文书类型…',
  '提取关键信息…',
  '整理给你…',
] as const

function postWithProgress(
  fd: FormData,
  onProgress: (pct: number) => void,
): Promise<{ status: number; text: string }> {
  return new Promise((resolve, reject) => {
    const xhr = new XMLHttpRequest()
    xhr.open('POST', '/api/photo/recognize', true)
    xhr.upload.onprogress = e => {
      if (!e.lengthComputable) return
      onProgress(Math.round((e.loaded / e.total) * 100))
    }
    xhr.onload = () => {
      onProgress(100)
      resolve({ status: xhr.status, text: xhr.responseText ?? '' })
    }
    xhr.onerror = () => reject(new Error('network error'))
    xhr.ontimeout = () => reject(new Error('network timeout'))
    xhr.send(fd)
  })
}

export default function PhotoUploader() {
  const router = useRouter()
  const inputRef = useRef<HTMLInputElement | null>(null)
  const [stage, setStage] = useState<Stage>({ kind: 'idle' })
  const [errMsg, setErrMsg] = useState<string | null>(null)
  const [compressInfo, setCompressInfo] = useState<{
    before: number
    after: number
  } | null>(null)

  // 「正在识别中…」每 1s 切一句话
  useEffect(() => {
    if (stage.kind !== 'recognizing') return
    const id = window.setInterval(() => {
      setStage(s =>
        s.kind === 'recognizing'
          ? { kind: 'recognizing', messageIdx: (s.messageIdx + 1) % RECOGNIZE_MESSAGES.length }
          : s,
      )
    }, 1100)
    return () => window.clearInterval(id)
  }, [stage.kind])

  const busy = stage.kind !== 'idle'

  const onPick = () => {
    if (busy) return
    inputRef.current?.click()
  }

  const onFile = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return
    setErrMsg(null)
    setCompressInfo(null)

    try {
      // 1. 客户端压缩
      setStage({ kind: 'compressing' })
      const compressed = await compressImageClient(file)
      setCompressInfo({
        before: compressed.beforeBytes,
        after: compressed.afterBytes,
      })

      // 2. XHR 上传 + 监听进度
      const fd = new FormData()
      fd.append('file', compressed.blob, compressed.filename)
      setStage({ kind: 'uploading', pct: 0 })
      const { status, text } = await postWithProgress(fd, pct => {
        setStage(s => (s.kind === 'uploading' ? { kind: 'uploading', pct } : s))
      })

      // 3. 上传完成 → 服务器还在识别
      setStage({ kind: 'recognizing', messageIdx: 0 })

      // 4. 解响应
      let json: EnvelopeOk | EnvelopeErr | null = null
      try {
        json = JSON.parse(text)
      } catch {
        json = null
      }
      if (status === 402) {
        router.push('/photo?quota=full')
        return
      }
      if (status < 200 || status >= 300 || !json || json.ok !== true) {
        const msg =
          json && json.ok === false ? json.error.message : `识别失败（${status}）`
        setErrMsg(msg)
        setStage({ kind: 'idle' })
        return
      }
      const suffix = json.data.emailPrompt ? '?email=prompt' : ''
      router.push(`/photo/result/${json.data.documentId}${suffix}`)
    } catch (err) {
      setErrMsg(err instanceof Error ? err.message : '上传失败')
      setStage({ kind: 'idle' })
    } finally {
      // 允许重选同一张
      if (inputRef.current) inputRef.current.value = ''
    }
  }

  // 顶部主标签 + 副标签按 stage 切换
  let mainLabel: string
  let subLabel: string
  if (stage.kind === 'compressing') {
    mainLabel = '正在压缩…'
    subLabel = compressInfo
      ? `${formatBytes(compressInfo.before)} → 优化中`
      : '让上传更快一点'
  } else if (stage.kind === 'uploading') {
    mainLabel = `上传中 ${stage.pct}%`
    subLabel = compressInfo
      ? `${formatBytes(compressInfo.before)} → ${formatBytes(compressInfo.after)}`
      : '请稍候'
  } else if (stage.kind === 'recognizing') {
    mainLabel = '正在识别中…'
    subLabel = RECOGNIZE_MESSAGES[stage.messageIdx]
  } else {
    mainLabel = '点击拍照'
    subLabel = '或上传图片'
  }

  return (
    <div className="flex flex-col">
      <button
        type="button"
        onClick={onPick}
        disabled={busy}
        aria-label="拍照或上传图片"
        aria-busy={busy}
        className="relative w-full max-w-full min-h-[258px] overflow-hidden rounded-card bg-ink flex flex-col items-center justify-center gap-[14px] mb-3 disabled:opacity-95 shadow-raised transition active:translate-y-px"
      >
        <span
          aria-hidden
          className="absolute inset-3 rounded-[8px] border border-dashed border-accent/40"
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
            <Loader size={28} color="#E56F4F" className="animate-spin" />
          ) : (
            <Camera size={28} color="#E56F4F" strokeWidth={1.5} />
          )}
        </span>
        <span className="relative z-10 text-center px-6">
          <span className="block text-[13px] font-medium text-canvas">
            {mainLabel}
          </span>
          <span className="mt-1 block text-[11px] text-canvas/68 transition-opacity duration-200">
            {subLabel}
          </span>
        </span>

        {/* 上传进度条 */}
        {stage.kind === 'uploading' && (
          <div className="absolute bottom-3 left-3 right-3 h-1 overflow-hidden rounded-full bg-white/10">
            <div
              className="h-full rounded-full bg-accent transition-all"
              style={{ width: `${stage.pct}%` }}
            />
          </div>
        )}
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

      {compressInfo && stage.kind === 'idle' && compressInfo.after < compressInfo.before && (
        <p className="mb-2 text-center text-[10.5px] text-ash">
          已为你压缩 {formatBytes(compressInfo.before)} → {formatBytes(compressInfo.after)}，上传更快
        </p>
      )}

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
