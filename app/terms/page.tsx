import type { Metadata } from 'next'
import type { ReactNode } from 'react'
import AppBar from '@/app/_components/v5/AppBar'
import AppShell from '@/app/_components/v5/AppShell'

export const metadata: Metadata = {
  title: '利用規約 | TEBIQ',
  description: 'TEBIQ サービス利用規約',
}

export default function TermsPage() {
  return (
    <AppShell appBar={<AppBar title="法务信息" back="/" />}>
      <article className="jp-text py-5">
        <h1 className="text-[25px] font-medium leading-tight text-ink">
          利用規約
        </h1>
        <p className="mt-3 text-[11px] text-ash">最終更新日：2026年4月24日</p>

        <p className="mt-6 text-[13px] leading-[1.8] text-slate">
          本規約は、hedgefox合同会社（以下「当社」といいます）が提供する
          TEBIQ（以下「本サービス」といいます）の利用条件を定めるものです。
        </p>

        <div className="mt-6 space-y-3">
          {ARTICLES.map((a, i) => (
            <Article key={a.heading} index={i + 1} heading={a.heading}>
              {a.body}
            </Article>
          ))}
        </div>
      </article>
    </AppShell>
  )
}

function Article({
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
        第{index}条（{heading}）
      </h2>
      <div className="space-y-2 text-[12px] leading-[1.75] text-slate">{children}</div>
    </section>
  )
}

const ARTICLES = [
  {
    heading: '定義',
    body: (
      <>
        <p>本規約において使用する用語の定義は以下の通りです：</p>
        <ol className="list-decimal ml-5 space-y-0.5">
          <li>「利用者」とは、本サービスを利用するすべての方をいいます。</li>
          <li>
            「コンテンツ」とは、本サービス上で提供されるすべての情報、文章、画像、PDF、生成資料等をいいます。
          </li>
        </ol>
      </>
    ),
  },
  {
    heading: 'サービス内容',
    body: (
      <>
        <p>本サービスは、在留資格に関する情報提供および参考資料生成を目的とします。</p>
        <p>本サービスは以下を提供いたしません：</p>
        <ul className="list-disc ml-5 space-y-0.5">
          <li>法的助言</li>
          <li>申請代行</li>
          <li>個別具体的な法的判断</li>
        </ul>
      </>
    ),
  },
  {
    heading: '利用登録',
    body: (
      <>
        <p>利用者は、当社の定める方法により利用登録を行うことができます。</p>
        <p>当社は、登録申請者が以下に該当する場合、登録を拒否することがあります：</p>
        <ul className="list-disc ml-5 space-y-0.5">
          <li>虚偽の情報を提供した場合</li>
          <li>過去に本規約違反があった場合</li>
          <li>その他、当社が不適切と判断した場合</li>
        </ul>
      </>
    ),
  },
  {
    heading: '禁止事項',
    body: (
      <>
        <p>利用者は、本サービスの利用にあたり、以下の行為を行ってはなりません：</p>
        <ul className="list-disc ml-5 space-y-0.5">
          <li>法令または公序良俗に違反する行為</li>
          <li>本サービスの運営を妨害する行為</li>
          <li>他の利用者の個人情報を収集する行為</li>
          <li>本サービスのコンテンツを無断で転載、複製、販売する行為</li>
          <li>本サービスを申請代行のために悪用する行為</li>
          <li>その他、当社が不適切と判断する行為</li>
        </ul>
      </>
    ),
  },
  {
    heading: '知的財産権',
    body: (
      <>
        <p>本サービスに関する知的財産権は、すべて当社に帰属します。</p>
        <p>利用者は、生成された参考資料を個人的な用途に限り使用することができます。</p>
      </>
    ),
  },
  {
    heading: '免責事項',
    body: (
      <>
        <ol className="list-decimal ml-5 space-y-0.5">
          <li>
            本サービスは情報提供を目的としたものであり、その正確性、完全性、有用性を保証するものではありません。
          </li>
          <li>本サービスに基づく申請結果について、当社は一切の責任を負いません。</li>
          <li>本サービスの利用により生じた損害について、当社は一切の責任を負いません。</li>
        </ol>
      </>
    ),
  },
  {
    heading: 'サービスの変更・停止',
    body: (
      <p>
        当社は、利用者への事前通知なく、本サービスの内容を変更または停止することができます。
      </p>
    ),
  },
  {
    heading: '規約の変更',
    body: (
      <p>
        当社は、必要に応じて本規約を変更することができます。
        変更後の規約は、本ページに掲載した時点で効力を生じます。
      </p>
    ),
  },
  {
    heading: '準拠法・管轄裁判所',
    body: (
      <p>
        本規約は日本法に準拠し、本サービスに関する紛争については、
        東京地方裁判所を第一審の専属的合意管轄裁判所とします。
      </p>
    ),
  },
]
