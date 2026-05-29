import type { Metadata } from 'next'
import Link from 'next/link'
import AudioPlayer from '@/components/AudioPlayer'

export const metadata: Metadata = {
  title: 'About',
  description: 'My name is Julien. Romane is 6, Meryl is 3. This blog is about how I try to teach them AI through play, no screens, and plenty of failures.',
  alternates: {
    canonical: 'https://www.parent-ai.eu/about',
  },
  openGraph: {
    title: 'About | Parent AI',
    description: 'My name is Julien. Romane is 6, Meryl is 3. This blog is about how I try to teach them AI through play, no screens, and plenty of failures.',
    url: 'https://www.parent-ai.eu/about',
    type: 'website',
  },
}

const AUDIO = {
  julien: {
    src: '/audio/a-propos/julien-why-this-blog.mp3',
    label: 'Julien, the dad',
    description: 'Why I created this blog',
    enabled: true,
  },
  romane: {
    src: '/audio/a-propos/romane-cia-pour-toi.mp3',
    label: 'Romane, age 6',
    description: 'What is AI to you?',
    enabled: false,
  },
  meryl: {
    src: '/audio/a-propos/meryl-cia-pour-toi.mp3',
    label: 'Meryl, age 3',
    description: 'What is AI to you?',
    enabled: false,
  },
}

export default function AboutPage() {
  const anyAudioEnabled = Object.values(AUDIO).some(a => a.enabled)

  return (
    <div className="max-w-2xl mx-auto px-4 py-12">
      <h1 className="text-3xl font-bold text-brun mb-8">About</h1>

      <div className="bg-beige-100 rounded-2xl p-6 mb-8 flex items-start gap-4">
        <div className="text-5xl flex-shrink-0">👨‍👧‍👦</div>
        <div>
          <p className="text-brun font-semibold text-lg mb-1">A father, two kids, a lot of curiosity</p>
          <p className="text-brun-light leading-relaxed">
            Romane asked me if AI dreams. I didn&apos;t know what to say.
            Not because the question is hard. Because I didn&apos;t have the right words.
            That&apos;s where all of this started.
          </p>
        </div>
      </div>

      <div className="space-y-6 text-brun-light leading-relaxed">
        <p>
          My name is Julien. Romane is 6, Meryl is 3. I work in tech.
          One evening, we took Ary out of its box — a connected plush toy with built-in AI.
          They shouted at it, flipped it in every direction, asked two contradictory questions
          in the same sentence. An hour of complete chaos.
        </p>

        <p>
          What I understood that evening: their brains were recording something, even without
          understanding it. The quality of the answer depends on the quality of the question.
          They didn&apos;t know that yet. But they were in the process of discovering it.
        </p>

        <p>
          I could have explained it. But at 3 and 6, a talk about AI lasts thirty seconds
          before we&apos;re talking about something else. So we started inventing games instead.
          Paper, dice, objects from the living room. Meryl mostly participated by knocking things over.
          And something happened: it worked. Not always as planned. But it worked.
        </p>

        <p>
          This blog is what I noted along the way. What stuck, what failed,
          and what it taught us — them, and mostly me.
        </p>

        <div className="bg-sauge-100 rounded-2xl p-5 border-l-4 border-sauge my-6">
          <p className="text-brun font-medium">
            I&apos;m not a teacher. I&apos;m not an AI researcher.
            I&apos;m just a father trying to pass something useful on, in a human and joyful way.
          </p>
        </div>

        <p>
          If you&apos;re a parent, an educator, or simply curious, welcome.
          The activities happen at home, with whatever you have at hand.
        </p>
      </div>

      {anyAudioEnabled && (
        <div className="mt-10">
          <h2 className="text-xl font-bold text-brun mb-2">In his own words</h2>
          <p className="text-brun-light text-sm mb-5">
            Julien in a few minutes.
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
          Read the articles
        </Link>
        <Link
          href="/"
          className="inline-block bg-beige-200 hover:bg-sauge-100 text-brun font-semibold px-6 py-3 rounded-xl transition-colors text-center"
        >
          Back to home
        </Link>
      </div>
    </div>
  )
}
