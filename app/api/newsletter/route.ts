import { NextRequest, NextResponse } from 'next/server'

// Route : POST /api/newsletter
// Body  : { email: string, age_groupe: "3-5" | "6-8" | "9-11" | "12+" }
//
// Système : Brevo
// - Crée le contact avec l'attribut AGE_GROUPE
// - L'ajoute à la liste principale (BREVO_LIST_ID)
// - Brevo déclenche automatiquement l'email de bienvenue via une automation

export async function POST(req: NextRequest) {
  try {
    const { email, age_groupe } = await req.json()

    if (!email || !age_groupe) {
      return NextResponse.json(
        { message: "Email et tranche d'âge requis" },
        { status: 400 }
      )
    }

    const BREVO_API_KEY = process.env.BREVO_API_KEY
    const BREVO_LIST_ID = process.env.BREVO_LIST_ID

    if (!BREVO_API_KEY || !BREVO_LIST_ID) {
      console.error("BREVO_API_KEY ou BREVO_LIST_ID manquant")
      return NextResponse.json(
        { message: 'Configuration serveur manquante' },
        { status: 500 }
      )
    }

    const listId = parseInt(BREVO_LIST_ID)

    // Créer ou mettre à jour le contact dans Brevo
    const brevoResponse = await fetch('https://api.brevo.com/v3/contacts', {
      method: 'POST',
      headers: {
        'accept': 'application/json',
        'content-type': 'application/json',
        'api-key': BREVO_API_KEY,
      },
      body: JSON.stringify({
        email,
        attributes: {
          AGE_GROUPE: age_groupe,
        },
        listIds: [listId],
        updateEnabled: true,
      }),
    })

    // 201 = créé, 204 = mis à jour — les deux sont OK
    if (!brevoResponse.ok && brevoResponse.status !== 204) {
      const error = await brevoResponse.json().catch(() => ({}))
      console.error('Erreur Brevo API:', error)
      return NextResponse.json(
        { message: "Erreur lors de l'inscription" },
        { status: 500 }
      )
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
