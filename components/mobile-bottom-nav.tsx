"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";

import { cn } from "@/lib/utils";

const NAV_ITEMS = [
  { href: "/learn", iconSrc: "/learn.svg", label: "Learn" },
  { href: "/leaderboard", iconSrc: "/leaderboard.svg", label: "Leaderboard" },
  { href: "/quests", iconSrc: "/quests.svg", label: "Quests" },
  { href: "/shop", iconSrc: "/shop.svg", label: "Shop" },
] as const;

export const MobileBottomNav = () => {
  const pathname = usePathname();

  return (
    <nav className="fixed bottom-0 z-50 flex h-[64px] w-full items-center border-t bg-white lg:hidden">
      {NAV_ITEMS.map(({ href, iconSrc, label }) => {
        const isActive = pathname === href;
        return (
          <Link
            key={href}
            href={href}
            className={cn(
              "flex flex-1 flex-col items-center justify-center gap-0.5 py-2 transition-opacity",
              isActive ? "opacity-100" : "opacity-40"
            )}
          >
            <div
              className={cn(
                "flex h-8 w-8 items-center justify-center rounded-full",
                isActive && "bg-brand-50"
              )}
            >
              <Image src={iconSrc} alt={label} height={24} width={24} />
            </div>
          </Link>
        );
      })}
    </nav>
  );
};
