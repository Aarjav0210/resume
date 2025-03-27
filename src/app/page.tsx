"use client";
import React, { useState, useEffect } from "react";
import Landing from "@/app/views/landing";
import WorkExperience from "@/app/views/work-experience";
import Education from "@/app/views/education";
import Sidebar from "@/app/components/sidebar";

export default function Home() {
  const [currentSection, setCurrentSection] = useState('landing'); // Initial section

  useEffect(() => {
    const handleScroll = () => {
      const sections = document.querySelectorAll("section");
      let closestSection = null;
      let closestDistance = Infinity;

      sections.forEach(section => {
        const rect = section.getBoundingClientRect();
        const distance = Math.abs(rect.top); // Distance from the top of the viewport

        if (distance < closestDistance) {
          closestDistance = distance;
          closestSection = section.id; // Get the ID of the closest section
        }
      });

      if (closestSection) {
        setCurrentSection(closestSection); // Update the current section based on scroll position
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <div className="overflow-y-scroll snap-y snap-mandatory h-screen font-[family-name:var(--font-geist-sans)]">
      <Sidebar currentSection={currentSection} setCurrentSection={setCurrentSection} onClose={() => { /* close logic */ }} />
      <Landing currentSection={currentSection} setCurrentSection={setCurrentSection} />
      <WorkExperience />
      <Education />
    </div>
  );
}