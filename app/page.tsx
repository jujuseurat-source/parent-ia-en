import Link from 'next/link'
import { getAllArticles } from '@/lib/articles'
import ArticleCard from '@/components/ArticleCard'
import Newsletter from '@/components/Newsletter'

export default function HomePage() {
  const articles = getAllArticles().slice(0, 3)

  return (
    <div>
      {/* Hero */}
      <section className="bg-gradient-to-b from-beige-100 to-beige-50 px-4 py-16 text-center">
        <div className="max-w-2xl mx-auto">
          <div className="text-5xl mb-4">🌱</div>
          <h1 className="text-4xl font-bold text-brun mb-3 leading-tight">
            Growing Up with AI
          </h1>
          <p className="text-brun-light text-xl mb-2 font-medium">
            Parent AI
          </p>
          <p className="text-brun-light text-base leading-relaxed mb-8 max-w-xl mx-auto">
            A father teaching artificial intelligence to his 6 and 3-year-old children
            through concrete, playful, screen-free activities.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Link
              href="/blog"
              className="inline-block bg-terracotta hover:bg-terracotta-500 text-white font-semibold px-6 py-3 rounded-xl transition-colors"
            >
              Read the articles
            </Link>
            <Link
              href="/about"
              className="inline-block bg-beige-200 hover:bg-sauge-100 text-brun font-semibold px-6 py-3 rounded-xl transition-colors"
            >
              Our story
            </Link>
          </div>
        </div>
      </section>

      {/* Pillars */}
      <section className="max-w-3xl mx-auto px-4 py-12">
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-center">
          {[
            { icon: '🎯', titre: 'Hands-on', texte: 'Every article = an activity tested with my kids' },
            { icon: '🙅', titre: 'Screen-free', texte: 'AI can be learned with pencils, paper, and play' },
            { icon: '❤️', titre: 'Warm', texte: 'Failures, laughs, and discoveries shared together' },
          ].map(({ icon, titre, texte }) => (
            <div key={titre} className="bg-white rounded-2xl p-5 border border-beige-200">
              <div className="text-3xl mb-2">{icon}</div>
              <div className="font-bold text-brun mb-1">{titre}</div>
              <p className="text-brun-light text-sm">{texte}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Latest articles */}
      {articles.length > 0 && (
        <section className="max-w-3xl mx-auto px-4 pb-16">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold text-brun">Latest articles</h2>
            <Link href="/blog" className="text-terracotta text-sm font-medium hover:underline">
              See all →
            </Link>
          </div>
          <div className="flex flex-col gap-4">
            {articles.map(article => (
              <ArticleCard
                key={article.slug}
                slug={article.slug}
                frontmatter={article.frontmatter}
              />
            ))}
          </div>
        </section>
      )}

      {articles.length === 0 && (
        <section className="max-w-3xl mx-auto px-4 pb-16 text-center">
          <div className="bg-sauge-100 rounded-2xl p-10">
            <div className="text-4xl mb-4">✍️</div>
            <p className="text-brun font-semibold text-lg">Adventures coming soon!</p>
            <p className="text-brun-light mt-2">The first article is on its way.</p>
          </div>
        </section>
      )}

      {/* Newsletter */}
      <section className="max-w-xl mx-auto px-4 pb-16">
        <Newsletter />
      </section>
    </div>
  )
}
