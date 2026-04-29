CREATE TYPE "public"."check_dimension_event_type" AS ENUM('created', 'updated', 'quiz_completed', 'marked_checked', 'marked_needs_action', 'expired');--> statement-breakpoint
CREATE TYPE "public"."check_dimension_status" AS ENUM('unchecked', 'checked', 'needs_action', 'recent', 'expired');--> statement-breakpoint
CREATE TABLE "check_runs" (
	"id" varchar(24) PRIMARY KEY NOT NULL,
	"member_id" varchar(24),
	"session_id" varchar(64),
	"visa_type" varchar(80) NOT NULL,
	"run_type" varchar(32) DEFAULT 'dimension_check' NOT NULL,
	"status" varchar(32) DEFAULT 'started' NOT NULL,
	"source_quiz_result_id" varchar(24),
	"started_at" timestamp with time zone DEFAULT now() NOT NULL,
	"completed_at" timestamp with time zone,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	"updated_at" timestamp with time zone DEFAULT now() NOT NULL,
	CONSTRAINT "check_runs_member_or_session_required" CHECK ("check_runs"."member_id" IS NOT NULL OR "check_runs"."session_id" IS NOT NULL)
);
--> statement-breakpoint
ALTER TABLE "check_runs" ADD CONSTRAINT "check_runs_member_id_members_id_fk" FOREIGN KEY ("member_id") REFERENCES "public"."members"("id") ON DELETE set null ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "check_runs" ADD CONSTRAINT "check_runs_source_quiz_result_id_quiz_results_id_fk" FOREIGN KEY ("source_quiz_result_id") REFERENCES "public"."quiz_results"("id") ON DELETE set null ON UPDATE no action;--> statement-breakpoint
CREATE INDEX "check_runs_member_id_idx" ON "check_runs" USING btree ("member_id");--> statement-breakpoint
CREATE INDEX "check_runs_session_id_idx" ON "check_runs" USING btree ("session_id");--> statement-breakpoint
CREATE INDEX "check_runs_visa_type_idx" ON "check_runs" USING btree ("visa_type");--> statement-breakpoint
CREATE INDEX "check_runs_source_quiz_result_id_idx" ON "check_runs" USING btree ("source_quiz_result_id");
