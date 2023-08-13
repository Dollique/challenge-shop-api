/** @type {import('next').NextConfig} */

const API_PATH = process.env.API_PATH;
const API_HOST = process.env.API_HOST;
const API_IMG_PROTOCOL = process.env.API_IMG_PROTOCOL;
const API_IMG_HOST = process.env.API_IMG_HOST;

const nextConfig = {
  env: { // make env available for client side
    API_PATH,
    API_PRODUCT_PROPERTY_PATH: process.env.API_PRODUCT_PROPERTY_PATH,
  },
  reactStrictMode: true,
  async rewrites() {
    return [
      {
        source: `${API_PATH}:slug*`,
        destination: `https://${API_HOST}${API_PATH}:slug*`,
      },
    ]
  },
  images: {
    domains: [`${API_IMG_PROTOCOL}://${API_IMG_HOST}`],
    remotePatterns: [
      {
        protocol: API_IMG_PROTOCOL,
        hostname: API_IMG_HOST,
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
  async headers() {
    return [
      {
        // matching all API routes
        source: `${API_PATH}:slug*`,
        headers: [
          { key: "Access-Control-Allow-Credentials", value: "true" },
          { key: "Access-Control-Allow-Origin", value: `https://${API_HOST}` },
          { key: "Access-Control-Allow-Methods", value: "GET" },
          { key: "Access-Control-Allow-Headers", value: "X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version" },
        ]
      }
    ]
  },
}

module.exports = nextConfig
