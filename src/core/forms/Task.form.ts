import { DateTime } from "luxon"
import { ChallengeRating } from "../models/ChallengeRating"
import { Priority } from "../models/Priority.model"

export interface UpcertTask {
  name: string
  dueDate?: DateTime
  priority: Priority
  challenge: ChallengeRating
}

export const emptyUpcertTask = (): UpcertTask => ({
  name: "",
  priority: Priority.normal,
  challenge: ChallengeRating.Normal,
})

export const UpcertTaskDTO = (model: UpcertTask) => {
  return {
    name: model.name,
    dueDate: model.dueDate?.toMillis() ?? null,
    priority: model.priority,
    challenge: model.challenge,
  }
}
