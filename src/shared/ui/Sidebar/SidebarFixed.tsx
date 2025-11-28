import { SidebarNavigation } from "./SidebarNavigation";
import { MenuOptionType } from "./types";
// versión desktop/tablet

interface SidebarFixedProps {
  title?: string
  menuOptions?: MenuOptionType[]
}

export function SidebarFixed({title="", menuOptions}: SidebarFixedProps) {
  return (
    <aside className="hidden sm:block h-screen sticky top-0 bg-white border-r border-gray-200 p-4 w-56 lg:w-64">
      <SidebarNavigation title={title} menuOptions={menuOptions} />
    </aside>
  )
}
