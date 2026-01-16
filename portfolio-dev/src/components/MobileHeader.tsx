"use client"

import Lottie from "lottie-react"

interface MobileHeaderProps {
  animationData: any
  isMobileMenuOpen: boolean
  onToggleMenu: () => void
}

export default function MobileHeader({ animationData, isMobileMenuOpen, onToggleMenu }: MobileHeaderProps) {
  return (
    <header className="sticky top-4 z-[9999] mx-4 flex w-auto flex-row items-center justify-between rounded-full bg-slate-950/80 backdrop-blur-md border border-violet-500/20 shadow-lg md:hidden px-4 py-3">
      <div className="flex items-center justify-center">
        {animationData && (
          <div className="w-10 h-10">
            <Lottie animationData={animationData} loop={true} />
          </div>
        )}
      </div>

      <button
        onClick={onToggleMenu}
        className="flex items-center justify-center w-10 h-10 rounded-full border border-violet-500/30 transition-colors hover:opacity-90 shadow-lg"
        style={{
          background: "linear-gradient(135deg, #a855f7, #9333ea)",
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
