// src/app/types/WorkEntry.ts
import type Description from './Description'
import type Skill from './Skill'
export default interface WorkEntry {
    id: number
    company: string
    timePeriod: string
    role: string
    description: Description[]
    skills?: Skill[]
};