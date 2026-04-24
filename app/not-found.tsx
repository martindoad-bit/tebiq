import Link from 'next/link'

export default function NotFound() {
  return (
    <main className="min-h-screen bg-slate-900 text-white flex flex-col items-center justify-center px-4 text-center pb-[env(safe-area-inset-bottom)]">
      <div className="text-7xl font-bold text-amber-400 mb-6">404</div>
      <h1 className="text-2xl font-bold mb-2">页面不存在</h1>
      <p className="text-slate-400 text-sm mb-10 max-w-xs leading-relaxed">
        你要找的页面不见了
      </p>
      <div className="flex flex-col gap-3 w-full max-w-xs">
        <Link
          href="/"
          className="flex items-center justify-center min-h-[60px] bg-amber-400 hover:bg-amber-300 text-slate-900 font-bold py-4 px-6 rounded-xl text-base transition-all"
        >
          回到首页
        </Link>
        <Link
          href="/visa-select"
          className="flex items-center justify-center min-h-[60px] bg-slate-800 border border-slate-700 hover:border-amber-400 text-white font-bold py-4 px-6 rounded-xl text-base transition-all"
        >
          开始续签自查
        </Link>
      </div>
    </main>
  )
}
