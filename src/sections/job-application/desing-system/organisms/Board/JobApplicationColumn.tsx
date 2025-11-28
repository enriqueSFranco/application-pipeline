// import { useDroppable } from "@dnd-kit/core";
// import {
//   SortableContext,
//   verticalListSortingStrategy,
// } from "@dnd-kit/sortable";
// import { applicationsCount } from "../../../../../lib/jobApplication/infraestructure/state/application.selectors";
// import { useAtomValue } from "jotai";
import { ApplicationList } from "../../ApplicationList";
import { JobApplication } from "../../../../../lib/job-application/domain/JobApplication.schema";
import { useMemo } from "react";
import { cn } from "../../../../../shared/utils";

interface JobApplicationColumProps {
  id: string;
  title: string;
  applications: JobApplication[];
  /**
   * Optional props to integrate with external DnD libs.
   * - droppableProps: props to be applied on the list container (e.g. ref, data attributes)
   * - getDraggableProps: function(job) => props for the draggable item
   */
  droppableProps?: React.HTMLAttributes<HTMLElement> & { ref?: React.Ref<any> };
  getDraggableProps?: (
    job: JobApplication
  ) => React.HTMLAttributes<HTMLElement> & { ref?: React.Ref<any> };
  className?: string;
  emptyMessage?: string;
}

export function JobApplicationsColumn({
  id,
  title,
  applications,
  droppableProps,
  getDraggableProps,
  className,
  emptyMessage = "No hay aplicaciones en esta columna",
}: JobApplicationColumProps) {
  const items = useMemo(() => applications ?? [], [applications]);

  return (
    <article
      data-testid={`column-${id}`}
      className={cn(
        "flex flex-col h-full bg-gray-50 rounded-md p-2",
        "flex-shrink-0 min-w-[280px] max-w-[280px]",
        className
      )}
      role="region"
      aria-labelledby={`column-status-${status}`}
    >
      <header className="flex items-center justify-between gap-1.5 p-2 rounded-lg w-full">
        <h2
          id={`column-title-${title}`}
          className="text-xs font-semibold text-zinc-500 uppercase tracking-wide"
        >
          {title}
        </h2>
        <span
          className="text-xs font-semibold text-gray-500 grid place-content-center"
          aria-label={`${status}-${items.length}`}
        >
          {items.length > 1 ? `${items.length} postulaciones` : ""}
        </span>
      </header>
      <ApplicationList jobApplications={items} />
    </article>
  );
}
