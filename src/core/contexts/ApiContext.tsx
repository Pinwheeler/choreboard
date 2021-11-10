import {
  addDoc,
  collection,
  DocumentData,
  DocumentReference,
  getDocs,
  query,
} from "@firebase/firestore"
import React, { useContext } from "react"
import { UpcertProject } from "../forms/Project.form"
import { GuildModel } from "../models/Guild.model"
import { FirebaseContext } from "./FirebaseContext"

interface IApiContext {
  createProject: (
    form: UpcertProject
  ) => Promise<DocumentReference<DocumentData>>
  fetchGuilds: () => Promise<GuildModel[]>
}

export const ApiContext = React.createContext({} as IApiContext)

export const ApiProvider: React.FC = (props) => {
  const { db } = useContext(FirebaseContext)

  const createProject = (form: UpcertProject) => {
    return addDoc(collection(db, "projects"), form)
  }

  const fetchGuilds = (): Promise<GuildModel[]> => {
    const guildsRef = collection(db, "guilds")
    const q = query(guildsRef)
    return getDocs(q).then((result) => {
      return result.docs.map(
        (doc) => ({ ...doc.data(), uid: doc.id } as GuildModel)
      )
    })
  }

  const value = {
    createProject,
    fetchGuilds,
  }

  return (
    <ApiContext.Provider value={value}>{props.children}</ApiContext.Provider>
  )
}
