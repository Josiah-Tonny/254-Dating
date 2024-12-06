import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function POST(request: Request) {
  const { id, name, bio } = await request.json();

  try {
    const updatedUser = await prisma.user.update({
      where: { id },
      data: { name, bio },
    });
    return NextResponse.json(updatedUser);
  } catch (error) {
    return NextResponse.json({ message: "Error updating user" }, { status: 500 });
  }
}
