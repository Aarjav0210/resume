"use client";
import React, { useEffect, useState } from "react";
import TerminalHeader from "@/app/components/TerminalHeader";
import ScrollToContinue from "@/app/components/ScrollToContinue";
import EducationCard from "@/app/components/EducationCard";
import FadingScroll from "@/app/components/FadingScroll";

type ScreenSize = 'sm' | 'md' | 'lg';

// Define static data for education entries
const educationData = [
    {
        id: 1,
        institution: "King's College London",
        timePeriod: "Sep 2020 - May 2024",
        degree: "BSc Computer Science (Artificial Intelligence) with Management and a Year Abroad",
        notes: "Graduated with First Class Honours (1:1)",
        imageSrc: "/assets/kcl-logo.jpeg",
    },
    {
        id: 2,
        institution: "University of Toronto",
        timePeriod: "Sep 2022 - Apr 2023",
        degree: "Visiting Exchange Student",
        notes: "AI & Biotechnology",
        imageSrc: "/assets/uoft-logo.jpeg",
    },
    {
        id: 3,
        institution: "Antwerp International School",
        timePeriod: "Sep 2018 - Jul 2020",
        degree: "International Baccalaureate",
        notes: "High School Valedictorian",
        imageSrc: "/assets/ais-logo.jpeg",
    },
];

export default function Education({ currentSection, setCurrentSection }: { currentSection: string; setCurrentSection: (section: string) => void }) {
    
  const [screenSize, setScreenSize] = useState<ScreenSize>('lg');

  useEffect(() => {
    const handleResize = () => {
      const width = window.innerWidth;
      if (width < 768) {
        setScreenSize('sm');
      } else if (width >= 768 && width < 1024) {
        setScreenSize('md');
      } else {
        setScreenSize('lg');
      }
    };
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
        if (e.key === "Enter" && currentSection === 'education') {
        // Update the current section to 'education'
        setCurrentSection('projects'); // Set the next section directly
        
        // Scroll to the next section
        const nextSection = document.getElementById('projects');
        if (nextSection) {
          nextSection.scrollIntoView({ behavior: "smooth" });
        }
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [currentSection, setCurrentSection]);
    
    return (
        <section id="education" className="snap-start h-screen grid grid-rows-[120px_1fr_120px]">
            <div className="flex flex-col row-start-1 gap-[32px] items-start justify-center px-12 py-20 sm:p-20 w-full">
                <TerminalHeader username="aarjav_jain" text="ls education" />
            </div>

            {/* Unconditionally use FadingScroll with Grid layout inside (like WorkExperienceView) */}
            <FadingScroll 
                className="row-start-2 rounded-[20px] mx-12 sm:mx-20 my-9" 
                fadeHeight={50} 
                backgroundColor="#1E1E1E" // Match card background
            >
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
                    {educationData.map((entry) => {
                        const layoutToPass = screenSize === 'md' ? 'horizontal' : 'vertical';
                        return (
                            <EducationCard key={entry.id} {...entry} layout={layoutToPass} />
                        );
                    })}
                </div>
            </FadingScroll>
            
            <div className="row-start-3 justify-center mt-4">
                <ScrollToContinue beforeText="Scroll or press " keyPressIconText="Enter" afterText=" to continue"/>
            </div>
        </section>
    );
}