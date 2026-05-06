"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useStreakModal } from "@/store/use-streak-modal";

export const StreakNotifier = ({ streak }: { streak: number }) => {
  const { open } = useStreakModal();
  const router = useRouter();

  useEffect(() => {
    open(streak);
    router.replace("/learn");
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return null;
};
