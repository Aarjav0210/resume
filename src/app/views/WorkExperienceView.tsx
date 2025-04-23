// components/WorkExperienceView.tsx
import React, { useState } from 'react'
import TerminalHeader from '@/app/components/TerminalHeader'
import WorkExperienceCard from '@/app/components/WorkExperienceCard'
import WorkExperienceModal from '@/app/components/WorkExperienceModal'
import ScrollToContinue from '@/app/components/ScrollToContinue'
import FadingScroll from '@/app/components/FadingScroll'
import Description from '../types/Description'

export default function WorkExperienceView() {
  const [isSelected, setIsSelected] = useState<number>(-1)

  // Shared description for each entry
  const description1: Description[] = [
    { type: 'text', content: 'Onboarded current ML System use-cases with ' },
    { type: 'keyword', content: 'MLFlow' },
    { type: 'text', content: ' to adopt ' },
    { type: 'keyword', content: 'MLOps' },
    { type: 'text', content: ' principles in ' },
    { type: 'keyword', content: 'AI Advisor team' },
    { type: 'text', content: '\n\nLearned about and worked with the full ' },
    { type: 'keyword', content: 'ML Application Lifecycle' },
    { type: 'text', content: '\n\nDesigned an ' },
    { type: 'keyword', content: 'end-to-end' },
    { type: 'text', content: ' pilot app to migrate existing ML system use-cases onto ' },
    { type: 'keyword', content: 'GCP' },
    { type: 'text', content: '\n\nLead a team of interns to create an ESG Analytics Dashboard on GCP by ' },
    { type: 'keyword', content: 'web-scraping' },
    { type: 'text', content: ' news articles and applying several ' },
    { type: 'keyword', content: 'NLP' },
    { type: 'text', content: ' techniques' },
  ]

  // Shared skills for each entry
  const skills = [
    { bgColor: '#3A78A9', textColor: '#F89A16', text: 'java' },
    { bgColor: '#FFFFFF', textColor: '#0D1319', text: 'q/kdb+' },
    { bgColor: '#22262E', textColor: '#54BED5', text: 'react' },
    { bgColor: '#007ACD', textColor: '#FFFFFF', text: 'typescript' },
    { bgColor: '#F10001', textColor: '#FFFFFF', text: 'SQL' },
  ]

  // All work experience entries
  const entries = [
    {
      id: 0,
      company: 'Deutsche Bank AG',
      timePeriod: "Jul '24 – Present",
      role: 'Associate Engineer',
      description: description1,
      skills,
    },
    {
      id: 1,
      company: 'Deutsche Bank AG',
      timePeriod: "Jul '24 – Present",
      role: 'Associate Engineer',
      description: description1,
      skills,
    },
    {
      id: 2,
      company: 'Deutsche Bank AG',
      timePeriod: "Jul '24 – Present",
      role: 'Associate Engineer',
      description: description1,
      skills,
    },
    {
      id: 3,
      company: 'Deutsche Bank AG',
      timePeriod: "Jul '24 – Present",
      role: 'Associate Engineer',
      description: description1,
      skills,
    },
    {
      id: 4,
      company: 'Deutsche Bank AG',
      timePeriod: "Jul '24 – Present",
      role: 'Associate Engineer',
      description: description1,
      skills,
    },
  ]

  const selectedEntry = entries.find((e) => e.id === isSelected)

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
        <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-4">
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
        <WorkExperienceModal onClose={() => setIsSelected(-1)}>
          <h2 className="text-2xl text-[#4CF0E8] mb-4">{selectedEntry.company}</h2>
          <p className="italic text-sm text-[#84EF12] mb-6">
            {selectedEntry.timePeriod} | {selectedEntry.role}
          </p>
          <div className="prose prose-invert">
            {selectedEntry.description.map((part, idx) =>
              part.type === 'keyword' ? (
                <strong key={idx} className="text-[#84EF12]">
                  {part.content}
                </strong>
              ) : (
                <span key={idx} key={idx}>
                  {part.content}
                </span>
              )
            )}
          </div>
        </WorkExperienceModal>
      )}
    </section>
  )
}
