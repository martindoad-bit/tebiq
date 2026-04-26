/**
 * /my — Index of "我的" 区域。
 *
 * v5 主导航将「我的档案」作为默认 tab，因此 /my 直接重定向到
 * /my/archive。账户信息位于 /my/account，资料编辑表单位于 /my/profile。
 */
import { redirect } from 'next/navigation'

export default function MyIndex() {
  redirect('/my/archive')
}
