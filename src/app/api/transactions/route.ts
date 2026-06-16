import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const address = searchParams.get("address");

    if (!address) {
      return NextResponse.json(
        { success: false, error: "Address is required", transactions: [] },
        { status: 400 }
      );
    }

    // For now, return mock transactions since we don't have a real API
    // In production, you would fetch from a blockchain explorer API
    const mockTransactions = generateMockTransactions(address);
    
    return NextResponse.json({
      success: true,
      transactions: mockTransactions,
      count: mockTransactions.length,
    });

  } catch (error: any) {
    console.error("API Error:", error);
    
    return NextResponse.json(
      {
        success: false,
        error: error.message || "Failed to fetch transactions",
        transactions: [],
      },
      { status: 500 }
    );
  }
}

function generateMockTransactions(address: string) {
  const types: ('send' | 'receive' | 'swap')[] = ['send', 'receive', 'swap'];
  const tokens = ['ETH', 'USDC', 'USDT', 'DAI', 'MATIC', 'LINK', 'UNI', 'AAVE', 'WBTC', 'CRV'];
  const statuses: ('Success' | 'Pending' | 'Failed')[] = ['Success', 'Success', 'Success', 'Pending', 'Failed'];
  
  // Generate 5-15 random transactions
  const count = Math.floor(Math.random() * 10) + 5;
  
  return Array.from({ length: count }, (_, i) => {
    const type = types[Math.floor(Math.random() * types.length)];
    const token = tokens[Math.floor(Math.random() * tokens.length)];
    const amount = (Math.random() * 10).toFixed(4);
    const status = statuses[Math.floor(Math.random() * statuses.length)];
    const hash = '0x' + Array.from({ length: 64 }, () => 
      '0123456789abcdef'[Math.floor(Math.random() * 16)]
    ).join('');
    
    // Generate random addresses
    const randomAddress = '0x' + Array.from({ length: 40 }, () => 
      '0123456789abcdef'[Math.floor(Math.random() * 16)]
    ).join('');
    
    return {
      hash,
      token,
      amount,
      status: status as 'Success' | 'Pending' | 'Failed',
      timestamp: new Date(Date.now() - Math.random() * 30 * 24 * 60 * 60 * 1000).toISOString(),
      type,
      from: type === 'receive' ? randomAddress : address,
      to: type === 'send' ? randomAddress : address,
    };
  }).sort((a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime());
}