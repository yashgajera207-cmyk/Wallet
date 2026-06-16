"use client";

import { useAccount } from "wagmi";
import { useEffect } from "react";

export default function CreateProfile() {
  const { address, isConnected } = useAccount();

  useEffect(() => {
    if (!address || !isConnected) return;

    const createUser = async () => {
      try {
        await fetch("/api/profile/create", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            walletAddress: address,
          }),
        });
      } catch (error) {
        console.error("Profile creation failed:", error);
      }
    };

    createUser();
  }, [address, isConnected]);

  return null;
}