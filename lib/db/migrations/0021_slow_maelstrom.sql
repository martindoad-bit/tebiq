CREATE TABLE "answer_drafts" (
	"id" varchar(24) PRIMARY KEY NOT NULL,
	"query_id" varchar(24),
	"matched_card_id" varchar(24),
	"question_text" text NOT NULL,
	"answer_type" varchar(32) NOT NULL,
	"answer_level" "decision_answer_level" DEFAULT 'L2' NOT NULL,
	"review_status" varchar(32) DEFAULT 'unreviewed' NOT NULL,
	"title" varchar(220) NOT NULL,
	"summary" text NOT NULL,
	"sections_json" jsonb DEFAULT '[]'::jsonb NOT NULL,
	"next_steps_json" jsonb DEFAULT '[]'::jsonb NOT NULL,
	"related_links_json" jsonb DEFAULT '[]'::jsonb NOT NULL,
	"sources_json" jsonb DEFAULT '[]'::jsonb NOT NULL,
	"model_used" varchar(120),
	"review_note" text,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	"updated_at" timestamp with time zone DEFAULT now() NOT NULL
);
--> statement-breakpoint
ALTER TABLE "answer_feedback" ADD COLUMN "answer_draft_id" varchar(24);--> statement-breakpoint
ALTER TABLE "answer_drafts" ADD CONSTRAINT "answer_drafts_query_id_query_backlog_id_fk" FOREIGN KEY ("query_id") REFERENCES "public"."query_backlog"("id") ON DELETE set null ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "answer_drafts" ADD CONSTRAINT "answer_drafts_matched_card_id_decision_cards_id_fk" FOREIGN KEY ("matched_card_id") REFERENCES "public"."decision_cards"("id") ON DELETE set null ON UPDATE no action;--> statement-breakpoint
CREATE INDEX "answer_drafts_query_idx" ON "answer_drafts" USING btree ("query_id");--> statement-breakpoint
CREATE INDEX "answer_drafts_type_idx" ON "answer_drafts" USING btree ("answer_type");--> statement-breakpoint
CREATE INDEX "answer_drafts_review_status_idx" ON "answer_drafts" USING btree ("review_status");--> statement-breakpoint
CREATE INDEX "answer_drafts_created_at_idx" ON "answer_drafts" USING btree ("created_at");--> statement-breakpoint
CREATE INDEX "answer_drafts_matched_card_idx" ON "answer_drafts" USING btree ("matched_card_id");--> statement-breakpoint
ALTER TABLE "answer_feedback" ADD CONSTRAINT "answer_feedback_answer_draft_id_answer_drafts_id_fk" FOREIGN KEY ("answer_draft_id") REFERENCES "public"."answer_drafts"("id") ON DELETE set null ON UPDATE no action;--> statement-breakpoint
CREATE INDEX "answer_feedback_answer_draft_idx" ON "answer_feedback" USING btree ("answer_draft_id");