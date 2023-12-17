/** @type {import('next').NextConfig} */
const nextConfig = {
  env: {
    GOOGLE_MAPS_API_KEY: process.env.GOOGLE_MAPS_API_KEY,
    FAST_API_URL: process.env.FAST_API_URL,
  },
};

module.exports = nextConfig;
