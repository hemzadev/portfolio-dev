"use client"

import { useEffect, useRef, useState } from "react"
import { useGSAP } from "@gsap/react"
import gsap from "gsap"
import { SplitText } from "gsap/all"
import Lottie from "lottie-react"
import CircularText from "./CircularText"
import moroccoFlag from "../../public/Morocco flag Lottie JSON animation.json"

export default function HeroSection() {
  const leftRef = useRef<HTMLDivElement>(null)
  const imageContainerRef = useRef<HTMLDivElement>(null)
  const circularTextRef = useRef<HTMLDivElement>(null)

  // 🧮 Reposition CircularText relative to image container
  useEffect(() => {
    const updatePosition = () => {
      if (!imageContainerRef.current || !circularTextRef.current) return

      const imageRect = imageContainerRef.current.getBoundingClientRect()
      const parentRect = leftRef.current?.getBoundingClientRect()

      if (!parentRect) return

      // compute offset relative to parent container
      const offsetTop = imageRect.top - parentRect.top
      const offsetLeft = imageRect.left - parentRect.left

      // position the circular text
      gsap.set(circularTextRef.current, {
        top: offsetTop + imageRect.height * 0.75, // 75% down the image
        left: offsetLeft + imageRect.width / 2 + 150,   // centered horizontally
        xPercent: -50,
        yPercent: -50,
      })
    }

    updatePosition()
    window.addEventListener("resize", updatePosition)

    return () => window.removeEventListener("resize", updatePosition)
  }, [])

  return (
    <section className="relative flex flex-col lg:grid lg:grid-cols-2 min-h-screen w-full px-4 sm:px-6 lg:px-8 xl:p-52 py-20 lg:py-0 lg:-top-10 gap-12 lg:gap-0">
      {/* Left side */}
      <div
        ref={leftRef}
        className="relative w-full max-w-sm mx-auto lg:mx-0 lg:w-96 order-2 lg:order-1 lg:-top-60 -top-20"
      >
        {/* Gradient */}
        <div className="h-16 lg:h-20 w-full bg-gradient-to-t from-indigo-400 via-violet-300 to-transparent"></div>

        {/* Image container */}
        <div
          ref={imageContainerRef}
          className="h-80 lg:h-120 w-full rounded-b-full overflow-hidden relative"
        >
          <img
            src="image3.jpeg"
            alt="Profile"
            className="w-full h-full object-cover"
          />
        </div>

        {/* CircularText OUTSIDE but positioned via JS */}
        <div ref={circularTextRef} className="absolute z-20 pointer-events-none">
          <div className="scale-50 lg:scale-75">
            <CircularText
              text="HAMZA*BEN*AZZA*"
              onHover="speedUp"
              spinDuration={10}
            />
          </div>
        </div>
      </div>

      {/* Right side */}
      <div className="relative z-10 text-center lg:text-left order-1 lg:order-2 lg:-left-50 lg:-top-20 -top-10">
        <h1 className="hero-title text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold text-black mb-4 lg:mb-6 leading-tight">
          Salam, my name is{" "}
          <span className="text-indigo-500 block sm:inline">Hamza</span>{" "}
          and I'm a{" "}
          <span className="text-indigo-500 block sm:inline">
            Software Engineer
          </span>
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
          , passionate about designing and developing reliable, scalable, and
          modern digital solutions. My goal is to contribute to innovative
          projects within leading{" "}
          <span className="font-medium text-indigo-600">
            multinational companies
          </span>{" "}
          and{" "}
          <span className="font-medium text-indigo-600">
            financial institutions
          </span>.
        </div>
      </div>
    </section>
  )
}
