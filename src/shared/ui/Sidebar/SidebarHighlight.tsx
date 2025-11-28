interface SidebarHighlightProps {
  rect?: { top?: number; height?: number; left?: number; width?: number };
}

export function SidebarHighlight({ rect }: SidebarHighlightProps) {
  if (!rect) return null;

  const top = rect.top ?? 0;
  const height = rect.height ?? 0;
  const left = rect.left ?? 0;
  const width = rect.width ?? 0;
  return (
    <div
      aria-hidden="true"
      className="absolute bg-gray-300 dark:bg-gray-700 rounded-md transition-all duration-200 ease-out"
      style={{
        transform: `translateY(${top}px)`,
        height,
        left,
        width,
      }}
    />
  );
}
