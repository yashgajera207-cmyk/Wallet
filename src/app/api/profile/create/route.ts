import { NextRequest, NextResponse } from "next/server";

export async function POST(
  req: NextRequest
) {
  try {
    const { walletAddress } =
      await req.json();

    return NextResponse.json({
      success: true,
      walletAddress,
    });
  } catch {
    return NextResponse.json(
      {
        error: "Failed to create profile",
      },
      {
        status: 500,
      }
    );
  }
}