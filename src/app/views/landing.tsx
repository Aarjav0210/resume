"use client";
import React from "react";
import TerminalHeader from "@/app/components/TerminalHeader";
import Typewriter from "@/app/components/Typewriter";
import ScrollToContinue from "@/app/components/ScrollToContinue";
import { MdOutlineFileDownload } from 'react-icons/md';
import DarkVeil from "@/components/DarkVeil";
import { type Persona, personaTypewriterText, personaOptions } from "@/app/types/Persona";

export default function Landing({ persona, onResetPersona, onToggleMinimal, onToggleTheme, theme }: { persona: Persona; onResetPersona: () => void; onToggleMinimal: () => void; onToggleTheme: () => void; theme: "dark" | "light" }) {
  const personaLabel = personaOptions.find((p) => p.id === persona)?.label ?? persona;
  return (
    <>
      <section id="landing" className="snap-start h-screen grid grid-rows-[20px_1fr_120px] gap-[32px] relative isolate">
        <div className="landing-darkveil" aria-hidden="true">
          <DarkVeil
            hueShift={50}
            noiseIntensity={0}
            scanlineIntensity={0}
            speed={0.85}
            scanlineFrequency={0}
            warpAmount={0}
          />
        </div>
        <div className="flex flex-col row-start-2 gap-[32px] items-start justify-center p-8 sm:p-20 w-full relative z-10">
          <TerminalHeader username="aarjav_jain" text="whoami" className="text-4xl md:text-5xl lg:text-6xl"/>
          <div className="flex items-center gap-4 flex-wrap">
            <button
              onClick={onResetPersona}
              className="font-mono text-xs text-white/30 hover:text-white/60 transition-colors duration-300 cursor-pointer group flex items-center gap-1.5"
            >
              <span>viewing as:</span>
              <span className="text-[var(--color-cyan)]/50 group-hover:text-[var(--color-cyan)] transition-colors duration-300">{personaLabel}</span>
              <span className="text-white/20 group-hover:text-[var(--color-green)] transition-colors duration-300">[switch]</span>
            </button>
            <button
              onClick={onToggleMinimal}
              className="font-mono text-xs text-white/20 hover:text-white/60 transition-colors duration-300 cursor-pointer group"
            >
              <span className="group-hover:text-[var(--color-green)]">[minimal]</span>
            </button>
            <button
              onClick={onToggleTheme}
              className="font-mono text-xs text-white/20 hover:text-white/60 transition-colors duration-300 cursor-pointer group"
            >
              <span className="group-hover:text-[var(--color-green)]">[{theme === "dark" ? "☀ light" : "🌙 dark"}]</span>
            </button>
          </div>
          <Typewriter
            text={personaTypewriterText[persona]}
            speed={50}
            mode="loop"
            startDelay={2500}
            eraseDelay={3000}
            eraseSpeed={10} 
          />
        </div>
        <div className="row-start-3 flex justify-center items-center relative z-10">
          <ScrollToContinue beforeText="Scroll or press " keyPressIconText="Enter" afterText=" to continue" />
          
          <div className="absolute right-[50px] top-10">
            <a 
              href={persona === "researcher" ? "/assets/Aarjav_Jain_CV_Research.pdf" : "/assets/Aarjav_Jain_CV.pdf"} 
              download
              className="text-base font-mono cursor-pointer flex items-center gap-1 group"
              aria-label="Download CV"
            >
              <MdOutlineFileDownload className="md:hidden text-[var(--color-cyan)] group-hover:text-[var(--color-green)] transition-colors duration-300 text-xl" />
              <span className="hidden md:inline text-white group-hover:text-[var(--color-green)] transition-colors duration-300">download_cv </span>
              <span className="hidden md:inline text-[var(--color-green)]">&lt;</span>
            </a>
          </div>
        </div>
      </section>
    </>
  );
}
