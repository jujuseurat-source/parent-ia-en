import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'
import { Article, ArticleFrontmatter } from '@/types/article'

const articlesDirectory = path.join(process.cwd(), 'content/articles')

export function getAllArticles(): Article[] {
  if (!fs.existsSync(articlesDirectory)) return []

  const fileNames = fs.readdirSync(articlesDirectory).filter(f => f.endsWith('.mdx'))

  const articles = fileNames.map(fileName => {
    const slug = fileName.replace(/\.mdx$/, '')
    const fullPath = path.join(articlesDirectory, fileName)
    const fileContents = fs.readFileSync(fullPath, 'utf8')
    const { data, content } = matter(fileContents)

    return {
      slug,
      frontmatter: data as ArticleFrontmatter,
      content,
    }
  })

  return articles.sort((a, b) =>
    new Date(b.frontmatter.date).getTime() - new Date(a.frontmatter.date).getTime()
  )
}

export function getArticleBySlug(slug: string): Article | null {
  const fullPath = path.join(articlesDirectory, `${slug}.mdx`)
  if (!fs.existsSync(fullPath)) return null

  const fileContents = fs.readFileSync(fullPath, 'utf8')
  const { data, content } = matter(fileContents)

  return {
    slug,
    frontmatter: data as ArticleFrontmatter,
    content,
  }
}

export { formatDate } from '@/lib/utils'
