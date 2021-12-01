import { onValue, ref, set } from "@firebase/database"
import React, { useContext, useEffect, useMemo, useState } from "react"
import { AuthContext } from "../../ui/AuthGate"
import { LoadingSpinner } from "../../ui/LoadingSpinner"
import { GuildEntity, GuildModel } from "../models/Guild.model"
import { HeroEntity, HeroMap, HeroModelMap } from "../models/Hero.model"
import { FirebaseContext } from "./FirebaseContext"

interface IGuildContext {
  guild: GuildEntity
  guildId: string
  signedInHero: HeroEntity
  heroMap: HeroMap
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

  const signedInHero = useMemo(() => {
    if (heroMap && user && guildId) {
      const hero = heroMap[user.uid]
      if (hero) {
        return hero
      } else {
        const entity = HeroEntity.fromUser(user)
        set(ref(db, `${heroesPath}/${user.uid}`), entity.toModel())
      }
    }
    return undefined
  }, [db, guildId, heroMap, heroesPath, user])

  useEffect(() => {
    const guildRef = ref(db, `guilds/${guildId.toLowerCase()}`)
    console.log(guildRef.toJSON())
    onValue(guildRef, (snapshot) => {
      const data = snapshot.val() as GuildModel
      if (data) {
        setGuild(new GuildEntity(data))
      }
    })
  }, [db, guildId])

  if (!guild) {
    return <LoadingSpinner whatIsLoading={`Guild data for guild: ${guildId}`} />
  }

  if (!signedInHero) {
    return <LoadingSpinner whatIsLoading={"Hero needs to sign in"} />
  }

  if (!heroMap) {
    return <LoadingSpinner whatIsLoading="Heromap" />
  }

  const value = {
    guild,
    guildId,
    signedInHero,
    heroMap,
  }

  return (
    <GuildContext.Provider value={value}>
      {props.children}
    </GuildContext.Provider>
  )
}
