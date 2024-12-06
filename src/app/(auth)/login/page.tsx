"use client";

import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { redirect } from "next/navigation";
import { useEffect } from 'react';
import LoginForm from "./login-form";

export default function LoginPage() {
  useEffect(() => {
    const fetchSession = async () => {
      const sessionData = await getServerSession(authOptions);
      if (sessionData) {
        redirect('/');
      }
    };
    fetchSession();
  }, []);

  return (
    <div className="container flex h-screen w-screen flex-col items-center justify-center">
      <div className="mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[350px]">
        <div className="flex flex-col space-y-2 text-center">
          <h1 className="text-2xl font-semibold tracking-tight">
            Welcome back
          </h1>
          <p className="text-sm text-muted-foreground">
            Enter your email to sign in to your account
          </p>
        </div>
        <LoginForm />
      </div>
    </div>
  );
}
