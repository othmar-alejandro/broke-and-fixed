import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
  images: {
    formats: ['image/avif', 'image/webp'],
  },
  async redirects() {
    return [
      {
        source: '/review',
        destination: 'https://search.google.com/local/writereview?placeid=ChIJ7VSW8vHbAgMRvNWjsiV5kII',
        permanent: false,
      },
    ]
  },
}

export default nextConfig
