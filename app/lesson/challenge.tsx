import { ThumbsDown, ThumbsUp } from "lucide-react";

import { challengeOptions, challenges } from "@/db/schema";
import { cn } from "@/lib/utils";

import { Card } from "./card";

type ChallengeProps = {
  options: (typeof challengeOptions.$inferSelect)[];
  onSelect: (id: number) => void;
  status: "correct" | "wrong" | "none";
  selectedOption?: number;
  correctOptionId?: number;
  disabled?: boolean;
  type: (typeof challenges.$inferSelect)["type"];
};

export const Challenge = ({
  options,
  onSelect,
  status,
  selectedOption,
  correctOptionId,
  disabled,
  type,
}: ChallengeProps) => {
  return (
    <div
      className={cn(
        "grid gap-2",
        (type === "ASSIST" || type === "TRUE_FALSE") && "grid-cols-1",
        (type === "SELECT" || type === "FILL_BLANK") &&
          "grid-cols-2 lg:grid-cols-[repeat(auto-fit,minmax(0,1fr))]"
      )}
    >
      {options.map((option) => {
        const icon =
          type === "TRUE_FALSE"
            ? option.text === "True"
              ? <ThumbsUp className="h-5 w-5" />
              : <ThumbsDown className="h-5 w-5" />
            : undefined;

        return (
          <Card
            key={option.id}
            id={option.id}
            text={option.text}
            imageSrc={option.imageSrc}
            selected={selectedOption === option.id}
            isCorrect={correctOptionId === option.id}
            onClick={() => onSelect(option.id)}
            status={status}
            audioSrc={option.audioSrc}
            disabled={disabled}
            type={type}
            icon={icon}
          />
        );
      })}
    </div>
  );
};
