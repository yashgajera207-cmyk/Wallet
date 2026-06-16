"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Wallet, 
  TrendingUp, 
  TrendingDown,
  BarChart3,
  Activity,
  DollarSign,
  Coins,
  Clock,
  ArrowUpRight,
  ArrowDownRight,
  RefreshCw,
  Zap,
  Sparkles,
  Award,
  Shield,
  Users,
  Lock,
  Globe,
  PieChart,
  LineChart,
  Loader2,
  Eye,
  EyeOff,
  Settings,
  Bell,
  Search,
  CheckCircle,
  ArrowRight,
  Info,
  Rocket,
  Layers,
  Network,
  Code,
  Star,
  ThumbsUp,
  Gift,
  Target,
  Flame,
  Crown,
  Gem,
  Brain,
  Compass
} from "lucide-react";

export default function DashboardPage() {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 1000);
    return () => clearTimeout(timer);
  }, []);

  // Features data
  const features = [
    {
      icon: Wallet,
      title: "Wallet Connection",
      description: "Connect your crypto wallet securely to access your portfolio and manage assets.",
      color: "from-blue-500 to-cyan-500"
    },
    {
      icon: TrendingUp,
      title: "Live Prices",
      description: "Track real-time cryptocurrency prices across multiple chains and exchanges.",
      color: "from-green-500 to-emerald-500"
    },
    {
      icon: RefreshCw,
      title: "Token Swaps",
      description: "Swap tokens instantly with the best rates across supported blockchain networks.",
      color: "from-purple-500 to-pink-500"
    },
    {
      icon: BarChart3,
      title: "Portfolio Tracking",
      description: "Monitor your portfolio performance with detailed analytics and insights.",
      color: "from-orange-500 to-red-500"
    },
    {
      icon: Shield,
      title: "Secure & Private",
      description: "Your data is encrypted and secure. We never store your private keys.",
      color: "from-indigo-500 to-purple-500"
    },
    {
      icon: Globe,
      title: "Multi-Chain Support",
      description: "Supports Ethereum, Polygon, BSC, and many more blockchain networks.",
      color: "from-cyan-500 to-blue-500"
    }
  ];

  // How it works steps
  const steps = [
    {
      number: "01",
      title: "Connect Wallet",
      description: "Click the 'Connect Wallet' button and choose your preferred wallet provider.",
      icon: Wallet
    },
    {
      number: "02",
      title: "Track Assets",
      description: "View your portfolio, token balances, and transaction history in real-time.",
      icon: PieChart
    },
    {
      number: "03",
      title: "Start Trading",
      description: "Swap tokens, monitor prices, and manage your crypto portfolio all in one place.",
      icon: TrendingUp
    }
  ];

  // Stats
  const stats = [
    { value: "150+", label: "Supported Tokens", icon: Coins },
    { value: "10+", label: "Blockchains", icon: Layers },
    { value: "$25M+", label: "Total Volume", icon: DollarSign },
    { value: "24/7", label: "Live Support", icon: Clock }
  ];

  // Testimonials
  const testimonials = [
    {
      name: "Sarah Johnson",
      role: "Crypto Trader",
      text: "The best dashboard I've used for tracking my portfolio. The real-time updates are incredible!",
      rating: 5
    },
    {
      name: "Michael Chen",
      role: "DeFi Enthusiast",
      text: "Love the multi-chain support. Being able to track all my assets in one place is a game changer.",
      rating: 5
    },
    {
      name: "Emily Rodriguez",
      role: "NFT Collector",
      text: "The interface is clean and intuitive. Makes managing my crypto so much easier.",
      rating: 5
    }
  ];

  if (isLoading) {
    return (
      <div className="min-h-screen bg-linear-to-br from-black via-gray-900 to-black flex items-center justify-center">
        <div className="flex flex-col items-center gap-4">
          <div className="relative">
            <div className="w-16 h-16 rounded-full border-4 border-blue-500/20 border-t-blue-500 animate-spin" />
            <div className="absolute inset-0 w-16 h-16 rounded-full bg-blue-500/10 animate-pulse" />
          </div>
          <p className="text-gray-400">Loading dashboard...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-linear-to-br from-black via-gray-900 to-black text-white">
      {/* Animated Background */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-blue-500/10 rounded-full blur-3xl animate-pulse" />
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-purple-500/10 rounded-full blur-3xl animate-pulse delay-1000" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-cyan-500/5 rounded-full blur-3xl" />
        <div className="absolute top-20 left-1/4 w-64 h-64 bg-blue-500/5 rounded-full blur-3xl animate-pulse delay-2000" />
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 py-8 pt-24">
        {/* Hero Section */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-16"
        >
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ type: "spring", stiffness: 200, damping: 20 }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-white/10 bg-white/5 backdrop-blur-sm mb-6"
          >
            <Rocket className="w-4 h-4 text-blue-400" />
            <span className="text-sm font-medium">Welcome to REOWN</span>
            <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
          </motion.div>

          <motion.h1 
            className="text-5xl sm:text-6xl md:text-7xl font-bold bg-linear-to-r from-white via-blue-400 to-purple-400 bg-clip-text text-transparent mb-6"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            Your All-in-One Crypto Dashboard
          </motion.h1>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3, duration: 0.6 }}
            className="text-xl text-gray-400 max-w-3xl mx-auto"
          >
            Track assets, swap tokens, monitor prices, and manage your entire crypto portfolio 
            from one powerful, intuitive dashboard.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="mt-8 flex flex-wrap justify-center gap-4"
          >
            <button className="group px-8 py-3 bg-linear-to-r from-blue-500 to-purple-500 rounded-xl font-semibold hover:shadow-lg hover:shadow-blue-500/25 transition-all duration-300 hover:scale-105">
              <span className="flex items-center gap-2">
                <Wallet className="w-5 h-5" />
                Connect Wallet
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </span>
            </button>
            <button className="px-8 py-3 border border-white/20 rounded-xl font-semibold hover:bg-white/5 transition-all duration-300 hover:scale-105 backdrop-blur-sm flex items-center gap-2">
              <Info className="w-5 h-5" />
              Learn More
            </button>
          </motion.div>
        </motion.div>

        {/* Stats Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-16"
        >
          {stats.map((stat, index) => (
            <motion.div
              key={index}
              whileHover={{ scale: 1.05, y: -5 }}
              className="p-6 rounded-2xl border border-white/10 bg-white/5 backdrop-blur-sm text-center"
            >
              <stat.icon className="w-8 h-8 mx-auto text-blue-400 mb-3" />
              <p className="text-3xl font-bold bg-linear-to-r from-white to-blue-400 bg-clip-text text-transparent">
                {stat.value}
              </p>
              <p className="text-sm text-gray-400 mt-1">{stat.label}</p>
            </motion.div>
          ))}
        </motion.div>

        {/* Features Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="mb-16"
        >
          <div className="text-center mb-10">
            <h2 className="text-3xl font-bold mb-4">Powerful Features</h2>
            <p className="text-gray-400 max-w-2xl mx-auto">
              Everything you need to manage your crypto portfolio in one place
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {features.map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 * index }}
                whileHover={{ 
                  y: -10,
                  transition: { type: "spring", stiffness: 300 }
                }}
                className="group relative p-6 rounded-2xl border border-white/10 bg-white/5 backdrop-blur-sm hover:border-white/20 transition-all duration-300"
              >
                <div className={`absolute inset-0 bg-linear-to-br ${feature.color} opacity-0 group-hover:opacity-5 transition-opacity duration-500 rounded-2xl`} />
                <div className="relative">
                  <div className="w-12 h-12 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center mb-4">
                    <feature.icon className="w-6 h-6 text-blue-400" />
                  </div>
                  <h3 className="text-lg font-semibold mb-2">{feature.title}</h3>
                  <p className="text-sm text-gray-400">{feature.description}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* How It Works */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="mb-16"
        >
          <div className="text-center mb-10">
            <h2 className="text-3xl font-bold mb-4">How It Works</h2>
            <p className="text-gray-400 max-w-2xl mx-auto">
              Get started in three simple steps
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {steps.map((step, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 + index * 0.1 }}
                whileHover={{ scale: 1.02 }}
                className="relative"
              >
                <div className="p-6 rounded-2xl border border-white/10 bg-white/5 backdrop-blur-sm">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-10 h-10 rounded-full bg-blue-500/10 border border-blue-500/20 flex items-center justify-center">
                      <step.icon className="w-5 h-5 text-blue-400" />
                    </div>
                    <span className="text-sm font-medium text-blue-400">{step.number}</span>
                  </div>
                  <h3 className="text-lg font-semibold mb-2">{step.title}</h3>
                  <p className="text-sm text-gray-400">{step.description}</p>
                  {index < steps.length - 1 && (
                    <div className="hidden md:block absolute top-1/2 -right-4 transform -translate-y-1/2">
                      <ArrowRight className="w-6 h-6 text-gray-600" />
                    </div>
                  )}
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Testimonials */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="mb-16"
        >
          <div className="text-center mb-10">
            <h2 className="text-3xl font-bold mb-4">What Our Users Say</h2>
            <p className="text-gray-400 max-w-2xl mx-auto">
              Trusted by thousands of crypto enthusiasts
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {testimonials.map((testimonial, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.1 * index }}
                whileHover={{ y: -5 }}
                className="p-6 rounded-2xl border border-white/10 bg-white/5 backdrop-blur-sm"
              >
                <div className="flex gap-1 mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                  ))}
                </div>
                <p className="text-sm text-gray-300 mb-4">"{testimonial.text}"</p>
                <div>
                  <p className="font-semibold">{testimonial.name}</p>
                  <p className="text-xs text-gray-500">{testimonial.role}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* CTA Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="relative rounded-3xl border border-white/10 p-12 text-center bg-linear-to-br from-blue-500/10 via-purple-500/10 to-pink-500/10 backdrop-blur-sm overflow-hidden"
        >
          <div className="absolute inset-0 bg-linear-to-r from-blue-500/5 to-purple-500/5 animate-pulse" />
          <div className="relative">
            <motion.div
              animate={{
                y: [0, -5, 0],
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                ease: "easeInOut"
              }}
            >
              <Crown className="w-16 h-16 mx-auto mb-6 text-yellow-400" />
            </motion.div>
            <h2 className="text-3xl font-bold mb-4">Ready to Get Started?</h2>
            <p className="text-gray-400 max-w-xl mx-auto mb-8">
              Join thousands of users managing their crypto portfolio with our powerful dashboard.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <button className="px-8 py-3 bg-linear-to-r from-blue-500 to-purple-500 rounded-xl font-semibold hover:shadow-lg hover:shadow-blue-500/25 transition-all duration-300 hover:scale-105 flex items-center gap-2">
                <Rocket className="w-5 h-5" />
                Get Started Now
              </button>
              <button className="px-8 py-3 border border-white/20 rounded-xl font-semibold hover:bg-white/5 transition-all duration-300 hover:scale-105 backdrop-blur-sm flex items-center gap-2">
                <Compass className="w-5 h-5" />
                Explore Features
              </button>
            </div>
          </div>
        </motion.div>

        {/* Footer */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.7 }}
          className="mt-12 pt-8 border-t border-white/5 flex flex-wrap items-center justify-between gap-4 text-sm text-gray-500"
        >
          <div className="flex items-center gap-2">
            <Gem className="w-4 h-4 text-blue-400" />
            <span>REOWN Crypto Dashboard</span>
          </div>
          <div className="flex items-center gap-6">
            <span>© 2024 REOWN. All rights reserved.</span>
            <div className="flex items-center gap-4">
              <button className="hover:text-white transition-colors">Privacy</button>
              <button className="hover:text-white transition-colors">Terms</button>
              <button className="hover:text-white transition-colors">Support</button>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}