
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { 
  Shield, 
  Users, 
  Globe, 
 
  Lock, 

  Hexagon,
  
  ArrowUpRight,
  CheckCircle2,
 
  Lightbulb,
  Target,
  Heart,
  Sparkles,

  Network,
  Blocks,

} from 'lucide-react';
import img1 from '../../images/IMG_5346.jpg';
import img2 from '../../images/IMG_5349.jpg';
import img3 from '../../images/IMG_5353.jpg';

export function About() {
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
            <div className="relative">
              <div className="absolute inset-0 bg-blue-500/20 blur-xl rounded-full" />
              <div className="relative bg-gradient-to-br from-blue-500 to-purple-500 p-4 rounded-xl">
                <Hexagon className="w-8 h-8 text-white" />
              </div>
            </div>
            <div>
              <h2 className="text-2xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
                Building the Future of DeFi
              </h2>
              <p className="text-slate-300 mt-1">
                Pioneering decentralized staking solutions since 2023
              </p>
            </div>
          </div>
          <div className="flex items-center space-x-8">
            <div className="text-center">
              <div className="text-2xl font-bold text-blue-400">$50M+</div>
              <div className="text-sm text-slate-400">TVL</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-purple-400">15K+</div>
              <div className="text-sm text-slate-400">Users</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-green-400">$2.5M+</div>
              <div className="text-sm text-slate-400">Rewards Paid</div>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Vision Section */}
      <div className="grid md:grid-cols-2 gap-12 items-center mb-24">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="space-y-6"
        >
          <h2 className="text-3xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">Our Vision</h2>
          <p className="text-slate-300">
            At Starkord, we're revolutionizing the staking landscape by making it accessible, secure, and rewarding for everyone. Our platform combines cutting-edge technology with user-centric design to deliver an unmatched staking experience.
          </p>
          <p className="text-slate-300">
            We believe in the transformative power of decentralized finance to create a more inclusive and efficient financial system. Through our innovative staking solutions, we're enabling users worldwide to participate in the future of finance.
          </p>
          <div className="flex flex-col sm:flex-row items-center gap-4 pt-4">
            <Link
              to="/features"
              className="w-full sm:w-auto px-6 py-3 bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 rounded-xl flex items-center justify-center space-x-2 group transition-all duration-200"
            >
              <span>Explore Features</span>
              <ArrowUpRight className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
            </Link>
            <Link
              to="/login"
              className="w-full sm:w-auto px-6 py-3 bg-slate-800 hover:bg-slate-700 rounded-xl text-center transition-colors"
            >
              Start Staking
            </Link>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          className="grid grid-cols-2 gap-4"
        >
          {[
            { icon: Shield, label: 'Security First', color: 'text-blue-400 bg-blue-400/20' },
            { icon: Lightbulb, label: 'Innovation', color: 'text-purple-400 bg-purple-400/20' },
            { icon: Target, label: 'Transparency', color: 'text-green-400 bg-green-400/20' },
            { icon: Heart, label: 'Community', color: 'text-pink-400 bg-pink-400/20' },
          ].map((item, index) => (
            <div
              key={index}
              className="bg-slate-800/50 backdrop-blur-xl rounded-xl p-6 border border-slate-700/50 flex flex-col items-center text-center hover:border-blue-500/50 transition-all duration-200 group"
            >
              <div className={`p-3 rounded-lg mb-4 ${item.color} group-hover:scale-110 transition-transform`}>
                <item.icon className="w-6 h-6" />
              </div>
              <span className="font-medium">{item.label}</span>
            </div>
          ))}
        </motion.div>
      </div>

      {/* Technology Stack */}
      <div className="mb-24">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-4">Built on Innovation</h2>
          <p className="text-slate-400 max-w-2xl mx-auto">
            Our platform leverages cutting-edge blockchain technology and advanced security protocols
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-slate-800/50 backdrop-blur-xl rounded-xl p-8 border border-slate-700/50 hover:border-blue-500/50 transition-all duration-200 group"
          >
            <div className="bg-blue-500/20 p-3 rounded-xl w-fit mb-6 group-hover:scale-110 transition-transform">
              <Blocks className="w-6 h-6 text-blue-400" />
            </div>
            <h3 className="text-xl font-bold mb-4">Smart Contracts</h3>
            <p className="text-slate-400 mb-6">
              Battle-tested smart contracts with multiple security audits and formal verification.
            </p>
            <ul className="space-y-3">
              <li className="flex items-center text-sm text-slate-300">
                <CheckCircle2 className="w-4 h-4 text-green-400 mr-2" />
                Automated yield distribution
              </li>
              <li className="flex items-center text-sm text-slate-300">
                <CheckCircle2 className="w-4 h-4 text-green-400 mr-2" />
                Gas-optimized operations
              </li>
              <li className="flex items-center text-sm text-slate-300">
                <CheckCircle2 className="w-4 h-4 text-green-400 mr-2" />
                Upgradeable architecture
              </li>
            </ul>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="bg-slate-800/50 backdrop-blur-xl rounded-xl p-8 border border-slate-700/50 hover:border-purple-500/50 transition-all duration-200 group"
          >
            <div className="bg-purple-500/20 p-3 rounded-xl w-fit mb-6 group-hover:scale-110 transition-transform">
              <Network className="w-6 h-6 text-purple-400" />
            </div>
            <h3 className="text-xl font-bold mb-4">Infrastructure</h3>
            <p className="text-slate-400 mb-6">
              Enterprise-grade infrastructure ensuring high availability and performance.
            </p>
            <ul className="space-y-3">
              <li className="flex items-center text-sm text-slate-300">
                <CheckCircle2 className="w-4 h-4 text-green-400 mr-2" />
                Global node network
              </li>
              <li className="flex items-center text-sm text-slate-300">
                <CheckCircle2 className="w-4 h-4 text-green-400 mr-2" />
                99.99% uptime SLA
              </li>
              <li className="flex items-center text-sm text-slate-300">
                <CheckCircle2 className="w-4 h-4 text-green-400 mr-2" />
                Real-time monitoring
              </li>
            </ul>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="bg-slate-800/50 backdrop-blur-xl rounded-xl p-8 border border-slate-700/50 hover:border-green-500/50 transition-all duration-200 group"
          >
            <div className="bg-green-500/20 p-3 rounded-xl w-fit mb-6 group-hover:scale-110 transition-transform">
              <Shield className="w-6 h-6 text-green-400" />
            </div>
            <h3 className="text-xl font-bold mb-4">Security</h3>
            <p className="text-slate-400 mb-6">
              Multi-layered security approach protecting your assets 24/7.
            </p>
            <ul className="space-y-3">
              <li className="flex items-center text-sm text-slate-300">
                <CheckCircle2 className="w-4 h-4 text-green-400 mr-2" />
                Multi-signature wallets
              </li>
              <li className="flex items-center text-sm text-slate-300">
                <CheckCircle2 className="w-4 h-4 text-green-400 mr-2" />
                Insurance coverage
              </li>
              <li className="flex items-center text-sm text-slate-300">
                <CheckCircle2 className="w-4 h-4 text-green-400 mr-2" />
                Regular security audits
              </li>
            </ul>
          </motion.div>
        </div>
      </div>

      {/* Team Section */}
      <div className="mb-24">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-4">Meet Our Team</h2>
          <p className="text-slate-400 max-w-2xl mx-auto">
            Led by industry veterans with decades of combined experience in blockchain and finance
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {[
            {
              name: 'Sarah Chen',
              role: 'CEO & Founder',
              image: img1,
              description: 'Blockchain pioneer with 10+ years in DeFi',
              achievements: ['Former CTO at BlockTech', 'MIT Blockchain Research', 'DeFi Security Expert'],
              color: 'from-blue-500/20 to-purple-500/20'
            },
            {
              name: 'Michael Rodriguez',
              role: 'CTO',
              image: img2,
              description: 'Security expert and blockchain architect',
              achievements: ['15+ Years in Cybersecurity', 'Ethereum Core Contributor', 'Security Protocol Designer'],
              color: 'from-purple-500/20 to-pink-500/20'
            },
            {
              name: 'Emily Thompson',
              role: 'Head of Security',
              image: img3,
              description: 'Cybersecurity specialist and risk manager',
              achievements: ['CISSP Certified', 'Former Security Lead at Major Exchange', 'Risk Management Expert'],
              color: 'from-green-500/20 to-emerald-500/20'
            },
          ].map((member, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 * index }}
              className="bg-slate-800/50 backdrop-blur-xl rounded-xl p-8 border border-slate-700/50 hover:border-blue-500/50 transition-all duration-200"
            >
              <div className="relative mb-8">
                <div className={`absolute inset-0 bg-gradient-to-br ${member.color} blur-xl rounded-full`} />
                <img
                  src={member.image}
                  alt={member.name}
                  className="relative w-32 h-32 rounded-full mx-auto object-cover ring-4 ring-slate-700"
                />
                <div className="absolute -bottom-3 left-1/2 -translate-x-1/2 bg-gradient-to-r from-blue-500 to-purple-500 text-white px-4 py-1 rounded-full text-sm">
                  {member.role}
                </div>
              </div>
              <div className="text-center">
                <h3 className="text-xl font-bold mb-2">{member.name}</h3>
                <p className="text-slate-400 mb-4">{member.description}</p>
                <ul className="space-y-2">
                  {member.achievements.map((achievement, i) => (
                    <li key={i} className="flex items-center text-sm text-slate-300">
                      <CheckCircle2 className="w-4 h-4 text-green-400 mr-2 flex-shrink-0" />
                      <span>{achievement}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Core Values */}
      <div className="mb-24">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-4">Our Core Values</h2>
          <p className="text-slate-400 max-w-2xl mx-auto">
            The principles that guide everything we do
          </p>
        </div>

        <div className="grid md:grid-cols-4 gap-8">
          {[
            {
              icon: Lock,
              title: 'Security',
              description: "Your assets' safety is our top priority, backed by robust security measures.",
              color: 'text-blue-400 bg-blue-400/20'
            },
            {
              icon: Sparkles,
              title: 'Innovation',
              description: "Constantly pushing the boundaries of what's possible in DeFi.",
              color: 'text-purple-400 bg-purple-400/20'
            },
            {
              icon: Users,
              title: 'Community',
              description: 'Building and nurturing a strong, engaged community of stakers.',
              color: 'text-green-400 bg-green-400/20'
            },
            {
              icon: Globe,
              title: 'Transparency',
              description: 'Operating with complete openness and accountability.',
              color: 'text-amber-400 bg-amber-400/20'
            }
          ].map((value, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 * index }}
              className="bg-slate-800/50 backdrop-blur-xl rounded-xl p-8 border border-slate-700/50 hover:border-blue-500/50 transition-all duration-200 text-center group"
            >
              <div className={`p-3 rounded-lg w-fit mx-auto mb-6 ${value.color} group-hover:scale-110 transition-transform`}>
                <value.icon className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-bold mb-4">{value.title}</h3>
              <p className="text-slate-400">{value.description}</p>
            </motion.div>
          ))}
        </div>
      </div>

      {/* CTA Section */}
      <div className="text-center max-w-2xl mx-auto">
        <h2 className="text-3xl font-bold mb-4">Join the Future of Staking</h2>
        <p className="text-slate-400 mb-8">
          Be part of our growing community and start earning passive income today.
        </p>
        <Link
          to="/login"
          className="inline-block px-8 py-3 bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 text-white rounded-lg font-medium transition-all duration-200 group"
        >
          <span className="flex items-center">
            Start Staking Now
            <ArrowUpRight className="w-5 h-5 ml-2 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
          </span>
        </Link>
      </div>
    </div>
  );
}