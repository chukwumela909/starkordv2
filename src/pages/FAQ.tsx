import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Plus, Minus, Wallet, Shield, Clock, DollarSign, ArrowUpRight,  Lock, RefreshCw } from 'lucide-react';

export function FAQ() {
  const [openIndex, setOpenIndex] = React.useState<number | null>(null);

  const faqCategories = [
    {
      title: 'Getting Started',
      icon: Wallet,
      color: 'text-blue-400 bg-blue-400/20',
      questions: [
        {
          question: 'What is Starkord?',
          answer: 'Starkord is a decentralized staking platform that allows users to earn passive income by staking their cryptocurrency. Our platform offers multiple staking plans with different yields and features, catering to both beginners and experienced investors.'
        },
        {
          question: 'How do I start staking?',
          answer: 'Starting is simple: 1) Create and verify your account, 2) Choose a staking plan that matches your goals, 3) Deposit your ETH to the provided address, and 4) Start earning daily rewards. Our platform guides you through each step to ensure a smooth experience.'
        },
        {
          question: 'What cryptocurrencies can I stake?',
          answer: 'Currently, Starkord supports ETH staking across all plans. We accept deposits in ETH, USDT (ERC20 & TRC20), and BTC, which are automatically converted to ETH for staking.'
        }
      ]
    },
    {
      title: 'Staking Plans',
      icon: DollarSign,
      color: 'text-green-400 bg-green-400/20',
      questions: [
        {
          question: 'What are the minimum and maximum staking amounts?',
          answer: 'Each plan has different requirements: Core Vault (0.05-1.99 ETH), Growth Nexus (2-9.99 ETH), Elite Matrix (10-19.99 ETH), and Legacy Protocol (20+ ETH). There is no maximum limit for the Legacy Protocol.'
        },
        {
          question: 'How are rewards calculated and distributed?',
          answer: 'Rewards are calculated daily based on your staking amount and plan\'s APY. Base yields range from 0.5% to 2.0% daily, with bonus yields unlocked after 60 days. Rewards are automatically added to your account and can be tracked in real-time.'
        },
        {
          question: 'What are bonus yields and how do I qualify?',
          answer: 'Bonus yields are additional rewards activated after 60 days of continuous staking. Each plan offers progressive yield increases, milestone bonuses, and compound rewards. The bonus amount varies by plan, ranging from +0.25% to +0.5% on your daily yield.'
        }
      ]
    },
    {
      title: 'Security & Safety',
      icon: Shield,
      color: 'text-purple-400 bg-purple-400/20',
      questions: [
        {
          question: 'Is staking safe?',
          answer: 'We prioritize security with multiple layers of protection: multi-signature wallets, cold storage for 98% of assets, comprehensive insurance coverage up to $50M, and regular security audits. All smart contracts are formally verified and audited.'
        },
        {
          question: 'What happens if I lose access to my account?',
          answer: 'We have a secure account recovery process. Contact our support team with your verified email, and they will guide you through identity verification steps to regain access. We recommend enabling 2FA for additional security.'
        },
        {
          question: 'Are my funds insured?',
          answer: 'Yes, we maintain comprehensive insurance coverage through leading providers. Our $50M policy covers security breaches, smart contract vulnerabilities, and custody risks. Additionally, we use qualified custodians for asset storage.'
        }
      ]
    },
    {
      title: 'Withdrawals & Fees',
      icon: Clock,
      color: 'text-amber-400 bg-amber-400/20',
      questions: [
        {
          question: 'Can I unstake my assets early?',
          answer: 'Yes, you can unstake before the withdrawal cycle, but this incurs a penalty fee: Core Vault (10%), Growth Nexus (15%), Elite Matrix (20%), and Legacy Protocol (25%). The Legacy Protocol offers a reduced penalty (12.5%) for partial exits after 60 days.'
        },
        {
          question: 'What are the withdrawal cycles?',
          answer: 'Each plan has a specific withdrawal cycle: Core Vault (30 days), Growth Nexus (45 days), Elite Matrix (60 days), and Legacy Protocol (90 days). During these windows, you can withdraw without penalties.'
        },
        {
          question: 'Are there any fees?',
          answer: 'Our fee structure is transparent: 10% performance fee on earned rewards, no deposit fees, and network fees for withdrawals. Early unstaking penalties apply as mentioned above. There are no hidden charges.'
        }
      ]
    },
    {
      title: 'Features & Benefits',
      icon: Lock,
      color: 'text-pink-400 bg-pink-400/20',
      questions: [
        {
          question: 'What is compound staking?',
          answer: 'Compound staking automatically reinvests your earned rewards to increase your staking position. Available on Growth Nexus, Elite Matrix, and Legacy Protocol plans, it can significantly boost your overall returns through the power of compounding.'
        },
        {
          question: 'How does the referral program work?',
          answer: 'Share your unique referral code and earn 10% of the daily rewards generated by your referred users. There\'s no limit to how many users you can refer, and rewards are automatically credited to your account.'
        },
        {
          question: 'What are milestone bonuses?',
          answer: 'Milestone bonuses are additional rewards in the Legacy Protocol for achieving specific goals: Duration (90 days, +0.5%), Amount (50+ ETH, +0.5%), and Compound (3x restakes, +0.5%). These bonuses stack for maximum yield potential.'
        }
      ]
    }
  ];

  return (
    <div className="container mx-auto px-4 py-12">
      {/* Hero Section */}
      <div className="text-center max-w-3xl mx-auto mb-16">
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-4xl md:text-5xl font-bold mb-6"
        >
          Frequently Asked Questions
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="text-xl text-slate-300"
        >
          Find answers to common questions about staking on Starkord
        </motion.p>
      </div>

      {/* FAQ Categories */}
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
        {faqCategories.map((category, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className="bg-slate-800/50 backdrop-blur-xl rounded-xl p-6 border border-slate-700/50"
          >
            <div className={`p-3 rounded-lg w-fit mb-4 ${category.color}`}>
              <category.icon className="w-6 h-6" />
            </div>
            <h3 className="text-xl font-bold mb-2">{category.title}</h3>
            <p className="text-slate-400">
              {category.questions.length} questions
            </p>
          </motion.div>
        ))}
      </div>

      {/* FAQ Accordion */}
      {faqCategories.map((category, categoryIndex) => (
        <div key={categoryIndex} className="mb-12">
          <h2 className="text-2xl font-bold mb-6 flex items-center space-x-3">
            <category.icon className={`w-6 h-6 ${category.color.split(' ')[0]}`} />
            <span>{category.title}</span>
          </h2>
          <div className="space-y-4">
            {category.questions.map((faq, faqIndex) => {
              const index = categoryIndex * 100 + faqIndex;
              return (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.05 * faqIndex }}
                >
                  <button
                    onClick={() => setOpenIndex(openIndex === index ? null : index)}
                    className="w-full flex items-center justify-between p-6 bg-slate-800/50 backdrop-blur-xl rounded-xl border border-slate-700/50 hover:border-blue-500/50 transition-colors"
                  >
                    <span className="text-lg font-medium text-left">{faq.question}</span>
                    {openIndex === index ? (
                      <Minus className="w-5 h-5 text-blue-400 flex-shrink-0" />
                    ) : (
                      <Plus className="w-5 h-5 text-blue-400 flex-shrink-0" />
                    )}
                  </button>
                  {openIndex === index && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      exit={{ opacity: 0, height: 0 }}
                      className="p-6 bg-slate-800/30 rounded-b-xl border-x border-b border-slate-700/50"
                    >
                      <p className="text-slate-300">{faq.answer}</p>
                    </motion.div>
                  )}
                </motion.div>
              );
            })}
          </div>
        </div>
      ))}

      {/* Still Have Questions */}
      <div className="text-center max-w-2xl mx-auto">
        <h2 className="text-3xl font-bold mb-4">Still Have Questions?</h2>
        <p className="text-slate-400 mb-8">
          Our support team is here to help you 24/7. Get in touch with us for personalized assistance.
        </p>
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <Link
            to="https://t.me/starkordsupport"
            className="w-full sm:w-auto px-8 py-3 bg-blue-500 hover:bg-blue-600 text-white rounded-lg font-medium transition-colors flex items-center justify-center space-x-2 group"
          >
            <span>Contact Support</span>
            <ArrowUpRight className="w-5 h-5 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
          </Link>
          <a
            href="https://starkord.com/starkord-whitepaper.pdf"
            className="w-full sm:w-auto px-8 py-3 bg-slate-700 hover:bg-slate-600 text-white rounded-lg font-medium transition-colors flex items-center justify-center space-x-2"
          >
            <RefreshCw className="w-5 h-5" />
            <span>View Documentation</span>
          </a>
        </div>
      </div>
    </div>
  );
}