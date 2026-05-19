import assert from 'node:assert/strict'
import { describe, it } from 'node:test'
import { parseRuntimeBlock, runtimeBlockToPromptBlock } from './runtime-block'

describe('practical runtime block parsing', () => {
  it('parses frontmatter runtime_block objects', () => {
    const parsed = parseRuntimeBlock({
      runtime_block: {
        user_situation: '日配离婚后再婚',
        short_answer: '手续形式通常是更新。',
        conditions: ['新配偶仍是日本人'],
        source_urls: ['https://example.test/source'],
      },
    }, '')

    assert.equal(parsed.source, 'frontmatter')
    assert.equal(parsed.block?.short_answer, '手续形式通常是更新。')
    assert.deepEqual(parsed.block?.conditions, ['新配偶仍是日本人'])
    assert.deepEqual(parsed.block?.source_urls, ['https://example.test/source'])
  })

  it('parses fenced yaml runtime_block bodies', () => {
    const body = [
      '## Runtime',
      '```yaml',
      'runtime_block:',
      '  user_situation: "用户问更新还是变更"',
      '  short_answer: "形式更新，实质重新审查。"',
      '  practical_rule:',
      '    - "this parser intentionally ignores nested scalar mistakes"',
      '  risk:',
      '    - "不要说变更就是唯一答案"',
      '  material_bridge:',
      '    - "日配更新材料"',
      '```',
    ].join('\n')
    const parsed = parseRuntimeBlock({}, body)

    assert.equal(parsed.source, 'body_yaml')
    assert.equal(parsed.block?.user_situation, '用户问更新还是变更')
    assert.equal(parsed.block?.short_answer, '形式更新，实质重新审查。')
    assert.deepEqual(parsed.block?.risk, ['不要说变更就是唯一答案'])
    assert.deepEqual(parsed.block?.material_bridge, ['日配更新材料'])
  })

  it('formats compact prompt blocks without product shell', () => {
    const block = parseRuntimeBlock({
      runtime_block: {
        short_answer: '形式更新，实质重新审查。',
        practical_rule: '不要按普通更新准备。',
        should_not_say: ['直接说变更'],
      },
    }, '').block!
    const prompt = runtimeBlockToPromptBlock({
      cardId: 'practical-004',
      title: '日配离婚再婚',
      riskLevel: 'P1',
      block,
    })

    assert.match(prompt, /一句话结论：形式更新/)
    assert.match(prompt, /不要说：直接说变更/)
    assert.doesNotMatch(prompt, /先看这里/)
  })
})

