---
status: draft / internal / canonical for UI consumption / not production redesign
owner: GM
date: 2026-05-05
version: v0.1
brand_direction: V07 Quiet Brow（已确认，不重新探索）
asset_mode: source-locked; no redesign
---

# TEBIQ Brand Package — Source of Truth Index

> 本文件是 TEBIQ 当前 VI / Brand Package 的 canonical source 索引。
> **不引入新方向**。**不重设计**。**不重新做 logo**。
> CODEXUI / ENGINE / QA 只消费本文件指向的资产。

---

## 当前品牌方向

**V07 Quiet Brow** — 已锁定。
- 不做 image2.0 视觉实验
- 不做新的视觉探索
- 不重新做 logo / icon / 主色体系

---

## Canonical Sources（按优先级）

### 1. Tokens（colors / typography / sizes / forbidden）

**`docs/product/tebiq-v07-tokens.json`**

包含字段：
- `colors` — 6 个核心色（inkBlue / deepSlate / coolGray / softGray / offWhite / warmAmber）
- `typography` — 中日西文字体 + weights
- `minimum_sizes` — 各尺寸最小边界（horizontal_logo_digital / vertical_logo_digital / app_icon_digital / dialogue_bubble_icon / print_logo / clearspace）
- `forbidden` — 7 条禁忌（不拉伸 / 不旋转 / 不改眼睛比例 / 不加表情 / 不改成 TEBIQ君 / 不加机器人或动物身体 / 不用作可爱 mascot）
- `copy_boundary` — Logo 可以轻拟人化，但产品文案不能拟人化

### 2. Logo / Icon / 视觉资产

**`public/brand/tebiq-v07/`**（完整目录）

```
public/brand/tebiq-v07/
├── svg/
│   ├── tebiq-v07-logo-horizontal.svg     主水平 logo
│   ├── tebiq-v07-logo-vertical.svg       垂直 logo
│   ├── tebiq-v07-symbol-mark.svg         符号 mark
│   ├── tebiq-v07-app-icon.svg            App Icon SVG
│   ├── tebiq-v07-monochrome.svg          单色版本
│   ├── tebiq-v07-dark-mode.svg           深色模式
│   └── tebiq-v07-dialogue-bubble.svg     对话气泡 icon
├── app-icon/
│   ├── tebiq-v07-app-icon-1024.png       7 sizes (32/64/128/180/256/512/1024)
│   └── ...
├── android/                              Android 平台导出
├── ios/                                  iOS 平台导出
└── pwa/                                  PWA 平台导出
```

### 3. 代码层 design tokens

**`components/ui/design-tokens.ts`** — TypeScript 类型化 tokens（CODEXUI / ENGINE 引用此文件，不引用 raw JSON）

**`tailwind.config.ts`** — Tailwind 配置（颜色 / 字体已接入）

### 4. Favicon / Apple Touch

- `public/favicon.ico`
- `public/apple-touch-icon.png`
- `public/favicon-16.png` / `public/favicon-32.png`
- `public/logo-icon.png`

---

## 消费规则（CODEXUI / ENGINE）

| 想用什么 | 读哪里 |
|---------|-------|
| 颜色（如 Ink Blue）| `tebiq-v07-tokens.json` 或 `components/ui/design-tokens.ts` |
| 字体 | `tebiq-v07-tokens.json` `typography` 字段 |
| Logo（水平 / 垂直 / 单色）| `public/brand/tebiq-v07/svg/` |
| App Icon | `public/brand/tebiq-v07/app-icon/` 或 SVG |
| 最小尺寸 | `tebiq-v07-tokens.json` `minimum_sizes` |
| 禁忌 | `tebiq-v07-tokens.json` `forbidden` |
| 平台导出（Android/iOS/PWA）| `public/brand/tebiq-v07/<platform>/` |

**禁止行为**：
- ❌ 不发明新颜色（必须从 6 个核心色选）
- ❌ 不发明新字体
- ❌ 不重做 logo
- ❌ 不改眼睛比例 / 不加表情
- ❌ 不基于聊天记忆使用色值
- ❌ 不在 `docs/ui/` 中直接写颜色 hex（必须引用 token name）

---

## Derived UI Token 提案

如果 1.0 Alpha UI 实施过程中发现 token 缺项（如 elevation / spacing / border radius scale 等），CODEXUI 可在 `docs/ui/` 中以 **Derived UI Token Proposal** 形式提出，**必须**：

- 标记 `status: needs review`
- 标记 `not canonical until GM + Project Lead approval`
- 不直接当 production token 使用

---

## Production Limitations

- 当前所有 brand 资产 status：**draft / internal / canonical for UI consumption / not production redesign**
- production 视觉变更需 PL 显式裁决
- 任何"重做 logo / 改主色 / 引入新方向"提议必须先回 GM 上报 PL

---

## Known Gaps

- elevation / shadow scale 是否已在 design-tokens.ts 中（需 CODEXUI 在 Phase 2 review）
- spacing / radius / motion tokens 完整性（同上）
- dark mode 全局 token 是否完整对照（dark-mode.svg 仅 logo 层）
- print 用 brand guideline（PDF）目前没有；如需 production print 用，需 PL 裁决补做
