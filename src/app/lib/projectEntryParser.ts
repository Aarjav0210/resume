import matter from 'gray-matter'
import type { ProjectEntry } from '@/app/types/ProjectEntry'
import type Description from '@/app/types/Description'

const BOLD_REGEX = /\*\*(.*?)\*\*/g

export function parseDescription(md: string): Description[] {
  const result: Description[] = []
  let lastIndex = 0
  let match: RegExpExecArray | null

  while ((match = BOLD_REGEX.exec(md)) !== null) {
    const [full, keyword] = match
    const idx = match.index
    if (idx > lastIndex) {
      result.push({ type: 'text', content: md.slice(lastIndex, idx) })
    }
    result.push({ type: 'keyword', content: keyword })
    lastIndex = idx + full.length
  }
  if (lastIndex < md.length) {
    result.push({ type: 'text', content: md.slice(lastIndex) })
  }
  return result
}

export function parseProjectEntries(rawMd: string): ProjectEntry[] {
  const { data } = matter(rawMd) as { data: { entries: any[] } }
  return (data.entries as any[]).map((e) => ({
    id: e.id,
    title: e.title,
    skills: Array.isArray(e.skills) ? e.skills : [],
    description: parseDescription(e.description as string),
  }))
}

export async function fetchProjectEntries(): Promise<ProjectEntry[]> {
  const res = await fetch('/projectEntries.md')
  if (!res.ok) {
    console.error('Failed to load projectEntries.md', res.status)
    return []
  }
  const raw = await res.text()
  return parseProjectEntries(raw)
}