import type { Config } from 'tailwindcss'

/**
 * v5 视觉系统 — Block 3 锁定的 token。
 * 颜色对应 docs/prototype/v5-mockup.html。
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
        // === v5 brand tokens (PROJECT_MEMORY 锁定的视觉规范) ===
        // 主色 — 信赖蓝（标题、icon stroke、深底）
        ink: '#1E3A5F',
        // 强调色 — 温暖橙（CTA、active state、accent）
        accent: '#F6B133',
        'accent-2': '#FFF8EA', // 强调色的浅版（icon 背景、卡片高亮）
        // 背景 — 柔和米
        canvas: '#FFF5E6',
        // 卡片 — 纯白
        surface: '#FFFFFF',
        // 边框 / 分隔线 — rgba(30, 58, 95, 0.08) 的近似十六进制
        hairline: 'rgba(30, 58, 95, 0.08)',
        // 辅助色
        'cool-blue': '#E6EEF5', // 清爽蓝灰（背景型）
        success: '#57A77B', // 安心绿
        danger: '#E2574C', // 警示红
        slate: '#4A5563', // 沉稳灰
        // 灰阶
        ash: '#6E7A85', // 副文本
        haze: '#B5B0A4', // tab 未选中、placeholder
        chip: '#F4EFE3', // search bar 背景

        // === Legacy aliases (Block 1/2 代码还在用，保留兼容) ===
        background: 'var(--background)',
        foreground: 'var(--foreground)',
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
        base: '#FFF5E6',
        card: '#FFFFFF',
        line: '#E6EEF5',
        title: '#1E3A5F',
        body: '#4A5563',
        muted: '#6B7280',
        primary: '#F6B133',
        'primary-hover': '#E5A52E',
        highlight: '#FFF3CD',
        'verdict-red': '#E05252',
        'verdict-yellow': '#F6B133',
        'verdict-green': '#2D9B6F',
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
        // v5: 系统中日字体优先，与原型一致
        sans: [
          '-apple-system',
          'BlinkMacSystemFont',
          '"PingFang SC"',
          '"Hiragino Sans"',
          '"Noto Sans SC"',
          '"Noto Sans CJK SC"',
          'sans-serif',
        ],
      },
      borderRadius: {
        // v5 圆角规范：卡片 14, 按钮 12, 小标签 8-10
        card: '14px',
        btn: '12px',
        chip: '10px',
      },
      boxShadow: {
        // v5 没有强投影，仅 0.5px hairline + 极轻阴影
        soft: '0 1px 0 rgba(30, 58, 95, 0.04)',
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
