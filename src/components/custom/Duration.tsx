import React from "react";
import { Button } from "../ui/button";
import { Popover, PopoverTrigger, PopoverContent } from "../ui/popover";

export default function Duration() {
  const [Duration, setDuration] = React.useState(5);

  function DecreaseDuration() {
    if (Duration < 10) {
      setDuration(Duration - 1);
    } else if (Duration < 50) {
      setDuration(Duration - 5);
    } else if (Duration < 100) {
      setDuration(Duration - 10);
    } else {
      setDuration(Duration - 50);
    }
  }
  function IncreaseDuration() {
    if (Duration < 10) {
      setDuration(Duration + 1);
    } else if (Duration < 50) {
      setDuration(Duration + 10);
    } else if (Duration < 100) {
      setDuration(Duration + 10);
    } else {
      setDuration(Duration + 50);
    }
  }

  return (
    <div className="space-y-3 grid">
      <Popover>
        <PopoverTrigger>
          <span className="text-lg text-muted-foreground font-semibold">
            Duration
          </span>
          <div className="rounded-md bg-stone-900/50 py-4 font-bold border-2 text-center grid">
            <span className="text-md">{Duration} sec</span>
          </div>
        </PopoverTrigger>
        <PopoverContent
          sideOffset={5}
          align="start"
          side="left"
        ></PopoverContent>
      </Popover>
      <div className="flex gap-2">
        <Button
          variant="outline"
          className="grow"
          onClick={DecreaseDuration}
          disabled={Duration < 6}
        >
          -
        </Button>
        <Button variant="outline" className="grow" onClick={IncreaseDuration}>
          +
        </Button>
      </div>
    </div>
  );
}
