import Link from 'next/link'
import Image from 'next/image'
import { getAllArticles } from '@/lib/articles'
import ArticleCard from '@/components/ArticleCard'
import Newsletter from '@/components/Newsletter'

export default function HomePage() {
  const allArticles = getAllArticles()
  const articles = allArticles.slice(0, 3)
  // Hero photo: latest article with an image (stays fresh on its own)
  const heroArticle = allArticles.find(a => a.frontmatter.image)

  return (
    <div>
      {/* Hero */}
      <section className="bg-gradient-to-b from-beige-100 to-beige-50 px-4 pt-14 pb-16 overflow-hidden">
        <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-[1.1fr,0.9fr] gap-12 items-center">
          <div>
            <span className="inline-flex items-center gap-2 bg-white border border-beige-300 px-4 py-1.5 rounded-full text-sm font-semibold text-sauge-600 mb-6">
              <span className="w-2 h-2 rounded-full bg-sauge" aria-hidden="true"></span>
              {allArticles.length} activities tested as a family, zero screens
            </span>
            <h1 className="font-serif font-semibold text-4xl sm:text-5xl lg:text-[3.4rem] leading-[1.1] text-brun mb-5 text-balance">
              Teaching kids AI,{' '}
              <em className="text-terracotta">hands in the real world</em>.
            </h1>
            <p className="text-brun-light text-lg leading-relaxed mb-8 max-w-xl">
              I&apos;m Julien, dad of Romane (6) and Meryl (3). I document our
              experiments to help them discover artificial intelligence with
              paper, pencils, and plenty of failed attempts.
            </p>
            <div className="flex flex-col sm:flex-row gap-3">
              <Link
                href="/blog"
                className="inline-block text-center bg-terracotta hover:bg-terracotta-500 text-white font-semibold px-7 py-3 rounded-full transition-all hover:-translate-y-0.5"
              >
                Read the articles
              </Link>
              <Link
                href="/about"
                className="inline-block text-center bg-transparent border-2 border-brun-lighter hover:border-brun-light hover:bg-white text-brun font-semibold px-7 py-3 rounded-full transition-all"
              >
                Our story
              </Link>
            </div>
          </div>

          {heroArticle?.frontmatter.image && (
            <div className="relative hidden md:block">
              <div className="absolute -inset-3 border-2 border-dashed border-brun-lighter/50 rounded-3xl -rotate-1" aria-hidden="true"></div>
              <Link href={`/blog/${heroArticle.slug}`} className="block group">
                <div className="relative aspect-[4/3] rounded-2xl overflow-hidden rotate-1 shadow-xl shadow-brun/20 group-hover:rotate-0 transition-transform duration-300">
                  <Image
                    src={heroArticle.frontmatter.image}
                    alt={heroArticle.frontmatter.titre}
                    fill
                    sizes="(max-width: 768px) 100vw, 45vw"
                    priority
                    className="object-cover"
                  />
                </div>
                <span className="absolute -bottom-4 left-6 bg-white px-4 py-2 rounded-xl font-serif italic text-sm text-brun-light shadow-md -rotate-1">
                  {heroArticle.frontmatter.titre}
                </span>
              </Link>
            </div>
          )}
        </div>
      </section>

      {/* Pillars */}
      <section className="max-w-5xl mx-auto px-4 py-10">
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
          {[
            {
              icon: (
                <svg className="w-11 h-11" viewBox="0 0 44 44" fill="none" aria-hidden="true">
                  <rect x="6" y="10" width="32" height="26" rx="4" fill="#F2E8D5" />
                  <circle cx="16" cy="20" r="4" fill="#B86A3E" />
                  <path d="M10 32 L20 24 L27 29 L34 22 L34 32 Z" fill="#7A9E7A" />
                  <path d="M30 6 L32 11 L37 12 L32 14 L30 19 L28 14 L23 12 L28 11 Z" fill="#B86A3E" />
                </svg>
              ),
              titre: 'Tested for real',
              texte: 'Every article tells the story of an activity actually done with my kids. Photos and reactions included.',
            },
            {
              icon: (
                <svg className="w-11 h-11" viewBox="0 0 44 44" fill="none" aria-hidden="true">
                  <path d="M8 34 C8 20 14 10 22 10 C30 10 36 20 36 34 Z" fill="#F2E8D5" />
                  <path d="M14 34 C14 24 17 16 22 16 C27 16 30 24 30 34 Z" fill="#7A9E7A" />
                  <rect x="20" y="4" width="4" height="10" rx="2" fill="#B86A3E" />
                </svg>
              ),
              titre: 'Screen-free',
              texte: 'AI can be explained with bottle caps, a hand-drawn target, and a secret notebook. Screens can wait.',
            },
            {
              icon: (
                <svg className="w-11 h-11" viewBox="0 0 44 44" fill="none" aria-hidden="true">
                  <path d="M22 38 C10 30 5 22 5 15 C5 9 10 6 14 6 C18 6 21 9 22 12 C23 9 26 6 30 6 C34 6 39 9 39 15 C39 22 34 30 22 38 Z" fill="#B86A3E" opacity=".9" />
                  <path d="M16 20 L20 24 L29 14" stroke="#F5EFE0" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" fill="none" />
                </svg>
              ),
              titre: 'Failures included',
              texte: "Sometimes it works, sometimes Meryl knocks everything over. We tell both — that's how you learn.",
            },
          ].map(({ icon, titre, texte }) => (
            <div
              key={titre}
              className="bg-white rounded-2xl p-7 border border-beige-300 hover:-translate-y-1 hover:shadow-lg transition-all duration-200"
            >
              <div className="mb-3">{icon}</div>
              <div className="font-serif font-semibold text-lg text-brun mb-1.5">{titre}</div>
              <p className="text-brun-light text-sm leading-relaxed">{texte}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Latest articles */}
      {articles.length > 0 && (
        <section className="max-w-5xl mx-auto px-4 py-12">
          <div className="flex items-baseline justify-between mb-8">
            <h2 className="font-serif text-3xl font-semibold text-brun">Latest activities</h2>
            <Link href="/blog" className="text-terracotta text-sm font-semibold hover:underline">
              All activities →
            </Link>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
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
            <p className="font-serif text-brun font-semibold text-lg">Adventures coming soon!</p>
            <p className="text-brun-light mt-2">The first article is on its way.</p>
          </div>
        </section>
      )}

      {/* Quote */}
      <section className="max-w-5xl mx-auto px-4 py-6">
        <div className="bg-beige-200 rounded-3xl px-8 py-14 text-center">
          <p className="font-serif italic text-2xl sm:text-[1.7rem] leading-snug text-brun max-w-xl mx-auto mb-4">
            &ldquo;It&apos;s like learning to ride a bike, but longer.&rdquo;
          </p>
          <p className="text-sm font-semibold text-brun-light">
            Romane, 6 — after seventeen missed throws
          </p>
        </div>
      </section>

      {/* Newsletter */}
      <section className="max-w-5xl mx-auto px-4 py-12">
        <Newsletter />
      </section>
    </div>
  )
}
