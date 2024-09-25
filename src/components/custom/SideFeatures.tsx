"use client";
import React from "react";
import { Button } from "../ui/button";
import Duration from "./Duration";
import Orders from "./Orders";
import axios from "axios";
import { toast } from "sonner";

export default function SideFeatures() {
  const [Amount, setAmount] = React.useState(1);
  const multiplier = React.useMemo(() => {
    if (Amount < 10) return 1;
    if (Amount < 50) return 5;
    if (Amount < 100) return 10;
    return 50;
  }, [Amount]);

  function DecreaseAmount() {
    setAmount(Amount - multiplier);
  }
  function IncreaseAmount() {
    setAmount(Amount + multiplier);
  }
  return (
    <div className="h-full flex flex-col gap-5 pe-4 select-none">
      <div className="grid gap-2 py-4">
        <span className="text-lg text-muted-foreground text-center font-semibold">
          Amount
        </span>
        <div className="space-y-3 grid rounded-md bg-stone-900/50 py-4 font-bold border-2 text-center">
          <span className="text-md">$ {Amount}</span>
        </div>
        <div className="flex gap-2">
          <Button
            variant="outline"
            className="grow"
            onClick={DecreaseAmount}
            disabled={Amount < 2}
          >
            -
          </Button>
          <Button variant="outline" className="grow" onClick={IncreaseAmount}>
            +
          </Button>
        </div>
      </div>
      <Duration />
      <Orders />
      <div className="grid gap-4">
        <Button
          className="py-6 bg-green-600 hover:bg-green-600/90 text-lg font-bold text-white flex justify-between"
          onClick={async () => {
            await axios
              .post(
                "https://goldfish-app-6v6r2.ondigitalocean.app/kafka/records",
                {
                  userId: 12345,
                  tradingId: "98765",
                  tradingAmount: 1000.5,
                  stroke: "up",
                  expiry: "2024-09-21T12:30:00Z",
                  initialPrice: 150.25,
                }
              )
              .then(() => {
                toast.success("UP Trade Placed");
              });
          }}
        >
          Up
          <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="size-6 stroke-current"
          >
            <path
              d="M5 16L12 9L19 16"
              strokeWidth="3"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </Button>
        <Button
          className="py-6 bg-red-600 hover:bg-red-600/90 text-lg font-bold text-white flex justify-between"
          onClick={async () => {
            await axios
              .post(
                "https://goldfish-app-6v6r2.ondigitalocean.app/kafka/records",
                {
                  userId: 12345,
                  tradingId: "98765",
                  tradingAmount: 1000.5,
                  stroke: "down",
                  expiry: "2024-09-21T12:30:00Z",
                  initialPrice: 150.25,
                }
              )
              .then(() => {
                toast.success("DOWN Trade Placed");
              });
          }}
        >
          Down
          <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="size-6 stroke-current"
          >
            <path
              d="M19 9L12 16L5 9"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </Button>
      </div>
      <div className="w-full text-center">
        <span>profit $ {Amount * 0.85}</span>
      </div>
    </div>
  );
}
