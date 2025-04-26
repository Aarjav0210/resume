import React from 'react';
import SkillIcon from '@/app/components/SkillIcon';
import type { ProjectEntry } from '@/app/types/ProjectEntry';
import Skill from '../types/Skill';

export interface ProjectCardProps extends ProjectEntry {
  disabled?: boolean
  onSelect: (id: number) => void
};

function toTitleCase(str: string) {
  return str.split(' ').map((word: string) => {
    return (word.charAt(0).toUpperCase() + word.slice(1));
  }).join(' ');
};

const ProjectCard: React.FC<ProjectCardProps> = ({
  id, title, description, skills = [], disabled = false, onSelect,
}) => (
  <div
    onClick={() => !disabled && onSelect(id)}
    className={
      `relative flex flex-col rounded-[20px] p-6 bg-[#1E1E1E] md:min-w-[300px] cursor-pointer
       ${disabled ? 'opacity-50 pointer-events-none' : 'hover:scale-[0.98] transition-transform'}`
    }
  >
    <h3 className="text-xl text-[#4CF0E8] mb-2">{title}</h3>
    <p className="text-[10px] whitespace-pre-wrap flex-1">
      {description
        .filter((p) => p.type === 'keyword')
        .map((p) => toTitleCase(p.content))
        .join(' • ')
      }
    </p>
    {skills.length > 0 && (
      <div className="mt-4 flex flex-wrap gap-2">
        {skills.map((skill: Skill, idx: number) => <SkillIcon key={idx} {...skill} />)}
      </div>
    )}
  </div>
)

export default ProjectCard