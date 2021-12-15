import { ref, set } from "@firebase/database"
import React, { useContext, useMemo } from "react"
import { AuthContext } from "../../ui/AuthGate"
import { LoadingSpinner } from "../../ui/LoadingSpinner"
import { HeroEntity } from "../models/Hero.model"
import { FirebaseContext } from "./FirebaseContext"
import { GuildContext } from "./GuildContext"

interface ISignedInContext {
  signedInHero: HeroEntity
}

export const SignedInContext = React.createContext({} as ISignedInContext)

export const SignedInProvider: React.FC = (props) => {
  const { heroMap, guildId } = useContext(GuildContext)
  const { user } = useContext(AuthContext)
  const { db } = useContext(FirebaseContext)

  const heroesPath = useMemo(() => {
    if (guildId) {
      return `guilds/${guildId}/active_heroes`
    }
  }, [guildId])

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

  if (!signedInHero) {
    return <LoadingSpinner whatIsLoading={"Hero needs to sign in"} />
  }

  const value = {
    signedInHero,
  }

  return (
    <SignedInContext.Provider value={value}>
      {props.children}
    </SignedInContext.Provider>
  )
}
