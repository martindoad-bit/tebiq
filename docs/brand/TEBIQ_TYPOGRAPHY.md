---
status: draft / internal / canonical for UI consumption / not production redesign
owner: GM
date: 2026-05-05
version: v0.1
canonical_source: docs/product/tebiq-v07-tokens.json (typography)
---

# TEBIQ Typography

> 字体规则索引。**不引入新字体**。

---

## Canonical Source

**真值**：`docs/product/tebiq-v07-tokens.json` `typography` 字段

---

## 字体栈

| 语言 / 用途 | 字体 |
|------------|------|
| 中文（简体）| Noto Sans CJK SC / Source Han Sans SC |
| 拉丁字母 / 数字 | Inter / SF Pro |

---

## Weights

| Weight | Value |
|--------|-------|
| Regular | 400 |
| Medium | 500 |
| Semibold | 600 |
| Bold | 700 |

---

## 使用规则

### ✅ 允许
- 引用上述字体栈
- 使用上述 4 weights
- 中文环境使用 Noto Sans CJK SC fallback 到 Source Han Sans SC
- 拉丁 / 数字使用 Inter fallback 到 SF Pro

### ❌ 禁止
- 不引入新字体（如 Roboto / Lato 等）
- 不使用 weights 之外的字重（如 Light 300 / Black 800）
- 不使用 italic（除非 brand canonical 明示）
- 不发明 typography scale（size / line-height）— 这部分由 CODEXUI 在 1.0 UI 规格中提 derived token 提案

---

## 已知项

- 当前没有正式的 typography scale（display / heading / body / caption sizes）
- 没有正式的 line-height 规则
- 没有正式的 letter-spacing 规则

CODEXUI 如需在 1.0 UI 中定义 typography scale，**必须**以 **Derived UI Token Proposal** 形式提出（见 `docs/brand/TEBIQ_BRAND_PACKAGE.md`），不直接当 canonical 使用。

---

## 在 1.0 Alpha 用户端的体感

| 区域 | 推荐 |
|------|------|
| Alpha 顶部提示 | Regular 14–16px |
| 流式正文 | Regular 16px line-height 1.6 |
| 标题（咨询页 H1）| Semibold 20–24px |
| 高风险轻提示 | Medium 14px |
| 反馈按钮 | Medium 14px |
| 中台 KPI 数字 | Bold 20–28px |

（以上为推荐组合，最终值由 CODEXUI 在 1.0 UI 规格中确定 + GM 复核）

---

## Production Limitations

- 不引入新字体到 production
- 不在 production 引入 derived size scale 直至 PL 复核
- web font 加载策略由 ENGINE 在实施时决定（FOUT vs FOIT），CODEXUI 不决定
