# TEBIQ Admin Fail-Closed Hotfix

Date: 2026-05-15

Owner: Codex Production Lead / AI Engineering Lead

## Summary

Production `tebiq.jp` admin routes were confirmed fail-open before hotfix:

| Route | Credential | Before |
|---|---|---:|
| `/admin` | none | 200 |
| `/admin` | wrong key | 200 |
| `/api/admin/stats` | none | 200 |
| `/api/admin/stats` | wrong key | 200 |

This exposed admin UI and admin API data without protection.

## Fix

Created narrow hotfix worktree from `origin/main`:

```text
/Users/martin/Documents/tebiq-admin-fail-closed-hotfix
```

Branch:

```text
codex/admin-fail-closed-hotfix
```

Commit:

```text
2358dcd fix: fail close admin routes without admin key
```

Merged PR:

```text
https://github.com/martindoad-bit/tebiq/pull/130
```

Main merge commit:

```text
ccf2b34f5093f75ef0aab47d50704bcab0ab7f45
```

Files in hotfix:

- `middleware.ts`
- `lib/admin/access-control.ts`
- `lib/admin/access-control.test.ts`

Behavior:

- `/admin/*` and `/api/admin/*` are protected by middleware.
- Missing or blank `ADMIN_KEY` fails closed.
- Missing/wrong query key fails closed.
- Correct configured key is accepted.

## Verification

Hotfix worktree local verification:

```text
/Users/martin/Documents/tebiq/node_modules/.bin/tsx --test lib/admin/access-control.test.ts
/Users/martin/Documents/tebiq/node_modules/.bin/tsc --noEmit --pretty false
/Users/martin/Documents/tebiq/node_modules/.bin/next lint
```

Local smoke with `ADMIN_KEY=local-admin-test`:

| Route | Credential | Result |
|---|---|---:|
| `/admin` | none | 404 |
| `/admin` | wrong key | 404 |
| `/admin` | correct key | 200 |
| `/api/admin/stats` | none | 404 |

Local smoke with empty `ADMIN_KEY`:

| Route | Credential | Result |
|---|---|---:|
| `/admin` | none | 404 |
| `/admin` | any key | 404 |
| `/api/admin/stats` | none | 404 |
| `/api/admin/stats` | any key | 404 |

Production smoke after PR #130 deployment:

| Route | Credential | Result |
|---|---|---:|
| `/admin` | none | 404 |
| `/admin` | wrong key | 404 |
| `/api/admin/stats` | none | 404 |
| `/api/admin/stats` | wrong key | 404 |

## Remaining

- Correct-key production smoke was not run because the production key is not present in the local environment and should not be printed into logs.
- Keep this security check in future release smoke packs.
