"use client"

interface MobileMenuProps {
  isOpen: boolean
  onNavClick: (elementId: string) => void
  onDownloadCV: () => void
}

const NAV_ITEMS = [
  { id: "about", label: "About" },
  { id: "projects", label: "Projects" },
  { id: "skills", label: "Skills" },
  { id: "contact", label: "Contact" },
]

export default function MobileMenu({ isOpen, onNavClick, onDownloadCV }: MobileMenuProps) {
  if (!isOpen) return null

  return (
    <div className="fixed inset-0 z-[9998] bg-black/70 backdrop-blur-sm md:hidden">
      <div className="absolute top-20 left-4 right-4 bg-slate-900/95 backdrop-blur-md border border-violet-500/30 rounded-2xl shadow-2xl p-6">
        <nav className="flex flex-col space-y-4">
          {NAV_ITEMS.map((item) => (
            <button
              key={item.id}
              onClick={() => onNavClick(item.id)}
              className="text-left px-4 py-3 text-lg font-medium text-violet-300 hover:text-violet-200 transition-colors rounded-lg hover:bg-violet-950/50"
            >
              {item.label}
            </button>
          ))}
          <div className="border-t border-violet-500/20 pt-4 mt-4 flex flex-col space-y-3">
            <button
              onClick={onDownloadCV}
              className="px-4 py-3 text-lg font-bold text-center rounded-lg shadow-lg text-white bg-gradient-to-b from-violet-600 to-violet-700 hover:from-violet-500 hover:to-violet-600 hover:-translate-y-0.5 transition-all duration-200"
            >
              Download CV
            </button>
          </div>
        </nav>
      </div>
    </div>
  )
}
