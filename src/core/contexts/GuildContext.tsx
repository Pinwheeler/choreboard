import { onValue, ref } from "@firebase/database"
import React, { useContext, useEffect, useState } from "react"
import { LoadingSpinner } from "../../ui/LoadingSpinner"
import { GuildEntity, GuildModel } from "../models/Guild.model"
import { FirebaseContext } from "./FirebaseContext"

interface IGuildContext {
  guild: GuildEntity
  guildId: string
}

interface Props {
  guildId: string
}

export const GuildContext = React.createContext({} as IGuildContext)

export const GuildProvider: React.FC<Props> = (props) => {
  const { guildId } = props
  const { db } = useContext(FirebaseContext)
  const [guild, setGuild] = useState<GuildEntity>()

  useEffect(() => {
    if (guildId) {
      const guildRef = ref(db, `guilds/${guildId}`)
      onValue(guildRef, (snapshot) => {
        const data = snapshot.val() as GuildModel
        setGuild(new GuildEntity(data))
      })
    }
  }, [db, guildId])

  console.log("guild provider", guild)

  if (!guild) {
    return <LoadingSpinner whatIsLoading={`Guild data for guild: ${guildId}`} />
  }

  console.log("found guild ")

  const value = {
    guild,
    guildId,
  }

  return (
    <GuildContext.Provider value={value}>
      {props.children}
    </GuildContext.Provider>
  )
}