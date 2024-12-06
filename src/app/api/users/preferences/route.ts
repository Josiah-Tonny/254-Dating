import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function POST(request: Request) {
  const { userId, preferences } = await request.json();

  try {
    const updatedUser = await prisma.user.update({
      where: { id: userId },
      data: { preferences }, // Assuming preferences is a field in the User model
    });
    return NextResponse.json(updatedUser);
  } catch {
    return NextResponse.json({ message: "Error updating preferences" }, { status: 500 });
  }
}
