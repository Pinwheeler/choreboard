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
  uncompleteTask: (task: TaskEntity) => void
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

  const quest = guild.quests[questId]

  const taskIndex = (task: TaskEntity) =>
    quest.tasks.findIndex((t) => t.name === task.name)

  const completeTask = (task: TaskEntity) =>
    completeTaskNET(guildId, quest, taskIndex(task), signedInHero)

  const uncompleteTask = (task: TaskEntity) =>
    uncompleteTaskNET(guildId, quest, taskIndex(task))

  const value = { quest, questId, completeTask, uncompleteTask }

  if (!quest) {
    return <Redirect to={`/guilds/${guildId}`} />
  }

  return (
    <QuestContext.Provider value={value}>
      {props.children}
    </QuestContext.Provider>
  )
}
