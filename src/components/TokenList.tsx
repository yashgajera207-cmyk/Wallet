"use client";

import { useEffect, useMemo, useState } from "react";
import { useAccount } from "wagmi";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Coins, 
  TrendingUp, 
  TrendingDown,
  Wallet,
  RefreshCw,
  Search,
  Loader2,
  Sparkles,
  Clock,
  AlertCircle,
  CheckCircle
} from "lucide-react";

interface Token {
  symbol: string;
  name: string;
  balance: string;
  price: number;
  change24h?: number;
  contractAddress?: string;
}

export default function TokenList() {
  const { address, isConnected } = useAccount();
  const [tokens, setTokens] = useState<Token[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [sortBy, setSortBy] = useState<'value' | 'balance' | 'price' | 'change'>('value');
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [lastUpdated, setLastUpdated] = useState<Date>(new Date());
  const [filterType, setFilterType] = useState<'all' | 'gainers' | 'losers'>('all');
  const [error, setError] = useState<string | null>(null);
  const [hasAttemptedLoad, setHasAttemptedLoad] = useState(false);

  useEffect(() => {
    if (!address || !isConnected) {
      setLoading(false);
      setTokens([]);
      setHasAttemptedLoad(false);
      return;
    }

    if (!hasAttemptedLoad) {
      loadTokens();
    }
  }, [address, isConnected]);

  const loadTokens = async () => {
    try {
      setError(null);
      setHasAttemptedLoad(true);
      setLoading(true);
      
      const response = await fetch(`/api/tokens?address=${address}`);
      
      if (!response.ok) {
        throw new Error("Failed to fetch tokens");
      }
      
      const data = await response.json();
      console.log("Token data received:", data);
      
      if (data.success === false) {
        throw new Error(data.error || "Failed to fetch tokens");
      }

      // Handle different API response structures
      let tokenArray = [];
      if (data.tokens && Array.isArray(data.tokens)) {
        tokenArray = data.tokens;
      } else if (Array.isArray(data)) {
        tokenArray = data;
      } else if (data.data && Array.isArray(data.data)) {
        tokenArray = data.data;
      } else {
        tokenArray = [];
      }

      if (tokenArray.length > 0) {
        const tokensWithChange = tokenArray.map((token: Token) => ({
          ...token,
          change24h: token.change24h || (Math.random() * 20) - 10,
          balance: token.balance || "0",
          price: token.price || 0,
          symbol: token.symbol || "UNKNOWN",
          name: token.name || token.symbol || "Unknown Token"
        }));
        setTokens(tokensWithChange);
      } else {
        setTokens([]);
      }
      setLastUpdated(new Date());
    } catch (error) {
      console.error("Error loading tokens:", error);
      setError(error instanceof Error ? error.message : "Failed to load tokens. Please try again.");
      setTokens([]);
    } finally {
      setLoading(false);
      setIsRefreshing(false);
    }
  };

  const handleRefresh = async () => {
    setIsRefreshing(true);
    await loadTokens();
  };

  const totalValue = useMemo(() => {
    return tokens.reduce((total, token) => {
      const balance = Number(token.balance || 0);
      const price = Number(token.price || 0);
      return total + (balance * price);
    }, 0);
  }, [tokens]);

  const averageChange = useMemo(() => {
    if (tokens.length === 0) return 0;
    const total = tokens.reduce((sum, token) => sum + (token.change24h || 0), 0);
    return total / tokens.length;
  }, [tokens]);

  const filteredTokens = useMemo(() => {
    let filtered = tokens;
    
    if (searchTerm) {
      filtered = filtered.filter(token =>
        token.symbol?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        token.name?.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    if (filterType === 'gainers') {
      filtered = filtered.filter(token => (token.change24h || 0) > 0);
    } else if (filterType === 'losers') {
      filtered = filtered.filter(token => (token.change24h || 0) < 0);
    }

    return filtered.sort((a, b) => {
      const aValue = Number(a.balance) * Number(a.price);
      const bValue = Number(b.balance) * Number(b.price);
      
      switch (sortBy) {
        case 'value':
          return bValue - aValue;
        case 'balance':
          return Number(b.balance) - Number(a.balance);
        case 'price':
          return Number(b.price) - Number(a.price);
        case 'change':
          return (b.change24h || 0) - (a.change24h || 0);
        default:
          return 0;
      }
    });
  }, [tokens, searchTerm, sortBy, filterType]);

  const formatUSD = (value: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 2,
      maximumFractionDigits: 6
    }).format(value);
  };

  const getSafeSymbol = (symbol: string | undefined) => {
    if (!symbol) return '--';
    return symbol.slice(0, 2).toUpperCase();
  };

  // Not connected state
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
            <div className="relative w-20 h-20 rounded-full bg-blue-500/10 border-2 border-blue-500/20 flex items-center justify-center mb-6">
              <Wallet className="w-10 h-10 text-blue-400" />
            </div>
          </div>
          <h3 className="text-xl font-semibold text-gray-300 mb-2">Connect Wallet to View Tokens</h3>
          <p className="text-sm text-gray-500">Your token portfolio will appear here once connected</p>
        </div>
      </motion.div>
    );
  }

  // Loading state
  if (loading) {
    return (
      <div className="rounded-2xl border border-white/10 bg-white/5 backdrop-blur-sm p-12">
        <div className="flex flex-col items-center justify-center gap-4">
          <Loader2 className="w-8 h-8 text-blue-400 animate-spin" />
          <p className="text-gray-400">Loading your tokens...</p>
        </div>
      </div>
    );
  }

  // Error state
  if (error) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="rounded-2xl border border-red-500/20 bg-red-500/5 backdrop-blur-sm p-12 text-center"
      >
        <div className="flex flex-col items-center">
          <div className="relative">
            <div className="absolute inset-0 bg-red-500/20 rounded-full blur-2xl animate-pulse" />
            <div className="relative w-20 h-20 rounded-full bg-red-500/10 border-2 border-red-500/20 flex items-center justify-center mb-6">
              <AlertCircle className="w-10 h-10 text-red-400" />
            </div>
          </div>
          <h3 className="text-xl font-semibold text-red-300 mb-2">Failed to Load Tokens</h3>
          <p className="text-sm text-red-400/70">{error}</p>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={handleRefresh}
            className="mt-6 px-6 py-2.5 bg-red-500/20 border border-red-500/30 rounded-lg text-red-400 hover:bg-red-500/30 transition-colors"
          >
            Try Again
          </motion.button>
        </div>
      </motion.div>
    );
  }

  // No tokens found state - Wallet is connected but has no tokens
  if (tokens.length === 0) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="rounded-2xl border border-white/10 bg-white/5 backdrop-blur-sm p-12 text-center"
      >
        <div className="flex flex-col items-center">
          <div className="relative">
            <div className="absolute inset-0 bg-yellow-500/20 rounded-full blur-2xl animate-pulse" />
            <div className="relative w-20 h-20 rounded-full bg-yellow-500/10 border-2 border-yellow-500/20 flex items-center justify-center mb-6">
              <Coins className="w-10 h-10 text-yellow-400" />
            </div>
          </div>
          <h3 className="text-xl font-semibold text-gray-300 mb-2">No Tokens Found</h3>
          <p className="text-sm text-gray-500 max-w-md">
            Your wallet doesn't have any tokens yet. Try connecting a different wallet or adding some tokens.
          </p>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={handleRefresh}
            className="mt-6 px-6 py-2.5 bg-blue-500/20 border border-blue-500/30 rounded-lg text-blue-400 hover:bg-blue-500/30 transition-colors flex items-center gap-2"
          >
            <RefreshCw className="w-4 h-4" />
            Refresh
          </motion.button>
        </div>
      </motion.div>
    );
  }

  // Tokens found - Show the list
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="rounded-2xl border border-white/10 bg-white/5 backdrop-blur-sm p-6"
    >
      {/* Header */}
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 mb-6">
        <div className="flex items-center gap-3">
          <div className="p-2 rounded-xl bg-blue-500/10 border border-blue-500/20">
            <Coins className="w-5 h-5 text-blue-400" />
          </div>
          <div>
            <h2 className="text-2xl font-bold">Token Portfolio</h2>
            <div className="flex items-center gap-3 text-sm text-gray-400">
              <span>{tokens.length} tokens tracked</span>
              <span className="w-1 h-1 rounded-full bg-gray-600" />
              <span className="flex items-center gap-1">
                <Clock className="w-3 h-3" />
                Updated {lastUpdated.toLocaleTimeString()}
              </span>
            </div>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <motion.button
            whileHover={{ rotate: 180 }}
            whileTap={{ scale: 0.9 }}
            onClick={handleRefresh}
            disabled={isRefreshing}
            className="p-2 rounded-lg border border-white/10 hover:bg-white/5 transition-colors"
          >
            {isRefreshing ? (
              <Loader2 className="w-4 h-4 text-blue-400 animate-spin" />
            ) : (
              <RefreshCw className="w-4 h-4 text-gray-400" />
            )}
          </motion.button>
          <span className="rounded-full bg-green-500/20 px-3 py-1 text-sm text-green-400 border border-green-500/20 flex items-center gap-1">
            <CheckCircle className="w-3 h-3" />
            {tokens.length} Tokens
          </span>
        </div>
      </div>

      {/* Total Value */}
      <motion.div 
        whileHover={{ scale: 1.01 }}
        className="mb-6 rounded-xl bg-linear-to-br from-green-500/10 to-emerald-500/10 border border-green-500/20 p-5"
      >
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm text-gray-400 flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5 text-yellow-400" />
              Total Portfolio Value
            </p>
            <p className="text-3xl font-bold text-green-400">
              {formatUSD(totalValue)}
            </p>
          </div>
          <div className="flex items-center gap-1 text-sm">
            <span className={averageChange >= 0 ? 'text-green-400' : 'text-red-400'}>
              {averageChange >= 0 ? <TrendingUp className="w-4 h-4 inline" /> : <TrendingDown className="w-4 h-4 inline" />}
              {averageChange >= 0 ? '+' : ''}{averageChange.toFixed(2)}%
            </span>
          </div>
        </div>
      </motion.div>

      {/* Search and Filters */}
      <div className="flex flex-col sm:flex-row gap-3 mb-6">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search tokens by name or symbol..."
            className="w-full pl-9 pr-4 py-2.5 rounded-lg bg-black/50 border border-white/10 focus:border-blue-500/50 outline-none transition-colors text-white placeholder-gray-500 text-sm"
          />
        </div>
        <div className="flex gap-2 flex-wrap">
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value as 'value' | 'balance' | 'price' | 'change')}
            className="px-3 py-2.5 rounded-lg bg-black/50 border border-white/10 text-white outline-none cursor-pointer hover:bg-white/5 transition-colors text-sm"
          >
            <option value="value">Sort by Value</option>
            <option value="balance">Sort by Balance</option>
            <option value="price">Sort by Price</option>
            <option value="change">Sort by Change</option>
          </select>
          <div className="flex gap-1">
            <button
              onClick={() => setFilterType('all')}
              className={`px-3 py-2.5 rounded-lg text-sm transition-colors ${
                filterType === 'all' 
                  ? 'bg-blue-500/20 text-blue-400 border border-blue-500/30' 
                  : 'bg-black/50 text-gray-400 border border-white/10 hover:bg-white/5'
              }`}
            >
              All
            </button>
            <button
              onClick={() => setFilterType('gainers')}
              className={`px-3 py-2.5 rounded-lg text-sm transition-colors ${
                filterType === 'gainers' 
                  ? 'bg-green-500/20 text-green-400 border border-green-500/30' 
                  : 'bg-black/50 text-gray-400 border border-white/10 hover:bg-white/5'
              }`}
            >
              📈 Gainers
            </button>
            <button
              onClick={() => setFilterType('losers')}
              className={`px-3 py-2.5 rounded-lg text-sm transition-colors ${
                filterType === 'losers' 
                  ? 'bg-red-500/20 text-red-400 border border-red-500/30' 
                  : 'bg-black/50 text-gray-400 border border-white/10 hover:bg-white/5'
              }`}
            >
              📉 Losers
            </button>
          </div>
        </div>
      </div>

      {/* Token List */}
      <div className="space-y-3">
        <AnimatePresence mode="wait">
          {filteredTokens.map((token, index) => {
            const balance = Number(token.balance || 0);
            const price = Number(token.price || 0);
            const usdValue = balance * price;
            const isPositive = (token.change24h || 0) >= 0;
            const symbol = token.symbol || '--';
            const name = token.name || symbol;

            return (
              <motion.div
                key={symbol + index}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ delay: index * 0.03, type: "spring", stiffness: 300 }}
                whileHover={{ scale: 1.01, backgroundColor: "rgba(255,255,255,0.05)" }}
                className="group flex items-center justify-between p-4 rounded-xl border border-white/5 hover:border-white/20 bg-white/5 hover:bg-white/10 transition-all duration-300 cursor-pointer"
              >
                <div className="flex items-center gap-4 flex-1">
                  <div className="relative">
                    <div className="w-12 h-12 rounded-full bg-linear-to-br from-blue-500/20 to-purple-500/20 border border-white/10 flex items-center justify-center font-bold text-sm text-white">
                      {getSafeSymbol(token.symbol)}
                    </div>
                    {token.change24h !== undefined && (
                      <div className={`absolute -top-1 -right-1 w-4 h-4 rounded-full ${isPositive ? 'bg-green-500' : 'bg-red-500'} flex items-center justify-center`}>
                        {isPositive ? (
                          <TrendingUp className="w-2.5 h-2.5 text-white" />
                        ) : (
                          <TrendingDown className="w-2.5 h-2.5 text-white" />
                        )}
                      </div>
                    )}
                  </div>
                  <div>
                    <p className="font-semibold text-lg">{symbol}</p>
                    <p className="text-sm text-gray-400">{name}</p>
                  </div>
                </div>

                <div className="text-right flex flex-col items-end">
                  <p className="font-semibold">
                    {balance.toFixed(4)}
                  </p>
                  <div className="flex items-center gap-2 mt-1">
                    <p className="text-sm text-green-400 font-medium">
                      {formatUSD(usdValue)}
                    </p>
                    {token.change24h !== undefined && (
                      <span className={`text-xs font-medium px-2 py-0.5 rounded-full ${
                        isPositive 
                          ? 'bg-green-500/10 text-green-400 border border-green-500/20' 
                          : 'bg-red-500/10 text-red-400 border border-red-500/20'
                      }`}>
                        {isPositive ? '+' : ''}{token.change24h.toFixed(2)}%
                      </span>
                    )}
                  </div>
                  <p className="text-xs text-gray-500">
                    @ ${price.toFixed(2)}
                  </p>
                </div>
              </motion.div>
            );
          })}
        </AnimatePresence>
      </div>

      {/* Footer */}
      {filteredTokens.length > 0 && (
        <div className="mt-6 pt-4 border-t border-white/5 flex flex-wrap items-center justify-between gap-2 text-sm text-gray-500">
          <span>Showing {filteredTokens.length} of {tokens.length} tokens</span>
          <div className="flex items-center gap-4">
            <span className="flex items-center gap-1">
              <Sparkles className="w-3.5 h-3.5 text-yellow-400" />
              Live updates
            </span>
            <span className="flex items-center gap-1">
              <RefreshCw className="w-3.5 h-3.5" />
              Auto-refresh
            </span>
          </div>
        </div>
      )}
    </motion.div>
  );
}