'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'

const links = [
  { href: '/', label: 'Home' },
  { href: '/blog', label: 'Blog' },
  { href: '/about', label: 'About' },
]

export default function Navigation() {
  const pathname = usePathname()

  return (
    <header className="bg-beige/85 backdrop-blur-md border-b border-beige-300 sticky top-0 z-50">
      <nav className="max-w-5xl mx-auto px-4 py-3 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2.5 group">
          {/* Paper-cut sprout */}
          <svg className="w-9 h-9" viewBox="0 0 40 40" fill="none" aria-hidden="true">
            <circle cx="20" cy="20" r="19" fill="#F2E8D5" />
            <path d="M20 31 V18" stroke="#3D3028" strokeWidth="2.5" strokeLinecap="round" />
            <path d="M20 20 C12 20 11 12 11 10 C18 10 20 14 20 20 Z" fill="#7A9E7A" />
            <path d="M20 17 C28 17 29 9 29 7 C22 7 20 11 20 17 Z" fill="#B86A3E" />
          </svg>
          <div>
            <div className="font-serif font-bold text-brun text-lg leading-tight group-hover:text-terracotta transition-colors">Parent AI</div>
            <div className="text-brun-light text-xs leading-tight">Growing Up with AI</div>
          </div>
        </Link>

        <ul className="flex gap-1">
          {links.map(({ href, label }) => {
            const isActive = pathname === href || (href !== '/' && pathname.startsWith(href))
            return (
              <li key={href}>
                <Link
                  href={href}
                  className={`px-3 py-2 rounded-full text-sm font-medium transition-colors ${
                    isActive
                      ? 'bg-terracotta text-white'
                      : 'text-brun hover:bg-beige-200 hover:text-brun'
                  }`}
                >
                  {label}
                </Link>
              </li>
            )
          })}
        </ul>
      </nav>
    </header>
  )
}
