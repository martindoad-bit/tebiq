export function isProtectedAdminPath(pathname: string): boolean {
  return pathname === '/admin'
    || pathname.startsWith('/admin/')
    || pathname === '/api/admin'
    || pathname.startsWith('/api/admin/')
}

export function isAdminKeyAccepted(input: {
  pathname: string
  providedKey: string | null | undefined
  configuredKey: string | null | undefined
}): boolean {
  if (!isProtectedAdminPath(input.pathname)) return true
  const configuredKey = input.configuredKey?.trim()
  if (!configuredKey) return false
  return input.providedKey === configuredKey
}
