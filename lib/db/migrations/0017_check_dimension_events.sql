CREATE TABLE "check_dimension_events" (
	"id" varchar(24) PRIMARY KEY NOT NULL,
	"check_dimension_result_id" varchar(24),
	"member_id" varchar(24),
	"session_id" varchar(64),
	"event_type" "check_dimension_event_type" NOT NULL,
	"event_payload" jsonb NOT NULL,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL
);
--> statement-breakpoint
ALTER TABLE "check_dimension_events" ADD CONSTRAINT "check_dimension_events_check_dimension_result_id_check_dimension_results_id_fk" FOREIGN KEY ("check_dimension_result_id") REFERENCES "public"."check_dimension_results"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "check_dimension_events" ADD CONSTRAINT "check_dimension_events_member_id_members_id_fk" FOREIGN KEY ("member_id") REFERENCES "public"."members"("id") ON DELETE set null ON UPDATE no action;--> statement-breakpoint
CREATE INDEX "check_dimension_events_result_idx" ON "check_dimension_events" USING btree ("check_dimension_result_id");--> statement-breakpoint
CREATE INDEX "check_dimension_events_member_id_idx" ON "check_dimension_events" USING btree ("member_id");--> statement-breakpoint
CREATE INDEX "check_dimension_events_session_id_idx" ON "check_dimension_events" USING btree ("session_id");--> statement-breakpoint
CREATE INDEX "check_dimension_events_event_type_idx" ON "check_dimension_events" USING btree ("event_type");
