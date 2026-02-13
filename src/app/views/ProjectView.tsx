'use client';
import React, { useState, useEffect } from 'react';
import TerminalHeader from '@/app/components/TerminalHeader';
import FadingScroll from '@/app/components/FadingScroll';
import ProjectCard from '@/app/components/ProjectCard';
import ProjectModal from '@/app/components/ProjectModal';
import ScrollToContinue from '@/app/components/ScrollToContinue';
import { fetchProjectEntries } from '@/app/lib/projectEntryParser';
import type { ProjectEntry } from '@/app/types/ProjectEntry';

export default function ProjectView({ currentSection, setCurrentSection }: { currentSection: string; setCurrentSection: (section: string) => void }) {
  const [entries, setEntries] = useState<ProjectEntry[]>([]);
  const [selectedId, setSelectedId] = useState<number>(-1);

  useEffect(() => { fetchProjectEntries().then(setEntries) }, []);

  const selected = entries.find((e) => e.id === selectedId);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.key === "Enter" || e.key === " ") && !e.shiftKey && currentSection === 'projects') {
        setCurrentSection('contact');

        const nextSection = document.getElementById('contact');
        if (nextSection) {
          nextSection.scrollIntoView({ behavior: "smooth" });
        }
      }
      // Easter egg: Shift+Enter or Shift+Space to go back
      if ((e.key === "Enter" || e.key === " ") && e.shiftKey && currentSection === 'projects') {
        e.preventDefault();
        setCurrentSection('education');

        const prevSection = document.getElementById('education');
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
        id="projects" 
        className="snap-start h-screen grid grid-rows-[120px_1fr_60px] sm:grid-rows-[120px_1fr_120px] [@media(max-height:500px)]:grid-rows-[120px_1fr_60px]"
    >
      <div className="flex row-start-1 items-center px-12 py-20 sm:p-20">
        <TerminalHeader username="aarjav_jain" text="ls projects"/>
      </div>
      <FadingScroll className="row-start-2 mx-12 sm:mx-20 my-4 rounded-[20px]" fadeHeight={50}>
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
          {entries.map((e) => (
            <ProjectCard key={e.id} {...e} disabled={selectedId !== -1} onSelect={setSelectedId} />
          ))}
        </div>
      </FadingScroll>
      <div className="row-start-3 flex justify-center items-center mt-4">
        <ScrollToContinue beforeText="Scroll or press " keyPressIconText="Enter" afterText=" to continue" />
      </div>
      {selected && <ProjectModal entry={selected} onClose={() => setSelectedId(-1)} />}
    </section>
  )
};