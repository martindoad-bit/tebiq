import type { Metadata } from 'next'
import type { ReactNode } from 'react'
import AppBar from '@/app/_components/v5/AppBar'
import AppShell from '@/app/_components/v5/AppShell'

export const metadata: Metadata = {
  title: '特定商取引法に基づく表記 | TEBIQ',
  description: 'TEBIQの特定商取引法に基づく表記',
}

export default function TokushoPage() {
  return (
    <AppShell appBar={<AppBar title="法务信息" back="/" />}>
      <article className="jp-text py-5">
        <h1 className="text-[25px] font-medium leading-tight text-ink">
          特定商取引法に基づく表記
        </h1>
        <p className="mt-3 text-[11px] text-ash">最終更新日：2026年4月24日</p>

        <div className="mt-6 divide-y divide-hairline overflow-hidden rounded-card border border-hairline bg-surface shadow-card">
          {SECTIONS.map(s => (
            <Section key={s.label} label={s.label}>
              {s.lines.map((l, i) => (
                <p key={i} className="leading-relaxed">
                  {l}
                </p>
              ))}
            </Section>
          ))}
        </div>

        <p className="mt-6 text-[11px] leading-[1.75] text-ash">
          本ページの内容についてご不明な点がございましたら、
          <a href="mailto:contact@tebiq.jp" className="text-ink underline underline-offset-2">
            contact@tebiq.jp
          </a>{' '}
          までお問い合わせください。
        </p>
      </article>
    </AppShell>
  )
}

function Section({ label, children }: { label: string; children: ReactNode }) {
  return (
    <div className="px-4 py-4">
      <h2 className="mb-2 text-[12px] font-medium leading-snug text-ink">【{label}】</h2>
      <div className="space-y-1 text-[12px] leading-[1.75] text-slate">{children}</div>
    </div>
  )
}

const SECTIONS = [
  {
    label: '販売事業者',
    lines: ['刺狐合同会社'],
  },
  {
    label: '代表者',
    lines: ['馬驍馳'],
  },
  {
    label: '所在地',
    lines: ['〒161-0033', '東京都新宿区下落合3丁目12-28', '目白が丘マンション309号室'],
  },
  {
    label: '連絡先',
    lines: [
      'メール：contact@tebiq.jp',
      '（お問い合わせはメールにてお願いいたします。通常24時間以内に返信いたします。）',
    ],
  },
  {
    label: 'サービス内容',
    lines: [
      '本サービスは、在留資格に関する「情報提供」および「参考資料の生成」を目的としたものです。',
      '申請書類の「代理作成」や「申請代行」には該当しません。',
      '生成された参考資料は、利用者ご自身が確認・修正の上、ご自身で申請していただくものです。',
    ],
  },
  {
    label: '販売価格',
    lines: ['各商品ページに表示の通り（税込）'],
  },
  {
    label: '支払方法',
    lines: ['正式公開前に本ページで表示します（クレジットカード等を検討中）'],
  },
  {
    label: '支払時期',
    lines: ['有料プラン申込時に表示します'],
  },
  {
    label: '商品の引渡時期',
    lines: ['有料機能は決済確認後に利用可能となります'],
  },
  {
    label: '返品・返金について',
    lines: [
      '本商品はデジタルコンテンツの性質上、ダウンロード後の返金には原則として応じておりません。',
      'ただし、技術的な不具合によりダウンロードできない場合は、contact@tebiq.jp までご連絡いただければ、全額返金いたします。',
    ],
  },
  {
    label: 'クーリング・オフについて',
    lines: [
      '本サービスは通信販売に該当するため、特定商取引法上のクーリング・オフ制度の適用対象外となります。',
    ],
  },
  {
    label: '未成年者のご利用について',
    lines: [
      '未成年者が本サービスをご利用の際は、親権者の同意を得た上でお申込みください。',
    ],
  },
  {
    label: '個人情報の取扱い',
    lines: [
      '当社は、利用者から取得した個人情報を、別途定める「プライバシーポリシー」に従い適切に取り扱います。',
    ],
  },
  {
    label: '免責事項',
    lines: [
      '本サービスは情報提供を目的としており、法的助言や法的判断を提供するものではありません。',
      '個別具体的な法的判断が必要な場合は、专家等の専門家にご相談ください。',
    ],
  },
]
