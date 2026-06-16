import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
const { searchParams } = new URL(req.url);

const address = searchParams.get("address");

if (!address) {
return NextResponse.json(
{ error: "Wallet address required" },
{ status: 400 }
);
}

try {
const priceResponse = await fetch(
"https://api.coingecko.com/api/v3/simple/price?ids=ethereum&vs_currencies=usd",
{
next: {
revalidate: 60,
},
}
);


const priceData = await priceResponse.json();

const ethPrice =
  priceData.ethereum?.usd || 0;

return NextResponse.json({
  address,
  totalValue: ethPrice,
  tokens: [
    {
      symbol: "ETH",
      balance: "Live Balance From Wallet",
      usdValue: ethPrice,
    },
  ],
});


} catch (error) {
return NextResponse.json(
{
error: "Failed to load portfolio",
},
{ status: 500 }
);
}
}
