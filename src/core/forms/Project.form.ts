import { DateTime } from "luxon"
import { UpcertTask } from "./Task.form"

export interface UpcertProject {
  name: string
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
