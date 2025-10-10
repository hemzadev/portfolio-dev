'use client'
import { useState, useEffect } from 'react'
import HeroSection from '@/components/hero-section'
import TechLogoLoop from '@/components/TechLogoLoop'
import DesktopHeader from '@/components/DesktopHeader'
import MobileHeader from '@/components/MobileHeader'
import MobileMenu from '@/components/MobileMenu'

export default function Home() {
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [animationData, setAnimationData] = useState(null)
  const [isNavbarReady, setIsNavbarReady] = useState(false)

  useEffect(() => {
    const root = window.document.documentElement
    root.classList.remove("light", "system")
    root.classList.add("dark")
  }, [])

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 100)
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  useEffect(() => {
    fetch("/avatar-animation.json")
      .then((res) => res.json())
      .then((data) => setAnimationData(data))
  }, [])

  const handleMobileNavClick = (elementId: string) => {
    setIsMobileMenuOpen(false)
    setTimeout(() => {
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
    }, 100)
  }

  const handleDownloadCV = () => {
    const link = document.createElement("a")
    link.href = "/cv.pdf"
    link.download = "CV.pdf"
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
  }

  return (
    <div className="min-h-screen bg-black relative">
      <div className="min-h-screen w-full relative bg-black">
        {/* Pearl Mist Background with Top Glow */}
        <div
          className="absolute inset-0 z-0"
          style={{
            background: "radial-gradient(125% 125% at 50% 10%, #fff 40%, #6366f1 100%)",
          }}
        />

        <DesktopHeader
          isScrolled={isScrolled}
          animationData={animationData}
          onDownloadCV={handleDownloadCV}
          onNavbarReady={() => setIsNavbarReady(true)}
        />

        <MobileHeader
          animationData={animationData}
          isMobileMenuOpen={isMobileMenuOpen}
          onToggleMenu={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        />

        <MobileMenu
          isOpen={isMobileMenuOpen}
          onNavClick={handleMobileNavClick}
          onDownloadCV={handleDownloadCV}
        />

        <HeroSection />
        <TechLogoLoop />
      </div>
    </div>
  )
}