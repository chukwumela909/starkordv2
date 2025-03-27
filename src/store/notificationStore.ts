import { create } from 'zustand';

export type NotificationType = 'success' | 'error' | 'info' | 'warning';

export interface Notification {
  id: string;
  type: NotificationType;
  title: string;
  message: string;
  timestamp: number;
  duration?: number;
  actionLabel?: string;
  onAction?: () => void;
}

interface NotificationState {
  notifications: Notification[];
  addNotification: (notification: Omit<Notification, 'id' | 'timestamp'>) => void;
  removeNotification: (id: string) => void;
  clearNotifications: () => void;
}

export const useNotificationStore = create<NotificationState>((set) => ({
  notifications: [],
  
  addNotification: (notification) => {
    const id = Math.random().toString(36).substring(2);
    const timestamp = Date.now();
    
    set((state) => ({
      notifications: [
        ...state.notifications,
        { ...notification, id, timestamp }
      ]
    }));

    // Auto-remove notification after duration (default: 5000ms)
    if (notification.duration !== 0) {
      setTimeout(() => {
        set((state) => ({
          notifications: state.notifications.filter((n) => n.id !== id)
        }));
      }, notification.duration || 5000);
    }
  },

  removeNotification: (id) => {
    set((state) => ({
      notifications: state.notifications.filter((n) => n.id !== id)
    }));
  },

  clearNotifications: () => {
    set({ notifications: [] });
  }
}));