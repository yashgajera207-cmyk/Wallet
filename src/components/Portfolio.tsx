"use client";

import { useAccount, useBalance } from "wagmi";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Wallet, 
  CheckCircle, 
  Link2, 
  Activity,
  Copy,
  ExternalLink,
  TrendingUp,
  TrendingDown,
  Shield,
  Zap,
  Loader2,
  Sparkles,
  DollarSign
} from "lucide-react";
import { useState, useEffect } from "react";

export default function Portfolio() {
  const { address, isConnected, chain } = useAccount();
  const [copied, setCopied] = useState(false);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [balanceUSD, setBalanceUSD] = useState<number | null>(null);

  const { data: balance, isLoading, refetch } = useBalance({
    address,
  });

  useEffect(() => {
    if (balance?.value) {
      // Use a real price API in production
      const ethPrice = 3500; // Example ETH price
      const usdValue = Number(balance.formatted) * ethPrice;
      setBalanceUSD(usdValue);
    }
  }, [balance]);

  const copyAddress = () => {
    if (address) {
      navigator.clipboard.writeText(address);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const handleRefresh = async () => {
    setIsRefreshing(true);
    await refetch();
    setTimeout(() => setIsRefreshing(false), 800);
  };

  if (!isConnected) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="rounded-2xl border border-white/10 bg-white/5 backdrop-blur-sm p-12 text-center"
      >
        <div className="flex flex-col items-center">
          <div className="relative">
            <div className="absolute inset-0 bg-blue-500/20 rounded-full blur-2xl animate-pulse" />
            <div className="relative w-24 h-24 rounded-full bg-blue-500/10 border-2 border-blue-500/20 flex items-center justify-center mb-6">
              <Wallet className="w-12 h-12 text-blue-400" />
            </div>
          </div>
          <h3 className="text-2xl font-semibold mb-3 bg-linear-to-r from-white to-blue-400 bg-clip-text text-transparent">
            Connect Your Wallet
          </h3>
          <p className="text-gray-400 max-w-md mx-auto">
            Connect your wallet to view your portfolio, track assets, and manage your crypto holdings in real-time.
          </p>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="mt-8 px-8 py-3 bg-linear-to-r from-blue-500 to-purple-500 rounded-xl font-medium shadow-lg shadow-blue-500/25 hover:shadow-blue-500/40 transition-all duration-300"
          >
            <span className="flex items-center gap-2">
              <Zap className="w-4 h-4" />
              Connect Wallet
            </span>
          </motion.button>
        </div>
      </motion.div>
    );
  }

  const shortAddress = `${address?.slice(0, 6)}...${address?.slice(-4)}`;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="rounded-2xl border border-white/10 bg-white/5 backdrop-blur-sm p-6"
    >
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <div className="p-2 rounded-xl bg-blue-500/10 border border-blue-500/20">
            <Activity className="w-5 h-5 text-blue-400" />
          </div>
          <div>
            <h2 className="text-2xl font-bold">Portfolio Overview</h2>
            <p className="text-sm text-gray-400">Real-time portfolio tracking</p>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <motion.button
            whileHover={{ rotate: 180 }}
            whileTap={{ scale: 0.9 }}
            onClick={handleRefresh}
            className="p-2 rounded-lg border border-white/10 hover:bg-white/5 transition-colors"
            disabled={isRefreshing}
          >
            {isRefreshing ? (
              <Loader2 className="w-4 h-4 text-blue-400 animate-spin" />
            ) : (
              <Activity className="w-4 h-4 text-gray-400" />
            )}
          </motion.button>
          <span className="inline-flex items-center gap-1.5 rounded-full bg-green-500/20 px-3 py-1 text-sm text-green-400 border border-green-500/20">
            <span className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse" />
            Connected
          </span>
        </div>
      </div>

      <div className="grid gap-6">
        {/* Wallet Address */}
        <motion.div 
          whileHover={{ scale: 1.01 }}
          className="p-4 rounded-xl bg-white/5 border border-white/5 hover:border-white/10 transition-all duration-300"
        >
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Wallet className="w-4 h-4 text-gray-400" />
              <p className="text-sm text-gray-400">Wallet Address</p>
            </div>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={copyAddress}
              className="flex items-center gap-1.5 text-sm text-blue-400 hover:text-blue-300 transition-colors"
            >
              <AnimatePresence mode="wait">
                {copied ? (
                  <motion.span
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.8 }}
                    className="text-green-400"
                  >
                    Copied!
                  </motion.span>
                ) : (
                  <motion.span
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.8 }}
                    className="flex items-center gap-1.5"
                  >
                    <Copy className="w-3.5 h-3.5" />
                    Copy
                  </motion.span>
                )}
              </AnimatePresence>
            </motion.button>
          </div>
          <div className="flex items-center gap-2 mt-1">
            <p className="font-mono text-sm break-all">{address}</p>
            <a
              href={`${chain?.blockExplorers?.default?.url}/address/${address}`}
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-500 hover:text-blue-400 transition-colors"
            >
              <ExternalLink className="w-4 h-4" />
            </a>
          </div>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-4">
          {/* Short Address */}
          <motion.div 
            whileHover={{ scale: 1.02 }}
            className="p-4 rounded-xl bg-white/5 border border-white/5 hover:border-white/10 transition-all duration-300"
          >
            <p className="text-sm text-gray-400 flex items-center gap-1.5 mb-1">
              <Link2 className="w-3.5 h-3.5" />
              Short Address
            </p>
            <p className="font-mono text-sm font-medium">{shortAddress}</p>
          </motion.div>

          {/* Network */}
          <motion.div 
            whileHover={{ scale: 1.02 }}
            className="p-4 rounded-xl bg-white/5 border border-white/5 hover:border-white/10 transition-all duration-300"
          >
            <p className="text-sm text-gray-400 flex items-center gap-1.5 mb-1">
              <Shield className="w-3.5 h-3.5" />
              Network
            </p>
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
              <p className="font-medium">{chain?.name || "Unknown"}</p>
            </div>
          </motion.div>

          {/* Status */}
          <motion.div 
            whileHover={{ scale: 1.02 }}
            className="p-4 rounded-xl bg-white/5 border border-white/5 hover:border-white/10 transition-all duration-300"
          >
            <p className="text-sm text-gray-400 flex items-center gap-1.5 mb-1">
              <CheckCircle className="w-3.5 h-3.5" />
              Status
            </p>
            <span className="inline-flex items-center gap-1.5 rounded-full bg-green-500/10 px-3 py-1 text-sm text-green-400 border border-green-500/20">
              <span className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse" />
              Online
            </span>
          </motion.div>
        </div>

        {/* Balance - Professional Loading State with $ Sign */}
        <motion.div 
          whileHover={{ scale: 1.01 }}
          className="relative overflow-hidden rounded-xl bg-linear-to-br from-blue-500/10 via-purple-500/10 to-pink-500/10 border border-white/10 p-6"
        >
          <div className="absolute inset-0 bg-linear-to-r from-blue-500/5 to-purple-500/5 animate-pulse" />
          
          <div className="relative">
            <div className="flex items-center justify-between mb-2">
              <p className="text-sm text-gray-400 flex items-center gap-1.5">
                <DollarSign className="w-3.5 h-3.5 text-green-400" />
                Total Balance
              </p>
              {balanceUSD !== null && !isLoading && !isRefreshing && (
                <div className="flex items-center gap-2">
                  <TrendingUp className="w-4 h-4 text-green-400" />
                  <span className="text-sm text-green-400">+2.4%</span>
                </div>
              )}
            </div>

            <AnimatePresence mode="wait">
              {isLoading || isRefreshing ? (
                <motion.div
                  key="loading"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="space-y-3"
                >
                  {/* Loading Skeleton */}
                  <div className="flex items-center gap-4">
                    <div className="relative">
                      <div className="w-10 h-10 rounded-full border-3 border-blue-500/20 border-t-blue-500 animate-spin" />
                      <div className="absolute inset-0 w-10 h-10 rounded-full bg-blue-500/10 animate-pulse" />
                    </div>
                    <div className="flex-1 space-y-2">
                      <div className="h-8 w-3/4 bg-white/5 rounded-lg animate-pulse relative overflow-hidden">
                        <div className="absolute inset-0 bg-linear-to-r from-transparent via-white/10 to-transparent animate-shimmer" />
                      </div>
                      <div className="h-4 w-1/2 bg-white/5 rounded-lg animate-pulse relative overflow-hidden">
                        <div className="absolute inset-0 bg-linear-to-r from-transparent via-white/10 to-transparent animate-shimmer" />
                      </div>
                    </div>
                  </div>
                </motion.div>
              ) : (
                <motion.div
                  key="balance"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.4, ease: "easeOut" }}
                  className="space-y-1"
                >
                  <div className="flex items-baseline gap-2">
                    <span className="text-3xl font-bold text-green-400">$</span>
                    <p className="text-4xl font-bold bg-linear-to-r from-white to-blue-400 bg-clip-text text-transparent">
                      {Number(balance?.formatted || 0).toFixed(4)}
                    </p>
                    <span className="text-xl font-medium text-gray-400">
                      {balance?.symbol || ""}
                    </span>
                  </div>
                  {balanceUSD !== null && (
                    <p className="text-sm text-gray-400">
                      ≈ ${balanceUSD.toFixed(2)} USD
                    </p>
                  )}
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </motion.div>
      </div>

      {/* Add shimmer animation to global CSS or use inline */}
      <style jsx>{`
        @keyframes shimmer {
          0% {
            transform: translateX(-100%);
          }
          100% {
            transform: translateX(100%);
          }
        }
        .animate-shimmer {
          animation: shimmer 2s infinite;
        }
      `}</style>
    </motion.div>
  );
}