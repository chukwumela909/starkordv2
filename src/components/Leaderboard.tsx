// import React from 'react';
// import { motion } from 'framer-motion';
// import { Trophy, Crown, Star, Target, Diamond, Award, TrendingUp, Users, Shield, Zap } from 'lucide-react';
// import { usePriceStore } from '../store/priceStore';

// interface LeaderboardEntry {
//   rank: number;
//   userId: string;
//   displayName: string;
//   avatar: string;
//   amount: number;
//   rewards: number;
//   plan: string;
//   achievement?: string;
//   badge?: string;
// }

// const DEMO_LEADERBOARD: LeaderboardEntry[] = [
//   {
//     rank: 1,
//     userId: '1',
//     displayName: 'CryptoWhale',
//     avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=100',
//     amount: 250.5,
//     rewards: 12.75,
//     plan: 'Legacy Protocol',
//     achievement: 'Diamond Hands',
//     badge: 'Elite Staker'
//   },
//   {
//     rank: 2,
//     userId: '2',
//     displayName: 'Stakemaster',
//     avatar: 'https://images.unsplash.com/photo-1633332755192-727a05c4013d?auto=format&fit=crop&w=100',
//     amount: 180.25,
//     rewards: 8.45,
//     plan: 'Elite Matrix',
//     achievement: 'Early Adopter',
//     badge: 'Top Earner'
//   },
//   {
//     rank: 3,
//     userId: '3',
//     displayName: 'BlockNinja',
//     avatar: 'https://images.unsplash.com/photo-1527980965255-d3b416303d12?auto=format&fit=crop&w=100',
//     amount: 145.8,
//     rewards: 6.92,
//     plan: 'Elite Matrix',
//     achievement: 'Consistent Staker',
//     badge: 'Rising Star'
//   },
//   {
//     rank: 4,
//     userId: '4',
//     displayName: 'YieldHunter',
//     avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&w=100',
//     amount: 120.4,
//     rewards: 5.85,
//     plan: 'Growth Nexus',
//     achievement: 'Yield Master'
//   },
//   {
//     rank: 5,
//     userId: '5',
//     displayName: 'CryptoSage',
//     avatar: 'https://images.unsplash.com/photo-1607746882042-944635dfe10e?auto=format&fit=crop&w=100',
//     amount: 95.6,
//     rewards: 4.25,
//     plan: 'Growth Nexus',
//     achievement: 'Smart Investor'
//   }
// ];

// const ACHIEVEMENTS = [
//   {
//     title: 'Most Staked',
//     icon: Trophy,
//     color: 'text-amber-400 bg-amber-400/20',
//     value: '250.5 ETH',
//     holder: 'CryptoWhale'
//   },
//   {
//     title: 'Highest Rewards',
//     icon: Star,
//     color: 'text-green-400 bg-green-400/20',
//     value: '12.75 ETH',
//     holder: 'CryptoWhale'
//   },
//   {
//     title: 'Longest Stake',
//     icon: Shield,
//     color: 'text-blue-400 bg-blue-400/20',
//     value: '180 days',
//     holder: 'Stakemaster'
//   },
//   {
//     title: 'Most Referrals',
//     icon: Users,
//     color: 'text-purple-400 bg-purple-400/20',
//     value: '28 users',
//     holder: 'BlockNinja'
//   }
// ];

// const COMPETITION_REWARDS = [
//   {
//     place: '1st',
//     rewards: {
//       eth: 2.5,
//       badge: 'Elite Champion',
//       perks: ['Exclusive NFT', 'VIP Discord Role', 'Priority Support']
//     },
//     color: 'text-amber-400'
//   },
//   {
//     place: '2nd',
//     rewards: {
//       eth: 1.5,
//       badge: 'Silver Elite',
//       perks: ['Limited NFT', 'Discord Role']
//     },
//     color: 'text-slate-300'
//   },
//   {
//     place: '3rd',
//     rewards: {
//       eth: 0.5,
//       badge: 'Bronze Elite',
//       perks: ['Discord Role']
//     },
//     color: 'text-amber-700'
//   }
// ];

// export function Leaderboard() {
//   const { ethPrice } = usePriceStore();

//   return (
//     <motion.div
//       initial={{ opacity: 0, y: 20 }}
//       animate={{ opacity: 1, y: 0 }}
//       className="space-y-8"
//     >
//       <div className="flex items-center justify-between">
//         <h2 className="text-2xl font-bold">Leaderboard</h2>
//         <div className="text-sm text-slate-400">
//           Updated hourly
//         </div>
//       </div>

//       {/* Achievement Cards */}
//       <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
//         {ACHIEVEMENTS.map((achievement, index) => (
//           <motion.div
//             key={index}
//             initial={{ opacity: 0, y: 20 }}
//             animate={{ opacity: 1, y: 0 }}
//             transition={{ delay: index * 0.1 }}
//             className="bg-slate-800/50 backdrop-blur-xl rounded-xl p-6 border border-slate-700/50"
//           >
//             <div className="flex items-start justify-between">
//               <div>
//                 <p className="text-sm font-medium text-slate-400">{achievement.title}</p>
//                 <p className="text-2xl font-bold mt-2">{achievement.value}</p>
//                 <p className="text-sm text-slate-400">Held by {achievement.holder}</p>
//               </div>
//               <div className={`p-2 rounded-lg ${achievement.color}`}>
//                 <achievement.icon className="w-6 h-6" />
//               </div>
//             </div>
//           </motion.div>
//         ))}
//       </div>

//       {/* Top Stakers */}
//       <div className="bg-slate-800/50 backdrop-blur-xl rounded-xl border border-slate-700/50 overflow-hidden">
//         <div className="p-6 border-b border-slate-700/50">
//           <h3 className="text-xl font-bold">Top Stakers</h3>
//         </div>

//         <div className="divide-y divide-slate-700/50">
//           {DEMO_LEADERBOARD.map((entry, index) => {
//             const stakedUSD = entry.amount * ethPrice;
//             const rewardsUSD = entry.rewards * ethPrice;

//             return (
//               <motion.div
//                 key={entry.userId}
//                 initial={{ opacity: 0, x: -20 }}
//                 animate={{ opacity: 1, x: 0 }}
//                 transition={{ delay: index * 0.1 }}
//                 className="p-6 hover:bg-slate-700/20 transition-colors"
//               >
//                 <div className="flex items-center justify-between">
//                   <div className="flex items-center space-x-4">
//                     <div className="flex items-center justify-center w-8 h-8">
//                       {entry.rank === 1 ? (
//                         <Crown className="w-6 h-6 text-amber-400" />
//                       ) : entry.rank === 2 ? (
//                         <Award className="w-6 h-6 text-slate-300" />
//                       ) : entry.rank === 3 ? (
//                         <Award className="w-6 h-6 text-amber-700" />
//                       ) : (
//                         <span className="text-xl font-bold text-slate-400">#{entry.rank}</span>
//                       )}
//                     </div>
//                     <img
//                       src={entry.avatar}
//                       alt={entry.displayName}
//                       className="w-10 h-10 rounded-full"
//                     />
//                     <div>
//                       <div className="flex items-center space-x-2">
//                         <span className="font-bold">{entry.displayName}</span>
//                         {entry.badge && (
//                           <span className="px-2 py-1 bg-blue-500/20 text-blue-400 text-xs rounded-full">
//                             {entry.badge}
//                           </span>
//                         )}
//                       </div>
//                       <div className="flex items-center space-x-2 text-sm text-slate-400">
//                         <span>{entry.plan}</span>
//                         {entry.achievement && (
//                           <>
//                             <span>•</span>
//                             <span className="flex items-center">
//                               <Diamond className="w-3 h-3 mr-1" />
//                               {entry.achievement}
//                             </span>
//                           </>
//                         )}
//                       </div>
//                     </div>
//                   </div>
//                   <div className="text-right">
//                     <div>
//                       <span className="font-bold">{entry.amount.toFixed(2)} ETH</span>
//                       <span className="text-sm text-slate-400 ml-2">≈ ${stakedUSD.toLocaleString()}</span>
//                     </div>
//                     <div className="text-sm text-green-400">
//                       +{entry.rewards.toFixed(2)} ETH
//                       <span className="text-green-500 ml-2">≈ ${rewardsUSD.toLocaleString()}</span>
//                     </div>
//                   </div>
//                 </div>
//               </motion.div>
//             );
//           })}
//         </div>
//       </div>

//       {/* Competition Info */}
//       <div className="bg-gradient-to-r from-blue-500/10 via-purple-500/10 to-blue-500/10 backdrop-blur-xl rounded-2xl p-8 border border-blue-500/20">
//         <div className="flex flex-col md:flex-row items-center justify-between gap-6">
//           <div>
//             <h3 className="text-xl font-bold mb-2">Monthly Staking Competition</h3>
//             <p className="text-slate-300">
//               Top 3 stakers this month will receive exclusive rewards and badges!
//             </p>
//           </div>
//           <div className="flex items-center space-x-6">
//             {COMPETITION_REWARDS.map((reward, index) => (
//               <div key={index} className="text-center">
//                 <div className={`text-2xl font-bold ${reward.color}`}>{reward.place}</div>
//                 <div className="text-lg font-bold text-green-400">
//                   +{reward.rewards.eth} ETH
//                   <div className="text-sm text-green-500">
//                     ≈ ${(reward.rewards.eth * ethPrice).toLocaleString()}
//                   </div>
//                 </div>
//                 <div className="text-sm font-medium mt-2">{reward.rewards.badge}</div>
//                 <div className="text-xs text-slate-400 mt-1">
//                   {reward.rewards.perks.map((perk, i) => (
//                     <div key={i}>{perk}</div>
//                   ))}
//                 </div>
//               </div>
//             ))}
//           </div>
//         </div>
//       </div>
//     </motion.div>
//   );
// }

"use client"

import { useEffect } from "react"
import { motion } from "framer-motion"
import { Trophy, Crown, Star, Diamond, Award, Users, Shield } from "lucide-react"
import { usePriceStore } from '../store/priceStore';
import { useLeaderboardStore } from "../store/leaderboardStore"

// Define placeholder avatar URLs for users without avatars
// const PLACEHOLDER_AVATARS = [
//   "https://via.placeholder.com/100?text=Avatar+1",
//   "https://via.placeholder.com/100?text=Avatar+2",
//   "https://via.placeholder.com/100?text=Avatar+3",
//   "https://via.placeholder.com/100?text=Avatar+4",
//   "https://via.placeholder.com/100?text=Avatar+5",
// ]

// Define badges based on rank
const BADGES = {
  "1": "Elite Staker",
  "2": "Top Earner",
  "3": "Rising Star",
}

// Define achievements based on rank
const RANK_ACHIEVEMENTS = {
  "1": "Diamond Hands",
  "2": "Early Adopter",
  "3": "Consistent Staker",
  "4": "Yield Master",
  "5": "Smart Investor",
}

const COMPETITION_REWARDS = [
  {
    place: "1st",
    rewards: {
      eth: 2.5,
      badge: "Elite Champion",
      perks: ["Exclusive NFT", "VIP Discord Role", "Priority Support"],
    },
    color: "text-amber-400",
  },
  {
    place: "2nd",
    rewards: {
      eth: 1.5,
      badge: "Silver Elite",
      perks: ["Limited NFT", "Discord Role"],
    },
    color: "text-slate-300",
  },
  {
    place: "3rd",
    rewards: {
      eth: 0.5,
      badge: "Bronze Elite",
      perks: ["Discord Role"],
    },
    color: "text-amber-700",
  },
]

export function Leaderboard() {
  const { ethPrice } = usePriceStore()
  const { achievements, topStakers, loading, error, fetchLeaderboardData } = useLeaderboardStore()

  useEffect(() => {
    fetchLeaderboardData()
    // usePriceStore.getState().fetchEthPrice()
  }, [fetchLeaderboardData])

  // Map achievements to the format expected by the UI
  const achievementCards = achievements
    ? [
      {
        title: "Most Staked",
        icon: Trophy,
        color: "text-amber-400 bg-amber-400/20",
        value: achievements.most_staked.value + " ETH",
        holder: achievements.most_staked.name,
      },
      {
        title: "Highest Rewards",
        icon: Star,
        color: "text-green-400 bg-green-400/20",
        value: achievements.highest_earnings.value + " ETH",
        holder: achievements.highest_earnings.name,
      },
      {
        title: "Longest Stake",
        icon: Shield,
        color: "text-blue-400 bg-blue-400/20",
        value: achievements.longest_stake.value + " days",
        holder: achievements.longest_stake.name,
      },
      {
        title: "Most Referrals",
        icon: Users,
        color: "text-purple-400 bg-purple-400/20",
        value: achievements.most_referrals.value + " users",
        holder: achievements.most_referrals.name,
      },
    ]
    : []

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="bg-red-500/20 text-red-400 p-4 rounded-xl">
        <p>Error loading leaderboard data. Please try again later.</p>
      </div>
    )
  }

  return (
    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="space-y-8">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold">Leaderboard</h2>
        <div className="text-sm text-slate-400">Updated hourly</div>
      </div>

      {/* Achievement Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {achievements &&
          achievementCards.map((achievement, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="bg-slate-800/50 backdrop-blur-xl rounded-xl p-6 border border-slate-700/50"
            >
              <div className="flex items-start justify-between">
                <div>
                  <p className="text-sm font-medium text-slate-400">{achievement.title}</p>
                  <p className="text-2xl font-bold mt-2">{achievement.value}</p>
                  <p className="text-sm text-slate-400">Held by {achievement.holder}</p>
                </div>
                <div className={`p-2 rounded-lg ${achievement.color}`}>
                  <achievement.icon className="w-6 h-6" />
                </div>
              </div>
            </motion.div>
          ))}
      </div>

      {/* Top Stakers */}
      <div className="bg-slate-800/50 backdrop-blur-xl rounded-xl border border-slate-700/50 overflow-hidden">
        <div className="p-6 border-b border-slate-700/50">
          <h3 className="text-xl font-bold">Top Stakers</h3>
        </div>

        <div className="divide-y divide-slate-700/50">
          {topStakers.map((entry, index) => {
            const stakedAmount = Number.parseFloat(entry.total_staked)
            // Estimate rewards as 5% of staked amount for display purposes
            // const estimatedRewards = stakedAmount * 0.05
            const stakedUSD = stakedAmount * ethPrice
            // const rewardsUSD = estimatedRewards * ethPrice
            const rank = Number.parseInt(entry.rank)

            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1 }}
                className="p-6 hover:bg-slate-700/20 transition-colors"
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-4">
                    <div className="flex items-center justify-center w-8 h-8">
                      {rank === 1 ? (
                        <Crown className="w-6 h-6 text-amber-400" />
                      ) : rank === 2 ? (
                        <Award className="w-6 h-6 text-slate-300" />
                      ) : rank === 3 ? (
                        <Award className="w-6 h-6 text-amber-700" />
                      ) : (
                        <span className="text-xl font-bold text-slate-400">#{rank}</span>
                      )}
                    </div>
                    {/* <img
                      src={PLACEHOLDER_AVATARS[index % PLACEHOLDER_AVATARS.length] || "/placeholder.svg"}
                      alt={entry.name}
                      className="w-10 h-10 rounded-full"
                    /> */}
                    <div>
                      <div className="flex items-center space-x-2">
                        <span className="font-bold">{entry.name}</span>
                        {BADGES[entry.rank as keyof typeof BADGES] && (
                          <span className="px-2 py-1 bg-blue-500/20 text-blue-400 text-xs rounded-full">
                            {BADGES[entry.rank as keyof typeof BADGES]}
                          </span>
                        )}
                      </div>
                      <div className="flex items-center space-x-2 text-sm text-slate-400">
                        <span>{entry.user_plan}</span>
                        {RANK_ACHIEVEMENTS[entry.rank as keyof typeof RANK_ACHIEVEMENTS] && (
                          <>
                            <span>•</span>
                            <span className="flex items-center">
                              <Diamond className="w-3 h-3 mr-1" />
                              {RANK_ACHIEVEMENTS[entry.rank as keyof typeof RANK_ACHIEVEMENTS]}
                            </span>
                          </>
                        )}
                      </div>
                    </div>
                  </div>
                  <div className="text-right">
                    <div>
                      <span className="font-bold">{stakedAmount.toFixed(2)} ETH</span>
                      <span className="text-sm text-slate-400 ml-2">≈ ${stakedUSD.toLocaleString()}</span>
                    </div>
                    {/* <div className="text-sm text-green-400">
                      +{estimatedRewards.toFixed(2)} ETH
                      <span className="text-green-500 ml-2">≈ ${rewardsUSD.toLocaleString()}</span>
                    </div> */}
                  </div>
                </div>
              </motion.div>
            )
          })}
        </div>
      </div>

      {/* Competition Info */}
      <div className="bg-gradient-to-r from-blue-500/10 via-purple-500/10 to-blue-500/10 backdrop-blur-xl rounded-2xl p-8 border border-blue-500/20">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          <div>
            <h3 className="text-xl font-bold mb-2">Monthly Staking Competition</h3>
            <p className="text-slate-300">Top 3 stakers this month will receive exclusive rewards and badges!</p>
          </div>
          <div className="flex items-center space-x-6">
            {COMPETITION_REWARDS.map((reward, index) => (
              <div key={index} className="text-center">
                <div className={`text-2xl font-bold ${reward.color}`}>{reward.place}</div>
                <div className="text-lg font-bold text-green-400">
                  +{reward.rewards.eth} ETH
                  <div className="text-sm text-green-500">≈ ${(reward.rewards.eth * ethPrice).toLocaleString()}</div>
                </div>
                <div className="text-sm font-medium mt-2">{reward.rewards.badge}</div>
                <div className="text-xs text-slate-400 mt-1">
                  {reward.rewards.perks.map((perk, i) => (
                    <div key={i}>{perk}</div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </motion.div>
  )
}

