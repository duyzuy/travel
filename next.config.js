/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ["res.klook.com", "localhost"],
  },
  env: {
    GRAPHQL_ENDPOINT: "https://cqy2y.sse.codesandbox.io",
  },
};

module.exports = nextConfig;
