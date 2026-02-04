import React, { useRef } from 'react'
import SkillIcon from '@/app/components/SkillIcon'
import type { ProjectEntry } from '@/app/types/ProjectEntry'

interface ProjectModalProps {
  entry: ProjectEntry
  onClose: () => void
}

const CLICK_THRESHOLD = 100

const ProjectModal: React.FC<ProjectModalProps> = ({ entry, onClose }) => {
  const downRef = useRef<number | null>(null)

  return (
    <div
      className="fixed inset-0 flex items-center justify-center z-50 mx-8 sm:mx-20"
      onClick={onClose}
    >
      <div
        onMouseDown={(e) => { e.stopPropagation(); downRef.current = Date.now() }}
        onMouseUp={(e) => { e.stopPropagation(); if (downRef.current && Date.now() - downRef.current < CLICK_THRESHOLD) onClose() }}
        onClick={(e) => e.stopPropagation()}
        className="bg-[#141414]/90 backdrop-blur-xl border border-white/10 rounded-[20px] p-8 max-w-md w-full text-white select-text shadow-[0_20px_60px_rgba(0,0,0,0.6)]"
      >
        <h3 className="text-2xl text-[#4CF0E8] mb-3">{entry.title}</h3>
        {entry.skills && (
          <div className="flex flex-wrap gap-2 mb-4">
            {entry.skills.map((s, i) => <SkillIcon key={i} {...s} />)}
          </div>
        )}
        <div className="prose prose-invert text-sm whitespace-pre-wrap">
          {entry.description.map((p, i) =>
            p.type === 'keyword'
              ? <strong key={i} className="text-[#84EF12]">{p.content}</strong>
              : <span key={i}>{p.content}</span>
          )}
        </div>
      </div>
    </div>
  )
}

export default ProjectModal