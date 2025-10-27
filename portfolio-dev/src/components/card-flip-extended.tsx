"use client"

import { cn } from "@/lib/utils"
import { Target, Lightbulb, CheckCircle, TrendingUp, BookOpen, Shield } from "lucide-react"
import { useState, useEffect, useRef } from "react"
import { gsap } from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger)
}

export interface CardFlipExtendedProps {
  variant?: "bank" | "consulting" | "tech" | "custom"
  theme?: "blue" | "green" | "amber" | "purple"
  animated?: boolean
}

export default function CardFlipExtended({ variant = "tech", theme = "blue", animated = true }: CardFlipExtendedProps) {
  const [flippedCards, setFlippedCards] = useState<Set<string>>(new Set())
  const sectionRef = useRef<HTMLDivElement>(null)
  const cardsRef = useRef<(HTMLDivElement | null)[]>([])
  const metricsRef = useRef<(HTMLDivElement | null)[]>([])

  const themeConfig = {
    blue: {
      text: "text-blue-500 dark:text-blue-400",
      border: "border-blue-100 dark:border-blue-900/30",
      bg: "bg-blue-50/50 dark:bg-blue-950/20",
      accent: "bg-blue-500/10 dark:bg-blue-500/5",
    },
    green: {
      text: "text-green-500 dark:text-green-400",
      border: "border-green-100 dark:border-green-900/30",
      bg: "bg-green-50/50 dark:bg-green-950/20",
      accent: "bg-green-500/10 dark:bg-green-500/5",
    },
    amber: {
      text: "text-amber-500 dark:text-amber-400",
      border: "border-amber-100 dark:border-amber-900/30",
      bg: "bg-amber-50/50 dark:bg-amber-950/20",
      accent: "bg-amber-500/10 dark:bg-amber-500/5",
    },
    purple: {
      text: "text-purple-500 dark:text-purple-400",
      border: "border-purple-100 dark:border-purple-900/30",
      bg: "bg-purple-50/50 dark:bg-purple-950/20",
      accent: "bg-purple-500/10 dark:bg-purple-500/5",
    },
  }

  const currentTheme = themeConfig[theme]

  const manifestoContent = {
    bank: {
      hook: "Systems where precision matters",
      origin: `Networks → full-stack → blockchain. Each step taught me something about building systems that don't break.`,
      values: [
        "Write code like someone's reading it in 5 years",
        "Regulations force better design",
        "Security from line one",
        "Boring systems just work",
      ],
      commitment: `Document decisions. Test edge cases. Assume audits.`,
      northStar: `Building infrastructure for Morocco's digital economy.`,
    },
    consulting: {
      hook: "Solve problems that need code",
      origin: `Networks taught me failure. Full-stack taught me users. Consulting taught me the real problem.`,
      values: ["Understand before proposing", "Build for real users", "Explain without jargon", "Learn what's needed"],
      commitment: `Ship what works. Explain delays. Adapt to change.`,
      northStar: `Engineer who understands code and business.`,
    },
    tech: {
      hook: "Systems that scale, code that's clear",
      origin: `Networks taught me failure modes. Full-stack taught me user needs. Now learning what to build.`,
      values: [
        "Edge cases are Tuesday",
        "Performance is a feature",
        "Code is read more than written",
        "Ship fast, not broken",
      ],
      commitment: `No broken MVPs. Write tests. Own failures.`,
      northStar: `Infrastructure that handles millions invisibly.`,
    },
  }

  const content = manifestoContent[variant]

  useEffect(() => {
    if (!animated || !sectionRef.current) return

    const ctx = gsap.context(() => {
      cardsRef.current.forEach((card, index) => {
        if (card) {
          gsap.fromTo(
            card,
            {
              opacity: 0,
              y: 40,
            },
            {
              opacity: 1,
              y: 0,
              duration: 1,
              ease: "power2.out",
              scrollTrigger: {
                trigger: card,
                start: "top 80%",
                end: "top 50%",
                toggleActions: "play none none reverse",
              },
              delay: index * 0.15,
            },
          )
        }
      })

      metricsRef.current.forEach((metric, index) => {
        if (metric) {
          gsap.fromTo(
            metric,
            {
              opacity: 0,
              y: 20,
            },
            {
              opacity: 1,
              y: 0,
              duration: 0.8,
              ease: "power2.out",
              scrollTrigger: {
                trigger: metric,
                start: "top 85%",
                toggleActions: "play none none reverse",
              },
              delay: index * 0.1,
            },
          )
        }
      })
    }, sectionRef)

    return () => ctx.revert()
  }, [animated])

  const toggleFlip = (cardId: string) => {
    setFlippedCards((prev) => {
      const newSet = new Set(prev)
      if (newSet.has(cardId)) {
        newSet.delete(cardId)
      } else {
        newSet.add(cardId)
      }
      return newSet
    })
  }

  return (
    <section ref={sectionRef} className="relative py-32 px-6 bg-white dark:bg-zinc-950 overflow-hidden">
      <div className="max-w-5xl mx-auto space-y-24">
        {/* Hero Statement - Centered */}
        <div className="text-center space-y-6">
          <h2 className="text-5xl md:text-6xl font-light text-gray-900 dark:text-white text-balance">{content.hook}</h2>
          <p className="text-lg font-light text-gray-500 dark:text-gray-400 max-w-xl mx-auto">
            My approach to building and learning
          </p>
        </div>

        {/* Metrics - Floating horizontal row */}
        <div className="flex justify-center gap-12 flex-wrap">
          {[
            { label: "Years", value: "5" },
            { label: "Lines", value: "47K" },
            { label: "Streak", value: "150d" },
            { label: "Shipped", value: "12" },
          ].map((metric, index) => (
            <div
              key={metric.label}
              ref={(el) => {
                metricsRef.current[index] = el
              }}
              className="text-center"
            >
              <div className={cn("text-4xl font-light mb-1", currentTheme.text)}>{metric.value}</div>
              <div className="text-xs font-light text-gray-400">{metric.label}</div>
            </div>
          ))}
        </div>

        {/* Origin Card - Left aligned, flip card */}
        <div
          ref={(el) => {
            cardsRef.current[0] = el
          }}
          className="max-w-md [perspective:2000px] group"
          onClick={() => toggleFlip("origin")}
        >
          <div
            className={cn(
              "relative w-full min-h-[200px]",
              "[transform-style:preserve-3d]",
              "transition-all duration-700 cursor-pointer",
              flippedCards.has("origin") ? "[transform:rotateY(180deg)]" : "[transform:rotateY(0deg)]",
            )}
          >
            {/* Front */}
            <div
              className={cn(
                "absolute inset-0 w-full",
                "[backface-visibility:hidden]",
                "p-8 rounded-3xl border transition-all",
                currentTheme.border,
                "bg-white/50 dark:bg-zinc-900/50 backdrop-blur-sm",
                "hover:shadow-lg",
                flippedCards.has("origin") ? "opacity-0" : "opacity-100",
              )}
            >
              <BookOpen className={cn("mb-4", currentTheme.text)} size={20} />
              <p className="text-sm font-light text-gray-600 dark:text-gray-400 leading-relaxed">{content.origin}</p>
            </div>

            {/* Back */}
            <div
              className={cn(
                "absolute inset-0 w-full",
                "[backface-visibility:hidden] [transform:rotateY(180deg)]",
                "p-8 rounded-3xl border transition-all",
                currentTheme.border,
                currentTheme.accent,
                "backdrop-blur-sm hover:shadow-lg",
                !flippedCards.has("origin") ? "opacity-0" : "opacity-100",
              )}
            >
              <h4 className="text-sm font-medium mb-3 text-gray-900 dark:text-white">The Journey</h4>
              <p className="text-xs font-light text-gray-600 dark:text-gray-400 leading-relaxed">
                Started with networks, moved to full-stack, now exploring what matters.
              </p>
            </div>
          </div>
        </div>

        {/* Values Card - Right aligned, flip card */}
        <div
          ref={(el) => {
            cardsRef.current[1] = el
          }}
          className="max-w-lg ml-auto [perspective:2000px] group"
          onClick={() => toggleFlip("values")}
        >
          <div
            className={cn(
              "relative w-full min-h-[280px]",
              "[transform-style:preserve-3d]",
              "transition-all duration-700 cursor-pointer",
              flippedCards.has("values") ? "[transform:rotateY(180deg)]" : "[transform:rotateY(0deg)]",
            )}
          >
            {/* Front */}
            <div
              className={cn(
                "absolute inset-0 w-full",
                "[backface-visibility:hidden]",
                "p-8 rounded-3xl border transition-all",
                currentTheme.border,
                "bg-white/50 dark:bg-zinc-900/50 backdrop-blur-sm",
                "hover:shadow-lg",
                flippedCards.has("values") ? "opacity-0" : "opacity-100",
              )}
            >
              <Lightbulb className={cn("mb-4", currentTheme.text)} size={20} />
              <div className="space-y-3">
                {content.values.map((value, index) => (
                  <div key={index} className="flex items-start gap-2">
                    <CheckCircle className={cn("mt-0.5 flex-shrink-0", currentTheme.text)} size={14} />
                    <span className="text-xs font-light text-gray-600 dark:text-gray-400">{value}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Back */}
            <div
              className={cn(
                "absolute inset-0 w-full",
                "[backface-visibility:hidden] [transform:rotateY(180deg)]",
                "p-8 rounded-3xl border transition-all",
                currentTheme.border,
                currentTheme.accent,
                "backdrop-blur-sm hover:shadow-lg",
                !flippedCards.has("values") ? "opacity-0" : "opacity-100",
              )}
            >
              <Shield className={cn("mb-4", currentTheme.text)} size={20} />
              <h4 className="text-sm font-medium mb-3 text-gray-900 dark:text-white">How I Work</h4>
              <p className="text-xs font-light text-gray-600 dark:text-gray-400 leading-relaxed">
                {content.commitment}
              </p>
            </div>
          </div>
        </div>

        {/* Timeline - Center, vertical flow */}
        <div
          ref={(el) => {
            cardsRef.current[2] = el
          }}
          className="max-w-md mx-auto"
        >
          <div
            className={cn(
              "p-8 rounded-3xl border",
              currentTheme.border,
              "bg-white/50 dark:bg-zinc-900/50 backdrop-blur-sm",
            )}
          >
            <TrendingUp className={cn("mb-6", currentTheme.text)} size={20} />

            <div className="space-y-6">
              {[
                { year: "2020", focus: "Networks", skills: ["TCP/IP", "Linux"] },
                { year: "2022", focus: "Full-Stack", skills: ["Java", "React", "SQL"] },
                { year: "2024", focus: "Enterprise", skills: ["Microservices", "Docker"] },
                { year: "2025", focus: "Blockchain + AI", skills: ["Solidity", "NLP"] },
              ].map((period, index) => (
                <div key={period.year} className="flex gap-4">
                  <div className="flex flex-col items-center">
                    <div className={cn("w-2 h-2 rounded-full", currentTheme.bg)} />
                    {index < 3 && <div className={cn("w-px h-full mt-1", currentTheme.bg)} />}
                  </div>

                  <div className="flex-1 pb-2">
                    <div className="flex items-baseline gap-2 mb-2">
                      <span className="text-sm font-light text-gray-900 dark:text-white">{period.year}</span>
                      <span className="text-xs font-light text-gray-500 dark:text-gray-500">{period.focus}</span>
                    </div>
                    <div className="flex flex-wrap gap-1.5">
                      {period.skills.map((skill) => (
                        <span
                          key={skill}
                          className={cn(
                            "px-2 py-0.5 rounded-full text-xs font-light",
                            currentTheme.bg,
                            currentTheme.text,
                          )}
                        >
                          {skill}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* North Star - Full width, flip card */}
        <div
          ref={(el) => {
            cardsRef.current[3] = el
          }}
          className="[perspective:2000px] group"
          onClick={() => toggleFlip("northstar")}
        >
          <div
            className={cn(
              "relative w-full min-h-[160px]",
              "[transform-style:preserve-3d]",
              "transition-all duration-700 cursor-pointer",
              flippedCards.has("northstar") ? "[transform:rotateY(180deg)]" : "[transform:rotateY(0deg)]",
            )}
          >
            {/* Front */}
            <div
              className={cn(
                "absolute inset-0 w-full",
                "[backface-visibility:hidden]",
                "p-8 rounded-3xl border transition-all",
                currentTheme.border,
                "bg-white/50 dark:bg-zinc-900/50 backdrop-blur-sm",
                "hover:shadow-lg",
                flippedCards.has("northstar") ? "opacity-0" : "opacity-100",
              )}
            >
              <Target className={cn("mb-4", currentTheme.text)} size={20} />
              <p className="text-sm font-light text-gray-600 dark:text-gray-400 leading-relaxed">{content.northStar}</p>
            </div>

            {/* Back */}
            <div
              className={cn(
                "absolute inset-0 w-full",
                "[backface-visibility:hidden] [transform:rotateY(180deg)]",
                "p-8 rounded-3xl border transition-all",
                currentTheme.border,
                currentTheme.accent,
                "backdrop-blur-sm hover:shadow-lg",
                !flippedCards.has("northstar") ? "opacity-0" : "opacity-100",
              )}
            >
              <h4 className="text-sm font-medium mb-3 text-gray-900 dark:text-white">Always Learning</h4>
              <div className="space-y-2">
                {["Java OOP & Python", "Docker & Kubernetes", "Microservices & GCP", "AWS Solutions Architect"].map(
                  (cert) => (
                    <div key={cert} className="flex items-center gap-2">
                      <div className={cn("w-1 h-1 rounded-full", currentTheme.text)} />
                      <span className="text-xs font-light text-gray-600 dark:text-gray-400">{cert}</span>
                    </div>
                  ),
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
