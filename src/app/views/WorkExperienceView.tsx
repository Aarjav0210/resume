'use client';
import React, { useState, useEffect } from 'react';
import { fetchWorkEntries } from '@/app/lib/workEntryParser';
import TerminalHeader from '@/app/components/TerminalHeader';
import WorkExperienceCard from '@/app/components/WorkExperienceCard';
import WorkExperienceModal from '@/app/components/WorkExperienceModal';
import ScrollToContinue from '@/app/components/ScrollToContinue';
import FadingScroll from '@/app/components/FadingScroll';
import type { WorkEntry } from '@/app/types/WorkEntry';

export default function WorkExperienceView({ currentSection, setCurrentSection }: { currentSection: string; setCurrentSection: (section: string) => void }) {
  const [entries, setEntries] = useState<WorkEntry[]>([]);
  const [isSelected, setIsSelected] = useState<number>(-1);

  useEffect(() => {
    fetchWorkEntries().then(setEntries);
  }, []);

  const selectedEntry = entries.find((e) => e.id === isSelected);


  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Enter" && currentSection === 'work-experience') {
        // Update the current section to 'education'
        setCurrentSection('education'); // Set the next section directly

        // Scroll to the next section
        const nextSection = document.getElementById('education');
        if (nextSection) {
          nextSection.scrollIntoView({ behavior: "smooth" });
        }
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [currentSection, setCurrentSection]);



  return (
    <section id="work-experience" className="snap-start h-screen grid grid-rows-[120px_1fr_120px]">
      {/* Header */}
      <div className="flex flex-col row-start-1 gap-8 items-start justify-center p-8 sm:p-20 w-full">
        <TerminalHeader
          username="aarjav_jain"
          text="ls work_experience"
          textSize={{ lg: 'text-4xl', md: 'text-3xl', sm: 'text-2xl' }}
        />
      </div>

      {/* Scrollable cards with fades */}
      <FadingScroll className="row-start-2 rounded-[20px] mx-20 my-9" fadeHeight={50} backgroundColor="#171717">
        <div className="grid grid-cols-1 mdlg:grid-cols-2 xl:grid-cols-3 gap-4">
          {entries.map((entry) => (
            <WorkExperienceCard
              key={entry.id}
              {...entry}
              disabled={isSelected !== -1}
              onSelect={setIsSelected}
            />
          ))}
        </div>
      </FadingScroll>

      {/* Continue prompt */}
      <div className="row-start-3 justify-center mt-4">
        <ScrollToContinue beforeText="Scroll or press " keyPressIconText="Enter" afterText=" to continue" />
      </div>

      {/* WorkExperienceModal */}
      {selectedEntry && (
        <WorkExperienceModal
          entry={selectedEntry}
          onClose={() => setIsSelected(-1)}
        />
      )}
    </section>
  )
};