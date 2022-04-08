/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: ["swiperjs.com", "storage.googleapis.com", "res.cloudinary.com"],
  },
}

module.exports = nextConfig
