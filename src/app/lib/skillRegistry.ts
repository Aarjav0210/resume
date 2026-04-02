import type Skill from '@/app/types/Skill'

type SkillStyle = Omit<Skill, 'text'>

const DEFAULT_STYLE: SkillStyle = { bgColor: '#333333', textColor: '#FFFFFF' }

const SKILL_REGISTRY: Record<string, SkillStyle> = {
  // ── Languages & Frameworks ──
  'python':           { bgColor: '#3A78A9', textColor: '#FEDE57' },
  'java':             { bgColor: '#3A78A9', textColor: '#F89A16' },
  'c++':              { bgColor: '#00599C', textColor: '#FFFFFF' },
  'dart':             { bgColor: '#0175C2', textColor: '#FFFFFF' },
  'q/kdb+':           { bgColor: '#FFFFFF', textColor: '#0D1319' },
  'flutter':          { bgColor: '#02569B', textColor: '#FFFFFF' },
  'flask':            { bgColor: '#4CACBC', textColor: '#FFFFFF' },
  'react-native':     { bgColor: '#61DAFB', textColor: '#000000' },

  // ── ML / DL Frameworks ──
  'pytorch':          { bgColor: '#F1F3F4', textColor: '#F55130' },
  'scikit-learn':     { bgColor: '#F7931E', textColor: '#000000' },
  'yolov5':           { bgColor: '#FF0000', textColor: '#FFFFFF' },

  // ── Cloud & Infra ──
  'EC2':              { bgColor: '#FF9900', textColor: '#000000' },
  'firebase':         { bgColor: '#FFCA28', textColor: '#000000' },
  'gcp':              { bgColor: '#4285F4', textColor: '#FFFFFF' },
  'terraform':        { bgColor: '#623CE4', textColor: '#FFFFFF' },
  'neo4j':            { bgColor: '#008CC1', textColor: '#FFFFFF' },
  'arduino':          { bgColor: '#00979D', textColor: '#FFFFFF' },

  // ── AI / NLP ──
  'LLM':              { bgColor: '#A855F7', textColor: '#FFFFFF' },
  'RAG':              { bgColor: '#A855F7', textColor: '#FFFFFF' },
  'transformers':     { bgColor: '#FF6B6B', textColor: '#FFFFFF' },
  'scGPT':            { bgColor: '#F97316', textColor: '#FFFFFF' },

  // ── Bio & Medical ──
  'computational biology':  { bgColor: '#EF4444', textColor: '#FFFFFF' },
  'biosecurity':            { bgColor: '#DC2626', textColor: '#FFFFFF' },
  'medical imaging':        { bgColor: '#F59E0B', textColor: '#FFFFFF' },
  'single-cell RNA-seq':    { bgColor: '#4ECDC4', textColor: '#FFFFFF' },
  'knowledge graphs':       { bgColor: '#10B981', textColor: '#FFFFFF' },

  // ── Architectures & Techniques ──
  'R-GCN':                  { bgColor: '#6366F1', textColor: '#FFFFFF' },
  'sparse representation':  { bgColor: '#6366F1', textColor: '#FFFFFF' },
  'affine optical flow':    { bgColor: '#10B981', textColor: '#FFFFFF' },
  'noise2noise CNN':        { bgColor: '#EF4444', textColor: '#FFFFFF' },
}

export function resolveSkill(name: string): Skill {
  const style = SKILL_REGISTRY[name] ?? DEFAULT_STYLE
  return { text: name, ...style }
}
