CREATE TABLE "login_magic_link_tokens" (
	"id" varchar(24) PRIMARY KEY NOT NULL,
	"email" varchar(255) NOT NULL,
	"token" varchar(64) NOT NULL,
	"next_path" varchar(240),
	"invite_code" varchar(16),
	"expires_at" timestamp with time zone NOT NULL,
	"consumed_at" timestamp with time zone,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL
);
--> statement-breakpoint
ALTER TABLE "documents" ALTER COLUMN "family_id" DROP NOT NULL;--> statement-breakpoint
ALTER TABLE "members" ALTER COLUMN "phone" DROP NOT NULL;--> statement-breakpoint
ALTER TABLE "articles" ADD COLUMN "sources_count" integer;--> statement-breakpoint
ALTER TABLE "articles" ADD COLUMN "last_verified_at" timestamp with time zone;--> statement-breakpoint
ALTER TABLE "documents" ADD COLUMN "session_id" varchar(64);--> statement-breakpoint
CREATE UNIQUE INDEX "login_magic_link_tokens_token_unique" ON "login_magic_link_tokens" USING btree ("token");--> statement-breakpoint
CREATE INDEX "login_magic_link_tokens_email_expires_idx" ON "login_magic_link_tokens" USING btree ("email","expires_at");--> statement-breakpoint
CREATE INDEX "documents_session_id_idx" ON "documents" USING btree ("session_id");--> statement-breakpoint
CREATE UNIQUE INDEX "members_email_unique" ON "members" USING btree ("email");--> statement-breakpoint
ALTER TABLE "documents" ADD CONSTRAINT "documents_family_or_session_required" CHECK ("documents"."family_id" is not null or "documents"."session_id" is not null);--> statement-breakpoint
ALTER TABLE "members" ADD CONSTRAINT "phone_or_email_required" CHECK ("members"."phone" is not null or "members"."email" is not null);
