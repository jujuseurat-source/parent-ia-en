import { NextRequest, NextResponse } from 'next/server'
import { getAllArticles, getArticleBySlug } from '@/lib/articles'

// Route : POST /api/send-newsletter
// Body  : { secret: string, slug?: string }
//
// Appelé automatiquement par GitHub Actions après chaque push d'un nouvel article.
// Crée une campagne email Brevo et l'envoie immédiatement à la liste principale.

export async function POST(req: NextRequest) {
  try {
    const { secret, slug } = await req.json()

    // Vérification du secret
    const NEWSLETTER_SECRET = process.env.NEWSLETTER_SECRET
    if (!NEWSLETTER_SECRET || secret !== NEWSLETTER_SECRET) {
      return NextResponse.json({ message: 'Non autorisé' }, { status: 401 })
    }

    const BREVO_API_KEY = process.env.BREVO_API_KEY
    const BREVO_LIST_ID = process.env.BREVO_LIST_ID

    if (!BREVO_API_KEY || !BREVO_LIST_ID) {
      console.error('BREVO_API_KEY ou BREVO_LIST_ID manquant')
      return NextResponse.json({ message: 'Configuration serveur manquante' }, { status: 500 })
    }

    // Récupérer l'article : par slug si fourni, sinon le plus récent
    let article
    if (slug) {
      article = getArticleBySlug(slug)
    }
    if (!article) {
      const articles = getAllArticles()
      if (!articles.length) {
        return NextResponse.json({ message: 'Aucun article trouvé' }, { status: 404 })
      }
      article = articles[0]
    }

    const { frontmatter } = article
    const articleUrl = `https://www.parent-ia.fr/blog/${article.slug}`
    const listId = parseInt(BREVO_LIST_ID)

    // Template HTML de l'email
    const htmlContent = `
<!DOCTYPE html>
<html lang="fr">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>${frontmatter.titre}</title>
</head>
<body style="margin:0;padding:0;background-color:#F5EFE0;font-family:Georgia,serif;">
  <table width="100%" cellpadding="0" cellspacing="0" style="background-color:#F5EFE0;padding:32px 0;">
    <tr>
      <td align="center">
        <table width="600" cellpadding="0" cellspacing="0" style="max-width:600px;width:100%;background-color:#ffffff;border-radius:12px;overflow:hidden;box-shadow:0 2px 8px rgba(61,48,40,0.08);">

          <!-- Header -->
          <tr>
            <td style="background-color:#3D3028;padding:24px 32px;">
              <p style="margin:0;font-family:Georgia,serif;font-size:22px;font-weight:bold;color:#F5EFE0;letter-spacing:0.5px;">
                Parent IA
              </p>
              <p style="margin:4px 0 0;font-size:13px;color:#B5A898;">Grandir avec l'IA</p>
            </td>
          </tr>

          <!-- Body -->
          <tr>
            <td style="padding:32px;">
              <p style="margin:0 0 8px;font-size:13px;color:#7A9E7A;font-family:sans-serif;text-transform:uppercase;letter-spacing:1px;">
                Nouvel article
              </p>
              <h1 style="margin:0 0 16px;font-size:24px;color:#3D3028;line-height:1.3;">
                ${frontmatter.titre}
              </h1>
              <p style="margin:0 0 20px;font-size:16px;color:#3D3028;line-height:1.6;">
                ${frontmatter.resume}
              </p>

              <!-- Meta badges -->
              <table cellpadding="0" cellspacing="0" style="margin-bottom:24px;">
                <tr>
                  <td style="padding-right:8px;">
                    <span style="display:inline-block;background:#F5EFE0;color:#8B7B6B;font-size:13px;font-family:sans-serif;padding:4px 12px;border-radius:20px;">
                      🎯 ${frontmatter.age_cible}
                    </span>
                  </td>
                  <td style="padding-right:8px;">
                    <span style="display:inline-block;background:#F5EFE0;color:#8B7B6B;font-size:13px;font-family:sans-serif;padding:4px 12px;border-radius:20px;">
                      ⏱ ${frontmatter.duree}
                    </span>
                  </td>
                </tr>
              </table>

              <!-- Retour enfants -->
              <table cellpadding="0" cellspacing="0" width="100%" style="margin-bottom:28px;">
                <tr>
                  <td style="background:#F5EFE0;border-left:3px solid #B86A3E;padding:16px 20px;border-radius:0 8px 8px 0;">
                    <p style="margin:0;font-size:14px;color:#3D3028;font-style:italic;line-height:1.5;">
                      "${frontmatter.retour_enfants}"
                    </p>
                  </td>
                </tr>
              </table>

              <!-- CTA -->
              <table cellpadding="0" cellspacing="0">
                <tr>
                  <td style="background-color:#B86A3E;border-radius:8px;">
                    <a href="${articleUrl}" style="display:inline-block;padding:14px 28px;font-size:15px;font-weight:bold;color:#ffffff;text-decoration:none;font-family:sans-serif;">
                      Lire l'article →
                    </a>
                  </td>
                </tr>
              </table>
            </td>
          </tr>

          <!-- Footer -->
          <tr>
            <td style="background-color:#F5EFE0;padding:20px 32px;border-top:1px solid #e8e0d4;">
              <p style="margin:0;font-size:12px;color:#B5A898;font-family:sans-serif;text-align:center;">
                Tu reçois cet email parce que tu t'es inscrit sur
                <a href="https://www.parent-ia.fr" style="color:#B86A3E;text-decoration:none;">parent-ia.fr</a>.
                <br>
                <a href="{{unsubscribe}}" style="color:#B5A898;">Se désinscrire</a>
              </p>
            </td>
          </tr>

        </table>
      </td>
    </tr>
  </table>
</body>
</html>
`.trim()

    const textContent = `${frontmatter.titre}

${frontmatter.resume}

Lire l'article : ${articleUrl}

---
Parent IA — Grandir avec l'IA
Se désinscrire : {{unsubscribe}}`

    // 1. Créer la campagne Brevo
    const createRes = await fetch('https://api.brevo.com/v3/emailCampaigns', {
      method: 'POST',
      headers: {
        'accept': 'application/json',
        'content-type': 'application/json',
        'api-key': BREVO_API_KEY,
      },
      body: JSON.stringify({
        name: `[Auto] ${frontmatter.titre} — ${frontmatter.date}`,
        subject: `✨ ${frontmatter.titre}`,
        sender: { name: 'Julien · Parent IA', email: 'hello@parent-ia.fr' },
        type: 'classic',
        htmlContent,
        textContent,
        recipients: { listIds: [listId] },
      }),
    })

    if (!createRes.ok) {
      const err = await createRes.json().catch(() => ({}))
      console.error('Erreur création campagne Brevo:', err)
      return NextResponse.json({ message: 'Erreur création campagne', detail: err }, { status: 500 })
    }

    const campaign = await createRes.json()
    const campaignId = campaign.id

    // 2. Envoyer la campagne immédiatement
    const sendRes = await fetch(`https://api.brevo.com/v3/emailCampaigns/${campaignId}/sendNow`, {
      method: 'POST',
      headers: {
        'accept': 'application/json',
        'api-key': BREVO_API_KEY,
      },
    })

    if (!sendRes.ok) {
      const err = await sendRes.json().catch(() => ({}))
      console.error('Erreur envoi campagne Brevo:', err)
      return NextResponse.json({ message: 'Campagne créée mais envoi échoué', campaignId, detail: err }, { status: 500 })
    }

    console.log(`Newsletter envoyée : campagne #${campaignId} → "${frontmatter.titre}"`)
    return NextResponse.json({
      success: true,
      campaignId,
      article: article.slug,
      titre: frontmatter.titre,
    })

  } catch (err) {
    console.error('Erreur send-newsletter:', err)
    return NextResponse.json({ message: 'Erreur serveur' }, { status: 500 })
  }
}
