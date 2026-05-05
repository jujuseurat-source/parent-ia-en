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
    <header className="bg-beige border-b border-beige-200 sticky top-0 z-50">
      <nav className="max-w-3xl mx-auto px-4 py-4 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2 group">
          <span className="text-2xl">🌱</span>
          <div>
            <div className="font-bold text-brun text-lg leading-tight">Parent AI</div>
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
                  className={`px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
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
