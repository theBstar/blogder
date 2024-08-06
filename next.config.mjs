/** @type {import('next').NextConfig} */

const nextConfig = {
  output:
    process.env.NEXT_PUBLIC_ENVIRONMENT === "production" ? "export" : undefined,
  api: {
    bodyParser: false,
  },
  images: { unoptimized: true },
};

export default nextConfig;
