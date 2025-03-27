
import { motion, AnimatePresence } from 'framer-motion';
import { useNotificationStore } from '../store/notificationStore';
import {
  CheckCircle2,
  XCircle,
  AlertCircle,
  AlertTriangle,
  X,
  ArrowRight
} from 'lucide-react';

export function Notifications() {
  const { notifications, removeNotification } = useNotificationStore();

  const getIcon = (type: string) => {
    switch (type) {
      case 'success':
        return <CheckCircle2 className="w-5 h-5 text-green-400" />;
      case 'error':
        return <XCircle className="w-5 h-5 text-red-400" />;
      case 'warning':
        return <AlertTriangle className="w-5 h-5 text-amber-400" />;
      default:
        return <AlertCircle className="w-5 h-5 text-blue-400" />;
    }
  };

  const getBackgroundColor = (type: string) => {
    switch (type) {
      case 'success':
        return 'bg-green-500/10 border-green-500/20';
      case 'error':
        return 'bg-red-500/10 border-red-500/20';
      case 'warning':
        return 'bg-amber-500/10 border-amber-500/20';
      default:
        return 'bg-blue-500/10 border-blue-500/20';
    }
  };

  return (
    <div className="fixed bottom-4 right-4 z-50 flex flex-col gap-2 max-w-sm">
      <AnimatePresence>
        {notifications.map((notification) => (
          <motion.div
            key={notification.id}
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            className={`${getBackgroundColor(notification.type)} backdrop-blur-xl rounded-lg border p-4 shadow-lg`}
          >
            <div className="flex items-start gap-3">
              {getIcon(notification.type)}
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium">{notification.title}</p>
                <p className="text-sm text-slate-400 mt-1">{notification.message}</p>
                {notification.actionLabel && (
                  <button
                    onClick={notification.onAction}
                    className="mt-2 text-sm text-blue-400 hover:text-blue-300 flex items-center space-x-1 transition-colors"
                  >
                    <span>{notification.actionLabel}</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                )}
              </div>
              <button
                onClick={() => removeNotification(notification.id)}
                className="text-slate-400 hover:text-white transition-colors"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  );
}