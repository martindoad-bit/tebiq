> **状态：** draft / preview-only / not production
> **版本：** v0.1
> **日期：** 2026-05-05
> **作者：** TEBIQ-VOICE
> **禁止 production 使用：** 是
> **待验收：** GM + 项目负责人

# TEBIQ Voice System Index v0.1

TEBIQ 语言系统 v0.1 全景导览。  
本文件是入口索引，不包含资产内容本身。

---

## 系统概述

TEBIQ Voice System 是一套语言规范体系，目标是：

**让 TEBIQ 在每一个接触点上都用正确的语言说正确的事。**

- 不是品牌手册
- 不是文案风格指南
- 是让系统、内容、QA、工程能对齐的语言操作规范

---

## 文件索引

### 基础规范

| 文件 | 内容摘要 | 主要受众 |
|------|---------|---------|
| [`VOICE_PRINCIPLES_v0.1.md`](VOICE_PRINCIPLES_v0.1.md) | 10 个核心声音属性 / 4 类禁止表达 / 三层语言体系 / 12 条 VOICE 红线 | 所有窗口 |
| [`RISK_LEVEL_VOCABULARY_v0.1.md`](RISK_LEVEL_VOCABULARY_v0.1.md) | L0-L3 四级风险等级语言规范 / 每级的示例和禁忌词 | VOICE / QA / DOMAIN |

### 场景库

| 文件 | 内容摘要 | 主要受众 |
|------|---------|---------|
| [`CLARIFICATION_LIBRARY_v0.1.md`](CLARIFICATION_LIBRARY_v0.1.md) | 10 个信息不足场景的 clarification 处理规范（Cl-01 到 Cl-10）| VOICE / QA / ENGINE |
| [`SCOPE_EXIT_ROUTING_FAILURE_LIBRARY_v0.1.md`](SCOPE_EXIT_ROUTING_FAILURE_LIBRARY_v0.1.md) | 4 类 OOS / 路由失败场景的语言处理规范 | VOICE / QA / ENGINE |
| [`HUMAN_REVIEW_TRIGGER_LIBRARY_v0.1.md`](HUMAN_REVIEW_TRIGGER_LIBRARY_v0.1.md) | L1 Advisory × 5 + L2 Mandatory × 5 的触发场景和文案方向 | VOICE / QA / DOMAIN |

### Copy Maps（系统状态文案）

| 文件 | 内容摘要 | 主要受众 |
|------|---------|---------|
| [`INTERNAL_CONSOLE_COPY_MAP_v0.1.md`](INTERNAL_CONSOLE_COPY_MAP_v0.1.md) | 14 个 `/internal/eval-console` 系统状态的 YAML 格式中台文案 | GM / QA / ENGINE |
| [`PREVIEW_STATE_COPY_MAP_v0.1.md`](PREVIEW_STATE_COPY_MAP_v0.1.md) | 10 个 `/internal/preview` 状态的用户端文案（内部预览用）| GM / QA |
| [`MATTER_V0_COPY_MAP_v0.1.md`](MATTER_V0_COPY_MAP_v0.1.md) | 15 个 Matter（我的事项）功能状态的文案 + 专业参照 block | VOICE / QA / ENGINE |

### 质量保证

| 文件 | 内容摘要 | 主要受众 |
|------|---------|---------|
| [`QA_VOICE_CHECKLIST_v0.1.md`](QA_VOICE_CHECKLIST_v0.1.md) | 30 条 VOICE QA 检查项，分 5 组（禁止承诺 / 禁止营销陪伴 / 风险等级匹配 / Human Review 表达 / 内部语言外露）| QA |
| [`DOMAIN_INPUT_REQUEST_v0.1.md`](DOMAIN_INPUT_REQUEST_v0.1.md) | 10 条待 DOMAIN 确认项（P0 × 5 阻塞性 + P1 × 5 建议性）| DOMAIN / GM |

### 变更记录

| 文件 | 内容摘要 | 主要受众 |
|------|---------|---------|
| [`INTEGRATION_PATCH_v0.1.md`](INTEGRATION_PATCH_v0.1.md) | 5 条 Integration Batch 修正记录，已集成到各文件 | GM / QA |

---

## 版本关系

```
TEBIQ Voice System v0.1
├── VOICE_PRINCIPLES_v0.1        ← 最高规范层，所有文案的判断基础
├── RISK_LEVEL_VOCABULARY_v0.1   ← 风险语言规范
├── CLARIFICATION_LIBRARY_v0.1   ← 信息补全场景
├── SCOPE_EXIT_ROUTING_FAILURE_LIBRARY_v0.1  ← 边界处理
├── HUMAN_REVIEW_TRIGGER_LIBRARY_v0.1        ← 人工介入触发
├── INTERNAL_CONSOLE_COPY_MAP_v0.1  ← 中台语言（Console）
├── PREVIEW_STATE_COPY_MAP_v0.1     ← 内部预览语言
├── MATTER_V0_COPY_MAP_v0.1         ← 用户端 Matter 语言
├── QA_VOICE_CHECKLIST_v0.1         ← 质量门控
├── DOMAIN_INPUT_REQUEST_v0.1       ← 待确认项
└── INTEGRATION_PATCH_v0.1          ← 变更记录
```

---

## 消费规则

| 角色 | 可消费的文件 | 前提条件 |
|------|------------|---------|
| ENGINE | Copy Maps（3 个）+ Clarification Library + Scope Exit Library | GM merge 后 |
| QA | QA Voice Checklist + Voice Principles | GM merge 后 |
| DOMAIN | DOMAIN Input Request + Human Review Trigger Library + Risk Level Vocabulary | GM merge 后 |
| GM | 所有文件（管理和协调）| — |
| CEO / 产品负责人 | Voice Principles + Risk Level Vocabulary | 验收决策用 |

**所有文件状态为 draft / preview-only / not production。  
GM merge 后方可进入 ENGINE / QA 消费流程。  
任何文件不得在 production 或 public beta 中使用，除非经 DOMAIN + 项目负责人双重验收。**

---

## 下一步

1. **GM merge 本 PR** → ENGINE / QA / DOMAIN 开始消费
2. **DOMAIN 处理 P0 待确认项**（D-P0-01 到 D-P0-05），完成后通知 GM
3. **GM 收到 DOMAIN 确认后通知 VOICE** 更新对应文案资产
4. **QA 使用 QA_VOICE_CHECKLIST** 对所有用户端文案做第一轮审查
5. **Voice System v0.2** 在 D-P0 全部确认 + Round 1A 数据支撑后启动
