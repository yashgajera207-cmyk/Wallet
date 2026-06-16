import { NextResponse } from "next/server";

export async function GET() {
const response = await fetch(
"https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=50&page=1&sparkline=false",
{
next: {
revalidate: 60,
},
}
);

const data = await response.json();

return NextResponse.json(data);
}
