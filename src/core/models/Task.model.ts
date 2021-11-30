import { DateTime } from "luxon"
import { Priority } from "./Priority.model"

export interface TaskModel {
  name: string
  dueDate?: number
  priority: number
  completedBy?: string //hero id
}

export class TaskEntity {
  name: string
  dueDate?: DateTime
  priority: Priority
  completedBy?: string // hero id

  toModel(): object {
    const model: { [key: string]: any } = {
      name: this.name,
      dueDate: this.dueDate?.toMillis(),
      priority: this.priority,
      completedBy: this.completedBy,
    }
    Object.entries(model).forEach(([key, value]) =>
      value === undefined ? delete model[key] : {}
    )
    return model
  }

  constructor(model: TaskModel) {
    this.name = model.name
    this.dueDate = model.dueDate
      ? DateTime.fromMillis(model.dueDate)
      : undefined
    this.priority = model.priority as Priority
    this.completedBy = model.completedBy
  }

  get isFailed() {
    if (!this.dueDate) {
      return false
    }

    return this.dueDate < DateTime.now()
  }

  get isActive() {
    if (this.completedBy) {
      return false
    }
    if (this.isFailed) {
      return false
    }
    return true
  }
}
