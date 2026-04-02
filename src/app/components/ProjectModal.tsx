import React, { useRef, useState, useEffect, useCallback } from 'react'
import { FiPlayCircle, FiImage, FiChevronLeft, FiChevronRight } from 'react-icons/fi'
import SkillIcon from '@/app/components/SkillIcon'
import type { ProjectEntry } from '@/app/types/ProjectEntry'

interface ProjectModalProps {
  entry: ProjectEntry
  onClose: () => void
}

const CLICK_THRESHOLD = 100
const SLIDESHOW_INTERVAL = 4000

const ImageSlideshow: React.FC<{ images: string[] }> = ({ images }) => {
  const [current, setCurrent] = useState(0)
  const [paused, setPaused] = useState(false)

  const next = useCallback(() => setCurrent((i) => (i + 1) % images.length), [images.length])
  const prev = useCallback(() => setCurrent((i) => (i - 1 + images.length) % images.length), [images.length])

  useEffect(() => {
    if (paused) return
    const id = setInterval(next, SLIDESHOW_INTERVAL)
    return () => clearInterval(id)
  }, [paused, next])

  return (
    <div
      className="relative group/slide"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      <div className="relative overflow-hidden rounded-xl border border-white/10 aspect-video bg-black/30">
        {images.map((src, i) => (
          <img
            key={src}
            src={src}
            alt={`Demo screenshot ${i + 1}`}
            className={`absolute inset-0 w-full h-full object-contain transition-opacity duration-500 ${i === current ? 'opacity-100' : 'opacity-0'}`}
          />
        ))}
      </div>

      {images.length > 1 && (
        <>
          <button
            onClick={(e) => { e.stopPropagation(); prev() }}
            className="absolute left-2 top-1/2 -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white rounded-full p-1.5 opacity-0 group-hover/slide:opacity-100 transition-opacity"
          >
            <FiChevronLeft size={16} />
          </button>
          <button
            onClick={(e) => { e.stopPropagation(); next() }}
            className="absolute right-2 top-1/2 -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white rounded-full p-1.5 opacity-0 group-hover/slide:opacity-100 transition-opacity"
          >
            <FiChevronRight size={16} />
          </button>

          <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex gap-1.5">
            {images.map((_, i) => (
              <button
                key={i}
                onClick={(e) => { e.stopPropagation(); setCurrent(i) }}
                className={`w-1.5 h-1.5 rounded-full transition-all ${i === current ? 'bg-[var(--color-green)] w-4' : 'bg-white/40 hover:bg-white/60'}`}
              />
            ))}
          </div>
        </>
      )}
    </div>
  )
}

const ProjectModal: React.FC<ProjectModalProps> = ({ entry, onClose }) => {
  const downRef = useRef<number | null>(null)
  const hasMedia = !!(entry.demoVideo || entry.demoImages)

  return (
    <div
      className="fixed inset-0 flex items-center justify-center z-50 mx-8 sm:mx-20"
      onClick={onClose}
    >
      <div
        onMouseDown={(e) => { e.stopPropagation(); downRef.current = Date.now() }}
        onMouseUp={(e) => { e.stopPropagation(); if (downRef.current && Date.now() - downRef.current < CLICK_THRESHOLD) onClose() }}
        onClick={(e) => e.stopPropagation()}
        className={`bg-[#141414]/90 backdrop-blur-xl border border-white/10 rounded-[20px] p-8 w-full text-white select-text shadow-[0_20px_60px_rgba(0,0,0,0.6)] ${hasMedia ? 'max-w-2xl' : 'max-w-md'}`}
      >
        <h3 className="text-2xl text-[var(--color-cyan)] mb-3">{entry.title}</h3>
        {entry.skills && (
          <div className="flex flex-wrap gap-2 mb-4">
            {entry.skills.map((s, i) => <SkillIcon key={i} {...s} />)}
          </div>
        )}
        <div className="prose prose-invert text-sm whitespace-pre-wrap">
          {entry.description.map((p, i) =>
            p.type === 'keyword'
              ? <strong key={i} className="text-[var(--color-green)]">{p.content}</strong>
              : <span key={i}>{p.content}</span>
          )}
        </div>
        {entry.demoVideo && (
          <div className="mt-5">
            <div className="flex items-center gap-2 text-xs text-[var(--color-green)] mb-2">
              <FiPlayCircle size={14} />
              <span>Demo</span>
            </div>
            <video
              src={entry.demoVideo}
              controls
              playsInline
              preload="metadata"
              className="w-full rounded-xl border border-white/10"
            />
          </div>
        )}
        {entry.demoImages && entry.demoImages.length > 0 && (
          <div className="mt-5">
            <div className="flex items-center gap-2 text-xs text-[var(--color-green)] mb-2">
              <FiImage size={14} />
              <span>Screenshots</span>
            </div>
            <ImageSlideshow images={entry.demoImages} />
          </div>
        )}
      </div>
    </div>
  )
}

export default ProjectModal