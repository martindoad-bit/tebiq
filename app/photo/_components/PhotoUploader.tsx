/**
 * PhotoUploader — 屏 02 拍照入口的核心交互组件。
 *
 * Block 7 升级：
 *   - T10a: 客户端 canvas 压缩到 ≤2048px / JPEG q=0.85
 *   - T10b: XMLHttpRequest 上传，监听 progress
 *   - T9b: 处理期间每 1 秒切一句进度提示
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
import { Camera, FileText, Image as ImageIcon, Loader, LockKeyhole, Upload } from 'lucide-react'
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
  '识别文书类型',
  '提取关键信息',
  '整理字段',
] as const

const MAX_UPLOAD_BYTES = 10 * 1024 * 1024
const UPLOAD_ACCEPT = [
  'application/pdf',
  'image/png',
  'image/jpeg',
  'image/jpg',
  'image/heic',
  'image/heif',
  'image/webp',
  '.pdf',
  '.png',
  '.jpg',
  '.jpeg',
  '.heic',
  '.heif',
  '.webp',
].join(',')

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
  const cameraInputRef = useRef<HTMLInputElement | null>(null)
  const uploadInputRef = useRef<HTMLInputElement | null>(null)
  const [stage, setStage] = useState<Stage>({ kind: 'idle' })
  const [errMsg, setErrMsg] = useState<string | null>(null)
  const [compressInfo, setCompressInfo] = useState<{
    before: number
    after: number
  } | null>(null)

  // 识别阶段每 1s 切一句话
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

  const onPickCamera = () => {
    if (busy) return
    cameraInputRef.current?.click()
  }

  const onPickUpload = () => {
    if (busy) return
    uploadInputRef.current?.click()
  }

  const onFile = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return
    setErrMsg(null)
    setCompressInfo(null)

    try {
      if (file.size > MAX_UPLOAD_BYTES) {
        setErrMsg('文件超过 10MB')
        setStage({ kind: 'idle' })
        return
      }

      const isPdf = file.type === 'application/pdf' || /\.pdf$/i.test(file.name)
      let uploadBlob: Blob = file
      let uploadFilename = file.name

      if (!isPdf) {
        // 1. 客户端压缩
        setStage({ kind: 'compressing' })
        const compressed = await compressImageClient(file)
        setCompressInfo({
          before: compressed.beforeBytes,
          after: compressed.afterBytes,
        })
        uploadBlob = compressed.blob
        uploadFilename = compressed.filename
      }

      // 2. XHR 上传 + 监听进度
      const fd = new FormData()
      fd.append('file', uploadBlob, uploadFilename)
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
      if (cameraInputRef.current) cameraInputRef.current.value = ''
      if (uploadInputRef.current) uploadInputRef.current.value = ''
    }
  }

  // 顶部主标签 + 副标签按 stage 切换
  let mainLabel: string
  let subLabel: string
  if (stage.kind === 'compressing') {
    mainLabel = '处理中...'
    subLabel = compressInfo
      ? `${formatBytes(compressInfo.before)} → 优化中`
      : '压缩图片'
  } else if (stage.kind === 'uploading') {
    mainLabel = '处理中...'
    subLabel = `上传中 ${stage.pct}%`
  } else if (stage.kind === 'recognizing') {
    mainLabel = '处理中...'
    subLabel = RECOGNIZE_MESSAGES[stage.messageIdx]
  } else {
    mainLabel = '拍照或上传文书'
    subLabel = '图片、PDF、截图'
  }

  return (
    <div className="flex flex-col">
      <button
        type="button"
        onClick={onPickCamera}
        disabled={busy}
        aria-label="拍照或上传图片"
        aria-busy={busy}
        className="focus-ring relative mb-4 flex min-h-[276px] w-full max-w-full flex-col items-center justify-center gap-5 overflow-hidden rounded-card border border-dashed border-hairline bg-surface disabled:opacity-70 sm:min-h-[312px]"
      >
        <span className="relative z-10 flex h-[104px] w-[104px] items-center justify-center rounded-full border border-ink text-ink">
          {busy ? (
            <Loader size={28} color="#0F2544" strokeWidth={1.5} className="animate-spin" />
          ) : (
            <Camera size={30} color="#0F2544" strokeWidth={1.5} />
          )}
        </span>
        <span className="relative z-10 px-6 text-center">
          <span className="block text-[18px] font-medium leading-none text-ink">
            {mainLabel}
          </span>
          <span className="mt-3 block text-[13px] text-ash transition-opacity duration-200">
            {subLabel}
          </span>
        </span>

        {/* 上传进度条 */}
        {stage.kind === 'uploading' && (
          <div className="absolute bottom-0 left-0 right-0 h-0.5 overflow-hidden bg-paper">
            <div
              className="h-full bg-ink transition-all"
              style={{ width: `${stage.pct}%` }}
            />
          </div>
        )}
      </button>

      <div className="mb-3 overflow-hidden rounded-card border border-hairline bg-surface">
        <button
          type="button"
          onClick={onPickUpload}
          disabled={busy}
          className="focus-ring flex min-h-[56px] w-full items-center gap-3 border-b border-hairline px-4 text-left text-[15px] font-normal text-ink disabled:opacity-70"
        >
          <FileText size={20} strokeWidth={1.5} />
          上传 PDF
          <Upload size={18} strokeWidth={1.5} className="ml-auto text-haze" />
        </button>
        <button
          type="button"
          onClick={onPickUpload}
          disabled={busy}
          className="focus-ring flex min-h-[56px] w-full items-center gap-3 px-4 text-left text-[15px] font-normal text-ink disabled:opacity-70"
        >
          <ImageIcon size={20} strokeWidth={1.5} />
          上传图片 / 截图
          <Upload size={18} strokeWidth={1.5} className="ml-auto text-haze" />
        </button>
      </div>

      <p className="mb-3 flex min-h-[40px] items-center rounded-btn bg-paper px-3.5 text-[12px] text-ash">
        今日还可免费识别 1 次
      </p>

      <p className="mb-3 flex min-h-[44px] items-center gap-3 rounded-card border border-hairline bg-surface px-4 text-[13px] text-ash">
        <FileText size={18} strokeWidth={1.5} />
        支持住民税、年金、在留カード、契約書
      </p>

      <p className="mb-3 flex min-h-[44px] items-center gap-3 rounded-card border border-hairline bg-surface px-4 text-[13px] text-ash">
        <LockKeyhole size={18} strokeWidth={1.5} />
        结果会进入我的提醒，之后在账号内查看
      </p>

      <input
        ref={cameraInputRef}
        type="file"
        accept="image/*"
        capture="environment"
        className="sr-only"
        onChange={onFile}
      />
      <input
        ref={uploadInputRef}
        type="file"
        accept={UPLOAD_ACCEPT}
        className="sr-only"
        onChange={onFile}
      />

      {compressInfo && stage.kind === 'idle' && compressInfo.after < compressInfo.before && (
        <p className="mb-2 text-center text-[10.5px] text-ash">
          已压缩 {formatBytes(compressInfo.before)} → {formatBytes(compressInfo.after)}
        </p>
      )}

      {errMsg && (
        <p className="text-[12px] text-warning mb-2 text-center" role="alert">
          {errMsg}
        </p>
      )}
    </div>
  )
}
