CREATE TYPE "public"."ai_consultation_feedback" AS ENUM('helpful', 'inaccurate', 'add_context', 'human_review', 'saved');--> statement-breakpoint
CREATE TYPE "public"."ai_consultation_status" AS ENUM('streaming', 'completed', 'timeout', 'failed');--> statement-breakpoint
CREATE TABLE "ai_consultations" (
	"id" varchar(24) PRIMARY KEY NOT NULL,
	"viewer_id" varchar(64),
	"user_question_text" text NOT NULL,
	"has_image" boolean DEFAULT false NOT NULL,
	"image_summary" text,
	"image_storage_ref" varchar(240),
	"ai_answer_text" text,
	"final_answer_text" text,
	"model" varchar(64) DEFAULT 'deepseek-v4-pro' NOT NULL,
	"prompt_version" varchar(32) DEFAULT 'consultation_alpha_v1' NOT NULL,
	"fact_anchor_ids" jsonb DEFAULT '[]'::jsonb NOT NULL,
	"risk_keyword_hits" jsonb DEFAULT '[]'::jsonb NOT NULL,
	"forbidden_redactions" jsonb DEFAULT '[]'::jsonb NOT NULL,
	"stream_started_at" timestamp with time zone,
	"first_token_at" timestamp with time zone,
	"completed_at" timestamp with time zone,
	"first_token_latency_ms" integer,
	"total_latency_ms" integer,
	"completion_status" "ai_consultation_status" DEFAULT 'streaming' NOT NULL,
	"partial_answer_saved" boolean DEFAULT false NOT NULL,
	"timeout_reason" varchar(64),
	"feedback_type" "ai_consultation_feedback",
	"saved_question" boolean DEFAULT false NOT NULL,
	"human_confirm_clicked" boolean DEFAULT false NOT NULL,
	"follow_up_count" integer DEFAULT 0 NOT NULL,
	"schema_version" varchar(24) DEFAULT 'ai-consultation-v1' NOT NULL,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	"updated_at" timestamp with time zone DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE INDEX "ai_consultations_completion_status_idx" ON "ai_consultations" USING btree ("completion_status");--> statement-breakpoint
CREATE INDEX "ai_consultations_saved_idx" ON "ai_consultations" USING btree ("saved_question");--> statement-breakpoint
CREATE INDEX "ai_consultations_viewer_idx" ON "ai_consultations" USING btree ("viewer_id");--> statement-breakpoint
CREATE INDEX "ai_consultations_created_at_idx" ON "ai_consultations" USING btree ("created_at");