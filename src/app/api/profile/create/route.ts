"use client";

import { useAccount } from "wagmi";
import { useEffect } from "react";

export default function CreateProfile() {
  const { address, isConnected } = useAccount();

  useEffect(() => {
    if (!address || !isConnected) return;

    localStorage.setItem("walletAddress", address);

    console.log("Wallet Saved:", address);
  }, [address, isConnected]);

  return null;
}