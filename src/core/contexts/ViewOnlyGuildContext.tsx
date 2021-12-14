import { onValue, ref } from "@firebase/database"
import React, { useContext, useEffect, useState } from "react"
import { LoadingSpinner } from "../../ui/LoadingSpinner"
import { GuildEntity, GuildModel } from "../models/Guild.model"
import { FirebaseContext } from "./FirebaseContext"

interface IViewOnlyGuildContext {
  guild: GuildEntity
  guildId: string
}

interface Props {
  guildId: string
}

export const ViewOnlyGuildContext = React.createContext(
  {} as IViewOnlyGuildContext
)

export const ViewOnlyGuildProvider: React.FC<Props> = (props) => {
  const { guildId } = props
  const [guild, setGuild] = useState<GuildEntity>()
  const { db } = useContext(FirebaseContext)

  useEffect(() => {
    const guildRef = ref(db, `guilds/${guildId.toLowerCase()}`)
    onValue(
      guildRef,
      (snapshot) => {
        const data = snapshot.val() as GuildModel
        const entity = new GuildEntity(data)
        setGuild(entity)
      },
      (error) => {
        console.error(error)
      }
    )
  }, [db, guildId])

  if (!guild) {
    return <LoadingSpinner whatIsLoading={`Guild data for guild: ${guildId}`} />
  }

  const value = {
    guild,
    guildId,
  }

  return (
    <ViewOnlyGuildContext.Provider value={value}>
      {props.children}
    </ViewOnlyGuildContext.Provider>
  )
}
