import Link from 'next/link'

export default function Home() {
  return (
    <main className="min-h-screen bg-slate-900 text-white flex flex-col">
      {/* 顶部导航 */}
      <header className="sticky top-0 z-10 bg-slate-900/95 backdrop-blur border-b border-slate-800">
        <div className="max-w-md md:max-w-6xl mx-auto px-4 h-14 flex items-center justify-between">
          <Link href="/" className="font-bold tracking-wider text-amber-400 text-lg">
            TEBIQ
          </Link>
          <Link
            href="/visa-select"
            className="bg-amber-400 hover:bg-amber-300 text-slate-900 font-bold text-sm px-4 py-2 rounded-lg transition-all"
          >
            开始自查
          </Link>
        </div>
      </header>

      {/* Hero */}
      <section className="bg-gradient-to-b from-blue-950 to-slate-900 px-4 pt-16 md:pt-24 pb-14 md:pb-20">
        <div className="max-w-md md:max-w-2xl mx-auto text-center">
          <h1 className="text-4xl md:text-6xl font-bold mb-5 leading-tight">
            在日签证，<br />
            <span className="text-amber-400">先查后办</span>
          </h1>
          <p className="text-slate-300 text-base md:text-lg leading-relaxed mb-2">
            3 分钟，看清你的续签风险
          </p>
          <p className="text-slate-400 text-sm md:text-base leading-relaxed mb-10">
            200+ 真实案例经验，完全免费
          </p>

          <div className="md:max-w-md md:mx-auto">
            <Link
              href="/visa-select"
              className="flex items-center justify-center w-full min-h-[60px] bg-amber-400 hover:bg-amber-300 text-slate-900 font-bold py-4 rounded-xl text-lg transition-all"
            >
              开始免费自查 →
            </Link>
            <Link
              href="/visa-select"
              className="block mt-5 text-amber-400 text-sm hover:text-amber-300 underline underline-offset-4"
            >
              查看支持的签证类型
            </Link>
          </div>
        </div>
      </section>

      {/* 三栏价值点（移动端纵向，PC 横向） */}
      <section className="px-4 py-12 md:py-16">
        <div className="max-w-md md:max-w-5xl mx-auto">
          <h2 className="text-center text-slate-300 text-base md:text-lg font-bold mb-6 md:mb-10">
            为什么用 TEBIQ
          </h2>
          <div className="space-y-3 md:space-y-0 md:grid md:grid-cols-3 md:gap-6">
            {VALUE_PROPS.map(v => (
              <div
                key={v.title}
                className="flex md:flex-col gap-4 md:gap-3 bg-slate-800 border border-slate-700 rounded-xl p-4 md:p-6"
              >
                <div className="flex-shrink-0 w-11 h-11 md:w-14 md:h-14 bg-blue-950 text-amber-400 rounded-lg flex items-center justify-center">
                  {v.icon}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="font-bold text-white text-base md:text-lg mb-1 md:mb-2">{v.title}</div>
                  <div className="text-slate-400 text-sm leading-relaxed">
                    {v.desc}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 使用说明 */}
      <section className="bg-blue-950/40 px-4 py-12 md:py-16">
        <div className="max-w-md md:max-w-2xl mx-auto">
          <h2 className="text-center text-slate-300 text-base md:text-lg font-bold mb-6 md:mb-10">
            如何使用
          </h2>
          <div className="space-y-4">
            {STEPS.map(s => (
              <div key={s.n} className="flex gap-4 items-start">
                <div className="w-9 h-9 bg-amber-400 text-slate-900 rounded-full flex items-center justify-center font-bold flex-shrink-0 text-sm">
                  {s.n}
                </div>
                <div className="flex-1 min-w-0 pt-1">
                  <div className="font-bold text-white text-base">{s.title}</div>
                  <div className="text-slate-400 text-sm leading-relaxed mt-0.5">
                    {s.desc}
                  </div>
                </div>
              </div>
            ))}
          </div>

          <Link
            href="/visa-select"
            className="flex items-center justify-center w-full min-h-[60px] bg-amber-400 hover:bg-amber-300 text-slate-900 font-bold py-4 rounded-xl text-lg transition-all mt-8"
          >
            现在开始 →
          </Link>
        </div>
      </section>

      {/* 底部 */}
      <footer className="bg-slate-950 px-4 py-6 text-center border-t border-slate-800 mt-auto">
        <Link
          href="/knowledge"
          className="inline-block text-amber-400 hover:text-amber-300 text-sm font-bold mb-4 underline underline-offset-4"
        >
          了解签证基础知识 →
        </Link>
        <p className="text-slate-500 text-xs leading-relaxed">
          本工具由持牌行政书士团队提供支持
        </p>
        <p className="text-slate-600 text-xs mt-1">© 2026 TEBIQ</p>
      </footer>
    </main>
  )
}

const VALUE_PROPS = [
  {
    title: '风险前置',
    desc: '续签失败的真正原因，大多在材料准备前就已经埋下',
    icon: (
      <svg
        width="22"
        height="22"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
        <path d="M12 8v4" />
        <path d="M12 16h.01" />
      </svg>
    ),
  },
  {
    title: '基于真实',
    desc: '不是通用建议，是基于 200+ 实际案例的判断规则',
    icon: (
      <svg
        width="22"
        height="22"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <line x1="6" y1="20" x2="6" y2="14" />
        <line x1="12" y1="20" x2="12" y2="8" />
        <line x1="18" y1="20" x2="18" y2="4" />
      </svg>
    ),
  },
  {
    title: '完全免费',
    desc: '帮你看清情况，你自己决定下一步',
    icon: (
      <svg
        width="22"
        height="22"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
        <polyline points="22 4 12 14.01 9 11.01" />
      </svg>
    ),
  },
]

const STEPS = [
  { n: '1', title: '选择签证类型', desc: '目前支持技人国，其他类型陆续上线' },
  { n: '2', title: '回答 10 道问题', desc: '约 3 分钟，根据情况动态调整' },
  { n: '3', title: '查看风险评估和行动建议', desc: '红/黄/绿判定 + 书士建议' },
]
