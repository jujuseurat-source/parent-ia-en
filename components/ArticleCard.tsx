import Link from 'next/link'
import Image from 'next/image'
import { ArticleFrontmatter } from '@/types/article'
import { formatDate } from '@/lib/utils'

interface ArticleCardProps {
  slug: string
  frontmatter: ArticleFrontmatter
}

export default function ArticleCard({ slug, frontmatter }: ArticleCardProps) {
  return (
    <Link href={`/blog/${slug}`} className="group block h-full">
      <article className="bg-white rounded-2xl border border-beige-300 overflow-hidden hover:border-sauge-200 hover:shadow-lg hover:-translate-y-1 transition-all duration-200 h-full flex flex-col">
        {/* Visual */}
        <div className="relative aspect-[3/2] overflow-hidden">
          {frontmatter.image ? (
            <Image
              src={frontmatter.image}
              alt={frontmatter.titre}
              fill
              sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
              className="object-cover group-hover:scale-[1.04] transition-transform duration-300"
            />
          ) : (
            // Paper-cut placeholder when no photo yet
            <div className="absolute inset-0 bg-beige-200 flex items-center justify-center">
              <svg className="w-16 h-16 opacity-70" viewBox="0 0 40 40" fill="none" aria-hidden="true">
                <path d="M20 31 V18" stroke="#3D3028" strokeWidth="2.5" strokeLinecap="round" />
                <path d="M20 20 C12 20 11 12 11 10 C18 10 20 14 20 20 Z" fill="#7A9E7A" />
                <path d="M20 17 C28 17 29 9 29 7 C22 7 20 11 20 17 Z" fill="#B86A3E" />
              </svg>
            </div>
          )}
          <span className="absolute top-3 left-3 bg-white/95 text-brun text-xs font-semibold px-3 py-1 rounded-full shadow-sm">
            {frontmatter.age_cible}
          </span>
        </div>

        <div className="p-5 flex flex-col gap-2.5 flex-1">
          <div className="flex flex-wrap gap-2">
            {frontmatter.tags.slice(0, 3).map(tag => (
              <span
                key={tag}
                className="text-xs px-2 py-1 rounded-full bg-sauge-100 text-sauge-600 font-medium"
              >
                {tag}
              </span>
            ))}
          </div>

          <h2 className="font-serif text-lg font-semibold text-brun group-hover:text-terracotta transition-colors leading-snug">
            {frontmatter.titre}
          </h2>

          <p className="text-brun-light text-sm leading-relaxed line-clamp-3">
            {frontmatter.resume}
          </p>

          <div className="mt-auto flex flex-wrap gap-2 text-xs text-brun-lighter font-medium pt-2">
            <span>{formatDate(frontmatter.date)}</span>
            <span aria-hidden="true">·</span>
            <span>{frontmatter.duree}</span>
          </div>
        </div>
      </article>
    </Link>
  )
}
