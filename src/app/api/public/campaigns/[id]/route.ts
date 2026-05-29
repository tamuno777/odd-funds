/* eslint-disable @typescript-eslint/no-unused-vars */
import { NextResponse } from "next/server";
import { db } from "@/lib/db";

type Params = {
  params: Promise<{ id: string }>;
};

export async function GET(
  req: Request,
  { params }: Params
) {
  try {
    const { id } = await params;

    const campaign = await db.campaign.findFirst({
      where: {
        id,
        isPublic: true,
      },
      select: {
        id: true,
        title: true,
        description: true,
        image: true,
        goal: true,
        raised: true,
        // donors: true,
        createdAt: true,
        status: true,
      },
    });

    if (!campaign) {
      return NextResponse.json(
        { error: "Campaign not found" },
        { status: 404 }
      );
    }

    return NextResponse.json(campaign);
  } catch (err) {
    return NextResponse.json(
      { error: "Failed to fetch campaign" },
      { status: 500 }
    );
  }
}