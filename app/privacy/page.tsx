import Link from 'next/link'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'プライバシーポリシー | TEBIQ',
  description: 'TEBIQの個人情報保護方針',
}

export default function PrivacyPage() {
  return (
    <main className="min-h-screen bg-base text-body pb-16 md:pb-0">
      <header className="sticky top-0 z-10 bg-card/95 backdrop-blur border-b border-line">
        <div className="max-w-md md:max-w-3xl mx-auto px-4 h-14 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-3" aria-label="TEBIQ 首页">
            <img src="/logo-icon.png" alt="" className="h-12 w-12 rounded-xl" />
            <div>
              <div className="text-xl font-bold text-title leading-none">TEBIQ</div>
              <div className="text-xs text-muted leading-tight mt-0.5">てびき</div>
            </div>
          </Link>
          <Link href="/" className="text-body hover:text-title text-sm">← 首页</Link>
        </div>
      </header>

      <article className="max-w-md md:max-w-3xl mx-auto px-4 py-10 md:py-14">
        <h1 className="text-2xl md:text-3xl font-bold text-title mb-3 leading-tight">
          プライバシーポリシー
          <span className="block text-base text-muted font-normal mt-1">（個人情報保護方針）</span>
        </h1>
        <p className="text-muted text-xs mb-6">最終更新日：2026年4月24日</p>

        <p className="text-body text-sm leading-relaxed mb-8">
          hedgefox合同会社（以下「当社」といいます）は、お客様の個人情報の重要性を認識し、
          以下の方針に基づき適切に取り扱います。
        </p>

        <div className="space-y-6">
          {SECTIONS.map((s, i) => (
            <Section key={s.heading} index={i + 1} heading={s.heading}>
              {s.body}
            </Section>
          ))}
        </div>

        <div className="mt-10 bg-card border border-line rounded-2xl p-5">
          <h3 className="text-title text-sm font-bold mb-2">8. お問い合わせ窓口</h3>
          <p className="text-body text-sm leading-relaxed">
            個人情報の取扱いに関するお問い合わせは、以下までお願いいたします：
          </p>
          <p className="text-body text-sm leading-relaxed mt-2">
            hedgefox合同会社
            <br />
            メール：
            <a
              href="mailto:contact@tebiq.jp"
              className="text-primary hover:text-primary-hover underline"
            >
              contact@tebiq.jp
            </a>
          </p>
        </div>
      </article>
    </main>
  )
}

function Section({
  index,
  heading,
  children,
}: {
  index: number
  heading: string
  children: React.ReactNode
}) {
  return (
    <section className="bg-card border border-line rounded-2xl p-5">
      <h2 className="text-title text-sm font-bold mb-2">
        {index}. {heading}
      </h2>
      <div className="text-body text-sm leading-relaxed space-y-2">{children}</div>
    </section>
  )
}

const SECTIONS = [
  {
    heading: '取得する個人情報',
    body: (
      <>
        <p>当社は以下の個人情報を取得いたします：</p>
        <ul className="list-disc ml-5 space-y-0.5">
          <li>お名前（任意）</li>
          <li>メールアドレス</li>
          <li>電話番号</li>
          <li>在留資格に関する情報</li>
          <li>自己診断の回答内容</li>
          <li>決済情報（Stripeを通じて処理、当社は保存しません）</li>
        </ul>
      </>
    ),
  },
  {
    heading: '個人情報の利用目的',
    body: (
      <>
        <p>取得した個人情報は、以下の目的のために利用いたします：</p>
        <ul className="list-disc ml-5 space-y-0.5">
          <li>本サービスの提供および改善</li>
          <li>お客様からのお問い合わせへの対応</li>
          <li>行政書士への相談依頼の取次</li>
          <li>重要なお知らせの送付</li>
          <li>統計データの作成（個人を特定できない形で）</li>
        </ul>
      </>
    ),
  },
  {
    heading: '第三者提供',
    body: (
      <>
        <p>お客様の同意なく、個人情報を第三者に提供することはありません。ただし、以下の場合を除きます：</p>
        <ul className="list-disc ml-5 space-y-0.5">
          <li>法令に基づく場合</li>
          <li>お客様ご自身の依頼により行政書士等へ取次する場合</li>
          <li>人の生命、身体または財産の保護のために必要な場合</li>
        </ul>
      </>
    ),
  },
  {
    heading: '安全管理',
    body: (
      <p>
        当社は、個人情報の漏洩、滅失、毀損の防止のため、適切な安全管理措置を講じます。
      </p>
    ),
  },
  {
    heading: 'Cookie等の利用',
    body: (
      <p>
        本サービスでは、サービス改善のためCookieを使用する場合があります。
        ブラウザの設定により、Cookieの利用を拒否することが可能です。
      </p>
    ),
  },
  {
    heading: '個人情報の開示・訂正・削除',
    body: (
      <p>
        お客様ご自身の個人情報について、開示、訂正、削除をご希望の場合は、
        contact@tebiq.jp までご連絡ください。
      </p>
    ),
  },
  {
    heading: 'プライバシーポリシーの変更',
    body: (
      <p>
        本プライバシーポリシーは、必要に応じて変更されることがあります。
        変更した場合は、本ページにて公表いたします。
      </p>
    ),
  },
]
