"use client";

import { cn } from "@/lib/utils";
import { Target, Lightbulb, CheckCircle, TrendingUp, BookOpen, Shield } from "lucide-react";
import { useState, useEffect, useRef } from "react";

export interface CardFlipExtendedProps {
  variant?: "bank" | "consulting" | "tech" | "custom";
  theme?: "blue" | "green" | "amber" | "purple";
  animated?: boolean;
}

export default function CardFlipExtended({
  variant = "tech",
  theme = "blue",
  animated = true
}: CardFlipExtendedProps) {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.1 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  // Theme configurations
  const themeConfig = {
    blue: {
      gradient: "from-blue-500/20 to-blue-600/10",
      text: "text-blue-600 dark:text-blue-400",
      border: "border-blue-200 dark:border-blue-800",
      bg: "bg-blue-50 dark:bg-blue-900/20"
    },
    green: {
      gradient: "from-green-500/20 to-green-600/10",
      text: "text-green-600 dark:text-green-400",
      border: "border-green-200 dark:border-green-800",
      bg: "bg-green-50 dark:bg-green-900/20"
    },
    amber: {
      gradient: "from-amber-500/20 to-amber-600/10",
      text: "text-amber-600 dark:text-amber-400",
      border: "border-amber-200 dark:border-amber-800",
      bg: "bg-amber-50 dark:bg-amber-900/20"
    },
    purple: {
      gradient: "from-purple-500/20 to-purple-600/10",
      text: "text-purple-600 dark:text-purple-400",
      border: "border-purple-200 dark:border-purple-800",
      bg: "bg-purple-50 dark:bg-purple-900/20"
    }
  };

  const currentTheme = themeConfig[theme];

  // Manifesto content based on variant
  const manifestoContent = {
    bank: {
      hook: "I build systems that auditors trust and regulators approve.",
      origin: `My journey started in network infrastructure, evolved through 
      full-stack development, and now focuses on the intersection of 
      blockchain, AI, and financial systems—where precision isn't 
      optional, it's mandatory.`,
      values: [
        "Building systems that don't just work, but hold together under audit",
        "Translating complex regulations into code that compliance teams understand",
        "Making security and traceability the default, not an afterthought",
        "Solving problems that protect real money and real trust"
      ],
      commitment: `Every line of code in a financial system is a promise. I document 
      every decision, test every edge case, and design assuming auditors 
      are watching—because they are.`,
      northStar: `Contributing to Morocco's financial infrastructure—building the 
      systems that help Moroccan businesses grow, families save securely, 
      and our economy digitize with confidence.`
    },
    consulting: {
      hook: "I don't build software—I solve business problems that happen to need code.",
      origin: `My journey started in network infrastructure, evolved through 
      full-stack development, and now converges at blockchain, AI, 
      and enterprise systems. Each step taught me a different lens.`,
      values: [
        "Understanding the business problem before touching the keyboard",
        "Delivering systems that work on day one and scale to day 1000",
        "Making complex technologies accessible to non-technical stakeholders",
        "Learning fast because client problems don't wait for certifications"
      ],
      commitment: `I deliver what I promise, when I promise it. If timelines slip, 
      clients know why and what's being done about it. If requirements 
      change, the architecture adapts without collapsing.`,
      northStar: `Becoming the engineer clients request by name—the one who 
      understands both the technical architecture and the business 
      case, who can explain tradeoffs to CTOs and CFOs alike.`
    },
    tech: {
      hook: "Most engineers write code. I write systems that scale, audit trails that never lie, and APIs that developers actually enjoy using.",
      origin: `My journey started in networks, where I learned that systems fail 
      in creative ways. Then full-stack development, where I learned 
      that users don't care about architecture—they care if it works.`,
      values: [
        "Building systems that handle edge cases gracefully, not catastrophically",
        "Making performance a feature, not an afterthought (nobody likes slow)",
        "Writing code that the next engineer won't curse at",
        "Shipping features that solve real problems, not imagined ones"
      ],
      commitment: `I don't ship MVPs that break under load. I ship production-ready 
      systems with tests, monitoring, and runbooks. When my code causes 
      an outage, I write the postmortem before anyone asks.`,
      northStar: `Building the kind of infrastructure that powers millions of 
      transactions without anyone noticing—because the best systems 
      are invisible until they're not.`
    }
  };

  const content = manifestoContent[variant];

  // Animation delays
  const getAnimationDelay = (index: number) => {
    if (!animated) return "delay-0";
    return `delay-${index * 100}`;
  };

  return (
    <section 
      ref={sectionRef}
      className="relative py-20 px-4 bg-gradient-to-br from-white to-gray-50 dark:from-zinc-900 dark:to-zinc-800"
    >
      <div className="max-w-6xl mx-auto">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className={cn(
            "text-4xl md:text-5xl font-bold mb-4 transition-all duration-700",
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          )}>
            Why I{" "}
            <span className={cn(
              "bg-gradient-to-r bg-clip-text text-transparent",
              theme === "blue" && "from-blue-600 to-blue-800 dark:from-blue-400 dark:to-blue-600",
              theme === "green" && "from-green-600 to-green-800 dark:from-green-400 dark:to-green-600",
              theme === "amber" && "from-amber-600 to-amber-800 dark:from-amber-400 dark:to-amber-600",
              theme === "purple" && "from-purple-600 to-purple-800 dark:from-purple-400 dark:to-purple-600"
            )}>
              Engineer
            </span>
          </h2>
          <p className={cn(
            "text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto transition-all duration-700 delay-300",
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          )}>
            The philosophy behind my code and the vision driving my career
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12 items-start">
          {/* Main Manifesto Content */}
          <div className="space-y-8">
            {/* The Hook */}
            <div className={cn(
              "p-6 rounded-2xl border-l-4 transition-all duration-700",
              currentTheme.bg,
              currentTheme.border,
              isVisible ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-8",
              getAnimationDelay(0)
            )}>
              <p className="text-2xl font-light leading-relaxed text-gray-800 dark:text-gray-200">
                {content.hook}
              </p>
            </div>

            {/* The Origin Story */}
            <div className={cn(
              "transition-all duration-700",
              isVisible ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-8",
              getAnimationDelay(1)
            )}>
              <h3 className="flex items-center gap-3 text-lg font-semibold mb-4 text-gray-900 dark:text-white">
                <BookOpen className={currentTheme.text} size={20} />
                My Journey
              </h3>
              <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                {content.origin}
              </p>
            </div>

            {/* Core Values */}
            <div className={cn(
              "transition-all duration-700",
              isVisible ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-8",
              getAnimationDelay(2)
            )}>
              <h3 className="flex items-center gap-3 text-lg font-semibold mb-4 text-gray-900 dark:text-white">
                <Lightbulb className={currentTheme.text} size={20} />
                What Drives Me
              </h3>
              <div className="space-y-3">
                {content.values.map((value, index) => (
                  <div
                    key={index}
                    className={cn(
                      "flex items-start gap-3 p-3 rounded-lg transition-all duration-500",
                      "hover:scale-[1.02] hover:shadow-md",
                      currentTheme.bg
                    )}
                    style={{
                      transitionDelay: `${index * 100 + 500}ms`,
                      transform: isVisible ? "translateX(0)" : "translateX(-20px)",
                      opacity: isVisible ? 1 : 0
                    }}
                  >
                    <CheckCircle className={cn("mt-0.5 flex-shrink-0", currentTheme.text)} size={16} />
                    <span className="text-gray-700 dark:text-gray-300 text-sm">{value}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* The Commitment */}
            <div className={cn(
              "transition-all duration-700",
              isVisible ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-8",
              getAnimationDelay(3)
            )}>
              <h3 className="flex items-center gap-3 text-lg font-semibold mb-4 text-gray-900 dark:text-white">
                <Shield className={currentTheme.text} size={20} />
                My Commitment
              </h3>
              <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                {content.commitment}
              </p>
            </div>

            {/* North Star */}
            <div className={cn(
              "p-6 rounded-2xl border transition-all duration-700",
              currentTheme.border,
              isVisible ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-8",
              getAnimationDelay(4)
            )}>
              <h3 className="flex items-center gap-3 text-lg font-semibold mb-4 text-gray-900 dark:text-white">
                <Target className={currentTheme.text} size={20} />
                Career North Star
              </h3>
              <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                {content.northStar}
              </p>
            </div>
          </div>

          {/* Metrics & Progress Sidebar */}
          <div className="space-y-8">
            {/* Skills Evolution Timeline */}
            <div className={cn(
              "p-6 rounded-2xl border transition-all duration-700 delay-500",
              currentTheme.border,
              "bg-white dark:bg-zinc-800",
              isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
            )}>
              <h3 className="flex items-center gap-3 text-lg font-semibold mb-6 text-gray-900 dark:text-white">
                <TrendingUp className={currentTheme.text} size={20} />
                Skills Evolution
              </h3>
              
              <div className="space-y-6">
                {/* Timeline */}
                {[
                  { year: "2020", focus: "Networks & Infrastructure", skills: ["TCP/IP", "Linux", "Routing"] },
                  { year: "2022", focus: "Full-Stack Development", skills: ["Java", "Spring Boot", "React", "SQL"] },
                  { year: "2024", focus: "Enterprise Systems", skills: ["Microservices", "Kafka", "Docker"] },
                  { year: "2025", focus: "Blockchain + AI", skills: ["Solidity", "Web3", "NLP", "Computer Vision"] }
                ].map((period, index) => (
                  <div key={period.year} className="flex gap-4 group">
                    {/* Timeline line */}
                    <div className="flex flex-col items-center">
                      <div className={cn(
                        "w-3 h-3 rounded-full border-2 transition-all duration-300",
                        currentTheme.border,
                        currentTheme.bg,
                        "group-hover:scale-150"
                      )} />
                      {index < 3 && (
                        <div className={cn(
                          "w-0.5 h-12 flex-1 mt-1 transition-all duration-300",
                          currentTheme.bg,
                          "group-hover:h-16"
                        )} />
                      )}
                    </div>
                    
                    {/* Content */}
                    <div className={cn(
                      "flex-1 pb-6 transition-all duration-300",
                      "group-hover:scale-[1.02]"
                    )}>
                      <div className="flex items-baseline gap-2 mb-2">
                        <span className="font-bold text-gray-900 dark:text-white">{period.year}</span>
                        <span className="text-sm text-gray-600 dark:text-gray-400">{period.focus}</span>
                      </div>
                      <div className="flex flex-wrap gap-1.5">
                        {period.skills.map((skill, skillIndex) => (
                          <span
                            key={skill}
                            className={cn(
                              "px-2 py-1 rounded-full text-xs font-medium transition-all duration-300",
                              currentTheme.bg,
                              currentTheme.text,
                              "group-hover:shadow-sm"
                            )}
                            style={{
                              transitionDelay: `${skillIndex * 50}ms`
                            }}
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

            {/* Impact Metrics */}
            <div className={cn(
              "grid grid-cols-2 gap-4 transition-all duration-700 delay-700",
              isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
            )}>
              {[
                { label: "Production Systems", value: "3", suffix: "" },
                { label: "Code (2024-2025)", value: "47", suffix: "K+" },
                { label: "GitHub Commits", value: "150", suffix: "+" },
                { label: "Test Coverage", value: "100", suffix: "%" }
              ].map((metric, index) => (
                <div
                  key={metric.label}
                  className={cn(
                    "p-4 rounded-xl text-center transition-all duration-500",
                    currentTheme.bg,
                    "hover:scale-105 hover:shadow-lg"
                  )}
                  style={{
                    transitionDelay: `${index * 100 + 800}ms`,
                    transform: isVisible ? "scale(1)" : "scale(0.8)",
                    opacity: isVisible ? 1 : 0
                  }}
                >
                  <div className={cn("text-2xl font-bold mb-1", currentTheme.text)}>
                    {metric.value}{metric.suffix}
                  </div>
                  <div className="text-xs text-gray-600 dark:text-gray-400">
                    {metric.label}
                  </div>
                </div>
              ))}
            </div>

            {/* Learning Velocity */}
            <div className={cn(
              "p-6 rounded-2xl border transition-all duration-700 delay-900",
              currentTheme.border,
              "bg-white dark:bg-zinc-800",
              isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
            )}>
              <h4 className="font-semibold mb-4 text-gray-900 dark:text-white">
                Learning Velocity
              </h4>
              <div className="space-y-3">
                {[
                  "2023: Java OOP & Python Specialization",
                  "2024: Docker, Kubernetes & Azure Networks", 
                  "2025: Java Microservices, GCP & Blockchain",
                  "Now: AWS Solutions Architect (in progress)"
                ].map((cert, index) => (
                  <div
                    key={cert}
                    className="flex items-center gap-3 text-sm text-gray-700 dark:text-gray-300"
                    style={{
                      transitionDelay: `${index * 100 + 1000}ms`,
                      transform: isVisible ? "translateX(0)" : "translateX(20px)",
                      opacity: isVisible ? 1 : 0
                    }}
                  >
                    <div className={cn("w-2 h-2 rounded-full", currentTheme.bg)} />
                    {cert}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}