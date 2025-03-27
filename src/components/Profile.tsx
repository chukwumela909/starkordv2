import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useAuthStore } from '../store/authStore';
import { useNotificationStore } from '../store/notificationStore';
import {
  User,
  Mail,
  Calendar,
  Edit2,
  Save,
  X,
  Shield,
  CheckCircle2
} from 'lucide-react';

export function Profile() {
  const { user } = useAuthStore();
  const [isEditing, setIsEditing] = useState(false);
  const [loading, setLoading] = useState(false);
  const [profile, setProfile] = useState({
    full_name: '',
    email: user?.phone || '',
    created_at: new Date().toISOString()
  });

  React.useEffect(() => {
    const fetchProfile = async () => {
    
        setLoading(true);
      

     
    };

    if (user) {
      fetchProfile();
    }
  }, [user]);

  const handleSave = async () => {
    if (!profile.full_name.trim()) {
      useNotificationStore.getState().addNotification({
        type: 'error',
        title: 'Validation Error',
        message: 'Please enter your full name',
        duration: 5000
      });
      return;
    }

    
  };

  if (loading && !profile.email) {
    return (
      <div className="bg-slate-800/50 backdrop-blur-xl rounded-xl p-6 border border-slate-700/50">
        <div className="animate-pulse space-y-4">
          <div className="h-8 bg-slate-700/50 rounded w-1/4"></div>
          <div className="space-y-3">
            <div className="h-4 bg-slate-700/50 rounded w-3/4"></div>
            <div className="h-4 bg-slate-700/50 rounded w-1/2"></div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-slate-800/50 backdrop-blur-xl rounded-xl p-6 border border-slate-700/50"
    >
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-bold">Profile</h2>
        {!isEditing ? (
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => setIsEditing(true)}
            className="px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded-lg flex items-center space-x-2 text-sm transition-colors"
          >
            <Edit2 className="w-4 h-4" />
            <span>Edit Profile</span>
          </motion.button>
        ) : (
          <div className="flex items-center space-x-2">
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={handleSave}
              disabled={loading}
              className="px-4 py-2 bg-green-500 hover:bg-green-600 text-white rounded-lg flex items-center space-x-2 text-sm transition-colors disabled:opacity-50"
            >
              <Save className="w-4 h-4" />
              <span>{loading ? 'Saving...' : 'Save'}</span>
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => setIsEditing(false)}
              disabled={loading}
              className="px-4 py-2 bg-slate-700 hover:bg-slate-600 text-white rounded-lg flex items-center space-x-2 text-sm transition-colors"
            >
              <X className="w-4 h-4" />
              <span>Cancel</span>
            </motion.button>
          </div>
        )}
      </div>

      <div className="grid gap-6">
        <div className="flex items-center space-x-4">
          <div className="bg-blue-500/20 p-3 rounded-lg">
            <User className="w-6 h-6 text-blue-400" />
          </div>
          <div className="flex-1">
            <label className="block text-sm font-medium text-slate-400 mb-1">
              Full Name
            </label>
            {isEditing ? (
              <input
                type="text"
                value={profile.full_name}
                onChange={(e) => setProfile({ ...profile, full_name: e.target.value })}
                className="w-full bg-slate-900/50 border border-slate-700 rounded-lg py-2 px-4 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="Enter your full name"
                maxLength={50}
                required
              />
            ) : (
              <p className="text-lg font-medium">
                {profile.full_name || 'Not set'}
              </p>
            )}
          </div>
        </div>

        <div className="flex items-center space-x-4">
          <div className="bg-purple-500/20 p-3 rounded-lg">
            <Mail className="w-6 h-6 text-purple-400" />
          </div>
          <div className="flex-1">
            <label className="block text-sm font-medium text-slate-400 mb-1">
              Email Address
            </label>
            <p className="text-lg font-medium flex items-center space-x-2">
              <span>{profile.email}</span>
              <CheckCircle2 className="w-4 h-4 text-green-400"  />
            </p>
          </div>
        </div>

        <div className="flex items-center space-x-4">
          <div className="bg-green-500/20 p-3 rounded-lg">
            <Calendar className="w-6 h-6 text-green-400" />
          </div>
          <div className="flex-1">
            <label className="block text-sm font-medium text-slate-400 mb-1">
              Member Since
            </label>
            <p className="text-lg font-medium">
              {new Date(profile.created_at).toLocaleDateString()}
            </p>
          </div>
        </div>

        <div className="flex items-center space-x-4">
          <div className="bg-amber-500/20 p-3 rounded-lg">
            <Shield className="w-6 h-6 text-amber-400" />
          </div>
          <div className="flex-1">
            <label className="block text-sm font-medium text-slate-400 mb-1">
              Security Status
            </label>
            <div className="flex items-center space-x-2">
              <span className="text-lg font-medium">2FA Disabled</span>
              <button className="text-sm text-blue-400 hover:text-blue-300 transition-colors">
                Enable
              </button>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}