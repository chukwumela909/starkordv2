import React from 'react';
import { motion } from 'framer-motion';
import { useNotificationStore } from '../store/notificationStore';
import {
  MessageSquare,
  Send,
  HelpCircle,
  Book,
  FileText,
  ExternalLink
} from 'lucide-react';

export function Support() {
  const [message, setMessage] = React.useState('');
  const [loading, setLoading] = React.useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!message.trim()) return;

    setLoading(true);
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      useNotificationStore.getState().addNotification({
        type: 'success',
        title: 'Message Sent',
        message: 'Our support team will respond to your inquiry soon.',
        duration: 5000
      });
      
      setMessage('');
    } catch (error) {
      useNotificationStore.getState().addNotification({
        type: 'error',
        title: 'Failed to Send',
        message: 'Please try again later.',
        duration: 5000
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="grid md:grid-cols-2 gap-8"
    >
      {/* Support Form */}
      <div className="bg-slate-800/50 backdrop-blur-xl rounded-xl border border-slate-700/50 p-6">
        <h2 className="text-2xl font-bold mb-6">Contact Support</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-2">
              How can we help?
            </label>
            <textarea
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              rows={4}
              className="w-full bg-slate-900/50 border border-slate-700 rounded-lg p-4 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="Describe your issue or question..."
            />
          </div>
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            type="submit"
            disabled={loading || !message.trim()}
            className="w-full px-6 py-3 bg-blue-500 hover:bg-blue-600 text-white rounded-lg flex items-center justify-center space-x-2 transition-colors disabled:opacity-50"
          >
            {loading ? (
              <>
                <MessageSquare className="w-5 h-5 animate-pulse" />
                <span>Sending...</span>
              </>
            ) : (
              <>
                <Send className="w-5 h-5" />
                <span>Send Message</span>
              </>
            )}
          </motion.button>
        </form>
      </div>

      {/* Help Resources */}
      <div className="bg-slate-800/50 backdrop-blur-xl rounded-xl border border-slate-700/50 p-6">
        <h2 className="text-2xl font-bold mb-6">Help Resources</h2>
        <div className="space-y-4">
          <a
            href="#"
            className="block p-4 bg-slate-900/50 border border-slate-700 rounded-lg hover:border-blue-500/50 transition-colors"
          >
            <div className="flex items-center space-x-3">
              <div className="bg-blue-500/20 p-2 rounded-lg">
                <Book className="w-5 h-5 text-blue-400" />
              </div>
              <div>
                <h3 className="font-medium">Documentation</h3>
                <p className="text-sm text-slate-400">
                  Learn about staking plans and features
                </p>
              </div>
              <ExternalLink className="w-4 h-4 text-slate-400 ml-auto" />
            </div>
          </a>

          <a
            href="#"
            className="block p-4 bg-slate-900/50 border border-slate-700 rounded-lg hover:border-purple-500/50 transition-colors"
          >
            <div className="flex items-center space-x-3">
              <div className="bg-purple-500/20 p-2 rounded-lg">
                <HelpCircle className="w-5 h-5 text-purple-400" />
              </div>
              <div>
                <h3 className="font-medium">FAQ</h3>
                <p className="text-sm text-slate-400">
                  Common questions and answers
                </p>
              </div>
              <ExternalLink className="w-4 h-4 text-slate-400 ml-auto" />
            </div>
          </a>

          <a
            href="#"
            className="block p-4 bg-slate-900/50 border border-slate-700 rounded-lg hover:border-green-500/50 transition-colors"
          >
            <div className="flex items-center space-x-3">
              <div className="bg-green-500/20 p-2 rounded-lg">
                <FileText className="w-5 h-5 text-green-400" />
              </div>
              <div>
                <h3 className="font-medium">Guides</h3>
                <p className="text-sm text-slate-400">
                  Step-by-step tutorials and guides
                </p>
              </div>
              <ExternalLink className="w-4 h-4 text-slate-400 ml-auto" />
            </div>
          </a>
        </div>
      </div>
    </motion.div>
  );
}