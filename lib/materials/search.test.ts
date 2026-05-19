import assert from 'node:assert/strict'
import test from 'node:test'
import { searchMaterials } from './search'

test('materials search: vague spouse renewal query returns procedure candidates', () => {
  const result = searchMaterials('日配更新要什么')
  assert.ok(result.candidates.length > 0)
  assert.equal(result.candidates[0].type, 'procedure')
  assert.ok(
    result.candidates.some(candidate => candidate.id === 'japanese-spouse-renewal-materials'),
    `expected japanese spouse materials, got ${result.candidates.map(c => c.id).join(', ')}`,
  )
})

test('materials search: vague tax proof query returns tax material candidates', () => {
  const result = searchMaterials('税证明')
  const ids = result.candidates.map(candidate => candidate.id)
  assert.ok(ids.includes('juminzei-kazei-shomei') || ids.includes('juminzei-nouzei-shomei'))
  assert.ok(ids.includes('kokuzei-nouzei-sono3') || ids.includes('juminzei-nouzei-shomei'))
})

test('materials search: permanent residence pension query connects procedure and pension material', () => {
  const result = searchMaterials('永住年金材料')
  const ids = result.candidates.map(candidate => candidate.id)
  assert.ok(ids.includes('permanent-residence-application-materials'))
  assert.ok(ids.includes('nenkin-kiroku'))
})

test('materials search: health check query does not get swallowed by health insurance', () => {
  const result = searchMaterials('公司让我交健康诊断')
  assert.equal(result.candidates[0]?.id, 'kenko-shindan-sho')
})

test('materials search: empty or one-character query returns no candidates', () => {
  assert.deepEqual(searchMaterials('').candidates, [])
  assert.deepEqual(searchMaterials('税').candidates, [])
})
