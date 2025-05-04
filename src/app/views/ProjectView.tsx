'use client';
import React, { useState, useEffect } from 'react';
import TerminalHeader from '@/app/components/TerminalHeader';
import FadingScroll from '@/app/components/FadingScroll';
import ProjectCard from '@/app/components/ProjectCard';
import ProjectModal from '@/app/components/ProjectModal';
import { fetchProjectEntries } from '@/app/lib/projectEntryParser';
import type { ProjectEntry } from '@/app/types/ProjectEntry';

export default function ProjectView() {
  const [entries, setEntries] = useState<ProjectEntry[]>([]);
  const [selectedId, setSelectedId] = useState<number>(-1);

  useEffect(() => { fetchProjectEntries().then(setEntries) }, []);

  const selected = entries.find((e) => e.id === selectedId);

  return (
    <section id="projects" className="snap-start h-screen grid grid-rows-[120px_1fr_120px]">
      <div className="flex row-start-1 items-center px-12 py-20 sm:p-20">
        <TerminalHeader username="aarjav_jain" text="ls projects"/>
      </div>
      <FadingScroll className="row-start-2 mx-12 sm:mx-20 my-9 rounded-[20px]" fadeHeight={50} backgroundColor="#171717">
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
          {entries.map((e) => (
            <ProjectCard key={e.id} {...e} disabled={selectedId !== -1} onSelect={setSelectedId} />
          ))}
        </div>
      </FadingScroll>
      <div className="row-start-3 flex justify-center mt-4">
        {/* <ScrollToContinue beforeText="Scroll or press " keyPressIconText="Enter" afterText=" to continue" /> */}
      </div>
      {selected && <ProjectModal entry={selected} onClose={() => setSelectedId(-1)} />}
    </section>
  )
};