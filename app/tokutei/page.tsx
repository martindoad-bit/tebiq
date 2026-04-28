import type { Metadata } from 'next'
import Link from 'next/link'
import { SeoBullet as Bullet, SeoSection as Section, SeoVisaArticleShell } from '@/app/_components/v5/SeoVisaArticleShell'

export const metadata: Metadata = {
  title: '特定技能签证指南 2026 | TEBIQ',
  description:
    '日本特定技能 1 号 / 2 号签证完整指南。适用行业、考试要件、转籍换工作、续签条件、与技人国 / 技能实习的区别一次看懂。',
  alternates: { canonical: '/tokutei' },
  openGraph: {
    title: '特定技能签证指南 2026',
    description:
      '特定技能 1 号 / 2 号、适用行业、转籍换工作与续签要件。',
    url: 'https://tebiq.jp/tokutei',
    siteName: 'TEBIQ',
    locale: 'zh_CN',
    type: 'article',
  },
}

const articleSchema = {
  '@context': 'https://schema.org',
  '@type': 'Article',
  headline: '特定技能签证指南 2026',
  description:
    '特定技能 1 号 / 2 号签证完整指南，含适用行业、考试要件与续签条件。',
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
  mainEntityOfPage: 'https://tebiq.jp/tokutei',
}

export default function TokuteiLandingPage() {
  return (
    <SeoVisaArticleShell articleSchema={articleSchema} title={"特定技能签证指南 2026"} updated={"最新更新：2026-04-24 · 涵盖特定技能 1 号 / 2 号"}>

          <nav
            aria-label="目录"
            className="bg-surface border border-hairline rounded-card p-5 mb-8"
          >
            <h2 className="text-ink font-medium text-[13px] mb-3">本文目录</h2>
            <ol className="space-y-2 text-[12px] text-slate list-decimal list-inside">
              <li>
                <a href="#what-is" className="text-ink underline underline-offset-4">
                  特定技能签证是什么
                </a>
              </li>
              <li>
                <a href="#core-conditions" className="text-ink underline underline-offset-4">
                  续签 / 申请的核心条件
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

          <Section id="what-is" title="特定技能签证是什么">
            <p>
              特定技能是 2019 年新设的在留资格，目的是补充日本国内人手不足行业的劳动力。分为 2 个等级：
            </p>
            <ul className="space-y-2">
              <Bullet>
                <strong>特定技能 1 号：</strong>面向具有一定知识与技能的外国人，最长合计在留 5 年，原则不可携带家族。
              </Bullet>
              <Bullet>
                <strong>特定技能 2 号：</strong>面向技能熟练的外国人，可以更新无次数限制，可携带家族（配偶・子女），未来满足条件可申请永住。
              </Bullet>
            </ul>
            <p>
              对象行业目前包括建设、造船、汽车维修、航空、宿泊、农业、渔业、饮食料品制造、外食、护理、清扫、铁道、林业、木材等多个领域。
            </p>
          </Section>

          <Section id="core-conditions" title="续签 / 申请的核心条件">
            <ul className="space-y-2">
              <Bullet>
                <strong>技能水平：</strong>通过对应行业的技能测试（如「特定技能 1 号評価試験」）或修了「技能実習 2 号」。
              </Bullet>
              <Bullet>
                <strong>日语能力：</strong>原则 JLPT N4 以上 或 JFT-Basic 合格（部分行业要求更高）。
              </Bullet>
              <Bullet>
                <strong>雇佣形态：</strong>原则全职（直接雇用），与日本人同等以上的工资水平。
              </Bullet>
              <Bullet>
                <strong>受入机关：</strong>雇主公司必须是「受入机关」要件合格的企业，并履行支援计划（1 号需要）。
              </Bullet>
              <Bullet>
                <strong>纳税与社保：</strong>住民税、所得税无欠缴；健康保险、年金按月加入。
              </Bullet>
              <Bullet>
                <strong>申报义务：</strong>住所、契約機関变更等 14 天内向入管局申报。
              </Bullet>
            </ul>
          </Section>

          <Section id="policy-2026" title="2025-2026 政策动向">
            <ul className="space-y-3">
              <Bullet>
                <strong>受入领域持续扩大：</strong>近年陆续追加铁道、林业、木材产业、汽车运送业等新领域，未来还可能增加。
              </Bullet>
              <Bullet>
                <strong>育成就劳制度过渡：</strong>原「技能实习」将逐步过渡为「育成就劳」，与特定技能形成更顺畅的衔接路径，预计 2026-2027 年陆续生效。
              </Bullet>
              <Bullet>
                <strong>2 号扩展：</strong>2023 年起 2 号已大幅扩张，覆盖几乎所有 1 号行业。这意味着熟练后可长期工作并携带家族。
              </Bullet>
              <Bullet>
                <strong>归化运用收紧：</strong>2026 年 4 月起归化原则居住要件 10 年化（运用变更），影响特定技能将来归化路径。
              </Bullet>
            </ul>
            <p className="text-ash text-[11px] mt-3">
              来源：出入国在留管理庁公开资料 / 法務省
            </p>
          </Section>

          <Section id="pitfalls" title="常见踩坑">
            <ul className="space-y-2">
              <Bullet>
                <strong>1 号合计 5 年用尽：</strong>1 号最长 5 年，应提前规划升 2 号或转其他签证（技人国、配偶者等）。
              </Bullet>
              <Bullet>
                <strong>受入机关支援未履行：</strong>若雇主公司支援计划落实不到位，续签时可能被指出问题，需更换登录支援机关。
              </Bullet>
              <Bullet>
                <strong>转职手续繁琐：</strong>1 号换工作需要重新做「在留资格变更许可申请」，并非简单换公司届出。
              </Bullet>
              <Bullet>
                <strong>派遣形态范围限制：</strong>特定技能原则要求直接雇用，部分行业例外。
              </Bullet>
              <Bullet>
                <strong>技能测试合格但行业匹配错位：</strong>技能测试合格的行业必须与雇主业务一致，跨行业不能直接通用。
              </Bullet>
            </ul>
          </Section>

          <Section id="prepare" title="准备建议">
            <ul className="space-y-2">
              <Bullet>
                <strong>提前 3-4 个月开始：</strong>受入机关需出具大量证明材料，预留宽裕时间。
              </Bullet>
              <Bullet>
                <strong>规划升 2 号路径：</strong>满足实务经验与高级技能测试后及早申请变更，可避开 5 年上限。
              </Bullet>
              <Bullet>
                <strong>保留考试合格证：</strong>技能测试和日语测试的合格证书是反复使用的核心材料，请数字化保存。
              </Bullet>
              <Bullet>
                <strong>转职前先咨询：</strong>1 号转职手续复杂，建议在辞职前确认下一家是否符合受入机关要件。
              </Bullet>
              <Bullet>
                <strong>纳税与社保按月确认：</strong>住民税、年金任何延迟都会影响续签印象。
              </Bullet>
            </ul>
            <p className="mt-4">
              想了解更多基础概念，可参考{' '}
              <Link href="/knowledge" className="text-ink underline underline-offset-4">
                签证基础知识
              </Link>
              ；想直接进入风险自查，可前往{' '}
              <Link href="/visa-select" className="text-ink underline underline-offset-4">
                签证选择页
              </Link>
              。
            </p>
          </Section>

          <Link
            href="/check/tokutei/quiz"
            className="mt-5 flex min-h-[48px] w-full items-center justify-center rounded-btn bg-accent px-4 py-3 text-[13px] font-medium text-white shadow-cta"
          >
            3 分钟开始特定技能签证自查 →
          </Link>

          <p className="text-center text-ash text-[11px] mt-8 leading-relaxed">
            本页面内容不构成法律意见，具体情况请咨询专家。
          </p>
    </SeoVisaArticleShell>
  )
}
