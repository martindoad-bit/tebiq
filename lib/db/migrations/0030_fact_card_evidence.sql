ALTER TABLE "fact_cards"
  ADD COLUMN IF NOT EXISTS "evidence_points" jsonb DEFAULT '[]'::jsonb NOT NULL,
  ADD COLUMN IF NOT EXISTS "related_links" jsonb DEFAULT '[]'::jsonb NOT NULL;
