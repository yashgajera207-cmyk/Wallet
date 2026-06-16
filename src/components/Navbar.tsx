"use client";

import Link from "next/link";
import { ConnectButton } from "@rainbow-me/rainbowkit";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Menu, 
  X, 
  Home, 
  LayoutDashboard, 
  Wallet, 
  RefreshCw, 
  Activity,
  TrendingUp,
  ChevronDown,
  Sparkles,
  Settings,
  HelpCircle,
  Bell,
  User
} from "lucide-react";

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeLink, setActiveLink] = useState("/");

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { href: "/", label: "Home", icon: Home },
    { href: "/dashboard", label: "Dashboard", icon: LayoutDashboard },
    { href: "/portfolio", label: "Portfolio", icon: Wallet },
    { href: "/swap", label: "Swap", icon: RefreshCw },
    { href: "/transactions", label: "Transactions", icon: Activity },
    { href: "/live-prices", label: "Live Prices", icon: TrendingUp },
  ];

  return (
    <>
      <motion.nav
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ type: "spring", stiffness: 300, damping: 30 }}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          isScrolled
            ? "border-b border-white/10 bg-black/80 backdrop-blur-xl shadow-2xl shadow-black/50"
            : "bg-black/40 backdrop-blur-xl"
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
          {/* Logo */}
          <Link href="/" className="group relative flex items-center gap-2">
            <motion.div
              whileHover={{ rotate: 180 }}
              transition={{ duration: 0.6 }}
              className="w-8 h-8 rounded-xl bg-gradient-to-br from-blue-500 to-purple-500 flex items-center justify-center"
            >
              <Sparkles className="w-5 h-5 text-white" />
            </motion.div>
            <span className="text-2xl font-bold bg-gradient-to-r from-white to-gray-400 bg-clip-text text-transparent">
              REOWN
            </span>
            <motion.span
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.5 }}
              className="absolute -top-1 -right-8 text-[10px] font-medium px-2 py-0.5 rounded-full bg-gradient-to-r from-blue-500 to-purple-500 text-white"
            >
              BETA
            </motion.span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-1">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setActiveLink(link.href)}
                className="relative px-4 py-2 text-sm font-medium text-gray-300 hover:text-white transition-colors group"
              >
                <span className="relative z-10 flex items-center gap-2">
                  <link.icon className="w-4 h-4" />
                  {link.label}
                </span>
                {activeLink === link.href && (
                  <motion.div
                    layoutId="activeNav"
                    className="absolute inset-0 rounded-lg bg-gradient-to-r from-blue-500/20 to-purple-500/20 border border-white/10"
                    transition={{ type: "spring", stiffness: 400, damping: 30 }}
                  />
                )}
                <motion.div
                  className="absolute bottom-0 left-1/2 w-0 h-0.5 bg-gradient-to-r from-blue-500 to-purple-500 group-hover:w-full transition-all duration-300 -translate-x-1/2"
                  whileHover={{ width: "100%" }}
                />
              </Link>
            ))}
          </div>

          {/* Right Side */}
          <div className="flex items-center gap-3">
            {/* Notification Bell */}
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              className="relative hidden sm:flex items-center justify-center w-9 h-9 rounded-lg border border-white/10 hover:bg-white/5 transition-colors"
            >
              <Bell className="w-4 h-4 text-gray-400" />
              <span className="absolute -top-0.5 -right-0.5 w-2 h-2 rounded-full bg-red-500 animate-pulse" />
            </motion.button>

            {/* Settings */}
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              className="hidden sm:flex items-center justify-center w-9 h-9 rounded-lg border border-white/10 hover:bg-white/5 transition-colors"
            >
              <Settings className="w-4 h-4 text-gray-400" />
            </motion.button>

            {/* Connect Button */}
            <div className="scale-90 sm:scale-100 origin-right">
              <ConnectButton />
            </div>

            {/* Mobile Menu Toggle */}
            <motion.button
              whileTap={{ scale: 0.9 }}
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="md:hidden flex items-center justify-center w-9 h-9 rounded-lg border border-white/10 hover:bg-white/5 transition-colors"
            >
              {isMobileMenuOpen ? (
                <X className="w-5 h-5 text-white" />
              ) : (
                <Menu className="w-5 h-5 text-white" />
              )}
            </motion.button>
          </div>
        </div>
      </motion.nav>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, x: "100%" }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: "100%" }}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
            className="fixed inset-0 z-40 bg-black/95 backdrop-blur-xl md:hidden pt-20"
          >
            <div className="px-6 py-8">
              <div className="flex flex-col gap-2">
                {navLinks.map((link, index) => (
                  <motion.div
                    key={link.href}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.05 }}
                  >
                    <Link
                      href={link.href}
                      onClick={() => {
                        setActiveLink(link.href);
                        setIsMobileMenuOpen(false);
                      }}
                      className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-300 ${
                        activeLink === link.href
                          ? "bg-gradient-to-r from-blue-500/20 to-purple-500/20 border border-white/10 text-white"
                          : "text-gray-400 hover:text-white hover:bg-white/5"
                      }`}
                    >
                      <link.icon className="w-5 h-5" />
                      <span className="font-medium">{link.label}</span>
                      {activeLink === link.href && (
                        <motion.div
                          layoutId="activeMobileNav"
                          className="ml-auto w-1.5 h-1.5 rounded-full bg-gradient-to-r from-blue-500 to-purple-500"
                        />
                      )}
                    </Link>
                  </motion.div>
                ))}
              </div>

              <div className="mt-8 pt-8 border-t border-white/10">
                <div className="flex items-center gap-4 px-4">
                  <div className="w-10 h-10 rounded-full bg-gradient-to-r from-blue-500 to-purple-500 flex items-center justify-center">
                    <User className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-white">Guest User</p>
                    <p className="text-xs text-gray-400">Connect wallet to start</p>
                  </div>
                </div>
                <div className="mt-4 flex items-center gap-4 px-4">
                  <button className="flex items-center gap-2 text-sm text-gray-400 hover:text-white transition-colors">
                    <HelpCircle className="w-4 h-4" />
                    Help Center
                  </button>
                  <button className="flex items-center gap-2 text-sm text-gray-400 hover:text-white transition-colors">
                    <Settings className="w-4 h-4" />
                    Settings
                  </button>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}