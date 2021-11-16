import { onValue, ref, set } from "@firebase/database"
import React, { useContext, useEffect, useState } from "react"
import { UpcertQuest, UpcertQuestDTO } from "../forms/Quest.form"
import { GuildModel } from "../models/Guild.model"
import { FirebaseContext } from "./FirebaseContext"

interface IApiContext {
  upcertQuest: (form: UpcertQuest, guildId: string) => Promise<void>
  guilds: { [key: string]: GuildModel }
}

export const ApiContext = React.createContext({} as IApiContext)

export const ApiProvider: React.FC = (props) => {
  const [guilds, setGuilds] = useState<{ [key: string]: GuildModel }>({})
  const { db } = useContext(FirebaseContext)

  const upcertQuest = (form: UpcertQuest, guildId: string) => {
    const dto = UpcertQuestDTO(form)
    return set(ref(db, `guilds/${guildId}/quests/` + dto.id), dto)
  }

  useEffect(() => {
    const guildsRef = ref(db, "guilds/")
    onValue(guildsRef, (snapshot) => {
      const data = snapshot.val() as { [key: string]: GuildModel }
      setGuilds(data)
    })
  }, [db])

  // const fetchGuilds = (): Promise<GuildModel[]> => {
  //   const guildsRef = collection(db, "guilds")
  //   const q = query(guildsRef)
  //   return getDocs(q).then((result) => {
  //     return result.docs.map(
  //       (doc) => ({ ...doc.data(), uid: doc.id } as GuildModel)
  //     )
  //   })
  // }

  // const fetchGuild = (guildId: string): Promise<GuildModel> => {
  //   const guildRef = doc(db, "guilds", guildId)
  //   return getDoc(guildRef).then((result) => {
  //     const model: GuildModel = {
  //       ...(result.data() as GuildModel),
  //       uid: result.id,
  //     }
  //     return model
  //   })
  // }

  // const fetchQuestsForGuild = (guildId: string) => {
  //   const questsRef = collection(db, "quests")
  //   // const q = query(projectsRef, where("guild", "==", `${guildId}`))
  //   const q = query(questsRef)
  //   return getDocs(q)
  //     .then((result) => {
  //       return result.docs.map((doc) => {
  //         const model = doc.data() as QuestModel
  //         return new QuestEntity(model, doc.id)
  //       })
  //     })
  //     .catch((error) => {
  //       console.error("error", error)
  //       throw error
  //     })
  // }

  const value = {
    upcertQuest,
    guilds,
  }

  return (
    <ApiContext.Provider value={value}>{props.children}</ApiContext.Provider>
  )
}
