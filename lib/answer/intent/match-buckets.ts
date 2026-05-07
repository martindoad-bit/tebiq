// 0.6 Sprint — matchBuckets substring matcher (ENGINE Pack 1).
//
// Pure substring scan over KEYWORD_BUCKETS. No regex, no tokenizer, no
// embedding, no LLM. Each bucket gets a score based on the fraction of
// its declared keywords that appear in the (lower-cased) question.
// Returns ALL buckets with score > 0, sorted by score descending; ties
// broken by KEYWORD_BUCKET_IDS declaration order so output is stable.
//
// The matcher only counts a keyword as "hit" once per question even
// if it appears multiple times. This avoids inflating the score on
// repeated keyword spam (e.g. "年金 年金 年金 年金" wouldn't count as
// 4 keywords matched — that's still 1 keyword from the bucket's
// keyword set).
//
// Score formula (Pack §2):
//   score = matched_count / total_keywords
//   capped at 1.0 (no overflow)
//
// Performance: 6 buckets × ~25 keywords each = ~150 indexOf calls per
// question. Sub-millisecond, no caching needed.

import {
  KEYWORD_BUCKETS,
  KEYWORD_BUCKET_IDS,
  type KeywordBucket,
  type KeywordBucketId,
} from './keyword-buckets'

export interface BucketMatch {
  bucket_id: KeywordBucketId
  matched_keywords: string[]
  score: number
}

/**
 * Match the user question against all 6 buckets.
 *
 * Returns matches with score > 0 sorted by:
 *   1. score descending (more matches → higher in list)
 *   2. KEYWORD_BUCKET_IDS declaration order (stable tie-break)
 *
 * Empty / blank input returns []. Returned `matched_keywords` are the
 * keywords from the bucket that hit, in the order they appear in the
 * bucket's `keywords` array (NOT in question order — that would
 * require a position scan and isn't worth it for our use case).
 */
export function matchBuckets(question: string | null | undefined): BucketMatch[] {
  if (!question) return []
  const haystack = question.toLowerCase()
  if (!haystack.trim()) return []

  const matches: BucketMatch[] = []

  for (const bucketId of KEYWORD_BUCKET_IDS) {
    const bucket: KeywordBucket = KEYWORD_BUCKETS[bucketId]
    const matchedKeywords: string[] = []
    // De-dup keyword hits in case the bucket lists the same string in
    // multiple alphabets (e.g. '年金' appears both in 日本語 and 简体).
    const seenKeywords = new Set<string>()

    for (const kw of bucket.keywords) {
      const kwLower = kw.toLowerCase()
      if (seenKeywords.has(kwLower)) continue
      if (haystack.includes(kwLower)) {
        matchedKeywords.push(kw)
        seenKeywords.add(kwLower)
      }
    }

    if (matchedKeywords.length === 0) continue

    // Use the de-dup'd keyword set as denominator so a bucket that
    // lists the same word twice doesn't penalize the score.
    const uniqueTotal = new Set(bucket.keywords.map(k => k.toLowerCase())).size
    const score = Math.min(1, matchedKeywords.length / Math.max(1, uniqueTotal))

    matches.push({
      bucket_id: bucketId,
      matched_keywords: matchedKeywords,
      score,
    })
  }

  // Stable sort: higher score first; ties resolved by declaration
  // order (which we preserve since we built the array in that order).
  matches.sort((a, b) => {
    if (b.score !== a.score) return b.score - a.score
    return (
      KEYWORD_BUCKET_IDS.indexOf(a.bucket_id) -
      KEYWORD_BUCKET_IDS.indexOf(b.bucket_id)
    )
  })

  return matches
}

/**
 * Pull the top-1 bucket from a `matchBuckets()` result, or null if no
 * matches. Convenience for callers that only care about the highest-
 * scoring bucket (e.g. the routing_status `specific` SSE event uses
 * the top-1 bucket's `status_label_specific` copy).
 */
export function topBucket(matches: BucketMatch[]): BucketMatch | null {
  return matches.length > 0 ? matches[0] : null
}
