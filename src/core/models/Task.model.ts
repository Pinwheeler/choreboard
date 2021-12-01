import { DateTime } from "luxon"
import { ChallengeRating } from "./ChallengeRating"
import { Priority } from "./Priority.model"

export interface TaskModel {
  name: string
  dueDate?: number
  priority: number
  challenge: number
  completedBy?: string //hero id
}

export class TaskEntity {
  name: string
  dueDate?: DateTime
  priority: Priority
  challenge: ChallengeRating
  completedBy?: string // hero id

  toModel(): object {
    const model: { [key: string]: any } = {
      name: this.name,
      dueDate: this.dueDate?.toMillis(),
      priority: this.priority,
      challenge: this.challenge,
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
    this.challenge = model.challenge as ChallengeRating
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

  private get challengeCoinValue() {
    switch (this.challenge) {
      case ChallengeRating.Minor:
        return 1
      case ChallengeRating.Easy:
        return 2
      case ChallengeRating.Normal:
        return 3
      case ChallengeRating.Hard:
        return 5
      case ChallengeRating.Involved:
        return 7
      default:
        return 1
    }
  }

  get coinValue() {
    let val = this.challengeCoinValue
    switch (this.priority) {
      case Priority.low:
        val = val * 0.5
        break
      case Priority.high:
        val = val * 2
        break
    }

    return Math.ceil(val)
  }
}
