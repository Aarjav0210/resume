"use client";
import React, { useEffect } from "react";
import TerminalHeader from "@/app/components/TerminalHeader";
import Typewriter from "@/app/components/Typewriter";
import ScrollToContinue from "@/app/components/ScrollToContinue";
import { MdOutlineFileDownload } from 'react-icons/md';
import DarkVeil from "@/components/DarkVeil";

export default function Landing({ currentSection, setCurrentSection }: { currentSection: string; setCurrentSection: (section: string) => void }) {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Enter" && currentSection === 'landing') {
        // Update the current section to 'work-experience'
        setCurrentSection('work-experience'); // Set the next section directly

        // Scroll to the next section
        const nextSection = document.getElementById('work-experience');
        if (nextSection) {
          nextSection.scrollIntoView({ behavior: "smooth" });
        }
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [currentSection, setCurrentSection]);

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
          <Typewriter
            text={["M.S. Computer Science @ Brown University", "Research Assistant @ Singh Lab", "Ex-SWE @ Deutsche Bank AG"]}
            speed={50}
            mode="loop"
            startDelay={2500}
            eraseDelay={3000}
            eraseSpeed={10} 
          />
        </div>
        <div className="row-start-3 flex justify-center items-center relative z-10">
          <ScrollToContinue beforeText="Scroll or press " keyPressIconText="Enter" afterText=" to continue" />
          
          {/* CV Download Link - Bottom Right */}
          <div className="absolute right-[50px] top-10">
            <a 
              href="/assets/Aarjav_Jain_CV.pdf" 
              download
              className="text-base font-mono cursor-pointer flex items-center gap-1 group"
              aria-label="Download CV"
            >
              {/* Icon for mobile */}
              <MdOutlineFileDownload className="md:hidden text-[#4CF0E8] group-hover:text-[#84EF12] transition-colors duration-300 text-xl" />
              
              {/* Text for desktop */}
              <span className="hidden md:inline text-white group-hover:text-[#84EF12] transition-colors duration-300">download_cv </span>
              <span className="hidden md:inline text-[#84EF12]">&lt;</span>
            </a>
          </div>
        </div>
      </section>
    </>
  );
}
