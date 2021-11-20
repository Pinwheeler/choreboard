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
  repeatOnWeekday?: Weekday[]
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

  toModel(): object {
    const model: { [key: string]: any } = {
      id: this.id,
      name: this.name,
      guild: this.guild,
      dueDate: this.dueDate?.toMillis(),
      recurring: this.recurring,
      repeatWeekly: this.repeatWeekly,
      repeatOnWeekday: this.repeatOnWeekday,
      ownerId: this.ownerId,
      tasks: this.tasks.map((e) => e.toModel()),
    }
    Object.entries(model).forEach(([key, value]) =>
      value === undefined ? delete model[key] : {}
    )
    return model
  }

  constructor(model: QuestModel) {
    this.id = model.id
    this.name = model.name
    this.guild = model.guild
    this.dueDate = model.dueDate
      ? DateTime.fromMillis(model.dueDate)
      : undefined
    this.recurring = model.recurring as RecurrenceCadence
    this.repeatWeekly = model.repeatWeekly
    this.repeatOnWeekday = model.repeatOnWeekday ?? []
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

  get isActive() {
    if (this.isComplete) {
      return false
    }
    return true
  }

  get sortedTasks(): {
    activeTasks: TaskEntity[]
    completedTasks: TaskEntity[]
    failedTasks: TaskEntity[]
  } {
    let activeTasks: TaskEntity[] = []
    let completedTasks: TaskEntity[] = []
    let failedTasks: TaskEntity[] = []
    this.tasks.forEach((t) => {
      if (t.isActive) {
        activeTasks.push(t)
      }
      if (t.complete) {
        completedTasks.push(t)
      }
      if (t.isFailed) {
        failedTasks.push(t)
      }
    })

    return {
      activeTasks,
      completedTasks,
      failedTasks,
    }
  }
}
