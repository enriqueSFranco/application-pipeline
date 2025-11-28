import { DndContext, DragEndEvent, closestCenter } from "@dnd-kit/core";
// import { arrayMove } from "@dnd-kit/sortable";
// import { moveJob } from "../../store/job.actions";
import { cn } from "../../../../../shared/utils";
import { BOARD_COLUMNS } from "./types";
import type { JobApplication } from "../../../../../lib/job-application/domain/JobApplication.schema";
import type { Status } from "../../../../../lib/job-application/domain/JobApplicationStatus";
import { JobApplicationsColumn } from "./JobApplicationColumn";
import { Button } from "../../../../../shared/ui/button/Button";

interface JobApplicationsBoardProps {
  applications: JobApplication[];
  onMove?: (params: {
    applicationId: string;
    fromStatus: string;
    toStatus: string;
  }) => void;
}

function groupByColumns(applications: JobApplication[]) {
  if (!applications || applications.length === 0) return new Map();

  const map = new Map<Status, JobApplication[]>();
  for (const app of applications) {
    const bucket = map.get(app.status);
    if (bucket) {
      bucket.push(app);
    } else {
      map.set(app.status, [app]);
    }
  }
  return map;
}

export function JobApplicationsBoard({
  applications,
  onMove,
}: JobApplicationsBoardProps) {
  const grouped = groupByColumns(applications);
  const hasData = applications.length > 0;

  return (
    <div className={cn("", hasData && "flex justify-between w-full overflow-y-auto")}>
      {hasData ? (
        <DndContext
          // onDragEnd={handleDragEnd}
          collisionDetection={closestCenter}
        >

          {BOARD_COLUMNS.map((col) => {
            const appsForColumn = col.status.flatMap(
              (s) => grouped.get(s) ?? []
            );
            return (
              <JobApplicationsColumn
                key={`col-${col.id}`}
                id={col.id}
                title={col.title}
                applications={appsForColumn}
              />
            );
          })}
        </DndContext>
      ) : (
        <div className="text-center grid place-content-center col-span-3 py-20">
          <span className="text-6xl mb-6">✨</span>
          <h2 className="text-2xl font-semibold text-gray-800 mb-2">
            No tienes postulaciones todavía
          </h2>
          <p className="text-gray-500 mb-6">
            Agrega tus primeras oportunidades y verás cómo florece tu tablero.
          </p>
          <Button>Agregar postulación</Button>
        </div>
      )}
    </div>
  );
}
