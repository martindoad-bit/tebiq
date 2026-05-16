import assert from 'node:assert/strict'
import test from 'node:test'

import {
  QUICK_REFERENCE_TOPICS,
  getQuickReferenceTopic,
  getQuickReferenceTopicHref,
  getRelatedQuickReferenceTopics,
  getQuickReferenceTopicsForFactCards,
} from './topics'

test('quick reference topics are user-readable cards, not thin source rows', () => {
  assert.ok(QUICK_REFERENCE_TOPICS.length >= 10)

  for (const topic of QUICK_REFERENCE_TOPICS) {
    assert.ok(topic.title.length > 0, `${topic.id} missing title`)
    assert.ok(topic.summary.length > 0, `${topic.id} missing summary`)
    assert.ok(topic.deadline, `${topic.id} missing deadline`)
    assert.ok(topic.whereToGo, `${topic.id} missing whereToGo`)
    assert.ok((topic.prepare ?? []).length > 0, `${topic.id} missing prepare list`)
    assert.ok(topic.askPrompt, `${topic.id} missing askPrompt bridge`)
    assert.ok((topic.factCardIds ?? []).length > 0, `${topic.id} missing fact-card bridge`)
    assert.ok(topic.sources.length > 0, `${topic.id} missing sources`)
    assert.ok(topic.facts.length >= 2, `${topic.id} needs at least two facts`)
  }
})

test('quick reference keeps high-frequency small-known-user topics discoverable', () => {
  const titles = QUICK_REFERENCE_TOPICS.map(topic => topic.title).join('\n')

  assert.match(titles, /换工作/)
  assert.match(titles, /搬家/)
  assert.match(titles, /年金/)
  assert.match(titles, /健康保险/)
  assert.match(titles, /永住/)
})

test('quick reference can bridge from answer fact cards back to checklist topics', () => {
  const jobTopics = getQuickReferenceTopicsForFactCards(['tensyoku-zairyu'])
  assert.equal(jobTopics[0]?.id, 'job-change')

  const addressTopics = getQuickReferenceTopicsForFactCards(['zairyu-address-change'])
  assert.equal(addressTopics[0]?.id, 'address-change')

  assert.deepEqual(getQuickReferenceTopicsForFactCards(['unknown-card']), [])
})

test('quick reference topics expose stable single-page links and related topics', () => {
  const jobChange = getQuickReferenceTopic('job-change')
  assert.ok(jobChange)
  assert.equal(getQuickReferenceTopicHref(jobChange.id), '/quick-reference/job-change')

  const related = getRelatedQuickReferenceTopics(jobChange).map(topic => topic.id)
  assert.ok(related.includes('retirement-risk'))
  assert.ok(related.includes('health-insurance-after-leaving-job'))
})
