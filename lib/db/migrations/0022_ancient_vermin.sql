CREATE TYPE "public"."eval_action" AS ENUM('golden_case', 'prompt_rule', 'fact_card_candidate', 'handoff_rule', 'ignore');--> statement-breakpoint
CREATE TYPE "public"."eval_answer_type" AS ENUM('deepseek_raw', 'tebiq_current');--> statement-breakpoint
CREATE TYPE "public"."eval_severity" AS ENUM('OK', 'P2', 'P1', 'P0');--> statement-breakpoint
CREATE TABLE "eval_annotations" (
	"id" varchar(24) PRIMARY KEY NOT NULL,
	"question_id" varchar(24) NOT NULL,
	"reviewer" varchar(64) DEFAULT 'default' NOT NULL,
	"score" integer,
	"severity" "eval_severity",
	"launchable" varchar(8),
	"direction_correct" varchar(8),
	"answered_question" varchar(8),
	"dangerous_claim" varchar(8),
	"hallucination" varchar(8),
	"should_handoff" varchar(8),
	"must_have" text,
	"must_not_have" text,
	"missing_points" text,
	"reviewer_note" text,
	"action" "eval_action",
	"annotation_json" jsonb DEFAULT '{}'::jsonb NOT NULL,
	"schema_version" varchar(24) DEFAULT 'eval-lab-v1' NOT NULL,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	"updated_at" timestamp with time zone DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "eval_answers" (
	"id" varchar(24) PRIMARY KEY NOT NULL,
	"question_id" varchar(24) NOT NULL,
	"answer_type" "eval_answer_type" NOT NULL,
	"model" varchar(64),
	"prompt_version" varchar(32),
	"answer_text" text,
	"tebiq_answer_id" varchar(24),
	"tebiq_answer_link" varchar(240),
	"engine_version" varchar(64),
	"status" varchar(32),
	"domain" varchar(32),
	"fallback_reason" varchar(64),
	"latency_ms" integer,
	"error" text,
	"raw_payload_json" jsonb DEFAULT '{}'::jsonb,
	"schema_version" varchar(24) DEFAULT 'eval-lab-v1' NOT NULL,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "eval_questions" (
	"id" varchar(24) PRIMARY KEY NOT NULL,
	"question_text" text NOT NULL,
	"scenario" varchar(80),
	"source" varchar(32) DEFAULT 'starter' NOT NULL,
	"starter_tag" varchar(80),
	"active" boolean DEFAULT true NOT NULL,
	"schema_version" varchar(24) DEFAULT 'eval-lab-v1' NOT NULL,
	"metadata_json" jsonb DEFAULT '{}'::jsonb NOT NULL,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	"updated_at" timestamp with time zone DEFAULT now() NOT NULL
);
--> statement-breakpoint
ALTER TABLE "eval_annotations" ADD CONSTRAINT "eval_annotations_question_id_eval_questions_id_fk" FOREIGN KEY ("question_id") REFERENCES "public"."eval_questions"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "eval_answers" ADD CONSTRAINT "eval_answers_question_id_eval_questions_id_fk" FOREIGN KEY ("question_id") REFERENCES "public"."eval_questions"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
CREATE UNIQUE INDEX "eval_annotations_question_reviewer_unique" ON "eval_annotations" USING btree ("question_id","reviewer");--> statement-breakpoint
CREATE INDEX "eval_annotations_severity_idx" ON "eval_annotations" USING btree ("severity");--> statement-breakpoint
CREATE INDEX "eval_annotations_action_idx" ON "eval_annotations" USING btree ("action");--> statement-breakpoint
CREATE UNIQUE INDEX "eval_answers_question_type_unique" ON "eval_answers" USING btree ("question_id","answer_type");--> statement-breakpoint
CREATE INDEX "eval_answers_question_idx" ON "eval_answers" USING btree ("question_id");--> statement-breakpoint
CREATE UNIQUE INDEX "eval_questions_starter_tag_unique" ON "eval_questions" USING btree ("starter_tag");--> statement-breakpoint
CREATE INDEX "eval_questions_active_idx" ON "eval_questions" USING btree ("active");--> statement-breakpoint
CREATE INDEX "eval_questions_scenario_idx" ON "eval_questions" USING btree ("scenario");