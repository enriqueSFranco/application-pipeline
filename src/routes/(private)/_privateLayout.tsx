import { createFileRoute, Outlet } from "@tanstack/react-router";
import { Sidebar } from "../../shared/ui/Sidebar/Sidebar";

export const mainMenuOptions = [
  {
    id: "dashboard",
    text: "Dashboard",
    href: "/dashboard",
    icon: null,
  },
  {
    id: "applications",
    text: "Applications",
    href: "/applications",
    icon: null,
  },
  {
    id: "applications-create",
    text: "New Application",
    href: "/applications/create",
    icon: null,
  },
  {
    id: "applications-archived",
    text: "Archived",
    href: "/applications/archived",
    icon: null,
  },
  {
    id: "settings",
    text: "Settings",
    href: "/settings",
    icon: null,
  },
];

export const Route = createFileRoute("/(private)/_privateLayout")({
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <div className="grid min-h-screen w-full grid-rows[auto_1fr] sm:grid-cols-[220px_1fr] sm:grid-rows-none lg:grid-cols-[260px_1fr]">
      <Sidebar menuOptions={mainMenuOptions} />
      <div className="p-4 bg-zinc-50">
        <Outlet />
      </div>
    </div>
  );
}
