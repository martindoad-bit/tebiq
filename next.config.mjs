/** @type {import('next').NextConfig} */
const nextConfig = {
  // @react-pdf/renderer uses Node.js APIs and must not be bundled by webpack
  serverExternalPackages: ['@react-pdf/renderer'],
}

export default nextConfig
