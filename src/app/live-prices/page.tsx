"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Search, 
  TrendingUp, 
  TrendingDown, 
  Star,
  Sparkles,
  RefreshCw,
  ChevronUp,
  ChevronDown,
  Clock,
  Zap,
  Activity
} from "lucide-react";

interface Coin {
  id: string;
  name: string;
  symbol: string;
  current_price: number;
  market_cap_rank: number;
  price_change_percentage_24h: number;
  image: string;
  market_cap?: number;
  total_volume?: number;
}

export default function LivePricesPage() {
  const [coins, setCoins] = useState<Coin[]>([]);
  const [filteredCoins, setFilteredCoins] = useState<Coin[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [sortConfig, setSortConfig] = useState<{
    key: keyof Coin | null;
    direction: 'asc' | 'desc';
  }>({ key: null, direction: 'asc' });
  const [favorites, setFavorites] = useState<string[]>([]);
  const [showFavorites, setShowFavorites] = useState(false);
  const [lastUpdated, setLastUpdated] = useState<Date>(new Date());
  const [isLive, setIsLive] = useState(true);

  const loadPrices = async () => {
    try {
      const response = await fetch("/api/prices");
      const data = await response.json();
      setCoins(data);
      setFilteredCoins(data);
      setLastUpdated(new Date());
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  // Simulate live price updates
  useEffect(() => {
    if (!isLive || coins.length === 0) return;

    const interval = setInterval(() => {
      setCoins(prevCoins => {
        return prevCoins.map(coin => {
          // Random price fluctuation (-2% to +2%)
          const change = (Math.random() - 0.5) * 0.04;
          const newPrice = coin.current_price * (1 + change);
          const new24hChange = coin.price_change_percentage_24h + (change * 10);
          
          return {
            ...coin,
            current_price: newPrice,
            price_change_percentage_24h: Math.min(Math.max(new24hChange, -50), 50)
          };
        });
      });
      
      setLastUpdated(new Date());
    }, 5000);

    return () => clearInterval(interval);
  }, [coins.length, isLive]);

  useEffect(() => {
    loadPrices();
  }, []);

  // Search and filter logic
  useEffect(() => {
    let result = coins;
    
    if (searchTerm) {
      result = result.filter(coin =>
        coin.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        coin.symbol.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    if (showFavorites) {
      result = result.filter(coin => favorites.includes(coin.id));
    }

    if (sortConfig.key) {
      result = [...result].sort((a, b) => {
        const aValue = a[sortConfig.key as keyof Coin];
        const bValue = b[sortConfig.key as keyof Coin];
        
        if (typeof aValue === 'number' && typeof bValue === 'number') {
          return sortConfig.direction === 'asc' ? aValue - bValue : bValue - aValue;
        }
        return 0;
      });
    }

    setFilteredCoins(result);
  }, [searchTerm, coins, sortConfig, showFavorites, favorites]);

  const toggleFavorite = (coinId: string) => {
    setFavorites(prev =>
      prev.includes(coinId)
        ? prev.filter(id => id !== coinId)
        : [...prev, coinId]
    );
  };

  const handleSort = (key: keyof Coin) => {
    setSortConfig(prev => ({
      key,
      direction: prev.key === key && prev.direction === 'asc' ? 'desc' : 'asc'
    }));
  };

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: price < 1 ? 6 : 2,
      maximumFractionDigits: price < 1 ? 6 : 2
    }).format(price);
  };

  const formatMarketCap = (marketCap: number) => {
    if (marketCap >= 1e12) return `$${(marketCap / 1e12).toFixed(2)}T`;
    if (marketCap >= 1e9) return `$${(marketCap / 1e9).toFixed(2)}B`;
    if (marketCap >= 1e6) return `$${(marketCap / 1e6).toFixed(2)}M`;
    return `$${marketCap.toLocaleString()}`;
  };

  // Animation variants with correct typing
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.05
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        type: "spring" as const,
        stiffness: 300,
        damping: 20
      }
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-linear-to-br from-black via-gray-900 to-black flex items-center justify-center">
        <div className="flex flex-col items-center gap-4">
          <div className="w-16 h-16 rounded-full border-4 border-blue-500 border-t-transparent animate-spin" />
          <p className="text-gray-400">Loading crypto prices...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-linear-to-br from-black via-gray-900 to-black text-white p-4 sm:p-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-8"
        >
          <div>
            <h1 className="text-4xl font-bold bg-linear-to-r from-white to-blue-400 bg-clip-text text-transparent">
              Live Crypto Prices
            </h1>
            <div className="flex items-center gap-3 mt-2 flex-wrap">
              <div className="flex items-center gap-1 text-sm text-gray-400">
                <Clock className="w-4 h-4" />
                Last updated: {lastUpdated.toLocaleTimeString()}
              </div>
              <div className="flex items-center gap-1 text-sm text-green-400">
                <Zap className="w-4 h-4" />
                Live updates every 5s
              </div>
              <div className={`flex items-center gap-1 text-sm ${isLive ? 'text-green-400' : 'text-gray-500'}`}>
                <Activity className="w-4 h-4" />
                {isLive ? 'Connected' : 'Disconnected'}
                <span className={`w-2 h-2 rounded-full ${isLive ? 'bg-green-400 animate-pulse' : 'bg-gray-500'} ml-1`} />
              </div>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setIsLive(!isLive)}
              className={`px-4 py-2 rounded-lg border transition-all flex items-center gap-2 ${
                isLive 
                  ? 'border-green-500/30 bg-green-500/10 text-green-400' 
                  : 'border-gray-500/30 bg-gray-500/10 text-gray-400'
              }`}
            >
              <Zap className="w-4 h-4" />
              {isLive ? 'Live' : 'Paused'}
            </motion.button>
            <motion.button
              whileHover={{ rotate: 180 }}
              whileTap={{ scale: 0.9 }}
              onClick={loadPrices}
              className="p-2 rounded-lg border border-white/10 hover:bg-white/5 transition-colors"
            >
              <RefreshCw className="w-5 h-5 text-gray-400" />
            </motion.button>
          </div>
        </motion.div>

        {/* Stats Cards */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6"
        >
          <div className="p-4 rounded-xl border border-white/10 bg-white/5 backdrop-blur-sm">
            <p className="text-sm text-gray-400">Total Coins</p>
            <p className="text-2xl font-bold">{coins.length}</p>
          </div>
          <div className="p-4 rounded-xl border border-white/10 bg-white/5 backdrop-blur-sm">
            <p className="text-sm text-gray-400">Top Gainers</p>
            <p className="text-2xl font-bold text-green-400">
              {coins.filter(c => c.price_change_percentage_24h > 0).length}
            </p>
          </div>
          <div className="p-4 rounded-xl border border-white/10 bg-white/5 backdrop-blur-sm">
            <p className="text-sm text-gray-400">Top Losers</p>
            <p className="text-2xl font-bold text-red-400">
              {coins.filter(c => c.price_change_percentage_24h < 0).length}
            </p>
          </div>
          <div className="p-4 rounded-xl border border-white/10 bg-white/5 backdrop-blur-sm">
            <p className="text-sm text-gray-400">Favorites</p>
            <p className="text-2xl font-bold text-yellow-400">{favorites.length}</p>
          </div>
        </motion.div>

        {/* Search and Filter */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="flex flex-col sm:flex-row gap-4 mb-6"
        >
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500" />
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search by coin name or symbol..."
              className="w-full pl-10 pr-4 py-3 rounded-xl bg-black/50 border border-white/10 focus:border-blue-500/50 outline-none transition-colors text-white placeholder-gray-500"
            />
          </div>
          <div className="flex gap-2">
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => setShowFavorites(!showFavorites)}
              className={`px-4 py-2 rounded-xl border transition-all flex items-center gap-2 ${
                showFavorites
                  ? 'bg-yellow-500/20 border-yellow-500/30 text-yellow-400'
                  : 'border-white/10 hover:bg-white/5 text-gray-400'
              }`}
            >
              <Star className={`w-4 h-4 ${showFavorites ? 'fill-yellow-400' : ''}`} />
              Favorites
            </motion.button>
          </div>
        </motion.div>

        {/* Table */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="rounded-2xl border border-white/10 bg-black/30 backdrop-blur-sm overflow-hidden"
        >
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-white/10 bg-white/5">
                  <th className="p-4 text-left text-sm font-medium text-gray-400">
                    <button
                      onClick={() => handleSort('market_cap_rank')}
                      className="flex items-center gap-1 hover:text-white transition-colors"
                    >
                      Rank
                      {sortConfig.key === 'market_cap_rank' && (
                        sortConfig.direction === 'asc' ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />
                      )}
                    </button>
                  </th>
                  <th className="p-4 text-left text-sm font-medium text-gray-400">Coin</th>
                  <th className="p-4 text-left text-sm font-medium text-gray-400">Symbol</th>
                  <th className="p-4 text-left text-sm font-medium text-gray-400">
                    <button
                      onClick={() => handleSort('current_price')}
                      className="flex items-center gap-1 hover:text-white transition-colors"
                    >
                      Price
                      {sortConfig.key === 'current_price' && (
                        sortConfig.direction === 'asc' ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />
                      )}
                    </button>
                  </th>
                  <th className="p-4 text-left text-sm font-medium text-gray-400">
                    <button
                      onClick={() => handleSort('price_change_percentage_24h')}
                      className="flex items-center gap-1 hover:text-white transition-colors"
                    >
                      24h Change
                      {sortConfig.key === 'price_change_percentage_24h' && (
                        sortConfig.direction === 'asc' ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />
                      )}
                    </button>
                  </th>
                  <th className="p-4 text-left text-sm font-medium text-gray-400 hidden lg:table-cell">
                    <button
                      onClick={() => handleSort('market_cap')}
                      className="flex items-center gap-1 hover:text-white transition-colors"
                    >
                      Market Cap
                      {sortConfig.key === 'market_cap' && (
                        sortConfig.direction === 'asc' ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />
                      )}
                    </button>
                  </th>
                  <th className="p-4 text-center text-sm font-medium text-gray-400">Favorite</th>
                </tr>
              </thead>
              <motion.tbody
                variants={containerVariants}
                initial="hidden"
                animate="visible"
              >
                <AnimatePresence>
                  {filteredCoins.length === 0 ? (
                    <tr>
                      <td colSpan={7} className="p-8 text-center text-gray-400">
                        No coins found matching your search
                      </td>
                    </tr>
                  ) : (
                    filteredCoins.map((coin) => (
                      <motion.tr
                        key={coin.id}
                        variants={itemVariants}
                        layout
                        className="border-b border-white/5 hover:bg-white/5 transition-colors cursor-pointer group"
                      >
                        <td className="p-4 text-sm">{coin.market_cap_rank}</td>
                        <td className="p-4">
                          <div className="flex items-center gap-3">
                            <img
                              src={coin.image}
                              alt={coin.name}
                              className="w-8 h-8 rounded-full"
                            />
                            <span className="font-medium">{coin.name}</span>
                          </div>
                        </td>
                        <td className="p-4 uppercase text-sm text-gray-400">{coin.symbol}</td>
                        <td className="p-4 font-medium">
                          <motion.span
                            key={coin.current_price}
                            initial={{ scale: 0.95, opacity: 0.5 }}
                            animate={{ scale: 1, opacity: 1 }}
                            transition={{ duration: 0.3 }}
                          >
                            {formatPrice(coin.current_price)}
                          </motion.span>
                        </td>
                        <td className="p-4">
                          <div className={`flex items-center gap-1 ${coin.price_change_percentage_24h >= 0 ? 'text-green-400' : 'text-red-400'}`}>
                            {coin.price_change_percentage_24h >= 0 ? (
                              <TrendingUp className="w-4 h-4" />
                            ) : (
                              <TrendingDown className="w-4 h-4" />
                            )}
                            <motion.span
                              key={coin.price_change_percentage_24h}
                              initial={{ scale: 0.95 }}
                              animate={{ scale: 1 }}
                              transition={{ duration: 0.3 }}
                            >
                              {Math.abs(coin.price_change_percentage_24h).toFixed(2)}%
                            </motion.span>
                          </div>
                        </td>
                        <td className="p-4 hidden lg:table-cell text-gray-400">
                          {coin.market_cap && formatMarketCap(coin.market_cap)}
                        </td>
                        <td className="p-4 text-center">
                          <motion.button
                            whileHover={{ scale: 1.2 }}
                            whileTap={{ scale: 0.9 }}
                            onClick={() => toggleFavorite(coin.id)}
                            className="text-gray-400 hover:text-yellow-400 transition-colors"
                          >
                            <Star
                              className={`w-5 h-5 ${favorites.includes(coin.id) ? 'fill-yellow-400 text-yellow-400' : ''}`}
                            />
                          </motion.button>
                        </td>
                      </motion.tr>
                    ))
                  )}
                </AnimatePresence>
              </motion.tbody>
            </table>
          </div>
        </motion.div>

        {/* Results Count */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="mt-4 text-sm text-gray-400 flex items-center justify-between"
        >
          <span>
            Showing {filteredCoins.length} of {coins.length} coins
            {showFavorites && ' (Favorites only)'}
            {searchTerm && ` matching "${searchTerm}"`}
          </span>
          <span className="flex items-center gap-1">
            <Activity className="w-3 h-3" />
            {isLive ? 'Live updates active' : 'Updates paused'}
          </span>
        </motion.div>
      </div>
    </div>
  );
}