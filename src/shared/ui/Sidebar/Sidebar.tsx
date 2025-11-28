import { useDeviceType } from "../../hooks/use-device-type";
import { SidebarDrawer } from "./SidebarDrawer";
import { SidebarFixed } from "./SidebarFixed";
import { MenuOptionType } from "./types";

interface SidebarProps {
  title?: string;
  menuOptions?: MenuOptionType[]
}

export function Sidebar({ title = "" , menuOptions = [] }: SidebarProps) {
  const deviceType = useDeviceType();

  const isMobile = deviceType === "mobile";

  if (isMobile) {
    return <SidebarDrawer title={title} menuOptions={menuOptions} />;
  }
  return <SidebarFixed title={title} menuOptions={menuOptions} />;
}
