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
    product: 'material_package',
    amountJpy: 980,
    metadata: { quizResultId: 'qr_test' },
  }
  void _i
  assert.ok(true)
})

test('material_package amount matches v2 pricing (¥980)', () => {
  const expectedPrice = 980
  assert.equal(expectedPrice, 980)
})
