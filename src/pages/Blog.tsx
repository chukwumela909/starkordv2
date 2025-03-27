import  { useState } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { 
  Calendar, 
  Clock, 
  ArrowRight, 
  Search, 
  Filter,
  MessageSquare,
  Share2,
  Bookmark,
  ArrowUpRight,
} from 'lucide-react';

export function Blog() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');

  const categories = [
    { id: 'all', name: 'All Posts' },
    { id: 'platform', name: 'Platform Updates', count: 8 },
    { id: 'guides', name: 'Staking Guides', count: 12 },
    { id: 'security', name: 'Security', count: 6 },
    { id: 'community', name: 'Community', count: 5 },
    { id: 'research', name: 'Research', count: 4 }
  ];

  const posts = [
    {
      id: 1,
      title: 'Introducing Starkord: The Next Generation of Decentralized Staking',
      excerpt: 'Learn how Starkord is revolutionizing the staking landscape with innovative features, enhanced security, and industry-leading yields.',
      date: '2024-03-14',
      readTime: '10 min read',
      image: 'https://images.unsplash.com/photo-1639762681485-074b7f938ba0?auto=format&fit=crop&w=800',
      category: 'Platform Updates',
      author: {
        name: 'Sarah Chen',
        image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=300'
      },
      comments: 32,
      likes: 245,
      tags: ['Platform Launch', 'Staking', 'DeFi']
    },
    {
      id: 2,
      title: 'Starkord Security: Multi-Layer Protection for Your Assets',
      excerpt: 'Deep dive into Starkord\'s comprehensive security measures, including multi-signature wallets, cold storage, and insurance coverage.',
      date: '2024-03-12',
      readTime: '8 min read',
      image: 'https://images.unsplash.com/photo-1639762681057-408e52192e55?auto=format&fit=crop&w=800',
      category: 'Security',
      author: {
        name: 'Michael Rodriguez',
        image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=300'
      },
      comments: 28,
      likes: 189,
      tags: ['Security', 'Asset Protection', 'Insurance']
    },
    {
      id: 3,
      title: 'Maximizing Returns with Starkord\'s Elite Matrix Plan',
      excerpt: 'Discover how our Elite Matrix plan combines premium analytics, flash stake events, and milestone bonuses for optimal staking returns.',
      date: '2024-03-10',
      readTime: '12 min read',
      image: 'https://images.unsplash.com/photo-1639762681085-2ca0d43d2690?auto=format&fit=crop&w=800',
      category: 'Guides',
      author: {
        name: 'Emily Thompson',
        image: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=300'
      },
      comments: 45,
      likes: 276,
      tags: ['Elite Matrix', 'Yield Optimization', 'Analytics']
    },
    {
      id: 4,
      title: 'The Starkord Advantage: Why Our Platform Leads in DeFi Staking',
      excerpt: 'Compare Starkord\'s unique features, yields, and security measures with other staking platforms to understand our competitive edge.',
      date: '2024-03-08',
      readTime: '15 min read',
      image: 'https://images.unsplash.com/photo-1639762681057-408e52192e55?auto=format&fit=crop&w=800',
      category: 'Research',
      author: {
        name: 'David Kumar',
        image: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=300'
      },
      comments: 36,
      likes: 198,
      tags: ['Platform Comparison', 'DeFi', 'Analysis']
    }
  ];

  const filteredPosts = posts.filter(post => {
    const matchesSearch = post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         post.excerpt.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'all' || 
                          post.category.toLowerCase().replace(/\s+/g, '') === selectedCategory.toLowerCase();
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="container mx-auto px-4 py-12">
      {/* Hero Section */}
      <div className="text-center max-w-3xl mx-auto mb-16">
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-4xl md:text-5xl font-bold mb-6"
        >
          Starkord Insights
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="text-xl text-slate-300"
        >
          Stay informed with the latest updates, guides, and insights from the Starkord team
        </motion.p>
      </div>

      {/* Search and Filter */}
      <div className="mb-12">
        <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
          <div className="relative flex-1">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 w-5 h-5" />
            <input
              type="text"
              placeholder="Search articles..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full bg-slate-800/50 border border-slate-700/50 rounded-xl py-3 pl-12 pr-4 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
          <div className="flex items-center space-x-4">
            <Filter className="w-5 h-5 text-slate-400" />
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="bg-slate-800/50 border border-slate-700/50 rounded-xl py-3 px-4 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              {categories.map(category => (
                <option key={category.id} value={category.id}>
                  {category.name} {category.count ? `(${category.count})` : ''}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {/* Featured Post */}
      <motion.article
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-slate-800/50 backdrop-blur-xl rounded-xl border border-slate-700/50 overflow-hidden mb-12 hover:border-blue-500/50 transition-all duration-200"
      >
        <div className="grid md:grid-cols-2 gap-8">
          <div className="relative h-[400px]">
            <img
              src={posts[0].image}
              alt={posts[0].title}
              className="absolute inset-0 w-full h-full object-cover"
            />
          </div>
          <div className="p-8 flex flex-col justify-center">
            <div className="flex items-center space-x-2 mb-4">
              <span className="px-3 py-1 bg-blue-500/20 text-blue-400 rounded-full text-sm">
                {posts[0].category}
              </span>
              <span className="px-3 py-1 bg-purple-500/20 text-purple-400 rounded-full text-sm">
                Featured
              </span>
            </div>
            <h2 className="text-3xl font-bold mb-4">{posts[0].title}</h2>
            <p className="text-slate-300 mb-6">{posts[0].excerpt}</p>
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center space-x-4">
                <img
                  src={posts[0].author.image}
                  alt={posts[0].author.name}
                  className="w-10 h-10 rounded-full"
                />
                <div>
                  <p className="font-medium">{posts[0].author.name}</p>
                  <div className="flex items-center text-sm text-slate-400">
                    <Calendar className="w-4 h-4 mr-2" />
                    <span>{new Date(posts[0].date).toLocaleDateString()}</span>
                    <Clock className="w-4 h-4 ml-4 mr-2" />
                    <span>{posts[0].readTime}</span>
                  </div>
                </div>
              </div>
              <div className="flex items-center space-x-4 text-slate-400">
                <button className="hover:text-white transition-colors">
                  <MessageSquare className="w-5 h-5" />
                </button>
                <button className="hover:text-white transition-colors">
                  <Share2 className="w-5 h-5" />
                </button>
                <button className="hover:text-white transition-colors">
                  <Bookmark className="w-5 h-5" />
                </button>
              </div>
            </div>
            <Link
              to={`/blog/${posts[0].id}`}
              className="inline-flex items-center text-blue-400 hover:text-blue-300 transition-colors group"
            >
              <span className="mr-2">Read Article</span>
              <ArrowUpRight className="w-5 h-5 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
            </Link>
          </div>
        </div>
      </motion.article>

      {/* Post Grid */}
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
        {filteredPosts.slice(1).map((post, index) => (
          <motion.article
            key={post.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 * index }}
            className="bg-slate-800/50 backdrop-blur-xl rounded-xl border border-slate-700/50 overflow-hidden hover:border-blue-500/50 transition-all duration-200"
          >
            <div className="relative h-48">
              <img
                src={post.image}
                alt={post.title}
                className="absolute inset-0 w-full h-full object-cover"
              />
              <div className="absolute top-4 right-4">
                <span className="px-3 py-1 bg-slate-900/80 backdrop-blur-sm rounded-full text-sm">
                  {post.category}
                </span>
              </div>
            </div>
            <div className="p-6">
              <div className="flex items-center space-x-4 mb-4">
                <img
                  src={post.author.image}
                  alt={post.author.name}
                  className="w-8 h-8 rounded-full"
                />
                <div>
                  <p className="text-sm font-medium">{post.author.name}</p>
                  <p className="text-xs text-slate-400">{new Date(post.date).toLocaleDateString()}</p>
                </div>
              </div>
              <h3 className="text-xl font-bold mb-2 line-clamp-2">{post.title}</h3>
              <p className="text-slate-300 mb-4 line-clamp-2">{post.excerpt}</p>
              <div className="flex items-center justify-between">
                <div className="flex items-center text-sm text-slate-400">
                  <Clock className="w-4 h-4 mr-1" />
                  <span>{post.readTime}</span>
                  <MessageSquare className="w-4 h-4 ml-4 mr-1" />
                  <span>{post.comments}</span>
                </div>
                <Link
                  to={`/blog/${post.id}`}
                  className="text-blue-400 hover:text-blue-300 transition-colors"
                >
                  <ArrowUpRight className="w-5 h-5" />
                </Link>
              </div>
              <div className="mt-4 flex flex-wrap gap-2">
                {post.tags.map((tag, tagIndex) => (
                  <span
                    key={tagIndex}
                    className="px-2 py-1 bg-slate-700/50 rounded-full text-xs text-slate-300"
                  >
                    #{tag}
                  </span>
                ))}
              </div>
            </div>
          </motion.article>
        ))}
      </div>

      {/* Newsletter Section */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mt-16 bg-gradient-to-r from-blue-500/10 via-purple-500/10 to-blue-500/10 backdrop-blur-xl rounded-2xl p-8 border border-blue-500/20"
      >
        <div className="max-w-2xl mx-auto text-center">
          <h2 className="text-2xl font-bold mb-4">Stay Updated</h2>
          <p className="text-slate-300 mb-6">
            Subscribe to our newsletter for the latest insights and updates delivered directly to your inbox
          </p>
          <div className="flex flex-col sm:flex-row gap-4">
            <input
              type="email"
              placeholder="Enter your email"
              className="flex-1 bg-slate-900/50 border border-slate-700 rounded-xl px-4 py-3 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
            <button className="px-6 py-3 bg-blue-500 hover:bg-blue-600 rounded-xl font-medium transition-colors flex items-center justify-center space-x-2">
              <span>Subscribe</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </motion.div>
    </div>
  );
}