// 旧 /check/tokutei/quiz 路由 → 新 /check/tokutei
import { redirect } from 'next/navigation'

export default function TokuteiQuizRedirect() {
  redirect('/check/specified_skilled_worker/quiz')
}
