# TEBIQ 1.0 Web / App / PWA 形态决策调研

调研日期: 2026-04-29
角色: 战略调研分析师 alpha
结论性质: desk research + 竞品案例 + 跨境用户路径推演。不是最终拍板。

## 1. Executive Summary

### 一句话结论

TEBIQ 1.0 不建议先做原生 App。建议以 **Web 直接上线**, 同时在 1 周内补齐 **PWA-light** 能力: manifest / 主屏图标 / 基础离线壳 / 拍照稳定性 QA / 可选 Web Push 实验。原生 App 放到 3 个月后, 用真实留存和重复使用数据决定。

原因不是 App 不重要, 而是 TEBIQ 的首个关键动作是「点开 -> 拍文件 -> 得到判断 -> 归档」。跨境用户在 App Store / Google Play 的地区限制上有真实摩擦: 中国 Apple ID 不能下载仅上架日本区的 App; 切换 Apple Account 国家/地区前要处理余额、订阅、预购、家庭共享和新地区支付方式; Google Play 国家/地区也会影响可见内容, 需要身在当地和当地支付方式, 且切换有等待限制。对一个刚搬家、两地跑、账号体系混杂的用户, App 下载可能发生在 TEBIQ 证明价值之前。

### 创始人需要知道的 4 件事

1. **App Store 国家/地区是真门槛。** Apple 明确说明: 用户 Apple Account 的国家/地区决定其可购买/下载的 App Store; 如果账号设为日本, 才是日本 App Store。开发者可以选择 175 个国家/地区上架, 但用户端仍受账号地区约束。来源: [Apple App Store Connect - Manage availability](https://developer.apple.com/help/app-store-connect/manage-your-apps-availability/manage-availability-for-your-app-on-the-app-store)。

2. **PWA 在 2026 已可用, 但不是原生 App 平替。** iOS 16.4 起, 加到主屏幕的 Web App 可以用 Web Push、通知角标和独立窗口; 但 iOS 仍要求用户手动 Add to Home Screen, Push 只能在主屏 Web App 场景触发, 后台同步/系统级能力不如 Android Chrome 和原生 App。来源: [WebKit - Web Push for Web Apps on iOS and iPadOS](https://webkit.org/blog/13878/web-push-for-web-apps-on-ios-and-ipados/)。

3. **拍照功能不要求原生 App 才能跑。** Web 可通过 `<input type="file" accept="image/*">` 调起 iOS/Android 的拍照/相册选择, 也可用 `getUserMedia()` 做实时相机预览。对 TEBIQ 的文件拍照识别, 更稳的 1.0 做法是: 原生文件选择/拍照入口优先, 实时相机扫描只作为增强。来源: [web.dev - Capturing an image from the user](https://web.dev/media-capturing-images/) 与 [MDN - getUserMedia](https://developer.mozilla.org/en-US/docs/Web/API/MediaDevices/getUserMedia)。

4. **留存不是 App 天然胜利。** 移动 App 30 日留存公开基准并不高: AppsFlyer 汇总口径显示跨类别 Day 30 约 6%, iOS Business 类 Day 30 约 6.46%, Finance 类约 10.74%。App 的强项是 Push、主屏存在和重复入口, 但前提是用户先装上。TEBIQ 在 1.0 更应先验证「拍照 -> 归档 -> 下次回来」是否成立。来源: [AppsFlyer retention rate glossary](https://www.appsflyer.com/glossary/retention-rate/)。

### 我的建议

推荐路径: **Web 1.0 + PWA-light, 3 个月后按数据决定 App**。

App 触发条件建议:

- 激活用户 M1 留存达到 35%-40% 以上, 或至少明显高于同类早期工具基准。
- 25%-30% 以上激活用户创建了档案/提醒, 而不是只做一次性查询。
- 15%-20% 以上激活用户在 30 天内重复拍照/查看档案。
- 用户反馈里「想要 App / Push / 主屏入口」连续成为前 3 大需求。
- 跨境下载问题已通过「多国家上架 + Web fallback + 明确下载引导」解决。

## 2. App Store / Play Store 规则真相

### 2.1 日本 App Store 上架: 开发者侧要求

上架 iOS App 不存在「日本特别低门槛」。核心是 Apple Developer Program + App Store Connect。

开发者账号:

- Apple Developer Program 可个人或组织注册。
- 个人/个人事业主会以法定个人名显示为 App Store seller。
- 组织账号需要法人实体、D-U-N-S Number、绑定权限、公司域名邮箱和公开可访问的网站。
- Apple Developer Program 年费为 99 USD, 或当地货币等值; Enterprise Program 为 299 USD。
- 注册需要开启双重认证的 Apple Account, 并达到当地成年年龄。

来源: [Apple Developer - Program enrollment](https://developer.apple.com/help/account/membership/program-enrollment), [Apple Developer Japan - Enrollment](https://developer.apple.com/jp/support/enrollment/)。

审核周期:

- Apple 官方说法是平均 90% submission 在 24 小时内完成审核。
- 但资料不完整、登录说明缺失、账号/权限/支付/隐私问题都会延迟。
- 即使审核过了, App 在所选 storefront 生效也可能需要最多 24 小时。

来源: [Apple Developer - App Review](https://developer.apple.com/app-store/review/), [App Store Connect - statuses](https://developer.apple.com/help/app-store-connect/reference/app-and-submission-statuses/)。

税务/收款:

- 若 App 或 IAP 有收入, 需要在 App Store Connect 设置 Agreements, Tax, and Banking。
- 收款需要提供银行信息。
- 日本 iOS 规则正在变化。Apple 2025 年底宣布日本 iOS 的外部支付/链接相关变化, 涉及 Apple IAP、5% payment processing fee、15% store services commission 等。TEBIQ 若在原生 App 内卖数字订阅, 需要在 App 启动前单独做法务/支付政策复核。

来源: [Apple Developer - Overview of receiving payments](https://developer.apple.com/help/app-store-connect/getting-paid/overview-of-receiving-payments), [Apple Newsroom - changes to iOS in Japan](https://www.apple.com/newsroom/2025/12/apple-announces-changes-to-ios-in-japan/)。

### 2.2 用户 Apple ID / Apple Account 地区切换规则

Apple 官方要求用户在更改国家/地区前:

- 花完 Apple Account 余额。
- 取消会阻止地区变更的订阅, 并等到订阅周期结束。
- 等待会员资格、预购、租赁影片、Season Pass 和退款处理完成。
- 可能需要新国家/地区的有效支付方式。
- Family Sharing 成员可能无法变更地区。
- 需要提前重新下载以后还想用的 App / 音乐 / 影片 / 图书, 因为部分内容在新国家/地区不可用。
- 如果不想提供新地区支付方式, Apple 建议等到人在新国家/地区后创建新的 Apple Account。

来源: [Apple Support - Change your Apple Account country or region](https://support.apple.com/en-afri/118283)。

对 TEBIQ 的真实含义:

- **中国 Apple ID 不能下载仅上架日本区的 TEBIQ App。** 除非 TEBIQ 也上架中国区, 或用户切到日本区/创建日本 Apple Account。
- **切区不一定丢失已购买内容, 但会造成访问/重下/订阅/余额等风险。** Apple 明确提示部分内容可能在新地区不可用, 且要先处理余额和订阅。
- **多账号操作成本高。** 熟练用户可以用日本 Apple Account 下载日本区 App, 再切回中国账号; 普通用户会遇到密码、支付方式、家庭共享、订阅、更新和客服问题。
- **对 1.0 转化最危险的是: 用户还没看到 TEBIQ 价值, 就先被 App Store 地区问题拦住。**

### 2.3 Google Play: 同样有地区问题, 且中国 Android 更复杂

用户侧:

- Google Play 国家/地区决定用户在 Play Store 看到的 App、游戏和内容。
- 要设置新国家/地区, 用户必须身处当地, 并拥有该国家/地区的支付方式。
- Google 帮助页写明: 初次设置后至少要等 90 天才能变更, 后续变更也至少有 90 天间隔; 某些情况下有额外限制。
- 用户在 Google family group 中不能切换国家/地区。
- 切换后可能失去部分图书、影视、游戏和 App 的访问。
- Google Play 余额绑定旧国家/地区, 切区后不能在新地区使用。
- 订阅会留在旧 payment profile 上; 若新国家/地区不提供该订阅, 开发者也可能取消。

来源: [Google Play Help - Change your Google Play country](https://support.google.com/googleplay/answer/7431675/change-your-google-play-country-computer?co=GENIE.Platform%3DDesktop&hl=en-GB)。

开发者侧:

- Google Play Developer Account 通常有一次性 25 USD 注册费。官方费用信息在 Play Console 注册流程中出现; 公开官方文档搜索结果不如 Apple 清晰, 但 Google 在监管文件和大量帮助材料中承认该费用。
- 日本税务上, Google Play 帮助页说明: 若开发者位于日本, 面向日本客户的 paid app / IAP 的 Japan Consumption Tax 由开发者负责判断、收取和申报; 若开发者位于日本以外, Google 负责日本客户交易的 JCT。

来源: [Google Play Help - tax rates and VAT](https://support.google.com/googleplay/android-developer/answer/138000?hl=en), [Google Play Developer verification - Japan](https://support.google.com/googleplay/android-developer/answer/15633622?co=GENIE.CountryCode%3DJP&hl=en)。

对 TEBIQ 的真实含义:

- Android 不是自动解决方案。Google Play 也有地区/支付/家庭组/余额问题。
- 对从中国出发的 Android 用户, 还要验证目标设备是否有 Google Play / Google Play Services。中国大陆常见 Android 渠道不是 Google Play, 但本轮没有做 TEBIQ 目标用户设备占比实测, 标为「待创始人验证」。
- 若为了绕开 Google Play 做 APK 分发, 会引入安全信任、更新、病毒误报、客服和品牌风险。TEBIQ 1.0 不建议这样做。

### 2.4 类似产品怎么处理

#### LINE

LINE 的下载形态是全球 App + 区域功能差异。LINE 官方帮助中心强调账号转移依赖旧设备、手机号、Apple ID / Google Account 等信息; 部分地区手机号注册/转移规则有限制。它能处理跨境, 是因为它已经是超级 App, 用户愿意为它处理账号麻烦。TEBIQ 1.0 不具备这种安装动机。

来源: [LINE Help - account transfer](https://help.line.me/line/?contentId=20000098), [LINE Business Guide](https://www.linebiz.com/sites/default/files/media/jp-en/download/EN_LINE%20Business%20Guide_202304-09_summary.pdf)。

#### PayPay

PayPay 是日本本地支付 App, App Store 链接是日本区, Google Play 也以日本支付/商户场景为核心。它的使用动机发生在线下支付, 用户在日本当地被商户强触发, 所以能承受下载/手机号/实名认证等摩擦。TEBIQ 的首个触发更像「收到一张看不懂的纸」, 不应该先要求用户通过日本区 App Store。

来源: [PayPay App Store JP](https://apps.apple.com/jp/app/paypay-%E3%83%9A%E3%82%A4%E3%83%9A%E3%82%A4/id1435783608?l=en-US), [PayPay Google Play](https://play.google.com/store/apps/details?id=jp.ne.paypay.android.app), [PayPay press release - Google Play payments](https://about.paypay.ne.jp/en/pr/20231026/02/)。

#### SmartHR

SmartHR 是 Web + 手机 App 双轨。官方系统要求仍支持手机浏览器: iOS/iPadOS 最新 Safari, Android 最新 Chrome; 同时提供员工向智能手机 App, 用于公司通知 Push 和手机操作。SmartHR 的策略对 TEBIQ 有参考价值: **核心系统先保证浏览器可用, App 用于通知和重复入口。**

来源: [SmartHR system requirements](https://support.smarthr.jp/en-us/help/articles/360035170054/), [SmartHR mobile app help](https://support.smarthr.jp/ja/help/articles/349ed9e2-2ecc-4af0-8482-b86fd03709dc/), [SmartHR App Store JP](https://apps.apple.com/jp/app/smarthr-%E3%82%B9%E3%83%9E%E3%83%BC%E3%83%88%E3%82%A8%E3%82%A4%E3%83%81%E3%82%A2%E3%83%BC%E3%83%AB/id6446607328)。

#### WeChat Pay / 微信生态

WeChat Pay 的跨境策略不是让用户下载一堆目的地 App, 而是把支付能力放在 WeChat 里, 通过合作方接入本地商户。PayPay 2025 年宣布接入 WeChat Pay, 面向中国大陆访日游客做跨境支付。对 TEBIQ 的启发是: 中国用户生态里, **链接、公众号/小程序、微信群、Web 页** 往往比 App Store 下载更顺滑。

来源: [PayPay - WeChat Pay integration](https://about.paypay.ne.jp/en/pr/20250904/01/), [WeChat App Store listing](https://apps.apple.com/us/app/wechat/id414478124)。

#### 在日华人服务

公开可见的在日华人服务很多仍以 Web / 社区 / 微信分发为主。例如小春网是 Web 社区; App Store 里也存在「在日华人中文网站」类 App, 但它们不是强监管/高频核心工具。对 TEBIQ 更稳的策略是先把 Web 链接做成可被群聊、文章、SEO、咨询师、公司 HR 转发的入口。

来源: [小春网](https://www.incnjp.com/), [八幡町 App Store listing](https://apps.apple.com/us/app/%E5%85%AB%E5%B9%A1%E7%94%BA-%E5%9C%A8%E6%97%A5%E5%8D%8E%E4%BA%BA%E5%85%A8%E6%96%B0%E4%B8%AD%E6%96%87%E7%BD%91%E7%AB%99/id1489914715?l=zh)。

## 3. PWA 2026 能力真相

### 3.1 iOS Safari / Home Screen Web App 能力

可用能力:

- Add to Home Screen: iOS 很早就支持把网站加到主屏幕。若站点有 manifest 且 display 为 standalone/fullscreen, 可像独立 App 一样打开。
- Web Push: iOS/iPadOS 16.4 起, 主屏 Web App 可以请求 Push 权限; 请求必须来自用户直接操作, 例如点击订阅按钮。
- 通知显示位置: 锁屏、通知中心、配对 Apple Watch。
- Badging API: iOS/iPadOS 16.4 起支持主屏图标角标。
- 不需要 Apple Developer Program 即可用 Web Push, 但服务器需允许 `*.push.apple.com`。
- Safari 17 / iOS 17 改进了 Storage API 与 Home Screen Web App 存储策略。
- Safari 18.4 对 Home Screen Web App 增加了 Screen Wake Lock 支持。

来源: [WebKit - Web Push for Web Apps](https://webkit.org/blog/13878/web-push-for-web-apps-on-ios-and-ipados/), [WebKit - Updates to Storage Policy](https://webkit.org/blog/14403/updates-to-storage-policy/), [WebKit - Safari 18.4](https://webkit.org/blog/16574/webkit-features-in-safari-18-4/)。

关键限制:

- iOS 没有 Android Chrome 那种顺滑的安装提示体系。用户通常要点 Share -> Add to Home Screen。
- iOS Web Push 只对加到主屏幕的 Web App 有意义, 普通 Safari 浏览网页不能当成原生 Push 使用。
- 后台同步、定时后台任务、系统分享扩展、小组件、深层文件系统能力等仍不如原生 App。
- Safari / WebKit 对相机、存储、后台生命周期的实现有历史 bug, 拍照型 PWA 必须做真机 QA。

### 3.2 Android Chrome PWA 能力

Android Chrome PWA 的能力整体强于 iOS:

- 安装提示更成熟, 可从浏览器安装到 launcher。
- Web Push、Service Worker、Cache Storage、IndexedDB、camera/microphone 等能力较成熟。
- 可通过 Trusted Web Activity 把 PWA 包进 Google Play, 但这仍不能解决中国 Android 无 Google Play 的问题。

来源: [web.dev - PWA installation](https://web.dev/learn/pwa/installation?hl=en), [web.dev - PWA capabilities](https://web.dev/learn/pwa/capabilities/), [web.dev - define install strategy](https://web.dev/articles/define-install-strategy)。

### 3.3 拍照: TEBIQ 核心能力可行, 但实现要保守

TEBIQ 的拍照不是美颜、视频、AR 或连续扫码, 而是文书识别。1.0 建议用以下策略:

- 第一优先: `<input type="file" accept="image/*">`。在 iOS/Android 上会给用户「拍照 / 相册 / 文件」选择, 可靠且可拿到高分辨率图片。
- 第二优先: 支持相册上传。很多用户会先用系统相机拍文件, 再从相册选。
- 第三优先: `getUserMedia()` 实时相机预览, 仅用于后续增强, 如自动裁边、实时质量提示。
- 必须做: HEIC/大图压缩、低网速上传恢复、权限被拒后的 fallback、隐私提示、iOS Safari + iOS Home Screen PWA + Android Chrome 真机测试。

来源: [web.dev - Capturing an image from the user](https://web.dev/media-capturing-images/), [MDN - MediaDevices.getUserMedia](https://developer.mozilla.org/en-US/docs/Web/API/MediaDevices/getUserMedia)。

### 3.4 PWA 真实安装率与体验差距

没有找到能直接套用到「在日外国人文书工具」的公开 PWA 安装率 benchmark。可用事实只有:

- Twitter Lite PWA 成为 Twitter 默认移动 Web 体验后, pages/session +65%, Tweets sent +75%, bounce rate -20%; home-screen 启动用户达到每日 25 万, 平均每天启动 4 次。这证明 PWA 可提高移动 Web 的重复访问, 但不是 TEBIQ 赛道数据。
- web.dev 建议把 PWA installation funnel 单独测量: 是否看到安装提示、是否接受、是否从主屏启动、安装用户与未安装用户价值差异。

来源: [web.dev - Twitter Lite case study](https://web.dev/case-studies/twitter), [web.dev - drive business success with PWA](https://web.dev/articles/drive-business-success)。

对 TEBIQ 的判断:

- PWA 不是增长渠道, 是降低回访摩擦的增强。
- iOS 用户必须被教育「添加到主屏幕」, 所以不能把 PWA 安装率当成 1.0 主 KPI。
- PWA 对 TEBIQ 最有价值的位置不是首页, 而是识别结果页、档案页、提醒页: 用户已经看到价值后, 再提示添加主屏。

### 3.5 类似工具型产品案例

- **SmartHR:** Web 浏览器仍是官方支持路径, 手机 App 承担 Push 和员工移动操作。参考价值高。
- **Twitter Lite:** PWA 改善移动 Web 性能和重复入口, 说明大规模产品可把 PWA 当作默认移动 Web。
- **Photopea:** 复杂图像编辑工具长期以 Web/PWA 方式存在。它证明「工具型产品不必天然原生 App 起步」, 但其场景以桌面/浏览器为主, 和 TEBIQ 移动拍照场景不完全一致。

来源: [SmartHR system requirements](https://support.smarthr.jp/en-us/help/articles/360035170054/), [Twitter Lite PWA case study](https://web.dev/case-studies/twitter), [Photopea official website](https://www.photopea.com/)。

## 4. 留存 Benchmark

### 4.1 Web / SaaS / 数字产品留存

公开资料里, 最接近 TEBIQ 的不是传统 B2B SaaS revenue retention, 而是 product retention。

Mixpanel 2024 Benchmarks Report 基于 7,700+ 客户和 11.7 trillion anonymous events。其公开摘要显示: 2023 年跨行业平均 week-one retention 从 50% 下降到 28%; top 10% 产品的表现超过平均水平两倍以上。

来源: [Mixpanel 2024 Benchmarks Report article](https://mixpanel.com/blog/2024-mixpanel-benchmarks-report/), [Mixpanel 2024 Benchmarks PDF](https://mixpanel.com/wp-content/uploads/2024/01/2024_Benchmarks_Report.pdf)。

TEBIQ 不能直接套这个数:

- TEBIQ 是低频、高焦虑、事件驱动型工具, 不是每日内容/社交/金融 App。
- Week-one retention 对「收到文件后立即解决」有意义, 但 M1 留存要看用户是否建立档案/提醒。
- 更合理的早期指标: activated retention, 即完成至少一次拍照识别/归档后的用户是否回来。

建议 TEBIQ 自设基准:

- D7 activated retention: 25%-35% 可接受, 35%+ 好。
- M1 activated retention: 25%-35% 可接受, 35%-40%+ 才值得认真投入 App。
- 档案/提醒创建率: 25%-30%+ 才说明不是一次性 AI 玩具。

这些阈值是策略假设, 不是公开行业标准。需创始人用真实数据校准。

### 4.2 Mobile App 工具型留存

AppsFlyer 汇总口径:

- 跨 31 个移动 App 类别, 平均 Day 1 retention 约 25%, Day 30 约 6%。
- iOS Business: Day 1 13.88%, Day 30 6.46%。
- Android Business: Day 1 16.09%, Day 30 6.98%。
- iOS Finance: Day 1 21.58%, Day 30 10.74%。
- Android Finance: Day 1 16.96%, Day 30 9.27%。
- iOS Education: Day 30 3.23%; Android Education: Day 30 2.69%。

来源: [AppsFlyer - Retention rate](https://www.appsflyer.com/glossary/retention-rate/)。

Business of Apps 2025 另一个二级来源显示, 平均 App Day 30 retention 在 iOS 约 3.7%, Android 约 2.1%, 且日本 Day 30 retention 最高、中国最低。这个来源口径与 AppsFlyer 不完全一致, 但方向一致: App 安装不等于高留存。

来源: [Business of Apps - App retention rates 2025](https://www.businessofapps.com/data/app-retention-rates/)。

### 4.3 同一产品 Web vs App 的真实案例

没有找到与 TEBIQ 完全同赛道、同时公开 Web vs Native App 留存的可靠数据。

可参考但不能套用:

- Twitter Lite PWA 是 mobile web/PWA 改造, 不是原生 App 对照实验; 它公开的是 engagement, 不是 retention。
- SmartHR 是 Web + App 双轨, 公开资料说明 Web 浏览器仍被支持, App 用于 Push 和移动操作; 但没有公开 Web vs App 留存差。

结论:

- App 可能提高已安装用户回访, 但会降低跨境用户的首次可达性。
- TEBIQ 1.0 的最大风险是 PMF 未验证前把资源花在分发外壳上。
- App 决策应基于 TEBIQ 自己的 cohort: 完成首次识别后的 7/30 日回访、档案查看、提醒打开、付费转化。

### 4.4 在日华人产品渠道分布

没有找到可信公开数据能回答「在日华人服务 Web 来源 vs App 来源占比」。本轮只能确认两类事实:

- 在日华人社区/信息服务仍有强 Web 属性, 例如小春网以 Web 社区形态存在。
- 微信生态对中国用户的服务分发非常强, 跨境支付案例也更偏向「在既有超级 App 内完成服务」而不是要求用户下载目的地本地 App。

因此本报告不编造渠道比例。TEBIQ 若要判断渠道, 需要在 1.0 埋点区分: SEO / 微信群或公众号 / LINE 分享 / 行政书士或 HR 转发 / 直接访问 / App Store 搜索。这个问题标为「待创始人验证」。

来源: [小春网](https://www.incnjp.com/), [PayPay - WeChat Pay integration](https://about.paypay.ne.jp/en/pr/20250904/01/)。

## 5. 跨境用户场景推演

### 场景 1: 用户人在中国, 刚签日本工作, 准备搬过去

状态: 可能只有中国 Apple ID / 中国手机号 / 中国 Android 应用商店; 对日本手续焦虑, 但还没有日本支付方式。

| 形态 | 可用性 | 摩擦 |
|---|---|---|
| Web | 高 | 点链接即可用; 若 TEBIQ 短信只支持日本手机号, 会在登录处卡住 |
| 原生 App | 低到中 | 若仅日本区上架, 中国 Apple ID 看不到; Google Play 也可能不可用 |
| PWA | 高 | 先 Web 使用, 有价值后再加主屏 |

最低摩擦: Web / PWA。App 不适合作为首入口。

### 场景 2: 用户日中两地跑, 出差/家庭往返

状态: 可能常切 SIM / VPN / 支付方式 / App Store 地区; 手机里同时有日本和中国生活 App。

| 形态 | 可用性 | 摩擦 |
|---|---|---|
| Web | 高 | 账号随浏览器/邮箱/手机号走, 不依赖商店地区 |
| 原生 App | 中 | 已安装时可用; 换机/重装/更新时可能回到地区问题 |
| PWA | 高 | 主屏入口可用; Push 取决于 iOS Home Screen 权限 |

最低摩擦: Web + PWA。App 可作为后续给高频用户的增强。

### 场景 3: 用户人在日本, 但只有中国 Apple ID

状态: 人已经在日本, 但 App Store 仍是中国区; 不想取消订阅或切区。

| 形态 | 可用性 | 摩擦 |
|---|---|---|
| Web | 高 | Safari/Chrome 直接用 |
| 原生 App | 低 | 日本区 App 无法直接下载; 切 Apple Account 国家/地区要处理余额/订阅/支付方式 |
| PWA | 高 | Add to Home Screen 绕过 App Store |

最低摩擦: Web / PWA。这个场景是 TEBIQ 1.0 避免 App-first 的关键理由。

### 场景 4: 全家在日本, 但仍使用中国手机号和微信生态

状态: 家庭成员通过微信群转发材料; 支付/通知/登录可能都围绕微信和中国手机号。

| 形态 | 可用性 | 摩擦 |
|---|---|---|
| Web | 高 | 群链接传播最自然; 但需验证中国手机号 OTP 支持 |
| 原生 App | 低到中 | 每个家庭成员都要解决下载/账号/更新 |
| PWA | 高 | 家庭成员可先打开链接, 关键用户再加主屏 |

最低摩擦: Web。创始人需验证登录方式是否支持中国手机号/邮箱/magic link。

### 场景 5: 用户在日本 3 年, 准备回国, 仍想保留 TEBIQ 档案

状态: 可能切回中国手机号/Apple ID/Google Play 区域, 但日本档案仍有长期价值。

| 形态 | 可用性 | 摩擦 |
|---|---|---|
| Web | 高 | 回国后仍可登录查看档案 |
| 原生 App | 中 | 已安装可用; 换机或卸载后可能下载困难 |
| PWA | 高 | 只要域名可访问, 档案仍在 |

最低摩擦: Web / PWA。档案中心化产品不应绑定日本区 App。

### 场景 6: 日本公司 HR / 行政书士把链接发给候选人

状态: 用户对 TEBIQ 没有品牌认知, 只是在一个具体手续中被转发。

| 形态 | 可用性 | 摩擦 |
|---|---|---|
| Web | 最高 | HR/行政书士直接发 URL |
| 原生 App | 低 | 让候选人先下载 App 会显著降低完成率 |
| PWA | 中到高 | 初次仍是 Web, 完成后可提示安装 |

最低摩擦: Web。B2B2C 传播必须链接优先。

### 场景 7: Android 用户用中国品牌手机, 无 Google Play

状态: 到日本后仍用大陆版手机; 可能没有 Play Store 或 Play Services。

| 形态 | 可用性 | 摩擦 |
|---|---|---|
| Web | 高 | 任意现代浏览器可用 |
| 原生 App | 低 | Google Play 不可达; APK 分发有信任/安全风险 |
| PWA | 中到高 | 取决于浏览器; Chrome 最好, 其他浏览器需实测 |

最低摩擦: Web。Android App 不是这个用户的解药。

### 场景 8: 已在日本稳定生活, 有日本 Apple ID / Google Play / 日本手机号

状态: 下载 PayPay、LINE、SmartHR 类 App 没问题; 更在意提醒和重复入口。

| 形态 | 可用性 | 摩擦 |
|---|---|---|
| Web | 高 | 可用, 但回访弱 |
| 原生 App | 高 | 下载顺畅; Push / 主屏 / 相机体验最好 |
| PWA | 高 | 可覆盖大部分轻量场景 |

最低摩擦: App 或 PWA。此人群是后续 App 的优先目标, 不是 1.0 首发必须服务的唯一人群。

## 6. 三种形态对比矩阵

| 维度 | Web Only | PWA | 原生 App | Web + App 双轨 |
|---|---:|---:|---:|---:|
| 上线速度 | 立刻 | 约 1 周 | 2-3 月 | 立刻 + 延迟 |
| 跨境用户友好度 | 高 | 高 | 低到中; 若全区上架则中 | 高 |
| 拍照体验 | 中到高; 文件拍照可用 | 中到高; iOS PWA 需真机 QA | 高 | 高 |
| Push 通知 | 低; 邮件/SMS/部分 Web Push | 中; iOS 16.4+ 主屏 Web App 才强 | 高 | 高 |
| 离线能力 | 低 | 中; 壳和部分数据可离线 | 高 | 中到高 |
| 留存预期 | 中低; 取决于档案价值 | 中; 主屏和 Push 可增强 | 中高; 仅限成功安装用户 | 高; 但成本最高 |
| 首次转化 | 高 | 高 | 低到中 | 高 |
| 开发成本 | 低 | 低到中 | 高 | 高 |
| 账号/商店费用 | 无 | 无 | Apple 99 USD/年 + Google 25 USD 一次性 + 可能支付政策成本 | 同原生 App |
| 创始人精力 | 低 | 中 | 高 | 高 |
| 跨平台维护 | 低 | 中 | 高 | 高 |
| 支付灵活性 | 高; Stripe/Web | 高; Stripe/Web | 受 App Store/Play 数字商品规则影响 | 复杂 |
| 适合 TEBIQ 1.0 吗 | 是 | 是, 作为增强 | 暂不建议 | 建议第 2 阶段 |

## 7. 三条路径推荐

### 路径 A: Web 1.0 + PWA-light, 3 个月后决定 App

建议级别: **最高**。

时间表:

- Day 0: Web 上线, 确保拍照/上传/归档/提醒闭环可用。
- Week 1: 加 PWA-light: manifest、图标、主题色、standalone、service worker 基础缓存、结果页/档案页添加主屏提示、PWA 真机 QA。
- Week 2-4: 不急着做 Web Push; 先用 email/SMS/站内提醒验证提醒价值。若提醒打开率强, 再做 Web Push。
- Month 1-3: 跑 cohort: 首次识别完成率、识别后归档率、D7/M1 activated retention、提醒保存率、提醒打开率、重复拍照率、用户主动搜索「App」/客服提及 App 比例。
- Month 3: 进入 App 决策会。

成本估算:

- 开发: 3-7 个工作日做 PWA-light; 若加可靠 Web Push, 额外 3-7 个工作日。
- 第三方账号: 无 Apple/Google 商店费用。
- 维护: 低到中, 主要是浏览器兼容 QA。

风险:

- iOS PWA 安装需要用户教育。
- iOS Web Push 不等于普通网页 Push。
- 拍照在 iOS Home Screen PWA 下需真机回归。
- 没有 App Store 搜索曝光。

切换条件:

- M1 activated retention >35%-40%。
- 重复拍照/档案查看成为主要行为。
- 提醒保存率/打开率证明 Push 值得。
- App 需求来自用户行为, 不是团队焦虑。

### 路径 B: 立即启动原生 App

建议级别: **只在创始人确认 1.0 必须靠 Push/主屏/商店信任时考虑**。

时间表:

- Week 0-1: Apple/Google 开发者账号、D-U-N-S/法人验证、隐私政策、商店素材。
- Week 1-6: React Native / Expo / native shell 开发。若只是 WebView 包壳, 仍要处理登录、相机、Push、深链、支付政策。
- Week 6-8: TestFlight / internal testing / 商店审核。
- Week 8-12: 首发、审核修复、地区上架、支持流程。

成本估算:

- 开发: 6-10 周起; 若 iOS + Android 真原生并做 Push/相机/离线, 2-3 个月更现实。
- 账号: Apple 99 USD/年; Google Play 25 USD 一次性。
- 维护: 每次 OS/商店政策/支付政策变更都要跟。

风险:

- 中国 Apple ID / 非日本 Google Play 用户首入口被挡。
- App Review 或 Google verification 延迟会影响上线节奏。
- 若 App 内卖数字订阅, IAP/外部支付政策复杂。
- 创始人精力被商店素材、审核、崩溃、版本发布牵走。

适合条件:

- 目标用户 80%+ 已在日本且有日本区商店账号。
- TEBIQ 1.0 的核心价值高度依赖 Push 或离线。
- 已有明确预算和移动端维护人。

### 路径 C: Web 先行, 第 2 阶段 Web + App 双轨

建议级别: **中高, 作为路径 A 的后续**。

时间表:

- Month 0: Web 上线。
- Month 1: PWA-light + 数据仪表盘。
- Month 2: 根据 cohort 定义 App MVP: Push、档案、拍照、提醒, 不复制所有 Web 页面。
- Month 3-5: App 开发和测试。
- Month 5-6: 上架日本 + 中国以外主要目标区; 保留 Web fallback。

成本估算:

- 开发: 8-12 周。
- 账号: Apple 99 USD/年; Google 25 USD 一次性。
- 维护: 中高, 但比一开始双轨更可控, 因为 App 功能由真实数据限定。

风险:

- 双轨产品会增加设计、客服和数据归因复杂度。
- 若 App 只是 Web 的复制品, 用户不会因为 App 留下。
- 跨境用户仍需要 Web fallback。

切换条件:

- Web 证明 TEBIQ 是档案系统, 不是一次性识别工具。
- 用户自然形成提醒/回访需求。
- App MVP 能明确提高某个指标, 例如提醒打开、重复拍照、档案查看, 而不是只提高「看起来像产品」。

## 8. 最终推荐

我推荐创始人选择 **路径 A: Web 1.0 + PWA-light, 3 个月后按数据决定 App**。

推荐理由:

- 它最大化跨境可达性。TEBIQ 的用户很可能卡在 Apple ID / Google Play / 手机号 / 支付方式之间, Web 是唯一不先审问用户设备历史的入口。
- 它保护创始人精力。1.0 最稀缺的是验证「用户是否愿意把在日生活档案交给 TEBIQ」, 不是优化商店审核。
- 它保留 App 选择权。PWA-light 不会浪费; 即使未来做 App, Web 仍是 SEO、分享、HR/行政书士转发和跨境 fallback。
- 它符合 TEBIQ 产品哲学: 工具感、精确、降低日常摩擦。让用户先下载日本区 App, 对跨境用户来说本身就是摩擦。

不替创始人拍板。若创始人认为 TEBIQ 的品牌信任必须通过 App Store 建立, 或已有强渠道能推动用户安装, 可以选择路径 C 或 B。但基于本轮事实, App-first 不是 1.0 的稳健选择。

## 9. 我的盲点

- 没有 TEBIQ 真实用户设备/账号数据: 中国 Apple ID 占比、日本 Apple ID 占比、Android 无 Google Play 占比、iOS/Android 比例都需要实测。
- 没有实测 TEBIQ 当前 Web 拍照在 iOS Safari、iOS Home Screen PWA、Android Chrome、中国国产浏览器上的表现。
- 没有验证中国大陆网络环境对 TEBIQ 域名、Supabase、Stripe、AWS Bedrock、Vercel、图片上传链路的影响。
- 没有法务判断: 原生 App 内订阅、外部支付链接、日本 2025-2026 iOS 新规、个人信息/行政文书图片处理是否触发额外合规要求。
- 没有公开可用的「在日华人生活工具 Web vs App 留存」benchmark。本报告用的是相邻行业公开数据, 不能当成 TEBIQ 预测模型。
- 没有做用户访谈。跨境路径是基于规则事实和场景推演, 仍需 5-10 个真实用户验证。
- 没有评估微信小程序/LINE Mini App。若 TEBIQ 未来强依赖中国/日本社交生态, 这可能是 Web/PWA/App 之外的第四条路。
