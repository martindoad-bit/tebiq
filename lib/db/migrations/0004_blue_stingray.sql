ALTER TABLE "articles" ADD COLUMN "slug" varchar(200);--> statement-breakpoint
ALTER TABLE "articles" ADD COLUMN "last_reviewed_at" timestamp with time zone;--> statement-breakpoint
ALTER TABLE "articles" ADD COLUMN "last_reviewed_by" varchar(100);--> statement-breakpoint
ALTER TABLE "articles" ADD COLUMN "review_notes" text;--> statement-breakpoint
CREATE UNIQUE INDEX "articles_slug_unique" ON "articles" USING btree ("slug");--> statement-breakpoint
CREATE UNIQUE INDEX "invitations_invitee_member_unique" ON "invitations" USING btree ("invitee_member_id");--> statement-breakpoint
UPDATE "articles" SET
  "slug" = CASE "id"
    WHEN 'ar_what_is_gijinkoku_01' THEN 'what-is-gijinkoku-visa'
    WHEN 'ar_when_to_start_01' THEN 'visa-renewal-when-to-start'
    ELSE "slug"
  END
WHERE "id" IN ('ar_what_is_gijinkoku_01', 'ar_when_to_start_01');
