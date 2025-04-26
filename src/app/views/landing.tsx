"use client";
import React, { useEffect } from "react";
import TerminalHeader from "@/app/components/TerminalHeader";
import Typewriter from "@/app/components/Typewriter";
import ScrollToContinue from "@/app/components/ScrollToContinue";

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
      <section id="landing" className="snap-start h-screen grid grid-rows-[20px_1fr_120px] gap-[32px]">
        <div className="flex flex-col row-start-2 gap-[32px] items-start justify-center p-8 sm:p-20 w-full">
          <TerminalHeader username="aarjav_jain" text="whoami" className="text-4xl"/>
          <Typewriter
            text={"Computer Science (Artificial Intelligence) w/ Management @ King's College London"}
            speed={50}
            mode="loop"
            startDelay={2500}
            eraseDelay={3000}
            eraseSpeed={10} 
          />
        </div>
        <div className="row-start-3 justify-center">
          <ScrollToContinue beforeText="Scroll or press " keyPressIconText="Enter" afterText=" to continue" />
        </div>
      </section>
    </>
  );
}
