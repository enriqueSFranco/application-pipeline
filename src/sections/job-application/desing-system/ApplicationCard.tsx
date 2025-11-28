import { useDraggable } from "@dnd-kit/core";
import { CSS } from "@dnd-kit/utilities";
import { Application } from "../../../lib/jobApplication/domain/JobApplication.schema";
import { cn } from "../../../shared/utils";
import { ChevronDownIcon, GripIcon } from "../../../shared/ui/Icon";
import { Chip } from "../../../shared/ui/Chip";
import { Button } from "../../../shared/ui/button/Button";
import { Dropwdown } from "../../../shared/ui/dropdown/Dropwdown";
import { DropdownItem } from "../../../shared/ui/dropdown/DropdownItem";

interface Props {
  application: Application;
  onDelete: (jobId: string) => void;
  onViewApplicationDetail: (jobId: string) => void;
}

export function ApplicationCard({
  application,
  onDelete,
  onViewApplicationDetail,
}: Props) {
  // const setSelectedJob = useSetAtom(selectedJobAtom)
  const { attributes, listeners, setNodeRef, transform, isDragging } =
    useDraggable({
      id: application.id,
    });
  const style = transform
    ? {
        transform: CSS.Translate.toString(transform),
        zIndex: isDragging ? 99 : undefined,
      }
    : undefined;

  function handleOpenModalViewApplicationDetail() {
    onViewApplicationDetail(application.id);
    // setSelectedJob(application)
  }

  return (
    <article
      ref={setNodeRef}
      style={style}
      data-testid={`application-card-${application.id}`}
      role="listitem"
      aria-labelledby={`card-title-${application.job.title}`}
      className={cn(
        "flex flex-col gap-2 rounded-lg border p-2 transition-colors duration-150 ease-in-out",
        isDragging
          ? "opacity-80 border-2 border-blue-500 bg-blue-100"
          : "bg-white border-gray-200"
      )}
    >
      <header className="flex items-center justify-between gap-2">
        <span
          {...attributes}
          {...listeners}
          className="cursor-grab text-gray-400 hover:text-gray-600 active:cursor-grabbing self-end block"
          onClick={(e) => e.stopPropagation()} // evitar que abra modal al hacer click en el handle
        >
          <GripIcon />
        </span>
        <div className="relative">
          <Dropwdown
            trigger={
              <Chip label={application.status} icon={<ChevronDownIcon />} />
            }
          >
            <DropdownItem action={() => console.log("item 1")}>
              <button>item 1</button>
            </DropdownItem>
            <DropdownItem action={() => console.log("item 2")}>
              <button>item 3</button>
            </DropdownItem>
            <DropdownItem action={() => console.log("item 3")}>
              <button>item 2</button>
            </DropdownItem>
          </Dropwdown>
        </div>
      </header>
      <section className="flex flex-col">
        <h2 className="font-bold text-sm text-gray-600 truncate text-ellipsis self-start">
          {application.job.company}
        </h2>
        <p className="text-gray-500">{application.job.title}</p>
        <div className="mt-1.5 text-sm">
          {application.notes.map((note) => (
            <div key={note.id}>{note.content}</div>
          ))}
        </div>
      </section>

      <footer className="border-t border-gray-100 pt-3 mt-1 flex items-center justify-between">
        <time
          dateTime={application.appliedAt.toString()}
          className="text-xs text-gray-500"
        >
          {new Date(application.appliedAt).toLocaleDateString()}
        </time>
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
