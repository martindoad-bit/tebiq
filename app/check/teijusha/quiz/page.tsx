// 旧 /check/teijusha/quiz 路由 → 新 /check/teijusha
import { redirect } from 'next/navigation'

export default function TeijushaQuizRedirect() {
  redirect('/check/teijusha')
}
