# Photo Recognition Quality Report

## Scope

Block 5 replaced the fixed photo mock with a server-only Bedrock Claude Vision
recognition path. The output still matches `PhotoRecognitionResult`, so existing
photo result, archive, quota, and email prompt UI can continue consuming the
same shape.

Model default:

- `PHOTO_RECOGNITION_MODEL_ID` if configured
- fallback: `anthropic.claude-sonnet-4-5-20250929-v1:0`

Region default:

- `AWS_REGION` if configured
- fallback: `ap-northeast-1`

待 review: AWS Bedrock public model tables should be checked before production
to confirm whether the selected Claude model is strictly in-region in Tokyo.
The implementation uses the Tokyo endpoint by default, but exact data residency
depends on the Bedrock model/inference profile enabled in the AWS account.

## Test Set

The committed samples under `scripts/test/photo-recognition-samples/` are
synthetic PNG images, generated for copyright-safe testing:

1. 住民税通知
2. 国民健康保険料通知
3. 年金保険料納付書
4. 在留カード更新通知
5. 確定申告書
6. 源泉徴収票
7. 課税証明書
8. 入管局补正通知 / 資料提出通知書
9. 市役所送达的一般通知
10. 银行/不动产合同样本

Run:

```bash
tsx --env-file=.env.local scripts/test/test-recognition.ts
```

The script reports `pass`, `partial`, or `fail` for document type, issuer,
amount, and deadline where applicable. It does not print AWS credentials.

## Prompt Tuning Notes

- System prompt enforces JSON-only output and the exact current result fields.
- Chinese UI language is required, while Japanese official terms are preserved:
  `在留カード`, `市役所`, `住民税`, `年金`, `確定申告`, `入国管理局`.
- Urgency has explicit rules:
  - `critical`: expired, due today/within 3 days, or clear qualification/payment risk.
  - `high`: deadline or amount action within 30 days.
  - `normal`: useful information without urgent action.
  - `ignorable`: ad/copy/no action.
- The server recomputes `deadlineRemainingDays` from `deadline` in JST instead
  of trusting the model.
- Invalid JSON or schema drift returns a friendly "无法确认的文书" result, not a
  technical error.

## Current Quality Self-Evaluation

Expected on synthetic samples: 8/10 to 9/10 for title, issuer, amount, and
deadline extraction because the images are clean and printed.

Expected on real user photos: 7/10 initially. The risky cases are glare,
folded documents, cropped corners, handwritten notes, multi-page notices, and
HEIC handling. The UX fallback asks users to retake the full page instead of
showing raw model errors.

## Known Issues

- HEIC is accepted by the app, but the Bedrock SDK type definition does not list
  HEIC/HEIF as a first-class image media type. Runtime support must be verified
  against the enabled Claude model. If Bedrock rejects HEIC in production, add a
  server-side conversion step before recognition.
- No recognition cache is enabled. This avoids retaining extra copies of user
  images in 1.0, but repeated uploads of the same file will call Bedrock again.
- The samples are synthetic. Before launch, run 20-30 real-world redacted photos
  taken on phones under different lighting conditions.
