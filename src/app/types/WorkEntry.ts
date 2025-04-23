// src/app/types/WorkEntry.ts
import type Description from './Description'

export interface Skill {
  bgColor: string
  textColor: string
  text: string
}

export interface WorkEntry {
  id: number
  company: string
  timePeriod: string
  role: string
  description: Description[]
  skills?: Skill[]
}
