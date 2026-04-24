import type { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  title: '配偶者签证续签指南 2026 | TEBIQ',
  description:
    '日本人配偶者・永住者配偶者签证续签完整指南。婚姻实质性、同居证明、收入要件、常见踩坑、准备清单。3 分钟自查续签风险。',
  alternates: { canonical: '/haigusha' },
  openGraph: {
    title: '配偶者签证续签指南 2026',
    description:
      '日本人配偶者・永住者配偶者续签完整指南。婚姻实质性、同居证明与准备清单。',
    url: 'https://tebiq.jp/haigusha',
    siteName: 'TEBIQ',
    locale: 'zh_CN',
    type: 'article',
  },
}

const articleSchema = {
  '@context': 'https://schema.org',
  '@type': 'Article',
  headline: '配偶者签证续签指南 2026',
  description:
    '日本人配偶者・永住者配偶者签证续签完整指南，含婚姻实质性、同居证明与准备建议。',
  inLanguage: 'zh-CN',
  author: { '@type': 'Organization', name: 'TEBIQ' },
  publisher: {
    '@type': 'Organization',
    name: 'TEBIQ',
    logo: {
      '@type': 'ImageObject',
      url: 'https://tebiq.jp/logo-icon.png',
    },
  },
  datePublished: '2026-04-01',
  dateModified: '2026-04-24',
  mainEntityOfPage: 'https://tebiq.jp/haigusha',
}

export default function HaigushaLandingPage() {
  return (
    <main className="min-h-screen bg-base text-body flex flex-col pb-16 md:pb-0">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }}
      />

      <header className="sticky top-0 z-10 bg-card/95 backdrop-blur border-b border-line">
        <div className="max-w-md md:max-w-6xl mx-auto px-4 h-14 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-3" aria-label="TEBIQ 首页">
            <img src="/logo-icon.png" alt="" className="h-12 w-12 rounded-xl" />
            <div>
              <div className="text-xl font-bold text-title leading-none">TEBIQ</div>
              <div className="text-xs text-muted leading-tight mt-0.5">てびき</div>
            </div>
          </Link>
          <Link
            href="/visa-select"
            className="bg-primary hover:bg-primary-hover text-title font-bold text-sm px-4 py-2 rounded-lg transition-all"
          >
            开始自查
          </Link>
        </div>
      </header>

      <article className="flex-1 px-4 py-8 md:py-12">
        <div className="max-w-md md:max-w-3xl mx-auto">
          <h1 className="text-2xl md:text-4xl font-bold mb-4 leading-tight text-title">
            配偶者签证续签指南 2026
          </h1>
          <p className="text-muted text-sm mb-8">
            最新更新：2026-04-24 · 适用「日本人配偶者等」「永住者配偶者等」 [待书士审核]
          </p>

          <nav
            aria-label="目录"
            className="bg-card border border-line rounded-2xl p-5 mb-8"
          >
            <h2 className="text-title font-bold text-base mb-3">本文目录</h2>
            <ol className="space-y-2 text-sm text-body list-decimal list-inside">
              <li>
                <a href="#what-is" className="text-primary hover:underline">
                  配偶者签证是什么
                </a>
              </li>
              <li>
                <a href="#core-conditions" className="text-primary hover:underline">
                  续签的核心条件
                </a>
              </li>
              <li>
                <a href="#policy-2026" className="text-primary hover:underline">
                  2025-2026 政策动向
                </a>
              </li>
              <li>
                <a href="#pitfalls" className="text-primary hover:underline">
                  常见踩坑
                </a>
              </li>
              <li>
                <a href="#prepare" className="text-primary hover:underline">
                  准备建议
                </a>
              </li>
            </ol>
          </nav>

          <Section id="what-is" title="配偶者签证是什么">
            <p>
              配偶者签证分为两种：「日本人の配偶者等」与「永住者の配偶者等」。前者发给与日本人结婚的外国人配偶（也包含日本人的实子和特别养子），后者发给永住者或特别永住者的外国人配偶与在日出生的孩子。
            </p>
            <p>
              这是日本最自由的在留资格之一：没有职业限制，可以正职、兼职、创业、不工作；活动范围与日本人基本相同。但「自由」对应的是入管局对婚姻真实性的反复确认，续签时审查重点不在工作，而在「这段婚姻是否实质存续」。
            </p>
            <p>
              在留期间通常为 5 年、3 年、1 年或 6 个月，初婚常先给 1 年。[待书士审核]
            </p>
          </Section>

          <Section id="core-conditions" title="续签的核心条件">
            <ul className="space-y-2">
              <Bullet>
                <strong>婚姻实质性：</strong>夫妻共同生活、有日常交流、共同经济生活的事实。仅是户籍上的婚姻关系不够。
              </Bullet>
              <Bullet>
                <strong>同居事实：</strong>住民票上同一住所，或有合理的分居理由（工作派遣、看护父母等）。
              </Bullet>
              <Bullet>
                <strong>家庭收入：</strong>配偶或本人有稳定收入，能维持家庭基本生活。无固定金额线，但过低会被追问。
              </Bullet>
              <Bullet>
                <strong>纳税与社保：</strong>住民税、所得税无欠缴，加入国民健康保险或厚生年金。
              </Bullet>
              <Bullet>
                <strong>身份事项申报：</strong>结婚、离婚、住所变更等 14 天内向入管局或市役所申报。
              </Bullet>
              <Bullet>
                <strong>无重大违规：</strong>无刑事记录，无严重交通违规。[待书士审核]
              </Bullet>
            </ul>
          </Section>

          <Section id="policy-2026" title="2025-2026 政策动向">
            <p>
              配偶者签证近年没有像技人国、经营管理那样的大规模制度修改，但实务审查越来越严格：
            </p>
            <ul className="space-y-3">
              <Bullet>
                <strong>「假结婚」审查趋严：</strong>对于年龄差大、相识时间短、没有共同语言、住址迅速变动等组合，入管局可能要求提交大量补充资料（共同照片、聊天记录、汇款记录、共同账户等）。
              </Bullet>
              <Bullet>
                <strong>归化要件影响联动：</strong>2026 年 4 月 1 日起，归化原则居住要件从 5 年严格化为 10 年（法务省运用变更）；持配偶者签证将来计划归化的人需要提前规划。
              </Bullet>
              <Bullet>
                <strong>身份系外国人在经营管理新规中的角色：</strong>2025 年 10 月经营管理新规明确「永住者・日本人配偶者等」可计入常勤员工，这意味着配偶者身份在就业市场的稀缺度有所提升。
              </Bullet>
            </ul>
            <p className="text-muted text-xs mt-3">
              来源：法務省（令和 8 年 4 月 1 日施行运用变更）/ 出入国在留管理庁公开资料 [待书士审核]
            </p>
          </Section>

          <Section id="pitfalls" title="常见踩坑">
            <ul className="space-y-2">
              <Bullet>
                <strong>分居却没有合理说明：</strong>住民票分开但又没有派遣、看护等可证明的事由，会被怀疑婚姻已有名无实。
              </Bullet>
              <Bullet>
                <strong>离婚后未申报继续使用配偶者签证：</strong>离婚或配偶死亡后 14 天内必须申报，并应在 6 个月内变更其他在留资格，否则可能被取消在留资格。
              </Bullet>
              <Bullet>
                <strong>家庭收入过低 + 没有补充材料：</strong>低收入本身不一定不许可，但需要附说明书与生活费来源的证明。
              </Bullet>
              <Bullet>
                <strong>配偶税款 / 社保未缴：</strong>审查会同时查看配偶（日本人）一方的纳税与社保情况，配偶欠税也可能影响审查印象。
              </Bullet>
              <Bullet>
                <strong>反复短期出国：</strong>频繁长期不在日本，可能被认为婚姻共同生活实质性不足。[待书士审核]
              </Bullet>
            </ul>
          </Section>

          <Section id="prepare" title="准备建议">
            <ul className="space-y-2">
              <Bullet>
                <strong>整理同居证据链：</strong>住民票、共同房租合同、水电煤账单、夫妻共同照片等，按时间线归档。
              </Bullet>
              <Bullet>
                <strong>提前 3-4 个月开始：</strong>需要市役所开具的婚姻关系证明、纳税证明等，开具周期不长但加上邮寄要预留时间。
              </Bullet>
              <Bullet>
                <strong>准备质问书答辩：</strong>初婚审查或情况复杂时，入管局可能要求填写「质问书」，提前回顾相识、求婚、婚礼等关键节点。
              </Bullet>
              <Bullet>
                <strong>申报无遗漏：</strong>住所、姓氏、联系方式变更全部 14 天内办理。
              </Bullet>
              <Bullet>
                <strong>有变化早咨询：</strong>分居、离婚、配偶死亡等情况下，请尽快约书士确认下一步签证安排。
              </Bullet>
            </ul>
            <p className="mt-4">
              想了解更多基础概念，可参考{' '}
              <Link href="/knowledge" className="text-primary hover:underline">
                签证基础知识
              </Link>
              ；想直接进入风险自查，可前往{' '}
              <Link href="/visa-select" className="text-primary hover:underline">
                签证选择页
              </Link>
              。
            </p>
          </Section>

          <Link
            href="/check/haigusha/quiz"
            className="flex items-center justify-center w-full min-h-[60px] bg-primary hover:bg-primary-hover text-title font-bold py-4 rounded-xl text-base mt-8"
          >
            3 分钟开始配偶者签证自查 →
          </Link>

          <p className="text-center text-muted text-xs mt-8 leading-relaxed">
            本页面内容不构成法律意见，具体情况请咨询持牌行政书士。
          </p>
        </div>
      </article>

      <footer className="bg-card border-t border-line px-4 py-6 pb-[max(1.5rem,env(safe-area-inset-bottom))] text-center mt-auto">
        <Link
          href="/knowledge"
          className="inline-block text-primary hover:text-primary-hover text-sm font-bold mb-4 underline underline-offset-4"
        >
          了解签证基础知识 →
        </Link>
        <p className="text-muted text-xs leading-relaxed">
          本工具由持牌行政书士团队提供支持
        </p>
        <p className="text-muted text-xs mt-1">© 2026 TEBIQ</p>
      </footer>
    </main>
  )
}

function Section({
  id,
  title,
  children,
}: {
  id: string
  title: string
  children: React.ReactNode
}) {
  return (
    <section id={id} className="bg-card border border-line rounded-2xl p-5 mb-6 scroll-mt-20">
      <h2 className="text-title font-bold text-lg mb-3">{title}</h2>
      <div className="text-body text-sm leading-relaxed space-y-3">{children}</div>
    </section>
  )
}

function Bullet({ children }: { children: React.ReactNode }) {
  return (
    <li className="flex gap-2 text-body text-sm leading-relaxed">
      <span className="text-primary flex-shrink-0">•</span>
      <span className="flex-1">{children}</span>
    </li>
  )
}
