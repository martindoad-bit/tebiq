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
  date,
  index,
  integer,
  jsonb,
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
    phone: varchar('phone', { length: 20 }).notNull(),
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

    createdAt: createdAt(),
    updatedAt: updatedAt(),
  },
  t => ({
    phoneIdx: uniqueIndex('members_phone_unique').on(t.phone),
    familyIdx: index('members_family_id_idx').on(t.familyId),
    expiryIdx: index('members_visa_expiry_idx').on(t.visaExpiry),
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

// --- documents (拍照即懂; Block 1 只建表) ---
export const documents = pgTable(
  'documents',
  {
    id: idCol(),
    familyId: varchar('family_id', { length: 24 })
      .notNull()
      .references(() => families.id, { onDelete: 'cascade' }),
    memberId: varchar('member_id', { length: 24 }).references(() => members.id, {
      onDelete: 'set null',
    }),
    imageUrl: text('image_url').notNull(),
    docType: varchar('doc_type', { length: 80 }),
    summary: text('summary'),
    urgency: urgencyEnum('urgency'),
    aiResponse: jsonb('ai_response').$type<Record<string, unknown>>(),
    createdAt: createdAt(),
  },
  t => ({
    familyIdx: index('documents_family_id_idx').on(t.familyId),
    createdIdx: index('documents_created_at_idx').on(t.createdAt),
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

// --- articles (knowledge content CMS) ---
export const articles = pgTable(
  'articles',
  {
    id: idCol(),
    title: varchar('title', { length: 160 }).notNull(),
    slug: varchar('slug', { length: 200 }),
    bodyMarkdown: text('body_markdown').notNull(),
    category: varchar('category', { length: 64 }).notNull(),
    status: articleStatusEnum('status').notNull().default('draft'),
    requiresShoshiReview: boolean('requires_shoshi_review').notNull().default(true),
    lastReviewedAt: timestamp('last_reviewed_at', { withTimezone: true }),
    lastReviewedBy: varchar('last_reviewed_by', { length: 100 }),
    reviewNotes: text('review_notes'),
    createdAt: createdAt(),
    updatedAt: updatedAt(),
  },
  t => ({
    slugUnique: uniqueIndex('articles_slug_unique').on(t.slug),
    statusIdx: index('articles_status_idx').on(t.status),
    categoryIdx: index('articles_category_idx').on(t.category),
    updatedIdx: index('articles_updated_at_idx').on(t.updatedAt),
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

// --- 类型导出（DAL/前端用） ---
export type Family = typeof families.$inferSelect
export type NewFamily = typeof families.$inferInsert
export type Member = typeof members.$inferSelect
export type NewMember = typeof members.$inferInsert
export type Subscription = typeof subscriptions.$inferSelect
export type NewSubscription = typeof subscriptions.$inferInsert
export type Purchase = typeof purchases.$inferSelect
export type NewPurchase = typeof purchases.$inferInsert
export type QuizResult = typeof quizResults.$inferSelect
export type NewQuizResult = typeof quizResults.$inferInsert
export type Document = typeof documents.$inferSelect
export type NewDocument = typeof documents.$inferInsert
export type Notification = typeof notifications.$inferSelect
export type NewNotification = typeof notifications.$inferInsert
export type Invitation = typeof invitations.$inferSelect
export type NewInvitation = typeof invitations.$inferInsert
export type Consultation = typeof consultations.$inferSelect
export type NewConsultation = typeof consultations.$inferInsert
export type Article = typeof articles.$inferSelect
export type NewArticle = typeof articles.$inferInsert
export type Session = typeof sessions.$inferSelect
export type NewSession = typeof sessions.$inferInsert
export type OtpCode = typeof otpCodes.$inferSelect
export type NewOtpCode = typeof otpCodes.$inferInsert

// re-export sql for callers that want raw helpers without importing drizzle
export { sql }
