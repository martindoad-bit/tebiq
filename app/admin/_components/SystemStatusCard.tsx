'use client'
import type { SystemStatus } from './types'

export default function SystemStatusCard({ status }: { status: SystemStatus }) {
  const aiOk = status.ai.configured
  const kvOk = status.kv.ok
  const monitorStr = status.monitor.lastChecked
    ? new Date(status.monitor.lastChecked).toLocaleString('zh-CN')
    : '从未检查'

  return (
    <div className="bg-card border border-line rounded-2xl p-5 mb-6 shadow-sm">
      <h2 className="text-title font-bold text-sm mb-3">系统状态</h2>
      <ul className="space-y-2">
        <li className="text-body text-sm leading-relaxed">
          <span className="font-bold text-title">AI 问答：</span>
          {aiOk ? (
            <span className="text-[#16A34A]">✅ AWS Bedrock 已配置（{status.ai.region}）</span>
          ) : (
            <span className="text-orange-600">⚠️ 未配置，当前为 Mock 模式</span>
          )}
        </li>
        <li className="text-body text-sm leading-relaxed">
          <span className="font-bold text-title">KV 数据库：</span>
          {kvOk ? (
            <span className="text-[#16A34A]">✅ 连接正常</span>
          ) : (
            <span className="text-[#DC2626]">⚠️ 连接异常 {status.kv.error ? `(${status.kv.error})` : ''}</span>
          )}
        </li>
        <li className="text-body text-sm leading-relaxed">
          <span className="font-bold text-title">政策监控：</span>
          <span className="text-muted">上次检查：{monitorStr}</span>
        </li>
      </ul>
    </div>
  )
}
