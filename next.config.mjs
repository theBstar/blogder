/** @type {import('next').NextConfig} */

const nextConfig = {
  output: "export",
  api: {
    bodyParser: false,
  },
  images: { unoptimized: true },
  basePath: "https://www.thebstar.com/blogder/",
};

export default nextConfig;
