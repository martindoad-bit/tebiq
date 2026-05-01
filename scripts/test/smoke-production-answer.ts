/**
 * smoke-production-answer.ts (Hotfix v3)
 *
 * 直接 POST 5 条红线问题到 production /api/questions，
 * 校验 understood_question / answer title / matched_seed_id 是否避开了已知错答。
 *
 * 原则：宁可返回 clarification (answer_type='cannot_determine')，
 *       也不能返回错配的 matched answer。
 *
 * 用法：
 *   PRODUCTION_URL=https://tebiq.jp npx tsx scripts/test/smoke-production-answer.ts
 *
 * 退出码：
 *   0 — 5 条全过
 *   1 — 任一 P0 失败
 */

const BASE = process.env.PRODUCTION_URL ?? 'https://tebiq.jp'

interface Redline {
  id: string
  query: string
  /** 答案 title 必须不包含的 token（任一命中即 P0 fail） */
  rejectTitle?: RegExp
  /** matched_seed_id 不能命中 */
  rejectSeed?: RegExp
  /** answer 文本必须包含的 term（all 必须命中；不命中即 P0 fail） */
  required?: RegExp[]
  /** 兜底：如果 answer_type=cannot_determine（澄清）则视为通过 */
  acceptClarification?: boolean
}

const REDLINES: Redline[] = [
  {
    id: 'R1-management-to-humanities',
    query: '我是经管签，想转人文签。',
    // 不能反向理解为「人文转经营管理」
    rejectTitle: /(从.*技人国|从.*人文.*转.*经营管理|人文.*转.*经管|经营管理新规|资本金不足)/,
    rejectSeed: /q017|q054|management-capital-shortage|tokutei-to-work-visa/,
    required: [/(经营管理|経営管理|经管)/, /(技人国|人文|工作签|技術人文)/],
    acceptClarification: true,
  },
  {
    id: 'R2-humanities-to-management',
    query: '我想从人文签转为经管签怎么办？',
    rejectTitle: /(从.*经营管理.*转.*人文|经营管理.*转.*技人国|换工作.*届出|14日)/,
    rejectSeed: /tokutei-to-work-visa|q017|q054/,
    required: [/(经营管理|経営管理|经管)/, /(技人国|人文|工作签|技術人文)/],
    acceptClarification: true,
  },
  {
    id: 'R3-company-dormant-pension',
    query: '公司休眠了要不要交国民年金？',
    // 免除/猶予 不能作为主答案 title
    rejectTitle: /(交不起|想申请免除|想申請免除|学生納付特例)/,
    required: [/(厚生年金|資格喪失|资格丧失)/, /(国民年金|国民健康保険|区役所|市役所|年金事务所|年金事務所)/],
    acceptClarification: true,
  },
  {
    id: 'R4-tokutei-company-change',
    query: '特定技能1号换会社需要做什么？',
    rejectTitle: /(技能実習.*特定技能.*转换|技能实习.*特定技能|良好修了|試験免除|试验免除)/,
    rejectSeed: /jissyu|technical-intern|q053/,
    required: [/特定技能/, /(雇主|雇用主|受入機関|换会社|換雇主|契約機関)/],
    acceptClarification: true,
  },
  {
    id: 'R5-family-work-permission',
    query: '家族滞在配偶可以打工吗？',
    rejectTitle: /(滞納|公的義務|年金.*健保.*介護保険|住民税|国民年金.*免除)/,
    rejectSeed: /q012|public-obligation|滞納|健保|公的義務/,
    required: [/(家族滞在|配偶|资格外活动|资格外活動)/],
    acceptClarification: true,
  },
]

interface ApiResponse {
  ok?: boolean
  answer_type?: string
  title?: string
  matched_seed_id?: string | null
  intent_summary?: string
  intent?: { current_status?: string; target_status?: string; domain?: string; intent_type?: string }
  action_answer?: {
    conclusion?: string
    what_to_do?: string[]
    how_to_do?: string[]
    documents_needed?: string[]
    consequences?: string[]
    expert_handoff?: string[]
    where_to_go?: string[]
    deadline_or_timing?: string[]
  }
  related_links?: Array<{ title: string; href: string }>
}

function answerText(res: ApiResponse): string {
  return [
    res.title ?? '',
    res.matched_seed_id ?? '',
    res.intent_summary ?? '',
    res.action_answer?.conclusion ?? '',
    ...(res.action_answer?.what_to_do ?? []),
    ...(res.action_answer?.how_to_do ?? []),
    ...(res.action_answer?.documents_needed ?? []),
    ...(res.action_answer?.consequences ?? []),
    ...(res.action_answer?.expert_handoff ?? []),
    ...(res.action_answer?.where_to_go ?? []),
    ...(res.action_answer?.deadline_or_timing ?? []),
  ].join('\n')
}

interface Outcome {
  id: string
  query: string
  http: number
  answerType: string
  title: string
  matchedSeed: string
  understood: string
  ok: boolean
  notes: string
}

async function runOne(item: Redline): Promise<Outcome> {
  const url = `${BASE}/api/questions`
  let http = 0
  let body: ApiResponse = {}
  try {
    const res = await fetch(url, {
      method: 'POST',
      headers: { 'content-type': 'application/json' },
      body: JSON.stringify({ question_text: item.query }),
    })
    http = res.status
    body = (await res.json().catch(() => ({}))) as ApiResponse
  } catch (err) {
    return {
      id: item.id,
      query: item.query,
      http,
      answerType: '',
      title: '',
      matchedSeed: '',
      understood: '',
      ok: false,
      notes: `fetch_failed: ${err instanceof Error ? err.message : String(err)}`,
    }
  }

  const text = answerText(body)
  const title = body.title ?? ''
  const seed = body.matched_seed_id ?? ''
  const problems: string[] = []

  // clarification 是兜底：直接通过
  const isClarification = body.answer_type === 'cannot_determine'
  if (isClarification && item.acceptClarification) {
    return {
      id: item.id,
      query: item.query,
      http,
      answerType: body.answer_type ?? '',
      title,
      matchedSeed: seed,
      understood: body.intent_summary ?? '',
      ok: true,
      notes: 'clarification_ok',
    }
  }

  if (item.rejectTitle && item.rejectTitle.test(title)) {
    problems.push(`reject_title:${item.rejectTitle.source}`)
  }
  if (item.rejectSeed && item.rejectSeed.test(seed)) {
    problems.push(`reject_seed:${seed}`)
  }
  if (item.required) {
    for (const req of item.required) {
      if (!req.test(text)) problems.push(`missing:${req.source}`)
    }
  }

  return {
    id: item.id,
    query: item.query,
    http,
    answerType: body.answer_type ?? '',
    title,
    matchedSeed: seed,
    understood: body.intent_summary ?? '',
    ok: problems.length === 0 && http === 200,
    notes: problems.length === 0 ? 'ok' : problems.join('; '),
  }
}

async function runSmoke(): Promise<void> {
  console.log(`[smoke-production-answer] base=${BASE}`)
  // 先 ping build-info（如果 404 说明部署还没起来或者旧版本）
  try {
    const res = await fetch(`${BASE}/api/build-info`)
    if (res.ok) {
      const info = await res.json()
      console.log(`[smoke-production-answer] build-info: ${JSON.stringify(info)}`)
    } else {
      console.log(`[smoke-production-answer] build-info HTTP ${res.status} (旧版本？)`)
    }
  } catch {
    console.log(`[smoke-production-answer] build-info fetch failed`)
  }

  const outcomes: Outcome[] = []
  for (const r of REDLINES) {
    process.stdout.write(`  ${r.id} ${r.query} … `)
    const out = await runOne(r)
    outcomes.push(out)
    console.log(out.ok ? `✓ (${out.answerType})` : `✗ ${out.notes}`)
  }

  console.log('\n=== 5 条红线汇总 ===')
  console.table(outcomes.map(o => ({
    id: o.id,
    http: o.http,
    type: o.answerType,
    title: o.title.slice(0, 40),
    seed: o.matchedSeed.slice(0, 28),
    ok: o.ok,
    notes: o.notes.slice(0, 60),
  })))

  const failed = outcomes.filter(o => !o.ok)
  console.log(`\n${outcomes.length - failed.length}/${outcomes.length} passed`)
  if (failed.length > 0) {
    console.log('FAILED:')
    for (const f of failed) console.log(`  ${f.id} — ${f.notes}`)
    process.exit(1)
  }
  process.exit(0)
}

runSmoke().catch(err => {
  console.error(err)
  process.exit(1)
})

export {}
