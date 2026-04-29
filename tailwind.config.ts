import type { Config } from 'tailwindcss'

/**
 * Visual Polish 12 — Tokyo train interface.
 *
 * UI voice: precise, cool, ordered. No gradients, no glow, no soft marketing color.
 * Legacy token names stay available so older screens compile, but they resolve to
 * the restrained ink / gray / hairline system.
 */
const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        // === Product tokens ===
        ink: '#0F2544',
        accent: '#0F2544',
        'accent-2': '#F2F4F7',
        canvas: '#FAFAF7',
        surface: '#FFFFFF',
        paper: '#F2F4F7',
        hairline: '#E5E7EB',
        warning: '#F3A32B',
        'cool-blue': '#F2F4F7',
        success: '#6B7280',
        danger: '#F3A32B',
        slate: '#6B7280',
        ash: '#6B7280',
        haze: '#9AA0AC',
        chip: '#F2F4F7',

        // === Legacy aliases (Block 1/2 代码还在用，保留兼容) ===
        background: 'var(--background)',
        foreground: 'var(--foreground)',
        brand: {
          blue: '#0F2544',
          orange: '#0F2544',
          cream: '#FAFAF7',
          bluegray: '#F2F4F7',
          green: '#F2F4F7',
          gray: '#6B7280',
        },
        verdict: {
          green: '#6B7280',
          yellow: '#F3A32B',
          red: '#F3A32B',
        },
        base: '#FAFAF7',
        card: '#FFFFFF',
        line: '#E5E7EB',
        title: '#0F2544',
        body: '#6B7280',
        muted: '#9AA0AC',
        primary: '#0F2544',
        'primary-hover': '#1A355B',
        highlight: '#F2F4F7',
        'verdict-red': '#F3A32B',
        'verdict-yellow': '#F3A32B',
        'verdict-green': '#6B7280',
        'risk-low-bg': '#F2F4F7',
        'risk-low-fg': '#6B7280',
        'risk-mid-bg': '#FAFAF7',
        'risk-mid-fg': '#0F2544',
        'risk-high-bg': '#FAFAF7',
        'risk-high-fg': '#F3A32B',
        'risk-notice-bg': '#F2F4F7',
        'risk-notice-fg': '#0F2544',
      },
      fontFamily: {
        sans: [
          '-apple-system',
          'BlinkMacSystemFont',
          '"Noto Sans CJK SC"',
          '"Noto Sans SC"',
          '"Hiragino Sans"',
          '"Yu Gothic"',
          '"YuGothic"',
          '"PingFang SC"',
          'sans-serif',
        ],
        numeric: [
          '-apple-system',
          'BlinkMacSystemFont',
          '"Noto Sans CJK SC"',
          '"Hiragino Sans"',
          'sans-serif',
        ],
      },
      borderRadius: {
        card: '14px',
        btn: '10px',
        chip: '8px',
      },
      boxShadow: {
        soft: 'none',
        card: 'none',
        raised: 'none',
        cta: 'none',
        focus: '0 0 0 3px rgba(15, 37, 68, 0.14)',
      },
      maxWidth: {
        // 桌面端居中显示「手机视觉」
        phone: '480px',
      },
    },
  },
  plugins: [],
}
export default config
