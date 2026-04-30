ALTER TYPE "public"."query_match_status" ADD VALUE 'manual_import';--> statement-breakpoint
ALTER TABLE "query_backlog" ALTER COLUMN "normalized_query" DROP NOT NULL;--> statement-breakpoint
ALTER TABLE "query_backlog" ADD COLUMN "visa_type" varchar(80);--> statement-breakpoint
ALTER TABLE "query_backlog" ADD COLUMN "contact_email" varchar(255);--> statement-breakpoint
ALTER TABLE "query_backlog" ADD COLUMN "status" varchar(32) DEFAULT 'new' NOT NULL;--> statement-breakpoint
ALTER TABLE "query_backlog" ADD COLUMN "priority" varchar(16) DEFAULT 'normal' NOT NULL;--> statement-breakpoint
ALTER TABLE "query_backlog" ADD COLUMN "note" text;--> statement-breakpoint
ALTER TABLE "query_backlog" ADD COLUMN "updated_at" timestamp with time zone DEFAULT now() NOT NULL;--> statement-breakpoint
CREATE INDEX "query_backlog_status_idx" ON "query_backlog" USING btree ("status");--> statement-breakpoint
CREATE INDEX "query_backlog_priority_idx" ON "query_backlog" USING btree ("priority");--> statement-breakpoint
CREATE INDEX "query_backlog_visa_type_idx" ON "query_backlog" USING btree ("visa_type");