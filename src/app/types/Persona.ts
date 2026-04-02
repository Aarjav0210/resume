export type Persona = 'researcher' | 'engineer' | 'academic' | 'general';

export interface PersonaOption {
  id: Persona;
  key: string;
  label: string;
  description: string;
}

export const personaOptions: PersonaOption[] = [
  { id: 'researcher', key: '1', label: 'research_lab', description: 'PI, research org, or collaboration' },
  { id: 'engineer', key: '2', label: 'engineering_team', description: 'SWE role, recruiter, or tech company' },
  { id: 'academic', key: '3', label: 'academic_program', description: 'Grad admissions or fellowship' },
  { id: 'general', key: '4', label: 'just_curious', description: 'The full experience' },
];


export const personaSectionOrder: Record<Persona, string[]> = {
  researcher: ['landing', 'education', 'research', 'work-experience', 'projects', 'contact'],
  engineer:   ['landing', 'education', 'work-experience', 'projects', 'research', 'contact'],
  academic:   ['landing', 'education', 'research', 'work-experience', 'projects', 'contact'],
  general:    ['landing', 'education', 'work-experience', 'research', 'projects', 'contact'],
};

export const personaTypewriterText: Record<Persona, string[]> = {
  researcher: [
    "Research Assistant @ Singh Lab",
    "M.S. Computer Science @ Brown University",
    "Ex-SWE @ Deutsche Bank AG",
  ],
  engineer: [
    "Ex-SWE @ Deutsche Bank AG",
    "M.S. Computer Science @ Brown University",
    "Research Assistant @ Singh Lab",
  ],
  academic: [
    "M.S. Computer Science @ Brown University",
    "Research Assistant @ Singh Lab",
    "Ex-SWE @ Deutsche Bank AG",
  ],
  general: [
    "M.S. Computer Science @ Brown University",
    "Research Assistant @ Singh Lab",
    "Ex-SWE @ Deutsche Bank AG",
  ],
};

export const sectionDisplayNames: Record<string, string> = {
  'landing': 'home',
  'work-experience': 'work_experience',
  'research': 'research',
  'education': 'education',
  'projects': 'projects',
  'contact': 'contact',
};

export function isValidPersona(value: string): value is Persona {
  return ['researcher', 'engineer', 'academic', 'general'].includes(value);
}
