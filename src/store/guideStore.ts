import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface GuideState {
  hasSeenGuide: boolean;
  currentStep: number;
  isGuideActive: boolean;
  setHasSeenGuide: (value: boolean) => void;
  setCurrentStep: (step: number) => void;
  setGuideActive: (active: boolean) => void;
  resetGuide: () => void;
  completedSteps: string[];
  markStepComplete: (stepId: string) => void;
  isStepComplete: (stepId: string) => boolean;
}

export const useGuideStore = create<GuideState>()(
  persist(
    (set, get) => ({
      hasSeenGuide: false,
      currentStep: 0,
      isGuideActive: false,
      completedSteps: [],
      setHasSeenGuide: (value) => set({ hasSeenGuide: value }),
      setCurrentStep: (step) => set({ currentStep: step }),
      setGuideActive: (active) => set({ isGuideActive: active }),
      resetGuide: () => set({
        hasSeenGuide: false,
        currentStep: 0,
        isGuideActive: false,
        completedSteps: []
      }),
      markStepComplete: (stepId) => set(state => ({
        completedSteps: [...state.completedSteps, stepId]
      })),
      isStepComplete: (stepId) => get().completedSteps.includes(stepId)
    }),
    {
      name: 'guide-storage',
      partialize: (state) => ({
        hasSeenGuide: state.hasSeenGuide,
        completedSteps: state.completedSteps,
        currentStep: state.currentStep
      })
    }
  )
);