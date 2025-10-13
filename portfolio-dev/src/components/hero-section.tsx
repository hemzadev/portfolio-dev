"use client"

import type React from "react"
import { useGSAP } from "@gsap/react"
import gsap from "gsap"
import { SplitText } from "gsap/all"
import { useRef } from "react"
import CircularText from "./CircularText"
import Lottie from "lottie-react"
import moroccoFlag from "../../public/Morocco flag Lottie JSON animation.json"

export default function HeroSection() {
  const leftRef = useRef<HTMLDivElement>(null)

  useGSAP(() => {
    const heroSplit = new SplitText(".hero-title", { type: "lines" })
    const heroParagraphSplit = new SplitText(".hero-p", { type: "lines" })

    gsap.from(heroSplit.lines, {
      opacity: 0,
      yPercent: 100,
      duration: 0.6,
      ease: "expo.out",
      stagger: 0.06,
      delay: 0.4,
    })

    gsap.from(heroParagraphSplit.lines, {
      opacity: 0,
      yPercent: -200,
      duration: 0.6,
      ease: "expo.out",
      stagger: 0.06,
      delay: 0.6,
    })

    gsap.from(leftRef.current, {
      opacity: 0,
      yPercent: -100,
      duration: 1.5,
      ease: "power3.out",
      delay: 0,
    })
  }, [])

  return (
    <section className="relative flex flex-col lg:grid lg:grid-cols-2 min-h-screen w-full px-4 sm:px-6 lg:px-8 xl:p-52 py-20 lg:py-0 lg:-top-10 gap-12 lg:gap-0">
      {/* Left Side Visuals - Order second on mobile, first on desktop */}
      <div 
        ref={leftRef} 
        className="relative w-full max-w-sm mx-auto lg:mx-0 lg:w-96 order-2 lg:order-1 lg:-top-60 -top-20"
      >
        {/* Top gradient part */}
        <div className="h-16 lg:h-20 w-full bg-gradient-to-t from-indigo-400 via-violet-300 to-transparent"></div>

        {/* Image part */}
        <div className="h-80 lg:h-120 w-full rounded-b-full overflow-hidden">
          <img 
            src="image3.jpeg" 
            alt="Profile" 
            className="w-full h-full object-cover" 
          />
        </div>

        {/* CircularText positioned below the image */}
        <div className="absolute -bottom-10 lg:-bottom-20 left-1/2 -translate-x-1/2 scale-75 lg:scale-100">
          <CircularText 
            text="HAMZA*BEN*AZZA*" 
            onHover="speedUp" 
            spinDuration={10} 
            className="custom-class" 
          />
        </div>
      </div>

      {/* Right Side Text - Order first on mobile, second on desktop */}
      <div className="relative z-10 text-center lg:text-left order-1 lg:order-2 lg:-left-50 lg:-top-20 -top-10">
        <h1 className="hero-title text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold text-black mb-4 lg:mb-6 text-balance leading-tight">
          Salam, my name is{" "}
          <span className="text-indigo-500 block sm:inline">Hamza</span>{" "}
          and I'm a{" "}
          <span className="text-indigo-500 block sm:inline">Software Engineer</span>
        </h1>
        <div className="hero-p text-gray-600 text-base sm:text-lg lg:text-xl max-w-3xl leading-relaxed mx-auto lg:mx-0">
          I'm a software engineer from Morocco{" "}
          <span className="inline-flex items-center">
            <Lottie 
              animationData={moroccoFlag} 
              loop 
              autoplay 
              className="w-5 h-5 sm:w-6 sm:h-6 inline-block" 
            />
          </span>
          , passionate about designing and developing reliable, scalable, and modern digital solutions. My goal is to
          contribute to innovative projects within leading{" "}
          <span className="font-medium text-indigo-600">multinational companies</span> and{" "}
          <span className="font-medium text-indigo-600">financial institutions</span>.
        </div>
      </div>
    </section>
  )
}