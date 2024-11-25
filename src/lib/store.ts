import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { generatePrompt } from './utils';
import { AI_MODELS } from './aiModels';

export interface PromptState {
  selectedModel: string | null;
  personality: string[];
  expertise: string[];
  communication: string[];
  constraints: string[];
  outputPreferences: string[];
  modelSpecific: Record<string, string[]>;
  savedPrompts: Array<{
    id: string;
    name: string;
    prompt: PromptState;
    createdAt: number;
  }>;
}

interface PromptStore {
  formData: PromptState;
  currentStep: number;
  setCurrentStep: (step: number) => void;
  updateField: (field: keyof PromptState, value: any) => void;
  setSelectedModel: (modelId: string | null) => void;
  updateModelField: (field: string, value: string[]) => void;
  resetForm: () => void;
  savePrompt: (name: string) => void;
  deletePrompt: (id: string) => void;
  loadPrompt: (id: string) => void;
  exportPrompt: () => string;
  importPrompt: (data: string) => void;
}

const initialState: PromptState = {
  selectedModel: null,
  personality: [],
  expertise: [],
  communication: [],
  constraints: [],
  outputPreferences: [],
  modelSpecific: {},
  savedPrompts: []
};

export const usePromptStore = create<PromptStore>()(
  persist(
    (set, get) => ({
      formData: initialState,
      currentStep: 1,
      setCurrentStep: (step) => set({ currentStep: step }),
      updateField: (field, value) =>
        set((state) => ({
          formData: { ...state.formData, [field]: value }
        })),
      setSelectedModel: (modelId) =>
        set((state) => ({
          formData: { 
            ...state.formData, 
            selectedModel: modelId,
            modelSpecific: {} // Reset model-specific fields
          },
          currentStep: 1
        })),
      updateModelField: (field, value) =>
        set((state) => ({
          formData: {
            ...state.formData,
            modelSpecific: {
              ...state.formData.modelSpecific,
              [field]: value
            }
          }
        })),
      resetForm: () => set({ formData: initialState, currentStep: 1 }),
      savePrompt: (name) => set((state) => ({
        formData: {
          ...state.formData,
          savedPrompts: [
            ...state.formData.savedPrompts,
            {
              id: crypto.randomUUID(),
              name,
              prompt: { ...state.formData },
              createdAt: Date.now()
            }
          ]
        }
      })),
      deletePrompt: (id) => set((state) => ({
        formData: {
          ...state.formData,
          savedPrompts: state.formData.savedPrompts.filter((p) => p.id !== id)
        }
      })),
      loadPrompt: (id) => {
        const prompt = get().formData.savedPrompts.find((p) => p.id === id);
        if (prompt) {
          set({ formData: { ...prompt.prompt }, currentStep: 1 });
        }
      },
      exportPrompt: () => {
        const { formData } = get();
        return JSON.stringify({
          prompt: formData,
          generatedPrompt: generatePrompt(formData),
          exportedAt: new Date().toISOString()
        });
      },
      importPrompt: (data) => {
        try {
          const parsed = JSON.parse(data);
          if (parsed.prompt) {
            set({ formData: parsed.prompt, currentStep: 1 });
          }
        } catch (error) {
          console.error('Failed to import prompt:', error);
        }
      }
    }),
    {
      name: 'prompt-storage',
      version: 1
    }
  )
);