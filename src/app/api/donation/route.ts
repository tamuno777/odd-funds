
import { NextResponse } from "next/server";
import { db } from "@/lib/db";
import { v4 as uuidv4 } from "uuid"; 

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { amount, campaignId, donorName, donorEmail, message, userId } = body;

    if (!amount || !campaignId) {
      return NextResponse.json(
        { error: "Amount and Campaign ID are required" },
        { status: 400 }
      );
    }

    const reference = `DON-${uuidv4().substring(0, 8).toUpperCase()}-${Date.now()}`;

    const donation = await db.donation.create({
      data: {
        amount: Number(amount),
        campaignId,
        donorName: donorName || "Anonymous",
        donorEmail,
        message,
        userId, 
        reference,
        status: "PENDING", 
      },
    });

    return NextResponse.json(donation);
  } catch (err) {
    console.error("Donation Init Error:", err);
    return NextResponse.json(
      { error: "Failed to initialize donation" },
      { status: 500 }
    );
  }
}