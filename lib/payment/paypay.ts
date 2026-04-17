import crypto from 'crypto'

export interface PayPaySession {
  merchantPaymentId: string
  amount: number
  orderDescription: string
  redirectUrl: string
}

export interface PayPayResponse {
  resultInfo: { code: string; message: string }
  data?: {
    paymentId?: string
    status?: string
    url?: string
  }
}

function getBaseUrl(): string {
  return process.env.PAYPAY_SANDBOX === 'true'
    ? 'https://stg.paypay.ne.jp'
    : 'https://api.paypay.ne.jp'
}

function buildHmacHeader(
  method: string,
  path: string,
  body: string,
  epoch: number
): string {
  const apiKey = process.env.PAYPAY_API_KEY || ''
  const apiSecret = process.env.PAYPAY_API_SECRET || ''
  const nonce = crypto.randomBytes(8).toString('hex')
  const contentType = 'application/json'
  const hash = body
    ? crypto.createHash('sha256').update(body).digest('base64')
    : 'empty'

  const message = [apiKey, method, path, epoch, nonce, contentType, hash].join('\n')
  const hmac = crypto.createHmac('sha256', apiSecret).update(message).digest('base64')
  return `hmac OPA-Auth:${apiKey}:${nonce}:epoch=${epoch}:sha256/base64=${hmac}`
}

export async function createPaymentSession(params: PayPaySession): Promise<string> {
  const path = '/v2/qr/codes'
  const epoch = Math.floor(Date.now() / 1000)
  const body = JSON.stringify({
    merchantPaymentId: params.merchantPaymentId,
    amount: { amount: params.amount, currency: 'JPY' },
    codeType: 'ORDER_QR',
    orderDescription: params.orderDescription,
    redirectUrl: params.redirectUrl,
    redirectType: 'WEB_LINK',
    orderItems: [
      {
        name: params.orderDescription,
        quantity: 1,
        unitPrice: { amount: params.amount, currency: 'JPY' },
      },
    ],
  })

  const res = await fetch(`${getBaseUrl()}${path}`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: buildHmacHeader('POST', path, body, epoch),
      'X-ASSUME-MERCHANT': process.env.PAYPAY_MERCHANT_ID || '',
    },
    body,
  })

  const data = (await res.json()) as PayPayResponse
  if (data.resultInfo.code !== 'SUCCESS') {
    throw new Error(`PayPay error: ${data.resultInfo.message}`)
  }
  return data.data?.url || ''
}

export async function getPaymentStatus(merchantPaymentId: string): Promise<string> {
  const path = `/v2/qr/codes/payments/${merchantPaymentId}`
  const epoch = Math.floor(Date.now() / 1000)

  const res = await fetch(`${getBaseUrl()}${path}`, {
    method: 'GET',
    headers: {
      Authorization: buildHmacHeader('GET', path, '', epoch),
      'X-ASSUME-MERCHANT': process.env.PAYPAY_MERCHANT_ID || '',
    },
  })

  const data = (await res.json()) as PayPayResponse
  return data.data?.status || 'UNKNOWN'
}
