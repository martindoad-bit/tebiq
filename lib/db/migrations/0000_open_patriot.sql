CREATE TYPE "public"."billing_cycle" AS ENUM('monthly', 'yearly');--> statement-breakpoint
CREATE TYPE "public"."consultation_status" AS ENUM('new', 'contacted', 'closed');--> statement-breakpoint
CREATE TYPE "public"."invitation_status" AS ENUM('pending', 'accepted', 'expired');--> statement-breakpoint
CREATE TYPE "public"."notif_channel" AS ENUM('email', 'sms', 'app_push', 'line');--> statement-breakpoint
CREATE TYPE "public"."notif_status" AS ENUM('queued', 'sent', 'delivered', 'failed', 'opened');--> statement-breakpoint
CREATE TYPE "public"."purchase_product" AS ENUM('material_package', 'photo_credit_pack', 'expert_consultation');--> statement-breakpoint
CREATE TYPE "public"."purchase_status" AS ENUM('pending', 'paid', 'failed', 'refunded');--> statement-breakpoint
CREATE TYPE "public"."result_color" AS ENUM('red', 'yellow', 'green');--> statement-breakpoint
CREATE TYPE "public"."subscription_status" AS ENUM('trialing', 'active', 'past_due', 'canceled', 'expired');--> statement-breakpoint
CREATE TYPE "public"."subscription_tier" AS ENUM('basic', 'premium');--> statement-breakpoint
CREATE TYPE "public"."urgency" AS ENUM('critical', 'important', 'normal', 'ignorable');--> statement-breakpoint
CREATE TYPE "public"."visa_type" AS ENUM('gijinkoku', 'keiei', 'haigusha', 'eijusha', 'tokutei', 'teijusha', 'ryugaku', 'other');--> statement-breakpoint
CREATE TABLE "consultations" (
	"id" varchar(24) PRIMARY KEY NOT NULL,
	"family_id" varchar(24),
	"name" varchar(80),
	"phone" varchar(20),
	"email" varchar(120),
	"line_id" varchar(80),
	"content" text,
	"status" "consultation_status" DEFAULT 'new' NOT NULL,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "documents" (
	"id" varchar(24) PRIMARY KEY NOT NULL,
	"family_id" varchar(24) NOT NULL,
	"member_id" varchar(24),
	"image_url" text NOT NULL,
	"doc_type" varchar(80),
	"summary" text,
	"urgency" "urgency",
	"ai_response" jsonb,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "families" (
	"id" varchar(24) PRIMARY KEY NOT NULL,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	"updated_at" timestamp with time zone DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "invitations" (
	"id" varchar(24) PRIMARY KEY NOT NULL,
	"inviter_member_id" varchar(24) NOT NULL,
	"invitee_member_id" varchar(24),
	"code" varchar(16) NOT NULL,
	"status" "invitation_status" DEFAULT 'pending' NOT NULL,
	"reward_granted" boolean DEFAULT false NOT NULL,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	"accepted_at" timestamp with time zone
);
--> statement-breakpoint
CREATE TABLE "members" (
	"id" varchar(24) PRIMARY KEY NOT NULL,
	"family_id" varchar(24) NOT NULL,
	"is_owner" boolean DEFAULT false NOT NULL,
	"name" varchar(80),
	"phone" varchar(20) NOT NULL,
	"visa_type" "visa_type",
	"visa_expiry" date,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	"updated_at" timestamp with time zone DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "notifications" (
	"id" varchar(24) PRIMARY KEY NOT NULL,
	"family_id" varchar(24) NOT NULL,
	"member_id" varchar(24),
	"channel" "notif_channel" NOT NULL,
	"type" varchar(64) NOT NULL,
	"payload" jsonb NOT NULL,
	"status" "notif_status" DEFAULT 'queued' NOT NULL,
	"sent_at" timestamp with time zone,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "otp_codes" (
	"id" varchar(24) PRIMARY KEY NOT NULL,
	"phone" varchar(20) NOT NULL,
	"code" varchar(6) NOT NULL,
	"expires_at" timestamp with time zone NOT NULL,
	"consumed_at" timestamp with time zone,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "purchases" (
	"id" varchar(24) PRIMARY KEY NOT NULL,
	"family_id" varchar(24) NOT NULL,
	"product" "purchase_product" NOT NULL,
	"amount_jpy" integer NOT NULL,
	"status" "purchase_status" DEFAULT 'pending' NOT NULL,
	"stripe_payment_intent_id" varchar(80),
	"metadata" jsonb,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	"paid_at" timestamp with time zone
);
--> statement-breakpoint
CREATE TABLE "quiz_results" (
	"id" varchar(24) PRIMARY KEY NOT NULL,
	"member_id" varchar(24),
	"session_id" varchar(64),
	"visa_type" "visa_type" NOT NULL,
	"answers" jsonb NOT NULL,
	"result_color" "result_color" NOT NULL,
	"summary" jsonb NOT NULL,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "sessions" (
	"id" varchar(64) PRIMARY KEY NOT NULL,
	"member_id" varchar(24) NOT NULL,
	"expires_at" timestamp with time zone NOT NULL,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "subscriptions" (
	"id" varchar(24) PRIMARY KEY NOT NULL,
	"family_id" varchar(24) NOT NULL,
	"tier" "subscription_tier" DEFAULT 'basic' NOT NULL,
	"status" "subscription_status" DEFAULT 'trialing' NOT NULL,
	"current_period_start" timestamp with time zone NOT NULL,
	"current_period_end" timestamp with time zone NOT NULL,
	"billing_cycle" "billing_cycle" NOT NULL,
	"stripe_customer_id" varchar(80),
	"stripe_subscription_id" varchar(80),
	"canceled_at" timestamp with time zone,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	"updated_at" timestamp with time zone DEFAULT now() NOT NULL
);
--> statement-breakpoint
ALTER TABLE "consultations" ADD CONSTRAINT "consultations_family_id_families_id_fk" FOREIGN KEY ("family_id") REFERENCES "public"."families"("id") ON DELETE set null ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "documents" ADD CONSTRAINT "documents_family_id_families_id_fk" FOREIGN KEY ("family_id") REFERENCES "public"."families"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "documents" ADD CONSTRAINT "documents_member_id_members_id_fk" FOREIGN KEY ("member_id") REFERENCES "public"."members"("id") ON DELETE set null ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "invitations" ADD CONSTRAINT "invitations_inviter_member_id_members_id_fk" FOREIGN KEY ("inviter_member_id") REFERENCES "public"."members"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "invitations" ADD CONSTRAINT "invitations_invitee_member_id_members_id_fk" FOREIGN KEY ("invitee_member_id") REFERENCES "public"."members"("id") ON DELETE set null ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "members" ADD CONSTRAINT "members_family_id_families_id_fk" FOREIGN KEY ("family_id") REFERENCES "public"."families"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "notifications" ADD CONSTRAINT "notifications_family_id_families_id_fk" FOREIGN KEY ("family_id") REFERENCES "public"."families"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "notifications" ADD CONSTRAINT "notifications_member_id_members_id_fk" FOREIGN KEY ("member_id") REFERENCES "public"."members"("id") ON DELETE set null ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "purchases" ADD CONSTRAINT "purchases_family_id_families_id_fk" FOREIGN KEY ("family_id") REFERENCES "public"."families"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "quiz_results" ADD CONSTRAINT "quiz_results_member_id_members_id_fk" FOREIGN KEY ("member_id") REFERENCES "public"."members"("id") ON DELETE set null ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "sessions" ADD CONSTRAINT "sessions_member_id_members_id_fk" FOREIGN KEY ("member_id") REFERENCES "public"."members"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "subscriptions" ADD CONSTRAINT "subscriptions_family_id_families_id_fk" FOREIGN KEY ("family_id") REFERENCES "public"."families"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
CREATE INDEX "consultations_status_idx" ON "consultations" USING btree ("status");--> statement-breakpoint
CREATE INDEX "consultations_created_at_idx" ON "consultations" USING btree ("created_at");--> statement-breakpoint
CREATE INDEX "documents_family_id_idx" ON "documents" USING btree ("family_id");--> statement-breakpoint
CREATE INDEX "documents_created_at_idx" ON "documents" USING btree ("created_at");--> statement-breakpoint
CREATE UNIQUE INDEX "invitations_code_unique" ON "invitations" USING btree ("code");--> statement-breakpoint
CREATE INDEX "invitations_inviter_idx" ON "invitations" USING btree ("inviter_member_id");--> statement-breakpoint
CREATE UNIQUE INDEX "members_phone_unique" ON "members" USING btree ("phone");--> statement-breakpoint
CREATE INDEX "members_family_id_idx" ON "members" USING btree ("family_id");--> statement-breakpoint
CREATE INDEX "members_visa_expiry_idx" ON "members" USING btree ("visa_expiry");--> statement-breakpoint
CREATE INDEX "notifications_family_id_idx" ON "notifications" USING btree ("family_id");--> statement-breakpoint
CREATE INDEX "notifications_status_idx" ON "notifications" USING btree ("status");--> statement-breakpoint
CREATE INDEX "otp_codes_phone_expires_idx" ON "otp_codes" USING btree ("phone","expires_at");--> statement-breakpoint
CREATE INDEX "purchases_family_id_idx" ON "purchases" USING btree ("family_id");--> statement-breakpoint
CREATE INDEX "purchases_stripe_pi_idx" ON "purchases" USING btree ("stripe_payment_intent_id");--> statement-breakpoint
CREATE INDEX "quiz_results_member_id_idx" ON "quiz_results" USING btree ("member_id");--> statement-breakpoint
CREATE INDEX "quiz_results_session_id_idx" ON "quiz_results" USING btree ("session_id");--> statement-breakpoint
CREATE INDEX "quiz_results_created_at_idx" ON "quiz_results" USING btree ("created_at");--> statement-breakpoint
CREATE INDEX "sessions_member_id_idx" ON "sessions" USING btree ("member_id");--> statement-breakpoint
CREATE INDEX "sessions_expires_at_idx" ON "sessions" USING btree ("expires_at");--> statement-breakpoint
CREATE UNIQUE INDEX "subscriptions_family_id_unique" ON "subscriptions" USING btree ("family_id");--> statement-breakpoint
CREATE INDEX "subscriptions_stripe_sub_idx" ON "subscriptions" USING btree ("stripe_subscription_id");