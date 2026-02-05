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
  const cardRefs = React.useRef<Record<number, HTMLDivElement | null>>({});
  const timelineEntries = [
    {
      id: -999,
      timePeriod: "Present",
      company: "Plotting the next big thing",
      role: "",
      description: [],
      skills: [],
    } as WorkEntry,
    ...entries,
  ];

  useEffect(() => {
    fetchWorkEntries().then(setEntries);
  }, []);

  const selectedEntry = entries.find((e) => e.id === isSelected);


  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Enter" && currentSection === 'work-experience') {
        // Update the current section to 'research'
        setCurrentSection('research'); // Set the next section directly

        // Scroll to the next section
        const nextSection = document.getElementById('research');
        if (nextSection) {
          nextSection.scrollIntoView({ behavior: "smooth" });
        }
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [currentSection, setCurrentSection]);



  const handleTimelineSelect = (id: number) => {
    const target = cardRefs.current[id];
    if (target) {
      target.scrollIntoView({ behavior: 'smooth', block: 'center' });
      window.setTimeout(() => setIsSelected(id), 200);
      return;
    }
    setIsSelected(id);
  };

  return (
    <section 
        id="work-experience" 
        className="snap-start h-screen grid grid-rows-[120px_1fr_60px] sm:grid-rows-[120px_1fr_120px] [@media(max-height:500px)]:grid-rows-[120px_1fr_60px]"
    >
      {/* Header */}
      <div className="flex flex-col row-start-1 gap-8 items-start justify-center px-12 py-20 sm:p-20 w-full">
        <TerminalHeader
          username="aarjav_jain"
          text="ls work_experience"
        />
      </div>

      {/* Timeline + cards */}
      <div className="row-start-2 mx-12 sm:mx-20 my-4 grid gap-8 lg:grid-cols-[220px_1fr] xl:grid-cols-[260px_1fr] min-h-0">
        {/* Desktop timeline */}
        <div className="relative hidden lg:block py-4 max-h-full overflow-hidden">
          <div className="absolute left-3 top-8 bottom-8 w-px bg-gradient-to-b from-[#4CF0E8]/30 via-white/10 to-[#84EF12]/30" />
          <div className="flex h-full flex-col justify-between max-h-full overflow-hidden pr-1">
            {timelineEntries.map((entry) => {
              const isCurrent = entry.id === -999;
              return (
              <button
                key={entry.id}
                type="button"
                onClick={() => !isCurrent && handleTimelineSelect(entry.id)}
                className={`group relative block w-full pl-7 text-left transition cursor-pointer rounded-md px-1 py-0.5 -ml-1 transform-gpu ${
                  isCurrent
                    ? "cursor-default"
                    : "hover:opacity-100 hover:bg-white/5 hover:-translate-y-0.5 hover:rotate-[0.4deg]"
                }`}
                aria-disabled={isCurrent}
              >
                <div className={`absolute left-[11px] top-2.5 h-2.5 w-2.5 rounded-full shadow-[0_0_10px_rgba(76,240,232,0.6)] transition-transform ${
                  isCurrent
                    ? "bg-[#84EF12] shadow-[0_0_12px_rgba(132,239,18,0.8)]"
                    : "bg-[#4CF0E8] group-hover:scale-110"
                }`} />
                <p className={`text-[10px] transition-colors ${
                  isCurrent ? "text-[#84EF12]" : "text-[#84EF12] group-hover:text-[#4CF0E8]"
                }`}>{entry.timePeriod}</p>
                <p className={`text-xs transition-colors ${
                  isCurrent ? "text-white" : "text-white/90 group-hover:text-white"
                }`}>{entry.company}</p>
                {entry.role ? (
                  <p className="text-[10px] text-gray-400 transition-colors group-hover:text-gray-300">{entry.role}</p>
                ) : (
                  <p className="text-[10px] text-gray-500"> </p>
                )}
              </button>
              );
            })}
          </div>
        </div>

        {/* Mobile timeline (dots only) */}

        {/* Experience cards (scroll only this column) */}
        <FadingScroll className="min-h-0 rounded-[20px]" bottomInset="3rem">
          <div className="grid grid-cols-1 mdlg:grid-cols-2 xl:grid-cols-3 gap-4 min-w-0 px-4 sm:px-6 py-8">
            {entries.map((entry) => (
              <div key={entry.id} ref={(el) => { cardRefs.current[entry.id] = el; }}>
                <WorkExperienceCard
                  {...entry}
                  disabled={isSelected !== -1}
                  onSelect={setIsSelected}
                />
              </div>
            ))}
          </div>
        </FadingScroll>
      </div>

      {/* Continue prompt */}
      <div className="row-start-3 justify-center mt-4">
        <ScrollToContinue beforeText="Scroll or press " keyPressIconText="Enter" afterText=" to continue" />
      </div>

      {/* WorkExperienceModal */}
      {selectedEntry && (
        <div>
          <WorkExperienceModal
            entry={selectedEntry}
            onClose={() => setIsSelected(-1)}
          />
        </div>
      )}
    </section>
  )
};