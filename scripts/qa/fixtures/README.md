# Fact Layer QA Fixtures

Each file here is `<card_id>.json` with the qa_cases for that card.

Activation condition: FACT_LAYER_ENABLED=true + card is ai_verified + deployed.

Format:
```json
{
  "card_id": "bm_dissolution_01",
  "qa_cases": [
    {
      "id": "bm_dissolution_01-q1",
      "question": "...",
      "expected_card_ids": ["bm_dissolution_01"],
      "must_include": ["経管", "解散"],
      "must_exclude": [],
      "note": "Baseline trigger for bm_dissolution anchor"
    }
  ]
}
```

Do NOT add more than 5 cases per card (Charter §B.3 rate limit).
Do NOT run against FACT_LAYER_ENABLED=false production.
