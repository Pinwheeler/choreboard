import { DateTime } from "luxon"
import { RecurrenceCadence, Weekday } from "../forms/Quest.form"
import { TaskEntity, TaskModel } from "./Task.model"

export interface QuestModel {
  id: string
  name: string
  guild: string
  dueDate?: number
  recurring: string
  repeatWeekly: number
  repeatOnWeekday: Weekday[]
  ownerId: string
  tasks: TaskModel[]
}

export class QuestEntity {
  id: string
  name: string
  guild: string
  dueDate?: DateTime
  recurring: RecurrenceCadence
  repeatWeekly: number
  repeatOnWeekday: Weekday[]
  ownerId: string
  tasks: TaskEntity[]

  constructor(model: QuestModel) {
    this.id = model.id
    this.name = model.name
    this.guild = model.guild
    this.dueDate = model.dueDate
      ? DateTime.fromMillis(model.dueDate)
      : undefined
    this.recurring = model.recurring as RecurrenceCadence
    this.repeatWeekly = model.repeatWeekly
    this.repeatOnWeekday = model.repeatOnWeekday
    this.ownerId = model.ownerId
    this.tasks = model.tasks.map((m) => new TaskEntity(m))
  }

  get isComplete() {
    let isComplete = true
    this.tasks.forEach((t) => {
      if (!t.complete) {
        isComplete = false
      }
    })

    return isComplete
  }

  get isFailed() {
    if (!this.dueDate) {
      return false
    }

    return this.dueDate < DateTime.now()
  }

  get isActive() {
    if (!this.dueDate) {
      return true
    }

    return this.dueDate > DateTime.now()
  }
}
