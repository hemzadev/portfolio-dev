"use client"

import { SectionAccent } from "@/components/section-accent"
import { useState } from "react"
import { ChevronDown, Plus } from "lucide-react"

export default function ExperienceSection() {
  const [expandedId, setExpandedId] = useState<number | null>(null)
  const [showRecruiterForm, setShowRecruiterForm] = useState(false)
  const [recruiterForm, setRecruiterForm] = useState({
    company: "",
    position: "",
    contact: "",
    expectations: ""
  })

  const experiences = [
    {
      id: 1,
      title: "FullStack Engineer & Junior PM",
      company: "Business IT Solutions",
      companyUrl: "https://www.bits.ma/",
      logo: "/experience/bits.png",
      period: "Sept 2025 – Present",
      isCurrent: true,
      description: "Leading full-stack development projects while managing project timelines and client communications. Architecting scalable solutions using modern technologies and coordinating with cross-functional teams to deliver high-quality software products."
    },
    {
      id: 2,
      title: "FullStack Engineer intern",
      company: "Business IT Solutions",
      companyUrl: "https://www.bits.ma/",
      logo: "/experience/bits.png",
      period: "Mars 2025 – Aug 2025",
      isCurrent: false,
      description: "Developed and maintained web applications using React, Node.js, and PostgreSQL. Collaborated with senior engineers to implement new features, optimize performance, and ensure code quality through testing and code reviews."
    },
    {
      id: 3,
      title: "FullStack developer intern",
      company: "Avantages SARL",
      companyUrl: "https://www.avantages.co.ma/",
      logo: "/experience/avantages_sarl.png",
      period: "Aug 2024 – October 2024",
      isCurrent: false,
      description: "Built responsive web applications and RESTful APIs. Worked on database design, frontend implementation, and integration with third-party services. Gained experience in agile development methodologies."
    },
    {
      id: 4,
      title: "IT Support intern",
      company: "SYRATEL",
      companyUrl: "http://www.syratel.com/",
      logo: "/experience/SYRATEL.png",
      period: "Mars 2022 – April 2022",
      isCurrent: false,
      description: "Provided technical support to end-users, troubleshooting hardware and software issues. Maintained IT infrastructure, performed system updates, and documented technical procedures to improve support efficiency."
    }
  ]

  const toggleExpand = (id: number) => {
    setExpandedId(expandedId === id ? null : id)
  }

  const handleRecruiterSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Here you would typically send the data to your backend or email service
    console.log("Recruiter opportunity:", recruiterForm)
    
    // Reset form and close
    setRecruiterForm({ company: "", position: "", contact: "", expectations: "" })
    setShowRecruiterForm(false)
    
    // Show success message (you can replace this with a toast notification)
    alert("Thank you for your interest! I'll get back to you soon.")
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setRecruiterForm(prev => ({
      ...prev,
      [name]: value
    }))
  }

  return (
    <section className="p-8">
      <div className="flex flex-row gap-16">
        <div className="flex flex-col gap-2 flex-1">
          <SectionAccent />
          <h1 className="text-3xl font-bold">Professional Experiences</h1>
          <p className="text-gray-600">
            Here is a summary of my professional experiences, highlighting my skills and contributions in each role.
          </p>
        </div>

        <div className="flex flex-col gap-4 flex-1">
          {/* Be My Next Opportunity Card */}
          <div className="relative flex flex-col bg-gradient-to-r from-indigo-50 to-purple-50 border-2 border-dashed border-indigo-200 overflow-hidden transition-all duration-300 hover:shadow-lg hover:border-indigo-300">
            {!showRecruiterForm ? (
              <div
                className="flex flex-row p-4 gap-4 cursor-pointer items-center justify-center min-h-24"
                onClick={() => setShowRecruiterForm(true)}
              >
                <div className="flex items-center gap-3 text-indigo-600 hover:text-indigo-700 transition-colors">
                  <Plus className="w-6 h-6" />
                  <span className="text-lg font-semibold">Be My Next Opportunity</span>
                </div>
              </div>
            ) : (
              <div className="p-6">
                <h3 className="text-xl font-semibold text-indigo-700 mb-4">Tell Me About Your Opportunity</h3>
                <form onSubmit={handleRecruiterSubmit} className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Company *
                    </label>
                    <input
                      type="text"
                      name="company"
                      value={recruiterForm.company}
                      onChange={handleInputChange}
                      required
                      className="w-full px-3 py-2 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                      placeholder="Enter company name"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Position *
                    </label>
                    <input
                      type="text"
                      name="position"
                      value={recruiterForm.position}
                      onChange={handleInputChange}
                      required
                      className="w-full px-3 py-2 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                      placeholder="Enter position title"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Contact Information *
                    </label>
                    <input
                      type="text"
                      name="contact"
                      value={recruiterForm.contact}
                      onChange={handleInputChange}
                      required
                      className="w-full px-3 py-2 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                      placeholder="Email or phone number"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      What you expect me to contribute *
                    </label>
                    <textarea
                      name="expectations"
                      value={recruiterForm.expectations}
                      onChange={handleInputChange}
                      required
                      rows={3}
                      className="w-full px-3 py-2 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent resize-none"
                      placeholder="Describe the role, challenges, and what you're looking for in a candidate..."
                    />
                  </div>
                  
                  <div className="flex gap-3 pt-2">
                    <button
                      type="submit"
                      className="flex-1 bg-indigo-600 text-white py-2 px-4 hover:bg-indigo-700 transition-colors focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                    >
                      Submit Opportunity
                    </button>
                    <button
                      type="button"
                      onClick={() => setShowRecruiterForm(false)}
                      className="flex-1 bg-gray-300 text-gray-700 py-2 px-4 hover:bg-gray-400 transition-colors focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2"
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
              className="relative flex flex-col bg-white shadow overflow-hidden transition-all duration-300 hover:shadow-lg"
            >
              <div
                className="flex flex-row p-4 gap-4 cursor-pointer relative"
                onClick={() => toggleExpand(exp.id)}
              >
                <img
                  src={exp.logo}
                  alt={`${exp.company} logo`}
                  className="w-15 h-15 object-contain rounded-full bg-indigo-100 p-1"
                />
                <div className="flex-1">
                  <h2 className="text-xl font-semibold">{exp.title}</h2>
                  <a
                    href={exp.companyUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-gray-500 hover:text-indigo-600 transition-colors text-sm underline underline-offset-3"
                    onClick={(e) => e.stopPropagation()}
                  >
                    @{exp.company}
                  </a>
                  
                  <div className="absolute bottom-3 right-3 text-sm text-gray-500 font-medium">
                    {exp.period}
                  </div>
                </div>
                
                <ChevronDown
                  className={`w-5 h-5 text-gray-400 transition-transform duration-300 ${
                    expandedId === exp.id ? "rotate-180" : ""
                  }`}
                />

                {exp.isCurrent && (
                  <div className="absolute top-3 right-3 flex items-center justify-center px-3 py-1 bg-indigo-300 text-sm text-white">
                    Current position
                  </div>
                )}
              </div>

              <div
                className={`transition-all duration-300 ease-in-out ${
                  expandedId === exp.id
                    ? "max-h-96 opacity-100"
                    : "max-h-0 opacity-0"
                }`}
              >
                <div className="px-4 pb-4 pt-2 border-t border-gray-100">
                  <p className="text-gray-600 text-sm leading-relaxed">
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