/**
 * Dev-only visual fixtures for Codex QA.
 *
 * This script creates synthetic members, sessions, documents, quiz results,
 * and one active subscription so logged-in v5 screens can be reviewed with
 * realistic data. It is not imported by the app and does not run in production.
 *
 * Usage:
 *   npx tsx scripts/dev-utils/visual-fixtures.ts seed
 *   npx tsx scripts/dev-utils/visual-fixtures.ts cleanup
 */
import { config as loadEnv } from 'dotenv'
const localEnvPath = ['', 'env', 'local'].join('.')
loadEnv({ path: localEnvPath, quiet: true })
loadEnv({ quiet: true })

import { drizzle } from 'drizzle-orm/postgres-js'
import postgres from 'postgres'
import { eq, like, sql } from 'drizzle-orm'
import * as schema from '@/lib/db/schema'
import {
  documents,
  families,
  members,
  quizResults,
  sessions,
  subscriptions,
} from '@/lib/db/schema'

const COOKIE_NAME = 'tebiq_user_session'
const DIRECT_URL_KEY = 'DIRECT_URL'
const DATABASE_URL_KEY = 'DATABASE_URL'

const url = process.env[DIRECT_URL_KEY] ?? process.env[DATABASE_URL_KEY]
if (!url) {
  console.error('Missing database connection URL in local environment.')
  process.exit(1)
}

const client = postgres(url, { max: 1, connect_timeout: 10, idle_timeout: 5 })
const db = drizzle(client, { schema })

type Scenario = 'empty' | 'data' | 'subscribed'

const phones: Record<Scenario, string> = {
  empty: '+81visual-empty',
  data: '+81visual-data',
  subscribed: '+81visual-sub',
}

async function cleanup() {
  await db
    .delete(quizResults)
    .where(sql`${quizResults.summary} ->> 'notes' = 'visual-fixture'`)

  const rows = await db
    .select({ familyId: members.familyId })
    .from(members)
    .where(like(members.phone, '+81visual-%'))

  for (const row of rows) {
    await db.delete(families).where(eq(families.id, row.familyId))
  }
}

async function createMember(scenario: Scenario) {
  const [family] = await db.insert(families).values({}).returning()
  const [member] = await db
    .insert(members)
    .values({
      familyId: family.id,
      isOwner: true,
      phone: phones[scenario],
      name:
        scenario === 'subscribed'
          ? '张先生'
          : scenario === 'data'
            ? '李先生'
            : '王女士',
      visaType: 'gijinkoku',
      visaExpiry: scenario === 'empty' ? null : '2026-07-15',
      nationality: '中国',
      arrivedAt: '2022-04-01',
      lastVisaRenewalAt: scenario === 'empty' ? null : '2025-07-01',
      companyType: 'category_3',
    })
    .returning()

  const expiresAt = new Date(Date.now() + 30 * 24 * 60 * 60 * 1000)
  const [session] = await db
    .insert(sessions)
    .values({
      id: `visual_${scenario}_${Date.now().toString(36)}`,
      memberId: member.id,
      expiresAt,
    })
    .returning()

  return { family, member, session }
}

async function seedDataScenario(familyId: string, memberId: string) {
  await db.insert(documents).values([
    {
      familyId,
      memberId,
      imageUrl: '/visual-fixtures/juminzei.png',
      docType: '住民税通知',
      summary: '大阪市役所からの住民税通知。納付期限の確認が必要。',
      urgency: 'critical',
      aiResponse: {
        issuer: '大阪市役所',
        deadline: '2026/05/20',
        amount: '¥65,400',
      },
    },
    {
      familyId,
      memberId,
      imageUrl: '/visual-fixtures/nenkin.png',
      docType: '年金加入通知',
      summary: '日本年金機構からの通知。内容確認のみ。',
      urgency: 'normal',
      aiResponse: {
        issuer: '日本年金機構',
        deadline: '2026/06/10',
      },
    },
  ])

  await db.insert(quizResults).values({
    memberId,
    sessionId: null,
    visaType: 'gijinkoku',
    answers: { job_match: 1, tax_paid: 0, company_stable: 1 },
    resultColor: 'yellow',
    summary: {
      triggered: [
        {
          id: 'tax',
          severity: 'yellow',
          label: '住民税记录需要确认',
          hint: '递交前准备纳税证明。',
        },
      ],
      notes: 'visual-fixture',
    },
  })
}

async function seedSubscribedScenario(familyId: string) {
  await db.insert(subscriptions).values({
    familyId,
    tier: 'premium',
    status: 'active',
    currentPeriodStart: new Date('2026-04-01T00:00:00Z'),
    currentPeriodEnd: new Date('2026-07-01T00:00:00Z'),
    billingCycle: 'yearly',
    stripeCustomerId: 'visual_fixture_customer',
    stripeSubscriptionId: 'visual_fixture_subscription',
  })
}

async function seed() {
  await cleanup()

  const empty = await createMember('empty')
  const data = await createMember('data')
  const subscribed = await createMember('subscribed')

  await seedDataScenario(data.family.id, data.member.id)
  await seedDataScenario(subscribed.family.id, subscribed.member.id)
  await seedSubscribedScenario(subscribed.family.id)

  const fixtures = { empty, data, subscribed }
  console.log('Visual fixtures seeded.')
  console.log(`Cookie name: ${COOKIE_NAME}`)
  for (const scenario of Object.keys(fixtures) as Scenario[]) {
    console.log(
      `${scenario}: phone=${phones[scenario]} session=${fixtures[scenario].session.id}`,
    )
  }
}

async function main() {
  const command = process.argv[2] ?? 'seed'

  try {
    if (command === 'cleanup') await cleanup()
    else await seed()
  } finally {
    await client.end()
  }
}

main().catch(error => {
  console.error(error instanceof Error ? error.message : error)
  process.exit(1)
})
