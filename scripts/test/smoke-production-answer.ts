/**
 * smoke-production-answer.ts
 *
 * Posts five redline questions to the current production consultation stream
 * and checks that the visible answer keeps the expected domain anchors. This
 * script intentionally uses `/api/consultation/stream`; the legacy
 * `/api/questions` endpoint may return 410 on current deployments.
 *
 * Usage:
 *   PRODUCTION_URL=https://tebiq.jp npx tsx scripts/test/smoke-production-answer.ts
 */
import { parseConsultationChunk, type ConsultationEvent } from '@/lib/consultation/stream-protocol'

const BASE = process.env.PRODUCTION_URL ?? 'https://tebiq.jp'

interface Redline {
  id: string
  query: string
  reject?: RegExp
  required?: RegExp[]
}

const REDLINES: Redline[] = [
  {
    id: 'R1-management-to-humanities',
    query: '我是经管签，想转人文签。',
    reject: /(从.*技人国.*转.*经营管理|人文.*转.*经管|经营管理新规|资本金不足)/,
    required: [/(经营管理|経営管理|经管)/, /(技人国|人文|工作签|技術人文)/],
  },
  {
    id: 'R2-humanities-to-management',
    query: '我想从人文签转为经管签怎么办？',
    reject: /(从.*经营管理.*转.*人文|经营管理.*转.*技人国|换工作.*届出|14日)/,
    required: [/(经营管理|経営管理|经管)/, /(技人国|人文|工作签|技術人文)/],
  },
  {
    id: 'R3-company-dormant-pension',
    query: '公司休眠了要不要交国民年金？',
    reject: /(交不起|想申请免除|想申請免除|学生納付特例)/,
    required: [/(厚生年金|資格喪失|资格丧失|退职|退職|公司休眠)/, /(国民年金|国民健康保険|区役所|市役所|年金事务所|年金事務所)/],
  },
  {
    id: 'R4-tokutei-company-change',
    query: '特定技能1号换会社需要做什么？',
    reject: /(技能実習.*特定技能.*转换|技能实习.*特定技能|良好修了|試験免除|试验免除)/,
    required: [/特定技能/, /(雇主|雇用主|受入機関|换会社|換雇主|契約機関|新公司|新会社)/],
  },
  {
    id: 'R5-family-work-permission',
    query: '家族滞在配偶可以打工吗？',
    reject: /(滞納|公的義務|年金.*健保.*介護保険|住民税|国民年金.*免除)/,
    required: [/(家族滞在|配偶|资格外活动|资格外活動|週28|28小时|28時間)/],
  },
  // ─── 5 题 fact-card / 材料引用类（RC Polish Q1 expansion） ────────
  {
    id: 'R6-eijuu-nenkin-history',
    query: '我想办永住，但之前国民年金有几个月没交，会有影响吗？',
    required: [/(永住|PR)/, /(年金|纳税|納税)/],
  },
  {
    id: 'R7-zairyu-expiry-materials',
    query: '在留卡下个月到期，但公司材料还没准备好，怎么办？',
    required: [/(到期|期限|更新|续签)/, /(材料|書類)/],
  },
  {
    id: 'R8-kokuzei-sono3',
    query: '永住申请需要的国税纳税证明その3 去哪里开？',
    required: [/(国税|税務署|税务署)/, /(その3|纳税证明|納税証明)/],
  },
  {
    id: 'R9-juminhyo-mynumber',
    query: '我搬家了，在留卡上的地址需要去区役所改吗？',
    required: [/(区役所|市役所|14日|14天|住民票)/, /(地址|住所|住居)/],
  },
  {
    id: 'R10-rishoku-kenpo',
    query: '我从公司辞职了，健康保险怎么办？',
    required: [/(健康保険|国民健康保险|健保|任意継続)/, /(辞职|退职|退職|区役所)/],
  },
  // ─── 5 题 deep-water / handoff 类 ────────
  {
    id: 'R11-hsp1-institution-change',
    query: '高度人才 1 号换公司，点数够，14 天内届出可以先去新公司上班吗？',
    reject: /(可以.*先去.*上班|可以.*先入社|14日.*届出.*就可以)/,
    required: [/(高度|HSP|许可|許可)/, /(行政書士|行政书士|入管|在留資格変更|所属機関変更許可|專業|专业|专门)/],
  },
  {
    id: 'R12-keiei-dormant-to-employment',
    query: '经管公司半年没收入了，我想转去朋友公司上班，可以先入职再办变更吗？',
    reject: /(可以.*先入职.*再办变更|可以.*先上班|14日.*届出.*就可以)/,
    required: [/(经营管理|経営管理|经管|变更|変更)/, /(行政書士|專業|专业|专门|入管)/],
  },
  {
    id: 'R13-spouse-divorce-remarriage',
    query: '我日本人配偶签离婚后又准备再婚，是不是再婚后就不用管之前离婚的届出了？',
    reject: /(离婚.*届出.*不用管|不用管.*离婚.*届出|再婚后.*离婚.*届出.*(不用|不要)|再婚.*自动.*(覆盖|代替).*离婚.*届出)/,
    required: [/(届出|14日|14天)/, /(配偶|离婚|離婚)/],
  },
  {
    id: 'R14-nonpermission-strategy',
    query: '上次永住申请不许可了，可以出国再回来重新申请吗？',
    reject: /(出国再回来.*重新申请.*就可以|出国.*绕过)/,
    required: [/(不许可|不許可|理由|原因)/, /(行政書士|專業|专业|弁護士|律师|专门)/],
  },
  {
    id: 'R15-dv-address-safety',
    query: '我配偶有家暴行为，我想离开但担心地址被知道，签证会怎样？',
    reject: /(可以.*先回去.*拿材料|让配偶提供|配偶.*配合.*材料)/,
    required: [/(DV|家暴|配偶者暴力|安全|支援)/],
  },
  // ─── 5 题 negative control 验证负控不误触发 ────────
  {
    id: 'N16-short-stay-meeting',
    query: '我短期来日本只是参加客户会议，不拿日本这边工资，这种需要工作签吗？',
    reject: /(必须办工作签|一定需要工作签|不可以|illegal|不法)/,
    required: [/(短期|商务|会议|商談)/],
  },
  {
    id: 'N17-business-manager-logo',
    query: '经管公司只是换了 logo 和官网颜色，这种也要通知入管吗？',
    reject: /(只是|仅|單純|单纯).{0,24}(logo|ロゴ|官网|配色).{0,48}(必须|一定|14日内.*(通知入管|届出|報告)|illegal|不法)/,
  },
  {
    id: 'N18-resident-tax-installment',
    query: '住民税今年想分期缴，我不是问永住，只是想知道会不会变成未纳。',
    reject: /(永住.*(有|产生|造成).{0,12}(影响|风险)|会影响.*永住|永住.*风险|PR.*风险)/,
    required: [/(住民税|分期|分割|納付)/],
  },
  {
    id: 'N19-spouse-short-argument',
    query: '和配偶吵架，我回朋友家住几天冷静一下，没有离婚也没有更新问题，这会影响签证吗？',
    reject: /(必须.*离婚届出|14日.*必须报|建议立即.*离婚|建议立即.*律师)/,
  },
  {
    id: 'N20-pr-marketing-card',
    query: '公司说要做 PR 活动，设计宣传卡片，这个和永住的 PR 没关系吧？',
    reject: /(跟永住有关|不是设计.*是永住|这是.*永住.*PR|需要.*永住.*手续)/,
    required: [/(PR|宣传|永住)/],
  },
]

interface Outcome {
  id: string
  query: string
  http: number
  status: string
  answerChars: number
  ok: boolean
  notes: string
}

async function runOne(item: Redline): Promise<Outcome> {
  const result = await callConsultationStream(item.query)
  const problems: string[] = []

  if (result.http !== 200) problems.push(`http_${result.http}`)
  if (result.status !== 'completed') problems.push(`status_${result.status}`)
  if (result.answerText.trim().length < 120) problems.push(`answer_too_short_${result.answerText.trim().length}`)
  if (item.reject?.test(result.answerText)) problems.push(`reject:${item.reject.source}`)
  for (const req of item.required ?? []) {
    if (!req.test(result.answerText)) problems.push(`missing:${req.source}`)
  }

  return {
    id: item.id,
    query: item.query,
    http: result.http,
    status: result.status,
    answerChars: result.answerText.length,
    ok: problems.length === 0,
    notes: problems.length === 0 ? 'ok' : problems.join('; '),
  }
}

async function callConsultationStream(question: string): Promise<{
  http: number
  status: string
  answerText: string
}> {
  const res = await fetch(`${BASE}/api/consultation/stream`, {
    method: 'POST',
    headers: { 'content-type': 'application/json' },
    body: JSON.stringify({ question }),
  })
  if (!res.body) {
    const text = await res.text().catch(() => '')
    return { http: res.status, status: `no_body:${text.slice(0, 80)}`, answerText: '' }
  }

  const reader = res.body.getReader()
  const decoder = new TextDecoder()
  let buffer = ''
  let answerText = ''
  let terminal: ConsultationEvent['event'] | null = null

  while (true) {
    const { value, done } = await reader.read()
    if (done) break
    buffer += decoder.decode(value, { stream: true })
    const parsed = parseConsultationChunk(buffer)
    buffer = parsed.remainder
    for (const event of parsed.events) {
      if (event.event === 'answer_chunk') answerText += event.chunk
      if (event.event === 'completed' || event.event === 'timeout' || event.event === 'failed') {
        terminal = event.event
      }
    }
  }
  buffer += decoder.decode()
  const parsed = parseConsultationChunk(buffer)
  for (const event of parsed.events) {
    if (event.event === 'answer_chunk') answerText += event.chunk
    if (event.event === 'completed' || event.event === 'timeout' || event.event === 'failed') {
      terminal = event.event
    }
  }

  return {
    http: res.status,
    status: terminal ?? (res.ok ? 'missing_terminal_event' : 'http_error'),
    answerText,
  }
}

async function runSmoke(): Promise<void> {
  console.log(`[smoke-production-answer] base=${BASE}`)
  try {
    const res = await fetch(`${BASE}/api/build-info`)
    if (res.ok) {
      const info = await res.json()
      console.log(`[smoke-production-answer] build-info: ${JSON.stringify(info)}`)
    } else {
      console.log(`[smoke-production-answer] build-info HTTP ${res.status}`)
    }
  } catch {
    console.log('[smoke-production-answer] build-info fetch failed')
  }

  const outcomes: Outcome[] = []
  for (const redline of REDLINES) {
    process.stdout.write(`  ${redline.id} ${redline.query} ... `)
    const out = await runOne(redline)
    outcomes.push(out)
    console.log(out.ok ? `PASS (${out.answerChars} chars)` : `FAIL ${out.notes}`)
  }

  console.log('\n=== 5 条红线汇总 ===')
  console.table(outcomes.map(out => ({
    id: out.id,
    http: out.http,
    status: out.status,
    chars: out.answerChars,
    ok: out.ok,
    notes: out.notes.slice(0, 90),
  })))

  const failed = outcomes.filter(out => !out.ok)
  console.log(`\n${outcomes.length - failed.length}/${outcomes.length} passed`)
  if (failed.length > 0) {
    console.log('FAILED:')
    for (const item of failed) console.log(`  ${item.id} - ${item.notes}`)
    process.exit(1)
  }
}

runSmoke().catch(err => {
  console.error(err instanceof Error ? err.message : String(err))
  process.exit(1)
})
