import type { MetadataRoute } from 'next'

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: 'TEBIQ',
    short_name: 'TEBIQ',
    description: 'AI 在留咨询整理工具',
    start_url: '/ai-consultation',
    display: 'standalone',
    background_color: '#FAFAF7',
    theme_color: '#0F2544',
    icons: [
      {
        src: '/brand/tebiq-v07/pwa/pwa-icon-192.png',
        sizes: '192x192',
        type: 'image/png',
      },
      {
        src: '/brand/tebiq-v07/pwa/pwa-icon-512.png',
        sizes: '512x512',
        type: 'image/png',
      },
      {
        src: '/brand/tebiq-v07/pwa/pwa-maskable-192.png',
        sizes: '192x192',
        type: 'image/png',
        purpose: 'maskable',
      },
      {
        src: '/brand/tebiq-v07/pwa/pwa-maskable-512.png',
        sizes: '512x512',
        type: 'image/png',
        purpose: 'maskable',
      },
    ],
  }
}
