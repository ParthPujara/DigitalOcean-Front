import Payment from "@/components/custom/Payment";
import SideFeatures from "@/components/custom/SideFeatures";
import User from "@/components/custom/user";
import Wallet from "@/components/custom/Wallet";
import { Toaster } from "@/components/ui/sonner";
import React from "react";

export default function layout({ children }: { children: React.ReactNode }) {
  return (
    <main className="h-screen flex">
      <div className="h-full flex"></div>
      <div className="h-full flex-1 flex flex-col">
        {/* Navigation Div */}
        <div className="w-full flex items-center justify-between gap-4 p-4">
          <div></div>
          <div className="flex gap-4 items-center">
            <Wallet />
            <Payment />
            <User />
          </div>
        </div>
        <div className="flex-1 flex">
          <div className="flex-1">{children}</div>
          <div className="w-60">
            <SideFeatures />
          </div>
        </div>
      </div>
      <Toaster richColors />
    </main>
  );
}
