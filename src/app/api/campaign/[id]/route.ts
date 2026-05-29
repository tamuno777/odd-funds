/* eslint-disable @typescript-eslint/no-unused-vars */
import { NextResponse } from "next/server";
import { db } from "@/lib/db";
import { auth } from "@/auth";

type Params = {
  params: Promise<{ id: string }>; 
};

export async function GET(req: Request, { params }: Params) {
  try {
    const { id } = await params;
    const campaign = await db.campaign.findUnique({
      where: { id },
      include: { user: true },
    });

    if (!campaign) {
      return NextResponse.json({ error: "Campaign not found" }, { status: 404 });
    }

    return NextResponse.json(campaign);
  } catch (err) {
    return NextResponse.json({ error: "Failed to fetch campaign" }, { status: 500 });
  }
}

export async function PATCH(
  req: Request,
  { params }: Params
) {
  try {
    const { id } = await params;

    const session = await auth();

    if (!session?.user?.id) {
      return NextResponse.json(
        { error: "Unauthorized" },
        { status: 401 }
      );
    }

    const existingCampaign =
      await db.campaign.findUnique({
        where: { id },
      });

    if (
      !existingCampaign ||
      existingCampaign.userId !==
        session.user.id
    ) {
      return NextResponse.json(
        { error: "Forbidden" },
        { status: 403 }
      );
    }

    const body = await req.json();

    const updated = await db.campaign.update({
      where: { id },
      data: {
        ...(body.title && {
          title: body.title,
        }),
        ...(body.description && {
          description: body.description,
        }),
        ...(body.image && {
          image: body.image,
        }),
        ...(body.status && {
          status: body.status,
        }),
        ...(body.goal && {
          goal: Number(body.goal),
        }),
      },
    });

    return NextResponse.json(updated);
  } catch (err) {
    return NextResponse.json(
      { error: "Failed to update campaign" },
      { status: 500 }
    );
  }
}

export async function DELETE(
  req: Request,
  { params }: Params
) {
  try {
    const { id } = await params;

    const session = await auth();

    if (!session?.user?.id) {
      return NextResponse.json(
        { error: "Unauthorized" },
        { status: 401 }
      );
    }

    const existingCampaign =
      await db.campaign.findUnique({
        where: { id },
      });

    if (
      !existingCampaign ||
      existingCampaign.userId !==
        session.user.id
    ) {
      return NextResponse.json(
        { error: "Forbidden" },
        { status: 403 }
      );
    }

    await db.campaign.delete({
      where: { id },
    });

    return NextResponse.json({
      success: true,
    });
  } catch (err) {
    return NextResponse.json(
      { error: "Failed to delete campaign" },
      { status: 500 }
    );
  }
}

