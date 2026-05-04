"use client";

import { useEffect } from "react";

import { anatomyNotes, type Block } from "@/lib/anatomy-notes";

type NotesViewProps = {
  unitTitle: string;
  sectionId?: string;
  highlightTerm?: string;
};

function highlight(text: string, term?: string): React.ReactNode {
  if (!term) return text;
  const parts = text.split(new RegExp(`(${term})`, "gi"));
  return parts.map((part, i) =>
    part.toLowerCase() === term.toLowerCase() ? (
      <mark key={i} className="rounded bg-yellow-200 px-0.5">
        {part}
      </mark>
    ) : (
      <span key={i}>{part}</span>
    )
  );
}

function renderBlock(block: Block, highlightTerm?: string) {
  switch (block.t) {
    case "h3":
      return (
        <h3 className="mb-2 mt-5 text-base font-bold text-brand-700">
          {highlight(block.text, highlightTerm)}
        </h3>
      );
    case "p":
      return (
        <p className="mb-3 leading-relaxed text-slate-700">
          {highlight(block.text, highlightTerm)}
        </p>
      );
    case "ul":
      return (
        <ul className="mb-3 list-disc space-y-1 pl-5 text-slate-700">
          {block.items.map((item, i) => (
            <li key={i} className="leading-relaxed">
              {highlight(item, highlightTerm)}
            </li>
          ))}
        </ul>
      );
    case "ol":
      return (
        <ol className="mb-3 list-decimal space-y-1 pl-5 text-slate-700">
          {block.items.map((item, i) => (
            <li key={i} className="leading-relaxed">
              {highlight(item, highlightTerm)}
            </li>
          ))}
        </ol>
      );
    case "table":
      return (
        <div className="mb-4 overflow-x-auto rounded-lg border border-slate-200">
          <table className="w-full text-sm">
            <thead>
              <tr className="bg-brand-50">
                {block.headers.map((h, i) => (
                  <th
                    key={i}
                    className="border-b border-slate-200 px-3 py-2 text-left font-semibold text-brand-700"
                  >
                    {highlight(h, highlightTerm)}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {block.rows.map((row, ri) => (
                <tr key={ri} className={ri % 2 === 0 ? "bg-white" : "bg-slate-50"}>
                  {row.map((cell, ci) => (
                    <td
                      key={ci}
                      className="border-b border-slate-100 px-3 py-2 text-slate-700"
                    >
                      {highlight(cell, highlightTerm)}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      );
    case "key":
      return (
        <div className="mb-4 rounded-lg border-l-4 border-brand-500 bg-brand-50 px-4 py-3">
          <p className="text-sm font-medium text-brand-800">
            {highlight(block.text, highlightTerm)}
          </p>
        </div>
      );
  }
}

export const NotesView = ({ unitTitle, sectionId, highlightTerm }: NotesViewProps) => {
  const unitNotes = anatomyNotes.find((n) => n.unitTitle === unitTitle);

  useEffect(() => {
    if (!sectionId) return;
    const el = document.getElementById(sectionId);
    if (el) {
      setTimeout(() => el.scrollIntoView({ behavior: "smooth", block: "start" }), 100);
    }
  }, [sectionId]);

  if (!unitNotes) {
    return (
      <div className="flex h-64 items-center justify-center text-slate-400">
        No notes available for this unit.
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-2xl px-6 py-8">
      <h1 className="mb-2 text-2xl font-extrabold text-brand-700">
        {unitNotes.unitTitle}
      </h1>
      <p className="mb-8 leading-relaxed text-slate-600">{unitNotes.intro}</p>

      {unitNotes.sections.map((section) => (
        <div key={section.id} id={section.id} className="mb-10 scroll-mt-20">
          <h2 className="mb-4 border-b-2 border-brand-100 pb-2 text-xl font-bold text-brand-600">
            {highlight(section.title, highlightTerm)}
          </h2>
          {section.blocks.map((block, i) => (
            <div key={i}>{renderBlock(block, highlightTerm)}</div>
          ))}
        </div>
      ))}
    </div>
  );
};
