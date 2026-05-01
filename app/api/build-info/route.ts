/**
 * GET /api/build-info
 *
 * 暴露当前 production 部署的 build 元数据，给红线 smoke / 排查用。
 * 不暴露任何 env 或 secret —— 只读公开的 Vercel 注入变量 + 编译期常量。
 *
 * 字段：
 *   gitSha   — 当前 commit hash（Vercel 注入 VERCEL_GIT_COMMIT_SHA）
 *   branch   — 当前分支（Vercel 注入 VERCEL_GIT_COMMIT_REF）
 *   builtAt  — 编译时锁定的 ISO 时间戳（Date.now() 在模块加载时计算一次）
 *   version  — 字面 'redline-gate-v3'，方便看是不是这次 hotfix 上去了
 */
const BUILT_AT = new Date().toISOString()

export const dynamic = 'force-dynamic'
export const runtime = 'nodejs'

export async function GET() {
  return Response.json(
    {
      gitSha: process.env.VERCEL_GIT_COMMIT_SHA ?? 'unknown',
      branch: process.env.VERCEL_GIT_COMMIT_REF ?? 'unknown',
      builtAt: BUILT_AT,
      version: 'redline-gate-v3',
    },
    {
      status: 200,
      headers: {
        'cache-control': 'no-store, no-cache, must-revalidate',
      },
    },
  )
}
