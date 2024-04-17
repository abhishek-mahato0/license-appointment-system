/** @type {import('next').NextConfig} */

module.exports = {
  env: {
    WEB_URL: "http://localhost:3000/api/",
    VERIFY_URL: "http://localhost:3000/verify/",
    BASE_URL: "http://localhost:3000",
    KHALTI_RETURN_URL: "http://localhost:3000/payment/verify/",
    KHALTI_SECRET_KEY: "a558b8820fa84abca6fd20cf6c51a0f0",
    FLASK_SERVER: "http://127.0.0.1:5000",
  },
};
