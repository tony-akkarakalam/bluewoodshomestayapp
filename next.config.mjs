/** @type {import('next').NextConfig} */
const nextConfig = {
  output: "export",

  images: {
    unoptimized: true,

    formats: ["image/avif", "image/webp"]
  },

  reactStrictMode: true,

  poweredByHeader: false,

  compress: true
};

export default nextConfig;