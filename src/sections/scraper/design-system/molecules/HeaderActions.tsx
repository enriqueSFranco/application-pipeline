import { Button } from "../../../../shared/ui/button/Button";
import { AddIcon, FilterIcon } from "../../../../shared/ui/Icon";

export function HeaderActions({ onNewJob }: { onNewJob: () => void }) {
  return (
    <nav>
      <ul className="flex items-center space-x-3">
        <li>
          <Button icon={<FilterIcon />} text="Filtros" />
        </li>
        <li>
          <Button icon={<AddIcon />} text="Agregar postulación" onClick={onNewJob} />
        </li>
      </ul>
    </nav>
  );
}
