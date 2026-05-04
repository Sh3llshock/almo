import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import { notFound } from "next/navigation";

import { NotesView } from "@/components/notes-view";
import { anatomyNotes } from "@/lib/anatomy-notes";
import db from "@/db/drizzle";
import { units } from "@/db/schema";
import { eq } from "drizzle-orm";

type NotesPageProps = {
  params: Promise<{ unitId: string }>;
};

const NotesPage = async ({ params }: NotesPageProps) => {
  const { unitId } = await params;
  const unit = await db.query.units.findFirst({
    where: eq(units.id, Number(unitId)),
  });

  if (!unit) notFound();

  const hasNotes = anatomyNotes.some((n) => n.unitTitle === unit.title);
  if (!hasNotes) notFound();

  return (
    <div className="min-h-screen bg-white">
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

      <NotesView unitTitle={unit.title} />
    </div>
  );
};

export default NotesPage;
