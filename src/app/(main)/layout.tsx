import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { ReactNode } from "react";
import Link from "next/link";
import Image from "next/image";

export default async function MainLayout({ children }: { children: ReactNode }) {
  const session = await getServerSession(authOptions);

  return (
    <div className="flex h-screen">
      <aside className="w-1/4 bg-gray-800 text-white p-4">
        <div className="flex items-center mb-4">
          <Image src={session?.user.image} alt="Profile" width={48} height={48} className="rounded-full mr-2" />
          <span className="font-semibold text-lg">{session?.user.name}</span>
        </div>
        <nav className="space-y-2">
          <Link href="/" className="block p-2 hover:bg-gray-700 rounded">Home</Link>
          <Link href="/search" className="block p-2 hover:bg-gray-700 rounded">Search</Link>
          <Link href="/messages" className="block p-2 hover:bg-gray-700 rounded">Messages</Link>
          <Link href="/matches" className="block p-2 hover:bg-gray-700 rounded">Matches</Link>
          <Link href="/preferences" className="block p-2 hover:bg-gray-700 rounded">Preferences</Link>
          <Link href="/profile" className="block p-2 hover:bg-gray-700 rounded">Profile</Link>
        </nav>
      </aside>
      <main className="flex-1 p-4 bg-gray-100">{children}</main>
    </div>
  );
}
