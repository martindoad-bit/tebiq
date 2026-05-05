---
status: GM-issued / ENGINE execute
owner: GM
target: ENGINE
date: 2026-05-05
version: v0.1
authority: TEBIQ 1.0 Alpha Sprint Directive §4.3
issue: https://github.com/martindoad-bit/tebiq/issues/40
charter: docs/product/TEBIQ_1_0_ALPHA_CHARTER.md
---

# Engineering Work Packet — 1.0 Alpha Photo Lite Consultation

> Photo Lite — 用户上传 / 拍照入口，识别大意，不做完整 OCR / 法律判断。

## 1. Scope

| § | 任务 |
|---|------|
| 1.1 | 上传 / 拍照 入口 UI（用户端入口页内）|
| 1.2 | 图片识别 lite（vision API 或 DS-V multimodal）|
| 1.3 | 识别结果作为 `image_summary` 输入到 streaming consultation pipeline |
| 1.4 | 用户能看到「这是什么 + 可能注意什么 + 下一步咨询方向」|

## 2. 范围限定（PL §4.3 explicit）

**支持的图片**：
- 日文通知书
- 入管材料
- 年金 / 税金截图
- 公司 / 雇佣相关片段

**只做**：
- 识别大意
- 解释这是什么
- 提醒可能注意什么
- 给下一步咨询方向

**不做**：
- 自动材料清单
- 自动法律判断
- 自动补救策略
- 完整 OCR 档案系统
- 跨图片比对 / 文档管理

## 3. 数据流

```
用户上传图 → vision/multimodal 识别 → image_summary（≤ 200 字）
           → 注入 streaming consultation pipeline 作为附加上下文
           → DS V4 Pro + system prompt 生成回答
           → 流式展示
```

## 4. 数据记录

扩展 §1.0 streaming pack 的字段：
- `has_image` = true
- `image_summary` = 识别摘要文本
- `image_storage_ref` = 图片存储引用（不暴露用户端）

## 5. Acceptance

| 项 | 要求 |
|----|------|
| A | 用户可在入口页上传 / 拍照 |
| B | 识别结果以咨询语气呈现，**不**作为最终判断 |
| C | image_summary 写入数据记录 |
| D | 流式回答与文字咨询路径一致（共用 streaming pipeline）|
| E | 图片储存符合最低 PII / 安全要求（不在公开 URL，按内部规范）|
| F | 不出现"这份文件意味着..." 类断言；只出现"这份文件看起来涉及..."类咨询语气 |

## 6. Out of Scope

- 不做 OCR 文字提取存储
- 不做文档分类系统
- 不做多图工作流
- 不做 PDF 导入
- 不做图片质量评分

## 7. Sensitive Path

**允许**：
- 用户端上传 UI（new component in `app/(consultation)/`）
- 新建 `app/api/consultation/upload/`（或类似）
- vision 识别接入（DS-V 或独立 vision provider，由 ENGINE 选择）
- 数据 schema 扩展（image fields）

**不可触及**：
- `app/api/internal/eval-lab/*`
- DeepSeek 原生 prompt（之外的 DS 配置）
- `eval_answers` schema（image 不进 eval lab）

## 8. Rollback

feature flag 禁用图片入口；保留文字咨询路径。

## 9. 完成回报格式

同 streaming consultation pack §12。
