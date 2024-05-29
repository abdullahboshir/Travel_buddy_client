/** @type {import('next').NextConfig} */
const nextConfig = {
  middleware: true,
    images: {
        remotePatterns: [
          {
            protocol: 'https',
            hostname: '**',
          },
        ],
      },
};

module.exports = nextConfig;
