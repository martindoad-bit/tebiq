import Link from 'next/link'

export default function NotFound() {
  return (
    <main className="min-h-screen bg-slate-900 text-white flex flex-col items-center justify-center px-4 text-center">
      <div className="text-7xl font-bold text-amber-400 mb-4">404</div>
      <h1 className="text-xl font-bold mb-3">页面没找到</h1>
      <p className="text-slate-400 text-sm mb-10 max-w-xs leading-relaxed">
        你访问的页面可能已经移动或不存在。
      </p>
      <Link
        href="/"
        className="min-h-[60px] bg-amber-400 hover:bg-amber-300 text-slate-900 font-bold py-4 px-8 rounded-xl text-base transition-all flex items-center justify-center"
      >
        返回首页
      </Link>
      <Link
        href="/check"
        className="text-slate-400 text-sm hover:text-slate-200 underline underline-offset-4 mt-6"
      >
        或开始续签自查
      </Link>
    </main>
  )
}
