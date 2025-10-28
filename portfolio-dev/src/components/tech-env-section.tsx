"use client"

import React, { useState, useEffect, useRef } from "react"
import { Code, TestTube2, Cloud, Server, Zap, Brain, Link, Container, Workflow, X } from "lucide-react"

interface Phase {
  id: string
  title: string
  icon: React.ReactNode
  description: string
  color: string
  tools: string[]
  details: string
  position: { x: number; y: number }
  connections: string[]
}

export default function DevOpsLifecycle() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const [selectedPhase, setSelectedPhase] = useState<string | null>(null)
  const [hoveredPhase, setHoveredPhase] = useState<string | null>(null)
  const [particles, setParticles] = useState<Array<{id: string, fromId: string, toId: string, progress: number, speed: number}>>([])
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 })

  const phases: Phase[] = [
    {
      id: "planning",
      title: "Planning & Design",
      icon: <Workflow className="w-6 h-6" />,
      description: "Requirements, Architecture, System Design",
      color: "#4f46e5",
      tools: ["Agile Methodology", "System Design", "API Design", "Database Design", "Architecture Patterns"],
      details: "Collaborate with stakeholders to define project requirements and technical specifications. Design scalable system architecture and create comprehensive technical documentation.",
      position: { x: 100, y: 50 },
      connections: ["development", "monitoring"]
    },
    {
      id: "development",
      title: "Development",
      icon: <Code className="w-6 h-6" />,
      description: "Coding, Version Control, Collaboration",
      color: "#6366f1",
      tools: ["React/Next.js", "Node.js", "TypeScript", "Git/GitHub", "Code Review"],
      details: "Implement features using modern frameworks and best practices. Conduct code reviews and maintain high code quality standards. Collaborate with team members using version control.",
      position: { x: 400, y: 50 },
      connections: ["testing", "specialized"]
    },
    {
      id: "testing",
      title: "Testing & CI/CD",
      icon: <TestTube2 className="w-6 h-6" />,
      description: "Automated Testing, Continuous Integration",
      color: "#818cf8",
      tools: ["Jest/Cypress", "GitHub Actions", "Docker", "Automated Pipelines", "Quality Gates"],
      details: "Implement comprehensive testing strategies including unit, integration, and end-to-end tests. Set up CI/CD pipelines for automated testing and deployment.",
      position: { x: 700, y: 50 },
      connections: ["deployment"]
    },
    {
      id: "deployment",
      title: "Deployment",
      icon: <Cloud className="w-6 h-6" />,
      description: "Cloud Infrastructure, Containerization",
      color: "#4f46e5",
      tools: ["AWS/Cloud", "Kubernetes", "Docker", "Infrastructure as Code", "Load Balancing"],
      details: "Deploy applications to cloud platforms using containerization and orchestration tools. Implement infrastructure as code for reproducible environments.",
      position: { x: 100, y: 250 },
      connections: ["monitoring", "specialized"]
    },
    {
      id: "monitoring",
      title: "Monitoring & Scale",
      icon: <Zap className="w-6 h-6" />,
      description: "Observability, Performance, Scaling",
      color: "#6366f1",
      tools: ["Performance Monitoring", "Logging", "Auto-scaling", "APM Tools", "Alerting"],
      details: "Monitor application performance and system health using modern observability tools. Implement logging, metrics, and tracing for comprehensive visibility.",
      position: { x: 400, y: 250 },
      connections: ["planning"]
    },
    {
      id: "specialized",
      title: "Specialized Tech",
      icon: <Brain className="w-6 h-6" />,
      description: "AI, Blockchain, Advanced Systems",
      color: "#818cf8",
      tools: ["AI/ML Integration", "Blockchain", "Microservices", "Container Orchestration"],
      details: "Leverage advanced technologies like AI/ML, blockchain, and microservices to build cutting-edge solutions. Experience with complex system architectures.",
      position: { x: 700, y: 250 },
      connections: []
    }
  ]

  const connections = [
    { from: "planning", to: "development", color: "#4f46e5" },
    { from: "development", to: "testing", color: "#6366f1" },
    { from: "testing", to: "deployment", color: "#818cf8" },
    { from: "deployment", to: "monitoring", color: "#4f46e5" },
    { from: "monitoring", to: "planning", color: "#6366f1" },
    { from: "development", to: "specialized", color: "#818cf8" },
    { from: "deployment", to: "specialized", color: "#4f46e5" },
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
    let animationFrameId: number

    const animate = () => {
      setParticles(prev =>
        prev.map(p => ({
          ...p,
          progress: p.progress >= 1 ? 0 : p.progress + p.speed,
        }))
      )
      animationFrameId = requestAnimationFrame(animate)
    }

    animationFrameId = requestAnimationFrame(animate)
    return () => cancelAnimationFrame(animationFrameId)
  }, [])

  // Canvas drawing
  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext('2d')
    if (!ctx) return

    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height)

      // Draw connections
      connections.forEach((conn) => {
        const fromPhase = phases.find((p) => p.id === conn.from)
        const toPhase = phases.find((p) => p.id === conn.to)
        if (!fromPhase || !toPhase) return

        const x1 = fromPhase.position.x + 100
        const y1 = fromPhase.position.y + 75
        const x2 = toPhase.position.x + 100
        const y2 = toPhase.position.y + 75

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
        const fromPhase = phases.find((p) => p.id === particle.fromId)
        const toPhase = phases.find((p) => p.id === particle.toId)
        if (!fromPhase || !toPhase) return

        const x1 = fromPhase.position.x + 100
        const y1 = fromPhase.position.y + 75
        const x2 = toPhase.position.x + 100
        const y2 = toPhase.position.y + 75

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
  }, [particles, phases])

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect()
    setMousePos({ x: e.clientX - rect.left, y: e.clientY - rect.top })

    // Check hover
    const hovered = phases.find((phase) => {
      const { x, y } = phase.position
      return (
        mousePos.x >= x &&
        mousePos.x <= x + 200 &&
        mousePos.y >= y &&
        mousePos.y <= y + 150
      )
    })
    setHoveredPhase(hovered?.id || null)
  }

  const handleClick = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect()
    const clickX = e.clientX - rect.left
    const clickY = e.clientY - rect.top

    const clicked = phases.find((phase) => {
      const { x, y } = phase.position
      return clickX >= x && clickX <= x + 200 && clickY >= y && clickY <= y + 150
    })

    if (clicked) {
      setSelectedPhase(clicked.id)
    }
  }

  const selected = phases.find((p) => p.id === selectedPhase)
  const hovered = phases.find((p) => p.id === hoveredPhase)

  return (
    <section className="min-h-screen bg-gradient-to-br from-slate-50 to-indigo-50 py-12 px-4">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="w-12 h-1 bg-indigo-600 mx-auto mb-4"></div>
          <h1 className="text-4xl font-bold text-slate-900 mb-4">
            DevOps Lifecycle Architecture
          </h1>
          <p className="text-lg text-slate-600 max-w-3xl mx-auto">
            End-to-end involvement in modern software development practices, from initial planning 
            to production monitoring and specialized technology integration.
          </p>
        </div>

        {/* Architecture Diagram Container */}
        <div
          className="relative bg-white border-4 border-slate-900 overflow-hidden mb-8"
          style={{ height: "500px" }}
          onMouseMove={handleMouseMove}
          onClick={handleClick}
        >
          <canvas ref={canvasRef} width={1000} height={500} className="absolute inset-0" />

          {/* Phase Nodes */}
          {phases.map((phase) => (
            <div
              key={phase.id}
              className={`absolute cursor-pointer transition-all duration-200 ${
                hoveredPhase === phase.id ? "z-20" : "z-10"
              }`}
              style={{
                left: `${phase.position.x}px`,
                top: `${phase.position.y}px`,
                width: "200px",
                height: "150px",
              }}
            >
              {/* Phase Card */}
              <div
                className={`w-full h-full bg-white border-4 transition-all duration-200 ${
                  hoveredPhase === phase.id
                    ? "border-indigo-600 shadow-2xl -translate-y-2"
                    : "border-slate-900 shadow-lg"
                }`}
                style={{
                  backgroundColor: hoveredPhase === phase.id ? `${phase.color}10` : "white",
                }}
              >
                {/* Icon */}
                <div
                  className="w-12 h-12 border-4 border-slate-900 flex items-center justify-center m-4"
                  style={{ backgroundColor: phase.color }}
                >
                  <div className="text-white">{phase.icon}</div>
                </div>

                {/* Content */}
                <div className="px-4">
                  <h3 className="text-lg font-bold text-slate-900 mb-1">{phase.title}</h3>
                  <p className="text-xs text-slate-600 mb-3 leading-tight">{phase.description}</p>

                  {/* Tools Preview */}
                  <div className="flex flex-wrap gap-1">
                    {phase.tools.slice(0, 2).map((tool, idx) => (
                      <span
                        key={idx}
                        className="text-xs px-1 py-0.5 border border-slate-900 font-bold"
                        style={{
                          backgroundColor: `${phase.color}15`,
                          color: phase.color,
                        }}
                      >
                        {tool}
                      </span>
                    ))}
                    {phase.tools.length > 2 && (
                      <span className="text-xs text-slate-500 font-bold">
                        +{phase.tools.length - 2}
                      </span>
                    )}
                  </div>
                </div>
              </div>

              {/* Hover Tooltip */}
              {hoveredPhase === phase.id && (
                <div className="absolute left-full ml-4 top-0 w-64 bg-slate-900 border-4 border-slate-900 text-white p-4 shadow-2xl z-30 pointer-events-none">
                  <h4 className="font-bold text-sm mb-2 text-indigo-300">Key Tools</h4>
                  <div className="space-y-1">
                    {phase.tools.slice(0, 4).map((tool, idx) => (
                      <div key={idx} className="text-xs flex items-center gap-2">
                        <div className="w-1 h-1" style={{ backgroundColor: phase.color }}></div>
                        {tool}
                      </div>
                    ))}
                    {phase.tools.length > 4 && (
                      <div className="text-xs text-slate-400 mt-1">
                        +{phase.tools.length - 4} more tools
                      </div>
                    )}
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
        {selectedPhase && selected && (
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
                onClick={() => setSelectedPhase(null)}
                className="w-10 h-10 border-2 border-white hover:bg-white hover:text-slate-900 transition-colors flex items-center justify-center flex-shrink-0"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Content */}
            <div className="p-6 space-y-6">
              {/* Details */}
              <div>
                <h3 className="text-sm font-bold text-slate-500 mb-3 uppercase tracking-wider">
                  Role & Responsibilities
                </h3>
                <div className="bg-slate-50 border-2 border-slate-900 p-4">
                  <p className="text-slate-700 leading-relaxed">{selected.details}</p>
                </div>
              </div>

              {/* Tools & Technologies */}
              <div>
                <h3 className="text-sm font-bold text-slate-500 mb-3 uppercase tracking-wider">
                  Tools & Technologies
                </h3>
                <div className="grid grid-cols-2 gap-3">
                  {selected.tools.map((tool, idx) => (
                    <div
                      key={idx}
                      className="border-2 border-slate-900 p-3 font-bold text-sm text-center hover:shadow-lg transition-all"
                      style={{
                        backgroundColor: `${selected.color}15`,
                        color: selected.color,
                      }}
                    >
                      {tool}
                    </div>
                  ))}
                </div>
              </div>

              {/* Connections */}
              {selected.connections.length > 0 && (
                <div>
                  <h3 className="text-sm font-bold text-slate-500 mb-3 uppercase tracking-wider">
                    Connected Phases
                  </h3>
                  <div className="space-y-2">
                    {selected.connections.map((connId) => {
                      const connPhase = phases.find((p) => p.id === connId)
                      return (
                        <button
                          key={connId}
                          onClick={() => setSelectedPhase(connId)}
                          className="w-full border-2 border-slate-900 p-3 font-bold text-sm text-left hover:shadow-lg transition-all flex items-center justify-between"
                          style={{
                            backgroundColor: `${connPhase?.color}15`,
                            color: connPhase?.color,
                          }}
                        >
                          <span>{connPhase?.title}</span>
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
      </div>
    </section>
  )
}

interface Particle {
  id: string
  fromId: string
  toId: string
  progress: number
  speed: number
}