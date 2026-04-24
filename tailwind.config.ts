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
        // TEBIQ light theme tokens
        base: '#FAFAF7', // 页面背景米白
        card: '#FFFFFF', // 卡片背景
        line: '#E5E7EB', // 分割线 / 卡片描边
        title: '#1E3A5F', // 主标题深蓝
        body: '#374151', // 正文深灰
        muted: '#6B7280', // 次要文字
        primary: '#D97706', // 主按钮深琥珀
        'primary-hover': '#B45309', // 主按钮 hover
        highlight: '#FEF3C7', // 辅助高亮淡金
        'verdict-red': '#DC2626',
        'verdict-yellow': '#D97706',
        'verdict-green': '#16A34A',
      },
    },
  },
  plugins: [],
}
export default config
