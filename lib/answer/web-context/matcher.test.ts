import assert from 'node:assert/strict'
import test from 'node:test'

import {
  shouldUseWebContext,
  webMatchesToPromptContext,
  WEB_CONTEXT_SOURCES,
  type WebContextMatch,
} from './matcher'

test('web context matcher triggers on high-risk practice/official questions', () => {
  assert.equal(
    shouldUseWebContext('我客户是日配，离婚后和另一个日本人再婚，是更新还是变更？'),
    true,
  )
  assert.equal(
    shouldUseWebContext('经管签现在还是500万就可以吗，2025新规怎么处理？'),
    true,
  )
})

test('web context matcher stays quiet for unrelated small talk', () => {
  assert.equal(shouldUseWebContext('你好，今天东京天气怎么样'), false)
})

test('web context prompt carries source metadata without internal engineering terms', () => {
  const source = WEB_CONTEXT_SOURCES.find(item => item.id === 'isa-spouse-notification')
  assert.ok(source)

  const prompt = webMatchesToPromptContext([
    {
      source,
      fetched: false,
      snippets: ['离婚・死別した場合は、事由発生日から14日以内に届出が必要。'],
    } satisfies WebContextMatch,
  ])

  assert.ok(prompt)
  assert.match(prompt, /白名单网页/)
  assert.match(prompt, /source_type: official/)
  assert.match(prompt, /出入国在留管理庁/)
  assert.match(prompt, /14日以内/)
  assert.doesNotMatch(prompt, /Route Gate|P0\/P1|guardrail/i)
})

test('web context prompt hard-corrects spouse remarriage procedure wording', () => {
  const source = WEB_CONTEXT_SOURCES.find(item => item.id === 'practice-spouse-remarriage-ubiq')
  assert.ok(source)

  const prompt = webMatchesToPromptContext([
    {
      source,
      fetched: false,
      snippets: ['日本人と再婚した場合も、手続名称は在留期間更新許可申請に該当する。'],
    } satisfies WebContextMatch,
  ])

  assert.ok(prompt)
  assert.match(prompt, /不要回答“不是更新，是变更”/)
  assert.match(prompt, /在留期間更新許可申請/)
  assert.match(prompt, /审查实质接近新规\/变更/)
})
