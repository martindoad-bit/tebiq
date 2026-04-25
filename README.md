# TEBIQ

> 你的在日生活好帮手 / 在日生活のお守り
> Next.js 14 + Drizzle + Postgres + Stripe + AWS Bedrock

Read [`PROJECT_MEMORY.md`](./PROJECT_MEMORY.md) before working in this repo.
Architecture overview: [`docs/architecture.md`](./docs/architecture.md).

## Quick start

```bash
npm install
cp .env.example .env.local   # then fill in values, see below
npm run dev                  # http://localhost:3000
```

## Environment variables

| Var | Required | Purpose |
|---|---|---|
| `DATABASE_URL` | yes (for any DB-backed route) | Supabase Postgres connection string |
| `tebiq_KV_REST_API_URL` | optional | Upstash Redis (legacy operational data + monitor cache) |
| `tebiq_KV_REST_API_TOKEN` | optional | Upstash Redis token |
| `ADMIN_KEY` | recommended in prod | Gates `/admin` and admin APIs |
| `CRON_SECRET` | required in prod | Vercel Cron `Authorization: Bearer` token |
| `AWS_ACCESS_KEY_ID` | required for AI features | AWS Bedrock |
| `AWS_SECRET_ACCESS_KEY` | required for AI features | AWS Bedrock |
| `AWS_REGION` | optional (default us-east-1) | AWS Bedrock region |

## Database setup

Block 1 status: schema defined locally; migrations not yet applied to a
live Supabase project. To wire up:

```bash
# 1. Provision Supabase Postgres in Tokyo region (apnortheast-1)
# 2. Set DATABASE_URL in .env.local
# 3. Generate the SQL migration files
npm run db:generate

# 4. Apply schema to the live DB
npm run db:migrate     # applies committed migrations (production)
# OR
npm run db:push        # diff-and-push without migration files (dev only)

# 5. Inspect via studio
npm run db:studio
```

The DAL lives in `lib/db/queries/`. See `docs/architecture.md` for the
"adding a new table" workflow.

## Tests

```bash
npm test
```

Unit tests live next to the modules they cover (`*.test.ts`). Database
tests **mock** `@/lib/db` and run without a live Postgres. Real
integration tests against Supabase land in Block 2.

## Project layout

See `docs/architecture.md` for the full directory tree and design notes.

## Deployment

Vercel — push to `main` deploys. Cron is configured in `vercel.json`.

## License

Private. © 2026 hedgefox 合同会社.
