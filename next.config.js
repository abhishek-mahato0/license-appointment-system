/** @type {import('next').NextConfig} */

module.exports = {
  env: {
    WEB_URL: "http://localhost:3000/api/",
    VERIFY_URL: "http://localhost:3000/verify/",
    BASE_URL: "http://localhost:3000",
    FLASK_SERVER: "http://127.0.0.1:5000",
  },
  experimental: {
    missingSuspenseWithCSRBailout: false,
  },
};
