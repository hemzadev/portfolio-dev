"use client"

import React, { useState, useEffect, useRef } from "react"
import { Code, Server, Cloud, GitBranch, Database, Zap, Brain, Link, Hammer, X } from "lucide-react"

interface TechBlock {
  id: string
  title: string
  icon: React.ReactNode
  description: string
  color: string
  skills: string[]
  experience: number // 0-100
  masteryContext: string
  position: { x: number; y: number }
  connections: string[]
}

interface Particle {
  id: string
  fromId: string
  toId: string
  progress: number
  speed: number
}

interface Connection {
  from: string
  to: string
  color: string
}

export default function TechEcosystemCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const [selectedBlock, setSelectedBlock] = useState<string | null>(null)
  const [hoveredBlock, setHoveredBlock] = useState<string | null>(null)
  const [particles, setParticles] = useState<Particle[]>([])
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 })
  const animationFrameRef = useRef<number>()

  const techBlocks: TechBlock[] = [
    {
      id: "frontend",
      title: "Frontend",
      icon: <Code className="w-6 h-6" />,
      description: "React, Next.js, TypeScript, Tailwind",
      color: "#4f46e5",
      skills: ["React 18+", "Next.js 14+", "TypeScript", "Tailwind CSS", "State Management"],
      experience: 95,
      masteryContext: "Expert in modern React patterns, server components, and performance optimization.",
      position: { x: 200, y: 150 },
      connections: ["backend", "ai"],
    },
    {
      id: "backend",
      title: "Backend",
      icon: <Server className="w-6 h-6" />,
      description: "Node.js, Express, APIs, Microservices",
      color: "#6366f1",
      skills: ["Node.js 20+", "Express.js", "REST APIs", "Microservices", "Auth"],
      experience: 90,
      masteryContext: "Advanced expertise in building scalable APIs and microservices architecture.",
      position: { x: 500, y: 150 },
      connections: ["database", "blockchain", "ai"],
    },
    {
      id: "database",
      title: "Database",
      icon: <Database className="w-6 h-6" />,
      description: "PostgreSQL, MongoDB, Redis, ORMs",
      color: "#818cf8",
      skills: ["PostgreSQL 15+", "MongoDB 6+", "Redis 7+", "Prisma", "Optimization"],
      experience: 85,
      masteryContext: "Proficient in SQL/NoSQL databases, data modeling, and query optimization.",
      position: { x: 800, y: 150 },
      connections: [],
    },
    {
      id: "github",
      title: "GitHub",
      icon: <GitBranch className="w-6 h-6" />,
      description: "Version Control, Collaboration",
      color: "#4338ca",
      skills: ["Git", "GitHub", "Branching", "Code Review", "Collaboration"],
      experience: 90,
      masteryContext: "Expert in Git workflows and collaborative development.",
      position: { x: 200, y: 400 },
      connections: ["cicd"],
    },
    {
      id: "cicd",
      title: "CI/CD",
      icon: <Zap className="w-6 h-6" />,
      description: "Automation, Testing, Deployment",
      color: "#6366f1",
      skills: ["GitHub Actions", "Docker", "Testing", "Deployment", "Monitoring"],
      experience: 80,
      masteryContext: "Advanced in CI/CD pipelines and automated deployment workflows.",
      position: { x: 500, y: 400 },
      connections: ["cloud"],
    },
    {
      id: "cloud",
      title: "Cloud",
      icon: <Cloud className="w-6 h-6" />,
      description: "AWS, Vercel, Infrastructure",
      color: "#818cf8",
      skills: ["AWS", "Vercel", "Docker", "Kubernetes", "Serverless"],
      experience: 75,
      masteryContext: "Proficient in cloud deployment and infrastructure management.",
      position: { x: 800, y: 400 },
      connections: [],
    },
    {
      id: "ai",
      title: "AI & ML",
      icon: <Brain className="w-6 h-6" />,
      description: "Machine Learning, AI Integration",
      color: "#4f46e5",
      skills: ["TensorFlow", "PyTorch", "OpenAI", "LangChain", "Computer Vision"],
      experience: 70,
      masteryContext: "Experienced in ML model development and AI integration.",
      position: { x: 200, y: 650 },
      connections: [],
    },
    {
      id: "blockchain",
      title: "Blockchain",
      icon: <Link className="w-6 h-6" />,
      description: "Smart Contracts, Web3, DApps",
      color: "#6366f1",
      skills: ["Solidity", "Web3.js", "Ethereum", "Smart Contracts", "DeFi"],
      experience: 65,
      masteryContext: "Skilled in blockchain development and smart contract creation.",
      position: { x: 500, y: 650 },
      connections: [],
    },
    {
      id: "tools",
      title: "Fundamentals",
      icon: <Hammer className="w-6 h-6" />,
      description: "Best Practices & Principles",
      color: "#818cf8",
      skills: ["SOLID", "Design Patterns", "Clean Code", "Testing", "Architecture"],
      experience: 95,
      masteryContext: "Strong foundation in software engineering fundamentals and best practices.",
      position: { x: 800, y: 650 },
      connections: [],
    },
  ]

  const connections: Connection[] = [
    { from: "frontend", to: "backend", color: "#4f46e5" },
    { from: "backend", to: "database", color: "#6366f1" },
    { from: "frontend", to: "ai", color: "#818cf8" },
    { from: "backend", to: "ai", color: "#6366f1" },
    { from: "backend", to: "blockchain", color: "#4f46e5" },
    { from: "github", to: "cicd", color: "#4338ca" },
    { from: "cicd", to: "cloud", color: "#6366f1" },
  ]

  // Initialize particles
  useEffect(() => {
    const initialParticles: Particle[] = connections.flatMap((conn, idx) => 
      Array.from({ length: 3 }, (_, i) => ({
        id: `${conn.from}-${conn.to}-${i}`,
        fromId: conn.from,
        toId: conn.to,
        progress: (i * 33) / 100,
        speed: 0.003 + Math.random() * 0.002,
      }))
    )
    setParticles(initialParticles)
  }, [])

  // Animation loop
  useEffect(() => {
    const animate = () => {
      setParticles((prev) =>
        prev.map((p) => ({
          ...p,
          progress: p.progress >= 1 ? 0 : p.progress + p.speed,
        }))
      )
      animationFrameRef.current = requestAnimationFrame(animate)
    }
    animationFrameRef.current = requestAnimationFrame(animate)
    return () => {
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current)
      }
    }
  }, [])

  // Canvas drawing
  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext("2d")
    if (!ctx) return

    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height)

      // Draw connections
      connections.forEach((conn) => {
        const fromBlock = techBlocks.find((b) => b.id === conn.from)
        const toBlock = techBlocks.find((b) => b.id === conn.to)
        if (!fromBlock || !toBlock) return

        const x1 = fromBlock.position.x + 100
        const y1 = fromBlock.position.y + 75
        const x2 = toBlock.position.x + 100
        const y2 = toBlock.position.y + 75

        // Draw line
        ctx.strokeStyle = "#e0e7ff"
        ctx.lineWidth = 2
        ctx.beginPath()
        ctx.moveTo(x1, y1)
        ctx.lineTo(x2, y2)
        ctx.stroke()

        // Draw arrow
        const angle = Math.atan2(y2 - y1, x2 - x1)
        const arrowSize = 8
        ctx.fillStyle = "#e0e7ff"
        ctx.beginPath()
        ctx.moveTo(x2, y2)
        ctx.lineTo(
          x2 - arrowSize * Math.cos(angle - Math.PI / 6),
          y2 - arrowSize * Math.sin(angle - Math.PI / 6)
        )
        ctx.lineTo(
          x2 - arrowSize * Math.cos(angle + Math.PI / 6),
          y2 - arrowSize * Math.sin(angle + Math.PI / 6)
        )
        ctx.closePath()
        ctx.fill()
      })

      // Draw particles
      particles.forEach((particle) => {
        const fromBlock = techBlocks.find((b) => b.id === particle.fromId)
        const toBlock = techBlocks.find((b) => b.id === particle.toId)
        if (!fromBlock || !toBlock) return

        const x1 = fromBlock.position.x + 100
        const y1 = fromBlock.position.y + 75
        const x2 = toBlock.position.x + 100
        const y2 = toBlock.position.y + 75

        const x = x1 + (x2 - x1) * particle.progress
        const y = y1 + (y2 - y1) * particle.progress

        const conn = connections.find((c) => c.from === particle.fromId && c.to === particle.toId)
        ctx.fillStyle = conn?.color || "#4f46e5"
        ctx.beginPath()
        ctx.arc(x, y, 4, 0, Math.PI * 2)
        ctx.fill()

        // Glow effect
        ctx.shadowBlur = 10
        ctx.shadowColor = conn?.color || "#4f46e5"
        ctx.fill()
        ctx.shadowBlur = 0
      })
    }

    draw()
  }, [particles, techBlocks, connections])

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect()
    setMousePos({ x: e.clientX - rect.left, y: e.clientY - rect.top })

    // Check hover
    const hovered = techBlocks.find((block) => {
      const { x, y } = block.position
      return (
        mousePos.x >= x &&
        mousePos.x <= x + 200 &&
        mousePos.y >= y &&
        mousePos.y <= y + 150
      )
    })
    setHoveredBlock(hovered?.id || null)
  }

  const handleClick = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect()
    const clickX = e.clientX - rect.left
    const clickY = e.clientY - rect.top

    const clicked = techBlocks.find((block) => {
      const { x, y } = block.position
      return clickX >= x && clickX <= x + 200 && clickY >= y && clickY <= y + 150
    })

    if (clicked) {
      setSelectedBlock(clicked.id)
    }
  }

  const selected = techBlocks.find((b) => b.id === selectedBlock)
  const hovered = techBlocks.find((b) => b.id === hoveredBlock)

  return (
    <section className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-indigo-50 py-20 px-4">
      <div className="max-w-[1400px] mx-auto">
        {/* Header */}
        <div className="mb-16 text-center">
          <div className="w-16 h-1 bg-indigo-600 mx-auto mb-6"></div>
          <h1 className="text-6xl md:text-7xl font-bold text-slate-900 mb-6">Tech Ecosystem</h1>
          <p className="text-xl text-slate-600 max-w-3xl mx-auto">
            Interactive architecture showcasing full-stack expertise and emerging technologies
          </p>
        </div>

        {/* Canvas Container */}
        <div
          className="relative bg-white border-4 border-slate-900 mb-12 overflow-hidden"
          style={{ height: "850px" }}
          onMouseMove={handleMouseMove}
          onClick={handleClick}
        >
          <canvas ref={canvasRef} width={1400} height={850} className="absolute inset-0" />

          {/* Tech Blocks */}
          {techBlocks.map((block) => (
            <div
              key={block.id}
              className={`absolute cursor-pointer transition-all duration-200 ${
                hoveredBlock === block.id ? "z-20" : "z-10"
              }`}
              style={{
                left: `${block.position.x}px`,
                top: `${block.position.y}px`,
                width: "200px",
                height: "150px",
              }}
            >
              {/* Block */}
              <div
                className={`w-full h-full bg-white border-4 transition-all duration-200 ${
                  hoveredBlock === block.id
                    ? "border-indigo-600 shadow-2xl -translate-y-2"
                    : "border-slate-900 shadow-lg"
                }`}
                style={{
                  backgroundColor: hoveredBlock === block.id ? `${block.color}10` : "white",
                }}
              >
                {/* Icon */}
                <div
                  className="w-12 h-12 border-4 border-slate-900 flex items-center justify-center m-4"
                  style={{ backgroundColor: block.color }}
                >
                  <div className="text-white">{block.icon}</div>
                </div>

                {/* Title */}
                <div className="px-4">
                  <h3 className="text-lg font-bold text-slate-900 mb-1">{block.title}</h3>
                  <p className="text-xs text-slate-600 mb-3 leading-tight">{block.description}</p>

                  {/* Experience Bar */}
                  <div className="space-y-1">
                    <div className="flex justify-between items-center">
                      <span className="text-xs font-bold text-slate-700">Experience</span>
                      <span className="text-xs font-bold" style={{ color: block.color }}>
                        {block.experience}%
                      </span>
                    </div>
                    <div className="w-full h-2 bg-slate-200 border-2 border-slate-900">
                      <div
                        className="h-full transition-all duration-500"
                        style={{
                          width: `${block.experience}%`,
                          backgroundColor: block.color,
                        }}
                      />
                    </div>
                  </div>
                </div>
              </div>

              {/* Hover Tooltip */}
              {hoveredBlock === block.id && (
                <div className="absolute left-full ml-4 top-0 w-64 bg-slate-900 border-4 border-slate-900 text-white p-4 shadow-2xl z-30 pointer-events-none">
                  <h4 className="font-bold text-sm mb-2 text-indigo-300">Key Skills</h4>
                  <div className="space-y-1">
                    {block.skills.map((skill, idx) => (
                      <div key={idx} className="text-xs flex items-center gap-2">
                        <div className="w-1 h-1" style={{ backgroundColor: block.color }}></div>
                        {skill}
                      </div>
                    ))}
                  </div>
                  <div className="mt-3 pt-3 border-t border-slate-700">
                    <p className="text-xs text-slate-300">Click to view full details</p>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Side Panel for Details */}
        {selectedBlock && selected && (
          <div className="fixed right-0 top-0 h-full w-[500px] bg-white border-l-4 border-slate-900 shadow-2xl z-50 overflow-y-auto">
            {/* Header */}
            <div className="sticky top-0 bg-slate-900 text-white p-6 border-b-4 border-slate-900 flex items-start justify-between">
              <div className="flex items-start gap-4">
                <div
                  className="w-16 h-16 border-4 border-white flex items-center justify-center flex-shrink-0"
                  style={{ backgroundColor: selected.color }}
                >
                  {selected.icon}
                </div>
                <div>
                  <h2 className="text-2xl font-bold mb-1">{selected.title}</h2>
                  <p className="text-sm text-slate-300">{selected.description}</p>
                </div>
              </div>
              <button
                onClick={() => setSelectedBlock(null)}
                className="w-10 h-10 border-2 border-white hover:bg-white hover:text-slate-900 transition-colors flex items-center justify-center flex-shrink-0"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Content */}
            <div className="p-6 space-y-6">
              {/* Experience */}
              <div>
                <h3 className="text-sm font-bold text-slate-500 mb-3 uppercase tracking-wider">
                  Experience Level
                </h3>
                <div className="flex items-center gap-4">
                  <div className="flex-1 h-4 bg-slate-200 border-2 border-slate-900">
                    <div
                      className="h-full transition-all duration-500"
                      style={{
                        width: `${selected.experience}%`,
                        backgroundColor: selected.color,
                      }}
                    />
                  </div>
                  <span className="text-2xl font-bold" style={{ color: selected.color }}>
                    {selected.experience}%
                  </span>
                </div>
              </div>

              {/* Mastery */}
              <div>
                <h3 className="text-sm font-bold text-slate-500 mb-3 uppercase tracking-wider">
                  Expertise
                </h3>
                <div className="bg-slate-50 border-2 border-slate-900 p-4">
                  <p className="text-slate-700 leading-relaxed">{selected.masteryContext}</p>
                </div>
              </div>

              {/* Skills */}
              <div>
                <h3 className="text-sm font-bold text-slate-500 mb-3 uppercase tracking-wider">
                  Key Technologies
                </h3>
                <div className="grid grid-cols-2 gap-3">
                  {selected.skills.map((skill, idx) => (
                    <div
                      key={idx}
                      className="border-2 border-slate-900 p-3 font-bold text-sm text-center hover:shadow-lg transition-all"
                      style={{
                        backgroundColor: `${selected.color}15`,
                        color: selected.color,
                      }}
                    >
                      {skill}
                    </div>
                  ))}
                </div>
              </div>

              {/* Connections */}
              {selected.connections.length > 0 && (
                <div>
                  <h3 className="text-sm font-bold text-slate-500 mb-3 uppercase tracking-wider">
                    Connected Systems
                  </h3>
                  <div className="space-y-2">
                    {selected.connections.map((connId) => {
                      const connBlock = techBlocks.find((b) => b.id === connId)
                      return (
                        <button
                          key={connId}
                          onClick={() => setSelectedBlock(connId)}
                          className="w-full border-2 border-slate-900 p-3 font-bold text-sm text-left hover:shadow-lg transition-all flex items-center justify-between"
                          style={{
                            backgroundColor: `${connBlock?.color}15`,
                            color: connBlock?.color,
                          }}
                        >
                          <span>{connBlock?.title}</span>
                          <span className="text-xs">→</span>
                        </button>
                      )
                    })}
                  </div>
                </div>
              )}
            </div>
          </div>
        )}

        {/* Legend */}
        <div className="bg-white border-4 border-slate-900 p-8">
          <h3 className="text-2xl font-bold text-slate-900 mb-6">Interactive Guide</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="flex items-start gap-3">
              <div className="w-8 h-8 bg-indigo-600 border-2 border-slate-900 flex-shrink-0"></div>
              <div>
                <h4 className="font-bold text-slate-900 mb-1">Hover Blocks</h4>
                <p className="text-sm text-slate-600">Quick skill preview</p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <div className="w-8 h-8 bg-white border-2 border-slate-900 flex items-center justify-center flex-shrink-0">
                <div className="w-3 h-3 bg-indigo-600"></div>
              </div>
              <div>
                <h4 className="font-bold text-slate-900 mb-1">Click Blocks</h4>
                <p className="text-sm text-slate-600">Full details panel</p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <div className="w-8 h-8 bg-white border-2 border-slate-900 flex items-center justify-center flex-shrink-0">
                <div className="w-2 h-2 bg-indigo-600 rounded-full animate-pulse"></div>
              </div>
              <div>
                <h4 className="font-bold text-slate-900 mb-1">Animated Flow</h4>
                <p className="text-sm text-slate-600">Tech connections</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}