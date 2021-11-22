import { onValue, ref, remove, set } from "@firebase/database"
import React, { useContext, useEffect, useState } from "react"
import {
  RecurrenceCadence,
  UpcertQuest,
  UpcertQuestDTO,
} from "../forms/Quest.form"
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
  deleteQuest: (
    guildId: string,
    recurring: RecurrenceCadence,
    questId: string
  ) => Promise<void>
}

export const ApiContext = React.createContext({} as IApiContext)

const pathForQuest = (
  guildId: string,
  recurring: RecurrenceCadence,
  questId: string
) => {
  if (recurring === "none") {
    return `guilds/${guildId}/quests/${questId}`
  } else {
    return `guilds/${guildId}/recurring_quests/${questId}`
  }
}

export const ApiProvider: React.FC = (props) => {
  const [guilds, setGuilds] = useState<{ [key: string]: GuildModel }>({})
  const { db } = useContext(FirebaseContext)

  const upcertQuest = (form: UpcertQuest, guildId: string) => {
    const dto = UpcertQuestDTO(form)
    const path = pathForQuest(guildId, form.recurring, dto.id)
    return set(ref(db, path), dto)
  }

  const deleteQuest = (
    guildId: string,
    recurring: RecurrenceCadence,
    questId: string
  ) => {
    const path = pathForQuest(guildId, recurring, questId)
    const questRef = ref(db, path)
    return remove(questRef)
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
    deleteQuest,
    guilds,
    completeTask,
  }

  return (
    <ApiContext.Provider value={value}>{props.children}</ApiContext.Provider>
  )
}
