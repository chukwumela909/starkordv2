import { create } from "zustand"
import axios from "axios"

export interface Plan {
    id: string
    name: string
    min_amount: string
    max_amount: string
    dpy: string
    lock_period_days: string
    icon: string
    color: string
    description: string
    description_2: string
    description_3: string
    bonus_note: string
    restake: string
    penalty: string
    created_at: string
}

interface InvestmentState {
    plans: Plan[]
    loading: boolean
    error: string | null
    fetchPlans: () => Promise<void>
}

export const useInvestmentStore = create<InvestmentState>((set) => ({
    plans: [],
    loading: false,
    error: null,

    fetchPlans: async () => {
        set({ loading: true, error: null })
        try {
            const token = localStorage.getItem("auth-token")

            const headers: Record<string, string> = {
                "Content-Type": "application/json",
                Accept: "application/json",
                Authorization: "Bearer a7bX9c2dE5fg1h8i",
            }

            if (token) {
                headers["Authorization"] = `Bearer ${token}`
            }

            const response = await axios.get("https://app.starkord.com/api/investment/plans.php", {
                headers,
            })

            if (response.status !== 200) {
                throw new Error("Failed to fetch plans data")
            }
            console.log(response.data);
            set({ plans: response.data, loading: false })
        } catch (error) {
            console.error("Fetch plans error:", error)
            if (axios.isAxiosError(error) && error.response) {
                set({ error: error.response.data, loading: false })
            } else {
                set({ error: String(error), loading: false })
            }
        }
    },
}))

