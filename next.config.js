/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ['amandita-products-uploads.s3.sa-east-1.amazonaws.com', 'drive.google.com', 'amandita-uploads.s3.sa-east-1.amazonaws.com', 
    'localhost:3000', '', '13geekstore.vercel.app', 'files.stripe.com', 'onedrive.live.com', '1drv.ms', 
    'phx02pap002files.storage.live.com', 'api.onedrive.com', 'photos.onedrive.com'],
  },
  reactStrictMode: true,
  typescript: {
    ignoreBuildErrors: false,
  },
}

module.exports = nextConfig
