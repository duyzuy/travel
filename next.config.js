/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: [
      "res.klook.com",
      "localhost",
      "storage.googleapis.com",
      "vj-prod-website-cms.s3.ap-southeast-1.amazonaws.com",
    ],
  },
  env: {
    GRAPHQL_ENDPOINT: "https://cqy2y.sse.codesandbox.io",
  },
};

module.exports = nextConfig;
