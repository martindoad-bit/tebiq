import type { Metadata } from 'next'
import type { ReactNode } from 'react'
import AppBar from '@/app/_components/v5/AppBar'
import AppShell from '@/app/_components/v5/AppShell'

export const metadata: Metadata = {
  title: 'プライバシーポリシー | TEBIQ',
  description: 'TEBIQの個人情報保護方針',
}

export default function PrivacyPage() {
  return (
    <AppShell appBar={<AppBar title="法务信息" back="/" />}>
      <article className="jp-text py-5">
        <h1 className="text-[25px] font-medium leading-tight text-ink">
          プライバシーポリシー
          <span className="mt-1 block text-[13px] font-normal text-ash">（個人情報保護方針）</span>
        </h1>
        <p className="mt-3 text-[11px] text-ash">最終更新日：2026年4月24日</p>

        <p className="mt-6 text-[13px] leading-[1.8] text-slate">
          刺狐合同会社（以下「当社」といいます）は、お客様の個人情報の重要性を認識し、
          以下の方針に基づき適切に取り扱います。
        </p>

        <div className="mt-6 space-y-3">
          {SECTIONS.map((s, i) => (
            <Section key={s.heading} index={i + 1} heading={s.heading}>
              {s.body}
            </Section>
          ))}
        </div>

        <div className="mt-4 rounded-card border border-hairline bg-surface px-4 py-4 shadow-card">
          <h3 className="mb-2 text-[13px] font-medium text-ink">8. お問い合わせ窓口</h3>
          <p className="text-[12px] leading-[1.75] text-slate">
            個人情報の取扱いに関するお問い合わせは、以下までお願いいたします：
          </p>
          <p className="mt-2 text-[12px] leading-[1.75] text-slate">
            刺狐合同会社
            <br />
            メール：
            <a
              href="mailto:contact@tebiq.jp"
              className="text-ink underline underline-offset-2"
            >
              contact@tebiq.jp
            </a>
          </p>
        </div>
      </article>
    </AppShell>
  )
}

function Section({
  index,
  heading,
  children,
}: {
  index: number
  heading: string
  children: ReactNode
}) {
  return (
    <section className="rounded-card border border-hairline bg-surface px-4 py-4 shadow-card">
      <h2 className="mb-2 text-[13px] font-medium leading-snug text-ink">
        {index}. {heading}
      </h2>
      <div className="space-y-2 text-[12px] leading-[1.75] text-slate">{children}</div>
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
          <li>決済情報（有料機能提供時に決済代行会社を通じて処理、当社はカード情報を保存しません）</li>
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
          <li>专家への相談依頼の取次</li>
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
          <li>お客様ご自身の依頼により专家等へ取次する場合</li>
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
