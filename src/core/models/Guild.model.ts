import { DateTime } from "luxon"
import { QuestEntity, QuestModel } from "./Quest.model"

export interface GuildModel {
  name: string
  quests?: { [key: string]: QuestModel }
  recurring_quests?: { [key: string]: QuestModel }
}

export class GuildEntity {
  name: string
  quests: { [key: string]: QuestEntity }
  recurringQuests: { [key: string]: QuestEntity }

  constructor(model: GuildModel) {
    this.name = model.name
    this.quests = {}
    this.recurringQuests = {}
    if (model.quests) {
      Object.entries(model.quests).forEach(([key, q]) => {
        this.quests[key] = new QuestEntity(q)
      })
    }
    if (model.recurring_quests) {
      Object.entries(model.recurring_quests).forEach(([key, q]) => {
        const entity = new QuestEntity(q)
        this.recurringQuests[key] = entity
        const synthetic = entity.firstRecurrenceOnOrAfter(DateTime.now())
        if (!this.quests[synthetic.id]) {
          this.quests[synthetic.id] = synthetic
        } else {
          const newDueDate = synthetic.dueDate
          const currentDueDate = this.quests[synthetic.id].dueDate
          if (newDueDate && currentDueDate && currentDueDate < newDueDate) {
            this.quests[synthetic.id] = synthetic
          }
        }
      })
    }
  }

  get sortedQuests(): {
    activeQuests: QuestEntity[]
    completedQuests: QuestEntity[]
  } {
    let activeQuests: QuestEntity[] = []
    let completedQuests: QuestEntity[] = []

    Object.entries(this.quests).forEach(([_key, q]) => {
      if (q.isActive) {
        activeQuests.push(q)
      }
      if (q.isComplete) {
        completedQuests.push(q)
      }
    })

    return {
      activeQuests,
      completedQuests,
    }
  }
}
