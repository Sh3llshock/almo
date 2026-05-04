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
  x: number;
  y: number;
};

export const SectionRectangle = ({
  title,
  unitId,
  sectionId,
  completed,
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

  if (sectionId) {
    return (
      <Link
        href={`/notes/${unitId}#${sectionId}`}
        className="absolute"
        style={wrapperStyle}
      >
        <div className="relative h-full w-full">{inner}</div>
      </Link>
    );
  }

  return (
    <div className="absolute" style={wrapperStyle}>
      <div className="relative h-full w-full">{inner}</div>
    </div>
  );
};
