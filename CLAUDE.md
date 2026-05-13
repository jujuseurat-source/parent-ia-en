# CLAUDE.md — parent-ia-en (English blog repo)

**Mis à jour :** 13/05/2026  
**Repo GitHub :** `github.com/jujuseurat-source/parent-ia-en`  
**Blog :** `www.parent-ai.eu`

---

## Ce repo

C'est la version anglaise du blog Parent IA. Il partage la même stack que le repo FR (Next.js 14 + Tailwind + TypeScript + MDX) et se déploie automatiquement sur Vercel.

**Les articles EN sont des traductions directes des articles FR** — même structure MDX, même frontmatter, contenu adapté en anglais.

---

## Articles publiés (9)

Même activités que le repo FR, traduits en anglais :
- `the-magic-sort.mdx` (ou équivalent) — Classification
- et 8 autres articles traduits

---

## Différences par rapport au repo FR

| Élément | parent-ia (FR) | parent-ia-en (EN) |
|---|---|---|
| Blog | `parent-ia.fr` | `www.parent-ai.eu` |
| Brevo liste | ID #3 | ID #6 |
| Email | `bonjour@parent-ia.fr` | `hello@parent-ai.eu` |
| Langue articles | Français | Anglais |

---

## Règles éditoriales

**Identiques au blog FR** — voir la documentation complète dans :  
`C:\Users\julie\Desktop\Parent IA\02-CONTENU\REGLES-ECRITURE.md`

Les mêmes règles absolues s'appliquent (ton Julien, âges des enfants, Meryl ne lit pas, etc.).  
Le ton EN doit rester proche du FR : père qui raconte, pas expert.

---

## Commandes essentielles

```bash
# Développement local
cd "C:\Users\julie\Desktop\Parent IA\parent-ia-en"
npm run dev
# → http://localhost:3000

# Publier un article
git add . && git commit -m "Article: nom de l'article" && git push
# Vercel redéploie en 1-2 minutes
```

---

## Infos techniques

**Stack :** Next.js 14 + App Router + Tailwind CSS + TypeScript + MDX  
**GitHub :** `github.com/jujuseurat-source/parent-ia-en`  
**Vercel :** `jujuseurat-8580s-projects/parent-ia-en`  
**Domaine :** `www.parent-ai.eu` (OVH, renouvellement auto activé)

---

## Priorité de la phase actuelle

Le repo EN est **secondaire** par rapport au FR pour l'instant.  
Focus : rendre 3 articles FR authentiques d'abord, puis décliner en EN.  
Voir `04-OPERATIONS/PROCHAINE-SESSION.md` pour les priorités globales.
