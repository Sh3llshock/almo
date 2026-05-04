"use client";

import { useEffect, useRef, useState } from "react";

import { X } from "lucide-react";

export type ShowInNotesFn = (sectionId: string, highlightTerm: string) => void;

type GlossaryTermProps = {
  term: string;
  definition: string;
  sectionId: string;
  onShowInNotes: ShowInNotesFn;
};

export const GlossaryTerm = ({
  term,
  definition,
  sectionId,
  onShowInNotes,
}: GlossaryTermProps) => {
  const [open, setOpen] = useState(false);
  const wrapperRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    if (!open) return;
    const handler = (e: MouseEvent) => {
      if (!wrapperRef.current?.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, [open]);

  const handleShowInNotes = () => {
    setOpen(false);
    onShowInNotes(sectionId, term);
  };

  return (
    <span ref={wrapperRef} className="relative inline-block">
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        className="cursor-pointer border-b-2 border-dotted border-brand-500 text-current hover:border-brand-700 focus:outline-none"
      >
        {term}
      </button>

      {open && (
        <span className="absolute bottom-full left-1/2 z-50 mb-2 w-72 -translate-x-1/2 rounded-xl border-2 border-brand-200 bg-white p-3 shadow-xl">
          {/* arrow */}
          <span className="absolute -bottom-[9px] left-1/2 h-0 w-0 -translate-x-1/2 border-x-8 border-t-8 border-x-transparent border-t-brand-200" />
          <span className="absolute -bottom-[7px] left-1/2 h-0 w-0 -translate-x-1/2 border-x-8 border-t-8 border-x-transparent border-t-white" />

          <button
            onClick={() => setOpen(false)}
            className="absolute right-2 top-2 text-slate-400 hover:text-slate-600"
          >
            <X size={12} />
          </button>

          <p className="mb-1 pr-4 text-sm font-bold text-brand-700">{term}</p>
          <p className="mb-3 text-xs leading-relaxed text-slate-600">
            {definition}
          </p>

          <button
            onClick={handleShowInNotes}
            className="ml-auto block text-xs font-semibold text-brand-600 hover:underline"
          >
            Show in notes →
          </button>
        </span>
      )}
    </span>
  );
};
