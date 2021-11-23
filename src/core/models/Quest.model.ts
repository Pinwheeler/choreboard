import { DateTime } from "luxon"
import { v4 as uuidv4 } from "uuid"
import { RecurrenceCadence, Weekday } from "../forms/Quest.form"
import { TaskEntity, TaskModel } from "./Task.model"

export interface QuestModel {
  id: string
  name: string
  guild: string
  createdAt: number //timestamp
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
  createdAt: DateTime
  dueDate?: DateTime
  recurring: RecurrenceCadence
  repeatWeekly: number
  repeatOnWeekday: Weekday[]
  ownerId: string
  tasks: TaskEntity[]
  /** defined if this is a concrete instance of a recurring quest. If this is defined, then any updates/deletions should
   * use the parent entity instead, however completion has to track a server-instantiated version. Solution: create a synthetic,
   * non-recurring quest with due dates at 11:59 PM of the date on which the event is recurring
   */
  syntheticTo?: QuestEntity

  createSynthetic(): QuestEntity {
    const model = this.toModel() as QuestModel
    model.createdAt = DateTime.now().toMillis()
    model.id = uuidv4()
    return new QuestEntity(model, this)
  }

  toModel(): object {
    const model: { [key: string]: any } = {
      id: this.id,
      name: this.name,
      guild: this.guild,
      createdAt: this.createdAt.toMillis(),
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

  constructor(model: QuestModel, syntheticTo?: QuestEntity) {
    this.id = model.id
    this.name = model.name
    this.guild = model.guild
    this.dueDate = model.dueDate
      ? DateTime.fromMillis(model.dueDate)
      : undefined
    this.createdAt = DateTime.fromMillis(model.createdAt)
    this.recurring = model.recurring as RecurrenceCadence
    this.repeatWeekly = model.repeatWeekly
    this.repeatOnWeekday = model.repeatOnWeekday ?? []
    this.ownerId = model.ownerId
    this.tasks = model.tasks.map((m) => new TaskEntity(m))
    this.syntheticTo = syntheticTo
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

  recurringOnDate(date: DateTime): boolean {
    const startOfDay = date.startOf("day")

    switch (this.recurring) {
      case "weekly": {
        const difference = startOfDay.diff(this.createdAt.startOf("day"))
        const weeks = difference.as("weeks")
        if (weeks % this.repeatWeekly === 0) {
          return true
        }
        return false
      }
      case "onWeekday": {
        const dateWeekday = date.weekday
        let isCorrectWeekday = false
        this.repeatOnWeekday.forEach((weekday) => {
          if (weekday === dateWeekday) {
            isCorrectWeekday = true
          }
        })
        return isCorrectWeekday
      }
      default:
        return false
    }
  }

  firstRecurrenceOnOrAfter(date: DateTime): QuestEntity {
    let dueDate = date
    let runningTotal = 1
    const maxLookupDist = 365 // only look one year in advance
    while (!this.recurringOnDate(dueDate) && runningTotal <= maxLookupDist) {
      dueDate = date.plus({ days: runningTotal })
      runningTotal += 1
    }
    if (runningTotal > maxLookupDist) {
      throw new Error(
        `Failed to find recurrence within 1 year for Quest: ${this}`
      )
    }
    const synthetic = this.createSynthetic()
    synthetic.dueDate = dueDate
    return synthetic
  }
}
