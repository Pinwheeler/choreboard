import React, { useContext } from "react"
import { Redirect } from "react-router"
import { QuestEntity } from "../models/Quest.model"
import { TaskEntity } from "../models/Task.model"
import { ApiContext } from "./ApiContext"
import { GuildContext } from "./GuildContext"

interface IQuestContext {
  quest: QuestEntity
  questId: string
  completeTask: (task: TaskEntity) => void
}

interface Props {
  questId: string
}

export const QuestContext = React.createContext({} as IQuestContext)

export const QuestProvider: React.FC<Props> = (props) => {
  const { questId } = props
  const { guild, guildId } = useContext(GuildContext)
  const { completeTask: completeTaskNET } = useContext(ApiContext)

  const quest = guild.quests[questId]

  const completeTask = (task: TaskEntity) => {
    const taskIndex = quest.tasks.findIndex((t) => t.name === task.name)
    completeTaskNET(guildId, quest, taskIndex)
  }

  const value = { quest, questId, completeTask }

  if (!quest) {
    return <Redirect to={`/guilds/${guildId}`} />
  }

  return (
    <QuestContext.Provider value={value}>
      {props.children}
    </QuestContext.Provider>
  )
}
