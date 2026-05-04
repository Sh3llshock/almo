import { Fragment } from "react";

import { GlossaryTerm, type ShowInNotesFn } from "@/components/glossary-term";
import { sortedGlossary } from "@/lib/glossary";

export function parseGlossary(
  text: string,
  onShowInNotes: ShowInNotesFn
): React.ReactNode {
  type Segment =
    | { kind: "text"; value: string }
    | { kind: "term"; original: string; entry: (typeof sortedGlossary)[0] };

  const segments: Segment[] = [{ kind: "text", value: text }];

  for (const entry of sortedGlossary) {
    const pattern = new RegExp(`(${entry.term})`, "gi");

    const next: Segment[] = [];
    for (const seg of segments) {
      if (seg.kind !== "text") {
        next.push(seg);
        continue;
      }
      const parts = seg.value.split(pattern);
      for (const part of parts) {
        if (part.toLowerCase() === entry.term.toLowerCase() && part.length > 0) {
          next.push({ kind: "term", original: part, entry });
        } else if (part.length > 0) {
          next.push({ kind: "text", value: part });
        }
      }
    }
    segments.splice(0, segments.length, ...next);
  }

  return (
    <>
      {segments.map((seg, i) =>
        seg.kind === "text" ? (
          <Fragment key={i}>{seg.value}</Fragment>
        ) : (
          <GlossaryTerm
            key={i}
            term={seg.original}
            definition={seg.entry.definition}
            sectionId={seg.entry.sectionId}
            onShowInNotes={onShowInNotes}
          />
        )
      )}
    </>
  );
}
