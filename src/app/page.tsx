"use client";
import React, { useState, useEffect, useRef } from "react";
import Landing from "@/app/views/landing";
import WorkExperience from "@/app/views/work-experience";
import Education from "@/app/views/education";
import Sidebar from "@/app/components/sidebar";

export default function Home() {
  const [currentSection, setCurrentSection] = useState("landing"); // Initial section
  const scrollContainerRef = useRef<HTMLDivElement>(null);

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
          closestSection = section.id; // Get the ID of the closest section
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
  }, []);

  return (
    <div ref={scrollContainerRef} className="overflow-y-scroll snap-y snap-mandatory h-screen font-[family-name:var(--font-geist-sans)]" >
      <Sidebar currentSection={currentSection} setCurrentSection={setCurrentSection} onClose={() => {}} />
      <Landing currentSection={currentSection} setCurrentSection={setCurrentSection} />
      <WorkExperience />
      <Education />
    </div>
  );
}
