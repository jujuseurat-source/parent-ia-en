import { getAllArticles } from '@/lib/articles'
import BlogClient from '@/components/BlogClient'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Blog',
  description: 'Toutes les activités testées en famille pour apprendre l\'intelligence artificielle à mes enfants : classification, mémoire, patterns, langage.',
  alternates: {
    canonical: 'https://www.parent-ia.fr/blog',
  },
  openGraph: {
    title: 'Blog | Parent IA',
    description: 'Toutes les activités testées en famille pour apprendre l\'IA aux enfants de façon ludique et sans écran.',
    url: 'https://www.parent-ia.fr/blog',
    type: 'website',
  },
}

export default function BlogPage() {
  const articles = getAllArticles()

  return (
    <div className="max-w-3xl mx-auto px-4 py-12">
      <div className="mb-10">
        <h1 className="text-3xl font-bold text-brun mb-3">Le blog</h1>
        <p className="text-brun-light text-lg leading-relaxed">
          Toutes nos aventures avec l&apos;IA : des activités concrètes testées en famille,
          avec ce qui a marché, ce qui a moins marché, et ce qu&apos;on en a retenu.
        </p>
      </div>

      {articles.length === 0 ? (
        <div className="bg-sauge-100 rounded-2xl p-10 text-center">
          <div className="text-4xl mb-4">✍️</div>
          <p className="text-brun font-semibold text-lg">Premiers articles bientôt !</p>
          <p className="text-brun-light mt-2">Revenez vite, les aventures commencent.</p>
        </div>
      ) : (
        <BlogClient articles={articles} />
      )}
    </div>
  )
}
