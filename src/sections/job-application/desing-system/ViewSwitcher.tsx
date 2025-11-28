import { useAtomValue, useSetAtom } from "jotai";
import { viewJobsAtom } from "../../../shared/jotai/view-jobs.atom";
import { ViewsTypeEnum } from "../config/applicationViewConfig";
import { Button } from "../../../shared/ui/button/Button";

export function ViewSwitcher() {
  const setViewType = useSetAtom(viewJobsAtom)
  const activeView = useAtomValue(viewJobsAtom)

  const handleViewChange = (view: ViewsTypeEnum) => () => {
    setViewType(view)
  }

  return (
    <nav className="rounded-md overflow-hidden bg-blue-50">
      <ul className="flex items-center divide-white divide-x-2">
        {Object.values(ViewsTypeEnum).map((view) => (
          <li key={`view-${view}`}>
            <Button onClick={handleViewChange(view)} text={view === ViewsTypeEnum.KANBAN ? 'Tablero' : 'Tabla'} variant="default" />
          </li>
        ))}
      </ul>
    </nav>
  );
}
