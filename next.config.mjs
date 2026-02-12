/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  // Optional: Change links `/me` -> `/me/` and adhere to standard behavior
  trailingSlash: true,
  // Ensure images are unoptimized for static export
  images: {
    unoptimized: true,
  },
};

export default nextConfig;
