# TEBIQ 架构盘点报告

> 生成时间：2026-04-25  
> 用途：重建/重构前的现状清点。所有信息基于代码静态分析，未运行真实环境。  
> **本次盘点未修改任何代码**。

---

## 1. 项目基础信息

### 技术栈

| 项目 | 版本 |
|---|---|
| Next.js | 14.2.35 (App Router) |
| React | ^18 |
| TypeScript | ^5（strict mode） |
| Tailwind CSS | ^3.4.1 |
| Node 模块系统 | ESM (`"module": "esnext"`) |

### 关键依赖

| 包 | 版本 | 用途 |
|---|---|---|
| `@anthropic-ai/sdk` | ^0.90.0 | Claude API（**未实际使用**，被 bedrock-sdk 取代） |
| `@anthropic-ai/bedrock-sdk` | ^0.29.0 | AWS Bedrock 走 Claude（AI 问答 + 个性化材料注释） |
| `@upstash/redis` | ^1.37.0 | KV 存储客户端 |
| `iron-session` | ^8.0.4 | 安装但**未实际使用**（自实现 cookie+KV session） |
| `@react-pdf/renderer` | ^4.5.1 | 安装但**未实际使用**（PDF 走浏览器打印窗口） |
| `pdf-lib` | ^1.17.1 | 安装但**未实际使用** |
| `html2canvas` | ^1.4.1 | 结果页「保存为图片」功能 |

### 部署平台

- **Vercel**（Next.js 标准部署）
- 主分支：`main`，推送即上线
- 域名：`tebiq.jp`（CLAUDE.md 提及）

### 第三方服务

- **Upstash Redis**（东京 hnd1）— KV 存储
- **AWS Bedrock**（默认 us-east-1）— Claude Haiku 模型
- **GitHub** — `martindoad-bit/tebiq` 仓库
- **Vercel Cron** — 每日 UTC 9:00 跑入管局监控
- **Stripe** — CLAUDE.md 提及但**代码中无任何集成**
- **Resend / 邮件服务** — 无集成

### Vercel 配置（vercel.json）

```json
{ "crons": [{ "path": "/api/cron/check-immigration", "schedule": "0 9 * * *" }] }
```

### Next.js 配置（next.config.mjs）

```js
serverExternalPackages: ['@react-pdf/renderer']  // 防止 webpack 打包
```

### 环境变量清单（仅 key 名）

| Key | 用途 | 必需 |
|---|---|---|
| `tebiq_KV_REST_API_URL` | Upstash Redis URL | 否（fallback 到内存） |
| `tebiq_KV_REST_API_TOKEN` | Upstash Redis token | 否 |
| `ADMIN_KEY` | `/admin` 后台访问 + admin API 鉴权 | 否（不设=不拦） |
| `AWS_ACCESS_KEY_ID` | AWS Bedrock | 否（不设=mock 回答） |
| `AWS_SECRET_ACCESS_KEY` | AWS Bedrock | 否 |
| `AWS_REGION` | AWS Bedrock 区域 | 否（默认 us-east-1） |
| `NODE_ENV` | Next.js 标准 | 自动 |

> 注：所有环境变量都有降级，**没有任何变量是硬必需**。这是个优点也是个隐患（生产配置错了不会报错）。

---

## 2. 数据库现状

### 数据库类型

**Upstash Redis (KV)**，全部以 JSON value 形式存储。**无 Postgres、无任何关系数据库**。

### 存储抽象层

`lib/storage.ts` — 极薄封装：
- `storage.get<T>(key)` / `storage.set(key, value, {ex?})` / `storage.del(key)`
- 内置内存 fallback（无 KV 凭证时本地能跑，但生产**不能**用）

### Key 命名规范（实际在代码中使用的全部 key）

#### 用户体系
| Key 模式 | 类型 | TTL | 说明 |
|---|---|---|---|
| `user:{phone}` | `User { phone, createdAt, history: HistoryRecord[] }` | 永久 | 主用户记录，含历史 |
| `otp:{phone}` | `{ otp, createdAt }` | 5 分钟 | OTP 验证码 |
| `session:{sid}` | `phone` 字符串 | 30 天 | 会话 → 手机号映射 |
| `profile:{phone}` | `UserProfile` | 永久 | 用户档案（签证类型、到期日等） |
| `reminder:{phone}` | 提醒设置 | 永久 | 智能到期提醒 |

#### 业务数据
| Key 模式 | 类型 | TTL | 说明 |
|---|---|---|---|
| `consultation:{id}` | `Consultation` 完整记录 | 永久 | 咨询请求详情 |
| `consultations:index` | `ConsultationIndexEntry[]` | 永久（最多 500） | 咨询索引（admin 列表） |
| `share:{id}` | `ShareRecord { verdict, summary, visaType }` | 7 天 | 分享链接 |
| `case:{id}` | `RealCase` | 永久 | admin 录入的真实案例 |
| `processing-time:{visa}` | `ProcessingTimeRecord` | 占位 | 入管审查时间（cron 应该写但**未实现**） |

#### 监控
| Key 模式 | 类型 | TTL | 说明 |
|---|---|---|---|
| `monitor:{watchId}` | `{ hash, lastChecked }` | 永久 | 入管页面 SHA-1 |
| `monitor:alert:{watchId}` | `{ detected, date }` | 永久 | 检测到变化的告警 |

#### 统计 / 计数器
| Key | 用途 |
|---|---|
| `stats:user_count` | 总用户数 |
| `stats:tests:{YYYY-MM-DD}` | 当日测试次数 |
| `stats:result:{green\|yellow\|red}` | 各 verdict 累计计数 |
| `stats:recent` | 最近 50 次测试（含 triggeredItems） |
| `stats:case_count` | 真实案例总数 |
| `stats:case:{approved\|rejected\|returned}` | 案例分类计数 |
| `stats:cases:recent` | 最近 50 条案例 |

#### 杂项
| Key | 用途 |
|---|---|
| `admin:error_log` | 错误日志（最多 100 条） |
| `healthcheck:ping` | system-status 探活 |

### 表关系

无外键概念（KV 数据库）。隐式关系：
- `session:{sid}` → `user:{phone}` → `profile:{phone}` / `reminder:{phone}`（手机号是用户主键）
- `consultations:index` 是 `consultation:{id}` 的非规范化列表副本

### 数据量级

**未明确。** 没有运行时统计；KV 内容靠手工巡查。生产规模未知。

---

## 3. API 路由清单（共 24 个）

| 路径 | 方法 | 用途 | 鉴权 |
|---|---|---|---|
| `/api/auth/send-otp` | POST | 生成并下发 OTP | 无 |
| `/api/auth/verify-otp` | POST | 验证 OTP，建立 session | 无 |
| `/api/auth/me` | GET | 取当前登录用户 | session cookie |
| `/api/auth/logout` | POST | 销毁 session | session cookie |
| `/api/profile/get` | GET | 取当前用户 profile | session |
| `/api/profile/save` | POST | 保存当前用户 profile | session |
| `/api/reminder/get` | GET | 取到期提醒设置 | session |
| `/api/reminder/save` | POST/DELETE | 保存/删除到期提醒 | session |
| `/api/results/save` | POST | 保存自查结果到用户历史 | session |
| `/api/results/list` | GET | 列出当前用户历史 | session |
| `/api/stats/track` | POST | 匿名记录测试 verdict | 无 |
| `/api/stats/public` | GET | 首页公开统计数 | 无 |
| `/api/ask` | POST | AWS Bedrock 个性化问答 | session |
| `/api/generate-materials` | POST | 计算判定 + AI 生成「特别注意」 | session（可选） |
| `/api/share/create` | POST | 创建 7 天分享链接 | 无 |
| `/api/consultation` | POST | 提交咨询请求 | 无（自动关联当前 session 用户） |
| `/api/processing-time` | GET | 入管审查参考时间（占位实现） | 无 |
| `/api/monitor/status` | GET | 公开监控状态（lastChecked） | 无 |
| `/api/log-error` | POST | 客户端 error.tsx 上报 | 无 |
| `/api/cron/check-immigration` | GET | Vercel cron：抓取入管 7 个页面 SHA-1 比对 | 无（**没鉴权，应该加** `CRON_SECRET`） |
| `/api/admin/stats` | GET | admin 看板综合统计 | `?key=ADMIN_KEY` |
| `/api/admin/cases` | GET/POST | admin 真实案例 CRUD | `?key=ADMIN_KEY` |
| `/api/admin/system-status` | GET | AI/KV/monitor 健康检查 | `?key=ADMIN_KEY` |
| `/api/admin/consultations` | GET/PATCH | admin 咨询列表 + 状态流转 | `?key=ADMIN_KEY` |

### 输入 / 输出格式
- 全部 `application/json`
- 错误响应统一为 `{ error: string }` + HTTP 4xx/5xx
- 成功响应**没有统一信封**，各路由返回结构不同（部分 `{ ok: true, ... }`，部分裸字段）

### 鉴权机制

**两套**：
1. **用户**：`tebiq_user_session` httpOnly cookie → KV `session:{sid}` → phone
2. **Admin**：URL query `?key={ADMIN_KEY}`（明文 KEY 在 URL，**不安全**）

---

## 4. 页面清单（共 33 个）

### 首页 / 入口
| 路径 | 用途 | 状态 |
|---|---|---|
| `/` | 首页（含场景卡 + 步骤 + 数字） | ✅ 生产可用 |
| `/visa-select` | 6 种签证选择跳转 | ✅ 生产可用 |
| `/login` | 手机号 + OTP 登录 | ✅ 生产可用 |
| `/my` | 用户档案 + AI 助手 + 历史 + 到期提醒 | ✅ 生产可用 |

### 续签自查（核心业务）
| 路径 | 用途 | 状态 |
|---|---|---|
| `/check` | 技人国主问卷（12 题，分支） | ✅ 生产可用 |
| `/check/result` | 红/黄/绿判决页 | ✅ 生产可用（含付费/分享/材料包入口） |
| `/check/haigusha/quiz` | 配偶者问卷 | ✅ 生产可用 |
| `/check/tokutei/quiz` | 特定技能问卷 | ✅ 生产可用 |
| `/check/teijusha/quiz` | 定住者问卷 | ✅ 生产可用 |
| `/check/keiei/quiz` | 经营管理问卷 | ✅ 生产可用 |

### 签证介绍页（quiz 入口的解释页）
| 路径 | 用途 | 状态 |
|---|---|---|
| `/check/haigusha` | 配偶者说明 | ✅ |
| `/check/tokutei` | 特定技能说明 | ✅ |
| `/check/teijusha` | 定住者说明 | ✅ |
| `/check/keiei` | 经营管理说明 | ✅ |
| `/check/eijusha` | 永住说明（quiz **未建**） | ⚠️ 半成品（无 quiz） |

### SEO 落地页（v2 新建）
| 路径 | 用途 | 状态 |
|---|---|---|
| `/gijinkoku` | 技人国 SEO 完整指南 | ✅ |
| `/keiei` | 经营管理 SEO | ✅ |
| `/haigusha` | 配偶者 SEO | ✅ |
| `/eijusha` | 永住 SEO | ✅ |
| `/tokutei` | 特定技能 SEO | ✅ |
| `/teijusha` | 定住者 SEO | ✅ |

### 知识库
| 路径 | 用途 | 状态 |
|---|---|---|
| `/knowledge` | 概念库 + 搜索 + 最近更新 | ✅ |
| `/knowledge/updates` | 政策动态（年份+签证类型筛选） | ✅ |

### 生活节点
| 路径 | 用途 | 状态 |
|---|---|---|
| `/life/moving` | 搬家手续时间线 | ✅ |
| `/life/moving/quiz` | 搬家自查（6 题） | ✅ |

### 咨询 / 分享
| 路径 | 用途 | 状态 |
|---|---|---|
| `/consultation` | 咨询请求表单 | ✅ |
| `/consultation/success` | 提交成功页 | ✅ |
| `/share/[id]` | 朋友分享接收页 | ✅ |
| `/sample-package` | 付费材料包样例预览（blur） | ✅ |

### 法律页（v2 新建）
| 路径 | 用途 | 状态 |
|---|---|---|
| `/tokusho` | 特商法表示 | ✅ |
| `/privacy` | 隐私政策 | ✅ |
| `/terms` | 利用规约 | ✅ |

### 管理 / 其他
| 路径 | 用途 | 状态 |
|---|---|---|
| `/admin` | 后台（统计 + 案例录入 + 咨询管理） | ✅（密码保护） |
| `/sitemap.xml` | 自动生成 sitemap | ✅ |

### 全局组件
- `app/layout.tsx` — 根布局（注入 `LegalFooter` + `MobileNav`）
- `app/error.tsx` — 全局错误边界
- `app/_components/MobileNav.tsx` — 4 项底部 Tab Bar
- `app/_components/LegalFooter.tsx` — 站脚法律链接
- `app/_components/SimpleQuiz.tsx` — 4 个非技人国签证共用问卷引擎（444 行）
- `app/_components/Loading.tsx` — 共用 spinner

---

## 5. 核心业务逻辑

### 续签自查（技人国主流程）

**题库位置**：`lib/check/questions.ts`

**结构**：
```ts
QUESTIONS: Record<string, Question>  // 共 12 道题，编号 1,2,3,4,6,7,8,9,10,11,12,13（5 已并入 4）
START_ID = '1'
```

每题：`{ id, text, why, learnMore, options }`，每个 option 含 `next` 跳转目标 + 可选 `severity/triggerLabel/fixHint/selfFix`。

**判定函数**：`judge(history): JudgeResult` —— 遍历选项 severity，**任一 red → red，任一 yellow 且无 red → yellow，全无 → green**。

**摘要函数**：`buildSummary(verdict, result, history)` 在 `lib/check/summary.ts`，依赖 `SEVERITY_PRIORITY`（4=住民税、7=不法残留、2=换工作、6=社保）。

**进度条**：`longestPathFrom(qid)` 动态计算剩余最长路径深度。

### 其他签证问卷

**通用引擎**：`app/_components/SimpleQuiz.tsx` —— 接收 `SimpleQuizConfig { questions, materials, ... }`，支持 `showIf` 分支（与 `/check` 的 `next` 分支不同模型）。

**题库定义**：分散在 4 个 `app/check/{slug}/quiz/page.tsx` 文件内（共 6-9 题各）。

> **架构债**：技人国走自家流程（`app/check/page.tsx` + `lib/check/questions.ts` + `next` 字段），其他签证走 SimpleQuiz（`showIf`）。两套并存。

### 风险等级判断规则

- 选项预设 severity：`'red' | 'yellow' | undefined`
- 三色聚合：见上面 judge 函数
- 优先级排序（用于摘要 / 推荐）：`SEVERITY_PRIORITY` 哈希

### 材料包生成

**两层数据**：
- `lib/check/materials.ts` —— `GIJINKOKU_MATERIALS`（5 个分类 / 21 项材料）legacy 字段
- `lib/knowledge/materials.ts` —— `materialDetails`（19 项更详细，按日文官名索引）

**流程**：
1. `/api/generate-materials` 接收答题历史 + visaType
2. 跑 `judge()` + `buildSummary()`
3. 调 AWS Bedrock 生成 200 字「特别注意」
4. 返回 JSON（材料 + 触发项 + 摘要 + 个性化注释 + profile 快照）
5. 客户端 `DownloadPackage.tsx` 把 JSON 渲染成打印友好 HTML，开新窗口 → `window.print()`

**注意**：**没有真实 PDF 生成**。中文 PDF 字体问题未解决，依赖浏览器打印对话框「另存为 PDF」。

### 用户认证机制

- **手机号 + OTP**（无第三方登录）
- 流程：send-otp → 用户填验证码 → verify-otp → 建立 KV `session:{sid}` + 写 httpOnly cookie
- 30 天 cookie 过期
- **无邮箱、无密码**
- 自实现 session（虽然装了 `iron-session` 但没用）

### Stripe 支付集成现状

**完全没有集成。**

存在的相关代码：
- `lib/payment/stub.ts` — 接口骨架（`createOrder` / `verifyPayment` / `refundOrder` 等都 throw not implemented）
- `MaterialsPackage.tsx` 显示「¥380」按钮，点击触发**真实生成 PDF 流程**（不付费就能拿）
- 法律页 `/tokusho` 文案声称「Stripe」但代码无任何调用

> **结论**：付费流程是占位 + 假按钮 + 真生成。**重建必做支付集成**。

---

## 6. 可保留的资产

### 必须保留（删了就要重写）

| 资产 | 路径 | 备注 |
|---|---|---|
| **法律页文案** | `app/tokusho/`、`app/privacy/`、`app/terms/` | 创始人 + 法律审核版，重写代价高 |
| **特商法/隐私/利用规约**真实公司信息 | 同上 | hedgefox 合同会社 / 馬驍馳 / 下落合住所 |
| **6 个 SEO 落地页内容** | `app/{gijinkoku,keiei,haigusha,eijusha,tokutei,teijusha}/page.tsx` | 1100-1400 字 × 6，含 Article JSON-LD |
| **政策更新数据** | `lib/knowledge/policy-updates.ts` | 4 条 2025/10 - 2026/4 政策（含来源） |
| **概念知识库** | `lib/knowledge/concepts.ts` | 6 个概念（特例期间、技人国定义等） |
| **入管局监控目标** | `lib/monitor/watch-list.ts` | 7 个 URL，cron SHA-1 比对 |
| **VI 配色 token** | `tailwind.config.ts` | brand/verdict/risk-* 三套语义 token |

### 建议保留（复用能省时间）

| 资产 | 路径 | 复用方式 |
|---|---|---|
| **续签自查 13 题题库 + 判定逻辑** | `lib/check/questions.ts`（v2 措辞） | 业务规则资产，重建后直接迁移 |
| **材料数据 + 详情** | `lib/check/materials.ts` + `lib/knowledge/materials.ts` | 21 项 × 详细字段，难以重新整理 |
| **4 个非技人国签证题库** | `app/check/{haigusha,tokutei,teijusha,keiei}/quiz/page.tsx` | 题目内容值钱，引擎可重写 |
| **搬家手续清单** | `app/life/moving/page.tsx` | 时间线 + 6 题问卷 |
| **storage 抽象层** | `lib/storage.ts` | 即使换 Postgres 也可保留 API 形状 |
| **AdminClient 分析逻辑** | `app/admin/AdminClient.tsx` | TriggeredTopList 等组件可拆走 |
| **样例预览页布局** | `app/sample-package/page.tsx` | "blur+解锁覆盖"模式有重用价值 |
| **结果页"深呼吸"安抚卡** | `app/check/result/ResultClient.tsx` 红色页 | 文案值钱 |

### 可以丢

| 资产 | 原因 |
|---|---|
| **`app/check/page.tsx`** 主问卷实现 | 360 行，与 SimpleQuiz 重复，建议合并到一个引擎 |
| **`app/_components/SimpleQuiz.tsx`** 当前实现 | 444 行，showIf vs next 两套分支模型，重写更清爽 |
| **`app/check/result/ResultClient.tsx`** 750 行巨型文件 | 集成了 5 个子组件 + 3 个 verdict 视图，应该拆 |
| **`MaterialsPackage` + `DownloadPackage` + `ShareLinkButton` + `SignupBanner`** 当前实现 | 重写时按订阅模型重新设计 |
| **手机 OTP 登录** | CLAUDE.md 新方向用「家庭订阅」，邮箱 + magic link 更合适 |
| **`lib/payment/stub.ts`** | throw not-implemented，重做时直接接 Stripe |
| **`stats:*` 各种计数器** | 数据已说明可丢，重建用 Postgres 行计数即可 |
| **AdminClient 的 RecentRow / CaseForm / Real Case 录入** | 早期录入产品，没真实跑通 |
| **iron-session、@react-pdf/renderer、pdf-lib、@anthropic-ai/sdk** | 4 个装了不用的依赖 |
| **CSS 全局 `input/select/textarea { font-size: 16px }`** | 全局太宽，应改为 `@media` |

---

## 7. 技术债速览

### 1. 两套问卷引擎并存 ⚠️ 高优先级
- `app/check/page.tsx` 用 `next: string` 跳转 + `lib/check/questions.ts`
- `app/_components/SimpleQuiz.tsx` 用 `showIf: Record` 条件 + per-page config
- 两套类型不同（`Question` vs `QuizQuestion`），判定函数不同（都叫 `judge` 但签名不同）
- **后果**：加题/改题需要改两处；非技人国题库散落在 page 文件里

### 2. 巨型文件 + 强耦合 ⚠️
- `app/check/result/ResultClient.tsx` 750 行 = 3 个 verdict 视图 + 5 个子组件 + 2 个数据 hook
- `app/admin/AdminClient.tsx` 778 行 = 主 dashboard + 6 个子 panel
- 拆分成本不高，但越晚拆越痛

### 3. 类型不安全的边界 ⚠️
- `storage.get<T>(key)` 把 KV 读到的 `unknown` 强转 `T`，**无运行时校验**
- 所有 KV 数据没有 schema 验证（如 zod）
- 后果：旧 schema 改了 → 老数据 readback 不报错但字段缺失，bug 难定位

### 4. 没有错误处理 / 错误格式不统一
- 部分路由 try/catch，部分裸跑
- 错误响应有的 `{ error: string }`，有的 `{ error, details }`，前端各处重复处理
- `app/error.tsx` 兜底但只能接前端错误；后端 500 没有统一捕获

### 5. 鉴权方案不一致 / 不安全
- 用户走 cookie + KV，admin 走 URL query `?key=`（明文 KEY 在 URL 历史 / referrer / 服务器日志里）
- Cron 路由 `/api/cron/check-immigration` **完全无鉴权**，任何人 GET 都能触发抓取（应该 `CRON_SECRET` header 验证）
- 没有 CSRF 防护

### 6. 隐性架构债
- **首页 SEO 落地页 vs 签证介绍页路径冲突隐患**：`/gijinkoku` 是 SEO 长文，`/check/keiei` 是介绍页，命名不一致
- **lib/payment/stub.ts** 的接口和将来要接的 Stripe 不一致（Stripe 用 PaymentIntent / Subscription / Customer 模型）
- **stats:* 计数器**没有原子性（`get + set`，并发会丢更新）
- **SEVERITY_PRIORITY** 写死的 questionId 字符串，改题号会静默失效
- **`/check` quiz 按 `current.id` 显示「问题 X」**，所以删除 Q5 后 UI 显示「问题 1, 2, 3, 4, 6, ...」跳号
- **CLAUDE.md 提到的「拍照即懂」核心功能完全没建**

---

## 重建建议（仅供参考，不影响盘点结论）

基于这次盘点，**重建时建议确认的 5 件事**：

1. **数据库换 Postgres**（Supabase / Neon / Vercel Postgres），KV 仅用于 session/缓存。当前所有"业务数据"放 KV 是为了快速 MVP，重建必然碰瓶颈。
2. **统一一套问卷引擎**（推荐 SimpleQuiz 的 showIf 模型 + 全题库 JSON 化，从 `lib/quizzes/{visa}.json` 加载）。
3. **支付走 Stripe Subscription**（不是 Checkout）：v2 是订阅模型 ¥980/月 + ¥9,800/年。配套需要 Customer Portal、Webhook、配额追踪。
4. **认证换 Magic Link 邮箱**（订阅模型 + 家庭账号都更适合邮箱），保留 OTP 作为辅助。可考虑 `next-auth` / `@auth/core` 替换自实现。
5. **「拍照即懂」是新核心功能**：当前代码里完全不存在，需要从 0 设计：上传组件 + Bedrock vision API + 配额计数器 + 历史记录。

---

**报告结束。**  
全文基于代码静态分析，未运行环境验证。如有"未明确"的字段，是因为代码里没有显式信息（数据量级、生产 KV 实际内容等）。
