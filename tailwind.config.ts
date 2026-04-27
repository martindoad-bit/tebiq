import type { Config } from 'tailwindcss'

/**
 * Visual Polish 2.1 — mature but alive Japanese life-admin palette.
 *
 * 上一版把「克制」推成了沉闷灰绿。这里重新把信任锚点放回深海军蓝，
 * 但不用政府蓝；动作色改成低饱和珊瑚赤，让产品有温度而不幼稚。
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
        // 深海军蓝：信任锚点。比政府蓝暖一点，比墨青更有精神。
        ink: '#18324A',
        // 珊瑚赤：主 CTA / 进度 / 重要行动。比旧橙成熟，比赤金更有生命力。
        accent: '#E56F4F',
        'accent-2': '#FFF0E8',
        // 温暖纸白：比奶油米更清爽，不再发黄。
        canvas: '#FAF7F1',
        // 卡片纯净但保留一点暖度。
        surface: '#FFFFFF',
        // 边线回到蓝灰中性，和信息产品气质一致。
        hairline: 'rgba(24, 50, 74, 0.12)',
        // 辅助色
        'cool-blue': '#EAF3F7',
        success: '#2E7D65',
        danger: '#C64F45',
        slate: '#405161',
        // 灰阶
        ash: '#6E7A84',
        haze: '#B7C0C7',
        chip: '#F1EAE1',

        // === Legacy aliases (Block 1/2 代码还在用，保留兼容) ===
        background: 'var(--background)',
        foreground: 'var(--foreground)',
        brand: {
          blue: '#18324A',
          orange: '#E56F4F',
          cream: '#FAF7F1',
          bluegray: '#EAF3F7',
          green: '#E2F1EA',
          gray: '#405161',
        },
        verdict: {
          green: '#2E7D65',
          yellow: '#E56F4F',
          red: '#C64F45',
        },
        base: '#FAF7F1',
        card: '#FFFFFF',
        line: '#DDE5EA',
        title: '#18324A',
        body: '#405161',
        muted: '#6E7A84',
        primary: '#E56F4F',
        'primary-hover': '#D85F43',
        highlight: '#FFF0E8',
        'verdict-red': '#C64F45',
        'verdict-yellow': '#E56F4F',
        'verdict-green': '#2E7D65',
        'risk-low-bg': '#E2F1EA',
        'risk-low-fg': '#2E7D65',
        'risk-mid-bg': '#FFF0E8',
        'risk-mid-fg': '#B7533A',
        'risk-high-bg': '#FBE7E3',
        'risk-high-fg': '#C64F45',
        'risk-notice-bg': '#EAF3F7',
        'risk-notice-fg': '#18324A',
      },
      fontFamily: {
        // 系统中日字体优先；加入 Yu Gothic 让日文术语更像日本工具产品。
        sans: [
          '-apple-system',
          'BlinkMacSystemFont',
          '"PingFang SC"',
          '"Hiragino Sans"',
          '"Yu Gothic"',
          '"YuGothic"',
          '"Noto Sans SC"',
          '"Noto Sans CJK SC"',
          'sans-serif',
        ],
        numeric: [
          '"SF Mono"',
          '"SFMono-Regular"',
          '"Roboto Mono"',
          '"Noto Sans Mono CJK SC"',
          'ui-monospace',
          'monospace',
        ],
      },
      borderRadius: {
        // 更接近成熟移动产品：卡片 16、按钮 14、标签 999/10。
        card: '16px',
        btn: '14px',
        chip: '10px',
      },
      boxShadow: {
        // Neutral elevation: 清爽、可见，但不要塑料感。
        soft: '0 1px 0 rgba(24, 50, 74, 0.035)',
        card:
          '0 1px 0 rgba(24, 50, 74, 0.035), 0 10px 28px rgba(24, 50, 74, 0.06)',
        raised:
          '0 1px 0 rgba(24, 50, 74, 0.045), 0 18px 44px rgba(24, 50, 74, 0.10), 0 5px 14px rgba(24, 50, 74, 0.055)',
        cta:
          '0 1px 0 rgba(255, 255, 255, 0.36) inset, 0 14px 28px rgba(229, 111, 79, 0.22), 0 3px 9px rgba(24, 50, 74, 0.10)',
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
