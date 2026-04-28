/**
 * 客户端图片压缩 — 在浏览器里把任意 image/* 缩到 maxWidth、JPEG quality。
 *
 * 用 createImageBitmap → canvas → toBlob，全部异步，不阻塞主线程。
 * HEIC 浏览器不解码，让原文件原样上传。失败也返回原文件（不致命）。
 *
 * 仅供客户端调用（依赖 window）。
 */
const DEFAULT_MAX_WIDTH = 2048
const DEFAULT_QUALITY = 0.85

export interface CompressResult {
  blob: Blob
  filename: string
  beforeBytes: number
  afterBytes: number
  compressed: boolean
}

function inferOutType(originalType: string): 'image/jpeg' | 'image/png' {
  if (originalType === 'image/png') return 'image/png'
  return 'image/jpeg'
}

function renameWithExt(name: string, type: string): string {
  const ext = type === 'image/png' ? 'png' : 'jpg'
  const base = name.replace(/\.[^.]+$/, '')
  return `${base}.${ext}`
}

export async function compressImageClient(
  file: File,
  opts: { maxWidth?: number; quality?: number } = {},
): Promise<CompressResult> {
  const maxWidth = opts.maxWidth ?? DEFAULT_MAX_WIDTH
  const quality = opts.quality ?? DEFAULT_QUALITY

  // HEIC / HEIF: 浏览器解码不可靠，原样上传
  if (file.type === 'image/heic' || file.type === 'image/heif') {
    return {
      blob: file,
      filename: file.name,
      beforeBytes: file.size,
      afterBytes: file.size,
      compressed: false,
    }
  }

  try {
    const bitmap = await createImageBitmap(file)
    const scale = Math.min(1, maxWidth / bitmap.width)
    if (scale >= 1 && file.size <= maxWidth * 1024) {
      // 已经很小，不必压缩
      bitmap.close()
      return {
        blob: file,
        filename: file.name,
        beforeBytes: file.size,
        afterBytes: file.size,
        compressed: false,
      }
    }
    const w = Math.round(bitmap.width * scale)
    const h = Math.round(bitmap.height * scale)
    const canvas = document.createElement('canvas')
    canvas.width = w
    canvas.height = h
    const ctx = canvas.getContext('2d')
    if (!ctx) {
      bitmap.close()
      return fallback(file)
    }
    ctx.drawImage(bitmap, 0, 0, w, h)
    bitmap.close()
    const outType = inferOutType(file.type)
    const blob = await new Promise<Blob | null>(resolve => {
      canvas.toBlob(b => resolve(b), outType, quality)
    })
    if (!blob) return fallback(file)
    return {
      blob,
      filename: renameWithExt(file.name, outType),
      beforeBytes: file.size,
      afterBytes: blob.size,
      compressed: blob.size < file.size,
    }
  } catch {
    return fallback(file)
  }
}

function fallback(file: File): CompressResult {
  return {
    blob: file,
    filename: file.name,
    beforeBytes: file.size,
    afterBytes: file.size,
    compressed: false,
  }
}

export function formatBytes(bytes: number): string {
  if (bytes < 1024) return `${bytes} B`
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(0)} KB`
  return `${(bytes / 1024 / 1024).toFixed(1)} MB`
}
