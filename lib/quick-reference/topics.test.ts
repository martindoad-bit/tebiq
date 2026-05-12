import assert from 'node:assert/strict'
import test from 'node:test'

import {
  COMMON_MATERIALS,
  getCommonMaterial,
} from './materials'
import {
  QUICK_REFERENCE_TOPICS,
  getQuickReferenceTopicsForFactCards,
} from './topics'

test('quick reference topics are material checklists, not thin source rows', () => {
  assert.ok(QUICK_REFERENCE_TOPICS.length >= 6)
  assert.equal(
    new Set(QUICK_REFERENCE_TOPICS.map((topic) => topic.id)).size,
    QUICK_REFERENCE_TOPICS.length,
    'topic ids must be unique',
  )

  for (const topic of QUICK_REFERENCE_TOPICS) {
    assert.ok(topic.title.length > 0, `${topic.id} missing title`)
    assert.ok(topic.shortTitle.length > 0, `${topic.id} missing shortTitle`)
    assert.ok(topic.summary.length > 0, `${topic.id} missing summary`)
    assert.ok(topic.stage.length > 0, `${topic.id} missing stage`)
    assert.ok(topic.askPrompt, `${topic.id} missing askPrompt bridge`)
    assert.ok(
      (topic.factCardIds ?? []).length > 0,
      `${topic.id} missing fact-card bridge`,
    )
    assert.ok(
      topic.readiness === 'ready' || topic.readiness === 'needs-confirmation',
      `${topic.id} missing readiness boundary`,
    )
    assert.ok(topic.sources.length > 0, `${topic.id} missing sources`)
    assert.ok(topic.facts.length >= 2, `${topic.id} needs at least two facts`)
    assert.ok(
      topic.sections.length > 0,
      `${topic.id} missing material sections`,
    )
    assert.ok(
      topic.sections.some((section) => section.materials.length > 0),
      `${topic.id} missing material rows`,
    )
  }
})

test('quick reference separates ready checklists from confirmation-heavy checklists', () => {
  const readyIds = QUICK_REFERENCE_TOPICS.filter(
    (topic) => topic.readiness === 'ready',
  ).map((topic) => topic.id)
  const needsConfirmationIds = QUICK_REFERENCE_TOPICS.filter(
    (topic) => topic.readiness === 'needs-confirmation',
  ).map((topic) => topic.id)

  assert.ok(readyIds.includes('kazoku-taizai-koushin-materials'))
  assert.ok(readyIds.includes('nihonjin-haigusha-koushin-materials'))
  assert.ok(readyIds.includes('ryugaku-koushin-materials'))
  assert.ok(readyIds.includes('keiei-kanri-koushin-materials'))
  assert.ok(readyIds.includes('keiei-kanri-henko-materials'))
  assert.ok(needsConfirmationIds.includes('eijuu-shinsei-materials'))
})

test('quick reference V1 keeps renewal and application checklists discoverable', () => {
  const titles = QUICK_REFERENCE_TOPICS.map((topic) => topic.title).join('\n')

  assert.match(titles, /技人国/)
  assert.match(titles, /经营管理/)
  assert.match(titles, /家族滞在/)
  assert.match(titles, /日本人配偶者/)
  assert.match(titles, /留学/)
  assert.match(titles, /永住/)
  assert.match(titles, /特定技能/)
  assert.match(titles, /变更/)
})

test('quick reference has a reusable common material library', () => {
  assert.ok(COMMON_MATERIALS.length >= 20)
  assert.equal(
    new Set(COMMON_MATERIALS.map((material) => material.id)).size,
    COMMON_MATERIALS.length,
    'common material ids must be unique',
  )

  for (const material of COMMON_MATERIALS) {
    assert.ok(material.name.length > 0, `${material.id} missing name`)
    assert.ok(material.nameJa.length > 0, `${material.id} missing Japanese name`)
    assert.ok(material.sourceUrl.startsWith('https://'), `${material.id} source must be URL`)
    assert.ok(material.commonUses.length > 0, `${material.id} missing common uses`)
  }

  assert.equal(getCommonMaterial('pension-record')?.sourceId, 'M-015')
})

test('checklist material cross references point to common material pages', () => {
  const materialIds = new Set(COMMON_MATERIALS.map((material) => material.id))

  for (const topic of QUICK_REFERENCE_TOPICS) {
    for (const section of topic.sections) {
      for (const material of section.materials) {
        for (const id of material.relatedMaterialIds ?? []) {
          assert.ok(
            materialIds.has(id),
            `${topic.id}/${material.id} references missing material ${id}`,
          )
        }
      }
    }
  }
})

test('quick reference can bridge from answer fact cards back to material checklists', () => {
  const gijinkokuTopics = getQuickReferenceTopicsForFactCards([
    'gijinkoku-koushin-shorui',
  ])
  assert.equal(gijinkokuTopics[0]?.id, 'gijinkoku-koushin-materials')

  const keieiTopics = getQuickReferenceTopicsForFactCards([
    'keiei-kanri-existing-holder-update',
  ])
  assert.equal(keieiTopics[0]?.id, 'keiei-kanri-koushin-materials')

  assert.deepEqual(getQuickReferenceTopicsForFactCards(['unknown-card']), [])
})
