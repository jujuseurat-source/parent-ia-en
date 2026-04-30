import { NextRequest, NextResponse } from 'next/server'

// Route : POST /api/newsletter
// Body  : { email: string, age_groupe: "3-5" | "6-8" | "9-11" | "12+" }

export async function POST(req: NextRequest) {
  try {
    const { email, age_groupe } = await req.json()

    if (!email || !age_groupe) {
      return NextResponse.json(
        { message: 'Email et tranche d\'âge requis' },
        { status: 400 }
      )
    }

    const API_KEY = process.env.KIT_API_KEY
    const FORM_ID = process.env.KIT_FORM_ID

    if (!API_KEY || !FORM_ID) {
      console.error('KIT_API_KEY ou KIT_FORM_ID manquant dans .env.local')
      return NextResponse.json(
        { message: 'Configuration serveur manquante' },
        { status: 500 }
      )
    }

    // Appel API Kit (ConvertKit) v3
    const response = await fetch(
      `https://api.convertkit.com/v3/forms/${FORM_ID}/subscribe`,
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json; charset=utf-8' },
        body: JSON.stringify({
          api_key: API_KEY,
          email,
          fields: {
            age_groupe,  // champ personnalisé Kit → pour segmenter
          },
        }),
      }
    )

    if (!response.ok) {
      const error = await response.json()
      console.error('Erreur Kit API:', error)
      return NextResponse.json(
        { message: 'Erreur lors de l\'inscription' },
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
