"use client";

import { useEffect, useState } from "react";

export default function LivePrices() {
  const [prices, setPrices] = useState<any>();

  useEffect(() => {
    const load = async () => {
      const res = await fetch("/api/price");
      const data = await res.json();
      setPrices(data);
    };

    load();

    const interval = setInterval(load, 10000);

    return () => clearInterval(interval);
  }, []);

  if (!prices) return <p>Loading...</p>;

  return (
    <div className="grid grid-cols-3 gap-4">
      <div>BTC: ${prices.bitcoin.usd}</div>
      <div>ETH: ${prices.ethereum.usd}</div>
      <div>USDT: ${prices.tether.usd}</div>
    </div>
  );
}