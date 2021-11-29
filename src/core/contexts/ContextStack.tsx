import adapter from "@date-io/luxon"
import LocalizationProvider from "@mui/lab/LocalizationProvider"
import { ThemeProvider } from "@mui/system"
import React from "react"
import { ApiProvider } from "./ApiContext"
import { FirebaseProvider } from "./FirebaseContext"
import { Theme } from "./Theme"

export const ContextStack: React.FC = (props) => {
  return (
    <FirebaseProvider>
      <LocalizationProvider dateAdapter={adapter}>
        <ApiProvider>
          <ThemeProvider theme={Theme}>{props.children}</ThemeProvider>
        </ApiProvider>
      </LocalizationProvider>
    </FirebaseProvider>
  )
}
