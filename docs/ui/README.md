---
status: draft / internal coordination / not production
owner: CODEXUI + GM
date: 2026-05-05
version: v0.1
---

# docs/ui/

> TEBIQ UI 资产目录。CODEXUI 窗口的输出统一进入此目录。
> 区别于 `docs/product/`（产品宪章 / 状态 / 决策）和 `docs/voice/`（user-visible copy canonical）。

---

## 用途

- UI 规格 / 视觉 token / 组件 breakdown / interaction flow
- 用户端 UI 规范（入口页 / 咨询页 / 流式回答展示 / 反馈 / 保存）
- 中台 UI 规范（Eval Console / Learning Console / 标注工具）
- IA / 路由层级
- 视觉一致性约束

---

## 不放什么

- ❌ user-visible copy（→ `docs/voice/`）
- ❌ DOMAIN 风险分级（→ `docs/domain/`）
- ❌ 产品宪章（→ `docs/product/`）
- ❌ 工程 Work Packet（→ `docs/ops/`）
- ❌ ENGINE 实现代码（→ source tree）

---

## 文件命名规则

- `TEBIQ_<阶段>_UI_*.md`（如 `TEBIQ_1_0_UI_ROLE.md`、`TEBIQ_1_0_UI_CONSULTATION_PAGE.md`）
- `TEBIQ_INTERNAL_<console>_UI_*.md`（中台 UI）
- 不引入版本后缀（如 `_v0.1.md`）— 增量以小 patch 合入既有文件（DL-008 命名分裂教训）

---

## 引用 VOICE / DOMAIN

UI 规格中需要 user-visible copy 时，**不直接写 copy**，而是引用 VOICE canonical：

```
[Alpha 顶部提示] → docs/voice/TEBIQ_PREVIEW_STATE_COPY_MAP.md (alpha_top_banner)
[降级回答标记]   → docs/voice/TEBIQ_STATUS_LANGUAGE_TEMPLATES.md (provider_timeout state)
[高风险轻提示]   → docs/voice/TEBIQ_PREVIEW_STATE_COPY_MAP.md (risk_keyword_hint)
```

DOMAIN 风险标识 / 内部 label 同样以引用方式：

```
[内部 label 视觉规范] → docs/domain/DOMAIN_CONSOLE_LABELS.md
```

---

## 现有文件

| 文件 | 内容 | Status |
|------|------|--------|
| `README.md` | 本文件 | active |
| `TEBIQ_1_0_UI_ROLE.md` | 1.0 Alpha UI 范围与角色边界 | draft |

更多 UI 规格在 1.0 Alpha Sprint 推进过程中由 CODEXUI + GM 协作创建。

---

## 工作流

1. GM 在 Charter / Work Packet 中标记需要 UI 设计的范围
2. CODEXUI 接 GM Work Packet（如有）
3. CODEXUI 输出 UI 规格 → commit 到 `docs/ui/`
4. GM 二次审阅 + 登记 Artifact Registry
5. ENGINE 基于 UI 规格 + VOICE canonical + Charter 实施

---

## Production Limitations

- 所有 UI 资产默认 **draft / Alpha-only**
- production UI 需 PL 显式裁决
- 高风险路径必须有视觉差异（不能与正常回答外观相同）
