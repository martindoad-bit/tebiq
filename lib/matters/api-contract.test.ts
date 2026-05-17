/**
 * Contract tests for /api/matters route handlers. Imports the route
 * modules and asserts the expected HTTP verbs are exported with the
 * right runtime config. Static-only — no live DB.
 */
import { test } from 'node:test'
import assert from 'node:assert/strict'

test('GET/POST /api/matters route exports', async () => {
  const mod = await import('@/app/api/matters/route')
  assert.equal(typeof mod.GET, 'function')
  assert.equal(typeof mod.POST, 'function')
  assert.equal(mod.dynamic, 'force-dynamic')
  assert.equal(mod.runtime, 'nodejs')
})

test('GET/PATCH /api/matters/[id] route exports', async () => {
  const mod = await import('@/app/api/matters/[id]/route')
  assert.equal(typeof mod.GET, 'function')
  assert.equal(typeof mod.PATCH, 'function')
})

test('POST /api/matters/[id]/supplement route exports', async () => {
  const mod = await import('@/app/api/matters/[id]/supplement/route')
  assert.equal(typeof mod.POST, 'function')
})

test('POST /api/matters/[id]/link route exports', async () => {
  const mod = await import('@/app/api/matters/[id]/link/route')
  assert.equal(typeof mod.POST, 'function')
})
