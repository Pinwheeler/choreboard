import { QuestEntity, QuestModel } from "./Quest.model"

export interface GuildModel {
  name: string
  quests?: QuestModel[]
}

export class GuildEntity {
  name: string
  quests: QuestEntity[]

  constructor(model: GuildModel) {
    this.name = model.name
    if (model.quests) {
      this.quests = model.quests.map((q) => new QuestEntity(q))
    } else {
      this.quests = []
    }
  }
}
