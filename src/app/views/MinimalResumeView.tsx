"use client";
import React, { useState, useEffect, useRef } from "react";
import Image from "next/image";
import { fetchWorkEntries } from "@/app/lib/workEntryParser";
import { fetchResearchEntries } from "@/app/lib/researchEntryParser";
import { fetchProjectEntries } from "@/app/lib/projectEntryParser";
import type { WorkEntry } from "@/app/types/WorkEntry";
import type { ResearchEntry } from "@/app/types/ResearchEntry";
import type { ProjectEntry } from "@/app/types/ProjectEntry";
import type Description from "@/app/types/Description";
import type Skill from "@/app/types/Skill";
import {
  type Persona,
  personaSectionOrder,
  personaOptions,
  personaTypewriterText,
  sectionDisplayNames,
} from "@/app/types/Persona";
import profilePhoto from "/public/assets/aarjav-profile-photo.jpg";

const educationData = [
  {
    id: 1,
    institution: "Brown University",
    timePeriod: "Aug '25 – Present",
    degree: "M.S. Computer Science",
    notes: "Research Assistant @ Singh Lab (Deep Learning in Genomics)",
    logo: "/assets/brown-icon.png",
    logoBg: "#ffffff",
  },
  {
    id: 2,
    institution: "King's College London",
    timePeriod: "Sep '20 – May '24",
    degree: "BSc Computer Science (Artificial Intelligence) with Management and a Year Abroad",
    notes: "Graduated with First Class Honours (1:1)",
    logo: "/assets/kings-icon.png",
    logoBg: "#cc0000",
  },
  {
    id: 3,
    institution: "University of Toronto",
    timePeriod: "Sep '22 – Apr '23",
    degree: "Visiting Exchange Student",
    notes: "AI & Biotechnology",
    logo: "/assets/uoft-icon.png",
    logoBg: "#ffffff",
  },
];

const educationDataResearcher = [
  {
    id: 1,
    institution: "Brown University",
    timePeriod: "Aug '25 – Present",
    degree: "MSc Computer Science (AI + Computational Biology Track)",
    notes: "GTA – Data Structures, Algorithms & Intractability · Deep Learning in Genomics, Statistical Methods for High-Dimensional Genomics",
    logo: "/assets/brown-icon.png",
    logoBg: "#ffffff",
  },
  {
    id: 2,
    institution: "King's College London",
    timePeriod: "Sep '20 – May '24",
    degree: "BSc Computer Science (Artificial Intelligence) with Management and a Year Abroad",
    notes: "First Class Honours · Study Abroad: AI + Biotechnology @ University of Toronto",
    logo: "/assets/kings-icon.png",
    logoBg: "#cc0000",
  },
  {
    id: 3,
    institution: "University of Toronto",
    timePeriod: "Sep '22 – Apr '23",
    degree: "Visiting Exchange Student",
    notes: "AI & Biotechnology",
    logo: "/assets/uoft-icon.png",
    logoBg: "#ffffff",
  },
];

/* ─── Description rendering helpers ─── */

function DescriptionBlock({ parts }: { parts: Description[] }) {
  const fullText = parts.map((p) => p.content).join("");
  const hasBullets = fullText.includes("•");

  if (hasBullets) {
    const bullets = fullText
      .split("•")
      .map((s) => s.trim())
      .filter(Boolean);

    return (
      <ul className="list-disc list-outside ml-4 space-y-1.5 text-sm text-gray-300 leading-relaxed">
        {bullets.map((bullet, bi) => (
          <li key={bi}>{renderWithKeywords(bullet, parts)}</li>
        ))}
      </ul>
    );
  }

  const paragraphs = fullText
    .split(/\n\s*\n/)
    .map((s) => s.trim())
    .filter(Boolean);

  return (
    <div className="space-y-2 text-sm text-gray-300 leading-relaxed">
      {paragraphs.map((para, pi) => (
        <p key={pi}>{renderWithKeywords(para, parts)}</p>
      ))}
    </div>
  );
}

function renderWithKeywords(text: string, allParts: Description[]) {
  const keywords = allParts.filter((p) => p.type === "keyword").map((p) => p.content);
  if (keywords.length === 0) return text;

  const escaped = keywords.map((k) => k.replace(/[.*+?^${}()|[\]\\]/g, "\\$&"));
  const pattern = new RegExp(`(${escaped.join("|")})`, "g");
  const segments = text.split(pattern);

  return segments.map((seg, i) =>
    keywords.includes(seg) ? (
      <span key={i} className="text-[var(--color-cyan)]">
        {seg}
      </span>
    ) : (
      <span key={i}>{seg}</span>
    )
  );
}

function SkillTags({ skills }: { skills?: Skill[] }) {
  if (!skills || skills.length === 0) return null;
  return (
    <div className="flex flex-wrap gap-1.5 mt-2">
      {skills.map((s, i) => (
        <span
          key={i}
          className="text-[10px] px-2 py-0.5 rounded-full"
          style={{ backgroundColor: s.bgColor, color: s.textColor }}
        >
          {s.text}
        </span>
      ))}
    </div>
  );
}

function SectionHeading({ text, id }: { text: string; id: string }) {
  return (
    <h2 id={id} className="font-mono text-lg theme-fg mb-6 scroll-mt-12">
      <span className="opacity-50">(aarjav_jain)</span>{" "}
      <span style={{ color: "var(--color-cyan)" }}>-&gt;</span>{" "}
      <span style={{ color: "var(--color-green)" }}>~</span> {text}
    </h2>
  );
}

function Divider() {
  return <hr className="border-white/[0.06] my-10" />;
}

/* ─── Demo modal (video or image slideshow) ─── */

type DemoModalProps = {
  title: string;
  onClose: () => void;
} & ({ type: "video"; url: string } | { type: "images"; urls: string[] });

function DemoModal(props: DemoModalProps) {
  const { title, onClose } = props;
  const [imgIdx, setImgIdx] = useState(0);

  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      if (props.type === "images") {
        if (e.key === "ArrowRight") setImgIdx((i) => Math.min(i + 1, props.urls.length - 1));
        if (e.key === "ArrowLeft") setImgIdx((i) => Math.max(i - 1, 0));
      }
    };
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [onClose, props]);

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm"
      onClick={onClose}
    >
      <div
        className="relative w-[90vw] max-w-3xl bg-black rounded-lg overflow-hidden border border-white/10 shadow-[0_20px_60px_rgba(0,0,0,0.8)]"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between px-3 py-2 border-b border-white/10">
          <p className="text-xs font-mono text-white/40 truncate max-w-[70%]">{title}</p>
          <button
            onClick={onClose}
            className="text-xs font-mono text-white/50 hover:text-white transition-colors cursor-pointer"
          >
            [esc] close
          </button>
        </div>

        {props.type === "video" ? (
          <div className="aspect-video">
            <video src={props.url} controls autoPlay className="w-full h-full object-contain">
              <track kind="captions" />
            </video>
          </div>
        ) : (
          <div className="relative">
            <div className="aspect-video flex items-center justify-center bg-black">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={props.urls[imgIdx]}
                alt={`${title} screenshot ${imgIdx + 1}`}
                className="max-w-full max-h-full object-contain"
              />
            </div>
            {props.urls.length > 1 && (
              <div className="flex items-center justify-center gap-4 py-2 border-t border-white/10">
                <button
                  onClick={() => setImgIdx((i) => Math.max(i - 1, 0))}
                  disabled={imgIdx === 0}
                  className="text-xs font-mono text-white/50 hover:text-white disabled:text-white/15 transition-colors cursor-pointer disabled:cursor-default"
                >
                  &lt; prev
                </button>
                <span className="text-xs font-mono text-white/30">
                  {imgIdx + 1} / {props.urls.length}
                </span>
                <button
                  onClick={() => setImgIdx((i) => Math.min(i + 1, props.urls.length - 1))}
                  disabled={imgIdx === props.urls.length - 1}
                  className="text-xs font-mono text-white/50 hover:text-white disabled:text-white/15 transition-colors cursor-pointer disabled:cursor-default"
                >
                  next &gt;
                </button>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

/* ─── Sticky sidebar for minimal view ─── */

function MinimalSidebar({
  sections,
  activeSection,
  cvHref,
}: {
  sections: { id: string; label: string }[];
  activeSection: string;
  cvHref: string;
}) {
  const handleClick = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <nav className="hidden lg:flex fixed left-0 top-0 h-screen w-44 flex-col justify-center pl-6 z-40">
      <div className="space-y-1">
        {sections.map((s) => {
          const isActive = s.id === activeSection;
          return (
            <button
              key={s.id}
              onClick={() => handleClick(s.id)}
              className={`block w-full text-left font-mono text-xs py-1.5 transition-all duration-200 cursor-pointer ${
                isActive
                  ? "text-[var(--color-cyan)] translate-x-1"
                  : "text-white/25 hover:text-white/50"
              }`}
            >
              {isActive && <span className="text-[var(--color-green)] mr-1">&gt;</span>}
              {s.label}
            </button>
          );
        })}
        <a
          href={cvHref}
          download
          className="block w-full text-left font-mono text-xs py-1.5 transition-all duration-200 opacity-25 hover:opacity-100 hover:text-[var(--color-green)] mt-4 theme-fg"
        >
          download_cv
        </a>
      </div>
    </nav>
  );
}

/* ─── Main view ─── */

interface MinimalResumeViewProps {
  persona: Persona;
  onToggleMinimal: () => void;
  onResetPersona: () => void;
  theme: "dark" | "light";
  onToggleTheme: () => void;
}

export default function MinimalResumeView({ persona, onToggleMinimal, onResetPersona, theme, onToggleTheme }: MinimalResumeViewProps) {
  const [workEntries, setWorkEntries] = useState<WorkEntry[]>([]);
  const [researchEntries, setResearchEntries] = useState<ResearchEntry[]>([]);
  const [projectEntries, setProjectEntries] = useState<ProjectEntry[]>([]);
  const [activeSection, setActiveSection] = useState("minimal-header");
  const [demo, setDemo] = useState<DemoModalProps | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    fetchWorkEntries(persona).then(setWorkEntries);
    fetchResearchEntries(persona).then(setResearchEntries);
    fetchProjectEntries(persona).then(setProjectEntries);
  }, [persona]);

  const personaLabel = personaOptions.find((p) => p.id === persona)?.label ?? persona;
  const roles = personaTypewriterText[persona];
  const sectionOrder = personaSectionOrder[persona];

  const sidebarSections = [
    { id: "minimal-header", label: "whoami" },
    ...sectionOrder
      .filter((id) => id !== "landing")
      .map((id) => ({ id: `minimal-${id}`, label: sectionDisplayNames[id] })),
  ];

  useEffect(() => {
    const sectionIds = sidebarSections.map((s) => s.id);
    const threshold = window.innerHeight * 0.3;

    const updateActive = () => {
      let current = sectionIds[0];
      for (const id of sectionIds) {
        const el = document.getElementById(id);
        if (el && el.getBoundingClientRect().top <= threshold) {
          current = id;
        }
      }
      setActiveSection(current);
    };

    updateActive();
    window.addEventListener("scroll", updateActive, { passive: true });
    return () => window.removeEventListener("scroll", updateActive);
  }, [sidebarSections]);

  function renderSection(id: string) {
    switch (id) {
      case "landing":
        return null;
      case "work-experience":
        return (
          <div key="work-experience" id="minimal-work-experience">
            <SectionHeading text="ls work_experience" id="minimal-work-experience-heading" />
            <div className="space-y-6">
              {workEntries.map((entry) => (
                <div key={entry.id} className="border-l border-white/10 pl-5">
                  <div className="flex flex-wrap items-baseline gap-x-3 gap-y-0.5">
                    <h3 className="text-sm font-semibold text-white">{entry.company}</h3>
                    <span className="text-xs text-[var(--color-green)]">{entry.role}</span>
                  </div>
                  <p className="text-xs text-gray-500 mt-0.5">{entry.timePeriod}</p>
                  {entry.description.length > 0 && (
                    <div className="mt-2">
                      <DescriptionBlock parts={entry.description} />
                    </div>
                  )}
                  <SkillTags skills={entry.skills} />
                </div>
              ))}
            </div>
            <Divider />
          </div>
        );
      case "research":
        return (
          <div key="research" id="minimal-research">
            <SectionHeading text="ls research" id="minimal-research-heading" />
            <div className="space-y-6">
              {researchEntries.map((entry) => (
                <div key={entry.id} className="border-l border-white/10 pl-5">
                  <div className="flex flex-wrap items-baseline gap-x-3 gap-y-0.5">
                    <h3 className="text-sm font-semibold text-white">{entry.lab}</h3>
                    <span className="text-xs text-[var(--color-green)]">{entry.role}</span>
                  </div>
                  <p className="text-xs text-gray-500 mt-0.5">
                    {entry.timePeriod} &middot; {entry.location}
                  </p>
                  {entry.description.length > 0 && (
                    <div className="mt-2">
                      <DescriptionBlock parts={entry.description} />
                    </div>
                  )}
                  <SkillTags skills={entry.skills} />
                </div>
              ))}
            </div>
            <Divider />
          </div>
        );
      case "education":
        return (
          <div key="education" id="minimal-education">
            <SectionHeading text="ls education" id="minimal-education-heading" />
            <div className="space-y-5">
              {(persona === "researcher" ? educationDataResearcher : educationData).map((entry) => (
                <div key={entry.id} className="border-l border-white/10 pl-5 flex items-start gap-4">
                  <div
                    className="shrink-0 w-10 h-10 rounded-md overflow-hidden mt-0.5"
                    style={{ backgroundColor: entry.logoBg }}
                  >
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={entry.logo}
                      alt={`${entry.institution} logo`}
                      className="w-full h-full object-contain"
                    />
                  </div>
                  <div>
                    <h3 className="text-sm font-semibold text-white">{entry.institution}</h3>
                    <p className="text-xs text-gray-400 mt-0.5">{entry.degree}</p>
                    <p className="text-xs text-gray-500 mt-0.5">
                      {entry.timePeriod} &middot; {entry.notes}
                    </p>
                  </div>
                </div>
              ))}
            </div>
            <Divider />
          </div>
        );
      case "projects":
        return (
          <div key="projects" id="minimal-projects">
            <SectionHeading text="ls projects" id="minimal-projects-heading" />
            <div className="space-y-6">
              {projectEntries.map((entry) => (
                <div key={entry.id} className="border-l border-white/10 pl-5">
                  <div className="flex flex-wrap items-baseline gap-x-3 gap-y-1">
                    <h3 className="text-sm font-semibold text-white">{entry.title}</h3>
                    {entry.demoVideo && (
                      <button
                        onClick={() => setDemo({ type: "video", url: entry.demoVideo!, title: entry.title, onClose: () => setDemo(null) })}
                        className="text-[10px] font-mono text-[var(--color-green)]/70 hover:text-[var(--color-green)] transition-colors cursor-pointer"
                      >
                        [watch demo]
                      </button>
                    )}
                    {entry.demoImages && entry.demoImages.length > 0 && !entry.demoVideo && (
                      <button
                        onClick={() => setDemo({ type: "images", urls: entry.demoImages!, title: entry.title, onClose: () => setDemo(null) })}
                        className="text-[10px] font-mono text-[var(--color-green)]/70 hover:text-[var(--color-green)] transition-colors cursor-pointer"
                      >
                        [view demo]
                      </button>
                    )}
                  </div>
                  {entry.description.length > 0 && (
                    <div className="mt-1.5">
                      <DescriptionBlock parts={entry.description} />
                    </div>
                  )}
                  <SkillTags skills={entry.skills} />
                </div>
              ))}
            </div>
            <Divider />
          </div>
        );
      case "contact":
        return (
          <div key="contact" id="minimal-contact">
            <SectionHeading text="cat contact" id="minimal-contact-heading" />
            <div className="flex flex-wrap gap-x-6 gap-y-2 text-sm">
              <a href="mailto:aarjav02@gmail.com" className="text-[var(--color-cyan)] hover:underline">
                aarjav02@gmail.com
              </a>
              <a
                href="https://www.linkedin.com/in/aarjav-jain/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-[var(--color-cyan)] hover:underline"
              >
                linkedin.com/in/aarjav-jain
              </a>
              <a href={persona === "researcher" ? "/assets/Aarjav_Jain_CV_Research.pdf" : "/assets/Aarjav_Jain_CV.pdf"} download className="text-[var(--color-green)] hover:underline">
                download_cv
              </a>
            </div>
          </div>
        );
      default:
        return null;
    }
  }

  return (
    <div ref={containerRef} className="min-h-screen theme-bg theme-fg font-[family-name:var(--font-geist-sans)]">
      <MinimalSidebar sections={sidebarSections} activeSection={activeSection} cvHref={persona === "researcher" ? "/assets/Aarjav_Jain_CV_Research.pdf" : "/assets/Aarjav_Jain_CV.pdf"} />

      <div className="max-w-4xl mx-auto px-8 py-16 lg:ml-48">
        {/* Header with avatar */}
        <div id="minimal-header" className="scroll-mt-12">
          <div className="grid grid-cols-1 md:grid-cols-[1fr_auto] gap-8 items-center mb-4">
            <div>
              <h1 className="font-mono text-2xl md:text-3xl text-white mb-4">
                <span className="text-white/50">(aarjav_jain)</span>{" "}
                <span className="text-[var(--color-cyan)]">-&gt;</span>{" "}
                <span className="text-[var(--color-green)]">~</span> whoami
              </h1>

              <div className="flex flex-wrap items-center gap-x-4 gap-y-1 mb-2 font-mono text-xs text-white/40">
                <button onClick={onResetPersona} className="hover:text-white/70 transition-colors cursor-pointer group">
                  <span>viewing as: </span>
                  <span className="text-[var(--color-cyan)]/60 group-hover:text-[var(--color-cyan)]">{personaLabel}</span>
                  <span className="text-white/20 group-hover:text-[var(--color-green)]"> [switch]</span>
                </button>
                <button onClick={onToggleMinimal} className="hover:text-white/70 transition-colors cursor-pointer group">
                  <span className="text-white/20 group-hover:text-[var(--color-green)]">[animated]</span>
                </button>
                <button onClick={onToggleTheme} className="hover:text-white/70 transition-colors cursor-pointer group">
                  <span className="text-white/20 group-hover:text-[var(--color-green)]">[{theme === "dark" ? "☀ light" : "🌙 dark"}]</span>
                </button>
              </div>

              <div className="text-sm text-gray-400 space-y-0.5">
                {roles.map((role) => (
                  <p key={role}>{role}</p>
                ))}
              </div>
            </div>

            <div className="shrink-0 w-36 h-36 md:w-44 md:h-44 rounded-full overflow-hidden border-2 border-white/10 justify-self-center md:justify-self-end md:mr-12">
              <Image
                src={profilePhoto}
                alt="Aarjav Jain"
                width={400}
                height={400}
                quality={90}
                className="w-full h-full object-cover"
                priority
              />
            </div>
          </div>

          <Divider />
        </div>

        {/* Sections in persona order */}
        {sectionOrder.map((id) => renderSection(id))}
      </div>

      {demo && <DemoModal {...demo} />}
    </div>
  );
}
