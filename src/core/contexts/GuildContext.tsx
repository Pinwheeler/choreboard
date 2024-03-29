import { onValue, ref } from "@firebase/database"
import React, { useContext, useEffect, useMemo, useState } from "react"
import { useParams } from "react-router-dom"
import { LoadingSpinner } from "../../ui/LoadingSpinner"
import { GuildEntity, GuildModel } from "../models/Guild.model"
import { HeroEntity, HeroMap, HeroModelMap } from "../models/Hero.model"
import { FirebaseContext } from "./FirebaseContext"

interface IGuildContext {
  guild: GuildEntity
  guildId: string
  heroMap: HeroMap
}

export const GuildContext = React.createContext({} as IGuildContext)

export const GuildProvider: React.FC = (props) => {
  const { guildId } = useParams<{ guildId?: string }>()
  const { db } = useContext(FirebaseContext)

  const [guild, setGuild] = useState<GuildEntity>()
  const [heroMap, setHeroMap] = useState<HeroMap>()

  const heroesPath = useMemo(() => {
    if (guildId) {
      return `guilds/${guildId}/active_heroes`
    }
  }, [guildId])

  useEffect(() => {
    if (heroesPath) {
      const heroesRef = ref(db, heroesPath)
      onValue(heroesRef, (snapshot) => {
        const data = snapshot.val() as HeroModelMap
        const map: HeroMap = {}
        Object.entries(data).forEach(([key, model]) => {
          map[key] = new HeroEntity(model)
        })
        setHeroMap(map)
      })
    }
  }, [db, heroesPath])

  useEffect(() => {
    if (guildId) {
      const guildRef = ref(db, `guilds/${guildId.toLowerCase()}`)
      onValue(guildRef, (snapshot) => {
        const data = snapshot.val() as GuildModel
        if (data) {
          setGuild(new GuildEntity(data))
        }
      })
    }
  }, [db, guildId])

  if (!guildId) {
    return <LoadingSpinner whatIsLoading="Guild Id" />
  }

  if (!guild) {
    return <LoadingSpinner whatIsLoading={`Guild data for guild: ${guildId}`} />
  }

  if (!heroMap) {
    return <LoadingSpinner whatIsLoading="Heromap" />
  }

  const value = {
    guild,
    guildId,
    heroMap,
  }

  return (
    <GuildContext.Provider value={value}>
      {props.children}
    </GuildContext.Provider>
  )
}
