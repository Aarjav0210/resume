// src/app/types/ResearchEntry.ts
import type Description from './Description'
import type Skill from './Skill'
export interface ResearchEntry {
    id: number
    lab: string
    location: string
    timePeriod: string
    role: string
    description: Description[]
    skills?: Skill[]
};
