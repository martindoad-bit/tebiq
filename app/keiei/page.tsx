import type { Metadata } from 'next'
import Link from 'next/link'
import Logo from '@/app/_components/v5/Logo'

export const metadata: Metadata = {
  title: '经营管理签证续签 2026 完全解析 | TEBIQ',
  description:
    '2025 年 10 月 16 日新规生效后的经营管理签证续签完整解析。资本金 3000 万、常勤员工、日语 N2、3 年经营经验、过渡期安排一次看懂。',
  alternates: { canonical: '/keiei' },
  openGraph: {
    title: '经营管理签证续签 2026 完全解析',
    description:
      '资本金 3000 万、常勤员工、N2 语言、3 年经营经验。新规下的续签全图。',
    url: 'https://tebiq.jp/keiei',
    siteName: 'TEBIQ',
    locale: 'zh_CN',
    type: 'article',
  },
}

const articleSchema = {
  '@context': 'https://schema.org',
  '@type': 'Article',
  headline: '经营管理签证续签 2026 完全解析',
  description:
    '2025 年 10 月 16 日入管新规生效后的经营管理签证续签完整解析与准备建议。',
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
  mainEntityOfPage: 'https://tebiq.jp/keiei',
}

export default function KeieiLandingPage() {
  return (
    <main className="min-h-screen bg-base text-body flex flex-col pb-16 md:pb-0">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }}
      />

      <header className="sticky top-0 z-10 bg-card/95 backdrop-blur border-b border-line">
        <div className="max-w-md md:max-w-6xl mx-auto px-4 h-14 flex items-center justify-between">
          <Link href="/" aria-label="TEBIQ 首页">
            <Logo size="sm" />
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
            经营管理签证续签 2026 完全解析
          </h1>
          <p className="text-muted text-sm mb-8">
            最新更新：2026-04-24 · 涵盖令和 7 年 10 月 16 日施行新规 [待书士审核]
          </p>

          <nav
            aria-label="目录"
            className="bg-card border border-line rounded-2xl p-5 mb-8"
          >
            <h2 className="text-title font-bold text-base mb-3">本文目录</h2>
            <ol className="space-y-2 text-sm text-body list-decimal list-inside">
              <li>
                <a href="#what-is" className="text-primary hover:underline">
                  经营管理签证是什么
                </a>
              </li>
              <li>
                <a href="#core-conditions" className="text-primary hover:underline">
                  续签的核心条件（新规）
                </a>
              </li>
              <li>
                <a href="#policy-2026" className="text-primary hover:underline">
                  2025-2026 最新政策变化
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

          <Section id="what-is" title="经营管理签证是什么">
            <p>
              经营・管理签证（旧名「投资・经营」）是面向在日本经营公司或参与公司管理的外国人发行的在留资格。包括公司董事、高级经理、合资合伙人等岗位。
            </p>
            <p>
              它和技人国最大的区别在于：技人国是「被雇佣」，经营管理是「自己经营或参与经营决策」。也因此，入管局对申请人和公司双方的实力都有要求，包括资本金、员工规模、办公室、事业可持续性等。
            </p>
            <p>
              在留期间常见为 5 年、3 年、1 年、6 个月或 4 个月，新设公司初次申请通常先给 1 年。[待书士审核]
            </p>
          </Section>

          <Section id="core-conditions" title="续签的核心条件（新规）">
            <p>2025 年 10 月 16 日起新规要求以下条件<strong>同时满足</strong>：</p>
            <ul className="space-y-2">
              <Bullet>
                <strong>资本金：</strong>3,000 万日元以上（旧标准为 500 万日元）。
              </Bullet>
              <Bullet>
                <strong>常勤员工：</strong>1 名以上，且必须是日本人、特别永住者、永住者、日本人配偶者等或定住者。技人国等就劳系外国人不计入。
              </Bullet>
              <Bullet>
                <strong>日语能力：</strong>申请人或常勤员工中至少 1 人达到 JLPT N2 / BJT 400 点以上等 CEFR B2 相当水平。
              </Bullet>
              <Bullet>
                <strong>经营经验：</strong>申请人本人需有 3 年以上经营实务经验，或硕士以上学位。
              </Bullet>
              <Bullet>
                <strong>事业计划书：</strong>需要税理士或中小企业诊断士等第三方专家确认。
              </Bullet>
              <Bullet>
                <strong>办公室：</strong>原则不可使用自宅兼办公室，需独立场所与租赁合同。[待书士审核]
              </Bullet>
            </ul>
          </Section>

          <Section id="policy-2026" title="2025-2026 最新政策变化">
            <p>
              本次改正是经营管理签证 10 余年来最大规模的一次见直し，影响极大：
            </p>
            <ul className="space-y-3">
              <Bullet>
                <strong>资本金 6 倍跃升：</strong>从 500 万日元一跃变为 3,000 万日元。许多既有 1 人公司将无法在续签时直接达标。
              </Bullet>
              <Bullet>
                <strong>常勤员工口径收紧：</strong>员工身份必须是日本人、永住者等「身份系」外国人，技人国等就劳系不算。这意味着雇用同胞（持就劳签证的中国人）无法满足这一条件。
              </Bullet>
              <Bullet>
                <strong>日语能力首次明文化：</strong>本人或员工中要有 1 人达到 N2 等级。
              </Bullet>
              <Bullet>
                <strong>过渡期至 2028 年 10 月 16 日：</strong>已持有经营管理签证者，在该日期前的更新审查中，入管局会综合评判经营状况和今后展望；但「过渡期」绝非「可以不达标」，建议尽早向新要求靠拢。
              </Bullet>
            </ul>
            <p className="text-muted text-xs mt-3">
              来源：出入国在留管理庁「在留資格経営・管理に係る上陸基準省令等の改正」（令和 7 年 10 月 16 日施行）[待书士审核]
            </p>
          </Section>

          <Section id="pitfalls" title="常见踩坑">
            <ul className="space-y-2">
              <Bullet>
                <strong>资本金「账面足够」但实际无业务：</strong>新规下入管局会更看实际经营情况和资金流，仅纸面增资难以蒙混过关。
              </Bullet>
              <Bullet>
                <strong>把技人国员工算进常勤：</strong>新口径明确不算，需确认社保加入记录和身份资格。
              </Bullet>
              <Bullet>
                <strong>沿用自宅兼办公室：</strong>新规原则不可，准备时需要独立办公室合同与照片。
              </Bullet>
              <Bullet>
                <strong>事业计划书没有专家盖章：</strong>缺少税理士或中小企业诊断士确认，会被直接退回补充。
              </Bullet>
              <Bullet>
                <strong>长期出国：</strong>有报道指出长期不在日本可能被判断为「实际不在经营」，影响续签。[待书士审核]
              </Bullet>
            </ul>
          </Section>

          <Section id="prepare" title="准备建议">
            <ul className="space-y-2">
              <Bullet>
                <strong>立即评估缺口：</strong>对照新规六条逐一盘点，列出明确差距。
              </Bullet>
              <Bullet>
                <strong>提前规划增资 / 招人：</strong>资本金调整与招聘正职员工都需要数月时间，越早越好。
              </Bullet>
              <Bullet>
                <strong>准备语言证书：</strong>本人或常勤员工至少 1 人持 N2 证书或 BJT 400 点。
              </Bullet>
              <Bullet>
                <strong>找好税理士搭档：</strong>事业计划书的第三方确认基本必备，建议长期合作。
              </Bullet>
              <Bullet>
                <strong>做一次自查再咨询：</strong>先自查锁定主要风险点，再带着具体问题约书士，效率最高。
              </Bullet>
            </ul>
            <p className="mt-4">
              延伸阅读：{' '}
              <Link href="/knowledge" className="text-primary hover:underline">
                签证基础知识
              </Link>{' '}
              ｜ 想确认其他签证类型？前往{' '}
              <Link href="/visa-select" className="text-primary hover:underline">
                签证选择页
              </Link>
              。
            </p>
          </Section>

          <Link
            href="/check/keiei/quiz"
            className="flex items-center justify-center w-full min-h-[60px] bg-primary hover:bg-primary-hover text-title font-bold py-4 rounded-xl text-base mt-8"
          >
            3 分钟开始经营管理续签自查 →
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
