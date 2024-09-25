import React from "react";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { getServerSession } from "next-auth";
import { Options } from "@/app/api/auth/[...nextauth]/AuthOptions";
import SignIn from "../auth/SignIn";

export default async function User() {
  const session = await getServerSession(Options);
  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant="ghost" size="icon">
          <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="size-8 stroke-current"
          >
            <path
              d="M18 19C18 16.7909 15.3137 15 12 15C8.68629 15 6 16.7909 6 19M12 12C9.79086 12 8 10.2091 8 8C8 5.79086 9.79086 4 12 4C14.2091 4 16 5.79086 16 8C16 10.2091 14.2091 12 12 12Z"
              strokeWidth="3"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </Button>
      </SheetTrigger>
      <SheetContent>
        {session?.user ? (
          <>
            <h1 className="text-4xl font-bold">{session.user.name}</h1>
          </>
        ) : (
          <SignIn />
        )}
      </SheetContent>
    </Sheet>
  );
}
