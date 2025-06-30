/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '913bzwh326opr1qd.public.blob.vercel-storage.com',
      },
    ],
  },
};

export default nextConfig;
