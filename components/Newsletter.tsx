'use client'

import { useState } from 'react'

const AGE_GROUPS = [
  { value: '3-5', label: '3 – 5 yrs', emoji: '🐣' },
  { value: '6-8', label: '6 – 8 yrs', emoji: '🚀' },
  { value: '9-11', label: '9 – 11 yrs', emoji: '🔬' },
  { value: '12+', label: '12 yrs +', emoji: '🤖' },
]

export default function Newsletter() {
  const [email, setEmail] = useState('')
  const [ageGroup, setAgeGroup] = useState('')
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle')
  const [errorMsg, setErrorMsg] = useState('')

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!email || !ageGroup) return

    setStatus('loading')
    setErrorMsg('')

    try {
      const res = await fetch('/api/newsletter', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, age_groupe: ageGroup }),
      })

      if (!res.ok) {
        const data = await res.json()
        throw new Error(data.message || 'Subscription failed')
      }

      setStatus('success')
    } catch (err: unknown) {
      setStatus('error')
      setErrorMsg(err instanceof Error ? err.message : 'An error occurred')
    }
  }

  if (status === 'success') {
    return (
      <div className="bg-[#F5EFE0] border border-[#7A9E7A] rounded-2xl p-8 text-center">
        <div className="text-4xl mb-3">🎉</div>
        <h3 className="text-xl font-semibold text-[#3D3028] mb-2">
          {"You're in!"}
        </h3>
        <p className="text-[#8B7B6B]">
          Next articles will land directly in your inbox.
        </p>
      </div>
    )
  }

  return (
    <div className="bg-[#F5EFE0] border border-[#B5A898] rounded-2xl p-8">
      <div className="mb-6">
        <h3 className="text-xl font-semibold text-[#3D3028] mb-2">
          Get the next articles
        </h3>
        <p className="text-[#8B7B6B] text-sm leading-relaxed">
          {"A tested activity, a real kid's reaction, zero jargon. Straight to your inbox."}
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-5">
        <div>
          <p className="text-sm font-medium text-[#3D3028] mb-3">
            My child is…
          </p>
          <div className="grid grid-cols-2 gap-2 sm:grid-cols-4">
            {AGE_GROUPS.map((group) => (
              <label
                key={group.value}
                className={`
                  flex flex-col items-center gap-1 p-3 rounded-xl border-2 cursor-pointer
                  transition-all duration-150 text-center
                  ${ageGroup === group.value
                    ? 'border-[#B86A3E] bg-[#B86A3E]/10 text-[#B86A3E]'
                    : 'border-[#B5A898] bg-white text-[#8B7B6B] hover:border-[#B86A3E]/50'
                  }
                `}
              >
                <input
                  type="radio"
                  name="age_groupe"
                  value={group.value}
                  checked={ageGroup === group.value}
                  onChange={() => setAgeGroup(group.value)}
                  className="sr-only"
                />
                <span className="text-2xl">{group.emoji}</span>
                <span className="text-xs font-medium leading-tight">{group.label}</span>
              </label>
            ))}
          </div>
        </div>

        <div>
          <label htmlFor="newsletter-email" className="sr-only">
            Email address
          </label>
          <input
            id="newsletter-email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="your@email.com"
            required
            className="
              w-full px-4 py-3 rounded-xl border-2 border-[#B5A898]
              bg-white text-[#3D3028] placeholder-[#B5A898]
              focus:outline-none focus:border-[#B86A3E]
              transition-colors duration-150
            "
          />
        </div>

        {status === 'error' && (
          <p className="text-red-600 text-sm">{errorMsg}</p>
        )}

        <button
          type="submit"
          disabled={!email || !ageGroup || status === 'loading'}
          className="
            w-full py-3 px-6 rounded-xl font-semibold text-white
            bg-[#B86A3E] hover:bg-[#a05a30]
            disabled:opacity-50 disabled:cursor-not-allowed
            transition-colors duration-150
          "
        >
          {status === 'loading' ? 'Subscribing…' : 'Subscribe →'}
        </button>

        <p className="text-xs text-[#B5A898] text-center">
          No spam. Unsubscribe in one click.
        </p>
      </form>
    </div>
  )
}
