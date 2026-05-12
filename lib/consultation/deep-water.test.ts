import assert from 'node:assert/strict'
import test from 'node:test'

import { deepWaterMatchesToPromptContext, matchDeepWaterPatterns } from './deep-water'

test('detects spouse divorce remarriage renewal-vs-review deep water', () => {
  const matches = matchDeepWaterPatterns('我是日配，离婚以后又和另一个日本人再婚，签证是更新还是变更？')

  assert.equal(matches[0]?.pattern.id, 'haigusha-divorce-remarriage-procedure-vs-review')
  const prompt = deepWaterMatchesToPromptContext(matches)
  assert.ok(prompt)
  assert.match(prompt, /手续名/)
  assert.match(prompt, /审查实质/)
  assert.match(prompt, /禁止说法/)
  assert.match(prompt, /一定是变更申请/)
})

test('detects gijinkoku job-change layer split', () => {
  const matches = matchDeepWaterPatterns('技人国换工作以后，已经做了14日届出，还需要变更吗？')

  assert.equal(matches[0]?.pattern.id, 'gijinkoku-job-change-notification-vs-status-review')
  const prompt = deepWaterMatchesToPromptContext(matches)
  assert.ok(prompt)
  assert.match(prompt, /14日所属机关届出/)
  assert.match(prompt, /是否需要就劳资格证明或变更申请/)
})

test('does not flag ordinary simple questions as deep water', () => {
  const matches = matchDeepWaterPatterns('在留卡丢了怎么办？')

  assert.deepEqual(matches, [])
  assert.equal(deepWaterMatchesToPromptContext(matches), null)
})
