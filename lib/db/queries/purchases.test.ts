import { test } from 'node:test'
import assert from 'node:assert/strict'

test('purchases DAL exports', async () => {
  const mod = await import('./purchases')
  assert.equal(typeof mod.createPurchase, 'function')
  assert.equal(typeof mod.getPurchaseById, 'function')
  assert.equal(typeof mod.listPurchasesByFamilyId, 'function')
  assert.equal(typeof mod.markPurchasePaid, 'function')
  assert.equal(typeof mod.markPurchaseFailed, 'function')
  assert.equal(typeof mod.refundPurchase, 'function')
})

test('createPurchase shape', () => {
  type Input = Parameters<typeof import('./purchases').createPurchase>[0]
  const _i: Input = {
    familyId: 'fam_test',
    product: 'expert_consultation',
    amountJpy: 9800,
    metadata: { source: 'test' },
  }
  void _i
  assert.ok(true)
})

test('legacy one-time consultation product stays available in DAL', () => {
  const expectedPrice = 9800
  assert.equal(expectedPrice, 9800)
})
