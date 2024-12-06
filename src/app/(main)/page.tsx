import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { useEffect, useState } from "react";

export default async function HomePage() {
  const session = await getServerSession(authOptions);
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const fetchUsers = async () => {
      const res = await fetch("/api/users"); // API to fetch users
      const data = await res.json();
      setUsers(data);
    };

    fetchUsers();
  }, []);

  const handleLike = async (userId) => {
    // Handle like logic here
  };

  const handleDislike = async (userId) => {
    // Handle dislike logic here
  };

  if (!session) {
    return redirect("/login");
  }

  return (
    <div className="space-y-4">
      <h1 className="text-2xl font-bold">Available Users</h1>
      <div className="flex flex-col space-y-4">
        {users.map((user) => (
          <div key={user.id} className="flex items-center justify-between p-4 bg-white rounded shadow">
            <img src={user.image} alt={user.name} className="w-16 h-16 rounded-full" />
            <div className="flex-1 ml-4">
              <h2 className="font-semibold">{user.name}</h2>
              <p>{user.location}</p>
            </div>
            <div className="flex space-x-2">
              <button onClick={() => handleLike(user.id)} className="bg-green-500 text-white px-4 py-2 rounded">Like</button>
              <button onClick={() => handleDislike(user.id)} className="bg-red-500 text-white px-4 py-2 rounded">Dislike</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
