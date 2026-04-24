import Link from 'next/link'

export const metadata = {
  title: '咨询请求已提交 | TEBIQ',
}

export default function ConsultationSuccessPage() {
  return (
    <main className="min-h-screen bg-base text-body flex flex-col pb-[max(1rem,env(safe-area-inset-bottom))]">
      <header className="sticky top-0 z-10 bg-card/95 backdrop-blur border-b border-line">
        <div className="max-w-md md:max-w-3xl mx-auto px-4 h-14 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-3" aria-label="TEBIQ 首页">
            <img src="/logo-icon.png" alt="" className="h-12 w-12 rounded-xl" />
            <div>
              <div className="text-xl font-bold text-title leading-none">TEBIQ</div>
              <div className="text-xs text-muted leading-tight mt-0.5">てびき</div>
            </div>
          </Link>
        </div>
      </header>

      <section className="flex-1 px-4 py-12 md:py-20 flex items-center justify-center">
        <div className="max-w-md md:max-w-xl w-full bg-card border border-line rounded-2xl p-8 shadow-sm text-center">
          <div className="w-16 h-16 mx-auto mb-5 rounded-full bg-[#DCFCE7] text-[#15803D] text-3xl font-bold flex items-center justify-center">
            ✓
          </div>
          <h1 className="text-2xl font-bold text-title mb-3">提交成功</h1>
          <p className="text-body text-base leading-relaxed mb-6">
            我们会在 24 小时内联系您。<br />
            请保持联系方式畅通。
          </p>

          <div className="bg-highlight border border-primary/30 rounded-xl p-4 mb-6 text-left">
            <p className="text-title text-sm font-bold mb-1">如紧急情况：</p>
            <p className="text-body text-sm leading-relaxed">
              请直接拨打 <span className="font-bold">（咨询热线即将开通）</span>
            </p>
          </div>

          <div className="flex flex-col gap-3">
            <Link
              href="/"
              className="flex items-center justify-center w-full min-h-[52px] bg-primary hover:bg-primary-hover text-title font-bold rounded-xl text-base transition-all"
            >
              返回首页
            </Link>
            <Link
              href="/knowledge"
              className="text-primary hover:text-primary-hover text-sm font-bold underline underline-offset-4"
            >
              在等待期间，了解更多签证知识 →
            </Link>
          </div>
        </div>
      </section>
    </main>
  )
}
