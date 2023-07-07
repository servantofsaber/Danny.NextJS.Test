/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
}

module.exports = {
  reactStrictMode:false,
  webpack5:true,
  webpack:(config)=>{
    config.resolve.fallback = {fs :false};

    return config;
  }
}
