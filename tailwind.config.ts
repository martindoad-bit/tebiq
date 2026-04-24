import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        background: 'var(--background)',
        foreground: 'var(--foreground)',
        // 新 VI brand 色板
        brand: {
          blue: '#1E3A5F',
          orange: '#F6B133',
          cream: '#FFF5E6',
          bluegray: '#E6EEF5',
          green: '#D7EDE6',
          gray: '#4A5563',
        },
        verdict: {
          green: '#2D9B6F',
          yellow: '#F6B133',
          red: '#E05252',
        },
        // 旧语义 token，重新指向新 VI（无需大面积 sed）
        base: '#FFF5E6', // 米色页面背景
        card: '#FFFFFF',
        line: '#E6EEF5', // 蓝灰描边（更柔和）
        title: '#1E3A5F',
        body: '#4A5563',
        muted: '#6B7280',
        primary: '#F6B133', // 主按钮温暖橙
        'primary-hover': '#E5A52E',
        highlight: '#FFF3CD', // 中风险淡橙
        'verdict-red': '#E05252',
        'verdict-yellow': '#F6B133',
        'verdict-green': '#2D9B6F',
        // 风险标签背景 / 文字色
        'risk-low-bg': '#D7EDE6',
        'risk-low-fg': '#2D9B6F',
        'risk-mid-bg': '#FFF3CD',
        'risk-mid-fg': '#B45309',
        'risk-high-bg': '#FDECEA',
        'risk-high-fg': '#E05252',
        'risk-notice-bg': '#E6EEF5',
        'risk-notice-fg': '#1E3A5F',
      },
      fontFamily: {
        sans: ['"Noto Sans SC"', '"Noto Sans CJK SC"', 'sans-serif'],
      },
    },
  },
  plugins: [],
}
export default config
