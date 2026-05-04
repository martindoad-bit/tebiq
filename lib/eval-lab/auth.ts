// TEBIQ Eval Lab V0 — auth gate.
//
// V0 strategy: env-only gate. EVAL_LAB_ENABLED must be '1' for the
// route to exist. When unset (production default), every Eval Lab
// route returns 404 — the page does not appear in any navigation,
// the API endpoints do not respond, and there is no way for a
// non-internal user to discover the surface.
//
// V1 (post-canary, when we have an admin auth flow we trust) can
// upgrade this to require an ADMIN_KEY query param or a proper
// session check. For V0, env gate is enough — the URL itself is
// undocumented and the gate keeps it disabled in production by
// default.
//
// IMPORTANT: never log the env value. Just gate on truthiness.

export function isEvalLabEnabled(): boolean {
  const v = process.env.EVAL_LAB_ENABLED
  // Diagnostic-only — logs ONLY the type and the comparison result so
  // we can tell from Vercel function logs whether the env var is
  // present-but-wrong-shape vs absent entirely. Never logs the
  // actual value. Remove after Eval Lab Preview gating is verified.
  console.warn('[eval-lab/auth] EVAL_LAB_ENABLED present:', typeof v, v === '1')
  return v === '1'
}
