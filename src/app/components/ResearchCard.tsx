// components/ResearchCard.tsx
import React from 'react'
import SkillIcon from '@/app/components/SkillIcon'
import type { ResearchEntry } from '@/app/types/ResearchEntry'
import Skill from '../types/Skill'

export interface ResearchCardProps extends ResearchEntry {
  disabled?: boolean
  onSelect: (id: number) => void
}

const ResearchCard: React.FC<ResearchCardProps> = ({
  id,
  lab,
  location,
  timePeriod,
  role,
  description,
  skills = [],
  disabled = false,
  onSelect,
}) => {

  function toTitleCase(str: string) {
    return str.split(' ').map((word: string) => {
      return (word.charAt(0).toUpperCase() + word.slice(1));
    }).join(' ');
  }

  return (
    <div
      onClick={() => !disabled && onSelect(id)}
      className={`
        group relative flex flex-col overflow-hidden rounded-[24px] py-6 px-8
        w-full cursor-pointer border border-white/10 bg-white/[0.04]
        backdrop-blur-xl shadow-[0_0_40px_rgba(76,240,232,0.08)] transition duration-300
        ${disabled ? 'opacity-50 pointer-events-none' : 'hover:-translate-y-1 hover:rotate-[0.6deg] hover:border-white/20 hover:shadow-[0_0_60px_rgba(76,240,232,0.18)]'}
      `}
    >
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute -top-24 -right-24 h-48 w-48 rounded-full bg-[#4CF0E8]/10 blur-2xl transition duration-500 group-hover:bg-[#4CF0E8]/20" />
        <div className="absolute -bottom-24 -left-24 h-48 w-48 rounded-full bg-[#84EF12]/10 blur-2xl transition duration-500 group-hover:bg-[#84EF12]/20" />
        <div className="absolute inset-0 bg-[linear-gradient(135deg,rgba(255,255,255,0.08),rgba(255,255,255,0.02))] opacity-60" />
      </div>
      <h2 className="text-xl text-[#4CF0E8]">{lab}</h2>
      <h3 className="text-sm text-[#84EF12] mt-1">
        {timePeriod} | {role}
      </h3>
      <p className="text-xs text-gray-400 mt-1">{location}</p>

      <div className="mt-4 text-[10px] whitespace-pre-wrap">
        {description
          .filter((p) => p.type === 'keyword')
          .map((p) => toTitleCase(p.content))
          .join('  |  ')}
      </div>

      {skills.length > 0 && (
        <div className="mt-4 text-sm">
          <h4>Skills</h4>
          <div className="flex flex-wrap gap-2 mt-2">
            {skills.map((skill: Skill, idx: number) => <SkillIcon key={idx} {...skill} />)}
          </div>
        </div>
      )}
    </div>
  )
}

export default ResearchCard
