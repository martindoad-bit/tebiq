import assert from 'node:assert/strict'
import test from 'node:test'

import { buildAnswerQualityProposal } from './answer-quality-proposal'

const baseQuestion = {
  question_text: '日本人配偶签离婚后还能留在日本吗？',
  scenario: 'D_family_haigusha',
  starter_tag: 'eval-lab-v1-D05',
}

test('proposal routes missing TEBIQ answer to generation', () => {
  const proposal = buildAnswerQualityProposal({
    question: baseQuestion,
    deepseek: {
      answer_text: '需要看离婚后的身份、生活基础和申请方向。',
      status: null,
      fallback_reason: null,
      error: null,
    },
  })
  assert.equal(proposal.score, null)
  assert.equal(proposal.severity, 'P1')
  assert.equal(proposal.launchable, 'no')
  assert.equal(proposal.repairOwner, 'GENERATION')
  assert.equal(proposal.red, true)
})

test('proposal treats regression-set out_of_scope as P0 ENGINE', () => {
  const proposal = buildAnswerQualityProposal({
    question: baseQuestion,
    tebiq: {
      answer_text: '这个问题不属于 TEBIQ 的范围。',
      status: 'out_of_scope',
      fallback_reason: null,
      error: null,
    },
    deepseek: {
      answer_text: '离婚后要尽快确认在留资格变更或定住者可能性。',
      status: null,
      fallback_reason: null,
      error: null,
    },
  })
  assert.equal(proposal.score, 1)
  assert.equal(proposal.severity, 'P0')
  assert.equal(proposal.launchable, 'no')
  assert.equal(proposal.repairOwner, 'ENGINE')
  assert.equal(proposal.flags.some(flag => flag.includes('out_of_scope')), true)
})

test('proposal escalates dangerous legal certainty to DOMAIN', () => {
  const proposal = buildAnswerQualityProposal({
    question: baseQuestion,
    tebiq: {
      answer_text: '你这种情况一定可以继续留在日本，不会有问题。下一步准备材料即可。',
      status: 'direct_answer',
      fallback_reason: null,
      error: null,
    },
    deepseek: {
      answer_text: '需要看婚姻期间、子女、生活基础和申请材料。',
      status: null,
      fallback_reason: null,
      error: null,
    },
  })
  assert.equal(proposal.score, 1)
  assert.equal(proposal.severity, 'P0')
  assert.equal(proposal.launchable, 'no')
  assert.equal(proposal.repairOwner, 'DOMAIN')
})

test('proposal does not treat safety disclaimer as dangerous certainty', () => {
  const proposal = buildAnswerQualityProposal({
    question: baseQuestion,
    tebiq: {
      answer_text: 'TEBIQ 提供的是一般手续整理和准备方向，不判断你的申请一定会通过或不通过。下一步先确认期限和身份变更方向。',
      status: 'direct_answer',
      fallback_reason: null,
      error: null,
    },
    deepseek: {
      answer_text: '需要看婚姻期间、子女、生活基础和申请材料。',
      status: null,
      fallback_reason: null,
      error: null,
    },
  })
  assert.equal(proposal.flags.some(flag => flag.includes('危险断言')), false)
})
