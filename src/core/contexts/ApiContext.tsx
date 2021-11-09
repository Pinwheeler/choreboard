import {
  addDoc,
  collection,
  DocumentData,
  DocumentReference,
} from "@firebase/firestore"
import React, { useContext } from "react"
import { UpcertProject } from "../forms/Project.form"
import { FirebaseContext } from "./FirebaseContext"

interface IApiContext {
  createProject: (
    form: UpcertProject
  ) => Promise<DocumentReference<DocumentData>>
}

export const ApiContext = React.createContext({} as IApiContext)

export const ApiProvider: React.FC = (props) => {
  const { db } = useContext(FirebaseContext)

  const createProject = (form: UpcertProject) => {
    return addDoc(collection(db, "projects"), form)
  }

  const value = {
    createProject,
  }

  return (
    <ApiContext.Provider value={value}>{props.children}</ApiContext.Provider>
  )
}
