import { onValue, ref } from "@firebase/database"
import React, { useContext, useEffect, useState } from "react"
import { Redirect } from "react-router"
import { QuestEntity, QuestModel } from "../models/Quest.model"
import { TaskEntity } from "../models/Task.model"
import { ApiContext } from "./ApiContext"
import { FirebaseContext } from "./FirebaseContext"
import { GuildContext } from "./GuildContext"

interface IQuestContext {
  quest: QuestEntity
  questId: string
  completeTask: (task: TaskEntity) => void
  uncompleteTask: (task: TaskEntity) => void
  questSyntheticToCurrentQuest?: QuestEntity
}

interface Props {
  questId: string
}

export const QuestContext = React.createContext({} as IQuestContext)

export const QuestProvider: React.FC<Props> = (props) => {
  const { questId } = props
  const { guild, guildId, signedInHero } = useContext(GuildContext)
  const { completeTask: completeTaskNET, uncompleteTask: uncompleteTaskNET } =
    useContext(ApiContext)
  const { db } = useContext(FirebaseContext)
  const [questSyntheticToCurrentQuest, setQuestSyntheticToCurrentQuest] =
    useState<QuestEntity>()

  const quest = guild.quests[questId]

  const taskIndex = (task: TaskEntity) =>
    quest.tasks.findIndex((t) => t.name === task.name)

  const completeTask = (task: TaskEntity) =>
    completeTaskNET(guildId, quest, taskIndex(task), signedInHero)

  const uncompleteTask = (task: TaskEntity) =>
    uncompleteTaskNET(guildId, quest, taskIndex(task))

  useEffect(() => {
    if (quest.recurring !== "none") {
      const questRef = ref(db, `guilds/${guildId}/quests/${questId}`)
      onValue(questRef, (snapshot) => {
        const data = snapshot.val() as QuestModel
        setQuestSyntheticToCurrentQuest(new QuestEntity(data))
      })
    }
  }, [db, guildId, quest.recurring, questId])

  const value = {
    quest,
    questId,
    completeTask,
    uncompleteTask,
    questSyntheticToCurrentQuest,
  }

  if (!quest) {
    return <Redirect to={`/guilds/${guildId}`} />
  }

  return (
    <QuestContext.Provider value={value}>
      {props.children}
    </QuestContext.Provider>
  )
}
