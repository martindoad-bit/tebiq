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

test('proposal does not invent a high score when rules find no red flag', () => {
  const proposal = buildAnswerQualityProposal({
    question: {
      question_text: '技人国签证可以做销售工作吗？',
      scenario: 'C_jinbun_work',
      starter_tag: 'eval-lab-v1-C06',
    },
    tebiq: {
      answer_text: '销售工作能不能放在技人国里，要看岗位实际内容，不能只看职位名称。先确认是否主要使用外语、海外客户沟通、市场分析、提案、合同协调等专业性内容；如果只是店铺接客、收银、陈列或一般现场销售，就比较难说明技人国该当性。下一步建议整理岗位说明、学历职历、雇用条件、实际业务比例、客户对象和使用语言，再向入管或行政書士确认这个岗位能否说明专业关联性；如果更新或转职期限很近，也要同时确认届出和申请时机。',
      status: 'completed',
      fallback_reason: null,
      error: null,
      prompt_version: 'consultation_alpha_v13',
    },
    deepseek: {
      answer_text: '需要根据实际工作内容判断。',
      status: null,
      fallback_reason: null,
      error: null,
    },
  })
  assert.equal(proposal.score, null)
  assert.equal(proposal.severity, null)
  assert.equal(proposal.repairOwner, 'IGNORE')
})
