/** @type {import('next').NextConfig} */

const nextConfig = {
  output: "export",
  api: {
    bodyParser: false,
  },
  images: { unoptimized: true },
};

export default nextConfig;
