import assert from 'node:assert/strict'
import test from 'node:test'
import { searchMaterials } from './search'

test('materials search: vague spouse renewal query returns procedure candidates', () => {
  const result = searchMaterials('日配更新要什么')
  assert.ok(result.candidates.length > 0)
  assert.ok(result.procedureCandidates.length > 0)
  assert.equal(result.candidates[0].type, 'procedure')
  assert.ok(
    result.candidates.some(candidate => candidate.id === 'japanese-spouse-renewal-materials'),
    `expected japanese spouse materials, got ${result.candidates.map(c => c.id).join(', ')}`,
  )
  assert.equal(result.guidance.length, 0)
})

test('materials search: vague tax proof query returns tax material candidates', () => {
  const result = searchMaterials('税证明')
  const ids = result.candidates.map(candidate => candidate.id)
  assert.ok(ids.includes('juminzei-kazei-shomei') || ids.includes('juminzei-nouzei-shomei'))
  assert.ok(ids.includes('kokuzei-nouzei-sono3') || ids.includes('juminzei-nouzei-shomei'))
  assert.ok(result.materialCandidates.some(candidate => candidate.id === 'kokuzei-nouzei-sono3'))
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
  assert.ok(result.materialCandidates.some(candidate => candidate.id === 'kenko-shindan-sho'))
})

test('materials search: complex spouse remarriage query adds ask-first guidance', () => {
  const result = searchMaterials('日配离婚再婚材料')
  assert.ok(result.guidance.some(item => item.id === 'spouse-divorce-remarriage'))
  assert.ok(result.procedureCandidates.some(candidate => candidate.id === 'japanese-spouse-renewal-materials'))
  assert.ok(result.materialCandidates.some(candidate => candidate.id === 'mimoto-hoshou-sho' || candidate.id === 'koseki-tohon-konin-shusshou'))
  assert.ok(!result.materialCandidates.some(candidate => candidate.id === 'kenko-shindan-sho'))
})

test('materials search: business-manager disposition query adds ask-first guidance', () => {
  const result = searchMaterials('经管签公司休眠后变更材料')
  assert.ok(result.guidance.some(item => item.id === 'business-manager-disposition'))
  assert.ok(result.procedureCandidates.length > 0)
})

test('materials search: empty or one-character query returns no candidates', () => {
  const empty = searchMaterials('')
  assert.deepEqual(empty.candidates, [])
  assert.deepEqual(empty.guidance, [])
  const oneChar = searchMaterials('税')
  assert.deepEqual(oneChar.candidates, [])
  assert.deepEqual(oneChar.procedureCandidates, [])
})
