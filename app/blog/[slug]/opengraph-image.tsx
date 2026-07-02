import { ImageResponse } from 'next/og'
import fs from 'fs'
import path from 'path'
import { getArticleBySlug } from '@/lib/articles'

export const size = { width: 1200, height: 630 }
export const contentType = 'image/png'
export const alt = 'Parent AI — Growing Up with AI'

const MIME: Record<string, string> = {
  '.jpg': 'image/jpeg',
  '.jpeg': 'image/jpeg',
  '.png': 'image/png',
  '.webp': 'image/webp',
}

function loadFont(file: string) {
  return fs.readFileSync(path.join(process.cwd(), 'assets', file))
}

function loadPhoto(image?: string): string | null {
  if (!image) return null
  const filePath = path.join(process.cwd(), 'public', image)
  if (!fs.existsSync(filePath)) return null
  const mime = MIME[path.extname(filePath).toLowerCase()]
  if (!mime) return null
  return `data:${mime};base64,${fs.readFileSync(filePath).toString('base64')}`
}

export default async function OgImage({ params }: { params: { slug: string } }) {
  const article = getArticleBySlug(params.slug)
  const titre = article?.frontmatter.titre ?? 'Parent AI'
  const age = article?.frontmatter.age_cible
  const duree = article?.frontmatter.duree
  const photo = loadPhoto(article?.frontmatter.image)

  // Title size adapts to length and available space
  const base = photo ? [42, 48, 56] : [46, 56, 66]
  const fontSize = titre.length >= 55 ? base[0] : titre.length >= 38 ? base[1] : base[2]

  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          background: '#F5EFE0',
          fontFamily: 'Fraunces',
          position: 'relative',
        }}
      >
        {/* Text column */}
        <div
          style={{
            flex: 1,
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between',
            padding: '52px 56px 60px 56px',
          }}
        >
          {/* Brand */}
          <div style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
            <svg width="52" height="52" viewBox="0 0 40 40" fill="none">
              <circle cx="20" cy="20" r="19" fill="#F2E8D5" />
              <path d="M20 31 V18" stroke="#3D3028" strokeWidth="2.5" strokeLinecap="round" />
              <path d="M20 20 C12 20 11 12 11 10 C18 10 20 14 20 20 Z" fill="#7A9E7A" />
              <path d="M20 17 C28 17 29 9 29 7 C22 7 20 11 20 17 Z" fill="#B86A3E" />
            </svg>
            <div style={{ display: 'flex', fontSize: 30, fontWeight: 600, color: '#3D3028' }}>
              Parent AI
            </div>
          </div>

          {/* Title + badges */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: 28 }}>
            <div
              style={{
                display: 'flex',
                fontSize,
                fontWeight: 600,
                color: '#3D3028',
                lineHeight: 1.15,
              }}
            >
              {titre}
            </div>
            <div style={{ display: 'flex', gap: 14 }}>
              {age && (
                <div
                  style={{
                    display: 'flex',
                    background: 'rgba(184,106,62,0.14)',
                    color: '#B86A3E',
                    borderRadius: 999,
                    padding: '8px 22px',
                    fontSize: 25,
                    fontWeight: 600,
                  }}
                >
                  {age}
                </div>
              )}
              {duree && (
                <div
                  style={{
                    display: 'flex',
                    background: 'rgba(122,158,122,0.16)',
                    color: '#55755A',
                    borderRadius: 999,
                    padding: '8px 22px',
                    fontSize: 25,
                    fontWeight: 600,
                  }}
                >
                  {duree}
                </div>
              )}
            </div>
          </div>

          {/* Footer */}
          <div style={{ display: 'flex', fontSize: 24, color: '#8B7B6B' }}>
            parent-ai.eu · Growing Up with AI
          </div>
        </div>

        {/* Polaroid photo of the activity */}
        {photo && (
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              paddingRight: 60,
            }}
          >
            <div
              style={{
                display: 'flex',
                flexDirection: 'column',
                background: '#FFFFFF',
                padding: '14px 14px 44px 14px',
                borderRadius: 6,
                transform: 'rotate(3deg)',
                boxShadow: '0 14px 40px rgba(61,48,40,0.20)',
              }}
            >
              {/* eslint-disable-next-line @next/next/no-img-element, jsx-a11y/alt-text */}
              <img
                src={photo}
                width={380}
                height={400}
                style={{ objectFit: 'cover', borderRadius: 3 }}
              />
            </div>
          </div>
        )}

        {/* Terracotta strip */}
        <div
          style={{
            position: 'absolute',
            bottom: 0,
            left: 0,
            width: '100%',
            height: 12,
            display: 'flex',
            background: '#B86A3E',
          }}
        />
      </div>
    ),
    {
      ...size,
      fonts: [
        { name: 'Fraunces', data: loadFont('fraunces-latin-600-normal.woff'), weight: 600, style: 'normal' },
        { name: 'Fraunces', data: loadFont('fraunces-latin-400-normal.woff'), weight: 400, style: 'normal' },
      ],
    }
  )
}
