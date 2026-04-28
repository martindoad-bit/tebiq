/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    serverComponentsExternalPackages: [
      'heic-convert',
      'heic-decode',
      'libheif-js',
    ],
  },
}

export default nextConfig
