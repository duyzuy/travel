/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ["res.klook.com", "localhost", "storage.googleapis.com"],
  },
  env: {
    GRAPHQL_ENDPOINT: "https://cqy2y.sse.codesandbox.io",
  },
};

module.exports = nextConfig;
