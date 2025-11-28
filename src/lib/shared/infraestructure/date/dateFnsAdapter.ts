import { format, parse } from "date-fns";
import { DateProvider } from "../domain/dateProvider";

export const dateFnsAdapter: DateProvider = ({
  formatDate(date: Date, fmt: string) {
    return format(date, fmt);
  },
  parseDate(dateString, fmt: string) {
    return parse(dateString, fmt, new Date())
  }
})
