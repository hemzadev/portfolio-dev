"use client"

import { useGSAP } from '@gsap/react'
import gsap from 'gsap'
import { SplitText } from 'gsap/all'
import { useRef } from 'react'
import CircularText from './CircularText'

export default function HeroSection() {
  const leftRef = useRef(null)

  useGSAP(() => {
    const heroSplit = new SplitText('.hero-title', { type: 'lines' })
    const heroParagraphSplit = new SplitText('.hero-p', { type: 'lines '})

    gsap.from(heroSplit.lines, {
      opacity: 0,
      yPercent: 100,
      duration: 0.6,
      ease: 'expo-out',
      stagger: 0.06,
      delay: 0.4,
    })

    gsap.from(heroParagraphSplit.lines, {
      opacity: 0,
      yPercent: -200,
      duration: 0.6,
      ease: 'expo-out',
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
    <section className="relative grid grid-cols-2 min-h-screen w-full p-52 -top-10">
      {/* Left Side Visuals */}
      <div ref={leftRef} className="relative w-96 -top-60">
        {/* Top gradient part */}
        <div className="h-20 w-full bg-gradient-to-t from-indigo-400 via-violet-300 to-transparent"></div>

        {/* Image part */}
        <div className="h-120 w-full rounded-b-full overflow-hidden">
          <img
            src="image3.jpeg"
            alt="Profile"
            className="w-full h-full object-cover"
          />
        </div>

        {/* CircularText positioned below the image */}
        <div className="absolute -bottom-20 left-1/2 -translate-x-1/2">
          <CircularText
            text="HAMZA*BEN*AZZA*"
            onHover="speedUp"
            spinDuration={10}
            className="custom-class"
          />
        </div>
      </div>

      {/* Right Side Text */}
      <div className="relative z-10 text-left -left-50 -top-20">
        <h1 className="hero-title text-5xl md:text-7xl font-bold text-black mb-6 text-balance">
          Salam, my name is <span className="text-indigo-500">Hamza</span> and I'm a{' '}
          <span className="text-indigo-500">Software Engineer</span>
        </h1>
        <p className="hero-p text-gray-600 text-lg md:text-xl max-w-3xl">
          I'm a software engineer from Morocco, passionate about designing and developing reliable, scalable, and modern digital solutions. My goal is to contribute to innovative projects within leading multinational companies and financial institutions.
        </p>
      </div>
    </section>
  )
}