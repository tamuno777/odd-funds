/* eslint-disable @typescript-eslint/no-unused-vars */
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
      take: 10, 
    });

    const shuffled = campaigns.sort(() => Math.random() - 0.5);

    return NextResponse.json(shuffled);
  } catch (err) {
    return NextResponse.json(
      { error: "Failed to fetch campaigns" },
      { status: 500 }
    );
  }
}