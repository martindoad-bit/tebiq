CREATE TABLE IF NOT EXISTS "eval_judgements" (
  "id" varchar(24) PRIMARY KEY NOT NULL,
  "question_id" varchar(24) NOT NULL,
  "case_id" varchar(80) NOT NULL,
  "judge_name" varchar(80) DEFAULT 'aql_judge_claude_sonnet' NOT NULL,
  "judge_model" varchar(80) DEFAULT 'claude-sonnet' NOT NULL,
  "score" integer NOT NULL,
  "score_normalized" integer NOT NULL,
  "defect_flags" jsonb DEFAULT '[]'::jsonb NOT NULL,
  "vs_deepseek_judgment" varchar(32) NOT NULL,
  "ideal_answer_skeleton" text NOT NULL,
  "confidence" numeric(4, 2) NOT NULL,
  "reasoning" text NOT NULL,
  "active_learning_red" boolean DEFAULT false NOT NULL,
  "active_learning_reasons" jsonb DEFAULT '[]'::jsonb NOT NULL,
  "source_csv_path" varchar(240),
  "schema_version" varchar(24) DEFAULT 'eval-judgement-v1' NOT NULL,
  "created_at" timestamp with time zone DEFAULT now() NOT NULL,
  "updated_at" timestamp with time zone DEFAULT now() NOT NULL
);

DO $$ BEGIN
 ALTER TABLE "eval_judgements" ADD CONSTRAINT "eval_judgements_question_id_eval_questions_id_fk"
 FOREIGN KEY ("question_id") REFERENCES "public"."eval_questions"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;

CREATE UNIQUE INDEX IF NOT EXISTS "eval_judgements_case_judge_unique"
  ON "eval_judgements" USING btree ("case_id", "judge_name");

CREATE INDEX IF NOT EXISTS "eval_judgements_question_idx"
  ON "eval_judgements" USING btree ("question_id");

CREATE INDEX IF NOT EXISTS "eval_judgements_active_learning_idx"
  ON "eval_judgements" USING btree ("active_learning_red");

CREATE INDEX IF NOT EXISTS "eval_judgements_score_idx"
  ON "eval_judgements" USING btree ("score_normalized");
