import { X } from "lucide-react";

import { Progress } from "@/components/ui/progress";
import { useExitModal } from "@/store/use-exit-modal";

type HeaderProps = {
  percentage: number;
  questionIndex?: number;
  totalQuestions?: number;
};

export const Header = ({ percentage, questionIndex, totalQuestions }: HeaderProps) => {
  const { open } = useExitModal();

  return (
    <header className="mx-auto flex w-full max-w-[1140px] items-center justify-between gap-x-7 px-10 pt-[20px] lg:pt-[50px]">
      <X
        onClick={open}
        className="cursor-pointer text-slate-500 transition hover:opacity-75"
      />
      <Progress value={percentage} />
      {questionIndex !== undefined && totalQuestions !== undefined && (
        <p className="min-w-[48px] text-right text-sm font-bold text-slate-500">
          {questionIndex}/{totalQuestions}
        </p>
      )}
    </header>
  );
};
