# Index — parent-ia-en (English blog repo)

**Mis à jour :** 13/05/2026  
**Repo GitHub :** `github.com/jujuseurat-source/parent-ia-en`  
**Blog :** `www.parent-ai.eu`

---

## Structure du code

```
parent-ia-en/
├── CLAUDE.md              ← Contexte pour Claude (lire en premier)
├── INDEX.md               ← Ce fichier
├── app/                   ← Pages (App Router Next.js 14)
│   ├── page.tsx           ← Home
│   ├── blog/page.tsx      ← Article list
│   ├── blog/[slug]/       ← Individual article (MDX)
│   └── about/             ← About page
├── components/            ← Reusable components (Nav, Footer, ArticleCard)
├── content/articles/      ← Published MDX articles (source of truth)
├── lib/articles.ts        ← getAllArticles() + getArticleBySlug()
├── types/article.ts       ← TypeScript types
└── public/                ← Static assets
```

---

## Commandes essentielles

```bash
# Développement local
cd "C:\Users\julie\Desktop\Parent IA\parent-ia-en"
npm run dev
# → http://localhost:3000

# Publier un article
git add . && git commit -m "Article: article name" && git push
# Vercel redéploie en 1-2 minutes
```

---

## Documentation complète

Toute la documentation est dans :  
`C:\Users\julie\Desktop\Parent IA\` (dossiers 01 à 05)

Les règles éditoriales EN et FR sont identiques :
- Règles d'écriture → `02-CONTENU/REGLES-ECRITURE.md`
- Format MDX → `02-CONTENU/FRONTMATTER.md`
- Plan actuel → `04-OPERATIONS/PROCHAINE-SESSION.md`
