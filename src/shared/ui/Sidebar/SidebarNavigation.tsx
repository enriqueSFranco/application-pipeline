import { useCallback, useRef } from "react";
import { SidebarHighlight } from "./SidebarHighlight";
import { SidebarLinkItem } from "./SidebarLinkItem";
import { useMatches } from "@tanstack/react-router";
import { useActiveItem } from "./use-active-item";
import { MenuOptionType } from "./types";

interface AsideMenuProps {
  title: string;
  menuOptions?: MenuOptionType[];
}
// contenido del menú
export function SidebarNavigation({ title, menuOptions }: AsideMenuProps) {
  const containerRef = useRef<HTMLUListElement>(null);
  const matches = useMatches();
  const currentPath = matches[matches.length - 1].pathname;
  const getActiveKey = useCallback(() => currentPath, [currentPath]);

  const { register, activeItemRect } = useActiveItem<HTMLUListElement>({
    containerRef,
    getActiveKey,
    observeResize: true,
    animationFrame: true,
  });

  if (!menuOptions || menuOptions.length === 0) {
    return (
      <div className="col-span-2 bg-white p-4 h-full flex items-center justify-center">
        <p className="text-gray-500 italic">
          No hay opciones de menú disponibles.
        </p>
      </div>
    );
  }

  return (
    <nav className="relative w-full" aria-label="Main Navigation">
      {title && (
        <h2 className="text-lg font-semibold mb-4 text-gray-800">{title}</h2>
      )}
      <SidebarHighlight rect={activeItemRect} />
      <ul
        className="flex flex-col gap-2 relative z-10 space-y-2"
        ref={containerRef}
      >
        {menuOptions.map((opt) => {
          return (
            <SidebarLinkItem
              key={opt.href}
              href={opt.href}
              label={opt.text}
              icon={opt.icon}
              register={register}
              active={currentPath === opt.href}
            />
          );
        })}
      </ul>
    </nav>
  );
}
