/** @type {import('next').NextConfig} */

const path = require('path')

const nextConfig = {
  env: { // make env available for client side
    API_PATH: process.env.API_PATH,
    API_PRODUCT_PROPERTY_PATH: process.env.API_PRODUCT_PROPERTY_PATH,
  },
  reactStrictMode: true,
  includePaths: [path.join(__dirname, 'styles')],
  async rewrites() {
    return [
      {
        source: process.env.API_SRC,
        destination: process.env.API_DEST,
      },
    ]
  },
  images: {
    domains: [process.env.API_IMG_URL],
    remotePatterns: [
      {
        protocol: process.env.API_IMG_PROTOCOL,
        hostname: process.env.API_IMG_HOST,
        port: '',
        pathname: '/**',
      },
    ],
  },
  async redirects() {
    return [
      {
        source: '/product',
        destination: '/',
        permanent: true,
      },
    ]
  },
}

module.exports = nextConfig
