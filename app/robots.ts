import { MetadataRoute } from 'next'

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
        disallow: [],
      },
    ],
    sitemap: 'https://www.parent-ia.fr/sitemap.xml',
    host: 'https://www.parent-ia.fr',
  }
}
