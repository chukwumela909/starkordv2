
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { 
  Wallet, 
  Shield, 
  TrendingUp, 
  Users, 
  Lock, 
  Clock, 
  Zap, 
  RefreshCw, 
  Globe, 

  BarChart3, 
  Percent, 
  CheckCircle2, 
  ArrowUpRight, 

  Star, 
  ChevronUp, 
  Umbrella, 
  FileCheck, 
  ShieldCheck, 
  Server, 
  Key, 
  HardDrive, 
  Eye, 
  AlertTriangle, 
  Building, 


} from 'lucide-react';
// import { usePriceStore } from '../store/priceStore';

export function Features() {
  // const { ethPrice } = usePriceStore();

  const PLANS = [
    {
      name: 'Core Vault',
      minStake: 0.05,
      dailyYield: 0.5,
      color: 'from-blue-500 to-blue-600',
      icon: Shield,
      description: 'Perfect for beginners. Low minimum stake with stable returns.',
      features: [
        'Minimum stake: 0.05 ETH',
        'Base yield: 0.5% daily',
        '30-day Unstake Window',
        'Early unstake penalty: 10%',
        'No compounding available',
        'Stake for 60 days & get 0.1% bonus yield monthly (up to 1%)',
        'NEW: Welcome bonus: +0.1% for first 7 days',
        'NEW: Loyalty rewards program',
      ],
      highlight: 'Best for new investors'
    },
    {
      name: 'Growth Nexus',
      minStake: 1,
      dailyYield: 1.2,
      color: 'from-purple-500 to-purple-600',
      icon: TrendingUp,
      description: 'Balanced growth with compounding rewards for growing portfolios.',
      features: [
        'Minimum stake: 1 ETH',
        'Base yield: 1.2% daily',
        '45-day Unstake Window',
        'Early unstake penalty: 15%',
        'Compounding available',
        'Stake for 60 days & get 0.05% bonus yield monthly (up to 1.5%)',
        'NEW: Multi-deposit bonus: +0.3% for 3+ deposits',
        'NEW: Weekly yield boost events',
        'NEW: Priority support access'
      ],
      highlight: 'Most popular'
    },
    {
      name: 'Elite Matrix',
      minStake: 5,
      dailyYield: 1.5,
      color: 'from-emerald-500 to-emerald-600',
      icon: Zap,
      description: 'Premium analytics & early access to enhanced staking features.',
      features: [
        'Minimum stake: 5 ETH',
        'Base yield: 1.5% daily',
        '60-day Unstake Window',
        'Early unstake penalty: 20%',
        'Compounding available',
        'Temporary 2.0% yield boost for 30 days with 2+ deposits',
        'Real-time analytics dashboard access',
        'Priority access to new features',
        'Stake for 60 days & get 0.05% bonus yield monthly (up to 1.8%)',
        'NEW: Flash stake events (+3% for 24 hours)',
        'NEW: Cross-chain bridging fee refund (up to $500)',
        'NEW: Exclusive NFT rewards (1 NFT per 10 ETH staked)',
        'NEW: Weekly performance reports',
        'NEW: VIP Discord access',
        'NEW: Dedicated account manager'
      ],
      highlight: 'Best returns'
    },
    {
      name: 'Legacy Protocol',
      minStake: 10,
      dailyYield: 2.0,
      color: 'from-amber-500 to-amber-600',
      icon: Star,
      description: 'Premium tier with generational rewards and milestone bonuses.',
      features: [
        'Minimum stake: 10 ETH',
        'Base yield: 2.0% daily',
        '90-day Unstake Window',
        'Early unstake penalty: 25%',
        'Compounding available',
        'Duration milestone: +0.5% yield after 90 days',
        'Amount milestone: +0.5% yield at 50 ETH staked',
        'Compound milestone: +0.5% yield after 3 restakes',
        'Partial exit option after 60 days (12.5% penalty)',
        'Stake for 60 days & get 0.05% bonus yield monthly (up to 2.5%)',
        'NEW: Diamond hands bonus: +1% after 180 days',
        'NEW: Governance token rewards',
        'NEW: VIP concierge service',
        'NEW: Institutional-grade insurance',
        'NEW: Private OTC desk access',
        'NEW: Exclusive investment opportunities'
      ],
      highlight: 'Premium tier'
    }
  ];

  return (
    <div className="container mx-auto px-4 py-12">
      {/* Trust Banner */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-gradient-to-r from-blue-500/10 via-purple-500/10 to-blue-500/10 backdrop-blur-xl rounded-2xl p-8 mb-16 border border-blue-500/20"
      >
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center space-x-6">
            <div className="bg-blue-500/20 p-4 rounded-xl">
              <Shield className="w-8 h-8 text-blue-400" />
            </div>
            <div>
              <h2 className="text-2xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
                Your Assets, Secured & Protected
              </h2>
              <p className="text-slate-300 mt-1">
                Industry-leading security measures and comprehensive insurance coverage
              </p>
            </div>
          </div>
          <div className="flex items-center space-x-8">
            <div className="text-center">
              <div className="text-2xl font-bold text-blue-400">$50M+</div>
              <div className="text-sm text-slate-400">Insurance Coverage</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-purple-400">99.99%</div>
              <div className="text-sm text-slate-400">Uptime SLA</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-green-400">24/7</div>
              <div className="text-sm text-slate-400">Security Monitoring</div>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Hero Section */}
      <div className="text-center max-w-3xl mx-auto mb-16">
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-4xl md:text-5xl font-bold mb-6"
        >
          Platform Features
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="text-xl text-slate-300"
        >
          Discover why thousands of users choose Starkord for their staking needs
        </motion.p>
      </div>

      {/* Main Features */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-24">
        {[
          {
            icon: Wallet,
            title: 'Easy Participation',
            description: 'Stake ETH and earn daily rewards without handling the technical aspects of staking.',
            color: 'text-blue-400 bg-blue-400/20'
          },
          {
            icon: BarChart3,
            title: 'Automated Staking',
            description: 'Our platform manages staking across diversified crypto protocols and DeFi assets.',
            color: 'text-purple-400 bg-purple-400/20'
          },
          {
            icon: Clock,
            title: 'Fixed-Term Yields',
            description: 'Daily rewards distributed with bonus yields after 60 days of staking.',
            color: 'text-green-400 bg-green-400/20'
          },
          {
            icon: Shield,
            title: 'Risk Management',
            description: 'Comprehensive risk management practices and diversified staking strategies.',
            color: 'text-amber-400 bg-amber-400/20'
          },
          {
            icon: Percent,
            title: 'Transparent Fees',
            description: 'Clear fee structure with only 10% performance fee on earned rewards.',
            color: 'text-pink-400 bg-pink-400/20'
          },
          {
            icon: RefreshCw,
            title: 'Daily Restaking',
            description: 'Enhance your earnings by restaking rewards for compound growth.',
            color: 'text-indigo-400 bg-indigo-400/20'
          },
          {
            icon: Users,
            title: 'Referral Program',
            description: 'Earn 10% of daily rewards generated by your referred users.',
            color: 'text-teal-400 bg-teal-400/20'
          },
          {
            icon: Lock,
            title: 'Secure Platform',
            description: 'Industry-leading security measures protect your staked assets.',
            color: 'text-red-400 bg-red-400/20'
          },
          {
            icon: Globe,
            title: 'Global Access',
            description: 'Available worldwide with 24/7 platform accessibility.',
            color: 'text-emerald-400 bg-emerald-400/20'
          },
        ].map((feature, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 * index }}
            className="bg-slate-800/50 backdrop-blur-xl rounded-xl p-8 border border-slate-700/50 hover:border-blue-500/50 transition-all duration-200"
          >
            <div className={`p-3 rounded-lg w-fit mb-4 ${feature.color}`}>
              <feature.icon className="w-6 h-6" />
            </div>
            <h3 className="text-xl font-bold mb-4">{feature.title}</h3>
            <p className="text-slate-400">{feature.description}</p>
          </motion.div>
        ))}
      </div>

      {/* Staking Plans */}
      <div className="mb-24">
        <h2 className="text-3xl font-bold text-center mb-12">Available Staking Plans</h2>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {PLANS.map((plan, index) => {
            // const minStakeUSD = plan.minStake * ethPrice;
            
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 * index }}
                className={`bg-gradient-to-br ${plan.color} rounded-2xl p-8 relative overflow-hidden`}
              >
                {/* Background Effects */}
                <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full blur-3xl transform translate-x-32 -translate-y-32" />
                <div className="absolute bottom-0 left-0 w-48 h-48 bg-black/10 rounded-full blur-2xl transform -translate-x-24 translate-y-24" />
                
                {/* Plan Badge */}
                <div className="absolute top-6 right-6 bg-white/20 backdrop-blur-sm px-3 py-1 rounded-full">
                  <span className="text-sm font-medium">{plan.highlight}</span>
                </div>

                {/* Header */}
                <div className="relative flex items-center space-x-4 mb-6">
                  <div className="bg-white/20 p-3 rounded-xl">
                    <plan.icon className="w-8 h-8" />
                  </div>
                  <div>
                    <h3 className="text-2xl font-bold">{plan.name}</h3>
                    <p className="text-white/80">{plan.description}</p>
                  </div>
                </div>

                {/* Stats Grid */}
                <div className="relative grid grid-cols-2 gap-4 mb-8">
                  <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4">
                    <span className="text-sm text-white/70">Min Stake</span>
                    <div className="font-bold text-xl">{plan.minStake} ETH</div>
                    {/* <div className="text-sm text-white/70">
                      ≈ ${minStakeUSD.toLocaleString()}
                    </div> */}
                  </div>
                  <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4">
                    <span className="text-sm text-white/70">Daily Yield</span>
                    <div className="font-bold text-xl">{plan.dailyYield}%</div>
                    <div className="text-sm text-white/70">
                      {(plan.dailyYield * 365).toFixed(2)}% APY
                    </div>
                  </div>
                </div>

                {/* Features List */}
                <div className="relative mb-8">
                  <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4">
                    <ul className="space-y-2">
                      {plan.features.map((feature, index) => (
                        <li key={index} className="flex items-center text-sm">
                          <ChevronUp className="w-4 h-4 mr-2 flex-shrink-0" />
                          <span>{feature}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                {/* Action Button */}
                <Link
                  to="/login"
                  className="relative w-full bg-white/20 hover:bg-white/30 backdrop-blur-sm py-4 rounded-xl font-medium transition-all flex items-center justify-center space-x-2 group"
                >
                  <span>Start Staking</span>
                  <ArrowUpRight className="w-5 h-5 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                </Link>
              </motion.div>
            );
          })}
        </div>
      </div>

      {/* Enhanced Security Section */}
      <div className="mb-24">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-4">Security & Risk Management</h2>
          <p className="text-slate-400 max-w-2xl mx-auto">
            Your trust is our priority. We employ multiple layers of security and risk management to protect your investments.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Asset Protection */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-slate-800/50 backdrop-blur-xl rounded-xl p-8 border border-slate-700/50 hover:border-blue-500/50 transition-all duration-200"
          >
            <div className="bg-blue-500/20 p-3 rounded-xl w-fit mb-6">
              <Shield className="w-6 h-6 text-blue-400" />
            </div>
            <h3 className="text-xl font-bold mb-4">Asset Protection</h3>
            <p className="text-slate-400 mb-6">
              Your assets are secured through multiple layers of protection and backed by comprehensive insurance coverage.
            </p>
            <ul className="space-y-3">
              <li className="flex items-start space-x-3">
                <HardDrive className="w-5 h-5 text-blue-400 mt-0.5" />
                <div>
                  <p className="font-medium">Cold Storage Security</p>
                  <p className="text-sm text-slate-400">98% of assets stored in offline, multi-signature wallets</p>
                </div>
              </li>
              <li className="flex items-start space-x-3">
                <Key className="w-5 h-5 text-purple-400 mt-0.5" />
                <div>
                  <p className="font-medium">Multi-Signature Authorization</p>
                  <p className="text-sm text-slate-400">3/5 signature requirement for all withdrawals</p>
                </div>
              </li>
              <li className="flex items-start space-x-3">
                <Building className="w-5 h-5 text-green-400 mt-0.5" />
                <div>
                  <p className="font-medium">Institutional Grade Infrastructure</p>
                  <p className="text-sm text-slate-400">Partnership with qualified custodians</p>
                </div>
              </li>
            </ul>
          </motion.div>

          {/* Risk Management */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="bg-slate-800/50 backdrop-blur-xl rounded-xl p-8 border border-slate-700/50 hover:border-purple-500/50 transition-all duration-200"
          >
            <div className="bg-purple-500/20 p-3 rounded-xl w-fit mb-6">
              <AlertTriangle className="w-6 h-6 text-purple-400" />
            </div>
            <h3 className="text-xl font-bold mb-4">Risk Management</h3>
            <p className="text-slate-400 mb-6">
              Comprehensive risk management framework to ensure the safety and stability of your investments.
            </p>
            <ul className="space-y-3">
              <li className="flex items-start space-x-3">
                <Eye className="w-5 h-5 text-purple-400 mt-0.5" />
                <div>
                  <p className="font-medium">24/7 Monitoring</p>
                  <p className="text-sm text-slate-400">Real-time surveillance of all platform activities</p>
                </div>
              </li>
              <li className="flex items-start space-x-3">
                <Server className="w-5 h-5 text-blue-400 mt-0.5" />
                <div>
                  <p className="font-medium">Smart Contract Audits</p>
                  <p className="text-sm text-slate-400">Regular audits by leading security firms</p>
                </div>
              </li>
              <li className="flex items-start space-x-3">
                <FileCheck className="w-5 h-5 text-green-400 mt-0.5" />
                <div>
                  <p className="font-medium">Risk Assessment</p>
                  <p className="text-sm text-slate-400">Continuous evaluation of platform risks</p>
                </div>
              </li>
            </ul>
          </motion.div>

          {/* Insurance Coverage */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="bg-slate-800/50 backdrop-blur-xl rounded-xl p-8 border border-slate-700/50 hover:border-green-500/50 transition-all duration-200"
          >
            <div className="bg-green-500/20 p-3 rounded-xl w-fit mb-6">
              <Umbrella className="w-6 h-6 text-green-400" />
            </div>
            <h3 className="text-xl font-bold mb-4">Insurance Coverage</h3>
            <p className="text-slate-400 mb-6">
              Comprehensive insurance coverage protecting against various risks and potential losses.
            </p>
            <ul className="space-y-3">
              <li className="flex items-start space-x-3">
                <ShieldCheck className="w-5 h-5 text-green-400 mt-0.5" />
                <div>
                  <p className="font-medium">$50M Coverage</p>
                  <p className="text-sm text-slate-400">Through leading insurance providers</p>
                </div>
              </li>
              <li className="flex items-start space-x-3">
                <Lock className="w-5 h-5 text-blue-400 mt-0.5" />
                <div>
                  <p className="font-medium">Security Incidents</p>
                  <p className="text-sm text-slate-400">Protection against hacks and theft</p>
                </div>
              </li>
              <li className="flex items-start space-x-3">
                <Users className="w-5 h-5 text-purple-400 mt-0.5" />
                <div>
                  <p className="font-medium">Third-Party Coverage</p>
                  <p className="text-sm text-slate-400">Additional protection through partners</p>
                </div>
              </li>
            </ul>
          </motion.div>
        </div>

        {/* Coverage Details */}
        <div className="mt-12 grid grid-cols-1 md:grid-cols-2 gap-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="bg-gradient-to-br from-blue-500/10 to-purple-500/10 backdrop-blur-xl rounded-xl p-8 border border-blue-500/20"
          >
            <h4 className="text-lg font-bold mb-4">What's Covered</h4>
            <ul className="space-y-2">
              {[
                'Security breaches and unauthorized access',
                'Smart contract vulnerabilities',
                'Employee theft or fraud',
                'Cold storage losses',
                'Hardware security module failures',
                'Multi-signature wallet compromises'
              ].map((item, index) => (
                <li key={index} className="flex items-center space-x-2">
                  <CheckCircle2 className="w-5 h-5 text-green-400" />
                  <span className="text-slate-300">{item}</span>
                </li>
              ))}
            </ul>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="bg-gradient-to-br from-purple-500/10 to-pink-500/10 backdrop-blur-xl rounded-xl p-8 border border-purple-500/20"
          >
            <h4 className="text-lg font-bold mb-4">Insurance Partners</h4>
            <div className="space-y-4">
              <p className="text-slate-300">
                Our insurance coverage is provided through a consortium of leading insurers, including:
              </p>
              <ul className="space-y-2">
                <li className="flex items-center space-x-3">
                  <Building className="w-5 h-5 text-blue-400" />
                  <span className="text-slate-300">Lloyd's of London Syndicates</span>
                </li>
                <li className="flex items-center space-x-3">
                  <Building className="w-5 h-5 text-purple-400" />
                  <span className="text-slate-300">Arch Insurance</span>
                </li>
                <li className="flex items-center space-x-3">
                  <Building className="w-5 h-5 text-green-400" />
                  <span className="text-slate-300">Nexus Mutual</span>
                </li>
              </ul>
              <p className="text-sm text-slate-400 mt-4">
                All insurance policies are reviewed and updated quarterly to ensure comprehensive coverage.
              </p>
            </div>
          </motion.div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="text-center max-w-2xl mx-auto">
        <h2 className="text-3xl font-bold mb-4">Ready to Start Earning?</h2>
        <p className="text-slate-400 mb-8">
          Join thousands of satisfied users and start earning passive income today.
        </p>
        <Link
          to="/login"
          className="inline-block px-8 py-3 bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 text-white rounded-lg font-medium transition-all duration-200"
        >
          Start Staking Now
        </Link>
      </div>
    </div>
  );
}