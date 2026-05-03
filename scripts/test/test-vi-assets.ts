/**
 * TEBIQ V07 Quiet Brow VI assets smoke.
 *
 * Asserts that all assets the app references at build- and run-time
 * exist on disk under public/. Catches "logo file moved / renamed
 * but reference not updated" silent breakage. Does not validate file
 * contents — just presence.
 *
 * Source of truth: ~/Desktop/TEBIQ_VISUAL_V07_HANDOFF (handoff README
 * §1-9). This smoke mirrors that list, restricted to the production
 * subset (no source/, no preview/).
 */
import { existsSync } from 'fs'
import path from 'path'

const PUBLIC_DIR = path.resolve(process.cwd(), 'public')

const REQUIRED_FILES: string[] = [
  // Root favicons (referenced by app/layout.tsx)
  'favicon.ico',
  'favicon-16.png',
  'favicon-32.png',
  'apple-touch-icon.png',

  // SVG (used by Logo / AdminNav / SEO routes)
  'brand/tebiq-v07/svg/tebiq-v07-app-icon.svg',
  'brand/tebiq-v07/svg/tebiq-v07-logo-horizontal.svg',
  'brand/tebiq-v07/svg/tebiq-v07-logo-vertical.svg',
  'brand/tebiq-v07/svg/tebiq-v07-monochrome.svg',
  'brand/tebiq-v07/svg/tebiq-v07-dark-mode.svg',
  'brand/tebiq-v07/svg/tebiq-v07-dialogue-bubble.svg',
  'brand/tebiq-v07/svg/tebiq-v07-symbol-mark.svg',

  // App icon PNG (OG image at 512)
  'brand/tebiq-v07/app-icon/tebiq-v07-app-icon-1024.png',
  'brand/tebiq-v07/app-icon/tebiq-v07-app-icon-512.png',
  'brand/tebiq-v07/app-icon/tebiq-v07-app-icon-256.png',
  'brand/tebiq-v07/app-icon/tebiq-v07-app-icon-180.png',
  'brand/tebiq-v07/app-icon/tebiq-v07-app-icon-128.png',
  'brand/tebiq-v07/app-icon/tebiq-v07-app-icon-64.png',
  'brand/tebiq-v07/app-icon/tebiq-v07-app-icon-32.png',

  // iOS icon set (homescreen / settings / spotlight)
  'brand/tebiq-v07/ios/ios-icon-1024.png',
  'brand/tebiq-v07/ios/ios-icon-180.png',
  'brand/tebiq-v07/ios/ios-icon-167.png',
  'brand/tebiq-v07/ios/ios-icon-152.png',
  'brand/tebiq-v07/ios/ios-icon-120.png',
  'brand/tebiq-v07/ios/ios-icon-87.png',
  'brand/tebiq-v07/ios/ios-icon-80.png',
  'brand/tebiq-v07/ios/ios-icon-76.png',
  'brand/tebiq-v07/ios/ios-icon-60.png',
  'brand/tebiq-v07/ios/ios-icon-58.png',
  'brand/tebiq-v07/ios/ios-icon-40.png',
  'brand/tebiq-v07/ios/ios-icon-29.png',
  'brand/tebiq-v07/ios/ios-icon-20.png',

  // Android icon set
  'brand/tebiq-v07/android/android-icon-512.png',
  'brand/tebiq-v07/android/android-icon-192.png',
  'brand/tebiq-v07/android/android-icon-144.png',
  'brand/tebiq-v07/android/android-icon-96.png',
  'brand/tebiq-v07/android/android-icon-72.png',
  'brand/tebiq-v07/android/android-icon-48.png',
  'brand/tebiq-v07/android/android-icon-36.png',

  // PWA (per handoff README §9)
  'brand/tebiq-v07/pwa/pwa-icon-192.png',
  'brand/tebiq-v07/pwa/pwa-icon-512.png',
  'brand/tebiq-v07/pwa/pwa-maskable-192.png',
  'brand/tebiq-v07/pwa/pwa-maskable-512.png',
]

// Files that MUST NOT be in public/ — production exclusion list.
// (Source / preview belong in docs or designer handoff, not /public.)
const FORBIDDEN_FILES: string[] = [
  'brand/tebiq-v07/source',
  'brand/tebiq-v07/preview',
]

function main() {
  const missing: string[] = []
  for (const rel of REQUIRED_FILES) {
    const abs = path.join(PUBLIC_DIR, rel)
    if (!existsSync(abs)) missing.push(rel)
  }
  const presentForbidden: string[] = []
  for (const rel of FORBIDDEN_FILES) {
    const abs = path.join(PUBLIC_DIR, rel)
    if (existsSync(abs)) presentForbidden.push(rel)
  }

  let ok = true
  if (missing.length > 0) {
    ok = false
    console.log(`MISSING ${missing.length} required asset(s):`)
    for (const m of missing) console.log(`  └ public/${m}`)
  }
  if (presentForbidden.length > 0) {
    ok = false
    console.log(`FORBIDDEN ${presentForbidden.length} path(s) present in public/ (should live in docs/ or be ignored):`)
    for (const f of presentForbidden) console.log(`  └ public/${f}`)
  }

  console.log(`VI assets: ${ok ? 'PASS' : 'FAIL'} — required ${REQUIRED_FILES.length - missing.length}/${REQUIRED_FILES.length} present, ${presentForbidden.length} forbidden present`)
  if (!ok) process.exit(1)
}

main()
