"use client";
import React from "react";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";

export default function Wallet() {
  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant="secondary" className="flex flex-col p-6 items-start">
          <span className="text-sm">$10000.00</span>
          <span className="text-xs">Demo Account</span>
        </Button>
      </SheetTrigger>
      <SheetContent>
        <SheetHeader className="text-4xl font-bold">Accounts</SheetHeader>
      </SheetContent>
    </Sheet>
  );
}
