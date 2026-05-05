import { getArticleBySlug, getAllArticles, formatDate } from '@/lib/articles'
import { MDXRemote } from 'next-mdx-remote/rsc'
import { notFound } from 'next/navigation'
import Link from 'next/link'
import type { Metadata } from 'next'
import AudioPlayer from '@/components/AudioPlayer'
import Image from 'next/image'

const mdxComponents = { AudioPlayer, Image }

interface Props {
  params: { slug: string }
}

export async function generateStaticParams() {
  const articles = getAllArticles()
  return articles.map(a => ({ slug: a.slug }))
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const article = getArticleBySlug(params.slug)
  if (!article) return {}
  const { frontmatter, slug } = article
  const url = `https://www.parent-ia.fr/blog/${slug}`
  return {
    title: frontmatter.titre,
    description: frontmatter.resume,
    keywords: frontmatter.tags,
    authors: [{ name: 'Julien Seurat', url: 'https://www.parent-ia.fr/a-propos' }],
    openGraph: {
      type: 'article',
      url,
      title: frontmatter.titre,
      description: frontmatter.resume,
      publishedTime: frontmatter.date,
      authors: ['Julien Seurat'],
      tags: frontmatter.tags,
      siteName: 'Parent IA',
      locale: 'fr_FR',
    },
    twitter: {
      card: 'summary_large_image',
      title: frontmatter.titre,
      description: frontmatter.resume,
    },
    alternates: {
      canonical: url,
    },
  }
}

export default function ArticlePage({ params }: Props) {
  const article = getArticleBySlug(params.slug)
  if (!article) notFound()

  const { frontmatter, content, slug } = article

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: frontmatter.titre,
    description: frontmatter.resume,
    datePublished: frontmatter.date,
    author: {
      '@type': 'Person',
      name: 'Julien Seurat',
      url: 'https://www.parent-ia.fr/a-propos',
    },
    publisher: {
      '@type': 'Organization',
      name: 'Parent IA',
      url: 'https://www.parent-ia.fr',
    },
    url: `https://www.parent-ia.fr/blog/${slug}`,
    keywords: frontmatter.tags.join(', '),
    inLanguage: 'fr-FR',
  }

  return (
    <div className="max-w-2xl mx-auto px-4 py-12">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      {/* Retour */}
      <Link href="/blog" className="inline-flex items-center gap-1 text-brun-light hover:text-terracotta text-sm mb-8 transition-colors">
        ← Retour au blog
      </Link>

      {/* Tags */}
      <div className="flex flex-wrap gap-2 mb-4">
        {frontmatter.tags.map(tag => (
          <span key={tag} className="text-xs px-2 py-1 rounded-full bg-sauge-100 text-sauge-600 font-medium">
            {tag}
          </span>
        ))}
      </div>

      {/* Titre */}
      <h1 className="text-3xl font-bold text-brun mb-4 leading-tight">
        {frontmatter.titre}
      </h1>

      <p className="text-brun-light text-lg leading-relaxed mb-8">
        {frontmatter.resume}
      </p>

      {/* Méta */}
      <div className="bg-beige-100 rounded-2xl p-5 mb-8 grid grid-cols-2 gap-3 text-sm">
        <div>
          <span className="text-brun-lighter text-xs uppercase tracking-wide block mb-1">Date</span>
          <span className="text-brun font-medium">{formatDate(frontmatter.date)}</span>
        </div>
        <div>
          <span className="text-brun-lighter text-xs uppercase tracking-wide block mb-1">Âge cible</span>
          <span className="text-brun font-medium">{frontmatter.age_cible}</span>
        </div>
        <div>
          <span className="text-brun-lighter text-xs uppercase tracking-wide block mb-1">Durée</span>
          <span className="text-brun font-medium">{frontmatter.duree}</span>
        </div>
        <div>
          <span className="text-brun-lighter text-xs uppercase tracking-wide block mb-1">Matériel</span>
          <span className="text-brun font-medium">{frontmatter.materiel.join(', ')}</span>
        </div>
      </div>

      {/* Contenu MDX */}
      <article className="
        prose prose-stone max-w-none
        prose-headings:text-brun prose-headings:font-bold
        prose-h2:text-xl prose-h2:mt-8 prose-h2:mb-3
        prose-h3:text-lg prose-h3:mt-6 prose-h3:mb-2
        prose-p:text-brun-light prose-p:leading-relaxed
        prose-a:text-terracotta prose-a:no-underline hover:prose-a:underline
        prose-strong:text-brun
        prose-li:text-brun-light
        prose-ul:my-3 prose-ol:my-3
        prose-blockquote:border-l-4 prose-blockquote:border-sauge prose-blockquote:bg-sauge-100 prose-blockquote:rounded-r-xl prose-blockquote:py-1 prose-blockquote:not-italic
        prose-blockquote:text-brun-light
      ">
        <MDXRemote source={content} components={mdxComponents} />
      </article>

      {/* Retour enfants */}
      <div className="mt-10 bg-terracotta-100 rounded-2xl p-6 border-l-4 border-terracotta">
        <div className="text-xs uppercase tracking-wide text-terracotta font-semibold mb-2">
          Ce qu&apos;en ont dit les enfants
        </div>
        <p className="text-brun leading-relaxed italic">&ldquo;{frontmatter.retour_enfants}&rdquo;</p>
      </div>

      {/* Retour au blog */}
      <div className="mt-10 text-center">
        <Link
          href="/blog"
          className="inline-block bg-terracotta hover:bg-terracotta-500 text-white font-semibold px-6 py-3 rounded-xl transition-colors"
        >
          Voir tous les articles
        </Link>
      </div>
    </div>
  )
}
