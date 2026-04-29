// 旧 /check/keiei/quiz 路由 → 新 /check/keiei
import { redirect } from 'next/navigation'

export default function KeieiQuizRedirect() {
  redirect('/check/management/quiz')
}
