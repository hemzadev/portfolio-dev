import { useRef } from 'react'
import { useGSAP } from '@gsap/react'
import gsap from 'gsap'
import Lottie from "lottie-react"
import { ThemeToggleButton } from './themeToggle'
import { Skiper4 } from './skiper4'

interface DesktopHeaderProps {
  isScrolled: boolean
  animationData: any
  onDownloadCV: () => void
  onNavbarReady: () => void
}

const NAV_ITEMS = [
  { id: 'about', label: 'About' },
  { id: 'projects', label: 'Projects' },
  { id: 'skills', label: 'Skills' },
  { id: 'contact', label: 'Contact' },
]

export default function DesktopHeader({ isScrolled, animationData, onDownloadCV, onNavbarReady }: DesktopHeaderProps) {
  const navbarRef = useRef<HTMLDivElement>(null)

  useGSAP(() => {
    gsap.set(navbarRef.current, { y: -1000, opacity: 0 })
    gsap.to(navbarRef.current, {
      y: 0,
      opacity: 1,
      duration: 1,
      onComplete: onNavbarReady
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
      className={`sticky top-4 z-[9999] mx-auto hidden w-full flex-row items-center justify-between self-start rounded-full bg-indigo-700/40 dark:bg-indigo-900/40 md:flex backdrop-blur-sm border border-border/50 shadow-lg transition-all duration-300 ${
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

      {/* Navigation Items */}
      <div className="flex flex-1 flex-row items-center justify-center space-x-2 text-sm font-medium text-zinc-100 dark:text-zinc-200 transition duration-200 hover:text-foreground md:space-x-4">
        {NAV_ITEMS.map((item) => (
          <a
            key={item.id}
            className="relative px-4 py-2 text-zinc-50 dark:text-zinc-100 hover:text-foreground transition-colors cursor-pointer whitespace-nowrap"
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
          className="rounded-md font-bold relative cursor-pointer hover:-translate-y-0.5 transition duration-200 inline-block text-center bg-gradient-to-b from-indigo-500 to-indigo-600 dark:from-indigo-600 dark:to-indigo-700 text-white shadow-[0px_2px_0px_0px_rgba(255,255,255,0.2)_inset] px-4 py-2 text-sm z-50"
        >
          Download CV
        </button>
      </div>
    </header>
  )
}