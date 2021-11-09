import adapter from "@date-io/luxon"
import LocalizationProvider from "@mui/lab/LocalizationProvider"
import React from "react"
import { ApiProvider } from "./ApiContext"
import { FirebaseProvider } from "./FirebaseContext"

export const ContextStack: React.FC = (props) => {
  return (
    <FirebaseProvider>
      <LocalizationProvider dateAdapter={adapter}>
        <ApiProvider>{props.children}</ApiProvider>
      </LocalizationProvider>
    </FirebaseProvider>
  )
}
