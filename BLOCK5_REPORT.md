# BLOCK5 Report

## 完成情况

1. Bedrock 真实拍照识别

- `/api/photo/recognize` 已从固定 mock 切到 Bedrock Claude Vision。
- 新增 `lib/photo/bedrock.ts`，负责图片校验、Bedrock 调用、JSON schema 校验、JST deadlineRemainingDays 计算和友好 fallback。
- 支持 JPEG / PNG / HEIC / HEIF 输入校验，最大 10MB。
- 输出保持现有 `PhotoRecognitionResult` 字段不变。
- 默认模型为 `anthropic.claude-sonnet-4-5-20250929-v1:0`，可用 `PHOTO_RECOGNITION_MODEL_ID` 覆盖。
- 默认区域为 `ap-northeast-1`，可用 `AWS_REGION` 覆盖。

2. 拍照识别测试集

- 新增 `scripts/test/photo-recognition-samples/`，包含 10 张合成 PNG 文书样本。
- 新增 `scripts/test/test-recognition.ts`，有 AWS 环境变量时跑真实识别，无环境变量时跳过。
- 新增 `docs/recognition-quality-report.md`，记录测试集、prompt 设计、质量判断和已知风险。

3. 邀请规则补完

- 一个 member 只能作为 invitee 成功领取一次，DB 增加 `invitations_invitee_member_unique`。
- pending 邀请码 30 天后自动标记 expired。
- 邀请人单月奖励上限默认 30 天，`INVITE_MONTHLY_REWARD_CAP_DAYS` 可配置。
- 邀请兑换失败只返回 `invitationAccepted=false`，不暴露内部失败原因。

4. Migration snapshot 同步

- 跑过 `npm run db:generate`。
- drizzle 初次生成了重复 articles/email 的 0004 migration，已手动改成真实增量。
- 保留新生成的 `0004_snapshot.json`，再次运行 `npm run db:generate` 已返回 `No schema changes`。

5. 永住页 CTA

- `/eijusha` 底部主 CTA 改为：`永住申请情况复杂,建议直接咨询行政書士`。
- 跳转到 `/consultation?from=eijusha&visa=eijusha`。

6. `/knowledge/[id]` slug 系统

- `articles` 增加 nullable unique `slug`。
- 旧 cuid URL 继续可用。
- 公开列表优先链接到 slug。
- `/admin/knowledge` 增加 slug 字段和生成建议按钮。
- 不新增 pinyin 依赖，使用轻量词典 + hash fallback 生成英文/数字/连字符 slug。

7. 审核记录

- `articles` 增加 `last_reviewed_at`, `last_reviewed_by`, `review_notes`。
- `/admin/knowledge` 增加审核记录区和“标记已审核”按钮。
- 标记审核会设置 `requires_shoshi_review=false`。
- 公开文章显示 `待书士审核` 或 `已审核 by XX`。

8. 预上线检查清单

- 新增 `docs/PRODUCTION_CHECKLIST.md`，覆盖创始人手动事项、环境变量、migration、DNS、Vercel、上线 smoke test、监控和首周指标。

## 验证

- `npm run lint` 通过。
- `npm run build` 通过。
- `npm run db:generate` 再跑返回无 schema 变化。
- `npx tsx scripts/test/test-recognition.ts` 在当前无 AWS 环境时按预期跳过，没有输出任何环境变量值。

## 待 Review 项

- AWS Bedrock 模型在 Tokyo 的严格数据驻留状态需要上线前由创始人在 AWS 控制台确认。代码默认使用 `ap-northeast-1`，但具体是否 strict in-region 取决于启用的模型/推理 profile。
- HEIC/HEIF 上传已放行，但 Bedrock SDK 类型不把 HEIC 列为一等 image media type。需要用真实 HEIC 手机照片验证。如果 Bedrock 拒绝，应增加 server-side 转换。
- 合成样本只覆盖清晰打印文书。上线前建议用 20-30 张打码真实手机照片做质量验收。
- 邀请月度封顶当前按“下一个 7 天奖励会超过 30 天则不再生成新邀请”处理，因此实际可能停在 28 天。若要精确给到 30 天，需要允许最后一次奖励只发 2 天，这属于产品规则细化。

## 创始人待操作清单

- 在 Vercel production 配置：
  - `AWS_ACCESS_KEY_ID`
  - `AWS_SECRET_ACCESS_KEY`
  - `AWS_REGION=ap-northeast-1`
  - `PHOTO_RECOGNITION_MODEL_ID`
  - `INVITE_REWARD_DAYS=7`
  - `INVITE_EXPIRY_DAYS=30`
  - `INVITE_MONTHLY_REWARD_CAP_DAYS=30`
- 在 AWS Bedrock 控制台确认模型 access 和 Tokyo 数据驻留。
- 本地或 preview 跑：

```bash
tsx --env-file=.env.local scripts/test/test-recognition.ts
```

- production 发布前运行 DB migration。
- 补完 Stripe / Resend 生产配置。
- 审核并发布第一批知识中心内容。

## 拍照识别质量自评

当前代码层面：8/10。

- 强项：字段稳定、prompt 约束明确、日文专业词保留、错误 fallback 友好。
- 风险：真实照片质量差异、HEIC runtime 支持、Bedrock 模型区域/成本、没有重复图片缓存。

如果真实红acted照片集通过率达到 85% 以上，可以作为 1.0 核心功能上线。

## 1.0 上线就绪度自评

技术就绪度：8.6/10。

已经具备 1.0 production 的主要代码路径：视觉、邀请、内容、登录态 fixture、通知 mock/真实切换、拍照识别、上线 SOP。

还缺的是外部账号配置和真实数据验收，不是主要应用代码：

- Stripe production price / webhook
- Resend domain
- AWS Bedrock model access +真实样本验收
- 第一批内容审核
- production migration + smoke test
