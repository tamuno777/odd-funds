/* eslint-disable @typescript-eslint/no-unused-vars */
import { NextResponse } from "next/server";
import { db } from "@/lib/db";

export async function POST(req: Request) {
  try {
    const body = await req.json();

    const { amount, campaignId, donorName, donorEmail, message } = body;

    if (!amount || !campaignId) {
      return NextResponse.json(
        { error: "Missing fields" },
        { status: 400 }
      );
    }

    const donation = await db.donation.create({
      data: {
        amount: Number(amount),
        campaignId,
        donorName,
        donorEmail,
        message,
      },
    });

    await db.campaign.update({
      where: { id: campaignId },
      data: {
        raised: {
          increment: Number(amount),
        },
      },
    });

    return NextResponse.json(donation);
  } catch (err) {
    return NextResponse.json(
      { error: "Failed to create donation" },
      { status: 500 }
    );
  }
}