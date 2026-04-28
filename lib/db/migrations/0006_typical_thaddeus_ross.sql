CREATE TABLE "error_logs" (
	"id" varchar(24) PRIMARY KEY NOT NULL,
	"code" varchar(64) DEFAULT 'unknown' NOT NULL,
	"message" text NOT NULL,
	"stack" text,
	"path" varchar(200),
	"digest" varchar(40),
	"severity" varchar(16) DEFAULT 'error' NOT NULL,
	"payload" jsonb,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "events" (
	"id" varchar(24) PRIMARY KEY NOT NULL,
	"event_name" varchar(64) NOT NULL,
	"family_id" varchar(24),
	"member_id" varchar(24),
	"session_id" varchar(64),
	"payload" jsonb,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE INDEX "error_logs_created_at_idx" ON "error_logs" USING btree ("created_at");--> statement-breakpoint
CREATE INDEX "error_logs_severity_idx" ON "error_logs" USING btree ("severity");--> statement-breakpoint
CREATE INDEX "events_name_created_idx" ON "events" USING btree ("event_name","created_at");--> statement-breakpoint
CREATE INDEX "events_family_idx" ON "events" USING btree ("family_id");--> statement-breakpoint
CREATE INDEX "events_created_at_idx" ON "events" USING btree ("created_at");