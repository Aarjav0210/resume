"use client";
import React, { useState, useEffect, useRef, useCallback } from "react";
import Landing from "@/app/views/landing";
import WorkExperienceView from "@/app/views/WorkExperienceView";
import ResearchView from "@/app/views/ResearchView";
import Education from "@/app/views/education";
import ProjectsView from "@/app/views/ProjectView";
import ContactView from "@/app/views/ContactView";
import ProfileSelectView from "@/app/views/ProfileSelectView";
import MinimalResumeView from "@/app/views/MinimalResumeView";
import Sidebar from "@/app/components/sidebar";
import {
  type Persona,
  personaSectionOrder,
  sectionDisplayNames,
  isValidPersona,
} from "@/app/types/Persona";

const STORAGE_KEY = "resume_persona";
const NOBS_KEY = "resume_nobs";
const THEME_KEY = "resume_theme";

export default function Home() {
  const [currentSection, setCurrentSection] = useState("landing");
  const [persona, setPersona] = useState<Persona | null>(null);
  const [noBs, setNoBs] = useState(false);
  const [theme, setTheme] = useState<"dark" | "light">("dark");
  const [isReady, setIsReady] = useState(false);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const storedPersona = localStorage.getItem(STORAGE_KEY);
    const storedNoBs = localStorage.getItem(NOBS_KEY);
    const storedTheme = localStorage.getItem(THEME_KEY);
    
    if (storedPersona && isValidPersona(storedPersona)) {
      setPersona(storedPersona as Persona);
    }
    if (storedNoBs === "true") {
      setNoBs(true);
    }
    if (storedTheme === "light" || storedTheme === "dark") {
      setTheme(storedTheme);
      document.documentElement.classList.toggle("light", storedTheme === "light");
    }
    
    requestAnimationFrame(() => setIsReady(true));
  }, []);

  const sectionOrder = personaSectionOrder[persona || "general"];

  const navSections = sectionOrder.map((id) => ({
    id,
    displayText: sectionDisplayNames[id],
  }));

  useEffect(() => {
    const handleScroll = () => {
      const sections = document.querySelectorAll("section");
      let closestSection: string | null = null;
      let closestDistance = Infinity;

      sections.forEach((section) => {
        const rect = section.getBoundingClientRect();
        const distance = Math.abs(rect.top);
        if (distance < closestDistance) {
          closestDistance = distance;
          closestSection = section.id;
        }
      });

      if (closestSection) {
        setCurrentSection(closestSection);
      }
    };

    const scrollEl = scrollContainerRef.current;
    if (scrollEl) {
      scrollEl.addEventListener("scroll", handleScroll);
    }
    return () => {
      if (scrollEl) {
        scrollEl.removeEventListener("scroll", handleScroll);
      }
    };
  }, [persona]);

  useEffect(() => {
    if (!persona || noBs) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key !== "Enter" && e.key !== " ") return;

      const idx = sectionOrder.indexOf(currentSection);
      if (idx === -1) return;

      if (e.shiftKey) {
        e.preventDefault();
        if (idx > 0) {
          const prevId = sectionOrder[idx - 1];
          setCurrentSection(prevId);
          document.getElementById(prevId)?.scrollIntoView({ behavior: "smooth" });
        }
      } else {
        if (idx < sectionOrder.length - 1) {
          const nextId = sectionOrder[idx + 1];
          setCurrentSection(nextId);
          document.getElementById(nextId)?.scrollIntoView({ behavior: "smooth" });
        }
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [persona, noBs, currentSection, sectionOrder]);

  const handlePersonaSelect = useCallback((p: Persona, minimal: boolean) => {
    localStorage.setItem(STORAGE_KEY, p);
    localStorage.setItem(NOBS_KEY, String(minimal));
    setIsTransitioning(true);
    setTimeout(() => {
      setPersona(p);
      setNoBs(minimal);
      setIsTransitioning(false);
    }, 500);
  }, []);

  const handleToggleMinimal = useCallback(() => {
    const next = !noBs;
    localStorage.setItem(NOBS_KEY, String(next));
    setNoBs(next);
  }, [noBs]);

  const handleToggleTheme = useCallback(() => {
    const next = theme === "dark" ? "light" : "dark";
    localStorage.setItem(THEME_KEY, next);
    setTheme(next);
    document.documentElement.classList.toggle("light", next === "light");
  }, [theme]);

  const handleResetPersona = useCallback(() => {
    localStorage.removeItem(STORAGE_KEY);
    localStorage.removeItem(NOBS_KEY);
    setPersona(null);
    setNoBs(false);
    setCurrentSection("landing");
  }, []);

  function renderSection(id: string) {
    switch (id) {
      case "landing":
        return <Landing key="landing" persona={persona || "general"} onResetPersona={handleResetPersona} onToggleMinimal={handleToggleMinimal} onToggleTheme={handleToggleTheme} theme={theme} />;
      case "work-experience":
        return <WorkExperienceView key="work-experience" persona={persona || "general"} />;
      case "research":
        return <ResearchView key="research" persona={persona || "general"} />;
      case "education":
        return <Education key="education" persona={persona || "general"} />;
      case "projects":
        return <ProjectsView key="projects" persona={persona || "general"} />;
      case "contact":
        return <ContactView key="contact" persona={persona || "general"} />;
      default:
        return null;
    }
  }

  const showSelector = !persona;

  return (
    <>
      <div
        className={`fixed inset-0 z-[200] theme-bg pointer-events-none transition-opacity duration-500 ${
          isReady ? "opacity-0" : "opacity-100"
        }`}
      />

      {showSelector ? (
        <ProfileSelectView
          onSelect={handlePersonaSelect}
          isTransitioning={isTransitioning}
          theme={theme}
          onToggleTheme={handleToggleTheme}
        />
      ) : noBs ? (
        <MinimalResumeView
          persona={persona || "general"}
          onToggleMinimal={handleToggleMinimal}
          onResetPersona={handleResetPersona}
          theme={theme}
          onToggleTheme={handleToggleTheme}
        />
      ) : (
        <div
          ref={scrollContainerRef}
          className="overflow-y-scroll overflow-x-hidden snap-y snap-mandatory h-screen font-[family-name:var(--font-geist-sans)] scrollbar-hide"
        >
          <Sidebar
            currentSection={currentSection}
            setCurrentSection={setCurrentSection}
            sections={navSections}
            onResetPersona={handleResetPersona}
            onToggleMinimal={handleToggleMinimal}
            noBs={noBs}
            onClose={() => {}}
            theme={theme}
            onToggleTheme={handleToggleTheme}
            persona={persona || "general"}
          />
          {sectionOrder.map((id) => renderSection(id))}
        </div>
      )}
    </>
  );
}
