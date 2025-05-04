// components/WorkExperienceModal.tsx
import React, { useRef } from 'react'
import SkillIcon from '@/app/components/SkillIcon'
import type { WorkEntry } from '@/app/types/WorkEntry'

export interface WorkExperienceModalProps {
  entry: WorkEntry
  onClose: () => void
}
const CLICK_THRESHOLD = 200 // ms

const WorkExperienceModal: React.FC<WorkExperienceModalProps> = ({ entry, onClose }) => {
  const downTimeRef = useRef<number | null>(null)

  const handleBackdropClick = () => {
    onClose()
  }

  const handleMouseDown = (e: React.MouseEvent) => {
    e.stopPropagation()
    downTimeRef.current = Date.now()
  }

  const handleMouseUp = (e: React.MouseEvent) => {
    e.stopPropagation()
    if (downTimeRef.current !== null) {
      const delta = Date.now() - downTimeRef.current
      if (delta < CLICK_THRESHOLD) {
        onClose()
      }
    }
    downTimeRef.current = null
  }

  const stopClick = (e: React.MouseEvent) => e.stopPropagation()

  return (
    <div
      className="fixed inset-0 flex items-center justify-center z-50 mx-8 sm:mx-20"
      onClick={handleBackdropClick}
    >
      <div
        className="bg-[#1E1E1E] rounded-[20px] shadow-xl p-10 max-w-lg w-full text-white select-text cursor-text"
        onMouseDown={handleMouseDown}
        onMouseUp={handleMouseUp}
        onClick={stopClick}
      >
        {/* Header */}
        <div className="flex flex-col items-start gap-1 mb-4">
          <h2 className="text-3xl text-[#4CF0E8]">{entry.company}</h2>
          <p className="text-base text-[#84EF12]">
            {entry.timePeriod} | {entry.role}
          </p>
        </div>

        {/* Description */}
        <div className="mb-6">
          <h4 className="text-lg text-white mb-2">Description</h4>
          <div className="prose prose-invert text-sm whitespace-pre-wrap">
            {entry.description.map((part, idx) =>
              part.type === 'keyword' ? (
                <span key={idx} className="text-[#84EF12]">
                  {part.content}
                </span>
              ) : (
                <span key={idx}>{part.content}</span>
              )
            )}
          </div>
        </div>

        {/* Skills */}
        {entry.skills && (
          <div>
            <h4 className="text-lg text-white mb-2">Skills</h4>
            <div className="flex flex-wrap gap-2">
              {entry.skills.map((skill, idx) => (
                <SkillIcon key={idx} {...skill} />
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default WorkExperienceModal
