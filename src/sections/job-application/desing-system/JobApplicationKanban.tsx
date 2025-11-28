import { DndContext, DragEndEvent, closestCenter } from "@dnd-kit/core";
// import { arrayMove } from "@dnd-kit/sortable";
import { cn } from "../../../shared/utils";
import { kanbanBoardColumns } from "../config/applicationViewConfig";
import { JobApplicationColum } from "./atoms/JobApplicationColumn";
// import { moveJob } from "../../store/job.actions";
import { JobApplication } from "../../../lib/jobApplication/domain/JobApplication.schema";
import { Button } from "../../../shared/ui/button/Button";

interface JobApplicationBoardProps {
  groupedByGroup: Record<"Todo" | "InProgress" | "Done", JobApplication[]>;
}

export function JobApplicationKanban({
  groupedByGroup,
}: JobApplicationBoardProps) {
  const columnEntries = Object.entries(groupedByGroup);
  const hasData =
    columnEntries.length > 0 &&
    columnEntries.some(([, arr]) => Array.isArray(arr) && arr.length > 0);

  const safeColumn = (group: "Todo" | "InProgress" | "Done") =>
    groupedByGroup[group] ?? [];
  return (
    <div
      className={cn(
        "grid gap-3 h-full",
        hasData && "sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-3"
      )}
    >
      {hasData ? (
        <DndContext
          // onDragEnd={handleDragEnd}
          collisionDetection={closestCenter}
        >
          {kanbanBoardColumns.map((col) => {
            return (
            <section key={`col-${col.group}`} className="flex flex-col bg-zinc-100 border border-zinc-200 rounded-xl p-3">
                <JobApplicationColum
                  column={col}
                  jobApplications={safeColumn(col.group)}
                />

            </section>
            )
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
