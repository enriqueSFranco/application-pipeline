import { useEffect, useRef, useState } from "react";
// import styles from "./dropdown.module.css"

interface DropdownProps {
  trigger: React.ReactNode;
  children: React.ReactNode;
}

export function Dropwdown({ trigger, children }: DropdownProps) {
  const [open, setOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      )
        setOpen(false);
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div role="menu" className="relative inline-block">
      <div
        onClick={(event) => {
          event.stopPropagation();
          setOpen((prevState) => !prevState);
        }}
        className="cursor-pointer"
      >
        {trigger}
      </div>
      {open && (
        <div
          ref={dropdownRef}
          className={`absolute right-0 mt-2 w-40 bg-white border rounded shadow-md z-50 origin-top-right scale-95 opacity-0 ${open ? "scale-100 opacity-100" : "scale-95 opacity-0 pointer-events-none"}}`}
        >
          <ul className="flex flex-col justify-center items-start gap-2">
            {children}
          </ul>
        </div>
      )}
    </div>
  );
}
