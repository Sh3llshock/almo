import { ArrowLeft, ArrowRight } from "lucide-react";
import Link from "next/link";
import { notFound } from "next/navigation";

import { NotesView } from "@/components/notes-view";
import { Button } from "@/components/ui/button";
import db from "@/db/drizzle";
import { lessons, units } from "@/db/schema";
import { anatomyNotes } from "@/lib/anatomy-notes";
import { getLessonOrderForSection } from "@/lib/unit-sections";
import { and, eq } from "drizzle-orm";

type SectionPageProps = {
  params: Promise<{ unitId: string; sectionId: string }>;
};

const SectionPage = async ({ params }: SectionPageProps) => {
  const { unitId, sectionId } = await params;
  const unitIdNum = Number(unitId);

  const unit = await db.query.units.findFirst({
    where: eq(units.id, unitIdNum),
  });
  if (!unit) notFound();

  const unitNotes = anatomyNotes.find((n) => n.unitTitle === unit.title);
  const section = unitNotes?.sections.find((s) => s.id === sectionId);
  if (!unitNotes || !section) notFound();

  const order = getLessonOrderForSection(unit.title, sectionId);
  const lesson = order
    ? await db.query.lessons.findFirst({
        where: and(eq(lessons.unitId, unitIdNum), eq(lessons.order, order)),
      })
    : undefined;

  return (
    <div className="min-h-screen bg-white pb-32">
      <div className="sticky top-0 z-10 border-b bg-white">
        <div className="mx-auto flex max-w-2xl items-center gap-3 px-6 py-3">
          <Link
            href="/learn"
            className="flex items-center gap-1.5 text-sm font-semibold text-brand-600 hover:opacity-75"
          >
            <ArrowLeft size={16} />
            Back to lessons
          </Link>
          <span className="ml-auto text-sm text-slate-400">{unit.title}</span>
        </div>
      </div>

      <NotesView unitTitle={unit.title} sectionId={sectionId} sectionOnly />

      {lesson && (
        <div className="fixed bottom-0 left-0 right-0 z-20 border-t bg-white px-4 py-3 pb-[max(12px,env(safe-area-inset-bottom))]">
          <Link href={`/lesson/${lesson.id}`} className="block">
            <Button
              size="lg"
              variant="secondary"
              className="w-full border-2 border-b-4 shadow-lg active:border-b-2"
            >
              I learned it — test my knowledge
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
          </Link>
        </div>
      )}
    </div>
  );
};

export default SectionPage;
