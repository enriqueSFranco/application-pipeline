// import { FileUserIcon, HandshakeIcon, MessagesSquareIcon, ThumbsDownIcon } from "../../../shared/ui/Icon";

import { JobApplicationStatusEnum } from "../../../lib/jobApplication/domain/JobApplication.schema";

export enum ViewsTypeEnum {
  KANBAN = "kanban",
  TABLE = "table",
}

type BoardGroup = "Todo" | "InProgress" | "Done";

export const STATUS_TO_GROUP: Record<"Todo" | "InProgress" | "Done", JobApplicationStatusEnum[]> = {
  "Todo": [JobApplicationStatusEnum.Draft, JobApplicationStatusEnum.Applied, JobApplicationStatusEnum.UnderReview],
  "InProgress": [JobApplicationStatusEnum.InterviewScheduled, JobApplicationStatusEnum.Interviewing, JobApplicationStatusEnum.Assessment, JobApplicationStatusEnum.Offer, JobApplicationStatusEnum.Accepted],
  "Done": [JobApplicationStatusEnum.Hired, JobApplicationStatusEnum.Rejected, JobApplicationStatusEnum.Withdrawn, JobApplicationStatusEnum.Archived],
};


export const kanbanBoardColumns: {group: BoardGroup, stages: { id: JobApplicationStatusEnum; title: string }[]}[] = [
  {
    group: "Todo",
    stages: [
      { id: JobApplicationStatusEnum.Applied, title: "Currículum enviado" },
    ],
  },
  {
    group: "InProgress",
    stages: [
      { id: JobApplicationStatusEnum.UnderReview, title: "En revisión" },
      { id: JobApplicationStatusEnum.InterviewScheduled, title: "Entrevista programada" },
      { id: JobApplicationStatusEnum.Interviewing, title: "Entrevista técnica" },
      { id: JobApplicationStatusEnum.Assessment, title: "Prueba técnica" },
      { id: JobApplicationStatusEnum.Offer, title: "Oferta laboral" },
    ],
  },
  {
    group: "Done",
    stages: [
      { id: JobApplicationStatusEnum.Hired, title: "Contratado" },
      { id: JobApplicationStatusEnum.Rejected, title: "Rechazado" },
      { id: JobApplicationStatusEnum.Withdrawn, title: "Retirado" },
      { id: JobApplicationStatusEnum.Archived, title: "Archivado" },
    ],
  },
];


export type KanbanColumn = {
  id: JobApplicationStatusEnum
  title: string
  icon?: React.ComponentType
}

export const applicationTableColumns: TableColumn[] = [
  { key: "puesto", header: "Puesto" },
  { key: "empresa", header: "Empresa" },
  { key: "fecha", header: "Fecha de postulación" },
  { key: "estatus", header: "Estatus" },
  { key: "acciones", header: "Acciones" },
];

export type TableColumn = {
  key: string;
  header: string;
};
