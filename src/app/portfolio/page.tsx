"use client";

import Portfolio from "@/components/Portfolio";
import TokenList from "@/components/TokenList";
import { motion } from "framer-motion";
import { BarChart3, TrendingUp, Wallet, Activity, Sparkles } from "lucide-react";
import { useAccount } from "wagmi";

export default function PortfolioPage() {
  const { isConnected } = useAccount();

  return (
    <div className="min-h-screen bg-linear-to-br from-black via-gray-900 to-black text-white">
      {/* Animated Background */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-blue-500/10 rounded-full blur-3xl animate-pulse" />
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-purple-500/10 rounded-full blur-3xl animate-pulse delay-1000" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-cyan-500/5 rounded-full blur-3xl" />
      </div>

      <div className="relative max-w-7xl mx-auto px-6 pt-24 pb-20">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="mb-10"
        >
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div>
              <div className="flex items-center gap-3 mb-2">
                <div className="p-2.5 rounded-xl bg-blue-500/10 border border-blue-500/20 shadow-lg shadow-blue-500/5">
                  <BarChart3 className="w-6 h-6 text-blue-400" />
                </div>
                <h1 className="text-4xl font-bold bg-linear-to-r from-white to-blue-400 bg-clip-text text-transparent">
                  Portfolio
                </h1>
                <span className="px-2.5 py-0.5 text-xs font-medium rounded-full bg-blue-500/20 text-blue-400 border border-blue-500/20">
                  {isConnected ? 'LIVE' : 'OFFLINE'}
                </span>
              </div>
              <p className="text-gray-400 ml-1">
                Track your crypto assets and manage your portfolio in real-time
              </p>
            </div>
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="flex items-center gap-2 px-4 py-2 rounded-xl bg-white/5 border border-white/10 backdrop-blur-sm"
            >
              <Sparkles className="w-4 h-4 text-yellow-400" />
              <span className="text-sm text-gray-300">Smart Portfolio</span>
            </motion.div>
          </div>
        </motion.div>

        <div className="grid lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2">
            <Portfolio />
          </div>
          <div className="lg:col-span-1">
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 }}
              className="rounded-2xl border border-white/10 bg-white/5 backdrop-blur-sm p-6"
            >
              <h3 className="text-sm font-medium text-gray-400 mb-4 flex items-center gap-2">
                <Activity className="w-4 h-4" />
                Quick Stats
              </h3>
              <div className="space-y-3">
                <div className="flex items-center justify-between p-3 rounded-xl bg-white/5 border border-white/5 hover:border-white/10 transition-colors">
                  <span className="text-sm text-gray-400">Portfolio Value</span>
                  <span className="text-sm font-semibold text-green-400">$0.00</span>
                </div>
                <div className="flex items-center justify-between p-3 rounded-xl bg-white/5 border border-white/5 hover:border-white/10 transition-colors">
                  <span className="text-sm text-gray-400">24h Change</span>
                  <span className="text-sm font-semibold text-green-400">+0.00%</span>
                </div>
                <div className="flex items-center justify-between p-3 rounded-xl bg-white/5 border border-white/5 hover:border-white/10 transition-colors">
                  <span className="text-sm text-gray-400">Active Tokens</span>
                  <span className="text-sm font-semibold text-white">0</span>
                </div>
                <div className="flex items-center justify-between p-3 rounded-xl bg-white/5 border border-white/5 hover:border-white/10 transition-colors">
                  <span className="text-sm text-gray-400">Network</span>
                  <span className="text-sm font-semibold text-blue-400">Ethereum</span>
                </div>
              </div>
            </motion.div>
          </div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.5 }}
          className="mt-8"
        >
          <TokenList />
        </motion.div>
      </div>
    </div>
  );
}