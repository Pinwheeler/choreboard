import { QuestEntity, QuestModel } from "./Quest.model"

export interface GuildModel {
  name: string
  quests?: { [key: string]: QuestModel }
}

export class GuildEntity {
  name: string
  quests: QuestEntity[]

  constructor(model: GuildModel) {
    console.log("constructing with model", model)
    this.name = model.name
    if (model.quests) {
      this.quests = Object.entries(model.quests).map(
        ([_key, q]) => new QuestEntity(q)
      )
    } else {
      this.quests = []
    }
  }
}
