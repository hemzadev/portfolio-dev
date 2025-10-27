"use client";
import LogoLoop from "@/components/LogoLoop";

export default function TechLogoLoop() {
  const techSkills = [
    { name: "React", logo: "/skills/React.js.svg", href: "https://react.dev" },
    { name: "Next.js", logo: "/skills/Next.js.svg", href: "https://nextjs.org" },
    { name: "TypeScript", logo: "/skills/typeScript.svg", href: "https://www.typescriptlang.org" },
    { name: "Tailwind CSS", logo: "/skills/tailwindCSS.svg", href: "https://tailwindcss.com" },
    { name: "Angular", logo: "/skills/Angular.svg", href: "https://angular.io" },
    { name: "Docker", logo: "/skills/docker.svg", href: "https://docker.com" },
    { name: "GSAP", logo: "/skills/GSAP.svg", href: "https://gsap.com" },
    { name: "JavaScript", logo: "/skills/JavaScript.svg", href: "https://developer.mozilla.org/en-US/docs/Web/JavaScript" },
    { name: "PostgreSQL", logo: "/skills/postgresql.svg", href: "https://postgresql.org" },
    { name: "Node.js", logo: "/skills/Node.js.svg", href: "https://nodejs.org" },
    { name: "HTML", logo: "/skills/HTML.svg", href: "https://developer.mozilla.org/en-US/docs/Web/HTML" },
    { name: "CSS", logo: "/skills/CSS.svg", href: "https://developer.mozilla.org/en-US/docs/Web/CSS" },
    { name: "Git", logo: "/skills/GIT.svg", href: "https://git-scm.com" },
    { name: "MySQL", logo: "/skills/MySQL.svg", href: "https://mysql.com" },
  ];

  const techLogos = techSkills.map((skill) => ({
    node: (
      <a
        href={skill.href}
        target="_blank"
        rel="noopener noreferrer"
        aria-label={`Learn more about ${skill.name}`}
        className="flex items-center justify-center gap-3 px-5 py-2 bg-white dark:bg-indigo-900 rounded-full border border-gray-200 dark:border-gray-700 shadow-sm hover:shadow-md transition-all duration-300 group/item"
      >
        <img
          src={skill.logo}
          alt={skill.name}
          className="w-6 h-6 transition-transform duration-300 group-hover/item:scale-110"
        />
        <span className="text-sm font-medium text-gray-800 dark:text-gray-300">
          {skill.name}
        </span>
      </a>
    ),
    title: skill.name,
    href: skill.href,
    ariaLabel: `Learn more about ${skill.name}`,
  }));

  return (
    <div className="relative flex items-center justify-between overflow-hidden">
      <LogoLoop
        logos={techLogos}
        speed={80}
        direction="left"
        logoHeight={40}
        gap={30}
        pauseOnHover
        scaleOnHover
        ariaLabel="Technology skills"
      />
    </div>
  );
}
