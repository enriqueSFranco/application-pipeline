// import { useDraggable } from "@dnd-kit/core";
// import { CSS } from "@dnd-kit/utilities";
import { cn } from "../../../shared/utils";
import { JobApplication } from "../../../lib/job-application/domain/JobApplication.schema";
// import { ChevronDownIcon, GripIcon } from "../../../shared/ui/Icon";
import { Chip } from "../../../shared/ui/Chip";
import { Button } from "../../../shared/ui/button/Button";
// import { Dropwdown } from "../../../shared/ui/dropdown/Dropwdown";
// import { DropdownItem } from "../../../shared/ui/dropdown/DropdownItem";

interface Props {
  application: JobApplication;
  onDelete?: (jobId: string) => void;
  onViewApplicationDetail?: (jobId: string) => void;
}

export function JobApplicationCard({
  application,
  onDelete,
  onViewApplicationDetail,
}: Props) {
  // const setSelectedJob = useSetAtom(selectedJobAtom)
  // const { attributes, listeners, setNodeRef, transform, isDragging } =
  //   useDraggable({
  //     id: application.id,
  //   });
  // const style = transform
  //   ? {
  //       transform: CSS.Translate.toString(transform),
  //       zIndex: isDragging ? 99 : undefined,
  //     }
  //   : undefined;

  function handleOpenModalViewApplicationDetail() {
    if (!onViewApplicationDetail) return;
    onViewApplicationDetail(application.id);
    // setSelectedJob(application)
  }
  const {
    id,
    company,
    position,
    status,
    notes,
    metrics,
    appliedAt,
    createdAt,
    updatedAt,
  } = application;
  return (
    <article
      // ref={setNodeRef}
      // style={style}
      data-testid={`job-application-card-${id}`}
      role="listitem"
      aria-labelledby={`card-title-${position}`}
      className={cn(
        "flex flex-col gap-5 rounded-2xl border-[1.5px] border-gray-200 p-3 transition-colors duration-150 ease-in-out"
        // isDragging
        //   ? "opacity-80 border-2 border-blue-500 bg-blue-100"
        //   : "bg-white border-gray-200"
      )}
    >
      <header className="flex items-center justify-between gap-2">
        {/* <span
          {...attributes}
          {...listeners}
          className="cursor-grab text-gray-400 hover:text-gray-600 active:cursor-grabbing self-end block"
          onClick={(e) => e.stopPropagation()} // evitar que abra modal al hacer click en el handle
        >
          <GripIcon />
        </span> */}
        <div className="relative h-4 flex items-center space-x-1.5">
          {/* status | position (resultado de la clasificación) */}
          <Chip label={status} status="success" />
          <div className="bg-gray-200 h-full w-0.5 rounded-lg" />
          <span className="text-xs">{position}</span>
        </div>
      </header>
      <div className="flex flex-col text-sm">
        <h2 className="font-semibold text-gray-600 truncate text-ellipsis self-start">
          <span>{position}</span> en {company}
        </h2>
        <div className="mt-2 flex items-center gap-2">
          <span>ubicacion</span>
          <time
            dateTime={application.appliedAt.toString()}
            className="text-xs text-gray-500"
          >
            {new Date(application.appliedAt).toLocaleDateString()}
          </time>
        </div>
      </div>

      <footer className="flex items-center justify-end">
        <Button
          text="Ver detalles"
          variant="ghost"
          color="primary"
          onClick={handleOpenModalViewApplicationDetail}
        />
      </footer>
    </article>
  );
}
