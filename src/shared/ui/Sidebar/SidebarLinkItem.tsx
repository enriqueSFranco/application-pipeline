import { Link } from "@tanstack/react-router";
import { cn } from "../../utils";

interface Props {
  label: string;
  href: string;
  icon?: React.ReactNode;
  active: boolean;
  register: (el: HTMLElement | null, key: string) => void;
}

export function SidebarLinkItem({ href, label, icon, active, register }: Props) {
  return (
    <li>
      <Link
        to={href}
        data-active={active ? "true" : "false"}
        ref={(el) => register(el, href)}
        className={cn(
          "relative flex items-center px-3 py-2 rounded-md text-sm",
          "transition-colors focus-visible:outline-none focus-visible:ring-2",
          "hover:bg-gray-200 dark:hover:bg-gray-800",
          active ? "text-black dark:text-white font-medium" : "text-gray-600 dark:text-gray-400"
        )}
      >
        {icon && <span className="mr-2">{icon}</span>}
        {label}
      </Link>
    </li>
  );
}
