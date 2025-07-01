'use client'
import { useEffect, useState } from "react";
import './style.css'

export default function UserPage() {
  const [userData, setUserData] = useState<{ username?: string } | null>(null);

  useEffect(() => {
    const token = localStorage.getItem("token");
    fetch("http://localhost:5000/user/me", {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((res) => res.json())
      .then((data) => setUserData(data))
      .catch((err) => {
        console.error("Fetch error:", err.message);
      });
  }, []);

  return (
    <div className="flex min-h-screen">
      <div className="flex-1 p-8">
        {userData?.username && (
          <h1 className="text-lg font-medium">Welcome, {userData.username}</h1>
        )}
      </div>
    </div>
  );
}
