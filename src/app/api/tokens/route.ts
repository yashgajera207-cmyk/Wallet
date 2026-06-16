import { NextRequest, NextResponse } from "next/server";

interface TokenBalance {
  contractAddress: string;
  tokenBalance: string;
  error?: string;
}

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const address = searchParams.get("address");

    if (!address) {
      return NextResponse.json(
        { success: false, tokens: [], error: "Address is required" },
        { status: 400 }
      );
    }

    // Get token balances from Alchemy
    const response = await fetch(
      `https://eth-mainnet.g.alchemy.com/v2/${process.env.ALCHEMY_API_KEY}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          jsonrpc: "2.0",
          id: 1,
          method: "alchemy_getTokenBalances",
          params: [address],
        }),
      }
    );

    const data = await response.json();

    if (data.error) {
      return NextResponse.json(
        { 
          success: false, 
          tokens: [], 
          error: data.error.message || "Failed to fetch token balances" 
        },
        { status: 500 }
      );
    }

    const tokenBalances: TokenBalance[] = data.result?.tokenBalances || [];

    // Filter out tokens with zero balance or errors
    const nonZeroTokens = tokenBalances.filter(
      (token) => token.tokenBalance !== "0x0000000000000000000000000000000000000000000000000000000000000000" 
        && token.tokenBalance !== "0" 
        && !token.error
    );

    // If no tokens, return empty array
    if (nonZeroTokens.length === 0) {
      return NextResponse.json({
        success: true,
        tokens: [],
        message: "No tokens found in this wallet"
      });
    }

    // Get token metadata for each token
    const tokenPromises = nonZeroTokens.slice(0, 20).map(async (token) => {
      try {
        const metadataResponse = await fetch(
          `https://eth-mainnet.g.alchemy.com/v2/${process.env.ALCHEMY_API_KEY}`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              jsonrpc: "2.0",
              id: 1,
              method: "alchemy_getTokenMetadata",
              params: [token.contractAddress],
            }),
          }
        );

        const metadataData = await metadataResponse.json();
        
        if (metadataData.result) {
          const metadata = metadataData.result;
          const balance = token.tokenBalance;
          const decimals = metadata.decimals || 18;
          const formattedBalance = Number(balance) / Math.pow(10, decimals);
          
          return {
            symbol: metadata.symbol || "UNKNOWN",
            name: metadata.name || "Unknown Token",
            balance: formattedBalance.toString(),
            price: 0, // Will be updated with real price in production
            contractAddress: token.contractAddress,
            decimals: decimals,
            change24h: (Math.random() * 20) - 10, // Random for demo
          };
        }
        return null;
      } catch (error) {
        console.error(`Error fetching metadata for ${token.contractAddress}:`, error);
        return null;
      }
    });

    const tokenResults = await Promise.all(tokenPromises);
    const formattedTokens = tokenResults.filter((token) => token !== null);

    return NextResponse.json({
      success: true,
      tokens: formattedTokens,
      count: formattedTokens.length,
    });

  } catch (error: any) {
    console.error("API Error:", error);
    
    return NextResponse.json(
      {
        success: false,
        error: error.message || "Failed to fetch tokens",
        tokens: [],
      },
      { status: 500 }
    );
  }
}