/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        // protocol: "https",
        hostname: "localhost",
        // port: "",
        pathname: "/rooms/**",
      },
    ],
  },
};

module.exports = nextConfig;
