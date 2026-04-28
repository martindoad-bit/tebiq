# Dev fixture URLs

> 这是占位文档：`npm run dev:visual-fixtures` 跑起来时会自动覆盖本文件，
> 包含三个场景（empty / data / subscribed）的实际 dev-session URL。

## 用法

1. 先把 dev 服务跑起来：

   ```bash
   npm run dev
   ```

2. 写 fixture：

   ```bash
   npm run dev:visual-fixtures
   ```

   该命令会：
   - 创建 3 个 family + 3 个 member（手机号 `+81visual-empty/data/sub`）
   - data / subscribed 场景写入示例 documents、quiz_results
   - subscribed 场景写入 active subscription
   - 重写本文件，列出每个场景的 dev-session URL（含一组常用 surface 的 deep link）

3. 在浏览器里粘贴上面任一 URL，session cookie 自动 set，直接登录该场景。

4. 清理：

   ```bash
   npm run dev:visual-fixtures:cleanup
   ```

## 三个场景

- **empty** — 没有 documents、没有订阅、没填邮箱（用于看空状态）
- **data** — 有 2 个 documents + 1 条 quiz_result（用于看数据展示）
- **subscribed** — 同 data + 1 条 active premium subscription（用于看会员视觉）

URL 模板（fixture 写入后自动渲染真实 URL）：

```
http://localhost:3000/api/auth/dev-session?scenario={empty|data|subscribed}&next={surface_url}
```

surface 包括 `/`、`/my/archive`、`/my/reminders`、`/my/account`、`/knowledge`、`/photo`、`/check`。
