"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  ArrowUpDown, 
  ArrowDown, 
  ArrowUp,
  RefreshCw,
  Wallet,
  AlertCircle,
  CheckCircle,
  Loader2,
  DollarSign
} from "lucide-react";
import { useAccount, useBalance } from "wagmi";

interface Token {
  id: string;
  name: string;
  symbol: string;
  price: number;
  image: string;
  contractAddress?: string;
  decimals?: number;
}

export default function SwapWidget() {
  const { address, isConnected } = useAccount();
  const [tokens, setTokens] = useState<Token[]>([]);
  const [amount, setAmount] = useState("");
  const [fromToken, setFromToken] = useState<Token | null>(null);
  const [toToken, setToToken] = useState<Token | null>(null);
  const [quote, setQuote] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isSwapping, setIsSwapping] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);
  const [insufficientBalance, setInsufficientBalance] = useState(false);
  const [isConfirming, setIsConfirming] = useState(false);
  const [hasCheckedBalance, setHasCheckedBalance] = useState(false);

  // Fetch token balances
  const { data: balanceData, isLoading: balanceLoading, refetch: refetchBalance } = useBalance({
    address,
    token: fromToken?.contractAddress as `0x${string}`,
  });

  // Get the actual balance for the selected token
  const getTokenBalance = () => {
    if (!isConnected || !balanceData) return 0;
    return Number(balanceData.formatted);
  };

  const currentBalance = getTokenBalance();
  const amountNum = Number(amount) || 0;

  // Check if user has sufficient balance
  const hasSufficientBalance = () => {
    if (!isConnected || !amount || !fromToken) return false;
    if (currentBalance === 0) return false;
    return amountNum <= currentBalance && amountNum > 0;
  };

  useEffect(() => {
    loadTokens();
  }, []);

  // Reset balance check when amount or fromToken changes
  useEffect(() => {
    if (amount && fromToken && isConnected) {
      if (amountNum > currentBalance || currentBalance === 0) {
        setInsufficientBalance(true);
        setHasCheckedBalance(true);
      } else {
        setInsufficientBalance(false);
        setHasCheckedBalance(true);
      }
    } else {
      setInsufficientBalance(false);
      setHasCheckedBalance(false);
    }
  }, [amount, fromToken, currentBalance, isConnected]);

  const loadTokens = async () => {
    try {
      const response = await fetch("/api/swap-tokens");
      const data = await response.json();
      setTokens(data);
      if (data.length > 1) {
        setFromToken(data[0]);
        setToToken(data[1]);
      }
    } catch (error) {
      setError("Failed to load tokens");
    }
  };

  const getQuote = () => {
    if (!amount || !fromToken || !toToken) {
      setError("Please fill in all fields");
      return;
    }

    if (amountNum <= 0) {
      setError("Amount must be greater than 0");
      return;
    }

    // Allow getting quote even with insufficient balance
    setError("");
    setIsLoading(true);
    
    // Simulate API call
    setTimeout(() => {
      const usdValue = amountNum * fromToken.price;
      const receive = usdValue / toToken.price;
      setQuote(receive.toFixed(6));
      setIsLoading(false);
      setSuccess(true);
      setTimeout(() => setSuccess(false), 3000);
    }, 800);
  };

  const swapTokens = () => {
    if (!fromToken || !toToken) return;
    
    setIsSwapping(true);
    const temp = fromToken;
    setFromToken(toToken);
    setToToken(temp);
    setQuote("");
    setAmount("");
    setError("");
    setSuccess(false);
    setInsufficientBalance(false);
    setHasCheckedBalance(false);
    
    setTimeout(() => setIsSwapping(false), 300);
  };

  const handleConfirmSwap = async () => {
    // Check balance before confirming
    if (!hasSufficientBalance()) {
      setInsufficientBalance(true);
      if (currentBalance === 0) {
        setError(`No ${fromToken?.symbol} balance available`);
      } else {
        setError(`Insufficient balance. You have ${currentBalance.toFixed(4)} ${fromToken?.symbol}`);
      }
      return;
    }

    setIsConfirming(true);
    // Simulate swap confirmation
    setTimeout(() => {
      setIsConfirming(false);
      setSuccess(true);
      setQuote("");
      setAmount("");
      setTimeout(() => setSuccess(false), 3000);
    }, 2000);
  };

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 2,
      maximumFractionDigits: 6
    }).format(price);
  };

  const formatBalance = (balance: number) => {
    if (balance === 0) return "0.00";
    if (balance < 0.0001) return balance.toFixed(6);
    if (balance < 1) return balance.toFixed(4);
    return balance.toFixed(4);
  };

  // Refresh balance
  const handleRefreshBalance = async () => {
    await refetchBalance();
    setHasCheckedBalance(true);
  };

  // Get button state for Confirm Swap - Only shows when quote is available
  const getButtonState = () => {
    if (!isConnected) {
      return { text: "Connect Wallet", disabled: true, color: "from-gray-500 to-gray-600" };
    }
    if (isConfirming) {
      return { text: "Processing...", disabled: true, color: "from-blue-500 to-purple-500" };
    }
    if (!quote) {
      return null; // Don't show button when no quote
    }
    if (insufficientBalance || !hasSufficientBalance()) {
      return { text: "Insufficient Balance", disabled: true, color: "from-red-500 to-red-600" };
    }
    return { text: "Confirm Swap", disabled: false, color: "from-green-500 to-emerald-500" };
  };

  const buttonState = getButtonState();

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="max-w-xl mx-auto p-6 rounded-2xl border border-white/10 bg-gradient-to-br from-zinc-900 to-black shadow-2xl shadow-blue-500/5"
    >
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-3xl font-bold bg-gradient-to-r from-white to-gray-400 bg-clip-text text-transparent">
            Swap Tokens
          </h2>
          <p className="text-sm text-gray-500 mt-1">Exchange crypto assets instantly</p>
        </div>
        <div className="flex items-center gap-2">
          <motion.button
            whileHover={{ rotate: 180 }}
            transition={{ duration: 0.6 }}
            className="p-2 rounded-lg border border-white/10 hover:bg-white/5 transition-colors"
            onClick={handleRefreshBalance}
            disabled={!isConnected}
          >
            <RefreshCw className="w-4 h-4 text-gray-400" />
          </motion.button>
        </div>
      </div>

      {/* Wallet Connection Status */}
      {!isConnected && (
        <div className="mb-4 p-3 rounded-xl bg-yellow-500/10 border border-yellow-500/20 text-yellow-400 text-sm flex items-center gap-2">
          <AlertCircle className="w-4 h-4 flex-shrink-0" />
          Connect your wallet to swap tokens
        </div>
      )}

      <div className="space-y-4">
        {/* From Token */}
        <div className="relative">
          <div className="flex items-center justify-between mb-2">
            <label className="text-sm font-medium text-gray-400">From</label>
            {isConnected && fromToken && (
              <div className="flex items-center gap-2 text-sm">
                <span className="text-gray-500">Balance:</span>
                {balanceLoading ? (
                  <Loader2 className="w-3 h-3 text-blue-400 animate-spin" />
                ) : (
                  <span className={`font-medium ${currentBalance === 0 ? 'text-red-400' : 'text-white'}`}>
                    {formatBalance(currentBalance)} {fromToken.symbol}
                  </span>
                )}
                <button
                  onClick={handleRefreshBalance}
                  className="text-gray-500 hover:text-blue-400 transition-colors"
                >
                  <RefreshCw className="w-3 h-3" />
                </button>
              </div>
            )}
          </div>
          <div className={`flex items-center gap-2 p-3 rounded-xl bg-black/50 border transition-colors focus-within:border-blue-500/50 ${
            insufficientBalance && quote ? 'border-red-500/50' : 'border-white/10 hover:border-white/20'
          }`}>
            <input
              type="number"
              value={amount}
              onChange={(e) => {
                setAmount(e.target.value);
                setQuote("");
                setError("");
                setInsufficientBalance(false);
              }}
              placeholder="0.00"
              className="flex-1 bg-transparent outline-none text-white text-lg placeholder-gray-600"
              min="0"
              disabled={!isConnected}
            />
            <select
              className="px-3 py-1.5 rounded-lg bg-white/5 border border-white/10 text-white outline-none cursor-pointer hover:bg-white/10 transition-colors"
              value={fromToken?.symbol}
              onChange={(e) => {
                const token = tokens.find((t) => t.symbol === e.target.value);
                if (token) {
                  setFromToken(token);
                  setQuote("");
                  setError("");
                  setInsufficientBalance(false);
                  setHasCheckedBalance(false);
                }
              }}
            >
              {tokens.map((token) => (
                <option key={token.id} value={token.symbol} className="bg-zinc-900">
                  {token.symbol}
                </option>
              ))}
            </select>
          </div>
          {fromToken && (
            <div className="flex items-center justify-between mt-1.5">
              <motion.p 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="text-xs text-gray-500"
              >
                Price: {formatPrice(fromToken.price)}
              </motion.p>
              {isConnected && amount && !insufficientBalance && currentBalance > 0 && (
                <motion.button
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="text-xs text-blue-400 hover:text-blue-300 transition-colors"
                  onClick={() => {
                    if (currentBalance > 0) {
                      setAmount(currentBalance.toString());
                      setQuote("");
                      setError("");
                    }
                  }}
                >
                  Max: {formatBalance(currentBalance)}
                </motion.button>
              )}
            </div>
          )}
          {insufficientBalance && quote && (
            <motion.div
              initial={{ opacity: 0, y: -5 }}
              animate={{ opacity: 1, y: 0 }}
              className="mt-2 text-xs text-red-400 flex items-center gap-1"
            >
              <AlertCircle className="w-3 h-3" />
              {currentBalance === 0 
                ? `No ${fromToken?.symbol} balance available` 
                : `Insufficient balance. You have ${formatBalance(currentBalance)} ${fromToken?.symbol}`
              }
            </motion.div>
          )}
        </div>

        {/* Swap Arrow Button */}
        <div className="relative flex justify-center -my-2">
          <motion.button
            whileHover={{ scale: 1.1, rotate: 180 }}
            whileTap={{ scale: 0.9 }}
            animate={{ rotate: isSwapping ? 360 : 0 }}
            transition={{ duration: 0.3 }}
            onClick={swapTokens}
            disabled={!fromToken || !toToken}
            className="p-3 rounded-full bg-gradient-to-r from-blue-500 to-purple-500 shadow-lg shadow-blue-500/25 hover:shadow-blue-500/40 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <ArrowUpDown className="w-5 h-5 text-white" />
          </motion.button>
        </div>

        {/* To Token */}
        <div>
          <div className="flex items-center justify-between mb-2">
            <label className="text-sm font-medium text-gray-400">To</label>
          </div>
          <div className="flex items-center gap-2 p-3 rounded-xl bg-black/50 border border-white/10 hover:border-white/20 transition-colors focus-within:border-blue-500/50">
            <div className="flex-1 flex items-center">
              {quote && (
                <motion.span 
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="text-white text-lg font-medium"
                >
                  {quote}
                </motion.span>
              )}
              {!quote && (
                <span className="text-gray-600 text-lg">0.00</span>
              )}
            </div>
            <select
              className="px-3 py-1.5 rounded-lg bg-white/5 border border-white/10 text-white outline-none cursor-pointer hover:bg-white/10 transition-colors"
              value={toToken?.symbol}
              onChange={(e) => {
                const token = tokens.find((t) => t.symbol === e.target.value);
                if (token) {
                  setToToken(token);
                  setQuote("");
                  setError("");
                }
              }}
            >
              {tokens.map((token) => (
                <option key={token.id} value={token.symbol} className="bg-zinc-900">
                  {token.symbol}
                </option>
              ))}
            </select>
          </div>
          {toToken && (
            <motion.p 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-xs text-gray-500 mt-1.5"
            >
              Price: {formatPrice(toToken.price)}
            </motion.p>
          )}
        </div>

        {/* Quote Button */}
        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={getQuote}
          disabled={isLoading || !fromToken || !toToken || !amount || !isConnected}
          className="w-full p-4 rounded-xl bg-gradient-to-r from-blue-500 to-purple-500 font-semibold text-white shadow-lg shadow-blue-500/25 hover:shadow-blue-500/40 transition-all disabled:opacity-50 disabled:cursor-not-allowed relative overflow-hidden group"
        >
          {isLoading ? (
            <div className="flex items-center justify-center gap-2">
              <Loader2 className="w-5 h-5 animate-spin" />
              Getting Quote...
            </div>
          ) : (
            <span className="flex items-center justify-center gap-2">
              Get Quote
              <ArrowUp className="w-4 h-4 group-hover:translate-y-[-2px] transition-transform" />
            </span>
          )}
        </motion.button>

        {/* Messages */}
        <AnimatePresence>
          {error && !insufficientBalance && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="flex items-center gap-2 p-3 rounded-xl bg-red-500/10 border border-red-500/20 text-red-400 text-sm"
            >
              <AlertCircle className="w-4 h-4 flex-shrink-0" />
              {error}
            </motion.div>
          )}
        </AnimatePresence>

        <AnimatePresence>
          {success && quote && (
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="p-4 rounded-xl bg-green-500/10 border border-green-500/20"
            >
              <div className="flex items-start gap-3">
                <CheckCircle className="w-5 h-5 text-green-400 flex-shrink-0 mt-0.5" />
                <div>
                  <p className="text-sm font-medium text-green-400">Quote Ready</p>
                  <p className="text-sm text-gray-300 mt-1">
                    You will receive <span className="font-bold text-white">{quote} {toToken?.symbol}</span>
                  </p>
                  <p className="text-xs text-gray-500 mt-1">
                    Rate: 1 {fromToken?.symbol} ≈ {(Number(quote) / amountNum).toFixed(6)} {toToken?.symbol}
                  </p>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Swap Details */}
        {fromToken && toToken && quote && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="p-4 rounded-xl bg-white/5 border border-white/5"
          >
            <div className="space-y-2 text-sm">
              <div className="flex items-center justify-between">
                <span className="text-gray-400">Exchange Rate</span>
                <span className="text-white">
                  1 {fromToken.symbol} = {(Number(quote) / amountNum).toFixed(6)} {toToken.symbol}
                </span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-gray-400">Network Fee</span>
                <span className="text-white">~$0.50</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-gray-400">Price Impact</span>
                <span className="text-green-400">&lt; 0.1%</span>
              </div>
              <div className="flex items-center justify-between pt-2 border-t border-white/5">
                <span className="text-gray-400">Total Value</span>
                <span className="text-white font-medium">
                  ${(amountNum * fromToken.price).toFixed(2)} USD
                </span>
              </div>
              {isConnected && (
                <div className="flex items-center justify-between pt-2 border-t border-white/5">
                  <span className="text-gray-400">Your Balance</span>
                  <span className={`font-medium ${hasSufficientBalance() ? 'text-green-400' : 'text-red-400'}`}>
                    {formatBalance(currentBalance)} {fromToken.symbol}
                  </span>
                </div>
              )}
            </div>
          </motion.div>
        )}

        {/* Confirm Swap Button - Only shows when quote is available */}
        {buttonState && (
          <motion.button
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            whileHover={!buttonState.disabled ? { scale: 1.02 } : {}}
            whileTap={!buttonState.disabled ? { scale: 0.98 } : {}}
            onClick={handleConfirmSwap}
            disabled={buttonState.disabled}
            className={`w-full p-4 rounded-xl bg-gradient-to-r ${buttonState.color} font-semibold text-white shadow-lg transition-all ${
              !buttonState.disabled ? 'hover:shadow-green-500/40' : 'opacity-50 cursor-not-allowed'
            }`}
          >
            <span className="flex items-center justify-center gap-2">
              {isConfirming ? (
                <>
                  <Loader2 className="w-5 h-5 animate-spin" />
                  Processing...
                </>
              ) : (
                <>
                  <Wallet className="w-4 h-4" />
                  {buttonState.text}
                </>
              )}
            </span>
          </motion.button>
        )}

        {/* Balance Warning */}
        {isConnected && amount && !quote && !insufficientBalance && amountNum > 0 && (
          <div className="text-xs text-gray-500 text-center">
            {currentBalance === 0 ? (
              <span className="text-yellow-400">You don't have any {fromToken?.symbol} balance</span>
            ) : (
              <span>Available: {formatBalance(currentBalance)} {fromToken?.symbol}</span>
            )}
          </div>
        )}
      </div>
    </motion.div>
  );
}