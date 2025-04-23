// components/WorkExperienceModal.tsx
import React, { ReactNode, useRef } from 'react'

interface WorkExperienceModalProps {
  children: ReactNode
  onClose: () => void
}

const CLICK_THRESHOLD = 25 // ms

const WorkExperienceModal: React.FC<WorkExperienceModalProps> = ({ children, onClose }) => {
  // Track when the press started
  const downTimeRef = useRef<number | null>(null)

  // Backdrop: any click here closes immediately
  const handleBackdropClick = () => {
    onClose()
  }

  // Modal content: only close if quick click (< threshold)
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
  // Prevent the built-in click event from bubbling out
  const stopClick = (e: React.MouseEvent) => e.stopPropagation()

  return (
    <div
      className="fixed inset-0 flex items-center justify-center z-50"
      onClick={handleBackdropClick}
    >
      <div
        className="bg-[#1E1E1E] rounded-2xl p-8 max-w-lg w-full text-white select-text cursor-text"
        onMouseDown={handleMouseDown}
        onMouseUp={handleMouseUp}
        onClick={stopClick}
      >
        {children}
      </div>
    </div>
  )
}

export default WorkExperienceModal
