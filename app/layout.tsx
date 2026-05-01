import type { Metadata } from 'next'
import localFont from 'next/font/local'
import Navigation from '@/components/Navigation'
import Footer from '@/components/Footer'
import './globals.css'

const geistSans = localFont({
  src: './fonts/GeistVF.woff',
  variable: '--font-geist-sans',
  weight: '100 900',
})

export const metadata: Metadata = {
  metadataBase: new URL('https://www.parent-ia.fr'),
  title: {
    default: 'Parent IA | Grandir avec l\'IA',
    template: '%s | Parent IA',
  },
  description:
    'Un père documente ses expériences pour apprendre l\'intelligence artificielle à ses enfants de façon ludique, concrète, et sans écran. Des activités testées en famille.',
  keywords: [
    'IA enfants', 'intelligence artificielle enfants', 'apprendre IA', 'activités IA famille',
    'éducation IA', 'parent numérique', 'initiation intelligence artificielle', 'activités sans écran',
    'IA ludique', 'apprendre avec les enfants',
  ],
  authors: [{ name: 'Julien Seurat', url: 'https://www.parent-ia.fr/a-propos' }],
  creator: 'Julien Seurat',
  publisher: 'Parent IA',
  openGraph: {
    type: 'website',
    siteName: 'Parent IA',
    locale: 'fr_FR',
    url: 'https://www.parent-ia.fr',
    title: 'Parent IA | Grandir avec l\'IA',
    description: 'Un père documente ses expériences pour apprendre l\'IA à ses enfants de façon ludique, concrète, et sans écran.',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Parent IA | Grandir avec l\'IA',
    description: 'Un père documente ses expériences pour apprendre l\'IA à ses enfants de façon ludique, concrète, et sans écran.',
    creator: '@jujuseurat',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  alternates: {
    canonical: 'https://www.parent-ia.fr',
  },
  verification: {
    google: 'XoeRZQvfM7EGDEH8H5k10Vk2a2K8LAgLbVhHtmLmIEs',
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="fr">
      <body className={`${geistSans.variable} font-sans antialiased bg-beige-50 text-brun`}>
        <Navigation />
        <main className="min-h-screen">{children}</main>
        <Footer />
      </body>
    </html>
  )
}
