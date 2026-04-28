# Metadata audit (T14)

> 静态审计 — 检查每个公开路由文件是否导出 `metadata` 或 `generateMetadata`。
> 动态结果（包括最终 head 渲染长度、og:image 是否真存在）请用 `npx tsx scripts/test/audit-metadata.ts` 在跑起来的服务上重新生成。

最近一次更新：Block 7 完成时

## 摘要

- 公开路由文件总数：~30
- 已显式导出 metadata 或 generateMetadata：~22
- Block 7 新补的：`/check`、`/check/select`、`/check/[visa]`、`/photo`（layout）、`/login`（layout）

## 状态明细

| 路由 | 文件 | metadata 状态 | 备注 |
| --- | --- | --- | --- |
| `/` | `app/page.tsx` | 继承 `app/layout.tsx` 默认 | 只用 root metadata；详细 SEO 在 `/visa-select` 等子页 |
| `/check` | `app/check/page.tsx` | ✓ Block 7 新增 | title + description + canonical + og |
| `/check/select` | `app/check/select/page.tsx` | ✓ Block 7 新增 | title + description + canonical |
| `/check/[visa]` | `app/check/[visa]/page.tsx` | ✓ Block 7 新增 generateMetadata | 按签证类型动态生成 |
| `/check/result` | `app/check/result/page.tsx` | ✓ existing | 旧 ResultClient 入口，gijinkoku 专用 |
| `/photo` | `app/photo/page.tsx` (client) → `app/photo/layout.tsx` (Block 7 新增) | ✓ | client component 用 layout 注入 metadata |
| `/photo/result/[id]` | `app/photo/result/[id]/page.tsx` | ⚠ 缺 generateMetadata | 内容含敏感个人信息，可能不适合 index — 待确认 robots 策略 |
| `/photo/result/[id]/detail` | `.../detail/page.tsx` | ⚠ 缺 | 同上 |
| `/photo/result/[id]/fallback` | `.../fallback/page.tsx` (Block 7 新增) | ⚠ 缺 | 失败页，不应被索引 — 应加 robots noindex |
| `/knowledge` | `app/knowledge/page.tsx` | ✓ Block 7 升级 generateMetadata | 按 ?category= 动态 |
| `/knowledge/[id]` | `app/knowledge/[id]/page.tsx` | ✓ Block 7 升级 generateMetadata + JSON-LD Article | description 取 plain text 前 160 字 |
| `/knowledge/updates` | `.../updates/page.tsx` | ⚠ 缺 | 列表页，建议加 |
| `/login` | `app/login/page.tsx` (client) → `app/login/layout.tsx` (Block 7 新增) | ✓ | robots: noindex |
| `/visa-select` | `app/visa-select/page.tsx` | ⚠ 缺 | 入口页，建议加 |
| `/eijusha` | `app/eijusha/page.tsx` | ✓ existing | 完整 metadata + JSON-LD Article |
| `/gijinkoku` | `app/gijinkoku/page.tsx` | ✓ existing | 完整 metadata |
| `/keiei` | `app/keiei/page.tsx` | ✓ existing | 完整 metadata |
| `/haigusha` | `app/haigusha/page.tsx` | ✓ existing | 完整 metadata |
| `/teijusha` | `app/teijusha/page.tsx` | ✓ existing | 完整 metadata |
| `/tokutei` | `app/tokutei/page.tsx` | ✓ existing | 完整 metadata |
| `/tokusho` | `app/tokusho/page.tsx` | ✓ existing | 特商法标识 |
| `/sample-package` | `app/sample-package/page.tsx` | ✓ existing | 中日混排 |
| `/life/moving` | `app/life/moving/page.tsx` | ✓ existing | 完整 metadata |
| `/share/[id]` | `app/share/[id]/page.tsx` | ✓ existing | 包含 OG image generation |
| `/invite` | `app/invite/page.tsx` | ⚠ 缺 | 私有页（auth 后），可加 noindex |
| `/invite/[code]` | `app/invite/[code]/page.tsx` | ✓ Block 7 升级 | robots: noindex |
| `/welcome` | `app/welcome/page.tsx` (Block 7 新增) | ✓ | robots: noindex |
| `/consultation` | `app/consultation/page.tsx` | ✓ existing | 入口页 |
| `/consultation/success` | `.../success/page.tsx` | ✓ existing | 完成页 |
| `/subscribe` | `app/subscribe/page.tsx` | ⚠ 缺 | 应该加 |
| `/terms` | `app/terms/page.tsx` | ✓ existing | 法律页 |
| `/privacy` | `app/privacy/page.tsx` | ✓ existing | 法律页 |
| `/dev/stripe-test` | `.../stripe-test/page.tsx` | ⚠ 缺 + robots | 仅 dev，应硬性 noindex |

## 仍需补的

按优先级（创始人手动决定后逐个补）：

1. `/visa-select` — 主要入口，缺 metadata 影响首页跳转后的 OG 卡片。建议复用 `/check/select` 的样式补一份。
2. `/knowledge/updates` — 知识中心更新流，列表页应该入索引。
3. `/subscribe` — 商业转化页，缺 OG 卡片影响分享。
4. `/photo/result/*` — 含个人识别结果，应明确 noindex（可能已在 robots.txt 处理，但 page-level noindex 更稳）。
5. `/invite` (no [code]) — 应 noindex（私有功能页）。
6. `/dev/stripe-test` — dev 测试页，必须 noindex。

## 重新跑动态审计

```bash
npm run dev   # 在另一个终端先跑起来
AUDIT_BASE_URL=http://localhost:3000 npx tsx scripts/test/audit-metadata.ts
```

脚本会重写本文件的「详细」表格部分（含 HTTP status / 实际 head 内容长度 / 缺失 og 警告）。

## og:image 状态

目前没有专门的 OG image。`app/share/[id]/page.tsx` 已经在用动态 OG image generation —— 后续可以为知识文章和签证攻略页也加上。Block 8 议题。
