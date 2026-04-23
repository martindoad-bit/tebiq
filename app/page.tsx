import Link from 'next/link'

export default function Home() {
  return (
    <main className="min-h-screen bg-slate-900 text-white flex flex-col">
      {/* Hero */}
      <div className="bg-gradient-to-b from-blue-950 to-slate-900 px-4 pt-16 pb-12 flex-1 flex flex-col justify-center">
        <div className="max-w-md mx-auto w-full text-center">
          <div className="inline-block bg-amber-400 text-blue-950 text-xs font-bold px-3 py-1 rounded-full mb-8">
            TEBIQ
          </div>
          <h1 className="text-4xl font-bold mb-5 leading-tight">
            续签前，<br />
            <span className="text-amber-400">先查一查</span>
          </h1>
          <p className="text-slate-300 text-base mb-2 leading-relaxed">
            3 分钟发现隐藏风险
          </p>
          <p className="text-slate-400 text-sm mb-10 leading-relaxed">
            200+ 真实案例经验，帮你避开续签雷区
          </p>

          <Link
            href="/check"
            className="flex items-center justify-center w-full min-h-[60px] bg-amber-400 hover:bg-amber-300 text-slate-900 font-bold py-4 rounded-xl text-lg transition-all"
          >
            开始免费自查 →
          </Link>
          <p className="text-slate-500 text-xs mt-4">
            无需注册 · 答案不上传
          </p>
        </div>
      </div>

      {/* 三个价值点 */}
      <div className="bg-slate-900 px-4 py-10">
        <div className="max-w-md mx-auto grid grid-cols-3 gap-3">
          {[
            { title: '完全免费', desc: '无任何费用' },
            { title: '全程中文', desc: '为在日华人设计' },
            { title: '书士背书', desc: '持牌行政书士支持' },
          ].map(v => (
            <div
              key={v.title}
              className="bg-slate-800 border border-slate-700 rounded-xl p-4 text-center"
            >
              <div className="text-amber-400 font-bold text-sm mb-2">{v.title}</div>
              <div className="text-slate-400 text-xs leading-relaxed">{v.desc}</div>
            </div>
          ))}
        </div>
      </div>

      {/* 三步流程 */}
      <div className="bg-slate-900 px-4 pb-10">
        <div className="max-w-md mx-auto">
          <h2 className="text-base font-bold mb-5 text-center text-slate-300">
            三步完成自查
          </h2>
          {[
            { n: '1', t: '回答 8-13 道是否题', d: '根据你的情况动态调整' },
            { n: '2', t: '看到红/黄/绿判定', d: '清楚知道有没有雷' },
            { n: '3', t: '拿到具体处理建议', d: '能自己处理 vs 需要书士' },
          ].map(s => (
            <div key={s.n} className="flex gap-4 mb-4 items-start">
              <div className="w-8 h-8 bg-amber-400 text-slate-900 rounded-full flex items-center justify-center font-bold flex-shrink-0 text-sm">
                {s.n}
              </div>
              <div className="flex-1 min-w-0">
                <div className="font-bold text-white text-sm">{s.t}</div>
                <div className="text-slate-400 text-xs leading-relaxed mt-0.5">
                  {s.d}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Footer */}
      <div className="bg-slate-950 px-4 py-6 text-center border-t border-slate-800">
        <p className="text-slate-500 text-xs leading-relaxed">
          本工具由持牌行政书士团队支持
        </p>
        <p className="text-slate-600 text-xs mt-1">© 2026 TEBIQ</p>
      </div>
    </main>
  )
}
