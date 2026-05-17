CREATE TABLE "user_matters" (
	"id" varchar(24) PRIMARY KEY NOT NULL,
	"viewer_id" varchar(64) NOT NULL,
	"origin_consultation_id" varchar(24),
	"title" text NOT NULL,
	"status" text DEFAULT 'active' NOT NULL,
	"supplemental_facts" jsonb DEFAULT '[]'::jsonb NOT NULL,
	"linked_material_ids" jsonb DEFAULT '[]'::jsonb NOT NULL,
	"linked_consultation_ids" jsonb DEFAULT '[]'::jsonb NOT NULL,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	"updated_at" timestamp with time zone DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE INDEX "user_matters_viewer_idx" ON "user_matters" USING btree ("viewer_id");--> statement-breakpoint
CREATE INDEX "user_matters_status_idx" ON "user_matters" USING btree ("status");--> statement-breakpoint
CREATE INDEX "user_matters_viewer_status_idx" ON "user_matters" USING btree ("viewer_id","status");--> statement-breakpoint
CREATE INDEX "user_matters_origin_idx" ON "user_matters" USING btree ("origin_consultation_id");
