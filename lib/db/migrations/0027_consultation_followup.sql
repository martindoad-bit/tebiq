ALTER TABLE "ai_consultations" ADD COLUMN "parent_consultation_id" text;--> statement-breakpoint
ALTER TABLE "ai_consultations" ADD COLUMN "consultation_summary" jsonb;--> statement-breakpoint
CREATE INDEX "ai_consultations_parent_idx" ON "ai_consultations" USING btree ("parent_consultation_id");