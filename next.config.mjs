// next.config.mjs
/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  env: {
    NEXT_PUBLIC_COCKTAIL_API_KEY: process.env.NEXT_PUBLIC_COCKTAIL_API_KEY,
  },
  images: {
    domains: ['www.thecocktaildb.com'],
  },
  pageExtensions: ['mdx', 'jsx', 'js', 'ts', 'tsx'],
};

export default nextConfig;
