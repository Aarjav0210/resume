'use client';
import React, { useState, useEffect } from 'react';
import { fetchResearchEntries } from '@/app/lib/researchEntryParser';
import TerminalHeader from '@/app/components/TerminalHeader';
import ResearchCard from '@/app/components/ResearchCard';
import ResearchModal from '@/app/components/ResearchModal';
import ScrollToContinue from '@/app/components/ScrollToContinue';
import FadingScroll from '@/app/components/FadingScroll';
import type { ResearchEntry } from '@/app/types/ResearchEntry';

export default function ResearchView({ currentSection, setCurrentSection }: { currentSection: string; setCurrentSection: (section: string) => void }) {
  const [entries, setEntries] = useState<ResearchEntry[]>([]);
  const [isSelected, setIsSelected] = useState<number>(-1);

  useEffect(() => {
    fetchResearchEntries().then(setEntries);
  }, []);

  const selectedEntry = entries.find((e) => e.id === isSelected);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Enter" && currentSection === 'research') {
        setCurrentSection('education');

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
    <section 
        id="research" 
        className="snap-start h-screen grid grid-rows-[120px_1fr_60px] sm:grid-rows-[120px_1fr_120px] [@media(max-height:500px)]:grid-rows-[120px_1fr_60px]"
    >
      {/* Header */}
      <div className="flex flex-col row-start-1 gap-8 items-start justify-center px-12 py-20 sm:p-20 w-full">
        <TerminalHeader
          username="aarjav_jain"
          text="ls research"
        />
      </div>

      {/* Scrollable cards with fades */}
      <FadingScroll className="row-start-2 rounded-[20px] mx-12 sm:mx-20 my-4" fadeHeight={50} backgroundColor="#171717">
        <div className="grid grid-cols-1 mdlg:grid-cols-2 xl:grid-cols-3 gap-4">
          {entries.map((entry) => (
            <ResearchCard
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

      {/* ResearchModal */}
      {selectedEntry && (
        <div>
          <ResearchModal
            entry={selectedEntry}
            onClose={() => setIsSelected(-1)}
          />
        </div>
      )}
    </section>
  )
};
