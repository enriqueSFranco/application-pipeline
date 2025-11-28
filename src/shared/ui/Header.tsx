import { PropsWithChildren } from "react";

export function HeaderRoot({ children }: PropsWithChildren) {
  return (
    <header className="w-full flex items-center p-4">
      <nav className="flex items-center justify-between w-full h-full gap-4">
        {children}
      </nav>
    </header>
  );
}

function Left({ children }: PropsWithChildren) {
  return (
    <div className="flex h-full items-center space-x-4">{children}</div>
  );
}

function Right({ children }: PropsWithChildren) {
  return (
    <div className="flex h-full items-center space-x-4">{children}</div>
  );
}

export const Header = Object.assign(HeaderRoot, {
  Left,
  Right,
});

