"use client";

import { Check, Crown, Star } from "lucide-react";
import Link from "next/link";
import { CircularProgressbarWithChildren } from "react-circular-progressbar";

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

import { CIRCLE_DIAM } from "./path-layout";

import "react-circular-progressbar/dist/styles.css";

type LessonButtonProps = {
  id: number;
  isFinal: boolean;
  locked?: boolean;
  current?: boolean;
  showStart?: boolean;
  completed: boolean;
  percentage: number;
  x: number;
  y: number;
};

export const LessonButton = ({
  id,
  isFinal,
  locked,
  current,
  showStart,
  completed,
  percentage,
  x,
  y,
}: LessonButtonProps) => {
  const Icon = completed ? Check : isFinal ? Crown : Star;
  const href = completed ? `/lesson/${id}` : "/lesson";

  const buttonNode = (
    <Button
      size="rounded"
      variant={locked ? "locked" : "secondary"}
      className="h-[70px] w-[70px] border-b-8"
    >
      <Icon
        className={cn(
          "h-10 w-10",
          locked
            ? "fill-neutral-400 stroke-neutral-400 text-neutral-400"
            : "fill-primary-foreground text-primary-foreground",
          completed && "fill-none stroke-[4]"
        )}
      />
    </Button>
  );

  return (
    <Link
      href={href}
      aria-disabled={locked}
      style={{
        pointerEvents: locked ? "none" : "auto",
        position: "absolute",
        width: `${CIRCLE_DIAM}px`,
        height: `${CIRCLE_DIAM}px`,
        left: `${x}px`,
        top: `${y}px`,
        transform: "translate(-50%, -50%)",
      }}
    >
      <div className="relative h-full w-full">
        {showStart && (
          <div className="absolute -top-6 left-1/2 z-10 -translate-x-1/2 animate-bounce whitespace-nowrap rounded-xl border-2 bg-white px-3 py-2.5 text-sm font-bold uppercase tracking-wide text-brand-500">
            Start
            <div
              className="absolute -bottom-2 left-1/2 h-0 w-0 -translate-x-1/2 transform border-x-8 border-t-8 border-x-transparent"
              aria-hidden
            />
          </div>
        )}
        {current ? (
          <CircularProgressbarWithChildren
            value={Number.isNaN(percentage) ? 0 : percentage}
            styles={{
              path: { stroke: "#0061AA" },
              trail: { stroke: "#e5e7eb" },
            }}
          >
            {buttonNode}
          </CircularProgressbarWithChildren>
        ) : (
          <div
            style={{
              position: "absolute",
              top: "50%",
              left: "50%",
              transform: "translate(-50%, -50%)",
            }}
          >
            {buttonNode}
          </div>
        )}
      </div>
    </Link>
  );
};
