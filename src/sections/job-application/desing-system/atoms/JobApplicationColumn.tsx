import { useDroppable } from "@dnd-kit/core";
import {
  SortableContext,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import { ApplicationList } from "../ApplicationList";
import { JobApplication } from "../../../../lib/jobApplication/domain/JobApplication.schema";
import { applicationsCount } from "../../../../lib/jobApplication/infraestructure/state/application.selectors";
import { useAtomValue } from "jotai";

type Column = {
  group: string;
};

interface Props {
  column: Column;
  jobApplications: JobApplication[];
}

export function JobApplicationColum({ column, jobApplications }: Props) {
  const { setNodeRef } = useDroppable({ id: column.group });
  const count = useAtomValue(applicationsCount);
  const applicationsId = jobApplications.map((apps) => apps.id);

  return (
    <div
      key={`col-${column.group}`}
      data-testid={column.group}
      className="flex flex-col gap-4 h-fit bg-gray-50 p-2 rounded-md"
      role="region"
      aria-labelledby={`column-title-${column.group}`}
    >
      <header className="flex items-center justify-between gap-1.5 p-2 rounded-lg w-full">
        <h2
          id={`column-title-${column.group}`}
          className="text-xs font-semibold text-zinc-500 uppercase tracking-wide"
        >
          {column.group}
        </h2>
        <span
          className="text-xs font-semibold text-gray-500 grid place-content-center"
          aria-label={`${column.group}-${count}`}
        >
          {jobApplications.length > 99
            ? `+${jobApplications.length}`
            : jobApplications.length}{" "}
          {jobApplications.length === 1 ? "postulación" : "postulaciones"}
        </span>
      </header>
      <div
        ref={setNodeRef}
        className="flex-grow overflow-y-auto w-full"
      >
        <SortableContext
          items={applicationsId}
          strategy={verticalListSortingStrategy}
        >
          <ApplicationList jobApplications={jobApplications} />
        </SortableContext>
      </div>
    </div>
  );
}
