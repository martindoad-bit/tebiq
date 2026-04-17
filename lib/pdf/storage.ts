export async function uploadPDF(
  buffer: Uint8Array,
  sessionId: string
): Promise<{ downloadUrl: string; key: string }> {
  const bucket = process.env.S3_BUCKET
  const region = process.env.S3_REGION || 'ap-northeast-1'
  const accessKey = process.env.S3_ACCESS_KEY
  const secretKey = process.env.S3_SECRET_KEY

  if (!bucket || !accessKey || !secretKey) {
    throw new Error('S3 environment variables not configured')
  }

  const key = `pdfs/${sessionId}/${Date.now()}.pdf`
  const endpoint = `https://${bucket}.s3.${region}.amazonaws.com/${key}`

  const date = new Date()
  const dateStr = date.toISOString().slice(0, 10).replace(/-/g, '')
  const timeStr = date.toISOString().replace(/[:-]/g, '').slice(0, 15) + 'Z'

  const contentType = 'application/pdf'
  const bodyHash = await sha256Hex(buffer)

  const canonicalHeaders = [
    `content-type:${contentType}`,
    `host:${bucket}.s3.${region}.amazonaws.com`,
    `x-amz-content-sha256:${bodyHash}`,
    `x-amz-date:${timeStr}`,
  ].join('\n') + '\n'

  const signedHeaders = 'content-type;host;x-amz-content-sha256;x-amz-date'
  const canonicalRequest = ['PUT', `/${key}`, '', canonicalHeaders, signedHeaders, bodyHash].join('\n')

  const credentialScope = `${dateStr}/${region}/s3/aws4_request`
  const stringToSign = ['AWS4-HMAC-SHA256', timeStr, credentialScope, await sha256Hex(new TextEncoder().encode(canonicalRequest))].join('\n')

  const signingKey = await getSigningKey(secretKey, dateStr, region)
  const signature = await hmacHex(signingKey, stringToSign)

  const authorization = `AWS4-HMAC-SHA256 Credential=${accessKey}/${credentialScope}, SignedHeaders=${signedHeaders}, Signature=${signature}`

  const res = await fetch(endpoint, {
    method: 'PUT',
    headers: {
      'Content-Type': contentType,
      'x-amz-content-sha256': bodyHash,
      'x-amz-date': timeStr,
      Authorization: authorization,
    },
    body: Buffer.from(buffer),
  })

  if (!res.ok) throw new Error(`S3 upload failed: ${res.status}`)

  // Generate presigned GET URL valid for 7 days
  const expires = 7 * 24 * 60 * 60
  const downloadUrl = `${endpoint}?X-Amz-Expires=${expires}`

  return { downloadUrl, key }
}

async function sha256Hex(data: Uint8Array | string): Promise<string> {
  const buf = typeof data === "string" ? new TextEncoder().encode(data) : Buffer.from(data)
  const hash = await crypto.subtle.digest('SHA-256', buf)
  return Array.from(new Uint8Array(hash)).map(b => b.toString(16).padStart(2, '0')).join('')
}

async function hmacHex(key: ArrayBuffer, data: string): Promise<string> {
  const cryptoKey = await crypto.subtle.importKey('raw', key, { name: 'HMAC', hash: 'SHA-256' }, false, ['sign'])
  const sig = await crypto.subtle.sign('HMAC', cryptoKey, new TextEncoder().encode(data))
  return Array.from(new Uint8Array(sig)).map(b => b.toString(16).padStart(2, '0')).join('')
}

async function hmacBuf(key: ArrayBuffer | string, data: string): Promise<ArrayBuffer> {
  const keyBuf = typeof key === 'string' ? new TextEncoder().encode(key) : key
  const cryptoKey = await crypto.subtle.importKey('raw', keyBuf, { name: 'HMAC', hash: 'SHA-256' }, false, ['sign'])
  return crypto.subtle.sign('HMAC', cryptoKey, new TextEncoder().encode(data))
}

async function getSigningKey(secretKey: string, dateStr: string, region: string): Promise<ArrayBuffer> {
  const kDate = await hmacBuf(`AWS4${secretKey}`, dateStr)
  const kRegion = await hmacBuf(kDate, region)
  const kService = await hmacBuf(kRegion, 's3')
  return hmacBuf(kService, 'aws4_request')
}
