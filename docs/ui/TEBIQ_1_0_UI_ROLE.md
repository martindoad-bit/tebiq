---
status: draft / internal coordination / not production
owner: CODEXUI + GM
date: 2026-05-05
version: v0.1
charter: docs/product/TEBIQ_1_0_ALPHA_CHARTER.md
---

# TEBIQ 1.0 UI Role

> 1.0 Alpha 阶段 UI 范围 + 角色边界。区别于通用 CODEXUI Role（`docs/roles/TEBIQ_CODEXUI_ROLE.md`），本文件聚焦 1.0 Alpha 具体 UI 任务。

---

## 1.0 Alpha UI 范围

### 用户端

| 路径 | 用途 | UI 必备元素 |
|------|------|------------|
| `/`（入口）| 文字咨询输入 + 拍照上传 | 输入框 + 上传按钮 + Alpha 标识 |
| `/answer/[id]` 或 `/(consultation)/[id]` | 流式咨询回答展示 | Alpha 顶部提示 + 流式正文区 + 高风险轻提示（条件）+ 5 反馈按钮 + 保存按钮 |
| `/me/consultations` | 用户已保存问题列表 | 简洁列表 + 详情入口 + Alpha 标识 |

### 中台

| 路径 | 用途 |
|------|------|
| `/internal/learning-console` | 1.0 真实用户咨询记录中台（7 Tab + KPI）|
| `/internal/eval-console` | 既有 Eval Console（保持不变）|
| `/internal/eval-lab` | 既有标注工具（保持不变）|
| `/internal/preview` | 既有 Preview（保持不变）|

---

## P0 视觉硬约束

### Alpha 标识（用户端始终可见）

- 顶部固定 banner（流式过程中**不**消失）
- copy 引用：`docs/voice/TEBIQ_PREVIEW_STATE_COPY_MAP.md` (alpha_top_banner)
- 视觉：与正文区域视觉差异（颜色 / 边框 / 不可关闭）

### 流式回答（不是 loading）

- 0–2s：显示「已收到，正在生成方向」+ Alpha banner
- 首 token 起：流式展示正文 token by token
- 25s 仍未首 token：banner 追加「回答还在生成…」（不进入 timeout 状态）
- 90–120s 真失败：显示降级回答（[降级回答] 标记 + voice canonical fallback copy）

### 高风险轻提示

- 命中 13 关键词任一 → 回答区**上方**轻提示横幅
- copy 引用：`docs/voice/TEBIQ_PREVIEW_STATE_COPY_MAP.md` (risk_keyword_hint)
- 视觉：橙黄色调 + 边框（与 Alpha banner 区分但同等显眼）
- 流式过程中始终保留

### 降级回答标记

- title 起始 `[降级回答] `
- 视觉：与正常回答有明确区分（淡灰背景 / 标识 icon）
- 反馈按钮区显示「保存这个问题」+「想找人工确认」（其他 3 个按钮可选）

### 反馈按钮（5 类）

- 有帮助 / 不准确 / 我想补充情况 / 想找人工确认 / 保存这个问题
- 必须在流式回答完成后**立即**展示
- 中途失败也展示（用户可保存问题）

---

## Strictly Out of Scope（1.0 不做）

- ❌ Matter 卡片 / Matter 列表 UI
- ❌ Pro 后台 layout
- ❌ Partner Workspace
- ❌ 完整 OCR 文档管理 UI
- ❌ 预约 / 支付 / 派单
- ❌ 多端 native app 设计
- ❌ Authentication 完整 UI（用 production 既有 / 简版）
- ❌ Dashboard / BI 视觉

---

## 文件命名（1.0 Alpha 阶段）

| 文件 | 用途 |
|------|------|
| `docs/ui/TEBIQ_1_0_UI_ROLE.md`（本文件）| 1.0 UI 总览 |
| `docs/ui/TEBIQ_1_0_UI_CONSULTATION_PAGE.md`（待 CODEXUI 创建）| 用户端咨询页规格 |
| `docs/ui/TEBIQ_1_0_UI_LEARNING_CONSOLE.md`（待 CODEXUI 创建）| 中台 Learning Console 规格 |

不引入 `_v0.1.md` 命名后缀（DL-008 教训）。

---

## 与其他窗口的协作

| 与 | 关系 |
|----|------|
| GM | 接 Work Packet；输出 UI 规格 commit；通过 GM 派发给 ENGINE |
| ENGINE | 提供可实施规格（component breakdown / state diagrams）；不写实现代码 |
| VOICE | 引用 canonical copy（不写 copy 内容；只标 placement）|
| DOMAIN | 引用风险分级 / Console labels；不做风险分级 |
| QA | UI / interaction 测试参考（QA 不写规格）|

---

## Acceptance（CODEXUI 输出 1.0 UI 规格的标准）

- [ ] 含「不引入 user-visible copy 内容」的检查项
- [ ] 含「Alpha 标识在所有 user-facing 视图」检查项
- [ ] 含「流式 vs loading 视觉差异」说明
- [ ] 含「高风险路径视觉差异」说明
- [ ] 含「降级回答视觉差异」说明
- [ ] 引用 VOICE canonical（非 inline copy）
- [ ] 引用 DOMAIN labels（非 inline 风险术语）

---

## Production Limitations

- 1.0 UI 规格默认 **draft / Alpha-only**
- production UI 需 PL 显式裁决
- 不解锁 production copy（用户端必须可见 Alpha 标识）
