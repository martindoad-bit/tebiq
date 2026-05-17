// Contract tests for MATERIAL_ENTITIES.
// Guarantees referenced fact_card ids and topic ids actually exist.
import test from 'node:test'
import assert from 'node:assert/strict'
import { readdirSync } from 'node:fs'
import { resolve } from 'node:path'
import { MATERIAL_ENTITIES, getMaterialEntity, getMaterialEntitiesForTopic } from './material-entities'
import { QUICK_REFERENCE_TOPICS } from '@/lib/quick-reference/topics'

const factCardIds = new Set(
  readdirSync(resolve(process.cwd(), 'docs/fact-cards'))
    .filter(f => f.endsWith('.md') && f.toUpperCase() !== 'README.MD' && f.toUpperCase() !== 'FACT_OPS_WINDOW_TASK_PACK.MD')
    .map(f => f.replace(/\.md$/, '')),
)

const topicIds = new Set(QUICK_REFERENCE_TOPICS.map(t => t.id))
const entityIds = new Set(MATERIAL_ENTITIES.map(e => e.id))

test('material-entities: count is 15 (WB-D target)', () => {
  assert.ok(MATERIAL_ENTITIES.length >= 15, `expected >=15 entities, got ${MATERIAL_ENTITIES.length}`)
})

test('material-entities: every id is unique kebab-case', () => {
  for (const e of MATERIAL_ENTITIES) {
    assert.match(e.id, /^[a-z0-9][a-z0-9-]*$/, `bad id: ${e.id}`)
  }
  assert.equal(entityIds.size, MATERIAL_ENTITIES.length, 'duplicate ids')
})

test('material-entities: required string fields are non-empty', () => {
  for (const e of MATERIAL_ENTITIES) {
    assert.ok(e.title.length > 0, `${e.id}: title empty`)
    assert.ok(e.whatItIs.length > 0, `${e.id}: whatItIs empty`)
    assert.ok(e.whoIssues.length > 0, `${e.id}: whoIssues empty`)
    assert.ok(e.whereToObtain.length > 0, `${e.id}: whereToObtain empty`)
    assert.ok(e.askTebiqBridge.length > 0, `${e.id}: askTebiqBridge empty`)
  }
})

test('material-entities: factCardIds reference real fact cards', () => {
  const missing: Array<[string, string]> = []
  for (const e of MATERIAL_ENTITIES) {
    for (const id of e.factCardIds ?? []) {
      if (!factCardIds.has(id)) missing.push([e.id, id])
    }
  }
  assert.deepEqual(missing, [], `MaterialEntity references missing fact cards: ${JSON.stringify(missing)}`)
})

test('material-entities: reusedIn references real topic ids', () => {
  const missing: Array<[string, string]> = []
  for (const e of MATERIAL_ENTITIES) {
    for (const tid of e.reusedIn ?? []) {
      if (!topicIds.has(tid)) missing.push([e.id, tid])
    }
  }
  assert.deepEqual(missing, [], `MaterialEntity reusedIn references missing topics: ${JSON.stringify(missing)}`)
})

test('material-entities: relatedMaterials reference other entity ids', () => {
  const missing: Array<[string, string]> = []
  for (const e of MATERIAL_ENTITIES) {
    for (const rid of e.relatedMaterials ?? []) {
      if (!entityIds.has(rid)) missing.push([e.id, rid])
    }
  }
  assert.deepEqual(missing, [], `relatedMaterials missing: ${JSON.stringify(missing)}`)
})

test('material-entities: getMaterialEntity returns the right entity', () => {
  const first = MATERIAL_ENTITIES[0]
  assert.equal(getMaterialEntity(first.id)?.id, first.id)
  assert.equal(getMaterialEntity('nonexistent-material-id'), undefined)
})

test('material-entities: getMaterialEntitiesForTopic returns entities reusing that topic', () => {
  // Pick the first entity with a non-empty reusedIn and verify reverse lookup
  const sample = MATERIAL_ENTITIES.find(e => e.reusedIn.length > 0)
  if (!sample) return
  const tid = sample.reusedIn[0]
  const found = getMaterialEntitiesForTopic(tid)
  assert.ok(found.some(e => e.id === sample.id), `${tid} should resolve to at least ${sample.id}`)
})
