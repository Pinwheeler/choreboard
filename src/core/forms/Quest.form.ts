import { DateTime } from "luxon"
import { v4 as uuidv4 } from "uuid"
import { UpcertTask, UpcertTaskDTO } from "./Task.form"

export interface UpcertQuest {
  name: string
  guild: string
  dueDate?: DateTime
  recurring: RecurrenceCadence
  repeatWeekly: number
  repeatOnWeekday: Weekday[]
  ownerId: string
  tasks: UpcertTask[]
}

export enum RecurrenceCadence {
  none = "none",
  weekly = "weekly",
  onWeekday = "onWeekday",
}

export type Weekday =
  | "monday"
  | "tuesday"
  | "wednesday"
  | "thursday"
  | "friday"
  | "saturday"
  | "sunday"

export const UpcertQuestDTO = (model: UpcertQuest) => {
  let refinedTasks = [...model.tasks]
  refinedTasks.pop()
  return {
    id: uuidv4(),
    name: model.name,
    guild: model.guild,
    dueDate: model.dueDate?.toMillis() ?? null,
    recurring: model.recurring,
    repeatWeekly: model.repeatWeekly,
    repeatOnWeekday: model.repeatOnWeekday,
    ownerId: model.ownerId,
    tasks: refinedTasks.map((task) => UpcertTaskDTO(task)),
  }
}
