import type Description from '@/app/types/Description';
import type Skill from './Skill';

export interface ProjectEntry {
  id: number
  title: string
  description: Description[]
  skills?: Skill[]
}