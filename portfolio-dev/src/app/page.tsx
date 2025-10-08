'use client'
import { useState, useEffect } from 'react'
import Lottie from "lottie-react";
import HeroSection from '@/components/hero-section';
import { motion } from 'motion/react';

export default function Home() {
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [animationData, setAnimationData] = useState(null)

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
<svg
      className="absolute inset-0 z-0 top-[-120px] left-[-50px] w-1/4 h-1/4 pointer-events-none"
      viewBox="0 0 768 500"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      preserveAspectRatio="xMidYMid meet"
      aria-hidden="true"
      style={{ transform: 'rotate(15deg) scale(1.5)' }}
    >
      {/* Outer Mask */}
      <mask
        id="mask0_5_31"
        style={{ maskType: 'luminance' }}
        maskUnits="userSpaceOnUse"
        x="0"
        y="-89"
        width="768"
        height="710"
      >
        <motion.path
          initial={{ pathLength: 0 }}
          whileInView={{ pathLength: 1 }}
          transition={{
            duration: 2,
            ease: 'easeInOut',
          }}
          d="M767.885 272.583L236.396 620.063L0 258.479L531.49 -89L767.885 272.583Z"
          fill="white"
        />
      </mask>

      <g mask="url(#mask0_5_31)">
        {/* Inner Mask */}
        <mask
          id="mask1_5_31"
          style={{ maskType: 'luminance' }}
          maskUnits="userSpaceOnUse"
          x="0"
          y="-89"
          width="768"
          height="710"
        >
          <motion.path
            initial={{ pathLength: 0 }}
            whileInView={{ pathLength: 1 }}
            transition={{
              duration: 2,
              ease: 'easeInOut',
            }}
            d="M767.885 272.583L236.396 620.063L0 258.479L531.49 -89L767.885 272.583Z"
            fill="white"
          />
        </mask>

        {/* Actual Animated Shape */}
        <g mask="url(#mask1_5_31)">
          <motion.path
            initial={{ pathLength: 0 }}
            whileInView={{ pathLength: 1 }}
            transition={{
              duration: 3,
              ease: 'easeInOut',
            }}
            d="M196.427 558.755C198.927 562.505 201.333 566.422 204.719 569.448C208.302 572.214 212.495 574.021 216.531 575.984C231.995 584.005 250.094 585.208 267.13 583.141C289.729 580.187 311.573 570.906 328.995 556.156C341.375 545.656 351.453 532.406 358.005 517.542C364.135 503.88 367.286 489.057 368.687 474.203C370.458 455.979 369.536 437.656 369.766 419.391C370.083 404.526 370.807 389.203 376.635 375.312C380.182 366.578 387.307 358.807 396.76 356.687C408.245 354.083 419.885 357.875 430.651 361.677C454.432 370.583 477.552 382.339 503.021 385.698C523.479 388.625 545.021 385.526 563.167 375.359C585.604 363.099 601.682 340.63 607.458 315.859C613.99 289.286 608.297 260.74 594.979 237.156C581.958 213.542 561.375 195.328 539.776 179.729C522.635 167.01 504.229 155.604 489.599 139.839C477.99 127.365 469.161 111.76 466.786 94.7135C464.729 80.2917 468.026 64.8698 477.089 53.2969C484.927 43.0521 496.172 36.3229 506.818 29.375C519.641 21.099 532.552 12.1406 541.552 -0.432294C551.13 -13.5833 554.667 -30.8281 551.375 -46.7292C548.906 -58.2656 544.062 -69.5365 536.255 -78.4792C532.687 -82.9323 525.526 -84.9167 520.937 -80.7656C512.927 -75.3854 504.823 -70.1354 496.75 -64.8594C476.698 -51.5677 455.807 -39.4792 436.615 -24.9323C430.609 -20.0833 423.88 -13.8073 424.13 -5.42709C423.536 5.8125 432.656 14.4583 433.443 25.4323C434.161 33.2031 431.115 40.8646 426.578 47.0417C418.682 57.849 407.719 65.8333 396.714 73.1927C388.042 79.0521 379.234 85.4583 373.745 94.599C365.557 108.005 365.021 125.094 370.104 139.719C374.255 152.068 382.802 162.38 392.641 170.688C412.495 187.604 436.615 199.375 453.958 219.24C460.854 227.151 467.182 237 466.427 247.943C465.906 256.99 458.771 264.25 450.802 267.703C436.75 274.104 420.88 274.036 405.76 273.151C386.687 271.828 367.562 268.25 348.411 270.635C324.729 273.208 302.359 285.474 287.297 303.901C276.922 316.547 270.344 332.083 267.635 348.167C264.75 364.156 266.042 380.484 267.349 396.568C268.51 411.099 269.344 426.026 265.344 440.224C261.609 454.484 252.755 466.958 241.641 476.453C223.208 492.297 200.016 501.948 176.182 506.005C173.495 506.578 169.932 506.885 168.656 509.766C167.542 513.417 169.937 516.932 171.526 520.057C179.479 533.177 188.109 545.865 196.427 558.755Z"
            fill="#D000FF"
            stroke="#D000FF"
            strokeWidth="2"
          />
        </g>
      </g>
    </svg>

{/* Desktop Header */}
<header
        className={`sticky top-4 z-[9999] mx-auto hidden w-full flex-row items-center justify-between self-start rounded-full bg-background/80 md:flex backdrop-blur-sm border border-border/50 shadow-lg transition-all duration-300 ${
          isScrolled ? "max-w-3xl px-2" : "max-w-5xl px-4"
        } py-2`}
        style={{
          willChange: "transform",
          transform: "translateZ(0)",
          backfaceVisibility: "hidden",
          perspective: "1000px",
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