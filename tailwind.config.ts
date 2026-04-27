import type { Config } from 'tailwindcss'

/**
 * Visual Polish 2 — restrained Japanese utility palette.
 *
 * 目标不是继续强化“蓝 + 明橙 + 米黄”的儿童感，而是把 TEBIQ 转向
 * 纸白、墨青、赤金、灰绿这一组更像日本生活工具的成熟色彩。
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
        // 墨青：标题、正文重点、图标主色。比政府蓝更安静，保留工具感。
        ink: '#233B37',
        // 赤金：CTA、进度、重要点。降低黄橙饱和度，避免幼稚感。
        accent: '#C49A5A',
        'accent-2': '#F0E7D8',
        // 纸白灰：主背景。比原米黄冷一点，适合信息工具长期阅读。
        canvas: '#F6F4EF',
        // 卡片：带一点暖度的白，避免纯白在纸白底上发硬。
        surface: '#FFFEFA',
        // 边框 / 分隔线：中性色，不再跟主色强绑定。
        hairline: 'rgba(35, 59, 55, 0.105)',
        // 辅助色
        'cool-blue': '#E7EEE9',
        success: '#557C65',
        danger: '#B45A4E',
        slate: '#46534F',
        // 灰阶
        ash: '#707A75',
        haze: '#B7B1A7',
        chip: '#ECE8DF',

        // === Legacy aliases (Block 1/2 代码还在用，保留兼容) ===
        background: 'var(--background)',
        foreground: 'var(--foreground)',
        brand: {
          blue: '#233B37',
          orange: '#C49A5A',
          cream: '#F6F4EF',
          bluegray: '#E7EEE9',
          green: '#DDEBE1',
          gray: '#46534F',
        },
        verdict: {
          green: '#557C65',
          yellow: '#C49A5A',
          red: '#B45A4E',
        },
        base: '#F6F4EF',
        card: '#FFFEFA',
        line: '#DDE3DE',
        title: '#233B37',
        body: '#46534F',
        muted: '#707A75',
        primary: '#C49A5A',
        'primary-hover': '#B88E50',
        highlight: '#F0E7D8',
        'verdict-red': '#B45A4E',
        'verdict-yellow': '#C49A5A',
        'verdict-green': '#557C65',
        'risk-low-bg': '#DDEBE1',
        'risk-low-fg': '#557C65',
        'risk-mid-bg': '#F0E7D8',
        'risk-mid-fg': '#8B6231',
        'risk-high-bg': '#F3E3DE',
        'risk-high-fg': '#B45A4E',
        'risk-notice-bg': '#E7EEE9',
        'risk-notice-fg': '#233B37',
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
        // 更克制的层级：工具面板 10、主按钮 9、状态标签 7。
        card: '10px',
        btn: '9px',
        chip: '7px',
      },
      boxShadow: {
        // Neutral elevation: 不再用主色染阴影。
        soft: '0 1px 0 rgba(30, 28, 22, 0.035)',
        card:
          '0 1px 0 rgba(30, 28, 22, 0.035), 0 9px 22px rgba(34, 42, 38, 0.052)',
        raised:
          '0 1px 0 rgba(30, 28, 22, 0.045), 0 14px 30px rgba(34, 42, 38, 0.075), 0 3px 10px rgba(34, 42, 38, 0.04)',
        cta:
          '0 1px 0 rgba(255, 255, 255, 0.42) inset, 0 10px 22px rgba(111, 82, 42, 0.18), 0 2px 7px rgba(34, 42, 38, 0.08)',
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
