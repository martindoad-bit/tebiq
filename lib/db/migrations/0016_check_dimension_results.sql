CREATE TABLE "check_dimension_results" (
	"id" varchar(24) PRIMARY KEY NOT NULL,
	"check_run_id" varchar(24),
	"member_id" varchar(24),
	"session_id" varchar(64),
	"visa_type" varchar(80) NOT NULL,
	"dimension_key" varchar(80) NOT NULL,
	"title" varchar(120) NOT NULL,
	"status" "check_dimension_status" DEFAULT 'unchecked' NOT NULL,
	"risk_flag" varchar(32),
	"reason" text,
	"action_label" varchar(80),
	"source_record_id" varchar(24),
	"source_record_type" varchar(32),
	"last_checked_at" timestamp with time zone,
	"expires_at" timestamp with time zone,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	"updated_at" timestamp with time zone DEFAULT now() NOT NULL,
	CONSTRAINT "check_dimension_results_member_or_session_required" CHECK ("check_dimension_results"."member_id" IS NOT NULL OR "check_dimension_results"."session_id" IS NOT NULL)
);
--> statement-breakpoint
ALTER TABLE "check_dimension_results" ADD CONSTRAINT "check_dimension_results_check_run_id_check_runs_id_fk" FOREIGN KEY ("check_run_id") REFERENCES "public"."check_runs"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "check_dimension_results" ADD CONSTRAINT "check_dimension_results_member_id_members_id_fk" FOREIGN KEY ("member_id") REFERENCES "public"."members"("id") ON DELETE set null ON UPDATE no action;--> statement-breakpoint
CREATE INDEX "check_dimension_results_run_idx" ON "check_dimension_results" USING btree ("check_run_id");--> statement-breakpoint
CREATE INDEX "check_dimension_results_member_id_idx" ON "check_dimension_results" USING btree ("member_id");--> statement-breakpoint
CREATE INDEX "check_dimension_results_session_id_idx" ON "check_dimension_results" USING btree ("session_id");--> statement-breakpoint
CREATE INDEX "check_dimension_results_visa_type_idx" ON "check_dimension_results" USING btree ("visa_type");--> statement-breakpoint
CREATE INDEX "check_dimension_results_status_idx" ON "check_dimension_results" USING btree ("status");--> statement-breakpoint
CREATE UNIQUE INDEX "check_dimension_results_owner_dimension_unique" ON "check_dimension_results" USING btree ("member_id","session_id","visa_type","dimension_key");
