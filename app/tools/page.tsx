import { redirect } from 'next/navigation'

export const metadata = {
  title: '工具 - TEBIQ',
  description: 'TEBIQ 的在日生活工具：拍照识别、在留准备自查、记录查看。',
}

export default function ToolsPage() {
  redirect('/quick-reference')
}
