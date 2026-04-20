import { NextRequest, NextResponse } from 'next/server'
import { getSession, saveSession } from '@/lib/session'
import { FORM_QUESTIONS } from '@/lib/config/visa-form-fields'
import { validateAnswer, buildFormData } from '@/lib/ai/claude'
import { SurveyAnswer, FormQuestion } from '@/types/session'

/**
 * Returns the list of active questions for the current session state.
 * Conditional questions are included only when their dependency is satisfied.
 */
function getActiveQuestions(visaType: string, answers: SurveyAnswer[]): FormQuestion[] {
  const allQuestions = FORM_QUESTIONS[visaType] || []

  // Build a map of questionId → formattedValue for conditional checks
  const answersMap: Record<string, string> = {}
  answers.forEach(a => {
    answersMap[a.questionId] = a.formattedValue || a.answer
  })

  return allQuestions.filter(q => {
    if (!q.conditional) return true

    const depValue = (answersMap[q.conditional.dependsOn] || '').toLowerCase()
    const isYes = ['はい', '有', 'yes', '是', '换过', '换了', '有換', 'true'].some(v =>
      depValue.includes(v)
    )
    return q.conditional.matchValue === 'yes' ? isYes : !isYes
  })
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

    if (!FORM_QUESTIONS[session.visaType]) {
      return NextResponse.json({ error: `Unsupported visa type: ${session.visaType}` }, { status: 400 })
    }

    // ── Save and validate the answer to the previous question ──────────────
    if (answer !== undefined && questionIndex > 0) {
      const activeQuestions = getActiveQuestions(session.visaType, session.answers)
      const prevQuestion = activeQuestions[questionIndex - 1]

      if (prevQuestion) {
        const validation = await validateAnswer(prevQuestion, answer)

        if (!validation.valid) {
          // Answer rejected — ask the same question again
          return NextResponse.json({
            done: false,
            question: validation.followUp || prevQuestion.questionZh,
            hint: prevQuestion.hint,
            questionIndex: questionIndex - 1,
            total: activeQuestions.length,
            retry: true,
          })
        }

        const newAnswer: SurveyAnswer = {
          questionId: prevQuestion.id,
          question: prevQuestion.questionZh,
          answer,
          formattedValue: validation.formattedValue || answer.trim(),
        }
        session.answers = [...session.answers, newAnswer]
        session.status = 'survey_in_progress'
      }
    }

    // ── Recalculate active questions after saving the new answer ───────────
    const activeQuestions = getActiveQuestions(session.visaType, session.answers)

    // ── Survey complete ────────────────────────────────────────────────────
    if (questionIndex >= activeQuestions.length) {
      session.formData = await buildFormData(session.answers, session.visaType)
      session.status = 'survey_completed'
      await saveSession(session)

      return NextResponse.json({
        done: true,
        sessionId: session.sessionId,
        requiresReferral: session.requiresReferral,
      })
    }

    // ── Return next question ───────────────────────────────────────────────
    const nextQuestion = activeQuestions[questionIndex]
    await saveSession(session)

    return NextResponse.json({
      done: false,
      question: nextQuestion.questionZh,
      hint: nextQuestion.hint,
      questionIndex,
      total: activeQuestions.length,
    })
  } catch (error) {
    console.error('Survey step error:', error)
    return NextResponse.json({ error: 'Survey step failed' }, { status: 500 })
  }
}
