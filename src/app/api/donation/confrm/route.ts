/* eslint-disable @typescript-eslint/no-unused-vars */
import { db } from "@/lib/db";
import { NextResponse } from "next/server";

export async function PATCH(req: Request) {
  try {
    const body = await req.json();
    const { reference } = body;

    const donation = await db.donation.findUnique({
      where: { reference },
    });

    if (!donation) {
      return NextResponse.json({ error: "Not found" }, { status: 404 });
    }

    await db.donation.update({
      where: { reference },
      data: { status: "SUCCESS" },
    });

    await db.campaign.update({
      where: { id: donation.campaignId },
      data: {
        raised: {
          increment: donation.amount,
        },
      },
    });

    return NextResponse.json({ message: "Donation confirmed" });
  } catch (err) {
    return NextResponse.json(
      { error: "Failed to confirm donation" },
      { status: 500 }
    );
  }
}