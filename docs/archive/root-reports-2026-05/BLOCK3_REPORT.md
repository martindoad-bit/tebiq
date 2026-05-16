# BLOCK 3 REPORT — UI 重做（v5 原型 1:1 实现）

> 完成时间：2026-04-26  
> 提交范围：`6eebba0..04ab2e4`（10 commits 已推到 `main`）  
> 构建状态：✅ `npm run build` 通过（50 routes，零 TS 错误）  
> 视觉权威：`docs/prototype/v5-mockup.html`

---

## 1. 完成项 vs 计划

| 屏 | 路径 | 状态 |
|---|---|---|
| 01 首页（已登录 + 未登录） | `/` | ✅ |
| 02 拍照入口 | `/photo` | ✅ |
| 03 拍照结果（重要程度） | `/photo/result/[id]` | ✅ |
| 04 拍照结果（详细说明） | `/photo/result/[id]/detail` | ✅ |
| 05 续签自查入口 | `/check` | ✅ |
| 06 选择签证类型 | `/check/select` | ✅ |
| 07 自查问题 | `/check/[visa]` | ✅（QuizEngine 视觉重做） |
| 08 自查结果（中风险） | 同上 inline + 旧 `/check/result` | ✅（QuizResultView 视觉重做） |
| 10 订阅方案 | `/subscribe` | ✅ |
| 11 我的档案 | `/my/archive` | ✅ |
| 12 提醒中心 | `/my/reminders` | ✅ |
| 13 知识中心 | `/knowledge` | ✅ |
| 14 我的账户 | `/my/account` | ✅ |
| 15 拍照配额提示弹窗 | `app/photo/_components/QuotaFullModal.tsx` | ✅ |
| 登录 / 注册（v5 原型未画） | `/login` | ✅ |

15 / 15 完成。

## 2. 不在 brief 范围内（明确不做）
- 屏 09 邀请朋友 — Block 4
- AI 对话 — 后置
- Bedrock 真实拍照识别 — Block 5
- Stripe Dashboard 配置 — 创始人手动
- Resend 域名验证 — 创始人手动

---

## 3. 视觉系统基础

### Tailwind tokens（v5）
| Token | 值 | 用途 |
|---|---|---|
| `bg-canvas` | #FFF5E6 | 页面背景 |
| `bg-surface` | #FFFFFF | 卡片背景 |
| `bg-accent` | #F6B133 | CTA / active 强调 |
| `bg-accent-2` | #FFF8EA | 浅强调（icon bg / 高亮 card） |
| `text-ink` | #1E3A5F | 标题 / icon stroke |
| `text-ash` | #6E7A85 | 副文本 |
| `text-haze` | #B5B0A4 | tab 未选中 / placeholder |
| `bg-chip` | #F4EFE3 | search bar 灰底 |
| `bg-cool-blue` | #E6EEF5 | 蓝灰辅助 |
| `text-success` / `text-danger` | #57A77B / #E2574C | 安心绿 / 警示红 |
| `text-slate` | #4A5563 | 沉稳灰正文 |
| `border-hairline` | rgba(30,58,95,.08) | 0.5px 描边（卡片 / 分隔） |
| `rounded-card` / `rounded-btn` / `rounded-chip` | 14 / 12 / 10 | 圆角规范 |
| `max-w-phone` | 480px | 桌面居中宽 |

### 共享 shell（`app/_components/v5/`）
- `AppShell` — 页面外壳（mobile 全宽 / desktop max-w-phone 居中）
- `AppBar` — 返回箭头 + 标题 + 右 slot
- `TabBar` — 4 tab：首页 / 我的档案 / 知识 / 我的
- `Logo` — TEBIQ 深蓝方块 + 橙色 T
- `Button` — primary / secondary / success
- `Illustration` — 占位（Block 3 期间唯一与 v5 偏离的视觉项，Block 4 用 GPT Image 替换）

### 字体 / 图标
- font-family: `-apple-system → BlinkMacSystemFont → PingFang SC → Hiragino Sans → Noto Sans SC`
- 图标全部 lucide-react（统一 stroke 描边，避免 svg 不一致）

---

## 4. 路由结构变化

### 新增
- `/photo` / `/photo/result/[id]` / `/photo/result/[id]/detail`
- `/check/select` / `/check/[visa]`（动态）
- `/my/archive` / `/my/reminders` / `/my/account` / `/my/profile`
- `/subscribe`
- `/api/photo/recognize` / `/api/photo/quota` / `/api/photo/recent`

### 调整
- `/my` → redirect → `/my/archive`
- `/check` 从「直接跳 gijinkoku quiz」→ 改为屏 05 landing
- `/check/{visa}/quiz` × 4 → 都改为 redirect → `/check/{visa}`
- `/check/{visa}/page.tsx` 旧静态 info × 5（包括 eijusha）→ 删除（根级 `/{visa}` SEO 页提供同内容）

### 删除
- `app/_components/MobileNav.tsx`（被 v5/TabBar 取代，文件还在但没人 import）
- `app/_components/LegalFooter.tsx`（不再全局挂载，文件还在）

---

## 5. 拍照 mock + 配额追踪

### Mock API（Block 5 替换为 Bedrock vision）
- `POST /api/photo/recognize`
  - 鉴权 → 配额检查 → 写 documents 行（含 mock 识别结果）→ 返回 `{ documentId, result, quota }`
  - 配额超 → 402 `quota_exceeded`，前端用此触发屏 15 modal
  - mock fixture 在 `lib/photo/mock.ts`：住民税通知 / 大阪市役所 / urgency=high / ¥65,400 / 14 天内
  - Block 5 替换 mock.ts 即可，路由不动
- `GET /api/photo/quota` — 返回当前 family 月度配额状态
- `GET /api/photo/recent` — 返回最近 10 条 documents（首页 todo + /photo "最近记录" 共用）

### 配额逻辑（`lib/photo/quota.ts`）
- 免费 3/月（自然月，UTC 计算）
- 订阅用户（`subscriptions.status='active'|'trialing'` 且 `currentPeriodEnd` 未过）→ 无限
- 不需要新表，直接 count `documents.created_at + family_id`

---

## 6. CN/JP 混合文案（按 PROJECT_MEMORY 规则校对）

✅ 全部签证类型 → 日文原文：
- 技術・人文知識・国際業務 / 経営・管理 / 日本人/永住者の配偶者等 / 特定技能 / 定住者 / 家族滞在 / 留学

✅ 政府机构 → 日文原文：
- 入国管理局 / 市役所 / 税務署 / 年金事務所 / 大阪市役所

✅ 政府文件 / 专业概念 → 日文原文：
- 在留カード / 在留期間更新 / 住民票 / 住民税 / 確定申告 / 健康保険 / 年金 / 課税証明書 / 納税証明書 / 受理証明書 / 特例期间 / 契約機関に関する届出 / 源泉徴収票

✅ 法律页 / 条款 → 日文原文：
- 利用規約 / プライバシーポリシー

✅ 翻译为中文：
- UI 操作（保存 / 取消 / 上一题 / 下一题 / 立即订阅）
- 风险等级（中风险 / 高风险 / 低风险）
- 应用层概念（会员 / 订阅 / 邀请 / 拍照即懂）

⚠️ 留有「升级潜力」点：旧的 quiz 题库 learnMore 段落里仍有「在留资格更新」这种半中半日的混排（「资格」是中文词，原文应是「資格」）。Block 4 走过书士审核时同步替换。

---

## 7. 已知 issue / 妥协 / 延后项

### 7.1 插画占位
- v5 原型屏 05（续签插画）和屏 09（礼物盒）有定制插画
- Block 3 用 `<Illustration height={130} subject="..." />` 占位（橙色浅底 + 文字描述）
- 创始人后续用 GPT Image 生成后接进来

**插画清单**（Block 4 提交给 GPT Image）：
| 屏 | 占位 subject | 推荐尺寸 | 风格 |
|---|---|---|---|
| 05 续签自查入口 | "签证文件 + 检查清单 + 守护人物" | 263 × 130 px (容器 14px 圆角) | 米色 / accent-2 #FFF8EA bg，简约线条 + 局部色块（参考原型 SVG），人物占右侧 1/3，文件占左侧 2/3 |
| 09 邀请朋友（Block 4） | "礼物盒 → 朋友（双向送礼）" | 76 × 76 px × 2 个 | 同上风格，accent-2 圆角方形 bg |

### 7.2 拍照真实识别留 Block 5
- mock 当前对所有上传都返回固定 fixture（住民税通知）
- Block 5 替换 `lib/photo/mock.ts` 的导出为 `callBedrockVision(imageUrl)` 即可，路由不动

### 7.3 邀请功能（屏 09 + Block 4）
- "分享给朋友" 按钮当前指向 `/my/account`
- `/invite` 页面 + invitations DAL（已在 Block 1 schema）+ 7 天会员奖励逻辑都待 Block 4

### 7.4 「保存到我的档案」按钮
- 屏 03 / 04 / 08 都有这个按钮，目前点击 → toast / alert 占位
- documents 行已在 recognize 时写入；quiz_results 在 /api/results/save 已实装
- Block 4 加 `confirmed_at` 字段（如要做"用户主动保存"的语义）OR 直接去掉按钮（隐式保存）

### 7.5 订阅页
- 高级会员（¥19,800）暂用 `expert_consultation` Stripe product 占位
- Block 4 在 Dashboard 创建独立 `premium_yearly` product 后改 PLANS 一行
- "查看所有权益对比"（`/subscribe/compare`）页面没建

### 7.6 知识详情页
- `/knowledge/[id]` 没建，类别格 + 文章 card 都 link 到 `'#'`
- Block 4 实装

### 7.7 类别 keywords match 粗糙
- 知识中心 6 个类别用 keyword 在 title+content 里 match concepts
- concepts.ts 没有 `tags` 字段，准确性不如索引
- Block 4 加 tags 列后改用真索引

### 7.8 提醒数据稀薄时降级到 mock
- 当用户没填 `visaExpiry` / `lastVisaRenewalAt` 时，/my/reminders 显示 4 个固定 mock card（住民税缴纳 / 在留期間更新 / 年金更新 / 健康保険更新）
- 真实 reminder 拼装来自 `notifications` 表（Block 2 已建）— Block 4 跑通 cron 写入 + 这页拉取后即可移除 mock

### 7.9 quiz 引擎 5 个签证 yellow 阈值
- Block 1 把 SimpleQuiz 「≥2 yellow → 黄」改为 「≥1 yellow → 黄」（与 gijinkoku 一致）
- 当前继续保持，未回调

### 7.10 老的 _components 文件未删
- `MobileNav.tsx` / `LegalFooter.tsx` 没有 import 但文件还在；不删避免 git 历史割裂
- Block 4 清理时删

---

## 8. 验收标准核对

- [x] npm run build 通过（50 routes）
- [x] npm run lint：仅 12 个 `<img>` 历史 warning（未触动旧法律页的 logo），无新 error
- [x] 13 屏 + 登录注册 + 弹窗全部按 v5 原型实现
- [x] 中日混合文案严格校对（签证 / 政府 / 文件 / 专业概念全部日文原文）
- [⚠️] 响应式：mobile（375-440）OK；desktop max-w-phone 居中 OK；iPad 没单独优化（max-w-phone 480 在 iPad 上偏窄但可读，UI 视觉刷做时打磨）
- [x] mock 拍照 API 跑通（/api/photo/recognize 写 documents + 返回 fixture）
- [x] 配额追踪跑通（/api/photo/quota + recognize 触发 402 + 屏 15 modal）
- [x] 不破坏 Block 1/2 已有功能（npm run db:smoke 仍通过、Stripe checkout 路由仍可访问）

---

## 9. 文件改动汇总

```
10 commits · 56 files changed · +3,830 / -2,330 净 +1,500 行
```

主要新增：
- `app/_components/v5/{AppShell,AppBar,TabBar,Logo,Button,Illustration}.tsx`
- `app/photo/{page, _components/{PhotoUploader,RecentList,QuotaFullModal}}.tsx`
- `app/photo/result/[id]/{page,SaveToArchiveButton,detail/page}.tsx`
- `app/check/{select,[visa],[visa]/VisaQuizClient}.tsx`
- `app/my/{archive,reminders,account,profile}/{page,*Client}.tsx`
- `app/subscribe/page.tsx`
- `app/api/photo/{recognize,quota,recent}/route.ts`
- `lib/photo/{types,mock,quota}.ts`

主要修改（视觉重做）：
- `app/page.tsx` 首页 → 屏 01
- `app/login/page.tsx` 登录注册 v5 视觉
- `app/check/page.tsx` 跳 quiz → landing 屏 05
- `app/_components/{QuizEngine,QuizResultView}.tsx` 视觉重做
- `app/knowledge/page.tsx` v5 重写
- `tailwind.config.ts` v5 tokens
- `app/globals.css` 字体顺序 + 移除全局 h1/h2/h3
- `app/layout.tsx` 移除全局 MobileNav/LegalFooter
- `lib/check/questions/{gijinkoku,keiei,haigusha}.ts` visaName → 日文原文
- `next.config.mjs` 删 dead serverExternalPackages
- `app/sitemap.ts` 同步路由变更

主要删除：
- `app/check/{eijusha,keiei,haigusha,tokutei,teijusha}/page.tsx`（旧静态 info，根级 `/{visa}` SEO 页提供同内容）

---

## 10. 下一步（Block 4 优先级建议）

按重要性：

1. **接真实拍照** — Bedrock vision API 替换 `lib/photo/mock.ts`（Block 5 先放 Block 4 之前？看创始人优先级）
2. **插画接入** — GPT Image 生成屏 05 / 屏 09 插画，替换 `<Illustration>` 占位
3. **邀请朋友 /invite** — 屏 09 + invitations DAL 接入 + 7 天奖励发放逻辑
4. **/knowledge/[id] 详情页** — 现在 link 都是 #
5. **/subscribe/compare 权益对比页**
6. **「保存到我的档案」按钮**：决定 confirmed_at 字段 vs 隐式保存
7. **iPad / desktop 视觉打磨** — max-w-phone 在 iPad 偏窄
8. **删 MobileNav.tsx + LegalFooter.tsx + 旧 quiz/page.tsx redirect 文件**
9. **创始人手动**：Stripe Dashboard 配 4 个 product + coupon + webhook + 8 个 env；Resend 域名验证 + RESEND_API_KEY；Vercel 配 DATABASE_URL/DIRECT_URL/CRON_SECRET

---

**Block 3 完成。从「老 UI」彻底切到「v5 工具集形态」**。下一个 commit 推到 main 后，Vercel 自动部署，创始人就能在生产环境看到完整 v5 视觉。
