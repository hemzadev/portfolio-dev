"use client"

import { scrollToOpportunity } from "@/lib/scroll-to-opportunity"
import { X } from "lucide-react"

interface MobileMenuProps {
  isOpen: boolean
  onClose: () => void
  onDownloadCV: () => void
}

const NAV_ITEMS = [
  { id: "about", label: "About", disabled: false },
  { id: "projects", label: "Projects", disabled: true },
  { id: "skills", label: "Skills", disabled: false },
  { id: "contact", label: "Contact", disabled: false },
]
export default function MobileMenu({ isOpen, onClose, onDownloadCV }: MobileMenuProps) {


const handleNavClick = (elementId: string, disabled: boolean) => {
  if (disabled) return

  onClose()

  setTimeout(() => {
    if (elementId === "contact") {
      scrollToOpportunity({ headerOffset: 100 })
      return
    }

    const el = document.getElementById(elementId)
    if (!el) return

    const headerOffset = 100
    const top = el.getBoundingClientRect().top + window.pageYOffset - headerOffset
    window.scrollTo({ top, behavior: "smooth" })
  }, 250)
}

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 z-[9998] md:hidden">
      {/* Backdrop */}
      <div className="absolute inset-0 bg-black/70 backdrop-blur-sm" onClick={onClose} />

      {/* Menu Panel */}
      <div className="absolute top-20 left-4 right-4 bg-slate-950/95 backdrop-blur-md border border-violet-500/20 rounded-2xl shadow-2xl shadow-violet-500/20 overflow-hidden mt-4">

        {/* Navigation Items */}
        <nav className="flex flex-col p-6 space-y-2">
          {NAV_ITEMS.map((item) => (
            <button
              key={item.id}
              onClick={() => handleNavClick(item.id, item.disabled)}
              disabled={item.disabled}
              className={`relative text-left px-4 py-3 rounded-lg transition-all ${
                item.disabled
                  ? "text-violet-300/30 cursor-not-allowed"
                  : "text-violet-200 hover:text-violet-400 hover:bg-violet-500/10 cursor-pointer"
              }`}
            >
              <span className="text-lg font-medium">{item.label}</span>
              {item.disabled && (
                <span className="ml-2 text-xs bg-slate-800 text-slate-400 px-2 py-1 rounded-full">
                  Coming Soon
                </span>
              )}
            </button>
          ))}
        </nav>

        {/* Divider */}
        <div className="border-t border-violet-500/20 mx-6" />

        {/* Download CV Button */}
        <div className="p-6">
        <button
          onClick={() => {
            onClose()
            onDownloadCV()
          }}
          className="w-full rounded-lg font-bold cursor-pointer transition duration-200 bg-gradient-to-b from-violet-600 to-violet-700 text-white shadow-[0px_2px_0px_0px_rgba(168,85,247,0.3)_inset] px-6 py-3 text-base hover:shadow-[0_0_20px_rgba(168,85,247,0.5)] hover:-translate-y-0.5"
        >
          Download CV
        </button>
        </div>
      </div>
    </div>
  )
}
