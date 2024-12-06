"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

export default function RegisterPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const router = useRouter();

  useEffect(() => {
    // Add any necessary logic here
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    setError("");

    fetch("/api/auth/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, password }),
    })
      .then((res) => {
        if (res.ok) {
          // Redirect to login or home page
          router.push("/login");
        } else {
          return res.json();
        }
      })
      .then((errorData) => {
        if (errorData) {
          setError(errorData.message);
        }
      });
  };

  return (
    <div className="container flex h-screen w-screen flex-col items-center justify-center">
      <div className="mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[350px]">
        <h1 className="text-2xl font-semibold tracking-tight">Create an Account</h1>
        {error && <p className="text-red-500">{error}</p>}
        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="input"
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            className="input"
          />
          <button type="submit" className="btn">Register</button>
        </form>
        <p className="text-sm text-muted-foreground">
          Already have an account? <a href="/login" className="text-blue-500">Log in</a>
        </p>
      </div>
    </div>
  );
}
