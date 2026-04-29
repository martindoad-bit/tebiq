CREATE TYPE "public"."timeline_event_type" AS ENUM('photo_recognition', 'self_check', 'text_understand', 'policy_match', 'manual_note');--> statement-breakpoint
CREATE TABLE "timeline_events" (
	"id" varchar(24) PRIMARY KEY NOT NULL,
	"member_id" varchar(24),
	"session_id" varchar(64),
	"event_type" timeline_event_type NOT NULL,
	"event_payload" jsonb NOT NULL,
	"doc_type" varchar(120),
	"issuer" varchar(160),
	"amount" numeric(12, 2),
	"deadline" date,
	"is_envelope" boolean,
	"recognition_confidence" varchar(32),
	"visa_relevance" jsonb,
	"tags" text[] DEFAULT '{}'::text[] NOT NULL,
	"archived" boolean DEFAULT false NOT NULL,
	"user_note" text,
	"source_record_id" varchar(24),
	"source_record_type" varchar(32),
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	"updated_at" timestamp with time zone DEFAULT now() NOT NULL,
	CONSTRAINT "timeline_events_member_or_session_required" CHECK ("timeline_events"."member_id" IS NOT NULL OR "timeline_events"."session_id" IS NOT NULL)
);
--> statement-breakpoint
ALTER TABLE "members" ADD COLUMN "archive_retention_until" date DEFAULT (CURRENT_DATE + INTERVAL '30 days');--> statement-breakpoint
ALTER TABLE "timeline_events" ADD CONSTRAINT "timeline_events_member_id_members_id_fk" FOREIGN KEY ("member_id") REFERENCES "public"."members"("id") ON DELETE set null ON UPDATE no action;--> statement-breakpoint
CREATE INDEX "timeline_events_member_id_idx" ON "timeline_events" USING btree ("member_id");--> statement-breakpoint
CREATE INDEX "timeline_events_session_id_idx" ON "timeline_events" USING btree ("session_id");--> statement-breakpoint
CREATE INDEX "timeline_events_event_type_idx" ON "timeline_events" USING btree ("event_type");--> statement-breakpoint
CREATE INDEX "timeline_events_doc_type_idx" ON "timeline_events" USING btree ("doc_type");--> statement-breakpoint
CREATE INDEX "timeline_events_issuer_idx" ON "timeline_events" USING btree ("issuer");--> statement-breakpoint
CREATE INDEX "timeline_events_deadline_idx" ON "timeline_events" USING btree ("deadline");--> statement-breakpoint
CREATE INDEX "timeline_events_created_at_idx" ON "timeline_events" USING btree ("created_at");--> statement-breakpoint
CREATE INDEX "timeline_events_archived_idx" ON "timeline_events" USING btree ("archived");--> statement-breakpoint
CREATE INDEX "timeline_events_source_idx" ON "timeline_events" USING btree ("source_record_type","source_record_id");