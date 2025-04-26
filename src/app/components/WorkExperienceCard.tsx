// components/WorkExperienceCard.tsx
import React from 'react'
import SkillIcon from '@/app/components/SkillIcon'
import type { WorkEntry } from '@/app/types/WorkEntry'
import Skill from '../types/Skill'

export interface WorkExperienceCardProps extends WorkEntry {
  disabled?: boolean
  onSelect: (id: number) => void
}

const WorkExperienceCard: React.FC<WorkExperienceCardProps> = ({
  id,
  company,
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
        relative flex flex-col rounded-[20px] py-6 px-8
        md:min-w-[360px] bg-[#1E1E1E] cursor-pointer
        ${disabled ? 'opacity-50 pointer-events-none' : 'hover:scale-[0.98] transition-transform'}
      `}
    >
      <h2 className="text-xl text-[#4CF0E8]">{company}</h2>
      <h3 className="text-sm text-[#84EF12] mt-1">
        {timePeriod} | {role}
      </h3>

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

export default WorkExperienceCard