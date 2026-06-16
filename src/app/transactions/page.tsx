"use client";

import { motion } from "framer-motion";
import { Inbox, History, Wallet, Zap, ArrowUpRight } from "lucide-react";
import { useAccount } from "wagmi";

export default function TransactionsPage() {
  const { isConnected } = useAccount();

  return (
    <div className="min-h-screen bg-linear-to-br from-black via-gray-900 to-black text-white">
      {/* Animated Background */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-blue-500/10 rounded-full blur-3xl animate-pulse" />
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-purple-500/10 rounded-full blur-3xl animate-pulse delay-1000" />
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 py-8 pt-24">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-8"
        >
          <div>
            <div className="flex items-center gap-3">
              <div className="p-2.5 rounded-xl bg-blue-500/10 border border-blue-500/20">
                <History className="w-6 h-6 text-blue-400" />
              </div>
              <div>
                <h1 className="text-3xl font-bold bg-linear-to-r from-white to-blue-400 bg-clip-text text-transparent">
                  Transactions
                </h1>
                <p className="text-sm text-gray-400">
                  {!isConnected ? 'Connect wallet to view transactions' : 'No transactions found'}
                </p>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Content based on connection status */}
        {!isConnected ? (
          // Not Connected State
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="rounded-3xl border border-white/10 bg-white/5 backdrop-blur-sm p-12 text-center"
          >
            <div className="flex flex-col items-center max-w-md mx-auto">
              <div className="relative mb-6">
                <div className="absolute inset-0 bg-blue-500/20 rounded-full blur-3xl animate-pulse" />
                <div className="relative w-24 h-24 rounded-full bg-blue-500/10 border-2 border-blue-500/20 flex items-center justify-center">
                  <Wallet className="w-12 h-12 text-blue-400" />
                </div>
              </div>
              
              <h3 className="text-2xl font-bold text-gray-200 mb-2">Connect Your Wallet</h3>
              <p className="text-gray-400 mb-6">
                Connect your wallet to view your transaction history and activity.
              </p>
              <button className="group px-8 py-3 bg-linear-to-r from-blue-500 to-purple-500 rounded-xl font-semibold hover:shadow-lg hover:shadow-blue-500/25 transition-all duration-300 hover:scale-105">
                <span className="flex items-center gap-2">
                  <Wallet className="w-5 h-5" />
                  Connect Wallet
                  <ArrowUpRight className="w-4 h-4 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                </span>
              </button>
            </div>
          </motion.div>
        ) : (
          // Connected but No Transactions State
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="rounded-3xl border border-white/10 bg-white/5 backdrop-blur-sm p-12 text-center"
          >
            <div className="flex flex-col items-center max-w-md mx-auto">
              <div className="relative mb-6">
                <div className="absolute inset-0 bg-yellow-500/20 rounded-full blur-3xl animate-pulse" />
                <div className="relative w-24 h-24 rounded-full bg-yellow-500/10 border-2 border-yellow-500/20 flex items-center justify-center">
                  <Inbox className="w-12 h-12 text-yellow-400" />
                </div>
              </div>
              
              <h3 className="text-2xl font-bold text-gray-200 mb-2">No Transactions Found</h3>
              <p className="text-gray-400">
                Your transaction history is empty. Start trading to see your activity here.
              </p>
            </div>
          </motion.div>
        )}
      </div>
    </div>
  );
}