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

### 本轮改动

- 将首页副文案从空泛 slogan 改为具体功能描述：「拍照看懂日文文件，续签前先做风险自查。」
- 增加「在日生活工具集」轻量标签，强化 1.0 工具集定位，避免 dashboard 感。
- Action card 使用多层阴影：`shadow-cta` / `shadow-card`，保留日式克制但减少工程感。
- 未登录空状态改为「档案预览 + 免费额度」模块，补足下半屏信息密度。
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
