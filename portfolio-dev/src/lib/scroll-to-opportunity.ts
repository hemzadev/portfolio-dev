export async function scrollToOpportunity(options?: { headerOffset?: number }) {
    const headerOffset = options?.headerOffset ?? 100
  
    // Wait for DOM to settle (important on mobile after closing menu)
    await new Promise<void>((resolve) => requestAnimationFrame(() => resolve()))
    await new Promise<void>((resolve) => requestAnimationFrame(() => resolve()))
  
    const experienceSection = document.getElementById("experience")
    if (!experienceSection) return
  
    const elementPosition = experienceSection.getBoundingClientRect().top + window.pageYOffset
    const offsetPosition = elementPosition - headerOffset
  
    window.scrollTo({ top: offsetPosition, behavior: "smooth" })
  
    // Give the smooth scroll time to land (mobile needs a bit more)
    await new Promise((r) => setTimeout(r, 900))
  
    const opportunityCard = document.querySelector('[data-opportunity-card]') as HTMLElement | null
    if (!opportunityCard) return
  
    opportunityCard.classList.add("ring-4", "ring-violet-500", "ring-opacity-75")
  
    const isFormOpen = opportunityCard.querySelector("[data-recruiter-form]")
    if (!isFormOpen) {
      opportunityCard.click()
    }
  
    setTimeout(() => {
      opportunityCard.classList.remove("ring-4", "ring-violet-500", "ring-opacity-75")
    }, 2000)
  }
  