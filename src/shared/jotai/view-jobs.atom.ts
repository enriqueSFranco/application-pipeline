import { atom } from "jotai";
import { ViewsTypeEnum } from "../../sections/job-application/config/applicationViewConfig";

export const viewJobsAtom = atom<ViewsTypeEnum>(ViewsTypeEnum.KANBAN)
