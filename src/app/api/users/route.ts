import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function POST(request: Request) {
  const { userId, action } = await request.json();

  if (action === "like") {
    // Handle like logic
    await prisma.like.create({
      data: {
        likerId: userId,
        likedId: userId, // This should be the ID of the user being liked
      },
    });
    return NextResponse.json({ message: "User liked successfully" });
  } else if (action === "dislike") {
    // Handle dislike logic
    await prisma.like.deleteMany({
      where: {
        likerId: userId,
        likedId: userId, // This should be the ID of the user being disliked
      },
    });
    return NextResponse.json({ message: "User disliked successfully" });
  }

  return NextResponse.json({ message: "Invalid action" }, { status: 400 });
}
