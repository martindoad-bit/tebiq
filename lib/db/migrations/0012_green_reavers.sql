CREATE TABLE "text_understand_requests" (
	"id" varchar(24) PRIMARY KEY NOT NULL,
	"family_id" varchar(24),
	"member_id" varchar(24),
	"session_id" varchar(64),
	"input_hash" varchar(64) NOT NULL,
	"summary" text,
	"ai_response" jsonb,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	CONSTRAINT "text_understand_family_or_session_required" CHECK ("text_understand_requests"."family_id" IS NOT NULL OR "text_understand_requests"."session_id" IS NOT NULL)
);
--> statement-breakpoint
ALTER TABLE "articles" ADD COLUMN "doc_type_tags" jsonb;--> statement-breakpoint
ALTER TABLE "articles" ADD COLUMN "scenario_tags" jsonb;--> statement-breakpoint
ALTER TABLE "articles" ADD COLUMN "applies_to" jsonb;--> statement-breakpoint
ALTER TABLE "articles" ADD COLUMN "urgency_level" varchar(24);--> statement-breakpoint
ALTER TABLE "articles" ADD COLUMN "estimated_read_time" integer;--> statement-breakpoint
ALTER TABLE "text_understand_requests" ADD CONSTRAINT "text_understand_requests_family_id_families_id_fk" FOREIGN KEY ("family_id") REFERENCES "public"."families"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "text_understand_requests" ADD CONSTRAINT "text_understand_requests_member_id_members_id_fk" FOREIGN KEY ("member_id") REFERENCES "public"."members"("id") ON DELETE set null ON UPDATE no action;--> statement-breakpoint
CREATE INDEX "text_understand_family_id_idx" ON "text_understand_requests" USING btree ("family_id");--> statement-breakpoint
CREATE INDEX "text_understand_session_id_idx" ON "text_understand_requests" USING btree ("session_id");--> statement-breakpoint
CREATE INDEX "text_understand_created_at_idx" ON "text_understand_requests" USING btree ("created_at");--> statement-breakpoint
CREATE INDEX "articles_urgency_level_idx" ON "articles" USING btree ("urgency_level");