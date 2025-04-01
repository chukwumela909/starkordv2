"use client"

import { motion } from "framer-motion"

export function Terms() {
  return (
    <div className="container mx-auto px-4 py-12">
      {/* Hero Section */}
      <div className="text-center max-w-3xl mx-auto mb-16">
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-4xl md:text-5xl font-bold mb-6"
        >
          Terms & Conditions
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="text-xl text-slate-300"
        >
          Last Updated: 04/01/2025
        </motion.p>
      </div>

      {/* Main Content */}
      <div className="space-y-6 text-slate-300">
        <div className="bg-slate-800/50 backdrop-blur-xl rounded-xl p-8 border border-slate-700/50">
          <h2 className="text-3xl font-bold mb-4">Welcome to Starkord!</h2>
          <p>
            Welcome to Starkord, an AI-powered Web3 staking platform. By accessing or using Starkord's services, you
            agree to abide by these Terms & Conditions. If you do not agree, please refrain from using our platform.
          </p>
        </div>

        <div className="bg-slate-800/50 backdrop-blur-xl rounded-xl p-8 border border-slate-700/50">
          <h3 className="text-2xl font-bold mb-4">1. Definitions</h3>
          <ul className="list-disc list-inside space-y-2">
            <li>"Starkord" – Refers to the Web3 staking platform and its services.</li>
            <li>"User" / "You" – Any individual or entity accessing or using Starkord.</li>
            <li>"Staking" – Locking digital assets in Starkord's smart contract to earn rewards.</li>
            <li>"Yield" – The staking reward distributed based on Starkord's staking plans.</li>
            <li>"Penalty" – A fee charged for early unstaking before the penalty-free period.</li>
          </ul>
        </div>

        <div className="bg-slate-800/50 backdrop-blur-xl rounded-xl p-8 border border-slate-700/50">
          <h3 className="text-2xl font-bold mb-4">2. Eligibility</h3>
          <ul className="list-disc list-inside space-y-2">
            <li>You must be at least 18 years old or the legal age in your jurisdiction.</li>
            <li>
              You agree that staking carries financial risks and that Starkord is not responsible for losses due to
              market volatility.
            </li>
            <li>
              Residents from restricted countries may be prohibited from using Starkord's services due to local
              regulations.
            </li>
          </ul>
        </div>

        <div className="bg-slate-800/50 backdrop-blur-xl rounded-xl p-8 border border-slate-700/50">
          <h3 className="text-2xl font-bold mb-4">3. Staking & Rewards</h3>
          <p>Starkord offers multiple staking plans:</p>
          <ul className="list-disc list-inside space-y-2 mt-2 mb-4">
            <li>Core Vault: 0.5% daily yield, 10% early unstaking penalty, 30-day penalty-free period.</li>
            <li>Growth Nexus: Custom yield, 15% early unstaking penalty, 45-day penalty-free period.</li>
            <li>Elite Matrix: Custom yield, 20% early unstaking penalty, 60-day penalty-free period.</li>
            <li>Legacy Protocol: Custom yield, 25% early unstaking penalty, 90-day penalty-free period.</li>
            <li>Flexible Plan: No lock-up period, slightly lower yield.</li>
          </ul>
          <ul className="list-disc list-inside space-y-2">
            <li>Staking rewards are distributed daily based on your selected plan.</li>
            <li>Yield rates may change due to market conditions and Starkord's policies.</li>
          </ul>
        </div>

        <div className="bg-slate-800/50 backdrop-blur-xl rounded-xl p-8 border border-slate-700/50">
          <h3 className="text-2xl font-bold mb-4">4. Withdrawal & Unstaking</h3>
          <ul className="list-disc list-inside space-y-2">
            <li>Users may unstake at any time, but early unstaking before the penalty-free period incurs a penalty.</li>
            <li>Withdrawal requests are processed via smart contract execution.</li>
            <li>Refunds are not guaranteed unless due to technical issues caused by Starkord.</li>
          </ul>
        </div>

        <div className="bg-slate-800/50 backdrop-blur-xl rounded-xl p-8 border border-slate-700/50">
          <h3 className="text-2xl font-bold mb-4">5. Fees & Taxes</h3>
          <ul className="list-disc list-inside space-y-2">
            <li>Starkord does not charge deposit fees.</li>
            <li>Withdrawal fees, if applicable, will be displayed before transaction confirmation.</li>
            <li>Users are responsible for any tax obligations on staking rewards.</li>
          </ul>
        </div>

        <div className="bg-slate-800/50 backdrop-blur-xl rounded-xl p-8 border border-slate-700/50">
          <h3 className="text-2xl font-bold mb-4">6. Security & Risks</h3>
          <ul className="list-disc list-inside space-y-2">
            <li>Starkord employs smart contract security measures, but all blockchain transactions carry risks.</li>
            <li>Users should verify smart contract audits before staking.</li>
            <li>
              Starkord is not responsible for losses due to hacks, network congestion, or third-party vulnerabilities.
            </li>
          </ul>
        </div>

        <div className="bg-slate-800/50 backdrop-blur-xl rounded-xl p-8 border border-slate-700/50">
          <h3 className="text-2xl font-bold mb-4">7. User Responsibilities</h3>
          <ul className="list-disc list-inside space-y-2">
            <li>Users must safeguard their wallet credentials; Starkord does not store private keys.</li>
            <li>Any attempt to manipulate or exploit the platform will result in account suspension.</li>
          </ul>
        </div>

        <div className="bg-slate-800/50 backdrop-blur-xl rounded-xl p-8 border border-slate-700/50">
          <h3 className="text-2xl font-bold mb-4">8. Limitation of Liability</h3>
          <ul className="list-disc list-inside space-y-2">
            <li>Starkord provides its services "as is" without guarantees of profits.</li>
            <li>Starkord is not liable for market losses, smart contract failures, or regulatory actions.</li>
          </ul>
        </div>

        <div className="bg-slate-800/50 backdrop-blur-xl rounded-xl p-8 border border-slate-700/50">
          <h3 className="text-2xl font-bold mb-4">9. Changes to Terms</h3>
          <ul className="list-disc list-inside space-y-2">
            <li>Starkord reserves the right to update these Terms & Conditions at any time.</li>
            <li>Users will be notified of significant changes. Continued use implies acceptance.</li>
          </ul>
        </div>

        <div className="bg-slate-800/50 backdrop-blur-xl rounded-xl p-8 border border-slate-700/50">
          <h3 className="text-2xl font-bold mb-4">10. Contact & Support</h3>
          <p className="mb-2">For any inquiries, contact us via:</p>
          <ul className="list-disc list-inside space-y-2">
            <li>Email: hello@starkord.com</li>
            <li>Live Chat: Available on the website</li>
            <li>Telegram: @starkordchannel</li>
          </ul>
        </div>
      </div>
    </div>
  )
}

