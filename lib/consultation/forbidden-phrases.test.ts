import assert from 'node:assert/strict'
import test from 'node:test'

import { createForbiddenFilter, redactForbiddenPhrases } from './forbidden-phrases'

test('forbidden redactor keeps legitimate guarantee/material terms', () => {
  const result = redactForbiddenPhrases('请准备身元保证书、保証会社资料和保证人身份证明。')
  assert.equal(result.text, '请准备身元保证书、保証会社资料和保证人身份证明。')
  assert.deepEqual(result.redactions, [])
})

test('forbidden redactor removes guarantee promises about permission results', () => {
  const result = redactForbiddenPhrases('这个材料交了就保证通过，也保证获批。')
  assert.ok(!result.text.includes('保证通过'))
  assert.ok(!result.text.includes('保证获批'))
  assert.deepEqual(result.redactions, ['保证', '保证'])
})

test('forbidden stream filter catches split guarantee promise but keeps normal 保証 text', () => {
  const filter = createForbiddenFilter()
  let out = ''
  out += filter.push('先问保証会社。')
  out += filter.push('这个申请保')
  out += filter.push('证通过。')
  out += filter.flush()

  assert.match(out, /保証会社/)
  assert.doesNotMatch(out, /保证通过/)
  assert.deepEqual(filter.redactions(), ['保证'])
})
