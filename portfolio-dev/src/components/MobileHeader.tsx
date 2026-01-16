"use client"

import Lottie from "lottie-react"
import { ThemeToggleButton } from "./themeToggle"

interface MobileHeaderProps {
  animationData: any
  isMobileMenuOpen: boolean
  onToggleMenu: () => void
  onNavClick?: (elementId: string) => void
}

export default function MobileHeader({ 
  animationData, 
  isMobileMenuOpen, 
  onToggleMenu,
  onNavClick 
}: MobileHeaderProps) {
  
  const handleContactClick = () => {
    // Close mobile menu
    onToggleMenu()
    
    // Scroll to experience section
    setTimeout(() => {
      const experienceSection = document.getElementById("experience")
      
      if (experienceSection) {
        const headerOffset = 100
        const elementPosition = experienceSection.getBoundingClientRect().top + window.pageYOffset
        const offsetPosition = elementPosition - headerOffset

        window.scrollTo({
          top: offsetPosition,
          behavior: "smooth",
        })

        // Wait for scroll, then trigger the opportunity card
        setTimeout(() => {
          const opportunityCard = document.querySelector('[data-opportunity-card]') as HTMLElement
          if (opportunityCard) {
            // Highlight effect
            opportunityCard.classList.add('ring-4', 'ring-violet-500', 'ring-opacity-75')
            
            // Click to open if not already open
            const isFormOpen = opportunityCard.querySelector('[data-recruiter-form]')
            if (!isFormOpen) {
              opportunityCard.click()
            }

            // Remove highlight after animation
            setTimeout(() => {
              opportunityCard.classList.remove('ring-4', 'ring-violet-500', 'ring-opacity-75')
            }, 2000)
          }
        }, 800)
      }
    }, 300) // Wait for menu close animation
  }

  return (
    <header className="sticky top-4 z-[9999] mx-4 flex w-auto flex-row items-center justify-between rounded-full bg-slate-950/80 dark:bg-slate-950/85 backdrop-blur-md border border-violet-500/20 shadow-lg md:hidden px-4 py-3">
      <div className="flex items-center justify-center">
        {animationData && (
          <div className="w-10 h-10">
            <Lottie animationData={animationData} loop={true} />
          </div>
        )}
      </div>

      <ThemeToggleButton
        variant="circle"
        start="center"
        blur={false}
        className="size-8 hover:scale-105 transition-transform duration-200 z-50"
      />

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