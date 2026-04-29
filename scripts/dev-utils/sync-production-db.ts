import { readdir, readFile } from 'node:fs/promises'
import path from 'node:path'
import postgres from 'postgres'

interface JournalEntry {
  idx: number
  tag: string
  when: number
}

interface AppliedMigrationRow {
  id: number
  hash: string
  created_at: Date | string
}

interface ColumnCheck {
  table: string
  column: string
}

const MIGRATIONS_DIR = path.join(process.cwd(), 'lib/db/migrations')
const JOURNAL_PATH = path.join(MIGRATIONS_DIR, 'meta/_journal.json')

const CRITICAL_TABLES = [
  'articles',
  'members',
  'timeline_events',
] as const

const CRITICAL_COLUMNS: ColumnCheck[] = [
  { table: 'articles', column: 'visibility' },
  { table: 'articles', column: 'doc_type_tags' },
  { table: 'articles', column: 'scenario_tags' },
  { table: 'articles', column: 'applies_to' },
  { table: 'members', column: 'archive_retention_until' },
  { table: 'members', column: 'trial_started_at' },
  { table: 'members', column: 'trial_used' },
  { table: 'members', column: 'deletion_requested_at' },
  { table: 'members', column: 'deletion_scheduled_at' },
  { table: 'timeline_events', column: 'event_type' },
  { table: 'timeline_events', column: 'event_payload' },
  { table: 'timeline_events', column: 'source_record_id' },
]

function connectionString(): string {
  const url = process.env.DIRECT_URL ?? process.env.DATABASE_URL
  if (!url) {
    throw new Error('DIRECT_URL or DATABASE_URL is required. Values are not printed.')
  }
  return url
}

async function localMigrationFiles(): Promise<string[]> {
  const files = await readdir(MIGRATIONS_DIR)
  return files.filter(file => /^\d+_.+\.sql$/.test(file)).sort()
}

async function journalEntries(): Promise<JournalEntry[]> {
  try {
    const raw = await readFile(JOURNAL_PATH, 'utf8')
    const parsed = JSON.parse(raw) as { entries?: JournalEntry[] }
    return Array.isArray(parsed.entries) ? parsed.entries : []
  } catch {
    return []
  }
}

async function appliedMigrations(sql: postgres.Sql): Promise<AppliedMigrationRow[]> {
  const table = await sql<{ exists: boolean }[]>`
    select to_regclass('drizzle.__drizzle_migrations') is not null as exists
  `
  if (!table[0]?.exists) return []
  return await sql<AppliedMigrationRow[]>`
    select id, hash, created_at
    from drizzle.__drizzle_migrations
    order by id asc
  `
}

async function tableExists(sql: postgres.Sql, table: string): Promise<boolean> {
  const rows = await sql<{ exists: boolean }[]>`
    select exists (
      select 1
      from information_schema.tables
      where table_schema = 'public'
        and table_name = ${table}
    ) as exists
  `
  return Boolean(rows[0]?.exists)
}

async function columnExists(sql: postgres.Sql, check: ColumnCheck): Promise<boolean> {
  const rows = await sql<{ exists: boolean }[]>`
    select exists (
      select 1
      from information_schema.columns
      where table_schema = 'public'
        and table_name = ${check.table}
        and column_name = ${check.column}
    ) as exists
  `
  return Boolean(rows[0]?.exists)
}

function appliedLabel(file: string, idx: number, appliedCount: number): string {
  return idx < appliedCount ? '已应用(按顺序推断)' : '未应用'
}

async function main() {
  const files = await localMigrationFiles()
  const journal = await journalEntries()
  const client = postgres(connectionString(), { max: 1, prepare: false })

  try {
    const applied = await appliedMigrations(client)
    console.log('Production DB migration status (read-only)')
    console.log(`本地 migration 文件数: ${files.length}`)
    console.log(`production drizzle.__drizzle_migrations 记录数: ${applied.length}`)
    console.log('')
    console.log('Migrations:')
    files.forEach((file, idx) => {
      const tag = journal.find(entry => entry.idx === idx)?.tag
      const localTag = tag ? `${String(idx).padStart(4, '0')}_${tag}.sql` : file
      console.log(`- ${file}: ${appliedLabel(file, idx, applied.length)}${localTag !== file ? ` (journal: ${localTag})` : ''}`)
    })

    const missing = files.slice(applied.length)
    if (missing.length > 0) {
      console.log('')
      console.log('未应用 migrations:')
      missing.forEach(file => console.log(`- ${file}`))
      console.log('请创始人手动 review 后，再执行 db:migrate 或 db:push。脚本不会自动修改 production DB。')
    }

    console.log('')
    console.log('Critical schema checks:')
    for (const table of CRITICAL_TABLES) {
      const exists = await tableExists(client, table)
      console.log(`- table ${table}: ${exists ? '存在' : '缺失'}`)
    }
    for (const check of CRITICAL_COLUMNS) {
      const exists = await columnExists(client, check)
      console.log(`- column ${check.table}.${check.column}: ${exists ? '存在' : '缺失'}`)
    }
  } finally {
    await client.end()
  }
}

main().catch(error => {
  console.error(error instanceof Error ? error.message : error)
  process.exitCode = 1
})
