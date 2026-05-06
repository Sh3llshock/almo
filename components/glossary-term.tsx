"use client";

import { useEffect, useLayoutEffect, useRef, useState } from "react";

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
  const [translateOffset, setTranslateOffset] = useState(0);
  const [flipBelow, setFlipBelow] = useState(false);
  const wrapperRef = useRef<HTMLSpanElement>(null);
  const popupRef = useRef<HTMLSpanElement>(null);

  // Close on outside click
  useEffect(() => {
    if (!open) return;
    const handler = (e: MouseEvent) => {
      if (!wrapperRef.current?.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, [open]);

  // Reset flip/offset when popup opens, then measure
  useLayoutEffect(() => {
    if (!open) return;
    setFlipBelow(false);
    setTranslateOffset(0);
  }, [open]);

  // Clamp popup within viewport after it renders
  useEffect(() => {
    if (!open || !popupRef.current) return;
    const rect = popupRef.current.getBoundingClientRect();
    const margin = 8;
    // Flip below if there's not enough space above
    if (rect.top < margin) {
      setFlipBelow(true);
    }
    // Horizontal clamping
    if (rect.left < margin) {
      setTranslateOffset(margin - rect.left);
    } else if (rect.right > window.innerWidth - margin) {
      setTranslateOffset(window.innerWidth - margin - rect.right);
    } else {
      setTranslateOffset(0);
    }
  }, [open, flipBelow]);

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
        <span
          ref={popupRef}
          style={{
            transform: `translateX(calc(-50% + ${translateOffset}px))`,
          }}
          className={`absolute left-1/2 z-50 w-64 rounded-xl border-2 border-brand-200 bg-white p-3 shadow-xl sm:w-72 ${flipBelow ? "top-full mt-2" : "bottom-full mb-2"}`}
        >
          {/* arrow — points toward the term */}
          {flipBelow ? (
            <>
              <span className="absolute -top-[9px] left-1/2 h-0 w-0 -translate-x-1/2 border-x-8 border-b-8 border-x-transparent border-b-brand-200" />
              <span className="absolute -top-[7px] left-1/2 h-0 w-0 -translate-x-1/2 border-x-8 border-b-8 border-x-transparent border-b-white" />
            </>
          ) : (
            <>
              <span className="absolute -bottom-[9px] left-1/2 h-0 w-0 -translate-x-1/2 border-x-8 border-t-8 border-x-transparent border-t-brand-200" />
              <span className="absolute -bottom-[7px] left-1/2 h-0 w-0 -translate-x-1/2 border-x-8 border-t-8 border-x-transparent border-t-white" />
            </>
          )}

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
