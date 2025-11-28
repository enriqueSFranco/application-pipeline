interface DropdownItemProps {
  children: React.ReactNode
  action: () => void;
}

export function DropdownItem({children, action = () => {}}: DropdownItemProps) {
  return (
    <div className={`px-3 py-2 text-sm hover:bg-gray-100 cursor-pointer`} onClick={(event) => {event.stopPropagation(); action()}}>{children}</div>
  )
}
