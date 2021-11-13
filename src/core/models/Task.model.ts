import { DateTime } from "luxon"
import { Priority } from "./Priority.model"

export interface TaskModel {
  name: string
  dueDate?: number
  priority: number
  complete: boolean
}

export class TaskEntity {
  name: string
  dueDate?: DateTime
  priority: Priority
  complete: boolean

  constructor(model: TaskModel) {
    this.name = model.name
    this.dueDate = model.dueDate
      ? DateTime.fromMillis(model.dueDate)
      : undefined
    this.priority = model.priority as Priority
    this.complete = model.complete
  }
}
