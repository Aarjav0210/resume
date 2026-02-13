"use client";
import React, { useEffect } from "react";
import TerminalHeader from "@/app/components/TerminalHeader";
import ScrollToContinue from "@/app/components/ScrollToContinue";
import EducationCard from "@/app/components/EducationCard";

// Define static data for education entries
const educationData = [
    {
        id: 1,
        institution: "Brown University",
        timePeriod: "Aug '25 – Present",
        degree: "M.S. Computer Science",
        notes: "Research Assistant @ Singh Lab (Deep Learning in Genomics)",
        imageSrc: "/assets/brown-logo.jpeg",
    },
    {
        id: 2,
        institution: "King's College London",
        timePeriod: "Sep '20 – May '24",
        degree: "BSc Computer Science (Artificial Intelligence) with Management and a Year Abroad",
        notes: "Graduated with First Class Honours (1:1)",
        imageSrc: "/assets/kcl-logo.jpeg",
    },
    {
        id: 3,
        institution: "University of Toronto",
        timePeriod: "Sep '22 – Apr '23",
        degree: "Visiting Exchange Student",
        notes: "AI & Biotechnology",
        imageSrc: "/assets/uoft-logo.jpeg",
    },
];

export default function Education({ currentSection, setCurrentSection }: { currentSection: string; setCurrentSection: (section: string) => void }) {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.key === "Enter" || e.key === " ") && !e.shiftKey && currentSection === 'education') {
        setCurrentSection('projects');

        const nextSection = document.getElementById('projects');
        if (nextSection) {
          nextSection.scrollIntoView({ behavior: "smooth" });
        }
      }
      // Easter egg: Shift+Enter or Shift+Space to go back
      if ((e.key === "Enter" || e.key === " ") && e.shiftKey && currentSection === 'education') {
        e.preventDefault();
        setCurrentSection('research');

        const prevSection = document.getElementById('research');
        if (prevSection) {
          prevSection.scrollIntoView({ behavior: "smooth" });
        }
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [currentSection, setCurrentSection]);
    
    return (
        <section 
            id="education" 
            className="snap-start h-screen grid grid-rows-[120px_1fr_60px] sm:grid-rows-[120px_1fr_120px] [@media(max-height:500px)]:grid-rows-[120px_1fr_60px]"
        >
            <div className="flex flex-col row-start-1 gap-8 items-start justify-center px-12 py-20 sm:p-20 w-full">
                <TerminalHeader username="aarjav_jain" text="ls education" />
            </div>

            <div className="row-start-2 mx-12 sm:mx-20 my-4">
                <div className="grid grid-cols-1 mdlg:grid-cols-2 xl:grid-cols-3 gap-4 pt-4 pb-6">
                    {educationData.map((entry) => (
                        <EducationCard key={entry.id} {...entry} />
                    ))}
                </div>
            </div>
            
            <div className="row-start-3 justify-center mt-4">
                <ScrollToContinue beforeText="Scroll or press " keyPressIconText="Enter" afterText=" to continue"/>
            </div>
        </section>
    );
}