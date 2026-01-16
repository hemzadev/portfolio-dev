"use client"

import { useEffect, useState } from "react"
import { ChevronDown, Plus } from "lucide-react"

// Mock SectionAccent component since we don't have it
const SectionAccent = () => (
  <div className="h-1 w-20 bg-gradient-to-r from-violet-600 to-violet-700 rounded-full" />
)

export default function ExperienceSection() {
  const [expandedId, setExpandedId] = useState<number | null>(null)
  const [showRecruiterForm, setShowRecruiterForm] = useState(false)
  const [showThankYou, setShowThankYou] = useState(false)
  const [formData, setFormData] = useState({
    company: "",
    position: "",
    contact: "",
    expectations: "",
  })

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    })
  }

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Handle form submission
    setShowThankYou(true)
    setFormData({
      company: "",
      position: "",
      contact: "",
      expectations: "",
    })
    setTimeout(() => {
      setShowThankYou(false)
      setShowRecruiterForm(false)
    }, 3000)
  }

  const toggleExpand = (id: number) => {
    setExpandedId(expandedId === id ? null : id)
  }

  useEffect(() => {
    const open = () => {
      setShowRecruiterForm(true)
  
      // optional highlight
      const card = document.querySelector("[data-opportunity-card]") as HTMLElement | null
      if (card) {
        card.classList.add("ring-4", "ring-violet-500", "ring-opacity-75")
        setTimeout(() => {
          card.classList.remove("ring-4", "ring-violet-500", "ring-opacity-75")
        }, 2000)
      }
    }
  
    window.addEventListener("open-opportunity-form", open)
    return () => window.removeEventListener("open-opportunity-form", open)
  }, [])  

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
    <section id="experience" className="p-4 md:p-8 bg-slate-50 dark:bg-slate-950 transition-colors duration-300">
      <div className="flex flex-col md:flex-row gap-8 md:gap-16">
        <div className="flex flex-col gap-2 flex-1 min-w-0">
          <SectionAccent />
          <h1 className="text-2xl md:text-3xl font-bold text-slate-900 dark:text-white transition-colors">
            Professional Experiences
          </h1>
          <p className="text-slate-600 dark:text-slate-400 text-sm md:text-base transition-colors">
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
            <div className="absolute inset-0 bg-black/70 backdrop-blur-sm" />
            <div
              className="relative w-full max-w-md overflow-hidden border-2 border-dashed border-violet-500 bg-white dark:bg-slate-900 shadow-2xl shadow-violet-500/20 transition-colors"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="h-1 w-full bg-gradient-to-r from-violet-600 to-violet-700" />
              <div className="p-6 flex flex-col items-center text-center gap-4">
                <div className="w-44 h-44 flex items-center justify-center bg-slate-100 dark:bg-slate-800/40 rounded">
                  <span className="text-6xl">🎉</span>
                </div>
                <p className="text-slate-700 dark:text-slate-300 text-sm leading-relaxed transition-colors">
                  I received your opportunity. I'll contact you as fast as I can.
                </p>
                <button
                  type="button"
                  onClick={() => setShowThankYou(false)}
                  className="mt-2 w-full bg-gradient-to-r from-violet-600 to-violet-700 text-white py-2 px-4 hover:from-violet-700 hover:to-violet-800 transition-all focus:outline-none focus:ring-2 focus:ring-violet-500 focus:ring-offset-2 focus:ring-offset-white dark:focus:ring-offset-slate-900"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        )}

        <div className="flex flex-col gap-4 flex-1">
          <div 
            data-opportunity-card
            className="relative flex flex-col bg-white dark:bg-slate-900 border-2 border-dashed border-violet-500 overflow-hidden transition-all duration-300 hover:shadow-lg hover:shadow-violet-500/20 hover:border-violet-400"
          >
            {!showRecruiterForm ? (
              <div
                className="flex flex-row p-4 gap-4 cursor-pointer items-center justify-center min-h-24"
                onClick={() => setShowRecruiterForm(true)}
              >
                <div className="flex items-center gap-3 text-violet-400 hover:text-violet-300 transition-colors">
                  <Plus className="w-6 h-6" />
                  <span className="text-sm md:text-lg font-semibold">Be My Next Opportunity</span>
                </div>
              </div>
            ) : (
              <div className="p-6" data-recruiter-form>
                <h3 className="text-lg md:text-xl font-semibold text-violet-400 mb-4">
                  Tell Me About Your Opportunity
                </h3>
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1 transition-colors">
                      Company *
                    </label>
                    <input
                      type="text"
                      name="company"
                      value={formData.company}
                      onChange={handleInputChange}
                      required
                      className="w-full px-3 py-2 bg-slate-100 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 text-slate-900 dark:text-white placeholder-slate-400 dark:placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-violet-500 focus:border-violet-500 transition-colors"
                      placeholder="Enter company name"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1 transition-colors">
                      Position *
                    </label>
                    <input
                      type="text"
                      name="position"
                      value={formData.position}
                      onChange={handleInputChange}
                      required
                      className="w-full px-3 py-2 bg-slate-100 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 text-slate-900 dark:text-white placeholder-slate-400 dark:placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-violet-500 focus:border-violet-500 transition-colors"
                      placeholder="Enter position title"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1 transition-colors">
                      Contact Information *
                    </label>
                    <input
                      type="text"
                      name="contact"
                      value={formData.contact}
                      onChange={handleInputChange}
                      required
                      className="w-full px-3 py-2 bg-slate-100 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 text-slate-900 dark:text-white placeholder-slate-400 dark:placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-violet-500 focus:border-violet-500 transition-colors"
                      placeholder="Email or phone number"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1 transition-colors">
                      What you expect me to contribute *
                    </label>
                    <textarea
                      name="expectations"
                      value={formData.expectations}
                      onChange={handleInputChange}
                      required
                      rows={3}
                      className="w-full px-3 py-2 bg-slate-100 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 text-slate-900 dark:text-white placeholder-slate-400 dark:placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-violet-500 focus:border-violet-500 resize-none transition-colors"
                      placeholder="Describe the role, challenges, and what you're looking for..."
                    />
                  </div>
                  <div className="flex gap-3 pt-2 flex-col md:flex-row">
                    <button
                      type="button"
                      onClick={handleFormSubmit}
                      className="flex-1 bg-gradient-to-r from-violet-600 to-violet-700 text-white py-2 px-4 hover:from-violet-700 hover:to-violet-800 transition-all focus:outline-none focus:ring-2 focus:ring-violet-500 focus:ring-offset-2 focus:ring-offset-white dark:focus:ring-offset-slate-900"
                    >
                      Submit Opportunity
                    </button>
                    <button
                      type="button"
                      onClick={() => setShowRecruiterForm(false)}
                      className="flex-1 bg-slate-200 dark:bg-slate-800 text-slate-800 dark:text-slate-200 py-2 px-4 hover:bg-slate-300 dark:hover:bg-slate-700 transition-colors focus:outline-none focus:ring-2 focus:ring-slate-400 dark:focus:ring-slate-600 focus:ring-offset-2 focus:ring-offset-white dark:focus:ring-offset-slate-900"
                    >
                      Cancel
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>

          {experiences.map((exp) => (
            <div
              key={exp.id}
              className="relative flex flex-col bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 overflow-hidden transition-all duration-300 hover:shadow-lg hover:shadow-violet-500/10 hover:border-violet-600"
            >
              <div
                className="flex flex-col md:flex-row p-4 gap-4 cursor-pointer relative"
                onClick={() => toggleExpand(exp.id)}
              >
                <img
                  src={exp.logo || "/placeholder.svg"}
                  alt={`${exp.company} logo`}
                  className="w-15 h-15 object-contain rounded-full bg-violet-100 dark:bg-violet-950 p-1 flex-shrink-0 transition-colors"
                />
                <div className="flex-1 min-w-0">
                  <h2 className="text-lg md:text-xl font-semibold text-slate-900 dark:text-white transition-colors">
                    {exp.title}
                  </h2>
                  <a
                    href={exp.companyUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-slate-600 dark:text-slate-400 hover:text-violet-400 transition-colors text-sm underline underline-offset-3"
                    onClick={(e) => e.stopPropagation()}
                  >
                    @{exp.company}
                  </a>
                  <div className="md:absolute md:bottom-3 md:right-3 text-sm text-slate-500 dark:text-slate-400 font-medium mt-2 md:mt-0 transition-colors">
                    {exp.period}
                  </div>
                </div>
                <ChevronDown
                  className={`w-5 h-5 text-slate-400 dark:text-slate-500 transition-transform duration-300 flex-shrink-0 ${
                    expandedId === exp.id ? "rotate-180" : ""
                  }`}
                />
                {exp.isCurrent && (
                  <div className="md:absolute md:top-3 md:right-3 flex items-center justify-center px-3 py-1 bg-gradient-to-r from-violet-600 to-violet-700 text-sm text-white rounded">
                    Current position
                  </div>
                )}
              </div>
              <div
                className={`transition-all duration-300 ease-in-out ${
                  expandedId === exp.id ? "max-h-96 opacity-100" : "max-h-0 opacity-0"
                }`}
              >
                <div className="px-4 pb-4 pt-2 border-t border-slate-200 dark:border-slate-800 transition-colors">
                  <p className="text-slate-700 dark:text-slate-300 text-sm leading-relaxed transition-colors">
                    {exp.description}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}