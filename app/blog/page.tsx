import { getAllArticles } from '@/lib/articles'
import BlogClient from '@/components/BlogClient'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Blog',
  description: 'All the activities tested with my family to teach artificial intelligence to kids: classification, memory, patterns, language.',
  alternates: {
    canonical: 'https://www.parent-ia.eu/blog',
  },
  openGraph: {
    title: 'Blog | Parent AI',
    description: 'All the activities tested with my family to teach AI to kids in a playful, screen-free way.',
    url: 'https://www.parent-ia.eu/blog',
    type: 'website',
  },
}

export default function BlogPage() {
  const articles = getAllArticles()

  return (
    <div className="max-w-3xl mx-auto px-4 py-12">
      <div className="mb-10">
        <h1 className="text-3xl font-bold text-brun mb-3">The blog</h1>
        <p className="text-brun-light text-lg leading-relaxed">
          All our AI adventures: concrete activities tested as a family,
          with what worked, what didn&apos;t, and what we learned from it.
        </p>
      </div>

      {articles.length === 0 ? (
        <div className="bg-sauge-100 rounded-2xl p-10 text-center">
          <div className="text-4xl mb-4">✍️</div>
          <p className="text-brun font-semibold text-lg">First articles coming soon!</p>
          <p className="text-brun-light mt-2">Come back soon, the adventures are starting.</p>
        </div>
      ) : (
        <BlogClient articles={articles} />
      )}
    </div>
  )
}
