"use client";

import { motion } from "framer-motion";
import { 
  Wallet, 
  ArrowUpRight, 
  ArrowDownRight, 
  TrendingUp,
  BarChart3,
  RefreshCw,
  Activity,
  Zap,
  Award,
  Clock,
  Coins,
  Globe,
  Shield,
  Sparkles,
  Rocket,
  CheckCircle,
  Star,
  Lock,
  Layers,
  Network
} from "lucide-react";
import { useState, useEffect } from "react";
import { useAccount } from "wagmi";

export default function HomePage() {
  const { isConnected } = useAccount();
  const [hoveredCard, setHoveredCard] = useState<number | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 1000);
    return () => clearTimeout(timer);
  }, []);

  // Animation variants with correct typing
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: "spring" as const,
        stiffness: 100,
        damping: 12,
      },
    },
  };

  const stats = [
    { value: "150+", label: "Supported Tokens", icon: Coins, color: "from-blue-500 to-cyan-500" },
    { value: "20+", label: "Blockchain Networks", icon: Globe, color: "from-purple-500 to-pink-500" },
    { value: "$25M+", label: "Total Volume", icon: TrendingUp, color: "from-green-500 to-emerald-500" },
    { value: "24/7", label: "Wallet Access", icon: Clock, color: "from-orange-500 to-red-500" },
  ];

  const features = [
    {
      title: "Portfolio",
      description: "View balances, token holdings, and portfolio value in real-time.",
      icon: BarChart3,
      gradient: "from-blue-500/20 to-cyan-500/20",
      borderColor: "border-blue-500/30",
    },
    {
      title: "Swap Tokens",
      description: "Exchange crypto assets instantly across supported chains with best rates.",
      icon: RefreshCw,
      gradient: "from-purple-500/20 to-pink-500/20",
      borderColor: "border-purple-500/30",
    },
    {
      title: "Transactions",
      description: "Monitor wallet activity and transaction history with detailed insights.",
      icon: Activity,
      gradient: "from-green-500/20 to-emerald-500/20",
      borderColor: "border-green-500/30",
    },
  ];

  const liveData = [
    { pair: "BTC/USD", price: "$68,432", change: "+2.4%", positive: true },
    { pair: "ETH/USD", price: "$3,521", change: "+1.8%", positive: true },
    { pair: "SOL/USD", price: "$172.50", change: "-0.7%", positive: false },
  ];

  // If not connected, show a different page
  if (!isConnected) {
    return (
      <div className="min-h-screen bg-linear-to-br from-black via-gray-900 to-black text-white flex items-center justify-center p-4">
        <div className="fixed inset-0 overflow-hidden pointer-events-none">
          <div className="absolute -top-40 -right-40 w-80 h-80 bg-blue-500/10 rounded-full blur-3xl animate-pulse" />
          <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-purple-500/10 rounded-full blur-3xl animate-pulse delay-1000" />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-cyan-500/5 rounded-full blur-3xl" />
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="max-w-2xl w-full text-center"
        >
          <div className="relative mb-8">
            <div className="absolute inset-0 bg-blue-500/20 rounded-full blur-3xl animate-pulse" />
            <div className="relative inline-block">
              <div className="w-28 h-28 rounded-full bg-blue-500/10 border-2 border-blue-500/20 flex items-center justify-center mx-auto">
                <Wallet className="w-14 h-14 text-blue-400" />
              </div>
            </div>
          </div>

          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ type: "spring", stiffness: 200, damping: 20 }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-white/10 bg-white/5 backdrop-blur-sm mb-6"
          >
            <Zap className="w-4 h-4 text-yellow-400" />
            <span className="text-sm font-medium">REOWN Dashboard</span>
          </motion.div>

          <h1 className="text-5xl md:text-6xl font-bold bg-linear-to-r from-white via-blue-400 to-purple-400 bg-clip-text text-transparent mb-6">
            Connect Your Wallet
          </h1>

          <p className="text-xl text-gray-400 max-w-xl mx-auto mb-8">
            Connect your wallet to access your portfolio, track assets, swap tokens, and manage transactions.
          </p>

          <div className="grid md:grid-cols-3 gap-4 mb-8">
            <div className="p-4 rounded-xl border border-white/10 bg-white/5 backdrop-blur-sm">
              <Shield className="w-6 h-6 text-blue-400 mx-auto mb-2" />
              <p className="text-sm font-medium">Secure</p>
              <p className="text-xs text-gray-500">Encrypted connection</p>
            </div>
            <div className="p-4 rounded-xl border border-white/10 bg-white/5 backdrop-blur-sm">
              <Layers className="w-6 h-6 text-purple-400 mx-auto mb-2" />
              <p className="text-sm font-medium">Multi-Chain</p>
              <p className="text-xs text-gray-500">Cross-chain support</p>
            </div>
            <div className="p-4 rounded-xl border border-white/10 bg-white/5 backdrop-blur-sm">
              <Network className="w-6 h-6 text-green-400 mx-auto mb-2" />
              <p className="text-sm font-medium">Live Data</p>
              <p className="text-xs text-gray-500">Real-time updates</p>
            </div>
          </div>

          <div className="flex justify-center">
            <button className="group px-8 py-3 bg-linear-to-r from-blue-500 to-purple-500 rounded-xl font-semibold hover:shadow-lg hover:shadow-blue-500/25 transition-all duration-300 hover:scale-105">
              <span className="flex items-center gap-2">
                <Wallet className="w-5 h-5" />
                Connect Wallet
                <ArrowUpRight className="w-4 h-4 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
              </span>
            </button>
          </div>
        </motion.div>
      </div>
    );
  }

  // If connected, show the full dashboard
  return (
    <div className="min-h-screen bg-linear-to-br from-black via-gray-900 to-black text-white">
      {/* Animated Background */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-blue-500/10 rounded-full blur-3xl animate-pulse" />
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-purple-500/10 rounded-full blur-3xl animate-pulse delay-1000" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-cyan-500/5 rounded-full blur-3xl" />
      </div>

      <div className="relative max-w-7xl mx-auto px-6 pt-24 pb-20">
        {/* Hero Section */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="text-center mb-16"
        >
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ type: "spring", stiffness: 200, damping: 20 }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-white/10 bg-white/5 backdrop-blur-sm mb-6"
          >
            <CheckCircle className="w-4 h-4 text-green-400" />
            <span className="text-sm font-medium">Wallet Connected</span>
            <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
          </motion.div>

          <motion.h1 
            className="text-6xl md:text-7xl font-bold bg-linear-to-r from-white via-blue-400 to-purple-400 bg-clip-text text-transparent"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            Welcome Back!
          </motion.h1>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3, duration: 0.6 }}
            className="mt-6 text-xl text-gray-400 max-w-2xl mx-auto"
          >
            Track your assets, swap tokens, and manage your portfolio in real-time.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="mt-8 flex flex-wrap justify-center gap-4"
          >
            <div className="flex items-center gap-3 px-6 py-3 rounded-xl border border-white/10 bg-white/5 backdrop-blur-sm">
              <Sparkles className="w-5 h-5 text-yellow-400" />
              <span className="text-gray-300">Your dashboard is ready</span>
              <ArrowUpRight className="w-4 h-4 text-blue-400" />
            </div>
          </motion.div>
        </motion.div>

        {/* Live Data Ticker */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6 }}
          className="mb-12 grid grid-cols-1 md:grid-cols-3 gap-4"
        >
          {liveData.map((item, index) => (
            <motion.div
              key={index}
              whileHover={{ scale: 1.02 }}
              className="flex items-center justify-between p-4 rounded-xl border border-white/5 bg-white/5 backdrop-blur-sm"
            >
              <div>
                <p className="text-sm text-gray-400">{item.pair}</p>
                <p className="text-xl font-bold">{item.price}</p>
              </div>
              <div className={`flex items-center gap-1 ${item.positive ? 'text-green-400' : 'text-red-400'}`}>
                {item.positive ? <ArrowUpRight className="w-4 h-4" /> : <ArrowDownRight className="w-4 h-4" />}
                <span className="font-semibold">{item.change}</span>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Dashboard Stats */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="grid md:grid-cols-3 gap-4 mb-12"
        >
          <motion.div variants={itemVariants} className="p-4 rounded-xl border border-white/10 bg-white/5 backdrop-blur-sm">
            <p className="text-sm text-gray-400">Portfolio Value</p>
            <p className="text-2xl font-bold text-green-400">$45,678.90</p>
            <p className="text-xs text-green-400">+12.5% this week</p>
          </motion.div>
          <motion.div variants={itemVariants} className="p-4 rounded-xl border border-white/10 bg-white/5 backdrop-blur-sm">
            <p className="text-sm text-gray-400">Active Tokens</p>
            <p className="text-2xl font-bold">12</p>
            <p className="text-xs text-gray-400">Across 3 networks</p>
          </motion.div>
          <motion.div variants={itemVariants} className="p-4 rounded-xl border border-white/10 bg-white/5 backdrop-blur-sm">
            <p className="text-sm text-gray-400">Recent Activity</p>
            <p className="text-2xl font-bold text-blue-400">5</p>
            <p className="text-xs text-gray-400">Transactions this week</p>
          </motion.div>
        </motion.div>

        {/* Stats Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="grid md:grid-cols-4 gap-6 mb-12"
        >
          {stats.map((stat, index) => (
            <motion.div
              key={index}
              variants={itemVariants}
              whileHover={{ 
                scale: 1.05,
                y: -5,
                transition: { type: "spring", stiffness: 300 }
              }}
              className="relative rounded-2xl border border-white/10 p-6 bg-linear-to-br from-white/5 to-transparent backdrop-blur-sm overflow-hidden group cursor-pointer"
              onMouseEnter={() => setHoveredCard(index)}
              onMouseLeave={() => setHoveredCard(null)}
            >
              <div className={`absolute inset-0 bg-linear-to-br ${stat.color} opacity-0 group-hover:opacity-10 transition-opacity duration-500`} />
              <motion.div
                animate={{
                  rotate: hoveredCard === index ? 360 : 0,
                  transition: { duration: 0.6 }
                }}
                className="w-12 h-12 rounded-xl bg-white/5 flex items-center justify-center mb-4"
              >
                <stat.icon className="w-6 h-6" />
              </motion.div>
              <motion.h2 
                className="text-3xl font-bold bg-linear-to-r from-white to-gray-400 bg-clip-text text-transparent"
                animate={{
                  scale: hoveredCard === index ? 1.1 : 1,
                }}
              >
                {stat.value}
              </motion.h2>
              <p className="text-gray-400 mt-2">{stat.label}</p>
            </motion.div>
          ))}
        </motion.div>

        {/* Features Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="grid lg:grid-cols-3 gap-6 mb-12"
        >
          {features.map((feature, index) => (
            <motion.div
              key={index}
              variants={itemVariants}
              whileHover={{ 
                y: -10,
                transition: { type: "spring", stiffness: 300 }
              }}
              className={`group relative rounded-2xl border ${feature.borderColor} p-8 bg-linear-to-br ${feature.gradient} backdrop-blur-sm overflow-hidden cursor-pointer`}
            >
              <div className="absolute inset-0 bg-linear-to-br from-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              <motion.div
                whileHover={{ rotate: 12, scale: 1.1 }}
                className="w-14 h-14 rounded-xl bg-linear-to-br from-white/10 to-transparent flex items-center justify-center mb-6"
              >
                <feature.icon className="w-7 h-7" />
              </motion.div>
              <h3 className="text-2xl font-semibold mb-4 group-hover:text-transparent group-hover:bg-linear-to-r group-hover:from-blue-400 group-hover:to-purple-400 group-hover:bg-clip-text transition-all">
                {feature.title}
              </h3>
              <p className="text-gray-400 leading-relaxed">{feature.description}</p>
              <motion.div
                initial={{ x: -20, opacity: 0 }}
                whileHover={{ x: 0, opacity: 1 }}
                className="mt-6 flex items-center gap-2 text-sm font-medium text-blue-400"
              >
                <span>Learn More</span>
                <ArrowUpRight className="w-4 h-4" />
              </motion.div>
            </motion.div>
          ))}
        </motion.div>

        {/* Call to Action */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8, duration: 0.6 }}
          whileHover={{ scale: 1.01 }}
          className="relative rounded-3xl border border-white/10 p-12 text-center bg-linear-to-br from-blue-500/10 via-purple-500/10 to-pink-500/10 backdrop-blur-sm overflow-hidden group"
        >
          <div className="absolute inset-0 bg-linear-to-r from-blue-500/5 to-purple-500/5 animate-pulse" />
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
            <Rocket className="w-16 h-16 mx-auto mb-6 text-blue-400" />
          </motion.div>
          <h2 className="text-4xl font-bold mb-4 bg-linear-to-r from-white to-gray-400 bg-clip-text text-transparent">
            Ready to Trade?
          </h2>
          <p className="text-gray-400 max-w-xl mx-auto">
            Explore your portfolio, swap tokens, and track your crypto journey today.
          </p>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="mt-8 px-8 py-3 bg-linear-to-r from-blue-500 to-purple-500 rounded-xl font-semibold hover:shadow-2xl hover:shadow-blue-500/25 transition-all duration-300"
          >
            View Dashboard
          </motion.button>
        </motion.div>

        {/* Loading Animation */}
        {isLoading && (
          <motion.div
            initial={{ opacity: 1 }}
            animate={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
            className="fixed inset-0 bg-black z-50 flex items-center justify-center"
          >
            <motion.div
              animate={{
                scale: [1, 1.2, 1],
                rotate: [0, 360],
              }}
              transition={{
                duration: 1,
                repeat: Infinity,
                ease: "easeInOut",
              }}
              className="w-16 h-16 rounded-full border-4 border-blue-500 border-t-transparent"
            />
          </motion.div>
        )}
      </div>
    </div>
  );
}