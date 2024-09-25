import React from "react";
import SignUpPage from "./SignUpPage";

export default function page() {
  return (
    <div className="h-screen grid place-content-center">
      <div className="w-96">
        <h1 className="text-3xl font-bold mb-8">Sign In</h1>
        <SignUpPage />
      </div>
    </div>
  );
}
