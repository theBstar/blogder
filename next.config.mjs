/** @type {import('next').NextConfig} */

const nextConfig = {
  output: process.env.NODE_ENV !== "development" ? "export" : undefined,
  api: {
    bodyParser: false,
  },
  images: { unoptimized: true },
};

export default nextConfig;
