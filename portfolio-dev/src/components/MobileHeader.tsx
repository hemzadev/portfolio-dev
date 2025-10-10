import Lottie from "lottie-react"

interface MobileHeaderProps {
  animationData: any
  isMobileMenuOpen: boolean
  onToggleMenu: () => void
}

export default function MobileHeader({ animationData, isMobileMenuOpen, onToggleMenu }: MobileHeaderProps) {
  return (
    <header className="sticky top-4 z-[9999] mx-4 flex w-auto flex-row items-center justify-between rounded-full bg-background/80 backdrop-blur-sm border border-border/50 shadow-lg md:hidden px-4 py-3">
      <div className="flex items-center justify-center">
        {animationData && (
          <div className="w-10 h-10">
            <Lottie animationData={animationData} loop={true} />
          </div>
        )}
      </div>

      <button
        onClick={onToggleMenu}
        className="flex items-center justify-center w-10 h-10 rounded-full border border-border/50 transition-colors hover:opacity-90"
        style={{
          background: "linear-gradient(135deg, #6366f1, #8b5cf6)",
        }}
        aria-label="Toggle menu"
      >
        <div className="flex flex-col items-center justify-center w-5 h-5 space-y-1">
          <span
            className={`block w-4 h-0.5 bg-white transition-all duration-300 ${isMobileMenuOpen ? "rotate-45 translate-y-1.5" : ""}`}
          ></span>
          <span
            className={`block w-4 h-0.5 bg-white transition-all duration-300 ${isMobileMenuOpen ? "opacity-0" : ""}`}
          ></span>
          <span
            className={`block w-4 h-0.5 bg-white transition-all duration-300 ${isMobileMenuOpen ? "-rotate-45 -translate-y-1.5" : ""}`}
          ></span>
        </div>
      </button>
    </header>
  )
}