import Anthropic from '@anthropic-ai/sdk'
import { SurveyAnswer } from '@/types/session'

const client = new Anthropic({ apiKey: process.env.ANTHROPIC_API_KEY })

export async function generateSurveyQuestion(
  visaType: string,
  answeredSoFar: SurveyAnswer[],
  nextQuestionHint: string
): Promise<string> {
  const history = answeredSoFar
    .map(a => `Q: ${a.question}\nA: ${a.answer}`)
    .join('\n\n')

  const msg = await client.messages.create({
    model: 'claude-opus-4-5',
    max_tokens: 300,
    messages: [
      {
        role: 'user',
        content: `You are a friendly Japanese visa assistant. Ask the following question in simple, warm Japanese.
Visa type: ${visaType}
Previous Q&A:
${history || '(none)'}
Next question to ask: ${nextQuestionHint}
Reply with only the question text, nothing else.`,
      },
    ],
  })

  const block = msg.content[0]
  return block.type === 'text' ? block.text : nextQuestionHint
}

export async function checkReferralCondition(
  visaType: string,
  answers: SurveyAnswer[],
  referralConditions: string[]
): Promise<{ required: boolean; reason: string }> {
  const answersText = answers.map(a => `${a.question}: ${a.answer}`).join('\n')
  const conditions = referralConditions.join('\n')

  const msg = await client.messages.create({
    model: 'claude-opus-4-5',
    max_tokens: 200,
    messages: [
      {
        role: 'user',
        content: `Based on these visa application answers, determine if professional (行政書士) help is needed.
Visa: ${visaType}
Answers:
${answersText}
Referral conditions:
${conditions}
Reply ONLY with JSON: {"required": true/false, "reason": "brief reason in Japanese or empty string"}`,
      },
    ],
  })

  try {
    const block = msg.content[0]
    const text = block.type === 'text' ? block.text : '{}'
    const clean = text.replace(/```json|```/g, '').trim()
    return JSON.parse(clean)
  } catch {
    return { required: false, reason: '' }
  }
}
