import { create } from "zustand"
import axios from "axios"

interface LeaderboardAchievements {
  most_staked: { name: string; value: string }
  highest_earnings: { name: string; value: string }
  longest_stake: { name: string; value: string }
  most_referrals: { name: string; value: string }
}

interface TopStaker {
  name: string
  total_staked: string
  user_plan: string
  rank: string
}

interface LeaderboardState {
  achievements: LeaderboardAchievements | null
  topStakers: TopStaker[]
  loading: boolean
  error: string | null
  fetchLeaderboardData: () => Promise<void>
}

export const useLeaderboardStore = create<LeaderboardState>((set) => ({
  achievements: null,
  topStakers: [],
  loading: false,
  error: null,

  fetchLeaderboardData: async () => {
    set({ loading: true, error: null })
    try {
      const token = localStorage.getItem("auth-token")
      if (!token) {
        console.log("No auth token found")
        throw new Error("No auth token found")
      }

      // Fetch leaderboard achievements
      const achievementsResponse = await axios.get("https://app.starkord.com/api/investment/leaderboard.php", {
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
          Authorization: "Bearer a7bX9c2dE5fg1h8i",
        },
      })

      // Fetch top stakers
      const stakersResponse = await axios.get("https://app.starkord.com/api/investment/top-stakers.php", {
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
          Authorization: "Bearer a7bX9c2dE5fg1h8i",
        },
      })

      if (achievementsResponse.status !== 200 || stakersResponse.status !== 200) {
        throw new Error("Failed to fetch leaderboard data")
      }

      const achievementsData = achievementsResponse.data
      const stakersData = stakersResponse.data

      if (achievementsData.status === "success" && stakersData.status === "success") {
        set({
          achievements: achievementsData.leaderboard,
          topStakers: stakersData.data,
        })
      } else {
        throw new Error("API returned unsuccessful status")
      }
    } catch (error) {
      console.error("Fetch leaderboard error:", error)
      if (axios.isAxiosError(error) && error.response) {
        set({ error: error.response.data })
      } else {
        set({ error: String(error) })
      }
    } finally {
      set({ loading: false })
    }
  },
}))

