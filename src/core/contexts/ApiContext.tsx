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
  ) => Promise<void>
  uncompleteTask: (
    guildId: string,
    quest: QuestEntity,
    taskIndex: number
  ) => Promise<void>
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
    return remove(questRef)
  }

  const completeTask = (
    guildId: string,
    quest: QuestEntity,
    taskIndex: number,
    hero: HeroEntity
  ) => {
    quest.tasks[taskIndex].completedBy = hero.uid
    const model = quest.toModel()
    const updatePath = `guilds/${guildId}/quests/${quest.id}`
    return set(ref(db, updatePath), model)
  }

  const uncompleteTask = (
    guildId: string,
    quest: QuestEntity,
    taskIndex: number
  ) => {
    quest.tasks[taskIndex].completedBy = undefined
    const model = quest.toModel()
    const updatePath = `guilds/${guildId}/quests/${quest.id}`
    return set(ref(db, updatePath), model)
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
