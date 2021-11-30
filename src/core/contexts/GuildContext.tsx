import { onValue, ref, set } from "@firebase/database"
import React, { useContext, useEffect, useMemo, useState } from "react"
import { AuthContext } from "../../ui/AuthGate"
import { LoadingSpinner } from "../../ui/LoadingSpinner"
import { GuildEntity, GuildModel } from "../models/Guild.model"
import { HeroEntity, HeroModel } from "../models/Hero.model"
import { FirebaseContext } from "./FirebaseContext"

interface IGuildContext {
  guild: GuildEntity
  guildId: string
  signedInHero?: HeroEntity
}

interface Props {
  guildId: string
}

export const GuildContext = React.createContext({} as IGuildContext)

export const GuildProvider: React.FC<Props> = (props) => {
  const { guildId } = props
  const { db } = useContext(FirebaseContext)
  const { user } = useContext(AuthContext)
  const [guild, setGuild] = useState<GuildEntity>()

  const signedInHero = useMemo(() => {
    if (guildId && user) {
      const path = `guilds/${guildId}/active_heroes/${user.uid}`
      const heroRef = ref(db, path)
      onValue(heroRef, (snapshot) => {
        const data = snapshot.val()
        if (data) {
          const model = data as HeroModel
          return new HeroEntity(model)
        } else {
          const entity = HeroEntity.fromUser(user)
          set(ref(db, path), entity.toModel())
          return entity
        }
      })
    }
    return undefined
  }, [db, guildId, user])

  useEffect(() => {
    if (guildId) {
      const guildRef = ref(db, `guilds/${guildId}`)
      onValue(guildRef, (snapshot) => {
        const data = snapshot.val() as GuildModel
        if (data) {
          setGuild(new GuildEntity(data))
        }
      })
    }
  }, [db, guildId])

  if (!guild) {
    return <LoadingSpinner whatIsLoading={`Guild data for guild: ${guildId}`} />
  }

  const value = {
    guild,
    guildId,
    signedInHero,
  }

  return (
    <GuildContext.Provider value={value}>
      {props.children}
    </GuildContext.Provider>
  )
}
