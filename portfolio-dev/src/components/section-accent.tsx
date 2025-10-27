"use client"

interface SectionAccentProps {
  label?: string
}

export function SectionAccent({ label = "EXPERIENCE" }: SectionAccentProps) {
  return (
    <div className="flex items-center gap-3 mb-6">
      {label && (
        <span className="text-xl font-semibold text-gray-500 uppercase tracking-wider animate-badge-pulse">
          {label}
        </span>
      )}

      <div className="w-2 h-2 rounded-full bg-gray-400 flex-shrink-0 animate-dot-pulse" />

      <div className="flex-1 h-px bg-gradient-to-r from-gray-400 to-gray-200 animate-line-flow" />
    </div>
  )
}
