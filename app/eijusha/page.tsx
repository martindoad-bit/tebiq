import type { Metadata } from 'next'
import Link from 'next/link'
import { SeoBullet as Bullet, SeoSection as Section, SeoVisaArticleShell } from '@/app/_components/v5/SeoVisaArticleShell'
import TrackedLink from '@/app/_components/v5/TrackedLink'
import { EVENT } from '@/lib/analytics/events'

export const metadata: Metadata = {
  title: '永住者申请完整攻略 2026 | TEBIQ',
  description:
    '在日永住者申请完整攻略。10 年居住要件、纳税社保、在留期间 3 年以上、归化与永住对比、2026 年最新政策动向一次看完。',
  alternates: { canonical: '/eijusha' },
  openGraph: {
    title: '永住者申请完整攻略 2026',
    description:
      '在日永住者申请完整攻略：10 年要件、纳税社保、申请费用动向。',
    url: 'https://tebiq.jp/eijusha',
    siteName: 'TEBIQ',
    locale: 'zh_CN',
    type: 'article',
  },
}

const articleSchema = {
  '@context': 'https://schema.org',
  '@type': 'Article',
  headline: '永住者申请完整攻略 2026',
  description:
    '在日永住者申请完整攻略与 2026 年最新政策动向，含纳税社保与归化比较。',
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
  mainEntityOfPage: 'https://tebiq.jp/eijusha',
}

export default function EijushaLandingPage() {
  return (
    <SeoVisaArticleShell articleSchema={articleSchema} title={"永住者申请完整攻略 2026"} updated={"最新更新：2026-04-24 · 含 2026 年归化运用变更对比"}>

          <nav
            aria-label="目录"
            className="bg-surface border border-hairline rounded-card p-5 mb-8"
          >
            <h2 className="text-ink font-medium text-[13px] mb-3">本文目录</h2>
            <ol className="space-y-2 text-[12px] text-slate list-decimal list-inside">
              <li>
                <a href="#what-is" className="text-ink underline underline-offset-4">
                  永住者是什么
                </a>
              </li>
              <li>
                <a href="#core-conditions" className="text-ink underline underline-offset-4">
                  申请的核心条件
                </a>
              </li>
              <li>
                <a href="#policy-2026" className="text-ink underline underline-offset-4">
                  2025-2026 政策动向
                </a>
              </li>
              <li>
                <a href="#pitfalls" className="text-ink underline underline-offset-4">
                  常见踩坑
                </a>
              </li>
              <li>
                <a href="#prepare" className="text-ink underline underline-offset-4">
                  准备建议
                </a>
              </li>
            </ol>
          </nav>

          <Section id="what-is" title="永住者是什么">
            <p>
              永住者是日本所有在留资格中限制最少的一种：没有在留期间限制（在留卡每 7 年更新一次，但身份本身永久有效）、没有职业限制、可以自由换工作、自由创业。
            </p>
            <p>
              和归化最大的区别在于「国籍不变」——你依然是中国国籍，可以使用中国护照，但获得在日本长期稳定居住与工作的资格。
            </p>
            <p>
              一旦获得永住，多数日常手续与日本人几乎相同，但仍需遵守住所变更申报、长期出国前申请再入国许可等规则。
            </p>
          </Section>

          <Section id="core-conditions" title="申请的核心条件">
            <ul className="space-y-2">
              <Bullet>
                <strong>居住要件：</strong>原则在日连续居住 10 年以上，其中含就劳或居住资格 5 年以上。
              </Bullet>
              <Bullet>
                <strong>素行善良：</strong>无刑事违规，无重大交通违规（醉驾、超速大幅度等）。
              </Bullet>
              <Bullet>
                <strong>独立生计：</strong>本人或家庭有稳定收入与资产，不依赖生活保护。
              </Bullet>
              <Bullet>
                <strong>纳税义务：</strong>住民税、所得税完整缴纳，最近 5 年无延迟与欠缴。
              </Bullet>
              <Bullet>
                <strong>社保加入：</strong>健康保险、年金按月缴纳，最近 2 年无断缴 / 未滞纳。
              </Bullet>
              <Bullet>
                <strong>在留期间：</strong>申请时持有的在留资格期间为 3 年或 5 年（1 年原则上无法申请）。
              </Bullet>
              <Bullet>
                <strong>身元保证人：</strong>需要日本人或永住者作为身元保证人。
              </Bullet>
            </ul>
          </Section>

          <Section id="policy-2026" title="2025-2026 政策动向">
            <ul className="space-y-3">
              <Bullet>
                <strong>归化原则要件 2026 年 4 月起严格化：</strong>法务省运用变更，归化的「居住要件」从原则 5 年提高到原则 10 年。国籍法条文未修改，但实际审查按 10 年运用。永住与归化的居住时间门槛因此趋于一致。
              </Bullet>
              <Bullet>
                <strong>申请费用调整讨论中：</strong>永住申请费用提高的法案正在审议中（媒体报道最高可能至 ¥300,000），具体生效时间和金额尚未确定，建议持续关注法务省与入管庁公告。
              </Bullet>
              <Bullet>
                <strong>纳税与社保审查更细：</strong>近年实务上对住民税缴纳延迟、年金未加入等情况追究越来越严格，过去「补缴一次就过」的灵活度在缩小。
              </Bullet>
              <Bullet>
                <strong>高度专门职特例：</strong>持高度专门职 70 分以上 3 年、80 分以上 1 年仍可申请永住，是缩短居住要件的主要路径之一。
              </Bullet>
            </ul>
            <p className="text-ash text-[11px] mt-3">
              来源：法務省（令和 8 年 4 月 1 日施行）/ 出入国在留管理庁公开资料
            </p>
          </Section>

          <Section id="pitfalls" title="常见踩坑">
            <ul className="space-y-2">
              <Bullet>
                <strong>住民税延迟交一次：</strong>许多人因为换公司或市役所通知漏看，导致一次延迟，结果在永住审查中被一票否决。
              </Bullet>
              <Bullet>
                <strong>年金未加入或断缴：</strong>跨工作之间没有及时加入国民年金，2 年内有缺漏会被严查。
              </Bullet>
              <Bullet>
                <strong>在留期间只有 1 年：</strong>必须先续到 3 年或 5 年才能申请，提前规划。
              </Bullet>
              <Bullet>
                <strong>长期出国导致连续居住中断：</strong>原则单次离境 90 天以上、合计离境 150 天以上有可能被认为居住中断。
              </Bullet>
              <Bullet>
                <strong>身元保证人变化：</strong>身元保证人需要稳定收入与日本居住身份，临时找熟人可能资料不足。
              </Bullet>
            </ul>
          </Section>

          <Section id="prepare" title="准备建议">
            <ul className="space-y-2">
              <Bullet>
                <strong>提前 6-12 个月规划：</strong>纳税证明覆盖 3-5 年，年金记录需要从年金事务所打印，越早开始越能发现遗漏。
              </Bullet>
              <Bullet>
                <strong>整理时间线：</strong>过去 10 年的住所、公司、出入境记录梳理一遍，对照护照盖章。
              </Bullet>
              <Bullet>
                <strong>主动确认社保记录：</strong>到年金事务所获取「ねんきん定期便」或加入记录，提前修正断缴。
              </Bullet>
              <Bullet>
                <strong>身元保证人提早沟通：</strong>找一位长期稳定的日本人朋友或永住者，提前打招呼。
              </Bullet>
              <Bullet>
                <strong>不许可不要慌：</strong>永住不许可后仍可在原签证基础上重新申请，但需要先了解理由。
              </Bullet>
            </ul>
            <p className="mt-4">
              延伸阅读：{' '}
              <Link href="/knowledge" className="text-ink underline underline-offset-4">
                签证基础知识
              </Link>{' '}
              ｜ 想确认其他签证类型？前往{' '}
              <Link href="/visa-select" className="text-ink underline underline-offset-4">
                签证选择页
              </Link>
              。
            </p>
          </Section>

          <TrackedLink
            href="/check"
            eventName={EVENT.HOME_CHECK_CARD_CLICK}
            payload={{ source: 'eijusha_page', visa: 'eijusha' }}
            className="mt-5 flex min-h-[48px] w-full items-center justify-center rounded-btn bg-accent px-4 py-3 text-[13px] font-medium text-white shadow-cta"
          >
            先做材料准备检查 →
          </TrackedLink>

          <p className="text-center text-ash text-[11px] mt-8 leading-relaxed">
            本页面内容不构成法律意见，具体情况请咨询专家。
          </p>
    </SeoVisaArticleShell>
  )
}
