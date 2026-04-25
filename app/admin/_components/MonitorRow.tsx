'use client'
import type { MonitorStatus } from './types'

export default function MonitorRow({ monitor }: { monitor: MonitorStatus }) {
  const dateStr = monitor.lastChecked
    ? new Date(monitor.lastChecked).toLocaleString('zh-CN')
    : '从未检查'
  return (
    <div
      className={`bg-card border rounded-xl p-4 ${
        monitor.alert ? 'border-[#DC2626]' : 'border-line'
      }`}
    >
      <div className="flex items-center justify-between gap-3 flex-wrap">
        <div className="flex-1 min-w-0">
          <div className="text-title font-bold text-sm">{monitor.name}</div>
          <div className="text-muted text-xs mt-1 truncate">{monitor.url}</div>
        </div>
        {monitor.alert ? (
          <span className="bg-[#DC2626] text-white text-[10px] font-bold px-2 py-1 rounded-full flex-shrink-0">
            检测到变化
          </span>
        ) : (
          <span className="text-muted text-xs flex-shrink-0">正常</span>
        )}
      </div>
      <div className="text-muted text-xs mt-2">最后检查：{dateStr}</div>
      {monitor.alert && (
        <div className="text-title text-xs mt-1">
          告警时间：{new Date(monitor.alert).toLocaleString('zh-CN')}
        </div>
      )}
    </div>
  )
}
