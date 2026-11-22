/** @type {import('next').NextConfig} */
const path = require('path')

const nextConfig = {
  output: 'export',
  images: {
    unoptimized: true,
  },
  experimental: {
    mdxRs: false,
  },
  webpack: (config, { isServer }) => {
    config.resolve.alias = {
      ...config.resolve.alias,
      '@': path.resolve(__dirname, 'src'),
      '@/components': path.resolve(__dirname, 'src/components'),
      '@/content': path.resolve(__dirname, 'src/content'),
      '@/lib': path.resolve(__dirname, 'src/lib'),
    }
    return config
  },
}

module.exports = nextConfig