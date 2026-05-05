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
  metadataBase: new URL('https://www.parent-ia.eu'),
  title: {
    default: 'Parent AI | Growing Up with AI',
    template: '%s | Parent AI',
  },
  description:
    'A father documenting his experiences teaching artificial intelligence to his 6 and 3-year-old children through hands-on, playful, screen-free activities.',
  keywords: [
    'AI for kids', 'artificial intelligence children', 'teach AI kids', 'AI activities family',
    'AI education', 'digital parenting', 'intro to AI', 'screen-free activities',
    'playful AI', 'learning with kids',
  ],
  authors: [{ name: 'Julien Seurat', url: 'https://www.parent-ia.eu/about' }],
  creator: 'Julien Seurat',
  publisher: 'Parent AI',
  openGraph: {
    type: 'website',
    siteName: 'Parent AI',
    locale: 'en_US',
    url: 'https://www.parent-ia.eu',
    title: 'Parent AI | Growing Up with AI',
    description: 'A father teaching AI to his kids through hands-on, screen-free activities.',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Parent AI | Growing Up with AI',
    description: 'A father teaching AI to his kids through hands-on, screen-free activities.',
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
    canonical: 'https://www.parent-ia.eu',
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body className={`${geistSans.variable} font-sans antialiased bg-beige-50 text-brun`}>
        <Navigation />
        <main className="min-h-screen">{children}</main>
        <Footer />
      </body>
    </html>
  )
}
