/** @type {import('next').NextConfig} */
console.log(process.env.NEXT_PUBLIC_ENVIRONMENT);
const nextConfig = {
  output: "export",
  api: {
    bodyParser: false,
  },
  images: { unoptimized: true },
};

export default nextConfig;
