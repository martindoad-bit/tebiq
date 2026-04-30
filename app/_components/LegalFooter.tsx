import Link from 'next/link'

export default function LegalFooter() {
  return (
    <footer className="border-t border-line bg-card pb-16 md:pb-0">
      <div className="max-w-md md:max-w-6xl mx-auto px-4 py-6 text-sm text-muted">
        <nav className="flex flex-wrap gap-x-4 gap-y-2 mb-3">
          <Link href="/tokusho" className="hover:text-title transition-colors">
            特定商取引法に基づく表記
          </Link>
          <Link href="/privacy-policy" className="hover:text-title transition-colors">
            プライバシーポリシー
          </Link>
          <Link href="/terms" className="hover:text-title transition-colors">
            利用規約
          </Link>
          <a href="mailto:contact@tebiq.jp" className="hover:text-title transition-colors">
            お問い合わせ
          </a>
        </nav>
        <div className="text-xs leading-relaxed text-muted/90">
          運営：刺狐合同会社
          <br />
          〒161-0033 東京都新宿区下落合3丁目12-28 目白が丘マンション309号室
          <br />
          © 2026 TEBIQ. All rights reserved.
        </div>
      </div>
    </footer>
  )
}
