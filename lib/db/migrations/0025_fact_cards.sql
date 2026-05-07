CREATE TABLE "fact_cards" (
	"fact_id" text PRIMARY KEY NOT NULL,
	"title" text NOT NULL,
	"state" text NOT NULL,
	"risk_level" text NOT NULL,
	"confidence" text NOT NULL,
	"source_quality" text NOT NULL,
	"controlled_alpha_eligible" boolean DEFAULT false NOT NULL,
	"applies_to" jsonb NOT NULL,
	"trigger_keywords" jsonb NOT NULL,
	"injection_certain_block" text NOT NULL,
	"injection_needs_review_addendum" text,
	"needs_review_flags" jsonb DEFAULT '[]'::jsonb NOT NULL,
	"source_urls" jsonb NOT NULL,
	"reviewer" text,
	"last_verified_at" timestamp with time zone NOT NULL,
	"approved_at" timestamp with time zone,
	"approved_by" text,
	"filesystem_path" text NOT NULL,
	"content_hash" text NOT NULL,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	"updated_at" timestamp with time zone DEFAULT now() NOT NULL
);
--> statement-breakpoint
ALTER TABLE "ai_consultations" ALTER COLUMN "prompt_version" SET DEFAULT 'consultation_alpha_v2';--> statement-breakpoint
CREATE INDEX "fact_cards_state_idx" ON "fact_cards" USING btree ("state");--> statement-breakpoint
CREATE INDEX "fact_cards_risk_idx" ON "fact_cards" USING btree ("risk_level");--> statement-breakpoint
CREATE INDEX "fact_cards_state_risk_idx" ON "fact_cards" USING btree ("state","risk_level");