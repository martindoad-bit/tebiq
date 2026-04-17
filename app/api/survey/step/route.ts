import { NextRequest, NextResponse } from 'next/server'
import { getSession, saveSession } from '@/lib/session'
import { VISA_TYPES } from '@/lib/config/visa-types'
import { checkReferralCondition } from '@/lib/ai/claude'
import { SurveyAnswer } from '@/types/session'

const SURVEY_QUESTIONS: Record<string, string[]> = {
  work: [
    '現在の在留資格と在留期限を教えてください',
    '現在の雇用状況（在職中・内定・転職予定など）を教えてください',
    '過去に在留不許可や在留違反の経験はありますか？',
    '日本滞在年数と過去の更新回数を教えてください',
  ],
  spouse: [
    '配偶者の国籍と婚姻期間を教えてください',
    '現在、配偶者と同居していますか？',
    '配偶者の就労状況と収入を教えてください',
    '日本語でのコミュニケーションは問題ありませんか？',
  ],
  permanent: [
    '日本在住年数と現在の在留資格を教えてください',
    '過去3年間、税金と年金を期日通りに納付していますか？',
    '過去に在留違反や犯罪歴はありますか？',
    '現在の雇用状況と年収を教えてください',
  ],
  student: [
    '現在在籍している学校名と在籍期間を教えてください',
    '出席率は80%以上ありますか？',
    '学校を変更する予定はありますか？',
    '生活費の支弁方法を教えてください（奨学金・仕送り・アルバイトなど）',
  ],
}

export async function POST(req: NextRequest) {
  try {
    const { sessionId, answer, questionIndex } = await req.json() as {
      sessionId: string
      answer?: string
      questionIndex: number
    }

    const session = await getSession(sessionId)
    if (!session) {
      return NextResponse.json({ error: 'Session not found' }, { status: 404 })
    }

    const config = VISA_TYPES[session.visaType]
    const questions = SURVEY_QUESTIONS[session.visaType] || []

    // Save answer if provided
    if (answer !== undefined && questionIndex > 0) {
      const prevQuestion = questions[questionIndex - 1]
      const newAnswer: SurveyAnswer = {
        questionId: `q${questionIndex}`,
        question: prevQuestion || `Question ${questionIndex}`,
        answer,
      }
      session.answers = [...session.answers, newAnswer]
      session.status = 'survey_in_progress'
    }

    // Check if survey is complete
    if (questionIndex >= questions.length) {
      session.status = 'survey_completed'

      // Check referral conditions
      if (config?.referralConditions) {
        const { required, reason } = await checkReferralCondition(
          session.visaType,
          session.answers,
          config.referralConditions
        )
        session.requiresReferral = required
        if (reason) session.referralReason = reason
      }

      await saveSession(session)
      return NextResponse.json({
        done: true,
        sessionId: session.sessionId,
        requiresReferral: session.requiresReferral,
      })
    }

    const nextQuestion = questions[questionIndex]
    await saveSession(session)

    return NextResponse.json({
      done: false,
      question: nextQuestion,
      questionIndex,
      total: questions.length,
    })
  } catch (error) {
    console.error('Survey step error:', error)
    return NextResponse.json({ error: 'Survey step failed' }, { status: 500 })
  }
}
