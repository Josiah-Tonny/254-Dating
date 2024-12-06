import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { useEffect, useState } from "react";
import Image from "next/image";

export default function HomePage() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUsers = async () => {
      const response = await fetch('/api/users');
      const data = await response.json();
      setUsers(data);
      setLoading(false);
    };
    fetchUsers();
  }, []);

  const session = getServerSession(authOptions);

  const handleLike = () => {
    // Handle like logic here
  };

  const handleDislike = () => {
    // Handle dislike logic here
  };

  if (!session) {
    return redirect("/login");
  }

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="space-y-4">
      <h1 className="text-2xl font-bold">Available Users</h1>
      <div className="flex flex-col space-y-4">
        {users.map((user) => (
          <div key={user.id} className="flex items-center justify-between p-4 bg-white rounded shadow">
            <Image src={user.image} alt={user.name} className="w-16 h-16 rounded-full" />
            <div className="flex-1 ml-4">
              <h2 className="font-semibold">{user.name}</h2>
              <p>{user.location}</p>
            </div>
            <div className="flex space-x-2">
              <button onClick={handleLike} className="bg-green-500 text-white px-4 py-2 rounded">Like</button>
              <button onClick={handleDislike} className="bg-red-500 text-white px-4 py-2 rounded">Dislike</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
