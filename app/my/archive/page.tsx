/**
 * /my/archive — 我的档案（v5 screen 11）
 *
 * 合并展示自查结果（quiz_results）和文件识别（documents）的统一时间线。
 * 视觉跟 docs/prototype/v5-mockup.html 1762-1828。
 *
 * 数据访问通过 DAL（lib/db/queries/*），不写裸 SQL。
 * 过滤在 client 端完成（state），但数据加载在 server component。
 */
import { redirect } from 'next/navigation'
import AppShell from '@/app/_components/v5/AppShell'
import AppBar from '@/app/_components/v5/AppBar'
import TabBar from '@/app/_components/v5/TabBar'
import { getCurrentUser } from '@/lib/auth/session'
import { listQuizResultsByMemberId } from '@/lib/db/queries/quizResults'
import { listDocumentsByFamilyId } from '@/lib/db/queries/documents'
import ArchiveListClient, { type ArchiveItem } from './ArchiveListClient'

export const dynamic = 'force-dynamic'

// 签证类型 → 日文原文显示（CN/JP 混排：签证类别保留日文）
const VISA_LABEL: Record<string, string> = {
  gijinkoku: '技術・人文知識・国際業務',
  keiei: '経営・管理',
  haigusha: '日本人/永住者の配偶者等',
  eijusha: '永住者',
  tokutei: '特定技能',
  teijusha: '定住者',
  ryugaku: '留学',
  other: '其他签证',
}

function quizSeverity(color: 'red' | 'yellow' | 'green'): {
  status: string
  cls: 'urgent' | 'warn' | 'done'
} {
  if (color === 'red') return { status: '高风险', cls: 'urgent' }
  if (color === 'yellow') return { status: '中风险', cls: 'warn' }
  return { status: '可申请', cls: 'done' }
}

function urgencyToSeverity(urgency: string | null): {
  status: string
  cls: 'urgent' | 'warn' | 'done'
} {
  if (urgency === 'critical') return { status: '需要尽快处理', cls: 'urgent' }
  if (urgency === 'important') return { status: '一般重要', cls: 'warn' }
  return { status: '已归档', cls: 'done' }
}

function fmtDate(d: Date): string {
  const y = d.getFullYear()
  const m = String(d.getMonth() + 1).padStart(2, '0')
  const day = String(d.getDate()).padStart(2, '0')
  return `${y}/${m}/${day}`
}

export default async function ArchivePage() {
  const user = await getCurrentUser()
  if (!user) redirect('/login?next=/my/archive')

  const [quizResults, documents] = await Promise.all([
    listQuizResultsByMemberId(user.id),
    listDocumentsByFamilyId(user.familyId),
  ])

  const items: ArchiveItem[] = [
    ...quizResults.map(r => {
      const sev = quizSeverity(r.resultColor)
      return {
        id: `quiz-${r.id}`,
        kind: 'quiz' as const,
        title: '续签自查结果',
        source: VISA_LABEL[r.visaType] ?? r.visaType,
        date: fmtDate(r.createdAt),
        timestamp: r.createdAt.getTime(),
        status: sev.status,
        severity: sev.cls,
      }
    }),
    ...documents.map(d => {
      const sev = urgencyToSeverity(d.urgency)
      return {
        id: `doc-${d.id}`,
        kind: 'doc' as const,
        title: d.docType ?? '文件识别',
        source: '',
        date: fmtDate(d.createdAt),
        timestamp: d.createdAt.getTime(),
        status: sev.status,
        severity: sev.cls,
      }
    }),
  ].sort((a, b) => b.timestamp - a.timestamp)

  return (
    <AppShell appBar={<AppBar title="我的档案" />} tabBar={<TabBar />}>
      <ArchiveListClient items={items} />
    </AppShell>
  )
}
