/**
 * /my — Index of "我的" 区域。
 *
 * v5 主导航将「我的咨询」作为默认 tab，因此 /my 直接重定向到
 * /me/consultations。
 */
import { redirect } from 'next/navigation'

export default function MyIndex() {
  redirect('/me/consultations')
}
