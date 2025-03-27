import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import i18n from '../i18n';

interface LanguageState {
  language: string;
  setLanguage: (lang: string) => Promise<void>;
}

export const useLanguageStore = create<LanguageState>()(
  persist(
    (set) => ({
      language: i18n.language || 'en',
      setLanguage: async (lang: string) => {
        // Load translations dynamically
        const translations = await import(`../translations/${lang}.json`);
        i18n.addResourceBundle(lang, 'common', translations.default);
        i18n.changeLanguage(lang);
        set({ language: lang });
      }
    }),
    {
      name: 'language-storage',
      partialize: (state) => ({ language: state.language })
    }
  )
);