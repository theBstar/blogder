/** @type {import('next').NextConfig} */
const nextConfig = {
  output:
    process.env.NEXT_PUBLIC_ENVIRONMENT === "production" ? "export" : undefined,
  api: {
    bodyParser: false,
  },
  experimental: {
    serverActions: true,
  },
};

export default nextConfig;
