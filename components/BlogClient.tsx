'use client'

import { useState } from 'react'
import ArticleCard from '@/components/ArticleCard'
import { Article } from '@/types/article'

interface BlogClientProps {
  articles: Article[]
}

export default function BlogClient({ articles }: BlogClientProps) {
  const [selectedTag, setSelectedTag] = useState<string | null>(null)

  // Collecter tous les tags uniques, triés par fréquence
  const tagCount: Record<string, number> = {}
  articles.forEach(article => {
    article.frontmatter.tags.forEach(tag => {
      tagCount[tag] = (tagCount[tag] || 0) + 1
    })
  })
  const allTags = Object.keys(tagCount).sort((a, b) => tagCount[b] - tagCount[a])

  const filtered = selectedTag
    ? articles.filter(a => a.frontmatter.tags.includes(selectedTag))
    : articles

  return (
    <>
      {/* Filtres par tags */}
      <div className="flex flex-wrap gap-2 mb-8">
        <button
          onClick={() => setSelectedTag(null)}
          className={`text-sm px-4 py-1.5 rounded-full font-medium transition-all duration-150 ${
            selectedTag === null
              ? 'bg-terracotta text-white'
              : 'bg-white border border-beige-200 text-brun-light hover:border-terracotta hover:text-terracotta'
          }`}
        >
          Tous
        </button>
        {allTags.map(tag => (
          <button
            key={tag}
            onClick={() => setSelectedTag(tag === selectedTag ? null : tag)}
            className={`text-sm px-4 py-1.5 rounded-full font-medium transition-all duration-150 ${
              selectedTag === tag
                ? 'bg-terracotta text-white'
                : 'bg-white border border-beige-200 text-brun-light hover:border-terracotta hover:text-terracotta'
            }`}
          >
            {tag}
            <span className="ml-1.5 opacity-60 text-xs">{tagCount[tag]}</span>
          </button>
        ))}
      </div>

      {/* Articles filtrés */}
      {filtered.length === 0 ? (
        <p className="text-brun-light text-center py-10">Aucun article pour ce tag pour l&apos;instant.</p>
      ) : (
        <div className="flex flex-col gap-4">
          {filtered.map(article => (
            <ArticleCard
              key={article.slug}
              slug={article.slug}
              frontmatter={article.frontmatter}
            />
          ))}
        </div>
      )}
    </>
  )
}
