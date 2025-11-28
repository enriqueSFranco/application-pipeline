import { useState } from "react";
import { MenuOptionType } from "./types";
import { SidebarNavigation } from "./SidebarNavigation";
import { cn } from "../../utils";
// versión mobile (drawer)

interface SidebarDrawerProps {
  title?: string;
  menuOptions: MenuOptionType[]
}

export function SidebarDrawer({ title = "", menuOptions }: SidebarDrawerProps) {
  const [open, setOpen] = useState(false);
  return (
    <>
      <button
        className="sm:hidden fixed top-4 left-4 z-30 bg-white border border-gray-200 rounded-md p-2 shadow-sm"
        onClick={() => setOpen(!open)}
      >
        <span className="text-xl">☰</span>
      </button>
      {open && (
        <div className="fixed inset-0 bg-black/40 sm:hidden z-20">
          {open && (
            <aside
              className={cn(
                "fixed z-30 top-0 left-0 h-full bg-white w-64 p-4 border-r border-gray-200 transition-transform sm:hidden",
                open ? "translate-x-0" : "-translate-x-full"
              )}
            >
              <SidebarNavigation title={title} menuOptions={menuOptions} />
            </aside>
          )}
        </div>
      )}
    </>
  );
}
