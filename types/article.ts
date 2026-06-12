export interface ArticleFrontmatter {
  titre: string
  date: string
  age_cible: string
  duree: string
  materiel: string[]
  resume: string
  retour_enfants: string
  tags: string[]
  slug?: string
  image?: string
}

export interface Article {
  frontmatter: ArticleFrontmatter
  slug: string
  content: string
}
