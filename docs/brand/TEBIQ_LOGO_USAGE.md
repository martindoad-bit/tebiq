---
status: draft / internal / canonical for UI consumption / not production redesign
owner: GM
date: 2026-05-05
version: v0.1
---

# TEBIQ Logo Usage

> Logo 使用规则索引。**不重做 logo，不引入新变体**。
> 资产源：`public/brand/tebiq-v07/svg/`

---

## 资产清单

| 资产 | 路径 | 用途 |
|------|------|------|
| 水平 logo | `public/brand/tebiq-v07/svg/tebiq-v07-logo-horizontal.svg` | 主导航 / Header / 通用横向 |
| 垂直 logo | `public/brand/tebiq-v07/svg/tebiq-v07-logo-vertical.svg` | 邀请卡 / 启动屏 / 纵向场景 |
| 符号 mark | `public/brand/tebiq-v07/svg/tebiq-v07-symbol-mark.svg` | 单色简化标识 |
| App Icon | `public/brand/tebiq-v07/svg/tebiq-v07-app-icon.svg` + `app-icon/*.png` | App / PWA / favicon |
| 单色 | `public/brand/tebiq-v07/svg/tebiq-v07-monochrome.svg` | 单色场景 |
| 深色模式 | `public/brand/tebiq-v07/svg/tebiq-v07-dark-mode.svg` | dark mode |
| 对话气泡 | `public/brand/tebiq-v07/svg/tebiq-v07-dialogue-bubble.svg` | 咨询场景 icon |

平台导出：
- Android: `public/brand/tebiq-v07/android/`
- iOS: `public/brand/tebiq-v07/ios/`
- PWA: `public/brand/tebiq-v07/pwa/`

App Icon 各尺寸：32 / 64 / 128 / 180 / 256 / 512 / 1024 px（PNG）

---

## 最小尺寸（来自 `tebiq-v07-tokens.json`）

| 项 | 数字 |
|----|------|
| horizontal_logo_digital | 120px width |
| vertical_logo_digital | 72px width |
| app_icon_digital | 32px minimum; 64px recommended |
| dialogue_bubble_icon | 24px minimum; 32px recommended |
| print_logo | 30mm width minimum |
| clearspace | at least 0.5× symbol width around the logo |

---

## 禁忌（来自 `tebiq-v07-tokens.json` `forbidden`）

- ❌ 不拉伸
- ❌ 不旋转
- ❌ 不改眼睛比例
- ❌ 不加表情
- ❌ 不改成 TEBIQ君
- ❌ 不加机器人 / 动物身体
- ❌ 不用作可爱 mascot

**Copy boundary**：Logo 可以轻拟人化，但产品文案不能拟人化。

---

## 使用规则

### CODEXUI / ENGINE 在 UI 中引用 logo

```jsx
// ✅ 正确：直接引用 SVG 资产
<Image src="/brand/tebiq-v07/svg/tebiq-v07-logo-horizontal.svg" alt="TEBIQ" />

// ❌ 禁止：内联 hex / 自绘 logo / 用文字"TEBIQ"代替
```

### 颜色
Logo 颜色由 SVG 内嵌定义，不要在使用方修改 fill / stroke。深色模式使用 `tebiq-v07-dark-mode.svg`。

### Favicon / App Icon
通过 `public/favicon.ico` + `public/apple-touch-icon.png` 接入；PWA 使用 `public/brand/tebiq-v07/pwa/`。

---

## Production Limitations

- 不允许重做 / 改 logo / 改 icon
- 不允许引入新 logo 变体（除非已有同方向资产）
- 任何 logo 相关疑问回 GM
