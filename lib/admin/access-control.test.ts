import assert from 'node:assert/strict'
import test from 'node:test'

import { isAdminKeyAccepted, isProtectedAdminPath } from './access-control'

test('identifies admin page and API paths', () => {
  assert.equal(isProtectedAdminPath('/admin'), true)
  assert.equal(isProtectedAdminPath('/admin/scrivener-leads'), true)
  assert.equal(isProtectedAdminPath('/api/admin/consultations'), true)
  assert.equal(isProtectedAdminPath('/ai-consultation'), false)
  assert.equal(isProtectedAdminPath('/api/consultation/stream'), false)
})

test('admin paths fail closed when ADMIN_KEY is missing', () => {
  assert.equal(
    isAdminKeyAccepted({
      pathname: '/admin/scrivener-leads',
      providedKey: null,
      configuredKey: undefined,
    }),
    false,
  )
})

test('admin paths reject missing or wrong key when configured', () => {
  assert.equal(
    isAdminKeyAccepted({
      pathname: '/api/admin/consultations',
      providedKey: null,
      configuredKey: 'secret',
    }),
    false,
  )
  assert.equal(
    isAdminKeyAccepted({
      pathname: '/api/admin/consultations',
      providedKey: 'wrong',
      configuredKey: 'secret',
    }),
    false,
  )
})

test('admin paths accept the configured key', () => {
  assert.equal(
    isAdminKeyAccepted({
      pathname: '/admin',
      providedKey: 'secret',
      configuredKey: 'secret',
    }),
    true,
  )
})

test('non-admin paths are not gated by admin key', () => {
  assert.equal(
    isAdminKeyAccepted({
      pathname: '/quick-reference',
      providedKey: null,
      configuredKey: undefined,
    }),
    true,
  )
})
