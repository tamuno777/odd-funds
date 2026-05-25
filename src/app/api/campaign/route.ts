import { NextResponse } from "next/server";
import { db } from "@/lib/db";
import { auth } from "@/auth";

export async function POST(req: Request) {
  try {
    const session = await auth();
    if (!session?.user) {
      return NextResponse.json(
        { error: "Unauthorized - no session" },
        { status: 401 }
      );
    }
  console.log("SESSION DEBUG:", JSON.stringify(session, null, 2));

    const body = await req.json();

    const { title, description, goal, image, isPublic } = body;

    if (!title || !description || !goal) {
      return NextResponse.json(
        { error: "Missing fields" },
        { status: 400 }
      );
    }

    const campaign = await db.campaign.create({
      data: {
        title,
        description,
        goal: Number(goal),
        image,
        isPublic: isPublic ?? true,
        userId: session.user.id, 
      },
    });

    return NextResponse.json(campaign);
  } catch (err) {
    console.error(err);
    return NextResponse.json(
      { error: "Server error" },
      { status: 500 }
    );
  }
}



export async function GET() {
  try {
    const session = await auth();

    if (!session?.user?.id) {
      return NextResponse.json(
        { error: "Unauthorized" },
        { status: 401 }
      );
    }

    const campaigns = await db.campaign.findMany({
      where: {
        userId: session.user.id,
      },
      orderBy: {
        createdAt: "desc",
      },
    });

    return NextResponse.json(campaigns);
  } catch (err) {
    console.error("GET_CAMPAIGNS_ERROR:", err);

    return NextResponse.json(
      { error: "Failed to fetch campaigns" },
      { status: 500 }
    );
  }
}