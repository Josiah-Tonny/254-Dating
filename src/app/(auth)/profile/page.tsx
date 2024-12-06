"use client";

import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { useState, useEffect } from "react";
import { Session } from "next-auth";

export default function ProfilePage() {
  const [session, setSession] = useState<Session | null>(null);
  const [name, setName] = useState("");
  const [bio, setBio] = useState("");

  useEffect(() => {
    const fetchSession = async () => {
      const sessionData = await getServerSession(authOptions);
      setSession(sessionData);
      if (sessionData && sessionData.user && sessionData.user.email) {
        const userData = await prisma.user.findUnique({
          where: { email: sessionData.user.email },
        });
        setName(userData?.name || "");
        setBio(userData?.bio || "");
      }
    };
    fetchSession();
  }, []);

  const handleUpdate = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!session?.user?.id) return;

    await fetch("/api/users/update", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        id: session.user.id,
        name,
        bio,
      }),
    });
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold">Profile</h1>
      {session && (
        <form onSubmit={handleUpdate} className="space-y-4">
          <input
            type="text"
            placeholder="Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="input"
          />
          <textarea
            placeholder="Bio"
            value={bio}
            onChange={(e) => setBio(e.target.value)}
            className="input"
          />
          <button type="submit" className="btn">Update Profile</button>
        </form>
      )}
    </div>
  );
}
