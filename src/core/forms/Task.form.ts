import { DateTime } from "luxon";
import { Priority } from "../models/Priority";

export interface UpcertTask {
  name: string;
  dueDate?: DateTime;
  priority: Priority;
}

export const emptyUpcertTask = (): UpcertTask => ({
  name: "",
  priority: Priority.normal,
});
