import { getAllArticles } from '@/lib/articles'

const SITE_URL = 'https://www.parent-ai.eu'

export async function GET() {
  const articles = getAllArticles()

  const items = articles
    .map(article => {
      const url = `${SITE_URL}/blog/${article.slug}`
      const pubDate = new Date(article.frontmatter.date).toUTCString()
      const description = article.frontmatter.resume
        .replace(/&/g, '&amp;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;')
      const title = article.frontmatter.titre
        .replace(/&/g, '&amp;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;')

      return `
    <item>
      <title>${title}</title>
      <link>${url}</link>
      <guid isPermaLink="true">${url}</guid>
      <pubDate>${pubDate}</pubDate>
      <description>${description}</description>
      <category>${article.frontmatter.tags.join(', ')}</category>
    </item>`
    })
    .join('')

  const rss = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>Parent AI — Growing Up with AI</title>
    <link>${SITE_URL}</link>
    <description>Hands-on activities to teach AI to kids, screen-free and jargon-free.</description>
    <language>en-US</language>
    <atom:link href="${SITE_URL}/feed.xml" rel="self" type="application/rss+xml"/>
    <image>
      <url>${SITE_URL}/og-image.png</url>
      <title>Parent AI</title>
      <link>${SITE_URL}</link>
    </image>
    ${items}
  </channel>
</rss>`

  return new Response(rss, {
    headers: {
      'Content-Type': 'application/xml; charset=utf-8',
      'Cache-Control': 'public, max-age=3600, s-maxage=3600',
    },
  })
}
