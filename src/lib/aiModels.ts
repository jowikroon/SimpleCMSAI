export interface AIModel {
  id: string;
  name: string;
  icon: string;
  description: string;
  strengths: string[];
  steps: Step[];
}

interface Step {
  title: string;
  description: string;
  field: string;
  options: Option[];
  validation: (value: string[]) => boolean;
  errorMessage: string;
  singleSelect?: boolean;
}

interface Option {
  id: string;
  label: string;
  description: string;
  icon: string;
}

export const AI_MODELS: AIModel[] = [
  {
    id: 'chatgpt',
    name: 'ChatGPT',
    icon: '🤖',
    description: 'OpenAI\'s versatile language model with broad knowledge',
    strengths: ['Natural conversation', 'Code generation', 'Creative writing', 'Task explanation'],
    steps: [
      {
        title: 'Model Version',
        description: 'Select GPT model capabilities',
        field: 'model',
        options: [
          { id: 'gpt4', label: 'GPT-4', description: 'Most capable model, better reasoning', icon: '🚀' },
          { id: 'gpt35', label: 'GPT-3.5', description: 'Faster responses, more economical', icon: '⚡' }
        ],
        validation: (value) => value.length === 1,
        errorMessage: 'Please select a model version',
        singleSelect: true
      },
      {
        title: 'Task Type',
        description: 'Define primary interaction purpose',
        field: 'taskType',
        options: [
          { id: 'coding', label: 'Code Assistant', description: 'Programming and development help', icon: '💻' },
          { id: 'writing', label: 'Content Creation', description: 'Writing and editing assistance', icon: '✍️' },
          { id: 'analysis', label: 'Data Analysis', description: 'Data interpretation and insights', icon: '📊' },
          { id: 'tutor', label: 'Learning Aid', description: 'Educational support and explanations', icon: '📚' }
        ],
        validation: (value) => value.length === 1,
        errorMessage: 'Please select one task type',
        singleSelect: true
      }
    ]
  },
  {
    id: 'claude',
    name: 'Claude',
    icon: '🎭',
    description: 'Anthropic\'s thoughtful and analytical AI assistant',
    strengths: ['Detailed analysis', 'Academic writing', 'Safety considerations', 'Nuanced responses'],
    steps: [
      {
        title: 'Model Version',
        description: 'Select Claude model capabilities',
        field: 'model',
        options: [
          { id: 'claude3', label: 'Claude 3', description: 'Latest model with enhanced capabilities', icon: '🌟' },
          { id: 'claude2', label: 'Claude 2', description: 'Balanced performance and reliability', icon: '⚖️' }
        ],
        validation: (value) => value.length === 1,
        errorMessage: 'Please select a model version',
        singleSelect: true
      },
      {
        title: 'Analysis Depth',
        description: 'Define level of detail needed',
        field: 'depth',
        options: [
          { id: 'concise', label: 'Concise', description: 'Brief, focused responses', icon: '📝' },
          { id: 'detailed', label: 'Detailed', description: 'In-depth analysis and explanation', icon: '📚' },
          { id: 'comprehensive', label: 'Comprehensive', description: 'Exhaustive coverage with citations', icon: '🔍' }
        ],
        validation: (value) => value.length === 1,
        errorMessage: 'Please select analysis depth',
        singleSelect: true
      }
    ]
  },
  {
    id: 'gemini',
    name: 'Gemini',
    icon: '💎',
    description: 'Google\'s multimodal AI with strong analytical capabilities',
    strengths: ['Multimodal understanding', 'Technical analysis', 'Visual comprehension', 'Research assistance'],
    steps: [
      {
        title: 'Model Version',
        description: 'Select Gemini model capabilities',
        field: 'model',
        options: [
          { id: 'gemini-pro', label: 'Gemini Pro', description: 'Advanced reasoning and analysis', icon: '🌟' },
          { id: 'gemini-vision', label: 'Gemini Vision', description: 'Image and text understanding', icon: '👁️' }
        ],
        validation: (value) => value.length === 1,
        errorMessage: 'Please select a model version',
        singleSelect: true
      },
      {
        title: 'Input Type',
        description: 'Define primary input format',
        field: 'inputType',
        options: [
          { id: 'text', label: 'Text Only', description: 'Pure text interactions', icon: '📝' },
          { id: 'multimodal', label: 'Multimodal', description: 'Text and image inputs', icon: '🖼️' },
          { id: 'code', label: 'Code Analysis', description: 'Programming and technical content', icon: '💻' }
        ],
        validation: (value) => value.length === 1,
        errorMessage: 'Please select input type',
        singleSelect: true
      }
    ]
  },
  {
    id: 'palm',
    name: 'PaLM',
    icon: '🌴',
    description: 'Google\'s Pathways Language Model with strong reasoning',
    strengths: ['Complex reasoning', 'Multilingual support', 'Code understanding', 'Knowledge synthesis'],
    steps: [
      {
        title: 'Language Focus',
        description: 'Select primary language capabilities',
        field: 'language',
        options: [
          { id: 'multilingual', label: 'Multilingual', description: 'Support for multiple languages', icon: '🌍' },
          { id: 'english', label: 'English-focused', description: 'Optimized for English', icon: '🇬🇧' }
        ],
        validation: (value) => value.length === 1,
        errorMessage: 'Please select language focus',
        singleSelect: true
      },
      {
        title: 'Application Area',
        description: 'Choose main application focus',
        field: 'application',
        options: [
          { id: 'research', label: 'Research', description: 'Academic and scientific applications', icon: '🔬' },
          { id: 'development', label: 'Development', description: 'Software and technical development', icon: '💻' },
          { id: 'business', label: 'Business', description: 'Business and professional use', icon: '💼' }
        ],
        validation: (value) => value.length === 1,
        errorMessage: 'Please select application area',
        singleSelect: true
      }
    ]
  },
  {
    id: 'llama',
    name: 'LLaMA',
    icon: '🦙',
    description: 'Meta\'s open-source language model foundation',
    strengths: ['Open-source flexibility', 'Community support', 'Custom fine-tuning', 'Research applications'],
    steps: [
      {
        title: 'Model Size',
        description: 'Select model parameter size',
        field: 'size',
        options: [
          { id: '7b', label: '7B Parameters', description: 'Efficient and fast', icon: '⚡' },
          { id: '13b', label: '13B Parameters', description: 'Balanced performance', icon: '⚖️' },
          { id: '70b', label: '70B Parameters', description: 'Maximum capability', icon: '🚀' }
        ],
        validation: (value) => value.length === 1,
        errorMessage: 'Please select model size',
        singleSelect: true
      },
      {
        title: 'Use Case',
        description: 'Define primary use case',
        field: 'useCase',
        options: [
          { id: 'research', label: 'Research', description: 'Academic and scientific research', icon: '🔬' },
          { id: 'commercial', label: 'Commercial', description: 'Business applications', icon: '💼' },
          { id: 'personal', label: 'Personal', description: 'Individual use', icon: '👤' }
        ],
        validation: (value) => value.length === 1,
        errorMessage: 'Please select use case',
        singleSelect: true
      }
    ]
  },
  {
    id: 'mistral',
    name: 'Mistral',
    icon: '🌪️',
    description: 'High-performance open-source language model',
    strengths: ['Efficient architecture', 'Strong performance', 'Low resource requirements', 'Easy deployment'],
    steps: [
      {
        title: 'Model Version',
        description: 'Select Mistral model version',
        field: 'version',
        options: [
          { id: 'mistral-7b', label: 'Mistral 7B', description: 'Base efficient model', icon: '⚡' },
          { id: 'mixtral-8x7b', label: 'Mixtral 8x7B', description: 'Enhanced mixture of experts', icon: '🚀' }
        ],
        validation: (value) => value.length === 1,
        errorMessage: 'Please select model version',
        singleSelect: true
      },
      {
        title: 'Deployment Type',
        description: 'Choose deployment environment',
        field: 'deployment',
        options: [
          { id: 'cloud', label: 'Cloud', description: 'Cloud-based deployment', icon: '☁️' },
          { id: 'local', label: 'Local', description: 'On-premise deployment', icon: '💻' },
          { id: 'edge', label: 'Edge', description: 'Edge device deployment', icon: '📱' }
        ],
        validation: (value) => value.length === 1,
        errorMessage: 'Please select deployment type',
        singleSelect: true
      }
    ]
  },
  {
    id: 'cohere',
    name: 'Cohere',
    icon: '🔄',
    description: 'Enterprise-focused language AI platform',
    strengths: ['Enterprise integration', 'Custom training', 'Multilingual support', 'Security focus'],
    steps: [
      {
        title: 'Model Purpose',
        description: 'Select primary model purpose',
        field: 'purpose',
        options: [
          { id: 'generate', label: 'Generate', description: 'Content generation', icon: '✍️' },
          { id: 'embed', label: 'Embed', description: 'Text embeddings', icon: '🔤' },
          { id: 'classify', label: 'Classify', description: 'Content classification', icon: '🏷️' }
        ],
        validation: (value) => value.length === 1,
        errorMessage: 'Please select model purpose',
        singleSelect: true
      },
      {
        title: 'Industry Focus',
        description: 'Choose industry specialization',
        field: 'industry',
        options: [
          { id: 'finance', label: 'Finance', description: 'Financial services', icon: '💰' },
          { id: 'healthcare', label: 'Healthcare', description: 'Healthcare and medical', icon: '🏥' },
          { id: 'tech', label: 'Technology', description: 'Technology sector', icon: '💻' }
        ],
        validation: (value) => value.length === 1,
        errorMessage: 'Please select industry focus',
        singleSelect: true
      }
    ]
  },
  {
    id: 'yi',
    name: 'Yi',
    icon: '🧠',
    description: '01.AI\'s advanced multilingual model',
    strengths: ['Multilingual excellence', 'Scientific knowledge', 'Mathematical reasoning', 'Code generation'],
    steps: [
      {
        title: 'Model Scale',
        description: 'Select model scale',
        field: 'scale',
        options: [
          { id: '6b', label: '6B Parameters', description: 'Efficient and fast', icon: '⚡' },
          { id: '34b', label: '34B Parameters', description: 'Enhanced capabilities', icon: '🚀' }
        ],
        validation: (value) => value.length === 1,
        errorMessage: 'Please select model scale',
        singleSelect: true
      },
      {
        title: 'Specialization',
        description: 'Choose primary specialization',
        field: 'specialization',
        options: [
          { id: 'science', label: 'Scientific', description: 'Scientific and academic tasks', icon: '🔬' },
          { id: 'math', label: 'Mathematical', description: 'Mathematical reasoning', icon: '🔢' },
          { id: 'code', label: 'Programming', description: 'Code generation and analysis', icon: '💻' }
        ],
        validation: (value) => value.length === 1,
        errorMessage: 'Please select specialization',
        singleSelect: true
      }
    ]
  },
  {
    id: 'falcon',
    name: 'Falcon',
    icon: '🦅',
    description: 'TII\'s powerful open-source language model',
    strengths: ['Arabic language expertise', 'Scientific knowledge', 'Efficient architecture', 'Research focus'],
    steps: [
      {
        title: 'Model Capacity',
        description: 'Select model capacity',
        field: 'capacity',
        options: [
          { id: '7b', label: '7B Parameters', description: 'Lightweight version', icon: '⚡' },
          { id: '40b', label: '40B Parameters', description: 'Standard version', icon: '🚀' },
          { id: '180b', label: '180B Parameters', description: 'Full capacity', icon: '💪' }
        ],
        validation: (value) => value.length === 1,
        errorMessage: 'Please select model capacity',
        singleSelect: true
      },
      {
        title: 'Language Focus',
        description: 'Choose language specialization',
        field: 'language',
        options: [
          { id: 'arabic', label: 'Arabic', description: 'Arabic language focus', icon: '🌙' },
          { id: 'multilingual', label: 'Multilingual', description: 'Multiple language support', icon: '🌍' }
        ],
        validation: (value) => value.length === 1,
        errorMessage: 'Please select language focus',
        singleSelect: true
      }
    ]
  },
  {
    id: 'bolt',
    name: 'Bolt',
    icon: '⚡',
    description: 'StackBlitz\'s specialized development assistant',
    strengths: ['Web development', 'Real-time coding', 'Project setup', 'Framework expertise'],
    steps: [
      {
        title: 'Development Focus',
        description: 'Select primary development area',
        field: 'focus',
        options: [
          { id: 'frontend', label: 'Frontend', description: 'UI/UX and client-side development', icon: '🎨' },
          { id: 'fullstack', label: 'Full Stack', description: 'End-to-end application development', icon: '🔄' },
          { id: 'deployment', label: 'Deployment', description: 'Build and deployment assistance', icon: '🚀' }
        ],
        validation: (value) => value.length === 1,
        errorMessage: 'Please select development focus',
        singleSelect: true
      },
      {
        title: 'Framework',
        description: 'Choose your preferred framework',
        field: 'framework',
        options: [
          { id: 'react', label: 'React', description: 'Modern React development', icon: '⚛️' },
          { id: 'vue', label: 'Vue', description: 'Vue.js applications', icon: '💚' },
          { id: 'angular', label: 'Angular', description: 'Enterprise Angular apps', icon: '🅰️' },
          { id: 'svelte', label: 'Svelte', description: 'Svelte applications', icon: '🔥' }
        ],
        validation: (value) => value.length === 1,
        errorMessage: 'Please select a framework',
        singleSelect: true
      }
    ]
  }
];