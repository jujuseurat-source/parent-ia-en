import { NextRequest, NextResponse } from 'next/server'
import { Resend } from 'resend'

// Route : POST /api/newsletter
// Body  : { email: string, age_groupe: "3-5" | "6-8" | "9-11" | "12+" }

const emailsParAge: Record<string, { sujet: string; corps: string }> = {
  '3-5': {
    sujet: 'Bienvenue sur Parent IA',
    corps: `<p>Bonjour,</p>

<p>Je m'appelle Julien. J'ai deux enfants, Romane (6 ans) et Meryl (3 ans), et depuis quelques mois on essaie d'apprendre l'IA ensemble, sans écran, avec des crayons et des objets de la maison.</p>

<p>Ton enfant a entre 3 et 5 ans. C'est l'âge où on ne peut pas encore expliquer un concept, mais où on peut jouer. Trier des objets par couleur. Choisir "celui qui est différent". Mettre des images dans le bon tas.</p>

<p>C'est exactement comme ça qu'une IA apprend à voir le monde.</p>

<p>Meryl fait pareil. Il renverse tout au mauvais moment, mais il fait pareil.</p>

<p><strong>Une chose à essayer ce soir, sans préparation :</strong> pose 4 objets sur la table. Trois qui se ressemblent, un qui est différent. Demande à ton enfant lequel n'est pas à sa place. Il va trouver. Demande-lui pourquoi. Il ne saura peut-être pas expliquer, il aura juste su. C'est exactement ce qu'une IA apprend à faire avec des millions d'images.</p>

<p>Les prochains articles arrivent directement ici. Pas de jargon, pas de cours magistral. Juste ce qu'on a testé chez nous, avec ce que ça a donné vraiment.</p>

<p>À bientôt,<br>Julien</p>`,
  },
  '6-8': {
    sujet: 'Bienvenue sur Parent IA',
    corps: `<p>Bonjour,</p>

<p>Je m'appelle Julien. J'ai deux enfants, Romane (6 ans) et Meryl (3 ans). Depuis quelques mois, on essaie d'apprendre l'IA ensemble, sans écran, avec du papier, des objets du salon, et beaucoup d'approximations de ma part.</p>

<p>Ton enfant a entre 6 et 8 ans. Comme Romane. C'est l'âge où les questions deviennent précises : "Est-ce que l'IA rêve ?", "Elle se trompe pourquoi ?", "Elle triche ou pas ?"</p>

<p>Ce sont exactement les bonnes questions. Et il y a des activités simples pour y répondre ensemble, sans ordinateur.</p>

<p>Romane a inventé sa propre catégorie lors d'un jeu de tri : "les trucs qui font du bruit quand on les secoue". Les chercheurs en IA appellent ça un critère de classification. Elle, elle appelait ça gagner.</p>

<p><strong>Une chose à essayer ce soir :</strong> dis un mot à ton enfant. N'importe lequel. Demande-lui de dire le premier mot qui lui vient après. Puis toi. Puis lui. Construisez une phrase ensemble, mot par mot, sans réfléchir trop longtemps. Lisez le résultat à voix haute. C'est exactement comme ça qu'une IA écrit : elle prédit le mot suivant, encore et encore, jusqu'à former une phrase. Elle ne "sait" rien. Elle parie.</p>

<p>Les prochains articles arrivent directement ici. Ce qui a marché, ce qui a raté, et les questions qu'on n'a pas su répondre.</p>

<p>À bientôt,<br>Julien</p>`,
  },
  '9-11': {
    sujet: 'Bienvenue sur Parent IA',
    corps: `<p>Bonjour,</p>

<p>Je m'appelle Julien. Ce blog documente les activités qu'on fait chez nous pour comprendre l'IA, avec mes enfants de 3 et 6 ans, sans écran.</p>

<p>Ton enfant a entre 9 et 11 ans. Il est probablement déjà curieux de comprendre comment ça marche vraiment, pas juste "l'IA prédit le mot suivant" mais pourquoi elle se trompe, comment elle apprend, ce qu'elle ne peut pas faire.</p>

<p>À cet âge, on peut aller plus loin. Comprendre qu'un biais n'est pas un bug, c'est un apprentissage qui reflète ce qu'on lui a montré. Comprendre pourquoi elle invente des faits avec autant de confiance qu'elle en dit des vrais.</p>

<p>Les activités du blog se font avec du papier et des crayons, mais les idées sont sérieuses. À 9-11 ans, les enfants peuvent souvent aller plus loin que les adultes sur ces questions.</p>

<p><strong>Une chose à essayer cette semaine :</strong> demande à ton enfant de décrire un endroit que vous avez visité ensemble, en détail, de mémoire. Couleurs, formes, ce qu'il y avait. Puis sortez les photos et comparez. Là où les souvenirs ont comblé des trous, inventé des détails, ajouté de la couleur qui n'était pas là, c'est exactement ce qu'on appelle une hallucination quand une IA le fait. Sauf que le cerveau humain fait ça depuis toujours, sans que personne ne le lui reproche.</p>

<p>Les prochains articles arrivent directement ici.</p>

<p>À bientôt,<br>Julien</p>`,
  },
  '12+': {
    sujet: 'Bienvenue sur Parent IA',
    corps: `<p>Bonjour,</p>

<p>Je m'appelle Julien. Ce blog documente les activités qu'on fait chez nous pour comprendre l'IA, avec mes enfants, sans écran.</p>

<p>Ton enfant a 12 ans ou plus. Il a probablement déjà utilisé ChatGPT, Gemini, ou d'autres outils. La question n'est plus "c'est quoi" mais "comment ça marche vraiment" et "qu'est-ce que ça change".</p>

<p>Les activités du blog viennent de questions simples : pourquoi l'IA se trompe avec autant d'assurance ? Qu'est-ce qu'un biais, concrètement ? Comment la mémoire d'une IA est différente de la nôtre ?</p>

<p>Ce sont des questions qu'on peut explorer avec du papier, des jeux de rôle, et des expériences de pensée. Sans code. Sans cours.</p>

<p><strong>Une chose à essayer :</strong> pose à une IA une question sur quelque chose de très local, très précis, que personne n'a eu de raison d'écrire sur internet. Le nom de la boulangerie de ta rue. Ce qui s'est passé dans ta ville le mois dernier. Elle va répondre avec confiance. Et elle va peut-être inventer. Demande à ton enfant : pourquoi elle fait ça ? Comment on sait qu'elle ne sait pas ? C'est de là que part tout le reste.</p>

<p>Les prochains articles arrivent directement ici.</p>

<p>À bientôt,<br>Julien</p>`,
  },
}

export async function POST(req: NextRequest) {
  try {
    const { email, age_groupe } = await req.json()

    if (!email || !age_groupe) {
      return NextResponse.json(
        { message: 'Email et tranche d\'âge requis' },
        { status: 400 }
      )
    }

    const KIT_API_KEY = process.env.KIT_API_KEY
    const KIT_FORM_ID = process.env.KIT_FORM_ID

    if (!KIT_API_KEY || !KIT_FORM_ID) {
      console.error('KIT_API_KEY ou KIT_FORM_ID manquant dans .env.local')
      return NextResponse.json(
        { message: 'Configuration serveur manquante' },
        { status: 500 }
      )
    }

    // 1. Inscription dans Kit (ConvertKit)
    const kitResponse = await fetch(
      `https://api.convertkit.com/v3/forms/${KIT_FORM_ID}/subscribe`,
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json; charset=utf-8' },
        body: JSON.stringify({
          api_key: KIT_API_KEY,
          email,
          fields: { age_groupe },
        }),
      }
    )

    if (!kitResponse.ok) {
      const error = await kitResponse.json()
      console.error('Erreur Kit API:', error)
      return NextResponse.json(
        { message: 'Erreur lors de l\'inscription' },
        { status: 500 }
      )
    }

    // 2. Email de bienvenue via Resend
    const RESEND_API_KEY = process.env.RESEND_API_KEY

    if (RESEND_API_KEY) {
      const emailContent = emailsParAge[age_groupe] ?? emailsParAge['6-8']

      const resend = new Resend(RESEND_API_KEY)

      const { error: resendError } = await resend.emails.send({
        from: 'Julien | Parent IA <bonjour@parent-ia.fr>',
        to: email,
        subject: emailContent.sujet,
        html: emailContent.corps,
      })

      if (resendError) {
        // On log l'erreur mais on ne fait pas échouer l'inscription Kit
        console.error('Erreur Resend:', resendError)
      }
    } else {
      console.warn('RESEND_API_KEY manquant : email de bienvenue non envoyé')
    }

    return NextResponse.json({ success: true }, { status: 200 })

  } catch (err) {
    console.error('Erreur newsletter:', err)
    return NextResponse.json(
      { message: 'Erreur serveur' },
      { status: 500 }
    )
  }
}
