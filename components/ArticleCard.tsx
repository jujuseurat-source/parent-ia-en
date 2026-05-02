import Link from 'next/link'
import { ArticleFrontmatter } from '@/types/article'
import { formatDate } from '@/lib/utils'

interface ArticleCardProps {
  slug: string
  frontmatter: ArticleFrontmatter
}

export default function ArticleCard({ slug, frontmatter }: ArticleCardProps) {
  return (
    <Link href={`/blog/${slug}`} className="group block">
      <article className="bg-white rounded-2xl p-6 border border-beige-200 hover:border-sauge-200 hover:shadow-md transition-all duration-200">
        <div className="flex flex-wrap gap-2 mb-3">
          {frontmatter.tags.slice(0, 3).map(tag => (
            <span
              key={tag}
              className="text-xs px-2 py-1 rounded-full bg-sauge-100 text-sauge-600 font-medium"
            >
              {tag}
            </span>
          ))}
        </div>

        <h2 className="text-lg font-bold text-brun group-hover:text-terracotta transition-colors leading-snug mb-2">
          {frontmatter.titre}
        </h2>

        <p className="text-brun-light text-sm leading-relaxed mb-4 line-clamp-2">
          {frontmatter.resume}
        </p>

        <div className="flex flex-wrap gap-4 text-xs text-brun-lighter border-t border-beige-200 pt-3">
          <span className="flex items-center gap-1">
            <span>📅</span> {formatDate(frontmatter.date)}
          </span>
          <span className="flex items-center gap-1">
            <span>👶</span> {frontmatter.age_cible}
          </span>
          <span className="flex items-center gap-1">
            <span>⏱</span> {frontmatter.duree}
          </span>
        </div>
      </article>
    </Link>
  )
}
