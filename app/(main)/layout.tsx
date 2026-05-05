import type { PropsWithChildren } from "react";

import { MobileBottomNav } from "@/components/mobile-bottom-nav";
import { MobileTopBar } from "@/components/mobile-top-bar";
import { Sidebar } from "@/components/sidebar";

const MainLayout = ({ children }: PropsWithChildren) => {
  return (
    <>
      <MobileTopBar />
      <MobileBottomNav />
      <Sidebar className="hidden lg:flex" />
      <main className="h-full pt-[56px] pb-[80px] lg:pb-0 lg:pl-[256px] lg:pt-0">
        <div className="mx-auto h-full max-w-[1056px] pt-6">{children}</div>
      </main>
    </>
  );
};

export default MainLayout;
