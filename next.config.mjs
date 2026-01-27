import { fileURLToPath } from 'node:url';
import path from 'node:path';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

/** @type {import('next').NextConfig} */
const nextConfig = {
  turbopack: {
    // Ensure Next.js uses this workspace as the root to avoid lockfile mis-detection
    root: __dirname,
  },
};

export default nextConfig;
