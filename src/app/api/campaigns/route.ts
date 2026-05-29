import { NextResponse } from "next/server";
import { db } from "@/lib/db";

export async function GET() {
  try {
    const campaigns = await db.campaign.findMany({
      where: {
        isPublic: true,
      },
      orderBy: {
        createdAt: "desc",
      },
    });

    return NextResponse.json(campaigns);
  } catch (err) {
    console.error("PUBLIC_CAMPAIGNS_ERROR:", err);

    return NextResponse.json(
      { error: "Failed to fetch campaigns" },
      { status: 500 }
    );
  }
}