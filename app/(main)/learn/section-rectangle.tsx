"use client";

import { Check } from "lucide-react";
import Link from "next/link";

import { cn } from "@/lib/utils";

import { RECT_HEIGHT, RECT_WIDTH } from "./path-layout";

type SectionRectangleProps = {
  title: string;
  unitId: number;
  sectionId?: string;
  completed: boolean;
  showStart: boolean;
  x: number;
  y: number;
};

export const SectionRectangle = ({
  title,
  unitId,
  sectionId,
  completed,
  showStart,
  x,
  y,
}: SectionRectangleProps) => {
  const inner = (
    <div
      className={cn(
        "flex h-full w-full items-center justify-center rounded-2xl border-2 border-b-4 px-3 text-center transition active:border-b-2",
        completed
          ? "border-brand-600 bg-brand-500 text-white"
          : "border-slate-200 bg-white text-slate-700 hover:bg-slate-50",
        sectionId &&
          !completed &&
          "border-brand-300 bg-brand-50 text-brand-600 hover:bg-brand-100"
      )}
    >
      <span className="text-sm font-bold uppercase leading-tight tracking-wide">
        {title}
      </span>
      {completed && (
        <Check
          className="absolute -right-2 -top-2 h-6 w-6 rounded-full border-2 border-white bg-brand-500 p-0.5 text-white"
          strokeWidth={3}
        />
      )}
    </div>
  );

  const wrapperStyle = {
    width: `${RECT_WIDTH}px`,
    height: `${RECT_HEIGHT}px`,
    left: `${x}px`,
    top: `${y}px`,
    transform: "translate(-50%, -50%)",
  } as const;

  const startPulse = showStart && (
    <div className="absolute -top-9 left-1/2 z-10 -translate-x-1/2 animate-bounce whitespace-nowrap rounded-xl border-2 bg-white px-3 py-2.5 text-sm font-bold uppercase tracking-wide text-brand-500">
      Start
      <div
        className="absolute -bottom-2 left-1/2 h-0 w-0 -translate-x-1/2 transform border-x-8 border-t-8 border-x-transparent"
        aria-hidden
      />
    </div>
  );

  if (sectionId) {
    return (
      <Link
        href={`/notes/${unitId}/${sectionId}`}
        className="absolute"
        style={wrapperStyle}
      >
        <div className="relative h-full w-full">
          {startPulse}
          {inner}
        </div>
      </Link>
    );
  }

  return (
    <div className="absolute" style={wrapperStyle}>
      <div className="relative h-full w-full">
        {startPulse}
        {inner}
      </div>
    </div>
  );
};
