/** @type {import('next').NextConfig} */
const nextConfig = {
  pageExtensions: ['ts', 'tsx', 'js', 'jsx', 'md', 'mdx'],
  experimental: {
    // OG images read fonts, articles and photos via fs at build time
    outputFileTracingIncludes: {
      '/blog/[slug]/opengraph-image': [
        './assets/**/*',
        './content/articles/**/*',
        './public/images/**/*',
      ],
    },
  },
};

export default nextConfig;
