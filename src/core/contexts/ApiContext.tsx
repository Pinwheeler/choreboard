import { onValue, ref, remove, set } from "@firebase/database"
import React, { useContext, useEffect, useState } from "react"
import { UpcertQuest, UpcertQuestDTO } from "../forms/Quest.form"
import { GuildModel } from "../models/Guild.model"
import { HeroEntity } from "../models/Hero.model"
import { QuestEntity } from "../models/Quest.model"
import { FirebaseContext } from "./FirebaseContext"

interface IApiContext {
  upcertQuest: (form: UpcertQuest, guildId: string) => Promise<void>
  completeTask: (
    guildId: string,
    quest: QuestEntity,
    taskIndex: number,
    hero: HeroEntity
  ) => Promise<[void, void]>
  uncompleteTask: (
    guildId: string,
    quest: QuestEntity,
    taskIndex: number,
    heroWhoHadCompletedIt: HeroEntity
  ) => Promise<[void, void]>
  guilds: { [key: string]: GuildModel }
  deleteQuest: (
    guildId: string,
    synthetic: boolean,
    questId: string
  ) => Promise<void>
}

export const ApiContext = React.createContext({} as IApiContext)

const pathForQuest = (guildId: string, recurring: boolean, questId: string) => {
  if (recurring) {
    return `guilds/${guildId}/recurring_quests/${questId}`
  } else {
    return `guilds/${guildId}/quests/${questId}`
  }
}

export const ApiProvider: React.FC = (props) => {
  const [guilds, setGuilds] = useState<{ [key: string]: GuildModel }>({})
  const { db } = useContext(FirebaseContext)

  const upcertQuest = (form: UpcertQuest, guildId: string) => {
    const dto = UpcertQuestDTO(form)
    const recurring = dto.recurring !== "none" && !form.synthetic
    const path = pathForQuest(guildId, recurring, dto.id)
    return set(ref(db, path), dto)
  }

  const deleteQuest = (
    guildId: string,
    recurring: boolean,
    questId: string
  ) => {
    const path = pathForQuest(guildId, recurring, questId)
    const questRef = ref(db, path)
    if (recurring) {
      const syntheticPath = pathForQuest(guildId, false, questId)
      const syntheticRef = ref(db, syntheticPath)
      remove(syntheticRef)
    }
    return remove(questRef)
  }

  const completeTask = (
    guildId: string,
    quest: QuestEntity,
    taskIndex: number,
    hero: HeroEntity
  ) => {
    quest.tasks[taskIndex].completedBy = hero.uid
    const questModel = quest.toModel()
    const questUpdatePath = `guilds/${guildId}/quests/${quest.id}`
    const updateQuest = set(ref(db, questUpdatePath), questModel)
    const heroModel = hero.toModel()
    heroModel.coin += quest.tasks[taskIndex].coinValue
    const heroUpdatePath = `guilds/${guildId}/active_heroes/${hero.uid}`
    const updateHero = set(ref(db, heroUpdatePath), heroModel)
    return Promise.all([updateQuest, updateHero])
  }

  const uncompleteTask = (
    guildId: string,
    quest: QuestEntity,
    taskIndex: number,
    heroWhoHadCompletedIt: HeroEntity
  ) => {
    quest.tasks[taskIndex].completedBy = undefined
    const model = quest.toModel()
    const updatePath = `guilds/${guildId}/quests/${quest.id}`
    const updateQuest = set(ref(db, updatePath), model)
    const heroModel = heroWhoHadCompletedIt.toModel()
    heroModel.coin += quest.tasks[taskIndex].coinValue
    const heroUpdatePath = `guilds/${guildId}/active_heroes/${heroWhoHadCompletedIt.uid}`
    const updateHero = set(ref(db, heroUpdatePath), heroModel)
    return Promise.all([updateQuest, updateHero])
  }

  useEffect(() => {
    const guildsRef = ref(db, "guilds/")
    onValue(guildsRef, (snapshot) => {
      const data = snapshot.val() as { [key: string]: GuildModel }
      setGuilds(data)
    })
  }, [db])

  const value = {
    upcertQuest,
    deleteQuest,
    guilds,
    completeTask,
    uncompleteTask,
  }

  return (
    <ApiContext.Provider value={value}>{props.children}</ApiContext.Provider>
  )
}
