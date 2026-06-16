"use client";

import { useAccount } from "wagmi";
import { useEffect, useRef } from "react";

export default function CreateProfile() {
  const { address, isConnected } = useAccount();
  const createdRef = useRef(false);

  useEffect(() => {
    if (!address || !isConnected) return;

    if (createdRef.current) return;

    const createUser = async () => {
      try {
        const response = await fetch(
          "/api/profile/create",
          {
            method: "POST",
            headers: {
              "Content-Type":
                "application/json",
            },
            body: JSON.stringify({
              walletAddress: address,
            }),
          }
        );

        const data =
          await response.json();

        if (!response.ok) {
          throw new Error(
            data.error ||
              "Profile creation failed"
          );
        }

        console.log(
          "Profile created:",
          data
        );

        createdRef.current = true;
      } catch (error) {
        console.error(
          "Profile creation failed:",
          error
        );
      }
    };

    createUser();
  }, [address, isConnected]);

  return null;
}