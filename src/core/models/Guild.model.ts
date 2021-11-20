import { QuestEntity, QuestModel } from "./Quest.model"

export interface GuildModel {
  name: string
  quests?: { [key: string]: QuestModel }
}

export class GuildEntity {
  name: string
  quests: { [key: string]: QuestEntity }

  constructor(model: GuildModel) {
    this.name = model.name
    if (model.quests) {
      this.quests = {}
      Object.entries(model.quests).forEach(([key, q]) => {
        this.quests[key] = new QuestEntity(q)
      })
    } else {
      this.quests = {}
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
