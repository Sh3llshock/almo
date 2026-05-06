import { type ReactNode, useCallback } from "react";

import Image from "next/image";
import { useAudio } from "react-use";

import { challenges } from "@/db/schema";
import { cn } from "@/lib/utils";

type CardProps = {
  id: number;
  text: string;
  imageSrc: string | null;
  audioSrc: string | null;
  selected?: boolean;
  isCorrect?: boolean;
  onClick: () => void;
  status?: "correct" | "wrong" | "none";
  disabled?: boolean;
  type: (typeof challenges.$inferSelect)["type"];
  icon?: ReactNode;
};

export const Card = ({
  text,
  imageSrc,
  audioSrc,
  selected,
  isCorrect,
  onClick,
  status,
  disabled,
  type,
  icon,
}: CardProps) => {
  const [audio, _, controls] = useAudio({ src: audioSrc || "" });

  const handleClick = useCallback(() => {
    if (disabled) return;
    void controls.play();
    onClick();
  }, [disabled, onClick, controls]);

  return (
    <div
      onClick={handleClick}
      className={cn(
        "h-full cursor-pointer rounded-xl border-2 border-b-4 p-4 hover:bg-black/5 active:border-b-2 lg:p-6",
        selected && "border-sky-300 bg-sky-100 hover:bg-sky-100",
        selected && status === "correct" && "border-green-300 bg-green-100 hover:bg-green-100",
        selected && status === "wrong" && "border-rose-300 bg-rose-100 hover:bg-rose-100",
        !selected && isCorrect && status === "wrong" && "border-green-300 bg-green-100 hover:bg-green-100",
        disabled && "pointer-events-none hover:bg-white",
        type === "ASSIST" && "w-full lg:p-3",
        type === "TRUE_FALSE" && "flex items-center gap-4 py-5"
      )}
    >
      {audio}
      {imageSrc && (
        <div className="relative mb-4 aspect-square max-h-[80px] w-full lg:max-h-[150px]">
          <Image src={imageSrc} fill alt={text} />
        </div>
      )}

      {type === "TRUE_FALSE" ? (
        <>
          <span
            className={cn(
              "flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-slate-100 text-2xl",
              selected && status === "correct" && "bg-green-100",
              selected && status === "wrong" && "bg-rose-100",
              !selected && isCorrect && status === "wrong" && "bg-green-100"
            )}
          >
            {icon}
          </span>
          <p
            className={cn(
              "text-lg font-semibold text-neutral-600",
              selected && "text-sky-500",
              selected && status === "correct" && "text-green-500",
              selected && status === "wrong" && "text-rose-500",
              !selected && isCorrect && status === "wrong" && "text-green-500"
            )}
          >
            {text}
          </p>
        </>
      ) : (
        <div
          className={cn(
            "flex items-center justify-between",
            type === "ASSIST" && "flex-row-reverse"
          )}
        >
          {type === "ASSIST" && <div aria-hidden />}
          <p
            className={cn(
              "text-sm text-neutral-600 lg:text-base",
              selected && "text-sky-500",
              selected && status === "correct" && "text-green-500",
              selected && status === "wrong" && "text-rose-500",
              !selected && isCorrect && status === "wrong" && "text-green-500"
            )}
          >
            {text}
          </p>
        </div>
      )}
    </div>
  );
};
