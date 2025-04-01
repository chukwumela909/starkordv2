"use client"

// Import userStore instead of authStore
import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import axios from "axios"
import { useUserStore } from "../store/userStore"
import { useNotificationStore } from "../store/notificationStore"
import { User, Calendar, Edit2, Save, X, Shield, CheckCircle2, Eye, EyeOff, Lock, MapPin, Phone } from "lucide-react"

export function Profile() {
  // Use userStore instead of authStore
  const { user, fetchUserData } = useUserStore()
  const [isEditing, setIsEditing] = useState(false)
  const [loading, setLoading] = useState(false)
  const [profile, setProfile] = useState({
    name: "",
    phone: "",
    country: "",
  })

  // Password change state
  const [showPasswordModal, setShowPasswordModal] = useState(false)
  const [passwordData, setPasswordData] = useState({
    newPassword: "",
    confirmPassword: "",
  })
  const [showPassword, setShowPassword] = useState({
    new: false,
    confirm: false,
  })
  const [passwordLoading, setPasswordLoading] = useState(false)
  const [passwordError, setPasswordError] = useState("")

  useEffect(() => {
    fetchUserData();
    if (user) {
      setProfile({
        name: user.name || "",
        phone: user.phone || "",
        country: user.country || "",
      })
    }
  }, [user,fetchUserData])

  const handleSave = async () => {
    if (!profile.name.trim()) {
      useNotificationStore.getState().addNotification({
        type: "error",
        title: "Validation Error",
        message: "Please enter your name",
        duration: 5000,
      })
      return
    }

    try {
      setLoading(true)

      // Get token from localStorage
      const token = localStorage.getItem("auth-token")
      console.log(token)
      if (!token) {
        console.log("No auth token found")
        throw new Error("No auth token found")
      }

      const response = await axios.post(
        "https://app.starkord.com/api/auth/update-profile.php",
        {
          token: token,
          name: profile.name.trim(),
        },
        {
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
            Authorization: "Bearer a7bX9c2dE5fg1h8i",
          },
        },
      )

      if (response.status !== 200) {
        throw new Error("Failed to update profile")
      }

      // Refresh user data
      await fetchUserData()

      useNotificationStore.getState().addNotification({
        type: "success",
        title: "Profile Updated",
        message: "Your profile has been updated successfully.",
        duration: 5000,
      })

      setIsEditing(false)
    } catch (error) {
      console.error("Error updating profile:", error)
      useNotificationStore.getState().addNotification({
        type: "error",
        title: "Update Failed",
        message: "Failed to update profile. Please try again.",
        duration: 5000,
      })
    } finally {
      setLoading(false)
    }
  }

  const handleChangePassword = async () => {
    // Reset error
    setPasswordError("")

    // Validate passwords
    if ( !passwordData.newPassword || !passwordData.confirmPassword) {
      setPasswordError("All password fields are required")
      return
    }

    if (passwordData.newPassword !== passwordData.confirmPassword) {
      setPasswordError("New passwords do not match")
      return
    }

    if (passwordData.newPassword.length < 8) {
      setPasswordError("Password must be at least 8 characters long")
      return
    }

    try {
      setPasswordLoading(true)

      // Get token from localStorage
      const token = localStorage.getItem("auth-token")
      if (!token) {
        throw new Error("No auth token found")
      }

      const response = await axios.post(
        "https://app.starkord.com/api/auth/update-profile.php",
        {
          token: token,
          password: passwordData.newPassword,
        },
        {
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
            Authorization: "Bearer a7bX9c2dE5fg1h8i",
          },
        },
      )

      if (response.status !== 200) {
        throw new Error("Failed to change password")
      }

      // Reset form and close modal
      setPasswordData({
        newPassword: "",
        confirmPassword: "",
      })
      setShowPasswordModal(false)

      useNotificationStore.getState().addNotification({
        type: "success",
        title: "Password Updated",
        message: "Your password has been changed successfully.",
        duration: 5000,
      })
    } catch (error) {
      console.error("Error changing password:", error)
      setPasswordError(String(error))
    } finally {
      setPasswordLoading(false)
    }
  }

  if (loading && !user) {
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
    )
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="w-full md:w-3/4 mx-auto bg-slate-800/50 backdrop-blur-xl rounded-xl p-6 border border-slate-700/50"
    >
      <div className="flex flex-col md:flex-row md:items-center justify-between mb-6 gap-4">
        <h2 className="text-xl font-bold">Profile</h2>
        <div className="flex flex-col sm:flex-row gap-3">
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => setShowPasswordModal(true)}
            className="px-4 py-2 bg-purple-500 hover:bg-purple-600 text-white rounded-lg flex items-center justify-center space-x-2 text-sm transition-colors"
          >
            <Lock className="w-4 h-4" />
            <span>Change Password</span>
          </motion.button>

          {!isEditing ? (
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => setIsEditing(true)}
              className="px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded-lg flex items-center justify-center space-x-2 text-sm transition-colors"
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
                className="px-4 py-2 bg-green-500 hover:bg-green-600 text-white rounded-lg flex items-center justify-center space-x-2 text-sm transition-colors disabled:opacity-50"
              >
                <Save className="w-4 h-4" />
                <span>{loading ? "Saving..." : "Save"}</span>
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => {
                  setIsEditing(false)
                  // Reset form to current user data
                  if (user) {
                    setProfile({
                      name: user.name || "",
                      phone: user.phone || "",
                      country: user.country || "",
                    })
                  }
                }}
                disabled={loading}
                className="px-4 py-2 bg-slate-700 hover:bg-slate-600 text-white rounded-lg flex items-center justify-center space-x-2 text-sm transition-colors"
              >
                <X className="w-4 h-4" />
                <span>Cancel</span>
              </motion.button>
            </div>
          )}
        </div>
      </div>

      <div className="grid gap-6">
        <div className="flex items-center space-x-4">
          <div className="bg-blue-500/20 p-3 rounded-lg">
            <User className="w-6 h-6 text-blue-400" />
          </div>
          <div className="flex-1">
            <label className="block text-sm font-medium text-slate-400 mb-1">Full Name</label>
            {isEditing ? (
              <input
                type="text"
                value={profile.name}
                onChange={(e) => setProfile({ ...profile, name: e.target.value })}
                className="w-full bg-slate-900/50 border border-slate-700 rounded-lg py-2 px-4 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="Enter your full name"
                maxLength={50}
                required
              />
            ) : (
              <p className="text-lg font-medium">{profile.name || "Not set"}</p>
            )}
          </div>
        </div>

        <div className="flex items-center space-x-4">
          <div className="bg-green-500/20 p-3 rounded-lg">
            <Phone className="w-6 h-6 text-green-400" />
          </div>
          <div className="flex-1">
            <label className="block text-sm font-medium text-slate-400 mb-1">Phone Number</label>
            <p className="text-lg font-medium flex items-center space-x-2">
              <span>{profile.phone || "Not set"}</span>
              {profile.phone && <CheckCircle2 className="w-4 h-4 text-green-400" />}
            </p>
          </div>
        </div>

        <div className="flex items-center space-x-4">
          <div className="bg-amber-500/20 p-3 rounded-lg">
            <MapPin className="w-6 h-6 text-amber-400" />
          </div>
          <div className="flex-1">
            <label className="block text-sm font-medium text-slate-400 mb-1">Country</label>
            <p className="text-lg font-medium">{profile.country || "Not set"}</p>
          </div>
        </div>

        <div className="flex items-center space-x-4">
          <div className="bg-green-500/20 p-3 rounded-lg">
            <Calendar className="w-6 h-6 text-green-400" />
          </div>
          <div className="flex-1">
            <label className="block text-sm font-medium text-slate-400 mb-1">Member Since</label>
            <p className="text-lg font-medium">
              {user?.created_at ? new Date(user.created_at).toLocaleDateString() : "Not available"}
            </p>
          </div>
        </div>
      </div>

      {/* Password Change Modal */}
      {showPasswordModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div
            className="absolute inset-0 bg-black/60 backdrop-blur-sm"
            onClick={() => setShowPasswordModal(false)}
          ></div>
          <div className="relative bg-slate-800 rounded-xl border border-slate-700 p-6 w-full max-w-md shadow-xl">
            <div className="absolute top-4 right-4">
              <button
                onClick={() => setShowPasswordModal(false)}
                className="text-slate-400 hover:text-white transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="flex items-center space-x-4 text-purple-400 mb-6">
              <Shield className="w-8 h-8" />
              <h3 className="text-xl font-bold">Change Password</h3>
            </div>

            <div className="space-y-4">
              {/* <div>
                <label htmlFor="currentPassword" className="block text-sm font-medium mb-2">
                  Current Password
                </label>
                <div className="relative">
                  <input
                    type={showPassword.current ? "text" : "password"}
                    id="currentPassword"
                    value={passwordData.currentPassword}
                    onChange={(e) => setPasswordData({ ...passwordData, currentPassword: e.target.value })}
                    className="w-full bg-slate-900/50 border border-slate-700 rounded-lg py-2 px-4 pr-10 focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                    placeholder="Enter current password"
                  />
                  <button
                    type="button"
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-white"
                    onClick={() => setShowPassword({ ...showPassword, current: !showPassword.current })}
                  >
                    {showPassword.current ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
              </div> */}

              <div>
                <label htmlFor="newPassword" className="block text-sm font-medium mb-2">
                  New Password
                </label>
                <div className="relative">
                  <input
                    type={showPassword.new ? "text" : "password"}
                    id="newPassword"
                    value={passwordData.newPassword}
                    onChange={(e) => setPasswordData({ ...passwordData, newPassword: e.target.value })}
                    className="w-full bg-slate-900/50 border border-slate-700 rounded-lg py-2 px-4 pr-10 focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                    placeholder="Enter new password"
                  />
                  <button
                    type="button"
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-white"
                    onClick={() => setShowPassword({ ...showPassword, new: !showPassword.new })}
                  >
                    {showPassword.new ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
              </div>

              <div>
                <label htmlFor="confirmPassword" className="block text-sm font-medium mb-2">
                  Confirm New Password
                </label>
                <div className="relative">
                  <input
                    type={showPassword.confirm ? "text" : "password"}
                    id="confirmPassword"
                    value={passwordData.confirmPassword}
                    onChange={(e) => setPasswordData({ ...passwordData, confirmPassword: e.target.value })}
                    className="w-full bg-slate-900/50 border border-slate-700 rounded-lg py-2 px-4 pr-10 focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                    placeholder="Confirm new password"
                  />
                  <button
                    type="button"
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-white"
                    onClick={() => setShowPassword({ ...showPassword, confirm: !showPassword.confirm })}
                  >
                    {showPassword.confirm ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
              </div>

              {passwordError && (
                <div className="bg-red-500/10 border border-red-500/20 rounded-lg p-3 text-sm text-red-400">
                  {passwordError}
                </div>
              )}

              <div className="flex space-x-3 pt-4">
                <motion.button
                  type="button"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => setShowPasswordModal(false)}
                  className="flex-1 px-4 py-2 bg-slate-700 hover:bg-slate-600 text-white rounded-lg transition-colors"
                >
                  Cancel
                </motion.button>
                <motion.button
                  type="button"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={handleChangePassword}
                  disabled={passwordLoading}
                  className="flex-1 px-4 py-2 bg-purple-500 hover:bg-purple-600 text-white rounded-lg transition-colors disabled:opacity-50"
                >
                  {passwordLoading ? "Processing..." : "Change Password"}
                </motion.button>
              </div>
            </div>
          </div>
        </div>
      )}
    </motion.div>
  )
}

