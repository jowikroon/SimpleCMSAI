import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface Keyword {
  id: string;
  term: string;
  position: number;
  change: number;
  volume: number;
}

interface KeywordState {
  keywords: Keyword[];
  addKeyword: (term: string) => void;
  removeKeyword: (id: string) => void;
  updateKeyword: (id: string, data: Partial<Keyword>) => void;
}

export const useKeywordStore = create<KeywordState>()(
  persist(
    (set) => ({
      keywords: [],
      addKeyword: (term) => set((state) => ({
        keywords: [
          ...state.keywords,
          {
            id: crypto.randomUUID(),
            term,
            position: Math.floor(Math.random() * 100) + 1,
            change: Math.floor(Math.random() * 21) - 10,
            volume: Math.floor(Math.random() * 10000)
          }
        ]
      })),
      removeKeyword: (id) => set((state) => ({
        keywords: state.keywords.filter((k) => k.id !== id)
      })),
      updateKeyword: (id, data) => set((state) => ({
        keywords: state.keywords.map((k) => 
          k.id === id ? { ...k, ...data } : k
        )
      }))
    }),
    {
      name: 'keyword-storage'
    }
  )
);