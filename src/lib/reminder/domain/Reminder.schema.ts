import z from "zod";

export const ReminderSchema = z.object({
  id: z.uuidv4(),
  applicationId: z.uuidv4(),
  date: z.preprocess((value) => {
    if (typeof value === "string") {
      return new Date(value);
    }
    return value;
  }, z.date()),
});
