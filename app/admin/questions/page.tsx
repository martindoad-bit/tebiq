import Link from 'next/link'
import { ArrowRight, ClipboardList, Upload } from 'lucide-react'
import { PageShell } from '@/app/admin/_components/ui'

const QUESTIONS = [
  {
    id: 'Q-1042',
    text: '会社が休眠状態になったあと、技人国の更新前に何を確認すればいいですか。',
    status: '未处理',
    priority: '高',
    source: '首页输入',
    createdAt: '04.30 09:18',
  },
  {
    id: 'Q-1041',
    text: '搬家后还没去市役所更新住所，续签材料里需要补什么记录。',
    status: '处理中',
    priority: '中',
    source: '知识中心',
    createdAt: '04.30 08:42',
  },
  {
    id: 'Q-1040',
    text: '父母短期来日时，邀请理由书和滞在予定表应该先准备哪个。',
    status: '待分类',
    priority: '中',
    source: '批量导入',
    createdAt: '04.29 21:06',
  },
  {
    id: 'Q-1039',
    text: '转职后新公司还没出雇用契約書，可以先做哪些续签准备。',
    status: '已整理',
    priority: '低',
    source: 'Decision Lab',
    createdAt: '04.29 18:11',
  },
] as const

export const dynamic = 'force-dynamic'

export default function AdminQuestionsPage() {
  const stats = {
    total: 482,
    today: 17,
    open: 63,
    high: 9,
  }

  return (
    <PageShell
      title="Questions"
      subtitle="用户真实问题池。先扫问题，再决定整理成知识、决策卡或手续路径。"
    >
      <div className="grid gap-3 md:grid-cols-[1fr_auto]">
        <div className="grid grid-cols-2 gap-2 md:grid-cols-4">
          <Metric label="总数" value={stats.total} />
          <Metric label="今日新增" value={stats.today} />
          <Metric label="未处理" value={stats.open} />
          <Metric label="高优先级" value={stats.high} attention />
        </div>
        <Link
          href="/admin/questions/import"
          className="flex min-h-[44px] items-center justify-center gap-2 rounded-btn bg-ink px-4 text-[13px] font-medium text-white"
        >
          <Upload size={15} strokeWidth={1.5} />
          批量导入
        </Link>
      </div>

      <section className="mt-4 overflow-hidden rounded-card border border-hairline bg-surface">
        <div className="flex items-center gap-2 border-b border-hairline px-4 py-3">
          <ClipboardList size={16} strokeWidth={1.5} className="text-ink" />
          <h2 className="text-[13px] font-medium text-ink">待处理队列</h2>
        </div>
        <div className="divide-y divide-hairline">
          {QUESTIONS.map(question => (
            <Link
              key={question.id}
              href="/admin/review-lite"
              className="group grid gap-2 px-4 py-3 active:bg-paper md:grid-cols-[84px_1fr_120px]"
            >
              <div className="flex items-center justify-between gap-2 md:block">
                <span className="numeric text-[11px] text-ash">{question.id}</span>
                <span className="numeric text-[11px] text-haze md:mt-1 md:block">{question.createdAt}</span>
              </div>
              <div className="min-w-0">
                <p className="text-[13px] font-normal leading-[1.65] text-ink">{question.text}</p>
                <p className="mt-1 text-[11px] leading-none text-ash">{question.source}</p>
              </div>
              <div className="flex items-center justify-between gap-2 md:justify-end">
                <StatusTag>{question.status}</StatusTag>
                <PriorityTag priority={question.priority} />
                <ArrowRight size={14} strokeWidth={1.5} className="text-haze group-hover:text-ink" />
              </div>
            </Link>
          ))}
        </div>
      </section>
    </PageShell>
  )
}

function Metric({
  label,
  value,
  attention,
}: {
  label: string
  value: number
  attention?: boolean
}) {
  return (
    <div className="rounded-card border border-hairline bg-surface px-3 py-3">
      <p className="text-[11px] leading-none text-ash">{label}</p>
      <p className={`numeric mt-2 text-[26px] font-light leading-none ${attention ? 'text-warning' : 'text-ink'}`}>
        {value}
      </p>
    </div>
  )
}

function StatusTag({ children }: { children: string }) {
  return (
    <span className="rounded-[8px] bg-paper px-2 py-1 text-[10.5px] font-normal leading-none text-ash">
      {children}
    </span>
  )
}

function PriorityTag({ priority }: { priority: string }) {
  const attention = priority === '高'
  return (
    <span className={`rounded-[8px] px-2 py-1 text-[10.5px] font-normal leading-none ${
      attention ? 'bg-[#FFF4E1] text-warning' : 'bg-paper text-ash'
    }`}>
      {priority}
    </span>
  )
}
