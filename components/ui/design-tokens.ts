export const tebiqTokens = {
  color: {
    ink: '#0F2544',
    canvas: '#FAFAF7',
    paper: '#F2F4F7',
    surface: '#FFFFFF',
    textSecondary: '#6B7280',
    textAuxiliary: '#9AA0AC',
    hairline: '#E5E7EB',
    warning: '#F3A32B',
  },
  typography: {
    fontFamily:
      '-apple-system, BlinkMacSystemFont, "Noto Sans CJK SC", "Noto Sans SC", "Hiragino Sans", "Yu Gothic", YuGothic, "PingFang SC", sans-serif',
    weights: {
      light: 300,
      regular: 400,
      medium: 500,
    },
    numeric: {
      fontVariantNumeric: 'tabular-nums',
      fontWeight: 300,
    },
  },
  radius: {
    card: 14,
    control: 10,
    tag: 8,
  },
  spacing: {
    row: 56,
    module: 24,
    cardPadding: 16,
  },
  icon: {
    size: 20,
    strokeWidth: 1.5,
  },
} as const
