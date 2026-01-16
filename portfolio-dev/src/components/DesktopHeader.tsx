"use client"

import type React from "react"

import { useRef } from "react"
import { useGSAP } from "@gsap/react"
import gsap from "gsap"
import Lottie from "lottie-react"
import { ThemeToggleButton } from "./themeToggle"

interface DesktopHeaderProps {
  isScrolled: boolean
  animationData: any
  onDownloadCV: () => void
  onNavbarReady: () => void
}

const NAV_ITEMS = [
  { id: "about", label: "About" },
  { id: "projects", label: "Projects" },
  { id: "skills", label: "Skills" },
  { id: "contact", label: "Contact" },
]

export default function DesktopHeader({ isScrolled, animationData, onDownloadCV, onNavbarReady }: DesktopHeaderProps) {
  const navbarRef = useRef<HTMLDivElement>(null)

  useGSAP(() => {
    gsap.set(navbarRef.current, { y: -1000, opacity: 0 })
    gsap.to(navbarRef.current, {
      y: 0,
      opacity: 1,
      duration: 1,
      onComplete: onNavbarReady,
    })
  }, [])

  const handleNavClick = (elementId: string) => (e: React.MouseEvent) => {
    e.preventDefault()
    const element = document.getElementById(elementId)
    if (element) {
      const headerOffset = 120
      const elementPosition = element.getBoundingClientRect().top + window.pageYOffset
      const offsetPosition = elementPosition - headerOffset

      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth",
      })
    }
  }

  return (
    <header
      ref={navbarRef}
      className={`sticky top-4 z-[9999] mx-auto hidden w-full flex-row items-center justify-between self-start rounded-full bg-slate-950/80 dark:bg-slate-950/85 md:flex backdrop-blur-md border border-violet-500/20 shadow-lg transition-all duration-300 ${
        isScrolled ? "max-w-3xl px-6" : "max-w-5xl px-8"
      } py-2`}
      style={{
        willChange: "transform",
        transform: "translateZ(0)",
        backfaceVisibility: "hidden",
        perspective: "1000px",
      }}
    >
      {/* Logo Section */}
      <div className="flex items-center justify-center">
        {animationData && (
          <div className="w-12 h-12">
            <Lottie animationData={animationData} loop={true} />
          </div>
        )}
      </div>

      <div className="flex flex-1 flex-row items-center justify-center space-x-2 text-sm font-medium text-violet-200 dark:text-violet-100 transition duration-200 hover:text-violet-400 md:space-x-4">
        {NAV_ITEMS.map((item) => (
          <a
            key={item.id}
            className="relative px-4 py-2 text-violet-300 dark:text-violet-200 hover:text-violet-400 transition-colors cursor-pointer whitespace-nowrap"
            onClick={handleNavClick(item.id)}
          >
            <span className="relative z-20">{item.label}</span>
          </a>
        ))}
      </div>

      {/* Actions Section */}
      <div className="flex items-center gap-3">
        <ThemeToggleButton
          variant="circle"
          start="center"
          blur={false}
          className="size-9 hover:scale-105 transition-transform duration-200 z-50 relative"
        />

        <button
          onClick={onDownloadCV}
          className="rounded-md font-bold relative cursor-pointer hover:-translate-y-0.5 transition duration-200 inline-block text-center bg-gradient-to-b from-violet-600 to-violet-700 dark:from-violet-600 dark:to-violet-800 text-white shadow-[0px_2px_0px_0px_rgba(168,85,247,0.3)_inset] px-4 py-2 text-sm z-50 hover:shadow-[0_0_20px_rgba(168,85,247,0.5)]"
        >
          Download CV
        </button>
      </div>
    </header>
  )
}
