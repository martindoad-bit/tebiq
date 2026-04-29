/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    outputFileTracingIncludes: {
      '/check/[visa]': [
        './docs/knowledge-seed/check-dimensions/**/*.md',
        './docs/knowledge-seed/dimensions-visa-specific/**/*.md',
      ],
      '/check/[visa]/[dimension]': [
        './docs/knowledge-seed/check-dimensions/**/*.md',
        './docs/knowledge-seed/dimensions-visa-specific/**/*.md',
      ],
    },
    serverComponentsExternalPackages: [
      'heic-convert',
      'heic-decode',
      'libheif-js',
    ],
  },
}

export default nextConfig
