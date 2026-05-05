import type { Metadata } from 'next'
import Link from 'next/link'
import AudioPlayer from '@/components/AudioPlayer'

export const metadata: Metadata = {
  title: 'À propos',
  description: 'Je m\'appelle Julien. Romane a 6 ans, Meryl en a 3. Ce blog raconte comment j\'essaie de leur expliquer l\'IA avec du papier, des jeux, et beaucoup de ratés.',
  alternates: {
    canonical: 'https://www.parent-ia.fr/a-propos',
  },
  openGraph: {
    title: 'À propos | Parent IA',
    description: 'Je m\'appelle Julien. Romane a 6 ans, Meryl en a 3. Ce blog raconte comment j\'essaie de leur expliquer l\'IA avec du papier, des jeux, et beaucoup de ratés.',
    url: 'https://www.parent-ia.fr/a-propos',
    type: 'website',
  },
}

// Pour activer un vocal : décommenter la ligne et déposer le fichier dans public/audio/a-propos/
const AUDIO = {
  julien: {
    src: '/audio/a-propos/julien-pourquoi-ce-blog.mp3',
    label: 'Julien, le papa',
    description: 'Pourquoi j\'ai créé ce blog',
    enabled: false, // passer à true quand le fichier est déposé
  },
  romane: {
    src: '/audio/a-propos/romane-cia-pour-toi.mp3',
    label: 'Romane, 6 ans',
    description: "C'est quoi l'IA pour toi ?",
    enabled: false,
  },
  meryl: {
    src: '/audio/a-propos/meryl-cia-pour-toi.mp3',
    label: 'Meryl, 3 ans',
    description: "C'est quoi l'IA pour toi ?",
    enabled: false,
  },
}

export default function AProposPage() {
  const anyAudioEnabled = Object.values(AUDIO).some(a => a.enabled)

  return (
    <div className="max-w-2xl mx-auto px-4 py-12">
      <h1 className="text-3xl font-bold text-brun mb-8">À propos</h1>

      <div className="bg-beige-100 rounded-2xl p-6 mb-8 flex items-start gap-4">
        <div className="text-5xl flex-shrink-0">👨‍👧‍👦</div>
        <div>
          <p className="text-brun font-semibold text-lg mb-1">Un père, deux enfants, plein de curiosité</p>
          <p className="text-brun-light leading-relaxed">
            Romane avait rangé le ketchup avec ses chaussettes et un tournevis. Son critère : &ldquo;les trucs rouges&rdquo;.
            Je n&apos;avais rien à redire. C&apos;est de là qu&apos;est parti ce blog.
          </p>
        </div>
      </div>

      <div className="space-y-6 text-brun-light leading-relaxed">
        <p>
          Je m&apos;appelle Julien. Romane a 6 ans, Meryl en a 3. Je travaille dans le numérique.
          Un soir au dîner, Romane a demandé ce que c&apos;était &ldquo;l&apos;IA dont tout le monde parle&rdquo;.
          J&apos;ai cherché mes mots. Rien de bon n&apos;est sorti.
        </p>

        <p>
          J&apos;aurais pu lui montrer ChatGPT. Mais je voulais autre chose : qu&apos;elle comprenne
          la logique avant l&apos;outil. La décision, le tri, la reconnaissance de formes.
          Avec les mains, pas un écran.
        </p>

        <p>
          Alors on a commencé à inventer des jeux. Du papier, des dés, des objets du salon.
          Meryl participait surtout en renversant les piles. Et quelque chose s&apos;est passé :
          ça a marché. Pas toujours comme prévu. Mais ça a marché.
        </p>

        <p>
          Ce blog, c&apos;est ce que j&apos;ai noté en chemin. Ce qui a accroché, ce qui a raté,
          et ce que ça nous a appris, à eux, et à moi surtout.
        </p>

        <div className="bg-sauge-100 rounded-2xl p-5 border-l-4 border-sauge my-6">
          <p className="text-brun font-medium">
            Je ne suis pas enseignant. Je ne suis pas chercheur en IA.
            Je suis juste un père qui cherche à transmettre quelque chose d&apos;utile, de manière humaine et joyeuse.
          </p>
        </div>

        <p>
          Si vous êtes parent, éducateur, ou simplement curieux, bienvenue.
          Les activités se font chez vous, avec ce que vous avez sous la main.
        </p>
      </div>

      {/* Section vocaux — apparaît automatiquement dès qu'un fichier est activé */}
      {anyAudioEnabled && (
        <div className="mt-10">
          <h2 className="text-xl font-bold text-brun mb-2">En voix</h2>
          <p className="text-brun-light text-sm mb-5">
            Parce que certaines choses se ressentent mieux qu&apos;elles ne s&apos;expliquent.
          </p>
          <div className="space-y-3">
            {AUDIO.julien.enabled && (
              <AudioPlayer
                src={AUDIO.julien.src}
                label={AUDIO.julien.label}
                description={AUDIO.julien.description}
              />
            )}
            {AUDIO.romane.enabled && (
              <AudioPlayer
                src={AUDIO.romane.src}
                label={AUDIO.romane.label}
                description={AUDIO.romane.description}
              />
            )}
            {AUDIO.meryl.enabled && (
              <AudioPlayer
                src={AUDIO.meryl.src}
                label={AUDIO.meryl.label}
                description={AUDIO.meryl.description}
              />
            )}
          </div>
        </div>
      )}

      <div className="mt-10 flex flex-col sm:flex-row gap-3">
        <Link
          href="/blog"
          className="inline-block bg-terracotta hover:bg-terracotta-500 text-white font-semibold px-6 py-3 rounded-xl transition-colors text-center"
        >
          Lire les articles
        </Link>
        <Link
          href="/"
          className="inline-block bg-beige-200 hover:bg-sauge-100 text-brun font-semibold px-6 py-3 rounded-xl transition-colors text-center"
        >
          Retour à l&apos;accueil
        </Link>
      </div>
    </div>
  )
}
