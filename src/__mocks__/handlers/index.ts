import { jobHandlers } from "./jobs.handler";
import { applicationHandlers } from "./applications.handlers";

export const handlers = [
  ...jobHandlers,
  ...applicationHandlers
]
