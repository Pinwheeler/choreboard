import React, { useContext } from "react"
import { QuestEntity } from "../models/Quest.model"
import { GuildContext } from "./GuildContext"

interface IQuestContext {
  quest: QuestEntity
  questId: string
}

interface Props {
  questId: string
}

export const QuestContext = React.createContext({} as IQuestContext)

export const QuestProvider: React.FC<Props> = (props) => {
  const { questId } = props
  const { guild } = useContext(GuildContext)

  const quest = guild.quests[questId]
  const value = { quest, questId }

  return (
    <QuestContext.Provider value={value}>
      {props.children}
    </QuestContext.Provider>
  )
}
