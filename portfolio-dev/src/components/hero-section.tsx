"use client"

import { useRef, useState } from "react"
import { motion } from "motion/react"
import { cn } from "@/lib/utils"
import { useGSAP } from '@gsap/react'
import gsap from 'gsap';
import { SplitText } from "gsap/all"

interface CardData {
  id: string
  image: string
  title: string
  subtitle: string
  imageTransform?: string // Add transform for actual positioning
}

const cards: CardData[] = [
  {
    id: "card-1",
    image: "/image1.jpg",
    title: "Discover",
    subtitle: "Innovation",
    imageTransform: "scale(1.1) translateY(-5%)", // Zoom in 10% and move up 5%
  },
  {
    id: "card-2",
    image: "/image2.jpeg",
    title: "Create", 
    subtitle: "Excellence",
    imageTransform: "scale(1.15) translateX(10%)", // Zoom in 15% and move right 10%
  },
  {
    id: "card-3",
    image: "/image3.jpeg",
    title: "Transform",
    subtitle: "Future",
    imageTransform: "scale(1.2) translateY(8%)", // Zoom in 20% and move down 8%
  },
]

interface CardProps {
  card: CardData
  index: number
  totalCards: number
  isExpanded: boolean
}

const Card = ({ card, index, totalCards, isExpanded }: CardProps) => {
  const centerOffset = (totalCards - 1) * 5

  const defaultX = index * 10 - centerOffset
  const defaultY = index * 2
  const defaultRotate = index * 1.5
  const defaultScale = 1

  // SIGNIFICANTLY INCREASED SPACING
  const cardWidth = 350
  const cardOverlap = 50 // DRAMATICALLY reduced from 240 to 80 = much more space
  const totalExpandedWidth = cardWidth + (totalCards - 1) * (cardWidth - cardOverlap)
  const expandedCenterOffset = totalExpandedWidth / 2

  const spreadX = index * (cardWidth - cardOverlap) - expandedCenterOffset + cardWidth / 2
  const spreadY = 0
  const spreadRotate = index * 8 - (totalCards - 1) * 4 // Increased rotation for better fan effect
  const spreadScale = 1

  useGSAP( () => {
    const heroSplitByChar = new SplitText('.hero-title', { type: 'chars, words'});
    
    const heroSplitByLine = new SplitText('.hero-title', { type: 'lines'});

    {/*heroSplit.chars.forEach((char) => char.classList.add(''))*/}

    {/*gsap.from(heroSplitByChar.chars, {
      yPercent: 100,
      duration: 0.6,
      ease: 'expo-out',
      stagger: 0.06
    })*/}

    gsap.from(heroSplitByLine.lines, {
      opacity:0,
      yPercent: 100,
      duration: 0.6,
      ease: 'expo-out',
      stagger: 0.06,
      delay: 0.4
    })
    
  }, []);

  return (
    <motion.div
      initial={{
        x: defaultX,
        y: defaultY,
        rotate: defaultRotate,
        scale: defaultScale,
      }}
      animate={{
        x: isExpanded ? spreadX : defaultX,
        y: isExpanded ? spreadY : defaultY,
        rotate: isExpanded ? spreadRotate : defaultRotate,
        scale: isExpanded ? spreadScale : defaultScale,
        zIndex: isExpanded ? totalCards - index : totalCards - index, // Ensure proper z-index
      }}
      transition={{
        type: "spring",
        stiffness: 350,
        damping: 30,
        mass: 0.8,
        restDelta: 0.001,
        restSpeed: 0.001,
      }}
      className={cn(
        "absolute inset-0 rounded-2xl p-6 w-full",
        "bg-gradient-to-br from-white/40 via-neutral-50/30 to-neutral-100/20",
        "dark:from-neutral-800/40 dark:via-neutral-900/30 dark:to-black/20",
        "border border-white/20 dark:border-neutral-800/20",
        "before:absolute before:inset-0 before:rounded-2xl",
        "before:bg-gradient-to-b before:from-white/20 before:via-neutral-100/10 before:to-transparent",
        "dark:before:from-white/5 dark:before:via-neutral-500/5 dark:before:to-transparent",
        "before:opacity-100 before:transition-opacity before:duration-500",
        "after:absolute after:inset-0 after:rounded-2xl after:bg-gradient-to-br",
        "after:from-white/80 after:to-neutral-100/70 dark:after:from-neutral-900/80 dark:after:to-black/70",
        "after:z-[-1] after:blur-xl",
        "backdrop-blur-xl backdrop-saturate-150",
        "shadow-[0_8px_20px_rgb(0,0,0,0.08)] dark:shadow-[0_8px_20px_rgb(0,0,0,0.3)]",
        "hover:border-white/30 dark:hover:border-neutral-700/30",
        "hover:shadow-[0_12px_40px_rgb(0,0,0,0.12)] dark:hover:shadow-[0_12px_40px_rgb(0,0,0,0.4)]",
        "hover:backdrop-blur-2xl",
        "hover:bg-gradient-to-br hover:from-white/50 hover:via-neutral-50/40 hover:to-neutral-100/30",
        "dark:hover:from-neutral-800/50 dark:hover:via-neutral-900/40 dark:hover:to-black/30",
        "transition-all duration-500 ease-out",
        "transform-gpu overflow-hidden",
      )}
      style={{
        maxWidth: "320px",
        transformStyle: "preserve-3d",
        perspective: "2000px",
        left: "50%",
        marginLeft: "-160px",
        zIndex: cards.length - index,
      }}
    >
      <div className="absolute inset-1 rounded-xl bg-neutral-50/50 dark:bg-neutral-900/50 backdrop-blur-sm border border-neutral-200/50 dark:border-neutral-700/50" />

      <div className="relative z-10 h-full flex flex-col">
        {/* Image Container */}
        <div
          className={cn(
            "aspect-[16/11] w-full overflow-hidden rounded-lg",
            "bg-neutral-100 dark:bg-neutral-900",
            "transition-transform duration-300 ease-out",
            "group-hover:scale-[1.02]",
            "border border-neutral-200/50 dark:border-neutral-700/50",
            "shadow-inner mb-6 flex-shrink-0 h-full",
          )}
        >
          <img
            src={card.image || "/placeholder.svg"}
            alt={card.title}
            className="object-cover w-full h-full transition-transform duration-500 ease-out"
            style={{ 
              transform: card.imageTransform || "scale(1)" // ACTUAL VISUAL POSITIONING
            }}
            loading="lazy"
          />
        </div>
        
      </div>
    </motion.div>
  )
}

export default function HeroSection() {
  const [isExpanded, setIsExpanded] = useState(false)

  const handleToggle = () => setIsExpanded(!isExpanded)

  
  const cardStackRef = useRef<HTMLButtonElement>(null);

  useGSAP(() => {
    // Set initial stat
    // Animate in
    gsap.from(cardStackRef, { 
      opacity:0,
      yPercent: 50,
      duration: 0.6,
      ease: 'expo-out',
      delay: 0.4
    })
  }, [])

  return (
    <section className="relative min-h-screen w-full flex flex-col items-center justify-center overflow-hidden">
      {/* Hero Content */}
      <div className="relative z-10 text-center max-w-4xl mx-auto px-4 mb-12">
        <h1 className="hero-title text-5xl md:text-7xl font-bold text-indigo-500 mb-6 text-balance">Hy, my name is Hamza And i'm a Softwar Engineer</h1>
      </div>

      {/* Card Stack - Much wider container for proper spacing */}
      <button
        ref={cardStackRef}
        className={cn(
          "relative mx-auto cursor-pointer",
          "min-h-[480px] w-full max-w-[95vw]", // Increased height and width
          "md:max-w-[1600px]", // Much wider for proper spacing
          "appearance-none bg-transparent border-0 p-0",
          "flex items-center justify-center mb-8",
        )}
        onClick={handleToggle}
        aria-label="Toggle card stack"
        type="button"
      >
        {cards.map((card, index) => (
          <Card key={card.id} card={card} index={index} totalCards={cards.length} isExpanded={isExpanded} />
        ))}
      </button>
    </section>
  )
}
