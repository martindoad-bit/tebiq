---
status: draft / internal / canonical for UI consumption / not production redesign
owner: GM
date: 2026-05-05
version: v0.1
canonical_source: docs/product/tebiq-v07-tokens.json (colors)
code_source: components/ui/design-tokens.ts
---

# TEBIQ Color Tokens

> 6 个核心色 + 用途。**不发明新色，不引入第二色板**。

---

## Canonical Source

**真值**：`docs/product/tebiq-v07-tokens.json` `colors` 字段

**代码引用**：`components/ui/design-tokens.ts`（推荐 CODEXUI / ENGINE 引用）

**Tailwind**：`tailwind.config.ts`（已接入）

---

## 6 核心色

| Token | Name | Hex | Usage |
|-------|------|-----|-------|
| `inkBlue` | Ink Blue | `#0D2340` | 主 logo / text / app icon background |
| `deepSlate` | Deep Slate | `#3D4F66` | 二级 UI 表面 / 辅助 text |
| `coolGray` | Cool Gray | `#A3AAB5` | 不活跃 icon / 分割线 / 辅助线 |
| `softGray` | Soft Gray | `#E6E9EE` | 卡片边框 / 浅背景 |
| `offWhite` | Off White | `#FAF8F5` | 暖色背景 / 反白 mark |
| `warmAmber` | Warm Amber | `#D4A23A` | **仅** 用于截止日期 / focus accent |

---

## 使用规则

### ✅ 允许
- 在代码中通过 token name 引用（`tokens.colors.inkBlue` 等）
- 在 Tailwind 中通过已配置类名引用
- 在 SVG 中直接使用 hex（仅限 brand SVG 内）
- 高风险提示横幅使用 `warmAmber`（与 focus accent 统一）

### ❌ 禁止
- 不引入新 hex（必须从 6 token 选）
- 不在 `docs/ui/` 中 inline hex（必须引用 token name）
- 不基于聊天记忆使用色值
- `warmAmber` 不用作通用强调色（仅截止 / focus）
- 不引入第二色板 / 第二品牌色

---

## Derived Tokens（如需）

CODEXUI 如发现需要 elevation / shadow / overlay / state colors（hover / active / disabled）等派生 token，**不直接定义新 hex**。改为：

1. 在 `docs/ui/` 中提 **Derived UI Token Proposal**
2. 标记 `status: needs review`
3. 不当 canonical 使用
4. 等 GM + PL 复核

---

## 高风险 / Alpha 视觉

| 用途 | 推荐 token |
|------|----------|
| Alpha 顶部提示 | `softGray` 背景 + `inkBlue` 文字（保持低强度，但可见）|
| 高风险轻提示 | `warmAmber` 边框 + `offWhite` 背景 |
| [降级回答] 标识 | `coolGray` 边框 + `softGray` 背景（视觉降权）|
| 反馈按钮 | 默认 `deepSlate`；激活态 `inkBlue` |

（以上为参考组合，CODEXUI 在 1.0 UI 规格中可微调，需 GM 复核）

---

## Known Gaps

- 没有正式的 state colors（hover / active / focus / error）— CODEXUI 在 1.0 UI Phase 2 需提派生 token 提案
- elevation / shadow tokens 缺
- dark mode 全色板缺（仅 logo 有 dark variant）

未规范前不在 production 使用任何 derived token。
