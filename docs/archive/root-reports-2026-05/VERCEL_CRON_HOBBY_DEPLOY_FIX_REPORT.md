# Vercel Cron Hobby Deploy Fix Report

## 问题
Production deploy 被 Vercel 拦截，因为 Hobby 计划不允许 `*/30 * * * *` 这种高频 Cron。

## 修改
- 将 Cron 从 `*/30 * * * *`
- 临时改为 `0 18 * * *`

## 原因
当前产品尚未正式发布，优先保证 production 能部署 No Wrong Answer v3。高频政策监控后续可在升级 Vercel Pro 后恢复。

## 后续
- 如果升级 Pro，可恢复高频 Cron。
- 如果继续 Hobby，保持每日一次。
