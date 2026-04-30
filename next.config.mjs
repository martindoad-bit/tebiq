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
      '/decision-lab': [
        './docs/decision-seed-cards/**/*',
      ],
      '/decision-lab/[slug]': [
        './docs/decision-seed-cards/**/*',
      ],
      '/admin/review-lite': [
        './docs/decision-seed-cards/**/*',
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
