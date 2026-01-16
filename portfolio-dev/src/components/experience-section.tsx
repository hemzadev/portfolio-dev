"use client"

import type React from "react"

import { SectionAccent } from "@/components/section-accent"
import { useEffect, useState } from "react"
import { ChevronDown, Plus } from "lucide-react"
import { useForm, ValidationError } from "@formspree/react"

export default function ExperienceSection() {
  const [expandedId, setExpandedId] = useState<number | null>(null)
  const [showRecruiterForm, setShowRecruiterForm] = useState(false)
  const [recruiterForm, setRecruiterForm] = useState({
    company: "",
    position: "",
    contact: "",
    expectations: "",
  })

  const [state, handleSubmit] = useForm("xdaaaorz")

  useEffect(() => {
    if (state.succeeded) {
      const t = setTimeout(() => setShowRecruiterForm(false), 1200)
      return () => clearTimeout(t)
    }
  }, [state.succeeded])

  const toggleExpand = (id: number) => {
    setExpandedId(expandedId === id ? null : id)
  }

  const [showThankYou, setShowThankYou] = useState(false)

  useEffect(() => {
    if (state.succeeded) {
      setShowThankYou(true)

      // optional: auto-close after 3s
      const t = setTimeout(() => setShowThankYou(false), 5000)
      return () => clearTimeout(t)
    }
  }, [state.succeeded])


  const experiences = [
    {
      id: 1,
      title: "FullStack Engineer & Junior PM",
      company: "Business IT Solutions",
      companyUrl: "https://www.bits.ma/",
      logo: "/experience/bits.png",
      period: "Sept 2025 – Present",
      isCurrent: true,
      description:
        "Leading full-stack development projects while managing project timelines and client communications. Architecting scalable solutions using modern technologies and coordinating with cross-functional teams to deliver high-quality software products.",
    },
    {
      id: 2,
      title: "FullStack Engineer intern",
      company: "Business IT Solutions",
      companyUrl: "https://www.bits.ma/",
      logo: "/experience/bits.png",
      period: "Mars 2025 – Aug 2025",
      isCurrent: false,
      description:
        "Developed and maintained web applications using React, Node.js, and PostgreSQL. Collaborated with senior engineers to implement new features, optimize performance, and ensure code quality through testing and code reviews.",
    },
    {
      id: 3,
      title: "FullStack developer intern",
      company: "Avantages SARL",
      companyUrl: "https://www.avantages.co.ma/",
      logo: "/experience/avantages_sarl.png",
      period: "Aug 2024 – October 2024",
      isCurrent: false,
      description:
        "Built responsive web applications and RESTful APIs. Worked on database design, frontend implementation, and integration with third-party services. Gained experience in agile development methodologies.",
    },
    {
      id: 4,
      title: "IT Support intern",
      company: "SYRATEL",
      companyUrl: "http://www.syratel.com/",
      logo: "/experience/SYRATEL.png",
      period: "Mars 2022 – April 2022",
      isCurrent: false,
      description:
        "Provided technical support to end-users, troubleshooting hardware and software issues. Maintained IT infrastructure, performed system updates, and documented technical procedures to improve support efficiency.",
    },
  ]

  return (
    <section className="p-8 bg-slate-950">
      <div className="flex flex-row gap-16">
        <div className="flex flex-col gap-2 flex-1">
          <SectionAccent />
          <h1 className="text-3xl font-bold text-white">Professional Experiences</h1>
          <p className="text-slate-400">
            Here is a summary of my professional experiences, highlighting my skills and contributions in each role.
          </p>
        </div>

        {showThankYou && (
          <div
            className="fixed inset-0 z-[999] flex items-center justify-center px-4"
            role="dialog"
            aria-modal="true"
            onClick={() => setShowThankYou(false)}
          >
            {/* Backdrop */}
            <div className="absolute inset-0 bg-black/70 backdrop-blur-sm" />

            {/* Modal */}
            <div
              className="relative w-full max-w-md overflow-hidden border-2 border-dashed border-violet-500 bg-slate-900 shadow-2xl shadow-violet-500/20"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Top accent */}
              <div className="h-1 w-full bg-gradient-to-r from-violet-600 to-violet-700" />

              <div className="p-6 flex flex-col items-center text-center gap-4">
                <img
                  src="/thankyou.gif"
                  alt="Thank you"
                  className="w-44 h-44 object-contain rounded bg-slate-800/40 p-2"
                />
                <p className="text-slate-300 text-sm leading-relaxed">
                  I received your opportunity. I’ll contact you as fast as I can.
                </p>

                <button
                  type="button"
                  onClick={() => setShowThankYou(false)}
                  className="mt-2 w-full bg-gradient-to-r from-violet-600 to-violet-700 text-white py-2 px-4 hover:from-violet-700 hover:to-violet-800 transition-all focus:outline-none focus:ring-2 focus:ring-violet-500 focus:ring-offset-2 focus:ring-offset-slate-900"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        )}

        <div className="flex flex-col gap-4 flex-1">
          {/* Be My Next Opportunity Card */}
          <div className="relative flex flex-col bg-slate-900 border-2 border-dashed border-violet-500 overflow-hidden transition-all duration-300 hover:shadow-lg hover:shadow-violet-500/20 hover:border-violet-400">
            {!showRecruiterForm ? (
              <div
                className="flex flex-row p-4 gap-4 cursor-pointer items-center justify-center min-h-24"
                onClick={() => setShowRecruiterForm(true)}
              >
                <div className="flex items-center gap-3 text-violet-400 hover:text-violet-300 transition-colors">
                  <Plus className="w-6 h-6" />
                  <span className="text-lg font-semibold">Be My Next Opportunity</span>
                </div>
              </div>
            ) : (
              <div className="p-6">
                <h3 className="text-xl font-semibold text-violet-400 mb-4">Tell Me About Your Opportunity</h3>

                {/* ✅ Formspree submit */}
                <form onSubmit={handleSubmit} className="space-y-4">
                  {state.succeeded && (
                    <div className="rounded border border-violet-600/40 bg-violet-600/10 px-3 py-2 text-sm text-violet-200">
                      Thanks! Your message was sent.
                    </div>
                  )}

                  <div>
                    <label className="block text-sm font-medium text-slate-300 mb-1">Company *</label>
                    <input
                      type="text"
                      name="company"
                      required
                      className="w-full px-3 py-2 bg-slate-800 border border-slate-700 text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-violet-500 focus:border-violet-500"
                      placeholder="Enter company name"
                    />
                    <ValidationError prefix="Company" field="company" errors={state.errors} />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-slate-300 mb-1">Position *</label>
                    <input
                      type="text"
                      name="position"
                      required
                      className="w-full px-3 py-2 bg-slate-800 border border-slate-700 text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-violet-500 focus:border-violet-500"
                      placeholder="Enter position title"
                    />
                    <ValidationError prefix="Position" field="position" errors={state.errors} />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-slate-300 mb-1">Contact Information *</label>
                    <input
                      type="text"
                      name="contact"
                      required
                      className="w-full px-3 py-2 bg-slate-800 border border-slate-700 text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-violet-500 focus:border-violet-500"
                      placeholder="Email or phone number"
                    />
                    <ValidationError prefix="Contact" field="contact" errors={state.errors} />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-slate-300 mb-1">
                      What you expect me to contribute *
                    </label>
                    <textarea
                      name="expectations"
                      required
                      rows={3}
                      className="w-full px-3 py-2 bg-slate-800 border border-slate-700 text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-violet-500 focus:border-violet-500 resize-none"
                      placeholder="Describe the role, challenges, and what you're looking for..."
                    />
                    <ValidationError prefix="Expectations" field="expectations" errors={state.errors} />
                  </div>

                  <div className="flex gap-3 pt-2">
                    <button
                      type="submit"
                      disabled={state.submitting}
                      className="flex-1 bg-gradient-to-r from-violet-600 to-violet-700 text-white py-2 px-4 hover:from-violet-700 hover:to-violet-800 transition-all focus:outline-none focus:ring-2 focus:ring-violet-500 focus:ring-offset-2 focus:ring-offset-slate-900 disabled:opacity-60 disabled:cursor-not-allowed"
                    >
                      {state.submitting ? "Sending..." : "Submit Opportunity"}
                    </button>

                    <button
                      type="button"
                      onClick={() => setShowRecruiterForm(false)}
                      className="flex-1 bg-slate-800 text-slate-200 py-2 px-4 hover:bg-slate-700 transition-colors focus:outline-none focus:ring-2 focus:ring-slate-600 focus:ring-offset-2 focus:ring-offset-slate-900"
                    >
                      Cancel
                    </button>
                  </div>
                </form>
              </div>
            )}
          </div>

          {/* Existing Experience Items */}
          {experiences.map((exp) => (
            <div
              key={exp.id}
              className="relative flex flex-col bg-slate-900 border border-slate-800 overflow-hidden transition-all duration-300 hover:shadow-lg hover:shadow-violet-500/10 hover:border-violet-600"
            >
              <div className="flex flex-row p-4 gap-4 cursor-pointer relative" onClick={() => toggleExpand(exp.id)}>
                <img
                  src={exp.logo || "/placeholder.svg"}
                  alt={`${exp.company} logo`}
                  className="w-15 h-15 object-contain rounded-full bg-violet-950 p-1"
                />
                <div className="flex-1">
                  <h2 className="text-xl font-semibold text-white">{exp.title}</h2>
                  <a
                    href={exp.companyUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-slate-400 hover:text-violet-400 transition-colors text-sm underline underline-offset-3"
                    onClick={(e) => e.stopPropagation()}
                  >
                    @{exp.company}
                  </a>

                  <div className="absolute bottom-3 right-3 text-sm text-slate-400 font-medium">{exp.period}</div>
                </div>

                <ChevronDown
                  className={`w-5 h-5 text-slate-500 transition-transform duration-300 ${
                    expandedId === exp.id ? "rotate-180" : ""
                  }`}
                />

                {exp.isCurrent && (
                  <div className="absolute top-3 right-3 flex items-center justify-center px-3 py-1 bg-gradient-to-r from-violet-600 to-violet-700 text-sm text-white rounded">
                    Current position
                  </div>
                )}
              </div>

              <div
                className={`transition-all duration-300 ease-in-out ${
                  expandedId === exp.id ? "max-h-96 opacity-100" : "max-h-0 opacity-0"
                }`}
              >
                <div className="px-4 pb-4 pt-2 border-t border-slate-800">
                  <p className="text-slate-300 text-sm leading-relaxed">{exp.description}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
