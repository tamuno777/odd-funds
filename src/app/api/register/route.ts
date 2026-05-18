import { NextResponse } from "next/server";
import { hash } from "bcryptjs";

import {db} from "@/lib/db";
import { signUpSchema } from "@/lib/schema";

export async function POST(req: Request) {
  try {
    const body = await req.json();

    const validatedData =
      signUpSchema.safeParse(body);

    if (!validatedData.success) {
      return NextResponse.json(
        {
          error:
            validatedData.error.issues[0]?.message ||
            "Invalid data",
        },
        { status: 400 }
      );
    }

    const { name, dob, email, password } =
      validatedData.data;

    const existingUser = await db.user.findUnique({
      where: {
        email: email.toLowerCase(),
      },
    });

    if (existingUser) {
      return NextResponse.json(
        {
          error: "Email already exists",
        },
        { status: 409 }
      );
    }

    const hashedPassword = await hash(password, 10);

    await db.user.create({
      data: {
        name,
        dob,
        email: email.toLowerCase(),
        password: hashedPassword,
      },
    });

    return NextResponse.json(
      {
        success: true,
      },
      { status: 201 }
    );
  } catch (error) {
    console.error("[REGISTER_ERROR]", error);

    return NextResponse.json(
      {
        error: "Internal server error",
      },
      { status: 500 }
    );
  }
}