import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

const optionLabels: Record<string, string> = {
  // Personality
  expert: 'Expert Professional',
  mentor: 'Supportive Mentor',
  creative: 'Creative Innovator',
  analyst: 'Detail-Oriented Analyst',
  strategist: 'Strategic Planner',
  collaborator: 'Team Collaborator',

  // Expertise
  frontend: 'Frontend Development',
  backend: 'Backend Development',
  devops: 'DevOps & CI/CD',
  architecture: 'System Architecture',
  security: 'Security',
  mobile: 'Mobile Development',
  ai: 'AI/ML',
  cloud: 'Cloud Computing',

  // Communication
  concise: 'Concise and Direct',
  detailed: 'Detailed and Comprehensive',
  technical: 'Technical and Precise',
  simple: 'Simple and Clear',
  formal: 'Formal and Professional',
  casual: 'Casual and Friendly',

  // Constraints
  verify: 'Source Verification',
  privacy: 'Privacy Protection',
  ethical: 'Ethical Guidelines',
  transparent: 'Transparency',
  professional: 'Professional Conduct',
  inclusive: 'Inclusive Communication',

  // Output Preferences
  code: 'Code Examples',
  steps: 'Step-by-Step Instructions',
  visuals: 'Visual Aids',
  analogies: 'Real-world Analogies',
  examples: 'Practical Examples',
  references: 'Documentation References'
};

export function generatePrompt(formData: any): string {
  const sections = [];

  if (formData.personality?.length > 0) {
    sections.push(
      '# Role and Personality\n' +
      formData.personality
        .map(id => `- ${optionLabels[id]}`)
        .join('\n')
    );
  }

  if (formData.expertise?.length > 0) {
    sections.push(
      '# Areas of Expertise\n' +
      formData.expertise
        .map(id => `- ${optionLabels[id]}`)
        .join('\n')
    );
  }

  if (formData.communication?.length > 0) {
    sections.push(
      '# Communication Style\n' +
      formData.communication
        .map(id => optionLabels[id])
        .join('\n')
    );
  }

  if (formData.constraints?.length > 0) {
    sections.push(
      '# Behavioral Guidelines\n' +
      formData.constraints
        .map(id => `- ${optionLabels[id]}`)
        .join('\n')
    );
  }

  if (formData.outputPreferences?.length > 0) {
    sections.push(
      '# Output Preferences\n' +
      formData.outputPreferences
        .map(id => `- ${optionLabels[id]}`)
        .join('\n')
    );
  }

  return sections.join('\n\n');
}

export function formatDate(date: number | string | Date): string {
  return new Intl.DateTimeFormat('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  }).format(new Date(date));
}

export const copyToClipboard = async (text: string): Promise<boolean> => {
  try {
    await navigator.clipboard.writeText(text);
    return true;
  } catch (err) {
    console.error('Failed to copy text:', err);
    return false;
  }
};

export const downloadAsFile = (content: string, filename: string) => {
  const blob = new Blob([content], { type: 'text/plain' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = filename;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
};