export function isProtectedAdminPath(pathname: string): boolean {
  return pathname === '/admin'
    || pathname.startsWith('/admin/')
    || pathname === '/internal'
    || pathname.startsWith('/internal/')
    || pathname === '/api/admin'
    || pathname.startsWith('/api/admin/')
    || pathname === '/api/internal'
    || pathname.startsWith('/api/internal/')
}

export function isAdminKeyAccepted(input: {
  pathname: string
  providedKey: string | null | undefined
  providedCookieKey?: string | null | undefined
  configuredKey: string | null | undefined
}): boolean {
  if (!isProtectedAdminPath(input.pathname)) return true
  const configuredKey = input.configuredKey?.trim()
  if (!configuredKey) return false
  return input.providedKey === configuredKey
    || input.providedCookieKey === configuredKey
}
