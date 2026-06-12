import { getArticleBySlug, getAllArticles, formatDate } from '@/lib/articles'
import { MDXRemote } from 'next-mdx-remote/rsc'
import { notFound } from 'next/navigation'
import Link from 'next/link'
import type { Metadata } from 'next'
import AudioPlayer from '@/components/AudioPlayer'
import Image from 'next/image'

// Wrappers: avoids the "Cannot access propTypes on the server" error in dev mode
const mdxComponents = {
  AudioPlayer: (props: React.ComponentProps<typeof AudioPlayer>) => <AudioPlayer {...props} />,
  Image: (props: React.ComponentProps<typeof Image>) => <Image {...props} />,
}

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
  const url = `https://www.parent-ai.eu/blog/${slug}`
  return {
    title: frontmatter.titre,
    description: frontmatter.resume,
    keywords: frontmatter.tags,
    authors: [{ name: 'Julien Seurat', url: 'https://www.parent-ai.eu/about' }],
    openGraph: {
      type: 'article',
      url,
      title: frontmatter.titre,
      description: frontmatter.resume,
      publishedTime: frontmatter.date,
      authors: ['Julien Seurat'],
      tags: frontmatter.tags,
      siteName: 'Parent AI',
      locale: 'en_US',
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
      url: 'https://www.parent-ai.eu/about',
    },
    publisher: {
      '@type': 'Organization',
      name: 'Parent AI',
      url: 'https://www.parent-ai.eu',
    },
    url: `https://www.parent-ai.eu/blog/${slug}`,
    keywords: frontmatter.tags.join(', '),
    inLanguage: 'en-US',
  }

  return (
    <div className="max-w-2xl mx-auto px-4 py-12">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <Link href="/blog" className="inline-flex items-center gap-1 text-brun-light hover:text-terracotta text-sm mb-8 transition-colors">
        ← Back to blog
      </Link>

      <div className="flex flex-wrap gap-2 mb-4">
        {frontmatter.tags.map(tag => (
          <span key={tag} className="text-xs px-2 py-1 rounded-full bg-sauge-100 text-sauge-600 font-medium">
            {tag}
          </span>
        ))}
      </div>

      <h1 className="font-serif text-3xl sm:text-4xl font-semibold text-brun mb-4 leading-tight text-balance">
        {frontmatter.titre}
      </h1>

      <p className="text-brun-light text-lg leading-relaxed mb-8">
        {frontmatter.resume}
      </p>

      {/* Activity photo */}
      {frontmatter.image && (
        <div className="relative aspect-[3/2] rounded-2xl overflow-hidden mb-8 shadow-md">
          <Image
            src={frontmatter.image}
            alt={frontmatter.titre}
            fill
            sizes="(max-width: 768px) 100vw, 672px"
            priority
            className="object-cover"
          />
        </div>
      )}

      <div className="bg-beige-100 rounded-2xl p-5 mb-8 grid grid-cols-2 gap-3 text-sm">
        <div>
          <span className="text-brun-lighter text-xs uppercase tracking-wide block mb-1">Date</span>
          <span className="text-brun font-medium">{formatDate(frontmatter.date)}</span>
        </div>
        <div>
          <span className="text-brun-lighter text-xs uppercase tracking-wide block mb-1">Target age</span>
          <span className="text-brun font-medium">{frontmatter.age_cible}</span>
        </div>
        <div>
          <span className="text-brun-lighter text-xs uppercase tracking-wide block mb-1">Duration</span>
          <span className="text-brun font-medium">{frontmatter.duree}</span>
        </div>
        <div>
          <span className="text-brun-lighter text-xs uppercase tracking-wide block mb-1">Materials</span>
          <span className="text-brun font-medium">{frontmatter.materiel.join(', ')}</span>
        </div>
      </div>

      <article className="
        prose prose-stone max-w-none
        prose-headings:text-brun prose-headings:font-serif prose-headings:font-semibold
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
        {/* blockJS: false — our own trusted content; without it, next-mdx-remote v6
            strips attributes like width={800} from MDX images */}
        <MDXRemote source={content} components={mdxComponents} options={{ blockJS: false }} />
      </article>

      <div className="mt-10 bg-terracotta-100 rounded-2xl p-6 border-l-4 border-terracotta">
        <div className="text-xs uppercase tracking-wide text-terracotta font-semibold mb-2">
          What the kids said
        </div>
        <p className="text-brun leading-relaxed italic">&ldquo;{frontmatter.retour_enfants}&rdquo;</p>
      </div>

      <div className="mt-10 text-center">
        <Link
          href="/blog"
          className="inline-block bg-terracotta hover:bg-terracotta-500 text-white font-semibold px-6 py-3 rounded-full transition-colors"
        >
          See all articles
        </Link>
      </div>
    </div>
  )
}
