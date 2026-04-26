# CODEX_VISUAL_REPORT

> 视觉重做记录。当前提交先完成屏 01 首页样板，后续屏幕沿同一规范继续迭代。

## 参考样本

- LINE App Store：保留强品牌识别，内容区保持轻量，功能入口明确。https://apps.apple.com/jp/app/line/id443904275
- PayPay App Store / Google Play：日本用户熟悉的高密度工具入口，CTA 颜色果断但文案直接。https://apps.apple.com/jp/app/paypay-%E3%83%9A%E3%82%A4%E3%83%9A%E3%82%A4/id1435783608
- freee 経費精算 App Store：业务工具感强，卡片分组清楚，拍照/OCR 类任务说明具体。https://apps.apple.com/jp/app/freee%E7%B5%8C%E8%B2%BB%E7%B2%BE%E7%AE%97/id6498880610
- SmartHR ヘルプ / Google Play：劳务手续类产品的克制信息架构，提醒、申请、资料类模块保持清晰层级。https://support.smarthr.jp/ja/help/articles/349ed9e2-2ecc-4af0-8482-b86fd03709dc/

## 屏 01 首页

### 改前

![01 home before](docs/visual-report/screenshots/01-home-before.png)

### 改后

![01 home after](docs/visual-report/screenshots/01-home-after.png)

### 反馈后细修

![01 home after v2](docs/visual-report/screenshots/01-home-after-v2.png)

### 本轮改动

- 将首页副文案从空泛 slogan 改为具体功能描述：「拍照看懂日文文件，续签前先做风险自查。」
- 增加「在日生活工具集」轻量标签，强化 1.0 工具集定位，避免 dashboard 感。
- Action card 使用多层阴影：`shadow-cta` / `shadow-card`，保留日式克制但减少工程感。
- 未登录空状态改为「档案预览 + 免费额度」模块，补足下半屏信息密度。
- 根据创始人反馈，把三格指标面板改为更自然的「我的档案」文件预览，弱化工程感。
- 修复 `AppShell`：外壳改为 `h-[100dvh]`，body 加 `min-h-0`，确保 TabBar 固定在视口底部，内容在 body 内滚动。
- Logo 改用现有 `public/logo-icon.png`，提升品牌第一眼识别。

## 视觉规范追加

- 字体：`-apple-system`, `BlinkMacSystemFont`, `PingFang SC`, `Hiragino Sans`, `Noto Sans SC`, `Noto Sans CJK SC`。
- 中文 letter-spacing 保持 `0`；日文场景可用 `.jp-text`，`letter-spacing: 0.02em`，`line-height: 1.7`。
- 默认正文 line-height：中文 `1.6`；英文/数字跟随组件内紧凑行高。
- 阴影：
  - `shadow-card`: `0 1px 0 rgba(30,58,95,.04), 0 10px 24px rgba(30,58,95,.055)`
  - `shadow-raised`: `0 1px 0 rgba(30,58,95,.05), 0 12px 28px rgba(30,58,95,.07), 0 2px 8px rgba(30,58,95,.035)`
  - `shadow-cta`: inset 高光 + 橙色柔和投影，用于主 action card / CTA。
- 图标：小尺寸 lucide stroke-width 约 `1.55-1.6`，避免视网膜屏发虚。
- Shell：所有 v5 手机页面使用 `h-[100dvh] + min-h-0 flex-1 overflow-y-auto`，TabBar 不随内容被挤出视口。

## 已知 issue / 妥协项

- 当前只完成屏 01 的视觉样板和全局底座。其它屏仍需逐屏截图、对齐、提交。
- `npm run lint` 仍有历史 `<img>` warning，非本轮引入。
- 屏 05 续签插画、屏 09 礼物盒、档案/知识空状态插画仍用占位或组件化图形，等待创始人后续用 GPT Image 2 生成。

## 插画素材清单

- 屏 05 续签自查入口：签证文件 + 检查清单 + 守护人物，容器建议 263 x 130 px，米色底、深蓝线条、橙色局部强调。
- 屏 09 邀请朋友：两个礼物盒双向箭头，单个 76 x 76 px，和屏 05 同一线条风格。
- 首页/档案空状态：小型文件夹 + 提醒铃 + 文件纸张组合，约 160 x 100 px，可替换当前指标格模块但不要做大插画。
- 知识中心空状态：书本 + 放大镜 + 市役所/税務署文件符号，约 160 x 100 px。

## 屏 02 拍照入口

### 改前

![02 photo before](docs/visual-report/screenshots/02-photo-before.png)

### 改后

![02 photo after](docs/visual-report/screenshots/02-photo-after.png)

### 本轮改动

- 相机框从纯深蓝色块改为带内层虚线框、文書 OCR 标签和守护角标的识别区域。
- 增加「金额 / 期限 / 行动」三枚轻量信息 chip，说明识别价值但不写营销口号。
- 最近记录空状态从一行文字改为卡片式空态，和首页档案预览保持同一视觉语言。
- 窄屏抗压：chip 文案使用 truncate，减少横向溢出风险。

## 屏 03/04 拍照结果

### 本轮改动

- 文件信息从裸文本改为带 icon 的白色卡片，强化“识别结果”可信度。
- 紧急度卡片提高数字层级，修正文案 typo：「請尽快处理」改为「需要尽快处理」。
- QA 区块改为独立信息卡片，分别使用文件、确认、警示 icon，提升可扫读性。
- 详情页新增顶部识别文件摘要卡，金额/截止日期卡加入图标和边框层级。

## 屏 15 拍照配额弹窗

### 改前

![15 quota before](docs/visual-report/screenshots/15-quota-before.png)

### 改后

![15 quota after](docs/visual-report/screenshots/15-quota-after.png)

### 本轮改动

- bottom sheet 增加 handle、会员 icon 和多层 elevation，减少“白板弹窗”感。
- 权益列表从圆点文字改为带 check icon 的卡片列表，信息更稳定。
- 保持克制 CTA：主按钮仍是「立即开通会员」，二级动作保留「稍后再说」。

## 屏 05 续签自查入口

### 改前

![05 check before](docs/visual-report/screenshots/05-check-before.png)

### 改后

![05 check after](docs/visual-report/screenshots/05-check-after.png)

### 本轮改动

- 插画占位从文字框改为 CSS 文件/清单/人物占位图，方便后续替换为 GPT Image 2 素材。
- 顶部增加「约 3 分钟」轻量标签，副文案改为具体用途说明。
- 三个功能点保留原结构，但 icon 容器、文案和阴影更接近首页/拍照页视觉语言。

## 屏 06 选择签证类型

### 改前

![06 check select before](docs/visual-report/screenshots/06-check-select-before.png)

### 改后

![06 check select after](docs/visual-report/screenshots/06-check-select-after.png)

### 本轮改动

- 增加在留カード说明卡，明确用户应按「在留資格」选择。
- 签证名称使用 `.jp-text` 微调日文排版，保持日文原文。
- 列表卡片加入 shadow stack，禁用项降低透明度并保留「即将开放」状态。

## 屏 07 自查问题

### 改前

![07 check quiz before](docs/visual-report/screenshots/07-check-quiz-before.png)

### 改后

![07 check quiz after](docs/visual-report/screenshots/07-check-quiz-after.png)

### 本轮改动

- 顶部从纯数字改为「第 N 题 + 进度条」，进度感更稳定。
- 问题和解释放入白色卡片，选项使用一致的 12px 圆角与 shadow-card。
- 修复进入动画截图时半透明的问题：进入动画只做轻微位移，不再改变 opacity。
- 底部显示已答题数，替代重复的页码信息。

## 屏 08 自查结果

### 改后

![08 check result after](docs/visual-report/screenshots/08-check-result-after.png)

### 本轮改动

- 内联结果页的主要风险点、建议行动、材料清单改为独立卡片。
- 结果 hero 加边框和 shadow-card，和拍照结果页保持统一层级。
- 材料折叠卡增加 icon，避免像普通文本列表。
