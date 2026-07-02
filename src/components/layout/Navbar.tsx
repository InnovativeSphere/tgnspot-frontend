'use client'

import { useState, useRef, useEffect } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { usePathname, useRouter } from 'next/navigation'
import { Menu, X, Gamepad2, Search } from 'lucide-react'
import { ThemeToggle } from '@/components/ui/ThemeToggle'
import { BookmarkButton } from '@/components/ui/BookmarkButton'
import { useTGNStore } from '@/store/useTGNStore'

const navLinks = [
  { label: 'Home', href: '/' },
  { label: 'Categories', href: '/categories' },
  { label: 'About', href: '/about' },
]

export function Navbar() {
  const pathname = usePathname()
  const router = useRouter()
  const [mobileOpen, setMobileOpen] = useState(false)
  const [searchOpen, setSearchOpen] = useState(false)
  const [searchQuery, setSearchQuery] = useState('')
  const searchInputRef = useRef<HTMLInputElement>(null)
  const togglePulseModal = useTGNStore((state) => state.togglePulseModal)

  useEffect(() => {
    if (searchOpen && searchInputRef.current) {
      searchInputRef.current.focus()
    }
  }, [searchOpen])

  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setSearchOpen(false)
        setSearchQuery('')
      }
    }
    window.addEventListener('keydown', handleEscape)
    return () => window.removeEventListener('keydown', handleEscape)
  }, [])

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    if (searchQuery.trim()) {
      router.push(`/search?q=${encodeURIComponent(searchQuery.trim())}`)
      setSearchOpen(false)
      setSearchQuery('')
    }
  }

  return (
    <header
      className="sticky top-0 z-50 w-full border-b bg-theme-bg border-theme-border"
      data-theme="dark"
    >
      <div className="mx-auto max-w-7xl px-6 py-3 flex items-center justify-between gap-4">
        {/* Logo */}
        <Link href="/" className="flex items-center shrink-0">
          <Image
            src="/Logo1.png"
            alt="TGNSpot Logo"
            width={120}
            height={40}
            className="h-8 w-auto object-contain"
            priority
          />
        </Link>

        {/* Desktop Navigation – hidden when search is open */}
        {!searchOpen && (
          <nav className="hidden md:flex items-center gap-8 font-body text-sm font-medium text-white/70">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={`relative py-1 transition-colors hover:text-white ${
                  pathname === link.href
                    ? 'text-white after:absolute after:bottom-0 after:left-0 after:w-full after:h-0.5 after:bg-orange after:rounded-full'
                    : ''
                }`}
              >
                {link.label}
              </Link>
            ))}
          </nav>
        )}

        {/* Search bar */}
        {searchOpen ? (
          <form onSubmit={handleSearch} className="flex-1 flex items-center gap-2 max-w-md">
            <input
              ref={searchInputRef}
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search posts..."
              className="w-full bg-theme-surface border border-theme-border rounded-full px-4 py-1.5 text-sm text-white placeholder:text-white/40 focus:outline-none focus:border-orange"
            />
            <button
              type="button"
              onClick={() => {
                setSearchOpen(false)
                setSearchQuery('')
              }}
              className="text-white/70 hover:text-white transition-colors"
            >
              <X size={18} />
            </button>
          </form>
        ) : (
          <div className="flex items-center gap-2 ml-auto">
            <button
              onClick={() => setSearchOpen(true)}
              className="p-2 text-white/70 hover:text-orange transition-colors"
              aria-label="Search"
            >
              <Search size={20} />
            </button>
            <div className="hidden md:flex items-center gap-2">
              <button
                onClick={togglePulseModal}
                className="p-2 text-white/70 hover:text-orange transition-colors"
                aria-label="Open pulse"
              >
                <Gamepad2 size={20} />
              </button>
              <ThemeToggle />
              <BookmarkButton slug="global-header" />
            </div>
            <button
              className="md:hidden p-2 text-white/70 hover:text-white transition-colors"
              onClick={() => setMobileOpen(true)}
              aria-label="Open menu"
            >
              <Menu size={24} />
            </button>
          </div>
        )}
      </div>

      {/* Mobile Slide‑in Panel */}
      {mobileOpen && (
        <div className="fixed inset-0 z-50 md:hidden">
          <div
            className="absolute inset-0 bg-black/50 backdrop-blur-sm"
            onClick={() => setMobileOpen(false)}
          />
          <div
            className="absolute right-0 top-0 h-full w-72 bg-theme-bg border-l border-theme-border shadow-2xl p-6 flex flex-col"
            data-theme="dark"
          >
            <div className="flex items-center justify-between mb-8">
              <span className="font-heading text-lg font-bold text-white">Menu</span>
              <button
                onClick={() => setMobileOpen(false)}
                className="p-1.5 rounded-lg text-white/70 hover:text-white hover:bg-theme-surface transition-colors"
                aria-label="Close menu"
              >
                <X size={24} />
              </button>
            </div>

            {/* Mobile Search */}
            <form
              onSubmit={(e) => {
                e.preventDefault()
                handleSearch(e)
                setMobileOpen(false)
              }}
              className="mb-6"
            >
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search posts..."
                className="w-full bg-theme-surface border border-theme-border rounded-full px-4 py-2 text-sm text-white placeholder:text-white/40 focus:outline-none focus:border-orange"
              />
            </form>

            <nav className="flex flex-col gap-1 font-body text-base font-medium">
              {navLinks.map((link, index) => (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setMobileOpen(false)}
                  className="px-3 py-2 rounded-lg text-white/80 hover:text-white hover:bg-theme-surface transition-colors"
                  style={{
                    animation: `fade-in-right 0.3s ease-out forwards`,
                    animationDelay: `${index * 80}ms`,
                    opacity: 0,
                  }}
                >
                  <span
                    className={
                      pathname === link.href ? 'border-l-2 border-orange pl-2' : ''
                    }
                  >
                    {link.label}
                  </span>
                </Link>
              ))}
            </nav>

            <div className="mt-auto pt-6 border-t border-theme-border flex items-center justify-between">
              <button
                onClick={() => {
                  togglePulseModal()
                  setMobileOpen(false)
                }}
                className="p-2 text-white/70 hover:text-white transition-colors"
                aria-label="Open pulse"
                style={{
                  animation: `fade-in-right 0.3s ease-out forwards`,
                  animationDelay: '300ms',
                  opacity: 0,
                }}
              >
                <Gamepad2 size={20} />
              </button>
              <ThemeToggle />
              <BookmarkButton slug="mobile-header" />
            </div>
          </div>
        </div>
      )}
    </header>
  )
}