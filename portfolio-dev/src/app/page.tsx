'use client'
import { useState, useEffect, useRef } from 'react'
import Lottie from "lottie-react";
import HeroSection from '@/components/hero-section';
import { motion } from 'motion/react';
import { useGSAP } from '@gsap/react';

import gsap from 'gsap'

export default function Home() {
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [animationData, setAnimationData] = useState(null)
  const [isNavbarReady, setIsNavbarReady] = useState(false) // Add this state

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
    // Load the Lottie animation
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
    // Replace with your actual CV file path
    const link = document.createElement("a")
    link.href = "/cv.pdf" // Make sure to add your CV file to the public folder
    link.download = "CV.pdf"
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
  }

  const navbarRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    // Set initial state
    gsap.set(navbarRef.current, { y: -1000, opacity: 5 })
    
    // Animate in
    gsap.to(navbarRef.current, { 
      y: 0, 
      opacity: 5, 
      duration: 1,
      onComplete: () => setIsNavbarReady(true) // Mark as ready after animation
    })
  }, [])
  


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


{/* Desktop Header */}
<header
  ref={navbarRef}
  className={`sticky top-4 z-[9999] mx-auto hidden w-full flex-row items-center justify-between self-start rounded-full bg-background/80 md:flex backdrop-blur-sm border border-border/50 shadow-lg transition-all duration-300 ${
    isScrolled ? "max-w-3xl px-2" : "max-w-5xl px-4"
  } py-2`}
  style={{
    willChange: "transform",
    transform: "translateZ(0)",
    backfaceVisibility: "hidden",
    perspective: "1000px",
    opacity: 0, // Hide initially
  }}
>
        <div
          className={`z-50 flex items-center justify-center transition-all duration-300 ${isScrolled ? "ml-4" : ""}`}
        >
          {animationData && (
            <div className="w-12 h-12">
              <Lottie animationData={animationData} loop={true} />
            </div>
          )}
        </div>

        <div className="absolute inset-0 hidden flex-1 flex-row items-center justify-center space-x-2 text-sm font-medium text-muted-foreground transition duration-200 hover:text-foreground md:flex md:space-x-2">
          <a
            className="relative px-4 py-2 text-muted-foreground hover:text-foreground transition-colors cursor-pointer"
            onClick={(e) => {
              e.preventDefault()
              const element = document.getElementById("about")
              if (element) {
                const headerOffset = 120
                const elementPosition = element.getBoundingClientRect().top + window.pageYOffset
                const offsetPosition = elementPosition - headerOffset

                window.scrollTo({
                  top: offsetPosition,
                  behavior: "smooth",
                })
              }
            }}
          >
            <span className="relative z-20">About</span>
          </a>
          <a
            className="relative px-4 py-2 text-muted-foreground hover:text-foreground transition-colors cursor-pointer"
            onClick={(e) => {
              e.preventDefault()
              const element = document.getElementById("projects")
              if (element) {
                const headerOffset = 120
                const elementPosition = element.getBoundingClientRect().top + window.pageYOffset
                const offsetPosition = elementPosition - headerOffset

                window.scrollTo({
                  top: offsetPosition,
                  behavior: "smooth",
                })
              }
            }}
          >
            <span className="relative z-20">Projects</span>
          </a>
          <a
            className="relative px-4 py-2 text-muted-foreground hover:text-foreground transition-colors cursor-pointer"
            onClick={(e) => {
              e.preventDefault()
              const element = document.getElementById("skills")
              if (element) {
                const headerOffset = 120
                const elementPosition = element.getBoundingClientRect().top + window.pageYOffset
                const offsetPosition = elementPosition - headerOffset

                window.scrollTo({
                  top: offsetPosition,
                  behavior: "smooth",
                })
              }
            }}
          >
            <span className="relative z-20">Skills</span>
          </a>
          <a
            className="relative px-4 py-2 text-muted-foreground hover:text-foreground transition-colors cursor-pointer"
            onClick={(e) => {
              e.preventDefault()
              const element = document.getElementById("contact")
              if (element) {
                const headerOffset = 120
                const elementPosition = element.getBoundingClientRect().top + window.pageYOffset
                const offsetPosition = elementPosition - headerOffset

                window.scrollTo({
                  top: offsetPosition,
                  behavior: "smooth",
                })
              }
            }}
          >
            <span className="relative z-20">Contact</span>
          </a>
        </div>

        <div className="flex items-center gap-4">
          <button
            onClick={handleDownloadCV}
            className="rounded-md font-bold relative cursor-pointer hover:-translate-y-0.5 transition duration-200 inline-block text-center bg-gradient-to-b from-indigo-500 to-indigo-600 text-white shadow-[0px_2px_0px_0px_rgba(255,255,255,0.2)_inset] px-4 py-2 text-sm"
          >
            Download CV
          </button>
        </div>
      </header>

      {/* Mobile Header */}
      <header className="sticky top-4 z-[9999] mx-4 flex w-auto flex-row items-center justify-between rounded-full bg-background/80 backdrop-blur-sm border border-border/50 shadow-lg md:hidden px-4 py-3">
        <div className="flex items-center justify-center">
          {animationData && (
            <div className="w-10 h-10">
              <Lottie animationData={animationData} loop={true} />
            </div>
          )}
        </div>

        <button
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
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

      {/* Mobile Menu Overlay */}
      {isMobileMenuOpen && (
        <div className="fixed inset-0 z-[9998] bg-black/50 backdrop-blur-sm md:hidden">
          <div className="absolute top-20 left-4 right-4 bg-background/95 backdrop-blur-md border border-border/50 rounded-2xl shadow-2xl p-6">
            <nav className="flex flex-col space-y-4">
              <button
                onClick={() => handleMobileNavClick("about")}
                className="text-left px-4 py-3 text-lg font-medium text-muted-foreground hover:text-foreground transition-colors rounded-lg hover:bg-background/50"
              >
                About
              </button>
              <button
                onClick={() => handleMobileNavClick("projects")}
                className="text-left px-4 py-3 text-lg font-medium text-muted-foreground hover:text-foreground transition-colors rounded-lg hover:bg-background/50"
              >
                Projects
              </button>
              <button
                onClick={() => handleMobileNavClick("skills")}
                className="text-left px-4 py-3 text-lg font-medium text-muted-foreground hover:text-foreground transition-colors rounded-lg hover:bg-background/50"
              >
                Skills
              </button>
              <button
                onClick={() => handleMobileNavClick("contact")}
                className="text-left px-4 py-3 text-lg font-medium text-muted-foreground hover:text-foreground transition-colors rounded-lg hover:bg-background/50"
              >
                Contact
              </button>
              <div className="border-t border-border/50 pt-4 mt-4 flex flex-col space-y-3">
                <button
                  onClick={handleDownloadCV}
                  className="px-4 py-3 text-lg font-bold text-center rounded-lg shadow-lg text-white bg-gradient-to-b from-indigo-500 to-indigo-600 hover:from-indigo-400 hover:to-indigo-500 hover:-translate-y-0.5 transition-all duration-200"
                >
                  Download CV
                </button>
              </div>
            </nav>
          </div>
        </div>
        )}
        
        {/*
          <div 
            className="absolute top-0 left-0 right-0 bottom-0"
            style={{
              background: 'radial-gradient(ellipse 120% 80% at 50% 0%, #1e1b4b, transparent 60%)'
            }} 
          />

          <div 
            className="absolute top-0 left-0 right-0 bottom-0"
            style={{
              background: 'radial-gradient(circle 600px at 20% 20%, rgba(139, 92, 246, 0.35), transparent)'
            }} 
          />

          <div 
            className="absolute top-0 left-0 right-0 bottom-0"
            style={{
              background: 'radial-gradient(circle 600px at 80% 80%, rgba(59, 130, 246, 0.35), transparent)'
            }} 
          />
        */}
        <HeroSection />

        
          {/* Grid pattern */}
          <div 
            className="absolute top-0 left-0 right-0 bottom-0"
            style={{
              backgroundImage: `
                linear-gradient(to right, rgba(0,0,0,0.3) 1px, transparent 1px),
                linear-gradient(to bottom, rgba(0,0,0,0.3) 1px, transparent 1px)
              `,
              backgroundSize: '48px 48px'
            }} 
          />

        
        {/* Hero Content */}
        <div className="relative z-10 flex items-center justify-center min-h-screen px-4">
          <div className="text-center max-w-4xl mx-auto">
            <h1 className="text-5xl md:text-7xl font-bold text-black mb-6">
              Welcome to My Website
            </h1>
            <p className="text-xl md:text-2xl text-slate-300 mb-8">
              Experience the future with our cutting-edge platform
            </p>
            <a
              href="#pricing"
              className="inline-block rounded-lg font-bold cursor-pointer hover:-translate-y-1 transition duration-200 bg-gradient-to-b from-primary to-primary/80 text-primary-foreground shadow-lg px-8 py-4 text-lg"
            >
              View Pricing
            </a>
          </div>
        </div>

      </div>
    </div>
  )
}