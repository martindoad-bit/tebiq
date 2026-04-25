/**
 * Subscriptions DAL — surface tests (no live DB).
 */
import { test } from 'node:test'
import assert from 'node:assert/strict'

test('subscriptions module exports the expected DAL surface', async () => {
  const mod = await import('./subscriptions')
  assert.equal(typeof mod.getSubscriptionByFamilyId, 'function')
  assert.equal(typeof mod.getSubscriptionByStripeSubId, 'function')
  assert.equal(typeof mod.createSubscription, 'function')
  assert.equal(typeof mod.updateSubscriptionStatus, 'function')
  assert.equal(typeof mod.isSubscriptionActive, 'function')
})

test('createSubscription accepts schema NewSubscription input', () => {
  type Input = Parameters<typeof import('./subscriptions').createSubscription>[0]
  const _i: Input = {
    familyId: 'fam_123456789012345678901234',
    tier: 'basic',
    status: 'trialing',
    currentPeriodStart: new Date(),
    currentPeriodEnd: new Date(Date.now() + 30 * 86400000),
    billingCycle: 'monthly',
  }
  void _i
  assert.ok(true)
})
