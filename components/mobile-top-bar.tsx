import { ClerkLoaded, ClerkLoading, UserButton } from "@clerk/nextjs";
import { Loader } from "lucide-react";
import Image from "next/image";

import { getUserProgress } from "@/db/queries";
import { isActiveToday } from "@/lib/streak";

export const MobileTopBar = async () => {
  const userProgress = await getUserProgress();

  const streak = userProgress?.streak ?? 0;
  const points = userProgress?.points ?? 0;
  const lastActivityDate = userProgress?.lastActivityDate ?? null;
  const active = isActiveToday(lastActivityDate, new Date());

  return (
    <nav className="fixed top-0 z-50 flex h-[56px] w-full items-center justify-between border-b bg-white px-4 lg:hidden">
      {/* Left: avatar + name + level */}
      <div className="flex items-center gap-2">
        <ClerkLoading>
          <Loader className="h-5 w-5 animate-spin text-muted-foreground" />
        </ClerkLoading>
        <ClerkLoaded>
          <UserButton
            appearance={{
              elements: { userButtonPopoverCard: { pointerEvents: "initial" } },
            }}
          />
        </ClerkLoaded>

        {userProgress && (
          <span className="text-sm font-bold text-slate-700">
            {userProgress.userName}
          </span>
        )}
      </div>

      {/* Right: streak + points */}
      <div className="flex items-center gap-3">
        <div className="flex items-center gap-1">
          <Image
            src="/streak.png"
            alt="Streak"
            width={20}
            height={20}
            className={active ? "" : "grayscale opacity-50"}
          />
          <span className="text-sm font-bold text-slate-700">{streak}</span>
        </div>

        <div className="flex items-center gap-1">
          <Image src="/points.svg" alt="Points" width={20} height={20} />
          <span className="text-sm font-bold text-orange-500">{points}</span>
        </div>
      </div>
    </nav>
  );
};
