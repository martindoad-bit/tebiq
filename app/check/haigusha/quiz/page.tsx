// 旧 /check/haigusha/quiz 路由 → 新 /check/haigusha
import { redirect } from 'next/navigation'

export default function HaigushaQuizRedirect() {
  redirect('/check/spouse/quiz')
}
