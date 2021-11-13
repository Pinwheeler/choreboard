import { DateTime } from "luxon"
import { Priority } from "../models/Priority.model"

export interface UpcertTask {
  name: string
  dueDate?: DateTime
  priority: Priority
}

export const emptyUpcertTask = (): UpcertTask => ({
  name: "",
  priority: Priority.normal,
})

export const UpcertTaskDTO = (model: UpcertTask) => {
  return {
    name: model.name,
    dueDate: model.dueDate?.toMillis() ?? null,
    priority: model.priority,
    complete: false,
  }
}
