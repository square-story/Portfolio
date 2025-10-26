/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  experimental: {
    optimizeCss: true,
  },
  // Optimize font loading for Vercel
  optimizeFonts: true,
};

export default nextConfig;
