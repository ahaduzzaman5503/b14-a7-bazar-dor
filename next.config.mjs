/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    agentFeedback: true,
  },

  cacheComponents: true,
  partialPrerendering: true,
  reactCompiler: true,

  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "lh3.googleusercontent.com",
      },
            {
        protocol: "https",
        hostname: "**",
      },
    ],
  },

  turbopack: {
    rules: {
      "*.css": {
        loaders: ["@tailwindcss/turbopack"],
        as: "*.css",
      },
    },
  },
};

export default nextConfig;
