---
status: draft / internal / preview-only / not production
owner: TEBIQ-CODEXUI
review_required: Project Lead + GM before implementation acceptance
downstream_consumers: GM / ENGINE / QA / VOICE / DOMAIN
---

# docs/ui/

> TEBIQ UI 资产目录。CODEXUI 窗口的输出统一进入此目录。
> 区别于 `docs/product/`（产品宪章 / 状态 / 决策）和 `docs/voice/`（user-visible copy canonical）。
> 所有内容均为 internal / preview-only / not production。

---

## 用途

- UI 规格 / 视觉 token / 组件 breakdown / interaction flow
- 用户端 UI 规范（入口页 / 咨询页 / 流式回答展示 / 反馈 / 保存）
- 中台 UI 规范（Eval Console / Learning Console / 标注工具）
- IA / 路由层级
- 视觉一致性约束
- UI state machine / data mapping / QA checklist / handoff notes

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

## Brand / VI Source

UI docs do not define brand tokens. CODEXUI must consume the locked V07 Quiet Brow sources:

| Source | Path |
|---|---|
| Brand package index | `docs/brand/TEBIQ_BRAND_PACKAGE.md` |
| Logo usage | `docs/brand/TEBIQ_LOGO_USAGE.md` |
| Color tokens | `docs/brand/TEBIQ_COLOR_TOKENS.md` |
| Typography | `docs/brand/TEBIQ_TYPOGRAPHY.md` |
| Token truth | `docs/product/tebiq-v07-tokens.json` |
| Logo / icon assets | `public/brand/tebiq-v07/` |
| Code-level tokens | `components/ui/design-tokens.ts` |
| Tailwind integration | `tailwind.config.ts` |

Rules:

- Do not redesign logo, icon, or the primary color system.
- Do not invent new colors; use token names from the six-token V07 set.
- Do not inline hex values or font-family values in `docs/ui/`.
- Logo SVG files are consumed as assets; do not modify SVG fill or stroke.
- Any derived UI token proposal remains `needs review` and is not canonical until GM + Project Lead approval.

---

## 现有文件

| 文件 | 内容 | Status |
|------|------|--------|
| `README.md` | 本文件 | active |
| `TEBIQ_1_0_UI_ROLE.md` | 1.0 Alpha UI 范围与角色边界 | draft |
| `TEBIQ_1_0_UI_SCOPE.md` | 1.0 Alpha UI 页面范围 / P0 / P1 / out of scope | draft / preview-only |
| `TEBIQ_1_0_UI_WIREFRAME.md` | 用户端与 Learning Console wireframe | draft / preview-only |
| `TEBIQ_1_0_UI_STATE_MACHINE.md` | 流式回答 UI 状态机 | draft / preview-only |
| `TEBIQ_1_0_UI_COMPONENT_MAP.md` | 第一版组件清单与 props / state | draft / preview-only |
| `TEBIQ_1_0_UI_DATA_MAPPING.md` | UI 元素与数据字段映射 | draft / preview-only |
| `TEBIQ_1_0_UI_QA_CHECKLIST.md` | QA 检查表 | draft / preview-only |
| `TEBIQ_1_0_UI_HANDOFF.md` | GM / ENGINE handoff 与 mock/API/gap 记录 | draft / preview-only |

更多 UI 规格在 1.0 Alpha Sprint 推进过程中由 CODEXUI + GM 协作创建。

## Consumers

| Consumer | Recommended Files |
|---|---|
| ENGINE | `TEBIQ_1_0_UI_STATE_MACHINE.md`, `TEBIQ_1_0_UI_COMPONENT_MAP.md`, `TEBIQ_1_0_UI_DATA_MAPPING.md`, `TEBIQ_1_0_UI_HANDOFF.md` |
| QA | `TEBIQ_1_0_UI_QA_CHECKLIST.md`, `TEBIQ_1_0_UI_STATE_MACHINE.md`, `TEBIQ_1_0_UI_WIREFRAME.md` |
| Project Lead / GM | `TEBIQ_1_0_UI_SCOPE.md`, `TEBIQ_1_0_UI_WIREFRAME.md`, `TEBIQ_1_0_UI_HANDOFF.md` |
| VOICE | Placement requirements only; final copy remains in `docs/voice/TEBIQ_*.md` |
| DOMAIN | Risk label placement only; labels remain in `docs/domain/DOMAIN_CONSOLE_LABELS.md` |

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
