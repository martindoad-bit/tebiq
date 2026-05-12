import { redirect } from 'next/navigation'

export const dynamic = 'force-dynamic'

export const metadata = {
  title: 'TEBIQ',
  description: 'TEBIQ 在留咨询入口。',
}

export default function AskPage() {
  redirect('/ai-consultation')
}
