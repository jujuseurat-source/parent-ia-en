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
            Grandir avec l&apos;IA
          </h1>
          <p className="text-brun-light text-xl mb-2 font-medium">
            Parent IA
          </p>
          <p className="text-brun-light text-base leading-relaxed mb-8 max-w-xl mx-auto">
            Un père qui apprend l&apos;intelligence artificielle à ses enfants de 6 et 9 ans —
            des activités concrètes, ludiques, et sans écran.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Link
              href="/blog"
              className="inline-block bg-terracotta hover:bg-terracotta-500 text-white font-semibold px-6 py-3 rounded-xl transition-colors"
            >
              Lire les articles
            </Link>
            <Link
              href="/a-propos"
              className="inline-block bg-beige-200 hover:bg-sauge-100 text-brun font-semibold px-6 py-3 rounded-xl transition-colors"
            >
              Notre histoire
            </Link>
          </div>
        </div>
      </section>

      {/* Pilliers */}
      <section className="max-w-3xl mx-auto px-4 py-12">
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-center">
          {[
            { icon: '🎯', titre: 'Concret', texte: 'Chaque article = une activité testée avec mes enfants' },
            { icon: '🙅', titre: 'Sans écran', texte: "L'IA s'apprend aussi avec des crayons, du papier, et du jeu" },
            { icon: '❤️', titre: 'Chaleureux', texte: "Des ratés, des fous rires, des découvertes partagées" },
          ].map(({ icon, titre, texte }) => (
            <div key={titre} className="bg-white rounded-2xl p-5 border border-beige-200">
              <div className="text-3xl mb-2">{icon}</div>
              <div className="font-bold text-brun mb-1">{titre}</div>
              <p className="text-brun-light text-sm">{texte}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Derniers articles */}
      {articles.length > 0 && (
        <section className="max-w-3xl mx-auto px-4 pb-16">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold text-brun">Derniers articles</h2>
            <Link href="/blog" className="text-terracotta text-sm font-medium hover:underline">
              Voir tout →
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
            <p className="text-brun font-semibold text-lg">Les aventures commencent bientôt !</p>
            <p className="text-brun-light mt-2">Le premier article arrive très prochainement.</p>
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
