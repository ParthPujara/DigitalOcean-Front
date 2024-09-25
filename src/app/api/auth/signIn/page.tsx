"use client";
import React from "react";
import { LoginPage } from "./LoginPage";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";

export default function page() {
  const router = useRouter();
  return (
    <div className="h-screen grid place-content-center">
      <Button
        variant="outline"
        className="fixed top-4 right-4"
        onClick={() => {
          router.push("/api/auth/signUp");
        }}
      >
        SignUp
      </Button>
      <div className="w-96">
        <h1 className="text-3xl font-bold mb-8">Sign In</h1>
        <LoginPage />
      </div>
    </div>
  );
}
