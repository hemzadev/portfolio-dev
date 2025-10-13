"use client"

import { useGSAP } from "@gsap/react"
import gsap from "gsap"
import { SplitText } from "gsap/all"
import Lottie from "lottie-react"
import CircularText from "./CircularText"
import moroccoFlag from "../../public/Morocco flag Lottie JSON animation.json"

export default function HeroSection() {
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

    gsap.from(".hero-visual", {
      opacity: 0,
      yPercent: -100,
      duration: 1.5,
      ease: "power3.out",
      delay: 0,
    })

    return () => {
      try {
        heroSplit.revert()
        heroParagraphSplit.revert()
      } catch (e) {
        // harmless if SplitText can't revert
      }
    }
  }, [])

  return (
    <section className="min-h-screen flex items-center justify-center px-4 sm:px-6 lg:px-8 xl:px-12 py-4 sm:py-8">
      <div className="w-full max-w-7xl mx-auto flex flex-col-reverse lg:flex-row items-center lg:items-end justify-between gap-8 lg:gap-12">
        
        {/* Text Content */}
        <div className="flex-1 text-center lg:text-left space-y-4 lg:space-y-6">
          <h1 className="hero-title text-3xl sm:text-4xl md:text-5xl lg:text-5xl xl:text-6xl font-bold text-gray-900 leading-tight">
            Salam, my name is{" "}
            <span className="text-indigo-600">Hamza</span>{" "}
            and I'm a{" "}
            <span className="text-indigo-600">Software Engineer</span>
          </h1>

          <div className="hero-p text-base sm:text-lg md:text-xl lg:text-xl xl:text-xl text-gray-600 leading-relaxed max-w-2xl mx-auto lg:mx-0">
            I'm a software engineer from Morocco{" "}
            <span className="inline-flex items-center align-middle">
              <Lottie
                animationData={moroccoFlag}
                loop
                autoplay
                className="w-5 h-5 sm:w-6 sm:h-6 inline-block"
              />
            </span>
            , passionate about designing and developing reliable, scalable, and modern digital solutions. My goal is to
            contribute to innovative projects within leading{" "}
            <span className="font-semibold text-indigo-600">multinational companies</span> and{" "}
            <span className="font-semibold text-indigo-600">financial institutions</span>.
          </div>
        </div>

        {/* Visual Content */}
        <div className="hero-visual flex-1 flex justify-center lg:justify-end relative mb-8 lg:mb-0">
          <div className="relative w-64 sm:w-72 md:w-80 lg:w-96">
            {/* Gradient Header */}
            <div className="h-14 lg:h-16 w-full bg-gradient-to-t from-indigo-400 via-violet-300 to-transparent rounded-t-lg" />

            {/* Image Container */}
            <div className="relative w-full aspect-[3/4] rounded-b-full overflow-hidden bg-gray-200 shadow-lg">
              <img
                src="image3.jpeg"
                alt="Hamza Ben Azza - Software Engineer"
                className="w-full h-full object-cover"
              />
            </div>
          </div>

          {/* CircularText */}
          <div className="absolute -bottom-8 sm:-bottom-10 lg:-bottom-12 left-1/2 transform -translate-x-1/2 scale-75 sm:scale-90 lg:scale-100">
            <CircularText text="HAMZA*BEN*AZZA*" onHover="speedUp" spinDuration={10} />
          </div>
        </div>
      </div>
    </section>
  )
}