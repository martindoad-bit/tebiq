/**
 * TEBIQ Postgres schema (Drizzle ORM, Supabase target).
 *
 * Conventions:
 * - Primary keys are cuid2 strings (24 chars), generated app-side.
 * - All timestamps are timestamptz with default now().
 * - Enums are defined as Postgres ENUM types so DB enforces them.
 * - Subscription is per-family. Block 1 keeps families:members = 1:1
 *   so UI can ignore "family" until we ship multi-member.
 *
 * To regenerate migrations after editing this file:
 *   npm run db:generate
 */
import { createId } from '@paralleldrive/cuid2'
import { sql } from 'drizzle-orm'
import {
  boolean,
  check,
  date,
  index,
  integer,
  jsonb,
  numeric,
  pgEnum,
  pgTable,
  text,
  timestamp,
  uniqueIndex,
  varchar,
} from 'drizzle-orm/pg-core'

// --- Enums (Postgres-level for DB enforcement) ---

export const visaTypeEnum = pgEnum('visa_type', [
  'gijinkoku',
  'keiei',
  'haigusha',
  'eijusha',
  'tokutei',
  'teijusha',
  'ryugaku',
  'other',
])

export const subscriptionTierEnum = pgEnum('subscription_tier', ['basic', 'premium'])

export const subscriptionStatusEnum = pgEnum('subscription_status', [
  'trialing',
  'active',
  'past_due',
  'canceled',
  'expired',
])

export const billingCycleEnum = pgEnum('billing_cycle', ['monthly', 'yearly'])

export const purchaseProductEnum = pgEnum('purchase_product', [
  'material_package',
  'photo_credit_pack',
  'expert_consultation',
])

export const purchaseStatusEnum = pgEnum('purchase_status', [
  'pending',
  'paid',
  'failed',
  'refunded',
])

export const resultColorEnum = pgEnum('result_color', ['red', 'yellow', 'green'])

export const urgencyEnum = pgEnum('urgency', [
  'critical',
  'important',
  'normal',
  'ignorable',
])

export const notifChannelEnum = pgEnum('notif_channel', [
  'email',
  'sms',
  'app_push',
  'line',
])

export const notifStatusEnum = pgEnum('notif_status', [
  'queued',
  'sent',
  'delivered',
  'failed',
  'opened',
])

export const invitationStatusEnum = pgEnum('invitation_status', [
  'pending',
  'accepted',
  'expired',
])

export const consultationStatusEnum = pgEnum('consultation_status', [
  'new',
  'contacted',
  'closed',
])

export const articleStatusEnum = pgEnum('article_status', [
  'draft',
  'reviewing',
  'published',
])

export const articleVisibilityEnum = pgEnum('article_visibility', ['public', 'private'])

export const timelineEventTypeEnum = pgEnum('timeline_event_type', [
  'photo_recognition',
  'self_check',
  'text_understand',
  'policy_match',
  'manual_note',
])

export const checkDimensionStatusEnum = pgEnum('check_dimension_status', [
  'unchecked',
  'checked',
  'needs_action',
  'recent',
  'expired',
])

export const checkDimensionEventTypeEnum = pgEnum('check_dimension_event_type', [
  'created',
  'updated',
  'quiz_completed',
  'marked_checked',
  'marked_needs_action',
  'expired',
])

export const decisionCardTypeEnum = pgEnum('decision_card_type', [
  'decision_card',
  'workflow',
  'risk_chain',
  'misconception',
])

export const decisionAnswerLevelEnum = pgEnum('decision_answer_level', [
  'L1',
  'L2',
  'L3',
  'L4',
])

export const decisionStatusEnum = pgEnum('decision_status', [
  'draft',
  'needs_review',
  'approved',
  'rejected',
  'deprecated',
])

export const sourceGradeEnum = pgEnum('source_grade', ['S', 'A', 'B', 'C'])

export const decisionReviewerRoleEnum = pgEnum('decision_reviewer_role', [
  'staff',
  'shoshi',
  'founder',
  'other',
])

export const decisionPublishDecisionEnum = pgEnum('decision_publish_decision', [
  'approve',
  'revise',
  'reject',
  'escalate',
])

export const queryMatchStatusEnum = pgEnum('query_match_status', [
  'matched',
  'no_match',
  'low_confidence',
  'manual_import',
])

export const answerFeedbackTypeEnum = pgEnum('answer_feedback_type', [
  'helpful',
  'inaccurate',
  'unclear',
  'my_case_differs',
])

// Member profile enums (added Block 2)
export const maritalStatusEnum = pgEnum('marital_status', [
  'single',
  'married',
  'divorced',
  'widowed',
])

export const companyTypeEnum = pgEnum('company_type', [
  'category_1',
  'category_2',
  'category_3',
  'category_4',
  'not_applicable',
])

// --- Helper: shared id + timestamps ---
const idCol = () => varchar('id', { length: 24 }).primaryKey().$defaultFn(() => createId())
const createdAt = () => timestamp('created_at', { withTimezone: true }).notNull().defaultNow()
const updatedAt = () =>
  timestamp('updated_at', { withTimezone: true })
    .notNull()
    .defaultNow()
    .$onUpdate(() => new Date())

// --- families ---
export const families = pgTable('families', {
  id: idCol(),
  createdAt: createdAt(),
  updatedAt: updatedAt(),
})

// --- members ---
//
// Profile fields (Block 2 additions): nationality / arrived_at /
// marital_status / has_children / current_job_industry /
// last_visa_renewal_at / company_type / recent_changes
// All optional except has_children (defaults false). UI shows them as
// optional sections under /my/profile.
export const members = pgTable(
  'members',
  {
    id: idCol(),
    familyId: varchar('family_id', { length: 24 })
      .notNull()
      .references(() => families.id, { onDelete: 'cascade' }),
    isOwner: boolean('is_owner').notNull().default(false),
    name: varchar('name', { length: 80 }),
    phone: varchar('phone', { length: 20 }),
    email: varchar('email', { length: 255 }),
    emailVerifiedAt: timestamp('email_verified_at', { withTimezone: true }),
    visaType: visaTypeEnum('visa_type'),
    visaExpiry: date('visa_expiry'),

    // Block 2 profile fields
    nationality: varchar('nationality', { length: 64 }),
    arrivedAt: date('arrived_at'),
    maritalStatus: maritalStatusEnum('marital_status'),
    hasChildren: boolean('has_children').notNull().default(false),
    currentJobIndustry: varchar('current_job_industry', { length: 128 }),
    lastVisaRenewalAt: date('last_visa_renewal_at'),
    companyType: companyTypeEnum('company_type'),
    recentChanges: jsonb('recent_changes').$type<Record<string, unknown>>(),
    archiveRetentionUntil: date('archive_retention_until').default(
      sql`(CURRENT_DATE + INTERVAL '30 days')`,
    ),
    trialStartedAt: timestamp('trial_started_at', { withTimezone: true }),
    trialUsed: boolean('trial_used').notNull().default(false),
    deletionRequestedAt: timestamp('deletion_requested_at', { withTimezone: true }),
    deletionScheduledAt: timestamp('deletion_scheduled_at', { withTimezone: true }),

    createdAt: createdAt(),
    updatedAt: updatedAt(),
  },
  t => ({
    phoneIdx: uniqueIndex('members_phone_unique').on(t.phone),
    emailIdx: uniqueIndex('members_email_unique').on(t.email),
    familyIdx: index('members_family_id_idx').on(t.familyId),
    expiryIdx: index('members_visa_expiry_idx').on(t.visaExpiry),
    contactRequired: check(
      'phone_or_email_required',
      sql`${t.phone} is not null or ${t.email} is not null`,
    ),
  }),
)

// --- subscriptions ---
export const subscriptions = pgTable(
  'subscriptions',
  {
    id: idCol(),
    familyId: varchar('family_id', { length: 24 })
      .notNull()
      .references(() => families.id, { onDelete: 'cascade' }),
    tier: subscriptionTierEnum('tier').notNull().default('basic'),
    status: subscriptionStatusEnum('status').notNull().default('trialing'),
    currentPeriodStart: timestamp('current_period_start', { withTimezone: true }).notNull(),
    currentPeriodEnd: timestamp('current_period_end', { withTimezone: true }).notNull(),
    billingCycle: billingCycleEnum('billing_cycle').notNull(),
    stripeCustomerId: varchar('stripe_customer_id', { length: 80 }),
    stripeSubscriptionId: varchar('stripe_subscription_id', { length: 80 }),
    canceledAt: timestamp('canceled_at', { withTimezone: true }),
    createdAt: createdAt(),
    updatedAt: updatedAt(),
  },
  t => ({
    familyUnique: uniqueIndex('subscriptions_family_id_unique').on(t.familyId),
    stripeSubIdx: index('subscriptions_stripe_sub_idx').on(t.stripeSubscriptionId),
  }),
)

// --- purchases (one-time) ---
export const purchases = pgTable(
  'purchases',
  {
    id: idCol(),
    familyId: varchar('family_id', { length: 24 })
      .notNull()
      .references(() => families.id, { onDelete: 'cascade' }),
    product: purchaseProductEnum('product').notNull(),
    amountJpy: integer('amount_jpy').notNull(),
    status: purchaseStatusEnum('status').notNull().default('pending'),
    stripePaymentIntentId: varchar('stripe_payment_intent_id', { length: 80 }),
    metadata: jsonb('metadata').$type<Record<string, unknown>>(),
    createdAt: createdAt(),
    paidAt: timestamp('paid_at', { withTimezone: true }),
  },
  t => ({
    familyIdx: index('purchases_family_id_idx').on(t.familyId),
    stripePiIdx: index('purchases_stripe_pi_idx').on(t.stripePaymentIntentId),
  }),
)

// --- quiz_results ---
export interface QuizSummary {
  triggered: { id: string; severity: 'red' | 'yellow'; label: string; hint: string }[]
  materials?: string[]
  notes?: string
}

export const quizResults = pgTable(
  'quiz_results',
  {
    id: idCol(),
    memberId: varchar('member_id', { length: 24 }).references(() => members.id, {
      onDelete: 'set null',
    }),
    sessionId: varchar('session_id', { length: 64 }),
    visaType: visaTypeEnum('visa_type').notNull(),
    answers: jsonb('answers').notNull().$type<Record<string, number>>(),
    resultColor: resultColorEnum('result_color').notNull(),
    summary: jsonb('summary').notNull().$type<QuizSummary>(),
    createdAt: createdAt(),
  },
  t => ({
    memberIdx: index('quiz_results_member_id_idx').on(t.memberId),
    sessionIdx: index('quiz_results_session_id_idx').on(t.sessionId),
    createdIdx: index('quiz_results_created_at_idx').on(t.createdAt),
  }),
)

// --- check_runs / check_dimension_results / check_dimension_events ---
//
// C-lean-B self-check model: the checklist is the primary surface, while the
// full quiz writes back into dimension-level status rows.
export const checkRuns = pgTable(
  'check_runs',
  {
    id: idCol(),
    memberId: varchar('member_id', { length: 24 }).references(() => members.id, {
      onDelete: 'set null',
    }),
    sessionId: varchar('session_id', { length: 64 }),
    visaType: varchar('visa_type', { length: 80 }).notNull(),
    runType: varchar('run_type', { length: 32 }).notNull().default('dimension_check'),
    status: varchar('status', { length: 32 }).notNull().default('started'),
    sourceQuizResultId: varchar('source_quiz_result_id', { length: 24 }).references(
      () => quizResults.id,
      { onDelete: 'set null' },
    ),
    startedAt: timestamp('started_at', { withTimezone: true }).notNull().defaultNow(),
    completedAt: timestamp('completed_at', { withTimezone: true }),
    createdAt: createdAt(),
    updatedAt: updatedAt(),
  },
  t => ({
    memberIdx: index('check_runs_member_id_idx').on(t.memberId),
    sessionIdx: index('check_runs_session_id_idx').on(t.sessionId),
    visaIdx: index('check_runs_visa_type_idx').on(t.visaType),
    sourceQuizIdx: index('check_runs_source_quiz_result_id_idx').on(t.sourceQuizResultId),
    ownerRequired: check(
      'check_runs_member_or_session_required',
      sql`${t.memberId} IS NOT NULL OR ${t.sessionId} IS NOT NULL`,
    ),
  }),
)

export const checkDimensionResults = pgTable(
  'check_dimension_results',
  {
    id: idCol(),
    checkRunId: varchar('check_run_id', { length: 24 }).references(() => checkRuns.id, {
      onDelete: 'cascade',
    }),
    memberId: varchar('member_id', { length: 24 }).references(() => members.id, {
      onDelete: 'set null',
    }),
    sessionId: varchar('session_id', { length: 64 }),
    visaType: varchar('visa_type', { length: 80 }).notNull(),
    dimensionKey: varchar('dimension_key', { length: 80 }).notNull(),
    title: varchar('title', { length: 120 }).notNull(),
    status: checkDimensionStatusEnum('status').notNull().default('unchecked'),
    riskFlag: varchar('risk_flag', { length: 32 }),
    reason: text('reason'),
    actionLabel: varchar('action_label', { length: 80 }),
    sourceRecordId: varchar('source_record_id', { length: 24 }),
    sourceRecordType: varchar('source_record_type', { length: 32 }),
    lastCheckedAt: timestamp('last_checked_at', { withTimezone: true }),
    expiresAt: timestamp('expires_at', { withTimezone: true }),
    createdAt: createdAt(),
    updatedAt: updatedAt(),
  },
  t => ({
    runIdx: index('check_dimension_results_run_idx').on(t.checkRunId),
    memberIdx: index('check_dimension_results_member_id_idx').on(t.memberId),
    sessionIdx: index('check_dimension_results_session_id_idx').on(t.sessionId),
    visaIdx: index('check_dimension_results_visa_type_idx').on(t.visaType),
    statusIdx: index('check_dimension_results_status_idx').on(t.status),
    uniqueOwnerDimension: uniqueIndex('check_dimension_results_owner_dimension_unique').on(
      t.memberId,
      t.sessionId,
      t.visaType,
      t.dimensionKey,
    ),
    ownerRequired: check(
      'check_dimension_results_member_or_session_required',
      sql`${t.memberId} IS NOT NULL OR ${t.sessionId} IS NOT NULL`,
    ),
  }),
)

export const checkDimensionEvents = pgTable(
  'check_dimension_events',
  {
    id: idCol(),
    checkDimensionResultId: varchar('check_dimension_result_id', { length: 24 }).references(
      () => checkDimensionResults.id,
      { onDelete: 'cascade' },
    ),
    memberId: varchar('member_id', { length: 24 }).references(() => members.id, {
      onDelete: 'set null',
    }),
    sessionId: varchar('session_id', { length: 64 }),
    eventType: checkDimensionEventTypeEnum('event_type').notNull(),
    eventPayload: jsonb('event_payload').notNull().$type<Record<string, unknown>>(),
    createdAt: createdAt(),
  },
  t => ({
    resultIdx: index('check_dimension_events_result_idx').on(t.checkDimensionResultId),
    memberIdx: index('check_dimension_events_member_id_idx').on(t.memberId),
    sessionIdx: index('check_dimension_events_session_id_idx').on(t.sessionId),
    eventTypeIdx: index('check_dimension_events_event_type_idx').on(t.eventType),
  }),
)

// --- documents (拍照即懂; Block 1 只建表) ---
export const documents = pgTable(
  'documents',
  {
    id: idCol(),
    familyId: varchar('family_id', { length: 24 })
      .references(() => families.id, { onDelete: 'cascade' }),
    memberId: varchar('member_id', { length: 24 }).references(() => members.id, {
      onDelete: 'set null',
    }),
    sessionId: varchar('session_id', { length: 64 }),
    imageUrl: text('image_url').notNull(),
    docType: varchar('doc_type', { length: 80 }),
    summary: text('summary'),
    urgency: urgencyEnum('urgency'),
    aiResponse: jsonb('ai_response').$type<Record<string, unknown>>(),
    createdAt: createdAt(),
  },
  t => ({
    familyIdx: index('documents_family_id_idx').on(t.familyId),
    sessionIdx: index('documents_session_id_idx').on(t.sessionId),
    createdIdx: index('documents_created_at_idx').on(t.createdAt),
    ownerRequired: check(
      'documents_family_or_session_required',
      sql`${t.familyId} is not null or ${t.sessionId} is not null`,
    ),
  }),
)

// --- timeline_events ---
//
// 档案中心化索引表。documents / quiz_results / text_understand_requests
// 仍是原始记录；timeline_events 是跨工具统一时间线。
export const timelineEvents = pgTable(
  'timeline_events',
  {
    id: idCol(),
    memberId: varchar('member_id', { length: 24 }).references(() => members.id, {
      onDelete: 'set null',
    }),
    sessionId: varchar('session_id', { length: 64 }),
    eventType: timelineEventTypeEnum('event_type').notNull(),
    eventPayload: jsonb('event_payload').notNull().$type<Record<string, unknown>>(),
    docType: varchar('doc_type', { length: 120 }),
    issuer: varchar('issuer', { length: 160 }),
    amount: numeric('amount', { precision: 12, scale: 2 }),
    deadline: date('deadline'),
    isEnvelope: boolean('is_envelope'),
    recognitionConfidence: varchar('recognition_confidence', { length: 32 }),
    visaRelevance: jsonb('visa_relevance').$type<Record<string, unknown>>(),
    tags: text('tags').array().notNull().default(sql`'{}'::text[]`),
    archived: boolean('archived').notNull().default(false),
    userNote: text('user_note'),
    sourceRecordId: varchar('source_record_id', { length: 24 }),
    sourceRecordType: varchar('source_record_type', { length: 32 }),
    createdAt: createdAt(),
    updatedAt: updatedAt(),
  },
  t => ({
    memberIdx: index('timeline_events_member_id_idx').on(t.memberId),
    sessionIdx: index('timeline_events_session_id_idx').on(t.sessionId),
    typeIdx: index('timeline_events_event_type_idx').on(t.eventType),
    docTypeIdx: index('timeline_events_doc_type_idx').on(t.docType),
    issuerIdx: index('timeline_events_issuer_idx').on(t.issuer),
    deadlineIdx: index('timeline_events_deadline_idx').on(t.deadline),
    createdIdx: index('timeline_events_created_at_idx').on(t.createdAt),
    archivedIdx: index('timeline_events_archived_idx').on(t.archived),
    sourceIdx: index('timeline_events_source_idx').on(t.sourceRecordType, t.sourceRecordId),
    ownerRequired: check(
      'timeline_events_member_or_session_required',
      sql`${t.memberId} IS NOT NULL OR ${t.sessionId} IS NOT NULL`,
    ),
  }),
)

// --- notifications ---
export const notifications = pgTable(
  'notifications',
  {
    id: idCol(),
    familyId: varchar('family_id', { length: 24 })
      .notNull()
      .references(() => families.id, { onDelete: 'cascade' }),
    memberId: varchar('member_id', { length: 24 }).references(() => members.id, {
      onDelete: 'set null',
    }),
    channel: notifChannelEnum('channel').notNull(),
    type: varchar('type', { length: 64 }).notNull(),
    payload: jsonb('payload').notNull().$type<Record<string, unknown>>(),
    status: notifStatusEnum('status').notNull().default('queued'),
    sentAt: timestamp('sent_at', { withTimezone: true }),
    createdAt: createdAt(),
  },
  t => ({
    familyIdx: index('notifications_family_id_idx').on(t.familyId),
    statusIdx: index('notifications_status_idx').on(t.status),
  }),
)

// --- invitations ---
export const invitations = pgTable(
  'invitations',
  {
    id: idCol(),
    inviterMemberId: varchar('inviter_member_id', { length: 24 })
      .notNull()
      .references(() => members.id, { onDelete: 'cascade' }),
    inviteeMemberId: varchar('invitee_member_id', { length: 24 }).references(() => members.id, {
      onDelete: 'set null',
    }),
    code: varchar('code', { length: 16 }).notNull(),
    status: invitationStatusEnum('status').notNull().default('pending'),
    rewardGranted: boolean('reward_granted').notNull().default(false),
    createdAt: createdAt(),
    acceptedAt: timestamp('accepted_at', { withTimezone: true }),
  },
  t => ({
    codeUnique: uniqueIndex('invitations_code_unique').on(t.code),
    inviteeUnique: uniqueIndex('invitations_invitee_member_unique').on(t.inviteeMemberId),
    inviterIdx: index('invitations_inviter_idx').on(t.inviterMemberId),
  }),
)

// --- consultations ---
export const consultations = pgTable(
  'consultations',
  {
    id: idCol(),
    familyId: varchar('family_id', { length: 24 }).references(() => families.id, {
      onDelete: 'set null',
    }),
    name: varchar('name', { length: 80 }),
    phone: varchar('phone', { length: 20 }),
    email: varchar('email', { length: 120 }),
    lineId: varchar('line_id', { length: 80 }),
    content: text('content'),
    status: consultationStatusEnum('status').notNull().default('new'),
    createdAt: createdAt(),
  },
  t => ({
    statusIdx: index('consultations_status_idx').on(t.status),
    createdIdx: index('consultations_created_at_idx').on(t.createdAt),
  }),
)

// --- events (Block 6: minimal product analytics) ---
//
// Self-hosted, low-cardinality event log. PostHog / Vercel Analytics 都
// 不引入 — 这张表负责支撑 admin KPI 看板和漏斗分析就够了。
// 高 cardinality 的属性放 payload jsonb，不要新增列。
export const events = pgTable(
  'events',
  {
    id: idCol(),
    eventName: varchar('event_name', { length: 64 }).notNull(),
    familyId: varchar('family_id', { length: 24 }),
    memberId: varchar('member_id', { length: 24 }),
    sessionId: varchar('session_id', { length: 64 }),
    payload: jsonb('payload').$type<Record<string, unknown>>(),
    createdAt: createdAt(),
  },
  t => ({
    nameCreatedIdx: index('events_name_created_idx').on(t.eventName, t.createdAt),
    familyIdx: index('events_family_idx').on(t.familyId),
    createdIdx: index('events_created_at_idx').on(t.createdAt),
  }),
)

// --- error_logs (Block 6: server-side error capture) ---
// 替换之前 KV 的 admin:error_log；让 /admin 可以做趋势 + 阈值告警。
export const errorLogs = pgTable(
  'error_logs',
  {
    id: idCol(),
    code: varchar('code', { length: 64 }).notNull().default('unknown'),
    message: text('message').notNull(),
    stack: text('stack'),
    path: varchar('path', { length: 200 }),
    digest: varchar('digest', { length: 40 }),
    /** 'warn' | 'error' | 'critical' — 高于阈值时 admin 看板高亮 */
    severity: varchar('severity', { length: 16 }).notNull().default('error'),
    payload: jsonb('payload').$type<Record<string, unknown>>(),
    createdAt: createdAt(),
  },
  t => ({
    createdIdx: index('error_logs_created_at_idx').on(t.createdAt),
    severityIdx: index('error_logs_severity_idx').on(t.severity),
  }),
)

// --- articles (knowledge content CMS) ---
//
// `history` jsonb (Block 7 T12)：保存最近 10 个版本快照，admin 编辑器
// 可以「历史版本」+「一键恢复」。结构：
//   [{ savedAt: ISO, title, bodyMarkdown, category, status }, ...]
// 最新版本在数组末尾。超过 10 条由 DAL 截断。
export interface ArticleHistoryEntry {
  savedAt: string
  title: string
  bodyMarkdown: string
  category: string
  status: 'draft' | 'reviewing' | 'published'
}

export const articles = pgTable(
  'articles',
  {
    id: idCol(),
    title: varchar('title', { length: 160 }).notNull(),
    slug: varchar('slug', { length: 200 }),
    bodyMarkdown: text('body_markdown').notNull(),
    category: varchar('category', { length: 64 }).notNull(),
    status: articleStatusEnum('status').notNull().default('draft'),
    visibility: articleVisibilityEnum('visibility').notNull().default('private'),
    requiresShoshiReview: boolean('requires_shoshi_review').notNull().default(true),
    lastReviewedAt: timestamp('last_reviewed_at', { withTimezone: true }),
    lastReviewedBy: varchar('last_reviewed_by', { length: 100 }),
    // 行政書士法第 2 条要求审核人公开实名 + 登録番号。
    // last_reviewed_by 留作内部短标识，公开侧用 _name + _registration 显示。
    lastReviewedByName: varchar('last_reviewed_by_name', { length: 100 }),
    lastReviewedByRegistration: varchar('last_reviewed_by_registration', { length: 50 }),
    sourcesCount: integer('sources_count'),
    lastVerifiedAt: timestamp('last_verified_at', { withTimezone: true }),
    reviewNotes: text('review_notes'),
    docTypeTags: jsonb('doc_type_tags').$type<string[]>(),
    scenarioTags: jsonb('scenario_tags').$type<string[]>(),
    appliesTo: jsonb('applies_to').$type<string[]>(),
    urgencyLevel: varchar('urgency_level', { length: 24 }),
    estimatedReadTime: integer('estimated_read_time'),
    visaType: varchar('visa_type', { length: 64 }),
    dimensionKey: varchar('dimension_key', { length: 80 }),
    dimensionVersion: integer('dimension_version'),
    priority: varchar('priority', { length: 24 }),
    expiryDays: integer('expiry_days'),
    questions: jsonb('questions').$type<Array<Record<string, unknown>>>(),
    resultLogic: jsonb('result_logic').$type<Record<string, unknown>>(),
    resultActions: jsonb('result_actions').$type<Record<string, unknown>>(),
    history: jsonb('history').$type<ArticleHistoryEntry[]>(),
    createdAt: createdAt(),
    updatedAt: updatedAt(),
  },
  t => ({
    slugUnique: uniqueIndex('articles_slug_unique').on(t.slug),
    statusIdx: index('articles_status_idx').on(t.status),
    visibilityIdx: index('articles_visibility_idx').on(t.visibility),
    categoryIdx: index('articles_category_idx').on(t.category),
    updatedIdx: index('articles_updated_at_idx').on(t.updatedAt),
    urgencyLevelIdx: index('articles_urgency_level_idx').on(t.urgencyLevel),
    visaDimensionIdx: index('articles_visa_dimension_idx').on(t.visaType, t.dimensionKey),
  }),
)

// --- decision intelligence v0 ---
//
// Lightweight, auditable decision-card layer. Public routes can render repo
// seed cards without DB; these tables are for durable query/feedback/review
// collection once migrations are applied.
export const decisionCards = pgTable(
  'decision_cards',
  {
    id: idCol(),
    slug: varchar('slug', { length: 200 }).notNull(),
    title: varchar('title', { length: 180 }).notNull(),
    cardType: decisionCardTypeEnum('card_type').notNull(),
    answerLevel: decisionAnswerLevelEnum('answer_level').notNull(),
    status: decisionStatusEnum('status').notNull().default('needs_review'),
    visaTypes: jsonb('visa_types').$type<string[]>().notNull().default(sql`'[]'::jsonb`),
    trigger: jsonb('trigger').$type<Record<string, unknown>>(),
    userState: jsonb('user_state').$type<Record<string, unknown>>(),
    decisionOptions: jsonb('decision_options').$type<Array<Record<string, unknown>>>(),
    recommendedAction: text('recommended_action'),
    whyNotOtherOptions: jsonb('why_not_other_options').$type<Array<Record<string, unknown>>>(),
    steps: jsonb('steps').$type<Array<Record<string, unknown>>>(),
    relatedDocuments: jsonb('related_documents').$type<Array<Record<string, unknown>>>(),
    relatedCheckDimensions: jsonb('related_check_dimensions').$type<Array<Record<string, unknown>>>(),
    sourceRefs: jsonb('source_refs').$type<Array<Record<string, unknown>>>(),
    sourceGrade: sourceGradeEnum('source_grade').notNull().default('B'),
    lastVerifiedAt: date('last_verified_at'),
    requiresReviewAfterDays: integer('requires_review_after_days').notNull().default(90),
    requiresReview: boolean('requires_review').notNull().default(true),
    expertHandoff: jsonb('expert_handoff').$type<Record<string, unknown>>(),
    bodyMarkdown: text('body_markdown').notNull().default(''),
    createdAt: createdAt(),
    updatedAt: updatedAt(),
  },
  t => ({
    slugUnique: uniqueIndex('decision_cards_slug_unique').on(t.slug),
    statusIdx: index('decision_cards_status_idx').on(t.status),
    typeIdx: index('decision_cards_type_idx').on(t.cardType),
    answerLevelIdx: index('decision_cards_answer_level_idx').on(t.answerLevel),
    sourceGradeIdx: index('decision_cards_source_grade_idx').on(t.sourceGrade),
    requiresReviewIdx: index('decision_cards_requires_review_idx').on(t.requiresReview),
    updatedIdx: index('decision_cards_updated_at_idx').on(t.updatedAt),
  }),
)

export const decisionReviews = pgTable(
  'decision_reviews',
  {
    id: idCol(),
    decisionCardId: varchar('decision_card_id', { length: 24 }).references(() => decisionCards.id, {
      onDelete: 'cascade',
    }),
    reviewerName: varchar('reviewer_name', { length: 120 }).notNull(),
    reviewerRole: decisionReviewerRoleEnum('reviewer_role').notNull().default('staff'),
    conclusionOk: boolean('conclusion_ok'),
    publishDecision: decisionPublishDecisionEnum('publish_decision').notNull(),
    accuracyScore: integer('accuracy_score').notNull(),
    sourceScore: integer('source_score').notNull(),
    boundaryScore: integer('boundary_score').notNull(),
    actionabilityScore: integer('actionability_score').notNull(),
    flags: jsonb('flags').$type<string[]>().notNull().default(sql`'[]'::jsonb`),
    note: text('note'),
    reviewedAt: timestamp('reviewed_at', { withTimezone: true }).notNull().defaultNow(),
  },
  t => ({
    cardIdx: index('decision_reviews_card_idx').on(t.decisionCardId),
    reviewedIdx: index('decision_reviews_reviewed_at_idx').on(t.reviewedAt),
    publishIdx: index('decision_reviews_publish_decision_idx').on(t.publishDecision),
  }),
)

export const queryBacklog = pgTable(
  'query_backlog',
  {
    id: idCol(),
    rawQuery: text('raw_query').notNull(),
    normalizedQuery: text('normalized_query'),
    visaType: varchar('visa_type', { length: 80 }),
    contactEmail: varchar('contact_email', { length: 255 }),
    matchedCardId: varchar('matched_card_id', { length: 24 }).references(() => decisionCards.id, {
      onDelete: 'set null',
    }),
    matchStatus: queryMatchStatusEnum('match_status').notNull(),
    status: varchar('status', { length: 32 }).notNull().default('new'),
    priority: varchar('priority', { length: 16 }).notNull().default('normal'),
    note: text('note'),
    userContext: jsonb('user_context').$type<Record<string, unknown>>(),
    sourcePage: varchar('source_page', { length: 200 }),
    createdAt: createdAt(),
    updatedAt: updatedAt(),
  },
  t => ({
    matchIdx: index('query_backlog_match_status_idx').on(t.matchStatus),
    statusIdx: index('query_backlog_status_idx').on(t.status),
    priorityIdx: index('query_backlog_priority_idx').on(t.priority),
    visaTypeIdx: index('query_backlog_visa_type_idx').on(t.visaType),
    createdIdx: index('query_backlog_created_at_idx').on(t.createdAt),
    matchedCardIdx: index('query_backlog_matched_card_idx').on(t.matchedCardId),
  }),
)

export const answerDrafts = pgTable(
  'answer_drafts',
  {
    id: idCol(),
    queryId: varchar('query_id', { length: 24 }).references(() => queryBacklog.id, {
      onDelete: 'set null',
    }),
    matchedCardId: varchar('matched_card_id', { length: 24 }).references(() => decisionCards.id, {
      onDelete: 'set null',
    }),
    questionText: text('question_text').notNull(),
    answerType: varchar('answer_type', { length: 32 }).notNull(),
    answerLevel: decisionAnswerLevelEnum('answer_level').notNull().default('L2'),
    reviewStatus: varchar('review_status', { length: 32 }).notNull().default('unreviewed'),
    title: varchar('title', { length: 220 }).notNull(),
    summary: text('summary').notNull(),
    sectionsJson: jsonb('sections_json').$type<Array<{ heading: string; body: string }>>().notNull().default(sql`'[]'::jsonb`),
    nextStepsJson: jsonb('next_steps_json').$type<string[]>().notNull().default(sql`'[]'::jsonb`),
    relatedLinksJson: jsonb('related_links_json').$type<Array<{ title: string; href: string }>>().notNull().default(sql`'[]'::jsonb`),
    sourcesJson: jsonb('sources_json').$type<Array<{ title: string; url?: string; source_grade?: string }>>().notNull().default(sql`'[]'::jsonb`),
    modelUsed: varchar('model_used', { length: 120 }),
    reviewNote: text('review_note'),
    createdAt: createdAt(),
    updatedAt: updatedAt(),
  },
  t => ({
    queryIdx: index('answer_drafts_query_idx').on(t.queryId),
    typeIdx: index('answer_drafts_type_idx').on(t.answerType),
    reviewStatusIdx: index('answer_drafts_review_status_idx').on(t.reviewStatus),
    createdIdx: index('answer_drafts_created_at_idx').on(t.createdAt),
    matchedCardIdx: index('answer_drafts_matched_card_idx').on(t.matchedCardId),
  }),
)

export const answerFeedback = pgTable(
  'answer_feedback',
  {
    id: idCol(),
    cardId: varchar('card_id', { length: 24 }).references(() => decisionCards.id, {
      onDelete: 'set null',
    }),
    answerDraftId: varchar('answer_draft_id', { length: 24 }).references(() => answerDrafts.id, {
      onDelete: 'set null',
    }),
    pagePath: varchar('page_path', { length: 240 }).notNull(),
    feedbackType: answerFeedbackTypeEnum('feedback_type').notNull(),
    note: text('note'),
    createdAt: createdAt(),
  },
  t => ({
    cardIdx: index('answer_feedback_card_idx').on(t.cardId),
    answerDraftIdx: index('answer_feedback_answer_draft_idx').on(t.answerDraftId),
    typeIdx: index('answer_feedback_type_idx').on(t.feedbackType),
    createdIdx: index('answer_feedback_created_at_idx').on(t.createdAt),
  }),
)

// --- text_understand_requests ---
export const textUnderstandRequests = pgTable(
  'text_understand_requests',
  {
    id: idCol(),
    familyId: varchar('family_id', { length: 24 })
      .references(() => families.id, { onDelete: 'cascade' }),
    memberId: varchar('member_id', { length: 24 }).references(() => members.id, {
      onDelete: 'set null',
    }),
    sessionId: varchar('session_id', { length: 64 }),
    inputHash: varchar('input_hash', { length: 64 }).notNull(),
    summary: text('summary'),
    aiResponse: jsonb('ai_response').$type<Record<string, unknown>>(),
    createdAt: createdAt(),
  },
  t => ({
    familyIdx: index('text_understand_family_id_idx').on(t.familyId),
    sessionIdx: index('text_understand_session_id_idx').on(t.sessionId),
    createdIdx: index('text_understand_created_at_idx').on(t.createdAt),
    ownerRequired: check(
      'text_understand_family_or_session_required',
      sql`${t.familyId} IS NOT NULL OR ${t.sessionId} IS NOT NULL`,
    ),
  }),
)

// --- sessions (取代 KV session) ---
export const sessions = pgTable(
  'sessions',
  {
    id: varchar('id', { length: 64 }).primaryKey(), // sid
    memberId: varchar('member_id', { length: 24 })
      .notNull()
      .references(() => members.id, { onDelete: 'cascade' }),
    expiresAt: timestamp('expires_at', { withTimezone: true }).notNull(),
    createdAt: createdAt(),
  },
  t => ({
    memberIdx: index('sessions_member_id_idx').on(t.memberId),
    expiresIdx: index('sessions_expires_at_idx').on(t.expiresAt),
  }),
)

// --- otp_codes (取代 KV otp) ---
export const otpCodes = pgTable(
  'otp_codes',
  {
    id: idCol(),
    phone: varchar('phone', { length: 20 }).notNull(),
    code: varchar('code', { length: 6 }).notNull(),
    expiresAt: timestamp('expires_at', { withTimezone: true }).notNull(),
    consumedAt: timestamp('consumed_at', { withTimezone: true }),
    createdAt: createdAt(),
  },
  t => ({
    phoneExpiryIdx: index('otp_codes_phone_expires_idx').on(t.phone, t.expiresAt),
  }),
)

// --- email_verification_tokens (Block 7: 双重邮箱验证) ---
//
// 用于在 members.email_verified_at 之前确认邮箱真实可达。
// token 是单次使用：consumedAt 写入后不可重复使用。
// expiresAt 默认 24h（API 创建时设置）。
export const emailVerificationTokens = pgTable(
  'email_verification_tokens',
  {
    id: idCol(),
    memberId: varchar('member_id', { length: 24 })
      .notNull()
      .references(() => members.id, { onDelete: 'cascade' }),
    token: varchar('token', { length: 64 }).notNull(),
    email: varchar('email', { length: 255 }).notNull(),
    expiresAt: timestamp('expires_at', { withTimezone: true }).notNull(),
    consumedAt: timestamp('consumed_at', { withTimezone: true }),
    createdAt: createdAt(),
  },
  t => ({
    tokenUnique: uniqueIndex('email_verification_tokens_token_unique').on(t.token),
    memberIdx: index('email_verification_tokens_member_idx').on(t.memberId),
    expiresIdx: index('email_verification_tokens_expires_idx').on(t.expiresAt),
  }),
)

// --- login_magic_link_tokens ---
//
// Email-first auth: short-lived, single-use login links. The member may not
// exist yet when the link is sent, so the token stores email directly.
export const loginMagicLinkTokens = pgTable(
  'login_magic_link_tokens',
  {
    id: idCol(),
    email: varchar('email', { length: 255 }).notNull(),
    token: varchar('token', { length: 64 }).notNull(),
    nextPath: varchar('next_path', { length: 240 }),
    inviteCode: varchar('invite_code', { length: 16 }),
    expiresAt: timestamp('expires_at', { withTimezone: true }).notNull(),
    consumedAt: timestamp('consumed_at', { withTimezone: true }),
    createdAt: createdAt(),
  },
  t => ({
    tokenUnique: uniqueIndex('login_magic_link_tokens_token_unique').on(t.token),
    emailExpiryIdx: index('login_magic_link_tokens_email_expires_idx').on(t.email, t.expiresAt),
  }),
)

// --- dev_login_links ---
//
// Local/dev email-login fallback. Stores generated magic links so the founder
// can click them from /admin/dev-login without configuring Resend.
export const devLoginLinks = pgTable(
  'dev_login_links',
  {
    id: idCol(),
    token: varchar('token', { length: 64 }).notNull(),
    email: varchar('email', { length: 255 }).notNull(),
    link: text('link').notNull(),
    consumedAt: timestamp('consumed_at', { withTimezone: true }),
    createdAt: createdAt(),
  },
  t => ({
    tokenUnique: uniqueIndex('dev_login_links_token_unique').on(t.token),
    emailCreatedIdx: index('dev_login_links_email_created_idx').on(t.email, t.createdAt),
    consumedIdx: index('dev_login_links_consumed_idx').on(t.consumedAt),
  }),
)

// --- 类型导出（DAL/前端用） ---
export type Family = typeof families.$inferSelect
export type NewFamily = typeof families.$inferInsert
export type Member = typeof members.$inferSelect
export type NewMember = typeof members.$inferInsert
export type TimelineEvent = typeof timelineEvents.$inferSelect
export type NewTimelineEvent = typeof timelineEvents.$inferInsert
export type Subscription = typeof subscriptions.$inferSelect
export type NewSubscription = typeof subscriptions.$inferInsert
export type Purchase = typeof purchases.$inferSelect
export type NewPurchase = typeof purchases.$inferInsert
export type QuizResult = typeof quizResults.$inferSelect
export type NewQuizResult = typeof quizResults.$inferInsert
export type CheckRun = typeof checkRuns.$inferSelect
export type NewCheckRun = typeof checkRuns.$inferInsert
export type CheckDimensionResult = typeof checkDimensionResults.$inferSelect
export type NewCheckDimensionResult = typeof checkDimensionResults.$inferInsert
export type CheckDimensionEvent = typeof checkDimensionEvents.$inferSelect
export type NewCheckDimensionEvent = typeof checkDimensionEvents.$inferInsert
export type Document = typeof documents.$inferSelect
export type NewDocument = typeof documents.$inferInsert
export type TextUnderstandRequest = typeof textUnderstandRequests.$inferSelect
export type NewTextUnderstandRequest = typeof textUnderstandRequests.$inferInsert
export type Notification = typeof notifications.$inferSelect
export type NewNotification = typeof notifications.$inferInsert
export type Invitation = typeof invitations.$inferSelect
export type NewInvitation = typeof invitations.$inferInsert
export type Consultation = typeof consultations.$inferSelect
export type NewConsultation = typeof consultations.$inferInsert
export type EventRow = typeof events.$inferSelect
export type NewEventRow = typeof events.$inferInsert
export type ErrorLog = typeof errorLogs.$inferSelect
export type NewErrorLog = typeof errorLogs.$inferInsert
export type Article = typeof articles.$inferSelect
export type NewArticle = typeof articles.$inferInsert
export type DecisionCard = typeof decisionCards.$inferSelect
export type NewDecisionCard = typeof decisionCards.$inferInsert
export type DecisionReview = typeof decisionReviews.$inferSelect
export type NewDecisionReview = typeof decisionReviews.$inferInsert
export type QueryBacklog = typeof queryBacklog.$inferSelect
export type NewQueryBacklog = typeof queryBacklog.$inferInsert
export type AnswerFeedback = typeof answerFeedback.$inferSelect
export type NewAnswerFeedback = typeof answerFeedback.$inferInsert
export type AnswerDraft = typeof answerDrafts.$inferSelect
export type NewAnswerDraft = typeof answerDrafts.$inferInsert
export type Session = typeof sessions.$inferSelect
export type NewSession = typeof sessions.$inferInsert
export type OtpCode = typeof otpCodes.$inferSelect
export type NewOtpCode = typeof otpCodes.$inferInsert
export type EmailVerificationToken = typeof emailVerificationTokens.$inferSelect
export type NewEmailVerificationToken = typeof emailVerificationTokens.$inferInsert
export type LoginMagicLinkToken = typeof loginMagicLinkTokens.$inferSelect
export type NewLoginMagicLinkToken = typeof loginMagicLinkTokens.$inferInsert
export type DevLoginLink = typeof devLoginLinks.$inferSelect
export type NewDevLoginLink = typeof devLoginLinks.$inferInsert

// =====================================================================
// Eval Lab V1 — internal annotation tool persistence.
// Internal-only: all access is gated by EVAL_LAB_ENABLED at the route
// layer; these tables never serve user-facing flows. Forward-compat is
// the priority — every row carries `schema_version` and a JSONB column
// for fields we'll need later.
// =====================================================================

export const evalAnswerTypeEnum = pgEnum('eval_answer_type', [
  'deepseek_raw',
  'tebiq_current',
])

export const evalSeverityEnum = pgEnum('eval_severity', ['OK', 'P2', 'P1', 'P0'])

export const evalActionEnum = pgEnum('eval_action', [
  'golden_case',
  'prompt_rule',
  'fact_card_candidate',
  'handoff_rule',
  'ignore',
])

// --- eval_questions ---
export const evalQuestions = pgTable(
  'eval_questions',
  {
    id: idCol(),
    questionText: text('question_text').notNull(),
    scenario: varchar('scenario', { length: 80 }), // e.g. 'A_visa_transfer', 'B_keiei', etc.
    source: varchar('source', { length: 32 }).notNull().default('starter'), // starter | imported | manual
    starterTag: varchar('starter_tag', { length: 80 }), // e.g. 'eval-lab-v1-Q01'
    active: boolean('active').notNull().default(true),
    schemaVersion: varchar('schema_version', { length: 24 }).notNull().default('eval-lab-v1'),
    metadataJson: jsonb('metadata_json').$type<Record<string, unknown>>().notNull().default(sql`'{}'::jsonb`),
    createdAt: createdAt(),
    updatedAt: updatedAt(),
  },
  t => ({
    starterTagUnique: uniqueIndex('eval_questions_starter_tag_unique').on(t.starterTag),
    activeIdx: index('eval_questions_active_idx').on(t.active),
    scenarioIdx: index('eval_questions_scenario_idx').on(t.scenario),
  }),
)

// --- eval_answers ---
// Stores BOTH DeepSeek-raw and TEBIQ-current generations per question.
// One row per (question_id, answer_type). New generation overwrites the
// older row for the same pair (delete-then-insert).
export const evalAnswers = pgTable(
  'eval_answers',
  {
    id: idCol(),
    questionId: varchar('question_id', { length: 24 })
      .notNull()
      .references(() => evalQuestions.id, { onDelete: 'cascade' }),
    answerType: evalAnswerTypeEnum('answer_type').notNull(),
    model: varchar('model', { length: 64 }), // e.g. 'deepseek-v4-pro', 'answer-core-v1.1-llm'
    promptVersion: varchar('prompt_version', { length: 32 }), // e.g. 'eval-lab-light-v1'
    answerText: text('answer_text'), // plain-text; null when error or pending
    tebiqAnswerId: varchar('tebiq_answer_id', { length: 24 }), // links back to answer_drafts.id
    tebiqAnswerLink: varchar('tebiq_answer_link', { length: 240 }), // /answer/{id}
    engineVersion: varchar('engine_version', { length: 64 }),
    status: varchar('status', { length: 32 }), // direct_answer | preliminary | clarification_needed | out_of_scope
    domain: varchar('domain', { length: 32 }),
    fallbackReason: varchar('fallback_reason', { length: 64 }),
    latencyMs: integer('latency_ms'),
    error: text('error'), // populated when generation fails
    rawPayloadJson: jsonb('raw_payload_json').$type<Record<string, unknown>>().default(sql`'{}'::jsonb`),
    schemaVersion: varchar('schema_version', { length: 24 }).notNull().default('eval-lab-v1'),
    createdAt: createdAt(),
  },
  t => ({
    questionTypeUnique: uniqueIndex('eval_answers_question_type_unique').on(t.questionId, t.answerType),
    questionIdx: index('eval_answers_question_idx').on(t.questionId),
  }),
)

// --- eval_annotations ---
// One row per (question_id, reviewer). Update-in-place, latest wins.
export const evalAnnotations = pgTable(
  'eval_annotations',
  {
    id: idCol(),
    questionId: varchar('question_id', { length: 24 })
      .notNull()
      .references(() => evalQuestions.id, { onDelete: 'cascade' }),
    reviewer: varchar('reviewer', { length: 64 }).notNull().default('default'),
    score: integer('score'), // 1-5; nullable until annotated
    severity: evalSeverityEnum('severity'),
    launchable: varchar('launchable', { length: 8 }), // 'yes' | 'no' | null
    directionCorrect: varchar('direction_correct', { length: 8 }),
    answeredQuestion: varchar('answered_question', { length: 8 }),
    dangerousClaim: varchar('dangerous_claim', { length: 8 }),
    hallucination: varchar('hallucination', { length: 8 }),
    shouldHandoff: varchar('should_handoff', { length: 8 }),
    mustHave: text('must_have'),
    mustNotHave: text('must_not_have'),
    missingPoints: text('missing_points'),
    reviewerNote: text('reviewer_note'),
    action: evalActionEnum('action'),
    annotationJson: jsonb('annotation_json').$type<Record<string, unknown>>().notNull().default(sql`'{}'::jsonb`),
    schemaVersion: varchar('schema_version', { length: 24 }).notNull().default('eval-lab-v1'),
    createdAt: createdAt(),
    updatedAt: updatedAt(),
  },
  t => ({
    questionReviewerUnique: uniqueIndex('eval_annotations_question_reviewer_unique').on(t.questionId, t.reviewer),
    severityIdx: index('eval_annotations_severity_idx').on(t.severity),
    actionIdx: index('eval_annotations_action_idx').on(t.action),
  }),
)

export type EvalQuestion = typeof evalQuestions.$inferSelect
export type NewEvalQuestion = typeof evalQuestions.$inferInsert
export type EvalAnswer = typeof evalAnswers.$inferSelect
export type NewEvalAnswer = typeof evalAnswers.$inferInsert
export type EvalAnnotation = typeof evalAnnotations.$inferSelect
export type NewEvalAnnotation = typeof evalAnnotations.$inferInsert

// re-export sql for callers that want raw helpers without importing drizzle
export { sql }
