interface MobileMenuProps {
    isOpen: boolean
    onNavClick: (elementId: string) => void
    onDownloadCV: () => void
  }
  
  const NAV_ITEMS = [
    { id: 'about', label: 'About' },
    { id: 'projects', label: 'Projects' },
    { id: 'skills', label: 'Skills' },
    { id: 'contact', label: 'Contact' },
  ]
  
  export default function MobileMenu({ isOpen, onNavClick, onDownloadCV }: MobileMenuProps) {
    if (!isOpen) return null
  
    return (
      <div className="fixed inset-0 z-[9998] bg-black/50 backdrop-blur-sm md:hidden">
        <div className="absolute top-20 left-4 right-4 bg-background/95 backdrop-blur-md border border-border/50 rounded-2xl shadow-2xl p-6">
          <nav className="flex flex-col space-y-4">
            {NAV_ITEMS.map((item) => (
              <button
                key={item.id}
                onClick={() => onNavClick(item.id)}
                className="text-left px-4 py-3 text-lg font-medium text-muted-foreground hover:text-foreground transition-colors rounded-lg hover:bg-background/50"
              >
                {item.label}
              </button>
            ))}
            <div className="border-t border-border/50 pt-4 mt-4 flex flex-col space-y-3">
              <button
                onClick={onDownloadCV}
                className="px-4 py-3 text-lg font-bold text-center rounded-lg shadow-lg text-white bg-gradient-to-b from-indigo-500 to-indigo-600 hover:from-indigo-400 hover:to-indigo-500 hover:-translate-y-0.5 transition-all duration-200"
              >
                Download CV
              </button>
            </div>
          </nav>
        </div>
      </div>
    )
  }