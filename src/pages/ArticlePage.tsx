import React from 'react';
import { motion } from 'framer-motion';

import {
  Calendar,
  Clock,
  ArrowLeft,
  Twitter,
  Linkedin,
  Facebook,
  Copy,
  Check,
  Link,
} from 'lucide-react';

export function ArticlePage() {
  const [copied, setCopied] = React.useState(false);

  // This would normally come from an API/database
  const article = {
    id: 1,
    title: 'Introducing Starkord: The Next Generation of Decentralized Staking',
    excerpt: 'Learn how Starkord is revolutionizing the staking landscape with innovative features, enhanced security, and industry-leading yields.',
    content: `
      <h2>Revolutionizing DeFi Staking</h2>
      <p>Starkord represents a paradigm shift in decentralized staking, combining cutting-edge technology with user-centric design to deliver an unmatched staking experience. Our platform introduces several groundbreaking features that set new standards in the DeFi space.</p>

      <h3>Enhanced Security Architecture</h3>
      <p>Security is at the core of Starkord's design. Our multi-layered security approach includes:</p>
      <ul>
        <li>Multi-signature wallets requiring 3/5 signatures for withdrawals</li>
        <li>Cold storage for 98% of staked assets</li>
        <li>Comprehensive insurance coverage up to $50M</li>
        <li>Regular security audits by leading firms</li>
      </ul>

      <h3>Innovative Staking Plans</h3>
      <p>Starkord offers four distinct staking plans, each designed to meet different investment goals:</p>
      <ul>
        <li>Core Vault: Perfect for beginners with low minimum stake</li>
        <li>Growth Nexus: Balanced growth with compounding rewards</li>
        <li>Elite Matrix: Premium analytics and enhanced features</li>
        <li>Legacy Protocol: Premium tier with generational rewards</li>
      </ul>

      <h3>Industry-Leading Yields</h3>
      <p>Our innovative yield generation mechanisms and strategic partnerships enable us to offer some of the highest sustainable yields in the industry, ranging from 0.5% to 2.0% daily, with additional bonus opportunities through our milestone system.</p>

      <h2>Platform Features</h2>
      <p>Starkord introduces several unique features that enhance the staking experience:</p>
      <ul>
        <li>Real-time analytics dashboard for performance tracking</li>
        <li>Flexible withdrawal windows with reduced penalties</li>
        <li>Milestone bonuses for long-term stakers</li>
        <li>Flash stake events for temporary yield boosts</li>
        <li>Cross-chain bridging support</li>
      </ul>

      <h2>Looking Ahead</h2>
      <p>The launch of Starkord marks just the beginning of our journey. Our roadmap includes several exciting developments:</p>
      <ul>
        <li>Enhanced mobile application</li>
        <li>Additional staking pairs and options</li>
        <li>Advanced portfolio management tools</li>
        <li>Expanded insurance coverage</li>
        <li>Community governance implementation</li>
      </ul>
    `,
    date: '2024-03-14',
    readTime: '10 min read',
    image: 'https://images.unsplash.com/photo-1639762681485-074b7f938ba0?auto=format&fit=crop&w=800',
    category: 'Platform Updates',
    author: {
      name: 'Sarah Chen',
      image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=300',
      role: 'CEO & Founder',
      bio: 'Blockchain pioneer with 10+ years in DeFi'
    },
    comments: 32,
    likes: 245,
    tags: ['Platform Launch', 'Staking', 'DeFi']
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(window.location.href);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="max-w-4xl mx-auto">
        {/* Navigation */}
        <div className="mb-8">
          <Link
            to="/blog"
            className="inline-flex items-center text-slate-400 hover:text-white transition-colors"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            <span>Back to Blog</span>
          </Link>
        </div>

        {/* Article Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-12"
        >
          <div className="flex items-center space-x-2 mb-4">
            <span className="px-3 py-1 bg-blue-500/20 text-blue-400 rounded-full text-sm">
              {article.category}
            </span>
          </div>
          
          <h1 className="text-4xl md:text-5xl font-bold mb-6">{article.title}</h1>
          
          <p className="text-xl text-slate-300 mb-8">{article.excerpt}</p>

          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <img
                src={article.author.image}
                alt={article.author.name}
                className="w-12 h-12 rounded-full"
              />
              <div>
                <p className="font-medium">{article.author.name}</p>
                <p className="text-sm text-slate-400">{article.author.role}</p>
              </div>
            </div>
            <div className="flex items-center space-x-4 text-slate-400">
              <div className="flex items-center">
                <Calendar className="w-4 h-4 mr-2" />
                <span>{new Date(article.date).toLocaleDateString()}</span>
              </div>
              <div className="flex items-center">
                <Clock className="w-4 h-4 mr-2" />
                <span>{article.readTime}</span>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Featured Image */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="mb-12"
        >
          <img
            src={article.image}
            alt={article.title}
            className="w-full h-[400px] object-cover rounded-xl"
          />
        </motion.div>

        {/* Article Content */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="prose prose-invert prose-lg max-w-none mb-12"
          dangerouslySetInnerHTML={{ __html: article.content }}
        />

        {/* Tags */}
        <div className="flex flex-wrap gap-2 mb-8">
          {article.tags.map((tag, index) => (
            <span
              key={index}
              className="px-3 py-1 bg-slate-800/50 rounded-full text-sm text-slate-300"
            >
              #{tag}
            </span>
          ))}
        </div>

        {/* Share Section */}
        <div className="border-t border-slate-700/50 pt-8 mb-12">
          <h3 className="text-xl font-bold mb-4">Share this article</h3>
          <div className="flex items-center space-x-4">
            <button className="p-2 bg-slate-800/50 rounded-lg hover:bg-slate-700/50 transition-colors">
              <Twitter className="w-5 h-5" />
            </button>
            <button className="p-2 bg-slate-800/50 rounded-lg hover:bg-slate-700/50 transition-colors">
              <Linkedin className="w-5 h-5" />
            </button>
            <button className="p-2 bg-slate-800/50 rounded-lg hover:bg-slate-700/50 transition-colors">
              <Facebook className="w-5 h-5" />
            </button>
            <button
              onClick={copyToClipboard}
              className="p-2 bg-slate-800/50 rounded-lg hover:bg-slate-700/50 transition-colors"
            >
              {copied ? <Check className="w-5 h-5 text-green-400" /> : <Copy className="w-5 h-5" />}
            </button>
          </div>
        </div>

        {/* Author Bio */}
        <div className="bg-slate-800/50 backdrop-blur-xl rounded-xl p-8 border border-slate-700/50 mb-12">
          <div className="flex items-center space-x-4 mb-4">
            <img
              src={article.author.image}
              alt={article.author.name}
              className="w-16 h-16 rounded-full"
            />
            <div>
              <h3 className="text-xl font-bold">{article.author.name}</h3>
              <p className="text-slate-400">{article.author.role}</p>
            </div>
          </div>
          <p className="text-slate-300">{article.author.bio}</p>
        </div>

        {/* Related Articles */}
        <div>
          <h3 className="text-2xl font-bold mb-6">Related Articles</h3>
          <div className="grid md:grid-cols-2 gap-8">
            {/* Add related articles here */}
          </div>
        </div>
      </div>
    </div>
  );
}