import { create } from 'zustand';


interface Achievement {
  id: string;
  title: string;
  description: string;
  icon: string;
  unlockedAt?: string;
}

interface SocialState {
  achievements: Achievement[];
  loading: boolean;
  error: string | null;
  fetchAchievements: () => Promise<void>;
  unlockAchievement: (achievementId: string) => Promise<void>;
  shareAchievement: (achievementId: string, platform: string) => Promise<void>;
}

export const useSocialStore = create<SocialState>((set, get) => ({
  achievements: [],
  loading: false,
  error: null,

  fetchAchievements: async () => {
    set({ loading: true, error: null });
    
  },

  unlockAchievement: async (achievementId: string) => {
    set({ loading: true, error: null });
    try {
      const achievements = get().achievements.map(a =>
        a.id === achievementId
          ? { ...a, unlockedAt: new Date().toISOString() }
          : a
      );
      set({ achievements });
    } catch (error) {
      set({ error: 'Failed to unlock achievement' });
      throw error;
    } finally {
      set({ loading: false });
    }
  },

  shareAchievement: async (achievementId: string, platform: string) => {
    set({ loading: true, error: null });
    try {
      const achievement = get().achievements.find(a => a.id === achievementId);
      if (!achievement) throw new Error('Achievement not found');

      // Share achievement to social platform
      console.log(`Sharing achievement ${achievement.title} to ${platform}`);
    } catch (error) {
      set({ error: 'Failed to share achievement' });
      throw error;
    } finally {
      set({ loading: false });
    }
  }
}));