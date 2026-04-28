import type { Metadata } from 'next'
import Link from 'next/link'
import { SeoBullet as Bullet, SeoSection as Section, SeoVisaArticleShell } from '@/app/_components/v5/SeoVisaArticleShell'

export const metadata: Metadata = {
  title: '定住者签证指南 2026 | TEBIQ',
  description:
    '日本定住者签证（告示・非告示）完整指南。日系三世、离婚定住、抚养日本人实子等典型类型，续签要件、常见踩坑与准备清单。',
  alternates: { canonical: '/teijusha' },
  openGraph: {
    title: '定住者签证指南 2026',
    description:
      '定住者签证完整指南：典型类型、续签要件与准备清单。',
    url: 'https://tebiq.jp/teijusha',
    siteName: 'TEBIQ',
    locale: 'zh_CN',
    type: 'article',
  },
}

const articleSchema = {
  '@context': 'https://schema.org',
  '@type': 'Article',
  headline: '定住者签证指南 2026',
  description:
    '定住者签证完整指南，含典型类型、续签要件与准备建议。',
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
  mainEntityOfPage: 'https://tebiq.jp/teijusha',
}

export default function TeijushaLandingPage() {
  return (
    <SeoVisaArticleShell articleSchema={articleSchema} title={"定住者签证指南 2026"} updated={"最新更新：2026-04-24 · 适用「定住者」（告示・非告示） [待书士审核]"}>

          <nav
            aria-label="目录"
            className="bg-surface border border-hairline rounded-card p-5 mb-8"
          >
            <h2 className="text-ink font-medium text-[13px] mb-3">本文目录</h2>
            <ol className="space-y-2 text-[12px] text-slate list-decimal list-inside">
              <li>
                <a href="#what-is" className="text-ink underline underline-offset-4">
                  定住者签证是什么
                </a>
              </li>
              <li>
                <a href="#core-conditions" className="text-ink underline underline-offset-4">
                  续签的核心条件
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

          <Section id="what-is" title="定住者签证是什么">
            <p>
              「定住者」是法务大臣考虑特别理由后给予一定居住期间的在留资格。它没有专门的「申请要件清单」，而是按照「告示定住」与「非告示定住」两条路径分别处理。
            </p>
            <p>
              典型的告示定住包括：日系三世、定住者配偶者等；典型的非告示定住包括：与日本人离婚但与日本人实子有抚养关系、配偶死亡后继续抚养未成年子女、长期日本人配偶者改类等。
            </p>
            <p>
              定住者像配偶者签证一样没有职业限制，可以正职、兼职、自营。在留期间通常为 5 年、3 年、1 年或 6 个月。[待书士审核]
            </p>
          </Section>

          <Section id="core-conditions" title="续签的核心条件">
            <ul className="space-y-2">
              <Bullet>
                <strong>初始资格事由的延续：</strong>当初获得定住的事由（抚养实子、与日系亲属关系等）仍然存续。
              </Bullet>
              <Bullet>
                <strong>独立生计能力：</strong>本人或家庭有稳定收入，不依赖生活保护。
              </Bullet>
              <Bullet>
                <strong>纳税义务：</strong>住民税、所得税完整缴纳，无延迟。
              </Bullet>
              <Bullet>
                <strong>社保加入：</strong>健康保险、年金按月加入。
              </Bullet>
              <Bullet>
                <strong>无重大违规：</strong>无刑事违规，无严重交通违规。
              </Bullet>
              <Bullet>
                <strong>身份事项申报：</strong>住所、姓氏、亲属关系变化等 14 天内申报。[待书士审核]
              </Bullet>
            </ul>
          </Section>

          <Section id="policy-2026" title="2025-2026 政策动向">
            <ul className="space-y-3">
              <Bullet>
                <strong>定住者地位在新规下的特殊作用：</strong>2025 年 10 月经营管理新规明确：常勤员工口径中，定住者与日本人配偶者等并列可计入常勤。这让定住者在就业市场的可雇性进一步提升。
              </Bullet>
              <Bullet>
                <strong>归化运用变更：</strong>2026 年 4 月起归化原则居住要件从 5 年提高到 10 年。持定住者签证将来计划归化的人需要早规划。
              </Bullet>
              <Bullet>
                <strong>非告示定住审查个案性强：</strong>近年实务上对子女抚养关系、共同生活实质等的审查越来越细致，材料准备需要时间线清晰。
              </Bullet>
            </ul>
            <p className="text-ash text-[11px] mt-3">
              来源：法務省（令和 8 年 4 月 1 日施行）/ 出入国在留管理庁公开资料 [待书士审核]
            </p>
          </Section>

          <Section id="pitfalls" title="常见踩坑">
            <ul className="space-y-2">
              <Bullet>
                <strong>抚养事由消失：</strong>例如离婚定住的孩子已成年并独立生活，原始事由可能不再成立，需要提前转换签证。
              </Bullet>
              <Bullet>
                <strong>住民税 / 年金延迟：</strong>定住者审查同样看纳税与社保，与永住接近。
              </Bullet>
              <Bullet>
                <strong>住址变化未申报：</strong>14 天内市役所申报是义务，漏报会留下负面记录。
              </Bullet>
              <Bullet>
                <strong>长期出国：</strong>长时间不在日本可能被认为「定住事由」实质性中断。
              </Bullet>
              <Bullet>
                <strong>误以为「定住=永住」：</strong>定住者仍有在留期间限制，需要按时续签。[待书士审核]
              </Bullet>
            </ul>
          </Section>

          <Section id="prepare" title="准备建议">
            <ul className="space-y-2">
              <Bullet>
                <strong>整理事由证据：</strong>抚养子女、离婚证明、亲属关系证明等，按时间线整理。
              </Bullet>
              <Bullet>
                <strong>提前 3-4 个月开始：</strong>需要从市役所、年金事务所获取多项证明。
              </Bullet>
              <Bullet>
                <strong>纳税证明 / 社保记录确认：</strong>到市役所获取最近 1-2 年的纳税证明和加入记录。
              </Bullet>
              <Bullet>
                <strong>有事由变化早咨询：</strong>子女独立、再婚、新增抚养等情况下，应在变化发生后尽快约书士。
              </Bullet>
              <Bullet>
                <strong>未来归化或永住规划：</strong>定住者可作为永住或归化的过渡，提前规划居住时间。
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

          <Link
            href="/check/teijusha/quiz"
            className="mt-5 flex min-h-[48px] w-full items-center justify-center rounded-btn bg-accent px-4 py-3 text-[13px] font-medium text-white shadow-cta"
          >
            3 分钟开始定住者签证自查 →
          </Link>

          <p className="text-center text-ash text-[11px] mt-8 leading-relaxed">
            本页面内容不构成法律意见，具体情况请咨询持牌行政书士。
          </p>
    </SeoVisaArticleShell>
  )
}
