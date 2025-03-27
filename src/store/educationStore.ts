import { create } from 'zustand';


interface Tutorial {
  id: string;
  title: string;
  description: string;
  content: string;
  difficulty: 'beginner' | 'intermediate' | 'advanced';
  category: string;
  videoUrl?: string;
  completed?: boolean;
}

interface EducationState {
  tutorials: Tutorial[];
  completedTutorials: string[];
  loading: boolean;
  error: string | null;
  fetchTutorials: () => Promise<void>;
  markTutorialComplete: (tutorialId: string) => Promise<void>;
  resetProgress: () => Promise<void>;
}

export const useEducationStore = create<EducationState>((set, get) => ({
  tutorials: [],
  completedTutorials: [],
  loading: false,
  error: null,

  fetchTutorials: async () => {
    set({ loading: true, error: null });
    try {
    
    
    } catch (error) {
      set({ error: 'Failed to fetch tutorials' });
      throw error;
    } finally {
      set({ loading: false });
    }
  },

  markTutorialComplete: async (tutorialId: string) => {
    set({ loading: true, error: null });
    try {
      const completed = [...get().completedTutorials, tutorialId];
      set({ completedTutorials: completed });
    } catch (error) {
      set({ error: 'Failed to mark tutorial as complete' });
      throw error;
    } finally {
      set({ loading: false });
    }
  },

  resetProgress: async () => {
    set({ loading: true, error: null });
    try {
      set({ completedTutorials: [] });
    } catch (error) {
      set({ error: 'Failed to reset progress' });
      throw error;
    } finally {
      set({ loading: false });
    }
  }
}));