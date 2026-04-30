CREATE TYPE "public"."answer_feedback_type" AS ENUM('helpful', 'inaccurate', 'unclear', 'my_case_differs');--> statement-breakpoint
CREATE TYPE "public"."decision_answer_level" AS ENUM('L1', 'L2', 'L3', 'L4');--> statement-breakpoint
CREATE TYPE "public"."decision_card_type" AS ENUM('decision_card', 'workflow', 'risk_chain', 'misconception');--> statement-breakpoint
CREATE TYPE "public"."decision_publish_decision" AS ENUM('approve', 'revise', 'reject', 'escalate');--> statement-breakpoint
CREATE TYPE "public"."decision_reviewer_role" AS ENUM('staff', 'shoshi', 'founder', 'other');--> statement-breakpoint
CREATE TYPE "public"."decision_status" AS ENUM('draft', 'needs_review', 'approved', 'rejected', 'deprecated');--> statement-breakpoint
CREATE TYPE "public"."query_match_status" AS ENUM('matched', 'no_match', 'low_confidence');--> statement-breakpoint
CREATE TYPE "public"."source_grade" AS ENUM('S', 'A', 'B', 'C');--> statement-breakpoint
CREATE TABLE "answer_feedback" (
	"id" varchar(24) PRIMARY KEY NOT NULL,
	"card_id" varchar(24),
	"page_path" varchar(240) NOT NULL,
	"feedback_type" "answer_feedback_type" NOT NULL,
	"note" text,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "decision_cards" (
	"id" varchar(24) PRIMARY KEY NOT NULL,
	"slug" varchar(200) NOT NULL,
	"title" varchar(180) NOT NULL,
	"card_type" "decision_card_type" NOT NULL,
	"answer_level" "decision_answer_level" NOT NULL,
	"status" "decision_status" DEFAULT 'needs_review' NOT NULL,
	"visa_types" jsonb DEFAULT '[]'::jsonb NOT NULL,
	"trigger" jsonb,
	"user_state" jsonb,
	"decision_options" jsonb,
	"recommended_action" text,
	"why_not_other_options" jsonb,
	"steps" jsonb,
	"related_documents" jsonb,
	"related_check_dimensions" jsonb,
	"source_refs" jsonb,
	"source_grade" "source_grade" DEFAULT 'B' NOT NULL,
	"last_verified_at" date,
	"requires_review_after_days" integer DEFAULT 90 NOT NULL,
	"requires_review" boolean DEFAULT true NOT NULL,
	"expert_handoff" jsonb,
	"body_markdown" text DEFAULT '' NOT NULL,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	"updated_at" timestamp with time zone DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "decision_reviews" (
	"id" varchar(24) PRIMARY KEY NOT NULL,
	"decision_card_id" varchar(24),
	"reviewer_name" varchar(120) NOT NULL,
	"reviewer_role" "decision_reviewer_role" DEFAULT 'staff' NOT NULL,
	"conclusion_ok" boolean,
	"publish_decision" "decision_publish_decision" NOT NULL,
	"accuracy_score" integer NOT NULL,
	"source_score" integer NOT NULL,
	"boundary_score" integer NOT NULL,
	"actionability_score" integer NOT NULL,
	"flags" jsonb DEFAULT '[]'::jsonb NOT NULL,
	"note" text,
	"reviewed_at" timestamp with time zone DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "query_backlog" (
	"id" varchar(24) PRIMARY KEY NOT NULL,
	"raw_query" text NOT NULL,
	"normalized_query" text NOT NULL,
	"matched_card_id" varchar(24),
	"match_status" "query_match_status" NOT NULL,
	"user_context" jsonb,
	"source_page" varchar(200),
	"created_at" timestamp with time zone DEFAULT now() NOT NULL
);
--> statement-breakpoint
ALTER TABLE "answer_feedback" ADD CONSTRAINT "answer_feedback_card_id_decision_cards_id_fk" FOREIGN KEY ("card_id") REFERENCES "public"."decision_cards"("id") ON DELETE set null ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "decision_reviews" ADD CONSTRAINT "decision_reviews_decision_card_id_decision_cards_id_fk" FOREIGN KEY ("decision_card_id") REFERENCES "public"."decision_cards"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "query_backlog" ADD CONSTRAINT "query_backlog_matched_card_id_decision_cards_id_fk" FOREIGN KEY ("matched_card_id") REFERENCES "public"."decision_cards"("id") ON DELETE set null ON UPDATE no action;--> statement-breakpoint
CREATE INDEX "answer_feedback_card_idx" ON "answer_feedback" USING btree ("card_id");--> statement-breakpoint
CREATE INDEX "answer_feedback_type_idx" ON "answer_feedback" USING btree ("feedback_type");--> statement-breakpoint
CREATE INDEX "answer_feedback_created_at_idx" ON "answer_feedback" USING btree ("created_at");--> statement-breakpoint
CREATE UNIQUE INDEX "decision_cards_slug_unique" ON "decision_cards" USING btree ("slug");--> statement-breakpoint
CREATE INDEX "decision_cards_status_idx" ON "decision_cards" USING btree ("status");--> statement-breakpoint
CREATE INDEX "decision_cards_type_idx" ON "decision_cards" USING btree ("card_type");--> statement-breakpoint
CREATE INDEX "decision_cards_answer_level_idx" ON "decision_cards" USING btree ("answer_level");--> statement-breakpoint
CREATE INDEX "decision_cards_source_grade_idx" ON "decision_cards" USING btree ("source_grade");--> statement-breakpoint
CREATE INDEX "decision_cards_requires_review_idx" ON "decision_cards" USING btree ("requires_review");--> statement-breakpoint
CREATE INDEX "decision_cards_updated_at_idx" ON "decision_cards" USING btree ("updated_at");--> statement-breakpoint
CREATE INDEX "decision_reviews_card_idx" ON "decision_reviews" USING btree ("decision_card_id");--> statement-breakpoint
CREATE INDEX "decision_reviews_reviewed_at_idx" ON "decision_reviews" USING btree ("reviewed_at");--> statement-breakpoint
CREATE INDEX "decision_reviews_publish_decision_idx" ON "decision_reviews" USING btree ("publish_decision");--> statement-breakpoint
CREATE INDEX "query_backlog_match_status_idx" ON "query_backlog" USING btree ("match_status");--> statement-breakpoint
CREATE INDEX "query_backlog_created_at_idx" ON "query_backlog" USING btree ("created_at");--> statement-breakpoint
CREATE INDEX "query_backlog_matched_card_idx" ON "query_backlog" USING btree ("matched_card_id");