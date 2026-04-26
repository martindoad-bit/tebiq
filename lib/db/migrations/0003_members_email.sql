ALTER TABLE "members" ADD COLUMN "email" varchar(255);--> statement-breakpoint
ALTER TABLE "members" ADD COLUMN "email_verified_at" timestamp with time zone;
