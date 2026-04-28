CREATE TYPE "public"."article_visibility" AS ENUM('public', 'private');--> statement-breakpoint
ALTER TABLE "articles" ADD COLUMN "visibility" "article_visibility" DEFAULT 'private' NOT NULL;--> statement-breakpoint
CREATE INDEX "articles_visibility_idx" ON "articles" USING btree ("visibility");