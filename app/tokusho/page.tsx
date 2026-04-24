import Link from 'next/link'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: '特定商取引法に基づく表記 | TEBIQ',
  description: 'TEBIQの特定商取引法に基づく表記',
}

export default function TokushoPage() {
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
          特定商取引法に基づく表記
        </h1>
        <p className="text-muted text-xs mb-8">最終更新日：2026年4月24日</p>

        <div className="bg-card border border-line rounded-2xl shadow-sm divide-y divide-line">
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

        <p className="text-muted text-xs mt-8 leading-relaxed">
          本ページの内容についてご不明な点がございましたら、
          <a href="mailto:contact@tebiq.jp" className="text-primary hover:text-primary-hover underline">
            contact@tebiq.jp
          </a>{' '}
          までお問い合わせください。
        </p>
      </article>
    </main>
  )
}

function Section({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div className="px-5 py-4 md:px-6 md:py-5">
      <h2 className="text-title text-sm font-bold mb-2">【{label}】</h2>
      <div className="text-body text-sm space-y-1">{children}</div>
    </div>
  )
}

const SECTIONS = [
  {
    label: '販売事業者',
    lines: ['hedgefox合同会社（刺狐合同会社）'],
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
    lines: [
      'クレジットカード決済（Stripe経由）',
      '対応ブランド：Visa / MasterCard / JCB / American Express',
    ],
  },
  {
    label: '支払時期',
    lines: ['ご注文確定時に決済'],
  },
  {
    label: '商品の引渡時期',
    lines: ['決済完了後、即時にダウンロード可能'],
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
      '個別具体的な法的判断が必要な場合は、持牌行政書士等の専門家にご相談ください。',
    ],
  },
]
