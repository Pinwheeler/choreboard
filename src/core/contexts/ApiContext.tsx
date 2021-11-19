import { onValue, ref, set } from "@firebase/database"
import React, { useContext, useEffect, useState } from "react"
import { UpcertQuest, UpcertQuestDTO } from "../forms/Quest.form"
import { GuildModel } from "../models/Guild.model"
import { QuestEntity } from "../models/Quest.model"
import { FirebaseContext } from "./FirebaseContext"

interface IApiContext {
  upcertQuest: (form: UpcertQuest, guildId: string) => Promise<void>
  completeTask: (
    guildId: string,
    quest: QuestEntity,
    taskIndex: number
  ) => Promise<void>
  guilds: { [key: string]: GuildModel }
}

export const ApiContext = React.createContext({} as IApiContext)

export const ApiProvider: React.FC = (props) => {
  const [guilds, setGuilds] = useState<{ [key: string]: GuildModel }>({})
  const { db } = useContext(FirebaseContext)

  const upcertQuest = (form: UpcertQuest, guildId: string) => {
    const dto = UpcertQuestDTO(form)
    return set(ref(db, `guilds/${guildId}/quests/` + dto.id), dto)
  }

  const completeTask = (
    guildId: string,
    quest: QuestEntity,
    taskIndex: number
  ) => {
    quest.tasks[taskIndex].complete = true
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
    guilds,
    completeTask,
  }

  return (
    <ApiContext.Provider value={value}>{props.children}</ApiContext.Provider>
  )
}
