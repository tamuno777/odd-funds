import { NextResponse } from "next/server";
import { db } from "@/lib/db";

export async function POST(req: Request) {
  try {
    const { reference, gatewayStatus } = await req.json();

    if (!reference) {
      return NextResponse.json({ error: "Missing reference" }, { status: 400 });
    }

    const donation = await db.donation.findUnique({
      where: { reference },
    });

    if (!donation) {
      return NextResponse.json({ error: "Donation not found" }, { status: 404 });
    }

    if (donation.status === "SUCCESS") {
      return NextResponse.json({ message: "Donation already processed" });
    }

    if (gatewayStatus !== "success") {
      await db.donation.update({
        where: { reference },
        data: { status: "FAILED" },
      });
      return NextResponse.json({ error: "Payment failed" }, { status: 400 });
    }

    const result = await db.$transaction(async (tx) => {
      const updatedDonation = await tx.donation.update({
        where: { reference },
        data: { status: "SUCCESS" },
      });

      const updatedCampaign = await tx.campaign.update({
        where: { id: donation.campaignId },
        data: {
          raised: {
            increment: donation.amount,
          },
        },
      });

      return { updatedDonation, updatedCampaign };
    });

    return NextResponse.json({ success: true, data: result });
  } catch (err) {
    console.error("Verification Error:", err);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}