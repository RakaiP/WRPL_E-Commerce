#!/bin/sh
set -e

echo 'Setting up customer app for development...'

# Create simple next.config.js
cat > next.config.js << 'EOF'
/** @type {import('next').NextConfig} */
const nextConfig = {
  typescript: {
    ignoreBuildErrors: true,
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
}

module.exports = nextConfig;
EOF

# Set development environment
export NEXT_TELEMETRY_DISABLED=1

# Start development server
echo "Starting development server..."
npm run dev -- -p 3001
