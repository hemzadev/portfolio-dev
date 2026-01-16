"use client"

import { useEffect, useRef } from "react"
import gsap from "gsap"
import Image from "next/image"

export default function SorrySection() {
  const containerRef = useRef<HTMLDivElement>(null)
  const contentRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!containerRef.current || !contentRef.current) return

    const ctx = gsap.context(() => {
      gsap.from(contentRef.current, {
        opacity: 0,
        y: 50,
        duration: 1,
        ease: "power3.out",
      })
    }, containerRef.current)

    return () => ctx.revert()
  }, [])

  return (
    <section ref={containerRef} className="w-full min-h-screen flex items-center justify-center px-4 py-20">
      <div ref={contentRef} className="text-center max-w-2xl mx-auto">
        <p className="text-lg md:text-xl text-slate-400 dark:text-slate-300 mb-12">
          Sorry, I'm lazy to finish this portfolio
        </p>
        <div className="w-full h-80 relative mb-8">
          <Image src="/sorry.gif" alt="Working on it" fill className="object-contain" priority />
        </div>
        <p className="text-lg md:text-xl text-slate-400 dark:text-slate-300 mb-12">Check back soon for more updates!</p>
      </div>
    </section>
  )
}
