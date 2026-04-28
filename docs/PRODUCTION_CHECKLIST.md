# TEBIQ 1.0 Production Checklist

## Founder Manual Tasks

- Stripe Dashboard:
  - Create products/prices for monthly, yearly, and premium plan entries used by the app.
  - Add production webhook endpoint for `/api/stripe/webhook`.
  - Copy production price IDs and webhook secret into Vercel environment variables.
- Resend:
  - Verify sending domain.
  - Configure DNS records required by Resend.
  - Set the production sender address.
- AWS Bedrock:
  - Confirm Claude model access in `ap-northeast-1`.
  - Verify whether the selected model/inference profile is strictly Tokyo in-region.
  - Run `scripts/test/test-recognition.ts` against the 10 synthetic samples and 20-30 redacted phone photos.
- Content:
  - Review all published knowledge articles.
  - Mark reviewed articles in `/admin/knowledge`.
  - Publish at least 5 seed articles before launch: 技人国 basics, renewal timing, 住民税, 年金, 健康保険.
- Legal:
  - Confirm Terms, Privacy, and 特商法 pages.
  - Confirm consultation disclaimer wording.

## Required Production Environment Variables

Core:

- `DATABASE_URL`
- `NEXT_PUBLIC_APP_URL`
- `ADMIN_KEY`

Auth / session:

- `SESSION_COOKIE_NAME` if overriding default
- `OTP_DEV_MODE=false`

AWS Bedrock:

- `AWS_ACCESS_KEY_ID`
- `AWS_SECRET_ACCESS_KEY`
- `AWS_REGION=ap-northeast-1`
- `PHOTO_RECOGNITION_MODEL_ID`

Invitation:

- `INVITE_REWARD_DAYS=7`
- `INVITE_EXPIRY_DAYS=30`
- `INVITE_MONTHLY_REWARD_CAP_DAYS=30`

Stripe:

- `STRIPE_SECRET_KEY`
- `STRIPE_WEBHOOK_SECRET`
- `NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY`
- Stripe price IDs used by checkout code.

Email:

- `EMAIL_CHANNEL=resend`
- `RESEND_API_KEY`
- `RESEND_FROM`

Cron:

- `CRON_SECRET` if Vercel cron endpoints are protected in production.

Never commit environment files or paste real values into reports, PRs, logs, or screenshots.

## Database

- Run migrations in production after deploy:

```bash
npm run db:migrate
```

- Confirm migration order includes:
  - `0002_articles`
  - `0003_members_email`
  - `0004_blue_stingray`
- Confirm `npm run db:generate` returns no pending schema changes before launch.
- Smoke-check:
  - Member signup/login
  - Invitation redemption
  - Article list/detail
  - Photo recognition insert into `documents`
  - Subscription trial extension

## DNS / Domain

- Point production domain to Vercel.
- Confirm `www` and apex redirect behavior.
- Confirm canonical URLs in SEO pages match production domain.
- Verify sitemap and robots:
  - `/sitemap.xml`
  - `/robots.txt`

## Vercel Production Settings

- Production branch: `main`.
- Node version matches local supported version.
- All production env vars are set in Vercel, not only preview.
- Cron jobs enabled:
  - `check-expiry`
  - `send-notifications`
- Build command: `npm run build`.
- Install command uses lockfile.

## Launch Smoke Test

Run on production after deployment:

- Open `/`, `/photo`, `/check`, `/visa-select`, `/knowledge`, `/subscribe`.
- Login with a real test phone flow.
- Upload one redacted sample image and confirm:
  - Friendly result page
  - `documents` row is created
  - Quota count changes
  - Email prompt appears after first photo if email is missing
- Create invite link from `/invite`.
- Register a new test phone with `ref` invite code.
- Confirm both families receive 7 trial days.
- Open `/admin/knowledge`, create draft, publish, open public slug URL.

## Monitoring / Logs

Current:

- API routes return structured user-facing errors.
- Notification mock mode writes local files in development.
- Vercel function logs can show server errors.

Missing before serious scale:

- Error tracking service.
- Bedrock latency/cost dashboard.
- Recognition success/fallback rate.
- Stripe webhook alerting.
- Email bounce/complaint monitoring.

## First-Week Metrics

- Signups per day.
- Photo uploads per signup.
- Recognition fallback rate.
- Quota modal impressions and invite clicks.
- Invitation registrations.
- Check completion rate.
- Knowledge article views.
- Trial activation and subscription intent clicks.
- Support/contact requests caused by confusing recognition output.
