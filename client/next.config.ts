import path from 'path';
import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  reactStrictMode: true,
  transpilePackages: ['lucide-react'],
  outputFileTracingRoot: __dirname,
  output: 'standalone',
};

export default nextConfig;
