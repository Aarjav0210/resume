// lib/researchEntryParser.ts
import matter from 'gray-matter';
import type { ResearchEntry } from '@/app/types/ResearchEntry';
import type Description from '@/app/types/Description';

interface FrontMatter<T> {
  entries: T[]
}

type RawResearchEntry = Omit<ResearchEntry, 'description'> & {
  description: string
}

const BOLD_REGEX = /\*\*(.*?)\*\*/g;

/**
 * Convert a markdown string with **bold** syntax into a Description[]
 */
export function parseDescription(md: string): Description[] {
  const result: Description[] = [];
  let lastIndex = 0;
  let match: RegExpExecArray | null;

  while ((match = BOLD_REGEX.exec(md)) !== null) {
    const [full, keyword] = match;
    const idx = match.index;
    // text before bold
    if (idx > lastIndex) {
      result.push({ type: 'text', content: md.slice(lastIndex, idx) });
    }
    // bold keyword
    result.push({ type: 'keyword', content: keyword });
    lastIndex = idx + full.length;
  }
  // remaining text
  if (lastIndex < md.length) {
    result.push({ type: 'text', content: md.slice(lastIndex) });
  }

  return result;
};

/**
 * Parse raw markdown (with front-matter) into ResearchEntry[]
 * @param rawMd full text of researchEntries.md
 */
export function parseResearchEntries(rawMd: string): ResearchEntry[] {
  const parsed = matter(rawMd)
  const fm = parsed.data as FrontMatter<RawResearchEntry>;
  const entries = Array.isArray(fm.entries) ? fm.entries : []
  return entries.map((e) => ({
    id: e.id,
    lab: e.lab,
    location: e.location,
    timePeriod: e.timePeriod,
    role: e.role,
    skills: Array.isArray(e.skills) ? e.skills : [],
    description: parseDescription(e.description as string),
  }))
}

/**
 * Fetch the markdown file from public and parse it into ResearchEntry[]
 */
export async function fetchResearchEntries(): Promise<ResearchEntry[]> {
  const res = await fetch('/researchEntries.md');
  const raw = await res.text();
  return parseResearchEntries(raw);
};
