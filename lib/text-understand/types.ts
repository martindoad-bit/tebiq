export type TextUnderstandConfidence = 'high' | 'medium' | 'low'

export interface TextUnderstandResult {
  detectedTopic: string | null
  confidence: TextUnderstandConfidence
  meaning: string
  relevance: string
  generalActions: string[]
  needsExpertAdvice: boolean
  relatedTags: string[]
}
