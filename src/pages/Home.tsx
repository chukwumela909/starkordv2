
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { 
  Wallet, 
  Shield, 
  Users, 
  ArrowRight, 
  CheckCircle2,

  Clock,

  DollarSign,

  BarChart3,

  RefreshCw,
  ArrowUpRight,

  Network,
  Layers,

  Gift,

  Target,
  Crown,
  Calendar,
  Video,
  MessageSquare
} from 'lucide-react';

export default function Home() {
  const partners = [
    {
      name: 'Polygon',
      logo: 'https://cryptologos.cc/logos/polygon-matic-logo.svg',
      type: 'Network',
      description: 'Ethereum scaling solution with fast and low-cost transactions'
    },
    {
      name: 'Solana',
      logo: 'https://cryptologos.cc/logos/solana-sol-logo.svg',
      type: 'Network',
      description: 'High-performance blockchain for decentralized applications'
    },
    {
      name: 'MetaMask',
      logo: 'https://upload.wikimedia.org/wikipedia/commons/3/36/MetaMask_Fox.svg',
      type: 'Wallet',
      description: 'Leading Web3 wallet for Ethereum and EVM networks'
    },
    {
      name: 'Chainlink',
      logo: 'https://cryptologos.cc/logos/chainlink-link-logo.svg',
      type: 'Oracle',
      description: 'Decentralized oracle network for real-world data'
    },
    {
      name: 'Arbitrum',
      logo: 'https://cryptologos.cc/logos/arbitrum-arb-logo.svg',
      type: 'L2',
      description: 'Layer 2 scaling solution for Ethereum with lower fees'
    },
    {
      name: 'Optimism',
      logo: 'https://cryptologos.cc/logos/optimism-op-logo.svg',
      type: 'L2',
      description: 'Optimistic rollup layer 2 for Ethereum scalability'
    }
  ];

  return (
    <div>
      {/* Hero Section */}
      <div className="relative overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-gradient-to-br from-blue-500/20 to-purple-500/20 backdrop-blur-3xl" />
          <div className="absolute inset-0 cyber-grid opacity-30" />
          <div className="absolute inset-0 blockchain-nodes opacity-40" />
          <div className="absolute inset-0 data-flow opacity-30" />
          <div className="absolute inset-0 matrix-bg opacity-30" />
          <div className="absolute inset-0 flex flex-col justify-around overflow-hidden">
            {[...Array(5)].map((_, i) => (
              <div key={i} className="network-line" style={{ animationDelay: `${i * 0.6}s` }} />
            ))}
          </div>
        </div>

        <div className="container mx-auto px-4 py-24 relative">
          <div className="max-w-4xl mx-auto text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="mb-8"
            >
              <h1 className="text-5xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
                Unlock Passive Crypto Earnings with Starkord
              </h1>
              <p className="text-xl md:text-2xl text-slate-300 mb-8">
                The next generation of decentralized staking
              </p>
              <Link
                to="/login"
                className="inline-flex items-center px-8 py-4 bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 text-white rounded-xl font-medium transition-colors shadow-lg hover:shadow-xl"
              >
                Start Staking Now
                <ArrowRight className="ml-2 w-5 h-5" />
              </Link>
            </motion.div>

            {/* Live Stats */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="grid grid-cols-2 md:grid-cols-4 gap-4"
            >
              {[
                { value: '$50M+', label: 'Total Value Locked', icon: Wallet },
                { value: '15,000+', label: 'Active Stakers', icon: Users },
                { value: '99.99%', label: 'Platform Uptime', icon: Shield },
                { value: '24/7', label: 'Support Available', icon: Clock }
              ].map((stat, index) => (
                <motion.div
                  key={index}
                  whileHover={{ scale: 1.02 }}
                  className="glass-card rounded-xl p-4 hover:border-blue-500/50 transition-all duration-200"
                >
                  <div className="flex items-center justify-center mb-2">
                    <stat.icon className="w-6 h-6 text-blue-400" />
                  </div>
                  <p className="text-2xl md:text-3xl font-bold text-blue-400">{stat.value}</p>
                  <p className="text-sm text-slate-400">{stat.label}</p>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </div>
      </div>

      {/* Ethereum Price Ticker */}
      <div className="bg-slate-800/50 backdrop-blur-xl border-y border-slate-700/50 py-4 overflow-hidden">
        <div className="flex animate-ticker">
          {[...Array(2)].map((_, i) => (
            <div key={i} className="flex items-center space-x-12 whitespace-nowrap">
              <div className="flex items-center space-x-2">
                <img src="https://cryptologos.cc/logos/ethereum-eth-logo.svg" alt="ETH" className="w-6 h-6" />
                <span className="font-medium">ETH/USD</span>
                <span className="text-green-400">$2,845.67</span>
                <span className="text-green-400">+2.45%</span>
              </div>
              <div className="flex items-center space-x-2">
                <img src="https://cryptologos.cc/logos/bitcoin-btc-logo.svg" alt="BTC" className="w-6 h-6" />
                <span className="font-medium">BTC/USD</span>
                <span className="text-red-400">$48,234.12</span>
                <span className="text-red-400">-1.23%</span>
              </div>
              <div className="flex items-center space-x-2">
                <img src="https://cryptologos.cc/logos/cardano-ada-logo.svg" alt="ADA" className="w-6 h-6" />
                <span className="font-medium">ADA/USD</span>
                <span className="text-green-400">$0.5123</span>
                <span className="text-green-400">+3.67%</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Sign-up Bonus Banner */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
        className="relative z-10 container mx-auto px-4 mt-12 mb-24"
      >
        <div className="bg-gradient-to-r from-blue-500/10 via-purple-500/10 to-pink-500/10 backdrop-blur-xl rounded-2xl p-8 border border-blue-500/20">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="flex items-center space-x-6">
              <div className="relative">
                <div className="absolute inset-0 bg-blue-500/20 blur-xl rounded-full" />
                <div className="relative bg-gradient-to-br from-blue-500 to-purple-500 p-4 rounded-xl">
                  <Gift className="w-8 h-8 text-white" />
                </div>
              </div>
              <div>
                <h2 className="text-2xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
                  Limited Time Offer!
                </h2>
                <p className="text-slate-300 mt-1">
                  Join now and receive <span className="text-blue-400 font-semibold">0.01 ETH</span> as a welcome bonus
                </p>
              </div>
            </div>
            <Link
              to="/login"
              className="px-6 py-3 bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 text-white rounded-xl font-medium transition-all duration-200 flex items-center space-x-2 group whitespace-nowrap"
            >
              <span>Claim Your Bonus</span>
              <ArrowUpRight className="w-5 h-5 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
            </Link>
          </div>
        </div>
      </motion.div>

      {/* Key Features Section */}
      <div className="container mx-auto px-4 py-24">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Key Features Of Starkord</h2>
          <p className="text-slate-400 max-w-2xl mx-auto">
            Experience the future of staking with our innovative platform
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {[
            {
              icon: Wallet,
              title: 'Easy Participation',
              description: 'Stake ETH and earn daily rewards without handling the technical complexities. Start with as little as 0.05 ETH.',
              color: 'text-blue-400 bg-blue-400/20'
            },
            {
              icon: BarChart3,
              title: 'Automated Staking',
              description: 'Our platform manages staking across diversified crypto protocols and DeFi assets for optimal returns.',
              color: 'text-purple-400 bg-purple-400/20'
            },
            {
              icon: Clock,
              title: 'Withdrawal Flexibility',
              description: 'Withdraw your funds anytime with our flexible unstaking system. Optional withdrawal windows for maximum returns.',
              color: 'text-green-400 bg-green-400/20'
            },
            {
              icon: Shield,
              title: 'Enterprise Security',
              description: 'Multi-signature wallets, cold storage, and comprehensive insurance coverage protect your assets.',
              color: 'text-amber-400 bg-amber-400/20'
            },
            {
              icon: RefreshCw,
              title: 'Daily Restaking',
              description: 'Compound your earnings by automatically restaking your rewards for maximum growth potential.',
              color: 'text-pink-400 bg-pink-400/20'
            },
            {
              icon: Users,
              title: 'Referral Program',
              description: 'Earn 10% of the daily rewards generated by your referred users. Build your passive income network.',
              color: 'text-indigo-400 bg-indigo-400/20'
            }
          ].map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="bg-slate-800/50 backdrop-blur-xl rounded-xl p-8 border border-slate-700/50 hover:border-blue-500/50 transition-all duration-200 group"
            >
              <div className={`p-3 rounded-lg w-fit mb-6 ${feature.color} group-hover:scale-110 transition-transform`}>
                <feature.icon className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-bold mb-4">{feature.title}</h3>
              <p className="text-slate-400">{feature.description}</p>
            </motion.div>
          ))}
        </div>
      </div>

      {/* How It Works Section */}
      <div className="container mx-auto px-4 py-24">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">How It Works</h2>
          <p className="text-slate-400 max-w-2xl mx-auto">
            Start earning passive income in three simple steps
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {[
            {
              step: '01',
              title: 'Choose Your Plan',
              description: 'Select a staking plan that matches your investment goals. Each plan offers unique features and benefits.',
              icon: Wallet,
              color: 'text-blue-400 bg-blue-400/20',
              features: [
                'Multiple plans from 0.05 ETH',
                'Flexible terms & yields',
                'Daily rewards',
                'Bonus yield activation'
              ]
            },
            {
              step: '02',
              title: 'Stake & Earn',
              description: 'Deposit ETH and start earning immediately. Add multiple deposits to unlock enhanced features and rewards.',
              icon: DollarSign,
              color: 'text-green-400 bg-green-400/20',
              features: [
                'Multi-deposit support',
                'Yield boost with 2+ deposits',
                'Real-time tracking',
                'Automatic rewards'
              ]
            },
            {
              step: '03',
              title: 'Manage & Grow',
              description: 'Optimize your earnings through restaking, milestone rewards, and strategic deposit timing.',
              icon: RefreshCw,
              color: 'text-purple-400 bg-purple-400/20',
              features: [
                'Flexible restaking',
                'Milestone bonuses',
                'Compound earnings',
                'Partial exit options'
              ]
            }
          ].map((item, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="bg-slate-800/50 backdrop-blur-xl rounded-xl p-8 border border-slate-700/50 hover:border-blue-500/50 transition-all duration-200 group"
            >
              {/* Step Number */}
              <div className={`p-3 rounded-lg w-fit mb-6 ${item.color} group-hover:scale-110 transition-transform`}>
                <item.icon className="w-6 h-6" />
              </div>

              <div className="inline-flex items-center justify-center px-4 py-1 bg-gradient-to-r from-blue-500/20 to-purple-500/20 rounded-full mb-4">
                <span className="text-sm font-medium">Step {item.step}</span>
              </div>

              <h3 className="text-xl font-bold mb-4">{item.title}</h3>
              <p className="text-slate-400 mb-6">{item.description}</p>

              <ul className="space-y-2">
                {item.features.map((feature, i) => (
                  <li key={i} className="flex items-center text-sm text-slate-300">
                    <CheckCircle2 className="w-4 h-4 text-green-400 mr-2 flex-shrink-0" />
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>

        {/* Milestone Features */}
        <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="bg-slate-800/50 backdrop-blur-xl rounded-xl p-6 border border-slate-700/50"
          >
            <div className="bg-amber-500/20 p-3 rounded-lg w-fit mb-4">
              <Clock className="w-6 h-6 text-amber-400" />
            </div>
            <h3 className="text-lg font-bold mb-2">Duration Milestones</h3>
            <p className="text-slate-400">
              Earn additional yield bonuses by maintaining your stake for extended periods
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="bg-slate-800/50 backdrop-blur-xl rounded-xl p-6 border border-slate-700/50"
          >
            <div className="bg-green-500/20 p-3 rounded-lg w-fit mb-4">
              <Target className="w-6 h-6 text-green-400" />
            </div>
            <h3 className="text-lg font-bold mb-2">Amount Milestones</h3>
            <p className="text-slate-400">
              Unlock higher yields by reaching total stake amount thresholds
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="bg-slate-800/50 backdrop-blur-xl rounded-xl p-6 border border-slate-700/50"
          >
            <div className="bg-purple-500/20 p-3 rounded-lg w-fit mb-4">
              <Crown className="w-6 h-6 text-purple-400" />
            </div>
            <h3 className="text-lg font-bold mb-2">Compound Milestones</h3>
            <p className="text-slate-400">
              Boost your earnings through strategic restaking and compound rewards
            </p>
          </motion.div>
        </div>
      </div>

      {/* Infrastructure Partners Section */}
      <div className="container mx-auto px-4 py-24">
        <div className="text-center mb-16">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-3xl md:text-4xl font-bold mb-4"
          >
            Infrastructure Partners
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-slate-400 max-w-2xl mx-auto"
          >
            Powered by industry-leading blockchain networks and technology partners
          </motion.p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {partners.map((partner, index) => (
            <motion.div
              key={partner.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="bg-slate-800/50 backdrop-blur-xl rounded-xl p-8 border border-slate-700/50 hover:border-blue-500/50 transition-all duration-200 group"
            >
              <div className="flex items-start space-x-4">
                <div className="bg-white/10 p-4 rounded-xl">
                  <img
                    src={partner.logo}
                    alt={partner.name}
                    className="w-12 h-12 object-contain"
                  />
                </div>
                <div>
                  <div className="flex items-center space-x-2">
                    <h3 className="text-xl font-bold">{partner.name}</h3>
                    <span className="px-2 py-1 bg-blue-500/20 text-blue-400 text-xs font-medium rounded-full">
                      {partner.type}
                    </span>
                  </div>
                  <p className="text-slate-400 mt-2">{partner.description}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Integration Features */}
        <div className="mt-24 grid md:grid-cols-2 gap-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="bg-slate-800/50 backdrop-blur-xl rounded-xl p-8 border border-slate-700/50"
          >
            <div className="bg-blue-500/20 p-3 rounded-lg w-fit mb-6">
              <Network className="w-6 h-6 text-blue-400" />
            </div>
            <h3 className="text-xl font-bold mb-4">Multi-Chain Support</h3>
            <p className="text-slate-400">
              Stake and earn rewards across multiple blockchain networks with seamless integration
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="bg-slate-800/50 backdrop-blur-xl rounded-xl p-8 border border-slate-700/50"
          >
            <div className="bg-purple-500/20 p-3 rounded-lg w-fit mb-6">
              <Layers className="w-6 h-6 text-purple-400" />
            </div>
            <h3 className="text-xl font-bold mb-4">Cross-Chain Bridges</h3>
            <p className="text-slate-400">
              Transfer assets between networks efficiently with integrated bridge solutions
            </p>
          </motion.div>
        </div>
      </div>

      {/* Book a Call Section */}
      <div className="container mx-auto px-4 py-24 relative overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-gradient-to-br from-purple-500/10 to-blue-500/10 backdrop-blur-3xl" />
        </div>
        
        <div className="relative max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mb-8"
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-6">Schedule a Call With Us</h2>
            <p className="text-xl text-slate-300 mb-8">
              The Starkord team is always in search of new ways to be useful to our partners and exceed their expectations. Let's discuss how we can help you achieve your staking goals.
            </p>
            
            <div className="grid md:grid-cols-3 gap-6 mb-12">
              <div className="bg-slate-800/50 backdrop-blur-xl rounded-xl p-6 border border-slate-700/50 hover:border-purple-500/50 transition-all duration-200">
                <div className="bg-purple-500/20 p-3 rounded-lg w-fit mx-auto mb-4">
                  <Calendar className="w-6 h-6 text-purple-400" />
                </div>
                <h3 className="text-lg font-bold mb-2">Online Appointments</h3>
                <p className="text-slate-400 text-sm">
                  Schedule a convenient time for a personal consultation
                </p>
              </div>
              
              <div className="bg-slate-800/50 backdrop-blur-xl rounded-xl p-6 border border-slate-700/50 hover:border-blue-500/50 transition-all duration-200">
                <div className="bg-blue-500/20 p-3 rounded-lg w-fit mx-auto mb-4">
                  <Video className="w-6 h-6 text-blue-400" />
                </div>
                <h3 className="text-lg font-bold mb-2">Video Calls</h3>
                <p className="text-slate-400 text-sm">
                  Face-to-face meetings from anywhere in the world
                </p>
              </div>
              
              <div className="bg-slate-800/50 backdrop-blur-xl rounded-xl p-6 border border-slate-700/50 hover:border-green-500/50 transition-all duration-200">
                <div className="bg-green-500/20 p-3 rounded-lg w-fit mx-auto mb-4">
                  <MessageSquare className="w-6 h-6 text-green-400" />
                </div>
                <h3 className="text-lg font-bold mb-2">Free Consultation</h3>
                <p className="text-slate-400 text-sm">
                  Get expert advice at no cost
                </p>
              </div>
            </div>

            <a
              href="https://calendly.com/starkord"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex mr-5 mb-3 items-center px-8 py-4 bg-gradient-to-r from-purple-500 to-blue-500 hover:from-purple-600 hover:to-blue-600 text-white rounded-xl font-medium transition-all duration-200 group"
            >
              <span>Book Your Free Call</span>
              <ArrowUpRight className="ml-2 w-5 h-5 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
            </a>
            <a
              href="mailto:hello@starkord.com"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center px-8 py-4 bg-gray-500 hover:bg-gray-600 text-white rounded-xl font-medium transition-all duration-200 group"
            >
              <span>Contact Support</span>
              <ArrowUpRight className="ml-2 w-5 h-5 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
            </a>
          </motion.div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="container mx-auto px-4 py-24">
        <div className="text-center max-w-3xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mb-8"
          >
            <h2 className="text-3xl font-bold mb-4">Ready to Start Earning?</h2>
            <p className="text-slate-400 mb-4">
              Join thousands of satisfied users and start earning passive income today.
            </p>
            <div className="flex items-center justify-center space-x-2 text-lg text-green-400 mb-8">
              <Gift className="w-6 h-6" />
              <span>Get 0.01 ETH free when you sign up today!</span>
            </div>
          </motion.div>
          
          <Link
            to="/login"
            className="inline-block px-8 py-4 bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 text-white rounded-lg font-medium transition-all duration-200 group"
          >
            <span className="flex items-center">
              Start Staking Now
              <ArrowUpRight className="w-5 h-5 ml-2 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
            </span>
          </Link>
          
          <p className="mt-4 text-sm text-slate-400">
            *Sign-up bonus will be credited after email verification
          </p>
        </div>
      </div>
    </div>
  );
}

export { Home };