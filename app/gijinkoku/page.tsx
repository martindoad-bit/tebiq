import type { Metadata } from 'next'
import Link from 'next/link'
import Logo from '@/app/_components/v5/Logo'

export const metadata: Metadata = {
  title: '技人国签证续签完整指南 2026 | TEBIQ',
  description:
    '在日技术・人文知识・国际业务（技人国）签证续签完整指南。涵盖 2026 年 4 月新增书类要求、派遣形态严格化、常见踩坑与准备时间。3 分钟自查续签风险。',
  alternates: { canonical: '/gijinkoku' },
  openGraph: {
    title: '技人国签证续签完整指南 2026',
    description:
      '在日技人国签证续签完整指南。2026 年新政、常见踩坑、准备建议一次看完。',
    url: 'https://tebiq.jp/gijinkoku',
    siteName: 'TEBIQ',
    locale: 'zh_CN',
    type: 'article',
  },
}

const articleSchema = {
  '@context': 'https://schema.org',
  '@type': 'Article',
  headline: '技人国签证续签完整指南 2026',
  description:
    '在日技术・人文知识・国际业务（技人国）签证续签完整指南，含 2026 年 4 月入管新规与常见踩坑。',
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
  mainEntityOfPage: 'https://tebiq.jp/gijinkoku',
}

export default function GijinkokuLandingPage() {
  return (
    <main className="min-h-screen bg-base text-body flex flex-col pb-16 md:pb-0">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }}
      />

      {/* 顶部导航 */}
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
            技人国签证续签完整指南 2026
          </h1>
          <p className="text-muted text-sm mb-8">
            最新更新：2026-04-24 · 基于出入国在留管理庁公开资料整理 [待书士审核]
          </p>

          {/* 目录 */}
          <nav
            aria-label="目录"
            className="bg-card border border-line rounded-2xl p-5 mb-8"
          >
            <h2 className="text-title font-bold text-base mb-3">本文目录</h2>
            <ol className="space-y-2 text-sm text-body list-decimal list-inside">
              <li>
                <a href="#what-is" className="text-primary hover:underline">
                  技人国签证是什么
                </a>
              </li>
              <li>
                <a href="#core-conditions" className="text-primary hover:underline">
                  续签的核心条件
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

          <Section id="what-is" title="技人国签证是什么">
            <p>
              技术・人文知识・国际业务签证（简称「技人国」）是日本最主要的就劳签证。截至 2025 年 6 月末，持有者约 45 万人，是仅次于永住者的第二大在留资格。
            </p>
            <p>
              它覆盖三大业务方向：①技术系（系统工程师、机械设计、研发等自然科学领域）；②人文知识系（法务、财务、人事、市场营销、企划等人文社会科学领域）；③国际业务系（翻译通译、海外营业、设计、语言教学等需要外国文化背景的工作）。
            </p>
            <p>
              在留期间根据公司类别和个人情况发给 5 年、3 年、1 年或 3 个月，其中以 1 年和 3 年最为常见。[待书士审核]
            </p>
          </Section>

          <Section id="core-conditions" title="续签的核心条件">
            <p>续签审查围绕以下几条主线展开，缺一项就可能转为不许可或缩短在留期间：</p>
            <ul className="space-y-2">
              <Bullet>
                <strong>工作内容连续性：</strong>实际从事的业务仍与原签证许可的内容一致。换岗、调动到与学历无关的工作是高风险点。
              </Bullet>
              <Bullet>
                <strong>雇主公司稳定性：</strong>公司经营持续、有完整决算、按时缴纳社保和源泉税。
              </Bullet>
              <Bullet>
                <strong>本人纳税义务：</strong>住民税、所得税完全无欠缴，市役所开出的纳税证明无延迟记录。
              </Bullet>
              <Bullet>
                <strong>社保加入：</strong>健康保险、厚生年金按月缴纳，不能有断档。
              </Bullet>
              <Bullet>
                <strong>报酬水平：</strong>月薪不低于从事同等业务的日本人，新规下基准更趋严格。
              </Bullet>
              <Bullet>
                <strong>身份事项申报：</strong>住所、公司变更等 14 天内申报无遗漏。[待书士审核]
              </Bullet>
            </ul>
          </Section>

          <Section id="policy-2026" title="2025-2026 最新政策变化">
            <p>
              2026 年是技人国审查重大变化的一年，至少两项新规已经生效，建议在准备材料前确认是否适用：
            </p>
            <ul className="space-y-3">
              <Bullet>
                <strong>2026 年 4 月 15 日 — 类别 3/4 公司新增书类：</strong>
                所有类别 3 或 4 公司的技人国申请，必须提交「所属机构代表者申报书」。主要从事对人业务（翻译、营业、前台等）时，需要追加 CEFR B2 相当的语言能力证明（JLPT N2 / BJT 400 点等可对应）。
              </Bullet>
              <Bullet>
                <strong>2026 年 3 月 9 日 — 派遣形态大幅严格化：</strong>
                派遣元・派遣先誓约书、劳动条件通知书、派遣管理台账等成为必须提交材料；申请时必须确定派遣先；在留期间可能按派遣合同长度决定，3 个月合同可能只给 1 年在留。入管局也可能直接向派遣先确认或实地调查。
              </Bullet>
              <Bullet>
                <strong>审查时间整体延长：</strong>2025 年起更新申请的平均处理日数已比往年延长，2026 年新规生效后部分案件再延长，请尽量提前 4-5 个月开始准备。
              </Bullet>
            </ul>
            <p className="text-muted text-xs mt-3">
              来源：出入国在留管理庁官网（令和 8 年 4 月 15 日 / 令和 8 年 2 月 24 日掲載）[待书士审核]
            </p>
          </Section>

          <Section id="pitfalls" title="常见踩坑">
            <ul className="space-y-2">
              <Bullet>
                <strong>住民税延迟缴纳：</strong>哪怕只迟交一期，纳税证明上的记录都会被审查官看到，是被缩短在留期间最常见的原因。
              </Bullet>
              <Bullet>
                <strong>换工作未申报：</strong>离职、入职新公司后 14 天内必须向入管局提交「契約機関に関する届出」，漏报会被视为不诚实。
              </Bullet>
              <Bullet>
                <strong>新岗位与学历无关：</strong>例如经济学专业转去从事单纯店员、工厂作业，会被判定为脱离技人国范围。
              </Bullet>
              <Bullet>
                <strong>用「技人国」做对人服务但语言能力无法证明：</strong>2026 年 4 月起，前台、翻译、营业等岗位需准备 N2 / BJT 等证书。
              </Bullet>
              <Bullet>
                <strong>派遣形态准备不足：</strong>没有派遣先誓约书、合同期短、台账缺漏，是 2026 年 3 月新规下被拒的高发原因。[待书士审核]
              </Bullet>
            </ul>
          </Section>

          <Section id="prepare" title="准备建议">
            <ul className="space-y-2">
              <Bullet>
                <strong>提前 4-5 个月动手：</strong>入管局允许的最早申请时点是到期前 3 个月，但公司材料、登记书类、税票本身就要 2-4 周。
              </Bullet>
              <Bullet>
                <strong>先做风险自查：</strong>把税款、社保、工作内容、申报记录四件事一次过一遍，再开始递交材料。
              </Bullet>
              <Bullet>
                <strong>留意公司类别：</strong>类别 1/2 与 3/4 的材料清单完全不同。先向公司人事确认所属类别。
              </Bullet>
              <Bullet>
                <strong>受理票务必保管：</strong>提交申请后，受理票就是你在「特例期间」合法居住和工作的唯一凭证。
              </Bullet>
              <Bullet>
                <strong>有疑问及早咨询：</strong>不许可后再补救成本更高，提前找持牌行政书士判断 1 次比事后修正更省时间。
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
            href="/check"
            className="flex items-center justify-center w-full min-h-[60px] bg-primary hover:bg-primary-hover text-title font-bold py-4 rounded-xl text-base mt-8"
          >
            3 分钟开始技人国续签自查 →
          </Link>

          <p className="text-center text-muted text-xs mt-8 leading-relaxed">
            本页面内容不构成法律意见，具体情况请咨询持牌行政书士。
          </p>
        </div>
      </article>

      {/* Footer */}
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
