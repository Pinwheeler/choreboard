import { DateTime } from "luxon"
import { v4 as uuidv4 } from "uuid"
import { UpcertTask, UpcertTaskDTO } from "./Task.form"

export interface UpcertQuest {
  id?: string
  name: string
  guild: string
  createdAt: DateTime
  dueDate?: DateTime
  recurring: RecurrenceCadence
  repeatWeekly: number
  repeatOnWeekday: Weekday[]
  ownerId: string
  tasks: UpcertTask[]
  synthetic: boolean
}

export type RecurrenceCadence = "none" | "weekly" | "onWeekday"

export enum Weekday {
  Monday = 1,
  Tuesday = 2,
  Wednesday = 3,
  Thursday = 4,
  Friday = 5,
  Saturday = 6,
  Sunday = 7,
}

export const UpcertQuestDTO = (model: UpcertQuest) => {
  let refinedTasks = [...model.tasks]
  refinedTasks.pop()
  return {
    id: model.id ?? uuidv4(),
    name: model.name,
    guild: model.guild,
    createdAt: model.createdAt.toMillis(),
    dueDate: model.dueDate?.toMillis() ?? null,
    recurring: model.recurring,
    repeatWeekly: model.repeatWeekly,
    repeatOnWeekday: model.repeatOnWeekday,
    ownerId: model.ownerId,
    tasks: refinedTasks.map((task) => UpcertTaskDTO(task)),
  }
}
