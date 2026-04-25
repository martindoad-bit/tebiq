import { test } from 'node:test'
import assert from 'node:assert/strict'

test('quizResults DAL exports', async () => {
  const mod = await import('./quizResults')
  assert.equal(typeof mod.createQuizResult, 'function')
  assert.equal(typeof mod.getQuizResultById, 'function')
  assert.equal(typeof mod.listQuizResultsByMemberId, 'function')
  assert.equal(typeof mod.listQuizResultsBySessionId, 'function')
  assert.equal(typeof mod.attachSessionResultsToMember, 'function')
})

test('createQuizResult input shape includes summary jsonb', () => {
  type Input = Parameters<typeof import('./quizResults').createQuizResult>[0]
  const _i: Input = {
    memberId: null,
    sessionId: 'sess_test',
    visaType: 'gijinkoku',
    answers: { '1': 0, '2': 1 },
    resultColor: 'yellow',
    summary: {
      triggered: [{ id: '4', severity: 'yellow', label: '住民税', hint: '...' }],
      notes: 'test',
    },
  }
  void _i
  assert.ok(true)
})
